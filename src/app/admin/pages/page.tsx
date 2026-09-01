import Link from "next/link";
import { AdminNav } from "@/components/admin-nav";
import { pages } from "@/data/site";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";
const customLayoutPages = new Set(["properties-for-rent-dubai", "contact", "about-cordova-property-management", "property-management"]);

export default async function PagesAdminPage() {
  await requireAdmin();
  const editablePages = pages.filter((page) => page.slug && page.slug !== "blog" && !customLayoutPages.has(page.slug));
  return (
    <main className="min-h-[calc(100svh-7rem)] bg-[#f1f0f3] py-12">
      <div className="container max-w-4xl">
        <AdminNav />
        <p className="eyebrow">Website administration</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#191c33]">Pages</h1>
        <p className="mt-3 text-[#242424]/70">Edit standard page titles, search descriptions, hero images, and body copy. Bespoke landing pages will be added as structured editors next.</p>
        <div className="mt-8 divide-y divide-[#d3d3d3] bg-white px-6 shadow-xl sm:px-10">
          {editablePages.map((page) => (
            <div key={page.slug} className="flex items-center justify-between gap-5 py-5">
              <div><p className="font-extrabold text-[#191c33]">{page.title}</p><p className="mt-1 text-xs text-[#242424]/55">/{page.slug}</p></div>
              <Link href={`/admin/pages/${page.slug}`} className="rounded-md border border-[#191c33] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#191c33] hover:bg-[#191c33] hover:text-white">Edit</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
