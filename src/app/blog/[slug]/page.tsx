import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DocContent } from "@/components/doc-content";
import { posts } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
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
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <section className="bg-[#191c33] py-16 text-white md:py-24">
        <div className="container max-w-4xl">
          <p className="eyebrow">Insight</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-white/72">{post.description}</p>
        </div>
      </section>
      {post.image ? (
        <div className="container -mt-10">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={620}
            className="aspect-[16/7] w-full rounded-lg object-cover shadow-xl"
          />
        </div>
      ) : null}
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <DocContent content={post.content} />
        </div>
      </section>
    </article>
  );
}
