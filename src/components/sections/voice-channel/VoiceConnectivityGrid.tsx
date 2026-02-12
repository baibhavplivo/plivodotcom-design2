import { Badge } from "@/components/ui/badge";
import WorldMap from "@/components/ui/world-map";

interface Feature {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

// Phone number data for marquee
const phoneNumbers = [
  { flag: "🇮🇳", code: "IND", number: "+91 98XXX XXXXX", city: "New Delhi" },
  { flag: "🇺🇸", code: "USA", number: "+1 415 XXX XXXX", city: "San Francisco" },
  { flag: "🇬🇧", code: "GBR", number: "+44 20 XXXX XXXX", city: "London" },
  { flag: "🇩🇪", code: "DEU", number: "+49 30 XXXX XXXX", city: "Berlin" },
  { flag: "🇫🇷", code: "FRA", number: "+33 1 XX XX XX XX", city: "Paris" },
  { flag: "🇯🇵", code: "JPN", number: "+81 3 XXXX XXXX", city: "Tokyo" },
  { flag: "🇦🇺", code: "AUS", number: "+61 2 XXXX XXXX", city: "Sydney" },
  { flag: "🇧🇷", code: "BRA", number: "+55 11 XXXXX XXXX", city: "São Paulo" },
  { flag: "🇨🇦", code: "CAN", number: "+1 416 XXX XXXX", city: "Toronto" },
  { flag: "🇸🇬", code: "SGP", number: "+65 6XXX XXXX", city: "Singapore" },
  { flag: "🇦🇪", code: "UAE", number: "+971 4 XXX XXXX", city: "Dubai" },
  { flag: "🇳🇱", code: "NLD", number: "+31 20 XXX XXXX", city: "Amsterdam" },
];

// Phone number card component
function PhoneNumberCard({ flag, code, number, city }: { flag: string; code: string; number: string; city: string }) {
  return (
    <div className="flex-shrink-0 bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 min-w-[200px]">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{flag}</span>
        <span className="text-sm font-semibold text-gray-900">{code}</span>
      </div>
      <div className="w-px h-8 bg-gray-200" />
      <div>
        <p className="text-sm font-medium text-gray-900">{number}</p>
        <p className="text-xs text-gray-500">{city}</p>
      </div>
    </div>
  );
}

// Illustration for Global Coverage
function GlobalCoverageIllustration() {
  const row1 = phoneNumbers.slice(0, 6);
  const row2 = phoneNumbers.slice(6, 12);

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 120s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 120s linear infinite;
        }
      `}</style>

      {/* Marquee container */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 py-4">
        {/* Row 1 - moves left */}
        <div className="overflow-hidden">
          <div className="marquee-left flex gap-3" style={{ width: 'max-content' }}>
            {[...row1, ...row1].map((phone, i) => (
              <PhoneNumberCard key={i} {...phone} />
            ))}
          </div>
        </div>

        {/* Row 2 - moves right */}
        <div className="overflow-hidden">
          <div className="marquee-right flex gap-3" style={{ width: 'max-content' }}>
            {[...row2, ...row2].map((phone, i) => (
              <PhoneNumberCard key={i} {...phone} />
            ))}
          </div>
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-100/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-100/70 to-transparent pointer-events-none z-10" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

// Illustration for Crystal Clear Quality
function CrystalClearIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      {/* World Map with animated routes */}
      <WorldMap
        lineColor="#323dfe"
        dots={[
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska
            end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />

      {/* Stats badge */}
      <div className="absolute right-3 top-3 flex flex-col items-center gap-1 z-20">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#323dfe]" />
          <span className="text-sm font-medium text-black">&lt;500ms</span>
        </div>
        <span className="text-xs text-gray-500">1 hop</span>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

// Illustration for Intelligent Routing
function IntelligentRoutingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="absolute inset-0 flex items-center px-6">
        <div className="w-full flex items-center justify-between">
          {/* Source */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500">Inbound</span>
          </div>

          {/* Line 1 - Inbound to AI */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-300 to-gray-400 mx-3" />

          {/* AI Routing - Circular with Glow */}
          <div className="flex flex-col items-center gap-1.5 relative">
            {/* Soft glow effect */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#cd3ef9]/30 to-[#323dfe]/30 blur-xl" />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center shadow-lg">
              {/* Sparkle icon from Vector.svg */}
              <svg className="w-6 h-6" viewBox="0 0 8 8" fill="none">
                <path d="M7.2153 3.67496C6.54391 3.93557 5.86369 4.10783 5.27623 4.54953C4.37957 5.22534 4.03063 6.15291 3.69493 7.1865C3.6596 7.23508 3.56684 7.23508 3.53592 7.1865C3.28415 6.51511 3.10747 5.84372 2.66577 5.26509C1.91487 4.2801 1.20373 4.16084 0.134811 3.72797C0.0508876 3.69263 -0.046287 3.67055 0.0243854 3.55129C0.0553046 3.49828 1.00055 3.18909 1.15073 3.12284C2.07388 2.72972 2.74969 2.04508 3.1428 1.12192C3.29298 0.764144 3.39016 0.375446 3.54917 0.0265011L3.62868 0L3.7126 0.0706723C4.02621 1.0645 4.37074 1.95232 5.20997 2.61488C5.79744 3.07866 6.48649 3.2686 7.17555 3.52478C7.22855 3.5557 7.22413 3.62196 7.21088 3.67496H7.2153Z" fill="white"/>
              </svg>
            </div>
            <span className="text-[10px] text-gray-500 font-medium relative">AI Routing</span>
          </div>

          {/* Lines to Carriers - branching */}
          <div className="flex-1 flex flex-col justify-center gap-[18px] mx-3">
            <div className="h-[2px] bg-gradient-to-r from-[#323dfe] to-[#323dfe]/60 rounded-full" />
            <div className="h-[2px] bg-gradient-to-r from-gray-300 to-gray-200 rounded-full" />
            <div className="h-[2px] bg-gradient-to-r from-gray-300 to-gray-200 rounded-full" />
          </div>

          {/* Carriers */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-[#323dfe] px-3 py-1.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-gray-700">Carrier A</span>
              <span className="text-[10px] text-emerald-600 font-medium">45ms</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-1.5 opacity-50">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500">Carrier B</span>
              <span className="text-[10px] text-gray-400">120ms</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-1.5 opacity-50">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500">Carrier C</span>
              <span className="text-[10px] text-gray-400">200ms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration for Verified Calls
function VerifiedCallsIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="absolute inset-0 flex items-start pt-3 px-6">
        <div className="w-full flex items-start justify-center gap-5">
          {/* Phone Device Mock - Incoming Call Screen (Light Version) */}
          <div className="relative w-48 h-[220px] bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-200">
            {/* Phone notch/speaker */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-200 rounded-full" />

            {/* Call screen content */}
            <div className="h-full flex flex-col items-center justify-between py-5 px-4">
              {/* Top - Caller info */}
              <div className="text-center mt-4">
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1.5">Incoming Call</p>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-lg font-semibold text-gray-900">Acme Inc.</p>
                  <svg className="w-4.5 h-4.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">+1 (555) 123-4567</p>
              </div>

              {/* Bottom - Call buttons */}
              <div className="flex items-center justify-center gap-10 mb-9">
                {/* Decline */}
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-md">
                  <svg className="w-4.5 h-4.5 text-white rotate-[135deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {/* Accept */}
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom fade effect */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
          </div>

          {/* Verification Features - Tighter spacing */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
              <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-900 leading-tight">SHAKEN/STIR</p>
                <p className="text-[9px] text-gray-500 leading-tight">Call authentication</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
              <div className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-900 leading-tight">CNAM</p>
                <p className="text-[9px] text-gray-500 leading-tight">Caller ID name</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
              <div className="w-7 h-7 rounded-md bg-[#323dfe]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#323dfe]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-900 leading-tight">Branded Caller ID</p>
                <p className="text-[9px] text-gray-500 leading-tight">Logo & business name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration for Audio Streaming
function AudioStreamingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      {/* CSS for natural wave animation */}
      <style>{`
        @keyframes stream-wave {
          0%, 100% {
            transform: scaleY(0.3);
          }
          25% {
            transform: scaleY(0.8);
          }
          50% {
            transform: scaleY(1);
          }
          75% {
            transform: scaleY(0.6);
          }
        }
        .stream-wave-bar {
          animation: stream-wave 1s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="absolute inset-0 flex items-center px-6">
        <div className="w-full flex items-center gap-6">
          {/* Source */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">Voice Input</span>
          </div>

          {/* Waveform Panel */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#323dfe] animate-pulse" />
                <span className="text-xs font-medium text-gray-900">WebSocket Stream</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span>128kbps</span>
                <span>Opus</span>
                <span className="text-[#323dfe] font-medium">Live</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[2px] h-16">
              {[10, 18, 8, 24, 14, 20, 8, 28, 12, 20, 6, 22, 16, 26, 10, 18, 5, 22, 14, 24, 8, 20, 12, 24, 6, 28, 18, 16, 22, 10, 26, 14, 20, 8, 24].map((height, i) => (
                <div
                  key={i}
                  className="stream-wave-bar w-[3px] rounded-full bg-gradient-to-t from-[#323dfe] to-[#cd3ef9]"
                  style={{
                    height: `${height}px`,
                    animationDelay: `${(i * 0.08) % 1.2}s`,
                    opacity: 0.6 + (Math.sin(i * 0.5) * 0.4)
                  }}
                />
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">Your App</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration for SIP trunking
function SIPTrunkingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <style>{`
        @keyframes sip-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .sip-pulse { animation: sip-pulse 1.5s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 flex items-center px-6">
        <div className="w-full flex items-center justify-between">
          {/* Your Infrastructure */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Your PBX</p>
                  <p className="text-[10px] text-gray-500">IP-PBX / UCaaS</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-gray-500">Connected</span>
              </div>
            </div>
          </div>

          {/* Connection Line 1 */}
          <div className="flex items-center gap-1">
            <div className="h-[2px] w-8 bg-gradient-to-r from-gray-300 to-[#cd3ef9] sip-pulse" />
            <div className="px-2 py-1 rounded bg-[#323dfe]/10 text-[10px] text-[#323dfe] font-medium">SIP</div>
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] sip-pulse" />
          </div>

          {/* Plivo SIP Trunk */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-gradient-to-br from-[#cd3ef9] to-[#323dfe] rounded-2xl p-4 shadow-lg">
              <div className="text-center">
                <p className="text-sm font-bold text-white">Plivo</p>
                <p className="text-[10px] text-white/80">SIP Trunk</p>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <div className="w-2 h-2 rounded-full bg-white/80" />
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Connection Line 2 */}
          <div className="flex items-center gap-1">
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#323dfe] to-[#cd3ef9] sip-pulse" />
            <div className="px-2 py-1 rounded bg-[#323dfe]/10 text-[10px] text-[#323dfe] font-medium">SIP</div>
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#cd3ef9] to-gray-300 sip-pulse" />
          </div>

          {/* Destinations */}
          <div className="flex flex-col gap-2">
            <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                <div>
                  <p className="text-xs font-medium text-gray-900">PSTN</p>
                  <p className="text-[10px] text-gray-500">Global</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs font-medium text-gray-900">Mobile</p>
                  <p className="text-[10px] text-gray-500">Carriers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Global coverage",
    tags: ["50+ countries", "Direct PSTN"],
    description:
      "Local, toll-free, and mobile numbers in 50+ countries for inbound calls. Reach customers in 190+ countries without managing multiple telecom carriers.",
    illustration: <GlobalCoverageIllustration />,
  },
  {
    title: "Human-like call quality",
    tags: ["Sub-500ms latency", "HD voice"],
    description:
      "Regional Points of Presence across five continents ensure low-latency, high-quality voice calls with direct one-hop carrier connectivity.",
    illustration: <CrystalClearIllustration />,
  },
  {
    title: "Intelligent call routing",
    tags: ["Real-time", "Data-driven"],
    description:
      "Our routing engine dynamically selects the optimal call path based on latency, jitter, and MOS scores for the best possible call quality.",
    illustration: <IntelligentRoutingIllustration />,
  },
  {
    title: "Verified & trusted calls",
    tags: ["Branded calling", "SHAKEN/STIR"],
    description:
      "Display your business name and logo on caller ID with CNAM registration and full SHAKEN/STIR compliance to boost answer rates.",
    illustration: <VerifiedCallsIllustration />,
  },
  {
    title: "Real-time audio streaming",
    tags: ["WebSocket", "Low latency"],
    description:
      "Stream audio in real-time via WebSocket for live transcription, sentiment analysis, and AI-powered voice processing with minimal delay.",
    illustration: <AudioStreamingIllustration />,
  },
  {
    title: "Enterprise SIP trunking",
    tags: ["Bring your own carrier", "Scalable"],
    description:
      "Connect your existing PBX or UCaaS platform to Plivo's global network with flexible SIP trunking and unlimited concurrent call capacity.",
    illustration: <SIPTrunkingIllustration />,
  },
];

export default function VoiceConnectivityGrid() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Powerful voice connectivity
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          Enterprise-grade telephony infrastructure that scales with your business.
        </p>

        {/* 2x2 Grid of Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300"
            >
              {/* Illustration */}
              {feature.illustration}

              {/* Content */}
              <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {feature.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-gray-100 text-gray-900 hover:bg-gray-200 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
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
