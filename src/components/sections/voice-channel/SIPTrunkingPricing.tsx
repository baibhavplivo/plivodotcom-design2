"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  SIP_PRICING_BILLING_NOTE,
  SIP_PRICING_COUNTRIES,
  SIP_PRICING_DATA,
  SIP_PRICING_HERO,
  SIP_PRICING_PHONE_NOTE,
  SIP_PRICING_SUPPORT_URL,
  SIP_PRICING_VOLUME_CTA,
  type SIPPricingAddOnRow,
  type SIPPricingCallRow,
  type SIPPricingCountryData,
  type SIPPricingNetworkRow,
  type SIPPricingPhoneRow,
} from "@/data/sip-pricing-page";
import type { CountryListItem } from "@/data/pricing-data";
import { hasNumberCoverage, hasTollfreeSupport } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useSignupUrl } from "@/hooks/useSignupUrl";
import { cn } from "@/lib/utils";

type SectionId =
  | "call-rates"
  | "network-pricing"
  | "phone-numbers"
  | "add-ons"
  | "calculator";

interface SIPTrunkingPricingProps {
  initialCountry?: string;
}

const DEFAULT_COUNTRY_CODE = "US";
const SECTION_HEADING_CLASS = "font-sans text-xl font-semibold text-black mb-2";
const SECTION_DESCRIPTION_CLASS = "mb-6 text-sm text-gray-500";
const TEXT_LINK_CLASS =
  "text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors";
const MINUTE_STEPS = [100000, 200000, 300000, 400000, 500000, 600000];

function findCountry(code?: string) {
  if (!code) return null;
  return (
    SIP_PRICING_COUNTRIES.find((country) => country.code === code.toUpperCase()) ||
    null
  );
}

function updatePricingPath(countryCode: string) {
  if (typeof window === "undefined") return;

  const nextPath = `/sip-trunking/pricing/${countryCode.toLowerCase()}/`;
  if (window.location.pathname !== nextPath) {
    window.history.replaceState({}, "", nextPath);
  }
}

function getSections(countryData: SIPPricingCountryData) {
  const sections: { id: SectionId; label: string }[] = [
    { id: "call-rates", label: "Voice calls" },
  ];

  if (countryData.networkRows.length > 0) {
    sections.push({ id: "network-pricing", label: "Detailed network pricing" });
  }

  if (countryData.phoneRows.length > 0) {
    sections.push({ id: "phone-numbers", label: "Phone number rental" });
  }

  sections.push({ id: "add-ons", label: "Add-on services" });

  if (countryData.calculator) {
    sections.push({ id: "calculator", label: "Cost calculator" });
  }

  return sections;
}

function isUnavailableValue(value: string) {
  return /^(na|not supported|not available)$/i.test(value.trim());
}

function valueClassName(value: string) {
  return isUnavailableValue(value) ? "text-gray-400" : "text-black";
}

function cleanNote(value: string) {
  return value.replace(/^\*\*/, "").trim();
}

function formatLargeNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatRate(value: number, currencySymbol: string) {
  return `${currencySymbol}${value.toFixed(4)}/min`;
}

function formatSliderBackground(value: number) {
  const percentage = ((value - 100000) / 500000) * 100;
  return `linear-gradient(to right, #323dfe ${percentage}%, #e5e7eb ${percentage}%)`;
}

function renderOutboundValue(row: SIPPricingCallRow) {
  if (row.startsAt && !isUnavailableValue(row.outbound)) {
    return `Starts at ${row.outbound}`;
  }
  return row.outbound;
}

function CallRatesSection({
  countryData,
  onOpenNetworkPricing,
}: {
  countryData: SIPPricingCountryData;
  onOpenNetworkPricing: () => void;
}) {
  const hasNetworkRows = countryData.networkRows.length > 0;

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Voice calls</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Per-minute rates for available SIP Trunking number routes. Network-level
        outbound call pricing is available where rates vary by number type.
      </p>

      {countryData.callRows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[38%]">
                  Number type
                </th>
                <th className="py-3 pr-4 text-left text-sm font-semibold text-black">
                  To make calls (Outbound)
                </th>
                <th className="py-3 text-left text-sm font-semibold text-black">
                  To receive calls (Inbound)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {countryData.callRows.map((row) => (
                <tr key={row.label}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                  <td className="py-3 pr-4 text-sm font-medium">
                    <div className={valueClassName(renderOutboundValue(row))}>
                      {renderOutboundValue(row)}
                    </div>
                    {row.showDetailedPricingLink && hasNetworkRows && (
                      <button
                        type="button"
                        onClick={onOpenNetworkPricing}
                        className={cn("mt-1 text-sm font-medium", TEXT_LINK_CLASS)}
                      >
                        View detailed pricing
                      </button>
                    )}
                  </td>
                  <td
                    className={cn(
                      "py-3 text-sm font-medium",
                      valueClassName(row.inbound),
                    )}
                  >
                    {row.inbound}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-4 text-sm text-gray-500">
          No call pricing is currently available for {countryData.name}. Contact
          sales for a custom quote.
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">{SIP_PRICING_BILLING_NOTE}</p>
    </div>
  );
}

function NetworkPricingSection({
  rows,
  countryName,
}: {
  rows: SIPPricingNetworkRow[];
  countryName: string;
}) {
  if (rows.length === 0) return null;

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Detailed network pricing</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Network-level outbound call pricing for {countryName}.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                Network group
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Outbound calls
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                <td
                  className={cn(
                    "py-3 text-sm font-medium",
                    valueClassName(row.price),
                  )}
                >
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PhoneRentalSection({
  rows,
}: {
  rows: SIPPricingPhoneRow[];
}) {
  if (rows.length === 0) return null;

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Phone number rental</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Monthly rental rates for voice-capable phone numbers available with SIP
        Trunking.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                Number type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                <td
                  className={cn(
                    "py-3 text-sm font-medium",
                    valueClassName(row.price || "Not Supported"),
                  )}
                >
                  {row.price || "Not Supported"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-400">{cleanNote(SIP_PRICING_PHONE_NOTE)}</p>
    </div>
  );
}

function AddOnSection({
  rows,
}: {
  rows: SIPPricingAddOnRow[];
}) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Add-on services</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Additional services available with SIP Trunking.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                Service
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                <td
                  className={cn(
                    "py-3 text-sm font-medium",
                    valueClassName(row.price),
                  )}
                >
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalculatorSection({
  countryData,
}: {
  countryData: SIPPricingCountryData;
}) {
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  const calculator = countryData.calculator;
  const [localMinutes, setLocalMinutes] = useState(100000);
  const [tollfreeMinutes, setTollfreeMinutes] = useState(100000);

  if (!calculator) {
    return (
      <div>
        <h2 className={SECTION_HEADING_CLASS}>Cost calculator</h2>
        <p className="py-4 text-sm text-gray-500">
          Cost calculator is not available for {countryData.name}. Contact sales
          for a custom quote.
        </p>
      </div>
    );
  }

  const showLocal = calculator.localRate > 0;
  const showTollfree = calculator.tollfreeRate > 0;
  const localSubtotal = Math.round(localMinutes * calculator.localRate);
  const tollfreeSubtotal = Math.round(tollfreeMinutes * calculator.tollfreeRate);
  const total = localSubtotal + tollfreeSubtotal;

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Cost calculator</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Estimate your monthly SIP Trunking costs for {countryData.name}.
      </p>

      <div className="space-y-8">
        {showLocal && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Local inbound minutes
              </span>
              <span className="text-sm font-medium text-black">
                {formatLargeNumber(localMinutes)} min
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={600000}
              step={100000}
              value={localMinutes}
              onChange={(event) => setLocalMinutes(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-[#323dfe]"
              style={{ background: formatSliderBackground(localMinutes) }}
            />
            <div className="mt-1 flex justify-between">
              {MINUTE_STEPS.map((step) => (
                <span key={step} className="text-[10px] text-gray-400">
                  {step / 1000}K
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500">
                Rate: {formatRate(calculator.localRate, calculator.currencySymbol)}
              </span>
              <span className="font-medium text-black">
                {calculator.currencySymbol}
                {formatLargeNumber(localSubtotal)}
              </span>
            </div>
          </div>
        )}

        {showTollfree && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Toll-free inbound minutes
              </span>
              <span className="text-sm font-medium text-black">
                {formatLargeNumber(tollfreeMinutes)} min
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={600000}
              step={100000}
              value={tollfreeMinutes}
              onChange={(event) => setTollfreeMinutes(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-[#323dfe]"
              style={{ background: formatSliderBackground(tollfreeMinutes) }}
            />
            <div className="mt-1 flex justify-between">
              {MINUTE_STEPS.map((step) => (
                <span key={step} className="text-[10px] text-gray-400">
                  {step / 1000}K
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500">
                Rate: {formatRate(calculator.tollfreeRate, calculator.currencySymbol)}
              </span>
              <span className="font-medium text-black">
                {calculator.currencySymbol}
                {formatLargeNumber(tollfreeSubtotal)}
              </span>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-black">
                Estimated monthly cost
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Based on {formatLargeNumber(showLocal ? localMinutes : 0)}
                {showLocal && showTollfree ? " local + " : ""}
                {showTollfree
                  ? `${formatLargeNumber(tollfreeMinutes)} toll-free`
                  : ""}{" "}
                minutes
              </p>
            </div>
            <p className="text-2xl font-bold text-black">
              {calculator.currencySymbol}
              {formatLargeNumber(total)}
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {SIP_PRICING_VOLUME_CTA.title}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={SIP_PRICING_VOLUME_CTA.buttonHref}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-50"
            >
              {SIP_PRICING_VOLUME_CTA.buttonLabel}
            </a>
            <a
              href={signupUrl}
              {...(signupUrl.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="cta-hover-gradient inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors"
            >
              {signupLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SIPTrunkingPricing({
  initialCountry,
}: SIPTrunkingPricingProps) {
  const { country: geoCountry } = useGeoCountry(DEFAULT_COUNTRY_CODE, {
    mode: "exact",
  });
  const initialSelection = (
    findCountry(initialCountry) ||
    findCountry(DEFAULT_COUNTRY_CODE) ||
    SIP_PRICING_COUNTRIES[0]
  ) as CountryListItem;
  const initialized = useRef(Boolean(findCountry(initialCountry)));
  const [selectedCountry, setSelectedCountry] =
    useState<CountryListItem>(initialSelection);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("call-rates");
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialized.current) return;

    const preferred =
      findCountry(geoCountry) ||
      findCountry(DEFAULT_COUNTRY_CODE) ||
      SIP_PRICING_COUNTRIES[0];

    if (!preferred) return;

    initialized.current = true;
    setSelectedCountry(preferred);
    updatePricingPath(preferred.code);
  }, [geoCountry]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rawCountryData =
    SIP_PRICING_DATA[selectedCountry.code] || SIP_PRICING_DATA[DEFAULT_COUNTRY_CODE];

  // Apply number coverage rules: mask inbound for non-coverage countries,
  // hide TF rows for non-TF countries, filter "from Plivo-XX" network rows
  const countryData = useMemo(() => {
    const code = selectedCountry.code;
    const hasCoverage = hasNumberCoverage(code);
    const hasTF = hasTollfreeSupport(code);

    const callRows = rawCountryData.callRows
      .filter((row) => {
        // Hide toll-free rows entirely for countries without TF support
        if (row.label.toLowerCase().includes("toll-free") && !hasTF) return false;
        return true;
      })
      .map((row) => ({
        ...row,
        // Mask inbound for countries without number coverage
        inbound: hasCoverage ? row.inbound : "Not Supported",
      }));

    const networkRows = rawCountryData.networkRows.filter(
      (row) => !row.label.includes("from Plivo-"),
    );

    return { ...rawCountryData, callRows, networkRows };
  }, [rawCountryData, selectedCountry.code]);

  const sections = useMemo(() => getSections(countryData), [countryData]);

  useEffect(() => {
    const handleScrollAndResize = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      if (window.innerWidth >= 1024 && sidebarWrapperRef.current && contentRef.current) {
        const wrapperRect = sidebarWrapperRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const topThreshold = 125;

        if (wrapperRect.top <= topThreshold && contentRect.bottom > 300) {
          setSidebarStyle({
            position: "fixed",
            top: `${topThreshold}px`,
            left: `${wrapperRect.left}px`,
            width: "256px",
          });
        } else {
          setSidebarStyle({});
        }
      } else {
        setSidebarStyle({});
      }
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [sections]);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 120;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return SIP_PRICING_COUNTRIES;

    const query = searchQuery.toLowerCase();
    return SIP_PRICING_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleCountrySelect = (country: CountryListItem) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    setSearchQuery("");
    updatePricingPath(country.code);
  };

  return (
    <>
      <section className="bg-white pb-10 pt-[56px] sm:pt-[64px] md:pt-[72px]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="mb-4 font-sora text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.5rem] md:text-[3rem]">
              {SIP_PRICING_HERO.title}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              {SIP_PRICING_HERO.description}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <a href={SIP_PRICING_HERO.volumeLinkHref} className={TEXT_LINK_CLASS}>
                {SIP_PRICING_HERO.volumeLinkLabel}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[256px_1fr] lg:items-start lg:gap-8">
            <div ref={sidebarWrapperRef} className="mb-8 lg:mb-0">
              <aside className="z-30 bg-white" style={sidebarStyle}>
                <div className="relative mb-6" ref={dropdownRef}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Select country
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCountryOpen((open) => !open);
                      setSearchQuery("");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:border-gray-400"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="flex-1 text-left text-sm font-medium text-gray-900">
                      {selectedCountry.name}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform",
                        isCountryOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="border-b border-gray-100 p-2">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto">
                        {filteredCountries.map((country, index) => (
                          <div key={country.code}>
                            {!country.isPriority &&
                              index > 0 &&
                              filteredCountries[index - 1]?.isPriority && (
                                <div className="my-1 border-t border-gray-200" />
                              )}
                            <button
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className={cn(
                                "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-gray-50",
                                selectedCountry.code === country.code &&
                                  "bg-[#323dfe]/5",
                              )}
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="text-sm text-gray-900">
                                {country.name}
                              </span>
                            </button>
                          </div>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <nav className="hidden lg:block">
                  <p className="mb-3 text-sm font-medium text-gray-700">
                    Jump to section
                  </p>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full border-l-2 px-3 py-2 text-left text-sm transition-colors",
                            activeSection === section.id
                              ? "border-[#323dfe] font-medium text-[#323dfe]"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900",
                          )}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            </div>

            <div ref={contentRef} className="min-w-0">
              <div id="call-rates" className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
                <CallRatesSection
                  countryData={countryData}
                  onOpenNetworkPricing={() => scrollToSection("network-pricing")}
                />
              </div>

              {countryData.networkRows.length > 0 && (
                <div
                  id="network-pricing"
                  className="mb-6 rounded-xl border border-gray-200 bg-white p-6"
                >
                  <NetworkPricingSection
                    rows={countryData.networkRows}
                    countryName={countryData.name}
                  />
                </div>
              )}

              {countryData.phoneRows.length > 0 && (
                <div
                  id="phone-numbers"
                  className="mb-6 rounded-xl border border-gray-200 bg-white p-6"
                >
                  <PhoneRentalSection rows={countryData.phoneRows} />
                </div>
              )}

              <div id="add-ons" className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
                <AddOnSection rows={countryData.addOnRows} />
              </div>

              {countryData.calculator ? (
                <div id="calculator" className="rounded-xl border border-gray-200 bg-white p-6">
                  <CalculatorSection countryData={countryData} />
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <p className="text-sm text-gray-500">
                    Need volume pricing or a country-specific quote?{" "}
                    <a
                      href={SIP_PRICING_SUPPORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={TEXT_LINK_CLASS}
                    >
                      Contact support
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
