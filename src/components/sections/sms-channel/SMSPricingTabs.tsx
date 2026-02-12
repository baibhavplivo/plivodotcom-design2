"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  SMS_RATES,
  SMS_PRIORITY_COUNTRIES,
  SMS_CALCULATOR_DATA,
  TOP_COUNTRY_CODES,
  buildCountryList,
} from "@/data/pricing-data";
import type { CountryOption, SMSCountryRates, CalculatorEntry } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";

type SectionId = "sms" | "mms" | "phone-numbers" | "carrier-fees" | "cost-calculator";

function getSections(rates: SMSCountryRates): { id: SectionId; label: string }[] {
  const result: { id: SectionId; label: string }[] = [
    { id: "sms", label: "SMS" },
  ];
  if (rates.mms) {
    result.push({ id: "mms", label: "MMS" });
  }
  if (rates.phoneNumbers) {
    result.push({ id: "phone-numbers", label: "Phone Number Rental" });
  }
  if (rates.hasCarrierFees) {
    result.push({ id: "carrier-fees", label: "Carrier Surcharge Fees" });
  }
  result.push({ id: "cost-calculator", label: "Cost Calculator" });
  return result;
}

const countries = buildCountryList(Object.keys(SMS_RATES), SMS_PRIORITY_COUNTRIES);

export default function SMSPricingTabs() {
  const geoCountry = useGeoCountry();
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const match = countries.find(c => c.code === geoCountry);
    if (match) setSelectedCountry(match);
  }, [geoCountry]);
  const [activeSection, setActiveSection] = useState<SectionId>("sms");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
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

  const rates: SMSCountryRates = SMS_RATES[selectedCountry.code] || SMS_RATES["US"];
  const sections = getSections(rates);

  useEffect(() => {
    const handleScrollAndResize = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
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
            position: 'fixed',
            top: `${topThreshold}px`,
            left: `${wrapperRect.left}px`,
            width: '256px',
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
              SMS Pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Competitive pay-as-you-go SMS pricing. Volume discounts as you scale.
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
                  <button
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left">{selectedCountry.name}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isCountryOpen && "rotate-180")} />
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
              {/* SMS Section */}
              <div id="sms" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <SMSSection rates={rates} hasCarrierFees={!!rates.hasCarrierFees} />
              </div>

              {/* MMS Section - conditional */}
              {rates.mms && (
                <div id="mms" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <MMSSection mmsRates={rates.mms} hasCarrierFees={!!rates.hasCarrierFees} />
                </div>
              )}

              {/* Phone Numbers Section - conditional */}
              {rates.phoneNumbers && (
                <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <PhoneNumbersSection phoneNumbers={rates.phoneNumbers} />
                </div>
              )}

              {/* Carrier Fees Section - US only */}
              {rates.hasCarrierFees && (
                <div id="carrier-fees" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <CarrierFeesSection />
                </div>
              )}

              {/* Cost Calculator */}
              <div id="cost-calculator" className="bg-white rounded-xl border border-gray-200 p-6">
                <SMSCostCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SMSSection({ rates, hasCarrierFees }: { rates: SMSCountryRates; hasCarrierFees: boolean }) {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">SMS Text Messages</h2>
      {hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          *Additional carrier surcharge fees apply to all inbound and outbound SMS usage rates.{" "}
          <button
            onClick={() => {
              const element = document.getElementById("carrier-fees");
              if (element) {
                const offset = 120;
                const top = element.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="text-[#323dfe] hover:underline"
          >
            View carrier surcharge fee
          </button>.
        </p>
      )}
      {!hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          Per-message rates for sending and receiving SMS.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">Route Type</th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">To send SMS (Outbound)</th>
              <th className="py-3 text-left text-sm font-semibold text-black">To receive SMS (Inbound)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rates.sms.map((row) => (
              <tr key={row.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                <td className="py-3 pr-4 text-sm font-medium text-black">{row.outbound}</td>
                <td className="py-3 text-sm font-medium text-black">{row.inbound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MMSSection({ mmsRates, hasCarrierFees }: { mmsRates: SMSCountryRates["mms"]; hasCarrierFees: boolean }) {
  if (!mmsRates) return null;

  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">MMS Multimedia Messages</h2>
      {hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          *Additional carrier surcharge fees apply to all inbound and outbound MMS usage rates.{" "}
          <button
            onClick={() => {
              const element = document.getElementById("carrier-fees");
              if (element) {
                const offset = 120;
                const top = element.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="text-[#323dfe] hover:underline"
          >
            View carrier surcharge fee
          </button>.
        </p>
      )}
      {!hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          Per-message rates for sending and receiving MMS.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">Route Type</th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">To send MMS (Outbound)</th>
              <th className="py-3 text-left text-sm font-semibold text-black">To receive MMS (Inbound)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mmsRates.map((row) => (
              <tr key={row.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                <td className="py-3 pr-4 text-sm font-medium text-black">{row.outbound}</td>
                <td className="py-3 text-sm font-medium text-black">{row.inbound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PhoneNumbersSection({ phoneNumbers }: { phoneNumbers: NonNullable<SMSCountryRates["phoneNumbers"]> }) {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
      {phoneNumbers.note && (
        <p className="text-sm text-gray-500 mb-6">
          **{phoneNumbers.note}
        </p>
      )}
      {!phoneNumbers.note && (
        <p className="text-sm text-gray-500 mb-6">
          Monthly rental rates for SMS-enabled phone numbers.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[65%]">Number Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {phoneNumbers.types.map((row) => (
              row.children ? (
                <tr key={row.type}>
                  <td colSpan={2} className="py-0">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-3 pr-4 text-sm text-gray-900 font-medium" colSpan={2}>
                            {row.type} {row.note && <span className="text-gray-500 font-normal">Plus one-time setup fee**</span>}
                          </td>
                        </tr>
                        {row.children.map((child) => (
                          <tr key={child.type} className="border-t border-gray-100">
                            <td className="py-3 pr-4 text-sm text-gray-900 pl-4 w-[65%]">{child.type}</td>
                            <td className="py-3 text-sm font-medium text-black">{child.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ) : (
                <tr key={row.type}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                  <td className="py-3 text-sm font-medium text-black">{row.price}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SMSCostCalculator() {
  const geoCountry = useGeoCountry();
  const [selectedCountry, setSelectedCountry] = useState<CalculatorEntry>(SMS_CALCULATOR_DATA[0]);
  const [volume, setVolume] = useState(100000);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const match = SMS_CALCULATOR_DATA.find(c => c.code === geoCountry);
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

  const plivoCost = (selectedCountry.plivo * volume) / 100000;
  const othersCost = (selectedCountry.others * volume) / 100000;
  const savings = othersCost - plivoCost;
  const savingsPercent = othersCost > 0 ? Math.round((savings / othersCost) * 100) : 0;
  const maxCost = Math.max(plivoCost, othersCost);

  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">Cost calculator</h2>
      <p className="text-sm text-gray-500 mb-6">
        Compare SMS costs between Plivo and other providers.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        {/* Country selector */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-900 flex-1 text-left">{selectedCountry.country}</span>
            <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {SMS_CALCULATOR_DATA.map((entry, idx) => (
                <div key={entry.code}>
                  {!TOP_COUNTRY_CODES.has(entry.code) && idx > 0 && TOP_COUNTRY_CODES.has(SMS_CALCULATOR_DATA[idx - 1]?.code) && (
                    <div className="border-t border-gray-200 my-1" />
                  )}
                  <button
                    onClick={() => { setSelectedCountry(entry); setIsOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left",
                      selectedCountry.code === entry.code && "bg-[#323dfe]/5"
                    )}
                  >
                    <span className="text-lg">{entry.flag}</span>
                    <span className="text-sm text-gray-900">{entry.country}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volume slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly SMS volume: <span className="font-semibold text-black">{volume.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min={10000}
            max={1000000}
            step={10000}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#323dfe]"
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
            <span className="text-sm font-semibold text-black">${plivoCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
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
            <span className="text-sm font-semibold text-gray-600">${othersCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
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
            Save <span className="font-semibold">${savings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> per month ({savingsPercent}% less) with Plivo
          </p>
        </div>
      )}
      {savings <= 0 && plivoCost > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Plivo offers competitive pricing with built-in fraud protection and no platform fees.
          </p>
        </div>
      )}
    </div>
  );
}

function CarrierFeesSection() {
  return (
    <div className="space-y-10">
      <h2 className="font-inter text-xl font-semibold text-black">Additional Carrier Surcharge Fees</h2>

      {/* SMS Carrier Surcharge Fee */}
      <div>
        <h3 className="font-inter text-lg font-medium text-black mb-4">SMS Carrier Surcharge Fee</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-semibold text-black" rowSpan={2}>Carrier</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Long Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Short Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Toll-Free</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-900">AT&T</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0030/sms</td>
                <td className="py-3 px-2 text-center">$0.0030/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0030/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0030/sms</td>
                <td className="py-3 px-2 text-center">$0.0030/sms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">Verizon</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0040/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0040/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0040/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">US Cellular & Other Networks</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0050/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MMS Carrier Surcharge Fee */}
      <div>
        <h3 className="font-inter text-lg font-medium text-black mb-4">MMS Carrier Surcharge Fee</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-semibold text-black" rowSpan={2}>Carrier</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Long Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Short Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Toll-Free</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive MMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-900">AT&T</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0075/mms</td>
                <td className="py-3 px-2 text-center">$0.0075/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0075/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0075/mms</td>
                <td className="py-3 px-2 text-center">$0.0075/mms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">Verizon</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0065/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0065/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0065/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">US Cellular & Other Networks</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
