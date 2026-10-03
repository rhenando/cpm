import type { MetadataRoute } from "next";
import { POSTS_PER_PAGE } from "@/components/blog-index";
import { pages } from "@/data/site";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

const excludedPageSlugs = new Set(["blog", "blog-list", "blog-old"]);
const teamSlugs = ["lesty-cordova", "rosewell-sangco", "carl-manalang"];

function validDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date("2026-10-03T00:00:00Z") : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug && !excludedPageSlugs.has(page.slug))
    .map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: validDate(page.modified || page.date)
    }));
  const teamEntries: MetadataRoute.Sitemap = teamSlugs.map((slug) => ({
    url: absoluteUrl(`/${slug}`),
    lastModified: new Date("2026-10-03T00:00:00Z")
  }));
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: validDate(post.modified || post.date)
  }));
  const totalBlogPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginationEntries: MetadataRoute.Sitemap = Array.from({ length: Math.max(0, totalBlogPages - 1) }, (_, index) => ({
    url: absoluteUrl(`/blog/page/${index + 2}`),
    lastModified: new Date()
  }));

  return [
    { url: absoluteUrl("/"), lastModified: new Date("2026-10-03T00:00:00Z") },
    { url: absoluteUrl("/blog"), lastModified: posts[0] ? validDate(posts[0].modified || posts[0].date) : new Date() },
    ...pageEntries,
    ...teamEntries,
    ...paginationEntries,
    ...postEntries
  ];
}
