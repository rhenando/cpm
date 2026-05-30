import type { Metadata } from "next";
import Link from "next/link";
import { docHref, posts } from "@/data/site";

export const metadata: Metadata = {
  title: "News and Insights",
  description: "Cordova Property Management news and Dubai real estate insights."
};

export default function BlogPage() {
  return (
    <section className="section bg-[#f6f5f1]">
      <div className="container">
        <p className="eyebrow">News</p>
        <h1 className="mt-4 text-5xl font-extrabold text-[#191c33]">News and insights on Dubai real estate</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={docHref(post)} className="rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#bd8f13]">
                {post.date ? new Date(post.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }) : "Insight"}
              </p>
              <h2 className="mt-3 text-lg font-extrabold leading-snug text-[#191c33]">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#626473]">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
