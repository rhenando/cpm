import { SITE_URL } from "@/lib/seo";

export function GET() {
  const body = `# Cordova Property Management

> Professional property management, leasing support, inspections and property care for owners and tenants across Dubai, United Arab Emirates.

## Primary pages
- [Home](${SITE_URL}/)
- [Property management](${SITE_URL}/property-management)
- [Holiday home management](${SITE_URL}/holiday-homes)
- [Property snagging inspections](${SITE_URL}/snagging-inspection)
- [Cleaning services](${SITE_URL}/cleaning-services)
- [About Cordova](${SITE_URL}/about-cordova-property-management)
- [Contact](${SITE_URL}/contact)

## Resources
- [Dubai real estate insights](${SITE_URL}/blog)
- [Dubai real estate resources](${SITE_URL}/dubai-real-estate-resources)
- [Privacy policy](${SITE_URL}/privacy-policy)
- [Website terms](${SITE_URL}/terms-of-service)

## Contact
- Email: customer@cordovaproperty.com
- Location: The One Tower, Sheikh Zayed Road, Barsha Heights, Dubai, UAE
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
