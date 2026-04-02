"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import {
  VERIFY_CHANNEL_COUNTRIES,
  VERIFY_PAGE_COPY,
  formatVerifyRate,
  getVerifyChannelPricing,
  getVerifyPricingLinks,
} from "@/data/verify-pricing";
import {
  getStoredVerifyCountryCode,
  subscribeToVerifyCountryChange,
  syncVerifyCountryCode,
} from "@/components/sections/sms-channel/verify-country-sync";

const pricingHighlightDescriptions = [
  "No charges for fraudulent or failed verification attempts.",
  "Only pay SMS, Voice, or WhatsApp channel charges.",
  "AI-driven fraud prevention included at no extra cost.",
];

const roiFeatureIcons = [
  ShieldCheck,
  Check,
  Phone,
  MessageSquare,
  Zap,
  TrendingUp,
  Target,
  Clock,
  ShieldCheck,
  MessageCircle,
];

export default function VerifyPricingPage() {
  const { country: geoCountry } = useGeoCountry("US", { mode: "exact" });
  const [selectedCountry, setSelectedCountry] = useState(
    VERIFY_CHANNEL_COUNTRIES[0],
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialCode = getStoredVerifyCountryCode() ?? geoCountry;
    const match = VERIFY_CHANNEL_COUNTRIES.find((country) => country.code === initialCode);
    if (match) setSelectedCountry(match);
  }, [geoCountry]);

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

  useEffect(() => {
    return subscribeToVerifyCountryChange((code) => {
      const match = VERIFY_CHANNEL_COUNTRIES.find((country) => country.code === code);
      if (match) {
        setSelectedCountry((currentCountry) =>
          currentCountry.code === match.code ? currentCountry : match,
        );
      }
    });
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return VERIFY_CHANNEL_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return VERIFY_CHANNEL_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const channelPricing = getVerifyChannelPricing(selectedCountry.code);
  const pricingLinks = getVerifyPricingLinks(selectedCountry.code);
  const smsRateLabel = formatVerifyRate(selectedCountry.code, channelPricing.smsRate, "sms");
  const voiceRateLabel = formatVerifyRate(selectedCountry.code, channelPricing.voiceRate, "min");
  const whatsappRateLabel = formatVerifyRate(
    selectedCountry.code,
    channelPricing.whatsappRate,
    "conversation",
  );
  const hiddenChargesByCategory = VERIFY_PAGE_COPY.noHiddenChargesRows.reduce<
    Record<string, typeof VERIFY_PAGE_COPY.noHiddenChargesRows>
  >((groups, row) => {
    groups[row.category] = [...(groups[row.category] ?? []), row];
    return groups;
  }, {});

  const updateSelectedCountry = (country: (typeof VERIFY_CHANNEL_COUNTRIES)[number]) => {
    setSelectedCountry(country);
    syncVerifyCountryCode(country.code);
  };

  return (
    <>
      <section className="bg-white pt-28 pb-12 lg:pb-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
            {VERIFY_PAGE_COPY.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {VERIFY_PAGE_COPY.heroDescription}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black">
              <span className="text-[#323dfe] font-bold">{VERIFY_PAGE_COPY.basePricingValue}</span>
              OTP Verification costs
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black">
              <span className="text-[#323dfe] font-bold">{VERIFY_PAGE_COPY.basePricingValue}</span>
              Fraud Shield cost
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black">
              {VERIFY_PAGE_COPY.channelPricingValue} Channel Pricing
            </span>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {VERIFY_PAGE_COPY.pricingHighlights.map((title, index) => (
              <div key={title} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="w-10 h-10 rounded-full bg-[#323dfe]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#323dfe]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        index === 0
                          ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          : index === 1
                            ? "M5 13l4 4L19 7"
                            : "M13 10V3L4 14h7v7l9-11h-7z"
                      }
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-black text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600">
                  {pricingHighlightDescriptions[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
              {VERIFY_PAGE_COPY.channelPricingTitle}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              {VERIFY_PAGE_COPY.channelPricingDescriptionLong}
            </p>
          </div>

          <div className="max-w-xs mx-auto mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {VERIFY_PAGE_COPY.countrySelectorLabel}
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsCountryOpen((open) => !open)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedCountry.name}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${isCountryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search country..."
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto">
                    {filteredCountries.map((country, index) => (
                      <div key={country.code}>
                        {!country.isPriority &&
                          index > 0 &&
                          filteredCountries[index - 1]?.isPriority && (
                            <div className="border-t border-gray-200 my-1" />
                          )}
                        <button
                          type="button"
                          onClick={() => {
                            updateSelectedCountry(country);
                            setIsCountryOpen(false);
                            setSearchQuery("");
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                            selectedCountry.code === country.code ? "bg-[#323dfe]/5" : ""
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-sm text-gray-900">{country.name}</span>
                        </button>
                      </div>
                    ))}
                    {filteredCountries.length === 0 && (
                      <div className="px-3 py-3 text-sm text-gray-500">No countries found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Channel
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                    Rate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-black">SMS</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {smsRateLabel === "Not supported" ? smsRateLabel : `Starts at ${smsRateLabel}`}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href={pricingLinks.sms} className="text-[#323dfe] hover:underline font-medium">
                      View detailed network pricing
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-black">Voice</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {voiceRateLabel === "Not supported"
                      ? voiceRateLabel
                      : `Starts at ${voiceRateLabel}`}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href={pricingLinks.voice} className="text-[#323dfe] hover:underline font-medium">
                      View detailed network pricing
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-black">WhatsApp</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {`Starts at ${whatsappRateLabel}`}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={pricingLinks.whatsapp}
                      className="text-[#323dfe] hover:underline font-medium"
                    >
                      View detailed network pricing
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
              {VERIFY_PAGE_COPY.noHiddenChargesTitle}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Charge</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Other Players</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Plivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(hiddenChargesByCategory).map(([category, rows]) => (
                  rows.map((row, rowIndex) => (
                    <tr key={`${category}-${row.label}`} className={rowIndex === 0 ? "border-t border-gray-200" : ""}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {rowIndex === 0 && (
                          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                            {category}
                          </div>
                        )}
                        <div className="font-medium text-black">{row.label}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.others || "-"}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">
                        {row.plivo || "-"}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
              {VERIFY_PAGE_COPY.roiTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {VERIFY_PAGE_COPY.roiFeatures.map((feature, index) => {
              const Icon = roiFeatureIcons[index] ?? ShieldCheck;
              return (
                <div
                  key={feature}
                  className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 transition-colors hover:border-gray-300"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#323dfe]/8 text-[#323dfe]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-sm text-black leading-relaxed">{feature}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
