"use client";

import { useState, useMemo } from "react";

// Country data with pricing
const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", smsRate: 0.0070, voiceRate: 0.0100, whatsappRate: 0.0048, otherSmsRate: 0.0305 },
  { code: "CA", name: "Canada", flag: "🇨🇦", smsRate: 0.0070, voiceRate: 0.0120, whatsappRate: 0.0048, otherSmsRate: 0.0280 },
  { code: "IN", name: "India", flag: "🇮🇳", smsRate: 0.00018, voiceRate: 0.0048, whatsappRate: 0.0022, otherSmsRate: 0.0671 },
  { code: "AU", name: "Australia", flag: "🇦🇺", smsRate: 0.04513, voiceRate: 0.0230, whatsappRate: 0.0165, otherSmsRate: 0.0650 },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", smsRate: 0.0400, voiceRate: 0.0150, whatsappRate: 0.0098, otherSmsRate: 0.0520 },
  { code: "DE", name: "Germany", flag: "🇩🇪", smsRate: 0.0750, voiceRate: 0.0180, whatsappRate: 0.0131, otherSmsRate: 0.0950 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", smsRate: 0.0350, voiceRate: 0.0200, whatsappRate: 0.0080, otherSmsRate: 0.0480 },
];

// Volume options
const volumeOptions = [10000, 50000, 100000, 500000, 1000000];

// Other platforms fixed costs
const OTHER_OTP_COST = 5000;
const OTHER_FRAUD_COST = 15000;

export default function VerifyPriceCalculator() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [volume, setVolume] = useState(100000);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const calculations = useMemo(() => {
    // Plivo costs (only SMS, no OTP or fraud fees)
    const plivoSmsCost = volume * selectedCountry.smsRate;
    const plivoTotal = plivoSmsCost;

    // Other platforms costs
    const otherSmsCost = volume * selectedCountry.otherSmsRate;
    const otherTotal = otherSmsCost + OTHER_OTP_COST + OTHER_FRAUD_COST;

    // Savings
    const savings = otherTotal - plivoTotal;
    const savingsPercent = Math.round((savings / otherTotal) * 100);

    return {
      plivoSmsCost,
      plivoTotal,
      otherSmsCost,
      otherTotal,
      savings,
      savingsPercent,
    };
  }, [selectedCountry, volume]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Calculate bar heights for visualization
  const maxCost = Math.max(calculations.otherTotal, calculations.plivoTotal);
  const otherBarHeight = (calculations.otherTotal / maxCost) * 100;
  const plivoBarHeight = (calculations.plivoTotal / maxCost) * 100;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Price Calculator
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            See how much you can save with Plivo Verify compared to other platforms.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Controls Row */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Country Selector */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select geography
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="text-sm font-medium text-gray-900">{selectedCountry.name}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                            selectedCountry.code === country.code ? 'bg-[#323dfe]/5' : ''
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-sm text-gray-900">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Volume Selector */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select no. of SMS
                </label>
                <div className="space-y-3">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {formatNumber(volume)}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {volumeOptions.map((v) => (
                      <button
                        key={v}
                        onClick={() => setVolume(v)}
                        className={`flex-1 h-2 rounded-full transition-colors ${
                          volume >= v ? 'bg-[#323dfe]' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="flex-1 text-center">10K</span>
                    <span className="flex-1 text-center">50K</span>
                    <span className="flex-1 text-center">100K</span>
                    <span className="flex-1 text-center">500K</span>
                    <span className="flex-1 text-center">1M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
              Cost comparison - For {formatNumber(volume)} SMS in {selectedCountry.name}
            </h3>

            <div className="grid gap-3 md:grid-cols-3">
              {/* Other Platforms */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-6">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Other Platforms</span>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(calculations.otherTotal)}</p>
                </div>

                {/* Horizontal stacked bar with labels */}
                <div className="relative mb-6">
                  {/* Bar container */}
                  <div className="h-12 rounded overflow-hidden flex">
                    <div
                      className="bg-gray-300 transition-all duration-300 flex items-center justify-center"
                      style={{ width: `${(calculations.otherSmsCost / calculations.otherTotal) * 100}%` }}
                    />
                    <div
                      className="bg-gray-400 transition-all duration-300 flex items-center justify-center"
                      style={{ width: `${(OTHER_OTP_COST / calculations.otherTotal) * 100}%` }}
                    />
                    <div
                      className="bg-gray-500 transition-all duration-300 flex items-center justify-center"
                      style={{ width: `${(OTHER_FRAUD_COST / calculations.otherTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Legend with values */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-300" />
                      <span className="text-sm text-gray-600">SMS</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(calculations.otherSmsCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-400" />
                      <span className="text-sm text-gray-600">OTP Fee</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(OTHER_OTP_COST)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-500" />
                      <span className="text-sm text-gray-600">Fraud Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(OTHER_FRAUD_COST)}</span>
                  </div>
                </div>
              </div>

              {/* Plivo */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#323dfe]">Plivo</span>
                  <p className="text-3xl font-bold text-[#323dfe] mt-1">{formatCurrency(calculations.plivoTotal)}</p>
                </div>

                {/* Horizontal bar */}
                <div className="relative mb-6">
                  <div className="h-12 rounded overflow-hidden bg-gray-100">
                    <div
                      className="h-full bg-[#323dfe] transition-all duration-300 rounded"
                      style={{ width: `${(calculations.plivoTotal / calculations.otherTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Legend with values */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-[#323dfe]" />
                      <span className="text-sm text-gray-600">SMS</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(calculations.plivoSmsCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-200" />
                      <span className="text-sm text-gray-600">OTP Fee</span>
                    </div>
                    <span className="text-sm font-semibold text-[#323dfe]">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-200" />
                      <span className="text-sm text-gray-600">Fraud Shield</span>
                    </div>
                    <span className="text-sm font-semibold text-[#323dfe]">Free</span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-gray-900 rounded-xl p-6 flex flex-col">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Your Savings</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-3xl font-bold text-white">{formatCurrency(calculations.savings)}</p>
                    <p className="text-3xl font-bold text-gray-500/60">{calculations.savingsPercent}% less</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">SMS saved</span>
                    <span className="text-sm font-semibold text-white">{formatCurrency(calculations.otherSmsCost - calculations.plivoSmsCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">OTP saved</span>
                    <span className="text-sm font-semibold text-gray-300">{formatCurrency(OTHER_OTP_COST)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Fraud saved</span>
                    <span className="text-sm font-semibold text-gray-300">{formatCurrency(OTHER_FRAUD_COST)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
