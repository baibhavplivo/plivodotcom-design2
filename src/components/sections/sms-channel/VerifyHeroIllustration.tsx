"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const OTP_CODE = "4829";

export default function VerifyHeroIllustration() {
  const [animationPhase, setAnimationPhase] = useState<
    "idle" | "notification" | "filling" | "complete"
  >("idle");
  const [filledDigits, setFilledDigits] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const runAnimation = () => {
      // Reset
      setAnimationPhase("idle");
      setFilledDigits(0);
      setShowSuccess(false);

      // Phase 1: Show notification sliding down (after 1s)
      setTimeout(() => {
        setAnimationPhase("notification");
      }, 1000);

      // Phase 2: Start filling OTP (after 2.5s)
      setTimeout(() => {
        setAnimationPhase("filling");
      }, 2500);

      // Fill digits one by one
      for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
          setFilledDigits(i);
        }, 2500 + i * 400);
      }

      // Phase 3: Complete (after all digits filled)
      setTimeout(() => {
        setAnimationPhase("complete");
        setShowSuccess(true);
      }, 4500);
    };

    // Initial run
    runAnimation();

    // Loop every 10 seconds
    const loopInterval = setInterval(() => {
      runAnimation();
    }, 10000);

    return () => clearInterval(loopInterval);
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
            color="rgb(50, 61, 254)"
            maxOpacity={0.6}
            flickerChance={0.1}
          />
          {/* Radial fade from all sides */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, white 70%)",
            }}
          />
        </div>
      </div>

      {/* Phone container */}
      <div className="relative h-[520px] sm:h-[560px] overflow-hidden">
        {/* Phone device */}
        <div className="w-[288px] sm:w-[320px]">
          {/* Phone outer frame */}
          <div
            className="relative rounded-[32px] p-1.5 shadow-2xl border border-gray-300 bg-gray-100"
          >

            {/* Screen */}
            <div className="relative rounded-[30px] overflow-hidden bg-white shadow-inner">
              {/* Status bar */}
              <div className="h-7 bg-gray-100 flex items-center justify-between px-5 text-xs font-medium rounded-t-[30px]">
                <div className="flex items-center gap-1 opacity-50">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                  </div>
                  <span className="ml-1 text-black">Plivo</span>
                </div>
                <span className="text-black opacity-50">9:41 AM</span>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="text-black text-[10px]">100%</span>
                  <div className="w-5 h-2.5 rounded-sm bg-black" />
                </div>
              </div>

              {/* Notification Banner - slides down from top */}
              <div
                className={cn(
                  "absolute left-2 right-2 top-8 z-20 transition-all duration-500 ease-out",
                  animationPhase !== "idle"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-full"
                )}
              >
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-3">
                  <div className="flex items-start gap-3">
                    {/* App icon - iOS Messages style */}
                    <div className="w-9 h-9 rounded-lg bg-[#34C759] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                        <path d="M4 4h16v12H5.17L4 17.17z" opacity="0.9" />
                      </svg>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-semibold text-gray-900">
                          Messages
                        </span>
                        <span className="text-[10px] text-gray-400">now</span>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-tight">
                        Your verification code is{" "}
                        <span className="font-bold text-gray-900">
                          {OTP_CODE}
                        </span>
                        . Do not share this code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Content Area */}
              <div className="px-4 pt-8 pb-4 min-h-[552px] bg-white">
                {/* App Header */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="url(#verifyIconGradient)"
                    >
                      <defs>
                        <linearGradient id="verifyIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#cd3ef9" />
                          <stop offset="100%" stopColor="#323dfe" />
                        </linearGradient>
                      </defs>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Verify Your Number
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter the 4-digit code sent to
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    +1 (555) 123-4567
                  </p>
                </div>

                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-3 mb-3">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-14 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300",
                        filledDigits > index
                          ? "border-gray-400 bg-gray-100 text-gray-700"
                          : "border-gray-300 bg-white text-gray-900",
                        animationPhase === "filling" &&
                          filledDigits === index &&
                          "border-gray-500 scale-105"
                      )}
                    >
                      <span
                        className={cn(
                          "transition-all duration-200",
                          filledDigits > index
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-50"
                        )}
                      >
                        {filledDigits > index ? OTP_CODE[index] : ""}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Success State */}
                <div
                  className={cn(
                    "transition-all duration-500",
                    showSuccess
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#cd3ef9] via-[#323dfe] to-black flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <span className="font-medium bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">
                      Verified successfully!
                    </span>
                  </div>
                </div>

                {/* Verify Button */}
                <div className="mt-8">
                  <button
                    className={cn(
                      "w-full py-3 rounded-lg font-medium text-sm transition-all duration-300",
                      filledDigits === 4
                        ? "bg-gradient-to-r from-[#cd3ef9]/20 to-[#323dfe]/20 text-black"
                        : "bg-gray-200 text-gray-400"
                    )}
                  >
                    {showSuccess ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-7 bg-white flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.9) 50%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
