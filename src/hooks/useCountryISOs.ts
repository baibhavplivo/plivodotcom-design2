import { useState, useEffect, useRef } from "react";
import {
  COUNTRY_NAMES,
  TOP_COUNTRIES,
  getFlagEmoji,
} from "@/data/pricing-data";
import type { CountryListItem, CountryOption } from "@/data/pricing-data";

const API_URL = "https://api.plivo.com/v1/Internal/CountryISOs/";
const CACHE_KEY = "plivo_country_isos_v2";

/**
 * Fetches the full country list from Plivo's CountryISOs API.
 * Caches in sessionStorage. Falls back to hardcoded COUNTRY_NAMES.
 * Returns a sorted list with priority countries (US, IN, CA, GB, AU) at top.
 */
export function useCountryISOs(
  priorityCountries: CountryOption[] = TOP_COUNTRIES
): {
  countries: CountryListItem[];
  loading: boolean;
} {
  const [countries, setCountries] = useState<CountryListItem[]>(() =>
    buildFromMap(COUNTRY_NAMES, priorityCountries)
  );
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    // Check sessionStorage cache
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Record<string, string>;
        setCountries(buildFromMap(parsed, priorityCountries));
        setLoading(false);
        return;
      }
    } catch {
      /* ignore */
    }

    const controller = new AbortController();

    fetch(API_URL, {
      headers: { Referer: "plivo.com" },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("CountryISOs fetch failed");
        return res.json();
      })
      .then((data: Record<string, string>) => {
        if (data.error) throw new Error(data.error);
        delete data.api_id;
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {
          /* quota */
        }
        setCountries(buildFromMap(data, priorityCountries));
      })
      .catch(() => {
        // Keep fallback COUNTRY_NAMES
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { countries, loading };
}

function buildFromMap(
  map: Record<string, string>,
  priorityCountries: CountryOption[]
): CountryListItem[] {
  const priorityCodes = new Set(priorityCountries.map((c) => c.code));

  const isoPattern = /^[A-Z]{2}$/;
  return Object.entries(map)
    .filter(([code]) => isoPattern.test(code))
    .map(([code, name]) => ({
      code,
      name,
      flag: getFlagEmoji(code),
      isPriority: priorityCodes.has(code),
    }))
    .sort((a, b) => {
      const aIdx = priorityCountries.findIndex((c) => c.code === a.code);
      const bIdx = priorityCountries.findIndex((c) => c.code === b.code);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
}
