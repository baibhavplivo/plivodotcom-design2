"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  SMS_RATES,
  SMS_CALCULATOR_DATA,
  TOP_COUNTRY_CODES,
} from "@/data/pricing-data";
import type { CountryListItem, SMSCountryRates, CalculatorEntry } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import type { SMSRateRow, PhoneNumberInfo, SMSNetworkRate } from "@/hooks/useCountryPricing";

type SectionId = "sms" | "rcs" | "mms" | "phone-numbers" | "carrier-fees" | "add-on-services" | "cost-calculator";

function getSections(opts: {
  hasRCS: boolean;
  hasMMS: boolean;
  hasPhoneNumbers: boolean;
  hasCarrierFees: boolean;
}): { id: SectionId; label: string }[] {
  const result: { id: SectionId; label: string }[] = [
    { id: "sms", label: "SMS" },
  ];
  if (opts.hasRCS) result.push({ id: "rcs", label: "RCS" });
  if (opts.hasMMS) result.push({ id: "mms", label: "MMS" });
  if (opts.hasPhoneNumbers) result.push({ id: "phone-numbers", label: "Phone Number Rental" });
  if (opts.hasCarrierFees) result.push({ id: "carrier-fees", label: "Carrier Surcharge Fees" });
  result.push({ id: "add-on-services", label: "Add-on Services" });
  result.push({ id: "cost-calculator", label: "Cost Calculator" });
  return result;
}

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

/** Helper: scroll to a section by id with offset */
function scrollToCarrierFees() {
  const element = document.getElementById("carrier-fees");
  if (element) {
    const offset = 120;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function SMSPricingTabs({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry();
  const { countries } = useCountryISOs();
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: pricingData, loading } = useCountryPricing(selectedCountry.code);
  const liveSmsRates = pricingData?.smsRates || [];
  const smsNetworkRates = pricingData?.smsNetworkRates || [];
  const phoneNumbers = (pricingData?.phoneNumbers || []).filter(
    (pn) => pn.rentalRate != null && pn.rentalRate > 0
  );

  // Hardcoded enrichment (MMS, carrier fees) from SMS_RATES
  const hardcodedRates: SMSCountryRates | null = SMS_RATES[selectedCountry.code] || null;

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const target = initialCountry || geoCountry;
    if (!target) return;
    const match = countries.find(c => c.code === target);
    if (match) setSelectedCountry(match);
  }, [geoCountry, countries, initialCountry]);
  const [activeSection, setActiveSection] = useState<SectionId>("sms");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Refs for native event listeners
  const countryToggleBtnRef = useRef<HTMLButtonElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const sectionNavRef = useRef<HTMLUListElement>(null);

  // Refs to track latest values for event delegation closures
  const filteredCountriesRef = useRef<CountryListItem[]>([]);
  const sectionsRef = useRef<{ id: SectionId; label: string }[]>([]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [searchQuery, countries]);

  // Keep ref in sync
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

  const isUS = selectedCountry.code === "US";
  const sections = getSections({
    hasRCS: isUS,
    hasMMS: !!hardcodedRates?.mms,
    hasPhoneNumbers: phoneNumbers.length > 0 || !!hardcodedRates?.phoneNumbers,
    hasCarrierFees: !!hardcodedRates?.hasCarrierFees,
  });

  // Keep ref in sync
  sectionsRef.current = sections;

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

  const scrollToSection = useCallback((id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Native event listener: Country selector toggle button
  useEffect(() => {
    const el = countryToggleBtnRef.current;
    if (!el) return;
    const handler = () => setIsCountryOpen((prev) => !prev);
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // Native event listener: Country search input
  useEffect(() => {
    const el = countrySearchRef.current;
    if (!el) return;
    const handler = (e: Event) => setSearchQuery((e.target as HTMLInputElement).value);
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [isCountryOpen]); // re-attach when dropdown opens (input mounts)

  // Native event listener: Country list items (event delegation)
  useEffect(() => {
    const el = countryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-country-code]");
      if (!item) return;
      const code = item.getAttribute("data-country-code")!;
      const country = filteredCountriesRef.current.find(c => c.code === code);
      if (country) {
        setSelectedCountry(country);
        setIsCountryOpen(false);
        setSearchQuery("");
        // Sync URL with country selection (matches live plivo.com behavior)
        history.replaceState({}, "", `/sms/pricing/${code.toLowerCase()}/`);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isCountryOpen]); // re-attach when dropdown opens (list mounts)

  // Native event listener: Section navigation tabs (event delegation)
  useEffect(() => {
    const el = sectionNavRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-section-id]");
      if (!item) return;
      const id = item.getAttribute("data-section-id") as SectionId;
      scrollToSection(id);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [scrollToSection]);

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              SMS/RCS Pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Competitive pay-as-you-go SMS and RCS pricing. Volume discounts as you scale.
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
                    ref={countryToggleBtnRef}
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
                          ref={countrySearchRef}
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
              {/* SMS Section */}
              <div id="sms" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <SMSSection smsRates={liveSmsRates.length > 0 ? liveSmsRates : (hardcodedRates?.sms || [])} smsNetworkRates={smsNetworkRates} hasCarrierFees={!!hardcodedRates?.hasCarrierFees} loading={loading} countryCode={selectedCountry.code} />
              </div>

              {/* RCS Section - US only */}
              {isUS && (
                <div id="rcs" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <RCSSection hasCarrierFees={!!hardcodedRates?.hasCarrierFees} />
                </div>
              )}

              {/* MMS Section - conditional (hardcoded, US/CA only) */}
              {hardcodedRates?.mms && (
                <div id="mms" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <MMSSection mmsRates={hardcodedRates.mms} hasCarrierFees={!!hardcodedRates.hasCarrierFees} />
                </div>
              )}

              {/* Phone Numbers Section */}
              {(phoneNumbers.length > 0 || hardcodedRates?.phoneNumbers) && (
                <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  {phoneNumbers.length > 0 ? (
                    <LivePhoneNumbersSection phoneNumbers={phoneNumbers} loading={loading} countryCode={selectedCountry.code} />
                  ) : hardcodedRates?.phoneNumbers ? (
                    <PhoneNumbersSection phoneNumbers={hardcodedRates.phoneNumbers} countryCode={selectedCountry.code} />
                  ) : null}
                </div>
              )}

              {/* Carrier Fees Section - US/CA */}
              {hardcodedRates?.hasCarrierFees && (
                <div id="carrier-fees" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <CarrierFeesSection countryCode={selectedCountry.code} />
                </div>
              )}

              {/* Add-on Services */}
              <div id="add-on-services" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <AddOnServicesSection />
              </div>

              {/* Cost Calculator */}
              <div id="cost-calculator" className="bg-white rounded-xl border border-gray-200 p-6">
                <SMSCostCalculator countryCode={selectedCountry.code} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SMSSection({ smsRates, smsNetworkRates, hasCarrierFees, loading, countryCode }: { smsRates: SMSRateRow[]; smsNetworkRates: SMSNetworkRate[]; hasCarrierFees: boolean; loading: boolean; countryCode: string }) {
  const [showNetworkRates, setShowNetworkRates] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const carrierFeeBtnRef = useRef<HTMLButtonElement>(null);
  const { convertPriceString } = useExchangeRate();

  // Use native event listener for Astro hydration compatibility
  useEffect(() => {
    const btn = toggleRef.current;
    if (!btn) return;
    const handler = () => setShowNetworkRates((prev) => !prev);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  // Native event listener: scroll to carrier fees
  useEffect(() => {
    const btn = carrierFeeBtnRef.current;
    if (!btn) return;
    const handler = () => scrollToCarrierFees();
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  // Check if all network rates are the same
  const allSameRate = smsNetworkRates.length > 1 &&
    smsNetworkRates.every((r) => r.rate === smsNetworkRates[0].rate);

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">SMS Text Messages</h2>
      {hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          *Additional carrier surcharge fees apply to all inbound and outbound SMS usage rates.{" "}
          <button
            ref={carrierFeeBtnRef}
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
              <th className="py-3 pr-3 sm:pr-4 text-left text-xs sm:text-sm font-semibold text-black w-[40%]">Route Type</th>
              <th className="py-3 pr-3 sm:pr-4 text-left text-xs sm:text-sm font-semibold text-black"><span className="sm:hidden">Outbound</span><span className="hidden sm:inline">To send SMS (Outbound)</span></th>
              <th className="py-3 text-left text-xs sm:text-sm font-semibold text-black"><span className="sm:hidden">Inbound</span><span className="hidden sm:inline">To receive SMS (Inbound)</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              ["Longcode", "Shortcode", "Toll-Free"].map((type) => (
                <tr key={type}>
                  <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm text-gray-900">{type}</td>
                  <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm font-medium text-black"><Shimmer /></td>
                  <td className="py-3 text-xs sm:text-sm font-medium text-black"><Shimmer /></td>
                </tr>
              ))
            ) : smsRates.length > 0 ? (
              smsRates.map((row) => (
                <tr key={row.type}>
                  <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm text-gray-900">{row.type}</td>
                  <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm font-medium text-black">{convertPriceString(row.outbound, countryCode)}</td>
                  <td className="py-3 text-xs sm:text-sm font-medium text-black">{convertPriceString(row.inbound, countryCode)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-sm text-gray-500 text-center">
                  SMS rates not available for this country. Contact sales for details.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Network-Based Pricing */}
      {!loading && smsNetworkRates.length > 1 && !allSameRate && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <button
            ref={toggleRef}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:underline"
          >
            {showNetworkRates ? "Hide" : "View"} network-based pricing
            <ChevronDown className={cn("h-4 w-4 transition-transform", showNetworkRates && "rotate-180")} />
          </button>

          {showNetworkRates && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 text-left text-xs sm:text-sm font-semibold text-black">Network</th>
                    <th className="py-2 text-left text-xs sm:text-sm font-semibold text-black">Outbound Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {smsNetworkRates.map((nr) => (
                    <tr key={nr.network}>
                      <td className="py-2 pr-4 text-xs sm:text-sm text-gray-900">{nr.network}</td>
                      <td className="py-2 text-xs sm:text-sm font-medium text-black">{convertPriceString(nr.rate, countryCode)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MMSSection({ mmsRates, hasCarrierFees }: { mmsRates: SMSCountryRates["mms"]; hasCarrierFees: boolean }) {
  const carrierFeeBtnRef = useRef<HTMLButtonElement>(null);

  // Native event listener: scroll to carrier fees
  useEffect(() => {
    const btn = carrierFeeBtnRef.current;
    if (!btn) return;
    const handler = () => scrollToCarrierFees();
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  if (!mmsRates) return null;

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">MMS Multimedia Messages</h2>
      {hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          *Additional carrier surcharge fees apply to all inbound and outbound MMS usage rates.{" "}
          <button
            ref={carrierFeeBtnRef}
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
              <th className="py-3 pr-3 sm:pr-4 text-left text-xs sm:text-sm font-semibold text-black w-[40%]">Route Type</th>
              <th className="py-3 pr-3 sm:pr-4 text-left text-xs sm:text-sm font-semibold text-black"><span className="sm:hidden">Outbound</span><span className="hidden sm:inline">To send MMS (Outbound)</span></th>
              <th className="py-3 text-left text-xs sm:text-sm font-semibold text-black"><span className="sm:hidden">Inbound</span><span className="hidden sm:inline">To receive MMS (Inbound)</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mmsRates.map((row) => (
              <tr key={row.type}>
                <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm text-gray-900">{row.type}</td>
                <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm font-medium text-black">{row.outbound}</td>
                <td className="py-3 text-xs sm:text-sm font-medium text-black">{row.inbound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RCSSection({ hasCarrierFees }: { hasCarrierFees: boolean }) {
  const carrierFeeBtnRef = useRef<HTMLButtonElement>(null);

  // Native event listener: scroll to carrier fees
  useEffect(() => {
    const btn = carrierFeeBtnRef.current;
    if (!btn) return;
    const handler = () => scrollToCarrierFees();
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">RCS Messages</h2>
      {hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          RCS Rich text messages are charged per segment and RCS Rich Media is charged per message. *Additional carrier surcharge fees apply.{" "}
          <button
            ref={carrierFeeBtnRef}
            className="text-[#323dfe] hover:underline"
          >
            View carrier surcharge fee
          </button>.
        </p>
      )}
      {!hasCarrierFees && (
        <p className="text-sm text-gray-500 mb-6">
          RCS Rich text messages are charged per segment and RCS Rich Media is charged per message.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-3 sm:pr-4 text-left text-xs sm:text-sm font-semibold text-black" rowSpan={2}>Sender type</th>
              <th className="py-2 px-2 text-center text-xs sm:text-sm font-semibold text-black border-l border-gray-200" colSpan={2}>RCS Rich</th>
              <th className="py-2 px-2 text-center text-xs sm:text-sm font-semibold text-black border-l border-gray-200" colSpan={2}>RCS Rich Media</th>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">Outbound</th>
              <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">Inbound</th>
              <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">Outbound</th>
              <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">Inbound</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-3 sm:pr-4 text-xs sm:text-sm text-gray-900">All sender types</td>
              <td className="py-3 px-2 text-center text-xs sm:text-sm font-medium text-black border-l border-gray-100">$0.00750</td>
              <td className="py-3 px-2 text-center text-xs sm:text-sm font-medium text-black">$0.00750</td>
              <td className="py-3 px-2 text-center text-xs sm:text-sm font-medium text-black border-l border-gray-100">$0.01600</td>
              <td className="py-3 px-2 text-center text-xs sm:text-sm font-medium text-black">$0.01440</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LivePhoneNumbersSection({ phoneNumbers, loading, countryCode }: { phoneNumbers: PhoneNumberInfo[]; loading: boolean; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();
  const currency = "$";
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly rental rates for SMS-enabled phone numbers.
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

function PhoneNumbersSection({ phoneNumbers, countryCode }: { phoneNumbers: NonNullable<SMSCountryRates["phoneNumbers"]>; countryCode: string }) {
  const { convertPriceString } = useExchangeRate();
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
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
                            <td className="py-3 text-sm font-medium text-black">{convertPriceString(child.price, countryCode)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ) : (
                <tr key={row.type}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                  <td className="py-3 text-sm font-medium text-black">{convertPriceString(row.price, countryCode)}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddOnServicesSection() {
  const addOns = [
    { name: "Message Queuing", description: "Queue and schedule messages for delivery at specific times", price: "Included" },
    { name: "Powerpack", description: "Intelligent number pool management for high-volume messaging", price: "Included" },
    { name: "Verify API", description: "Phone number verification via SMS, Voice, and WhatsApp OTP", price: "$0/verification" },
    { name: "Fraud Shield", description: "Real-time fraud detection and prevention for SMS traffic", price: "$0/month" },
  ];

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">Add-on Services</h2>
      <p className="text-sm text-gray-500 mb-6">
        Additional services included with your SMS plan.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[35%]">Service</th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[45%]">Description</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {addOns.map((addon) => (
              <tr key={addon.name}>
                <td className="py-3 pr-4 text-sm font-medium text-gray-900">{addon.name}</td>
                <td className="py-3 pr-4 text-sm text-gray-600">{addon.description}</td>
                <td className="py-3 text-sm font-medium text-green-700">{addon.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SMSCostCalculator({ countryCode }: { countryCode: string }) {
  const [selectedCountry, setSelectedCountry] = useState<CalculatorEntry>(() => {
    return SMS_CALCULATOR_DATA.find(c => c.code === countryCode) || SMS_CALCULATOR_DATA[0];
  });
  const [volume, setVolume] = useState(100000);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Refs for native event listeners
  const calcCountryToggleRef = useRef<HTMLButtonElement>(null);
  const calcCountryListRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);

  // Sync calculator country when main page country changes
  useEffect(() => {
    const match = SMS_CALCULATOR_DATA.find(c => c.code === countryCode);
    if (match) setSelectedCountry(match);
  }, [countryCode]);

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
    const handler = () => setIsOpen((prev) => !prev);
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // Native event listener: Calculator country list items (event delegation)
  useEffect(() => {
    const el = calcCountryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-calc-country]");
      if (!item) return;
      const code = item.getAttribute("data-calc-country")!;
      const entry = SMS_CALCULATOR_DATA.find(c => c.code === code);
      if (entry) {
        setSelectedCountry(entry);
        setIsOpen(false);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isOpen]); // re-attach when dropdown opens (list mounts)

  // Native event listener: Volume slider
  useEffect(() => {
    const el = volumeSliderRef.current;
    if (!el) return;
    const handler = (e: Event) => setVolume(Number((e.target as HTMLInputElement).value));
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, []);

  const { convertToINR } = useExchangeRate();
  const isIndia = selectedCountry.code === "IN";
  const currency = isIndia ? "\u20B9" : "$";
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
        Compare SMS costs between Plivo and other providers.
      </p>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 mb-8">
        {/* Country selector */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <button
            ref={calcCountryToggleRef}
            className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-900 flex-1 text-left">{selectedCountry.country}</span>
            <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto" ref={calcCountryListRef}>
              {SMS_CALCULATOR_DATA.map((entry, idx) => (
                <div key={entry.code}>
                  {!TOP_COUNTRY_CODES.has(entry.code) && idx > 0 && TOP_COUNTRY_CODES.has(SMS_CALCULATOR_DATA[idx - 1]?.code) && (
                    <div className="border-t border-gray-200 my-1" />
                  )}
                  <button
                    data-calc-country={entry.code}
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
            min={100000}
            max={600000}
            value={volume}
            ref={volumeSliderRef}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#323dfe]"
            style={{
              background: `linear-gradient(to right, #323dfe ${((volume - 100000) / 500000) * 100}%, #e5e7eb ${((volume - 100000) / 500000) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>100K</span>
            <span>600K</span>
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

function CarrierFeesSection({ countryCode }: { countryCode: string }) {
  const isCA = countryCode === "CA";

  return (
    <div className="space-y-10">
      <h2 className="font-sans text-xl font-semibold text-black">Additional Carrier Surcharge Fees</h2>

      {/* SMS Carrier Surcharge Fee */}
      <div>
        <h3 className="text-lg font-medium text-black mb-4">SMS Carrier Surcharge Fee</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-semibold text-black whitespace-nowrap" rowSpan={2}>Carrier</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>Long Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>Short Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>Toll-Free</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">To receive SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">To receive SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">To receive SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isCA ? (
                <>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Bell & Virgin</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0088/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0054/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0054/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0088/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Rogers & Fido</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0097/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0044/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0044/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0088/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Telus</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0065/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Freedom</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0072/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0080/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0072/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Videotron</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0072/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0040/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0040/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0072/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Other Networks</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0080/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0080/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0080/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">AT&T</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0030/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0030/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0030/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0030/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0030/sms</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0025/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0025/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0025/sms</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Verizon</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0040/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0040/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0040/sms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">US Cellular & Other Networks</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0050/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0025/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0025/sms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045/sms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0025/sms</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {!isCA && (
          <p className="mt-3 text-xs text-gray-500">
            Rates are for long codes that are successfully linked to 10DLC campaigns (i.e. registered traffic). Starting June 1, 2023, unregistered traffic toward AT&T, T-Mobile, Sprint, and Verizon will incur a surcharge of $0.0100, $0.0080, $0.0080, and $0.0100 respectively.
          </p>
        )}
      </div>

      {/* MMS Carrier Surcharge Fee */}
      <div className="pt-2">
        <h3 className="text-lg font-medium text-black mb-4">MMS Carrier Surcharge Fee</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-semibold text-black whitespace-nowrap" rowSpan={2}>Carrier</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>Long Codes</th>
                {!isCA && <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>Short Codes</th>}
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>Toll-Free</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">To receive MMS</th>
                {!isCA && <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">To send MMS</th>}
                {!isCA && <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">To receive MMS</th>}
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">To receive MMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isCA ? (
                <>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Bell & Virgin</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0310/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0310/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Rogers & Fido</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0194/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0176/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Telus</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0200/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0200/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Freedom</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0096/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0096/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Videotron</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0096/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0096/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Other Networks</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0160/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0160/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">AT&T</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0075/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0075/mms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0075/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0075/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0075/mms</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0100/mms</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">Verizon</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0065/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0065/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0065/mms</td>
                    <td className="py-3 px-2 text-center text-gray-400">NA</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-gray-900">US Cellular & Other Networks</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0100/mms</td>
                    <td className="py-3 px-2 text-center text-black">$0.0100/mms</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RCS Carrier Surcharge Fee - US only */}
      {!isCA && (
        <div className="pt-2">
          <h3 className="text-lg font-medium text-black mb-4">RCS Carrier Surcharge Fee</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 text-left font-semibold text-black whitespace-nowrap" rowSpan={2}>Carrier</th>
                  <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>RCS Rich</th>
                  <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200 whitespace-nowrap" colSpan={2}>RCS Rich Media</th>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">Outbound*</th>
                  <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">Inbound*</th>
                  <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200 whitespace-nowrap">Outbound*</th>
                  <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">Inbound*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-4 text-gray-900">AT&T</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045</td>
                  <td className="py-3 px-2 text-center text-black">$0.0045</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.01</td>
                  <td className="py-3 px-2 text-center text-black">$0.01</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0062</td>
                  <td className="py-3 px-2 text-center text-black">$0.0025</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0125</td>
                  <td className="py-3 px-2 text-center text-black">$0.0125</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-900">Verizon</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.004</td>
                  <td className="py-3 px-2 text-center text-gray-400">$0</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.006</td>
                  <td className="py-3 px-2 text-center text-gray-400">$0</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-900">US Cellular</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0062</td>
                  <td className="py-3 px-2 text-center text-black">$0.0025</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0135</td>
                  <td className="py-3 px-2 text-center text-black">$0.0135</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-900">All other carriers</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.0045</td>
                  <td className="py-3 px-2 text-center text-black">$0.0045</td>
                  <td className="py-3 px-2 text-center text-black border-l border-gray-100">$0.01</td>
                  <td className="py-3 px-2 text-center text-black">$0.01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
