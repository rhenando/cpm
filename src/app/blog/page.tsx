import { BlogIndex } from "@/components/blog-index";
import { getPublishedPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dubai Real Estate News and Insights",
  description: "Practical Dubai property management guidance, landlord resources, maintenance advice and real estate insights from Cordova.",
  path: "/blog"
});

export const revalidate = 3600;

export default async function BlogPage() {
  const articles = await getPublishedPosts();
  return <BlogIndex articles={articles} />;
}
