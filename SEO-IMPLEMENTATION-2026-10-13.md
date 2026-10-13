# SEO implementation — 13 October 2026

## Completed changes

- Added specific permanent redirects for the two backlink destinations confirmed broken in the SEOptimer review. Their matching live articles and sitemap entries were checked before implementation.
- Changed the main service-page title to `Dubai Property Management Services & Fees | Cordova`, distinguishing it from the homepage.
- Removed the general crawler block on `/_next/` so public rendering resources are accessible; private admin/auth/API rules remain.
- Replaced the generic homepage about-link text with a descriptive label.
- Created a 960px living-room image variant: 36,882 bytes versus 177,554 bytes, about 79% smaller. The existing large asset remains available. Runtime Vercel image optimization remains disabled because the existing source records a billing limitation.
- Removed request-time and unsupported fixed sitemap modification dates. Article/page dates still use available valid content dates; invalid dates are omitted.
- Added optional GA4 page-view and saved-enquiry events, gated by a real measurement ID. Added an optional Search Console HTML verification token.
- Only successful database inserts return the conversion-eligible flag. Honeypot responses, invalid requests and database errors do not count as leads. Duplicate in-flight form submissions are blocked, and analytics failure cannot invalidate a saved enquiry.
- Extended the SEO verification script so empty sitemaps, bad redirects, broken spot-check routes and rendering-resource blocks cause failures.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed, including type validation and 172 generated build entries.
- `node scripts/test-analytics.mjs`: passed for disabled/invalid IDs, private routes, event parameters, query-string exclusion and unavailable/throwing analytics.
- `node scripts/test-contact-measurement.mjs`: passed using a mocked database; no real enquiries submitted.
- `node scripts/verify-seo.mjs http://127.0.0.1:3016`: all 167 sitemap URLs passed the script's status/metadata checks; five expected redirects passed; private noindex and discovery/utility routes passed.
- Built HTML confirmed distinct homepage/service titles, the smaller image reference, and no GA script when unconfigured.

These checks do not establish Google indexation, ranking improvement, real-world CWV or successful receipt by Google Analytics. No fresh Lighthouse score is claimed.

## Account-dependent work

No GA4 ID, Search Console token, Google account connection or GBP management access is available in this workspace. Integrations are prepared but not activated. See [SEO-MEASUREMENT.md](SEO-MEASUREMENT.md) for concrete configuration and verification steps. The GBP landline/mobile discrepancy remains a business-detail verification item; no phone number was guessed or changed.

Current keyword/backlink estimates remain in [SEOPTIMER-REVIEW-2026-10-13.md](SEOPTIMER-REVIEW-2026-10-13.md). No historical comparison or new vendor-equivalent score is claimed. Original expertise, customer evidence and case-study results require authentic business information and were not fabricated.
