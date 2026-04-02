import { useState, useEffect } from "react";

const GEO_COUNTRY_KEY = "plivo_geo_country";
const GEO_CONTINENT_KEY = "plivo_geo_continent";
type GeoCountryMode = "market-default" | "exact";

export interface GeoInfo {
  country: string;
  rawCountry: string;
  continent: string;
}

// Default selection: India users → India, everyone else → US
function effectiveCountry(
  code: string,
  mode: GeoCountryMode = "market-default",
): string {
  if (mode === "exact") return code;
  return code === "IN" ? "IN" : "US";
}

function getCached(mode: GeoCountryMode = "market-default"): GeoInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(GEO_COUNTRY_KEY);
    const continent = sessionStorage.getItem(GEO_CONTINENT_KEY);
    if (raw && continent) {
      return {
        country: effectiveCountry(raw, mode),
        rawCountry: raw,
        continent,
      };
    }
    if (raw) {
      return {
        country: effectiveCountry(raw, mode),
        rawCountry: raw,
        continent: "",
      };
    }
    return null;
  } catch {
    return null;
  }
}

interface UseGeoCountryOptions {
  mode?: GeoCountryMode;
}

/**
 * Detects the user's country and continent via IP geolocation.
 * Returns { country, continent } with 2-letter ISO codes (e.g. "US", "NA").
 * Caches in sessionStorage so the API is only called once per session.
 *
 * @param fallback Country code to use before/if geo lookup fails (default "US")
 */
export function useGeoCountry(
  fallback: string = "US",
  options: UseGeoCountryOptions = {},
): GeoInfo {
  const mode = options.mode ?? "market-default";
  const [geo, setGeo] = useState<GeoInfo>(
    () =>
      getCached(mode) || {
        country: effectiveCountry(fallback, mode),
        rawCountry: fallback,
        continent: "",
      },
  );

  useEffect(() => {
    if (getCached(mode)?.continent) return;

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
          setGeo({
            country: effectiveCountry(country, mode),
            rawCountry: country,
            continent,
          });
        }
      })
      .catch(() => {
        /* network error or abort */
      });

    return () => controller.abort();
  }, [mode]);

  return geo;
}
