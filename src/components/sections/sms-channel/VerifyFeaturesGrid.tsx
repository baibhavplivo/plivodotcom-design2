import { Globe } from "@/components/ui/globe";

interface Feature {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

// Illustration: Global Reach
function GlobalReachIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full">
        {/* Rotating Globe */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '-10px',
            transform: 'translateX(-50%)',
            width: '320px',
            height: '320px',
          }}
        >
          <Globe
            size={320}
            dark={false}
            baseColor={[0.88, 0.88, 0.9]}
            glowColor={[0.95, 0.95, 0.97]}
            markerColor={[0.88, 0.88, 0.9]}
            opacity={1}
            interactive={false}
          />
        </div>

        {/* 150+ Countries pill */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[22px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">150+</span>
              <span className="text-[11px] text-gray-600 font-medium">Countries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Conversion Rate
function ConversionRateIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4">
        {/* Conversion rate pill */}
        <div className="absolute right-4 top-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full pl-2.5 pr-3 py-1.5 shadow-sm border border-gray-200/60 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#323dfe]" />
            <span className="text-[18px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">95%</span>
          </div>
        </div>

        {/* Label */}
        <div className="absolute left-4 top-4">
          <span className="text-[11px] font-medium text-gray-500">Conversion Rate</span>
        </div>

        {/* Chart area */}
        <div className="absolute inset-x-0 top-20 bottom-4 h-[90px]">
          <svg className="w-full h-full" viewBox="0 0 200 90" preserveAspectRatio="none">
            <defs>
              <linearGradient id="conversion-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#323dfe" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#323dfe" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="conversion-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cd3ef9" />
                <stop offset="100%" stopColor="#323dfe" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="25" x2="200" y2="25" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="45" x2="200" y2="45" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="65" x2="200" y2="65" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Area fill */}
            <path
              d="M0 60 C 30 55, 50 40, 80 35 C 110 30, 140 25, 170 20 C 185 17, 195 15, 200 12 L200 90 L0 90 Z"
              fill="url(#conversion-gradient)"
            />

            {/* Main line */}
            <path
              d="M0 60 C 30 55, 50 40, 80 35 C 110 30, 140 25, 170 20 C 185 17, 195 15, 200 12"
              fill="none"
              stroke="url(#conversion-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Endpoint dot */}
          <div className="absolute right-0 top-[13%] translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full bg-[#323dfe]" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#323dfe]/20 scale-150" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Multi-Channel Support
function MultiChannelIllustration() {
  const channels = [
    { name: "SMS", status: "active" },
    { name: "Voice", status: "active" },
    { name: "WhatsApp", status: "active" },
  ];

  const getChannelIcon = (name: string) => {
    const iconClass = 'text-gray-500';

    switch (name) {
      case 'SMS':
        return (
          <svg className={`w-3 h-3 ${iconClass}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        );
      case 'Voice':
        return (
          <svg className={`w-3 h-3 ${iconClass}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        );
      case 'WhatsApp':
        return (
          <svg className={`w-3 h-3 ${iconClass}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        );
      default:
        return (
          <svg className={`w-3 h-3 ${iconClass}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 h-full w-full max-w-[280px] flex flex-col p-3">
          {/* Header */}
          <div className="mb-3 pb-2 border-b border-gray-100">
            <span className="text-[11px] font-semibold text-gray-800">OTP Channels</span>
          </div>

          {/* Channel list */}
          <div className="flex-1 space-y-1.5">
            {channels.map((channel, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-md bg-gray-50">
                <div className="flex items-center gap-2">
                  {getChannelIcon(channel.name)}
                  <span className="text-[11px] font-medium text-gray-700">{channel.name}</span>
                </div>
                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${channel.status === 'active' ? 'bg-[#323dfe]/10 text-[#323dfe]' : 'bg-gray-100 text-gray-500'}`}>
                  {channel.status === 'active' ? 'Active' : 'Soon'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Fraud Prevention
function FraudPreventionIllustration() {
  const numbers = [
    { number: "+1 (555) 123-4567", status: "verified", risk: "Low" },
    { number: "+44 (20) 7946-0958", status: "verified", risk: "Low" },
    { number: "+263 (77) 456-789", status: "blocked", risk: "High" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 h-full w-full max-w-[260px] flex flex-col">
          {/* Header */}
          <div className="px-2.5 py-1.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-[11px] font-semibold text-gray-800">Fraud Shield</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#323dfe]/10 text-[#323dfe] font-medium">Active</span>
          </div>

          {/* Number list */}
          <div className="flex-1 px-1.5 py-1 space-y-0.5 overflow-hidden">
            {numbers.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-2 py-1.5 rounded-md ${item.status === "blocked" ? "bg-gray-100" : ""}`}
              >
                <div className="flex items-center gap-2">
                  {item.status === "verified" ? (
                    <div className="w-4 h-4 rounded-full bg-[#323dfe] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  <span className={`text-[11px] font-mono ${item.status === "blocked" ? "text-gray-700 font-medium" : "text-gray-600"}`}>
                    {item.number}
                  </span>
                </div>
                {item.risk === "High" && (
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-red-50 text-red-600">
                    High risk
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer stats */}
          <div className="px-2.5 py-1.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">$0 fraud cost</span>
            <span className="text-[10px] font-medium text-gray-700">AI-powered</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Transparent Pricing
function TransparentPricingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 h-full w-full max-w-[260px] flex flex-col p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-800">Cost Breakdown</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#323dfe]/10 text-[#323dfe] font-medium">Transparent</span>
          </div>

          {/* Cost items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
              <span className="text-[11px] text-gray-600">Verification fee</span>
              <span className="text-[13px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">$0.00</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
              <span className="text-[11px] text-gray-600">Fraud Shield</span>
              <span className="text-[13px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">$0.00</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-[#323dfe]/5 border border-[#323dfe]/10">
              <span className="text-[11px] text-gray-700 font-medium">Channel cost only</span>
              <svg className="w-4 h-4 text-[#323dfe]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-500 text-center">Only pay for SMS, Voice, or WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Premium Support
function PremiumSupportIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 h-full w-full max-w-[280px] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <p className="text-[11px] font-semibold text-gray-800">Plivo Support</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] text-gray-500">Online 24/7</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-2 space-y-2 bg-gray-50">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] text-white text-[10px] px-2.5 py-1.5 rounded-lg rounded-br-sm max-w-[85%]">
                Hi, I need help with OTP delivery rates
              </div>
            </div>

            {/* Support response */}
            <div className="flex justify-start gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-gray-600">P</span>
              </div>
              <div className="bg-white text-gray-700 text-[10px] px-2.5 py-1.5 rounded-lg rounded-bl-sm border border-gray-200 max-w-[80%]">
                Hi! I'd be happy to help. Let me check your account details.
              </div>
            </div>

            {/* Support follow-up */}
            <div className="flex justify-start gap-1.5">
              <div className="w-5 h-5 flex-shrink-0" />
              <div className="bg-white text-gray-700 text-[10px] px-2.5 py-1.5 rounded-lg border border-gray-200 max-w-[80%]">
                Your current rate is 95.2% - above average!
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="px-2 py-1.5 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
              <span className="text-[10px] text-gray-400 flex-1">Type a message...</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Go live in 150+ countries in 5 minutes",
    description:
      "Use Plivo's pre-registered Sender IDs and templates to bypass regulatory paperwork.",
    illustration: <GlobalReachIllustration />,
  },
  {
    title: "Best-in-class Conversion Rates",
    description:
      "Get 95% conversion across multiple authentication channels.",
    illustration: <ConversionRateIllustration />,
  },
  {
    title: "Reach users across multiple channels",
    description:
      "Send OTPs to customers using SMS, Voice and WhatsApp. RCS & Email coming soon.",
    illustration: <MultiChannelIllustration />,
  },
  {
    title: "$0 cost leakage to SMS Pumping",
    description:
      "Save on SMS pumping fraud expenses with Plivo's Fraud Shield solution at no extra cost.",
    illustration: <FraudPreventionIllustration />,
  },
  {
    title: "Lowest cost per verification",
    description:
      "We don't bill you for verification. Only pay for channel costs with no hidden charges.",
    illustration: <TransparentPricingIllustration />,
  },
  {
    title: "Support at your fingertips",
    description:
      "24/7 availability over Slack and phone calls, guaranteed same-day response.",
    illustration: <PremiumSupportIllustration />,
  },
];

export default function VerifyFeaturesGrid() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black max-w-3xl mx-auto">
            Plivo Verify is the best way to secure users & boost OTP conversions
          </h2>
        </div>

        {/* Features Grid - 2x3 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300"
            >
              {/* Illustration */}
              {feature.illustration}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
