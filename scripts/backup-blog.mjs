import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { copyFile, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const LIVE_SITE = "https://www.cordovaproperty.com";
const PAGE_SIZE = 1000;

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function parseOptions() {
  const values = new Map();
  let skipAssets = false;
  let skipPages = false;

  for (const argument of process.argv.slice(2)) {
    if (argument === "--skip-assets") {
      skipAssets = true;
      continue;
    }
    if (argument === "--skip-pages") {
      skipPages = true;
      continue;
    }

    const [key, ...rest] = argument.split("=");
    if (!key.startsWith("--") || rest.length === 0) throw new Error(`Unknown argument: ${argument}`);
    values.set(key.slice(2), rest.join("="));
  }

  return {
    output: path.resolve(values.get("output") ?? path.join("backups", `blog-${timestamp()}`)),
    site: (values.get("site") ?? LIVE_SITE).replace(/\/$/, ""),
    skipAssets,
    skipPages
  };
}

async function loadLocalEnvironment() {
  if (!existsSync(".env.local")) return;
  const contents = await readFile(".env.local", "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function request(url, init = {}, attempt = 1) {
  const headers = new Headers(init.headers);
  headers.set("user-agent", "cordova-blog-backup/1.0");
  const response = await fetch(url, { ...init, headers });
  if ((response.status === 429 || response.status >= 500) && attempt < 4) {
    await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    return request(url, init, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response;
}

async function fetchSupabasePosts() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !key) throw new Error("Supabase URL and publishable key are missing from .env.local.");

  const rows = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = new URL(`${supabaseUrl}/rest/v1/posts`);
    url.searchParams.set("select", "*");
    url.searchParams.set("published", "eq.true");
    url.searchParams.set("published_at", `lte.${new Date().toISOString()}`);
    url.searchParams.set("order", "published_at.desc");
    url.searchParams.set("limit", String(PAGE_SIZE));
    url.searchParams.set("offset", String(offset));
    const response = await request(url, {
      headers: { apikey: key, authorization: `Bearer ${key}`, accept: "application/json" }
    });
    const page = await response.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  return { supabaseUrl, rows };
}

async function readLegacyPosts() {
  const generated = await readFile(path.join("src", "data", "generated.ts"), "utf8");
  const match = generated.match(/export const generatedDocs = ([\s\S]*?) satisfies StaticDoc\[\];/);
  if (!match) throw new Error("Could not read the legacy article dataset from src/data/generated.ts.");
  return JSON.parse(match[1]).filter((item) => item.type === "post");
}

const localLegacyImages = {
  "Dubai-PropertyBlog4.webp": "/images/articles/Dubai-PropertyBlog4.jpg",
  "Dubai-Property1.jpg": "/images/articles/Dubai-PropertyBlog4.jpg",
  "Dubai-Property.jpg": "/images/articles/Dubai-PropertyBlog4.jpg",
  "Dubai-Property-Blog.jpg": "/images/articles/Dubai-Property-Blog.jpg",
  "modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg":
    "/images/articles/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg",
  "8981-300x200.jpg": "/images/articles/8981 (1).jpg"
};

function currentLegacyImage(item) {
  if (!/https:\/\/(?:cordovaproperty\.com|property\.breakout-website\.com)\/wp-content\//i.test(item.image)) {
    return item.image;
  }
  return localLegacyImages[item.image.split("/").pop() ?? ""] ?? "";
}

function normalizeArticles(supabaseRows, legacyRows) {
  const current = supabaseRows.map((row) => ({
    source: "supabase",
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    image_url: row.image_url ?? "",
    pdf_url: row.pdf_url ?? "",
    published_at: row.published_at,
    updated_at: row.updated_at,
    original: row
  }));
  const seen = new Set(current.map((item) => item.slug));
  const legacy = legacyRows
    .filter((item) => !seen.has(item.slug))
    .map((item) => ({
      source: "legacy-static",
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      image_url: currentLegacyImage(item),
      pdf_url: item.pdfUrl ?? "",
      published_at: item.date,
      updated_at: item.modified,
      legacy_source_url: item.sourceUrl,
      original: item
    }));
  return [...current, ...legacy].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

function safeName(value) {
  const cleaned = value
    .normalize("NFKD")
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 160);
  return cleaned || "untitled";
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function articleSlugs(html) {
  const found = new Set();
  const pattern = /href=["']\/blog\/([^"'?#]+)["']/g;
  for (const match of html.matchAll(pattern)) found.add(decodeURIComponent(match[1]));
  return [...found].sort();
}

async function runWorkers(values, worker, concurrency = 6) {
  const results = new Array(values.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, async () => {
      while (cursor < values.length) {
        const index = cursor++;
        results[index] = await worker(values[index], index);
      }
    })
  );
  return results;
}

async function backupLivePages(site, output, slugs) {
  const directory = path.join(output, "rendered-pages");
  await mkdir(directory, { recursive: true });
  return runWorkers(slugs, async (slug, index) => {
    const url = `${site}/blog/${encodeURIComponent(slug)}`;
    try {
      const response = await request(url, { headers: { accept: "text/html" } });
      const html = await response.text();
      const file = path.join(directory, `${safeName(slug)}.html`);
      await writeFile(file, html, "utf8");
      if ((index + 1) % 20 === 0 || index + 1 === slugs.length) {
        console.log(`Saved ${index + 1}/${slugs.length} rendered article pages...`);
      }
      return { slug, url, file: path.relative(output, file).replace(/\\/g, "/"), sha256: sha256(html) };
    } catch (error) {
      return { slug, url, error: error instanceof Error ? error.message : String(error) };
    }
  });
}

function collectRemoteAssets(articles, site) {
  const found = new Set();
  for (const article of articles) {
    for (const value of [article.image_url, article.pdf_url]) {
      if (!value || value.startsWith("/")) continue;
      try {
        found.add(new URL(value, site).toString());
      } catch {
        // The original value remains in the structured article backup.
      }
    }
  }
  return [...found].sort();
}

function collectLocalAssets(articles) {
  return [...new Set(articles.flatMap((article) => [article.image_url, article.pdf_url]))]
    .filter((value) => typeof value === "string" && value.startsWith("/"))
    .sort();
}

function remoteAssetPath(url, output) {
  const parsed = new URL(url);
  const originalName = parsed.pathname.split("/").filter(Boolean).pop() ?? "asset";
  const urlHash = sha256(url).slice(0, 16);
  return path.join(
    output,
    "assets",
    "remote",
    safeName(parsed.hostname),
    `${urlHash}-${safeName(decodeURIComponent(originalName)).slice(-100)}`
  );
}

async function backupRemoteAssets(urls, output) {
  return runWorkers(urls, async (url, index) => {
    try {
      const response = await request(url);
      const bytes = Buffer.from(await response.arrayBuffer());
      const file = remoteAssetPath(url, output);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, bytes);
      if ((index + 1) % 25 === 0 || index + 1 === urls.length) {
        console.log(`Saved ${index + 1}/${urls.length} remote article assets...`);
      }
      return {
        url,
        file: path.relative(output, file).replace(/\\/g, "/"),
        bytes: bytes.length,
        sha256: sha256(bytes),
        contentType: response.headers.get("content-type")
      };
    } catch (error) {
      return { url, error: error instanceof Error ? error.message : String(error) };
    }
  });
}

async function backupLocalAssets(urls, output) {
  const results = [];
  for (const url of urls) {
    const source = path.resolve("public", url.replace(/^\/+/, ""));
    const publicRoot = path.resolve("public");
    if (!source.startsWith(`${publicRoot}${path.sep}`) || !existsSync(source)) {
      results.push({ url, error: `Local public asset not found: ${source}` });
      continue;
    }
    const originalName = url.split("/").filter(Boolean).pop() ?? "asset";
    const destination = path.join(
      output,
      "assets",
      "local",
      `${sha256(url).slice(0, 16)}-${safeName(decodeURIComponent(originalName)).slice(-100)}`
    );
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(source, destination);
    const bytes = await readFile(destination);
    results.push({
      url,
      file: path.relative(output, destination).replace(/\\/g, "/"),
      bytes: bytes.length,
      sha256: sha256(bytes)
    });
  }
  return results;
}

async function main() {
  const options = parseOptions();
  if (existsSync(options.output)) throw new Error(`Output directory already exists: ${options.output}`);
  await loadLocalEnvironment();
  await mkdir(options.output, { recursive: true });
  const incompleteMarker = path.join(options.output, "INCOMPLETE");
  await writeFile(incompleteMarker, "This backup did not finish successfully.\n", "utf8");

  console.log("Fetching live blog catalogue...");
  const catalogueResponse = await request(`${options.site}/blog`, { headers: { accept: "text/html" } });
  const catalogueHtml = await catalogueResponse.text();
  await writeFile(path.join(options.output, "blog-index.html"), catalogueHtml, "utf8");
  const liveSlugs = articleSlugs(catalogueHtml);

  console.log("Exporting published Supabase posts...");
  const { supabaseUrl, rows: supabaseRows } = await fetchSupabasePosts();
  const legacyRows = await readLegacyPosts();
  const articles = normalizeArticles(supabaseRows, legacyRows);
  const normalizedSlugs = new Set(articles.map((article) => article.slug));
  const missingFromStructuredBackup = liveSlugs.filter((slug) => !normalizedSlugs.has(slug));
  const notListedOnLiveBlog = articles.map((article) => article.slug).filter((slug) => !liveSlugs.includes(slug));

  await mkdir(path.join(options.output, "sources"), { recursive: true });
  await mkdir(path.join(options.output, "articles"), { recursive: true });
  await writeFile(
    path.join(options.output, "sources", "supabase-posts.json"),
    `${JSON.stringify(supabaseRows, null, 2)}\n`,
    "utf8"
  );
  await writeFile(
    path.join(options.output, "sources", "legacy-posts.json"),
    `${JSON.stringify(legacyRows, null, 2)}\n`,
    "utf8"
  );
  await writeFile(path.join(options.output, "articles.json"), `${JSON.stringify(articles, null, 2)}\n`, "utf8");
  await writeFile(
    path.join(options.output, "articles.ndjson"),
    `${articles.map((article) => JSON.stringify(article)).join("\n")}\n`,
    "utf8"
  );
  for (const article of articles) {
    await writeFile(
      path.join(options.output, "articles", `${safeName(article.slug)}.json`),
      `${JSON.stringify(article, null, 2)}\n`,
      "utf8"
    );
  }

  const pages = options.skipPages ? [] : await backupLivePages(options.site, options.output, liveSlugs);
  const remoteUrls = collectRemoteAssets(articles, options.site);
  const localUrls = collectLocalAssets(articles);
  const remoteAssets = options.skipAssets ? [] : await backupRemoteAssets(remoteUrls, options.output);
  const localAssets = options.skipAssets ? [] : await backupLocalAssets(localUrls, options.output);
  const failedPages = pages.filter((item) => item.error);
  const failedAssets = [...remoteAssets, ...localAssets].filter((item) => item.error);

  const manifest = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    liveBlog: `${options.site}/blog`,
    supabaseHost: new URL(supabaseUrl).host,
    counts: {
      liveArticleUrls: liveSlugs.length,
      supabasePosts: supabaseRows.length,
      legacyPostsBeforeDeduplication: legacyRows.length,
      normalizedArticles: articles.length,
      renderedPagesSaved: pages.filter((item) => !item.error).length,
      assetsSaved: [...remoteAssets, ...localAssets].filter((item) => !item.error).length
    },
    verification: {
      missingFromStructuredBackup,
      notListedOnLiveBlog,
      failedPages,
      failedAssets
    },
    pages,
    assets: [...remoteAssets, ...localAssets]
  };
  await writeFile(path.join(options.output, "backup-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await unlink(incompleteMarker);

  console.log(`Backup complete: ${options.output}`);
  console.log(
    `Saved ${articles.length} structured articles, ${manifest.counts.renderedPagesSaved} pages, and ${manifest.counts.assetsSaved} assets.`
  );
  if (missingFromStructuredBackup.length || failedPages.length || failedAssets.length) {
    console.warn("The backup completed with verification warnings. Check backup-manifest.json.");
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
