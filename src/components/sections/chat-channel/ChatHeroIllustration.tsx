"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 max-w-[88%]">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.813 15.904L12 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L5.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L12 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <div className="bg-white rounded-lg rounded-tl-sm px-4 py-2.5 shadow-sm border border-gray-100 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-[bounce_1s_ease-in-out_infinite]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-[bounce_1s_ease-in-out_0.15s_infinite]" style={{ animationDelay: "0.15s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-[bounce_1s_ease-in-out_0.3s_infinite]" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}

export default function ChatHeroIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),    // bot greeting
      setTimeout(() => setStep(2), 1600),   // user message
      setTimeout(() => setStep(3), 2800),   // typing indicator
      setTimeout(() => setStep(4), 4000),   // bot response + tracking
      setTimeout(() => setStep(5), 5000),   // quick reply buttons
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      {/* Chat widget mockup */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Chat header */}
        <div className="bg-gradient-to-r from-[#cd3ef9]/10 to-[#323dfe]/10 px-4 py-3 flex items-center gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">Plivo AI Agent</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>

        {/* Chat messages */}
        <div className="px-3 py-3 space-y-2.5 bg-gray-50 min-h-[280px]">
          {/* Bot message */}
          <div
            className={cn(
              "flex items-start gap-2 max-w-[88%] transition-all duration-500",
              step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.813 15.904L12 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L5.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L12 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
              <p className="text-[13px] text-gray-800 leading-relaxed">
                Hi! I'm your AI assistant. How can I help you today?
              </p>
            </div>
          </div>

          {/* User message */}
          <div
            className={cn(
              "flex items-start justify-end gap-2 transition-all duration-500",
              step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
          >
            <div className="bg-white rounded-lg rounded-tr-sm px-3 py-2 max-w-[80%] shadow-sm border border-gray-200">
              <p className="text-[13px] text-gray-800 leading-relaxed">
                I need to track my order #4821
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
              alt="User"
              className="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5"
            />
          </div>

          {/* Typing indicator + Bot response (overlaid to prevent height shifts) */}
          <div className="relative">
            {/* Typing indicator - absolutely positioned so it doesn't affect layout */}
            <div
              className={cn(
                "absolute inset-0 z-10 transition-opacity duration-300",
                step === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <TypingIndicator />
            </div>

            {/* Bot message with order details */}
            <div
              className={cn(
                "flex items-start gap-2 max-w-[88%] transition-all duration-500",
                step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
            >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.813 15.904L12 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L5.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L12 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
              <p className="text-[13px] text-gray-800 leading-relaxed mb-2">
                Your order #4821 is out for delivery!
              </p>
              {/* Mini tracking */}
              <div className="bg-gray-50 rounded-md p-2 border border-gray-100">
                <div className="flex items-center gap-1 mb-1.5">
                  {["Ordered", "Shipped", "Out", "Delivered"].map((stage, i) => (
                    <div key={i} className="flex-1 flex items-center">
                      <div className={`w-2.5 h-2.5 rounded-full flex items-center justify-center ${i < 3 ? "bg-[#323dfe]" : "bg-gray-200"}`}>
                        {i < 3 && (
                          <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {i < 3 && <div className={`flex-1 h-0.5 ${i < 2 ? "bg-[#323dfe]" : "bg-gray-200"}`} />}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500">Arriving by 4:00 PM today</p>
              </div>
            </div>
          </div>
          </div>

          {/* Quick reply buttons */}
          <div
            className={cn(
              "flex gap-2 pl-8 transition-all duration-500",
              step >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
          >
            {["Get ETA", "Contact Driver"].map((btn, i) => (
              <button
                key={i}
                className="px-3 py-1.5 text-[12px] font-medium text-[#323dfe] bg-white border border-[#323dfe]/20 rounded-full hover:bg-[#323dfe]/5 transition-colors"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="px-3 py-2.5 border-t border-gray-200 bg-white flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <p className="text-[13px] text-gray-400">Type a message...</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
