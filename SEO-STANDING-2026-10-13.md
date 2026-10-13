# Cordova Property Management: SEO standing and keyword baseline

**Update:** A supplied SEOptimer report now provides third-party keyword/backlink estimates. See [the SEOptimer review](SEOPTIMER-REVIEW-2026-10-13.md) for those estimates, verified broken backlink destinations, and revised priorities. Statements below about unavailable ranking/backlink data describe the initial draft before that PDF was supplied. No historical performance comparison is available; current estimates cannot establish gains or losses.

Draft date: 13 October 2026

Website: https://www.cordovaproperty.com

Scope: repository review, historical audit reconciliation, five live commercial-page checks, live robots/sitemap checks, and exploratory web search. This is a preliminary standing report, not a fresh full-site audit or ranking measurement.

## Executive assessment

The site's basic SEO implementation has improved substantially since the 3 October audit. The sampled live pages now have metadata, canonical URLs and JSON-LD, and the previously reported missing service pages respond successfully. The next priority is to measure organic visibility and leads, then focus content work on the queries and pages showing real opportunity.

**Current organic competitiveness remains unmeasured.** No Search Console query export, connected ranking tool, GA4 performance data, or backlink dataset was available for this draft. Target keywords below are inferred from the site's pages; they are not verified rankings.

The original `FULL-AUDIT-REPORT.md` gives 47/100. A later cache dated 3 October gives 85/100 after remediation. These represent different historical states and neither is a verified current production score. No new numerical score is assigned without a broader crawl, content review and performance measurements.

## Current evidence

Direct HTTPS requests on 13 October produced these results:

| Page | HTTP | Title | Canonical | H1 count | JSON-LD blocks |
|---|---:|---|---|---:|---:|
| `/` | 200 | Property Management Dubai — Cordova | Present, preferred host | 1 | 1 |
| `/property-management` | 200 | Property Management Dubai — Cordova | Present, route-specific | 1 | 2 |
| `/holiday-homes` | 200 | Holiday Home Management Dubai — Cordova | Present, route-specific | 1 | 2 |
| `/snagging-inspection` | 200 | Property Snagging Inspection Dubai — Cordova | Present, route-specific | 1 | 2 |
| `/cleaning-services` | 200 | Professional Cleaning Services Dubai — Cordova | Present, route-specific | 1 | 2 |

Titles above use a dash for display; actual title separators are pipes. All five have descriptions and `index, follow` robots metadata. JSON-LD presence does not establish schema validity or rich-result eligibility. An indexable response does not prove Google has indexed the page.

The live sitemap returns HTTP 200 and contains **167 URLs, all unique**. This is a discovery inventory, not an indexed-page count; individual sitemap URLs were not all crawled. The live robots file declares the preferred-host sitemap and blocks admin, auth, API and `/_next/` for general crawlers.

Current source contains canonical/social metadata helpers, organization/real-estate entity markup, service metadata, blog pagination, and sitemap generation. Historical findings that these features are entirely absent should not be carried into a new report.

## Findings and priorities

| Priority | Finding | Evidence and next action |
|---|---|---|
| High | Actual search performance is unavailable | Obtain Search Console data before claiming rankings, traffic gains, losses or keyword opportunity size. |
| Medium | Homepage and main service page have identical titles and closely overlapping targets | Confirmed in live HTML. Use query-to-page data to decide how to distinguish their intent and snippets. Overlap is a risk to investigate, not proven cannibalization. |
| Medium | General crawlers are blocked from `/_next/` | Confirmed in live robots. Check rendered URL Inspection and resource access; allow public rendering assets if blocked. Do not treat this as a confirmed indexing failure without testing. |
| Medium | Editorial expertise still needs attention | Earlier audit raised weak first-hand evidence and sourcing; source review still finds corporate blog attribution. Review priority articles individually and add accurate expert ownership and original evidence. |
| Medium | Image delivery and real-user performance need measurement | Current configuration disables Next image optimization globally. Measure live image transfer and mobile field CWV before estimating impact; historical local Lighthouse results are not current field results. |
| Medium | Sitemap modification dates need review | Source uses the current time for pagination and fixed dates for some pages. Align dates with meaningful content changes. |
| Measurement gap | Local visibility, backlinks and lead attribution | GBP/map rankings, referring domains, organic leads and real-user LCP/INP/CLS remain unverified. |

## Keyword themes currently targeted

These are candidate phrases supported by service positioning and page titles. Search volume, difficulty, current position and traffic are **unknown for every row**.

| Keyword/theme | Intent | Current or candidate landing page | Business priority |
|---|---|---|---|
| property management Dubai | Commercial | `/` and `/property-management` | Highest; clarify page roles |
| property management services Dubai | Commercial | `/property-management` | High |
| property management companies in Dubai | Comparison | `/property-management`, potentially supported by a useful selection guide | High; validate intent and visibility |
| holiday home management Dubai | Commercial | `/holiday-homes` | High |
| property snagging inspection Dubai | Commercial | `/snagging-inspection` | High |
| professional cleaning services Dubai | Commercial | `/cleaning-services` | Secondary; focus on relevant property-owner needs |
| Cordova Property Management / Cordova Properties Dubai | Branded | Homepage, about and contact | Track separately from non-brand |
| properties for rent in Dubai | Transactional | `/properties-for-rent-dubai` in source | Depends on available inventory |
| Dubai landlord maintenance, lease renewals, furnished-rental inventory | Informational | Relevant blog posts | Supporting; prioritize using query evidence |

The first five commercial themes are a practical tracking seed set. They do not establish which keywords Cordova is already competing for successfully.

## Competition: what is known

An exploratory search for property-management companies in Dubai surfaced comparison publishers and directories, including [Property Finder's company guide](https://www.propertyfinder.ae/blog/property-management-companies-dubai/) and [Yello's Dubai category](https://www.yello.ae/category/property-management/city%3Adubai). This indicates that comparison content is part of the search landscape.

This was not a Dubai-location-controlled Google rank check. Result ordering, Cordova's absence or presence, competitor positions and market share cannot be inferred from this sample. A competitive ranking report should check each priority query by location/device, record ranking URLs, and distinguish direct service businesses from publishers and directories.

## Data required to finish the ranking report

Use the verified domain's Search Console **Performance → Search results**, search type **Web**. Export Queries and Pages for the last three complete months and the preceding equivalent period. Include clicks, impressions, CTR and average position. Add a UAE view and mobile/desktop splits; retain a global view because overseas owners may also be customers. Query-by-page data is preferable for detecting overlapping landing pages.

[Google's Performance report documentation](https://support.google.com/webmasters/answer/7576553?hl=en) explains these metrics and exports. Average position is aggregated across impressions, not a fixed universal rank; query tables may not expose every search.

The completed keyword table should contain: query, landing page, country/device, clicks, impressions, CTR, average position, previous-period change, intent, and recommended action. Keep branded and non-branded results separate. Prioritize meaningful impressions near page-one positions and high-impression pages with weak CTR, while checking intent and lead value.

Use GA4 or equivalent lead attribution for organic enquiries and landing-page conversion. Use Search Console indexing/URL Inspection for Google-selected canonicals and index coverage, and CrUX/PageSpeed for field performance where sufficient data exists.

## Suggested 30-day work plan

1. **Week 1:** gather search data, establish baseline metrics, check priority URL indexing and rendering, and validate lead attribution.
2. **Week 2:** map observed queries to landing pages; resolve homepage/service overlap where data supports it; improve priority snippets.
3. **Weeks 2–3:** strengthen commercially relevant articles with expert review, primary sources, original examples and useful service links.
4. **Weeks 3–4:** measure mobile performance, review GBP and competitor visibility, and produce a recurring report of non-brand clicks, qualified organic leads and keyword/page movement.

## Evidence and limitations

- Historical files: `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `.seo-cache/audit-scores.json`, `.seo-cache/site-meta.json`; dated 3 October, treated as historical only.
- Current source: `src/lib/seo.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, route templates and `next.config.ts`.
- Live sources: the five routes in the evidence table, [robots.txt](https://www.cordovaproperty.com/robots.txt), and [sitemap.xml](https://www.cordovaproperty.com/sitemap.xml).
- The browser tool could not retrieve several endpoints; direct curl requests subsequently retrieved the sampled pages and discovery files. Tool retrieval errors were not classified as site failures.
- No full crawl, fresh Lighthouse run, screenshot/mobile audit, external schema validation, Google index inspection, backlink audit or authenticated analytics review was completed in this draft.
- Website implementation was not changed. The report is a baseline for review and measurement, with no promise of ranking improvement.
