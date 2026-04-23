"use client";

import { useEffect, useRef, useState } from "react";

interface CaseStudyVideoProps {
  videoId: string;
  hash: string;
  title?: string;
  thumbnailUrl?: string;
}

export default function CaseStudyVideo({
  videoId,
  hash,
  title = "Customer Story Video",
  thumbnailUrl,
}: CaseStudyVideoProps) {
  const [showIframe, setShowIframe] = useState(false);
  const [thumbnail, setThumbnail] = useState(thumbnailUrl || "");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch Vimeo thumbnail if not provided as prop
  useEffect(() => {
    if (thumbnailUrl) return;
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}/${hash}&width=1280`)
      .then((res) => res.json())
      .then((data) => {
        if (data.thumbnail_url) setThumbnail(data.thumbnail_url);
      })
      .catch(() => {});
  }, [videoId, hash, thumbnailUrl]);

  // CRITICAL: Use native addEventListener — React onClick breaks after Astro hydration
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleClick = () => setShowIframe(true);
    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, []);

  // Move focus to iframe after it loads
  useEffect(() => {
    if (showIframe && iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [showIframe]);

  // Dotted wave animation backdrop
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let COLS = 50;
    let ROWS = 40;
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
      const w = wrapper.clientWidth, h = wrapper.clientHeight;
      if (w <= 0 || h <= 0) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cw = canvas.width;
      ch = canvas.height;
      COLS = w < 640 ? 30 : 50;
      ROWS = w < 640 ? 25 : 40;
    };
    setup();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!cw || !ch) { setup(); return; }
      ctx.clearRect(0, 0, cw, ch);

      const horizonY = ch * 0.15;
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

          const t = j / ROWS;
          const cr = 0, cg = 0, cb = 0;
          const alpha = Math.min(0.25, (1.0 - t * 0.5) * 0.35);

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
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="bg-background border-t border-border relative overflow-hidden" ref={wrapperRef}>
      {/* Dotted wave canvas backdrop */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[1]" />

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 sm:w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 sm:w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16 bg-gradient-to-t from-background to-transparent" />

      {/* Video container */}
      <div className="container relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16 md:py-20">
        <div
          id="video"
          className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 "
        >
          {showIframe ? (
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}?h=${hash}&autoplay=1&title=0&byline=0&portrait=0`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
              loading="lazy"
            />
          ) : (
            <>
              {/* Video thumbnail or gradient fallback */}
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
              )}

              {/* Dark overlay for contrast with play button */}
              <div className="absolute inset-0 bg-foreground/$1" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Play button */}
                <button
                  ref={buttonRef}
                  className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-background/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-background/20 hover:scale-105 cursor-pointer"
                  aria-label="Play video"
                >
                  <svg
                    width="28"
                    height="32"
                    viewBox="0 0 28 32"
                    fill="none"
                    className="ml-1.5 transition-transform duration-300 group-hover:scale-110"
                  >
                    <path
                      d="M4 2L26 16L4 30V2Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                  </svg>

                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full border-2 border-white/20 motion-safe:animate-ping" />
                </button>

                {/* Label */}
                <p className="mt-4 text-sm text-white/70 font-medium font-mono-ui uppercase tracking-[0.1em]">
                  Watch the Story
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
