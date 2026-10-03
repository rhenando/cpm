import type { Metadata } from "next";
import type { SiteSettings } from "@/data/site-settings";

export const SITE_NAME = "Cordova Property Management";
export const SITE_URL = "https://www.cordovaproperty.com";
export const DEFAULT_SOCIAL_IMAGE = "/images/articles/Dubai-PropertyBlog4.jpg";

export function absoluteUrl(path = "/") {
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

function normalizeWhitespace(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(?:x[0-9a-f]+|\d+);?/gi, " ")
    .replace(/^.+?\|\s*Cordova(?: Property Management)?\s*/i, "")
    .replace(/^.*?\bBy Cordova Property Management\s*[•·-]?\s*(?:[A-Z][a-z]+\s+\d{1,2},?\s+\d{4})?\s*/i, "")
    .replace(/^(?:A\s+A\s+)?Introduction\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateAtWord(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength + 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > maxLength * 0.65 ? boundary : maxLength).trim()}…`;
}

export function makeMetaDescription(value: string, fallback: string) {
  const cleaned = normalizeWhitespace(value) || fallback;
  return truncateAtWord(cleaned, 158);
}

export function makeSeoTitle(value: string, includeBrand = true) {
  const cleaned = normalizeWhitespace(value).replace(/\s*\|\s*Cordova(?: Property Management)?$/i, "");
  if (!includeBrand) return truncateAtWord(cleaned, 60);
  return `${truncateAtWord(cleaned, 48)} | Cordova`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  includeBrand?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
  includeBrand = true
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const seoTitle = makeSeoTitle(title, includeBrand);
  const seoDescription = makeMetaDescription(
    description,
    "Professional property management, leasing support and property care for owners and tenants across Dubai."
  );
  const socialImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      title: seoTitle,
      description: seoDescription,
      images: [{ url: socialImage, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [socialImage]
    }
  };
}

export function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/brand/CPM-primary-logo-header.png"),
    image: absoluteUrl(DEFAULT_SOCIAL_IMAGE),
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "The One Tower, Sheikh Zayed Road, Barsha Heights",
      addressLocality: "Dubai",
      addressCountry: "AE"
    },
    areaServed: { "@type": "City", name: "Dubai" },
    sameAs: [settings.linkedin, settings.facebook, settings.youtube, settings.instagram].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      email: settings.email,
      contactType: "customer service",
      areaServed: "AE",
      availableLanguage: "English"
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en"
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
