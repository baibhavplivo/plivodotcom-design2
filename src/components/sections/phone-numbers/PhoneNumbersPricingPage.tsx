"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  PHONE_NUMBER_PRIORITY_COUNTRIES,
  PHONE_NUMBER_PRICING,
  buildCountryList,
} from "@/data/pricing-data";
import type { CountryOption, PhoneNumberCountryPricing } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";

type SectionId = "number-rental" | "short-codes";

function getSections(countryCode: string): { id: SectionId; label: string }[] {
  const pricing = PHONE_NUMBER_PRICING[countryCode];
  const sections: { id: SectionId; label: string }[] = [
    { id: "number-rental", label: "Number rental" },
  ];
  const hasShortCodes = pricing?.numbers.some((n) => n.children);
  if (hasShortCodes) {
    sections.push({ id: "short-codes", label: "Short codes" });
  }
  return sections;
}

const countries = buildCountryList(
  Object.keys(PHONE_NUMBER_PRICING),
  PHONE_NUMBER_PRIORITY_COUNTRIES
);

export default function PhoneNumbersPricingPage() {
  const geoCountry = useGeoCountry();
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("number-rental");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const match = countries.find(c => c.code === geoCountry);
    if (match) setSelectedCountry(match);
  }, [geoCountry]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

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

  const sections = getSections(selectedCountry.code);
  const pricing = PHONE_NUMBER_PRICING[selectedCountry.code] || PHONE_NUMBER_PRICING["US"];

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

  // Split numbers into regular and short codes
  const regularNumbers = pricing.numbers.filter((n) => !n.children);
  const shortCodes = pricing.numbers.filter((n) => n.children);

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              Phone number pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Transparent pricing for local, mobile, toll-free, and national numbers across 65+ countries.
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
              {/* Number Rental Rates */}
              <div id="number-rental" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <NumberRentalSection numbers={regularNumbers} />
              </div>

              {/* Short Codes (US only) */}
              {shortCodes.length > 0 && (
                <div id="short-codes" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <ShortCodesSection shortCodes={shortCodes} note={pricing.note} />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NumberRentalSection({
  numbers,
}: {
  numbers: PhoneNumberCountryPricing["numbers"];
}) {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">
        Number rental rates
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly rental rates for phone numbers by type.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">
                Number type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[30%]">
                Price
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black w-[30%]">
                Capabilities
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {numbers.map((number) => (
              <tr key={number.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {number.type}
                </td>
                <td className="py-3 pr-4 text-sm font-medium text-black">
                  {number.price}
                </td>
                <td className="py-3 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1.5">
                    {number.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShortCodesSection({
  shortCodes,
  note,
}: {
  shortCodes: PhoneNumberCountryPricing["numbers"];
  note?: string;
}) {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">
        Short codes
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Dedicated short codes for high-volume messaging.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">
                Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[30%]">
                Price
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black w-[30%]">
                Capabilities
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {shortCodes.map((sc) =>
              sc.children?.map((child) => (
                <tr key={child.type}>
                  <td className="py-3 pr-4 text-sm text-gray-900">
                    {child.type}
                  </td>
                  <td className="py-3 pr-4 text-sm font-medium text-black">
                    {child.price}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1.5">
                      {sc.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {note && (
        <p className="mt-4 text-xs text-gray-500 bg-gray-50 rounded-lg px-4 py-3">
          {note}
        </p>
      )}
    </div>
  );
}

