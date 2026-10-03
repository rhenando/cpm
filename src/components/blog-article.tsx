import Image from "next/image";
import Link from "next/link";
import { BlogArticleCta } from "@/components/blog-article-cta";
import { DocContent } from "@/components/doc-content";
import type { SiteSettings } from "@/data/site-settings";
import type { StaticDoc } from "@/data/types";

type BlogArticleProps = {
  title: string;
  date: string;
  modified: string;
  image: string;
  content: string;
  settings: SiteSettings;
  related: StaticDoc[];
};

function formatDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
    : "Cordova insight";
}

export function BlogArticle({ title, date, modified, image, content, settings, related }: BlogArticleProps) {
  const wasUpdated = modified && new Date(modified).getTime() > new Date(date).getTime() + 86_400_000;
  return (
    <article className="news-article-page">
      <div className="news-article-container">
        <h1>{title}</h1>
        <div className="news-article-byline">
          By <Link href="/about-cordova-property-management">Cordova Property Management</Link> &bull; Published <time dateTime={date}>{formatDate(date)}</time>
          {wasUpdated ? <> &bull; Updated <time dateTime={modified}>{formatDate(modified)}</time></> : null}
        </div>

        {image ? (
          <Image
            src={image}
            alt={title}
            width={1340}
            height={580}
            priority
            sizes="(max-width: 800px) 88vw, 610px"
            className="news-article-image"
          />
        ) : null}

        <div className="news-article-main-text">
          <DocContent content={content} title={title} />
        </div>

        <aside className="mt-10 border-l-4 border-[#bd8f13] bg-[#f7f5f0] p-6 text-sm leading-7 text-[#242424]/75">
          <p className="font-extrabold text-[#191c33]">Editorial responsibility</p>
          <p className="mt-2">Prepared by the Cordova Property Management team in Dubai. Regulatory, legal, tax and investment topics are general information only and should be checked against current official guidance or a qualified adviser.</p>
        </aside>

        {related.length ? (
          <section className="mt-12 border-t border-[#d3d3d3] pt-8" aria-labelledby="related-insights">
            <h2 id="related-insights" className="text-2xl font-extrabold text-[#191c33]">Related insights</h2>
            <div className="mt-5 grid gap-3">
              {related.map((post) => <Link key={post.id} href={`/blog/${post.slug}`} className="border border-[#d5d2db] px-5 py-4 font-semibold text-[#191c33] transition hover:border-[#bd8f13] hover:text-[#9a7410]">{post.title}</Link>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/property-management" className="text-sm font-bold text-[#191c33] underline decoration-[#bd8f13] underline-offset-4">Explore property management</Link>
              <Link href="/contact" className="text-sm font-bold text-[#191c33] underline decoration-[#bd8f13] underline-offset-4">Speak with the Dubai team</Link>
            </div>
          </section>
        ) : null}

        <BlogArticleCta settings={settings} />
      </div>
    </article>
  );
}
