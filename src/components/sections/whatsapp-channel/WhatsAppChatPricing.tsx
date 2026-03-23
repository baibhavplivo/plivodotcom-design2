"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { CountryListItem, WhatsAppChatRates } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useWhatsAppChatRates } from "@/hooks/useWhatsAppChatRates";

type SectionId = "messaging-rates" | "platform-fee";

const sections: { id: SectionId; label: string }[] = [
  { id: "messaging-rates", label: "Messaging Rates" },
  { id: "platform-fee", label: "Platform Fee" },
];

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

function formatRate(value: number, currency: string, decimals: number = 4): string {
  if (value === 0) return `${currency}0/message`;
  return `${currency}${value.toFixed(decimals)}/message`;
}

export default function WhatsAppChatPricing() {
  const { country: geoCountry } = useGeoCountry();
  const { countries } = useCountryISOs();
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("messaging-rates");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { rates, loading } = useWhatsAppChatRates(selectedCountry.code);

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const match = countries.find(c => c.code === geoCountry);
    if (match) setSelectedCountry(match);
  }, [geoCountry, countries]);

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

  const isIndia = selectedCountry.code === "IN";
  const decimals = 4;

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
  }, []);

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
              WhatsApp chat pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Conversation-based pricing with Meta fees and Plivo platform fees - all in one simple invoice.
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
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
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
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto">
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
              {/* Messaging Rates */}
              <div id="messaging-rates" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <MessagingRatesSection rates={rates} decimals={decimals} loading={loading} />
              </div>

              {/* Platform Fee */}
              <div id="platform-fee" className="bg-white rounded-xl border border-gray-200 p-6">
                <PlatformFeeSection isIndia={isIndia} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MessagingRatesSection({
  rates,
  decimals,
  loading,
}: {
  rates: WhatsAppChatRates | null;
  decimals: number;
  loading: boolean;
}) {
  const showAuthIntl = rates ? rates.authenticationIntl > 0 : false;

  const rateCell = (value: number | undefined, currency: string) => {
    if (loading) return <Shimmer />;
    if (value === undefined) return "—";
    return formatRate(value, currency, decimals);
  };

  const currency = rates?.currency || "$";

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        WhatsApp Messaging Rates
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Pricing is per conversation, which is defined as a 24-hour message thread. Rates include Meta's fees and Plivo's platform fee.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">
                Message Category
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Rate per Conversation
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Marketing</td>
              <td className="py-3 text-sm font-medium text-black">
                {rateCell(rates?.marketing, currency)}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Utility</td>
              <td className="py-3 text-sm font-medium text-black">
                {rateCell(rates?.utility, currency)}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Authentication</td>
              <td className="py-3 text-sm font-medium text-black">
                {rateCell(rates?.authentication, currency)}
              </td>
            </tr>
            {(showAuthIntl || loading) && (
              <tr>
                <td className="py-3 pr-4 text-sm text-gray-900">Authentication - International</td>
                <td className="py-3 text-sm font-medium text-black">
                  {rateCell(rates?.authenticationIntl, currency)}
                </td>
              </tr>
            )}
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Service</td>
              <td className="py-3 text-sm font-medium text-black">
                {loading ? <Shimmer /> : (rates?.service === 0 ? "Free" : rateCell(rates?.service, currency))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlatformFeeSection({ isIndia }: { isIndia: boolean }) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Platform Fee</h2>
      <p className="text-sm text-gray-500 mb-6">
        Plivo charges a platform fee per conversation in addition to Meta's conversation-based fees.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Fee Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Platform fee per conversation</td>
              <td className="py-3 text-sm font-medium text-black">
                {isIndia ? "₹0.066/conversation" : "$0.00080/conversation"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
