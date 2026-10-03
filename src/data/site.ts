import { generatedDocs } from "./generated";
import type { NavItem, Property, StaticDoc } from "./types";

const localProfileImages: Record<string, string> = {
  "mary-joy-mendoza": "/images/optimized/joy1.webp",
  "william-galang": "/images/optimized/will.webp",
  "mamerto-adao": "/images/optimized/mame.webp",
  "cristine-cabezas": "/images/optimized/cris4.webp"
};

const manualDocs: StaticDoc[] = [
  {
    id: "manual-holiday-homes",
    slug: "holiday-homes",
    title: "Holiday Home Management Dubai",
    description: "End-to-end holiday home management in Dubai, including guest readiness, cleaning coordination, property care and owner reporting.",
    excerpt: "Professional holiday home care for Dubai property owners.",
    content: `Holiday Home Management in Dubai

Cordova supports Dubai property owners who want their holiday home prepared, protected and professionally coordinated between guest stays. Our team provides a reliable local point of contact while keeping owners informed about the condition and readiness of their property.

Guest-Ready Property Care

A successful short-term rental depends on consistent presentation. We coordinate cleaning, linen, restocking and practical readiness checks so each stay begins with the property prepared to a high standard.

Maintenance and Issue Coordination

When an issue is reported, our team assesses the request, coordinates an appropriate service provider and follows the work through to completion. Clear records help owners understand what was required and how the matter was resolved.

Inspections Between Stays

Documented checks can identify damage, missing items or maintenance needs before they affect the next booking. We can coordinate pre-arrival and post-departure inspections according to the service agreed with the owner.

Owner Communication

Property owners receive a responsive local contact and concise updates. Our approach is designed for owners who live abroad, manage several investments or simply want less day-to-day operational work.

Cleaning and Turnover Coordination

We coordinate dependable cleaning and property preparation around the occupancy schedule. Where specialist work is required, we arrange suitable vendors and keep the owner informed.

Talk to Cordova

Holiday home requirements vary by property, building and operating model. Contact our Dubai team to discuss the property, expected level of support and a suitable management plan.`,
    image: "/images/optimized/dubai-property-hero.webp",
    sourceUrl: "",
    type: "page",
    date: "2026-10-03T00:00:00Z",
    modified: "2026-10-03T00:00:00Z"
  },
  {
    id: "manual-snagging-inspection",
    slug: "snagging-inspection",
    title: "Property Snagging Inspection Dubai",
    description: "Detailed property snagging inspections in Dubai for owners preparing to hand over, lease or protect a new property investment.",
    excerpt: "Detailed Dubai property inspections before handover or occupancy.",
    content: `Property Snagging Inspections in Dubai

A professional snagging inspection helps property owners identify visible defects, incomplete finishes and operational issues before handover or occupancy. Cordova provides a structured inspection and clear reporting process for Dubai properties.

What We Inspect

The inspection can cover finishes, doors and windows, fitted joinery, sanitary fixtures, visible plumbing and electrical points, air-conditioning operation, appliances supplied with the property and accessible external areas. The exact scope is agreed before the visit.

Clear Photographic Reporting

Findings are recorded with photographs and practical descriptions so owners, developers and contractors can understand the location and nature of each item. The report creates a useful record for follow-up discussions.

Handover Support

For owners receiving a new property, snagging can provide an independent view before final acceptance. Our team can also coordinate access and help track outstanding items where follow-up support is included.

Pre-Tenancy Condition Checks

A documented inspection before a tenancy helps establish the property's condition, identify maintenance needs and improve readiness for the incoming tenant.

Follow-Up Inspections

Where requested, Cordova can revisit the property after remedial work to review the previously reported items and document their current condition.

Arrange an Inspection

Contact our Dubai team with the property location, type and expected handover date. We will confirm the appropriate scope, availability and next steps.`,
    image: "/images/pages/Dubai-vision.webp",
    sourceUrl: "",
    type: "page",
    date: "2026-10-03T00:00:00Z",
    modified: "2026-10-03T00:00:00Z"
  },
  {
    id: "manual-privacy",
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Cordova Property Management collects, uses, stores and protects personal information submitted through this website.",
    excerpt: "How Cordova handles personal information submitted through this website.",
    content: `Privacy Policy

Last updated: 3 October 2026

Cordova Property Management respects your privacy. This policy explains the information collected through this website, why it is used and the choices available to you.

Information You Provide

When you submit an enquiry, we collect the name, email address, telephone number, message and page from which the enquiry was sent. Authorized team members may also provide account information when using the website's administration area.

Technical Information

The website and its hosting providers may process routine technical information such as IP address, browser type, device details, request time and security logs. This information is used to operate, protect and troubleshoot the service.

How We Use Information

We use enquiry information to respond to you, understand your property requirements, provide requested services, maintain appropriate business records and protect the website from misuse. We do not sell personal information.

Storage and Service Providers

Website content, authentication and enquiry records are hosted using Supabase and the website's deployment provider. These providers process information on our behalf under their own security and privacy commitments. Embedded services, including YouTube, may receive technical information when their content is loaded.

Retention

We retain enquiries and related correspondence only for as long as reasonably necessary to respond, maintain business records, meet legal obligations and resolve disputes. Administrative account records are retained while access is authorized and for an appropriate security period afterwards.

Sharing

Information may be shared with authorized Cordova personnel and service providers that support website hosting, communications, property operations or legal compliance. We may disclose information where required by law or necessary to protect rights and safety.

Your Choices and Rights

Depending on applicable law, you may request access to, correction of or deletion of personal information held about you. You may also object to or restrict certain processing. We may need to verify your identity before completing a request.

Security

We use reasonable administrative and technical safeguards, but no online service can guarantee absolute security. Do not include passwords, banking details or other highly sensitive information in the enquiry form.

Contact

For privacy questions or requests, email customer@cordovaproperty.com or contact Cordova Property Management at The One Tower, Sheikh Zayed Road, Barsha Heights, Dubai, UAE.`,
    image: "",
    sourceUrl: "",
    type: "page",
    date: "2026-10-03T00:00:00Z",
    modified: "2026-10-03T00:00:00Z"
  },
  {
    id: "manual-terms",
    slug: "terms-of-service",
    title: "Website Terms of Service",
    description: "Terms governing use of the Cordova Property Management website, its information, enquiries and third-party links.",
    excerpt: "Terms for using the Cordova Property Management website.",
    content: `Website Terms of Service

Last updated: 3 October 2026

These terms apply to your use of the Cordova Property Management website. By using this website, you agree to use it lawfully and in a way that does not interfere with its operation or another person's use.

Website Information

The website provides general information about Cordova Property Management, its services and Dubai property topics. Content is provided for general information and does not constitute legal, tax, financial or investment advice. Obtain advice appropriate to your circumstances before making a decision.

Service Enquiries

Submitting an enquiry does not create a client, agency, tenancy or management relationship. Any service will be governed by a separate written agreement that confirms scope, fees and responsibilities.

Property Information

Property availability, specifications, pricing and other listing information may change. Details must be confirmed directly with the Cordova team before they are relied upon.

Intellectual Property

Unless otherwise stated, the website's original text, branding and design are owned by or licensed to Cordova Property Management. They may not be reproduced commercially without written permission.

Third-Party Services

The website may link to or embed third-party services. Cordova does not control those services and is not responsible for their content, availability or privacy practices.

Availability and Liability

We work to keep the website accurate and available, but do not guarantee uninterrupted access or that every item is free from error. Nothing in these terms excludes liability that cannot lawfully be excluded.

Contact

Questions about these terms can be sent to customer@cordovaproperty.com. These website terms should be reviewed alongside our Privacy Policy.`,
    image: "",
    sourceUrl: "",
    type: "page",
    date: "2026-10-03T00:00:00Z",
    modified: "2026-10-03T00:00:00Z"
  }
];

function localizeLegacyImage(doc: StaticDoc): StaticDoc {
  if (!/https:\/\/(?:cordovaproperty\.com|property\.breakout-website\.com)\/wp-content\//i.test(doc.image)) return doc;
  return { ...doc, image: localProfileImages[doc.slug] || "" };
}

export const docs = [...manualDocs, ...generatedDocs.map((doc) => localizeLegacyImage(doc))]
  .filter((doc, index, all) => all.findIndex((candidate) => candidate.slug === doc.slug) === index) satisfies StaticDoc[];

export const pages = docs.filter((doc) => doc.type === "page");

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
    image: "/images/optimized/dubai-property-hero.webp",
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
