import Image from "next/image";
import { BlogArticleCta } from "@/components/blog-article-cta";
import { DocContent } from "@/components/doc-content";
import type { SiteSettings } from "@/data/site-settings";

type BlogArticleProps = {
  title: string;
  date: string;
  image: string;
  content: string;
  settings: SiteSettings;
};

function formatDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
    : "Cordova insight";
}

export function BlogArticle({ title, date, image, content, settings }: BlogArticleProps) {
  return (
    <article className="news-article-page">
      <div className="news-article-container">
        <h1>{title}</h1>
        <div className="news-article-byline">
          By Cordova Property Management &bull; <time dateTime={date}>{formatDate(date)}</time>
        </div>

        {image ? (
          <Image
            src={image}
            alt={title}
            width={1340}
            height={580}
            priority
            unoptimized={image.includes(".supabase.co/")}
            sizes="(max-width: 800px) 88vw, 610px"
            className="news-article-image"
          />
        ) : null}

        <div className="news-article-main-text">
          <DocContent content={content} title={title} />
        </div>

        <BlogArticleCta settings={settings} />
      </div>
    </article>
  );
}
