"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

const complianceBadges = [
  { name: "HIPAA", icon: "/images/compliance/HIPAA black.svg" },
  { name: "GDPR", icon: "/images/compliance/GDPR black.svg" },
  { name: "SOC 2", icon: "/images/compliance/AICPA black.svg" },
  { name: "PCI DSS", icon: "/images/compliance/PCI black.svg" },
  { name: "STAR", icon: "/images/compliance/Star Black.svg" },
];

const features = [
  {
    title: "Enterprise-grade security",
    description:
      "End-to-end encryption and data protection for all voice communications.",
  },
  {
    title: "Global compliance",
    description:
      "Meet regulatory requirements across all major markets and industries.",
  },
  {
    title: "99.99% uptime SLA",
    description:
      "Carrier-grade reliability with redundant infrastructure worldwide.",
  },
];

// Globe configuration
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function ComplianceGlobe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });
    return () => globe.destroy();
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

export default function ComplianceSection() {
  return (
    <section className="compliance-section bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Main card container */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row">
            {/* Left content */}
            <div className="relative z-10 flex-1 p-8 md:p-12">
              {/* Compliance badges */}
              <div className="mb-10 flex flex-wrap gap-6">
                {complianceBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm">
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="h-full w-full object-contain opacity-50 grayscale"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features grid */}
              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h3 className="mb-2 text-base font-semibold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Globe */}
            <div className="relative hidden h-[280px] w-full md:block md:h-auto md:w-[350px]">
              <ComplianceGlobe className="absolute -bottom-20 -right-40 scale-150" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
