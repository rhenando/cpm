import "server-only";
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { StaticDoc } from "@/data/types";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";
import { cleanPostTitle } from "@/lib/post-title";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url: string;
  pdf_url?: string;
  published_at: string;
  updated_at: string;
};

const postCorrections: Record<string, { title: string; slug?: string; image?: string; removeLeadingContent?: string }> = {
  "d1dc1747-6ea7-4f52-967e-b871e26474f5": {
    title: "Coordinating Cleaning, Repairs, and Listing Readiness Between Tenancies",
    removeLeadingContent: "Readiness Between Tenancies"
  },
  "5c6826cd-f287-42b1-91a9-417519fd4998": {
    title: "What Landlords Gain From a Clear Document Renewal Calendar",
    image: "/images/optimized/article-document-calendar.webp",
    removeLeadingContent: "Renewal Calendar"
  },
  "df88458b-a577-4e9b-b70a-8f6907b24adb": {
    title: "How Drainage Checks Protect Terraces During Dust and Rain Events",
    removeLeadingContent: "Dust and Rain Events"
  },
  "cd0918f3-50ce-44e6-9828-1da944b1c8e3": {
    title: "How Unusual Water Usage Can Reveal Hidden Leaks",
    removeLeadingContent: "Leaks"
  },
  "061c2ef1-601e-4c40-ba9a-a7b38f1130f0": {
    title: "How Efficient Property Operations Increase Asset Value in Dubai",
    slug: "how-efficient-property-operations-increase-asset-value-in-dubai"
  }
};

const hiddenPostIds = new Set([
  "156c337d-5d06-4f8d-9d70-d0b86bc94a7f"
]);

const sourceSlugByPublicSlug: Record<string, string> = {
  "how-efficient-property-operations-increase-asset-value-in-dubai": "test"
};

function mapPost(row: PostRow): StaticDoc {
  const correction = postCorrections[row.id];
  const rawContent = row.content || "";
  const content = correction?.removeLeadingContent && rawContent.trimStart().startsWith(correction.removeLeadingContent)
    ? rawContent.trimStart().slice(correction.removeLeadingContent.length).trimStart()
    : rawContent;
  return {
    id: row.id,
    slug: correction?.slug || row.slug,
    title: correction?.title || cleanPostTitle(row.title),
    description: row.excerpt,
    excerpt: row.excerpt,
    content,
    image: correction?.image || row.image_url,
    sourceUrl: row.pdf_url || "",
    pdfUrl: row.pdf_url || "",
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
    .select("id,slug,title,excerpt,image_url,published_at,updated_at")
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Unable to load Supabase posts:", error.message);
    return [];
  }
  return (data as PostRow[]).filter((row) => !hiddenPostIds.has(row.id)).map(mapPost);
}

const getCachedPublishedPosts = unstable_cache(getSupabasePosts, ["published-post-summaries"], {
  revalidate: 3600,
  tags: ["posts"]
});

export async function getPublishedPosts(): Promise<StaticDoc[]> {
  return getCachedPublishedPosts();
}

const getPostBySlug = cache(async (slug: string): Promise<StaticDoc | undefined> => {
  if (!isSupabaseConfigured()) return undefined;
  const { url, key } = getSupabaseConfig();
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const sourceSlug = sourceSlugByPublicSlug[slug] || slug;
  const { data, error } = await supabase
    .from("posts")
    .select("id,slug,title,excerpt,content,image_url,pdf_url,published_at,updated_at")
    .eq("slug", sourceSlug)
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data || hiddenPostIds.has(data.id)) {
    if (error) console.error("Unable to load Supabase post:", error.message);
    return undefined;
  }
  return mapPost(data as PostRow);
});

export const getPublishedPostBySlug = getPostBySlug;
