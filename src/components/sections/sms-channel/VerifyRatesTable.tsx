"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  VERIFY_PAGE_COPY,
  VERIFY_RATES_TABLE_COUNTRIES,
  formatVerifyRate,
  getVerifyChannelPricing,
} from "@/data/verify-pricing";

const INITIAL_COUNT = 5;

export default function VerifyRatesTable() {
  const [showAll, setShowAll] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = toggleBtnRef.current;
    if (!button) return;
    const handleClick = () => setShowAll((open) => !open);
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  }, []);

  const visibleCountries = showAll
    ? VERIFY_RATES_TABLE_COUNTRIES
    : VERIFY_RATES_TABLE_COUNTRIES.slice(0, INITIAL_COUNT);
  const remainingCount = Math.max(
    VERIFY_RATES_TABLE_COUNTRIES.length - INITIAL_COUNT,
    0,
  );

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            {VERIFY_PAGE_COPY.ratesTableTitle}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {VERIFY_PAGE_COPY.ratesTableDescription}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px] items-start">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                      SMS Rate
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                      Voice Rate
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                      WhatsApp Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visibleCountries.map((country) => {
                    const pricing = getVerifyChannelPricing(country.code);
                    return (
                      <tr key={country.code}>
                        <td className="px-6 py-4 text-sm font-medium text-black">
                          {country.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatVerifyRate(country.code, pricing.smsRate, "sms")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatVerifyRate(country.code, pricing.voiceRate, "min")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatVerifyRate(country.code, pricing.whatsappRate, "conversation")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {remainingCount > 0 && (
              <div className="border-t border-gray-200 px-6 py-3">
                <button
                  ref={toggleBtnRef}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  {showAll
                    ? "Show less"
                    : `View all ${VERIFY_RATES_TABLE_COUNTRIES.length} countries`}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-100 rounded-xl p-6 flex flex-col">
            <h3 className="font-semibold text-black text-lg mb-4">
              {VERIFY_PAGE_COPY.ratesTableSideTitle}
            </h3>
            <p className="text-gray-600 text-sm mb-6 flex-1">
              {VERIFY_PAGE_COPY.ratesTableSideDescription}
            </p>
            <a
              href={VERIFY_PAGE_COPY.ratesTableSideHref}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-black text-white rounded-md cta-hover-gradient transition-colors"
            >
              {VERIFY_PAGE_COPY.ratesTableSideLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
