"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SIP_COVERAGE_BILLING_NOTE,
  SIP_COVERAGE_COUNTRIES,
  SIP_COVERAGE_COUNTRY_MAP,
  SIP_COVERAGE_HERO,
  type SIPCoverageContinent,
  type SIPCoverageCountry,
  type SIPCoveragePricingRow,
} from "@/data/sip-coverage-data";
import { SIP_RATES, VOICE_RATES } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useSignupUrl } from "@/hooks/useSignupUrl";

type CoverageType = "outbound" | "inbound";
type RateDirection = "outbound" | "inbound";

interface SIPTrunkingCoverageProps {
  initialCountry?: string;
}

const continentLabels: Record<SIPCoverageContinent, string> = {
  "north-america": "North America",
  "south-america": "South America",
  europe: "Europe",
  asia: "Asia",
  africa: "Africa",
  oceania: "Oceania",
};

const continentOrder: SIPCoverageContinent[] = [
  "north-america",
  "south-america",
  "asia",
  "europe",
  "africa",
  "oceania",
];

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

function formatNumericRate(value: number, countryCode: string): string | null {
  if (!Number.isFinite(value) || value <= 0) return null;
  const currency = countryCode === "IN" ? "₹" : "$";
  return `${currency}${value.toFixed(4)}/min`;
}

function parseRateString(value?: string | null): string | null {
  if (!value || value.includes("NaN") || value === "Not Supported") return null;

  const match = value.match(/([₹$])?([0-9.]+)\/min/);
  if (!match) return null;

  const currency = match[1] || "$";
  const amount = Number.parseFloat(match[2]);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return `${currency}${amount.toFixed(4)}/min`;
}

function getFallbackRate(
  countryCode: string,
  rowKey: SIPCoveragePricingRow["key"],
  direction: RateDirection,
): string | null {
  const sipRates = SIP_RATES[countryCode];
  const voiceRates = VOICE_RATES[countryCode];

  if (rowKey === "local") {
    if (countryCode === "IN" && sipRates) {
      const indiaRate =
        direction === "outbound" ? sipRates.localOut : sipRates.localIn;
      return formatNumericRate(indiaRate, countryCode);
    }

    const voiceRate = parseRateString(
      direction === "outbound" ? voiceRates?.localOutbound : voiceRates?.localInbound,
    );
    if (voiceRate) return voiceRate;

    const sipRate =
      direction === "outbound" ? sipRates?.localOut : sipRates?.localIn;
    return typeof sipRate === "number" ? formatNumericRate(sipRate, countryCode) : null;
  }

  if (rowKey === "mobile") {
    if (direction === "outbound") {
      return getFallbackRate(countryCode, "local", "outbound");
    }

    const sipRate = sipRates?.mobileIn;
    return typeof sipRate === "number" ? formatNumericRate(sipRate, countryCode) : null;
  }

  if (direction === "outbound") {
    if (countryCode === "US" || countryCode === "CA") {
      return formatNumericRate(0.001, countryCode);
    }

    const sipRate = sipRates?.tollfreeOut;
    if (typeof sipRate === "number") {
      const formatted = formatNumericRate(sipRate, countryCode);
      if (formatted) return formatted;
    }

    return parseRateString(voiceRates?.tollfreeOutbound);
  }

  const voiceRate = parseRateString(voiceRates?.tollfreeInbound);
  if (voiceRate) return voiceRate;

  const sipRate = sipRates?.tollfreeIn;
  return typeof sipRate === "number" ? formatNumericRate(sipRate, countryCode) : null;
}

function resolvePricingRows(country: SIPCoverageCountry): SIPCoveragePricingRow[] {
  return country.pricingRows.map((row) => {
    const outboundFallback =
      row.outbound.value === "Not Supported"
        ? getFallbackRate(country.code, row.key, "outbound")
        : null;
    const inboundFallback =
      row.inbound.value === "Not Supported"
        ? getFallbackRate(country.code, row.key, "inbound")
        : null;

    return {
      ...row,
      outbound: outboundFallback
        ? { note: row.outbound.note, value: outboundFallback }
        : row.outbound,
      inbound: inboundFallback
        ? { note: row.inbound.note, value: inboundFallback }
        : row.inbound,
    };
  });
}

function updateCoveragePath(countryCode: string) {
  if (typeof window === "undefined") return;

  const nextPath = `/sip-trunking/coverage/${countryCode.toLowerCase()}/`;
  if (window.location.pathname !== nextPath) {
    window.history.replaceState({}, "", nextPath);
  }
}

function resolvePreferredCountryCode(
  initialCountry: string | undefined,
  geoCountry: string,
): string {
  const requested = initialCountry?.toUpperCase();
  if (requested && SIP_COVERAGE_COUNTRY_MAP[requested]) return requested;
  if (SIP_COVERAGE_COUNTRY_MAP[geoCountry]) return geoCountry;
  return "US";
}

function getCoverageLabel(country: SIPCoverageCountry): string {
  if (country.deliveryType) return country.deliveryType;
  return country.inbound ? "Inbound & Outbound" : "Outbound only";
}

export default function SIPTrunkingCoverage({
  initialCountry,
}: SIPTrunkingCoverageProps) {
  const { country: geoCountry } = useGeoCountry();
  const initialRequestedCountry = initialCountry?.toUpperCase();
  const initialCountryData =
    (initialRequestedCountry && SIP_COVERAGE_COUNTRY_MAP[initialRequestedCountry]) ||
    SIP_COVERAGE_COUNTRY_MAP.US;

  const [coverageType, setCoverageType] = useState<CoverageType>("outbound");
  const [activeContinent, setActiveContinent] = useState<SIPCoverageContinent>(
    initialCountryData.continent,
  );
  const [selectedCode, setSelectedCode] = useState<string | null>(initialCountryData.code);

  const initialized = useRef(Boolean(initialRequestedCountry && initialCountryData));

  useEffect(() => {
    if (initialized.current) return;

    const preferredCode = resolvePreferredCountryCode(initialCountry, geoCountry);
    const country = SIP_COVERAGE_COUNTRY_MAP[preferredCode] || SIP_COVERAGE_COUNTRY_MAP.US;
    if (!country) return;

    initialized.current = true;
    setSelectedCode(country.code);
    setActiveContinent(country.continent);
  }, [geoCountry, initialCountry]);

  const outboundCount = useMemo(
    () => SIP_COVERAGE_COUNTRIES.filter((country) => country.outbound).length,
    [],
  );

  const inboundCount = useMemo(
    () => SIP_COVERAGE_COUNTRIES.filter((country) => country.inbound).length,
    [],
  );

  const availableContinents = useMemo(
    () =>
      continentOrder.filter((continent) =>
        SIP_COVERAGE_COUNTRIES.some(
          (country) =>
            country.continent === continent &&
            (coverageType === "outbound" ? country.outbound : country.inbound),
        ),
      ),
    [coverageType],
  );

  const filteredCountries = useMemo(
    () =>
      SIP_COVERAGE_COUNTRIES.filter(
        (country) =>
          country.continent === activeContinent &&
          (coverageType === "outbound" ? country.outbound : country.inbound),
      ),
    [activeContinent, coverageType],
  );

  const selectedCountry = selectedCode ? SIP_COVERAGE_COUNTRY_MAP[selectedCode] : null;

  useEffect(() => {
    if (
      coverageType === "inbound" &&
      selectedCountry &&
      !selectedCountry.inbound
    ) {
      setSelectedCode(null);
    }
  }, [coverageType, selectedCountry]);

  useEffect(() => {
    if (!availableContinents.includes(activeContinent)) {
      setActiveContinent(availableContinents[0] || "north-america");
    }
  }, [activeContinent, availableContinents]);

  return (
    <section className="bg-white pt-[56px] pb-12 sm:pt-[64px] md:pt-[72px] lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h1 className="mb-4 font-sora text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.5rem] md:text-[3rem]">
            {SIP_COVERAGE_HERO.title}
          </h1>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            {SIP_COVERAGE_HERO.description}
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setCoverageType("outbound")}
              className={cn(
                "rounded-md px-6 py-2.5 text-sm font-medium transition-all",
                coverageType === "outbound"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black",
              )}
            >
              Outbound ({outboundCount} countries)
            </button>
            <button
              onClick={() => setCoverageType("inbound")}
              className={cn(
                "rounded-md px-6 py-2.5 text-sm font-medium transition-all",
                coverageType === "inbound"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black",
              )}
            >
              Inbound ({inboundCount} countries)
            </button>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-wrap border-b border-gray-200">
            {availableContinents.map((continent) => (
              <button
                key={continent}
                onClick={() => {
                  setActiveContinent(continent);
                  setSelectedCode(null);
                }}
                className={cn(
                  "px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all -mb-[1px]",
                  activeContinent === continent
                    ? "border-b-4 border-[#323dfe] text-black"
                    : "border-b-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-black",
                )}
              >
                {continentLabels[continent]}
              </button>
            ))}
          </div>

          <div className="p-6">
            <p className="mb-5 text-sm text-gray-500">
              {coverageType === "inbound"
                ? "Select a country to view inbound origination availability, number types, and rates."
                : "Select a country to view live SIP trunking coverage, number types, and rates."}
            </p>

            {filteredCountries.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCode(country.code);
                      setActiveContinent(country.continent);
                      updateCoveragePath(country.code);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded px-2 py-1.5 text-left transition-all",
                      selectedCode === country.code
                        ? "bg-gray-100 ring-1 ring-gray-900"
                        : "hover:bg-gray-50",
                    )}
                  >
                    <span className="text-lg">{getFlagEmoji(country.code)}</span>
                    <span className="truncate text-sm font-normal text-black">
                      {country.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                No countries available for {coverageType} SIP trunking in{" "}
                {continentLabels[activeContinent]}.
              </div>
            )}
          </div>
        </div>

        {selectedCountry ? (
          <CountryDetailPanel country={selectedCountry} />
        ) : null}
      </div>
    </section>
  );
}

function CountryDetailPanel({ country }: { country: SIPCoverageCountry }) {
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  const resolvedPricingRows = useMemo(() => resolvePricingRows(country), [country]);

  const localRow = resolvedPricingRows.find((row) => row.key === "local");
  const makeCallsSupported = localRow?.outbound.value !== "Not Supported";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
        <span className="text-3xl">{getFlagEmoji(country.code)}</span>
        <div>
          <h3 className="text-xl font-semibold text-black">{country.name}</h3>
          <p className="text-sm text-gray-500">{getCoverageLabel(country)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {country.numberTypes.length > 0 ? (
          <div>
            <h4 className="mb-3 font-inter text-base font-semibold text-black">
              Supported Number Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {country.numberTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center rounded-full border border-[#323dfe]/10 bg-[#323dfe]/5 px-3 py-1.5 text-sm font-medium text-[#323dfe]"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="mb-3 font-inter text-base font-semibold text-black">
              Supported Number Type
            </h4>
            <p className="text-sm text-gray-600">No inbound number types available.</p>
          </div>
        )}

        <div>
          <h4 className="mb-3 font-inter text-base font-semibold text-black">Features</h4>
          <div className="space-y-2.5">
            <FeatureRow
              supported={makeCallsSupported}
              label="Make calls to PSTN"
            />
            <FeatureRow
              supported={country.features.receiveCallsFromPstn}
              label="Receive calls from PSTN"
            />
            <FeatureRow supported label="Secure Trunking" />
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-inter text-base font-semibold text-black">
            Country Specs
          </h4>
          <div className="space-y-2">
            <SpecRow label="ISO Code" value={country.code} />
            <SpecRow label="Country Code" value={country.countryCode || "—"} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-3 font-inter text-base font-semibold text-black">Pricing</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 pr-4 text-left text-sm font-semibold text-black">
                    Number Type
                  </th>
                  <th className="py-2 pr-4 text-left text-sm font-semibold text-black">
                    To Make Calls (Outbound)
                  </th>
                  <th className="py-2 text-left text-sm font-semibold text-black">
                    To Receive Calls (Inbound)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {resolvedPricingRows.map((row) => (
                  <tr key={row.key}>
                    <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                    <td className="py-3 pr-4">
                      <RateCell cell={row.outbound} />
                    </td>
                    <td className="py-3">
                      <RateCell cell={row.inbound} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">{SIP_COVERAGE_BILLING_NOTE}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <a
          href={country.pricingPath}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-50"
        >
          View detailed pricing
        </a>
        <a
          href={signupUrl}
          {...(signupUrl.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors cta-hover-gradient"
        >
          {signupLabel}
        </a>
      </div>
    </div>
  );
}

function FeatureRow({
  label,
  supported,
}: {
  label: string;
  supported: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
          supported ? "bg-green-100" : "bg-gray-100",
        )}
      >
        {supported ? (
          <svg
            className="h-3 w-3 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            className="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-900">{label}</span>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-1.5">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-black">{value}</span>
    </div>
  );
}

function RateCell({
  cell,
}: {
  cell: {
    note: string;
    value: string;
  };
}) {
  const isSupported = cell.value !== "Not Supported";

  return (
    <div>
      {cell.note ? <div className="text-xs text-gray-500">{cell.note}</div> : null}
      <div
        className={cn(
          "text-sm font-medium",
          isSupported ? "text-black" : "text-gray-400",
        )}
      >
        {cell.value}
      </div>
    </div>
  );
}
