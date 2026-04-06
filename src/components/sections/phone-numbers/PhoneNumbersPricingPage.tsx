"use client";

import { useState, useEffect, useRef, useMemo, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  TOP_COUNTRIES,
  getFlagEmoji,
  NUMBER_COVERAGE_COUNTRIES,
} from "@/data/pricing-data";
import type { CountryListItem } from "@/data/pricing-data";
import {
  PHONE_NUMBER_PRICING_CACHE,
  PHONE_NUMBER_PRICING_COUNTRY_NAMES,
} from "@/data/phone-number-pricing-cache";
import type {
  PhoneNumberCalculatorData,
  PhoneNumberComplianceRow,
  PhoneNumberPricingNote,
  PhoneNumberPricingRow,
} from "@/data/phone-number-pricing-cache";
import { useGeoCountry } from "@/hooks/useGeoCountry";

type SectionId = "number-rental" | "short-codes" | "requirements" | "calculator";

const PHONE_NUMBER_COUNTRY_PRIORITY_INDEX = new Map(
  TOP_COUNTRIES.map((country, index) => [country.code, index]),
);

// Only show countries with actual phone number coverage (9 countries)
const PHONE_NUMBER_COUNTRIES: CountryListItem[] = Object.entries(
  PHONE_NUMBER_PRICING_COUNTRY_NAMES,
)
  .filter(([code]) => NUMBER_COVERAGE_COUNTRIES.has(code))
  .map(([code, name]) => ({
    code,
    name,
    flag: TOP_COUNTRIES.find((country) => country.code === code)?.flag || getFlagEmoji(code),
    isPriority: PHONE_NUMBER_COUNTRY_PRIORITY_INDEX.has(code),
  }))
  .sort((left, right) => {
    const leftPriority = PHONE_NUMBER_COUNTRY_PRIORITY_INDEX.get(left.code);
    const rightPriority = PHONE_NUMBER_COUNTRY_PRIORITY_INDEX.get(right.code);

    if (leftPriority != null && rightPriority != null) {
      return leftPriority - rightPriority;
    }
    if (leftPriority != null) return -1;
    if (rightPriority != null) return 1;
    return left.name.localeCompare(right.name);
  });

const PHONE_NUMBER_COUNTRY_CODE_SET = new Set(
  PHONE_NUMBER_COUNTRIES.map((country) => country.code),
);

export default function PhoneNumbersPricingPage({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry("US", { mode: "exact" });

  const [selectedCode, setSelectedCode] = useState(() => {
    const normalizedInitialCountry = initialCountry?.toUpperCase();
    return normalizedInitialCountry && PHONE_NUMBER_COUNTRY_CODE_SET.has(normalizedInitialCountry)
      ? normalizedInitialCountry
      : "US";
  });
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("number-rental");
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const geoApplied = useRef(false);
  const countryToggleRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const sectionTabsRef = useRef<HTMLElement>(null);

  // Auto-select country based on IP geolocation
  useEffect(() => {
    if (geoApplied.current || initialCountry) return;
    if (geoCountry && geoCountry !== "US" && PHONE_NUMBER_COUNTRY_CODE_SET.has(geoCountry)) {
      geoApplied.current = true;
      setSelectedCode(geoCountry);
      history.replaceState({}, "", `/virtual-phone-numbers/pricing/${geoCountry.toLowerCase()}/`);
    } else if (geoCountry === "US" || !geoCountry || !PHONE_NUMBER_COUNTRY_CODE_SET.has(geoCountry)) {
      geoApplied.current = true;
      setSelectedCode("US");
      history.replaceState({}, "", `/virtual-phone-numbers/pricing/us/`);
    }
  }, [geoCountry, initialCountry]);

  // Get the selected country item for display
  const selectedCountry = useMemo(() => {
    const found = PHONE_NUMBER_COUNTRIES.find((c) => c.code === selectedCode);
    return found || { code: selectedCode, name: selectedCode, flag: "", isPriority: false };
  }, [selectedCode]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return PHONE_NUMBER_COUNTRIES;
    const q = searchQuery.toLowerCase();
    return PHONE_NUMBER_COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const pricingData = useMemo(
    () => PHONE_NUMBER_PRICING_CACHE[selectedCode] || null,
    [selectedCode],
  );

  const regularNumbers = pricingData?.regularNumbers || [];
  const regularNote = pricingData?.regularNote || null;
  const shortCodes = pricingData?.shortCodes || [];
  const shortCodeNote = pricingData?.shortCodeNote || null;
  const requirements = pricingData?.compliance || [];
  const calcData = pricingData?.calculator || null;
  const pricingLoading = false;
  const hasData = regularNumbers.length > 0;

  const sections = useMemo(() => {
    const s: { id: SectionId; label: string }[] = [
      { id: "number-rental", label: "Phone Number Rental" },
    ];
    if (shortCodes.length > 0) {
      s.push({ id: "short-codes", label: "Short Codes" });
    }
    if (requirements.length > 0) {
      s.push({ id: "requirements", label: "Requirements" });
    }
    if (calcData) {
      s.push({ id: "calculator", label: "Estimate" });
    }
    return s;
  }, [shortCodes, requirements, calcData]);

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
      history.replaceState({}, "", `/virtual-phone-numbers/pricing/${code.toLowerCase()}/`);
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
              Phone Numbers Pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Competitive pay-as-you-go phone number pricing with add-on features included. Volume discounts on committed spends as you scale.
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
                  <NumberRentalSection numbers={regularNumbers} note={regularNote} />
                ) : (
                  <NoDataSection />
                )}
              </div>

              {/* Short Codes */}
              {shortCodes.length > 0 && (
                <div id="short-codes" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <ShortCodesSection shortCodes={shortCodes} note={shortCodeNote} />
                </div>
              )}

              {/* Requirements */}
              {requirements.length > 0 && (
                <div id="requirements" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <ComplianceSection requirements={requirements} />
                </div>
              )}

              {/* Calculator */}
              {calcData && (
                <div id="calculator" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                  <CalculatorSection data={calcData} />
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
        Phone Number Rental
      </h2>
      <p className="text-sm text-gray-500">
        Phone number pricing is not available for this country.{" "}
        <a href="/contact/sales/" className="text-[#323dfe] hover:underline">
          Contact sales
        </a>{" "}
        for details.
      </p>
    </div>
  );
}

function NumberRentalSection({
  numbers,
  note,
}: {
  numbers: PhoneNumberPricingRow[];
  note: PhoneNumberPricingNote | null;
}) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Phone Number Rental
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">
                Route Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[30%]">
                Capability
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black w-[30%]">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {numbers.map((number) => (
              <tr key={number.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {number.type}
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
                <td className="py-3 pr-4 text-sm font-medium text-black">
                  {number.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && (
        <PricingNote note={note} className="mt-4" />
      )}
    </div>
  );
}

function ShortCodesSection({
  shortCodes,
  note,
}: {
  shortCodes: PhoneNumberPricingRow[];
  note: PhoneNumberPricingNote | null;
}) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Short codes
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[40%]">
                Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[30%]">
                Capability
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black w-[30%]">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {shortCodes.map((shortCode) => (
              <tr key={shortCode.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {shortCode.type}
                </td>
                <td className="py-3 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1.5">
                    {shortCode.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 pr-4 text-sm font-medium text-black">
                  {shortCode.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && (
        <PricingNote note={note} className="mt-4" />
      )}
    </div>
  );
}

function ComplianceSection({
  requirements,
}: {
  requirements: PhoneNumberComplianceRow[];
}) {
  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Requirements
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black w-[35%]">
                Number Type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black w-[65%]">
                Compliance Requirements
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requirements.map((req) => (
              <tr key={req.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {req.label}
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {req.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
}: {
  data: PhoneNumberCalculatorData;
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

  const currency = data.currency;
  const currencyLabel = currency === "₹" ? "INR" : "USD";

  const availableTypes = CALC_TYPES.filter((t) => data[t.key] > 0);
  const grandTotal = availableTypes.reduce(
    (sum, t) => sum + (active[t.key] ? data[t.key] : 0),
    0
  );

  const fmt = (n: number) =>
    n.toLocaleString(currency === "₹" ? "en-IN" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div>
      <h2 className="font-sans text-xl font-semibold text-black mb-2">
        Estimate
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

function PricingNote({
  note,
  className,
}: {
  note: PhoneNumberPricingNote;
  className?: string;
}) {
  return (
    <p className={cn("rounded-lg bg-gray-50 px-4 py-3 text-xs text-gray-500", className)}>
      {note.href ? (
        <a
          href={note.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#323dfe] hover:underline"
        >
          {note.text}
        </a>
      ) : (
        note.text
      )}
    </p>
  );
}
