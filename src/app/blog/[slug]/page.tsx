import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogArticleCta } from "@/components/blog-article-cta";
import { DocContent } from "@/components/doc-content";
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

function formatDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
    : "Cordova insight";
}

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

  return (
    <article className="news-article-page">
      <div className="news-article-container">
        <h1>{post.title}</h1>
        <div className="news-article-byline">
          By Cordova Property Management &bull; <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={1340}
            height={580}
            priority
            sizes="(max-width: 800px) 88vw, 610px"
            className="news-article-image"
          />
        ) : null}

        <div className="news-article-main-text">
          <DocContent content={post.content} title={post.title} />
        </div>

        <BlogArticleCta settings={settings} />
      </div>
    </article>
  );
}
