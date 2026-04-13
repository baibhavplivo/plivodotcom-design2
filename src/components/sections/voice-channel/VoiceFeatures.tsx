"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Play, Pause, Search, ChevronLeft, ChevronRight } from "lucide-react";
import WorldMap from "@/components/ui/world-map";

// Reusable CheckItem component
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="h-4 w-4 flex-shrink-0 text-[#323dfe]" />
      <span className="text-sm text-gray-600">{children}</span>
    </li>
  );
}

// Audio Player Component for comparison cards
function AudioPlayer({
  audioSrc,
  title,
  variant,
  language = "English",
}: {
  audioSrc: string;
  title: string;
  variant: "gray" | "purple";
  language?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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

    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

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

  const isGray = variant === "gray";

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-4 py-3">
        <h4 className="text-xs font-semibold text-black">{title}</h4>
        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600">
            🇮🇳 {language}
          </span>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600">
            Customer Support
          </span>
        </div>
      </div>

      {/* Audio player */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors hover:scale-105"
          style={{
            background: isGray
              ? "#000000"
              : "linear-gradient(135deg, #000000 0%, #323dfe 100%)",
          }}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />
          )}
        </button>

        {/* Progress bar */}
        <div className="flex-1 min-w-0">
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all ${isGray ? "bg-gray-500" : "bg-[#8b7cf6]"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="flex-shrink-0 text-right text-[10px] text-gray-400">
          {duration > 0 ? `${Math.floor(currentTime)}s/${Math.floor(duration)}s` : "0s/0s"}
        </span>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
}

// Voice avatar component
function VoiceAvatar({ gender, color }: { gender: "M" | "F"; color: string }) {
  return (
    <div className="relative">
      <div
        className="h-12 w-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {/* Simple avatar icon */}
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={gender === "M" ? "#1e3a5f" : "#2d5a4a"} />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill={gender === "M" ? "#1e3a5f" : "#2d5a4a"} />
        </svg>
      </div>
      <div
        className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${
          gender === "M" ? "bg-blue-500" : "bg-green-500"
        }`}
      >
        {gender}
      </div>
    </div>
  );
}

// Voice list item component
function VoiceListItem({
  name,
  description,
  gender,
  color,
  isSelected = false,
  showPlayButton = false
}: {
  name: string;
  description: string;
  gender: "M" | "F";
  color: string;
  isSelected?: boolean;
  showPlayButton?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${isSelected ? "bg-gray-100 rounded-lg" : ""}`}>
      <VoiceAvatar gender={gender} color={color} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-black">{name}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
      {showPlayButton && (
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
          <Play className="h-3.5 w-3.5 ml-0.5" />
        </button>
      )}
    </div>
  );
}

// Language card data
const LANGUAGE_CARDS = [
  { language: "English US", flag: "🇺🇸", gender: "Female", description: "Great for natural conversations" },
  { language: "Hindi", flag: "🇮🇳", gender: "Female", description: "Great for natural conversations" },
  { language: "Spanish", flag: "🇪🇸", gender: "Male", description: "Clear and professional tone" },
  { language: "French", flag: "🇫🇷", gender: "Female", description: "Elegant and refined voice" },
  { language: "German", flag: "🇩🇪", gender: "Male", description: "Precise and articulate" },
  { language: "Japanese", flag: "🇯🇵", gender: "Female", description: "Polite and natural flow" },
  { language: "Portuguese", flag: "🇧🇷", gender: "Male", description: "Warm Brazilian accent" },
  { language: "Mandarin", flag: "🇨🇳", gender: "Female", description: "Clear tonal pronunciation" },
  { language: "Arabic", flag: "🇸🇦", gender: "Male", description: "Modern standard Arabic" },
  { language: "Korean", flag: "🇰🇷", gender: "Female", description: "Natural Seoul dialect" },
];

// Language card component - Play button replaces the circle icon
function LanguageCard({
  language,
  flag,
  gender,
  description,
  isPlaying,
  onPlayToggle,
  isCenter = false
}: {
  language: string;
  flag: string;
  gender: string;
  description: string;
  isPlaying: boolean;
  onPlayToggle: () => void;
  isCenter?: boolean;
}) {
  return (
    <div className={`flex-shrink-0 flex items-center gap-4 rounded-2xl bg-white px-6 py-5 w-full max-w-[360px] transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${isCenter ? '' : 'opacity-50'}`}>
      {/* Play button - gradient circle */}
      <button
        onClick={onPlayToggle}
        disabled={!isCenter}
        className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c084fc] via-[#818cf8] to-[#60a5fa] transition-transform hover:scale-105 disabled:cursor-default disabled:hover:scale-100"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 text-white" />
        ) : isCenter ? (
          <Play className="h-6 w-6 text-white ml-1" />
        ) : (
          /* Sound wave icon for non-center cards */
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v16M8 8v8M16 8v8M4 10v4M20 10v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-semibold text-gray-900">{language}</span>
          <span className="text-xl">{flag}</span>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
            {gender}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1.5">{description}</p>
      </div>
    </div>
  );
}

// Language selector UI asset - Carousel style with smooth swipe animation
function LanguageSelectorAsset() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePrev = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev === 0 ? LANGUAGE_CARDS.length - 1 : prev - 1));
    setPlayingIndex(null);
  };

  const handleNext = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === LANGUAGE_CARDS.length - 1 ? 0 : prev + 1));
    setPlayingIndex(null);
  };

  const handlePlayToggle = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
      audioRef.current?.pause();
    } else {
      setPlayingIndex(index);
      audioRef.current?.play();
    }
  };

  // Get visible cards (prev, current, next)
  const getVisibleIndices = () => {
    const prev = currentIndex === 0 ? LANGUAGE_CARDS.length - 1 : currentIndex - 1;
    const next = currentIndex === LANGUAGE_CARDS.length - 1 ? 0 : currentIndex + 1;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Left fade - positioned on parent to reach edge */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-20 bg-gradient-to-r from-gray-50 to-transparent" />

      {/* Right fade - positioned on parent to reach edge */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-20 bg-gradient-to-l from-gray-50 to-transparent" />

      {/* Cards container */}
      <div className="relative flex items-center justify-center w-full py-4">

        {/* Cards wrapper with smooth swipe transition */}
        <div className="flex items-center justify-center gap-5">
          {visibleIndices.map((cardIndex, i) => {
            const card = LANGUAGE_CARDS[cardIndex];
            const isCenter = i === 1;
            return (
              <div
                key={cardIndex}
                className={`transition-all duration-500 ease-out ${
                  isCenter
                    ? "scale-100 z-10"
                    : "scale-[0.85] hidden sm:block"
                }`}
                style={{
                  animation: isCenter && slideDirection
                    ? `slideIn${slideDirection === 'left' ? 'Left' : 'Right'} 0.5s ease-out`
                    : undefined
                }}
              >
                <LanguageCard
                  {...card}
                  isPlaying={playingIndex === cardIndex}
                  onPlayToggle={() => handlePlayToggle(cardIndex)}
                  isCenter={isCenter}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows - Just below the cards */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={handlePrev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {/* Dots indicator */}
        <div className="flex items-center gap-1.5">
          {LANGUAGE_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSlideDirection(idx > currentIndex ? 'left' : 'right');
                setCurrentIndex(idx);
                setPlayingIndex(null);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-4 bg-[#323dfe]"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} src="/audio/with-turn-detection.mp3" />

      {/* Swipe animation keyframes */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function VoiceFeatures() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora mb-8 sm:mb-10 text-center text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          Build best in class voice AI
          <br />
          agents with Plivo
        </h2>

        {/* 2x2 Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          <LatencyCard />
          <TurnTakingCard />
          <NoiseCancellationCard />
          <LanguagesCard />
        </div>
      </div>
    </section>
  );
}

function LatencyCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-50">
      {/* Visual - Top - Same height as other cards */}
      <div className="relative h-64 overflow-hidden">
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
        <div className="absolute right-3 top-3 sm:right-6 sm:top-6 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-black">500 ms</span>
          </div>
          <span className="text-xs text-gray-500">1 hop</span>
        </div>
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          Sub-500ms Latency
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <CheckItem>700-900ms optimal response</CheckItem>
          <CheckItem>One-hop global routing</CheckItem>
          <CheckItem>No awkward pauses</CheckItem>
          <CheckItem>Real-time processing</CheckItem>
        </ul>
      </div>
    </div>
  );
}

function TurnTakingCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-50">
      {/* Visual - Top: Split background with cards on top */}
      <div className="relative h-64">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          {/* Left half - Gray gradient (faded downward) */}
          <div className="w-1/2 bg-gradient-to-b from-gray-300/70 via-gray-200/40 to-white/0" />
          {/* Right half - Purple gradient (faded downward) */}
          <div className="w-1/2 bg-gradient-to-b from-blue-500/70 via-fuchsia-500/40 to-white/0" />
        </div>

        {/* Cards container */}
        <div className="relative flex h-full">
          {/* Left card - centered in left half */}
          <div className="flex w-1/2 items-center justify-center p-4">
            <div className="w-full max-w-[220px]">
              <AudioPlayer
                audioSrc="/audio/without-turn-detection.mp3"
                title="Without Turn Detection"
                variant="gray"
                language="Hindi"
              />
            </div>
          </div>
          {/* Right card - centered in right half */}
          <div className="flex w-1/2 items-center justify-center p-4">
            <div className="w-full max-w-[220px]">
              <AudioPlayer
                audioSrc="/audio/with-turn-detection.mp3"
                title="With Plivo Turn Detection"
                variant="purple"
                language="Hindi"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          Natural Turn-Taking
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <CheckItem>Interruption detection</CheckItem>
          <CheckItem>Smart turn detection</CheckItem>
          <CheckItem>Barge-in handling</CheckItem>
          <CheckItem>Silence detection</CheckItem>
        </ul>
      </div>
    </div>
  );
}

function NoiseCancellationCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-50">
      {/* Visual - Top: Split background with cards on top */}
      <div className="relative h-64">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          {/* Left half - Gray gradient (faded downward) */}
          <div className="w-1/2 bg-gradient-to-b from-gray-300/70 via-gray-200/40 to-white/0" />
          {/* Right half - Purple gradient (faded downward) */}
          <div className="w-1/2 bg-gradient-to-b from-blue-500/70 via-fuchsia-500/40 to-white/0" />
        </div>

        {/* Cards container */}
        <div className="relative flex h-full">
          {/* Left card - centered in left half */}
          <div className="flex w-1/2 items-center justify-center p-4">
            <div className="w-full max-w-[220px]">
              <AudioPlayer
                audioSrc="/audio/without-noise-cancellation.mp3"
                title="Without Noise Cancellation"
                variant="gray"
              />
            </div>
          </div>
          {/* Right card - centered in right half */}
          <div className="flex w-1/2 items-center justify-center p-4">
            <div className="w-full max-w-[220px]">
              <AudioPlayer
                audioSrc="/audio/with-noise-cancellation.mp3"
                title="With Plivo Noise Cancellation"
                variant="purple"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          Noise Cancellation
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <CheckItem>AI noise cancellation</CheckItem>
          <CheckItem>Crystal-clear quality</CheckItem>
          <CheckItem>Background filtering</CheckItem>
          <CheckItem>Voice clarity preserved</CheckItem>
        </ul>
      </div>
    </div>
  );
}

function LanguagesCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-50">
      {/* Visual - Top - Same height as other cards */}
      <div className="relative h-64 overflow-visible">
        <LanguageSelectorAsset />
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          50+ Languages
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <CheckItem>Global language support</CheckItem>
          <CheckItem>30+ accents supported</CheckItem>
          <CheckItem>Natural prosody</CheckItem>
          <CheckItem>Regional dialects</CheckItem>
        </ul>
      </div>
    </div>
  );
}
