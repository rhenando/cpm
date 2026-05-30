import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle2, ClipboardCheck, Home, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { LeadForm } from "@/components/lead-form";
import { docHref, featuredProperties, posts, services } from "@/data/site";

const heroImage = "https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-PropertyBlog4.webp";
const livingRoom =
  "https://cordovaproperty.com/wp-content/uploads/2025/07/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg";
const managementImage =
  "https://cordovaproperty.com/wp-content/uploads/2021/07/ralph-ravi-kayden-2d4lAQAlbDA-unsplash.jpg";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-[#191c33] text-white">
        <Image src={heroImage} alt="Dubai skyline and property" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[#080914]/65" />
        <div className="container relative flex min-h-[720px] items-center py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Cordova Property Management</p>
            <h1 className="mt-5 text-balance text-5xl font-extrabold uppercase leading-tight text-white md:text-7xl">
              Property Management Dubai
            </h1>
            <div className="my-7 h-px w-56 bg-[#bd8f13]" />
            <p className="max-w-xl text-lg leading-8 text-white/86">
              Whether you own a luxury property in Dubai, or you&apos;re looking for a long-term or
              short-term lease, our dedicated team are on hand to help. Explore our comprehensive
              list of services and discover why Cordova Properties is the preferred choice for
              property management in Dubai.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Download brochure</ButtonLink>
              <ButtonLink
                href="/property-management"
                variant="ghost"
                className="border-white/45 text-white hover:border-[#bd8f13]"
              >
                Explore services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Expert care</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#191c33] md:text-5xl">
              Expert Property Management Dubai
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 leading-8 text-[#5e6070]">
              <p>
                As one of Dubai&apos;s leading property management companies, Cordova Properties has
                built up a strong reputation for providing an exemplary service, both for tenants
                and property owners.
              </p>
              <p>
                We ensure occupants of luxury properties are well taken care of, and we provide
                extra peace of mind to landlords by safeguarding their investments. Whether you own
                a luxury property in Dubai, or you&apos;re looking for a long-term or short-term lease,
                our dedicated team are on hand to help. Explore our comprehensive list of services
                and discover why Cordova Properties is the preferred choice for property management
                in Dubai.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Safeguard value" },
                { icon: ClipboardCheck, title: "Documented handovers" },
                { icon: Wrench, title: "Maintenance coordination" },
                { icon: Building2, title: "Dubai market focus" }
              ].map(({ icon: Icon, title }) => (
                <div key={title} className="rounded-lg border border-[#e6e0d2] bg-[#fbfaf7] p-5 shadow-sm">
                  <Icon className="text-[#bd8f13]" size={26} aria-hidden />
                  <h3 className="mt-4 font-extrabold text-[#191c33]">{title}</h3>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-lg border border-[#e6e0d2] bg-[#f6f5f1] p-6 shadow-xl shadow-[#191c33]/10">
            <p className="text-center text-sm font-extrabold uppercase tracking-wide text-[#191c33]">
              Reach out to us and one of our agents will contact you
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-[#f6f5f1]">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Image
            src={livingRoom}
            alt="Modern cozy living room"
            width={900}
            height={620}
            className="aspect-[4/3] rounded-lg object-cover shadow-xl"
          />
          <div>
            <p className="eyebrow">Why Cordova</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#191c33]">
              Why You Need Property Management
            </h2>
            <div className="mt-6 space-y-4 leading-8 text-[#5e6070]">
              <p>
                Your property could be equipped with all the finest amenities, but tenants of
                high-end properties can be demanding, and legal compliance can be difficult to
                navigate. Luxury properties require professional management. That&apos;s where we come
                in.
              </p>
              <p>
                Partnering with Cordova Properties means entrusting your investment to a reliable
                and professional Dubai-based property management company dedicated to your success.
                We handle the tenants, the maintenance, the finances, and the legalities, while you
                enjoy the benefits of a well-managed and profitable property.
              </p>
              <p>For expert property management in Dubai contact the team today.</p>
            </div>
            <ButtonLink href="/about-cordova-property-management" className="mt-8">
              Find out more
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#191c33]">
              Our property management services in Dubai
            </h2>
            <div className="mt-6 space-y-4 leading-8 text-[#5e6070]">
              <p>
                Every property is unique, and every customer is different. With this in mind, we
                offer a range of property management services designed to meet the diverse needs of
                our discerning clientele.
              </p>
              <p>
                Our Basic Package includes all essential services, including tenant screening, rent
                collection, routine maintenance, marketing, inspections, and 24/7 emergency support.
                This package is ideal for residential property owners looking for efficient and
                reliable management solutions. For those seeking a more comprehensive approach, our
                Premium Package offers an extended list of bespoke services, ensuring your property
                not only retains its value but thrives.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service} className="flex items-start gap-3 text-sm font-semibold text-[#191c33]">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#bd8f13]" size={18} aria-hidden />
                  {service}
                </div>
              ))}
            </div>
            <ButtonLink href="/our-services" className="mt-8">
              Learn more
            </ButtonLink>
          </div>
          <Image
            src={managementImage}
            alt="Professional property management in Dubai"
            width={900}
            height={620}
            className="aspect-[4/3] rounded-lg object-cover shadow-xl"
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Client testimonials</p>
            <h2 className="mt-4 text-4xl font-extrabold text-[#191c33]">
              Trusted by Dubai property owners
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Yves M, Dubai Property Owner",
                image:
                  "https://cordovaproperty.com/wp-content/uploads/2021/07/alejandra-cifre-gonzalez-ylyn5r4vxcA-unsplash.jpg",
                intro: "\"You fully deserve it.\"",
                quote:
                  "In my 20 years in Dubai and dealing with tens of agents, you have been the best by far. Very professional, very conscientious, and very knowledgeable. Congratulations and I wish you the best of luck.",
                closing: "They offer great property management Dubai\""
              },
              {
                name: "Katey and Jon M, Dubai Property Owner",
                image:
                  "https://cordovaproperty.com/wp-content/uploads/2021/07/ralph-ravi-kayden-2d4lAQAlbDA-unsplash.jpg",
                quote:
                  "\"The entire process of working with Cordova Properties has been nothing short of exceptional. They quickly secured us some great tenants at a good market rate, and the tenants have stayed in our property much longer than expected as a result of the fantastic service they receive from Cordova."
              },
              {
                name: "Yehia Elamsy",
                image:
                  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
                quote:
                  "I have 4 properties with Cordova and the way they mange the properties are beyond expectations as I have been with more than property management before but this company with their management lead by Lesty is it more than you expected from renting, snagging, handover to new tenants as well the neatness during the handover..",
                paragraphs: [
                  "Thus, I would like to express my sincere gratitude for the exceptional service you and your team provide in managing my properties. Your commitment to maintaining the property at such a high standard is truly appreciated.",
                  "From the seamless handling of repairs and maintenance to your prompt and professional communication, you make living here a worry-free experience. It's evident that you take great care in ensuring that all residents are comfortable and that the property remains in top condition. This level of dedication is rare and does not go unnoticed."
                ]
              }
            ].map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-lg border border-[#e6e0d2] bg-[#fbfaf7] p-6 shadow-sm"
              >
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt="Modern villa with pool"
                    width={420}
                    height={240}
                    className="mb-6 aspect-[16/9] w-full rounded-md object-cover"
                  />
                ) : (
                  <Home className="text-[#bd8f13]" size={26} aria-hidden />
                )}
                <figcaption className="font-extrabold text-[#191c33]">{testimonial.name}</figcaption>
                {testimonial.intro ? (
                  <p className="mt-4 italic leading-7 text-[#626473]">{testimonial.intro}</p>
                ) : null}
                <blockquote className="mt-5 leading-7 text-[#4f5263]">
                  {testimonial.quote}
                </blockquote>
                {testimonial.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)} className="mt-4 leading-7 text-[#4f5263]">
                    {paragraph}
                  </p>
                ))}
                {testimonial.closing ? (
                  <p className="mt-5 font-extrabold leading-7 text-[#4f5263]">
                    {testimonial.closing}
                  </p>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#191c33] text-white">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Rentals</p>
              <h2 className="mt-4 text-4xl font-extrabold">Properties for rent in Dubai</h2>
              <p className="mt-4 leading-7 text-white/70">
                Professionally managed residences selected for location, presentation, and tenant
                readiness.
              </p>
            </div>
            <ButtonLink href="/properties-for-rent-dubai">View all rentals</ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredProperties.map((property) => (
              <article
                key={property.slug}
                className="overflow-hidden rounded-lg border border-white/10 bg-white text-[#191c33] shadow-lg shadow-black/10"
              >
                <Image
                  src={property.image}
                  alt={property.imageAlt}
                  width={900}
                  height={430}
                  className="h-[240px] w-full object-cover"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-extrabold leading-snug">{property.title}</h3>
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

      <section className="section bg-[#f6f5f1]">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">News</p>
              <h2 className="mt-4 text-4xl font-extrabold text-[#191c33]">Dubai real estate insights</h2>
            </div>
            <ButtonLink href="/blog" variant="ghost">
              Read news
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} href={docHref(post)} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="text-xs font-extrabold uppercase tracking-wide text-[#bd8f13]">Insight</p>
                <h3 className="mt-3 text-lg font-extrabold leading-snug text-[#191c33]">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#626473]">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
