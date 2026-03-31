"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { VERIFY_WHATSAPP_RATES, VERIFY_WHATSAPP_DEFAULT } from "@/data/pricing-data";
import type { CountryListItem } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryISOs } from "@/hooks/useCountryISOs";
import { useCountryPricing } from "@/hooks/useCountryPricing";

const Shimmer = () => (
  <span className="inline-block h-4 w-20 bg-gray-100 rounded animate-pulse" />
);

export default function VerifyPricingPage() {
  const { countries } = useCountryISOs();
  const { country: geoCountry } = useGeoCountry();
  const [selectedCountry, setSelectedCountry] = useState<CountryListItem>(
    countries[0] || { name: "United States", code: "US", flag: "🇺🇸", isPriority: true }
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Native DOM refs
  const countryBtnRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const countriesRef = useRef(countries);
  countriesRef.current = countries;

  const { data: pricingData, loading } = useCountryPricing(selectedCountry.code);

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const match = countries.find((c) => c.code === geoCountry);
    if (match) setSelectedCountry(match);
  }, [geoCountry, countries]);

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

  // Country toggle button - native click
  useEffect(() => {
    const btn = countryBtnRef.current;
    if (!btn) return;
    const handler = () => setIsCountryOpen((prev) => !prev);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  // Search input - native input event
  useEffect(() => {
    const el = searchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => setSearchQuery((e.target as HTMLInputElement).value);
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [isCountryOpen]);

  // Country list items - event delegation
  useEffect(() => {
    const el = countryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-country-code]");
      if (!item) return;
      const code = item.getAttribute("data-country-code")!;
      const country = countriesRef.current.find((c) => c.code === code);
      if (country) {
        setSelectedCountry(country);
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isCountryOpen]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const q = searchQuery.toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery, countries]);

  // WhatsApp rate from verify-specific pricing
  const isIndia = selectedCountry.code === "IN";
  const waRate = VERIFY_WHATSAPP_RATES[selectedCountry.code] ?? VERIFY_WHATSAPP_DEFAULT;
  const waSymbol = isIndia ? "₹" : "$";
  const waRateDisplay = `${waSymbol}${waRate.toFixed(4)}/conversation`;

  // Get SMS and Voice rates from API
  const smsRate = pricingData?.smsOutbound || "Contact sales";
  const voiceRate = pricingData?.voiceRates?.localOutbound || "Contact sales";

  // For India, prefix with ₹ symbol
  const formatChannelRate = (rate: string) => {
    if (!isIndia) return rate;
    if (rate === "Contact sales") return rate;
    // Rate comes as "$X.XXXX/unit" — swap $ with ₹
    if (rate.startsWith("$")) return `₹${rate.slice(1)}`;
    return `₹${rate}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white pt-28 pb-12 lg:pb-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
            Verify Pricing
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Enjoy Verification & Fraud Shield for free. Only messaging (SMS/WhatsApp) or voice costs apply.
          </p>

          {/* Base pricing badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black">
              <span className="text-[#323dfe] font-bold">$0</span> OTP Verification
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black">
              <span className="text-[#323dfe] font-bold">$0</span> Fraud Shield
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black">
              Channel-based pricing only
            </span>
          </div>
        </div>
      </section>

      {/* 3 Pricing Highlight Cards */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-[#323dfe]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#323dfe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-black text-lg mb-2">Only pay to verify REAL users</h3>
              <p className="text-sm text-gray-600">No charges for fraudulent or failed verification attempts.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-[#323dfe]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#323dfe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-black text-lg mb-2">$0 Verification fee</h3>
              <p className="text-sm text-gray-600">Only pay for SMS, Voice, or WhatsApp channel charges.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-[#323dfe]/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#323dfe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-black text-lg mb-2">$0 for Plivo Fraud Shield</h3>
              <p className="text-sm text-gray-600">AI-driven fraud prevention included at no extra cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Pricing Table */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
              Channel pricing
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Only pay the channel fee (SMS/WhatsApp/Voice) based on the destination country.
            </p>
          </div>

          {/* Country Selector */}
          <div className="max-w-xs mx-auto mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select country</label>
            <div className="relative" ref={dropdownRef}>
              <button
                ref={countryBtnRef}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium text-gray-900">{selectedCountry.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                  <div className="p-2 border-b border-gray-100">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search country..."
                      value={searchQuery}
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                      autoFocus
                    />
                  </div>
                  <div ref={countryListRef} className="overflow-y-auto">
                    {filteredCountries.map((country, idx) => (
                      <div key={country.code}>
                        {country.isPriority === false &&
                          idx > 0 &&
                          filteredCountries[idx - 1]?.isPriority === true && (
                            <div className="border-t border-gray-200 my-1" />
                          )}
                        <button
                          data-country-code={country.code}
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

          {/* Channel Rates Grid */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Channel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-black">SMS</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {loading ? <Shimmer /> : <>Starts at {formatChannelRate(smsRate)}</>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href="/sms/pricing/" className="text-[#323dfe] hover:underline font-medium">
                      View detailed pricing
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-black">Voice</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {loading ? <Shimmer /> : <>Starts at {formatChannelRate(voiceRate)}</>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href="/voice/pricing/" className="text-[#323dfe] hover:underline font-medium">
                      View detailed pricing
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-black">WhatsApp</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Starts at {waRateDisplay}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href="/whatsapp-message/pricing/" className="text-[#323dfe] hover:underline font-medium">
                      View detailed pricing
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Maximize ROI Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
              Maximize your ROI with Verify
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need to verify users at scale, without the hidden costs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Simplified regulatory compliance", desc: "Navigate country-specific messaging regulations automatically." },
              { title: "No regulatory overhead", desc: "We handle sender ID registration and carrier compliance." },
              { title: "Pre-registered numbers", desc: "Ready-to-use numbers in 220+ countries, no setup delays." },
              { title: "Carrier-approved templates", desc: "Pre-vetted message formats for maximum deliverability." },
              { title: "Zero verification charges", desc: "Only pay for the SMS, Voice, or WhatsApp channel cost." },
              { title: "High delivery rates", desc: "Optimized routing ensures OTPs reach users reliably." },
              { title: "Specialized carrier routes", desc: "Direct carrier connections for faster, more reliable delivery." },
              { title: "Instant deployment", desc: "Go live in minutes with simple API integration." },
              { title: "Built-in fraud control", desc: "SMS pumping fraud detection included at no extra cost." },
              { title: "Preferred channels", desc: "Smart fallback across SMS, Voice, and WhatsApp." },
            ].map((card, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-sm text-black mb-1.5">{card.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Explicit Charges Section */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
              No hidden charges
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Other platforms charge extra fees for features that Plivo includes for free.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Charge Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Other Platforms</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Plivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Sender ID set-up fees</td>
                  <td className="px-6 py-4 text-sm text-gray-600">$25/sender ID</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">$0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Sender ID recurring fees</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Up to $275</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">$0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Monthly number rental costs</td>
                  <td className="px-6 py-4 text-sm text-gray-600">$500 short code, $1 toll-free, $0.5 long code</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">$0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">10DLC brand registration (one-time)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">$4/brand</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">$0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">10DLC vetting (one-time)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">$40/brand</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">$0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">10DLC campaign (recurring)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">$10/month/campaign</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#323dfe]">$0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
