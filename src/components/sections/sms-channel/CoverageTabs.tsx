"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { xlsxCoverageData } from "@/data/sms-coverage-data";
import {
  SMS_COVERAGE_CONTINENT_LABELS,
  SMS_COVERAGE_CONTINENT_ORDER,
  SMS_COVERAGE_COUNTRIES,
  SMS_COVERAGE_PAGE_META,
  SMS_COVERAGE_PRIORITY_COUNTRY_CODES,
  type SmsCoverageContinent as Continent,
  type SmsCoverageCountry as Country,
} from "@/data/sms-coverage-cache";
import { SMS_COVERAGE_PRICING_CACHE } from "@/data/sms-coverage-pricing-cache";

type FeatureSectionId = "number-types" | "features" | "regulations" | "deliverability" | "verify-coverage" | "country-specs" | "pricing";

const featureSections: { id: FeatureSectionId; label: string }[] = [
  { id: "number-types", label: "Number Types" },
  { id: "features", label: "Features" },
  { id: "regulations", label: "Regulations" },
  { id: "deliverability", label: "Deliverability" },
  { id: "verify-coverage", label: "Verify Coverage" },
  { id: "country-specs", label: "Country Specs" },
  { id: "pricing", label: "Pricing" },
];

type CoverageType = "outbound" | "inbound";

const PRIORITY_COUNTRY_CODES = [...SMS_COVERAGE_PRIORITY_COUNTRY_CODES];
const continentLabels = SMS_COVERAGE_CONTINENT_LABELS;
const continentOrder = SMS_COVERAGE_CONTINENT_ORDER;
const countries = SMS_COVERAGE_COUNTRIES;

interface CountryDetails {
  features: {
    sendingToMobile: string;
    sendingToLandline: string;
    smsConcatenation: string;
    smsConcatenationNote?: string;
    twoWaySms: string;
    powerpack: string;
  };
  regulations: {
    senderIdType: string;
    senderIdRegulations: string;
    registrationRequirements: string;
    contentRestrictions: string;
    consentRequirements: string;
    optOutRequirements: string;
    complianceNotes: string;
  };
  deliverability: {
    deliveryReportType: string;
    deliveryReportReliability: string;
    senderIdProvisioningTime: string;
    senderIdRegistrationCharges: string;
    numericSenderIdSupported: string;
  };
  verifyCoverage: {
    servicability: string;
    sidUsed: string;
    contentMaintained: string;
  };
  countrySpecs: {
    isoCode: string;
    countryCode: string;
    mcc: string;
  };
}

// Get country details with fallback for countries without specific data
const getCountryDetails = (country: Country): CountryDetails => {
  // XLSX-derived data (226 countries from the live SMS coverage workbook)
  if (xlsxCoverageData[country.code]) {
    return xlsxCoverageData[country.code] as CountryDetails;
  }

  // Generic fallback for any future country that has not yet been added
  return {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: country.inbound ? "Supported" : "Not Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdType: "Varies by country",
      senderIdRegulations: "Sender ID regulations vary. Contact Plivo support for country-specific requirements.",
      registrationRequirements: "Registration requirements vary by country. Some countries require pre-registration of sender IDs.",
      contentRestrictions: "Content must comply with local regulations. Avoid prohibited content categories.",
      consentRequirements: "Consent requirements vary. Express consent recommended for all commercial messaging.",
      optOutRequirements: "Opt-out mechanism recommended in all commercial messages.",
      complianceNotes: "Contact Plivo support for detailed compliance requirements in this country.",
    },
    deliverability: {
      deliveryReportType: "Network",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "Varies",
      senderIdRegistrationCharges: "Varies",
      numericSenderIdSupported: "Contact support",
    },
    verifyCoverage: {
      servicability: "Reliable",
      sidUsed: "Contact support",
      contentMaintained: "Yes",
    },
    countrySpecs: {
      isoCode: country.code,
      countryCode: "Contact support",
      mcc: "Contact support",
    },
  };
};

// Get United States as default selected country
const defaultCountry = countries.find((c) => c.code === "US") || null;

function resolveInitialCountry(initialCountry?: string) {
  if (!initialCountry) return defaultCountry;
  return countries.find((country) => country.code === initialCountry) || defaultCountry;
}

function updateSmsCoveragePath(countryCode: string) {
  if (typeof window === "undefined") return;

  const nextPath = `/sms/coverage/${countryCode.toLowerCase()}/`;
  if (window.location.pathname !== nextPath) {
    window.history.replaceState({}, "", nextPath);
  }
}

export default function CoverageTabs({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry("US", { mode: "exact" });
  const [coverageType, setCoverageType] = useState<CoverageType>("outbound");
  const [activeContinent, setActiveContinent] = useState<Continent>(
    () => resolveInitialCountry(initialCountry)?.continent || "north-america"
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    () => resolveInitialCountry(initialCountry)
  );
  const [activeFeatureSection, setActiveFeatureSection] = useState<FeatureSectionId>("number-types");
  const [featureSidebarStyle, setFeatureSidebarStyle] = useState<React.CSSProperties>({});
  const [isDesktopCountryOpen, setIsDesktopCountryOpen] = useState(false);
  const [isMobileCountryOpen, setIsMobileCountryOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  const { convertPriceString } = useExchangeRate();
  const formatCoveragePrice = useCallback(
    (value: string, routeType: string) => {
      if (selectedCountry?.code === "IN" && routeType === "ILDO") {
        return value;
      }

      return convertPriceString(value, selectedCountry?.code || "US");
    },
    [convertPriceString, selectedCountry],
  );
  const coveragePricingData = useMemo(() => {
    if (!selectedCountry) return null;
    return (
      SMS_COVERAGE_PRICING_CACHE[selectedCountry.code] || {
        supportedNumberTypes: [],
        pricingRows: [],
      }
    );
  }, [selectedCountry]);

  // Auto-select country based on user's IP location
  const geoApplied = useRef(false);
  useEffect(() => {
    if (geoApplied.current) return;
    const target = initialCountry || geoCountry;
    if (!target) return;
    const match = countries.find((c) => c.code === target);
    if (match) {
      geoApplied.current = true;
      setSelectedCountry(match);
      setActiveContinent(match.continent);
    }
  }, [geoCountry, initialCountry]);

  const featureSidebarWrapperRef = useRef<HTMLDivElement>(null);
  const featureContentRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // ── NEW REFS for native event delegation ──
  const coverageToggleRef = useRef<HTMLDivElement>(null);
  const continentTabsRef = useRef<HTMLDivElement>(null);
  const countryGridRef = useRef<HTMLDivElement>(null);
  const desktopDropdownToggleRef = useRef<HTMLButtonElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const desktopDropdownListRef = useRef<HTMLDivElement>(null);
  const featureNavRef = useRef<HTMLUListElement>(null);
  const mobileDropdownToggleRef = useRef<HTMLButtonElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileDropdownListRef = useRef<HTMLDivElement>(null);

  // ── State refs so native handlers can read current state ──
  const filteredCountriesRef = useRef<Country[]>([]);
  const searchFilteredCountriesRef = useRef<Country[]>([]);
  const availableContinentsRef = useRef<Continent[]>([]);

  // Filtered countries for dropdown search (priority countries at top)
  const searchFilteredCountries = useMemo(() => {
    const coverageFiltered = countries
      .filter((c) => (coverageType === "outbound" ? c.outbound : c.inbound))
      .sort((a, b) => {
        const aIdx = PRIORITY_COUNTRY_CODES.indexOf(a.code);
        const bIdx = PRIORITY_COUNTRY_CODES.indexOf(b.code);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return a.name.localeCompare(b.name);
      });
    if (!countrySearchQuery) return coverageFiltered;
    const q = countrySearchQuery.toLowerCase();
    return coverageFiltered.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [coverageType, countrySearchQuery]);

  // Click outside handler for country dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setIsDesktopCountryOpen(false);
        setCountrySearchQuery("");
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileCountryOpen(false);
        setCountrySearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries by coverage type and continent
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesCoverage = coverageType === "outbound" ? country.outbound : country.inbound;
      const matchesContinent = country.continent === activeContinent;
      return matchesCoverage && matchesContinent;
    });
  }, [coverageType, activeContinent]);

  // Get continents that have countries for current coverage type
  const availableContinents = useMemo(() => {
    return continentOrder.filter((continent) =>
      countries.some((country) => {
        const matchesCoverage = coverageType === "outbound" ? country.outbound : country.inbound;
        return matchesCoverage && country.continent === continent;
      })
    );
  }, [coverageType]);

  // Keep refs in sync with latest data
  filteredCountriesRef.current = filteredCountries;
  searchFilteredCountriesRef.current = searchFilteredCountries;
  availableContinentsRef.current = availableContinents;

  // Get country details for selected country
  const countryDetails = useMemo(() => {
    if (!selectedCountry) return null;
    return getCountryDetails(selectedCountry);
  }, [selectedCountry]);

  // Reset continent selection when coverage type changes
  const handleCoverageTypeChange = useCallback((type: CoverageType) => {
    setCoverageType(type);
    setSelectedCountry(null);
    // Keep continent if available, otherwise select first available
    const avail = availableContinentsRef.current;
    setActiveContinent((prev) => {
      if (!avail.includes(prev)) {
        return avail[0] || "north-america";
      }
      return prev;
    });
  }, []);

  const scrollToFeatureSection = useCallback((id: FeatureSectionId) => {
    const element = document.getElementById(`feature-${id}`);
    if (element) {
      const offset = 130; // Account for fixed headers
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // NATIVE EVENT LISTENERS (replacing all React onClick/onChange)
  // ═══════════════════════════════════════════════════════════════

  // 1. Coverage type toggle (outbound/inbound) — event delegation
  useEffect(() => {
    const el = coverageToggleRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-coverage-type]");
      if (!btn) return;
      const type = btn.getAttribute("data-coverage-type") as CoverageType;
      if (type) handleCoverageTypeChange(type);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [handleCoverageTypeChange]);

  // 2. Continent tabs — event delegation
  useEffect(() => {
    const el = continentTabsRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-continent]");
      if (!btn) return;
      const continent = btn.getAttribute("data-continent") as Continent;
      if (continent) {
        setActiveContinent(continent);
        setSelectedCountry(null);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 3. Country grid items — event delegation
  useEffect(() => {
    const el = countryGridRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-country-code]");
      if (!btn) return;
      const code = btn.getAttribute("data-country-code");
      if (code) {
        const country = filteredCountriesRef.current.find((c) => c.code === code);
        if (country) setSelectedCountry(country);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 7. Feature section nav tabs — event delegation
  useEffect(() => {
    const el = featureNavRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-section-id]");
      if (!btn) return;
      const sectionId = btn.getAttribute("data-section-id") as FeatureSectionId;
      if (sectionId) scrollToFeatureSection(sectionId);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [scrollToFeatureSection]);

  // Handle sticky sidebar and scroll spy for feature sections
  useEffect(() => {
    const handleScrollAndResize = () => {
      // Scroll spy for active feature section
      const sectionElements = featureSections.map(s => ({
        id: s.id,
        element: document.getElementById(`feature-${s.id}`)
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveFeatureSection(section.id);
            break;
          }
        }
      }

      // Sticky sidebar logic (only on desktop)
      if (window.innerWidth >= 1024 && featureSidebarWrapperRef.current && featureContentRef.current) {
        const wrapperRect = featureSidebarWrapperRef.current.getBoundingClientRect();
        const contentRect = featureContentRef.current.getBoundingClientRect();
        const topThreshold = 125; // navbar + subnav height + gap

        // Check if wrapper top is above threshold AND content is still visible
        if (wrapperRect.top <= topThreshold && contentRect.bottom > 300) {
          setFeatureSidebarStyle({
            position: 'fixed',
            top: `${topThreshold}px`,
            left: `${wrapperRect.left}px`,
            width: '220px',
          });
        } else {
          setFeatureSidebarStyle({});
        }
      } else {
        setFeatureSidebarStyle({});
      }
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [selectedCountry]);

  const handleSelectCountry = useCallback((country: Country) => {
    setSelectedCountry(country);
    setActiveContinent(country.continent);
    setIsDesktopCountryOpen(false);
    setIsMobileCountryOpen(false);
    setCountrySearchQuery("");
    updateSmsCoveragePath(country.code);
  }, []);

  return (
    <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-12 lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
            {SMS_COVERAGE_PAGE_META.heading}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {SMS_COVERAGE_PAGE_META.subheading}
          </p>
        </div>

        {/* Primary Tabs: Outbound / Inbound — event delegation via ref */}
        <div className="flex justify-center mb-8">
          <div ref={coverageToggleRef} className="inline-flex rounded-lg bg-white border border-gray-200 p-1">
            <button
              data-coverage-type="outbound"
              className={cn(
                "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                coverageType === "outbound"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              )}
            >
              Outbound SMS
            </button>
            <button
              data-coverage-type="inbound"
              className={cn(
                "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                coverageType === "inbound"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              )}
            >
              Inbound SMS
            </button>
          </div>
        </div>

        {/* Countries Grid with Continent Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          {/* Continent Tabs — event delegation via ref */}
          <div ref={continentTabsRef} className="flex flex-wrap border-b border-gray-200">
            {availableContinents.map((continent) => (
              <button
                key={continent}
                data-continent={continent}
                className={cn(
                  "px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all -mb-[1px]",
                  activeContinent === continent
                    ? "text-black border-b-4 border-[#323dfe]"
                    : "text-gray-600 border-b-4 border-transparent hover:text-black hover:bg-gray-50"
                )}
              >
                {continentLabels[continent]}
              </button>
            ))}
          </div>

          {/* Countries — event delegation via ref */}
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-5">
              Select to view features and capabilities
            </p>
            {filteredCountries.length > 0 ? (
              <div ref={countryGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    data-country-code={country.code}
                    className={cn(
                      "flex items-center gap-2 py-1.5 px-2 rounded text-left transition-all",
                      selectedCountry?.code === country.code
                        ? "bg-gray-100 ring-1 ring-gray-900"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <span className="text-lg flex-shrink-0">{country.flag}</span>
                    <span className="text-sm font-normal text-black truncate">
                      {country.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No countries available for {coverageType} SMS in {continentLabels[activeContinent]}.
              </div>
            )}
          </div>
        </div>

        {/* Country Details - Two Column Layout */}
        {selectedCountry && countryDetails && (
          <div className="mt-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8 lg:items-start">
            {/* Left Sidebar Wrapper */}
            <div ref={featureSidebarWrapperRef} className="mb-6 lg:mb-0 hidden lg:block">
              <aside
                className="bg-white z-30"
                style={featureSidebarStyle}
              >
                {/* Country Selector */}
                <div className="relative mb-6" ref={desktopDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
                  <button
                    type="button"
                    ref={desktopDropdownToggleRef}
                    onClick={() => {
                      setIsDesktopCountryOpen((prev) => !prev);
                      setCountrySearchQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">{selectedCountry.name}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", isDesktopCountryOpen && "rotate-180")} />
                  </button>

                  {isDesktopCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          ref={desktopSearchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          onChange={(event) => setCountrySearchQuery(event.target.value)}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div ref={desktopDropdownListRef} className="overflow-y-auto">
                        {searchFilteredCountries.map((c, idx) => (
                          <div key={c.code}>
                            {!PRIORITY_COUNTRY_CODES.includes(c.code) && idx > 0 && PRIORITY_COUNTRY_CODES.includes(searchFilteredCountries[idx - 1]?.code) && (
                              <div className="border-t border-gray-200 my-1" />
                            )}
                            <button
                              type="button"
                              data-dropdown-country-code={c.code}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => handleSelectCountry(c)}
                              className={cn(
                                "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                                selectedCountry?.code === c.code && "bg-[#323dfe]/5"
                              )}
                            >
                              <span className="text-xl">{c.flag}</span>
                              <span className="text-sm text-gray-900">{c.name}</span>
                            </button>
                          </div>
                        ))}
                        {searchFilteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Navigation — event delegation via ref */}
                <nav>
                  <p className="text-sm font-medium text-gray-700 mb-3">Jump to section</p>
                  <ul ref={featureNavRef} className="space-y-1">
                    {featureSections.map((section) => (
                      <li key={section.id}>
                        <button
                          data-section-id={section.id}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                            activeFeatureSection === section.id
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
            <div ref={featureContentRef} className="min-w-0">
              {/* Mobile Country Selector */}
              <div className="lg:hidden mb-4" ref={mobileDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
                <div className="relative">
                  <button
                    type="button"
                    ref={mobileDropdownToggleRef}
                    onClick={() => {
                      setIsMobileCountryOpen((prev) => !prev);
                      setCountrySearchQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">{selectedCountry.name}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", isMobileCountryOpen && "rotate-180")} />
                  </button>

                  {isMobileCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          ref={mobileSearchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          onChange={(event) => setCountrySearchQuery(event.target.value)}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div ref={mobileDropdownListRef} className="overflow-y-auto">
                        {searchFilteredCountries.map((c, idx) => (
                          <div key={c.code}>
                            {!PRIORITY_COUNTRY_CODES.includes(c.code) && idx > 0 && PRIORITY_COUNTRY_CODES.includes(searchFilteredCountries[idx - 1]?.code) && (
                              <div className="border-t border-gray-200 my-1" />
                            )}
                            <button
                              type="button"
                              data-dropdown-country-code={c.code}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => handleSelectCountry(c)}
                              className={cn(
                                "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                                selectedCountry?.code === c.code && "bg-[#323dfe]/5"
                              )}
                            >
                              <span className="text-xl">{c.flag}</span>
                              <span className="text-sm text-gray-900">{c.name}</span>
                            </button>
                          </div>
                        ))}
                        {searchFilteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section Title */}
              <h3 className="text-xl font-semibold text-black mb-6">
                SMS Features and Capabilities in {selectedCountry.name}
              </h3>

              {/* Supported Number Types Section */}
              <div id="feature-number-types" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Supported Number Types</h4>
                {coveragePricingData && coveragePricingData.supportedNumberTypes.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {coveragePricingData.supportedNumberTypes.map((numberType) => (
                      <span
                        key={numberType}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black"
                      >
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {numberType}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Contact support for available number types.</p>
                )}
              </div>

              {/* Features Section */}
              <div id="feature-features" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Features</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Sending SMS to Mobile Numbers</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.sendingToMobile}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sending SMS to Landline Numbers</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.sendingToLandline}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">SMS Concatenation</td>
                        <td className="py-3 text-sm font-medium text-black">
                          {countryDetails.features.smsConcatenation}
                          {countryDetails.features.smsConcatenationNote && (
                            <p className="text-xs text-gray-500 mt-1">{countryDetails.features.smsConcatenationNote}</p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Two-Way SMS</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.twoWaySms}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Powerpack</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.powerpack}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Regulations Section */}
              <div id="feature-regulations" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Regulations</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Sender ID Type</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.senderIdType}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sender ID Regulations</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.senderIdRegulations}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Registration Requirements</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.registrationRequirements}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Content Restrictions</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.contentRestrictions}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Consent Requirements</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.consentRequirements}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Opt-Out Requirements</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.optOutRequirements}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Compliance Notes</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.complianceNotes}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deliverability Section */}
              <div id="feature-deliverability" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Deliverability</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Delivery Report Type and Origin</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.deliveryReportType}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Delivery Report Reliability</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.deliveryReportReliability}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sender IDs Provisioning Time</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.senderIdProvisioningTime}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sender IDs Registration Charges</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.senderIdRegistrationCharges}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Numeric Sender IDs supported?</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.numericSenderIdSupported}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verify Coverage Section */}
              <div id="feature-verify-coverage" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Verify Coverage</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Servicability</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.verifyCoverage.servicability}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">SID Used</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.verifyCoverage.sidUsed}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Content maintained</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.verifyCoverage.contentMaintained}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Country Specs Section */}
              <div id="feature-country-specs" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Country Specs</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 pr-4 text-left text-sm font-semibold text-black">ISO Code</th>
                        <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Country Code</th>
                        <th className="py-3 text-left text-sm font-semibold text-black">MCC (Mobile Country Code)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 pr-4 text-sm font-medium text-black">{countryDetails.countrySpecs.isoCode}</td>
                        <td className="py-3 pr-4 text-sm font-medium text-black">{countryDetails.countrySpecs.countryCode}</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.countrySpecs.mcc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pricing Section */}
              <div id="feature-pricing" className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-2">Pricing</h4>
                <p className="text-xs text-gray-500 mb-4">*Additional carrier charges may apply to outbound & inbound SMS rates.</p>
                {coveragePricingData && coveragePricingData.pricingRows.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Route Type</th>
                            <th className="py-3 pr-4 text-left text-sm font-semibold text-black">To send SMS (Outbound)</th>
                            <th className="py-3 text-left text-sm font-semibold text-black">To receive SMS (Inbound)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {coveragePricingData.pricingRows.map((row, i) => (
                            <tr key={i}>
                              <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                              <td className="py-3 pr-4 text-sm font-medium text-black">
                                {formatCoveragePrice(row.outbound, row.type)}
                              </td>
                              <td className="py-3 text-sm font-medium text-black">
                                {formatCoveragePrice(row.inbound, row.type)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <a
                      href={`/sms/pricing/${selectedCountry.code.toLowerCase()}/`}
                      className="mt-4 inline-flex text-sm font-medium text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors"
                    >
                      View detailed pricing
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    <a
                      href="/contact/sales/"
                      className="font-medium text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors"
                    >
                      Contact sales
                    </a>{" "}
                    for pricing details in {selectedCountry.name}.
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-4">
                  Rates are subject to change. Contact sales for volume discounts and enterprise pricing.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
