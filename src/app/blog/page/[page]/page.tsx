import { notFound } from "next/navigation";
import { BlogIndex, POSTS_PER_PAGE } from "@/components/blog-index";
import { getPublishedPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ page: string }> };

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);
  return pageMetadata({
    title: `Dubai Real Estate Insights — Page ${pageNumber}`,
    description: `Browse page ${pageNumber} of Cordova's Dubai property management and real estate insights for landlords, tenants and investors.`,
    path: `/blog/page/${pageNumber}`
  });
}

export default async function PaginatedBlogPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);
  const articles = await getPublishedPosts();
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) notFound();
  return <BlogIndex articles={articles} page={pageNumber} />;
}
