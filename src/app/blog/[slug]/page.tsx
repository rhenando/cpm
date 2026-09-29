import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { posts } from "@/data/site";
import { getSiteSettings } from "@/lib/cms";
import { getPublishedPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : []
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPublishedPostBySlug(slug),
    getSiteSettings()
  ]);
  if (!post) notFound();

  return <BlogArticle title={post.title} date={post.date} image={post.image} content={post.content} settings={settings} />;
}
