"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  PHONE_NUMBER_PRIORITY_COUNTRIES,
  PHONE_NUMBER_PRICING,
  PHONE_CALCULATOR_DATA,
} from "@/data/pricing-data";
import type { PhoneNumberCountryPricing, PhoneNumberCompliance, PhoneCalculatorEntry } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import type { PhoneNumberInfo } from "@/hooks/useCountryPricing";

type SectionId = "number-rental" | "short-codes" | "compliance" | "calculator";

/** Map API number type string to display label */
function formatNumberType(apiType: string): string {
  const t = (apiType || "").toLowerCase().trim();
  if (t === "local") return "Local numbers";
  if (t === "tollfree") return "Toll-free numbers";
  if (t === "mobile") return "Mobile numbers";
  if (t === "national") return "National numbers";
  if (t === "shared_cost") return "Shared cost numbers";
  return apiType ? `${apiType.charAt(0).toUpperCase()}${apiType.slice(1)} numbers` : "Numbers";
}

/** Map API capability strings to display labels */
function formatCapabilities(caps: string[]): string[] {
  const mapped: string[] = [];
  for (const c of caps) {
    const cl = c.toLowerCase();
    if (cl === "voice") mapped.push("Voice");
    else if (cl === "sms") mapped.push("SMS");
    else if (cl === "mms") mapped.push("MMS");
    else if (cl === "sip_trunking" || cl === "sip trunking") mapped.push("SIP trunking");
    else mapped.push(c);
  }
  return mapped;
}

/** Convert API phoneNumbers to display format */
function mapApiNumbers(
  apiNumbers: PhoneNumberInfo[],
  currency: string
): PhoneNumberCountryPricing["numbers"] {
  return apiNumbers
    .filter((n) => (n.status === "GA" || n.status === "BETA") && n.rentalRate != null)
    .map((n) => ({
      type: formatNumberType(n.type),
      price: `${currency}${n.rentalRate!.toFixed(2)}/month`,
      capabilities: formatCapabilities(n.capabilities),
    }));
}

export default function PhoneNumbersPricingPage({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry();
  const { countries: countryList, loading: countriesLoading } = useCountryISOs(PHONE_NUMBER_PRIORITY_COUNTRIES);

  const [selectedCode, setSelectedCode] = useState(initialCountry || "US");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("number-rental");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const geoApplied = useRef(false);
  const countryToggleRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const sectionTabsRef = useRef<HTMLElement>(null);

  // Fetch live pricing from API + exchange rate for INR conversion
  const { data: pricingData, loading: pricingLoading } = useCountryPricing(selectedCode);
  const { formatPrice, convertToINR, convertPriceString } = useExchangeRate();

  // Auto-select country based on IP geolocation
  useEffect(() => {
    if (geoApplied.current || initialCountry) return;
    if (geoCountry && geoCountry !== "US") {
      geoApplied.current = true;
      setSelectedCode(geoCountry);
    } else if (geoCountry === "US") {
      geoApplied.current = true;
    }
  }, [geoCountry, initialCountry]);

  // Get the selected country item for display
  const selectedCountry = useMemo(() => {
    const found = countryList.find((c) => c.code === selectedCode);
    return found || { code: selectedCode, name: selectedCode, flag: "", isPriority: false };
  }, [countryList, selectedCode]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countryList;
    const q = searchQuery.toLowerCase();
    return countryList.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery, countryList]);

  // Convert a price string to local currency if needed
  const cp = (price: string) => convertPriceString(price, selectedCode);

  // Build display data from API response, falling back to hardcoded
  const { regularNumbers, shortCodes, note, compliance, hasData } = useMemo(() => {
    const fallback = PHONE_NUMBER_PRICING[selectedCode];

    const convertNumbers = (nums: PhoneNumberCountryPricing["numbers"]) =>
      nums.map((n) => ({
        ...n,
        price: cp(n.price),
        children: n.children?.map((c) => ({ ...c, price: cp(c.price) })),
      }));

    // Try API data first
    if (pricingData && pricingData.phoneNumbers.length > 0) {
      const apiNumbers = mapApiNumbers(pricingData.phoneNumbers, "$");
      const hardcodedShortCodes = fallback?.numbers.filter((n) => n.children) || [];
      return {
        regularNumbers: convertNumbers(apiNumbers.length > 0 ? apiNumbers : (fallback?.numbers.filter((n) => !n.children) || [])),
        shortCodes: convertNumbers(hardcodedShortCodes),
        note: fallback?.note,
        compliance: fallback?.compliance || [],
        hasData: true,
      };
    }

    // Fallback to hardcoded data
    if (fallback) {
      return {
        regularNumbers: convertNumbers(fallback.numbers.filter((n) => !n.children)),
        shortCodes: convertNumbers(fallback.numbers.filter((n) => n.children)),
        note: fallback.note,
        compliance: fallback.compliance || [],
        hasData: true,
      };
    }

    // No data available for this country
    return { regularNumbers: [], shortCodes: [], note: undefined, compliance: [] as PhoneNumberCompliance[], hasData: false };
  }, [pricingData, selectedCode, cp]);

  const calcData = useMemo(() => PHONE_CALCULATOR_DATA[selectedCode] || null, [selectedCode]);

  const sections = useMemo(() => {
    const s: { id: SectionId; label: string }[] = [
      { id: "number-rental", label: "Number rental" },
    ];
    if (shortCodes.length > 0) {
      s.push({ id: "short-codes", label: "Short codes" });
    }
    if (compliance.length > 0) {
      s.push({ id: "compliance", label: "Compliance" });
    }
    if (calcData) {
      s.push({ id: "calculator", label: "Calculator" });
    }
    return s;
  }, [shortCodes, compliance, calcData]);

  // Close dropdown on outside click
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

  // Native event: country toggle button
  useEffect(() => {
    const el = countryToggleRef.current;
    if (!el) return;
    const handler = () => setIsCountryOpen((prev) => !prev);
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // Native event: search input (re-attach when dropdown opens since input is conditionally rendered)
  useEffect(() => {
    const el = searchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => setSearchQuery((e.target as HTMLInputElement).value);
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [isCountryOpen]);

  // Sync search input DOM value when searchQuery is cleared programmatically
  useEffect(() => {
    if (searchInputRef.current && searchQuery === "") {
      searchInputRef.current.value = "";
    }
  }, [searchQuery]);

  // Native event: country list items (event delegation, re-attach when dropdown opens)
  useEffect(() => {
    const el = countryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-country-code]");
      if (!item) return;
      const code = item.getAttribute("data-country-code")!;
      setSelectedCode(code);
      setIsCountryOpen(false);
      setSearchQuery("");
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isCountryOpen]);

  // Native event: section tab navigation (event delegation)
  useEffect(() => {
    const el = sectionTabsRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-section-id]");
      if (!btn) return;
      scrollToSection(btn.getAttribute("data-section-id") as SectionId);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
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
                          defaultValue={searchQuery}
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
                                selectedCode === country.code && "bg-[#323dfe]/5"
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
              {/* Number Rental Rates */}
              <div id="number-rental" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                {pricingLoading ? (
                  <NumberRentalShimmer />
                ) : hasData && regularNumbers.length > 0 ? (
                  <NumberRentalSection numbers={regularNumbers} />
                ) : (
                  <NoDataSection />
                )}
              </div>

              {/* Short Codes */}
              {shortCodes.length > 0 && (
                <div id="short-codes" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <ShortCodesSection shortCodes={shortCodes} note={note} />
                </div>
              )}

              {/* Compliance Requirements */}
              {compliance.length > 0 && (
                <div id="compliance" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <ComplianceSection requirements={compliance} />
                </div>
              )}

              {/* Calculator */}
              {calcData && (
                <div id="calculator" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <CalculatorSection data={calcData} isIndia={selectedCode === "IN"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NumberRentalShimmer() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-64 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 bg-gray-100 rounded w-1/3" />
            <div className="h-4 bg-gray-100 rounded w-1/4" />
            <div className="h-4 bg-gray-100 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NoDataSection() {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Number rental rates
      </h2>
      <p className="text-sm text-gray-500">
        Phone number pricing is not available for this country.{" "}
        <a href="/contact-sales/" className="text-[#323dfe] hover:underline">
          Contact sales
        </a>{" "}
        for details.
      </p>
    </div>
  );
}

function NumberRentalSection({
  numbers,
}: {
  numbers: PhoneNumberCountryPricing["numbers"];
}) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
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
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
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

function ComplianceSection({
  requirements,
}: {
  requirements: PhoneNumberCompliance[];
}) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Compliance requirements
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Documentation and registration required for number purchase in this country.
      </p>
      <div className="space-y-3">
        {requirements.map((req) => (
          <div key={req.label} className="bg-gray-50 rounded-lg px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{req.label}</p>
            <p className="text-sm text-gray-600 mt-1">{req.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const CALC_TYPES = [
  { key: "local" as const, label: "Local" },
  { key: "tollfree" as const, label: "Toll-free" },
  { key: "national" as const, label: "National" },
  { key: "mobile" as const, label: "Mobile" },
  { key: "shortcode" as const, label: "Short code" },
] as const;

function CalculatorSection({
  data,
  isIndia,
}: {
  data: PhoneCalculatorEntry;
  isIndia: boolean;
}) {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const checkboxRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Reset when data changes (country switch)
  useEffect(() => {
    setActive({});
  }, [data]);

  // Native event listeners for checkbox toggles
  useEffect(() => {
    const handlers: Array<{ el: HTMLDivElement; handler: () => void }> = [];
    for (const t of CALC_TYPES) {
      const el = checkboxRefs.current.get(t.key);
      if (!el) continue;
      const handler = () => {
        setActive((prev) => ({ ...prev, [t.key]: !prev[t.key] }));
      };
      el.addEventListener("click", handler);
      handlers.push({ el, handler });
    }
    return () => {
      for (const { el, handler } of handlers) {
        el.removeEventListener("click", handler);
      }
    };
  }, [data]);

  const currency = isIndia ? "₹" : "$";
  const currencyLabel = isIndia ? "INR" : "USD";

  const availableTypes = CALC_TYPES.filter((t) => data[t.key] > 0);
  const grandTotal = availableTypes.reduce(
    (sum, t) => sum + (active[t.key] ? data[t.key] : 0),
    0
  );

  const fmt = (n: number) =>
    n.toLocaleString(isIndia ? "en-IN" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Estimate your monthly cost
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Select the number types you need to see the estimated monthly rental.
      </p>

      {/* Checkbox toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableTypes.map((t) => (
          <div
            key={t.key}
            ref={(el) => {
              if (el) checkboxRefs.current.set(t.key, el);
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer select-none transition-colors",
              active[t.key]
                ? "border-[#323dfe] bg-[#323dfe]/5 text-[#323dfe]"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                active[t.key]
                  ? "bg-[#323dfe] border-[#323dfe]"
                  : "border-gray-300 bg-white"
              )}
            >
              {active[t.key] && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Subtotal rows */}
      <div className="space-y-0">
        {availableTypes.map((t) =>
          active[t.key] ? (
            <div
              key={t.key}
              className="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span className="text-sm text-gray-700">{t.label} numbers</span>
              <span className="text-sm font-medium text-black">
                {currency}{fmt(data[t.key])}/month
              </span>
            </div>
          ) : null
        )}
      </div>

      {/* Grand total */}
      <div className="flex items-center justify-between pt-4 mt-2">
        <span className="text-sm font-semibold text-black">Estimated total</span>
        <div className="text-right">
          <span className="text-lg font-bold text-black">
            {currency}{fmt(grandTotal)}
          </span>
          <span className="text-sm text-gray-500 ml-1">/month</span>
          <p className="text-xs text-gray-400 mt-0.5">{currencyLabel}</p>
        </div>
      </div>
    </div>
  );
}
