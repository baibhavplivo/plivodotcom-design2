"use client";

import { useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function VoiceDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "english">(
    "hindi"
  );

  const handleTalk = () => {
    console.log(`Starting conversation in ${selectedLanguage}`);
    alert(
      `Voice AI Demo\n\nLanguage: ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}\n\nThis would trigger the AI voice conversation.`
    );
  };

  return (
    <section className="voice-demo-section relative z-20 bg-white overflow-hidden pt-2 pb-20">
      {/* FlickeringGrid Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.3)_15%,rgba(255,255,255,0.7)_30%,white_45%,white_55%,rgba(255,255,255,0.7)_70%,rgba(255,255,255,0.3)_85%,transparent_100%)]"
          squareSize={4}
          gridGap={6}
          color="#8B5CF6"
          maxOpacity={0.65}
          flickerChance={0.1}
        />
      </div>

      {/* Fade Edges - Left and Right */}
      <div className="absolute inset-y-0 left-0 z-[5] w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 z-[5] w-32 bg-gradient-to-l from-white to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-12">
        {/* Language Selector */}
        <div className="flex rounded-full bg-white p-0.5 shadow-sm">
          <button
            onClick={() => setSelectedLanguage("hindi")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedLanguage === "hindi"
                ? "text-white"
                : "text-gray-500 hover:text-black"
              }`}
            style={selectedLanguage === "hindi" ? {
              background: "linear-gradient(135deg, #323dfe 0%, #cd3ef9 50%, #9ca3af 100%)",
            } : undefined}
          >
            <span className="mr-0.5">🇮🇳</span> Hindi
          </button>
          <button
            onClick={() => setSelectedLanguage("english")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedLanguage === "english"
                ? "text-white"
                : "text-gray-500 hover:text-black"
              }`}
            style={selectedLanguage === "english" ? {
              background: "linear-gradient(135deg, #323dfe 0%, #cd3ef9 50%, #9ca3af 100%)",
            } : undefined}
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
              background: "linear-gradient(135deg, #323dfe 0%, #cd3ef9 50%, #9ca3af 100%)",
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

      <style>{`
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave-bar {
          animation: wave-bar 0.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
