import { useState, useEffect, useRef } from "react";
import { WA_CHAT_RATES, COUNTRY_NAMES } from "@/data/pricing-data";
import type { WhatsAppChatRates } from "@/data/pricing-data";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYIs5NmkcMiH9cFl_wv8VPogqDbQIO6X3Sx0yEEr-FqcANPw5Dm4U77sqfyMk80stTyW5l2WubBSo/pub?output=csv";

interface ParsedChatRow {
  market: string;
  marketing: number;
  utility: number;
  authentication: number;
  authenticationIntl: number;
  service: number;
}

// Build reverse lookup: country name → ISO code
const nameToISO: Record<string, string> = {};
for (const [code, name] of Object.entries(COUNTRY_NAMES)) {
  nameToISO[name.toLowerCase()] = code;
}

// India override — hardcoded INR rates matching live plivo.com Webflow code
const INDIA_INR_RATES: WhatsAppChatRates = {
  marketing: 0.8536,
  utility: 0.1232,
  authentication: 0.1232,
  authenticationIntl: 2.508,
  service: 0,
  currency: "₹",
};

function parseValue(val: string | undefined): number {
  if (!val) return 0;
  const trimmed = val.trim().toLowerCase();
  if (trimmed === "n/a" || trimmed === "" || trimmed === "free") return 0;
  const num = parseFloat(trimmed);
  return isNaN(num) ? 0 : num;
}

/**
 * Fetches WhatsApp Chat rates from the live Google Sheets CSV.
 * Caches the full dataset on first fetch. Falls back to hardcoded WA_CHAT_RATES.
 */
export function useWhatsAppChatRates(countryCode: string): {
  rates: WhatsAppChatRates | null;
  allCountryCodes: string[];
  loading: boolean;
} {
  const cache = useRef<Map<string, WhatsAppChatRates> | null>(null);
  const allCodes = useRef<string[]>([]);
  const latestCountry = useRef(countryCode);
  const [rates, setRates] = useState<WhatsAppChatRates | null>(
    WA_CHAT_RATES[countryCode] || null
  );
  const [countryCodes, setCountryCodes] = useState<string[]>(
    Object.keys(WA_CHAT_RATES)
  );
  const [loading, setLoading] = useState(true);
  const fetching = useRef(false);

  useEffect(() => {
    latestCountry.current = countryCode;

    if (cache.current) {
      // Already fetched — just look up
      setRates(countryCode === "IN" ? INDIA_INR_RATES : cache.current.get(countryCode) || WA_CHAT_RATES[countryCode] || null);
      setLoading(false);
      return;
    }

    if (fetching.current) {
      // Fetch in progress — show hardcoded fallback for the new country
      setRates(countryCode === "IN" ? INDIA_INR_RATES : WA_CHAT_RATES[countryCode] || null);
      return;
    }
    fetching.current = true;
    setLoading(true);

    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.trim().split("\n");
        const dataStartIndex = lines.findIndex((line) =>
          line.toLowerCase().includes("market")
        );
        const dataLines = lines.slice(dataStartIndex + 1);
        const ratesMap = new Map<string, WhatsAppChatRates>();
        const codes: string[] = [];

        for (const line of dataLines) {
          const cols = line.split(",");
          const marketName = (cols[0] || "").trim();
          if (!marketName) continue;

          const marketing = parseValue(cols[2]);
          const utility = parseValue(cols[3]);
          const authentication = parseValue(cols[4]);
          const authenticationIntl = parseValue(cols[5]);
          const service = parseValue(cols[6]);

          // Find ISO code for this market name
          const iso = nameToISO[marketName.toLowerCase()];
          if (!iso) continue;

          const chatRates: WhatsAppChatRates = {
            marketing,
            utility,
            authentication,
            authenticationIntl,
            service,
            currency: "$",
          };

          ratesMap.set(iso, chatRates);
          codes.push(iso);
        }

        cache.current = ratesMap;
        allCodes.current = codes;
        setCountryCodes(codes);
        // Use latest country ref (not stale closure value)
        const latest = latestCountry.current;
        setRates(latest === "IN" ? INDIA_INR_RATES : ratesMap.get(latest) || WA_CHAT_RATES[latest] || null);
      })
      .catch(() => {
        const latest = latestCountry.current;
        setRates(latest === "IN" ? INDIA_INR_RATES : WA_CHAT_RATES[latest] || null);
      })
      .finally(() => setLoading(false));
  }, [countryCode]);

  return { rates, allCountryCodes: countryCodes, loading };
}
