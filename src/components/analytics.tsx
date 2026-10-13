"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isPublicAnalyticsPath, measurementId } from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  const initialized = useRef(false);
  const enabled = Boolean(measurementId && pathname && isPublicAnalyticsPath(pathname));

  useEffect(() => {
    if (!enabled || !pathname) {
      previousPath.current = null;
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      // Google's queue consumes the arguments object, before or after script loading.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    let referrer = "";
    try { referrer = document.referrer ? new URL(document.referrer).origin : ""; } catch { /* Invalid referrer. */ }
    const page = {
      page_location: `${window.location.origin}${pathname}`,
      page_referrer: previousPath.current ? `${window.location.origin}${previousPath.current}` : referrer
    };
    window.gtag("set", page);
    if (!initialized.current) {
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      initialized.current = true;
    }
    if (previousPath.current === pathname) return;
    // Exclude URL query strings/fragments and form fields from explicit events.
    window.gtag("event", "page_view", {
      send_to: measurementId,
      ...page
    });
    previousPath.current = pathname;
  }, [enabled, pathname]);

  if (!enabled) return null;
  return <Script id="google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />;
}
