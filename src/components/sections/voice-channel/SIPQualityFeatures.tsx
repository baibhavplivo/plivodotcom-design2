import WorldMap from "@/components/ui/world-map";

// Quality Feature Card illustrations
function GuaranteedQualityIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Source Phone */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-gray-600"
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
            </div>
            <span className="text-[10px] text-gray-500">Caller</span>
          </div>

          {/* One-Hop Connection */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-gradient-to-r from-gray-300 via-[#323dfe] to-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white rounded-full border border-gray-200 px-3 py-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-700">
                  1-hop
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full border border-gray-200 px-3 py-1 shadow-sm">
                <span className="text-xs font-medium text-gray-700">CLI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full border border-gray-200 px-3 py-1 shadow-sm">
                <span className="text-xs font-medium text-gray-700">DTMF</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-emerald-600 font-medium">
                Low post-dial delay
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient id="carrier-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cd3ef9" />
                    <stop offset="100%" stopColor="#323dfe" />
                  </linearGradient>
                </defs>
                <path
                  stroke="url(#carrier-grad)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500">Local Carrier</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

function GlobalInfrastructureIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden bg-white">
      <WorldMap
        lineColor="#323dfe"
        dots={[
          {
            start: { lat: 37.7749, lng: -122.4194 }, // California
            end: { lat: 38.9072, lng: -77.0369 }, // Virginia
          },
          {
            start: { lat: 38.9072, lng: -77.0369 }, // Virginia
            end: { lat: 50.1109, lng: 8.6821 }, // Frankfurt
          },
          {
            start: { lat: 50.1109, lng: 8.6821 }, // Frankfurt
            end: { lat: 19.076, lng: 72.8777 }, // Mumbai
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai
            end: { lat: 1.3521, lng: 103.8198 }, // Singapore
          },
          {
            start: { lat: 1.3521, lng: 103.8198 }, // Singapore
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
          {
            start: { lat: 37.7749, lng: -122.4194 }, // California
            end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
          },
        ]}
      />

      {/* PoP indicators */}
      <div className="absolute left-3 top-3 flex items-center gap-2 z-20">
        <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[10px] font-medium text-black">
            7 PoPs active
          </span>
        </div>
      </div>

      <div className="absolute right-3 top-3 flex items-center gap-2 z-20">
        <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md">
          <span className="text-[10px] font-medium text-black">
            5 continents
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

function HighAvailabilityIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <style>{`
        @keyframes ha-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .ha-pulse { animation: ha-pulse 2s ease-in-out infinite; }
        .ha-pulse-d1 { animation: ha-pulse 2s ease-in-out infinite 0.3s; }
        .ha-pulse-d2 { animation: ha-pulse 2s ease-in-out infinite 0.6s; }
      `}</style>

      <div className="absolute inset-0 flex items-center px-6">
        <div className="w-full">
          {/* Uptime badge */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-4 py-2 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cd3ef9" />
                      <stop offset="100%" stopColor="#323dfe" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#shield-grad)"
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-black">99.99%</p>
                <p className="text-[10px] text-gray-500">Guaranteed uptime</p>
              </div>
            </div>
          </div>

          {/* Redundant carriers */}
          <div className="grid grid-cols-3 gap-3">
            {["Region A", "Region B", "Region C"].map((region, i) => (
              <div
                key={region}
                className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm"
              >
                <p className="text-[10px] font-semibold text-gray-900 mb-1.5">
                  {region}
                </p>
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((carrier) => (
                    <div
                      key={carrier}
                      className={`flex items-center gap-1 ${
                        i === 0
                          ? "ha-pulse"
                          : i === 1
                            ? "ha-pulse-d1"
                            : "ha-pulse-d2"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-gray-500">
                        Carrier {carrier}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

interface QualityFeature {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const qualityFeatures: QualityFeature[] = [
  {
    title: "Guaranteed quality",
    description:
      "Your calls are terminated through one-hop local carriers to give you low post-dial delay, guaranteed features such as CLI and DTMF, and no out-of-region audio looping.",
    illustration: <GuaranteedQualityIllustration />,
  },
  {
    title: "Global infrastructure",
    description:
      "Our PoPs are located in seven locations (California, Virginia, Frankfurt, Mumbai, Singapore, Sydney, S\u00e3o Paulo) across five continents to ensure that you experience low latency and high voice quality.",
    illustration: <GlobalInfrastructureIllustration />,
  },
  {
    title: "High availability and uptime",
    description:
      "With a redundant infrastructure across multiple geographies and at least three local carrier connections across countries, Plivo SIP trunking promises 99.99% uptime.",
    illustration: <HighAvailabilityIllustration />,
  },
];

export default function SIPQualityFeatures() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4 max-w-3xl mx-auto">
            Quality SIP trunking
          </h2>
        </div>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          Learn how thousands of innovative businesses rely on Plivo for their
          customer engagement
        </p>

        {/* 3-Column Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {qualityFeatures.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300"
            >
              {feature.illustration}
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
