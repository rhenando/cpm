# Cordova Property Management — Full SEO Audit

Audit date: 3 October 2026  
Project: Next.js 15 website in this repository  
Canonical domain configured in source: `https://cordovaproperty.com`  
Live host observed: `https://www.cordovaproperty.com`

## Executive summary

**SEO Health Score: 47/100 — substantial remediation required**

The site has a strong visual foundation, server-rendered content, a clear Dubai property-management focus, good heading discipline, and a large body of indexable editorial content. However, the current project lacks the basic discovery and entity signals expected of a mature local-service site: there is no sitemap, robots file, canonical coverage, or structured data. The content estate also contains stale and duplicate URLs, overlong search snippets, weak source/author signals, and almost no contextual internal linking.

The most serious business issue is not a ranking issue: every lead form discards the enquiry in the browser and displays a demo confirmation. Two advertised services in the primary navigation also return 404.

### Weighted scorecard

| Category | Score | Weight | Weighted contribution |
|---|---:|---:|---:|
| Technical SEO | 58/100 | 22% | 12.8 |
| Content quality | 43/100 | 23% | 9.9 |
| On-page SEO | 48/100 | 20% | 9.6 |
| Schema / structured data | 0/100 | 10% | 0.0 |
| Performance / CWV | 78/100 | 10% | 7.8 |
| AI-search readiness | 52/100 | 10% | 5.2 |
| Images | 42/100 | 5% | 2.1 |
| **Overall** | **47/100** | **100%** | **47.4** |

Supporting scores: local SEO 31/100; internal linking 28/100; E-E-A-T 39/100; main service-page SXO 47/100; visual/mobile presentation 90/100.

### Business and site type

- Hybrid local-service business with a physical Dubai office and citywide service delivery.
- Primary vertical: property and tenancy management.
- Secondary topics: maintenance, cleaning, inspections, rental listings, landlord guidance, and Dubai real estate.
- Audited build: 153 successful HTML routes, including 129 blog posts and 23 imported/generated records.

### Highest-priority issues

1. **Business critical:** all lead forms discard submissions. `src/components/lead-form.tsx:8` only prevents the default event and changes local state; the success copy calls it a demo form.
2. **High:** `robots.txt`, `sitemap.xml`, and `llms.txt` return 404 locally and on the live host. There is no discovery file or admin crawl policy.
3. **High:** 0/153 audited routes emit a canonical URL, and source `metadataBase` uses the non-`www` host while production resolves to `www`.
4. **High:** no structured data was found in source, build output, or the sampled live pages.
5. **High:** `/holiday-homes` and `/snagging-inspection` are linked from the primary navigation but return 404.
6. **High:** 135/153 titles exceed 60 characters and 144/153 descriptions exceed 160 characters; most CMS snippets are scraped excerpts of roughly 220–269 characters.
7. **High:** the 129-post blog is broad but shallow and weakly sourced: median 666 words, 93 posts below 800 words, only eight with basic citation language, and none with first-hand evidence phrasing in the audit sample.
8. **High:** legacy and duplicate URLs remain indexable: `/blog-list`, `/blog-old`, `/blog/test`, and two separately published posts with the same year-end maintenance title.
9. **High:** blog posts have no contextual internal links, related-article module, breadcrumbs, named author profiles, or qualified reviewers for legal/tax/compliance topics.
10. **High:** NAP details differ between global settings, the contact page, and imported profiles.

### Quick wins

1. Add real form delivery and remove the demo response.
2. Add `src/app/robots.ts`, `src/app/sitemap.ts`, and self-referencing canonicals.
3. Apply `noindex` to `/admin`, `/auth`, preview, and login routes.
4. Remove or build the two broken service routes.
5. Redirect `/blog-list` and `/blog-old` to `/blog`; rename/redirect `/blog/test`; consolidate the duplicate article.
6. Normalize the preferred host and NAP everywhere.
7. Add global Organization/LocalBusiness/WebSite JSON-LD and template-specific schema.
8. Replace scraped metadata excerpts with intentional search snippets.
9. Optimize the largest images and remove unnecessary `unoptimized` usage.
10. Replace generic related links with topical service/article links.

## Methodology and evidence

- Inspected Next.js route, metadata, content, CMS, navigation, image, and configuration source.
- Ran a production build. It compiled, type-checked, generated 153 pages, and completed after network access to Google Fonts was allowed.
- Crawled the 153 generated/local rendered HTML routes and measured titles, descriptions, H1s, canonicals, robots meta, JSON-LD, and images.
- Checked representative status codes and response sizes from the local production server.
- Verified live `/`, `/property-management`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt`. The apex redirects to `www`; all three discovery endpoints return 404.
- Ran mobile Lighthouse against the local homepage. Lab runs varied materially under concurrent machine load, so the performance findings are directional and are not a substitute for CrUX field data.
- Reviewed homepage desktop/mobile captures, source image inventory, 129 CMS posts, and representative commercial, team, property, legal, and blog pages.

## Technical SEO

### Crawlability and discovery

| Finding | Severity | Evidence | Recommendation |
|---|---|---|---|
| No XML sitemap | High | No `sitemap.ts` or public XML; local and live `/sitemap.xml` return 404 | Generate from public pages plus published posts; include real modification dates and only canonical 200 URLs |
| No robots file | High | No `robots.ts`; local and live `/robots.txt` return 404 | Add a sitemap declaration and disallow admin/auth/preview paths |
| No canonical links | High | 0/153 rendered routes contain `rel="canonical"` | Add route-specific `alternates.canonical`; redirect duplicate routes |
| Preferred-host mismatch | Medium | `src/app/layout.tsx:21` uses the apex; live traffic resolves to `www` | Choose one host and align redirects, metadataBase, sitemap, canonicals, JSON-LD, and OG URLs |
| Admin login is indexable | High | `/admin/login` returns 200 with homepage title/description and no robots directive | Set admin layouts to `noindex, nofollow`; disallow them in robots |
| Broken primary-nav URLs | High | `/holiday-homes` and `/snagging-inspection` return 404; linked in `src/data/site.ts:28-30` | Publish complete pages or remove the links until ready |
| Missing favicon and web manifest | Medium | Local `/favicon.ico` and `/manifest.webmanifest` return 404 | Add brand favicon/app icons and a manifest if installability is intended |
| External font dependency during build | Medium | Restricted build failed fetching `fonts.googleapis.com`; allowed build succeeded | Self-host the font or guarantee network/cache access in CI |

Positive technical signals:

- All 153 audited build routes returned 200.
- Public content is present in initial server-rendered HTML.
- Every audited public route had one H1.
- Security headers include HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.
- The production build completes and shared first-load JavaScript is about 103 kB.

### Cache behavior

The homepage and `/blog` are forced dynamic and send private/no-cache behavior, while static routes use long-lived shared caching. The dynamic choice increases origin work and makes homepage response time more sensitive to the CMS. Revalidate only the data that changes, and prefer incremental/static rendering where possible.

## On-page SEO

### Metadata coverage

- Titles were present on all 153 audited routes, but 135 exceed 60 characters and 131 exceed 70 characters.
- One page, `/blog-list`, has no meta description.
- 144/153 descriptions exceed 160 characters; 142 exceed 200 characters.
- Most long descriptions are scraped content excerpts and often include title/byline duplication or end mid-sentence.
- Duplicate title groups include:
  - Homepage and `/admin/login`.
  - `/blog` and `/blog-old`.
  - Two separate year-end maintenance posts.
- No page includes `og:url`; Twitter-card metadata is also not explicitly implemented.

The title template appends `| Cordova Property Management` to already-long article headlines. For editorial pages, shorten the title or use a compact suffix such as `| Cordova` when it improves clarity.

### Heading and intent alignment

- Heading structure is generally strong: one H1 per audited route and substantial H2/H3 structure on articles.
- The homepage H1, “Property Management Dubai,” matches the primary local commercial topic.
- `/property-management` uses the brand-led H1 “Your property, beautifully managed.” It is persuasive but should be paired with an explicit, prominent service/location phrase.
- Property detail pages do not fully satisfy listing intent: they lack visible price, availability, listing agent specificity, gallery depth, map/location context, and related listings.

## Content quality and E-E-A-T

### Blog estate

| Measure | Result |
|---|---:|
| Published CMS posts | 129 |
| Median word count | 666 |
| Posts below 800 words | 93 |
| Posts below 1,500 words | 122 |
| Posts with basic citation-language signals | 8 |
| Posts with first-person tested/found/observed signals | 0 |

Word count is not a ranking factor; these figures are evidence of limited depth when combined with weak sourcing, repetition, generic bylines, and minimal first-hand proof.

High-risk content groups include Dubai tax, tenancy rights, RERA, compliance, and legal-process articles. They should name a qualified author or reviewer, show a reviewed/updated date, cite primary UAE/Dubai sources beside claims, and carry a clear informational disclaimer.

### Trust signals

Strengths:

- Named team pages, physical address, phone, email, and social profiles.
- Clear service pricing and inclusions on `/property-management`.
- Prominent consultation CTAs and useful service detail.

Gaps:

- Generic corporate bylines and no linked author/reviewer credentials.
- No visible RERA/DET licence, membership, accreditation, press, or verifiable award details.
- Testimonials lack dates, platform attribution, rating/count, or external review links.
- Three team members use short fallback bios because no source document exists.
- The privacy policy is stale WordPress boilerplate and does not reflect the current forms, Supabase CMS, embedded video, or actual data flows.
- “Terms of Service” links to `/privacy-policy` in `src/components/footer.tsx:89`.
- `/cleaning-services` contains the placeholder phone number `+971 00 000 0000`.

## Internal linking and information architecture

- Rendered blog posts contain no contextual internal links; navigation is limited to global chrome and the generic CTA.
- `src/app/[...slug]/page.tsx:71` chooses the first three records of the same broad type, creating unrelated recommendations. For example, the cleaning page links to a staff profile, a vendor article, and a property listing.
- `/blog-list` and `/blog-old` compete with `/blog`.
- `/blog/test` is public and linked.
- The two year-end maintenance URLs create direct cannibalization.
- The property index says all stock is occupied and does not link to the existing property detail routes.

Build topic-aware related-content rules around service, audience, location, and funnel stage. Add breadcrumbs and 3–5 useful contextual links to long articles.

## Structured data

**Score: 0/100.** No JSON-LD, Microdata, or RDFa was found.

Recommended graph:

| Route group | Recommended types |
|---|---|
| Sitewide/home | `WebSite`, `Organization`, accurate `LocalBusiness`/real-estate entity, stable `@id`, logo, address, contact points, `areaServed`, verified `sameAs` |
| Service pages | `Service` with provider, Dubai/UAE service area, and only prices/offers visible on the page |
| Contact/about | `ContactPage` and `AboutPage`, linked to the organization entity |
| Team profiles | `ProfilePage` with `Person`, role, image, and `worksFor` |
| Blog index/posts | `Blog`/`CollectionPage`, then `BlogPosting` with canonical, image, dates, named author/reviewer, and publisher |
| Property pages | `ItemList` on the index; appropriate residence type plus `Offer` only when complete price and availability data exists |
| Property-management video | `VideoObject` with supported name, description, thumbnail, upload date, and embed URL |
| Non-home pages | `WebPage` and `BreadcrumbList` connected through shared IDs |

Do not add unsupported review ratings, opening hours, prices, awards, or FAQ markup merely to seek rich results.

## Local SEO

**Score: 31/100.** The site clearly targets Dubai and displays contact details globally, but lacks the verification layer expected for a local real-estate service.

Key gaps:

- Address and office-phone variants are inconsistent across `src/data/site-settings.ts`, the contact component, and imported profiles.
- No local-business entity schema, geo coordinates, opening hours, directions, map, GBP link, or review evidence.
- No crawlable Dubai-area case studies or service-area pages.
- No repository evidence of consistent Bing Places, Apple Business Connect, Property Finder, Bayut, or major directory profiles.

Normalize one official business name, address, primary phone, secondary numbers, hours, and preferred URL before generating schema or citation profiles.

## Performance and Core Web Vitals

### Lighthouse evidence

Two local mobile lab runs varied under machine contention:

- Performance: 61–91.
- SEO: 91.
- Accessibility: 96 in the captured full-category run.
- LCP: 2.3–2.9 seconds.
- CLS: approximately 0.
- TBT: 190–3,460 ms, showing the local test environment was unstable during one run.
- Total homepage transfer: about 1,021 KiB.
- Root-document latency: about 710–730 ms.
- Estimated image-delivery savings: about 731 KiB.

Treat these as lab diagnostics, not field CWV. No CrUX, Search Console, or real-user INP data was available. The repeatable issues are oversized image delivery, a dynamic root document, and avoidable origin latency.

## Images

**Score: 42/100.** Alt coverage is much better than delivery efficiency.

- The rendered crawl found 603 image instances, no missing `alt` attributes, and seven intentional/empty alt values.
- The homepage loads a roughly 698 KiB living-room JPEG at 2560 px for a display width around 480 px.
- Several hero images use `unoptimized`, bypassing Next image resizing/format negotiation.
- Source inventory includes five 4.0–4.9 MB team portraits, a 4.58 MB `car.jpg`, and three 2.2–2.3 MB PNG files.
- The blog index renders 132 images and about 555 kB of HTML in one response, with no pagination.

Resize source assets near their maximum display dimensions, use AVIF/WebP where supported, restore Next optimization, define accurate `sizes`, and paginate or progressively load the blog index.

## Visual and mobile review

The desktop homepage has a clear luxury positioning, strong contrast in the hero, visible contact information, a focused H1, and obvious primary CTAs. Lighthouse’s mobile emulation showed the full H1 and both CTAs with the responsive menu. A raw headless-Chrome capture showed horizontal clipping, but that capture did not reproduce Lighthouse’s emulated viewport reliably; verify overflow on physical iOS/Android devices before treating it as a confirmed defect.

One confirmed accessibility issue from Lighthouse is insufficient foreground/background contrast in at least one UI treatment. There is also one non-descriptive link. Resolve both during the first design QA pass.

## AI-search readiness

**Score: 52/100.** Content is technically accessible and well structured, but hard to cite confidently.

Positive signals:

- Server-rendered HTML, semantic articles, one H1, visible dates, lists, and descriptive headings.
- Visible NAP and social profiles.
- A video on the main service page.

Weaknesses:

- No entity/schema graph, named expert authors, reviewer credentials, in-article primary sources, or dateModified output.
- Statistical and regulatory claims are frequently unsupported.
- No `llms.txt`; this is an emerging convention rather than a ranking requirement.
- Imported content contains heading artifacts and limited passage-level proof.

Add primary-source citations beside factual claims, concise answer-first summaries, named expert ownership, original local case evidence, and consistent entity markup. Add `llms.txt` only after the core technical work; treat any content-licensing policy separately from SEO.

## SXO and conversion

`/property-management` fits direct service intent and clearly presents inclusions and 5%/7% fee tiers. It is weaker for comparison-driven queries such as “property management companies in Dubai,” where users expect licence verification, review evidence, clear differentiation, case results, and a working low-friction consultation path.

The nonfunctional lead form invalidates the final step of every service journey. Fixing it is the first business action even though it is not part of the weighted SEO score.

## Limitations

- No Search Console, GA4, URL Inspection, CrUX field data, or Google Business Profile Insights were connected.
- No Moz/Bing backlink credentials were configured; Common Crawl cache contained no prior domain data.
- The provided Python fetch/Google/drift utilities could not run because the local Python environment lacks `requests`; equivalent HTTP/build checks were used where possible.
- No location-controlled Dubai Google local-pack or geo-grid test was performed.
- Off-site citation consistency, review velocity, backlink quality, and true index coverage remain unverified.
- The live check sampled core endpoints rather than crawling the entire deployed site.

## Recommended next measurement

After the critical/high fixes deploy, connect Search Console and GA4, submit the sitemap, inspect representative service/blog URLs, and establish a 28-day baseline for impressions, clicks, CTR, indexed pages, leads, LCP, INP, and CLS. A GSC/GA4 integration was identified but was not connected during this audit.
