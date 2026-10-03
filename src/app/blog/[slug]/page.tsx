import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { JsonLd } from "@/components/json-ld";
import type { StaticDoc } from "@/data/types";
import { getSiteSettings } from "@/lib/cms";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";
import { absoluteUrl, breadcrumbJsonLd, DEFAULT_SOCIAL_IMAGE, makeMetaDescription, pageMetadata, SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image || undefined,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified
  });
}

function relatedPosts(current: StaticDoc, posts: StaticDoc[]) {
  const stopWords = new Set(["about", "after", "before", "dubai", "from", "how", "property", "the", "this", "what", "when", "with", "your"]);
  const tokens = new Set(current.title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3 && !stopWords.has(word)));
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({ post, score: post.title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => tokens.has(word)).length }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, 3)
    .map(({ post }) => post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings, posts] = await Promise.all([
    getPublishedPostBySlug(slug),
    getSiteSettings(),
    getPublishedPosts()
  ]);
  if (!post) notFound();

  const canonicalPath = `/blog/${post.slug}`;
  const image = post.image ? (post.image.startsWith("http") ? post.image : absoluteUrl(post.image)) : absoluteUrl(DEFAULT_SOCIAL_IMAGE);
  return (
    <>
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: post.title, path: canonicalPath }]),
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(canonicalPath)}#article`,
          mainEntityOfPage: absoluteUrl(canonicalPath),
          headline: post.title,
          description: makeMetaDescription(post.description, `Dubai property management insight from ${post.title}.`),
          image: [image],
          datePublished: post.date,
          dateModified: post.modified || post.date,
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en",
          isPartOf: { "@id": `${SITE_URL}/#website` }
        }
      ]} />
      <BlogArticle title={post.title} date={post.date} modified={post.modified} image={post.image} content={post.content} settings={settings} related={relatedPosts(post, posts)} />
    </>
  );
}
