import { useState, useEffect, useRef, useCallback } from "react";
import { SIP_RATES } from "@/data/pricing-data";

const INBOUND_URL =
  "https://prod-routing-central-pub.zt.plivo.com/api/v1/zt/pricing/inbound?&country=";
const OUTBOUND_URL =
  "https://prod-routing-central-pub.zt.plivo.com/api/v1/zt/pricing?&country=";

export interface ZentrunkRates {
  local: { inbound: number; outbound: number };
  mobile: { inbound: number; outbound: number };
  national: { inbound: number; outbound: number };
  tollfree: { inbound: number; outbound: number };
}

function safeFirst(val: any): number {
  if (Array.isArray(val)) return typeof val[0] === "number" ? val[0] : 0;
  if (typeof val === "number") return val;
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
        };

        // India override
        if (code === "IN") {
          result.local.inbound = 0.74;
          result.local.outbound = 0.74;
        }

        cache.current.set(code, result);
        setRates(result);
      })
      .catch(() => {
        // Fall back to hardcoded SIP_RATES (inbound only)
        const fallback = SIP_RATES[code];
        if (fallback) {
          setRates({
            local: { inbound: fallback.local, outbound: 0 },
            mobile: { inbound: fallback.mobile, outbound: 0 },
            national: { inbound: fallback.national, outbound: 0 },
            tollfree: { inbound: fallback.tollfree, outbound: 0 },
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
