"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  size?: number;
  dark?: boolean;
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
  markerColor?: [number, number, number];
  opacity?: number;
  darkBaseColor?: [number, number, number];
  darkGlowColor?: [number, number, number];
  darkMarkerColor?: [number, number, number];
  darkOpacity?: number;
  interactive?: boolean;
}

function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

export function Globe({
  className,
  size = 600,
  dark,
  baseColor = [0.9, 0.9, 0.95],
  glowColor = [0.85, 0.85, 0.9],
  markerColor = [0.55, 0.36, 0.96],
  opacity = 0.4,
  darkBaseColor = [0.32, 0.38, 0.55],
  darkGlowColor = [0.05, 0.06, 0.1],
  darkMarkerColor,
  darkOpacity = 0.85,
  interactive = true,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.25);

  const isDark = useIsDark();
  const effectiveDark = dark ?? isDark;
  const effectiveBase = effectiveDark ? darkBaseColor : baseColor;
  const effectiveGlow = effectiveDark ? darkGlowColor : glowColor;
  const effectiveMarker = effectiveDark
    ? darkMarkerColor ?? markerColor
    : markerColor;
  const effectiveOpacity = effectiveDark ? darkOpacity : opacity;

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!interactive) return;
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    },
    [interactive]
  );

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  const onMouseMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!interactive || pointerInteracting.current === null) return;
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    },
    [interactive]
  );

  useEffect(() => {
    let globe: ReturnType<typeof createGlobe> | null = null;
    const dpr = window.devicePixelRatio || 1;
    const pixelSize = size * dpr;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: pixelSize,
        height: pixelSize,
        phi: 0,
        theta: 0.25,
        dark: effectiveDark ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: effectiveBase,
        markerColor: effectiveMarker,
        glowColor: effectiveGlow,
        opacity: effectiveOpacity,
        markers: [
          { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
          { location: [40.7128, -74.006], size: 0.05 }, // New York
          { location: [51.5074, -0.1278], size: 0.05 }, // London
          { location: [48.8566, 2.3522], size: 0.04 }, // Paris
          { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
          { location: [22.3193, 114.1694], size: 0.04 }, // Hong Kong
          { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
          { location: [28.6139, 77.209], size: 0.05 }, // New Delhi
          { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
          { location: [55.7558, 37.6173], size: 0.04 }, // Moscow
          { location: [-23.5505, -46.6333], size: 0.04 }, // São Paulo
          { location: [19.4326, -99.1332], size: 0.04 }, // Mexico City
        ],
        onRender: (state) => {
          // Keep dimensions fixed — no per-frame resize
          state.width = pixelSize;
          state.height = pixelSize;

          if (pointerInteracting.current !== null) {
            const r = pointerInteractionMovement.current;
            phiRef.current += r * 0.005;
            pointerInteractionMovement.current *= 0.9;
            // Kill momentum below threshold to prevent micro-jitter
            if (Math.abs(pointerInteractionMovement.current) < 0.01) {
              pointerInteractionMovement.current = 0;
            }
          } else {
            phiRef.current += 0.002;
          }

          state.phi = phiRef.current;
          state.theta = thetaRef.current;
        },
      });
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
    };
  }, [
    size,
    effectiveDark,
    effectiveBase,
    effectiveGlow,
    effectiveMarker,
    effectiveOpacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("aspect-square", className)}
      style={{
        width: size,
        height: size,
        maxWidth: "100%",
        contain: "layout paint size",
        cursor: interactive ? "grab" : "default",
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onPointerMove={onMouseMove}
    />
  );
}

export default Globe;
