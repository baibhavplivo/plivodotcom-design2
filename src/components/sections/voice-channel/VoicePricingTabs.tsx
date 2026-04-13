"use client";

import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TOP_COUNTRIES,
  VOICE_CALCULATOR_DATA,
  getFlagEmoji,
  hasNumberCoverage,
  hasTollfreeSupport,
} from "@/data/pricing-data";
import type {
  CountryListItem,
  VoiceRates,
} from "@/data/pricing-data";
import {
  VOICE_PRICING_CACHE,
  VOICE_PRICING_COUNTRY_NAMES,
} from "@/data/voice-pricing-cache";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import type { VoiceNetworkRate } from "@/hooks/useCountryPricing";

const INDIA_REQUIREMENTS_URL =
  "https://support.plivo.com/hc/en-us/articles/45875255505305-Requirements-for-Sending-SMS-and-Calls-to-India";
const RECORDING_STORAGE_URL =
  "https://support.plivo.com/hc/en-us/articles/20048101619353-Does-Plivo-charge-for-recording-storage";
const SECTION_HEADING_CLASS =
  "font-sans text-xl font-semibold text-black mb-2";
const SECTION_DESCRIPTION_CLASS = "mb-6 text-sm text-gray-500";
const INLINE_LINK_CLASS =
  "font-medium text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors";
const TEXT_LINK_CLASS =
  "text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors";

type SectionId =
  | "voice-calls"
  | "phone-number-rental"
  | "add-on-services"
  | "detailed-pricing";

type PhoneRentalType = "local" | "tollfree" | "mobile" | "national";

type PhoneRentalRow = {
  displayRate: string;
  type: PhoneRentalType;
};

// Rental rates must match the Numbers pricing page (phone-number-pricing-cache.ts)
// Coverage source: "Plivo Phone Number Coverage" spreadsheet
const VOICE_PHONE_RENTAL_RATES: Partial<
  Record<string, Partial<Record<PhoneRentalType, string>>>
> = {
  AE: { tollfree: "$50.00/month" },
  AU: {
    local: "$2.50/month",
    mobile: "$5.00/month",
    tollfree: "$12.00/month",
  },
  BR: { local: "$6.17/month", tollfree: "$30.00/month" },
  CA: { local: "$0.75/month", tollfree: "$1.00/month" },
  GB: { local: "$0.85/month", mobile: "$0.90/month" },
  IN: { local: "₹250/month" },
  NZ: { local: "$2.55/month", tollfree: "$34.00/month" },
  SG: { local: "$16.00/month" },
  US: { local: "$0.50/month", tollfree: "$1.00/month" },
};

const VOICE_COUNTRY_PRIORITY_INDEX = new Map(
  TOP_COUNTRIES.map((country, index) => [country.code, index]),
);

const VOICE_COUNTRIES: CountryListItem[] = Object.entries(
  VOICE_PRICING_COUNTRY_NAMES,
)
  .map(([code, name]) => ({
    code,
    name,
    flag: TOP_COUNTRIES.find((country) => country.code === code)?.flag || getFlagEmoji(code),
    isPriority: VOICE_COUNTRY_PRIORITY_INDEX.has(code),
  }))
  .sort((left, right) => {
    const leftPriority = VOICE_COUNTRY_PRIORITY_INDEX.get(left.code);
    const rightPriority = VOICE_COUNTRY_PRIORITY_INDEX.get(right.code);

    if (leftPriority != null && rightPriority != null) {
      return leftPriority - rightPriority;
    }
    if (leftPriority != null) return -1;
    if (rightPriority != null) return 1;
    return left.name.localeCompare(right.name);
  });

function getSections(
  hasPhoneNumbers: boolean,
  hasDestinationRates: boolean,
): { id: SectionId; label: string }[] {
  const sections: { id: SectionId; label: string }[] = [
    { id: "voice-calls", label: "Voice Calls" },
  ];

  if (hasPhoneNumbers) {
    sections.push({ id: "phone-number-rental", label: "Phone Number Rental" });
  }

  sections.push({ id: "add-on-services", label: "Add-On Services" });

  if (hasDestinationRates) {
    sections.push({
      id: "detailed-pricing",
      label: "Detailed Network Pricing",
    });
  }

  return sections;
}

const Shimmer = () => (
  <span className="inline-block h-4 w-20 animate-pulse rounded bg-gray-100" />
);

function getVoicePricingDescription() {
  return "Competitive pay-as-you-go voice pricing. Compare country-specific calling, number rental, and add-on costs as you scale.";
}

function getPhoneRentalRows(countryCode: string): PhoneRentalRow[] {
  const countryRates = VOICE_PHONE_RENTAL_RATES[countryCode];
  if (!countryRates) return [];

  const typeOrder: PhoneRentalType[] = [
    "local",
    "tollfree",
    "mobile",
    "national",
  ];

  return typeOrder
    .filter((type) => Boolean(countryRates[type]))
    .map((type) => ({
      displayRate: countryRates[type]!,
      type,
    }));
}

function resolveSelectedCountry(
  countries: CountryListItem[],
  preferredCode?: string,
) {
  if (!preferredCode) return countries[0];
  return countries.find((country) => country.code === preferredCode) || countries[0];
}

const VOICE_CALCULATOR_ENTRY_BY_CODE = new Map(
  VOICE_CALCULATOR_DATA.map((entry) => [entry.code, entry]),
);

export default function VoicePricingTabs({
  initialCountry,
}: {
  initialCountry?: string;
} = {}) {
  const { country: geoCountry } = useGeoCountry("US", { mode: "exact" });
  const resolvedInitialCountry = useMemo(
    () => resolveSelectedCountry(VOICE_COUNTRIES, initialCountry || geoCountry),
    [geoCountry, initialCountry],
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(
    resolvedInitialCountry,
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("voice-calls");
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pricingData = VOICE_PRICING_CACHE[selectedCountry.code] || null;
  const loading = false;
  const rates = pricingData?.voiceRates || null;
  // Filter out "from Plivo-XX numbers" entries (origination-specific rates not for public display)
  const destinationRates = (pricingData?.voiceDestinationRates || []).filter(
    (r) => !r.networkGroup.includes("from Plivo-"),
  );
  const phoneRentalRows = useMemo(
    () => getPhoneRentalRows(selectedCountry.code),
    [selectedCountry.code],
  );

  useEffect(() => {
    setSelectedCountry((currentCountry) =>
      currentCountry.code === resolvedInitialCountry.code
        ? currentCountry
        : resolvedInitialCountry,
    );

    if (!initialCountry && geoCountry) {
      const nextCountry = resolveSelectedCountry(VOICE_COUNTRIES, geoCountry);
      history.replaceState(
        {},
        "",
        `/voice/pricing/${nextCountry.code.toLowerCase()}/`,
      );
    }
  }, [geoCountry, initialCountry, resolvedInitialCountry]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return VOICE_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return VOICE_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sections = useMemo(
    () =>
      getSections(phoneRentalRows.length > 0, destinationRates.length > 0),
    [destinationRates.length, phoneRentalRows.length],
  );

  useEffect(() => {
    const handleScrollAndResize = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (const section of sectionElements) {
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          setActiveSection(section.id);
          break;
        }
      }

      if (
        window.innerWidth >= 1024 &&
        sidebarWrapperRef.current &&
        contentRef.current
      ) {
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
          return;
        }
      }

      setSidebarStyle({});
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [sections]);

  const handleCountryChange = (country: CountryListItem) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    setSearchQuery("");
    history.replaceState(
      {},
      "",
      `/voice/pricing/${country.code.toLowerCase()}/`,
    );
  };

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <section className="bg-white pb-10 pt-[56px] sm:pt-[64px] md:pt-[72px]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora mb-4 text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.5rem] md:text-[3rem]">
              Voice Pricing
            </h1>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
              {getVoicePricingDescription()}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[256px_1fr] lg:items-start lg:gap-8">
            <div ref={sidebarWrapperRef} className="mb-8 lg:mb-0">
              <aside className="z-30 bg-white" style={sidebarStyle}>
                <div className="relative mb-6" ref={dropdownRef}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Select Country
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen((open) => !open)}
                    className="flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:border-gray-400"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="flex-1 text-left text-sm font-medium text-gray-900">
                      {selectedCountry.name}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform",
                        isCountryOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 flex max-h-72 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="border-b border-gray-100 p-2">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto">
                        {filteredCountries.map((country, index) => (
                          <div key={country.code}>
                            {!country.isPriority &&
                              index > 0 &&
                              filteredCountries[index - 1]?.isPriority && (
                                <div className="my-1 border-t border-gray-200" />
                              )}
                            <button
                              type="button"
                              onClick={() => handleCountryChange(country)}
                              className={cn(
                                "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-gray-50",
                                selectedCountry.code === country.code &&
                                  "bg-[#323dfe]/5",
                              )}
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="text-sm text-gray-900">
                                {country.name}
                              </span>
                            </button>
                          </div>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <nav className="hidden lg:block">
                  <p className="mb-3 text-sm font-medium text-gray-700">
                    Jump to section
                  </p>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full border-l-2 px-3 py-2 text-left text-sm transition-colors",
                            activeSection === section.id
                              ? "border-[#323dfe] font-medium text-[#323dfe]"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900",
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

            <div ref={contentRef} className="min-w-0">
              <div
                id="voice-calls"
                className="mb-6 rounded-xl border border-gray-200 bg-white p-6"
              >
                <VoiceCallRatesSection
                  countryCode={selectedCountry.code}
                  hasDestinationRates={destinationRates.length > 0}
                  loading={loading}
                  rates={rates}
                />
              </div>

              {phoneRentalRows.length > 0 && (
                <div
                  id="phone-number-rental"
                  className="mb-6 rounded-xl border border-gray-200 bg-white p-6"
                >
                  <PhoneRentalSection
                    loading={loading}
                    phoneRates={phoneRentalRows}
                  />
                </div>
              )}

              <div
                id="add-on-services"
                className="mb-6 rounded-xl border border-gray-200 bg-white p-6"
              >
                <AddOnsSection
                  countryCode={selectedCountry.code}
                  loading={loading}
                />
              </div>

              {destinationRates.length > 0 && (
                <div
                  id="detailed-pricing"
                  className="mb-6 rounded-xl border border-gray-200 bg-white p-6"
                >
                  <DestinationRatesSection
                    countryCode={selectedCountry.code}
                    loading={loading}
                    rates={destinationRates}
                  />
                </div>
              )}

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <VoiceCostCalculator
                  initialCountryCode={selectedCountry.code}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function VoiceCallRatesSection({
  countryCode,
  hasDestinationRates,
  loading,
  rates,
}: {
  countryCode: string;
  hasDestinationRates: boolean;
  loading: boolean;
  rates: VoiceRates | null;
}) {
  const isIndia = countryCode === "IN";
  const { convertPriceString } = useExchangeRate();

  function renderRate(
    value: string | undefined,
    options?: { linkToDetails?: boolean; forceFree?: boolean },
  ) {
    if (loading) return <Shimmer />;

    if (options?.forceFree) {
      return <span className="text-sm font-medium text-black">Free</span>;
    }

    if (!value || value === "Not Supported") {
      return <span className="text-sm text-gray-400">Not Supported</span>;
    }

    const hasStartsAt = value.startsWith("Starts at ");
    const normalizedValue = hasStartsAt
      ? value.replace(/^Starts at /, "")
      : value;

    return (
      <div>
        {hasStartsAt && <div className="text-xs text-gray-500">Starts at</div>}
        <div className="text-sm font-medium text-black">
          {convertPriceString(normalizedValue, countryCode)}
        </div>
        {options?.linkToDetails && (
          <a
            href="#detailed-pricing"
            className={`mt-1 inline-block text-xs font-medium ${TEXT_LINK_CLASS}`}
          >
            View detailed network pricing
          </a>
        )}
      </div>
    );
  }

  const hasCoverage = hasNumberCoverage(countryCode);
  const hasTF = hasTollfreeSupport(countryCode);

  // Mask inbound rates for countries without number coverage
  const effectiveLocalInbound = hasCoverage ? rates?.localInbound : "Not Supported";
  const effectiveMobileInbound = hasCoverage ? rates?.mobileInbound : "Not Supported";
  const effectiveTollfreeInbound = hasCoverage && hasTF ? rates?.tollfreeInbound : "Not Supported";
  const effectiveTollfreeOutbound = hasTF ? rates?.tollfreeOutbound : "Not Supported";

  const showMobile =
    rates?.mobileOutbound !== "Not Supported" ||
    effectiveMobileInbound !== "Not Supported";
  const showTollfree =
    effectiveTollfreeOutbound !== "Not Supported" ||
    effectiveTollfreeInbound !== "Not Supported";

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Voice Calls</h2>
      {!isIndia && (
        <p className={SECTION_DESCRIPTION_CLASS}>
          We also support WhatsApp Calls. Check detailed pricing{" "}
          <a href="/whatsapp-message/pricing/" className={INLINE_LINK_CLASS}>
            here
          </a>
        </p>
      )}
      {isIndia && (
        <p className={SECTION_DESCRIPTION_CLASS}>
          Per-minute rates for calling within India and supported inbound voice
          routes.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[40%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Route Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">
                To Make Calls (Outbound)
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                To Receive Calls (Inbound)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Local Calls</td>
              <td className="py-3 pr-4">
                {renderRate(rates?.localOutbound, {
                  linkToDetails: !isIndia && hasDestinationRates,
                })}
              </td>
              <td className="py-3">{renderRate(effectiveLocalInbound)}</td>
            </tr>
            {showMobile && (
              <tr>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  Mobile Calls
                </td>
                <td className="py-3 pr-4">
                  {renderRate(rates?.mobileOutbound)}
                </td>
                <td className="py-3">{renderRate(effectiveMobileInbound)}</td>
              </tr>
            )}
            {showTollfree && (
              <tr>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  Toll-Free Calls
                </td>
                <td className="py-3 pr-4">
                  {renderRate(effectiveTollfreeOutbound)}
                </td>
                <td className="py-3">{renderRate(effectiveTollfreeInbound)}</td>
              </tr>
            )}
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">
                Browser SDK and SIP Calls
              </td>
              <td className="py-3 pr-4">{renderRate(rates?.ipOutbound)}</td>
              <td className="py-3">{renderRate(hasCoverage ? rates?.ipInbound : "Not Supported")}</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">
                Audio streaming & noise cancellation
              </td>
              <td className="py-3 pr-4">
                <span className="text-sm font-medium text-black">Included</span>
              </td>
              <td className="py-3">
                <span className="text-sm font-medium text-black">Included</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {isIndia && (
        <div className="mt-5 rounded-lg bg-gray-50 p-4">
          <a
            href={INDIA_REQUIREMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium ${TEXT_LINK_CLASS}`}
          >
            FAQ - Requirements for Sending SMS and Calls to India
          </a>
        </div>
      )}
    </div>
  );
}

function formatPhoneType(type: string) {
  const normalizedType = (type || "").toLowerCase();
  if (normalizedType === "local") return "Local Numbers";
  if (normalizedType === "tollfree") return "Toll-Free Numbers";
  if (normalizedType === "mobile") return "Mobile Numbers";
  if (normalizedType === "national") return "National Numbers";
  if (normalizedType === "shortcode") return "Short Codes";
  return type
    ? `${type.charAt(0).toUpperCase()}${type.slice(1)} Numbers`
    : "Numbers";
}

function PhoneRentalSection({
  loading,
  phoneRates,
}: {
  loading: boolean;
  phoneRates: PhoneRentalRow[];
}) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Phone Number Rental</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Monthly rental rates for available voice-enabled phone number types.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Route Type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {phoneRates.map((phoneRate, index) => (
              <tr key={`${phoneRate.type}-${index}`}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {formatPhoneType(phoneRate.type)}
                </td>
                <td className="py-3 text-sm font-medium text-black">
                  {loading ? <Shimmer /> : phoneRate.displayRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DestinationRatesSection({
  countryCode,
  loading,
  rates,
}: {
  countryCode: string;
  loading: boolean;
  rates: VoiceNetworkRate[];
}) {
  const { convertPriceString } = useExchangeRate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h2 className={SECTION_HEADING_CLASS}>Detailed Network Pricing</h2>
        <p className="text-sm text-gray-500">
          Pricing per network group -{" "}
          <span className="font-semibold text-black">Outbound calls</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Network Group
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Pricing
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td className="py-3 pr-4">
                  <Shimmer />
                </td>
                <td className="py-3">
                  <Shimmer />
                </td>
              </tr>
            ) : (
              rates.map((entry, index) => (
                <Fragment key={`${entry.networkGroup}-${index}`}>
                  <tr>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-900">
                        {entry.networkGroup}
                      </span>
                      {entry.destinationPrefixes.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedIndex((current) =>
                              current === index ? null : index,
                            )
                          }
                          className={`ml-2 text-xs font-medium ${TEXT_LINK_CLASS}`}
                        >
                          {expandedIndex === index
                            ? "Hide Prefixes"
                            : "View Prefixes"}
                        </button>
                      )}
                    </td>
                    <td className="py-3 text-sm font-medium text-black">
                      {convertPriceString(entry.rate, countryCode)}
                    </td>
                  </tr>
                  {expandedIndex === index &&
                    entry.destinationPrefixes.length > 0 && (
                      <tr>
                        <td colSpan={2} className="px-2 pb-3">
                          <div className="flex flex-wrap gap-1.5 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                            {entry.destinationPrefixes.map(
                              (prefix, prefixIndex) => (
                                <span
                                  key={`${prefix}-${prefixIndex}`}
                                  className="rounded border border-gray-200 bg-white px-2 py-0.5"
                                >
                                  {prefix}
                                </span>
                              ),
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddOnsSection({
  countryCode,
  loading,
}: {
  countryCode: string;
  loading: boolean;
}) {
  const isIndia = countryCode === "IN";
  const rows = getAddOnRows(countryCode);

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Add-On Services</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Per-minute and per-request fees for optional voice features and
        intelligence services.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Service
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {row.beta ? (
                    <div className="flex items-center gap-2">
                      <span>{row.label}</span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">
                        Beta
                      </span>
                    </div>
                  ) : (
                    row.label
                  )}
                </td>
                <td className="py-3 text-sm font-medium text-black">
                  {loading ? (
                    <Shimmer />
                  ) : row.tiers ? (
                    <div className="space-y-2">
                      {row.tiers.map((tier) => (
                        <div key={tier.label}>
                          <div className="text-xs text-gray-500">
                            {tier.label}
                          </div>
                          <div>{tier.value}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    row.value
                  )}
                </td>
              </tr>
            ))}
            {!isIndia && (
              <tr>
                <td className="py-3 pr-4 text-sm text-gray-900">CNAM Lookup</td>
                <td className="py-3 text-sm font-medium text-black">
                  {loading ? <Shimmer /> : "$0.00500/lookup"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        * Free for 90 days. $0.0004/min per month afterwards.{" "}
        <a
          href={RECORDING_STORAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={INLINE_LINK_CLASS}
        >
          Read More.
        </a>
      </p>
    </div>
  );
}

function getAddOnRows(countryCode: string) {
  if (countryCode === "IN") {
    return [
      { label: "Answering Machine Detection", value: "₹0.0000/min" },
      {
        label: "Call Insights",
        beta: true,
        tiers: [
          { label: "Basic", value: "₹0.0000/min" },
          { label: "Premium", value: "₹0.22/min" },
        ],
      },
      { label: "Call Recording", value: "₹0.0000/min" },
      { label: "Recording Storage *", value: "₹0.0000/min" },
      { label: "Automatic Speech Recognition", value: "₹1.7/ 15 seconds" },
      { label: "Call Transcription", value: "₹0.81/min" },
      { label: "Conference Calls", value: "₹0.0000/min" },
      { label: "Multilingual Text to Speech", value: "₹0.0000/min" },
    ];
  }

  return [
    { label: "Answering Machine Detection", value: "$0.0000/min" },
    {
      label: "Call Insights",
      beta: true,
      tiers: [
        { label: "Basic", value: "$0.0000/min" },
        { label: "Premium", value: "$0.0025/min" },
      ],
    },
    { label: "Call Recording", value: "$0.0000/min" },
    { label: "Recording Storage *", value: "$0.0000/min" },
    { label: "Automatic Speech Recognition", value: "$0.02/ 15 seconds" },
    { label: "Call Transcription", value: "$0.0095/min" },
    { label: "Conference Calls", value: "$0.0000/min" },
    { label: "Multilingual Text to Speech", value: "$0.0000/min" },
  ];
}

function VoiceCostCalculator({
  initialCountryCode,
}: {
  initialCountryCode: string;
}) {
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(() =>
    resolveSelectedCountry(VOICE_COUNTRIES, initialCountryCode),
  );
  const [volume, setVolume] = useState(100000);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { convertToINR } = useExchangeRate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calculatorEntry = useMemo(
    () => VOICE_CALCULATOR_ENTRY_BY_CODE.get(selectedCountry.code) || null,
    [selectedCountry.code],
  );

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return VOICE_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return VOICE_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  useEffect(() => {
    setSelectedCountry(resolveSelectedCountry(VOICE_COUNTRIES, initialCountryCode));
  }, [initialCountryCode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isIndia = selectedCountry.code === "IN";
  const isComparisonAvailable = Boolean(calculatorEntry);
  const currency = isIndia ? "₹" : "$";
  const multiplier = volume / 100000;
  const rawOtherCost = (calculatorEntry?.others || 0) * multiplier;
  const rawPlivoCost = (calculatorEntry?.plivo || 0) * multiplier;
  const otherCost = isIndia ? convertToINR(rawOtherCost) : rawOtherCost;
  const plivoCost = isIndia ? convertToINR(rawPlivoCost) : rawPlivoCost;
  const savings = otherCost - plivoCost;
  const savingsPercent =
    otherCost > 0 ? Math.round((savings / otherCost) * 100) : 0;
  const maxCost = Math.max(otherCost, plivoCost);

  const formatCurrency = (value: number) =>
    `${currency}${value.toLocaleString(isIndia ? "en-IN" : "en-US", {
      maximumFractionDigits: 0,
    })}`;

  return (
    <div>
      <div className="mb-6">
        <h2 className={SECTION_HEADING_CLASS}>Voice Price Calculator</h2>
        <p className="text-sm text-gray-500">
          Cost comparison for{" "}
          <span className="font-semibold text-black">{volume.toLocaleString()}</span>{" "}
          calling mins in{" "}
          <span className="font-semibold text-black">{selectedCountry.name}</span>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="relative mb-5" ref={dropdownRef}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Pricing Geography
            </label>
            <button
              type="button"
              onClick={() => setIsCountryOpen((open) => !open)}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:border-gray-400"
            >
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="flex-1 text-left text-sm font-medium text-gray-900">
                {selectedCountry.name}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gray-400 transition-transform",
                  isCountryOpen && "rotate-180",
                )}
              />
            </button>

            {isCountryOpen && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 flex max-h-72 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="border-b border-gray-100 p-2">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto">
                  {filteredCountries.map((country, index) => (
                    <div key={country.code}>
                      {!country.isPriority &&
                        index > 0 &&
                        filteredCountries[index - 1]?.isPriority && (
                          <div className="my-1 border-t border-gray-200" />
                        )}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                          setSearchQuery("");
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-gray-50",
                          selectedCountry.code === country.code &&
                            "bg-[#323dfe]/5",
                        )}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm text-gray-900">
                          {country.name}
                        </span>
                      </button>
                    </div>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Monthly call volume:{" "}
              <span className="font-semibold text-black">
                {volume.toLocaleString()} minutes
              </span>
            </label>
            <input
              type="range"
              min={100000}
              max={600000}
              step={100000}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-[#323dfe]"
              style={{
                background: `linear-gradient(to right, #323dfe ${((volume - 100000) / 500000) * 100}%, #e5e7eb ${((volume - 100000) / 500000) * 100}%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>100K</span>
              <span>600K</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isComparisonAvailable ? (
            <>
              <div className="space-y-4">
                <CostComparisonBar
                  label="Other Platforms"
                  value={formatCurrency(otherCost)}
                  width={maxCost > 0 ? (otherCost / maxCost) * 100 : 0}
                  barClassName="bg-gray-400"
                  labelClassName="text-gray-600"
                />
                <CostComparisonBar
                  label="Plivo"
                  value={formatCurrency(plivoCost)}
                  width={maxCost > 0 ? (plivoCost / maxCost) * 100 : 0}
                  barClassName="bg-[#323dfe]"
                  labelClassName="text-black"
                />
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black" />
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">
                        Voice Cost
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-black">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Other Platforms
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-black">
                        {formatCurrency(otherCost)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-black">
                        {formatCurrency(otherCost)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Plivo</td>
                      <td className="px-4 py-3 text-sm font-medium text-black">
                        {formatCurrency(plivoCost)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-black">
                        {formatCurrency(plivoCost)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-gray-500">
                  Savings with Plivo
                </div>
                <div className="font-sora text-[2rem] font-normal leading-none tracking-[-0.02em] text-black">
                  {formatCurrency(savings)}
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  With Plivo, you save over{" "}
                  <span className="font-semibold text-black">
                    {savingsPercent}%
                  </span>{" "}
                  of costs compared to other platforms for every{" "}
                  <span className="font-semibold text-black">
                    {volume.toLocaleString()}
                  </span>{" "}
                  <span className="font-semibold text-black">mins called.</span>
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm text-gray-600">
                Live calculator comparison data is currently available for
                select geographies only. No comparison data is available for{" "}
                <span className="font-semibold text-black">
                  {selectedCountry.name}
                </span>{" "}
                yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CostComparisonBar({
  barClassName,
  label,
  labelClassName,
  value,
  width,
}: {
  barClassName: string;
  label: string;
  labelClassName: string;
  value: string;
  width: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className={cn("text-sm font-medium", labelClassName)}>
          {label}
        </span>
        <span className={cn("text-sm font-semibold", labelClassName)}>
          {value}
        </span>
      </div>
      <div className="h-8 overflow-hidden rounded-md bg-gray-100">
        <div
          className={cn(
            "h-full rounded-md transition-all duration-500",
            barClassName,
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
