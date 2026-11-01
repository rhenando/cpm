import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const source = readFileSync("src/components/doc-content.tsx", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const exports = {};
runInNewContext(compiled, { exports, require: createRequire(import.meta.url) });
const render = (content, title) => renderToStaticMarkup(createElement(exports.DocContent, { content, title }));

const screenshot = render([
  "Repeated Issues Deserve a Second Look",
  "Frequent AC call-outs, recurring moisture marks, repeated drain blockages, door",
  "adjustments, or ongoing appliance faults should not automatically be treated as",
  "unrelated incidents.",
  "",
  "When the same issue returns, review previous reports",
  "and ask whether the underlying cause was actually",
  "addressed.",
].join("\n"));
assert.ok(screenshot.includes("<h2>Repeated Issues Deserve a Second Look</h2>"));
assert.ok(screenshot.includes("<p>When the same issue returns, review previous reports and ask whether the underlying cause was actually addressed.</p>"));
assert.equal((screenshot.match(/<h2>/g) || []).length, 1);

for (const start of ["How", "Why", "What", "When", "Where", "Common", "Key", "The importance", "Benefits", "Warning signs", "Best practices"]) {
  assert.equal(render(`${start} ordinary body text continues onto\nthe next PDF line.`),
    `<div class="prose-doc"><p>${start} ordinary body text continues onto the next PDF line.</p></div>`);
}

const sections = render("Article Title\nIntroduction\nOpening paragraph.\nHow Regular Maintenance Protects Your Property\nBody text.\nRoutine Checks\nMore text.\nConclusion\nClosing text.", "Article Title");
assert.ok(!sections.includes("Article Title"));
assert.ok(sections.includes("<h2>Introduction</h2>"));
assert.ok(sections.includes("<h2>How Regular Maintenance Protects Your Property</h2>"));
assert.ok(sections.includes("<h3>Routine Checks</h3>"));
assert.ok(sections.includes("<h2>Conclusion</h2>"));
assert.ok(render("Checks\n• Inspect drains\n• Check seals").includes("<ul><li>Inspect drains</li><li>Check seals</li></ul>"));
console.log("Document formatting checks passed: screenshot regression, wrapped sentences, section headings, title removal, and bullets.");
