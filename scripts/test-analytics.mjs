import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync("src/lib/analytics.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function load(id, pathname = "/contact", gtag) {
  const exports = {};
  const window = { location: { origin: "https://www.cordovaproperty.com", pathname, search: "?email=private@example.com" }, gtag };
  runInNewContext(compiled, { exports, process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: id } }, window });
  return exports;
}

const events = [];
const record = (...args) => events.push(args);
load("", "/contact", record).trackSavedEnquiry();
load("invalid", "/contact", record).trackSavedEnquiry();
load("G-TEST123", "/admin/login", record).trackSavedEnquiry();
load("G-TEST123", "/auth/callback", record).trackSavedEnquiry();
assert.equal(events.length, 0, "Disabled/invalid/private contexts must not track enquiries");
const analytics = load("G-TEST123", "/contact", record);
analytics.trackSavedEnquiry();
assert.equal(events.length, 1);
assert.equal(events[0][1], "generate_lead");
assert.equal(events[0][2].page_location, "https://www.cordovaproperty.com/contact");
assert.ok(!JSON.stringify(events).includes("private@example.com"));
assert.doesNotThrow(() => load("G-TEST123", "/contact", () => { throw new Error("Blocked"); }).trackSavedEnquiry());
assert.doesNotThrow(() => load("G-TEST123", "/contact").trackSavedEnquiry());
assert.equal(analytics.isPublicAnalyticsPath("/administrator-services"), true);
console.log("Analytics checks passed: disabled/private contexts, event payload, URL privacy, and blocked analytics.");
