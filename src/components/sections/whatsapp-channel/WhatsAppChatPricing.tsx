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
  WHATSAPP_CHAT_COUNTRIES,
  WHATSAPP_CHAT_DEFAULT_COUNTRY_CODE,
  WHATSAPP_CHAT_META_MESSAGE_TYPES,
  WHATSAPP_CHAT_PAGE_COPY,
  getWhatsAppChatCountry,
  type WhatsAppChatPricingValue,
} from "@/data/whatsapp-chat-pricing";

type SectionId = "messaging-rates" | "meta-message-types";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "messaging-rates", label: "Messaging Rates" },
  { id: "meta-message-types", label: "Meta Message Types" },
];

const DEFAULT_COUNTRY =
  getWhatsAppChatCountry(WHATSAPP_CHAT_DEFAULT_COUNTRY_CODE) ?? WHATSAPP_CHAT_COUNTRIES[0];

function formatRate(value: number, currency: string): string {
  if (value === 0) return `${currency}0/message`;
  return `${currency}${value.toFixed(4)}/message`;
}

export default function WhatsAppChatPricing({
  initialCountry,
}: {
  initialCountry?: string;
}) {
  const { country: geoCountry } = useGeoCountry(
    WHATSAPP_CHAT_DEFAULT_COUNTRY_CODE,
    { mode: "exact" },
  );
  const resolvedInitialCountry = useMemo(
    () => getWhatsAppChatCountry(initialCountry || geoCountry) ?? DEFAULT_COUNTRY,
    [geoCountry, initialCountry],
  );
  const [selectedCountry, setSelectedCountry] = useState(resolvedInitialCountry);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("messaging-rates");
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
      const nextCountry = getWhatsAppChatCountry(geoCountry) ?? DEFAULT_COUNTRY;
      history.replaceState(
        {},
        "",
        `/whatsapp-message/pricing/${nextCountry.code.toLowerCase()}/`,
      );
    }
  }, [geoCountry, initialCountry, resolvedInitialCountry]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return WHATSAPP_CHAT_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return WHATSAPP_CHAT_COUNTRIES.filter(
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

  useEffect(() => {
    const handleScrollAndResize = () => {
      const sectionElements = SECTIONS.map((section) => ({
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
  }, []);

  const handleCountryChange = (
    country: (typeof WHATSAPP_CHAT_COUNTRIES)[number],
  ) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    setSearchQuery("");
    history.replaceState(
      {},
      "",
      `/whatsapp-message/pricing/${country.code.toLowerCase()}/`,
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
      <section className="bg-background border-t border-border pb-10 pt-[56px] sm:pt-[64px] md:pt-[72px]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
            <span className="flex items-center gap-2">
              <span className="tabular-nums text-foreground/70">~</span>
              <span className="h-px w-6 bg-border" />
            </span>
            <span>whatsapp pricing</span>
            <span className="flex-1 border-t border-dashed border-border" />
            <span>per-conversation · pay as you go</span>
          </div>
          <h1 className="font-sora text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              {WHATSAPP_CHAT_PAGE_COPY.title}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {WHATSAPP_CHAT_PAGE_COPY.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background border-t border-border pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[256px_1fr] lg:items-start lg:gap-8">
            <div ref={sidebarWrapperRef} className="mb-8 lg:mb-0">
              <aside className="z-30 bg-background" style={sidebarStyle}>
                <div className="relative mb-6" ref={dropdownRef}>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    {WHATSAPP_CHAT_PAGE_COPY.countrySelectorLabel}
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsCountryOpen((open) => !open)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border-strong bg-background px-4 py-2.5 text-left transition-colors hover:border-border-strong"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {selectedCountry.name}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isCountryOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 flex max-h-72 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm">
                      <div className="border-b border-border p-2">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          className="w-full rounded-md border border-border-strong bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gray-500 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto">
                        {filteredCountries.map((country, index) => (
                          <div key={country.code}>
                            {!country.isPriority &&
                              index > 0 &&
                              filteredCountries[index - 1]?.isPriority && (
                                <div className="my-1 border-t border-border" />
                              )}
                            <button
                              type="button"
                              onClick={() => handleCountryChange(country)}
                              className={cn(
                                "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-surface",
                                selectedCountry.code === country.code &&
                                  "bg-primary/5",
                              )}
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="text-sm text-foreground">
                                {country.name}
                              </span>
                            </button>
                          </div>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-muted-foreground">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <nav className="hidden lg:block">
                  <p className="mb-3 text-sm font-medium text-foreground/80">
                    {WHATSAPP_CHAT_PAGE_COPY.sectionNavLabel}
                  </p>
                  <ul className="space-y-1">
                    {SECTIONS.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full border-l-2 px-3 py-2 text-left text-sm transition-colors",
                            activeSection === section.id
                              ? "border-primary font-medium text-primary"
                              : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground",
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
                id="messaging-rates"
                className="mb-6 rounded-xl border border-border bg-background p-6 scroll-mt-32"
              >
                <MessagingRatesSection pricing={selectedCountry.pricing} />
              </div>

              <div
                id="meta-message-types"
                className="rounded-xl border border-border bg-background p-6 scroll-mt-32"
              >
                <MetaMessageTypesSection />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MessagingRatesSection({ pricing }: { pricing: WhatsAppChatPricingValue }) {
  const rows = [
    { label: "Marketing", value: pricing.marketing },
    { label: "Utility", value: pricing.utility },
    { label: "Authentication", value: pricing.authentication },
    { label: "Authentication - International", value: pricing.authenticationIntl },
    { label: "Service", value: pricing.service },
  ].filter((row) => row.label !== "Authentication - International" || row.value > 0);

  return (
    <div>
      <h2 className="mb-2 font-sans text-xl font-semibold text-foreground">
        {WHATSAPP_CHAT_PAGE_COPY.messagingRatesTitle}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-foreground">
                Message type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-foreground">
                {WHATSAPP_CHAT_PAGE_COPY.pricingColumnLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-foreground">{row.label}</td>
                <td className="py-3 text-sm font-medium text-foreground">
                  {formatRate(row.value, pricing.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetaMessageTypesSection() {
  return (
    <div>
      <h2 className="mb-2 font-sans text-xl font-semibold text-foreground">
        {WHATSAPP_CHAT_PAGE_COPY.metaTypesTitle}
      </h2>
      <p className="mb-3 text-sm text-muted-foreground">
        <a
          href={WHATSAPP_CHAT_PAGE_COPY.metaTypesIntroHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {WHATSAPP_CHAT_PAGE_COPY.metaTypesIntroLabel}
        </a>{" "}
        as either utility, marketing, or authentication, depending on message content.
      </p>
      <p className="mb-6 text-sm text-muted-foreground">
        <span className="font-medium text-foreground/80">Note:</span>{" "}
        Marketing, utility, and authentication conversations can only be opened with
        template messages. Service conversations can be opened with any type of message
        other than a template message.{" "}
        <a
          href={WHATSAPP_CHAT_PAGE_COPY.metaTypesCtaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {WHATSAPP_CHAT_PAGE_COPY.metaTypesCtaLabel}
        </a>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="w-[30%] py-3 pr-4 text-left text-sm font-semibold text-foreground">
                Message type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-foreground">Definition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {WHATSAPP_CHAT_META_MESSAGE_TYPES.map((item) => (
              <tr key={item.type}>
                <td className="py-3 pr-4 align-top text-sm font-medium text-foreground">
                  {item.type}
                </td>
                <td className="py-3 text-sm text-muted-foreground">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
