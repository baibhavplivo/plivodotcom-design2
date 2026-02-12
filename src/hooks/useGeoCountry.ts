import { useState, useEffect } from "react";

const GEO_CACHE_KEY = "plivo_geo_country";

/** Read cached country code synchronously from sessionStorage */
function getCached(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(GEO_CACHE_KEY);
  } catch {
    return null;
  }
}

/**
 * Detects the user's country via IP geolocation.
 * Returns 2-letter ISO country code (e.g. "US", "IN").
 * Caches in sessionStorage so the API is only called once per session.
 *
 * @param fallback Country code to use before/if geo lookup fails (default "US")
 */
export function useGeoCountry(fallback: string = "US"): string {
  const [country, setCountry] = useState<string>(() => getCached() || fallback);

  useEffect(() => {
    // Already cached — nothing to fetch
    if (getCached()) return;

    const controller = new AbortController();

    fetch("https://ipapi.co/country/", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Geo lookup failed");
        return res.text();
      })
      .then((code) => {
        const trimmed = code.trim().toUpperCase();
        if (/^[A-Z]{2}$/.test(trimmed)) {
          try {
            sessionStorage.setItem(GEO_CACHE_KEY, trimmed);
          } catch {
            /* quota exceeded — ignore */
          }
          setCountry(trimmed);
        }
      })
      .catch(() => {
        /* network error or abort — keep fallback */
      });

    return () => controller.abort();
  }, []);

  return country;
}
