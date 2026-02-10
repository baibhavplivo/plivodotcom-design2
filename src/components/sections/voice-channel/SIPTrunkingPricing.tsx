"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  SIP_PRIORITY_COUNTRIES,
  SIP_RATES,
  SIP_COUNTRY_NAMES,
  PHONE_RENTAL_RATES,
} from "@/data/pricing-data";
import type { CountryOption, SIPRates } from "@/data/pricing-data";

type SectionId = "inbound-rates" | "phone-numbers" | "calculator";

function getSections(countryCode: string): { id: SectionId; label: string }[] {
  const base: { id: SectionId; label: string }[] = [
    { id: "inbound-rates", label: "Inbound Call Rates" },
  ];
  if (PHONE_RENTAL_RATES[countryCode]) {
    base.push({ id: "phone-numbers", label: "Phone Number Rental" });
  }
  base.push({ id: "calculator", label: "Cost Calculator" });
  return base;
}

// Build the full country list from SIP_RATES keys
const allCountries: CountryOption[] = Object.keys(SIP_RATES)
  .map((code) => ({
    code,
    name: SIP_COUNTRY_NAMES[code] || code,
    flag: SIP_PRIORITY_COUNTRIES.find((c) => c.code === code)?.flag || getFlagEmoji(code),
  }))
  .sort((a, b) => {
    // Priority countries first, then alphabetical
    const aIdx = SIP_PRIORITY_COUNTRIES.findIndex((c) => c.code === a.code);
    const bIdx = SIP_PRIORITY_COUNTRIES.findIndex((c) => c.code === b.code);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatRate(rate: number): string {
  if (rate === 0) return "Not Available";
  return `$${rate.toFixed(4)}/min`;
}

export default function SIPTrunkingPricing() {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(allCountries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inbound-rates");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculator state
  const [localMinutes, setLocalMinutes] = useState(100000);
  const [tollfreeMinutes, setTollfreeMinutes] = useState(100000);

  const sections = getSections(selectedCountry.code);
  const rates = SIP_RATES[selectedCountry.code] || SIP_RATES["US"];

  // Close dropdown when clicking outside
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

  // Scroll spy + sticky sidebar
  useEffect(() => {
    const handleScrollAndResize = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
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
    if (element) {
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return allCountries;
    const q = searchQuery.toLowerCase();
    return allCountries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              Zentrunk Pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Pay-as-you-go SIP trunking with competitive inbound rates across 55+ countries. No setup fees, no contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[256px_1fr] lg:gap-8 lg:items-start">
            {/* Left Sidebar Wrapper */}
            <div ref={sidebarWrapperRef} className="mb-8 lg:mb-0">
              <aside className="bg-white z-30" style={sidebarStyle}>
                {/* Country Selector */}
                <div className="relative mb-6" ref={dropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Country
                  </label>
                  <button
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setSearchQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left">
                      {selectedCountry.name}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-gray-400 transition-transform",
                        isCountryOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#323dfe] focus:border-transparent"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsCountryOpen(false);
                              setSearchQuery("");
                            }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                              selectedCountry.code === country.code && "bg-[#323dfe]/5"
                            )}
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-sm text-gray-900">{country.name}</span>
                          </button>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Navigation */}
                <nav className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700 mb-3">Jump to section</p>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                            activeSection === section.id
                              ? "border-[#323dfe] text-[#323dfe] font-medium"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
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

            {/* Right Content */}
            <div ref={contentRef} className="min-w-0">
              {/* Inbound Call Rates */}
              <div id="inbound-rates" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <InboundRatesSection rates={rates} countryName={selectedCountry.name} />
              </div>

              {/* Phone Number Rental */}
              {PHONE_RENTAL_RATES[selectedCountry.code] && (
                <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <PhoneRentalSection countryCode={selectedCountry.code} />
                </div>
              )}

              {/* Cost Calculator */}
              <div id="calculator" className="bg-white rounded-xl border border-gray-200 p-6">
                <CalculatorSection
                  rates={rates}
                  countryName={selectedCountry.name}
                  localMinutes={localMinutes}
                  setLocalMinutes={setLocalMinutes}
                  tollfreeMinutes={tollfreeMinutes}
                  setTollfreeMinutes={setTollfreeMinutes}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InboundRatesSection({ rates, countryName }: { rates: SIPRates; countryName: string }) {
  const rows: { type: string; rate: string }[] = [];
  if (rates.local > 0) rows.push({ type: "Local", rate: formatRate(rates.local) });
  if (rates.mobile > 0) rows.push({ type: "Mobile", rate: formatRate(rates.mobile) });
  if (rates.national > 0) rows.push({ type: "National", rate: formatRate(rates.national) });
  if (rates.tollfree > 0) rows.push({ type: "Toll-Free", rate: formatRate(rates.tollfree) });

  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">Inbound Call Rates</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute inbound rates for {countryName}. Outbound rates are determined by destination — contact sales for details.
      </p>

      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                  Number Type
                </th>
                <th className="py-3 text-left text-sm font-semibold text-black">Inbound Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.type}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                  <td className="py-3 text-sm font-medium text-black">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-sm text-gray-500 py-4">
          No inbound rates available for {countryName}. Contact sales for outbound-only pricing.
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4">
        All rates are pay-as-you-go with no minimum commitment. Volume discounts available.
      </p>
    </div>
  );
}

function PhoneRentalSection({ countryCode }: { countryCode: string }) {
  const rental = PHONE_RENTAL_RATES[countryCode];
  if (!rental) return null;

  const rows: { type: string; price: string }[] = [];
  if (rental.local) {
    rows.push({
      type: "Local Numbers",
      price: `${rental.local.currency}${rental.local.rate.toFixed(2)}/month`,
    });
  }
  if (rental.tollfree) {
    rows.push({
      type: "Toll-Free Numbers",
      price: `${rental.tollfree.currency}${rental.tollfree.rate.toFixed(2)}/month`,
    });
  }
  if (rental.mobile) {
    rows.push({
      type: "Mobile Numbers",
      price: `${rental.mobile.currency}${rental.mobile.rate.toFixed(2)}/month`,
    });
  }

  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly rental rates for phone numbers used with Zentrunk.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                Number Type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                <td className="py-3 text-sm font-medium text-black">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatLargeNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

const minuteSteps = [100000, 200000, 300000, 400000, 500000, 600000];

function CalculatorSection({
  rates,
  countryName,
  localMinutes,
  setLocalMinutes,
  tollfreeMinutes,
  setTollfreeMinutes,
}: {
  rates: SIPRates;
  countryName: string;
  localMinutes: number;
  setLocalMinutes: (v: number) => void;
  tollfreeMinutes: number;
  setTollfreeMinutes: (v: number) => void;
}) {
  const localRate = rates.local || 0;
  const tollfreeRate = rates.tollfree || 0;
  const localSubtotal = localMinutes * localRate;
  const tollfreeSubtotal = tollfreeMinutes * tollfreeRate;
  const grandTotal = localSubtotal + tollfreeSubtotal;

  const showLocal = localRate > 0;
  const showTollfree = tollfreeRate > 0;

  if (!showLocal && !showTollfree) {
    return (
      <div>
        <h2 className="font-inter text-xl font-semibold text-black mb-2">Cost Calculator</h2>
        <p className="text-sm text-gray-500 py-4">
          Cost calculator is not available for {countryName}. Contact sales for a custom quote.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">Cost Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">
        Estimate your monthly Zentrunk costs for {countryName}.
      </p>

      <div className="space-y-8">
        {/* Local Minutes Slider */}
        {showLocal && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Local Inbound Minutes</span>
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
              onChange={(e) => setLocalMinutes(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#323dfe]"
            />
            <div className="flex justify-between mt-1">
              {minuteSteps.map((step) => (
                <span key={step} className="text-[10px] text-gray-400">
                  {step / 1000}K
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-gray-500">
                Rate: ${localRate.toFixed(4)}/min
              </span>
              <span className="font-medium text-black">
                ${formatLargeNumber(Math.round(localSubtotal))}
              </span>
            </div>
          </div>
        )}

        {/* Toll-Free Minutes Slider */}
        {showTollfree && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Toll-Free Inbound Minutes</span>
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
              onChange={(e) => setTollfreeMinutes(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#323dfe]"
            />
            <div className="flex justify-between mt-1">
              {minuteSteps.map((step) => (
                <span key={step} className="text-[10px] text-gray-400">
                  {step / 1000}K
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-gray-500">
                Rate: ${tollfreeRate.toFixed(4)}/min
              </span>
              <span className="font-medium text-black">
                ${formatLargeNumber(Math.round(tollfreeSubtotal))}
              </span>
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-black">Estimated Monthly Cost</p>
              <p className="text-xs text-gray-500 mt-1">
                Based on {formatLargeNumber(showLocal ? localMinutes : 0)}
                {showLocal && showTollfree ? " local + " : ""}
                {showTollfree ? `${formatLargeNumber(tollfreeMinutes)} toll-free` : ""} minutes
              </p>
            </div>
            <p className="text-2xl font-bold text-black">
              ${formatLargeNumber(Math.round(grandTotal))}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/contact/sales"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors"
            >
              Get Volume Pricing
            </a>
            <a
              href="https://console.plivo.com/accounts/register/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
