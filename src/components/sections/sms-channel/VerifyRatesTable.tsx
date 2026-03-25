"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Rates table data - per-unit Plivo Verify channel rates (from verify-pricing.html reference)
const ratesTableData = [
  { country: "United States", sms: "$0.0070/sms", voice: "$0.0100/min", whatsapp: "$0.0044/message" },
  { country: "Canada", sms: "$0.0070/sms", voice: "$0.0120/min", whatsapp: "$0.0044/message" },
  { country: "United Kingdom", sms: "$0.0400/sms", voice: "$0.0150/min", whatsapp: "$0.0242/message" },
  { country: "India", sms: "₹0.155/sms", voice: "₹0.0048/min", whatsapp: "₹0.1232/message" },
  { country: "Australia", sms: "$0.04513/sms", voice: "$0.0230/min", whatsapp: "$0.0124/message" },
  { country: "Germany", sms: "$0.0750/sms", voice: "$0.0180/min", whatsapp: "$0.0605/message" },
  { country: "Brazil", sms: "$0.0350/sms", voice: "$0.0200/min", whatsapp: "$0.0075/message" },
  { country: "France", sms: "$0.0650/sms", voice: "$0.0180/min", whatsapp: "$0.0330/message" },
  { country: "Indonesia", sms: "$0.2959/sms", voice: "$0.0200/min", whatsapp: "$0.0275/message" },
  { country: "Nigeria", sms: "$0.0453/sms", voice: "$0.0200/min", whatsapp: "$0.0074/message" },
  { country: "South Africa", sms: "$0.0188/sms", voice: "$0.0200/min", whatsapp: "$0.0084/message" },
  { country: "Mexico", sms: "$0.1248/sms", voice: "$0.0150/min", whatsapp: "$0.0094/message" },
  { country: "Turkey", sms: "$0.0276/sms", voice: "$0.0200/min", whatsapp: "$0.0058/message" },
  { country: "Italy", sms: "$0.0832/sms", voice: "$0.0180/min", whatsapp: "$0.0330/message" },
  { country: "Spain", sms: "$0.0767/sms", voice: "$0.0180/min", whatsapp: "$0.0220/message" },
  { country: "Argentina", sms: "$0.0375/sms", voice: "$0.0200/min", whatsapp: "$0.0318/message" },
  { country: "Saudi Arabia", sms: "$0.0200/sms", voice: "$0.0200/min", whatsapp: "$0.0127/message" },
  { country: "Colombia", sms: "$0.0100/sms", voice: "$0.0200/min", whatsapp: "$0.0002/message" },
  { country: "Pakistan", sms: "$0.2937/sms", voice: "$0.0200/min", whatsapp: "$0.0059/message" },
  { country: "Israel", sms: "$0.1463/sms", voice: "$0.0200/min", whatsapp: "$0.0058/message" },
  { country: "Egypt", sms: "$0.0538/sms", voice: "$0.0200/min", whatsapp: "$0.0057/message" },
  { country: "Malaysia", sms: "$0.0300/sms", voice: "$0.0150/min", whatsapp: "$0.0154/message" },
  { country: "Singapore", sms: "$0.0370/sms", voice: "$0.0150/min", whatsapp: "$0.0124/message" },
  { country: "Russia", sms: "$0.6148/sms", voice: "$0.0200/min", whatsapp: "$0.0440/message" },
  { country: "Netherlands", sms: "$0.0750/sms", voice: "$0.0180/min", whatsapp: "$0.0550/message" },
  { country: "UAE", sms: "$0.0200/sms", voice: "$0.0200/min", whatsapp: "$0.0173/message" },
];

const INITIAL_COUNT = 5;

export default function VerifyRatesTable() {
  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll ? ratesTableData : ratesTableData.slice(0, INITIAL_COUNT);
  const remaining = ratesTableData.length - INITIAL_COUNT;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Plivo offers the lowest cost per verification
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            No hidden charges. Discover your potential savings with Plivo.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px] items-start">
          {/* Left - Rates Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">SMS Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Voice Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">WhatsApp Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visibleData.map((rate) => (
                    <tr key={rate.country}>
                      <td className="px-6 py-4 text-sm font-medium text-black">{rate.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rate.sms}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rate.voice}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rate.whatsapp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View more / View less button */}
            {remaining > 0 && (
              <div className="border-t border-gray-200 px-6 py-3">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  {showAll ? "Show less" : `View all ${ratesTableData.length} countries`}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Right - Pricing Info */}
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col">
            <h3 className="font-semibold text-black text-lg mb-4">Our Pricing</h3>
            <p className="text-gray-600 text-sm mb-6 flex-1">
              Zero charges for both Fraud Shield and OTP verification services. Only pay SMS, Voice or WhatsApp charges.
            </p>
            <a
              href="https://www.plivo.com/docs/programmable-api/verify/overview"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              View Full Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
