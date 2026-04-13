"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

interface DemoCard {
  id: string;
  category: string;
  language: string;
  languageFlag: string;
  title: string;
  audioSrc: string;
  metrics: {
    latency: string;
    resolution: string;
    cost: string;
  };
}

const DEMO_CARDS: DemoCard[] = [
  {
    id: "inbound-support",
    category: "E-commerce & Retail",
    language: "English",
    languageFlag: "🇬🇧",
    title: "Inbound support call - Order status",
    audioSrc: "/audio/with-noise-cancellation.mp3",
    metrics: {
      latency: "420ms average",
      resolution: "First-call resolution",
      cost: "$0.04 vs $5.50 human agent",
    },
  },
  {
    id: "appointment",
    category: "Healthcare",
    language: "Hindi",
    languageFlag: "🇮🇳",
    title: "Patient appointment booking",
    audioSrc: "/audio/with-turn-detection.mp3",
    metrics: {
      latency: "380ms average",
      resolution: "94% scheduling success",
      cost: "$0.03 vs $4.20 human agent",
    },
  },
  {
    id: "lead-qualification",
    category: "Financial Services",
    language: "Spanish",
    languageFlag: "🇪🇸",
    title: "Outbound lead qualification",
    audioSrc: "/audio/without-noise-cancellation.mp3",
    metrics: {
      latency: "450ms average",
      resolution: "45% demo booking rate",
      cost: "$0.05 vs $6.00 human agent",
    },
  },
  {
    id: "payment-reminder",
    category: "Banking & Finance",
    language: "English",
    languageFlag: "🇺🇸",
    title: "Payment reminder call",
    audioSrc: "/audio/with-noise-cancellation.mp3",
    metrics: {
      latency: "410ms average",
      resolution: "42% promise-to-pay rate",
      cost: "$0.04 vs $5.00 human agent",
    },
  },
  {
    id: "insurance-claims",
    category: "Insurance",
    language: "English",
    languageFlag: "🇺🇸",
    title: "Claims status & filing assistance",
    audioSrc: "/audio/with-noise-cancellation.mp3",
    metrics: {
      latency: "390ms average",
      resolution: "87% self-service completion",
      cost: "$0.04 vs $7.00 human agent",
    },
  },
  {
    id: "real-estate",
    category: "Real Estate",
    language: "English",
    languageFlag: "🇬🇧",
    title: "Property inquiry & scheduling tours",
    audioSrc: "/audio/with-turn-detection.mp3",
    metrics: {
      latency: "430ms average",
      resolution: "68% tour booking rate",
      cost: "$0.05 vs $8.00 human agent",
    },
  },
];

// Generate random waveform bars for visualization
function generateWaveformBars(count: number): number[] {
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    // Create a somewhat natural looking waveform pattern
    const base = Math.sin(i * 0.3) * 0.3 + 0.5;
    const random = Math.random() * 0.4;
    bars.push(Math.max(0.15, Math.min(1, base + random)));
  }
  return bars;
}

function AudioDemoCard({
  card,
  isActive,
}: {
  card: DemoCard;
  isActive: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [waveformBars] = useState(() => generateWaveformBars(40));

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
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
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

  // Pause when card becomes inactive
  useEffect(() => {
    if (!isActive && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    return `${time.toFixed(1)} s`;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 min-w-[320px] sm:min-w-[400px]">
      {/* Pills Row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
          {card.category}
        </span>
        <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
          {card.languageFlag} {card.language}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-lg sm:text-xl font-semibold text-black mb-6">
        {card.title}
      </h4>

      {/* Audio Player */}
      <div className="flex items-center gap-4 mb-6">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors"
          style={{
            background: "linear-gradient(135deg, #000000 0%, #323dfe 100%)",
          }}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
          )}
        </button>

        {/* Waveform Visualization */}
        <div className="flex-1 flex items-center gap-[2px] h-10">
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
                  maxWidth: "4px",
                  backgroundColor: isPlayed ? "#323dfe" : "#d1d5db",
                }}
              />
            );
          })}
        </div>

        {/* Duration */}
        <span className="flex-shrink-0 text-sm text-gray-500 font-medium">
          {duration > 0 ? formatTime(duration) : "15.3 s"}
        </span>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200 mb-6" />

      {/* Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Latency</span>
          <span className="text-sm font-medium text-black">
            {card.metrics.latency}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Resolution</span>
          <span className="text-sm font-medium text-black">
            {card.metrics.resolution}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Cost</span>
          <span className="text-sm font-medium text-black">
            {card.metrics.cost}
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={card.audioSrc} preload="metadata" />
    </div>
  );
}

export default function HearTheDifference() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 400;
      const gap = 24;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    // Loop to last card if at first card
    const newIndex = currentIndex === 0 ? DEMO_CARDS.length - 1 : currentIndex - 1;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    // Loop to first card if at last card
    const newIndex = currentIndex === DEMO_CARDS.length - 1 ? 0 : currentIndex + 1;
    scrollToCard(newIndex);
  };

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Left Fade - Fixed to viewport edge */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-white to-transparent" />

      {/* Right Fade - Fixed to viewport edge */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-white to-transparent" />

      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          Hear the difference
        </h2>
      </div>

      {/* Carousel - Full width */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-8 sm:px-16 md:px-24 lg:px-32"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DEMO_CARDS.map((card, index) => (
            <div key={card.id} className="snap-start flex-shrink-0">
              <AudioDemoCard card={card} isActive={index === currentIndex} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
