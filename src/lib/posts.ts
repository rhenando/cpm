import "server-only";
import { createClient } from "@supabase/supabase-js";
import { posts as importedPosts } from "@/data/site";
import type { StaticDoc } from "@/data/types";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  pdf_url: string;
  published_at: string;
  updated_at: string;
};

function mapPost(row: PostRow): StaticDoc {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.excerpt,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image_url,
    sourceUrl: row.pdf_url,
    pdfUrl: row.pdf_url,
    type: "post",
    date: row.published_at,
    modified: row.updated_at
  };
}

async function getSupabasePosts() {
  if (!isSupabaseConfigured()) return [];
  const { url, key } = getSupabaseConfig();
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("posts")
    .select("id,slug,title,excerpt,content,image_url,pdf_url,published_at,updated_at")
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Unable to load Supabase posts:", error.message);
    return [];
  }
  return (data as PostRow[]).map(mapPost);
}

export async function getPublishedPosts(): Promise<StaticDoc[]> {
  const supabasePosts = await getSupabasePosts();
  const seen = new Set(supabasePosts.map((post) => post.slug));
  return [...supabasePosts, ...importedPosts.filter((post) => !seen.has(post.slug))].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPublishedPostBySlug(slug: string): Promise<StaticDoc | undefined> {
  const allPosts = await getPublishedPosts();
  return allPosts.find((post) => post.slug === slug);
}
