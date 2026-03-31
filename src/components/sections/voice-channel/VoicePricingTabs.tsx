"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { VOICE_CALCULATOR_DATA } from "@/data/pricing-data";
import type { VoiceRates, CountryListItem, CalculatorEntry } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import type { PhoneNumberInfo, VoiceNetworkRate, AddOnPricing } from "@/hooks/useCountryPricing";

type SectionId =
  | "local-numbers"
  | "tollfree-numbers"
  | "ip-calls"
  | "destination-rates"
  | "phone-numbers"
  | "add-ons"
  | "cost-calculator";

function getSections(hasPhoneNumbers: boolean, hasDestinationRates: boolean): { id: SectionId; label: string }[] {
  const base: { id: SectionId; label: string }[] = [
    { id: "local-numbers", label: "Local Numbers" },
    { id: "tollfree-numbers", label: "Toll-Free Numbers" },
    { id: "ip-calls", label: "IP Calls" },
  ];
  if (hasDestinationRates) {
    base.push({ id: "destination-rates", label: "Destination Rates" });
  }
  if (hasPhoneNumbers) {
    base.push({ id: "phone-numbers", label: "Phone Number Rental" });
  }
  base.push({ id: "add-ons", label: "Add-On Services" });
  base.push({ id: "cost-calculator", label: "Cost Calculator" });
  return base;
}

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

export default function VoicePricingTabs({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry();
  const { countries } = useCountryISOs();
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("local-numbers");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Refs for native event listeners (Astro hydration compatibility)
  const countryToggleBtnRef = useRef<HTMLButtonElement>(null);
  const countrySearchInputRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const sectionNavRef = useRef<HTMLUListElement>(null);

  // Keep filteredCountries in a ref so event delegation can access current value
  const filteredCountriesRef = useRef<CountryListItem[]>(countries);

  const { data: pricingData, loading } = useCountryPricing(selectedCountry.code);
  const rates = pricingData?.voiceRates || null;
  const destinationRates = pricingData?.voiceDestinationRates || [];
  const phoneNumbers = (pricingData?.phoneNumbers || []).filter(
    (pn) => pn.rentalRate != null && pn.rentalRate > 0
  );

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const target = initialCountry || geoCountry;
    if (!target) return;
    const match = countries.find(c => c.code === target);
    if (match) setSelectedCountry(match);
  }, [geoCountry, countries, initialCountry]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [searchQuery, countries]);

  // Keep filteredCountries ref in sync
  filteredCountriesRef.current = filteredCountries;

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

  const sections = getSections(phoneNumbers.length > 0, destinationRates.length > 0);

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

  // Native event listener: Country selector toggle button
  useEffect(() => {
    const el = countryToggleBtnRef.current;
    if (!el) return;
    const handler = () => {
      setIsCountryOpen((prev) => !prev);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // Native event listener: Country search input
  // Re-runs when dropdown opens because the input is conditionally rendered
  useEffect(() => {
    const el = countrySearchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setSearchQuery((e.target as HTMLInputElement).value);
    };
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [isCountryOpen]);

  // Native event listener: Country list item selection (event delegation)
  // Re-runs when dropdown opens because the list is conditionally rendered
  useEffect(() => {
    const el = countryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-country-code]");
      if (!item) return;
      const code = item.getAttribute("data-country-code")!;
      const match = filteredCountriesRef.current.find((c) => c.code === code);
      if (match) {
        setSelectedCountry(match);
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isCountryOpen]);

  // Native event listener: Section navigation (event delegation)
  useEffect(() => {
    const el = sectionNavRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-section-id]");
      if (!item) return;
      const id = item.getAttribute("data-section-id") as SectionId;
      if (id) {
        scrollToSection(id);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              Voice pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Pay-as-you-go voice pricing with premium call quality. Volume discounts as you scale.
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
                    ref={countryToggleBtnRef}
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
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          ref={countrySearchInputRef}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto" ref={countryListRef}>
                        {filteredCountries.map((country, idx) => (
                          <div key={country.code}>
                            {!country.isPriority && idx > 0 && filteredCountries[idx - 1]?.isPriority && (
                              <div className="border-t border-gray-200 my-1" />
                            )}
                            <button
                              data-country-code={country.code}
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
                  <ul className="space-y-1" ref={sectionNavRef}>
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          data-section-id={section.id}
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
              {/* Local Numbers */}
              <div id="local-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <LocalNumbersSection rates={rates} loading={loading} countryCode={selectedCountry.code} />
              </div>

              {/* Toll-Free Numbers */}
              <div id="tollfree-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <TollFreeSection rates={rates} loading={loading} countryCode={selectedCountry.code} />
              </div>

              {/* IP Calls */}
              <div id="ip-calls" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <IPCallsSection rates={rates} loading={loading} countryCode={selectedCountry.code} />
              </div>

              {/* Destination Rates */}
              {destinationRates.length > 0 && (
                <div id="destination-rates" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <DestinationRatesSection rates={destinationRates} loading={loading} countryCode={selectedCountry.code} />
                </div>
              )}

              {/* Phone Number Rental */}
              {phoneNumbers.length > 0 && (
                <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <PhoneRentalSection phoneNumbers={phoneNumbers} loading={loading} countryCode={selectedCountry.code} />
                </div>
              )}

              {/* Add-Ons */}
              <div id="add-ons" className="bg-white rounded-xl border border-gray-200 p-6">
                <AddOnsSection countryCode={selectedCountry.code} addOnPricing={pricingData?.addOnPricing || null} loading={loading} />
              </div>

              {/* Cost Calculator */}
              <div id="cost-calculator" className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
                <VoiceCostCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LocalNumbersSection({ rates, loading, countryCode }: { rates: VoiceRates | null; loading: boolean; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Local Numbers</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute rates for inbound and outbound calls via local numbers.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Direction</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Outbound (To make calls)</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.localOutbound ? convertPriceString(rates.localOutbound, countryCode) : "\u2014")}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Inbound (To receive calls)</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.localInbound ? convertPriceString(rates.localInbound, countryCode) : "\u2014")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TollFreeSection({ rates, loading, countryCode }: { rates: VoiceRates | null; loading: boolean; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();
  const rawOutbound = rates?.tollfreeOutbound || "\u2014";
  const rawInbound = rates?.tollfreeInbound || "\u2014";
  const outbound = rawOutbound !== "\u2014" ? convertPriceString(rawOutbound, countryCode) : rawOutbound;
  const inbound = rawInbound !== "\u2014" ? convertPriceString(rawInbound, countryCode) : rawInbound;
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Toll-Free Numbers</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute rates for inbound and outbound calls via toll-free numbers.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Direction</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Outbound (To make calls)</td>
              <td className={cn("py-3 text-sm font-medium", rawOutbound === "Not Supported" ? "text-gray-400" : "text-black")}>
                {loading ? <Shimmer /> : outbound}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Inbound (To receive calls)</td>
              <td className={cn("py-3 text-sm font-medium", rawInbound === "Not Supported" ? "text-gray-400" : "text-black")}>
                {loading ? <Shimmer /> : inbound}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IPCallsSection({ rates, loading, countryCode }: { rates: VoiceRates | null; loading: boolean; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">IP / Browser SDK Calls</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute rates for calls made or received via SIP or the Browser SDK.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Direction</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Outbound</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.ipOutbound ? convertPriceString(rates.ipOutbound, countryCode) : "\u2014")}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Inbound</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.ipInbound ? convertPriceString(rates.ipInbound, countryCode) : "\u2014")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PhoneRentalSection({ phoneNumbers, loading, countryCode }: { phoneNumbers: PhoneNumberInfo[]; loading: boolean; countryCode: string }) {
  if (phoneNumbers.length === 0) return null;
  const { convertPriceString } = useExchangeRate();
  const currency = "$";

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly rental rates for phone numbers.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Number Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {phoneNumbers.map((pn) => (
              <tr key={pn.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{pn.type}</td>
                <td className="py-3 text-sm font-medium text-black">
                  {loading ? <Shimmer /> : convertPriceString(`$${(pn.rentalRate ?? 0).toFixed(2)}/month`, countryCode)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DestinationRatesSection({ rates, loading, countryCode }: { rates: VoiceNetworkRate[]; loading: boolean; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Detailed Network Pricing</h2>
      <p className="text-sm text-gray-500 mb-6">
        Pricing per network group – Outbound calls
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Network Group</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Pricing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td className="py-3 pr-4"><Shimmer /></td>
                <td className="py-3"><Shimmer /></td>
              </tr>
            ) : (
              rates.map((entry, idx) => (
                <tr key={`${entry.networkGroup}-${idx}`}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{entry.networkGroup}</td>
                  <td className="py-3 text-sm font-medium text-black">{convertPriceString(entry.rate, countryCode)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddOnsSection({ countryCode, addOnPricing, loading }: { countryCode: string; addOnPricing: AddOnPricing | null; loading: boolean }) {
  const audioRate = addOnPricing?.audioStreamingRate;
  const { convertPriceString: cp } = useExchangeRate();
  const isIndia = countryCode === "IN";

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-6">Add-On Services</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Service</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Audio Streaming</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (audioRate || "Free")}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Answering Machine Detection</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Call Insights (Basic)</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Call Insights (Premium)</td>
              <td className="py-3 text-sm font-medium text-black">{cp("$0.0025/min", countryCode)}</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Call Recording</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Recording Storage</td>
              <td className="py-3 text-sm font-medium text-black">{cp("$0.0004/min", countryCode)}/month (free for 90 days)</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Automatic Speech Recognition</td>
              <td className="py-3 text-sm font-medium text-black">{cp("$0.02/15 seconds", countryCode)}</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Call Transcription</td>
              <td className="py-3 text-sm font-medium text-black">{cp("$0.0095/min", countryCode)}</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Conference Calls</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Multilingual Text to Speech</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">CNAM Lookup</td>
              <td className="py-3 text-sm font-medium text-black">{cp("$0.005/lookup", countryCode)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const VOICE_TOP_CODES = new Set(["US", "IN", "CA", "GB", "AU"]);

function VoiceCostCalculator() {
  const { country: geoCountry } = useGeoCountry();
  const [selectedCountry, setSelectedCountry] = useState<CalculatorEntry>(VOICE_CALCULATOR_DATA[0]);
  const [volume, setVolume] = useState(100000);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Refs for native event listeners (Astro hydration compatibility)
  const calcCountryToggleRef = useRef<HTMLButtonElement>(null);
  const calcCountryListRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const match = VOICE_CALCULATOR_DATA.find(c => c.code === geoCountry);
    if (match) setSelectedCountry(match);
  }, [geoCountry]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Native event listener: Calculator country dropdown toggle
  useEffect(() => {
    const el = calcCountryToggleRef.current;
    if (!el) return;
    const handler = () => {
      setIsOpen((prev) => !prev);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // Native event listener: Calculator country list selection (event delegation)
  // Re-runs when dropdown opens because the list is conditionally rendered
  useEffect(() => {
    const el = calcCountryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-calc-country]");
      if (!item) return;
      const code = item.getAttribute("data-calc-country")!;
      const match = VOICE_CALCULATOR_DATA.find((c) => c.code === code);
      if (match) {
        setSelectedCountry(match);
        setIsOpen(false);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isOpen]);

  // Native event listener: Volume slider
  useEffect(() => {
    const el = volumeSliderRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setVolume(Number((e.target as HTMLInputElement).value));
    };
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, []);

  const { convertToINR } = useExchangeRate();
  const isIndia = selectedCountry.code === "IN";
  const currency = isIndia ? "\u20b9" : "$";
  const rawPlivoCost = (selectedCountry.plivo * volume) / 100000;
  const rawOthersCost = (selectedCountry.others * volume) / 100000;
  const plivoCost = isIndia ? convertToINR(rawPlivoCost) : rawPlivoCost;
  const othersCost = isIndia ? convertToINR(rawOthersCost) : rawOthersCost;
  const savings = othersCost - plivoCost;
  const savingsPercent = othersCost > 0 ? Math.round((savings / othersCost) * 100) : 0;
  const maxCost = Math.max(plivoCost, othersCost);

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Cost calculator</h2>
      <p className="text-sm text-gray-500 mb-6">
        Compare voice call costs between Plivo and other providers.
      </p>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 mb-8">
        {/* Country selector - matches main sidebar dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <button
            ref={calcCountryToggleRef}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-900 flex-1 text-left">{selectedCountry.country}</span>
            <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
              <div className="overflow-y-auto" ref={calcCountryListRef}>
                {VOICE_CALCULATOR_DATA.map((entry, idx) => (
                  <div key={entry.code}>
                    {!VOICE_TOP_CODES.has(entry.code) && idx > 0 && VOICE_TOP_CODES.has(VOICE_CALCULATOR_DATA[idx - 1]?.code) && (
                      <div className="border-t border-gray-200 my-1" />
                    )}
                    <button
                      data-calc-country={entry.code}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                        selectedCountry.code === entry.code && "bg-[#323dfe]/5"
                      )}
                    >
                      <span className="text-xl">{entry.flag}</span>
                      <span className="text-sm text-gray-900">{entry.country}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Volume slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly call volume: <span className="font-semibold text-black">{volume.toLocaleString()} minutes</span>
          </label>
          <input
            type="range"
            min={10000}
            max={1000000}
            step={10000}
            value={volume}
            ref={volumeSliderRef}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#323dfe]"
            style={{
              background: `linear-gradient(to right, #323dfe ${((volume - 10000) / 990000) * 100}%, #e5e7eb ${((volume - 10000) / 990000) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10K</span>
            <span>1M</span>
          </div>
        </div>
      </div>

      {/* Comparison bars */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-black">Plivo</span>
            <span className="text-sm font-semibold text-black">{currency}{plivoCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          </div>
          <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
            <div
              className="h-full bg-[#323dfe] rounded-md transition-all duration-500"
              style={{ width: maxCost > 0 ? `${(plivoCost / maxCost) * 100}%` : '0%' }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-600">Others</span>
            <span className="text-sm font-semibold text-gray-600">{currency}{othersCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          </div>
          <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-md transition-all duration-500"
              style={{ width: maxCost > 0 ? `${(othersCost / maxCost) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Savings callout */}
      {savings > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            Save <span className="font-semibold">{currency}{savings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> per month ({savingsPercent}% less) with Plivo
          </p>
        </div>
      )}
    </div>
  );
}
