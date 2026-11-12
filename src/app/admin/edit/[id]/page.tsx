import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { mapPost } from "@/lib/posts";
import { EditPostForm } from "../../edit-post-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const { supabase, user } = await requireAdmin();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).eq("author_id", user.id).single();
  if (!post) notFound();
  const display = mapPost(post);
  return (
    <main className="bg-[#f1f0f3] py-14 text-[#191c33]">
      <div className="container max-w-4xl">
        <div className="flex flex-wrap justify-between gap-4 text-sm font-bold">
          <Link href="/admin">← Back to articles</Link>
          <Link href={`/admin/preview/${id}`} target="_blank" rel="noreferrer">Preview saved article ↗</Link>
        </div>
        <h1 className="mt-8 text-4xl font-extrabold">Edit article</h1>
        <p className="mt-4 leading-7">Update the image, article, or both. Changes to published articles go live when you save.</p>
        <p className="mt-3 text-sm text-[#242424]/60">
          Last saved: <time dateTime={post.updated_at}>{new Date(post.updated_at).toLocaleString("en-AE", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" })}</time> Dubai time. Visible to admins only.
        </p>
        <div className="mt-8 border-t-2 border-[#bd8f13] bg-white p-6 shadow-xl sm:p-10">
          {saved === "1" ? <p role="status" className="mb-7 bg-emerald-50 p-4 text-sm text-emerald-800">Changes saved successfully.</p> : null}
          <EditPostForm key={post.updated_at} post={{ id, title: display.title, content: display.content || "", excerpt: post.excerpt, image: display.image || "", updatedAt: post.updated_at }} />
        </div>
      </div>
    </main>
  );
}
