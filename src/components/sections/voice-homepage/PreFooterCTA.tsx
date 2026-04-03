"use client";

import { useEffect, useRef } from "react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useSignupUrl } from "@/hooks/useSignupUrl";

interface PreFooterCTAProps {
  title?: string;
  subtitle?: string;
}

export default function PreFooterCTA({
  title = "Ready to make every call count?",
  subtitle,
}: PreFooterCTAProps) {
  const { country } = useGeoCountry();
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  const isIndia = country === "IN";
  const resolvedSubtitle = subtitle ?? `Get ${isIndia ? "₹1,000" : "$10"} in free credits. No credit card required. Deploy your first agent in under 10 minutes.`;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let COLS = 50;
    let ROWS = 80;
    const SPACING = 100;
    const FOCAL = 420;
    const CAM_HEIGHT = 300;
    const WAVE_AMP = 42;
    const WAVE_SPEED = 0.015;
    const PI2 = Math.PI * 2;
    const MAX_R = 3.0;
    const MIN_R = 0.4;

    let dpr = 1, cw = 0, ch = 0, raf: number, time = 0;

    const setup = () => {
      const w = container.clientWidth, h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cw = canvas.width;
      ch = canvas.height;
      COLS = w < 640 ? 30 : 50;
      ROWS = w < 640 ? 50 : 80;
    };
    setup();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!cw || !ch) { setup(); return; }
      ctx.clearRect(0, 0, cw, ch);

      const horizonY = ch * 0.40 + (90 * dpr);
      const centerX = cw / 2;
      const focalDpr = FOCAL * dpr;

      for (let j = ROWS - 1; j >= 0; j--) {
        const z = (j + 1) * SPACING;
        const scale = focalDpr / z;
        const baseScreenY = horizonY + (CAM_HEIGHT * scale);

        for (let i = 0; i < COLS; i++) {
          const wx = (i - COLS / 2) * SPACING;
          const wy =
            Math.sin((i * 0.3) + time) * WAVE_AMP +
            Math.sin((j * 0.5) + time * 0.7) * WAVE_AMP;
          const screenX = centerX + wx * scale;
          const screenY = baseScreenY - wy * scale;

          if (screenX < -10 || screenX > cw + 10 || screenY < -10 || screenY > ch + 10) continue;

          const r = Math.min(MAX_R * dpr, Math.max(MIN_R * dpr, scale * 3));

          // Color gradient for dark bg: bright white (near) → bright blue (mid) → bright purple (far)
          const t = j / ROWS;
          let cr: number, cg: number, cb: number;
          if (t < 0.5) {
            // white (255,255,255) → blue (100,120,255)
            const p = t * 2;
            cr = 255 - p * 155;
            cg = 255 - p * 135;
            cb = 255;
          } else {
            // blue (100,120,255) → purple (205,62,249)
            const p = (t - 0.5) * 2;
            cr = 100 + p * 105;
            cg = 120 - p * 58;
            cb = 255 - p * 6;
          }

          const alpha = Math.min(1.0, (1.0 - t * 0.5) * 1.5);

          ctx.beginPath();
          ctx.arc(screenX, screenY, r, 0, PI2);
          ctx.fillStyle = `rgba(${cr|0},${cg|0},${cb|0},${alpha})`;
          ctx.fill();
        }
      }

      time += WAVE_SPEED;
    };
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => setup());
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#0f1117] py-[78px] sm:py-[94px] md:py-[110px]">
      {/* Dotted Surface Animation */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[1]" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[30%]" style={{ background: "linear-gradient(to top, #0f1117 10%, transparent)" }} />
      {/* Left/right fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 sm:w-32 bg-gradient-to-r from-[#0f1117] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 sm:w-32 bg-gradient-to-l from-[#0f1117] to-transparent" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-white">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-400 mt-3">
          {resolvedSubtitle}
        </p>
        <a
          href={signupUrl}
          {...(signupUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-black transition-colors hover:bg-gray-200 mt-6"
        >
          {signupLabel}
        </a>
      </div>
    </section>
  );
}
