"use client";

import {
  Component,
  type CSSProperties,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import type { CachedPricingData } from "@/data/pricing-cache";
import {
  SMS_ADD_ON_SERVICES,
  SMS_CARRIER_SURCHARGE,
  SMS_MMS_RATES,
  SMS_PRICING_COUNTRIES,
  SMS_PRICING_HERO_COPY,
  SMS_PRICING_SUPPORT_URL,
  SMS_RCS_RATES,
  getSMSPricingData,
} from "@/data/sms-pricing-page";
import type {
  CarrierFeeGroup,
  MMSRateRow,
} from "@/data/sms-pricing-page";
import type { CountryListItem } from "@/data/pricing-data";

type SectionId =
  | "sms"
  | "rcs"
  | "mms"
  | "phone-numbers"
  | "add-on"
  | "additional-pricing";

interface SMSDisplayRow {
  label: string;
  outbound: string;
  inbound: string;
  showNetworkLink?: boolean;
}

interface PhoneDisplayChild {
  label: string;
  price: string;
}

interface PhoneDisplayRow {
  label: string;
  price?: string;
  muted?: boolean;
  children?: PhoneDisplayChild[];
}

interface PhoneSectionData {
  rows: PhoneDisplayRow[];
  note?: string;
}

type DetailSection =
  | {
      kind: "carrier";
      title: string;
      navLabel: string;
      groups: CarrierFeeGroup[];
    }
  | {
      kind: "network";
      title: string;
      navLabel: string;
      rows: { network: string; rate: string }[];
    };

const DEFAULT_COUNTRY_CODE = "US";
const INDIA_SMS_PRICE_MULTIPLIER = 80;
const INDIA_LIVE_SMS_ROWS: SMSDisplayRow[] = [
  {
    label: "Domestic",
    outbound: "₹0.20/sms",
    inbound: "Not Supported",
  },
  {
    label: "ILDO",
    outbound: "$0.0800/sms",
    inbound: "Not Supported",
    showNetworkLink: true,
  },
];
const INDIA_LIVE_PHONE_SECTION: PhoneSectionData = {
  rows: [{ label: "Long Codes", price: "$3.12500/month" }],
};
const SECTION_HEADING_CLASS = "font-sans text-xl font-semibold text-black mb-2";
const SECTION_DESCRIPTION_CLASS = "mb-6 text-sm text-gray-500";
const INLINE_LINK_CLASS =
  "font-medium text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors";
const TEXT_LINK_CLASS =
  "text-[#323dfe] hover:text-[#2832cc] hover:underline transition-colors";

class SMSPricingErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SMS pricing page failed to hydrate", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h1 className="font-sora text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
                SMS Pricing
              </h1>
              <p className="mt-4 max-w-2xl text-[1rem] text-gray-600 sm:text-[1.125rem]">
                We hit a client-side rendering issue on this pricing page.
                Please refresh, or contact support if the page keeps failing.
              </p>
              <p className="mt-4 text-sm text-gray-600">
                <a
                  href={SMS_PRICING_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#323dfe] hover:underline"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

function findCountry(code?: string) {
  if (!code) return null;
  return (
    SMS_PRICING_COUNTRIES.find((country) => country.code === code.toUpperCase()) ||
    null
  );
}

function toRouteLabel(type: string, countryCode: string) {
  if (type === "Longcode") {
    return countryCode === "US" || countryCode === "CA"
      ? "Long Codes*"
      : "Long Codes";
  }
  if (type === "Shortcode") {
    return countryCode === "US" || countryCode === "CA"
      ? "Short Code*"
      : "Short Code";
  }
  if (type === "Toll-Free") return "Toll-Free";
  if (type === "Mobile") return "Mobile Numbers";
  return type;
}

function formatMonthlyRate(value: number | string | null | undefined) {
  if (value == null) return "Not supported";
  if (typeof value === "string" && value.includes("$")) return value;

  const numeric = Number(value);
  if (Number.isNaN(numeric) || numeric <= 0) return "Not supported";

  return `$${numeric.toFixed(2)}/month`;
}

function phoneTypeRank(type: string) {
  const normalized = type.toLowerCase();
  if (normalized === "local") return 0;
  if (normalized === "national") return 1;
  if (normalized === "mobile") return 2;
  if (normalized === "tollfree") return 3;
  if (normalized === "shortcode") return 4;
  return 10;
}

function phoneTypeLabel(type: string) {
  const normalized = type.toLowerCase();
  if (normalized === "local") return "Local Numbers";
  if (normalized === "national") return "National Numbers";
  if (normalized === "mobile") return "Mobile Numbers";
  if (normalized === "tollfree") return "Toll-Free Numbers";
  if (normalized === "shortcode") return "Short Code";
  return type;
}

function renderValueClass(value: string) {
  if (/^(na|not supported|not supported\.)$/i.test(value.trim())) {
    return "text-gray-400";
  }
  return "text-black";
}

function deriveDetailSection(
  countryCode: string,
  pricingData: CachedPricingData,
): DetailSection | null {
  if (countryCode === "US" || countryCode === "CA") {
    return {
      kind: "carrier",
      title: "Additional carrier surcharge fees",
      navLabel: "Additional Carrier Surcharge Fees",
      groups: SMS_CARRIER_SURCHARGE[countryCode],
    };
  }

  if (countryCode === "IN") {
    const domesticRate =
      pricingData.smsRates.find((row) => row.type === "Domestic")
        ?.outbound || pricingData.smsOutbound;

    return {
      kind: "network",
      title: "Detailed Network Pricing",
      navLabel: "View Network Based Pricing",
      rows: [{ network: "All Networks", rate: domesticRate }],
    };
  }

  const networkRates = pricingData.smsNetworkRates || [];
  if (networkRates.length === 0) return null;

  const uniqueRates = new Set(networkRates.map((row) => row.rate));
  if (uniqueRates.size <= 1) return null;

  return {
    kind: "network",
    title: "Detailed Network Pricing — Outbound SMS",
    navLabel: "View Network Based Pricing",
    rows: networkRates,
  };
}

function deriveSMSRows(
  countryCode: string,
  pricingData: CachedPricingData,
  detailSection: DetailSection | null,
) {
  if (countryCode === "IN") {
    return INDIA_LIVE_SMS_ROWS.map((row) => ({
      ...row,
      showNetworkLink: detailSection?.kind === "network" && row.showNetworkLink,
    }));
  }

  return pricingData.smsRates.map((row, index) => ({
    label: toRouteLabel(row.type, countryCode),
    outbound: row.outbound,
    inbound: row.inbound,
    showNetworkLink:
      detailSection?.kind === "network" &&
      (row.type === "Longcode" || row.type === "International") &&
      index === pricingData.smsRates.findIndex(
        (candidate) =>
          candidate.type === "Longcode" || candidate.type === "International",
      ),
  }));
}

function derivePhoneSection(
  countryCode: string,
  pricingData: CachedPricingData,
): PhoneSectionData | null {
  if (countryCode === "US") {
    return {
      note: "All short codes have a $1,500 one-time fee charged at the time of purchase.",
      rows: [
        { label: "Long Codes", price: "$0.50/month" },
        { label: "Toll-Free Numbers", price: "$1.00/month" },
        {
          label: "Short Code",
          children: [
            { label: "Regular", price: "$500/month (Billed quarterly)" },
            { label: "Vanity", price: "$1,000/month (Billed quarterly)" },
          ],
        },
      ],
    };
  }

  if (countryCode === "CA") {
    return {
      note: "All short codes have a $4,000 one-time fee charged at the time of purchase.",
      rows: [
        { label: "Long Codes", price: "$0.75/month" },
        { label: "Toll-Free Numbers", price: "$1.00/month" },
        {
          label: "Short Code",
          children: [
            { label: "Standard", price: "$700/month (Billed every 4 months)" },
          ],
        },
      ],
    };
  }

  if (countryCode === "IN") {
    return INDIA_LIVE_PHONE_SECTION;
  }

  const smsEnabled = pricingData.phoneNumbers
    .filter((phoneNumber) => {
      const status = phoneNumber.status?.toUpperCase();
      const rentalRate = Number(phoneNumber.rentalRate ?? 0);
      return (
        (status === "GA" || status === "BETA") &&
        rentalRate > 0 &&
        phoneNumber.capabilities.includes("sms")
      );
    })
    .sort((left, right) => phoneTypeRank(left.type) - phoneTypeRank(right.type));

  if (smsEnabled.length === 0) return null;

  const cheapestByType = new Map<string, (typeof smsEnabled)[number]>();

  for (const phoneNumber of smsEnabled) {
    const existing = cheapestByType.get(phoneNumber.type);
    const currentPrice = Number(phoneNumber.rentalRate ?? 0);
    const existingPrice = Number(existing?.rentalRate ?? Number.MAX_SAFE_INTEGER);

    if (!existing || currentPrice < existingPrice) {
      cheapestByType.set(phoneNumber.type, phoneNumber);
    }
  }

  const rows = Array.from(cheapestByType.values())
    .sort((left, right) => phoneTypeRank(left.type) - phoneTypeRank(right.type))
    .map((phoneNumber) => ({
      label: phoneTypeLabel(phoneNumber.type),
      price: formatMonthlyRate(phoneNumber.rentalRate),
    }));

  return rows.length > 0 ? { rows } : null;
}

function PricingValue({
  value,
  countryCode,
  className,
  skipIndiaConversion = false,
}: {
  value: string;
  countryCode: string;
  className?: string;
  skipIndiaConversion?: boolean;
}) {
  const { convertPriceString } = useExchangeRate(INDIA_SMS_PRICE_MULTIPLIER);
  const displayValue =
    countryCode === "IN" && skipIndiaConversion
      ? value
      : convertPriceString(value, countryCode);

  if (/^contact support$/i.test(value.trim())) {
    return (
      <a
        href={SMS_PRICING_SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("font-medium text-[#323dfe] hover:underline", className)}
      >
        Contact support
      </a>
    );
  }

  return (
    <span className={cn(renderValueClass(displayValue), className)}>
      {displayValue}
    </span>
  );
}

function SMSSection({
  countryCode,
  rows,
  detailSection,
}: {
  countryCode: string;
  rows: SMSDisplayRow[];
  detailSection: DetailSection | null;
}) {
  const hasCarrierFees = countryCode === "US" || countryCode === "CA";
  const hasNetworkPricing = detailSection?.kind === "network";

  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>SMS Text Messages</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Per-message rates for available SMS sender routes.
        {hasCarrierFees && (
          <>
            {" "}Additional carrier surcharge fees apply to inbound and
            outbound SMS usage.{" "}
            <a href="#additional-pricing" className={INLINE_LINK_CLASS}>
              View carrier surcharge fee.
            </a>
          </>
        )}
        {!hasCarrierFees && hasNetworkPricing && (
          <>
            {" "}Network-level outbound SMS pricing is available where rates vary
            by carrier.{" "}
            <a href="#additional-pricing" className={INLINE_LINK_CLASS}>
              View detailed network pricing.
            </a>
          </>
        )}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[40%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Route Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">
                To send SMS (Outbound)
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                To receive SMS (Inbound)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                <td className="py-3 pr-4 text-sm">
                  <div className="flex flex-col items-start gap-1">
                    <PricingValue
                      value={row.outbound}
                      countryCode={countryCode}
                      className="font-medium"
                      skipIndiaConversion={
                        countryCode === "IN" && row.label === "ILDO"
                      }
                    />
                    {row.showNetworkLink && (
                      <a
                        href="#additional-pricing"
                        className="text-sm text-[#323dfe] hover:underline"
                      >
                        View all networks
                      </a>
                    )}
                  </div>
                </td>
                <td className="py-3 text-sm">
                  <PricingValue
                    value={row.inbound}
                    countryCode={countryCode}
                    className="font-medium"
                    skipIndiaConversion={
                      countryCode === "IN" && row.label === "ILDO"
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RCSSection({ countryCode }: { countryCode: string }) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>RCS</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        *RCS Rich text messages are charged per segment and RCS Rich Media is
        charged per message.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[40%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Sender Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">
                To send RCS (Outbound)
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                To receive RCS (Inbound)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {SMS_RCS_RATES.map((row) => (
              <tr key={row.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                <td className="py-3 pr-4 text-sm">
                  <PricingValue
                    value={row.outbound}
                    countryCode={countryCode}
                    className="font-medium"
                  />
                </td>
                <td className="py-3 text-sm">
                  <PricingValue
                    value={row.inbound}
                    countryCode={countryCode}
                    className="font-medium"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MMSSection({
  countryCode,
  rows,
}: {
  countryCode: string;
  rows: MMSRateRow[];
}) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>MMS Multimedia Messages</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        *Additional carrier surcharge fees apply to all inbound and outbound
        MMS usage rates.{" "}
        <a href="#additional-pricing" className={INLINE_LINK_CLASS}>
          View carrier surcharge fee.
        </a>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[40%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Route Type
              </th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">
                To send MMS (Outbound)
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                To receive MMS (Inbound)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.type}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                <td className="py-3 pr-4 text-sm">
                  <PricingValue
                    value={row.outbound}
                    countryCode={countryCode}
                    className="font-medium"
                  />
                </td>
                <td className="py-3 text-sm">
                  <PricingValue
                    value={row.inbound}
                    countryCode={countryCode}
                    className="font-medium"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PhoneNumbersSection({
  countryCode,
  data,
}: {
  countryCode: string;
  data: PhoneSectionData;
}) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Phone Number Rental</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Monthly rental rates for available SMS-enabled sender types.
        {data.note && <> {" "}**{data.note}</>}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Sender Type
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.rows.map((row) =>
              row.children ? (
                <tr key={row.label}>
                  <td colSpan={2} className="py-0">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-3 pr-4 text-sm font-medium text-gray-900">
                            {row.label}
                          </td>
                          <td className="py-3 text-sm text-gray-500">
                            Plus one-time setup fee**
                          </td>
                        </tr>
                        {row.children.map((child) => (
                          <tr
                            key={`${row.label}-${child.label}`}
                            className="border-t border-gray-100"
                          >
                            <td className="py-3 pr-4 pl-4 text-sm text-gray-900">
                              {child.label}
                            </td>
                            <td className="py-3 text-sm">
                              <PricingValue
                                value={child.price}
                                countryCode={countryCode}
                                className="font-medium"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ) : (
                <tr key={row.label}>
                  <td className="py-3 pr-4 text-sm text-gray-900">{row.label}</td>
                  <td className="py-3 text-sm">
                    <PricingValue
                      value={row.price ?? ""}
                      countryCode={countryCode}
                      className={row.muted ? "text-gray-400" : "font-medium"}
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddOnServicesSection({ countryCode }: { countryCode: string }) {
  return (
    <div>
      <h2 className={SECTION_HEADING_CLASS}>Add-On Services</h2>
      <p className={SECTION_DESCRIPTION_CLASS}>
        Included messaging services and routing features available with SMS
        usage where supported.
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
            {SMS_ADD_ON_SERVICES.map((service) => (
              <tr key={service.name}>
                <td className="py-3 pr-4 text-sm text-gray-900">
                  {service.name}
                </td>
                <td className="py-3 text-sm">
                  <PricingValue
                    value={service.price}
                    countryCode={countryCode}
                    className="font-medium"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CarrierFeeSection({
  countryCode,
  groups,
}: {
  countryCode: string;
  groups: CarrierFeeGroup[];
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className={SECTION_HEADING_CLASS}>Additional Carrier Surcharge Fees</h2>
        <p className={SECTION_DESCRIPTION_CLASS}>
          Carrier-specific surcharge fees on top of base messaging rates.
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.title} className="space-y-4">
          <h3 className="text-lg font-semibold text-black">{group.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 text-left font-semibold text-black">
                    Carrier
                  </th>
                  {group.columns.map((column) => (
                    <th
                      key={`${group.title}-${column}`}
                      className="py-3 px-2 text-left font-semibold text-black"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {group.rows.map((row) => (
                  <tr key={`${group.title}-${row.carrier}`}>
                    <td className="py-3 pr-4 text-gray-900">{row.carrier}</td>
                    {row.values.map((value, index) => (
                      <td key={`${row.carrier}-${index}`} className="py-3 px-2">
                        <PricingValue value={value} countryCode={countryCode} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {group.footnote && (
            <p className="text-xs text-gray-500">{group.footnote}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function NetworkPricingSection({
  countryCode,
  title,
  rows,
}: {
  countryCode: string;
  title: string;
  rows: { network: string; rate: string }[];
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className={SECTION_HEADING_CLASS}>{title}</h2>
        <p className="text-sm text-gray-500">
          Pricing per network group -{" "}
          <span className="font-semibold text-black">Outbound SMS</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[65%] py-3 pr-4 text-left text-sm font-semibold text-black">
                Carrier Network
              </th>
              <th className="py-3 text-left text-sm font-semibold text-black">
                To Send SMS (Outbound)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={`${row.network}-${row.rate}`}>
                <td className="py-3 pr-4 text-sm text-gray-900">{row.network}</td>
                <td className="py-3 text-sm">
                  <PricingValue
                    value={row.rate}
                    countryCode={countryCode}
                    className="font-medium"
                    skipIndiaConversion={countryCode === "IN"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SMSPricingPageInner({
  initialCountry,
}: {
  initialCountry?: string;
}) {
  const { country: geoCountry } = useGeoCountry(DEFAULT_COUNTRY_CODE, {
    mode: "exact",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const didSyncInitialPath = useRef(false);
  const hasManualCountrySelection = useRef(false);
  const resolvedInitialCountry = useMemo(
    () =>
      findCountry(initialCountry) ||
      (initialCountry ? null : findCountry(geoCountry)) ||
      findCountry(DEFAULT_COUNTRY_CODE) ||
      SMS_PRICING_COUNTRIES[0],
    [geoCountry, initialCountry],
  );

  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(
    resolvedInitialCountry,
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("sms");
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasManualCountrySelection.current && !initialCountry) {
      return;
    }

    setSelectedCountry((currentCountry) =>
      currentCountry.code === resolvedInitialCountry.code
        ? currentCountry
        : resolvedInitialCountry,
    );
  }, [initialCountry, resolvedInitialCountry]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targetPath = `/sms/pricing/${selectedCountry.code.toLowerCase()}/`;

    if (!didSyncInitialPath.current) {
      didSyncInitialPath.current = true;
      if (initialCountry && window.location.pathname === targetPath) {
        return;
      }
    }

    if (window.location.pathname !== targetPath) {
      window.history.replaceState({}, "", targetPath);
    }
  }, [initialCountry, selectedCountry.code]);

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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              Math.abs(left.boundingClientRect.top) -
              Math.abs(right.boundingClientRect.top),
          )[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 },
    );

    const ids: SectionId[] = [
      "sms",
      "rcs",
      "mms",
      "phone-numbers",
      "add-on",
      "additional-pricing",
    ];

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [selectedCountry.code]);

  const handleCountryChange = (country: CountryListItem) => {
    hasManualCountrySelection.current = true;
    setSelectedCountry(country);
    setIsCountryOpen(false);
    setSearchQuery("");
    window.history.replaceState(
      {},
      "",
      `/sms/pricing/${country.code.toLowerCase()}/`,
    );
  };

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SMS_PRICING_COUNTRIES;

    return SMS_PRICING_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const pricingData =
    useMemo(
      () =>
        getSMSPricingData(selectedCountry.code) ||
        getSMSPricingData(DEFAULT_COUNTRY_CODE),
      [selectedCountry.code],
    ) || getSMSPricingData(DEFAULT_COUNTRY_CODE);

  if (!pricingData) return null;

  const detailSection = deriveDetailSection(selectedCountry.code, pricingData);
  const smsRows = deriveSMSRows(selectedCountry.code, pricingData, detailSection);
  const phoneSection = derivePhoneSection(selectedCountry.code, pricingData);
  const hasRCS = selectedCountry.code === "US";
  const hasMMS = selectedCountry.code === "US" || selectedCountry.code === "CA";
  const heroTitle =
    selectedCountry.code === "US" ? "SMS / RCS Pricing" : "SMS Pricing";

  const sections = [
    { id: "sms" as const, label: "SMS" },
    ...(hasRCS ? [{ id: "rcs" as const, label: "RCS" }] : []),
    ...(hasMMS ? [{ id: "mms" as const, label: "MMS" }] : []),
    ...(phoneSection
      ? [{ id: "phone-numbers" as const, label: "Phone Number Rental" }]
      : []),
    { id: "add-on" as const, label: "Add-On Services" },
    ...(detailSection
      ? [
          {
            id: "additional-pricing" as const,
            label: detailSection.navLabel,
          },
        ]
      : []),
  ];

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

  return (
    <>
      <section className="bg-white pb-10 pt-[56px] sm:pt-[64px] md:pt-[72px]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora mb-4 text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.5rem] md:text-[3rem]">
            {heroTitle}
            </h1>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
              {SMS_PRICING_HERO_COPY}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[256px_1fr] lg:items-start lg:gap-8">
            <div ref={sidebarWrapperRef} className="mb-8 lg:mb-0">
              <aside className="z-30 bg-white" style={sidebarStyle}>
                <div className="relative" ref={dropdownRef}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Select Country
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen((value) => !value)}
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
                    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                      <div className="border-b border-gray-100 p-2">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-500"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountryChange(country)}
                            className={cn(
                              "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50",
                              selectedCountry.code === country.code &&
                                "bg-[#323dfe]/5",
                            )}
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-gray-900">{country.name}</span>
                          </button>
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

                <nav className="mt-6 hidden border-t border-gray-100 pt-6 lg:block">
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
                id="sms"
                className="mb-6 scroll-mt-32 rounded-xl border border-gray-200 bg-white p-6"
              >
                <SMSSection
                  countryCode={selectedCountry.code}
                  rows={smsRows}
                  detailSection={detailSection}
                />
              </div>

            {hasRCS && (
              <div
                id="rcs"
                className="mb-6 scroll-mt-32 rounded-xl border border-gray-200 bg-white p-6"
              >
                <RCSSection countryCode={selectedCountry.code} />
              </div>
            )}

            {hasMMS && (
              <div
                id="mms"
                className="mb-6 scroll-mt-32 rounded-xl border border-gray-200 bg-white p-6"
              >
                <MMSSection
                  countryCode={selectedCountry.code}
                  rows={SMS_MMS_RATES[selectedCountry.code as "US" | "CA"]}
                />
              </div>
            )}

            {phoneSection && (
              <div
                id="phone-numbers"
                className="mb-6 scroll-mt-32 rounded-xl border border-gray-200 bg-white p-6"
              >
                <PhoneNumbersSection
                  countryCode={selectedCountry.code}
                  data={phoneSection}
                />
              </div>
            )}

            <div
              id="add-on"
              className="mb-6 scroll-mt-32 rounded-xl border border-gray-200 bg-white p-6"
            >
              <AddOnServicesSection countryCode={selectedCountry.code} />
            </div>

            {detailSection && (
              <div
                id="additional-pricing"
                className="mb-6 scroll-mt-32 rounded-xl border border-gray-200 bg-white p-6"
              >
                {detailSection.kind === "carrier" ? (
                  <CarrierFeeSection
                    countryCode={selectedCountry.code}
                    groups={detailSection.groups}
                  />
                ) : (
                  <NetworkPricingSection
                    countryCode={selectedCountry.code}
                    title={detailSection.title}
                    rows={detailSection.rows}
                  />
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SMSPricingPage({
  initialCountry,
}: {
  initialCountry?: string;
}) {
  return (
    <SMSPricingErrorBoundary>
      <SMSPricingPageInner initialCountry={initialCountry} />
    </SMSPricingErrorBoundary>
  );
}
