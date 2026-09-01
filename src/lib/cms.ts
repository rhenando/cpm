import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";
import { defaultSiteSettings, type SiteSettings } from "@/data/site-settings";
export { defaultSiteSettings, type SiteSettings } from "@/data/site-settings";

function publicClient() {
  const { url, key } = getSupabaseConfig();
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return defaultSiteSettings;
  const { data } = await publicClient().from("site_settings").select("settings").eq("id", "main").maybeSingle();
  return { ...defaultSiteSettings, ...(data?.settings as Partial<SiteSettings> | undefined) };
}

export type PageOverride = { slug: string; title: string; description: string; content: string; image: string };

export async function getPageOverride(slug: string): Promise<PageOverride | null> {
  if (!isSupabaseConfigured()) return null;
  const { data } = await publicClient().from("page_overrides").select("slug,title,description,content,image").eq("slug", slug).maybeSingle();
  return data as PageOverride | null;
}
