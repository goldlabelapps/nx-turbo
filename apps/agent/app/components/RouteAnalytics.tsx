"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: Record<string, unknown>) => void;
  }
}

export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const url = pathname;

    window.gtag?.("event", "page_view", { page_path: url });
    window.plausible?.("pageview", { props: { path: url } });

    window.dispatchEvent(
      new CustomEvent("nx:pageview", {
        detail: { path: url, at: new Date().toISOString() },
      }),
    );
  }, [pathname]);

  return null;
}
