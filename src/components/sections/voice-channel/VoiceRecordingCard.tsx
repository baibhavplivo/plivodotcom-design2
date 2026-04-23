"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useGeoCountry } from "@/hooks/useGeoCountry";

function generateWaveformBars(count: number): number[] {
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const base = Math.sin(i * 0.3) * 0.3 + 0.5;
    const random = Math.random() * 0.4;
    bars.push(Math.max(0.15, Math.min(1, base + random)));
  }
  return bars;
}

export default function VoiceRecordingCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [waveformBars] = useState(() => generateWaveformBars(52));
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const { rawCountry } = useGeoCountry();
  const isIndia = rawCountry === "IN";

  const audioSrc = isIndia
    ? "/audio/with-turn-detection.mp3"
    : "/audio/us-voice-demo.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioSrc]);

  useEffect(() => {
    const playBtn = playBtnRef.current;
    const audio = audioRef.current;
    const handlePlay = () => {
      if (!audio) return;
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    };
    playBtn?.addEventListener("click", handlePlay);
    return () => playBtn?.removeEventListener("click", handlePlay);
  }, []);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const metrics = [
    { label: "latency",    value: "420",    unit: "ms",    meta: "average" },
    { label: "resolution", value: "first",  unit: "call",  meta: "no handoff" },
    { label: "cost",       value: isIndia ? "₹3.40" : "$0.04", unit: "", meta: isIndia ? "vs ₹462 human" : "vs $5.50 human" },
  ];

  return (
    <div className="flex flex-col items-center lg:items-end">
      <div className="w-full max-w-[460px] overflow-hidden rounded-lg border border-border bg-surface shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.28)]">
        {/* Terminal-style chrome header */}
        <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono-ui text-[11px] text-foreground/80">
              {isIndia ? "inbound" : "outbound"} support call
            </span>
          </div>
          <span className="font-mono-ui tabular-nums text-[11px] text-muted-foreground">
            {duration > 0 ? formatTime(duration) : "0:24"}
          </span>
          <span className="font-mono-ui text-[11px] text-muted-foreground truncate max-w-[110px]">
            order_status
          </span>
        </div>

        {/* Meta tags row */}
        <div className="flex items-center gap-1.5 border-b border-border bg-background/20 px-4 py-2">
          <span className="font-mono-ui rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            ecommerce · retail
          </span>
          <span className="font-mono-ui rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {isIndia ? "\u{1F1EE}\u{1F1F3} hi-IN" : "\u{1F1FA}\u{1F1F8} en-US"}
          </span>
          <span className="flex-1" />
          <span className="font-mono-ui text-[10px] text-muted-foreground/60">
            [01]
          </span>
        </div>

        {/* Audio player */}
        <div className="relative px-5 py-6">
          <div className="pointer-events-none absolute inset-0 dev-grid-bg-fine opacity-[0.35] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
          <div className="relative flex items-center gap-3">
            <button
              ref={playBtnRef}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
              )}
            </button>

            {/* Waveform */}
            <div className="flex-1 flex items-center gap-[2px] h-10">
              {waveformBars.map((height, index) => {
                const barProgress = (index / waveformBars.length) * 100;
                const isPlayed = barProgress < progress;
                return (
                  <div
                    key={index}
                    className={`flex-1 rounded-full transition-colors duration-150 min-w-[2px] max-w-[3px] ${
                      isPlayed ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    style={{ height: `${Math.round(height * 100)}%` }}
                  />
                );
              })}
            </div>

            <span className="font-mono-ui flex-shrink-0 text-[11px] tabular-nums text-muted-foreground">
              {duration > 0 ? formatTime(duration) : "0:24"}
            </span>
          </div>
        </div>

        {/* Metrics grid — mono, tabular */}
        <div className="grid grid-cols-3 border-t border-border">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col gap-1 px-4 py-4 ${i < metrics.length - 1 ? "border-r border-border" : ""}`}
            >
              <span className="font-mono-ui text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground">
                {m.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono-ui text-base font-semibold tabular-nums tracking-tight text-foreground">
                  {m.value}
                </span>
                {m.unit && (
                  <span className="font-mono-ui text-[11px] text-muted-foreground">
                    {m.unit}
                  </span>
                )}
              </div>
              <span className="font-mono-ui text-[10px] text-muted-foreground/70">
                {m.meta}
              </span>
            </div>
          ))}
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between border-t border-border bg-background/40 px-4 py-2">
          <span className="font-mono-ui inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            resolved · no handoff
          </span>
          <span className="font-mono-ui text-[11px] text-muted-foreground/70">
            agent_id = ag_01HA
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
}
