import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "./actions";
import { DeletePostButton } from "./delete-post-button";
import { UploadPostForm } from "./upload-post-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

const messages: Record<string, string> = {
  "missing-files": "Select both a PDF and a featured image.",
  "file-count-mismatch": "Select the same number of PDFs and featured images. Files are paired by selection order.",
  "batch-too-large": "Publish no more than 8 articles in one batch.",
  "batch-partial": "Part of the batch was published before a later article failed. Review Recent uploads before retrying the remaining files.",
  "invalid-pdf": "Use a valid PDF no larger than 2.5 MB.",
  "invalid-image": "Use a JPG, PNG or WebP image no larger than 1.25 MB.",
  "files-too-large": "The PDF and image must be no larger than 3.75 MB combined.",
  "empty-pdf": "The PDF does not contain enough selectable text to create an article.",
  "pdf-processing-failed": "The PDF could not be read. Export it again as a text-based PDF and retry.",
  "invalid-date": "Choose a valid publication date and time.",
  "upload-failed": "The files could not be uploaded. Check the Supabase storage policies.",
  "publish-failed": "The article could not be saved. Check the Supabase posts policies.",
  "delete-failed": "The article could not be deleted. Please try again.",
  "delete-assets-failed": "The article was deleted, but its uploaded files could not be removed. Check Supabase Storage."
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string; count?: string }> }) {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const { supabase, user } = await requireAdmin();
  const { error, success, count } = await searchParams;
  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id,title,slug,published_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main className="min-h-[calc(100svh-7rem)] bg-[#f1f0f3] py-14 md:py-20">
      <div className="container max-w-4xl">
        <AdminNav />
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Cordova publishing</p>
            <h1 className="mt-4 text-4xl font-extrabold text-[#191c33] sm:text-5xl">Publish articles</h1>
            <p className="mt-4 max-w-xl leading-7 text-[#242424]/70">Upload one article or a batch of matching PDFs and featured images. Titles and web articles are created automatically.</p>
          </div>
          <form action={logout}>
            <button className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[#191c33] hover:text-[#bd8f13]"><LogOut size={16} aria-hidden /> Sign out</button>
          </form>
        </div>

        <div className="mt-10 border-t-2 border-[#bd8f13] bg-white p-6 shadow-xl shadow-[#191c33]/10 sm:p-10">
          {error ? <p className="mb-7 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{messages[error] || "Publishing failed. Please try again."}</p> : null}
          {success === "scheduled" ? <p className="mb-7 border border-[#bd8f13]/30 bg-[#bd8f13]/10 px-4 py-3 text-sm font-semibold text-[#191c33]">Article uploaded and scheduled successfully.</p> : null}
          {success === "batch-published" ? <p className="mb-7 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{count} articles published successfully.</p> : null}
          {success === "batch-scheduled" ? <p className="mb-7 border border-[#bd8f13]/30 bg-[#bd8f13]/10 px-4 py-3 text-sm font-semibold text-[#191c33]">{count} articles uploaded and scheduled successfully.</p> : null}
          {success === "deleted" ? <p className="mb-7 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Article and uploaded files deleted successfully.</p> : null}
          <UploadPostForm />
        </div>

        <section className="mt-10 bg-white p-6 shadow-xl shadow-[#191c33]/5 sm:p-10">
          <h2 className="text-2xl font-extrabold text-[#191c33]">Recent uploads</h2>
          <div className="mt-6 divide-y divide-[#d3d3d3]">
            {recentPosts?.length ? recentPosts.map((post) => {
              const scheduled = new Date(post.published_at).getTime() > Date.now();
              return (
                <div key={post.id} className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-extrabold text-[#191c33]">{post.title}</p>
                    <p className="mt-1 text-xs text-[#242424]/60">
                      {new Date(post.published_at).toLocaleString("en-AE", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" })} Dubai time
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-fit px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider ${scheduled ? "bg-[#bd8f13]/10 text-[#9f7410]" : "bg-emerald-50 text-emerald-700"}`}>
                      {scheduled ? "Scheduled" : "Published"}
                    </span>
                    <DeletePostButton id={post.id} title={post.title} />
                  </div>
                </div>
              );
            }) : <p className="py-5 text-sm text-[#242424]/60">No Supabase uploads yet.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
