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

function formatCallRate(val: string | undefined, currency = "$"): string {
  if (!val) return `${currency}0.0000/min`;
  const trimmed = val.trim();
  if (trimmed === "" || trimmed.toLowerCase() === "n/a") return `${currency}0.0000/min`;
  const num = parseFloat(trimmed);
  if (isNaN(num)) return `${currency}0.0000/min`;
  return `${currency}${num.toFixed(4)}/min`;
}

/**
 * Fetches WhatsApp Call rates from the live Google Sheets CSV.
 * Caches the full dataset on first fetch. Falls back to hardcoded WA_CALL_RATES.
 * Default fallback rate: $0.0040 inbound, $0.0164 outbound.
 */
export function useWhatsAppCallRates(countryCode: string): {
  rates: WhatsAppCallRates | null;
  allCountryCodes: string[];
  loading: boolean;
} {
  const cache = useRef<Map<string, WhatsAppCallRates> | null>(null);
  const [rates, setRates] = useState<WhatsAppCallRates | null>(
    WA_CALL_RATES[countryCode] || null
  );
  const [countryCodes, setCountryCodes] = useState<string[]>(
    Object.keys(WA_CALL_RATES)
  );
  const [loading, setLoading] = useState(true);
  const fetching = useRef(false);

  useEffect(() => {
    if (cache.current) {
      const found = cache.current.get(countryCode);
      const fallbackCur = countryCode === "IN" ? "₹" : "$";
      setRates(found || WA_CALL_RATES[countryCode] || {
        inbound: WA_CALL_FALLBACK?.inbound || `${fallbackCur}0.0040/min`,
        outbound: WA_CALL_FALLBACK?.outbound || `${fallbackCur}0.0164/min`,
        currency: fallbackCur,
      });
      setLoading(false);
      return;
    }

    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);

    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.trim().split("\n");
        const dataLines = lines.slice(1); // Skip header
        const ratesMap = new Map<string, WhatsAppCallRates>();
        const codes: string[] = [];

        for (const line of dataLines) {
          const cols = line.split(",");
          const countryName = (cols[0] || "").trim();
          if (!countryName) continue;

          const iso = nameToISO[countryName.toLowerCase()];
          if (!iso) continue;

          const cur = iso === "IN" ? "₹" : "$";
          const inbound = formatCallRate(cols[1], cur);
          const outbound = formatCallRate(cols[2], cur);

          ratesMap.set(iso, { inbound, outbound, currency: cur });
          codes.push(iso);
        }

        cache.current = ratesMap;
        setCountryCodes(codes);

        const found = ratesMap.get(countryCode);
        const fbCur = countryCode === "IN" ? "₹" : "$";
        setRates(found || WA_CALL_RATES[countryCode] || {
          inbound: WA_CALL_FALLBACK?.inbound || `${fbCur}0.0040/min`,
          outbound: WA_CALL_FALLBACK?.outbound || `${fbCur}0.0164/min`,
          currency: fbCur,
        });
      })
      .catch(() => {
        setRates(WA_CALL_RATES[countryCode] || null);
      })
      .finally(() => setLoading(false));
  }, [countryCode]);

  return { rates, allCountryCodes: countryCodes, loading };
}
