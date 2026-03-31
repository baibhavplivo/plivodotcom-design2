import { useState, useEffect, useRef, useCallback } from "react";
import { SIP_RATES } from "@/data/pricing-data";

const INBOUND_URL =
  "https://prod-routing-central-pub.zt.plivo.com/api/v1/zt/pricing/inbound?&country=";
const OUTBOUND_URL =
  "https://prod-routing-central-pub.zt.plivo.com/api/v1/zt/pricing?&country=";

export interface NetworkGroup {
  name: string;
  rate: number;
}

export interface ZentrunkRates {
  local: { inbound: number; outbound: number };
  mobile: { inbound: number; outbound: number };
  national: { inbound: number; outbound: number };
  tollfree: { inbound: number; outbound: number };
  networkGroups: NetworkGroup[];
  outboundHasMultipleRates: boolean;
}

function safeFirst(val: any): number {
  if (Array.isArray(val) && val.length > 0) {
    const n = typeof val[0] === "number" ? val[0] : parseFloat(val[0]);
    return isNaN(n) ? 0 : n;
  }
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

/**
 * Fetches live SIP trunking pricing from Zentrunk Inbound + Outbound APIs.
 * Falls back to hardcoded SIP_RATES on error.
 */
export function useZentrunkPricing(countryCode: string): {
  rates: ZentrunkRates | null;
  loading: boolean;
} {
  const cache = useRef<Map<string, ZentrunkRates>>(new Map());
  const [rates, setRates] = useState<ZentrunkRates | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRates = useCallback((code: string) => {
    const cached = cache.current.get(code);
    if (cached) {
      setRates(cached);
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([
      fetch(`${INBOUND_URL}${code}`).then((r) => r.json()).catch(() => null),
      fetch(`${OUTBOUND_URL}${code}`).then((r) => r.json()).catch(() => null),
    ])
      .then(([inboundData, outboundData]) => {
        const inRates = inboundData?.zentrunk?.inbound?.rates || {};
        const outRates = outboundData?.zentrunk?.outbound?.rates || {};

        // Extract outbound network groups for Detailed Network Pricing
        const networkGroups: NetworkGroup[] = [];
        const ng = outboundData?.zentrunk?.outbound?.network_groups;
        if (ng && typeof ng === "object") {
          for (const [name, rate] of Object.entries(ng)) {
            const r = typeof rate === "string" ? parseFloat(rate as string) : (rate as number);
            if (!isNaN(r)) networkGroups.push({ name, rate: r });
          }
          networkGroups.sort((a, b) => a.rate - b.rate);
        }

        const uniqueOutboundRates = new Set(networkGroups.map((g) => g.rate));
        const outboundHasMultipleRates = uniqueOutboundRates.size > 1;

        let result: ZentrunkRates = {
          local: {
            inbound: safeFirst(inRates.local),
            outbound: safeFirst(outRates.Fixed),
          },
          mobile: {
            inbound: safeFirst(inRates.mobile),
            outbound: safeFirst(outRates.Mobile),
          },
          national: {
            inbound: safeFirst(inRates.national),
            outbound: safeFirst(outRates.National),
          },
          tollfree: {
            inbound: safeFirst(inRates.tollfree),
            outbound: safeFirst(outRates.tollfree),
          },
          networkGroups,
          outboundHasMultipleRates,
        };

        // India override — rates in USD, formatPrice converts to INR (×85)
        if (code === "IN") {
          result.local.inbound = 0.0087;    // ₹0.74/min
          result.local.outbound = 0.0087;   // ₹0.74/min
          result.tollfree.inbound = 0.0153; // ₹1.30/min
        }

        // If API returned empty/zero data, fall back to hardcoded SIP_RATES
        const allZero =
          result.local.inbound === 0 && result.local.outbound === 0 &&
          result.mobile.inbound === 0 && result.mobile.outbound === 0 &&
          result.national.inbound === 0 && result.national.outbound === 0 &&
          result.tollfree.inbound === 0 && result.tollfree.outbound === 0;

        if (allZero) {
          const fallback = SIP_RATES[code];
          if (fallback) {
            result = {
              local: { inbound: fallback.localIn, outbound: fallback.localOut },
              mobile: { inbound: fallback.mobileIn, outbound: fallback.mobileOut },
              national: { inbound: fallback.nationalIn, outbound: fallback.nationalOut },
              tollfree: { inbound: fallback.tollfreeIn, outbound: fallback.tollfreeOut },
              networkGroups,
              outboundHasMultipleRates,
            };
          }
        }

        cache.current.set(code, result);
        setRates(result);
      })
      .catch(() => {
        // Fall back to hardcoded SIP_RATES
        const fallback = SIP_RATES[code];
        if (fallback) {
          setRates({
            local: { inbound: fallback.localIn, outbound: fallback.localOut },
            mobile: { inbound: fallback.mobileIn, outbound: fallback.mobileOut },
            national: { inbound: fallback.nationalIn, outbound: fallback.nationalOut },
            tollfree: { inbound: fallback.tollfreeIn, outbound: fallback.tollfreeOut },
            networkGroups: [],
            outboundHasMultipleRates: false,
          });
        } else {
          setRates(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (countryCode) fetchRates(countryCode);
  }, [countryCode, fetchRates]);

  return { rates, loading };
}
