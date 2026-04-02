import { Globe } from "@/components/ui/globe";

interface Feature {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

// Illustration: High-Performance SMS
function HighPerformanceSMSIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        {/* Two-column layout */}
        <div className="flex gap-2.5 h-full w-full max-w-[320px]">
          {/* Left column - Key metrics */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Throughput metric */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span className="text-[11px] text-gray-500 font-medium">Throughput</span>
              </div>
              <p className="text-[20px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">10K</p>
              <p className="text-[11px] text-gray-500 mt-0.5">msgs/sec</p>
            </div>

            {/* Latency metric */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[11px] text-gray-500 font-medium">Latency</span>
              </div>
              <p className="text-[20px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">&lt;3s</p>
              <p className="text-[11px] text-gray-500 mt-0.5">avg delivery</p>
            </div>
          </div>

          {/* Right column - SMS Delivery list */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-2.5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <span className="text-[10px] text-gray-500 font-medium">SMS Delivery</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">Live</span>
            </div>

            {/* Delivery list */}
            <div className="flex-1 space-y-1 overflow-hidden">
              {[
                { number: "+1 (555) 123", time: "0.8s" },
                { number: "+44 (20) 794", time: "1.2s" },
                { number: "+91 (98) 765", time: "0.6s" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-50">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <defs>
                      <linearGradient id={`checkGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#cd3ef9" />
                        <stop offset="100%" stopColor="#323dfe" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" stroke={`url(#checkGradient${i})`} d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-[10px] font-mono text-gray-600 truncate flex-1">{item.number}</span>
                  <span className="text-[9px] text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-gray-100">
              <span className="text-[9px] text-gray-500">99% delivered</span>
              <span className="text-[9px] font-medium text-gray-600">1.2M sent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Built-in Fraud Prevention
function FraudPreventionIllustration() {
  const numbers = [
    { number: "+1 (555) 123-4567", status: "verified", risk: "Low" },
    { number: "+44 (20) 7946-0958", status: "verified", risk: "Low" },
    { number: "+263 (77) 456-789", status: "blocked", risk: "High" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        {/* Fraud Detection Panel */}
        <div className="bg-white rounded-lg border border-gray-200 h-full w-full max-w-[260px] flex flex-col">
          {/* Header */}
          <div className="px-2.5 py-1.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-[11px] font-semibold text-gray-800">Fraud Scanner</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">Active</span>
          </div>

          {/* Number list */}
          <div className="flex-1 px-1.5 py-1 space-y-0.5 overflow-hidden">
            {numbers.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-2 py-1.5 rounded-md ${
                  item.status === "blocked"
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.status === "verified" ? (
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
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
            <span className="text-[10px] text-gray-500">2.4K blocked today</span>
            <span className="text-[10px] font-medium text-gray-700">99.8% legitimate</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Owns the Messaging Infrastructure
function InfrastructureIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Stacked cards - using absolute positioning for precise control */}
        <div className="relative w-[280px] h-[150px]">
          {/* Back card (top-left) */}
          <div
            className="absolute -skew-y-[8deg] bg-white rounded-lg border border-gray-200 shadow-md px-3 py-2.5 w-[230px]"
            style={{ top: '12px', left: '0px', zIndex: 1 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex-shrink-0 w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <defs>
                    <linearGradient id="iconGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cd3ef9" />
                      <stop offset="100%" stopColor="#323dfe" />
                    </linearGradient>
                  </defs>
                  <path stroke="url(#iconGradient1)" strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">Carrier Network</p>
                <p className="text-[11px] text-gray-500 truncate">Direct carrier connections</p>
              </div>
            </div>
          </div>

          {/* Middle card (center) */}
          <div
            className="absolute -skew-y-[8deg] bg-white rounded-lg border border-gray-200 shadow-lg px-3 py-2.5 w-[230px]"
            style={{ top: '41px', left: '25px', zIndex: 2 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex-shrink-0 w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <defs>
                    <linearGradient id="iconGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cd3ef9" />
                      <stop offset="100%" stopColor="#323dfe" />
                    </linearGradient>
                  </defs>
                  <path stroke="url(#iconGradient2)" strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">Messaging Platform</p>
                <p className="text-[11px] text-gray-500 truncate">Enterprise SMS gateway</p>
              </div>
            </div>
          </div>

          {/* Front card (bottom-right) */}
          <div
            className="absolute -skew-y-[8deg] bg-white rounded-lg border border-gray-200 shadow-xl px-3 py-2.5 w-[230px]"
            style={{ top: '70px', left: '50px', zIndex: 3 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex-shrink-0 w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <defs>
                    <linearGradient id="iconGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cd3ef9" />
                      <stop offset="100%" stopColor="#323dfe" />
                    </linearGradient>
                  </defs>
                  <path stroke="url(#iconGradient3)" strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">Marketing Suite</p>
                <p className="text-[11px] text-gray-500 truncate">Campaign tools & analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Smart Routing
function SmartRoutingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full flex items-center justify-center p-3">
        {/* SVG Routing Diagram - Technical style */}
        <svg className="w-full h-full" viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines - subtle background */}
          <defs>
            <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5" />
            </pattern>
            <linearGradient id="optimalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cd3ef9" />
              <stop offset="100%" stopColor="#323dfe" />
            </linearGradient>
          </defs>
          <rect width="280" height="160" fill="url(#gridPattern)" opacity="0.4" />

          {/* Route paths - technical dashed/solid lines */}
          {/* Top route - dashed (inactive) */}
          <path
            d="M 40 80 C 80 80, 95 35, 140 35 L 220 35"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Middle route - solid (active/optimal) */}
          <path
            d="M 40 80 C 80 80, 95 80, 140 80 L 220 80"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
          />

          {/* Bottom route - dashed (inactive) */}
          <path
            d="M 40 80 C 80 80, 95 125, 140 125 L 220 125"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Source node - left */}
          <circle cx="40" cy="80" r="14" fill="white" stroke="#9ca3af" strokeWidth="1.5" />
          <circle cx="40" cy="80" r="6" fill="#6b7280" />
          <text x="40" y="108" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="Inter, sans-serif">Source</text>

          {/* Center routing hub - rectangle */}
          <rect x="125" y="65" width="30" height="30" rx="4" fill="white" stroke="#6b7280" strokeWidth="1.5" />
          {/* Router arrows inside */}
          <path d="M 135 80 L 140 75 L 145 80" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 135 80 L 140 85 L 145 80" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Destination nodes - right side */}
          {/* Top endpoint */}
          <circle cx="235" cy="35" r="10" fill="white" stroke="#d1d5db" strokeWidth="1.5" />
          <circle cx="235" cy="35" r="3" fill="#d1d5db" />

          {/* Middle endpoint (optimal) - highlighted with gradient */}
          <circle cx="235" cy="80" r="12" fill="white" stroke="url(#optimalGradient)" strokeWidth="2.5" />
          <path d="M 230 80 L 234 84 L 242 76" fill="none" stroke="url(#optimalGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom endpoint */}
          <circle cx="235" cy="125" r="10" fill="white" stroke="#d1d5db" strokeWidth="1.5" />
          <circle cx="235" cy="125" r="3" fill="#d1d5db" />

          {/* Labels */}
          <text x="235" y="15" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="Inter, sans-serif">Route A</text>
          <text x="235" y="56" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600">Optimal</text>
          <text x="235" y="148" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="Inter, sans-serif">Route C</text>

          {/* Latency indicators */}
          <text x="180" y="28" fill="#9ca3af" fontSize="7" fontFamily="Inter, sans-serif">120ms</text>
          <text x="180" y="73" fill="#6b7280" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600">45ms</text>
          <text x="180" y="142" fill="#9ca3af" fontSize="7" fontFamily="Inter, sans-serif">95ms</text>
        </svg>

        {/* Delivery rate pill - top left */}
        <div className="absolute left-4 top-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200/60 flex items-center gap-1.5">
            <span className="text-[16px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">&gt;99%</span>
            <span className="text-[10px] text-gray-500 font-medium">delivery</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Global Scale & Local Compliance
function GlobalScaleIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full">
        {/* Rotating Globe - positioned to show top hemisphere */}
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

        {/* 190+ Countries pill - overlapping globe on top right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[22px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">190+</span>
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

// Illustration: Enterprise-Grade Reliability
function EnterpriseReliabilityIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-4">
        {/* Minimal status pill - top right */}
        <div className="absolute right-4 top-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full pl-2.5 pr-3 py-1.5 shadow-sm border border-gray-200/60 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[18px] font-semibold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent leading-none">99.99%</span>
          </div>
        </div>

        {/* Platform Uptime label - top left */}
        <div className="absolute left-4 top-4">
          <span className="text-[11px] font-medium text-gray-500">Platform Uptime</span>
        </div>

        {/* Chart area - edge to edge */}
        <div className="absolute inset-x-0 top-20 bottom-4 h-[90px]">
          <svg className="w-full h-full" viewBox="0 0 200 90" preserveAspectRatio="none">
            <defs>
              <linearGradient id="reliability-gradient-new" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#323dfe" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#323dfe" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cd3ef9" />
                <stop offset="100%" stopColor="#323dfe" />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            <line x1="0" y1="25" x2="200" y2="25" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="45" x2="200" y2="45" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="65" x2="200" y2="65" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Area fill - curved wave pattern edge to edge */}
            <path
              d="M0 35 C 15 30, 25 25, 40 28 C 55 31, 65 22, 80 20 C 95 18, 105 25, 120 22 C 135 19, 150 16, 165 20 C 180 24, 188 18, 200 14 L200 90 L0 90 Z"
              fill="url(#reliability-gradient-new)"
            />

            {/* Main line - curved wave edge to edge */}
            <path
              d="M0 35 C 15 30, 25 25, 40 28 C 55 31, 65 22, 80 20 C 95 18, 105 25, 120 22 C 135 19, 150 16, 165 20 C 180 24, 188 18, 200 14"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Endpoint dot - positioned outside SVG to maintain circle shape */}
          <div className="absolute right-0 top-[15.5%] translate-x-1/2 -translate-y-1/2">
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

const features: Feature[] = [
  {
    title: "High-performance SMS",
    description:
      "Deliver 10,000+ messages per second with sub-3-second latency and 99%+ delivery rates through direct carrier connections.",
    illustration: <HighPerformanceSMSIllustration />,
  },
  {
    title: "Built-in fraud prevention",
    description:
      "Block spam and fraud automatically with ML-powered detection that screens every message without impacting legitimate traffic.",
    illustration: <FraudPreventionIllustration />,
  },
  {
    title: "Owns the messaging infrastructure",
    description:
      "Direct carrier relationships and proprietary routing ensure your messages bypass third-party bottlenecks.",
    illustration: <InfrastructureIllustration />,
  },
  {
    title: "Smart routing",
    description:
      "Intelligent algorithms analyze real-time carrier performance to route each message through the fastest, most reliable path.",
    illustration: <SmartRoutingIllustration />,
  },
  {
    title: "Global scale & local compliance",
    description:
      "Send to 190+ countries while staying compliant with local regulations including GDPR, TCPA, and carrier-specific requirements.",
    illustration: <GlobalScaleIllustration />,
  },
  {
    title: "Enterprise-grade reliability",
    description:
      "99.99% platform uptime backed by redundant infrastructure, automatic failover, and 24/7 monitoring.",
    illustration: <EnterpriseReliabilityIllustration />,
  },
];

export default function SMSConnectivityGrid() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          The SMS platform for reliable authentication & verification
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 md:mb-16">
          Enterprise-grade infrastructure that delivers messages when it matters most. Built for developers who need bulletproof reliability.
        </p>

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

        {/* Compliance Logos */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-12 sm:gap-[4.5rem] md:gap-24">
          {[
            { name: "HIPAA", src: "/images/compliance/HIPAA black.svg" },
            { name: "GDPR", src: "/images/compliance/GDPR black.svg" },
            { name: "SOC 2", src: "/images/compliance/AICPA black.svg" },
            { name: "PCI DSS", src: "/images/compliance/PCI black.svg" },
            { name: "STAR", src: "/images/compliance/Star Black.svg" },
          ].map((cert) => (
            <div key={cert.name} className="flex flex-col items-center gap-3">
              <img
                src={cert.src}
                alt={`${cert.name} compliance`}
                className="h-10 sm:h-12 w-10 sm:w-12 object-contain opacity-60"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-500">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
