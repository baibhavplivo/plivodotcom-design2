export default function SIPTrunkingHeroIllustration() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <style>{`
        @keyframes sip-travel {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .sip-line-animated {
          stroke-dasharray: 4 4;
          animation: sip-travel 1.5s linear infinite;
        }
        .sip-line-animated-rev {
          stroke-dasharray: 4 4;
          animation: sip-travel 1.5s linear infinite reverse;
        }
      `}</style>

      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background */}
        <rect width="520" height="340" rx="16" fill="white" />
        <rect
          width="520"
          height="340"
          rx="16"
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* ── Left Node: Your PBX ── */}
        <rect
          x="32"
          y="110"
          width="88"
          height="88"
          rx="12"
          fill="#F9FAFB"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        {/* Server icon */}
        <rect x="56" y="134" width="40" height="14" rx="3" fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
        <circle cx="84" cy="141" r="2" fill="#9CA3AF" />
        <rect x="56" y="152" width="40" height="14" rx="3" fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
        <circle cx="84" cy="159" r="2" fill="#9CA3AF" />
        <text
          x="76"
          y="186"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          Your PBX
        </text>

        {/* ── Center Node: Plivo Zentrunk ── */}
        <rect
          x="210"
          y="98"
          width="100"
          height="100"
          rx="20"
          fill="url(#plivo-grad)"
        />
        <text
          x="260"
          y="145"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          Plivo
        </text>
        <text
          x="260"
          y="162"
          textAnchor="middle"
          fill="rgba(255,255,255,0.8)"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          Zentrunk
        </text>

        {/* ── Right Nodes: Destinations ── */}
        {/* Mobile */}
        <rect
          x="400"
          y="88"
          width="88"
          height="44"
          rx="8"
          fill="#F9FAFB"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        <rect x="414" y="97" width="16" height="26" rx="3" fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
        <line x1="418" y1="118" x2="426" y2="118" stroke="#9CA3AF" strokeWidth="1.2" />
        <text
          x="443"
          y="113"
          fill="#374151"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Mobile
        </text>

        {/* Fixed/PSTN */}
        <rect
          x="400"
          y="144"
          width="88"
          height="44"
          rx="8"
          fill="#F9FAFB"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        <circle cx="422" cy="166" r="8" fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
        <circle cx="422" cy="166" r="3" fill="#9CA3AF" />
        <text
          x="443"
          y="170"
          fill="#374151"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          PSTN
        </text>

        {/* Toll-Free */}
        <rect
          x="400"
          y="200"
          width="88"
          height="44"
          rx="8"
          fill="#F9FAFB"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        <path d="M414 222 L422 214 L430 222" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="422" y1="214" x2="422" y2="226" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
        <text
          x="443"
          y="225"
          fill="#374151"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Toll-Free
        </text>

        {/* ── Dotted Lines: PBX → Plivo ── */}
        <line
          x1="120"
          y1="148"
          x2="210"
          y2="148"
          stroke="#323dfe"
          strokeWidth="1.2"
          className="sip-line-animated"
        />

        {/* SIP label */}
        <rect x="148" y="130" width="28" height="16" rx="4" fill="#F0F0FF" />
        <text
          x="162"
          y="141"
          textAnchor="middle"
          fill="#323dfe"
          fontSize="8"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          SIP
        </text>

        {/* ── Dotted Lines: Plivo → Destinations ── */}
        {/* To Mobile */}
        <line
          x1="310"
          y1="135"
          x2="400"
          y2="110"
          stroke="#323dfe"
          strokeWidth="1.2"
          className="sip-line-animated"
        />
        {/* To PSTN */}
        <line
          x1="310"
          y1="148"
          x2="400"
          y2="166"
          stroke="#cd3ef9"
          strokeWidth="1.2"
          className="sip-line-animated-rev"
        />
        {/* To Toll-Free */}
        <line
          x1="310"
          y1="162"
          x2="400"
          y2="222"
          stroke="#323dfe"
          strokeWidth="1.2"
          opacity="0.5"
          className="sip-line-animated"
        />

        {/* ── Bottom Stats ── */}
        <line
          x1="32"
          y1="270"
          x2="488"
          y2="270"
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* Stat 1 */}
        <text
          x="110"
          y="296"
          textAnchor="middle"
          fill="#111827"
          fontSize="20"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          220+
        </text>
        <text
          x="110"
          y="312"
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Countries
        </text>

        {/* Divider */}
        <line
          x1="195"
          y1="278"
          x2="195"
          y2="322"
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* Stat 2 */}
        <text
          x="260"
          y="296"
          textAnchor="middle"
          fill="#111827"
          fontSize="20"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          99.99%
        </text>
        <text
          x="260"
          y="312"
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Uptime SLA
        </text>

        {/* Divider */}
        <line
          x1="325"
          y1="278"
          x2="325"
          y2="322"
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* Stat 3 */}
        <text
          x="410"
          y="296"
          textAnchor="middle"
          fill="#111827"
          fontSize="20"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          {"\u221E"}
        </text>
        <text
          x="410"
          y="312"
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Concurrent Calls
        </text>

        {/* ── Small dots on connection points ── */}
        <circle cx="120" cy="148" r="3" fill="#323dfe" opacity="0.6" />
        <circle cx="210" cy="148" r="3" fill="#323dfe" />
        <circle cx="310" cy="135" r="3" fill="#323dfe" />
        <circle cx="310" cy="148" r="3" fill="#cd3ef9" />
        <circle cx="310" cy="162" r="3" fill="#323dfe" opacity="0.5" />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="plivo-grad"
            x1="210"
            y1="98"
            x2="310"
            y2="198"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#cd3ef9" />
            <stop offset="1" stopColor="#323dfe" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
