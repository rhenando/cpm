import { redirect } from "next/navigation";
import { FileText, ImageIcon, LogOut, Upload } from "lucide-react";
import { logout, publishPost } from "./actions";
import { DeletePostButton } from "./delete-post-button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const messages: Record<string, string> = {
  "missing-files": "Select both a PDF and a featured image.",
  "invalid-pdf": "Use a valid PDF no larger than 4 MB.",
  "invalid-image": "Use a JPG, PNG or WebP image no larger than 5 MB.",
  "empty-pdf": "The PDF does not contain enough selectable text to create an article.",
  "invalid-date": "Choose a valid publication date and time.",
  "upload-failed": "The files could not be uploaded. Check the Supabase storage policies.",
  "publish-failed": "The article could not be saved. Check the Supabase posts policies.",
  "delete-failed": "The article could not be deleted. Please try again."
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { error, success } = await searchParams;
  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id,title,slug,published_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main className="min-h-[calc(100svh-7rem)] bg-[#f1f0f3] py-14 md:py-20">
      <div className="container max-w-4xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Cordova publishing</p>
            <h1 className="mt-4 text-4xl font-extrabold text-[#191c33] sm:text-5xl">Publish an article</h1>
            <p className="mt-4 max-w-xl leading-7 text-[#242424]/70">Upload the approved PDF and featured image. The title and web article are created automatically.</p>
          </div>
          <form action={logout}>
            <button className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[#191c33] hover:text-[#bd8f13]"><LogOut size={16} aria-hidden /> Sign out</button>
          </form>
        </div>

        <div className="mt-10 border-t-2 border-[#bd8f13] bg-white p-6 shadow-xl shadow-[#191c33]/10 sm:p-10">
          {error ? <p className="mb-7 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{messages[error] || "Publishing failed. Please try again."}</p> : null}
          {success === "scheduled" ? <p className="mb-7 border border-[#bd8f13]/30 bg-[#bd8f13]/10 px-4 py-3 text-sm font-semibold text-[#191c33]">Article uploaded and scheduled successfully.</p> : null}
          {success === "deleted" ? <p className="mb-7 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Article and uploaded files deleted successfully.</p> : null}
          <form action={publishPost} className="grid gap-7">
            <label className="group grid cursor-pointer gap-3 border border-[#d3d3d3] p-6 transition hover:border-[#bd8f13]">
              <span className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33]"><FileText className="text-[#bd8f13]" aria-hidden /> Article PDF</span>
              <span className="text-sm text-[#242424]/60">PDF with selectable text, maximum 4 MB.</span>
              <input name="pdf" type="file" accept="application/pdf,.pdf" required className="mt-2 block w-full text-sm file:mr-4 file:border-0 file:bg-[#191c33] file:px-4 file:py-3 file:font-bold file:text-white" />
            </label>
            <label className="group grid cursor-pointer gap-3 border border-[#d3d3d3] p-6 transition hover:border-[#bd8f13]">
              <span className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33]"><ImageIcon className="text-[#bd8f13]" aria-hidden /> Featured image</span>
              <span className="text-sm text-[#242424]/60">JPG, PNG or WebP, maximum 5 MB.</span>
              <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required className="mt-2 block w-full text-sm file:mr-4 file:border-0 file:bg-[#191c33] file:px-4 file:py-3 file:font-bold file:text-white" />
            </label>
            <label className="grid gap-3 border border-[#d3d3d3] p-6 text-sm font-extrabold uppercase tracking-wide text-[#191c33]">
              Publish date and time
              <span className="text-sm font-normal normal-case tracking-normal text-[#242424]/60">Leave empty to publish immediately. Scheduled times use Dubai time (UTC+4).</span>
              <input name="publishAt" type="datetime-local" className="min-h-12 border border-[#d3d3d3] bg-white px-4 font-normal normal-case tracking-normal outline-none focus:border-[#bd8f13] focus:ring-4 focus:ring-[#bd8f13]/10" />
            </label>
            <button className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#bd8f13] px-7 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ca8a04]"><Upload size={18} aria-hidden /> Upload and publish</button>
          </form>
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
