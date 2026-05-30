import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const API = "https://cordovaproperty.com/wp-json/wp/v2";

type WpItem = {
  id: number;
  slug: string;
  date?: string;
  modified?: string;
  link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  yoast_head_json?: {
    description?: string;
    og_image?: Array<{ url?: string }>;
  };
};

type StaticDoc = {
  id: number;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  image: string;
  sourceUrl: string;
  type: "page" | "post";
  date: string;
  modified: string;
};

async function fetchJson<T>(url: string): Promise<{ data: T; headers: Headers }> {
  const res = await fetch(url, {
    headers: {
      "user-agent": "cordova-next-static-import/1.0"
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return { data: (await res.json()) as T, headers: res.headers };
}

async function fetchAll(kind: "pages" | "posts"): Promise<WpItem[]> {
  const first = await fetchJson<WpItem[]>(`${API}/${kind}?per_page=100&page=1`);
  const pages = Number(first.headers.get("x-wp-totalpages") ?? "1");
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, pages - 1) }, (_, index) =>
      fetchJson<WpItem[]>(`${API}/${kind}?per_page=100&page=${index + 2}`).then((r) => r.data)
    )
  );

  return [first.data, ...rest].flat();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"');
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|h[1-6]|li|div|section|article)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim()
  );
}

function firstImage(html: string): string {
  const src = html.match(/(?:src|data-src)=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i)?.[1];
  return src?.replace(/\\\//g, "/") ?? "";
}

function toDoc(item: WpItem, type: "page" | "post"): StaticDoc {
  const content = stripHtml(item.content.rendered);
  const excerpt = stripHtml(item.excerpt?.rendered ?? content).slice(0, 260);
  const image = item.yoast_head_json?.og_image?.[0]?.url ?? firstImage(item.content.rendered);

  return {
    id: item.id,
    slug: item.slug === "top-property-management-in-dubai-cordova-experts" ? "" : item.slug,
    title: decodeEntities(stripHtml(item.title.rendered)),
    description: decodeEntities(item.yoast_head_json?.description ?? excerpt),
    excerpt,
    content,
    image,
    sourceUrl: item.link,
    type,
    date: item.date ?? "",
    modified: item.modified ?? ""
  };
}

async function main() {
  const [pages, posts] = await Promise.all([fetchAll("pages"), fetchAll("posts")]);
  const docs = [
    ...pages.map((page) => toDoc(page, "page" as const)),
    ...posts.map((post) => toDoc(post, "post" as const))
  ].filter((doc) => doc.title && doc.content);

  const outDir = path.join(process.cwd(), "src", "data");
  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "generated.ts"),
    `import type { StaticDoc } from "./types";\n\nexport const generatedDocs = ${JSON.stringify(docs, null, 2)} satisfies StaticDoc[];\n`,
    "utf8"
  );

  console.log(`Imported ${docs.length} Cordova documents (${pages.length} pages, ${posts.length} posts).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
