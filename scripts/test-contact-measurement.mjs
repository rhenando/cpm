import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync("src/app/api/contact/route.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exports = {};
let insertError = null;
let inserts = 0;
runInNewContext(compiled, {
  exports,
  console: { error() {} },
  require(name) {
    if (name === "next/server") return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    if (name === "@/lib/supabase/config") return { isSupabaseConfigured: () => true, getSupabaseConfig: () => ({ url: "mock", key: "mock" }) };
    if (name === "@supabase/supabase-js") return { createClient: () => ({ from: () => ({ insert: async () => { inserts++; return { error: insertError }; } }) }) };
    throw new Error(`Unexpected dependency: ${name}`);
  }
});
let requestNumber = 0;
const request = (payload) => ({ headers: { get: () => `test-${++requestNumber}` }, json: async () => payload });
const valid = { firstName: "Test", lastName: "Owner", email: "test@example.com", phone: "0000000000", message: "A synthetic test enquiry", sourcePath: "/contact", startedAt: Date.now() - 10_000 };
const bot = await exports.POST(request({ ...valid, company: "honeypot" }));
assert.equal(bot.body.recorded, undefined);
assert.equal(inserts, 0);
const invalid = await exports.POST(request({ ...valid, email: "invalid" }));
assert.equal(invalid.status, 400);
assert.equal(invalid.body.recorded, undefined);
assert.equal(inserts, 0);
insertError = { message: "Database unavailable" };
const failed = await exports.POST(request(valid));
assert.equal(failed.status, 503);
assert.equal(failed.body.recorded, undefined);
insertError = null;
const saved = await exports.POST(request(valid));
assert.equal(saved.status, 200);
assert.equal(saved.body.recorded, true);
assert.equal(inserts, 2);
console.log("Contact checks passed: only successful database inserts are eligible for conversion tracking; no real leads submitted.");
