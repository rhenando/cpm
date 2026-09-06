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

const postCorrections: Record<string, { title: string; image?: string; removeLeadingContent?: string }> = {
  "d1dc1747-6ea7-4f52-967e-b871e26474f5": {
    title: "Coordinating Cleaning, Repairs, and Listing Readiness Between Tenancies",
    removeLeadingContent: "Readiness Between Tenancies"
  },
  "5c6826cd-f287-42b1-91a9-417519fd4998": {
    title: "What Landlords Gain From a Clear Document Renewal Calendar",
    image: "/images/articles/2150225265.jpg",
    removeLeadingContent: "Renewal Calendar"
  },
  "df88458b-a577-4e9b-b70a-8f6907b24adb": {
    title: "How Drainage Checks Protect Terraces During Dust and Rain Events",
    removeLeadingContent: "Dust and Rain Events"
  },
  "cd0918f3-50ce-44e6-9828-1da944b1c8e3": {
    title: "How Unusual Water Usage Can Reveal Hidden Leaks",
    removeLeadingContent: "Leaks"
  }
};

function mapPost(row: PostRow): StaticDoc {
  const correction = postCorrections[row.id];
  const content = correction?.removeLeadingContent && row.content.trimStart().startsWith(correction.removeLeadingContent)
    ? row.content.trimStart().slice(correction.removeLeadingContent.length).trimStart()
    : row.content;
  return {
    id: row.id,
    slug: row.slug,
    title: correction?.title || row.title,
    description: row.excerpt,
    excerpt: row.excerpt,
    content,
    image: correction?.image || row.image_url,
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
