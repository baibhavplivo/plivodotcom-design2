"use client";

export default function SIPTrunkingHeroIllustration() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto overflow-hidden rounded-2xl border border-border bg-background">
      {/* Dotted grid backdrop - stops above stats section */}
      <div
        className="pointer-events-none absolute inset-0 bottom-[20%] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "center center",
        }}
      />

      <style>{`
        @keyframes sip-flow {
          0% { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        .sip-dash {
          stroke-dasharray: 6 4;
          animation: sip-flow 1.2s linear infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 520 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] w-full h-auto"
      >
        {/* Left: Your PBX box */}
        <rect x="36" y="96" width="52" height="40" rx="8" className="fill-surface stroke-border" strokeWidth="1" />
        {/* Server stack icon */}
        <rect x="49" y="105" width="26" height="10" rx="2" fill="none" className="stroke-foreground" strokeWidth="1" />
        <circle cx="69" cy="110" r="1.5" className="fill-foreground" />
        <rect x="49" y="117" width="26" height="10" rx="2" fill="none" className="stroke-foreground" strokeWidth="1" />
        <circle cx="69" cy="122" r="1.5" className="fill-foreground" />
        <text
          x="62"
          y="148"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="9"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          Your PBX
        </text>

        {/* PBX → Plivo connection */}
        <line x1="88" y1="116" x2="196" y2="116" stroke="#323dfe" strokeWidth="1.5" className="sip-dash" />

        {/* SIP label */}
        <rect x="128" y="97" width="30" height="15" rx="4" className="fill-primary/10 stroke-primary" strokeWidth="0.5" />
        <text
          x="143"
          y="108"
          textAnchor="middle"
          className="fill-primary"
          fontSize="8"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          SIP
        </text>

        {/* Center: Plivo SIP trunking panel */}
        <rect x="196" y="74" width="118" height="84" rx="16" className="fill-surface" stroke="url(#plivo-stroke)" strokeWidth="2" />
        <text
          x="255"
          y="111"
          textAnchor="middle"
          className="fill-foreground"
          fontSize="15"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          Plivo
        </text>
        <text
          x="255"
          y="127"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          SIP trunking
        </text>

        {/* Plivo → Pills: right-angle bus */}
        <line x1="314" y1="116" x2="356" y2="116" stroke="#323dfe" strokeWidth="1.5" className="sip-dash" />
        <line x1="356" y1="64" x2="356" y2="168" stroke="#323dfe" strokeWidth="1.5" className="sip-dash" />
        <line x1="356" y1="64" x2="396" y2="64" stroke="#323dfe" strokeWidth="1.5" className="sip-dash" />
        <line x1="356" y1="116" x2="396" y2="116" stroke="#323dfe" strokeWidth="1.5" className="sip-dash" />
        <line x1="356" y1="168" x2="396" y2="168" stroke="#323dfe" strokeWidth="1.5" className="sip-dash" />

        {/* Junction dots */}
        <circle cx="88" cy="116" r="3" fill="#323dfe" opacity="0.5" />
        <circle cx="196" cy="116" r="3" fill="#323dfe" />
        <circle cx="314" cy="116" r="3" fill="#323dfe" />
        <circle cx="356" cy="64" r="2.5" fill="#323dfe" />
        <circle cx="356" cy="116" r="2.5" fill="#323dfe" />
        <circle cx="356" cy="168" r="2.5" fill="#323dfe" />

        {/* Right pills */}

        {/* Mobile pill */}
        <rect x="396" y="48" width="92" height="32" rx="16" className="fill-background stroke-border" strokeWidth="1" />
        <rect x="410" y="56" width="10" height="16" rx="2.5" fill="none" stroke="#323dfe" strokeWidth="1.2" />
        <line x1="413.5" y1="69" x2="416.5" y2="69" stroke="#323dfe" strokeWidth="0.8" strokeLinecap="round" />
        <text x="428" y="68" className="fill-foreground" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">
          Mobile
        </text>

        {/* PSTN pill */}
        <rect x="396" y="100" width="92" height="32" rx="16" className="fill-background stroke-border" strokeWidth="1" />
        <path d="M410 116 Q410 110 415 110 Q420 110 420 116" fill="none" stroke="#323dfe" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="408" y="116" width="14" height="6" rx="2.5" fill="none" stroke="#323dfe" strokeWidth="1.2" />
        <text x="428" y="120" className="fill-foreground" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">
          PSTN
        </text>

        {/* Toll-Free pill */}
        <rect x="396" y="152" width="92" height="32" rx="16" className="fill-background stroke-border" strokeWidth="1" />
        <path d="M409 170 V167 Q409 161 415 161 Q421 161 421 167 V170" fill="none" stroke="#323dfe" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="407" y="169" width="4" height="6" rx="1.5" fill="none" stroke="#323dfe" strokeWidth="1" />
        <rect x="419" y="169" width="4" height="6" rx="1.5" fill="none" stroke="#323dfe" strokeWidth="1" />
        <text x="428" y="172" className="fill-foreground" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
          Toll-free
        </text>

        {/* Bottom stats */}
        <line x1="32" y1="232" x2="488" y2="232" className="stroke-border" strokeWidth="1" />

        <text
          x="110"
          y="258"
          textAnchor="middle"
          className="fill-foreground"
          fontSize="20"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          220+
        </text>
        <text x="110" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontFamily="Inter, sans-serif">
          Countries
        </text>

        <line x1="195" y1="242" x2="195" y2="280" className="stroke-border" strokeWidth="1" />

        <text
          x="260"
          y="258"
          textAnchor="middle"
          className="fill-foreground"
          fontSize="20"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          99.99%
        </text>
        <text x="260" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontFamily="Inter, sans-serif">
          Uptime SLA
        </text>

        <line x1="325" y1="242" x2="325" y2="280" className="stroke-border" strokeWidth="1" />

        <text
          x="410"
          y="258"
          textAnchor="middle"
          className="fill-foreground"
          fontSize="20"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          {"∞"}
        </text>
        <text x="410" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontFamily="Inter, sans-serif">
          Concurrent calls
        </text>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="plivo-stroke" x1="196" y1="74" x2="314" y2="158" gradientUnits="userSpaceOnUse">
            <stop stopColor="#323dfe" />
            <stop offset="1" stopColor="#323dfe" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
