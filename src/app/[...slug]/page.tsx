import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { DocContent } from "@/components/doc-content";
import { LeadForm } from "@/components/lead-form";
import { docHref, docs, featuredProperties, getDocBySlug, pages } from "@/data/site";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return pages
    .filter((page) => page.slug && page.slug !== "blog")
    .map((page) => ({ slug: page.slug.split("/") }));
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

  if (path === "about-cordova-property-management") {
    return <AboutPage />;
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
          <aside className="h-fit rounded-lg bg-[#f1f0f3] p-6">
            <h2 className="text-xl font-extrabold text-[#191c33]">Talk to Cordova</h2>
            <p className="mt-3 text-sm leading-6 text-[#242424]">
              Share your property goals and a Cordova agent will respond.
            </p>
            <div className="mt-5">
              <LeadForm compact />
            </div>
          </aside>
        </div>
      </section>
      <section className="section bg-[#f1f0f3]">
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

const team = [
  {
    name: "Lesty Cordova",
    role: "CEO",
    image: "https://cordovaproperty.com/wp-content/uploads/2025/05/Artboard-1.webp",
    href: ""
  },
  {
    name: "Christine Cabezas",
    role: "Head of Administration",
    image: "https://cordovaproperty.com/wp-content/uploads/2026/08/cris4-scaled.jpg",
    href: "/cristine-cabezas"
  },
  {
    name: "Mamerto Adao",
    role: "Facilities Inspection Officer",
    image: "https://cordovaproperty.com/wp-content/uploads/2026/08/mame-scaled.jpg",
    href: "/mamerto-adao"
  },
  {
    name: "Mary Joy Mendoza",
    role: "FM Operations Manager",
    image: "https://cordovaproperty.com/wp-content/uploads/2026/08/joy1-scaled.jpg",
    href: "/mary-joy-mendoza"
  },
  {
    name: "William Galang",
    role: "Senior Property Manager",
    image: "https://cordovaproperty.com/wp-content/uploads/2026/08/will-scaled.jpg",
    href: "/william-galang"
  },
  {
    name: "Rosewell Sangco",
    role: "Property Manager",
    image: "https://cordovaproperty.com/wp-content/uploads/2026/08/rose1-scaled.jpg",
    href: ""
  },
  {
    name: "Carl Manalang",
    role: "Property Manager",
    image: "https://cordovaproperty.com/wp-content/uploads/2026/08/car-scaled.jpg",
    href: ""
  }
];

function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[680px] bg-[#191c33] text-white md:min-h-[760px]">
        <Image
          src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property1.jpg"
          alt="Luxury property overlooking the Dubai skyline"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191c33] via-[#191c33]/85 to-[#191c33]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c33] via-transparent to-transparent" />
        <div className="container relative flex min-h-[680px] items-center py-24 md:min-h-[760px]">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#bd8f13]">
              <span className="h-px w-12 bg-[#bd8f13]" />
              About Cordova
            </div>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Property care,
              <span className="block font-light italic text-[#bd8f13]">elevated.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 md:text-lg">
              A luxury property management company in Dubai, built around personal service,
              exacting standards and complete peace of mind.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Speak with our team</ButtonLink>
              <ButtonLink href="/property-management" variant="ghost" className="border-white/40 text-white hover:border-[#bd8f13]">
                Discover our services
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden w-[38%] border-l border-[#bd8f13]/40 bg-[#191c33]/90 px-10 py-7 backdrop-blur-sm lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#bd8f13]">Dubai, United Arab Emirates</p>
          <p className="mt-2 text-sm text-white/65">Private service. Professional oversight. Enduring value.</p>
        </div>
      </section>

      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#f7f8f9] py-14 lg:h-[100svh] lg:min-h-[700px] lg:py-10">
        <div className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#bd8f13]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-1/2 bg-gradient-to-tl from-[#e9dfcd]/80 to-transparent" />
        <div className="container grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="relative max-w-xl">
            <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.26em] text-[#bd8f13]">
              <span className="h-px w-12 bg-[#bd8f13]" />
              Our story
            </div>
            <h2 className="mt-6 text-5xl font-extrabold leading-[0.95] text-[#191c33] sm:text-6xl md:text-7xl">
              About
              <span className="ml-3 font-serif font-normal italic text-[#bd8f13] sm:ml-4">Us</span>
            </h2>
            <div className="mt-7 h-px w-full bg-gradient-to-r from-[#bd8f13] via-[#bd8f13]/25 to-transparent" />
            <p className="mt-7 text-base leading-7 text-[#191c33]/85 xl:text-[1.05rem] xl:leading-8">
              Cordova Properties is a luxury property management company based in Dubai,
              dedicated to providing exceptional services for both property owners and tenants.
              Our goal is to elevate the property management experience through unparalleled
              luxury, professionalism, and attention to detail.
            </p>
            <p className="mt-5 text-base leading-7 text-[#242424]/75 xl:text-[1.05rem] xl:leading-8">
              Our comprehensive management packages include everything from detailed financial
              reporting to bespoke maintenance services, ensuring your property remains in
              pristine condition. We take care of all the complexities, allowing you to enjoy the
              benefits of owning and leasing a luxury property without any of the hassle.
            </p>
            <ButtonLink href="/property-management" className="mt-8 min-w-52 shadow-lg shadow-[#bd8f13]/20">
              Know more
            </ButtonLink>
          </div>

          <div className="relative mx-auto h-[52svh] min-h-[390px] w-full max-w-[650px] lg:h-[68svh] lg:max-h-[660px]" aria-label="Cordova managed properties">
            <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-[#bd8f13] to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-2/3 bg-gradient-to-l from-[#bd8f13] to-transparent" />
            <div className="grid h-full grid-cols-4 gap-2.5 sm:gap-4">
              <div className="group relative my-12 overflow-hidden bg-[#d8d1c3] shadow-xl shadow-[#191c33]/15 sm:my-16">
                <Image
                  src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property1.jpg"
                  alt="Dubai skyline at sunset"
                  fill
                  sizes="(max-width: 1024px) 24vw, 150px"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
              </div>
              <div className="group relative mb-20 overflow-hidden bg-[#d8d1c3] shadow-xl shadow-[#191c33]/15 sm:mb-24">
                <Image
                  src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property2.jpg"
                  alt="Property keys overlooking Dubai"
                  fill
                  sizes="(max-width: 1024px) 24vw, 150px"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
              </div>
              <div className="group relative mt-20 overflow-hidden bg-[#d8d1c3] shadow-xl shadow-[#191c33]/15 sm:mt-24">
                <Image
                  src="https://cordovaproperty.com/wp-content/uploads/elementor/thumbs/Dubai-Property4-qpi9vazc7cemwh5pe08jmac1mfpqyhni8yl9ulrav8.jpg"
                  alt="Luxury bedroom interior"
                  fill
                  sizes="(max-width: 1024px) 24vw, 150px"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="group relative my-8 overflow-hidden bg-[#d8d1c3] shadow-xl shadow-[#191c33]/15 sm:my-12">
                <Image
                  src="https://cordovaproperty.com/wp-content/uploads/elementor/thumbs/Dubai-lux-Property-qocgrjrxqyxh0234gs2zrdacbkjtanwco9ps3kjwsk.jpg"
                  alt="Luxury courtyard residence"
                  fill
                  sizes="(max-width: 1024px) 24vw, 150px"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#191c33]/5 via-transparent to-[#bd8f13]/5" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute left-0 top-0 h-full w-1 bg-[#bd8f13]" />
        <div className="container grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-24">
          <div>
            <article className="relative border-b border-[#d3d3d3] pb-10">
              <span className="absolute -left-1 top-1 font-serif text-5xl italic text-[#bd8f13]/20">01</span>
              <div className="relative pl-14 sm:pl-20">
                <h2 className="text-3xl font-extrabold text-[#191c33] sm:text-4xl">Our Mission</h2>
                <p className="mt-5 max-w-xl leading-7 text-[#242424]/75">
                  Our mission is to set the gold standard in the property management industry by
                  delivering bespoke services that cater to the unique needs of our clients. We
                  work tirelessly to manage and enhance your property investments with the utmost
                  care, ensuring both owners and tenants enjoy a flawless experience befitting of
                  the price they pay to occupy a luxury property.
                </p>
              </div>
            </article>

            <article className="relative pt-10">
              <span className="absolute -left-1 top-11 font-serif text-5xl italic text-[#bd8f13]/20">02</span>
              <div className="relative pl-14 sm:pl-20">
                <h2 className="text-3xl font-extrabold leading-tight text-[#191c33] sm:text-4xl">
                  Our Commitment to Excellence
                </h2>
                <p className="mt-5 max-w-xl leading-7 text-[#242424]/75">
                  We pride ourselves on our commitment to excellence in every aspect of property
                  management. Our team of highly skilled professionals bring a wealth of experience
                  and expertise to the table, ensuring your property is managed to the highest
                  standard. From maintenance to tenant relations, we handle every detail with
                  precision and care.
                </p>
              </div>
            </article>
          </div>

          <div className="relative pb-10 pl-5 sm:pl-10">
            <div className="absolute bottom-0 left-0 right-10 top-10 border border-[#bd8f13]/55" />
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f0f3] shadow-[0_28px_70px_rgba(25,28,51,0.2)]">
              <Image
                src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-vision.jpg"
                alt="Property owner overlooking the Dubai skyline"
                fill
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#191c33]/20 via-transparent to-[#bd8f13]/10" />
            </div>
            <div className="relative ml-auto -mt-1 w-[88%] bg-[#191c33] px-6 py-6 text-white shadow-xl sm:px-8">
              <p className="leading-7 text-white/75">
                For expert property management please contact one of the team.
              </p>
              <ButtonLink href="/contact" className="mt-5 min-w-44">Contact us</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3ede1_55%,#e9dfcd_100%)]">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our people</p>
              <h2 className="mt-5 text-4xl font-extrabold text-[#191c33] sm:text-5xl">Meet the team behind the standard.</h2>
            </div>
            <p className="max-w-md leading-7 text-[#242424]/70">
              Dedicated specialists united by discretion, responsiveness and an uncompromising eye for quality.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-[1000px] gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => {
              const card = (
                <article className="group relative h-full overflow-hidden rounded-xl border border-[#c5a76c] bg-[#191c33] text-left shadow-[0_14px_34px_rgba(25,28,51,0.22),0_0_0_4px_rgba(197,167,108,0.08)] transition duration-300 hover:-translate-y-[7px] hover:border-[#dfc58f] hover:shadow-[0_24px_52px_rgba(25,28,51,0.32),0_0_0_5px_rgba(197,167,108,0.14)]">
                  <div className="relative h-[400px] overflow-hidden bg-[#d8d1c3]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 333px"
                      className="object-cover transition duration-500 group-hover:saturate-[1.06] group-hover:contrast-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[58%] to-[rgba(25,28,51,0.52)]" />
                  </div>
                  <div className="min-h-[116px] bg-[linear-gradient(145deg,#242844_0%,#191c33_100%)] px-[22px] pb-6 pt-[22px]">
                    <div className="mb-[15px] h-[3px] w-[46px] bg-gradient-to-r from-[#e2c98f] to-[#9f7d3d]" />
                    <h3 className="font-serif text-[1.28rem] font-medium leading-[1.3] tracking-[0.015em] text-[#fffaf0]">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-[0.76rem] font-semibold uppercase leading-[1.5] tracking-[0.09em] text-[#d7bd87]">
                      {member.role}
                    </p>
                  </div>
                </article>
              );

              return member.href ? (
                <a key={member.name} href={member.href} className="block h-full">
                  {card}
                </a>
              ) : (
                <div key={member.name} className="h-full">{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f1f0f3] py-20 md:py-28">
        <div className="container relative overflow-hidden bg-[#191c33] px-6 py-16 text-center text-white shadow-2xl shadow-[#191c33]/15 md:px-16 md:py-20">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#bd8f13] to-transparent" />
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
            Dubai&apos;s Trusted Property Management Partner
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-white/65">
            Effortlessly managing your property with expertise and precision.
          </p>
          <ButtonLink href="/property-management" className="mt-9 min-w-44">Learn more</ButtonLink>
        </div>
      </section>

      <section className="bg-white px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="relative mx-auto min-h-[470px] max-w-[1400px] overflow-hidden bg-[#191c33] text-white">
          <Image
            src="https://cordovaproperty.com/wp-content/uploads/2021/07/Dubai-Property.jpg"
            alt="Luxury Dubai property overlooking the skyline"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#191c33]/75" />
          <div className="container relative grid min-h-[470px] items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16">
            <div className="lg:pl-8">
              <div className="max-w-lg border-b border-l border-[#bd8f13] px-6 pb-5 pt-1 sm:px-8">
                <h2 className="text-xl font-extrabold leading-snug sm:text-2xl">
                  Request a brochure and join our mailing list to keep up to date with the property market in Dubai
                </h2>
              </div>
            </div>

            <form
              action="/contact"
              method="get"
              className="mx-auto grid w-full max-w-lg gap-5 bg-[#191c33] p-6 shadow-2xl shadow-black/25 sm:p-8"
            >
              <label className="sr-only" htmlFor="brochure-name">Full Name</label>
              <input
                id="brochure-name"
                name="name"
                type="text"
                required
                placeholder="Full Name"
                className="min-h-12 w-full rounded-sm border border-white/20 bg-white/90 px-4 text-sm text-[#191c33] outline-none transition placeholder:text-[#191c33] focus:border-[#bd8f13] focus:ring-4 focus:ring-[#bd8f13]/15"
              />
              <label className="sr-only" htmlFor="brochure-email">Email Address</label>
              <input
                id="brochure-email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="min-h-12 w-full rounded-sm border border-white/20 bg-white/90 px-4 text-sm text-[#191c33] outline-none transition placeholder:text-[#191c33] focus:border-[#bd8f13] focus:ring-4 focus:ring-[#bd8f13]/15"
              />
              <button
                type="submit"
                className="mt-1 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#bd8f13] px-6 text-sm font-semibold text-white transition hover:bg-[#ca8a04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8f13]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function PropertiesPage() {
  return (
    <section className="section bg-[#f1f0f3]">
      <div className="container">
        <p className="eyebrow">Rentals</p>
        <h1 className="mt-4 text-3xl font-extrabold text-[#191c33] sm:text-5xl">Properties for rent Dubai</h1>
        <p className="mt-5 max-w-2xl leading-8 text-[#242424]">
          Professionally managed luxury residences in Dubai.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProperties.map((property) => (
            <article
              key={property.slug}
              className="overflow-hidden rounded-xl border border-[#d3d3d3] bg-white shadow-xl shadow-[#191c33]/5"
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
                <p className="mt-4 text-sm text-[#242424]">{property.location}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {property.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-[#f1f0f3] px-3 py-2 text-sm text-[#242424]"
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
    <main className="overflow-hidden bg-[#f7f8f9]">
      <section className="relative isolate min-h-[580px] overflow-hidden bg-[#191c33] text-white">
        <Image
          src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property2.jpg"
          alt="Dubai skyline and luxury property"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#191c33] via-[#191c33]/88 to-[#191c33]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#191c33]/80 via-transparent to-[#191c33]/20" />
        <div className="container flex min-h-[580px] items-center py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#bd8f13]">
              <span className="h-px w-12 bg-[#bd8f13]" />
              Contact Cordova
            </div>
            <h1 className="mt-7 text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-7xl">
              Let&apos;s discuss your
              <span className="block font-serif font-normal italic text-[#bd8f13]">property goals.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/72 md:text-lg">
              {doc.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#bd8f13]/8 blur-3xl" />
        <div className="container relative grid items-start gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-20">
          <div className="lg:pt-5">
            <p className="eyebrow">Start a conversation</p>
            <h2 className="mt-5 max-w-md text-4xl font-extrabold leading-tight text-[#191c33] sm:text-5xl">
              Personal attention from the first enquiry.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#242424]/70">
              Whether you are an owner seeking professional oversight or a tenant looking for support, our Dubai team is ready to assist.
            </p>

            <div className="mt-10 divide-y divide-[#d3d3d3] border-y border-[#d3d3d3]">
              <div className="group flex gap-5 py-6">
                <Phone className="mt-1 shrink-0 text-[#bd8f13]" size={21} strokeWidth={1.6} aria-hidden />
                <div>
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#191c33]/50">Call our team</p>
                  <a href="tel:+971586287157" className="mt-2 block font-semibold text-[#191c33] transition group-hover:text-[#bd8f13]">+971 58 628 7157</a>
                  <a href="tel:+971586580518" className="mt-1 block font-semibold text-[#191c33] transition group-hover:text-[#bd8f13]">+971 58 658 0518</a>
                </div>
              </div>
              <a href="mailto:customer@cordovaproperty.com" className="group flex gap-5 py-6">
                <Mail className="mt-1 shrink-0 text-[#bd8f13]" size={21} strokeWidth={1.6} aria-hidden />
                <div>
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#191c33]/50">Email</p>
                  <p className="mt-2 break-all font-semibold text-[#191c33] transition group-hover:text-[#bd8f13]">customer@cordovaproperty.com</p>
                </div>
              </a>
              <div className="flex gap-5 py-6">
                <MapPin className="mt-1 shrink-0 text-[#bd8f13]" size={21} strokeWidth={1.6} aria-hidden />
                <div>
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#191c33]/50">Office</p>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-[#242424]/75">The One Tower Business Centre, Sheikh Zayed Road, Barsha Heights, Dubai, UAE</p>
                </div>
              </div>
              <div className="flex gap-5 py-6">
                <Clock3 className="mt-1 shrink-0 text-[#bd8f13]" size={21} strokeWidth={1.6} aria-hidden />
                <div>
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#191c33]/50">Response</p>
                  <p className="mt-2 text-sm leading-7 text-[#242424]/75">Our team will respond to your enquiry as soon as possible.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form relative border-t-2 border-[#bd8f13] bg-white p-7 shadow-[0_28px_80px_rgba(25,28,51,0.13)] sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-[#bd8f13]/20" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#bd8f13]">Private enquiry</p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-[#191c33] sm:text-4xl">How can we help?</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#242424]/65">Share a few details and a member of the Cordova team will be in touch.</p>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#191c33] py-10 text-white">
        <div className="container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#bd8f13]">Cordova Property Management</p>
            <p className="mt-2 text-sm text-white/60">Professional property management across Dubai.</p>
          </div>
          <a href="https://www.cordovaproperty.com" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-sm font-bold">
            www.cordovaproperty.com
            <ArrowUpRight size={18} className="text-[#bd8f13] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </section>
    </main>
  );
}
