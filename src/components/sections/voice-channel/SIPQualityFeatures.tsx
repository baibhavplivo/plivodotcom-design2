import WorldMap from "@/components/ui/world-map";

// Quality Feature Card illustrations
function GuaranteedQualityIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Source Phone */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-muted-foreground"
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
            <span className="text-[10px] text-muted-foreground">Caller</span>
          </div>

          {/* One-Hop Connection */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-gradient-to-r from-gray-300 via-[#323dfe] to-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-background rounded-full border border-border px-3 py-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-foreground/80">
                  1-hop
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-background rounded-full border border-border px-3 py-1 shadow-sm">
                <span className="text-xs font-medium text-foreground/80">CLI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-background rounded-full border border-border px-3 py-1 shadow-sm">
                <span className="text-xs font-medium text-foreground/80">DTMF</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-emerald-600 dark:text-emerald-300 font-medium">
                Low post-dial delay
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient id="carrier-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#323dfe" />
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
            <span className="text-[10px] text-muted-foreground">Local Carrier</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}

function GlobalInfrastructureIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden bg-background">
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
        <div className="flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[10px] font-medium text-foreground">
            7 PoPs active
          </span>
        </div>
      </div>

      <div className="absolute right-3 top-3 flex items-center gap-2 z-20">
        <div className="flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 shadow-sm">
          <span className="text-[10px] font-medium text-foreground">
            5 continents
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

function HighAvailabilityIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
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
            <div className="flex items-center gap-2 bg-background rounded-full border border-border px-4 py-2 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#323dfe" />
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
                <p className="text-lg font-bold text-foreground">99.99%</p>
                <p className="text-[10px] text-muted-foreground">Guaranteed uptime</p>
              </div>
            </div>
          </div>

          {/* Redundant carriers */}
          <div className="grid grid-cols-3 gap-3">
            {["Region A", "Region B", "Region C"].map((region, i) => (
              <div
                key={region}
                className="bg-background rounded-lg border border-border p-2.5 shadow-sm"
              >
                <p className="text-[10px] font-semibold text-foreground mb-1.5">
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
                      <span className="text-[9px] text-muted-foreground">
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

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
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
    <section className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>quality features</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>{qualityFeatures.length} pillars</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Quality SIP trunking
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Learn how thousands of innovative businesses rely on Plivo for their customer engagement.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {qualityFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong"
            >
              <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
                <span className="font-mono-ui text-[11px] text-muted-foreground">
                  pillar / {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground/70">
                  sip quality
                </span>
              </div>
              <div className="relative overflow-hidden border-b border-border">
                {feature.illustration}
              </div>
              <div className="flex flex-grow flex-col gap-2 p-5 sm:p-6">
                <h3 className="font-sora text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
