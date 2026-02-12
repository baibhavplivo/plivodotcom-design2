"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

function IllustrationWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100", className)}>
      <div className="relative h-full w-full px-3 py-4 flex flex-col">
        {children}
      </div>
    </div>
  );
}

// Lead Capture Illustration - Flow builder UI matching product (static)
function LeadCaptureIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-0">
        {/* Trigger node - Receive message on WhatsApp */}
        <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
          <div className="w-5 h-5 rounded-md bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-gray-900">Receive message on WhatsApp</span>
        </div>

        {/* Connector arrow */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2.5 bg-gray-300" />
          <svg className="w-2.5 h-2.5 text-gray-300 -mt-px" fill="currentColor" viewBox="0 0 10 6">
            <path d="M5 6L0 0h10L5 6z" />
          </svg>
        </div>

        {/* Action node - Capture Leads (compact) */}
        <div className="rounded-xl border border-gray-900 bg-white px-3 py-2 shadow-sm max-w-[180px] w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-md bg-purple-50 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Capture Leads</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="3" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="13" r="1.2" />
            </svg>
          </div>
          <p className="text-[9px] text-gray-500 leading-snug mb-1">
            Greet the prospects and ask gather their details and requirements.
          </p>
          <span className="text-[8px] font-medium text-gray-400 tracking-wide uppercase">AI Conversation</span>
        </div>

        {/* Connector + plus */}
        <div className="flex flex-col items-center">
          <div className="w-px h-2 bg-gray-300" />
          <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Integration icons */}
        <div className="flex items-center gap-2 mt-1">
          {/* Salesforce */}
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.006 5.17a4.015 4.015 0 012.97-1.32 4.033 4.033 0 013.81 2.79 3.28 3.28 0 014.05 3.16 3.29 3.29 0 01-1.56 2.8 3.64 3.64 0 01.34 1.54 3.67 3.67 0 01-3.66 3.67c-.6 0-1.16-.15-1.66-.41a3.34 3.34 0 01-3.07 2.04 3.34 3.34 0 01-2.71-1.39 3.84 3.84 0 01-1.38.26 3.86 3.86 0 01-3.65-2.6A3.17 3.17 0 010 12.54a3.17 3.17 0 012.21-3.02 4.05 4.05 0 01-.04-.56 4.06 4.06 0 014.06-4.06c1.12 0 2.64.5 3.78 1.23z" />
            </svg>
          </div>
          {/* HubSpot */}
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-[#ff7a59]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.198 2.198 0 0017.233.836h-.066a2.198 2.198 0 00-2.198 2.198v.066c0 .877.516 1.633 1.261 1.984V7.93a5.847 5.847 0 00-3.009 1.597L6.188 4.37a2.483 2.483 0 00.1-.687A2.483 2.483 0 003.805 1.2 2.483 2.483 0 001.32 3.683a2.483 2.483 0 002.483 2.483c.439 0 .853-.116 1.21-.317l6.96 5.056a5.847 5.847 0 00-.878 3.078 5.845 5.845 0 001.04 3.315l-2.089 2.089a1.832 1.832 0 00-.538-.083 1.847 1.847 0 100 3.694 1.847 1.847 0 000-3.694c.185 0 .363.032.534.087l2.075-2.075a5.863 5.863 0 009.047-4.91 5.853 5.853 0 00-2.999-5.477zm-1 8.553a3.15 3.15 0 110-6.3 3.15 3.15 0 010 6.3z" />
            </svg>
          </div>
          {/* Zoho */}
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-[#e42527]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.94 17.243L0 18.746l4.243-13.5L7.176 3.73zM10.5 3.743l-3.006 1.5 4.256 13.5 3-1.5zm7.744 8.25h-5.25l-1.5 3h5.25zM24 5.243l-3-1.5-4.256 13.5 3 1.5z" />
            </svg>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Support Agent Illustration - Chat with order lookup
function SupportAgentIllustration() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  const messages = [
    { type: "incoming", text: "Where's my order #4821?" },
    { type: "outgoing", text: "Let me look that up for you..." },
    { type: "outgoing", text: "Your order shipped via FedEx. ETA: Thursday, Jan 18." },
    { type: "incoming", text: "Thanks!" },
  ];

  useEffect(() => {
    const runAnimation = () => {
      setVisibleMessages(0);
      messages.forEach((_, i) => {
        setTimeout(() => setVisibleMessages(i + 1), 800 * (i + 1));
      });
    };

    runAnimation();
    const interval = setInterval(runAnimation, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="relative flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[230px]">
          <div className="relative rounded-[20px] p-1 shadow-xl" style={{ background: 'linear-gradient(135deg, rgba(205, 62, 249, 0.5) 0%, rgba(50, 61, 254, 0.5) 100%)' }}>
            <div className="relative rounded-[18px] overflow-hidden bg-white">
              {/* Header */}
              <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-2.5 gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5" />
                  </svg>
                </div>
                <span className="text-[10px] font-semibold text-black">Support Agent</span>
                <span className="ml-auto flex items-center gap-0.5 text-[8px] text-green-600">
                  <span className="w-1 h-1 rounded-full bg-green-500" />Online
                </span>
              </div>

              {/* Messages */}
              <div className="px-2 py-2 space-y-1.5 min-h-[140px]">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={cn(
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      i < visibleMessages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
                    )}
                  >
                    {message.type === "incoming" ? (
                      <div className="flex items-start">
                        <div className="rounded-2xl rounded-bl-sm px-2 py-1 max-w-[85%] bg-gray-200">
                          <p className="text-[10px] text-black leading-snug">{message.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-sm px-2 py-1 max-w-[85%] bg-[#323dfe]">
                          <p className="text-[10px] text-white leading-snug">{message.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Home indicator */}
              <div className="h-4 bg-white flex items-center justify-center">
                <div className="w-12 h-0.5 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Appointment Booking Illustration - Calendar with booking animation
function AppointmentBookingIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 800);
      setTimeout(() => setStep(2), 1600);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="relative flex-1 px-3 pt-1">
        {/* Calendar card */}
        <div className="rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3.5 mb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] font-semibold text-gray-900">January 2025</p>
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] mb-1">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <span key={i} className="text-gray-400 py-0.5">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
            {[13,14,15,16,17,18,19].map((d) => (
              <span
                key={d}
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-full mx-auto transition-all duration-500",
                  d === 16 && step >= 1 ? "bg-[#323dfe] text-white scale-110" : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Booking confirmation */}
        <div
          className={cn(
            "rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]",
            step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 rounded-full bg-[#323dfe]" />
            <div>
              <p className="text-[12px] font-semibold text-gray-900">Dr. Patel — 10:00 AM</p>
              <p className="text-[10px] text-gray-500">Dental Checkup · Thu, Jan 16</p>
            </div>
            <svg className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Tech Support Illustration - Diagnostic checklist with animated checks
function TechSupportIllustration() {
  const [checks, setChecks] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setChecks(0);
      setTimeout(() => setChecks(1), 700);
      setTimeout(() => setChecks(2), 1400);
      setTimeout(() => setChecks(3), 2100);
      setTimeout(() => setChecks(4), 2800);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Network connectivity", status: "pass" },
    { label: "DNS resolution", status: "pass" },
    { label: "API response time", status: "pass" },
    { label: "SSL certificate", status: "warn" },
  ];

  return (
    <IllustrationWrapper>
      <div className="relative flex-1 px-3 flex items-center justify-center">
        <div className="w-full rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-900">System Diagnostics</p>
              <p className="text-[9px] text-gray-400">Running checks...</p>
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 transition-all duration-500",
                  checks >= i + 1 ? "opacity-100" : "opacity-30"
                )}
              >
                {checks >= i + 1 ? (
                  item.status === "pass" ? (
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ) : (
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  )
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                )}
                <span className="text-[11px] text-gray-700">{item.label}</span>
                {checks >= i + 1 && (
                  <span className={cn(
                    "ml-auto text-[9px] font-medium",
                    item.status === "pass" ? "text-green-600" : "text-amber-600"
                  )}>
                    {item.status === "pass" ? "OK" : "Warning"}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-500 transition-all duration-500",
              checks >= 4 ? "opacity-100" : "opacity-0"
            )}
          >
            Routing complex issue to human agent...
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Survey Illustration - Bar chart with animated bars
function SurveyFeedbackIllustration() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setProgress(0);
      const startTime = Date.now();
      const duration = 2000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - pct, 3);
        setProgress(eased);
        if (pct < 1) requestAnimationFrame(animate);
      };

      setTimeout(() => requestAnimationFrame(animate), 600);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  const bars = [
    { label: "Mon", height: 60 },
    { label: "Tue", height: 45 },
    { label: "Wed", height: 75 },
    { label: "Thu", height: 55 },
    { label: "Fri", height: 90 },
  ];

  return (
    <IllustrationWrapper>
      <div className="relative flex-1 px-3 flex items-center justify-center">
        <div className="w-full rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[12px] font-semibold text-gray-900">CSAT Score</p>
              <p className="text-[9px] text-gray-400">This week</p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-bold text-gray-900 leading-tight">4.7</p>
              <p className="text-[9px] text-green-600 font-medium">+12%</p>
            </div>
          </div>

          <div className="flex items-end gap-2 h-[70px] mb-2">
            {bars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[#323dfe] to-[#323dfe]/40 transition-all duration-100"
                  style={{ height: `${bar.height * progress}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {bars.map((bar, i) => (
              <span key={i} className="flex-1 text-center text-[9px] text-gray-400">{bar.label}</span>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={cn("w-3 h-3", s <= 4 ? "text-amber-400" : "text-gray-200")} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[9px] text-gray-500">847 responses</span>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Conversational Illustration - Multi-channel agent routing
function ConversationalIllustration() {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setAnimationStep(0);
      setTimeout(() => setAnimationStep(1), 600);
      setTimeout(() => setAnimationStep(2), 1200);
      setTimeout(() => setAnimationStep(3), 1800);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="relative flex-1 px-3 flex flex-col items-center justify-center gap-3">
        {/* Central AI node */}
        <div
          className={cn(
            "w-12 h-12 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center shadow-lg transition-all duration-600",
            animationStep >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
          </svg>
        </div>

        {/* Channel cards */}
        <div className="flex gap-2 w-full max-w-[280px]">
          {[
            { icon: "phone", label: "Voice", color: "blue" },
            { icon: "chat", label: "Chat", color: "purple" },
            { icon: "sms", label: "SMS", color: "green" },
            { icon: "wa", label: "WhatsApp", color: "emerald" },
          ].map((ch, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-xl bg-white border border-gray-200 shadow-sm p-2 text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                animationStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg mx-auto mb-1 flex items-center justify-center",
                ch.color === "blue" ? "bg-blue-50" :
                ch.color === "purple" ? "bg-purple-50" :
                ch.color === "green" ? "bg-green-50" :
                "bg-emerald-50"
              )}>
                {ch.icon === "phone" && <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>}
                {ch.icon === "chat" && <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>}
                {ch.icon === "sms" && <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
                {ch.icon === "wa" && <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>}
              </div>
              <p className="text-[9px] font-medium text-gray-700">{ch.label}</p>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div
          className={cn(
            "flex items-center gap-1.5 text-[10px] text-gray-500 transition-all duration-500",
            animationStep >= 3 ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Context preserved across all channels
        </div>
      </div>
    </IllustrationWrapper>
  );
}

const useCases: UseCase[] = [
  {
    title: "Lead capture & qualification",
    tags: ["Sales", "CRM", "Marketing"],
    description: "Capture inbound leads across chat, SMS, and voice, qualify them in real-time using smart branching logic, and instantly route high-intent prospects to your sales team.",
    illustration: <LeadCaptureIllustration />,
  },
  {
    title: "Customer support",
    tags: ["eCommerce", "Logistics", "SaaS"],
    description: "Connect to Shopify or WooCommerce to automatically manage order status, shipping updates, and product inquiries, directly on call.",
    illustration: <SupportAgentIllustration />,
  },
  {
    title: "Appointment booking",
    tags: ["Healthcare", "Services", "Hospitality"],
    description: "Let customers schedule appointments via phone or chat, with real-time availability synced to Calendly or your booking system.",
    illustration: <AppointmentBookingIllustration />,
  },
  {
    title: "Tech support",
    tags: ["SaaS", "Telecom", "IT Services"],
    description: "Troubleshoot common tech queries using your knowledge base, with smart conversational flows that route only complex cases to humans.",
    illustration: <TechSupportIllustration />,
  },
  {
    title: "Survey & feedback",
    tags: ["Retail", "Healthcare", "Consumer Services"],
    description: "Gather timely input from customers through surveys and conversations, so you can improve continuously.",
    illustration: <SurveyFeedbackIllustration />,
  },
  {
    title: "Multichannel engagement",
    tags: ["Enterprise", "eCommerce", "Finance"],
    description: "Build agents that work where your customers are — voice, chat, SMS, or WhatsApp — with context preserved across every touchpoint.",
    illustration: <ConversationalIllustration />,
  },
];

export default function AIAgentUseCases() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Vibe create your agents for your use case in plain English
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          Explore the top AI agents that streamline operations, boost CSAT, and cut resolution times — no training required.
        </p>

        <div className="grid gap-x-6 gap-y-14 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="group">
              <div className="mb-4 overflow-hidden rounded-xl transition-all">
                {useCase.illustration}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {useCase.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
