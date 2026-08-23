import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { ButtonLink } from "./button-link";

export function Footer() {
  return (
    <footer className="bg-[#191c33] text-white">
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center md:py-10">
          <h2 className="max-w-2xl text-2xl font-extrabold leading-tight md:text-3xl">
            How can our property management team help you?
          </h2>
          <ButtonLink href="/contact" className="shrink-0">
            Contact us
          </ButtonLink>
        </div>
      </div>
      <div className="container grid gap-9 py-10 md:grid-cols-[1.1fr_1.2fr_1fr] md:py-12">
        <div>
          <Image
            src="/brand/CPM-primary-logo-footer.png"
            alt="Cordova Property Management Dubai"
            width={220}
            height={75}
            className="h-auto w-40 object-contain sm:w-48"
          />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/72">
            Cordova Property Management supports Dubai landlords with leasing, inspections,
            maintenance coordination, tenant care, and premium property readiness.
          </p>
        </div>
        <address className="not-italic text-sm leading-7 text-white/75">
          <strong className="block text-base text-white">Cordova Property Management</strong>
          The One Tower, Sheikh Zayed Rd, Tecom, Barsha Heights
          <br />
          Dubai, UAE
          <a className="mt-4 flex items-start gap-2 text-white" href="tel:+971586287157">
            <Phone className="mt-1 shrink-0" size={16} aria-hidden />
            <span>+971 58 628 7157 | +971 58 658 0518</span>
          </a>
          <a
            className="mt-2 flex items-start gap-2 break-all text-white"
            href="mailto:customer@cordovaproperty.com"
          >
            <Mail className="mt-1 shrink-0" size={16} aria-hidden /> customer@cordovaproperty.com
          </a>
        </address>
        <div>
          <div className="flex gap-3">
            {[
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/company/cordova-property-mangement/about/",
                label: "LinkedIn"
              },
              {
                icon: Facebook,
                href: "https://www.facebook.com/profile.php?id=61559895031581",
                label: "Facebook"
              },
              {
                icon: Youtube,
                href: "https://www.youtube.com/channel/UCjfrb24xHEWa5j1SDbnZFUg",
                label: "YouTube"
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/thecordova_group/",
                label: "Instagram"
              }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 transition hover:bg-[#bd8f13] hover:text-[#191c33]"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </div>
          <div className="mt-8 grid gap-2 text-sm text-white/70">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/privacy-policy">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">
        Copyright 2026 Cordova Property Management
      </div>
    </footer>
  );
}
