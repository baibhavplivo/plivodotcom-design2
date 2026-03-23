"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

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
  const [waveformBars] = useState(() => generateWaveformBars(50));
  const playBtnRef = useRef<HTMLButtonElement>(null);

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
  }, []);

  // Native click handler (Astro hydration safe)
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

  return (
    <div className="flex flex-col items-center lg:items-end">
      <div className="w-full max-w-[460px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-5 sm:p-6">
          {/* Pills */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
              E-commerce &amp; Retail
            </span>
            <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
              {"\u{1F1EE}\u{1F1F3}"} Hindi
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-black mb-5">
            Inbound support call &ndash; Order status
          </h4>

          {/* Audio Player */}
          <div className="flex items-center gap-3 mb-5">
            <button
              ref={playBtnRef}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #323dfe 0%, #8b5cf6 50%, #cd3ef9 100%)",
              }}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="ml-0.5 h-4 w-4" />
              )}
            </button>

            {/* Waveform */}
            <div className="flex-1 flex items-center gap-[2px] h-9">
              {waveformBars.map((height, index) => {
                const barProgress = (index / waveformBars.length) * 100;
                const isPlayed = barProgress < progress;
                return (
                  <div
                    key={index}
                    className="flex-1 rounded-full transition-colors duration-150"
                    style={{
                      height: `${height * 100}%`,
                      minWidth: "2px",
                      maxWidth: "3px",
                      backgroundColor: isPlayed ? "#8b5cf6" : "#e5e7eb",
                    }}
                  />
                );
              })}
            </div>

            <span className="flex-shrink-0 text-xs text-gray-400 font-medium tabular-nums">
              {duration > 0 ? formatTime(duration) : "0:15"}
            </span>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 mb-5" />

          {/* Metrics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Latency</span>
              <span className="text-sm font-medium text-black">420ms average</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Resolution</span>
              <span className="text-sm font-medium text-black">First-call resolution</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Cost</span>
              <span className="text-sm font-medium text-black">$0.04 vs $5.50 human agent</span>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/audio/with-noise-cancellation.mp3" preload="metadata" />
    </div>
  );
}
