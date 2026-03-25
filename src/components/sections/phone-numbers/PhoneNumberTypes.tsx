"use client";

// Illustration: Voice & SMS numbers (Toll-free, Local, National)
function VoiceSmsIllustration() {
  return (
    <div
      className="relative h-full w-full rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(205, 62, 249, 0.08), rgba(50, 61, 254, 0.08))",
      }}
    >
      <style>{`
        @keyframes num-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .num-pulse { animation: num-pulse 2s ease-in-out infinite; }
        .num-pulse-d1 { animation: num-pulse 2s ease-in-out infinite 0.4s; }
        .num-pulse-d2 { animation: num-pulse 2s ease-in-out infinite 0.8s; }
      `}</style>

      <div className="relative h-full w-full p-4 sm:p-6 flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Voice & SMS numbers</p>
              <p className="text-[10px] text-gray-500">50+ countries available</p>
            </div>
          </div>

          {/* Number rows */}
          <div className="space-y-1.5">
            {[
              { flag: "\ud83c\uddfa\ud83c\uddf8", number: "+1 (800) 555-0199", type: "Toll-free", capabilities: "Voice, SMS, MMS", cls: "num-pulse" },
              { flag: "\ud83c\uddec\ud83c\udde7", number: "+44 20 7946 0958", type: "Local", capabilities: "Voice, SMS", cls: "num-pulse-d1" },
              { flag: "\ud83c\udde9\ud83c\uddea", number: "+49 30 1234 5678", type: "National", capabilities: "Voice", cls: "num-pulse-d2" },
              { flag: "\ud83c\udde6\ud83c\uddfa", number: "+61 3 9876 5432", type: "Local", capabilities: "Voice, SMS", cls: "num-pulse" },
              { flag: "\ud83c\uddee\ud83c\uddf3", number: "+91 22 4567 8901", type: "Toll-free", capabilities: "Voice", cls: "num-pulse-d1" },
            ].map((num, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-lg flex-shrink-0">{num.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 font-mono truncate">{num.number}</p>
                  <p className="text-[10px] text-gray-500">{num.capabilities}</p>
                </div>
                <span className="text-[10px] font-medium text-[#323dfe] bg-[#323dfe]/5 px-2 py-0.5 rounded-full border border-[#323dfe]/10 flex-shrink-0">
                  {num.type}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">Instantly provisioned</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-gray-500">All numbers active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Messaging numbers (Mobile, Short code, BYON)
function MessagingIllustration() {
  return (
    <div
      className="relative h-full w-full rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(50, 61, 254, 0.08), rgba(205, 62, 249, 0.08))",
      }}
    >
      <div className="relative h-full w-full p-4 sm:p-6 flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#323dfe] to-[#cd3ef9] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Messaging numbers</p>
              <p className="text-[10px] text-gray-500">High-throughput delivery</p>
            </div>
          </div>

          {/* Number rows */}
          <div className="space-y-1.5">
            {[
              { flag: "\ud83c\uddfa\ud83c\uddf8", number: "+1 (415) 555-0142", type: "Mobile", detail: "SMS, MMS, Voice" },
              { flag: "\ud83c\uddec\ud83c\udde7", number: "+44 7911 123456", type: "Mobile", detail: "SMS, Voice" },
              { flag: "\ud83c\uddfa\ud83c\uddf8", number: "12345", type: "Short code", detail: "SMS, MMS" },
              { flag: "\ud83c\uddee\ud83c\uddf3", number: "+91 98765 43210", type: "Mobile", detail: "SMS, Voice" },
            ].map((num, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-lg flex-shrink-0">{num.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 font-mono truncate">{num.number}</p>
                  <p className="text-[10px] text-gray-500">{num.detail}</p>
                </div>
                <span className="text-[10px] font-medium text-[#323dfe] bg-[#323dfe]/5 px-2 py-0.5 rounded-full border border-[#323dfe]/10 flex-shrink-0">
                  {num.type}
                </span>
              </div>
            ))}
          </div>

          {/* BYON callout */}
          <div className="mt-1.5 px-3 py-2 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#323dfe] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              <div>
                <p className="text-[11px] font-medium text-gray-900">Bring your own number</p>
                <p className="text-[10px] text-gray-500">Port existing numbers via SIP forwarding</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">Higher throughput</span>
            <span className="text-[10px] text-gray-500">Brand recognition</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NumberFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
}

const voiceSmsFeatures: NumberFeature[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Toll-free numbers",
    description: "Improve your brand recall with a memorable phone number.",
    capabilities: ["Voice", "SMS", "MMS"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Local numbers",
    description: "Voice and SMS-enabled numbers for localizing your business.",
    capabilities: ["Voice", "SMS"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "National numbers",
    description: "Receive nationwide voice calls at a standard cost.",
    capabilities: ["Voice"],
  },
];

const messagingFeatures: NumberFeature[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Mobile numbers",
    description: "Send and receive SMS and MMS messages with higher throughput.",
    capabilities: ["Voice", "SMS", "MMS"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
      </svg>
    ),
    title: "Short code",
    description: "Gain brand recognition for your message with higher throughput and performance.",
    capabilities: ["SMS", "MMS"],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Bring your own number",
    description: "Use your existing numbers on Plivo using SIP forwarding or via your own RespOrg.",
    capabilities: ["Voice"],
  },
];

function FeatureList({ features }: { features: NumberFeature[] }) {
  return (
    <div className="space-y-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <span className="text-[#323dfe] flex-shrink-0 mt-0.5">
            {feature.icon}
          </span>
          <div>
            <h4 className="text-base font-medium text-black mb-1">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              {feature.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {feature.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PhoneNumberTypes() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4 max-w-3xl mx-auto">
            Multiple types of numbers to suit your business needs
          </h2>
        </div>

        {/* Row 1: Features Left, Illustration Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-16 lg:mb-24">
          <div>
            <FeatureList features={voiceSmsFeatures} />
          </div>
          <div className="order-first lg:order-last">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
              <VoiceSmsIllustration />
            </div>
          </div>
        </div>

        {/* Row 2: Illustration Left, Features Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
              <MessagingIllustration />
            </div>
          </div>
          <div>
            <FeatureList features={messagingFeatures} />
          </div>
        </div>
      </div>
    </section>
  );
}
