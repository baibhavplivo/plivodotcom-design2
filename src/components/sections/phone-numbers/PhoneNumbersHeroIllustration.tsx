"use client";

import { useState, useEffect } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const numberTypes = [
  { label: "Local", code: "+1 (415) 555-0142", flag: "🇺🇸", type: "Local" },
  { label: "Toll-free", code: "+1 (800) 555-0199", flag: "🇺🇸", type: "Toll-free" },
  { label: "Mobile", code: "+44 7911 123456", flag: "🇬🇧", type: "Mobile" },
  { label: "Local", code: "+91 22 4567 8901", flag: "🇮🇳", type: "Local" },
];

export default function PhoneNumbersHeroIllustration() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % numberTypes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center">
      {/* Flickering Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={4}
            gridGap={6}
            color="rgb(139, 92, 246)"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 20%, white 70%)",
            }}
          />
        </div>
      </div>

      {/* Console Card */}
      <div
        className={`relative w-full max-w-[380px] transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Console Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-medium text-gray-500 ml-2">Phone numbers</span>
          </div>

          {/* Search Bar */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="text-xs text-gray-400">Search available numbers...</span>
            </div>
          </div>

          {/* Country Badges */}
          <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
            {["🇺🇸 US", "🇬🇧 UK", "🇮🇳 IN", "🇩🇪 DE", "🇦🇺 AU", "🇨🇦 CA"].map((c, i) => (
              <span
                key={i}
                className="px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-600"
              >
                {c}
              </span>
            ))}
            <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500">
              +60 more
            </span>
          </div>

          {/* Number List */}
          <div className="px-4 pb-4 space-y-2">
            {numberTypes.map((num, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-500 ${
                  activeIndex === i
                    ? "border-[#323dfe]/30 bg-[#323dfe]/5 shadow-sm"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{num.flag}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{num.code}</p>
                    <p className="text-[10px] text-gray-400">{num.type}</p>
                  </div>
                </div>
                <button
                  className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-500 ${
                    activeIndex === i
                      ? "bg-[#323dfe] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {activeIndex === i ? "Buy" : "Select"}
                </button>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-gray-500">Instant activation</span>
            </div>
            <span className="text-[10px] text-gray-400">50+ countries</span>
          </div>
        </div>
      </div>
    </div>
  );
}
