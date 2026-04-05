"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Phone, MessageSquare, Sparkles, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeoCountry } from "@/hooks/useGeoCountry";

import { buildCountryList, COUNTRY_NAMES, TOP_COUNTRIES } from "@/data/pricing-data";
import { VOICE_PRICING_CACHE, VOICE_PRICING_COUNTRY_NAMES } from "@/data/voice-pricing-cache";
import {
  SMS_PRICING_COUNTRY_CODES,
  SMS_RCS_RATES,
  getSMSPricingData,
} from "@/data/sms-pricing-page";
import {
  WHATSAPP_CHAT_COUNTRY_CODES,
  getWhatsAppChatCountry,
} from "@/data/whatsapp-chat-pricing";
import {
  WHATSAPP_CALL_COUNTRIES,
  formatWhatsAppCallRate,
  getWhatsAppCallAddOns,
  getWhatsAppCallCountry,
} from "@/data/whatsapp-call-pricing";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useSignupUrl } from "@/hooks/useSignupUrl";

const MAIN_PRICING_COUNTRY_CODES = Array.from(
  new Set([
    ...Object.keys(VOICE_PRICING_COUNTRY_NAMES),
    ...SMS_PRICING_COUNTRY_CODES,
    ...WHATSAPP_CHAT_COUNTRY_CODES,
    ...WHATSAPP_CALL_COUNTRIES.map((country) => country.code),
  ]),
);

const countries = buildCountryList(MAIN_PRICING_COUNTRY_CODES, TOP_COUNTRIES);

const INDIA_SMS_SUMMARY_ROWS = [
  { label: "Domestic", outbound: "₹0.20/sms", inbound: "Not Supported" },
  { label: "ILDO", outbound: "$0.0800/sms", inbound: "Not Supported" },
];

const VOICE_ADD_ON_ROWS_INR = [
  ["Answering Machine Detection", "₹0.0000/min"],
  ["Call Insights - Basic", "₹0.0000/min"],
  ["Call Insights - Premium", "₹0.22/min"],
  ["Call Recording", "₹0.0000/min"],
  ["Recording Storage *", "₹0.0000/min"],
  ["Automatic Speech Recognition", "₹1.7/ 15 seconds"],
  ["Call Transcription", "₹0.81/min"],
  ["Conference Calls", "₹0.0000/min"],
  ["Multilingual Text to Speech", "₹0.0000/min"],
] as const;

const VOICE_ADD_ON_ROWS_USD = [
  ["Answering Machine Detection", "$0.0000/min"],
  ["Call Insights - Basic", "$0.0000/min"],
  ["Call Insights - Premium", "$0.0025/min"],
  ["Call Recording", "$0.0000/min"],
  ["Recording Storage *", "$0.0000/min"],
  ["Automatic Speech Recognition", "$0.02/ 15 seconds"],
  ["Call Transcription", "$0.0095/min"],
  ["Conference Calls", "$0.0000/min"],
  ["Multilingual Text to Speech", "$0.0000/min"],
  ["CNAM Lookup", "$0.00500/lookup"],
] as const;

type SummaryAddOnRow = {
  label: string;
  price: string;
};

function normalizeSummaryValue(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function getSummaryAddOnKey({ label, price }: SummaryAddOnRow) {
  return `${normalizeSummaryValue(label)}::${normalizeSummaryValue(price)}`;
}

function getVoiceSummaryAddOns(countryCode: string): SummaryAddOnRow[] {
  const rows = countryCode === "IN" ? VOICE_ADD_ON_ROWS_INR : VOICE_ADD_ON_ROWS_USD;
  return rows.map(([label, price]) => ({ label, price }));
}

function flattenWhatsAppAddOns(
  rows: ReturnType<typeof getWhatsAppCallAddOns>,
): SummaryAddOnRow[] {
  return rows.flatMap((row) => {
    if (!row.children?.length) {
      return row.price ? [{ label: row.label, price: row.price }] : [];
    }

    return row.children.map((child) => ({
      label: `${row.label} - ${child.label}`,
      price: child.price,
    }));
  });
}

function dedupeSummaryAddOns(rows: SummaryAddOnRow[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = getSummaryAddOnKey(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function toSMSRouteLabel(type: string, countryCode: string) {
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

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Reusable table section block
function ModalTableSection({ title, children, inline }: { title: string; children: React.ReactNode; inline?: boolean }) {
  if (inline) {
    return (
      <div className="border-t border-gray-100 pt-3">
        <h4 className="font-semibold text-xs text-black mb-2">{title}</h4>
        <div>{children}</div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="font-semibold text-base text-black">{title}</h3>
      </div>
      <div className="px-6 pb-4">{children}</div>
    </div>
  );
}

// Voice Pricing Content
function VoicePricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const pricingData = VOICE_PRICING_CACHE[selectedCountry] || null;
  const rates = pricingData?.voiceRates;
  const countryName = COUNTRY_NAMES[selectedCountry] || selectedCountry;
  const { convertPriceString: cp } = useExchangeRate();

  const rateCell = (value: string | undefined, forceFree = false) => {
    if (forceFree) return "Free";
    if (!value || value === "Not Supported") return "Not Supported";
    return cp(value, selectedCountry);
  };

  if (!rates) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Detailed voice pricing for {countryName} is available on request.</p>
        <a href="/contact/sales" className="mt-3 inline-block text-sm font-medium text-[#323dfe] hover:underline">Contact sales for rates</a>
      </div>
    );
  }

  const voiceRows = [
    ["Local Calls", rateCell(rates.localOutbound), rateCell(rates.localInbound)],
    ...(rates.mobileOutbound !== "Not Supported" || rates.mobileInbound !== "Not Supported"
      ? [["Mobile Calls", rateCell(rates.mobileOutbound), rateCell(rates.mobileInbound)]]
      : []),
    ...(rates.tollfreeOutbound !== "Not Supported" || rates.tollfreeInbound !== "Not Supported"
      ? [["Toll-Free Calls", rateCell(rates.tollfreeOutbound), rateCell(rates.tollfreeInbound)]]
      : []),
    ["Browser SDK and SIP Calls", rateCell(rates.ipOutbound), rateCell(rates.ipInbound)],
    ["Audio streaming & noise cancellation", "Included", "Included"],
  ];

  const addOnRows =
    selectedCountry === "IN" ? VOICE_ADD_ON_ROWS_INR : VOICE_ADD_ON_ROWS_USD;

  return (
    <>
      <ModalTableSection inline={inline} title="Voice calls">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/3">Route type</th>
              <th className="pb-2 font-normal w-1/3">Outbound calls</th>
              <th className="pb-2 font-normal w-1/3">Inbound calls</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {voiceRows.map(([label, outbound, inbound]) => (
              <tr key={label} className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">{label}</td>
                <td className="py-2.5 text-gray-600">{outbound}</td>
                <td className="py-2.5 text-gray-600">{inbound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalTableSection>

      <ModalTableSection inline={inline} title="Add-on services">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/2">Service</th>
              <th className="pb-2 font-normal w-1/2">Price</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {addOnRows.map(([service, price]) => (
              <tr key={service} className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">{service}</td>
                <td className="py-2.5 text-gray-600">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[11px] text-gray-500">
          * Free for 90 days. $0.0004/min per month afterwards.
        </p>
      </ModalTableSection>
    </>
  );
}

// SMS Pricing Content
function SMSPricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const pricingData = getSMSPricingData(selectedCountry);
  const countryName = COUNTRY_NAMES[selectedCountry] || selectedCountry;

  const smsRows =
    selectedCountry === "IN"
      ? INDIA_SMS_SUMMARY_ROWS
      : pricingData?.smsRates.map((row) => ({
          label: toSMSRouteLabel(row.type, selectedCountry),
          outbound: row.outbound,
          inbound: row.inbound,
        })) || [];

  if (smsRows.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Detailed SMS pricing for {countryName} is available on request.</p>
        <a href="/contact/sales" className="mt-3 inline-block text-sm font-medium text-[#323dfe] hover:underline">Contact sales for rates</a>
      </div>
    );
  }

  return (
    <>
      <ModalTableSection inline={inline} title="SMS messaging">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/3">Route type</th>
              <th className="pb-2 font-normal w-1/3">Outbound SMS</th>
              <th className="pb-2 font-normal w-1/3">Inbound SMS</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {smsRows.map((row) => (
              <tr key={row.label} className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">{row.label}</td>
                <td className="py-2.5 text-gray-600">{row.outbound}</td>
                <td className="py-2.5 text-gray-600">{row.inbound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalTableSection>

      {selectedCountry === "US" && (
        <ModalTableSection inline={inline} title="RCS messaging">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/3">Type</th>
                <th className="pb-2 font-normal w-1/3">Outbound</th>
                <th className="pb-2 font-normal w-1/3">Inbound</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {SMS_RCS_RATES.map((row) => (
                <tr key={row.type} className="border-t border-dashed border-gray-200">
                  <td className="py-2.5 font-medium text-black">{row.type}</td>
                  <td className="py-2.5 text-gray-600">{row.outbound}</td>
                  <td className="py-2.5 text-gray-600">{row.inbound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalTableSection>
      )}
    </>
  );
}

// WhatsApp Pricing Content
function WhatsAppPricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const chatCountry = getWhatsAppChatCountry(selectedCountry);
  const callCountry = getWhatsAppCallCountry(selectedCountry);
  const chatRates = chatCountry?.pricing;
  const callRates = callCountry?.pricing;
  const addOns = getWhatsAppCallAddOns(selectedCountry);
  const voiceAddOnKeys = new Set(
    getVoiceSummaryAddOns(selectedCountry).map((row) => getSummaryAddOnKey(row)),
  );
  const uniqueWhatsAppAddOns = dedupeSummaryAddOns(flattenWhatsAppAddOns(addOns)).filter(
    (row) => !voiceAddOnKeys.has(getSummaryAddOnKey(row)),
  );
  const countryName = COUNTRY_NAMES[selectedCountry] || selectedCountry;

  const formatChatRate = (rate: number | undefined, currency: "$" | "₹") => {
    if (rate === undefined) return "—";
    if (rate === 0) return "Free";
    return `${currency}${rate.toFixed(4)}/message`;
  };

  if (!chatRates && !callRates) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Detailed WhatsApp pricing for {countryName} is available on request.</p>
        <a href="/contact/sales" className="mt-3 inline-block text-sm font-medium text-[#323dfe] hover:underline">Contact sales for rates</a>
      </div>
    );
  }

  return (
    <>
      {chatRates && (
        <ModalTableSection inline={inline} title="WhatsApp Business conversations">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/2">Message Category</th>
                <th className="pb-2 font-normal w-1/2">Price per message</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Marketing</td>
                <td className="py-2.5 text-gray-600">{formatChatRate(chatRates.marketing, chatRates.currency)}</td>
              </tr>
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Utility</td>
                <td className="py-2.5 text-gray-600">{formatChatRate(chatRates.utility, chatRates.currency)}</td>
              </tr>
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Authentication</td>
                <td className="py-2.5 text-gray-600">{formatChatRate(chatRates.authentication, chatRates.currency)}</td>
              </tr>
              {chatRates.authenticationIntl > 0 && (
                <tr className="border-t border-dashed border-gray-200">
                  <td className="py-2.5 font-medium text-black">Authentication (international)</td>
                  <td className="py-2.5 text-gray-600">{formatChatRate(chatRates.authenticationIntl, chatRates.currency)}</td>
                </tr>
              )}
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Service</td>
                <td className="py-2.5 text-gray-600">
                  {chatRates.service === 0 ? "Free" : formatChatRate(chatRates.service, chatRates.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </ModalTableSection>
      )}

      {callRates && (
        <ModalTableSection inline={inline} title="WhatsApp voice calls">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/2">Call type</th>
                <th className="pb-2 font-normal w-1/2">Price per minute</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Inbound</td>
                <td className="py-2.5 text-gray-600">{formatWhatsAppCallRate(callRates.inbound)}</td>
              </tr>
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Outbound</td>
                <td className="py-2.5 text-gray-600">{formatWhatsAppCallRate(callRates.outbound)}</td>
              </tr>
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Audio streaming & noise cancellation</td>
                <td className="py-2.5 text-gray-600">Included</td>
              </tr>
            </tbody>
          </table>
        </ModalTableSection>
      )}

      {uniqueWhatsAppAddOns.length > 0 && (
        <ModalTableSection inline={inline} title="Add-on services">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/2">Service</th>
                <th className="pb-2 font-normal w-1/2">Price</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {uniqueWhatsAppAddOns.map((row) => (
                <tr key={row.label} className="border-t border-dashed border-gray-200">
                  <td className="py-2.5 font-medium text-black">{row.label}</td>
                  <td className="py-2.5 text-gray-600">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalTableSection>
      )}
    </>
  );
}

// AI Agents Pricing Content
function AIAgentsPricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const { convertPriceString: cp } = useExchangeRate();

  const aiRates = {
    voice: selectedCountry === "IN" ? "₹3.00/min" : cp("$0.050/min", selectedCountry),
    text: cp("$0.005/outcome", selectedCountry),
    image: cp("$0.04/image", selectedCountry),
    audio: cp("$0.02/min", selectedCountry),
  };

  return (
    <>
      <ModalTableSection inline={inline} title="AI agent usage">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/2">Component</th>
              <th className="pb-2 font-normal w-1/2">Rate</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Voice AI agent</td>
              <td className="py-2.5 text-gray-600">{aiRates.voice}</td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">AI text conversations</td>
              <td className="py-2.5 text-gray-600">{aiRates.text}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">
          Channel pricing (voice calls, SMS, WhatsApp) is charged separately.
        </p>
      </ModalTableSection>

      <ModalTableSection inline={inline} title="Platform features">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/2">Feature</th>
              <th className="pb-2 font-normal w-1/2">Price</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {[
              ["Knowledge base", "Included free"],
              ["Function calling / tool use", "Included free"],
              ["Call recording", "Included free"],
              ["Call transfer", "Included free"],
              ["Real-time transcription", "Included free"],
              ["Multilingual support", "Included free"],
            ].map(([feature, price]) => (
              <tr key={feature} className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">{feature}</td>
                <td className="py-2.5 text-gray-600">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalTableSection>
    </>
  );
}

export function PlivoPricing() {
  const { country: geoCountry } = useGeoCountry("US", { mode: "exact" });
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mainSearchQuery, setMainSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const mainDropdownRef = useRef<HTMLDivElement>(null);
  const { convertPriceString: cp } = useExchangeRate();
  const { url: signupUrl, label: signupLabel } = useSignupUrl();

  // Auto-select country based on IP geolocation
  useEffect(() => {
    if (countries.some(c => c.code === geoCountry)) {
      setSelectedCountry(geoCountry);
    }
  }, [geoCountry]);

  const mainFilteredCountries = useMemo(() => {
    if (!mainSearchQuery) return countries;
    const q = mainSearchQuery.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [mainSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mainDropdownRef.current && !mainDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setMainSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const country = countries.find(c => c.code === selectedCountry) || countries[0];

  return (
    <>
      {/* Hero Section - No flickering grid */}
      <section className="bg-white pt-8 pb-10 lg:pt-12 lg:pb-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
            Start now with {selectedCountry === "IN" ? "₹1,000" : "$10"} free credits
          </h1>

          {/* Country Selector */}
          <div className="mt-5 flex justify-center">
            <div className="relative" ref={mainDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen((open) => !open);
                  setMainSearchQuery("");
                }}
                className="flex w-full max-w-[256px] items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-64 top-full mt-1 z-50 max-h-72 overflow-hidden flex flex-col rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={mainSearchQuery}
                      onChange={(event) => setMainSearchQuery(event.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto py-1">
                    {mainFilteredCountries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c.code);
                          setIsDropdownOpen(false);
                          setMainSearchQuery("");
                        }}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-black transition-colors hover:bg-gray-50 ${
                          c.code === selectedCountry ? 'bg-gray-50 font-medium' : ''
                        }`}
                      >
                        <span className="text-base">{c.flag}</span>
                        <span>{c.name}</span>
                      </button>
                    ))}
                    {mainFilteredCountries.length === 0 && (
                      <div className="px-3 py-3 text-sm text-gray-500">No countries found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="relative pb-4 lg:pb-6 overflow-hidden">
        {/* Dotted Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-4">
              {/* Pay as you go */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-2xl font-semibold text-black">
                      Pay as you go
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedCountry === "IN" ? "₹1,000" : "$10"} in free credits. No credit card required.
                    </p>
                  </div>
                  <a
                    href={signupUrl}
                    {...(signupUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex-shrink-0 rounded-md bg-black px-5 py-2.5 text-center text-sm font-medium text-white transition-colors cta-hover-gradient"
                  >
                    {signupLabel}
                  </a>
                </div>

                {/* See what's included toggle */}
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="mt-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  See what's included
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showDetails && "rotate-180")} />
                </button>

                {showDetails && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-black mb-2">Coverage</h3>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#323dfe]" />
                        <span className="text-sm text-gray-700">United States, India</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-black mb-2">Features</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">2 RPS & 50 call concurrency</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Limited to {selectedCountry === "IN" ? "₹2,00,000" : "$2,500"} of monthly usage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enterprise */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-2xl font-semibold text-black">
                      Enterprise
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedCountry === "IN" ? "Starts at ₹1,00,000 per month" : "Starts at $1,000 per month"}
                    </p>
                  </div>
                  <a
                    href="/contact/sales"
                    className="flex-shrink-0 rounded-md border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-black transition-colors hover:bg-gray-50"
                  >
                    Talk to sales
                  </a>
                </div>

                {/* See what's included toggle */}
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="mt-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  See what's included
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showDetails && "rotate-180")} />
                </button>

                {showDetails && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-black mb-2">Coverage</h3>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#323dfe]" />
                        <span className="text-sm text-gray-700">United States, India & 190 countries</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-black mb-2">Features</h3>
                      <p className="text-sm text-gray-700 mb-2">Everything in Pay as you go and:</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Custom pricing & volume discounts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Custom RPS & call concurrency</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Shortcodes & custom sender IDs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Compliance - BAA, HIPAA & SSO</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Custom billing intervals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#323dfe]" />
                          <span className="text-sm text-gray-700">Slack based onboarding</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
          </div>
        </div>
      </section>

      {/* 4-Column Inline Pricing — single box with separator lines */}
      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sans text-2xl font-semibold text-black mb-4 mt-5 text-center">Channel Pricing</h2>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Voice */}
              <div className="p-4 space-y-4 flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <Phone className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">Voice</h3>
                </div>
                <VoicePricingContent selectedCountry={selectedCountry} inline />
                <a href="/voice/pricing/" className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[#323dfe] hover:underline pt-2">
                  View detailed pricing <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* AI Agents */}
              <div className="p-4 space-y-4 flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <Sparkles className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">AI Agents</h3>
                </div>
                <AIAgentsPricingContent selectedCountry={selectedCountry} inline />
              </div>

              {/* SMS & RCS */}
              <div className="p-4 space-y-4 flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <MessageSquare className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">SMS & RCS</h3>
                </div>
                <SMSPricingContent selectedCountry={selectedCountry} inline />
                <a href="/sms/pricing/" className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[#323dfe] hover:underline pt-2">
                  View detailed pricing <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="p-4 space-y-4 flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <WhatsAppIcon className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">WhatsApp</h3>
                </div>
                <WhatsAppPricingContent selectedCountry={selectedCountry} inline />
                <a href="/whatsapp-message/pricing/" className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[#323dfe] hover:underline pt-2">
                  View detailed pricing <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 px-5 py-3">
              <p className="text-xs text-gray-400">All Voice and AI Agent calls are billed in 60-second intervals.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlivoPricing;
