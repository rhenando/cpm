import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/data/site-settings";

function telephoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function BlogArticleCta({ settings }: { settings: SiteSettings }) {
  return (
    <section className="blog-article-cta" aria-labelledby="blog-article-cta-heading">
      <p className="blog-article-cta-eyebrow">Property management support</p>
      <h2 id="blog-article-cta-heading">{settings.blogCtaHeading}</h2>
      <p className="blog-article-cta-description">{settings.blogCtaDescription}</p>

      <Link href="/contact" className="news-article-cta">
        {settings.blogCtaButtonLabel}
      </Link>

      <div className="blog-article-cta-contacts" aria-label="Contact details">
        <a href={telephoneHref(settings.phone)}>
          <Phone size={18} aria-hidden />
          <span>
            {settings.phone}
            {settings.secondaryPhone ? ` | ${settings.secondaryPhone}` : ""}
            {settings.tertiaryPhone ? ` | ${settings.tertiaryPhone}` : ""}
          </span>
        </a>
        <a href={`mailto:${settings.email}`}>
          <Mail size={18} aria-hidden />
          <span>{settings.email}</span>
        </a>
      </div>
    </section>
  );
}
