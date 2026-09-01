import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/admin";
import { defaultSiteSettings, type SiteSettings } from "@/lib/cms";
import { saveSiteSettings } from "../cms-actions";

export const dynamic = "force-dynamic";

const fields: Array<{ key: keyof SiteSettings; label: string; type?: string }> = [
  { key: "address", label: "Office address" },
  { key: "phone", label: "Primary phone", type: "tel" },
  { key: "secondaryPhone", label: "Secondary phone", type: "tel" },
  { key: "email", label: "Contact email", type: "email" },
  { key: "footerHeading", label: "Footer call-to-action heading" },
  { key: "footerDescription", label: "Footer company description" },
  { key: "linkedin", label: "LinkedIn URL", type: "url" },
  { key: "facebook", label: "Facebook URL", type: "url" },
  { key: "youtube", label: "YouTube URL", type: "url" },
  { key: "instagram", label: "Instagram URL", type: "url" }
];

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("settings").eq("id", "main").maybeSingle();
  const settings = { ...defaultSiteSettings, ...(data?.settings as Partial<SiteSettings> | undefined) };
  const query = await searchParams;

  return (
    <main className="min-h-[calc(100svh-7rem)] bg-[#f1f0f3] py-12">
      <div className="container max-w-4xl">
        <AdminNav />
        <p className="eyebrow">Website administration</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#191c33]">Site settings</h1>
        <p className="mt-3 text-[#242424]/70">These details are shared by the website header and footer.</p>
        <form action={saveSiteSettings} className="mt-8 grid gap-5 bg-white p-6 shadow-xl sm:grid-cols-2 sm:p-10">
          {query.error ? <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">Settings could not be saved. Run the CMS database migration and try again.</p> : null}
          {query.success ? <p className="border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 sm:col-span-2">Settings saved.</p> : null}
          {fields.map((field) => (
            <label key={field.key} className={`grid gap-2 text-xs font-bold uppercase tracking-wider text-[#191c33] ${field.key === "footerDescription" ? "sm:col-span-2" : ""}`}>
              {field.label}
              {field.key === "footerDescription" ? (
                <textarea name={field.key} defaultValue={settings[field.key]} rows={4} className="border border-[#d3d3d3] p-3 text-base font-normal normal-case tracking-normal" />
              ) : (
                <input name={field.key} type={field.type || "text"} defaultValue={settings[field.key]} required className="min-h-12 border border-[#d3d3d3] px-3 text-base font-normal normal-case tracking-normal" />
              )}
            </label>
          ))}
          <button className="brand-button-primary min-h-12 rounded-[10px] border-2 px-6 text-sm font-black uppercase tracking-wider sm:col-span-2">Save site settings</button>
        </form>
      </div>
    </main>
  );
}
