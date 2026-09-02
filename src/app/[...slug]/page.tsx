import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Clock3, KeyRound, Mail, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { DocContent } from "@/components/doc-content";
import { LeadForm } from "@/components/lead-form";
import { docHref, docs, getDocBySlug, pages } from "@/data/site";
import { getPageOverride, getSiteSettings } from "@/lib/cms";

const dubaiVision = "/images/pages/Dubai-vision.webp";
const lestyPortrait = "/images/pages/lesty.webp";
const uaeProfessional = "/images/pages/woman-uae.webp";

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
  const member = team.find((item) => item.href === `/${slug.join("/")}`);
  if (member) return { title: member.name, description: `${member.name}, ${member.role} at Cordova Property Management in Dubai.` };
  const source = getDocBySlug(slug.join("/"));
  const override = await getPageOverride(slug.join("/"));
  const doc = source ? { ...source, ...override } : source;
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
  const source = getDocBySlug(path);
  const member = team.find((item) => item.href === `/${path}`);
  if (member) return <TeamProfilePage member={member} doc={source} />;
  const override = await getPageOverride(path);
  const doc = source ? { ...source, ...override } : source;
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

  if (path === "property-management") {
    return <PropertyManagementPage />;
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

const managementServices = [
  {
    icon: KeyRound,
    number: "01",
    title: "Tenant & lease management",
    copy: "From careful screening and compliant contracts to renewals and move-out coordination, every tenancy is handled with precision."
  },
  {
    icon: Wrench,
    number: "02",
    title: "Property care & maintenance",
    copy: "Trusted contractors, proactive inspections and responsive maintenance preserve the finish, comfort and value of your residence."
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Financial oversight",
    copy: "Clear rent collection, expense monitoring and concise reporting keep you informed wherever in the world you are."
  }
];

const managementBenefits = [
  "Dedicated property manager",
  "Tenant screening and onboarding",
  "Rent collection and renewals",
  "Routine inspections with reporting",
  "Maintenance and vendor coordination",
  "24/7 emergency assistance"
];

const whyCordova = [
  ["Expertise and Experience", "We understand the intricacies of the Dubai real estate market and leverage this expertise to maximise your property’s potential—which is why Cordova stands out among property management companies in Dubai."],
  ["Time-Saving", "Managing a property requires significant time and effort. From tenant queries to maintenance oversight, our property managers take care of the demands so you can focus on your life or business."],
  ["Tenant Management", "We help your property attract and retain quality tenants. Thorough screening minimises risk, while responsive tenant support encourages satisfaction and long-term occupancy."],
  ["Financial Management", "From rent collection to maintenance expenses, detailed financial reporting keeps you informed. Efficient oversight helps maximise returns and minimise unnecessary costs."],
  ["Maintenance and Repairs", "We organise regular maintenance and handle repairs promptly, keeping your property pristine and ensuring your investment retains an air of luxury for its tenants."],
  ["Legal Compliance", "Our team stays current with evolving regulations and local requirements, helping your property remain compliant and protecting you from potential legal issues."],
  ["Market Insights", "Our understanding of Dubai real estate informs strategic advice on rental pricing, market trends and investment opportunities, helping you make confident decisions."],
] as const;

const basicPackage = [
  "Personal Property Manager", "Marketing of Property", "Finding Tenant", "Deposit hold and release upon approval",
  "Key handover and tenant move-in", "Banking rent cheques into the owner’s account", "Renewal of Tenancy Contract",
  "Checking RERA calculator for rent increase", "Re-market when the property becomes vacant"
];

const premiumPackage = [
  "Personal Property Manager", "Marketing of Property", "Finding Tenant", "Key Holding", "Deposit hold and release upon approval",
  "DEWA Connection Assistance", "Ejari Registration Assistance", "Key handover to tenant", "Banking rent cheques into the owner’s account",
  "Onboarding Inspection, Move-In Inspection, Bi-Annual Inspection & Moved-Out Inspection", "Renewal of Tenancy Contract",
  "Checking RERA calculator for rent increase", "Re-market when the property becomes vacant",
  "Snag reporting for off-plan properties directly with the developer", "Payments to third-party vendors (Mollak/service charges etc.)",
  "Coordination with facility management teams in buildings and communities", "Detailed property inspections with photographs",
  "Pre-inspection, move-in, move-out and mid-tenancy inspections", "Manage security deposit reimbursement", "Tenant Management"
];

function PropertyManagementPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[600px] bg-[#191c33] text-white md:min-h-[780px]">
        <Image
          src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-PropertyBlog4.webp"
          alt="Luxury Dubai residence managed by Cordova"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,30,.96)_0%,rgba(25,28,51,.84)_43%,rgba(25,28,51,.18)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c33]/90 via-transparent to-[#191c33]/25" />
        <div className="container relative flex min-h-[600px] items-center py-14 md:min-h-[780px] md:py-20">
          <div className="max-w-3xl pt-4 md:pt-8">
            <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#d2ad4b]">
              <span className="h-px w-12 bg-[#d2ad4b]" />
              Private property care, Dubai
            </div>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.03] sm:mt-7 sm:text-6xl md:text-7xl lg:text-[5.35rem]">
              Your property,
              <span className="block font-serif font-normal italic text-[#d2ad4b]">beautifully managed.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 md:mt-8 md:text-lg md:leading-8">
              Discreet, end-to-end management for Dubai property owners who expect exceptional care, complete clarity and lasting value.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <ButtonLink href="#consultation" variant="light" className="min-w-52">Arrange a consultation</ButtonLink>
              <ButtonLink href="#services" variant="lightOutline">
                Explore our service
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f7f5f0] py-14 md:py-28">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#eadfca]/60 to-transparent" />
        <div className="container relative grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
          <div>
            <p className="eyebrow">The Cordova standard</p>
            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] text-[#191c33] sm:text-5xl">
              Ownership without the <span className="font-serif font-normal italic text-[#bd8f13]">everyday demands.</span>
            </h2>
            <div className="mt-7 h-px w-28 bg-[#bd8f13]" />
            <p className="mt-7 text-base leading-8 text-[#242424]/75">
              A remarkable property deserves remarkable stewardship. Cordova acts as your eyes, ears and trusted representative on the ground—protecting your asset while creating a polished experience for every tenant.
            </p>
            <p className="mt-5 text-base leading-8 text-[#242424]/75">
              Our approach is personal, proactive and transparent. You remain informed and in control, while our specialists take care of the details.
            </p>
            <ButtonLink href="/about-cordova-property-management" variant="ghost" className="mt-9">Discover Cordova</ButtonLink>
          </div>
          <div className="relative pl-4 sm:pl-10">
            <div className="absolute bottom-0 left-0 right-10 top-10 border border-[#bd8f13]/55" />
            <div className="relative aspect-[4/3] overflow-hidden shadow-[0_28px_70px_rgba(25,28,51,.22)]">
              <Image
                src="https://cordovaproperty.com/wp-content/uploads/2025/07/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg"
                alt="Refined living room interior"
                fill
                sizes="(max-width: 1024px) 90vw, 600px"
                className="object-cover transition duration-700 hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#191c33]/20 via-transparent to-[#bd8f13]/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-14 md:py-28">
        <div className="container">
          <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <p className="eyebrow">Why choose Cordova?</p>
              <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] text-[#191c33] sm:text-5xl">
                Comprehensive management for <span className="font-serif font-normal italic text-[#bd8f13]">luxury real estate.</span>
              </h2>
              <p className="mt-6 leading-8 text-[#242424]/70">A complete service shaped around the realities of owning and leasing premium property in Dubai.</p>
              <div className="mt-7 grid gap-3 sm:mt-9">
                <ButtonLink href="#packages">View management packages</ButtonLink>
                <ButtonLink href="/contact" variant="ghost">Get our guide for Dubai landlords</ButtonLink>
                <ButtonLink href="/contact" variant="ghost">Get our checklist for Dubai tenants</ButtonLink>
              </div>
            </div>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {whyCordova.map(([title, copy], index) => (
                <article key={title} className={`border-t border-[#d3d3d3] py-5 sm:py-7 ${index === whyCordova.length - 1 ? "sm:col-span-2" : ""}`}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-sm italic text-[#bd8f13]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-extrabold text-[#191c33]">{title}</h3>
                  </div>
                  <p className="mt-4 pl-9 text-sm leading-7 text-[#242424]/70">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0] py-14 md:py-28">
        <div className="container grid items-center gap-9 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="eyebrow">Why you need property management</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#191c33] sm:text-5xl">See how our dedicated team supports you.</h2>
            <p className="mt-6 leading-8 text-[#242424]/70">Watch our informative property management video for an introduction to the main services our specialists provide.</p>
            <p className="mt-7 font-serif text-xl italic text-[#191c33]">Expert Property Management Dubai · Cordova PM</p>
          </div>
          <div className="relative overflow-hidden border border-[#bd8f13]/30 bg-[#191c33] p-2 shadow-[0_25px_65px_rgba(25,28,51,.22)] sm:p-3">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/gqZaS0-rPZc?rel=0&modestbranding=1"
                title="Expert Property Management Dubai | Cordova PM"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative bg-[#191c33] py-14 text-white md:py-28">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_80%_20%,#bd8f13_0,transparent_28%)]" />
        <div className="container relative">
          <div className="max-w-3xl">
            <p className="eyebrow">End-to-end management</p>
            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight sm:text-5xl">Every detail, handled with intention.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/65">A considered service designed around your property, your priorities and the standards your investment deserves.</p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:mt-14 lg:grid-cols-3">
            {managementServices.map(({ icon: Icon, number, title, copy }) => (
              <article key={title} className="group relative bg-[#191c33] p-6 transition duration-300 hover:bg-[#20243f] sm:p-10">
                <span className="font-serif text-5xl italic text-[#bd8f13]/20">{number}</span>
                <Icon className="mt-5 text-[#d2ad4b] sm:mt-8" size={30} strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 text-xl font-extrabold leading-snug sm:mt-6">{title}</h3>
                <p className="mt-4 leading-7 text-white/60">{copy}</p>
                <div className="mt-5 h-px w-12 bg-[#bd8f13] transition-all duration-300 group-hover:w-24 sm:mt-8" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="relative overflow-hidden border-y border-[#bd8f13]/40 bg-[#191c33] py-14 text-white md:py-28">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-[#bd8f13]/15" />
        <div className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-[#bd8f13]/10" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#bd8f13] to-transparent" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-7 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#bd8f13]" />
              <span className="h-2 w-2 rotate-45 border border-[#bd8f13]" />
              <span className="h-px w-12 bg-[#bd8f13]" />
            </div>
            <h2 className="text-4xl font-extrabold sm:text-5xl">Our Property Management Services</h2>
          </div>
          <div className="mx-auto mt-9 grid max-w-[1160px] items-start gap-7 md:mt-14 lg:grid-cols-2">
            {[
              { name: "Basic Package", rate: "5%", minimum: "Minimum Fee AED 5,000 +5% VAT", items: basicPackage },
              { name: "Premium Package", rate: "7%", minimum: "Minimum Fee AED 7,000 +5% VAT", items: premiumPackage }
            ].map((pkg) => (
              <article key={pkg.name} className="relative overflow-hidden border border-[#bd8f13] bg-white text-[#191c33] shadow-[0_28px_70px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1">
                <header className="relative grid min-h-[220px] place-items-center overflow-hidden bg-[#34332f] px-6 py-9 text-center text-white sm:min-h-[265px] sm:py-12">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(189,143,19,.22),transparent_45%)]" />
                  <div className="relative">
                    <h3 className="text-2xl font-extrabold">{pkg.name}</h3>
                    <p className="mt-5 font-serif text-5xl italic text-[#e1c376]">{pkg.rate}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[.15em] text-white/75">of annual rent</p>
                    <p className="mt-5 text-xs text-white/75">{pkg.minimum}</p>
                  </div>
                </header>
                <div className="border-t-2 border-[#bd8f13] p-6 sm:p-10">
                  <ul className="grid gap-3">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#242424]/80">
                        <Check className="mt-1 shrink-0 text-[#bd8f13]" size={15} strokeWidth={3} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="#consultation" className="mt-7 w-full sm:mt-9 sm:w-full">Enquire about this package</ButtonLink>
                </div>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-[1160px] flex-col items-center justify-between gap-6 border border-[#bd8f13]/35 bg-white/5 px-7 py-7 backdrop-blur-sm sm:flex-row sm:px-9">
            <p className="max-w-2xl font-serif text-lg italic leading-7 text-white/80">Request a brochure and join our mailing list to keep up to date with the property market in Dubai.</p>
            <ButtonLink href="#consultation" variant="lightOutline">Request a brochure</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-28">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
          <div className="relative min-h-[340px] overflow-hidden bg-[#f1f0f3] shadow-[0_25px_60px_rgba(25,28,51,.15)] sm:min-h-[420px] lg:min-h-[520px]">
            <Image
              src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property1.jpg"
              alt="Dubai skyline viewed from a luxury residence"
              fill
              sizes="(max-width: 1024px) 90vw, 580px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191c33]/65 via-transparent to-transparent" />
          </div>
          <div>
            <p className="eyebrow">Included as standard</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#191c33] sm:text-5xl">Confidence at every stage.</h2>
            <p className="mt-6 leading-8 text-[#242424]/70">From the first handover to the final inspection, our team provides consistent oversight and a single point of contact.</p>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {managementBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 border-b border-[#d3d3d3] pb-5 text-sm font-bold text-[#191c33]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#bd8f13]/50 text-[#bd8f13]">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="pt-1">{benefit}</span>
                </div>
              ))}
            </div>
            <p className="mt-9 border-l-2 border-[#bd8f13] pl-5 font-serif text-xl italic leading-8 text-[#191c33]/80">Bespoke support can be tailored to the residence, landlord and tenancy.</p>
          </div>
        </div>
      </section>

      <section id="consultation" className="bg-[#f1f0f3] px-3 py-10 sm:px-6 sm:py-16 md:py-24">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden bg-[#191c33] text-white shadow-[0_30px_80px_rgba(25,28,51,.2)]">
          <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full border border-[#bd8f13]/20" />
          <div className="grid lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative p-7 sm:min-h-[440px] sm:p-12 lg:p-16">
              <p className="eyebrow">Contact us</p>
              <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight sm:text-5xl">How can our property management team help you?</h2>
              <p className="mt-6 max-w-md leading-8 text-white/65">Tell us a little about your residence and priorities. A Cordova specialist will be in touch to discuss a tailored management approach.</p>
              <div className="mt-7 h-px w-full bg-gradient-to-r from-[#bd8f13] to-transparent sm:mt-10" />
              <p className="mt-6 text-sm font-bold uppercase tracking-[.18em] text-[#d2ad4b] sm:mt-8">Discreet · Responsive · Personal</p>
            </div>
            <div className="relative bg-[#f7f5f0] p-6 text-[#191c33] sm:p-10 lg:p-14">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#bd8f13]">Request a consultation</p>
              <div className="mt-7"><LeadForm /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const team = [
  {
    name: "Lesty Cordova",
    role: "CEO",
    image: lestyPortrait,
    href: "/lesty-cordova",
    summary: "",
    strengths: []
  },
  {
    name: "Cristine Cabezas",
    role: "Head of Administration",
    image: "/images/pages/cris4.jpg",
    href: "/cristine-cabezas",
    summary: "Bringing precision, warmth and dependable coordination to every client relationship and every detail behind the scenes.",
    strengths: ["Organizational excellence", "Client support", "Clear communication", "Practical problem-solving"]
  },
  {
    name: "Mamerto Adao",
    role: "Facilities Inspection Officer",
    image: "/images/pages/mame.jpg",
    href: "/mamerto-adao",
    summary: "Protecting property standards through attentive inspections, practical expertise and a meticulous eye for detail.",
    strengths: ["Detailed inspections", "Quality assurance", "Maintenance assessment", "Technical reporting"]
  },
  {
    name: "Mary Joy Mendoza",
    role: "FM Operations Manager",
    image: "/images/pages/joy1.jpg",
    href: "/mary-joy-mendoza",
    summary: "Guiding facilities operations with calm leadership, responsive coordination and an unwavering focus on service quality.",
    strengths: ["Facilities operations", "Vendor coordination", "Team leadership", "Service delivery"]
  },
  {
    name: "William Galang",
    role: "Senior Property Manager",
    image: "/images/pages/will.jpg",
    href: "/william-galang",
    summary: "Combining technical understanding and operational discipline to deliver consistently well-managed properties.",
    strengths: ["Operational leadership", "Preventive maintenance", "Process optimization", "Contractor management"]
  },
  {
    name: "Rosewell Sangco",
    role: "Property Manager",
    image: "/images/pages/rose1.jpg",
    href: "/rosewell-sangco",
    summary: "",
    strengths: []
  },
  {
    name: "Carl Manalang",
    role: "Property Manager",
    image: "/images/pages/car.jpg",
    href: "/carl-manalang",
    summary: "",
    strengths: []
  }
];

async function TeamProfilePage({ member, doc }: { member: (typeof team)[number]; doc?: (typeof docs)[number] }) {
  const settings = await getSiteSettings();

  return (
    <main className="overflow-hidden bg-[#f4efe5]">
      <section className="relative bg-[#191c33] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(189,143,19,.22),transparent_34%)]" />
        <div className="container relative grid min-h-[680px] items-stretch lg:grid-cols-[.92fr_1.08fr]">
          <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
            <ButtonLink href="/about-cordova-property-management#team" variant="lightOutline" className="mb-10 w-fit">Back to our team</ButtonLink>
            <p className="eyebrow">Our people</p>
            <h1 className="mt-5 text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl xl:text-7xl">{member.name}</h1>
            <p className="mt-5 text-sm font-extrabold uppercase tracking-[.22em] text-[#d2ad4b]">{member.role}</p>
            <div className="mt-9 h-px w-24 bg-[#bd8f13]" />
            {member.summary ? <p className="mt-8 max-w-xl text-lg leading-8 text-white/72">{member.summary}</p> : null}
          </div>
          <div className="relative min-h-[520px] overflow-hidden lg:min-h-[680px]">
            <Image src={member.image} alt={`${member.name}, ${member.role}`} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 55vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191c33]/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#191c33]/35 lg:to-transparent" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_330px] lg:gap-16">
          <article className="border-t-2 border-[#bd8f13] bg-white p-7 shadow-[0_24px_70px_rgba(25,28,51,.10)] sm:p-12">
            <p className="eyebrow">Professional profile</p>
            {doc ? <AuthoritativeProfileContent content={doc.content} name={member.name} role={member.role} /> : <FallbackProfileContent member={member} />}
          </article>
          <aside className="h-fit bg-[#191c33] p-7 text-white shadow-[0_24px_60px_rgba(25,28,51,.2)] sm:p-9">
            <p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#d2ad4b]">Connect with Cordova</p>
            <h2 className="mt-4 text-2xl font-extrabold">Speak with our team</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">Discuss your property requirements with our Dubai office.</p>
            <div className="mt-7 grid gap-4 border-t border-white/15 pt-7 text-sm">
              <a className="flex items-center gap-3 hover:text-[#d2ad4b]" href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}><Phone size={17} aria-hidden />{settings.phone}</a>
              <a className="flex items-center gap-3 break-all hover:text-[#d2ad4b]" href={`mailto:${settings.email}`}><Mail size={17} aria-hidden />{settings.email}</a>
              <p className="flex items-start gap-3 text-white/70"><MapPin className="mt-1 shrink-0" size={17} aria-hidden />{settings.address}</p>
            </div>
            <ButtonLink href="/contact" variant="light" className="mt-8 w-full justify-center">Contact us</ButtonLink>
          </aside>
        </div>
      </section>
      <section className="bg-[#191c33] py-14 text-white">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><p className="eyebrow">The Cordova standard</p><h2 className="mt-4 text-3xl font-extrabold">Property care, delivered personally.</h2></div>
          <ButtonLink href="/property-management" variant="lightOutline">Explore our services</ButtonLink>
        </div>
      </section>
    </main>
  );
}

function AuthoritativeProfileContent({ content, name, role }: { content: string; name: string; role: string }) {
  const lines = content.replace(/\r/g, "").split("\n").map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  return (
    <div className="mt-7">
      {lines.map((line, index) => {
        if ((index === 0 && /cabezas|adao|mendoza|galang/i.test(line)) || line === name || line === role) return null;
        if (/^(About |Core Strengths$|Contact )/i.test(line)) return <h2 key={`${index}-${line}`} className="mt-10 border-l-4 border-[#bd8f13] pl-5 text-2xl font-extrabold text-[#191c33] first:mt-0 sm:text-3xl">{line}</h2>;
        if (/^(Phone|Email|Office)$/i.test(line)) return <h3 key={`${index}-${line}`} className="mt-7 text-xs font-extrabold uppercase tracking-[.2em] text-[#bd8f13]">{line}</h3>;
        const isStrength = /^[A-Za-z &/]+:/.test(line);
        return isStrength
          ? <div key={`${index}-${line}`} className="mt-4 border border-[#d8ccb3] bg-[#faf8f3] p-5 text-sm leading-7 text-[#242424]/80 shadow-[0_8px_20px_rgba(25,28,51,.04)]"><span className="font-extrabold text-[#191c33]">{line.split(":")[0]}:</span>{line.slice(line.indexOf(":") + 1)}</div>
          : <p key={`${index}-${line}`} className="mt-4 text-base leading-8 text-[#242424]/75 sm:text-lg sm:leading-9">{line}</p>;
      })}
    </div>
  );
}

function FallbackProfileContent({ member }: { member: (typeof team)[number] }) {
  return (
    <div className="mt-7">
      <h2 className="text-3xl font-extrabold text-[#191c33]">About {member.name.split(" ")[0]}</h2>
      {member.summary ? <p className="mt-6 text-lg leading-9 text-[#242424]/75">{member.summary}</p> : <p className="mt-6 text-lg leading-9 text-[#242424]/75">The current Cordova source record lists {member.name} as {member.role}. Additional approved profile details have not been published.</p>}
      {member.strengths.length ? <><h2 className="mt-10 border-l-4 border-[#bd8f13] pl-5 text-2xl font-extrabold text-[#191c33]">Core Strengths</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{member.strengths.map((strength) => <div key={strength} className="border border-[#d8ccb3] bg-[#faf8f3] p-5 font-bold text-[#191c33]">{strength}</div>)}</div></> : null}
    </div>
  );
}

function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[560px] bg-[#191c33] text-white sm:min-h-[680px] md:min-h-[760px]">
        <Image
          src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property1.jpg"
          alt="Luxury property overlooking the Dubai skyline"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191c33] via-[#191c33]/85 to-[#191c33]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c33] via-transparent to-transparent" />
        <div className="container relative flex min-h-[560px] items-center py-16 sm:min-h-[680px] sm:py-24 md:min-h-[760px]">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#bd8f13]">
              <span className="h-px w-12 bg-[#bd8f13]" />
              About Cordova
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Property care,
              <span className="block font-light italic text-[#bd8f13]">elevated.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 md:text-lg">
              A luxury property management company in Dubai, built around personal service,
              exacting standards and complete peace of mind.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="light">Speak with our team</ButtonLink>
              <ButtonLink href="/property-management" variant="lightOutline">
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
            <h2 className="mt-6 text-4xl font-extrabold leading-[1] text-[#191c33] sm:text-6xl md:text-7xl">
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
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85"
                  alt="Property keys overlooking Dubai"
                  fill
                  sizes="(max-width: 1024px) 24vw, 150px"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
              </div>
              <div className="group relative mt-20 overflow-hidden bg-[#d8d1c3] shadow-xl shadow-[#191c33]/15 sm:mt-24">
                <Image
                  src="https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury bedroom interior"
                  fill
                  sizes="(max-width: 1024px) 24vw, 150px"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="group relative my-8 overflow-hidden bg-[#d8d1c3] shadow-xl shadow-[#191c33]/15 sm:my-12">
                <Image
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85"
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
        <div className="container space-y-20 md:space-y-28">
          <article className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
            <div className="relative order-2 pb-8 pl-5 sm:pl-8 lg:order-1">
              <div className="absolute bottom-0 left-0 right-8 top-8 border border-[#bd8f13]/55" />
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f0f3] shadow-[0_28px_70px_rgba(25,28,51,0.2)]">
                <Image
                  src={dubaiVision}
                  alt="Emirati property owner overlooking Dubai's skyline"
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#191c33]/20 via-transparent to-[#bd8f13]/10" />
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
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
            </div>
          </article>

          <article className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
            <div className="relative">
              <span className="absolute -left-1 top-1 font-serif text-5xl italic text-[#bd8f13]/20">02</span>
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
              <ButtonLink href="/contact" className="ml-14 mt-8 min-w-44 sm:ml-20">Contact us</ButtonLink>
            </div>
            <div className="relative pb-8 pl-5 sm:pl-8">
              <div className="absolute bottom-0 left-0 right-8 top-8 border border-[#bd8f13]/55" />
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f0f3] shadow-[0_28px_70px_rgba(25,28,51,0.2)]">
                <Image
                  src={uaeProfessional}
                  alt="UAE property professional working with a client"
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#191c33]/20 via-transparent to-[#bd8f13]/10" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="team" className="section scroll-mt-28 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3ede1_55%,#e9dfcd_100%)]">
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
                  <div className="relative h-[340px] overflow-hidden bg-[#d8d1c3] sm:h-[400px]">
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
          <ButtonLink href="/property-management" variant="light" className="mt-9 min-w-44">Learn more</ButtonLink>
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
                className="brand-button-on-dark mt-1 inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 px-6 text-sm font-black uppercase tracking-[0.1em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1ab39]"
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
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[570px] bg-[#191c33] text-white sm:min-h-[650px]">
        <Image
          src="https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-Property1.jpg"
          alt="Luxury residences overlooking the Dubai skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,16,34,.94),rgba(25,28,51,.78)_48%,rgba(25,28,51,.3))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c33]/80 via-transparent to-[#191c33]/20" />
        <div className="container relative flex min-h-[570px] items-center py-14 sm:min-h-[650px] sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[.28em] text-[#d2ad4b]">
              <span className="h-px w-12 bg-[#d2ad4b]" />
              Dubai rental collection
            </div>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl">
              Properties for rent
              <span className="block font-serif font-normal italic text-[#d2ad4b]">in Dubai.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              Our current rental collection is fully occupied. Connect with our team to hear about new residences as they become available.
            </p>
            <ButtonLink href="/contact" variant="light" className="mt-9 min-w-48">Contact our team</ButtonLink>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f7f5f0] py-14 md:py-24">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#eadfca]/60 to-transparent" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl border border-[#bd8f13]/35 bg-white px-6 py-12 text-center shadow-[0_24px_60px_rgba(25,28,51,.12)] sm:px-12 md:py-16">
            <KeyRound className="mx-auto text-[#bd8f13]" size={32} strokeWidth={1.5} aria-hidden />
            <p className="eyebrow mt-6">Be first to know</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-tight text-[#191c33] sm:text-5xl">
              Looking for your next Dubai residence?
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-8 text-[#242424]/70">
              Tell us what you are looking for and we will connect you with suitable opportunities when new managed properties become available.
            </p>
            <ButtonLink href="/contact" className="mt-8 min-w-52">Register your interest</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage({ doc }: { doc: { title: string; description: string; content: string } }) {
  return (
    <main className="overflow-hidden bg-[#f7f8f9]">
      <section className="relative isolate min-h-[500px] overflow-hidden bg-[#191c33] text-white sm:min-h-[580px]">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai skyline and luxury property"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#191c33] via-[#191c33]/88 to-[#191c33]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#191c33]/80 via-transparent to-[#191c33]/20" />
        <div className="container flex min-h-[500px] items-center py-14 sm:min-h-[580px] sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#bd8f13]">
              <span className="h-px w-12 bg-[#bd8f13]" />
              Contact Cordova
            </div>
            <h1 className="mt-7 text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl">
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
