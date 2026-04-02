"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ChevronDown } from "lucide-react";

import { useGeoCountry } from "@/hooks/useGeoCountry";
import { cn } from "@/lib/utils";
import {
  WHATSAPP_CALL_COUNTRIES,
  WHATSAPP_CALL_DEFAULT_COUNTRY_CODE,
  WHATSAPP_CALL_PAGE_COPY,
  WHATSAPP_CALL_ADD_ONS_INR_NOTE,
  WHATSAPP_CALL_ADD_ONS_USD_NOTE,
  formatWhatsAppCallRate,
  getWhatsAppCallAddOns,
  getWhatsAppCallCountry,
  getWhatsAppCallPhoneRates,
  type WhatsAppCallAddOnRow,
  type WhatsAppCallPhoneRate,
  type WhatsAppCallPricingValue,
} from "@/data/whatsapp-call-pricing";

type SectionId = "whatsapp-calling" | "phone-numbers" | "add-ons";

const DEFAULT_COUNTRY =
  getWhatsAppCallCountry(WHATSAPP_CALL_DEFAULT_COUNTRY_CODE) ?? WHATSAPP_CALL_COUNTRIES[0];

function getSections(hasPhoneNumbers: boolean): { id: SectionId; label: string }[] {
  const sections: { id: SectionId; label: string }[] = [
    { id: "whatsapp-calling", label: "WhatsApp Calling" },
  ];

  if (hasPhoneNumbers) {
    sections.push({ id: "phone-numbers", label: "Phone Number Rental" });
  }

  sections.push({ id: "add-ons", label: "Add-On Services" });
  return sections;
}

export default function WhatsAppCallPricing({
  initialCountry,
}: {
  initialCountry?: string;
}) {
  const { country: geoCountry } = useGeoCountry(
    WHATSAPP_CALL_DEFAULT_COUNTRY_CODE,
    { mode: "exact" },
  );
  const resolvedInitialCountry = useMemo(
    () => getWhatsAppCallCountry(initialCountry || geoCountry) ?? DEFAULT_COUNTRY,
    [geoCountry, initialCountry],
  );
  const [selectedCountry, setSelectedCountry] = useState(resolvedInitialCountry);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("whatsapp-calling");
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCountry((currentCountry) =>
      currentCountry.code === resolvedInitialCountry.code
        ? currentCountry
        : resolvedInitialCountry,
    );

    if (!initialCountry && geoCountry) {
      const nextCountry = getWhatsAppCallCountry(geoCountry) ?? DEFAULT_COUNTRY;
      history.replaceState(
        {},
        "",
        `/whatsapp-call/pricing/${nextCountry.code.toLowerCase()}/`,
      );
    }
  }, [geoCountry, initialCountry, resolvedInitialCountry]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return WHATSAPP_CALL_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return WHATSAPP_CALL_COUNTRIES.filter(
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

  const phoneRates = getWhatsAppCallPhoneRates(selectedCountry.code) ?? [];
  const addOns = getWhatsAppCallAddOns(selectedCountry.code);
  const sections = useMemo(() => getSections(phoneRates.length > 0), [phoneRates.length]);

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

  const handleCountryChange = (
    country: (typeof WHATSAPP_CALL_COUNTRIES)[number],
  ) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    setSearchQuery("");
    history.replaceState(
      {},
      "",
      `/whatsapp-call/pricing/${country.code.toLowerCase()}/`,
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
            <h1 className="mb-4 font-sora text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.5rem] md:text-[3rem]">
              {WHATSAPP_CALL_PAGE_COPY.title}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              {WHATSAPP_CALL_PAGE_COPY.subtitle}
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
                    {WHATSAPP_CALL_PAGE_COPY.countrySelectorLabel}
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsCountryOpen((open) => !open)}
                    className="flex w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left transition-colors hover:border-gray-400"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="flex-1 text-sm font-medium text-gray-900">
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
                    {WHATSAPP_CALL_PAGE_COPY.sectionNavLabel}
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
                id="whatsapp-calling"
                className="mb-6 rounded-xl border border-gray-200 bg-white p-6 scroll-mt-32"
              >
                <WhatsAppCallingSection pricing={selectedCountry.pricing} />
              </div>

              {phoneRates.length > 0 && (
                <div
                  id="phone-numbers"
                  className="mb-6 rounded-xl border border-gray-200 bg-white p-6 scroll-mt-32"
                >
                  <PhoneNumbersSection phoneRates={phoneRates} />
                </div>
              )}

              <div
                id="add-ons"
                className="rounded-xl border border-gray-200 bg-white p-6 scroll-mt-32"
              >
                <AddOnServicesSection
                  addOns={addOns}
                  isIndia={selectedCountry.code === "IN"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsAppCallingSection({
  pricing,
}: {
  pricing: WhatsAppCallPricingValue;
}) {
  const rows = [
    { label: "Inbound", price: formatWhatsAppCallRate(pricing.inbound) },
    { label: "Outbound", price: formatWhatsAppCallRate(pricing.outbound) },
    { label: "Audio streaming (per stream)", price: "Free" },
  ];

  return (
    <div>
      <h2 className="mb-2 font-sans text-xl font-semibold text-black">
        {WHATSAPP_CALL_PAGE_COPY.callingSectionTitle}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Call Type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Price per minute
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                <td className="py-3 text-sm font-medium text-black">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PhoneNumbersSection({
  phoneRates,
}: {
  phoneRates: WhatsAppCallPhoneRate[];
}) {
  return (
    <div>
      <h2 className="mb-6 font-sans text-xl font-semibold text-black">
        {WHATSAPP_CALL_PAGE_COPY.phoneNumbersTitle}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Route Type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {phoneRates.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                <td className="py-3 text-sm font-medium text-black">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddOnServicesSection({
  addOns,
  isIndia,
}: {
  addOns: WhatsAppCallAddOnRow[];
  isIndia: boolean;
}) {
  const note = isIndia ? WHATSAPP_CALL_ADD_ONS_INR_NOTE : WHATSAPP_CALL_ADD_ONS_USD_NOTE;

  return (
    <div>
      <h2 className="mb-2 font-sans text-xl font-semibold text-black">
        {WHATSAPP_CALL_PAGE_COPY.addOnsTitle}
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        {note}{" "}
        {isIndia && (
          <a
            href={WHATSAPP_CALL_PAGE_COPY.recordingStorageSupportHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#323dfe] hover:underline"
          >
            Read More.
          </a>
        )}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Service
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {addOns.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 align-top">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <span>{row.label}</span>
                    {row.badge && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">
                        {row.badge}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 align-top">
                  {row.children ? (
                    <div className="space-y-3">
                      {row.children.map((child) => (
                        <div key={child.label}>
                          <div className="text-xs uppercase tracking-[0.08em] text-gray-500">
                            {child.label}
                          </div>
                          <div className="text-sm font-medium text-black">{child.price}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm font-medium text-black">{row.price}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
