"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Phone, MessageSquare, Sparkles, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { COUNTRY_NAMES, SMS_RATES } from "@/data/pricing-data";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import type { PhoneNumberInfo } from "@/hooks/useCountryPricing";
import { useWhatsAppChatRates } from "@/hooks/useWhatsAppChatRates";
import { useWhatsAppCallRates } from "@/hooks/useWhatsAppCallRates";

// Country data with flags
const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
];

// Starts at pricing data by country (USD for all except India in INR)
const startsAtPricing: Record<string, {
  voice: string;
  sms: string;
  phoneNumbers: string;
  whatsappChat: string;
  whatsappCall: string;
  aiAgents: string;
}> = {
  US: {
    voice: "$0.0055/min",
    sms: "$0.0050/sms",
    phoneNumbers: "$0.80/month",
    whatsappChat: "$0.0135/conversation",
    whatsappCall: "$0.010/min",
    aiAgents: "$0.005/outcome",
  },
  IN: {
    voice: "₹0.74/min",
    sms: "₹0.155/sms",
    phoneNumbers: "₹250/month",
    whatsappChat: "₹0.12/conversation",
    whatsappCall: "₹0.45/min",
    aiAgents: "₹0.30/outcome",
  },
  GB: {
    voice: "$0.0100/min",
    sms: "$0.0095/sms",
    phoneNumbers: "$1.00/month",
    whatsappChat: "$0.0292/conversation",
    whatsappCall: "$0.015/min",
    aiAgents: "$0.005/outcome",
  },
  AU: {
    voice: "$0.0055/min",
    sms: "$0.0042/sms",
    phoneNumbers: "$0.98/month",
    whatsappChat: "$0.0195/conversation",
    whatsappCall: "$0.010/min",
    aiAgents: "$0.005/outcome",
  },
  CA: {
    voice: "$0.0048/min",
    sms: "$0.0041/sms",
    phoneNumbers: "$0.74/month",
    whatsappChat: "$0.0133/conversation",
    whatsappCall: "$0.009/min",
    aiAgents: "$0.005/outcome",
  },
  // European countries
  DE: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  FR: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  IT: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  ES: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  NL: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  BE: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  CH: { voice: "$0.0090/min", sms: "$0.0078/sms", phoneNumbers: "$1.01/month", whatsappChat: "$0.0157/conversation", whatsappCall: "$0.013/min", aiAgents: "$0.005/outcome" },
  AT: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  SE: { voice: "$0.0067/min", sms: "$0.0057/sms", phoneNumbers: "$0.76/month", whatsappChat: "$0.0114/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  NO: { voice: "$0.0074/min", sms: "$0.0065/sms", phoneNumbers: "$0.84/month", whatsappChat: "$0.0130/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  DK: { voice: "$0.0073/min", sms: "$0.0058/sms", phoneNumbers: "$0.88/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  FI: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  IE: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  PT: { voice: "$0.0076/min", sms: "$0.0065/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0131/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  PL: { voice: "$0.0063/min", sms: "$0.0055/sms", phoneNumbers: "$0.88/month", whatsappChat: "$0.0125/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  // Americas
  BR: { voice: "$0.0063/min", sms: "$0.0054/sms", phoneNumbers: "$0.81/month", whatsappChat: "$0.0126/conversation", whatsappCall: "$0.009/min", aiAgents: "$0.005/outcome" },
  MX: { voice: "$0.012/min", sms: "$0.010/sms", phoneNumbers: "$1.20/month", whatsappChat: "$0.018/conversation", whatsappCall: "$0.014/min", aiAgents: "$0.005/outcome" },
  AR: { voice: "$0.015/min", sms: "$0.012/sms", phoneNumbers: "$1.50/month", whatsappChat: "$0.022/conversation", whatsappCall: "$0.018/min", aiAgents: "$0.005/outcome" },
  CL: { voice: "$0.014/min", sms: "$0.011/sms", phoneNumbers: "$1.40/month", whatsappChat: "$0.020/conversation", whatsappCall: "$0.016/min", aiAgents: "$0.005/outcome" },
  CO: { voice: "$0.013/min", sms: "$0.010/sms", phoneNumbers: "$1.30/month", whatsappChat: "$0.019/conversation", whatsappCall: "$0.015/min", aiAgents: "$0.005/outcome" },
  // Asia Pacific
  JP: { voice: "$0.0057/min", sms: "$0.0050/sms", phoneNumbers: "$0.80/month", whatsappChat: "$0.0134/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  KR: { voice: "$0.0067/min", sms: "$0.0059/sms", phoneNumbers: "$0.89/month", whatsappChat: "$0.0133/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  SG: { voice: "$0.0059/min", sms: "$0.0052/sms", phoneNumbers: "$0.81/month", whatsappChat: "$0.0133/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  HK: { voice: "$0.0070/min", sms: "$0.0061/sms", phoneNumbers: "$0.90/month", whatsappChat: "$0.0141/conversation", whatsappCall: "$0.012/min", aiAgents: "$0.005/outcome" },
  MY: { voice: "$0.0055/min", sms: "$0.0048/sms", phoneNumbers: "$0.84/month", whatsappChat: "$0.0132/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  TH: { voice: "$0.0070/min", sms: "$0.0062/sms", phoneNumbers: "$0.84/month", whatsappChat: "$0.0140/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  ID: { voice: "$0.0057/min", sms: "$0.0050/sms", phoneNumbers: "$0.82/month", whatsappChat: "$0.0126/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  PH: { voice: "$0.0063/min", sms: "$0.0054/sms", phoneNumbers: "$0.90/month", whatsappChat: "$0.0135/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  VN: { voice: "$0.0060/min", sms: "$0.0052/sms", phoneNumbers: "$0.80/month", whatsappChat: "$0.0140/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  NZ: { voice: "$0.0060/min", sms: "$0.0048/sms", phoneNumbers: "$0.78/month", whatsappChat: "$0.0132/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  // Middle East & Africa
  ZA: { voice: "$0.0066/min", sms: "$0.0055/sms", phoneNumbers: "$0.83/month", whatsappChat: "$0.0138/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
  AE: { voice: "$0.0068/min", sms: "$0.0060/sms", phoneNumbers: "$0.87/month", whatsappChat: "$0.0150/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  SA: { voice: "$0.0067/min", sms: "$0.0059/sms", phoneNumbers: "$0.85/month", whatsappChat: "$0.0147/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  IL: { voice: "$0.0061/min", sms: "$0.0052/sms", phoneNumbers: "$0.83/month", whatsappChat: "$0.0138/conversation", whatsappCall: "$0.011/min", aiAgents: "$0.005/outcome" },
  TR: { voice: "$0.0056/min", sms: "$0.0050/sms", phoneNumbers: "$0.78/month", whatsappChat: "$0.0140/conversation", whatsappCall: "$0.010/min", aiAgents: "$0.005/outcome" },
};

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

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
  const { data: pricingData, loading } = useCountryPricing(selectedCountry);
  const rates = pricingData?.voiceRates;
  const phoneNumbers = pricingData?.phoneNumbers?.filter(
    (pn: PhoneNumberInfo) => pn.rentalRate != null && pn.rentalRate > 0
  ) || [];
  const countryName = COUNTRY_NAMES[selectedCountry] || selectedCountry;
  const currency = selectedCountry === "IN" ? "₹" : "$";

  const rateCell = (value: string | undefined) => {
    if (loading) return <Shimmer />;
    return value || "Not Supported";
  };

  if (!loading && !rates) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Detailed voice pricing for {countryName} is available on request.</p>
        <a href="/contact/sales" className="mt-3 inline-block text-sm font-medium text-[#323dfe] hover:underline">Contact sales for rates</a>
      </div>
    );
  }

  return (
    <>
      <ModalTableSection inline={inline} title="Voice calls">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/3">Number type</th>
              <th className="pb-2 font-normal w-1/3">Outbound calls</th>
              <th className="pb-2 font-normal w-1/3">Inbound calls</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Local numbers</td>
              <td className="py-2.5 text-gray-600">{rateCell(rates?.localOutbound)}</td>
              <td className="py-2.5 text-gray-600">{rateCell(rates?.localInbound)}</td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Toll-free</td>
              <td className="py-2.5 text-gray-600">{rateCell(rates?.tollfreeOutbound)}</td>
              <td className="py-2.5 text-gray-600">{rateCell(rates?.tollfreeInbound)}</td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">SIP / browser / app</td>
              <td className="py-2.5 text-gray-600">{rateCell(rates?.ipOutbound)}</td>
              <td className="py-2.5 text-gray-600">{rateCell(rates?.ipInbound)}</td>
            </tr>
          </tbody>
        </table>
      </ModalTableSection>

      {(loading || phoneNumbers.length > 0) && (
        <ModalTableSection inline={inline} title="Phone number rental">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/2">Number type</th>
                <th className="pb-2 font-normal w-1/2">Monthly rental</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {loading ? (
                <>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-2.5 font-medium text-black"><Shimmer /></td>
                    <td className="py-2.5 text-gray-600"><Shimmer /></td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-2.5 font-medium text-black"><Shimmer /></td>
                    <td className="py-2.5 text-gray-600"><Shimmer /></td>
                  </tr>
                </>
              ) : (
                phoneNumbers.map((pn: PhoneNumberInfo) => (
                  <tr key={pn.type} className="border-t border-dashed border-gray-200">
                    <td className="py-2.5 font-medium text-black">{pn.type}</td>
                    <td className="py-2.5 text-gray-600">{currency}{pn.rentalRate!.toFixed(2)}/month</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ModalTableSection>
      )}

      <ModalTableSection inline={inline} title="Add-on services">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/2">Service</th>
              <th className="pb-2 font-normal w-1/2">Price</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {[
              ["Audio streaming", "Included free"],
              ["Noise cancellation", "Included free"],
              ["Multilingual text to speech", "Included free"],
              ["Call recording", "Included free"],
              ["Recording storage", `${currency}0.0004/min/month (free for 90 days)`],
              ["Automatic machine detection", "Included free"],
              ["Dynamic caller ID", "Included free"],
              ["Concurrent calls", "Included free"],
              ["Transcription", `Auto ${currency}0.0095/minute`],
            ].map(([service, price]) => (
              <tr key={service} className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">{service}</td>
                <td className="py-2.5 text-gray-600">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ModalTableSection>
    </>
  );
}

// SMS Pricing Content
function SMSPricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const { data: pricingData, loading } = useCountryPricing(selectedCountry);
  const smsRates = pricingData?.smsRates || [];
  const phoneNumbers = pricingData?.phoneNumbers?.filter(
    (pn: PhoneNumberInfo) => pn.rentalRate != null && pn.rentalRate > 0
  ) || [];
  const countryName = COUNTRY_NAMES[selectedCountry] || selectedCountry;
  const currency = selectedCountry === "IN" ? "₹" : "$";

  // Keep hardcoded MMS and carrier fee data from SMS_RATES
  const staticRates = SMS_RATES[selectedCountry];

  if (!loading && smsRates.length === 0 && !staticRates) {
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
              <th className="pb-2 font-normal w-1/3">Number type</th>
              <th className="pb-2 font-normal w-1/3">Outbound SMS</th>
              <th className="pb-2 font-normal w-1/3">Inbound SMS</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {loading ? (
              <>
                {[1, 2].map((i) => (
                  <tr key={i} className="border-t border-dashed border-gray-200">
                    <td className="py-4"><Shimmer /></td>
                    <td className="py-4"><Shimmer /></td>
                    <td className="py-4"><Shimmer /></td>
                  </tr>
                ))}
              </>
            ) : smsRates.length > 0 ? (
              smsRates.map((row) => (
                <tr key={row.type} className="border-t border-dashed border-gray-200">
                  <td className="py-2.5 font-medium text-black">{row.type}</td>
                  <td className="py-2.5 text-gray-600">{row.outbound}</td>
                  <td className="py-2.5 text-gray-600">{row.inbound}</td>
                </tr>
              ))
            ) : staticRates ? (
              staticRates.sms.map((row) => (
                <tr key={row.type} className="border-t border-dashed border-gray-200">
                  <td className="py-2.5 font-medium text-black">{row.type}</td>
                  <td className="py-2.5 text-gray-600">{row.outbound}</td>
                  <td className="py-2.5 text-gray-600">{row.inbound}</td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </ModalTableSection>

      {staticRates?.mms && staticRates.mms.length > 0 && (
        <ModalTableSection inline={inline} title="MMS messaging">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/3">Number type</th>
                <th className="pb-2 font-normal w-1/3">Outbound MMS</th>
                <th className="pb-2 font-normal w-1/3">Inbound MMS</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {staticRates.mms.map((row) => (
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

      {(loading || phoneNumbers.length > 0) && (
        <ModalTableSection inline={inline} title="Phone numbers">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/2">Number type</th>
                <th className="pb-2 font-normal w-1/2">Monthly rental</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {loading ? (
                <>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4"><Shimmer /></td>
                    <td className="py-4"><Shimmer /></td>
                  </tr>
                </>
              ) : (
                phoneNumbers.map((pn: PhoneNumberInfo) => (
                  <tr key={pn.type} className="border-t border-dashed border-gray-200">
                    <td className="py-2.5 font-medium text-black">{pn.type}</td>
                    <td className="py-2.5 text-gray-600">{currency}{pn.rentalRate!.toFixed(2)}/month</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ModalTableSection>
      )}

      {staticRates?.hasCarrierFees && (
        <ModalTableSection inline={inline} title="Carrier fees">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2 font-normal w-1/2">Fee type</th>
                <th className="pb-2 font-normal w-1/2">Rate</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">A2P 10DLC campaign registration</td>
                <td className="py-2.5 text-gray-600">Varies by carrier</td>
              </tr>
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Carrier surcharges</td>
                <td className="py-2.5 text-gray-600">Passed through at cost</td>
              </tr>
            </tbody>
          </table>
        </ModalTableSection>
      )}
    </>
  );
}

// WhatsApp Pricing Content
function WhatsAppPricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const { rates: chatRates, loading: chatLoading } = useWhatsAppChatRates(selectedCountry);
  const { rates: callRates, loading: callLoading } = useWhatsAppCallRates(selectedCountry);
  const { data: pricingData, loading: pricingLoading } = useCountryPricing(selectedCountry);
  const phoneNumbers = pricingData?.phoneNumbers?.filter(
    (pn: PhoneNumberInfo) => pn.rentalRate != null && pn.rentalRate > 0
  ) || [];
  const countryName = COUNTRY_NAMES[selectedCountry] || selectedCountry;
  const currency = selectedCountry === "IN" ? "₹" : "$";

  const formatChatRate = (rate: number | undefined, cur: string) => {
    if (chatLoading) return <Shimmer />;
    if (rate === undefined) return "—";
    if (rate === 0) return "Free";
    return `${cur}${rate.toFixed(4)}/conversation`;
  };

  if (!chatLoading && !chatRates) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Detailed WhatsApp pricing for {countryName} is available on request.</p>
        <a href="/contact/sales" className="mt-3 inline-block text-sm font-medium text-[#323dfe] hover:underline">Contact sales for rates</a>
      </div>
    );
  }

  const chatCurrency = chatRates?.currency || "$";
  const showAuthIntl = chatRates ? chatRates.authenticationIntl > 0 : false;

  return (
    <>
      <ModalTableSection inline={inline} title="WhatsApp Business conversations">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/2">Conversation type</th>
              <th className="pb-2 font-normal w-1/2">Rate</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Marketing</td>
              <td className="py-2.5 text-gray-600">{formatChatRate(chatRates?.marketing, chatCurrency)}</td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Utility</td>
              <td className="py-2.5 text-gray-600">{formatChatRate(chatRates?.utility, chatCurrency)}</td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Authentication</td>
              <td className="py-2.5 text-gray-600">{formatChatRate(chatRates?.authentication, chatCurrency)}</td>
            </tr>
            {(showAuthIntl || chatLoading) && (
              <tr className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">Authentication (international)</td>
                <td className="py-2.5 text-gray-600">{formatChatRate(chatRates?.authenticationIntl, chatCurrency)}</td>
              </tr>
            )}
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Service</td>
              <td className="py-2.5 text-gray-600">
                {chatLoading ? <Shimmer /> : (chatRates?.service === 0 ? "Free" : formatChatRate(chatRates?.service, chatCurrency))}
              </td>
            </tr>
          </tbody>
        </table>
      </ModalTableSection>

      <ModalTableSection inline={inline} title="WhatsApp voice calls">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/3">Direction</th>
              <th className="pb-2 font-normal w-1/3">Inbound</th>
              <th className="pb-2 font-normal w-1/3">Outbound</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Voice calls</td>
              <td className="py-2.5 text-gray-600">{callLoading ? <Shimmer /> : (callRates?.inbound || "—")}</td>
              <td className="py-2.5 text-gray-600">{callLoading ? <Shimmer /> : (callRates?.outbound || "—")}</td>
            </tr>
          </tbody>
        </table>
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
              ["WhatsApp Business API access", "Included free"],
              ["Template message management", "Included free"],
              ["Rich media support", "Included free"],
              ["Interactive buttons & lists", "Included free"],
              ["Webhook delivery", "Included free"],
            ].map(([feature, price]) => (
              <tr key={feature} className="border-t border-dashed border-gray-200">
                <td className="py-2.5 font-medium text-black">{feature}</td>
                <td className="py-2.5 text-gray-600">{price}</td>
              </tr>
            ))}
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Phone number rental</td>
              <td className="py-2.5 text-gray-600">
                {pricingLoading ? <Shimmer /> : (
                  phoneNumbers.length > 0
                    ? `From ${currency}${Math.min(...phoneNumbers.map((pn: PhoneNumberInfo) => pn.rentalRate!)).toFixed(2)}/month`
                    : `From ${currency}0.50/month`
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </ModalTableSection>
    </>
  );
}

// AI Agents Pricing Content
function AIAgentsPricingContent({ selectedCountry, inline }: { selectedCountry: string; inline?: boolean }) {
  const { data: pricingData, loading } = useCountryPricing(selectedCountry);
  const voiceRates = pricingData?.voiceRates;
  const phoneNumbers = pricingData?.phoneNumbers?.filter(
    (pn: PhoneNumberInfo) => pn.rentalRate != null && pn.rentalRate > 0
  ) || [];
  const pricing = startsAtPricing[selectedCountry];
  const currency = selectedCountry === "IN" ? "₹" : "$";

  const aiRates = selectedCountry === "IN"
    ? { voice: "₹4.00/min", text: "₹0.30/outcome", image: "₹3.40/image", audio: "₹1.70/min" }
    : { voice: "$0.050/min", text: "$0.005/outcome", image: "$0.04/image", audio: "$0.02/min" };

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
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">AI image generation</td>
              <td className="py-2.5 text-gray-600">{aiRates.image}</td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">AI audio generation</td>
              <td className="py-2.5 text-gray-600">{aiRates.audio}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">
          Channel pricing (voice calls, SMS, WhatsApp) is charged separately.
        </p>
      </ModalTableSection>

      <ModalTableSection inline={inline} title="Telephony (charged separately)">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2 font-normal w-1/2">Service</th>
              <th className="pb-2 font-normal w-1/2">Rate</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Inbound calls (local numbers)</td>
              <td className="py-2.5 text-gray-600">
                {loading ? <Shimmer /> : (voiceRates?.localInbound || pricing?.voice || "Contact sales")}
              </td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Outbound calls (local numbers)</td>
              <td className="py-2.5 text-gray-600">
                {loading ? <Shimmer /> : (voiceRates?.localOutbound || pricing?.voice || "Contact sales")}
              </td>
            </tr>
            <tr className="border-t border-dashed border-gray-200">
              <td className="py-2.5 font-medium text-black">Phone number rental</td>
              <td className="py-2.5 text-gray-600">
                {loading ? <Shimmer /> : (
                  phoneNumbers.length > 0
                    ? `From ${currency}${Math.min(...phoneNumbers.map((pn: PhoneNumberInfo) => pn.rentalRate!)).toFixed(2)}/month`
                    : pricing?.phoneNumbers || `From ${currency}0.50/month`
                )}
              </td>
            </tr>
          </tbody>
        </table>
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
  const { country: geoCountry } = useGeoCountry();
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mainSearchQuery, setMainSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const mainDropdownRef = useRef<HTMLDivElement>(null);

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
            Start now with $10 free credits
          </h1>

          {/* Country Selector */}
          <div className="mt-5 flex justify-center">
            <div className="relative" ref={mainDropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                      onChange={(e) => setMainSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto py-1">
                    {mainFilteredCountries.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c.code);
                          setIsDropdownOpen(false);
                          setMainSearchQuery("");
                        }}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-black transition-colors hover:bg-gray-50 ${
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
        {/* Flickering Grid Background */}
        <div className="absolute inset-0 z-0">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={4}
            gridGap={6}
            color="#323dfe"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            {/* Two Tier Cards Side by Side */}
            <div className="grid md:grid-cols-2">
              {/* Pay as you go */}
              <div className="p-6 md:p-8 md:border-r border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-2xl font-semibold text-black">
                      Pay as you go
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      $10 in free credits. No credit card required.
                    </p>
                  </div>
                  <a
                    href="https://cx.plivo.com/pungis2"
                    className="flex-shrink-0 rounded-md bg-black px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    Sign up now
                  </a>
                </div>

                {/* See what's included toggle */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
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
                          <span className="text-sm text-gray-700">Limited to $2500 of monthly usage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enterprise */}
              <div className="p-6 md:p-8 border-t md:border-t-0 border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-2xl font-semibold text-black">
                      Enterprise
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Starts at $500 per month
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
                  onClick={() => setShowDetails(!showDetails)}
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
        </div>
      </section>

      {/* 4-Column Inline Pricing — single box with separator lines */}
      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Voice */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 py-2">
                  <Phone className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">Voice</h3>
                </div>
                <VoicePricingContent selectedCountry={selectedCountry} inline />
              </div>

              {/* AI Agents */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 py-2">
                  <Sparkles className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">AI Agents</h3>
                </div>
                <AIAgentsPricingContent selectedCountry={selectedCountry} inline />
              </div>

              {/* SMS & RCS */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 py-2">
                  <MessageSquare className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">SMS & RCS</h3>
                </div>
                <SMSPricingContent selectedCountry={selectedCountry} inline />
              </div>

              {/* WhatsApp */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 py-2">
                  <WhatsAppIcon className="h-5 w-5 text-[#323dfe]" />
                  <h3 className="text-base font-semibold text-black">WhatsApp</h3>
                </div>
                <WhatsAppPricingContent selectedCountry={selectedCountry} inline />
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
