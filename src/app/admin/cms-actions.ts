"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { defaultSiteSettings, type SiteSettings } from "@/lib/cms";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function saveSiteSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const settings = Object.fromEntries(
    Object.keys(defaultSiteSettings).map((key) => [key, value(formData, key)])
  ) as SiteSettings;
  const { error } = await supabase.from("site_settings").upsert({ id: "main", settings, updated_at: new Date().toISOString() });
  if (error) redirect("/admin/settings?error=save-failed");
  revalidatePath("/", "layout");
  redirect("/admin/settings?success=saved");
}

export async function savePage(formData: FormData) {
  const { supabase } = await requireAdmin();
  const slug = value(formData, "slug");
  if (!slug) redirect("/admin/pages?error=invalid-page");
  const { error } = await supabase.from("page_overrides").upsert({
    slug,
    title: value(formData, "title"),
    description: value(formData, "description"),
    content: value(formData, "content"),
    image: value(formData, "image"),
    updated_at: new Date().toISOString()
  });
  if (error) redirect(`/admin/pages/${encodeURIComponent(slug)}?error=save-failed`);
  revalidatePath(`/${slug}`);
  redirect(`/admin/pages/${encodeURIComponent(slug)}?success=saved`);
}
