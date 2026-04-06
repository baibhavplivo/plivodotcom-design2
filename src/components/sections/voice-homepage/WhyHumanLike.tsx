import { useState, useRef, useEffect } from "react";
import { Play, Pause, MessageCircle, Check } from "lucide-react";
import { AnimatedBeam, Circle } from "@/components/ui/animated-beam";
import WorldMap from "@/components/ui/world-map";
import { useGeoCountry } from "@/hooks/useGeoCountry";

// Reusable CheckItem component
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="h-4 w-4 flex-shrink-0 text-[#323dfe]" />
      <span className="text-sm text-gray-600">{children}</span>
    </li>
  );
}

export default function WhyHumanLike() {
  const { rawCountry } = useGeoCountry();
  const isIndia = rawCountry === "IN";
  return (
    <section className="why-humanlike-section bg-white py-12 sm:py-16 md:py-20">
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .humanlike-dotgrid {
          background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px);
          background-size: 16px 16px;
          background-position: center center;
        }
      `}</style>
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora mb-6 text-center text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          Why are Plivo's voice AI agents
          <br />
          human-like
        </h2>

        {/* 2x2 Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          <LatencyCard />
          <QualityCard isIndia={isIndia} />
          <TurnTakingCard isIndia={isIndia} />
          <SelfImprovingCard />
        </div>
      </div>
    </section>
  );
}

function LatencyCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Visual - Top */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-white">
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
          &lt; 500ms latency
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

    // Check if duration is already available
    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    // Force load metadata
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
    <div className={`relative overflow-hidden rounded-lg bg-white ${isGray ? "border border-gray-200" : "shine-border"}`}>
      {/* Shine border effect for ON state */}
      {!isGray && (
        <div className="absolute inset-0 rounded-lg opacity-60" style={{
          padding: '1px',
          background: 'linear-gradient(90deg, #A07CFE, #FE8FB5, #FFBE7B, #A07CFE)',
          backgroundSize: '300% 100%',
          animation: 'shine 8s ease-in-out infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }} />
      )}
      {/* Card Header */}
      <div className={`relative px-4 py-3 ${isGray ? "border-b border-gray-100" : ""}`}>
        {/* Gradient divider for ON state */}
        {!isGray && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] opacity-40" />
        )}
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-black">{title}</h4>
          {/* Toggle Switch with Label */}
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-medium ${isGray ? "text-gray-400" : "text-green-600"}`}>
              {isGray ? "OFF" : "ON"}
            </span>
            <div className={`relative h-4 w-7 rounded-full transition-colors ${isGray ? "bg-gray-300" : "bg-green-500"}`}>
              <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${isGray ? "left-0.5" : "left-[14px]"}`} />
            </div>
          </div>
        </div>
        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600">
            {language === "Hindi" ? "🇮🇳" : "🇺🇸"} {language}
          </span>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600">
            Customer Support
          </span>
        </div>
      </div>

      {/* Audio player */}
      <div className="relative flex items-center gap-3 px-4 py-3">
        <button
          onClick={togglePlay}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            isGray
              ? "bg-black text-white cta-hover-gradient"
              : "bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] text-white hover:opacity-90"
          }`}
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

function VoiceDemoCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onMeta = () => { if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration); };
    const onTime = () => { if (audio.duration && !isNaN(audio.duration)) { setProgress((audio.currentTime / audio.duration) * 100); setCurrentTime(audio.currentTime); } };
    const onEnd = () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); };
    if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.load();
    return () => { audio.removeEventListener("loadedmetadata", onMeta); audio.removeEventListener("timeupdate", onTime); audio.removeEventListener("ended", onEnd); };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause(); else audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm">
      {/* Title */}
      <div className="px-4 pt-3 pb-1">
        <h4 className="text-sm font-semibold text-black">Inbound support call</h4>
      </div>
      {/* Pills */}
      <div className="px-4 pt-1 pb-1 flex items-center gap-2">
        <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] text-gray-600">Travel &amp; Hospitality</span>
        <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] text-gray-600">🇺🇸 English</span>
      </div>
      {/* Audio player */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #000 0%, #323dfe 40%, #8b5cf6 70%, #cd3ef9 100%)" }}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-[#8b7cf6] transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="flex-shrink-0 text-[10px] text-gray-400">
          {duration > 0 ? `${Math.floor(currentTime)}s/${Math.floor(duration)}s` : "0s/0s"}
        </span>
      </div>
      <audio ref={audioRef} src="/audio/no-latency-us.mp3" preload="metadata" />
    </div>
  );
}

function QualityCard({ isIndia }: { isIndia: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Visual - Top */}
      <div className="relative h-64 flex items-center justify-center px-4 py-6 humanlike-dotgrid">
        {isIndia ? (
          /* India: side-by-side noise cancellation comparison */
          <div className="flex h-full w-full items-center justify-center gap-3">
            <div className="w-full max-w-[240px]">
              <AudioPlayer
                audioSrc="/audio/without-noise-cancellation.mp3"
                title="Noise Cancellation"
                variant="gray"
                language="Hindi"
              />
            </div>
            <div className="w-full max-w-[240px]">
              <AudioPlayer
                audioSrc="/audio/with-noise-cancellation.mp3"
                title="Noise Cancellation"
                variant="purple"
                language="Hindi"
              />
            </div>
          </div>
        ) : (
          /* US/RoW: single voice demo card with call details */
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-full max-w-[340px]">
              <VoiceDemoCard />
            </div>
          </div>
        )}
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          Human-like conversation quality
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <CheckItem>AI noise cancellation</CheckItem>
          <CheckItem>30+ accents & languages</CheckItem>
          <CheckItem>Tone & hallucination control</CheckItem>
          <CheckItem>Natural prosody</CheckItem>
        </ul>
      </div>
    </div>
  );
}

function TurnTakingCard({ isIndia }: { isIndia: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Visual - Top: Audio cards side by side */}
      <div className="relative h-64 flex items-center justify-center px-4 py-6 humanlike-dotgrid">
        {/* Cards container */}
        <div className="flex h-full w-full items-center justify-center gap-3">
          {/* Left card */}
          <div className="w-full max-w-[240px]">
            <AudioPlayer
              audioSrc={isIndia ? "/audio/without-turn-detection.mp3" : "/audio/without-turn-detection-us.mp3"}
              title="Turn Detection"
              variant="gray"
              language={isIndia ? "Hindi" : "English"}
            />
          </div>
          {/* Right card */}
          <div className="w-full max-w-[240px]">
            <AudioPlayer
              audioSrc={isIndia ? "/audio/with-turn-detection.mp3" : "/audio/with-turn-detection-us.mp3"}
              title="Turn Detection"
              variant="purple"
              language={isIndia ? "Hindi" : "English"}
            />
          </div>
        </div>
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          Natural turn taking
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

function SelfImprovingCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Visual - Top */}
      <div
        className="relative flex h-64 items-center justify-center overflow-hidden p-6 humanlike-dotgrid"
        ref={containerRef}
      >
        <div className="flex size-full max-h-[180px] max-w-md flex-col items-stretch justify-between gap-4">
          {/* Top row */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref} className="size-11">
              <MessageCircle className="size-5 text-gray-600" />
            </Circle>
            <Circle ref={div5Ref} className="size-11">
              <MessageCircle className="size-5 text-gray-600" />
            </Circle>
          </div>

          {/* Middle row */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref} className="size-11">
              <MessageCircle className="size-5 text-gray-600" />
            </Circle>
            {/* Center gradient circle with Plivo logo style and pulsating glow */}
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-br from-[#cd3ef9] via-[#323dfe] to-black blur-md opacity-50" />
              <Circle ref={centerRef} className="relative size-16 border-0 bg-gradient-to-br from-[#cd3ef9] via-[#323dfe] to-black shadow-lg">
                {/* Curved 4-point star sparkle icon with pulsating animation */}
                <svg className="size-7 text-white animate-pulse-spark" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C13.5 4.5 19.5 10.5 24 12C19.5 13.5 13.5 19.5 12 24C10.5 19.5 4.5 13.5 0 12C4.5 10.5 10.5 4.5 12 0Z" />
                </svg>
              </Circle>
            </div>
            <Circle ref={div6Ref} className="size-11">
              <MessageCircle className="size-5 text-gray-600" />
            </Circle>
          </div>

          {/* Bottom row */}
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref} className="size-11">
              <MessageCircle className="size-5 text-gray-600" />
            </Circle>
            <Circle ref={div7Ref} className="size-11">
              <MessageCircle className="size-5 text-gray-600" />
            </Circle>
          </div>
        </div>

        {/* Animated beams - left side to center (right-angle paths) */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={centerRef}
          pathWidth={1}
          dashed
          rightAngle
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={centerRef}
          pathWidth={1}
          dashed
          rightAngle
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={centerRef}
          pathWidth={1}
          dashed
          rightAngle
        />

        {/* Animated beams - center to right side (right-angle paths) */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={centerRef}
          reverse
          pathWidth={1}
          dashed
          rightAngle
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={centerRef}
          reverse
          pathWidth={1}
          dashed
          rightAngle
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={centerRef}
          reverse
          pathWidth={1}
          dashed
          rightAngle
        />
      </div>

      {/* Content - Bottom */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
          Self-improving
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <CheckItem>Auto simulations & evals</CheckItem>
          <CheckItem>Real-time observability</CheckItem>
          <CheckItem>Goal-based optimization</CheckItem>
          <CheckItem>Continuous learning</CheckItem>
        </ul>
      </div>
    </div>
  );
}
