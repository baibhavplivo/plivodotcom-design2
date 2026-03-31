import { useState, useEffect, useRef, useCallback } from "react";
import { VOICE_RATES, PHONE_RENTAL_RATES, SMS_RATES, VOICE_DESTINATION_RATES } from "@/data/pricing-data";
import type { VoiceRates } from "@/data/pricing-data";

const API_URL = "https://api.plivo.com/v1/Internal/CountryPricing/?country=";

export interface PhoneNumberInfo {
  type: string;
  rentalRate: number | null;
  inboundVoiceRate: number | null;
  inboundSmsRate: number | null;
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

// Fallback India voice rates in USD (used when API fails)
const INDIA_VOICE_USD: VoiceRates = {
  localInbound: "$0.0087/min",
  localOutbound: "$0.0087/min",
  tollfreeInbound: "$0.0153/min",
  tollfreeOutbound: "Not Supported",
  ipInbound: "$0.0040/min",
  ipOutbound: "$0.0040/min",
};

function formatRate(rate: number | string | null | undefined, unit: string, currency = "$"): string {
  if (rate == null) return "Not Supported";
  const num = typeof rate === "string" ? parseFloat(rate) : rate;
  if (isNaN(num) || num === 0) return "Not Supported";
  return `${currency}${num.toFixed(4)}/${unit}`;
}

/**
 * Fetches live pricing from Plivo's CountryPricing API.
 * All rates returned in USD. Components handle INR conversion via useExchangeRate.
 * Falls back to static VOICE_RATES on error.
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
                inboundSmsRate: pn.inbound_sms_rate ?? null,
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
            ipInbound: formatRate(apiData?.voice?.ip?.inbound?.rate, "min"),
            ipOutbound: formatRate(
              apiData?.voice?.ip?.outbound?.rates?.all ?? apiData?.voice?.ip?.outbound?.rate, "min"
            ),
          };

          // Country-specific overrides matching live plivo.com
          if (code === "US") {
            voiceRates.localOutbound = "$0.0115/min";
            voiceRates.tollfreeOutbound = "$0.0060/min";
          } else if (code === "CA") {
            voiceRates.tollfreeOutbound = "$0.0060/min";
          } else if (code === "IN") {
            voiceRates.localOutbound = "$0.0087/min";
            voiceRates.localInbound = "$0.0087/min";
            voiceRates.tollfreeInbound = "$0.0153/min";
            voiceRates.tollfreeOutbound = "Not Supported";
            voiceRates.ipInbound = "$0.0040/min";
            voiceRates.ipOutbound = "$0.0040/min";
          }

          // Extract per-network-group destination rates
          let voiceDestinationRates: VoiceNetworkRate[] = [];
          if (code === "IN") {
            // India: hardcoded to match live plivo.com (API returns wrong data)
            voiceDestinationRates = [{
              networkGroup: "India All Networks from Plivo-IN numbers",
              rate: "$0.0047/min",
              destinationPrefixes: ["91"],
              originationPrefixes: ["91"],
            }];
          } else {
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
          }

          // Extract SMS rates — matching live plivo.com logic:
          // Inbound rates come from phone_numbers array (min inbound_sms_rate per type)
          // Outbound rates come from sms.*.outbound.rate (or min of rates object)
          const smsObj = apiData?.sms || {};
          const smsRates: SMSRateRow[] = [];

          // Derive inbound SMS rates from phone_numbers (live site logic)
          let longcodeInboundMin: number | null = null;
          let shortcodeInboundMin: number | null = null;
          let tollfreeInboundMin: number | null = null;
          let mobileInboundRate: number | null = null;

          for (const pn of phoneNumbers) {
            if (!pn.capabilities.includes("sms")) continue;
            if (pn.status !== "GA" && pn.status !== "BETA") continue;
            const nt = pn.type.toLowerCase();
            const rate = pn.inboundSmsRate;
            if (rate == null) continue;

            if (["local", "national"].includes(nt)) {
              if (longcodeInboundMin === null || rate < longcodeInboundMin) {
                longcodeInboundMin = rate;
              }
            }
            if (nt === "mobile") {
              mobileInboundRate = rate;
            }
            if (nt === "shortcode") {
              if (shortcodeInboundMin === null || rate < shortcodeInboundMin) {
                shortcodeInboundMin = rate;
              }
            }
            if (nt === "tollfree") {
              if (tollfreeInboundMin === null || rate < tollfreeInboundMin) {
                tollfreeInboundMin = rate;
              }
            }
          }

          // GB/AU override: after Jan 1 2026 UTC, longcode inbound is $0.003
          const now = new Date();
          const jan2026 = new Date(Date.UTC(2026, 0, 1));
          if (now >= jan2026 && (code === "GB" || code === "AU")) {
            longcodeInboundMin = 0.003;
          }

          // Helper: format inbound rate with "Contact support" fallback for longcode
          function formatSmsInbound(rate: number | null, isLongcode = false): string {
            if (rate == null || isNaN(rate)) {
              if (isLongcode && now >= jan2026) {
                return "Contact support";
              }
              return "Not Supported";
            }
            if (rate === 0) return "Not Supported";
            return `$${rate.toFixed(4)}/sms`;
          }

          // Helper: get outbound rate — use single rate field first (matching live plivo.com)
          // Falls back to min of rates object when single rate is null (e.g. shortcode, tollfree)
          function getOutboundRate(route: any): string {
            if (!route?.outbound) return "Not Supported";
            const singleRate = route.outbound.rate;
            const ratesObj = route.outbound.rates;

            // Try single rate first (longcode has this)
            if (singleRate != null) {
              const num = typeof singleRate === "string" ? parseFloat(singleRate) : singleRate;
              if (!isNaN(num) && num !== 0) {
                let prefix = "";
                if (ratesObj && typeof ratesObj === "object" && !Array.isArray(ratesObj)) {
                  const vals = Object.values(ratesObj).map(Number).filter(v => !isNaN(v));
                  if (vals.length > 1 && vals.some(v => v !== vals[0])) {
                    prefix = "Starts at ";
                  }
                }
                return `${prefix}$${num.toFixed(4)}/sms`;
              }
            }

            // Fallback: min of network rates object (shortcode/tollfree have no single rate)
            if (ratesObj && typeof ratesObj === "object" && !Array.isArray(ratesObj)) {
              const vals = Object.values(ratesObj).map(Number).filter(v => !isNaN(v));
              if (vals.length > 0) {
                const minVal = Math.min(...vals);
                const hasVariation = vals.some(v => v !== vals[0]);
                const prefix = hasVariation ? "Starts at " : "";
                return `${prefix}$${minVal.toFixed(4)}/sms`;
              }
            }

            return "Not Supported";
          }

          // Longcode row
          const lcOutbound = getOutboundRate(smsObj.longcode);
          const lcInbound = formatSmsInbound(longcodeInboundMin, true);
          if (lcOutbound !== "Not Supported" || lcInbound !== "Not Supported") {
            smsRates.push({ type: "Longcode", outbound: lcOutbound, inbound: lcInbound });
          }

          // Shortcode row
          const scOutbound = getOutboundRate(smsObj.shortcode);
          const scInbound = formatSmsInbound(shortcodeInboundMin);
          if (scOutbound !== "Not Supported" || scInbound !== "Not Supported") {
            smsRates.push({ type: "Shortcode", outbound: scOutbound, inbound: scInbound });
          }

          // Toll-Free row
          const tfOutbound = getOutboundRate(smsObj.tollfree);
          const tfInbound = formatSmsInbound(tollfreeInboundMin);
          if (tfOutbound !== "Not Supported" || tfInbound !== "Not Supported") {
            smsRates.push({ type: "Toll-Free", outbound: tfOutbound, inbound: tfInbound });
          }

          // Mobile row — show when mobile numbers with SMS exist
          if (mobileInboundRate !== null) {
            const mobileOutbound = getOutboundRate(smsObj.longcode); // mobile outbound uses longcode rate
            smsRates.push({ type: "Mobile", outbound: mobileOutbound, inbound: formatSmsInbound(mobileInboundRate) });
          }

          // India: Rename "Longcode" → "International" (ILDO route) and inject "Domestic" (DLT route)
          // The Domestic DLT rate ($0.00187) is not in the API — hardcoded to match live plivo.com
          if (code === "IN") {
            for (const row of smsRates) {
              if (row.type === "Longcode") row.type = "International";
            }
            smsRates.unshift({ type: "Domestic", outbound: "$0.00187/sms", inbound: "Not Supported" });
          }

          // India: API returns no phone numbers — inject local to match live site
          if (code === "IN") {
            const hasLocal = phoneNumbers.some(
              (pn) => ["local", "national", "mobile"].includes(pn.type.toLowerCase()) && pn.rentalRate != null && pn.rentalRate > 0
            );
            if (!hasLocal) {
              phoneNumbers.push({
                type: "Local",
                rentalRate: 2.94,
                inboundVoiceRate: null,
                inboundSmsRate: null,
                capabilities: ["voice", "sip_trunking"],
                status: "GA",
              });
            }
          }

          const smsOutbound = lcOutbound;
          const smsInbound = lcInbound;

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
          const fallback = code === "IN" ? INDIA_VOICE_USD : VOICE_RATES[code];
          const smsFallback = SMS_RATES[code];
          if (fallback || smsFallback) {
            const result: CountryPricingData = {
              voiceRates: fallback || { localInbound: "Not Supported", localOutbound: "Not Supported", tollfreeInbound: "Not Supported", tollfreeOutbound: "Not Supported", ipInbound: "$0.0055/min", ipOutbound: "$0.0055/min" },
              voiceDestinationRates: VOICE_DESTINATION_RATES[code]
                ? VOICE_DESTINATION_RATES[code].map(d => ({
                    networkGroup: d.group,
                    rate: `$${parseFloat(d.rate).toFixed(4)}/min`,
                    destinationPrefixes: d.prefixes,
                    originationPrefixes: [],
                  }))
                : [],
              addOnPricing: { audioStreamingRate: null },
              smsOutbound: smsFallback?.sms?.[0]?.outbound || "Contact sales",
              smsInbound: smsFallback?.sms?.[0]?.inbound || "Contact sales",
              smsRates: (smsFallback?.sms || []) as SMSRateRow[],
              smsNetworkRates: [],
              phoneNumbers: code === "IN"
                ? [
                    { type: "Local", rentalRate: 2.94, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice", "sip_trunking"], status: "GA" },
                  ]
                : [],
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
