"use client";

import { useEffect, useRef, useCallback } from "react";
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
  interactive?: boolean;
}

export function Globe({
  className,
  size = 600,
  dark = false,
  baseColor = [0.9, 0.9, 0.95],
  glowColor = [0.85, 0.85, 0.9],
  markerColor = [0.55, 0.36, 0.96],
  opacity = 0.4,
  interactive = true,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.25);

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
    let width = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: window.devicePixelRatio || 1,
        width: size * 2,
        height: size * 2,
        phi: 0,
        theta: 0.25,
        dark: dark ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor,
        markerColor,
        glowColor,
        opacity,
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
          // Handle interaction or auto-rotate
          if (pointerInteracting.current !== null) {
            // User is dragging - use pointer movement
            const r = pointerInteractionMovement.current;
            phiRef.current += r * 0.005;
            pointerInteractionMovement.current *= 0.9; // Damping
          } else {
            // Auto-rotate when not interacting
            phiRef.current += 0.002;
          }

          state.phi = phiRef.current;
          state.theta = thetaRef.current;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [size, dark, baseColor, glowColor, markerColor, opacity]);

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
