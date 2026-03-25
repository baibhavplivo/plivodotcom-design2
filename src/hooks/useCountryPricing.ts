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

export interface VoiceNetworkRate {
  networkGroup: string;
  rate: string;
  destinationPrefixes: string[];
  originationPrefixes: string[];
}

export interface SMSNetworkRate {
  network: string;
  rate: string;
}

export interface AddOnPricing {
  audioStreamingRate: string | null;
}

export interface CountryPricingData {
  voiceRates: VoiceRates;
  voiceDestinationRates: VoiceNetworkRate[];
  addOnPricing: AddOnPricing;
  smsOutbound: string;
  smsInbound: string;
  smsRates: SMSRateRow[];
  smsNetworkRates: SMSNetworkRate[];
  phoneNumbers: PhoneNumberInfo[];
  raw: any;
}

const INDIA_VOICE: VoiceRates = {
  localInbound: "₹2.8/min",
  localOutbound: "₹0.74/min",
  tollfreeInbound: "₹1.30/min",
  tollfreeOutbound: "Not Supported",
  ipInbound: "₹0.34/min",
  ipOutbound: "₹0.34/min",
};

function formatRate(rate: number | string | null | undefined, unit: string, currency = "$"): string {
  if (rate == null) return "Not Supported";
  const num = typeof rate === "string" ? parseFloat(rate) : rate;
  if (isNaN(num) || num === 0) return "Not Supported";
  return `${currency}${num.toFixed(4)}/${unit}`;
}

/**
 * Fetches live pricing from Plivo's CountryPricing API.
 * India uses hardcoded INR rates. Falls back to static VOICE_RATES on error.
 */
export function useCountryPricing(countryCode: string): {
  data: CountryPricingData | null;
  loading: boolean;
} {
  const cache = useRef<Map<string, CountryPricingData>>(new Map());
  const latestCountry = useRef<string>("");
  const [data, setData] = useState<CountryPricingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPricing = useCallback(
    (code: string) => {
      latestCountry.current = code;
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
          voiceDestinationRates: [],
          addOnPricing: { audioStreamingRate: null },
          smsOutbound: "₹0.155/sms",
          smsInbound: "Not Supported",
          smsRates: [{ type: "Longcode", outbound: "₹0.155/sms", inbound: "Not Supported" }],
          smsNetworkRates: [],
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
          if (latestCountry.current !== code) return;
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

          // Build voice rates object (uses live API data)
          const voiceRates: VoiceRates = {
            localOutbound: formatRate(localOutRate, "min"),
            localInbound: formatRate(localInbound, "min"),
            tollfreeOutbound: formatRate(tollfreeOutRate, "min"),
            tollfreeInbound: formatRate(tollfreeInbound, "min"),
            ipInbound: "$0.0055/min",
            ipOutbound: "$0.0055/min",
          };

          // Extract per-network-group destination rates
          const voiceDestinationRates: VoiceNetworkRate[] = [];
          const localOutRates = apiData?.voice?.local?.outbound?.rates;
          if (Array.isArray(localOutRates)) {
            const sorted = [...localOutRates].sort(
              (a: any, b: any) => (parseFloat(a.rate) || 0) - (parseFloat(b.rate) || 0)
            );
            for (const entry of sorted) {
              const r = parseFloat(entry.rate);
              if (isNaN(r)) continue;
              voiceDestinationRates.push({
                networkGroup: entry.voice_network_group || "Default",
                rate: `$${r.toFixed(4)}/min`,
                destinationPrefixes: Array.isArray(entry.destination_prefix)
                  ? entry.destination_prefix
                  : [],
                originationPrefixes: Array.isArray(entry.origination_prefix)
                  ? entry.origination_prefix.filter((p: string) => p)
                  : [],
              });
            }
          }

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

          // Extract SMS per-operator network rates
          const smsNetworkRates: SMSNetworkRate[] = [];
          const longcodeOutRates = smsObj?.longcode?.outbound?.rates;
          if (longcodeOutRates && typeof longcodeOutRates === "object" && !Array.isArray(longcodeOutRates)) {
            for (const [network, rate] of Object.entries(longcodeOutRates)) {
              const formatted = formatRate(rate as any, "sms");
              if (formatted !== "Not Supported") {
                smsNetworkRates.push({ network, rate: formatted });
              }
            }
            smsNetworkRates.sort((a, b) => a.network.localeCompare(b.network));
          }

          // Extract add-on pricing
          const audioRate = apiData?.voice?.add_on_pricing?.audio_streaming_rate;
          const addOnPricing: AddOnPricing = {
            audioStreamingRate: audioRate != null && audioRate !== 0
              ? formatRate(audioRate, "min")
              : null,
          };

          const result: CountryPricingData = {
            voiceRates,
            voiceDestinationRates,
            addOnPricing,
            smsOutbound,
            smsInbound,
            smsRates,
            smsNetworkRates,
            phoneNumbers,
            raw: apiData,
          };

          cache.current.set(code, result);
          setData(result);
        })
        .catch(() => {
          if (latestCountry.current !== code) return;
          // Fall back to hardcoded data
          const fallback = VOICE_RATES[code];
          const smsFallback = SMS_RATES[code];
          if (fallback || smsFallback) {
            const result: CountryPricingData = {
              voiceRates: fallback || { localInbound: "Not Supported", localOutbound: "Not Supported", tollfreeInbound: "Not Supported", tollfreeOutbound: "Not Supported", ipInbound: "$0.0055/min", ipOutbound: "$0.0055/min" },
              voiceDestinationRates: [],
              addOnPricing: { audioStreamingRate: null },
              smsOutbound: smsFallback?.sms?.[0]?.outbound || "Contact sales",
              smsInbound: smsFallback?.sms?.[0]?.inbound || "Contact sales",
              smsRates: (smsFallback?.sms || []) as SMSRateRow[],
              smsNetworkRates: [],
              phoneNumbers: [],
              raw: null,
            };
            setData(result);
          } else {
            setData(null);
          }
        })
        .finally(() => {
          if (latestCountry.current === code) setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    if (countryCode) fetchPricing(countryCode);
  }, [countryCode, fetchPricing]);

  return { data, loading };
}
