import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { docHref } from "@/data/site";
import type { StaticDoc } from "@/data/types";
import { absoluteUrl } from "@/lib/seo";

export const POSTS_PER_PAGE = 12;

function formatDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
    : "Insight";
}

function pageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogIndex({ articles, page = 1 }: { articles: StaticDoc[]; page?: number }) {
  const totalPages = Math.max(1, Math.ceil(articles.length / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  const currentArticles = articles.slice(start, start + POSTS_PER_PAGE);
  const featured = page === 1 ? currentArticles[0] : undefined;
  const cards = featured ? currentArticles.slice(1) : currentArticles;

  return (
    <main className="bg-white">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": absoluteUrl(pageHref(page)),
        url: absoluteUrl(pageHref(page)),
        name: page === 1 ? "Dubai Real Estate News and Insights" : `Dubai Real Estate Insights — Page ${page}`,
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: currentArticles.map((post, index) => ({
            "@type": "ListItem",
            position: start + index + 1,
            name: post.title,
            url: absoluteUrl(docHref(post))
          }))
        }
      }} />
      <section className="border-b border-[#d5d2db] bg-white py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-[#555069]">
            <span className="h-px w-12 bg-[#bd8f13]" /> Cordova journal
          </div>
          <div className="mt-7 grid items-end gap-8 lg:grid-cols-[1fr_0.58fr]">
            <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] text-[#191c33] sm:text-6xl md:text-7xl">
              News and insights on
              <span className="block font-normal text-[#555069]">Dubai real estate.</span>
            </h1>
            <p className="max-w-md border-l border-[#d5d2db] pl-6 font-normal leading-7 text-[#242424]/70 lg:mb-2">
              Practical guidance and perspectives for Dubai landlords, tenants and property investors.
            </p>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="bg-white py-16 md:py-24">
          <div className="container">
            <div className="mb-7 flex items-center justify-between border-b border-[#d3d3d3] pb-4">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#555069]">Featured insight</p>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#191c33]/45">Latest edition</span>
            </div>
            <Link href={docHref(featured)} className="group grid overflow-hidden border border-[#d5d2db] bg-white lg:grid-cols-[1.12fr_0.88fr]">
              <div className="relative min-h-[260px] overflow-hidden bg-[#f1f0f3] sm:min-h-[360px] md:min-h-[520px]">
                {featured.image ? <Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191c33]/15 via-transparent to-transparent" />
              </div>
              <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-14">
                <div className="absolute right-0 top-0 h-24 w-1 bg-[#bd8f13]" />
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#555069]">{formatDate(featured.date)}</p>
                <h2 className="mt-6 text-balance text-2xl font-medium leading-tight text-[#191c33] sm:text-4xl">{featured.title}</h2>
                <span className="mt-9 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#191c33]">Read the article <ArrowUpRight size={17} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden /></span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[#f1f0f3] bg-white py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{page === 1 ? "The latest" : `Archive page ${page}`}</p>
              <h2 className="mt-4 text-4xl font-medium text-[#191c33] sm:text-5xl">Property intelligence.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#242424]/60">Explore guidance and market perspectives from the Cordova team.</p>
          </div>

          <div className="mt-12 grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((post) => (
              <Link key={post.id} href={docHref(post)} className="group flex min-h-full flex-col overflow-hidden border border-[#d5d2db] bg-white transition duration-300 hover:border-[#afabb9] hover:shadow-[0_18px_45px_rgba(25,28,51,0.08)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f1f0f3]">
                  {post.image ? <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /> : <div className="absolute inset-0 bg-gradient-to-br from-white to-[#d5d2db]" />}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#191c33]/45 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.68rem] font-normal uppercase tracking-[0.14em] text-[#555069]">{formatDate(post.date)}</p>
                  <h3 className="mt-4 text-xl font-medium leading-snug text-[#191c33]">{post.title}</h3>
                  <span className="mt-auto flex items-center justify-between border-t border-[#d3d3d3] pt-5 text-xs font-medium uppercase tracking-[0.12em] text-[#191c33]">Read more <ArrowUpRight size={17} className="text-[#bd8f13] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden /></span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 ? (
            <nav aria-label="Blog pagination" className="mt-14 flex flex-wrap items-center justify-center gap-3 border-t border-[#d3d3d3] pt-8">
              {page > 1 ? <Link rel="prev" href={pageHref(page - 1)} className="inline-flex min-h-11 items-center gap-2 border border-[#d3d3d3] px-4 text-sm font-semibold text-[#191c33] hover:border-[#bd8f13]"><ArrowLeft size={16} aria-hidden /> Previous</Link> : null}
              <span className="px-3 text-sm text-[#242424]/65">Page {page} of {totalPages}</span>
              {page < totalPages ? <Link rel="next" href={pageHref(page + 1)} className="inline-flex min-h-11 items-center gap-2 border border-[#d3d3d3] px-4 text-sm font-semibold text-[#191c33] hover:border-[#bd8f13]">Next <ArrowRight size={16} aria-hidden /></Link> : null}
            </nav>
          ) : null}
        </div>
      </section>
    </main>
  );
}
