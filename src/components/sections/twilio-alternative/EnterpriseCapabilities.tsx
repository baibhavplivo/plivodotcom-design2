"use client";

import WorldMap from "@/components/ui/world-map";

const STATS = [
  { value: "Tens of billions", label: "API events processed" },
  { value: "220+", label: "Countries covered" },
  { value: "99.99%", label: "Uptime SLA available" },
  { value: "7", label: "Global points of presence" },
  { value: "24/7", label: "Premium support" },
  { value: "Billions", label: "Voice calls & messages" },
];

const MAP_ROUTES = [
  { start: { lat: 37.7749, lng: -122.4194 }, end: { lat: 51.5074, lng: -0.1278 } },
  { start: { lat: 37.7749, lng: -122.4194 }, end: { lat: 1.3521, lng: 103.8198 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 19.076, lng: 72.8777 } },
  { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: -33.8688, lng: 151.2093 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: -23.5505, lng: -46.6333 } },
  { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: 35.6762, lng: 139.6503 } },
];

export default function EnterpriseCapabilities() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <h2 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
            Enterprise-grade capabilities
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Built for scale, security, and reliability from day one.
          </p>
        </div>

        {/* Map with animated routes */}
        <div className="max-w-4xl mx-auto mb-12">
          <WorldMap
            lineColor="#323dfe"
            dots={MAP_ROUTES}
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-sora text-2xl sm:text-3xl font-normal text-black">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
