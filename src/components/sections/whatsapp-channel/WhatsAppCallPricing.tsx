"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { CountryListItem, WhatsAppCallRates } from "@/data/pricing-data";
import { WA_CALL_PRIORITY_COUNTRIES } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useWhatsAppCallRates } from "@/hooks/useWhatsAppCallRates";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import type { PhoneNumberInfo } from "@/hooks/useCountryPricing";
import { useExchangeRate } from "@/hooks/useExchangeRate";

type SectionId = "inbound-calls" | "outbound-calls" | "audio-streaming" | "phone-numbers" | "add-ons";

function getSections(hasPhoneNumbers: boolean): { id: SectionId; label: string }[] {
  const base: { id: SectionId; label: string }[] = [
    { id: "inbound-calls", label: "Inbound Calls" },
    { id: "outbound-calls", label: "Outbound Calls" },
    { id: "audio-streaming", label: "Audio Streaming" },
  ];
  if (hasPhoneNumbers) {
    base.push({ id: "phone-numbers", label: "Phone Number Rental" });
  }
  base.push({ id: "add-ons", label: "Add-On Services" });
  return base;
}

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

export default function WhatsAppCallPricing({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry();
  const { countries } = useCountryISOs(WA_CALL_PRIORITY_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("inbound-calls");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Native DOM refs for event delegation
  const countryToggleRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const sectionTabsRef = useRef<HTMLElement>(null);
  const countriesRef = useRef(countries);
  countriesRef.current = countries;

  const { rates, loading: callLoading } = useWhatsAppCallRates(selectedCountry.code);
  const { data: pricingData } = useCountryPricing(selectedCountry.code);
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

  // Pattern A: Country toggle button - native click
  useEffect(() => {
    const el = countryToggleRef.current;
    if (!el) return;
    const handler = () => setIsCountryOpen(prev => !prev);
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // Pattern D: Search input - native input event
  // Re-run when dropdown opens since the input is conditionally rendered
  useEffect(() => {
    if (!isCountryOpen) return;
    const el = searchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => setSearchQuery((e.target as HTMLInputElement).value);
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [isCountryOpen]);

  // Pattern B: Country list items - event delegation
  // Re-run when dropdown opens since the list is conditionally rendered
  useEffect(() => {
    if (!isCountryOpen) return;
    const el = countryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-country-code]");
      if (!item) return;
      const code = item.getAttribute("data-country-code")!;
      const country = countriesRef.current.find(c => c.code === code);
      if (country) {
        setSelectedCountry(country);
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isCountryOpen]);

  // Pattern C: Section tab navigation - event delegation
  useEffect(() => {
    const el = sectionTabsRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-section-id]");
      if (!btn) return;
      const sectionId = btn.getAttribute("data-section-id")!;
      scrollToSection(sectionId as SectionId);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  const sections = getSections(phoneNumbers.length > 0);

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

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              WhatsApp call pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Per-minute rates for WhatsApp inbound and outbound voice calls.
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
                    ref={countryToggleRef}
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
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div ref={countryListRef} className="overflow-y-auto">
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
                <nav ref={sectionTabsRef} className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700 mb-3">Jump to section</p>
                  <ul className="space-y-1">
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
              {/* Inbound Calls */}
              <div id="inbound-calls" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <InboundCallsSection rates={rates} loading={callLoading} />
              </div>

              {/* Outbound Calls */}
              <div id="outbound-calls" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <OutboundCallsSection rates={rates} loading={callLoading} />
              </div>

              {/* Audio Streaming */}
              <div id="audio-streaming" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <AudioStreamingSection />
              </div>

              {/* Phone Number Rental */}
              {phoneNumbers.length > 0 && (
                <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <PhoneRentalSection phoneNumbers={phoneNumbers} loading={callLoading} countryCode={selectedCountry.code} />
                </div>
              )}

              {/* Add-Ons */}
              <div id="add-ons" className="bg-white rounded-xl border border-gray-200 p-6">
                <CallAddOnsSection countryCode={selectedCountry.code} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InboundCallsSection({ rates, loading }: { rates: WhatsAppCallRates | null; loading: boolean }) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Inbound Calls</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute rate for receiving WhatsApp voice calls.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">WhatsApp Inbound Calls</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.inbound || "—")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OutboundCallsSection({ rates, loading }: { rates: WhatsAppCallRates | null; loading: boolean }) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Outbound Calls</h2>
      <p className="text-sm text-gray-500 mb-6">
        Per-minute rate for making WhatsApp voice calls.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">WhatsApp Outbound Calls</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.outbound || "—")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Hardcoded phone rental rates matching live plivo.com (Webflow)
const HARDCODED_PHONE_RENTAL: Record<string, Record<string, string>> = {
  IN: { Local: "₹250.00/month" },
  US: { Local: "$0.50/month", "Toll-Free": "$1.00/month" },
  CA: { Local: "$0.75/month", "Toll-Free": "$1.00/month" },
  AE: { "Toll-Free": "$50.00/month" },
  BR: { Local: "$6.17/month", "Toll-Free": "$30.00/month" },
  AU: { Local: "$1.50/month", "Toll-Free": "$12.00/month", Mobile: "$3.00/month" },
  NZ: { Local: "$2.55/month", "Toll-Free": "$34.00/month" },
  GB: { Local: "$1.40/month", Mobile: "$0.85/month" },
  SG: { Local: "$16.00/month" },
};

function PhoneRentalSection({ phoneNumbers, loading, countryCode }: { phoneNumbers: PhoneNumberInfo[]; loading: boolean; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();
  if (phoneNumbers.length === 0) return null;

  // Use hardcoded rates when available (matches live plivo.com exactly)
  const hardcoded = HARDCODED_PHONE_RENTAL[countryCode];

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly rental rates for WhatsApp-enabled phone numbers.
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
            {phoneNumbers.map((pn) => {
              const hardcodedPrice = hardcoded?.[pn.type];
              const displayPrice = hardcodedPrice
                ? hardcodedPrice
                : convertPriceString(`$${(pn.rentalRate ?? 0).toFixed(2)}/month`, countryCode);
              return (
                <tr key={pn.type}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{pn.type}</td>
                  <td className="py-3 text-sm font-medium text-black">
                    {loading ? <Shimmer /> : displayPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AudioStreamingSection() {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Audio Streaming</h2>
      <p className="text-sm text-gray-500 mb-6">
        Real-time audio streaming for WhatsApp voice calls.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Audio Streaming (per stream)</td>
              <td className="py-3 text-sm font-medium text-black">Free</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CallAddOnsSection({ countryCode }: { countryCode: string }) {
  const { convertPriceString: cp } = useExchangeRate();

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
              <td className="py-3 text-sm font-medium text-black">{cp("$0.0004/min/month", countryCode)} (free for 90 days)</td>
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
