"use client";

import { useState, useEffect, useRef } from "react";

const TABS = [
  {
    label: "Refund Agent",
    messages: [
      { role: "agent", text: "Hi! I can help process your refund. Could you share your order number?" },
      { role: "user", text: "Sure, it's #ORD-48291" },
      { role: "agent", text: "Found it! Order for $89.99 placed on Jan 15. I've initiated a full refund to your card ending in 4821." },
      { role: "user", text: "That was fast. Thanks!" },
    ],
  },
  {
    label: "Appointment Scheduling",
    messages: [
      { role: "agent", text: "Welcome! I'd love to help you book an appointment. What service are you looking for?" },
      { role: "user", text: "I need a dental checkup" },
      { role: "agent", text: "Dr. Patel has openings on Thursday at 10 AM or Friday at 2 PM. Which works better?" },
      { role: "user", text: "Thursday at 10 AM please" },
    ],
  },
  {
    label: "Lead Qualification",
    messages: [
      { role: "agent", text: "Thanks for your interest! I have a few quick questions to connect you with the right team." },
      { role: "user", text: "Sure, go ahead" },
      { role: "agent", text: "What's your company size and which channels do you currently use for customer communication?" },
      { role: "user", text: "About 200 employees. We use phone and email mostly." },
    ],
  },
];

const INTERVAL = 8000;

export default function AIAgentsHero() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(Date.now());

  const resetTimer = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setProgress(0);
    setVisibleMessages(0);
    startRef.current = Date.now();
  };

  // Progress bar + auto-advance
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (elapsed >= INTERVAL) {
        resetTimer((activeTab + 1) % TABS.length);
      }
    };
    intervalRef.current = setInterval(tick, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeTab]);

  // Stagger message animations
  useEffect(() => {
    setVisibleMessages(0);
    const msgs = TABS[activeTab].messages.length;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < msgs; i++) {
      timers.push(setTimeout(() => setVisibleMessages(i + 1), 600 * (i + 1)));
    }
    return () => timers.forEach(clearTimeout);
  }, [activeTab]);

  return (
    <section className="bg-white pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
            AI agents that just work
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
            No code. No guesswork. Just reliable automation for key customer moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <a
              href="/contact/sales/"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors"
            >
              Contact Sales
            </a>
            <a
              href="https://cx.plivo.com/"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign up for free
            </a>
          </div>
        </div>

        {/* Tabbed Demo */}
        <div className="max-w-3xl mx-auto">
          {/* Tab buttons with progress bars */}
          <div className="flex border-b border-gray-200">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => resetTimer(i)}
                className="flex-1 relative pb-3 text-sm sm:text-base font-medium transition-colors text-center"
              >
                <span className={activeTab === i ? "text-black" : "text-gray-400"}>
                  {tab.label}
                </span>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100">
                  {activeTab === i && (
                    <div
                      className="h-full bg-[#323dfe] transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Chat mockup */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-black">{TABS[activeTab].label}</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="px-5 py-5 space-y-3 min-h-[240px]">
              {TABS[activeTab].messages.map((msg, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} transition-all duration-500 ${
                    i < visibleMessages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#323dfe] text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-4 py-2.5 shadow-sm">
                <span className="text-sm text-gray-400 flex-1">Type a message...</span>
                <div className="w-7 h-7 rounded-full bg-[#323dfe] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
