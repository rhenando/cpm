# Search and enquiry measurement

## Current implementation

Analytics is disabled unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` contains a real GA4 web-stream ID (`G-…`). No ID or Google account credentials were available in this workspace. Code support is ready; a Google property has not been created or connected.

When configured, the public site loads the Google tag after hydration, queues an explicit page view for each pathname change, and sends `generate_lead` only when `/api/contact` confirms a database insert with `recorded: true`. Failed requests and honeypot responses do not generate that event. Repeated submit clicks while a request is pending are blocked. Ad-blocker or analytics failures do not change enquiry success.

Explicit event payloads omit contact fields, query strings and fragments. Referrers are reduced to origins on entry. Admin/auth/API routes do not load the component's tag or send its explicit events. This minimal implementation does not preserve UTM campaign parameters or measure telephone/email clicks; those would need a separately validated attribution design.

## Activation steps requiring Google account access

1. Create/select the business's GA4 property and web stream for `https://www.cordovaproperty.com`.
2. Disable Enhanced Measurement for this stream before enabling this implementation. Page views are sent explicitly; history-based page views could duplicate them, and automatic form events are not verified enquiries. Do not also install the same property via Tag Manager.
3. Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the hosting environment and rebuild/redeploy. Apply the site's chosen analytics disclosure/consent configuration before activation; this change does not provide a consent manager.
4. Verify one page view on entry and on internal navigation in Realtime/DebugView. Verify one `generate_lead` for a saved test enquiry, none for rejected requests, and mark `generate_lead` as a key event. Local tests use a synthetic ID and mocked event queue, not a real Google destination.
5. Set up Search Console. A Domain property uses Google's DNS verification record. Alternatively, for the preferred-host URL-prefix property, set `GOOGLE_SITE_VERIFICATION` to Google's HTML verification token and deploy. This emits a verification meta tag; it does not itself verify ownership.
6. Submit `https://www.cordovaproperty.com/sitemap.xml`, inspect priority service/article URLs, and start a dated baseline. GA4 installation does not connect Search Console automatically.

## Reporting baseline

Weekly: clicks, impressions, CTR and average position by query/page; brand versus non-brand; UAE versus other countries; mobile versus desktop; indexing issues; organic enquiries. Compare only periods with actual collected data. The SEOptimer PDF is a third-party estimate snapshot, not historical measured traffic.

Keyword seeds: property management Dubai; property management services Dubai; property management companies in Dubai; holiday home management Dubai; property snagging inspection Dubai; professional cleaning services Dubai; Cordova Property Management. Do not label these verified ranking queries until data confirms them.

References: [Google event setup](https://developers.google.com/analytics/devguides/collection/ga4/events), [Search Console Performance](https://support.google.com/webmasters/answer/7576553?hl=en).
