import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const VISIT_COUNT_KEY = "autonext_visit_count";
const VISIT_LOG_KEY = "autonext_visit_log";
const SESSION_FLAG = "autonext_session_started";
const LOCATION_CACHE = "autonext_user_location";

type VisitLogEntry = {
  path: string;
  title: string;
  visitedAt: string;
  referrer: string;
};

const incrementVisitCount = (): number => {
  // Only increment once per browser session
  if (sessionStorage.getItem(SESSION_FLAG)) {
    return Number(localStorage.getItem(VISIT_COUNT_KEY) || 0);
  }
  sessionStorage.setItem(SESSION_FLAG, "1");
  const next = Number(localStorage.getItem(VISIT_COUNT_KEY) || 0) + 1;
  localStorage.setItem(VISIT_COUNT_KEY, String(next));
  return next;
};

export const VisitorTracker = () => {
  const { pathname } = useLocation();
  const bootRan = useRef(false);

  // Boot: capture IP, location, visit count once per session
  useEffect(() => {
    if (bootRan.current) return;
    bootRan.current = true;

    const count = incrementVisitCount();

    (async () => {
      let ipInfo: Record<string, unknown> = {};
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) ipInfo = await res.json();
      } catch (err) {
        console.warn("[VisitorTracker] IP lookup failed:", err);
      }

      const cachedLoc = sessionStorage.getItem(LOCATION_CACHE);
      const geo = cachedLoc ? JSON.parse(cachedLoc) : null;

      const visitor = {
        visitNumber: count,
        visitedAt: new Date().toISOString(),
        ip: (ipInfo as any).ip || "unknown",
        city: (ipInfo as any).city || geo?.place || "unknown",
        region: (ipInfo as any).region,
        country: (ipInfo as any).country_name,
        latitude: geo?.latitude ?? (ipInfo as any).latitude,
        longitude: geo?.longitude ?? (ipInfo as any).longitude,
        timezone: (ipInfo as any).timezone,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || "direct",
      };

      console.log("%c[VisitorTracker] New visitor session", "color:#16a34a;font-weight:bold", visitor);
      // TODO: push to /analytics endpoint going forward
    })();
  }, []);

  // Per-route page-view tracking
  useEffect(() => {
    const entry: VisitLogEntry = {
      path: pathname,
      title: document.title,
      visitedAt: new Date().toISOString(),
      referrer: document.referrer || "direct",
    };

    const existing: VisitLogEntry[] = JSON.parse(
      sessionStorage.getItem(VISIT_LOG_KEY) || "[]"
    );
    existing.push(entry);
    sessionStorage.setItem(VISIT_LOG_KEY, JSON.stringify(existing));

    console.log("%c[VisitorTracker] Page view", "color:#2563eb", entry);
    console.log("[VisitorTracker] Pages visited this session:", existing.map((e) => e.path));
    // TODO: push page view to analytics pipeline
  }, [pathname]);

  return null;
};
