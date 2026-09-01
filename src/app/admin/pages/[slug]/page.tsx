import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";
import { getDocBySlug } from "@/data/site";
import { requireAdmin } from "@/lib/admin";
import type { PageOverride } from "@/lib/cms";
import { savePage } from "../../cms-actions";

export const dynamic = "force-dynamic";
const customLayoutPages = new Set(["properties-for-rent-dubai", "contact", "about-cordova-property-management", "property-management"]);

export default async function EditPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ error?: string; success?: string }> }) {
  const { slug } = await params;
  const source = getDocBySlug(slug);
  if (!source || source.type !== "page" || customLayoutPages.has(slug)) notFound();
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("page_overrides").select("slug,title,description,content,image").eq("slug", slug).maybeSingle();
  const override = data as PageOverride | null;
  const page = { ...source, ...(override || {}) };
  const query = await searchParams;

  return (
    <main className="min-h-[calc(100svh-7rem)] bg-[#f1f0f3] py-12">
      <div className="container max-w-4xl">
        <AdminNav />
        <p className="eyebrow">Page editor</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#191c33]">{page.title}</h1>
        <form action={savePage} className="mt-8 grid gap-6 bg-white p-6 shadow-xl sm:p-10">
          <input type="hidden" name="slug" value={slug} />
          {query.error ? <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">Page could not be saved. Run the CMS database migration and try again.</p> : null}
          {query.success ? <p className="border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Page saved and published.</p> : null}
          <Field label="Page title" name="title" value={page.title} />
          <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[#191c33]">Description / SEO description<textarea name="description" required rows={3} defaultValue={page.description} className="border border-[#d3d3d3] p-3 text-base font-normal normal-case tracking-normal" /></label>
          <Field label="Hero image URL" name="image" value={page.image} type="url" />
          <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[#191c33]">Page content<textarea name="content" required rows={18} defaultValue={page.content} className="border border-[#d3d3d3] p-3 font-mono text-sm font-normal normal-case tracking-normal" /></label>
          <div className="flex flex-wrap gap-3"><button className="brand-button-primary min-h-12 rounded-[10px] border-2 px-6 text-sm font-black uppercase tracking-wider">Save and publish</button><a href={`/${slug}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-[10px] border border-[#191c33] px-6 text-sm font-bold text-[#191c33]">View page</a></div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, name, value, type = "text" }: { label: string; name: string; value: string; type?: string }) {
  return <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[#191c33]">{label}<input name={name} type={type} required defaultValue={value} className="min-h-12 border border-[#d3d3d3] px-3 text-base font-normal normal-case tracking-normal" /></label>;
}
