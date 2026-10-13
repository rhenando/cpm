// Measurement stays disabled until a real GA4 web-stream ID is configured.
export const measurementId = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "")
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!
  : "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isPublicAnalyticsPath(path: string) {
  return !/^\/(admin|auth|api)(\/|$)/.test(path);
}

export function trackSavedEnquiry() {
  if (!measurementId || typeof window === "undefined" || !isPublicAnalyticsPath(window.location.pathname)) return;
  // Analytics must never turn a successfully saved enquiry into a form error.
  try {
    window.gtag?.("event", "generate_lead", {
      send_to: measurementId,
      form_name: "contact_enquiry",
      page_location: `${window.location.origin}${window.location.pathname}`
    });
  } catch {
    // Contact delivery is independent of analytics/ad blockers.
  }
}
