import { useState, useEffect } from "react";

const GEO_COUNTRY_KEY = "plivo_geo_country";
const GEO_CONTINENT_KEY = "plivo_geo_continent";

export interface GeoInfo {
  country: string;
  rawCountry: string;
  continent: string;
}

// Default selection: India users → India, everyone else → US
function effectiveCountry(code: string): string {
  return code === "IN" ? "IN" : "US";
}

function getCached(): GeoInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(GEO_COUNTRY_KEY);
    const continent = sessionStorage.getItem(GEO_CONTINENT_KEY);
    if (raw && continent) return { country: effectiveCountry(raw), rawCountry: raw, continent };
    if (raw) return { country: effectiveCountry(raw), rawCountry: raw, continent: "" };
    return null;
  } catch {
    return null;
  }
}

/**
 * Detects the user's country and continent via IP geolocation.
 * Returns { country, continent } with 2-letter ISO codes (e.g. "US", "NA").
 * Caches in sessionStorage so the API is only called once per session.
 *
 * @param fallback Country code to use before/if geo lookup fails (default "US")
 */
export function useGeoCountry(fallback: string = "US"): GeoInfo {
  const [geo, setGeo] = useState<GeoInfo>(
    () => getCached() || { country: fallback, rawCountry: fallback, continent: "" }
  );

  useEffect(() => {
    if (getCached()?.continent) return;

    const controller = new AbortController();

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Geo lookup failed");
        return res.json();
      })
      .then((data: { country_code?: string; continent_code?: string }) => {
        const country = (data.country_code || "").trim().toUpperCase();
        const continent = (data.continent_code || "").trim().toUpperCase();
        if (/^[A-Z]{2}$/.test(country)) {
          try {
            sessionStorage.setItem(GEO_COUNTRY_KEY, country);
            if (continent) sessionStorage.setItem(GEO_CONTINENT_KEY, continent);
          } catch {
            /* quota exceeded */
          }
          setGeo({ country: effectiveCountry(country), rawCountry: country, continent });
        }
      })
      .catch(() => {
        /* network error or abort */
      });

    return () => controller.abort();
  }, []);

  return geo;
}
