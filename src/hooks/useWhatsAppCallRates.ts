import { useState, useEffect, useRef } from "react";
import { WA_CALL_RATES, WA_CALL_FALLBACK, COUNTRY_NAMES } from "@/data/pricing-data";
import type { WhatsAppCallRates } from "@/data/pricing-data";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYIs5NmkcMiH9cFl_wv8VPogqDbQIO6X3Sx0yEEr-FqcANPw5Dm4U77sqfyMk80stTyW5l2WubBSo/pub?gid=1923183027&single=true&output=csv";

// Build reverse lookup: country name → ISO code
const nameToISO: Record<string, string> = {};
for (const [code, name] of Object.entries(COUNTRY_NAMES)) {
  nameToISO[name.toLowerCase()] = code;
}

/**
 * Parse a rate value from CSV, preserving the original currency (₹ or $).
 * Matches the Webflow parseValue() + formatPrice() behaviour:
 *   ₹ values → "₹X.XX/min" (2 decimals)
 *   $ values → "$X.XXXX/min" (4 decimals)
 */
function formatCallRate(val: string | undefined): { rate: string; currency: string } {
  const fallback = { rate: "$0.0000/min", currency: "$" };
  if (!val) return fallback;
  const trimmed = val.trim();
  if (trimmed === "" || trimmed.toLowerCase() === "n/a") return fallback;

  // Detect INR
  if (trimmed.startsWith("₹")) {
    const num = parseFloat(trimmed.substring(1));
    if (isNaN(num)) return fallback;
    return { rate: `₹${num.toFixed(2)}/min`, currency: "₹" };
  }

  // Default: USD
  const cleaned = trimmed.replace(/[^0-9.\-]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return fallback;
  return { rate: `$${num.toFixed(4)}/min`, currency: "$" };
}

const STATIC_FALLBACK: WhatsAppCallRates = {
  inbound: WA_CALL_FALLBACK?.inbound || "$0.0040/min",
  outbound: WA_CALL_FALLBACK?.outbound || "$0.0164/min",
  currency: "$",
};

/**
 * Fetches WhatsApp Call rates from the live Google Sheets CSV.
 * Preserves ₹/$ currency from CSV. Parses "All other countries" as dynamic fallback.
 * Caches the full dataset on first fetch. Falls back to hardcoded WA_CALL_RATES.
 */
export function useWhatsAppCallRates(countryCode: string): {
  rates: WhatsAppCallRates | null;
  allCountryCodes: string[];
  loading: boolean;
} {
  const cache = useRef<Map<string, WhatsAppCallRates> | null>(null);
  const csvFallback = useRef<WhatsAppCallRates | null>(null);
  const latestCountry = useRef(countryCode);
  const [rates, setRates] = useState<WhatsAppCallRates | null>(
    WA_CALL_RATES[countryCode] || null
  );
  const [countryCodes, setCountryCodes] = useState<string[]>(
    Object.keys(WA_CALL_RATES)
  );
  const [loading, setLoading] = useState(true);
  const fetching = useRef(false);

  const getFallback = (): WhatsAppCallRates =>
    csvFallback.current || STATIC_FALLBACK;

  useEffect(() => {
    latestCountry.current = countryCode;

    if (cache.current) {
      const found = cache.current.get(countryCode);
      setRates(found || WA_CALL_RATES[countryCode] || getFallback());
      setLoading(false);
      return;
    }

    if (fetching.current) {
      setRates(WA_CALL_RATES[countryCode] || getFallback());
      return;
    }
    fetching.current = true;
    setLoading(true);

    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.trim().split("\n");
        const dataLines = lines.slice(1); // Skip header
        const ratesMap = new Map<string, WhatsAppCallRates>();
        const codes: string[] = [];
        let dynamicFallback: WhatsAppCallRates | null = null;

        for (const line of dataLines) {
          const cols = line.split(",");
          const countryName = (cols[0] || "").trim();
          if (!countryName) continue;

          // Parse "All other countries" as dynamic fallback (matching Webflow)
          if (countryName.toLowerCase() === "all other countries") {
            const inbound = formatCallRate(cols[1]);
            const outbound = formatCallRate(cols[2]);
            dynamicFallback = {
              inbound: inbound.rate,
              outbound: outbound.rate,
              currency: inbound.currency,
            };
            continue;
          }

          const iso = nameToISO[countryName.toLowerCase()];
          if (!iso) continue;

          const inbound = formatCallRate(cols[1]);
          const outbound = formatCallRate(cols[2]);

          ratesMap.set(iso, {
            inbound: inbound.rate,
            outbound: outbound.rate,
            currency: inbound.currency,
          });
          codes.push(iso);
        }

        cache.current = ratesMap;
        if (dynamicFallback) csvFallback.current = dynamicFallback;
        setCountryCodes(codes);

        const latest = latestCountry.current;
        const found = ratesMap.get(latest);
        setRates(found || WA_CALL_RATES[latest] || dynamicFallback || STATIC_FALLBACK);
      })
      .catch(() => {
        const latest = latestCountry.current;
        setRates(WA_CALL_RATES[latest] || null);
      })
      .finally(() => setLoading(false));
  }, [countryCode]);

  return { rates, allCountryCodes: countryCodes, loading };
}
