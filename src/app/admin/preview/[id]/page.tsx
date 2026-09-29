import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { requireAdmin } from "@/lib/admin";
import { getSiteSettings } from "@/lib/cms";
import { cleanPostTitle } from "@/lib/post-title";

export const dynamic = "force-dynamic";

export default async function PostPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin();
  const [{ data: post }, settings] = await Promise.all([
    supabase
      .from("posts")
      .select("id,title,content,image_url,published_at")
      .eq("id", id)
      .eq("author_id", user.id)
      .single(),
    getSiteSettings()
  ]);

  if (!post) notFound();

  return (
    <>
      <div className="border-y border-[#bd8f13]/30 bg-[#fff8e5] px-4 py-3 text-[#191c33]">
        <div className="container flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Eye size={17} aria-hidden /> Private article preview
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider hover:text-[#bd8f13]">
            <ArrowLeft size={15} aria-hidden /> Back to uploads
          </Link>
        </div>
      </div>
      <BlogArticle
        title={cleanPostTitle(post.title)}
        date={post.published_at}
        image={post.image_url}
        content={post.content}
        settings={settings}
      />
    </>
  );
}
