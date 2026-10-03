# Cordova Property Management — SEO Action Plan

This plan is ordered by business risk and expected organic impact. “Acceptance” describes the evidence required before an item is complete.

## Phase 0 — Immediate business protection (0–48 hours)

| Priority | Action | Owner | Effort | Acceptance |
|---|---|---|---:|---|
| Critical | Connect `LeadForm` to a real, monitored submission endpoint with validation, spam protection, error handling, and conversion tracking | Engineering + Operations | M | A test enquiry is received end-to-end; failure states are visible; no “demo form” copy remains |
| Critical | Remove, hide, or publish `/holiday-homes` and `/snagging-inspection` | Content + Engineering | S–M | Every primary navigation link returns 200 and contains an intentional page |
| High | Replace the cleaning-page placeholder `+971 00 000 0000` and make call/WhatsApp actions functional | Content | S | No placeholder data remains; actions open the correct destination |
| High | Normalize the official NAP and preferred host in one source of truth | Operations + Engineering | S | Footer, contact, profiles, metadata, schema inputs, and external citation brief match |
| High | Fix the Terms link and publish a genuine Terms page; begin rewriting the privacy policy for actual data flows | Legal/Operations + Content | M | Terms no longer resolves to Privacy; policy matches forms, CMS, video embeds, cookies, analytics, and retention |

## Phase 1 — Indexation and duplicate control (week 1)

| Priority | Action | Owner | Effort | Acceptance |
|---|---|---|---:|---|
| High | Add `src/app/robots.ts` with sitemap declaration and admin/auth exclusions | Engineering | S | `/robots.txt` returns 200 text/plain, references the preferred-host sitemap, and disallows private paths |
| High | Add dynamic `src/app/sitemap.ts` from public pages and published posts | Engineering | M | `/sitemap.xml` returns 200 valid XML; only canonical public 200 URLs are included; dates are real |
| High | Add self-referencing canonicals and `og:url` to every indexable template | Engineering | M | Crawl reports 100% canonical coverage and all URLs use the preferred host |
| High | Add `noindex, nofollow` metadata to admin, auth, login, preview, and CMS routes | Engineering | S | Private routes emit robots meta/header and do not inherit homepage metadata |
| High | 301 redirect `/blog-list` and `/blog-old` to `/blog` | Engineering | S | Old URLs return one-hop 301 to `/blog`; sitemap/internal links omit them |
| High | Consolidate the duplicate year-end maintenance posts | Content + Engineering | S | One canonical article remains; the retired URL 301s to it; internal links are updated |
| High | Rename `/blog/test` to a descriptive slug and redirect it | Content + Engineering | S | The public test slug is absent from internal links and sitemap |
| Medium | Add favicon and brand social/app images | Design + Engineering | S | `/favicon.ico` and declared icon assets return 200; previews use the intended brand image |

## Phase 2 — Metadata, entities, and templates (weeks 1–2)

| Priority | Action | Owner | Effort | Acceptance |
|---|---|---|---:|---|
| High | Replace scraped excerpts with intentional titles and 140–160-character descriptions for money pages, top traffic posts, listings, and team profiles | SEO + Content | L | No priority page has missing, duplicate, truncated, or obviously scraped metadata |
| High | Add a reusable Organization/WebSite/local-business JSON-LD graph | Engineering + Operations | M | Schema validates; fields are visible/verified; shared stable IDs are used |
| High | Add `Service`, `BlogPosting`, `ProfilePage`/`Person`, `BreadcrumbList`, and appropriate listing schema by template | Engineering + Content | L | Representative routes validate with no errors and no unsupported claims |
| High | Expose `dateModified` and named author/reviewer information on blog posts | Engineering + Editorial | M | Page UI, metadata, and BlogPosting schema agree |
| High | Replace generic first-three-record recommendations with curated topical relations | Engineering + Content | M | Every key page links to contextually relevant next steps |
| Medium | Add breadcrumb UI and schema to non-home routes | Engineering | M | Breadcrumbs are visible, crawlable, and match canonical hierarchy |
| Medium | Add explicit Twitter/Open Graph metadata, including correct absolute images | Engineering + Design | S | Social validators show the intended title, description, URL, and image |

## Phase 3 — Content and local authority (weeks 2–6)

| Priority | Action | Owner | Effort | Acceptance |
|---|---|---|---:|---|
| High | Audit and improve the 93 sub-800-word posts by intent, not word quota: merge, redirect, expand, or retain only when the answer is complete | Editorial + SEO | XL | Each cluster has one clear primary URL; thin/duplicate pages have a documented disposition |
| High | Add primary UAE/Dubai sources and a qualified reviewer to tax, RERA, tenancy, legal, and compliance content | Editorial + Subject expert | L | Claims link to primary sources; reviewer credentials and review date are visible |
| High | Add 3–5 contextual internal links per strategic article to relevant services, guides, resources, and conversion paths | Editorial | L | Crawl shows contextual links in article bodies; orphan/click-depth report improves |
| High | Publish verifiable trust evidence: licence/registration where applicable, dated reviews with source links, and quantified case studies | Operations + Content | L | Claims can be independently verified and appear on relevant service/about pages |
| High | Complete weak team profiles and link authors to credible Person pages | Operations + Editorial | M | Every named author has a complete profile, expertise scope, and verified external links where available |
| Medium | Add office hours, directions/map, GBP link, service area, and a local proof section | Local SEO + Operations | M | NAP/hours match GBP and schema; contact page supports local decision-making |
| Medium | Build a comparison/selection guide for “property management companies in Dubai” | SEO + Editorial | L | Page addresses shortlist criteria without cannibalizing the direct service page |
| Medium | Create original Dubai case studies and selectively useful service-area content | Operations + Editorial | L | Every page contains unique first-hand evidence and a clear user need; no doorway templates |
| Low | Add a concise `llms.txt` after canonical content and entities stabilize | SEO + Engineering | S | File returns 200 and lists only canonical, authoritative resources |

## Phase 4 — Performance and image delivery (weeks 1–4)

| Priority | Action | Owner | Effort | Acceptance |
|---|---|---|---:|---|
| High | Resize and recompress 2–5 MB source assets; convert appropriate images to AVIF/WebP | Design/Engineering | M | No ordinary content image exceeds the agreed byte/dimension budget |
| High | Remove unnecessary `unoptimized` flags and provide accurate responsive `sizes` | Engineering | M | Next serves appropriately sized modern formats; Lighthouse image savings materially fall |
| High | Paginate the 129-post blog index | Engineering + UX | M | Initial HTML/image count drops substantially; all pages remain crawlable with canonical pagination |
| Medium | Replace fully dynamic homepage/blog rendering with cached/revalidated data where business rules permit | Engineering | M | Root TTFB improves and content freshness remains correct |
| Medium | Self-host Montserrat or make CI font retrieval deterministic | Engineering | S–M | Production build succeeds without public font-network dependency |
| Medium | Fix Lighthouse contrast and non-descriptive-link failures | Design + Engineering | S | Accessibility audit no longer reports those failures |

## Phase 5 — Measurement and validation (after first deployment)

| Priority | Action | Owner | Effort | Acceptance |
|---|---|---|---:|---|
| High | Connect Google Search Console and GA4, verify the preferred-host property, and submit the sitemap | SEO/Analytics | M | Data is visible for the canonical property; sitemap is processed without systemic errors |
| High | Configure lead events and test the complete attribution path | Analytics + Engineering | M | Organic enquiries are recorded once with source/landing-page context |
| High | Inspect homepage, primary service, contact, one team page, and representative blog URLs | SEO | S | Google-selected canonical, index status, enhancements, and live test match intent |
| High | Establish a 28-day baseline | SEO/Analytics | S | Dashboard includes clicks, impressions, CTR, positions, indexed URLs, organic leads, LCP, INP, and CLS |
| Medium | Run a production crawl and schema validation after deploy | SEO/Engineering | S | No broken internal links, missing canonicals, private indexable URLs, or schema errors |
| Medium | Audit GBP, citation consistency, review velocity, and backlink quality with connected data sources | Local SEO | M | Findings are evidence-backed and folded into the next roadmap |

## Definition of done for the first remediation release

- All primary navigation and footer links resolve to their intended pages.
- Lead forms deliver real enquiries and are measured.
- Robots, sitemap, canonicals, preferred host, and admin noindex behavior are correct.
- Obsolete/duplicate blog routes have one-hop redirects.
- Priority pages have deliberate titles and descriptions.
- Global entity schema and representative route schema validate without unsupported data.
- NAP is consistent across visible pages and structured data.
- No placeholder business information remains.
- A production crawl, Lighthouse rerun, schema test, and Search Console spot-check are documented.
