"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { CountryListItem } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useZentrunkPricing } from "@/hooks/useZentrunkPricing";
import type { ZentrunkRates } from "@/hooks/useZentrunkPricing";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import type { PhoneNumberInfo } from "@/hooks/useCountryPricing";

type SectionId = "inbound-rates" | "phone-numbers" | "calculator";

function getSections(hasPhoneNumbers: boolean): { id: SectionId; label: string }[] {
  const base: { id: SectionId; label: string }[] = [
    { id: "inbound-rates", label: "Call rates" },
  ];
  if (hasPhoneNumbers) {
    base.push({ id: "phone-numbers", label: "Phone number rental" });
  }
  base.push({ id: "calculator", label: "Cost calculator" });
  return base;
}

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

function formatRate(rate: number, currency = "$"): string {
  if (rate === 0) return "Not available";
  return `${currency}${rate.toFixed(4)}/min`;
}

export default function SIPTrunkingPricing() {
  const { country: geoCountry } = useGeoCountry();
  const { countries } = useCountryISOs();
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inbound-rates");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { rates: ztRates, loading } = useZentrunkPricing(selectedCountry.code);
  const { data: pricingData } = useCountryPricing(selectedCountry.code);
  const phoneNumbers = (pricingData?.phoneNumbers || []).filter(
    (pn) => pn.rentalRate != null && pn.rentalRate > 0
  );

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const match = countries.find(c => c.code === geoCountry);
    if (match) setSelectedCountry(match);
  }, [geoCountry, countries]);

  // Calculator state
  const [localMinutes, setLocalMinutes] = useState(100000);
  const [tollfreeMinutes, setTollfreeMinutes] = useState(100000);

  const sections = getSections(phoneNumbers.length > 0);

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
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery, countries]);

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              SIP trunking pricing
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
                    Select country
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
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto">
                        {filteredCountries.map((country, idx) => (
                          <div key={country.code}>
                            {!country.isPriority && idx > 0 && filteredCountries[idx - 1]?.isPriority && (
                              <div className="border-t border-gray-200 my-1" />
                            )}
                            <button
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
                          </div>
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
              {/* Call rates (inbound + outbound) */}
              <div id="inbound-rates" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <CallRatesSection rates={ztRates} countryName={selectedCountry.name} countryCode={selectedCountry.code} loading={loading} />
              </div>

              {/* Phone number rental */}
              {phoneNumbers.length > 0 && (
                <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <PhoneRentalSection phoneNumbers={phoneNumbers} loading={loading} countryCode={selectedCountry.code} />
                </div>
              )}

              {/* Cost calculator */}
              <div id="calculator" className="bg-white rounded-xl border border-gray-200 p-6">
                <CalculatorSection
                  rates={ztRates}
                  countryName={selectedCountry.name}
                  countryCode={selectedCountry.code}
                  localMinutes={localMinutes}
                  setLocalMinutes={setLocalMinutes}
                  tollfreeMinutes={tollfreeMinutes}
                  setTollfreeMinutes={setTollfreeMinutes}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CallRatesSection({ rates, countryName, countryCode, loading }: { rates: ZentrunkRates | null; countryName: string; countryCode: string; loading: boolean }) {
  const currency = countryCode === "IN" ? "₹" : "$";
  const types = [
    { label: "Local", key: "local" as const },
    { label: "Mobile", key: "mobile" as const },
    { label: "National", key: "national" as const },
    { label: "Toll-Free", key: "tollfree" as const },
  ];

  const rows = types.filter((t) => {
    if (!rates) return true;
    const r = rates[t.key];
    return r.inbound > 0 || r.outbound > 0;
  });

  return (
    <div>
      <h2 className="font-sora text-xl font-semibold text-black mb-2">Call rates</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute inbound and outbound rates for {countryName}.
      </p>

      {loading || rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">
                  Number type
                </th>
                <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Inbound</th>
                <th className="py-3 text-left text-sm font-semibold text-black">Outbound</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                types.map((t) => (
                  <tr key={t.key}>
                    <td className="py-3 pr-4 text-sm text-gray-900">{t.label}</td>
                    <td className="py-3 pr-4 text-sm font-medium text-black"><Shimmer /></td>
                    <td className="py-3 text-sm font-medium text-black"><Shimmer /></td>
                  </tr>
                ))
              ) : (
                rows.map((t) => {
                  const r = rates![t.key];
                  return (
                    <tr key={t.key}>
                      <td className="py-3 pr-4 text-sm text-gray-900">{t.label}</td>
                      <td className={cn("py-3 pr-4 text-sm font-medium", r.inbound > 0 ? "text-black" : "text-gray-400")}>
                        {r.inbound > 0 ? formatRate(r.inbound, currency) : "Not available"}
                      </td>
                      <td className={cn("py-3 text-sm font-medium", r.outbound > 0 ? "text-black" : "text-gray-400")}>
                        {r.outbound > 0 ? formatRate(r.outbound, currency) : "Not available"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-sm text-gray-500 py-4">
          No rates available for {countryName}. Contact sales for a custom quote.
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4">
        All rates are pay-as-you-go with no minimum commitment. Volume discounts available.
      </p>
    </div>
  );
}

function PhoneRentalSection({ phoneNumbers, loading, countryCode }: { phoneNumbers: PhoneNumberInfo[]; loading: boolean; countryCode: string }) {
  if (phoneNumbers.length === 0) return null;
  const currency = countryCode === "IN" ? "₹" : "$";

  return (
    <div>
      <h2 className="font-sora text-xl font-semibold text-black mb-2">Phone number rental</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly rental rates for phone numbers used with SIP trunking.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                Number type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {phoneNumbers.map((pn) => (
              <tr key={pn.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{pn.type}</td>
                <td className="py-3 text-sm font-medium text-black">
                  {loading ? <Shimmer /> : `${currency}${(pn.rentalRate ?? 0).toFixed(2)}/month`}
                </td>
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
  countryCode,
  localMinutes,
  setLocalMinutes,
  tollfreeMinutes,
  setTollfreeMinutes,
  loading,
}: {
  rates: ZentrunkRates | null;
  countryName: string;
  countryCode: string;
  localMinutes: number;
  setLocalMinutes: (v: number) => void;
  tollfreeMinutes: number;
  setTollfreeMinutes: (v: number) => void;
  loading: boolean;
}) {
  const currency = countryCode === "IN" ? "₹" : "$";
  const localRate = rates?.local?.inbound || 0;
  const tollfreeRate = rates?.tollfree?.inbound || 0;
  const localSubtotal = localMinutes * localRate;
  const tollfreeSubtotal = tollfreeMinutes * tollfreeRate;
  const grandTotal = localSubtotal + tollfreeSubtotal;

  const showLocal = localRate > 0;
  const showTollfree = tollfreeRate > 0;

  if (!loading && !showLocal && !showTollfree) {
    return (
      <div>
        <h2 className="font-sora text-xl font-semibold text-black mb-2">Cost calculator</h2>
        <p className="text-sm text-gray-500 py-4">
          Cost calculator is not available for {countryName}. Contact sales for a custom quote.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-sora text-xl font-semibold text-black mb-2">Cost calculator</h2>
      <p className="text-sm text-gray-500 mb-6">
        Estimate your monthly SIP trunking costs for {countryName}.
      </p>

      <div className="space-y-8">
        {/* Local Minutes Slider */}
        {showLocal && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Local inbound minutes</span>
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
                Rate: {currency}{localRate.toFixed(4)}/min
              </span>
              <span className="font-medium text-black">
                {currency}{formatLargeNumber(Math.round(localSubtotal))}
              </span>
            </div>
          </div>
        )}

        {/* Toll-Free Minutes Slider */}
        {showTollfree && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Toll-free inbound minutes</span>
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
                Rate: {currency}{tollfreeRate.toFixed(4)}/min
              </span>
              <span className="font-medium text-black">
                {currency}{formatLargeNumber(Math.round(tollfreeSubtotal))}
              </span>
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-black">Estimated monthly cost</p>
              <p className="text-xs text-gray-500 mt-1">
                Based on {formatLargeNumber(showLocal ? localMinutes : 0)}
                {showLocal && showTollfree ? " local + " : ""}
                {showTollfree ? `${formatLargeNumber(tollfreeMinutes)} toll-free` : ""} minutes
              </p>
            </div>
            <p className="text-2xl font-bold text-black">
              {currency}{formatLargeNumber(Math.round(grandTotal))}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/contact/sales"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors"
            >
              Get volume pricing
            </a>
            <a
              href="https://cx.plivo.com/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign up for free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
