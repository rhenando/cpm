import { generatedDocs } from "./generated";
import { fallbackDocs } from "./fallback";
import type { NavItem, Property, StaticDoc } from "./types";

const importedDocs = generatedDocs.length > 0 ? generatedDocs : fallbackDocs;

const localLegacyImages: Record<string, string> = {
  "Dubai-PropertyBlog4.webp": "/images/articles/Dubai-PropertyBlog4.jpg",
  "Dubai-Property1.jpg": "/images/articles/Dubai-PropertyBlog4.jpg",
  "Dubai-Property.jpg": "/images/articles/Dubai-PropertyBlog4.jpg",
  "Dubai-Property-Blog.jpg": "/images/articles/Dubai-Property-Blog.jpg",
  "modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg": "/images/articles/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg",
  "8981-300x200.jpg": "/images/articles/8981 (1).jpg"
};

const localProfileImages: Record<string, string> = {
  "mary-joy-mendoza": "/images/pages/joy1.jpg",
  "william-galang": "/images/pages/will.jpg",
  "mamerto-adao": "/images/pages/mame.jpg",
  "cristine-cabezas": "/images/pages/cris4.jpg"
};

function localizeLegacyImage(doc: StaticDoc): StaticDoc {
  if (!/https:\/\/(?:cordovaproperty\.com|property\.breakout-website\.com)\/wp-content\//i.test(doc.image)) return doc;
  const filename = doc.image.split("/").pop() || "";
  return { ...doc, image: localProfileImages[doc.slug] || localLegacyImages[filename] || "" };
}

export const docs = importedDocs.map((doc) => localizeLegacyImage(doc)) satisfies StaticDoc[];

export const pages = docs.filter((doc) => doc.type === "page");
export const posts = docs.filter((doc) => doc.type === "post");

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-cordova-property-management" },
  {
    label: "Our Services",
    href: "",
    children: [
      { label: "Property Management", href: "/property-management" },
      { label: "Holiday Homes", href: "/holiday-homes" },
      { label: "Cleaning Services", href: "/cleaning-services" },
      { label: "Snagging Inspection", href: "/snagging-inspection" }
    ]
  },
  { label: "Properties for Rent", href: "/properties-for-rent-dubai" },
  { label: "News", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const featuredProperties: Property[] = [
  {
    slug: "sky-view-the-address",
    title: "The Address Sky View, Downtown Dubai",
    location: "Burj Khalifa View | Large Layout | Furnished",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Sky View Apartment",
    specs: ["2 Beds", "3 Baths", "1,698 sqft"],
    summary: "A refined Downtown address supported by Cordova's leasing and management service."
  },
  {
    slug: "clayton-residency-business-bay",
    title: "Clayton Residency, Business Bay",
    location: "Fully Furnished | Full Canal View | Upgraded",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Clayton Residency Apartment",
    specs: ["1 Bed", "2 Baths", "781 sqft"],
    summary: "A well-positioned Dubai rental option close to commercial and lifestyle destinations."
  },
  {
    slug: "the-creek-palace-creek-harbour",
    title: "The Creek Palace Creek Harbour",
    location: "Brand New | Dual View | Unfurnished",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    imageAlt: "Creek Palace Apartment",
    specs: ["2 Beds", "2 Baths", "1,115 sqft"],
    summary: "A modern waterfront residence positioned for tenants seeking calm and connectivity."
  },
  {
    slug: "mayfair-tower-business-bay",
    title: "Mayfair Tower, Business Bay",
    location: "Canal View | Fully Furnished | Prime Location",
    image: "/images/articles/Dubai-PropertyBlog4.jpg",
    imageAlt: "Mayfair Tower Apartment",
    specs: ["1 Bed", "2 Baths", "645 sqft"],
    summary: "Fully furnished Business Bay apartment with canal view access."
  }
];

export const services = [
  "Tenant screening and onboarding",
  "Rent collection and renewal support",
  "Routine inspections and reporting",
  "Maintenance coordination",
  "Property marketing and listing",
  "24/7 emergency support",
  "Snagging inspection",
  "Holiday home readiness"
];

export function getDocBySlug(slug: string) {
  const normalized = slug.replace(/^\/|\/$/g, "");
  return docs.find((doc) => doc.slug === normalized);
}

export function docHref(doc: Pick<StaticDoc, "slug" | "type">) {
  if (doc.slug === "") return "/";
  if (doc.type === "post") return `/blog/${doc.slug}`;
  return `/${doc.slug}`;
}
