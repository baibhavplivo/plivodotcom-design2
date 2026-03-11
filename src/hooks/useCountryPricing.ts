import { useState, useEffect, useRef, useCallback } from "react";
import { VOICE_RATES, PHONE_RENTAL_RATES, SMS_RATES } from "@/data/pricing-data";
import type { VoiceRates } from "@/data/pricing-data";

const API_URL = "https://api.plivo.com/v1/Internal/CountryPricing/?country=";

export interface PhoneNumberInfo {
  type: string;
  rentalRate: number | null;
  inboundVoiceRate: number | null;
  capabilities: string[];
  status: string;
}

export interface SMSRateRow {
  type: string;
  outbound: string;
  inbound: string;
}

export interface CountryPricingData {
  voiceRates: VoiceRates;
  smsOutbound: string;
  smsInbound: string;
  smsRates: SMSRateRow[];
  phoneNumbers: PhoneNumberInfo[];
  raw: any;
}

// Hardcoded overrides matching reference pp-final
const OVERRIDES: Record<string, Partial<VoiceRates>> = {
  US: { localOutbound: "$0.0115/min", tollfreeOutbound: "$0.0060/min" },
  CA: { tollfreeOutbound: "$0.0060/min" },
};

const INDIA_VOICE: VoiceRates = {
  localInbound: "₹0.74/min",
  localOutbound: "₹0.74/min",
  tollfreeInbound: "Not Supported",
  tollfreeOutbound: "Not Supported",
  ipInbound: "₹0.50/min",
  ipOutbound: "₹0.50/min",
};

function formatRate(rate: number | string | null | undefined, unit: string, currency = "$"): string {
  if (rate == null) return "Not Supported";
  const num = typeof rate === "string" ? parseFloat(rate) : rate;
  if (isNaN(num) || num === 0) return "Not Supported";
  return `${currency}${num.toFixed(4)}/${unit}`;
}

/**
 * Fetches live pricing from Plivo's CountryPricing API.
 * Applies hardcoded overrides for US, CA, India.
 * Falls back to static VOICE_RATES on error.
 */
export function useCountryPricing(countryCode: string): {
  data: CountryPricingData | null;
  loading: boolean;
} {
  const cache = useRef<Map<string, CountryPricingData>>(new Map());
  const [data, setData] = useState<CountryPricingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPricing = useCallback(
    (code: string) => {
      // Check cache
      const cached = cache.current.get(code);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      // India uses fully hardcoded rates
      if (code === "IN") {
        const indiaData: CountryPricingData = {
          voiceRates: INDIA_VOICE,
          smsOutbound: "₹0.155/sms",
          smsInbound: "Not Supported",
          smsRates: [{ type: "Longcode", outbound: "₹0.155/sms", inbound: "Not Supported" }],
          phoneNumbers: [],
          raw: null,
        };
        cache.current.set(code, indiaData);
        setData(indiaData);
        setLoading(false);
        return;
      }

      setLoading(true);

      fetch(`${API_URL}${code}`, {
        headers: { Referer: "plivo.com" },
      })
        .then((res) => {
          if (!res.ok) throw new Error("API error");
          return res.json();
        })
        .then((apiData) => {
          if (apiData.error === "Access Denied") throw new Error("Access Denied");

          // Extract voice rates from API
          const localOutRate = apiData?.voice?.local?.outbound?.rate;
          const tollfreeOutRate = apiData?.voice?.tollfree?.outbound?.rate;

          // Extract inbound rates from phone_numbers array
          let localInbound: number | null = null;
          let tollfreeInbound: number | null = null;
          const phoneNumbers: PhoneNumberInfo[] = [];

          if (Array.isArray(apiData.phone_numbers)) {
            for (const pn of apiData.phone_numbers) {
              const numType = (pn.number_type || "").toLowerCase();
              const caps = pn.capabilities || [];
              const status = pn.status || "";

              phoneNumbers.push({
                type: pn.number_type,
                rentalRate: pn.rental_rate ?? null,
                inboundVoiceRate: pn.inbound_voice_rate ?? null,
                capabilities: caps,
                status,
              });

              if (caps.includes("voice") && (status === "GA" || status === "BETA")) {
                if (["local", "national", "mobile"].includes(numType)) {
                  if (pn.inbound_voice_rate != null) {
                    if (localInbound === null || pn.inbound_voice_rate < localInbound) {
                      localInbound = pn.inbound_voice_rate;
                    }
                  }
                } else if (numType === "tollfree") {
                  if (pn.inbound_voice_rate != null) {
                    if (tollfreeInbound === null || pn.inbound_voice_rate < tollfreeInbound) {
                      tollfreeInbound = pn.inbound_voice_rate;
                    }
                  }
                }
              }
            }
          }

          // Build voice rates object
          const overrides = OVERRIDES[code] || {};
          const voiceRates: VoiceRates = {
            localOutbound: overrides.localOutbound || formatRate(localOutRate, "min"),
            localInbound: formatRate(localInbound, "min"),
            tollfreeOutbound: overrides.tollfreeOutbound || formatRate(tollfreeOutRate, "min"),
            tollfreeInbound: formatRate(tollfreeInbound, "min"),
            ipInbound: "$0.0030/min",
            ipOutbound: "$0.0030/min",
          };

          // Extract SMS rates (detailed per route type)
          const smsObj = apiData?.sms || {};
          const smsRates: SMSRateRow[] = [];
          const smsTypes: [string, string][] = [
            ["longcode", "Longcode"],
            ["shortcode", "Shortcode"],
            ["tollfree", "Toll-Free"],
          ];
          for (const [key, label] of smsTypes) {
            const route = smsObj[key];
            if (!route) continue;
            const out = route?.outbound?.rate;
            const inp = route?.inbound?.rate;
            if (out != null || inp != null) {
              smsRates.push({
                type: label,
                outbound: formatRate(out, "sms"),
                inbound: formatRate(inp, "sms"),
              });
            }
          }
          const smsOutbound = formatRate(smsObj?.longcode?.outbound?.rate, "sms");
          const smsInbound = formatRate(smsObj?.longcode?.inbound?.rate, "sms");

          const result: CountryPricingData = {
            voiceRates,
            smsOutbound,
            smsInbound,
            smsRates,
            phoneNumbers,
            raw: apiData,
          };

          cache.current.set(code, result);
          setData(result);
        })
        .catch(() => {
          // Fall back to hardcoded data
          const fallback = VOICE_RATES[code];
          const smsFallback = SMS_RATES[code];
          if (fallback || smsFallback) {
            const result: CountryPricingData = {
              voiceRates: fallback || { localInbound: "Not Supported", localOutbound: "Not Supported", tollfreeInbound: "Not Supported", tollfreeOutbound: "Not Supported", ipInbound: "$0.0030/min", ipOutbound: "$0.0030/min" },
              smsOutbound: smsFallback?.sms?.[0]?.outbound || "Contact sales",
              smsInbound: smsFallback?.sms?.[0]?.inbound || "Contact sales",
              smsRates: (smsFallback?.sms || []) as SMSRateRow[],
              phoneNumbers: [],
              raw: null,
            };
            setData(result);
          } else {
            setData(null);
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  useEffect(() => {
    if (countryCode) fetchPricing(countryCode);
  }, [countryCode, fetchPricing]);

  return { data, loading };
}
