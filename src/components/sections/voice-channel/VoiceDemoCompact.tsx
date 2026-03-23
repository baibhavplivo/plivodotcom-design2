"use client";

import { useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function VoiceDemoCompact() {
  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "english">(
    "english"
  );

  const handleTalk = () => {
    alert(
      `Voice AI Demo\n\nLanguage: ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}\n\nThis would trigger the AI voice conversation.`
    );
  };

  return (
    <div className="flex flex-col items-center lg:items-end">
      {/* Demo Card */}
      <div className="w-full max-w-[420px] overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Main Content Area with Flickering Grid */}
        <div className="relative min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center">
          {/* FlickeringGrid Background - Extends beyond edges to hide grid gaps */}
          <div className="absolute -inset-2 z-0 overflow-hidden">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={4}
              gridGap={6}
              color="#8B5CF6"
              maxOpacity={0.4}
              flickerChance={0.1}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Language Selector */}
            <div className="flex rounded-full bg-white p-0.5 shadow-sm">
              <button
                onClick={() => setSelectedLanguage("hindi")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedLanguage === "hindi"
                    ? "text-white"
                    : "text-gray-500 hover:text-black"
                }`}
                style={
                  selectedLanguage === "hindi"
                    ? {
                        background:
                          "linear-gradient(135deg, #323dfe 0%, #cd3ef9 50%, #9ca3af 100%)",
                      }
                    : undefined
                }
              >
                <span className="mr-0.5">🇮🇳</span> Hindi
              </button>
              <button
                onClick={() => setSelectedLanguage("english")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedLanguage === "english"
                    ? "text-white"
                    : "text-gray-500 hover:text-black"
                }`}
                style={
                  selectedLanguage === "english"
                    ? {
                        background:
                          "linear-gradient(135deg, #323dfe 0%, #cd3ef9 50%, #9ca3af 100%)",
                      }
                    : undefined
                }
              >
                <span className="mr-0.5">🇮🇳</span> English
              </button>
            </div>

            {/* Talk Button */}
            <button
              onClick={handleTalk}
              className="flex items-center gap-3 sm:gap-5 rounded-[80px] bg-white pl-3 pr-8 sm:pl-4 sm:pr-14 py-3 sm:py-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Gradient Circle with Dancing Bars */}
              <div
                className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #323dfe 0%, #cd3ef9 50%, #9ca3af 100%)",
                }}
              >
                <div className="flex items-center gap-[3px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="animate-wave-bar w-[3px] rounded-full bg-white"
                      style={{
                        height: `${14 + (i % 3) * 5}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <span className="text-base sm:text-xl font-semibold text-black">
                Press to talk
              </span>
            </button>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="bg-white px-6 sm:px-8 py-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Latency
              </span>
              <span className="text-base font-semibold text-black">500ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Turn Detection
              </span>
              <span className="text-base font-semibold text-green-500">On</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Noise Cancellation
              </span>
              <span className="text-base font-semibold text-green-500">On</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave-bar {
          animation: wave-bar 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
