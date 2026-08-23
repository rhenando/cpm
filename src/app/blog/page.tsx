import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { docHref } from "@/data/site";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News and Insights",
  description: "Cordova Property Management news and Dubai real estate insights."
};

function formatDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
    : "Insight";
}

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await getPublishedPosts();
  const featured = articles[0];

  return (
    <main className="bg-[#f7f8f9]">
      <section className="relative overflow-hidden bg-[#191c33] py-20 text-white md:py-28">
        <div className="absolute -right-32 -top-48 h-[520px] w-[520px] rounded-full border border-[#bd8f13]/20" />
        <div className="absolute -right-16 -top-24 h-[360px] w-[360px] rounded-full border border-[#bd8f13]/10" />
        <div className="container relative">
          <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#bd8f13]">
            <span className="h-px w-12 bg-[#bd8f13]" /> Cordova journal
          </div>
          <div className="mt-7 grid items-end gap-8 lg:grid-cols-[1fr_0.58fr]">
            <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-7xl">
              News and insights on
              <span className="block font-serif font-normal italic text-[#bd8f13]">Dubai real estate.</span>
            </h1>
            <p className="max-w-md border-l border-[#bd8f13]/60 pl-6 leading-7 text-white/65 lg:mb-2">
              Stay informed with the latest developments, practical guidance and perspectives from Dubai&apos;s property market.
            </p>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="bg-white py-16 md:py-24">
          <div className="container">
            <div className="mb-7 flex items-center justify-between border-b border-[#d3d3d3] pb-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#bd8f13]">Featured insight</p>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#191c33]/45">Latest edition</span>
            </div>
            <Link href={docHref(featured)} className="group grid overflow-hidden bg-[#191c33] text-white lg:grid-cols-[1.12fr_0.88fr]">
              <div className="relative min-h-[360px] overflow-hidden bg-[#242424] md:min-h-[520px]">
                {featured.image ? (
                  <Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191c33]/45 via-transparent to-transparent" />
              </div>
              <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-14">
                <div className="absolute right-0 top-0 h-24 w-1 bg-[#bd8f13]" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd8f13]">{formatDate(featured.date)}</p>
                <h2 className="mt-6 text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl">{featured.title}</h2>
                <span className="mt-9 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#bd8f13]">
                  Read the article
                  <ArrowUpRight size={17} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">The latest</p>
              <h2 className="mt-4 text-4xl font-extrabold text-[#191c33] sm:text-5xl">Property intelligence.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#242424]/60">Explore guidance and market perspectives from the Cordova team.</p>
          </div>

          <div className="mt-12 grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <Link key={post.id} href={docHref(post)} className="group flex min-h-full flex-col overflow-hidden border border-[#d3d3d3] bg-white transition duration-300 hover:-translate-y-1.5 hover:border-[#bd8f13] hover:shadow-[0_22px_50px_rgba(25,28,51,0.13)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#191c33]">
                  {post.image ? (
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#bd8f13_0%,#191c33_42%)] opacity-70" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#191c33]/45 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#bd8f13]">{formatDate(post.date)}</p>
                  <h3 className="mt-4 text-xl font-extrabold leading-snug text-[#191c33]">{post.title}</h3>
                  <span className="mt-auto flex items-center justify-between border-t border-[#d3d3d3] pt-5 text-xs font-extrabold uppercase tracking-[0.15em] text-[#191c33]">
                    Read more
                    <ArrowUpRight size={17} className="text-[#bd8f13] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
