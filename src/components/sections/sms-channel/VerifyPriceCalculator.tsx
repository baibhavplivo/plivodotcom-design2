"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { VERIFY_CALCULATOR_DATA, TOP_COUNTRY_CODES, type VerifyCalculatorEntry } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import {
  getStoredVerifyCountryCode,
  subscribeToVerifyCountryChange,
  syncVerifyCountryCode,
} from "@/components/sections/sms-channel/verify-country-sync";

// Volume options matching live site (100K–600K)
const volumeOptions = [100000, 200000, 300000, 400000, 500000, 600000];
const volumeLabels = ["100K", "200K", "300K", "400K", "500K", "600K"];

export default function VerifyPriceCalculator() {
  const { country: geoCountry } = useGeoCountry("US", { mode: "exact" });
  const [selectedCountry, setSelectedCountry] = useState<VerifyCalculatorEntry>(VERIFY_CALCULATOR_DATA[0]);
  const [volume, setVolume] = useState(100000);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Refs for native event listeners (Astro hydration fix)
  const countryToggleRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const volumeContainerRef = useRef<HTMLDivElement>(null);
  const countriesRef = useRef(VERIFY_CALCULATOR_DATA);

  // Auto-select country based on IP geolocation
  useEffect(() => {
    const initialCode = getStoredVerifyCountryCode() ?? geoCountry;
    const match = VERIFY_CALCULATOR_DATA.find(c => c.code === initialCode);
    if (match) setSelectedCountry(match);
  }, [geoCountry]);

  useEffect(() => {
    return subscribeToVerifyCountryChange((code) => {
      const match = VERIFY_CALCULATOR_DATA.find((country) => country.code === code);
      if (match) {
        setSelectedCountry((currentCountry) =>
          currentCountry.code === match.code ? currentCountry : match,
        );
      }
    });
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return VERIFY_CALCULATOR_DATA;
    const q = searchQuery.toLowerCase();
    return VERIFY_CALCULATOR_DATA.filter(c => c.country.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [searchQuery]);

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

  // Native event: Country dropdown toggle
  useEffect(() => {
    const btn = countryToggleRef.current;
    if (!btn) return;
    const handler = () => setIsCountryOpen((prev) => !prev);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  // Native event: Search input
  useEffect(() => {
    const el = searchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => setSearchQuery((e.target as HTMLInputElement).value);
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, [isCountryOpen]);

  // Native event: Country list item clicks (event delegation)
  useEffect(() => {
    const el = countryListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest("[data-country-code]");
      if (!item) return;
      const code = item.getAttribute("data-country-code")!;
      const country = countriesRef.current.find(c => c.code === code);
      if (country) {
        setSelectedCountry(country);
        syncVerifyCountryCode(country.code);
        setIsCountryOpen(false);
        setSearchQuery("");
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [isCountryOpen]);

  // Native event: Volume buttons (event delegation)
  useEffect(() => {
    const el = volumeContainerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-volume]");
      if (!btn) return;
      const v = parseInt(btn.getAttribute("data-volume")!, 10);
      if (!isNaN(v)) setVolume(v);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  const calculations = useMemo(() => {
    // Scale factor: data is per 1000 verifications
    const scaleFactor = volume / 1000;

    // Other platforms costs (3 components)
    const otherSmsCost = selectedCountry.otherSmsCost * scaleFactor;
    const otherVerifyCost = selectedCountry.otherVerifyCost * scaleFactor;
    const otherFraudCost = selectedCountry.otherFraudCost * scaleFactor;
    const otherTotal = otherSmsCost + otherVerifyCost + otherFraudCost;

    // Plivo costs (only SMS, no verify or fraud fees)
    const plivoSmsCost = selectedCountry.plivoSmsCost * scaleFactor;
    const plivoTotal = plivoSmsCost;

    // Savings
    const savings = otherTotal - plivoTotal;
    const savingsPercent = otherTotal > 0 ? Math.round((savings / otherTotal) * 100) : 0;

    return {
      otherSmsCost,
      otherVerifyCost,
      otherFraudCost,
      otherTotal,
      plivoSmsCost,
      plivoTotal,
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

  const hasFraudCost = selectedCountry.otherFraudCost > 0;

  return (
    <section className="bg-background border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-foreground mb-3">
            Price calculator
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            See how much you can save with Plivo Verify compared to other platforms.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          {/* Controls Row */}
          <div className="p-5 sm:p-6 border-b border-border">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Country Selector */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Select geography
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={countryToggleRef}
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-background border border-border-strong rounded-lg hover:border-border-strong transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="text-sm font-medium text-foreground">{selectedCountry.country}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-muted-foreground transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-sm z-10 max-h-72 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-border">
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          className="w-full px-3 py-2 text-sm text-foreground bg-background border border-border-strong rounded-md focus:outline-none focus:border-gray-500 placeholder:text-muted-foreground"
                          autoFocus
                          readOnly={false}
                        />
                      </div>
                      <div className="overflow-y-auto" ref={countryListRef}>
                        {filteredCountries.map((country, idx) => (
                          <div key={country.code}>
                            {!TOP_COUNTRY_CODES.has(country.code) && idx > 0 && TOP_COUNTRY_CODES.has(filteredCountries[idx - 1]?.code) && (
                              <div className="border-t border-border my-1" />
                            )}
                            <div
                              data-country-code={country.code}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-surface transition-colors text-left cursor-pointer ${
                                selectedCountry.code === country.code ? 'bg-primary/5' : ''
                              }`}
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="text-sm text-foreground">{country.country}</span>
                            </div>
                          </div>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="px-3 py-3 text-sm text-muted-foreground">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Volume Selector */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Select no. of sms
                </label>
                <div className="space-y-3">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    {formatNumber(volume)}
                  </p>
                  <div className="flex items-center gap-1.5" ref={volumeContainerRef}>
                    {volumeOptions.map((v) => (
                      <div
                        key={v}
                        data-volume={v}
                        className={`flex-1 h-2 rounded-full transition-colors cursor-pointer ${
                          volume >= v ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {volumeLabels.map((label) => (
                      <span key={label} className="flex-1 text-center">{label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-6">
              Cost comparison - For {formatNumber(volume)} SMS in {selectedCountry.country}
            </h3>

            <div className="grid gap-3 md:grid-cols-3">
              {/* Other Platforms */}
              <div className="bg-background rounded-xl border border-border p-6">
                <div className="mb-6">
                  <span className="text-xs font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Other Platforms</span>
                  <p className="text-3xl font-bold text-foreground mt-1">{formatCurrency(calculations.otherTotal)}</p>
                </div>

                {/* Horizontal stacked bar */}
                <div className="relative mb-6">
                  <div className="h-12 rounded overflow-hidden flex">
                    <div
                      className="bg-gray-300 transition-all duration-300"
                      style={{ width: `${(calculations.otherSmsCost / calculations.otherTotal) * 100}%` }}
                    />
                    <div
                      className="bg-gray-400 transition-all duration-300"
                      style={{ width: `${(calculations.otherVerifyCost / calculations.otherTotal) * 100}%` }}
                    />
                    {hasFraudCost && (
                      <div
                        className="bg-gray-500 transition-all duration-300"
                        style={{ width: `${(calculations.otherFraudCost / calculations.otherTotal) * 100}%` }}
                      />
                    )}
                  </div>
                </div>

                {/* Legend with values */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-300" />
                      <span className="text-sm text-muted-foreground">SMS Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(calculations.otherSmsCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-400" />
                      <span className="text-sm text-muted-foreground">OTP Verification Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(calculations.otherVerifyCost)}</span>
                  </div>
                  {hasFraudCost && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-sm bg-gray-500" />
                        <span className="text-sm text-muted-foreground">Fraud Control Cost</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(calculations.otherFraudCost)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Plivo */}
              <div className="bg-background rounded-xl border border-border p-6">
                <div className="mb-6">
                  <span className="text-xs font-semibold font-mono-ui uppercase tracking-[0.1em] text-primary">Plivo</span>
                  <p className="text-3xl font-bold text-primary mt-1">{formatCurrency(calculations.plivoTotal)}</p>
                </div>

                {/* Horizontal bar */}
                <div className="relative mb-6">
                  <div className="h-12 rounded overflow-hidden bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded"
                      style={{ width: `${calculations.otherTotal > 0 ? (calculations.plivoTotal / calculations.otherTotal) * 100 : 100}%` }}
                    />
                  </div>
                </div>

                {/* Legend with values */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-primary" />
                      <span className="text-sm text-muted-foreground">SMS Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(calculations.plivoSmsCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-200" />
                      <span className="text-sm text-muted-foreground">OTP Verification Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-200" />
                      <span className="text-sm text-muted-foreground">Fraud Control Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">Free</span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-gray-900 rounded-xl p-6 flex flex-col">
                <div>
                  <span className="text-xs font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Savings with Plivo</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-3xl font-bold text-white">{formatCurrency(calculations.savings)}</p>
                    <p className="text-3xl font-bold text-muted-foreground/60">{calculations.savingsPercent}% less</p>
                  </div>
                  <p className="text-sm text-gray-300 mt-3">
                    With Plivo, you save over {calculations.savingsPercent}% of costs compared to other platforms for every {formatNumber(volume)} SMS sent.
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SMS Cost Saved</span>
                    <span className="text-sm font-semibold text-white">{formatCurrency(calculations.otherSmsCost - calculations.plivoSmsCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">OTP Verification Saved</span>
                    <span className="text-sm font-semibold text-gray-300">{formatCurrency(calculations.otherVerifyCost)}</span>
                  </div>
                  {hasFraudCost && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fraud Control Saved</span>
                      <span className="text-sm font-semibold text-gray-300">{formatCurrency(calculations.otherFraudCost)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
