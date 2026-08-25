import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, FileText } from "lucide-react";
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
    <article className="bg-[#f7f8f9]">
      <section className="relative isolate overflow-hidden bg-[#191c33] text-white">
        <div className="absolute -left-48 -top-48 -z-10 h-[520px] w-[520px] rounded-full border border-[#bd8f13]/15" />
        <div className="container grid items-stretch lg:min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center py-12 pr-0 sm:py-16 lg:py-24 lg:pr-16">
            <Link href="/blog" className="group inline-flex w-fit items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em]">
              <ArrowLeft size={16} className="text-[#bd8f13] transition group-hover:-translate-x-1" aria-hidden />
              <span className="text-[#bd8f13]">Back to the journal</span>
            </Link>
            <div className="mt-10 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/55">
              <span className="h-px w-10 bg-[#bd8f13]" />
              Insight
            </div>
            <h1 className="mt-6 text-balance text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl xl:text-6xl">
              {post.title}
            </h1>
            <div className="mt-8 flex items-center gap-3 text-sm text-white/55">
              <CalendarDays size={17} className="text-[#bd8f13]" aria-hidden />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </div>

          <div className="relative min-h-[280px] border-t border-[#bd8f13]/25 sm:min-h-[380px] lg:min-h-full lg:border-l lg:border-t-0">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#bd8f13_0%,#191c33_58%)] opacity-60" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#191c33]/45 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 h-28 w-1 bg-[#bd8f13]" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid items-start gap-10 lg:grid-cols-[minmax(0,760px)_230px] lg:justify-center lg:gap-16">
          <aside className="border-t-2 border-[#bd8f13] bg-[#191c33] p-6 text-white shadow-xl shadow-[#191c33]/10 lg:order-2 lg:sticky lg:top-32">
            <FileText size={24} className="text-[#bd8f13]" strokeWidth={1.5} aria-hidden />
            <p className="mt-6 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#bd8f13]">Published</p>
            <p className="mt-2 text-sm leading-6 text-white/70">{formatDate(post.date)}</p>
            <div className="my-6 h-px bg-white/15" />
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#bd8f13]">Reading</p>
            <p className="mt-2 text-sm leading-6 text-white/70">Cordova property insight</p>
          </aside>

          <div className="article-prose border-t border-[#bd8f13] bg-white px-5 py-9 shadow-[0_24px_70px_rgba(25,28,51,0.08)] sm:px-10 md:px-14 md:py-14 lg:order-1">
            <DocContent content={post.content} title={post.title} />
            <div className="article-contact-panel mt-14 text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#bd8f13]">Professional property support</p>
              <h2 className="mx-auto mt-3 max-w-xl font-serif text-2xl font-medium leading-tight text-white sm:text-3xl">
                Protect and grow your property investment with Cordova.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">
                Speak with our Dubai property management team for attentive support tailored to your portfolio.
              </p>
              <Link href="/contact" className="brand-button-primary mt-7 inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 px-7 py-3 text-xs font-black uppercase tracking-[0.1em] transition">
                Get started today
              </Link>
              <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/65">
                <a href="tel:+971586287157" className="transition hover:text-[#bd8f13]">+971 58 628 7157</a>
                <span className="hidden text-[#bd8f13]/60 sm:inline">|</span>
                <a href="tel:+971522845716" className="transition hover:text-[#bd8f13]">+971 52 284 5716</a>
                <span className="hidden text-[#bd8f13]/60 sm:inline">|</span>
                <a href="https://www.cordovaproperty.com" target="_blank" rel="noreferrer" className="transition hover:text-[#bd8f13]">
                  www.cordovaproperty.com
                </a>
              </div>
            </div>
            <div className="mt-14 border-t border-[#d3d3d3] pt-8">
              <Link href="/blog" className="group flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#191c33]">Return to all insights</span>
                <ArrowUpRight size={19} className="text-[#bd8f13] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
