import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocContent } from "@/components/doc-content";
import { posts } from "@/data/site";
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
  const post = await getPublishedPostBySlug(slug);
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

        <footer className="news-article-footer">
          <strong>Professional Property Management Support</strong>
          <br />
          Cordova Property Management helps Dubai landlords protect property performance and long-term value.
          <br />
          <Link href="/contact" className="news-article-cta">Get Started Today</Link>
          <p>+971 58 628 7157 &nbsp; | &nbsp; +971 52 284 5716 &nbsp; | &nbsp; www.cordovaproperty.com</p>
        </footer>
      </div>
    </article>
  );
}
