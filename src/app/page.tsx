import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle2, ClipboardCheck, Home, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { LeadForm } from "@/components/lead-form";
import { docHref, posts, services } from "@/data/site";

const heroImage = "https://cordovaproperty.com/wp-content/uploads/2024/06/Dubai-PropertyBlog4.webp";
const livingRoom =
  "https://cordovaproperty.com/wp-content/uploads/2025/07/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg";
const managementImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden bg-[#191c33] text-white sm:min-h-[620px] md:min-h-[720px]">
        <Image src={heroImage} alt="Dubai skyline and property" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[#080914]/65" />
        <div className="container relative flex min-h-[560px] items-center py-12 sm:min-h-[620px] sm:py-16 md:min-h-[720px] md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-normal uppercase tracking-[0.1em] text-[#f1f0f3]">Cordova Property Management</p>
            <h1 className="mt-5 text-balance text-3xl font-black uppercase leading-[0.98] text-white min-[380px]:text-4xl sm:text-5xl md:text-7xl">
              Property Management Dubai
            </h1>
            <div className="brand-rule my-7" />
            <p className="max-w-xl text-base font-light leading-8 tracking-[0.005em] text-white/86 sm:text-lg">
              Whether you own a luxury property in Dubai, or you&apos;re looking for a long-term or
              short-term lease, our dedicated team are on hand to help. Explore our comprehensive
              list of services and discover why Cordova Properties is the preferred choice for
              property management in Dubai.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/contact" variant="light">
                Download brochure
              </ButtonLink>
              <ButtonLink
                href="/property-management"
                variant="lightOutline"
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
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#191c33] sm:text-4xl md:text-5xl">
              Expert Property Management Dubai
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 leading-8 text-[#242424]">
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
                <div key={title} className="group border-l border-[#afabb9] bg-[#f7f8f9]/70 p-6 transition hover:border-[#e1ab39] hover:bg-white">
                  <Icon className="text-[#555069] transition group-hover:text-[#e1ab39]" size={24} strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-5 text-base font-semibold text-[#191c33]">{title}</h3>
                </div>
              ))}
            </div>
          </div>
          <aside className="relative border border-[#d5d2db] bg-[#f1f0f3] p-7 shadow-[0_24px_70px_rgba(25,28,51,0.09)] sm:p-9">
            <div className="brand-gradient absolute left-0 top-0 h-1 w-full" />
            <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-[#191c33]">
              Reach out to us and one of our agents will contact you
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-[#f1f0f3]">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Image
            src={livingRoom}
            alt="Modern cozy living room"
            width={900}
            height={620}
            className="aspect-[4/3] object-cover shadow-[0_28px_70px_rgba(25,28,51,0.14)]"
          />
          <div>
            <p className="eyebrow">Why Cordova</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#191c33] sm:text-4xl">
              Why You Need Property Management
            </h2>
            <div className="mt-6 space-y-4 leading-8 text-[#242424]">
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
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#191c33] sm:text-4xl">
              Our property management services in Dubai
            </h2>
            <div className="mt-6 space-y-4 leading-8 text-[#242424]">
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
            <ButtonLink href="/property-management" className="mt-8">
              Learn more
            </ButtonLink>
          </div>
          <Image
            src={managementImage}
            alt="Professional property management in Dubai"
            width={900}
            height={620}
            className="aspect-[4/3] object-cover shadow-[0_28px_70px_rgba(25,28,51,0.14)]"
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
                  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
                intro: "\"You fully deserve it.\"",
                quote:
                  "In my 20 years in Dubai and dealing with tens of agents, you have been the best by far. Very professional, very conscientious, and very knowledgeable. Congratulations and I wish you the best of luck.",
                closing: "They offer great property management Dubai\""
              },
              {
                name: "Katey and Jon M, Dubai Property Owner",
                image:
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
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
                className="luxury-card relative overflow-hidden p-7"
              >
                <div className="brand-gradient absolute left-0 top-0 h-1 w-full" />
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt="Modern villa with pool"
                    width={420}
                    height={240}
                    className="mb-7 aspect-[16/9] w-full object-cover grayscale-[12%] transition duration-500 hover:grayscale-0"
                  />
                ) : (
                  <Home className="text-[#bd8f13]" size={26} aria-hidden />
                )}
                <figcaption className="font-extrabold text-[#191c33]">{testimonial.name}</figcaption>
                {testimonial.intro ? (
                  <p className="mt-4 italic leading-7 text-[#242424]">{testimonial.intro}</p>
                ) : null}
                <blockquote className="mt-5 leading-7 text-[#242424]">
                  {testimonial.quote}
                </blockquote>
                {testimonial.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)} className="mt-4 leading-7 text-[#242424]">
                    {paragraph}
                  </p>
                ))}
                {testimonial.closing ? (
                  <p className="mt-5 font-extrabold leading-7 text-[#242424]">
                    {testimonial.closing}
                  </p>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f1f0f3]">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">News</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#191c33] sm:text-4xl">Dubai real estate insights</h2>
            </div>
            <ButtonLink href="/blog" variant="ghost">
              Read news
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} href={docHref(post)} className="luxury-card group p-7">
                <p className="text-xs font-extrabold uppercase tracking-wide text-[#bd8f13]">Insight</p>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-[#191c33] transition group-hover:text-[#555069]">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#242424]">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
