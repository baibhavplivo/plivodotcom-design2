import { useState, useEffect, useRef, useCallback } from "react";
import { PRICING_CACHE } from "@/data/pricing-cache";
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

function getSnapshotPricing(
  code: string | null | undefined,
): CountryPricingData | null {
  if (!code) return null;
  const snapshot = PRICING_CACHE[code];
  return snapshot ? (snapshot as CountryPricingData) : null;
}

// Fallback India voice rates in USD (used when API fails)
const INDIA_VOICE_USD: VoiceRates = {
  localInbound: "$0.0087/min",
  localOutbound: "$0.0087/min",
  mobileInbound: "Not Supported",
  mobileOutbound: "Not Supported",
  tollfreeInbound: "$0.0153/min",
  tollfreeOutbound: "Not Supported",
  ipInbound: "$0.0040/min",
  ipOutbound: "$0.0040/min",
  audioStreaming: "$0.0040/min",
};

function formatRate(
  rate: number | string | null | undefined,
  unit: string,
  currency = "$",
): string {
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
  const [state, setState] = useState<{
    code: string;
    data: CountryPricingData | null;
  }>(() => ({
    code: countryCode,
    data: getSnapshotPricing(countryCode),
  }));
  const [loading, setLoading] = useState(() =>
    Boolean(countryCode && !getSnapshotPricing(countryCode)),
  );

  const fetchPricing = useCallback((code: string) => {
    latestCountry.current = code;
    // Check cache
    const cached = cache.current.get(code);
    if (cached) {
      setState({ code, data: cached });
      setLoading(false);
      return;
    }

    // Prefer the checked-in snapshot so pricing pages don't depend on the
    // legacy site's runtime API during the migration.
    const snapshot = PRICING_CACHE[code];
    if (snapshot) {
      const normalizedSnapshot = snapshot as CountryPricingData;
      cache.current.set(code, normalizedSnapshot);
      setState({ code, data: normalizedSnapshot });
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

        // Check for "Starts at" prefix (multiple network groups with different rates)
        let localOutDisplay = formatRate(localOutRate, "min");
        const localOutRates = apiData?.voice?.local?.outbound?.rates;
        if (Array.isArray(localOutRates) && localOutRates.length > 1) {
          const rates = localOutRates
            .map((r: any) => parseFloat(r.rate))
            .filter((r: number) => !isNaN(r));
          if (new Set(rates).size > 1 && localOutRate) {
            localOutDisplay = `Starts at $${parseFloat(localOutRate).toFixed(4)}/min`;
          }
        }
        let tollfreeOutDisplay = formatRate(tollfreeOutRate, "min");
        const tollfreeOutRates = apiData?.voice?.tollfree?.outbound?.rates;
        if (Array.isArray(tollfreeOutRates) && tollfreeOutRates.length > 1) {
          const rates = tollfreeOutRates
            .map((r: any) => parseFloat(r.rate))
            .filter((r: number) => !isNaN(r));
          if (new Set(rates).size > 1 && tollfreeOutRate) {
            tollfreeOutDisplay = `Starts at $${parseFloat(tollfreeOutRate).toFixed(4)}/min`;
          }
        }

        // Extract inbound rates from phone_numbers array
        let localInbound: number | null = null;
        let tollfreeInbound: number | null = null;
        let mobileInbound: number | null = null;
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

            if (
              caps.includes("voice") &&
              (status === "GA" || status === "BETA")
            ) {
              if (["local", "national"].includes(numType)) {
                if (pn.inbound_voice_rate != null) {
                  if (
                    localInbound === null ||
                    pn.inbound_voice_rate < localInbound
                  )
                    localInbound = pn.inbound_voice_rate;
                }
              } else if (numType === "mobile") {
                if (pn.inbound_voice_rate != null) {
                  if (
                    mobileInbound === null ||
                    pn.inbound_voice_rate < mobileInbound
                  )
                    mobileInbound = pn.inbound_voice_rate;
                }
              } else if (numType === "tollfree") {
                if (pn.inbound_voice_rate != null) {
                  if (
                    tollfreeInbound === null ||
                    pn.inbound_voice_rate < tollfreeInbound
                  )
                    tollfreeInbound = pn.inbound_voice_rate;
                }
              }
            }
          }
        }

        // Mobile outbound: from "Mobile" network group
        let mobileOutbound = "Not Supported";
        if (Array.isArray(localOutRates)) {
          const mobileGroup = localOutRates.find(
            (r: any) =>
              ((r.voice_network_group || "") as string)
                .toLowerCase()
                .includes("mobile") &&
              !((r.voice_network_group || "") as string)
                .toLowerCase()
                .includes("premium"),
          );
          if (mobileGroup) mobileOutbound = formatRate(mobileGroup.rate, "min");
        }

        // Audio streaming
        const audioRate = apiData?.voice?.add_on_pricing?.audio_streaming_rate;
        const audioStreaming =
          audioRate != null && audioRate !== 0
            ? formatRate(audioRate, "min")
            : "Not Supported";

        // Build voice rates object
        const voiceRates: VoiceRates = {
          localOutbound: localOutDisplay,
          localInbound: formatRate(localInbound, "min"),
          mobileOutbound,
          mobileInbound: formatRate(mobileInbound, "min"),
          tollfreeOutbound: tollfreeOutDisplay,
          tollfreeInbound: formatRate(tollfreeInbound, "min"),
          ipInbound: formatRate(apiData?.voice?.ip?.inbound?.rate, "min"),
          ipOutbound: formatRate(
            apiData?.voice?.ip?.outbound?.rates?.all ??
              apiData?.voice?.ip?.outbound?.rate,
            "min",
          ),
          audioStreaming,
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
          voiceRates.mobileOutbound = "Not Supported";
          voiceRates.mobileInbound = "Not Supported";
          voiceRates.tollfreeInbound = "$0.0153/min";
          voiceRates.tollfreeOutbound = "Not Supported";
          voiceRates.ipInbound = "$0.0040/min";
          voiceRates.ipOutbound = "$0.0040/min";
        }

        // Extract per-network-group destination rates
        let voiceDestinationRates: VoiceNetworkRate[] = [];
        if (code === "IN") {
          // India: hardcoded to match live plivo.com (API returns wrong data)
          voiceDestinationRates = [
            {
              networkGroup: "India All Networks from Plivo-IN numbers",
              rate: "$0.0047/min",
              destinationPrefixes: ["91"],
              originationPrefixes: ["91"],
            },
          ];
        } else {
          const localOutRates = apiData?.voice?.local?.outbound?.rates;
          if (Array.isArray(localOutRates)) {
            const sorted = [...localOutRates].sort(
              (a: any, b: any) =>
                (parseFloat(a.rate) || 0) - (parseFloat(b.rate) || 0),
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
        function formatSmsInbound(
          rate: number | null,
          isLongcode = false,
        ): string {
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
            const num =
              typeof singleRate === "string"
                ? parseFloat(singleRate)
                : singleRate;
            if (!isNaN(num) && num !== 0) {
              let prefix = "";
              if (
                ratesObj &&
                typeof ratesObj === "object" &&
                !Array.isArray(ratesObj)
              ) {
                const vals = Object.values(ratesObj)
                  .map(Number)
                  .filter((v) => !isNaN(v));
                if (vals.length > 1 && vals.some((v) => v !== vals[0])) {
                  prefix = "Starts at ";
                }
              }
              return `${prefix}$${num.toFixed(4)}/sms`;
            }
          }

          // Fallback: min of network rates object (shortcode/tollfree have no single rate)
          if (
            ratesObj &&
            typeof ratesObj === "object" &&
            !Array.isArray(ratesObj)
          ) {
            const vals = Object.values(ratesObj)
              .map(Number)
              .filter((v) => !isNaN(v));
            if (vals.length > 0) {
              const minVal = Math.min(...vals);
              const hasVariation = vals.some((v) => v !== vals[0]);
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
          smsRates.push({
            type: "Longcode",
            outbound: lcOutbound,
            inbound: lcInbound,
          });
        }

        // Shortcode row
        const scOutbound = getOutboundRate(smsObj.shortcode);
        const scInbound = formatSmsInbound(shortcodeInboundMin);
        if (scOutbound !== "Not Supported" || scInbound !== "Not Supported") {
          smsRates.push({
            type: "Shortcode",
            outbound: scOutbound,
            inbound: scInbound,
          });
        }

        // Toll-Free row
        const tfOutbound = getOutboundRate(smsObj.tollfree);
        const tfInbound = formatSmsInbound(tollfreeInboundMin);
        if (tfOutbound !== "Not Supported" || tfInbound !== "Not Supported") {
          smsRates.push({
            type: "Toll-Free",
            outbound: tfOutbound,
            inbound: tfInbound,
          });
        }

        // Mobile row — show when mobile numbers with SMS exist
        if (mobileInboundRate !== null) {
          const mobileOutbound = getOutboundRate(smsObj.longcode); // mobile outbound uses longcode rate
          smsRates.push({
            type: "Mobile",
            outbound: mobileOutbound,
            inbound: formatSmsInbound(mobileInboundRate),
          });
        }

        // India: Rename "Longcode" → "International" (ILDO route) and inject "Domestic" (DLT route)
        // The Domestic DLT rate ($0.00187) is not in the API — hardcoded to match live plivo.com
        if (code === "IN") {
          for (const row of smsRates) {
            if (row.type === "Longcode") row.type = "International";
          }
          smsRates.unshift({
            type: "Domestic",
            outbound: "$0.00187/sms",
            inbound: "Not Supported",
          });
        }

        // India: API returns no phone numbers — inject local to match live site
        if (code === "IN") {
          const hasLocal = phoneNumbers.some(
            (pn) =>
              ["local", "national", "mobile"].includes(pn.type.toLowerCase()) &&
              pn.rentalRate != null &&
              pn.rentalRate > 0,
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
        if (
          longcodeOutRates &&
          typeof longcodeOutRates === "object" &&
          !Array.isArray(longcodeOutRates)
        ) {
          for (const [network, rate] of Object.entries(longcodeOutRates)) {
            const formatted = formatRate(rate as any, "sms");
            if (formatted !== "Not Supported") {
              smsNetworkRates.push({ network, rate: formatted });
            }
          }
          smsNetworkRates.sort((a, b) => a.network.localeCompare(b.network));
        }

        // Extract add-on pricing (audioRate already extracted above)
        const addOnPricing: AddOnPricing = {
          audioStreamingRate:
            audioRate != null && audioRate !== 0
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
        setState({ code, data: result });
      })
      .catch(() => {
        if (latestCountry.current !== code) return;
        // Fall back to pre-built cache (generated by scripts/build-pricing-cache.mjs)
        const cached = PRICING_CACHE[code];
        if (cached) {
          setState({ code, data: cached as CountryPricingData });
        } else {
          setState({ code, data: null });
        }
      })
      .finally(() => {
        if (latestCountry.current === code) setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!countryCode) {
      setState({ code: "", data: null });
      setLoading(false);
      return;
    }

    const snapshot = getSnapshotPricing(countryCode);
    if (snapshot) {
      cache.current.set(countryCode, snapshot);
      setState({ code: countryCode, data: snapshot });
      setLoading(false);
      return;
    }

    fetchPricing(countryCode);
  }, [countryCode, fetchPricing]);

  const snapshot = getSnapshotPricing(countryCode);
  const data =
    state.code === countryCode ? state.data ?? snapshot : snapshot;
  const isLoading =
    Boolean(countryCode) &&
    (state.code !== countryCode ? !snapshot : loading && !data);

  return { data, loading: isLoading };
}
