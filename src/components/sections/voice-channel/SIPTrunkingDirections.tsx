// Outbound Illustration - calls going out to global destinations
function OutboundIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <style>{`
        @keyframes outbound-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .ob-pulse { animation: outbound-pulse 2s ease-in-out infinite; }
        .ob-pulse-d1 { animation: outbound-pulse 2s ease-in-out infinite 0.4s; }
        .ob-pulse-d2 { animation: outbound-pulse 2s ease-in-out infinite 0.8s; }
      `}</style>

      <div className="relative h-full w-full p-4 sm:p-6 flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Outbound Calls
              </p>
              <p className="text-[10px] text-gray-500">220+ countries</p>
            </div>
          </div>

          {/* Connection diagram */}
          <div className="space-y-1.5">
            {[
              {
                flag: "\ud83c\uddfa\ud83c\uddf8",
                country: "United States",
                type: "Mobile & Fixed",
                status: "Connected",
                cls: "ob-pulse",
              },
              {
                flag: "\ud83c\uddec\ud83c\udde7",
                country: "United Kingdom",
                type: "Mobile & Fixed",
                status: "Connected",
                cls: "ob-pulse-d1",
              },
              {
                flag: "\ud83c\udde9\ud83c\uddea",
                country: "Germany",
                type: "Fixed",
                status: "Connected",
                cls: "ob-pulse-d2",
              },
              {
                flag: "\ud83c\uddee\ud83c\uddf3",
                country: "India",
                type: "Mobile & Fixed",
                status: "Connected",
                cls: "ob-pulse",
              },
              {
                flag: "\ud83c\udde7\ud83c\uddf7",
                country: "Brazil",
                type: "Mobile",
                status: "Connected",
                cls: "ob-pulse-d1",
              },
            ].map((dest, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100"
              >
                <span className="text-lg flex-shrink-0">{dest.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {dest.country}
                  </p>
                  <p className="text-[10px] text-gray-500">{dest.type}</p>
                </div>
                {/* Dotted connection line */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${dest.cls}`}
                  />
                  <span className="text-[10px] text-emerald-600 font-medium">
                    {dest.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              + 215 more countries
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-gray-500">All routes active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inbound Illustration - phone numbers being provisioned
function InboundIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 sm:p-6 flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Inbound Numbers
              </p>
              <p className="text-[10px] text-gray-500">
                70+ countries available
              </p>
            </div>
          </div>

          {/* Phone numbers */}
          <div className="space-y-1.5">
            {[
              {
                flag: "\ud83c\uddfa\ud83c\uddf8",
                number: "+1 (415) 555-0142",
                type: "Local",
                label: "San Francisco",
              },
              {
                flag: "\ud83c\uddec\ud83c\udde7",
                number: "+44 20 7946 0958",
                type: "National",
                label: "London",
              },
              {
                flag: "\ud83c\uddfa\ud83c\uddf8",
                number: "+1 (800) 555-0199",
                type: "Toll-Free",
                label: "United States",
              },
              {
                flag: "\ud83c\udde9\ud83c\uddea",
                number: "+49 30 1234 5678",
                type: "Local",
                label: "Berlin",
              },
              {
                flag: "\ud83c\udde6\ud83c\uddfa",
                number: "+61 2 9876 5432",
                type: "Mobile",
                label: "Sydney",
              },
            ].map((num, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100"
              >
                <span className="text-lg flex-shrink-0">{num.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 font-mono truncate">
                    {num.number}
                  </p>
                  <p className="text-[10px] text-gray-500">{num.label}</p>
                </div>
                <span className="text-[10px] font-medium text-[#323dfe] bg-[#323dfe]/5 px-2 py-0.5 rounded-full border border-[#323dfe]/10 flex-shrink-0">
                  {num.type}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              Instantly provisioned
            </span>
            <span className="text-[10px] text-gray-500">
              Unlimited concurrent calls
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DirectionFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const outboundFeatures: DirectionFeature[] = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    title: "Make calls to more than 220 countries",
    description:
      "Connect to mobile or fixed phone numbers globally using your existing VoIP infrastructure.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Multiple authentication options",
    description:
      "Secure your SIP trunk using IP-based or credentials-based authentication.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"
        />
      </svg>
    ),
    title: "Unlimited concurrent calls",
    description:
      "Scale your outbound calls and experience unlimited concurrent calls at no extra cost.",
  },
];

const inboundFeatures: DirectionFeature[] = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: "Receive calls in more than 70 countries",
    description:
      "Purchase Local, National, Mobile or Toll-Free phone numbers across the globe.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instantly provision phone numbers",
    description:
      "Configure phone numbers with SIP trunking and start receiving calls in minutes.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"
        />
      </svg>
    ),
    title: "Unlimited concurrent calls",
    description:
      "Receive unlimited concurrent calls on your phone numbers at no extra cost.",
  },
];

function FeatureList({ features }: { features: DirectionFeature[] }) {
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
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SIPTrunkingDirections() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Outbound - Features Left, Illustration Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-16 lg:mb-24">
          <div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-8">
              SIP trunking outbound
            </h3>
            <FeatureList features={outboundFeatures} />
          </div>
          <div className="order-first lg:order-last">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
              <OutboundIllustration />
            </div>
          </div>
        </div>

        {/* Inbound - Illustration Left, Features Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
              <InboundIllustration />
            </div>
          </div>
          <div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-8">
              SIP trunking inbound
            </h3>
            <FeatureList features={inboundFeatures} />
          </div>
        </div>
      </div>
    </section>
  );
}
