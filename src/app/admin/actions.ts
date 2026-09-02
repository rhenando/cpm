"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

const MAX_PDF_SIZE = 2.5 * 1024 * 1024;
const MAX_IMAGE_SIZE = 1.25 * 1024 * 1024;
const MAX_COMBINED_SIZE = 3.75 * 1024 * 1024;
const MAX_BATCH_SIZE = 8;
const ALLOWED_IMAGES = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function cleanPdfText(value: string) {
  return value
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function deriveTitle(content: string, metadataTitle: unknown, filename: string) {
  if (typeof metadataTitle === "string" && metadataTitle.trim().length > 4) return metadataTitle.trim();
  const lines = content.split("\n").map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  const bylineIndex = lines.findIndex((line) => /^By Cordova Property Management\b/i.test(line));
  const titleLines = bylineIndex > 0 ? lines.slice(0, bylineIndex) : lines.slice(0, 1);
  const title = titleLines.join(" ").trim();
  return title || filename.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ").trim();
}

function getPublishDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return new Date();
  const date = new Date(`${value}:00+04:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function installPdfNodeGlobals() {
  const { DOMMatrix, ImageData, Path2D } = await import("@napi-rs/canvas");
  const nodeGlobals = globalThis as unknown as Record<string, unknown>;
  nodeGlobals.DOMMatrix ??= DOMMatrix;
  nodeGlobals.ImageData ??= ImageData;
  nodeGlobals.Path2D ??= Path2D;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail) redirect("/admin/login?error=configuration");
  if (email !== adminEmail) redirect("/admin/login?error=email");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed") redirect("/admin/login?error=unconfirmed");
    if (error.code === "invalid_credentials") redirect("/admin/login?error=credentials");
    redirect("/admin/login?error=connection");
  }
  redirect("/admin");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function publishPost(formData: FormData) {
  const { supabase, user } = await requireAdmin();

  const pdfs = formData.getAll("pdf").filter((file): file is File => file instanceof File && file.size > 0);
  const images = formData.getAll("image").filter((file): file is File => file instanceof File && file.size > 0);
  const publishDate = getPublishDate(formData.get("publishAt"));
  if (!publishDate) redirect("/admin?error=invalid-date");
  if (!pdfs.length || !images.length) redirect("/admin?error=missing-files");
  if (pdfs.length !== images.length) redirect("/admin?error=file-count-mismatch");
  if (pdfs.length > MAX_BATCH_SIZE) redirect("/admin?error=batch-too-large");
  if (pdfs.some((pdf) => pdf.type !== "application/pdf" || pdf.size > MAX_PDF_SIZE)) redirect("/admin?error=invalid-pdf");
  if (images.some((image) => !ALLOWED_IMAGES.has(image.type) || image.size > MAX_IMAGE_SIZE)) redirect("/admin?error=invalid-image");
  if (pdfs.some((pdf, index) => pdf.size + images[index].size > MAX_COMBINED_SIZE)) redirect("/admin?error=files-too-large");

  await installPdfNodeGlobals();
  const { PDFParse } = await import("pdf-parse");
  const publishedSlugs: string[] = [];
  for (let index = 0; index < pdfs.length; index++) {
    const pdf = pdfs[index];
    const image = images[index];
    let content = "";
    try {
      const parser = new PDFParse({ data: Buffer.from(await pdf.arrayBuffer()) });
      const text = await parser.getText();
      content = cleanPdfText(text.text);
      await parser.destroy();
    } catch (error) {
      console.error(`Unable to process uploaded PDF ${pdf.name}:`, error);
      redirect(`/admin?error=${publishedSlugs.length ? "batch-partial" : "pdf-processing-failed"}`);
    }
    if (content.length < 100) redirect(`/admin?error=${publishedSlugs.length ? "batch-partial" : "empty-pdf"}`);

    const title = deriveTitle(content, undefined, pdf.name);
    const contentLines = content.split("\n");
    const bylineLineIndex = contentLines.findIndex((line) => /^\s*By Cordova Property Management\b/i.test(line));
    const articleContent = bylineLineIndex > 0
      ? contentLines.slice(bylineLineIndex).join("\n").trim()
      : content.toLowerCase().startsWith(title.toLowerCase())
        ? content.slice(title.length).replace(/^\s+/, "")
        : content;
    const timestamp = Date.now() + index;
    const baseSlug = safeSlug(title) || `article-${timestamp}`;
    const slug = `${baseSlug}-${timestamp.toString().slice(-6)}`;
    const folder = `${user.id}/${slug}`;
    const imageExtension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const imagePath = `${folder}/featured.${imageExtension}`;
    const pdfPath = `${folder}/article.pdf`;
    const [imageUpload, pdfUpload] = await Promise.all([
      supabase.storage.from("blog-assets").upload(imagePath, image, { contentType: image.type }),
      supabase.storage.from("blog-assets").upload(pdfPath, pdf, { contentType: "application/pdf" })
    ]);
    if (imageUpload.error || pdfUpload.error) {
      const uploadedPaths = [!imageUpload.error ? imagePath : null, !pdfUpload.error ? pdfPath : null].filter((path): path is string => Boolean(path));
      if (uploadedPaths.length) await supabase.storage.from("blog-assets").remove(uploadedPaths);
      redirect(`/admin?error=${publishedSlugs.length ? "batch-partial" : "upload-failed"}`);
    }
    const imageUrl = supabase.storage.from("blog-assets").getPublicUrl(imagePath).data.publicUrl;
    const pdfUrl = supabase.storage.from("blog-assets").getPublicUrl(pdfPath).data.publicUrl;
    const { error } = await supabase.from("posts").insert({
      author_id: user.id, slug, title,
      excerpt: articleContent.replace(/\s+/g, " ").trim().slice(0, 220),
      content: articleContent, image_url: imageUrl, pdf_url: pdfUrl,
      published: true, published_at: publishDate.toISOString()
    });
    if (error) {
      await supabase.storage.from("blog-assets").remove([imagePath, pdfPath]);
      redirect(`/admin?error=${publishedSlugs.length ? "batch-partial" : "publish-failed"}`);
    }
    publishedSlugs.push(slug);
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/blog");
  if (publishedSlugs.length > 1) redirect(`/admin?success=${publishDate.getTime() > Date.now() ? "batch-scheduled" : "batch-published"}&count=${publishedSlugs.length}`);
  if (publishDate.getTime() > Date.now()) redirect("/admin?success=scheduled");
  redirect(`/blog/${publishedSlugs[0]}`);
}

function storagePathFromPublicUrl(url: string) {
  try {
    const marker = "/storage/v1/object/public/blog-assets/";
    const pathname = new URL(url).pathname;
    const index = pathname.indexOf(marker);
    return index >= 0 ? decodeURIComponent(pathname.slice(index + marker.length)) : null;
  } catch {
    return null;
  }
}

export async function deletePost(formData: FormData) {
  const { supabase, user } = await requireAdmin();

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin?error=delete-failed");

  const { data: post, error: lookupError } = await supabase
    .from("posts")
    .select("id,slug,image_url,pdf_url")
    .eq("id", id)
    .eq("author_id", user.id)
    .single();
  if (lookupError || !post) redirect("/admin?error=delete-failed");

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", id).eq("author_id", user.id);
  if (deleteError) redirect("/admin?error=delete-failed");

  const assetPaths = [storagePathFromPublicUrl(post.image_url), storagePathFromPublicUrl(post.pdf_url)].filter(
    (path): path is string => Boolean(path)
  );
  if (assetPaths.length) {
    const { error: storageError } = await supabase.storage.from("blog-assets").remove(assetPaths);
    if (storageError) redirect("/admin?error=delete-assets-failed");
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin?success=deleted");
}
