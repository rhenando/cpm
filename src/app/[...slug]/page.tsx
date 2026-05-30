import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { DocContent } from "@/components/doc-content";
import { LeadForm } from "@/components/lead-form";
import { docHref, docs, featuredProperties, getDocBySlug, pages } from "@/data/site";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return pages.filter((page) => page.slug).map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug.join("/"));
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      images: doc.image ? [doc.image] : []
    }
  };
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  const doc = getDocBySlug(path);
  if (!doc || doc.type === "post") notFound();

  if (path === "properties-for-rent-dubai") {
    return <PropertiesPage />;
  }

  if (path === "contact") {
    return <ContactPage doc={doc} />;
  }

  const related = docs
    .filter((item) => item.type === doc.type && item.slug && item.slug !== doc.slug)
    .slice(0, 3);

  return (
    <article>
      <section className="relative overflow-hidden bg-[#191c33] py-20 text-white md:py-28">
        {doc.image ? <Image src={doc.image} alt="" fill className="object-cover opacity-25" /> : null}
        <div className="container relative max-w-4xl">
          <p className="eyebrow">Cordova Property Management</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">{doc.title}</h1>
          <p className="mt-5 max-w-2xl text-white/75">{doc.description}</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1fr_340px]">
          <DocContent content={doc.content} />
          <aside className="h-fit rounded-lg bg-[#f6f5f1] p-6">
            <h2 className="text-xl font-extrabold text-[#191c33]">Talk to Cordova</h2>
            <p className="mt-3 text-sm leading-6 text-[#626473]">
              Share your property goals and a Cordova agent will respond.
            </p>
            <div className="mt-5">
              <LeadForm compact />
            </div>
          </aside>
        </div>
      </section>
      <section className="section bg-[#f6f5f1]">
        <div className="container">
          <p className="eyebrow">Explore more</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ButtonLink key={item.id} href={docHref(item)} variant="ghost" className="justify-between">
                {item.title}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function PropertiesPage() {
  return (
    <section className="section bg-[#f6f5f1]">
      <div className="container">
        <p className="eyebrow">Rentals</p>
        <h1 className="mt-4 text-3xl font-extrabold text-[#191c33] sm:text-5xl">Properties for rent Dubai</h1>
        <p className="mt-5 max-w-2xl leading-8 text-[#626473]">
          Professionally managed luxury residences in Dubai.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProperties.map((property) => (
            <article
              key={property.slug}
              className="overflow-hidden rounded-xl border border-[#e6e0d2] bg-white shadow-xl shadow-[#191c33]/5"
            >
              <Image
                src={property.image}
                alt={property.imageAlt}
                width={900}
                height={430}
                className="h-52 w-full object-cover sm:h-64"
              />
              <div className="p-5 md:p-6">
                <h2 className="text-xl font-extrabold leading-snug text-[#191c33]">
                  {property.title}
                </h2>
                <p className="mt-4 text-sm text-[#626473]">{property.location}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {property.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-[#f6f5f1] px-3 py-2 text-sm text-[#4f5263]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <ButtonLink href={`/${property.slug}`} className="mt-6">
                  View details
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage({ doc }: { doc: { title: string; description: string; content: string } }) {
  return (
    <section className="section bg-[#f6f5f1]">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-3xl font-extrabold text-[#191c33] sm:text-5xl">{doc.title}</h1>
          <p className="mt-5 leading-8 text-[#626473]">{doc.description}</p>
          <div className="mt-8 rounded-lg bg-white p-6">
            <DocContent content={doc.content} />
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-xl shadow-[#191c33]/10">
          <h2 className="text-xl font-extrabold text-[#191c33]">Reach out to us</h2>
          <p className="mt-2 text-sm leading-6 text-[#626473]">
            One of our agents will contact you after this local demo submission.
          </p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
