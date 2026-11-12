import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/app/admin/actions.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

function editor({ conflict = false, denied = false } = {}) {
  const post = { id: "post-id", slug: "existing-url", title: "Existing title", content: "Existing article text", excerpt: "Existing excerpt", image_url: "/old.webp", pdf_url: "/old.pdf", updated_at: "2026-11-01T00:00:00Z" };
  const calls = { uploads: [], removed: [], updates: [], invalidated: [] };
  const query = {
    select() { return this; }, eq() { return this; },
    async single() { return { data: post }; },
    async maybeSingle() { return { data: conflict ? null : { id: post.id } }; },
    update(value) { calls.updates.push(value); return this; }
  };
  const storage = {
    async upload(path) { calls.uploads.push(path); return {}; },
    async remove(paths) { calls.removed.push(...paths); return {}; },
    getPublicUrl(path) { return { data: { publicUrl: `https://storage.test/${path}` } }; }
  };
  const dependencies = {
    "next/cache": { revalidateTag() {}, revalidatePath(path) { calls.invalidated.push(path); } },
    "next/navigation": { redirect(path) { throw new Error(`REDIRECT:${path}`); } },
    "@/lib/supabase/server": {},
    "@/lib/admin": { async requireAdmin() {
      if (denied) throw new Error("Unauthorized");
      return { supabase: { from: () => query, storage: { from: () => storage } }, user: { id: "admin-id" } };
    } },
    "@/lib/post-title": { cleanPostTitle: (title) => title },
    "@/lib/pdf-text": { extractPdfText: async () => "Replacement title\nBy Cordova Property Management\n" + "Replacement article paragraph. ".repeat(10) },
    "@/lib/posts": { mapPost: (row) => ({ ...row, image: row.image_url }) }
  };
  const context = { exports: {}, require: (id) => {
    assert.ok(id in dependencies, `Unexpected dependency ${id}`);
    return dependencies[id];
  }, File, FormData, crypto, console, Date, Uint8Array };
  vm.runInNewContext(source, context);
  const form = new FormData();
  for (const [key, value] of Object.entries({ id: post.id, updatedAt: post.updated_at, title: post.title, content: post.content, excerpt: post.excerpt })) form.set(key, value);
  return { calls, form, save: () => context.exports.updatePost({ error: "" }, form), post };
}

test("image-only update preserves article and original PDF", async () => {
  const { form, save, calls, post } = editor();
  form.set("image", new File(["image"], "new.webp", { type: "image/webp" }));
  await assert.rejects(save, /REDIRECT:.*saved=1/);
  assert.equal(calls.updates[0].content, post.content);
  assert.equal(calls.updates[0].title, post.title);
  assert.equal(calls.updates[0].pdf_url, post.pdf_url);
  assert.notEqual(calls.updates[0].image_url, post.image_url);
  assert.equal(calls.updates[0].slug, undefined);
  assert.equal(calls.updates[0].published_at, undefined);
  assert.ok(calls.invalidated.includes("/blog/existing-url"));
});

test("text-only update retains existing assets", async () => {
  const { form, save, calls, post } = editor();
  form.set("content", "Revised article text");
  await assert.rejects(save, /REDIRECT:/);
  assert.equal(calls.updates[0].content, "Revised article text");
  assert.equal(calls.updates[0].image_url, post.image_url);
  assert.equal(calls.updates[0].pdf_url, post.pdf_url);
  assert.equal(calls.uploads.length, 0);
});

test("replacement PDF regenerates the article and retains image", async () => {
  const { form, save, calls, post } = editor();
  form.set("pdf", new File(["pdf"], "new.pdf", { type: "application/pdf" }));
  form.delete("title"); form.delete("content"); form.delete("excerpt");
  await assert.rejects(save, /REDIRECT:/);
  assert.equal(calls.updates[0].title, "Replacement title");
  assert.match(calls.updates[0].content, /^By Cordova/);
  assert.equal(calls.updates[0].image_url, post.image_url);
  assert.notEqual(calls.updates[0].pdf_url, post.pdf_url);
});

test("invalid images and stale forms cannot change a post", async () => {
  for (const invalid of ["type", "size", "stale"]) {
    const { form, save, calls } = editor();
    if (invalid === "stale") form.set("updatedAt", "old-version");
    else form.set("image", new File([invalid === "size" ? new Uint8Array(1400000) : "svg"], "image", { type: invalid === "size" ? "image/png" : "image/svg+xml" }));
    assert.ok((await save()).error);
    assert.equal(calls.updates.length, 0);
    assert.equal(calls.uploads.length, 0);
  }
});

test("concurrent save failure cleans up new uploads", async () => {
  const { form, save, calls } = editor({ conflict: true });
  form.set("image", new File(["image"], "new.png", { type: "image/png" }));
  assert.ok((await save()).error);
  assert.deepEqual(calls.removed, calls.uploads);
  assert.equal(calls.invalidated.length, 0);
});

test("saving requires admin authentication", async () => {
  const { save, calls } = editor({ denied: true });
  await assert.rejects(save, /Unauthorized/);
  assert.equal(calls.updates.length, 0);
});
