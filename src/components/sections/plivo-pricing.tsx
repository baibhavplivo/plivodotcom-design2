"use client";

import { useState } from "react";
import { Phone, MessageSquare, Sparkles, Check, ChevronDown, X } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

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

// Starts at pricing data by country
const startsAtPricing: Record<string, {
  voice: string;
  sms: string;
  phoneNumbers: string;
  whatsappChat: string;
  whatsappCall: string;
  aiAgents: string;
}> = {
  IN: {
    voice: "₹0.74/min",
    sms: "₹0.155/sms",
    phoneNumbers: "₹250/month",
    whatsappChat: "₹0.12/conversation",
    whatsappCall: "₹0.45/min",
    aiAgents: "₹0.30/min",
  },
  US: {
    voice: "$0.0055/min",
    sms: "$0.0050/sms",
    phoneNumbers: "$0.80/month",
    whatsappChat: "$0.0135/conversation",
    whatsappCall: "$0.010/min",
    aiAgents: "$0.004/min",
  },
  GB: {
    voice: "£0.008/min",
    sms: "£0.0075/sms",
    phoneNumbers: "£0.80/month",
    whatsappChat: "£0.023/conversation",
    whatsappCall: "£0.012/min",
    aiAgents: "£0.003/min",
  },
  AU: {
    voice: "A$0.0085/min",
    sms: "A$0.0065/sms",
    phoneNumbers: "A$1.50/month",
    whatsappChat: "A$0.030/conversation",
    whatsappCall: "A$0.015/min",
    aiAgents: "A$0.005/min",
  },
  CA: {
    voice: "C$0.0065/min",
    sms: "C$0.0055/sms",
    phoneNumbers: "C$1.00/month",
    whatsappChat: "C$0.018/conversation",
    whatsappCall: "C$0.012/min",
    aiAgents: "C$0.0045/min",
  },
  // European countries (EUR)
  DE: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  FR: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  IT: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  ES: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  NL: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  BE: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  CH: { voice: "CHF0.008/min", sms: "CHF0.007/sms", phoneNumbers: "CHF0.90/month", whatsappChat: "CHF0.014/conversation", whatsappCall: "CHF0.012/min", aiAgents: "CHF0.005/min" },
  AT: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  SE: { voice: "kr0.07/min", sms: "kr0.06/sms", phoneNumbers: "kr8/month", whatsappChat: "kr0.12/conversation", whatsappCall: "kr0.10/min", aiAgents: "kr0.04/min" },
  NO: { voice: "kr0.08/min", sms: "kr0.07/sms", phoneNumbers: "kr9/month", whatsappChat: "kr0.14/conversation", whatsappCall: "kr0.11/min", aiAgents: "kr0.05/min" },
  DK: { voice: "kr0.05/min", sms: "kr0.04/sms", phoneNumbers: "kr6/month", whatsappChat: "kr0.09/conversation", whatsappCall: "kr0.07/min", aiAgents: "kr0.03/min" },
  FI: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  IE: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  PT: { voice: "€0.007/min", sms: "€0.006/sms", phoneNumbers: "€0.75/month", whatsappChat: "€0.012/conversation", whatsappCall: "€0.010/min", aiAgents: "€0.004/min" },
  PL: { voice: "zł0.025/min", sms: "zł0.022/sms", phoneNumbers: "zł3.50/month", whatsappChat: "zł0.05/conversation", whatsappCall: "zł0.04/min", aiAgents: "zł0.015/min" },
  // Americas
  BR: { voice: "R$0.035/min", sms: "R$0.03/sms", phoneNumbers: "R$4.50/month", whatsappChat: "R$0.07/conversation", whatsappCall: "R$0.05/min", aiAgents: "R$0.02/min" },
  MX: { voice: "$0.012/min", sms: "$0.010/sms", phoneNumbers: "$1.20/month", whatsappChat: "$0.018/conversation", whatsappCall: "$0.014/min", aiAgents: "$0.006/min" },
  AR: { voice: "$0.015/min", sms: "$0.012/sms", phoneNumbers: "$1.50/month", whatsappChat: "$0.022/conversation", whatsappCall: "$0.018/min", aiAgents: "$0.007/min" },
  CL: { voice: "$0.014/min", sms: "$0.011/sms", phoneNumbers: "$1.40/month", whatsappChat: "$0.020/conversation", whatsappCall: "$0.016/min", aiAgents: "$0.006/min" },
  CO: { voice: "$0.013/min", sms: "$0.010/sms", phoneNumbers: "$1.30/month", whatsappChat: "$0.019/conversation", whatsappCall: "$0.015/min", aiAgents: "$0.006/min" },
  // Asia Pacific
  JP: { voice: "¥0.85/min", sms: "¥0.75/sms", phoneNumbers: "¥120/month", whatsappChat: "¥2.0/conversation", whatsappCall: "¥1.5/min", aiAgents: "¥0.6/min" },
  KR: { voice: "₩9/min", sms: "₩8/sms", phoneNumbers: "₩1200/month", whatsappChat: "₩18/conversation", whatsappCall: "₩14/min", aiAgents: "₩6/min" },
  SG: { voice: "S$0.008/min", sms: "S$0.007/sms", phoneNumbers: "S$1.10/month", whatsappChat: "S$0.018/conversation", whatsappCall: "S$0.014/min", aiAgents: "S$0.006/min" },
  HK: { voice: "HK$0.055/min", sms: "HK$0.048/sms", phoneNumbers: "HK$7/month", whatsappChat: "HK$0.11/conversation", whatsappCall: "HK$0.09/min", aiAgents: "HK$0.035/min" },
  MY: { voice: "RM0.025/min", sms: "RM0.022/sms", phoneNumbers: "RM3.80/month", whatsappChat: "RM0.06/conversation", whatsappCall: "RM0.045/min", aiAgents: "RM0.018/min" },
  TH: { voice: "฿0.25/min", sms: "฿0.22/sms", phoneNumbers: "฿30/month", whatsappChat: "฿0.50/conversation", whatsappCall: "฿0.40/min", aiAgents: "฿0.15/min" },
  ID: { voice: "Rp90/min", sms: "Rp80/sms", phoneNumbers: "Rp13000/month", whatsappChat: "Rp200/conversation", whatsappCall: "Rp150/min", aiAgents: "Rp60/min" },
  PH: { voice: "₱0.35/min", sms: "₱0.30/sms", phoneNumbers: "₱50/month", whatsappChat: "₱0.75/conversation", whatsappCall: "₱0.55/min", aiAgents: "₱0.22/min" },
  VN: { voice: "₫150/min", sms: "₫130/sms", phoneNumbers: "₫20000/month", whatsappChat: "₫350/conversation", whatsappCall: "₫250/min", aiAgents: "₫100/min" },
  NZ: { voice: "NZ$0.010/min", sms: "NZ$0.008/sms", phoneNumbers: "NZ$1.30/month", whatsappChat: "NZ$0.022/conversation", whatsappCall: "NZ$0.017/min", aiAgents: "NZ$0.007/min" },
  // Middle East & Africa
  ZA: { voice: "R0.12/min", sms: "R0.10/sms", phoneNumbers: "R15/month", whatsappChat: "R0.25/conversation", whatsappCall: "R0.18/min", aiAgents: "R0.07/min" },
  AE: { voice: "د.إ0.025/min", sms: "د.إ0.022/sms", phoneNumbers: "د.إ3.20/month", whatsappChat: "د.إ0.055/conversation", whatsappCall: "د.إ0.040/min", aiAgents: "د.إ0.016/min" },
  SA: { voice: "﷼0.025/min", sms: "﷼0.022/sms", phoneNumbers: "﷼3.20/month", whatsappChat: "﷼0.055/conversation", whatsappCall: "﷼0.040/min", aiAgents: "﷼0.016/min" },
  IL: { voice: "₪0.022/min", sms: "₪0.019/sms", phoneNumbers: "₪3.00/month", whatsappChat: "₪0.050/conversation", whatsappCall: "₪0.038/min", aiAgents: "₪0.015/min" },
  TR: { voice: "₺0.18/min", sms: "₺0.16/sms", phoneNumbers: "₺25/month", whatsappChat: "₺0.45/conversation", whatsappCall: "₺0.32/min", aiAgents: "₺0.13/min" },
};

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Voice Pricing Modal Component
function VoicePricingModal({
  isOpen,
  onClose,
  selectedCountry,
  setSelectedCountry
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const country = countries.find(c => c.code === selectedCountry) || countries[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-inter text-xl font-semibold text-black">Voice detailed pricing</h2>
          <div className="flex items-center gap-3">
            {/* Country Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50"
              >
                <span className="text-base">{country.flag}</span>
                <span>{country.name}</span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 w-56 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c.code);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-black transition-colors hover:bg-gray-50 ${
                        c.code === selectedCountry ? 'bg-gray-50 font-medium' : ''
                      }`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Voice Calls Section */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="font-inter font-semibold text-base text-black">Voice Calls</h3>
            </div>
            <div className="px-6 pb-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3 font-normal w-1/3">Number Type</th>
                    <th className="pb-3 font-normal w-1/3">Outbound Calls</th>
                    <th className="pb-3 font-normal w-1/3">Inbound Calls</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Long Codes</td>
                    <td className="py-4 text-gray-600">
                      <span className="text-xs text-gray-400 block">Starts at</span>
                      $0.0093/minute
                    </td>
                    <td className="py-4 text-gray-600">Free</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Toll-Free</td>
                    <td className="py-4 text-gray-600">Not Supported</td>
                    <td className="py-4 text-gray-600">$0.2000/minute</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">SIP Phone, Browser, or App Calls</td>
                    <td className="py-4 text-gray-600">$0.0033/minute</td>
                    <td className="py-4 text-gray-600">Not Supported</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Phone Numbers Section */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="font-inter font-semibold text-base text-black">Phone Numbers</h3>
            </div>
            <div className="px-6 pb-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3 font-normal w-1/2">Number Type</th>
                    <th className="pb-3 font-normal w-1/2">Price</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Long Codes</td>
                    <td className="py-4 text-gray-600">Not Supported</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Toll-Free</td>
                    <td className="py-4 text-gray-600">Not Supported</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Add-On Services Section */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="font-inter font-semibold text-base text-black">Add-On Services</h3>
            </div>
            <div className="px-6 pb-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3 font-normal w-1/2">Service</th>
                    <th className="pb-3 font-normal w-1/2">Price</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Multilingual Text to Speech</td>
                    <td className="py-4 text-gray-600">Included Free</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Call Recording</td>
                    <td className="py-4 text-gray-600">Included Free</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Recording Storage</td>
                    <td className="py-4 text-gray-600">$0.0004/min/month (Free for 90 days)</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Automatic Machine Detection</td>
                    <td className="py-4 text-gray-600">Included Free</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Dynamic Caller ID</td>
                    <td className="py-4 text-gray-600">Included Free</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Concurrent Calls</td>
                    <td className="py-4 text-gray-600">Included Free</td>
                  </tr>
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">Transcription</td>
                    <td className="py-4 text-gray-600">Auto $0.0095/minute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Network Groups Section */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="font-inter font-semibold text-base text-black">Network Groups</h3>
            </div>
            <div className="px-6 pb-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3 font-normal">Network Groups</th>
                    <th className="pb-3 font-normal">Destination Prefix</th>
                    <th className="pb-3 font-normal">Origination Prefix</th>
                    <th className="pb-3 font-normal text-right">Price/Min</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="py-4 font-medium text-black">India All Networks</td>
                    <td className="py-4 text-gray-600">+91</td>
                    <td className="py-4 text-gray-600">—</td>
                    <td className="py-4 text-gray-600 text-right">$0.0500/min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlivoPricing() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const country = countries.find(c => c.code === selectedCountry) || countries[0];
  const pricing = startsAtPricing[selectedCountry];

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
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-64 items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-50 w-64 max-h-72 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c.code);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-black transition-colors hover:bg-gray-50 ${
                        c.code === selectedCountry ? 'bg-gray-50 font-medium' : ''
                      }`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="relative pb-12 lg:pb-16 overflow-hidden">
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
          {/* Fade overlay for softer effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          {/* Unified Pricing Box */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            {/* Two Tier Cards */}
            <div className="grid md:grid-cols-2">
              {/* Pay as you go Tier */}
              <div className="p-8 md:border-r border-gray-200">
              <h2 className="font-inter text-2xl font-semibold text-black text-center">
                Pay as you go
              </h2>
              <p className="text-gray-600 text-center mt-2">
                $10 in free credits. No credit card required.
              </p>

              {/* CTA Button */}
              <a
                href="https://console.plivo.com/accounts/register/"
                className="mt-6 block w-full rounded-lg bg-black py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Sign up now
              </a>

              {/* Coverage */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-black mb-3">Coverage</h3>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#323dfe]" />
                  <span className="text-sm text-gray-700">United States, India</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-black mb-3">Features</h3>
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

              {/* Enterprise Tier */}
              <div className="p-8 border-t md:border-t-0 border-gray-200">
              <h2 className="font-inter text-2xl font-semibold text-black text-center">
                Enterprise
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Starts at $500 per month
              </p>

              {/* CTA Button */}
              <a
                href="/contact/sales"
                className="mt-6 block w-full rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-medium text-black transition-colors hover:bg-gray-50"
              >
                Talk to sales
              </a>

              {/* Coverage */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-black mb-3">Coverage</h3>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#323dfe]" />
                  <span className="text-sm text-gray-700">United States, India & 190 countries</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-black mb-3">Features</h3>
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
                    <span className="text-sm text-gray-700">Slack based onboarding</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Channel Pricing Grid */}
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
              {[
                { icon: <Phone className="h-4 w-4 text-[#323dfe]" />, title: "Voice", startsAt: pricing.voice, url: "/pricing/voice" },
                { icon: <Sparkles className="h-4 w-4 text-[#323dfe]" />, title: "AI Agents", startsAt: pricing.aiAgents, url: "/pricing/ai-agents" },
                { icon: <MessageSquare className="h-4 w-4 text-[#323dfe]" />, title: "SMS & RCS", startsAt: pricing.sms, url: "/pricing/sms" },
                { icon: <WhatsAppIcon className="h-4 w-4 text-[#323dfe]" />, title: "WhatsApp", startsAt: pricing.whatsappChat, url: "/pricing/whatsapp" },
              ].map((item, index) => {
                // border-t on mobile for bottom row (items 2,3)
                const isBottomRowMobile = index >= 2;

                return (
                  <div
                    key={item.title}
                    className={`flex flex-col justify-center px-4 py-5 sm:px-6 sm:py-6
                      ${isBottomRowMobile ? "border-t border-gray-200 sm:border-t-0" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {item.icon}
                        <span className="text-sm font-medium text-black">{item.title}</span>
                      </div>
                      {item.title === "Voice" ? (
                        <button
                          onClick={() => setIsVoiceModalOpen(true)}
                          className="text-xs text-[#323dfe] hover:underline"
                        >
                          View details
                        </button>
                      ) : (
                        <a href={item.url} className="text-xs text-[#323dfe] hover:underline">
                          View details
                        </a>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-black/50">starts at</div>
                      <div className="text-lg font-normal text-black/50 sm:text-xl">{item.startsAt}</div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Pricing Modal */}
      <VoicePricingModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  );
}

export default PlivoPricing;
