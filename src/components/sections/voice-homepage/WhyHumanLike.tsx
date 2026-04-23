import { useState, useRef, useEffect } from "react";
import { Play, Pause, MessageCircle } from "lucide-react";
import { AnimatedBeam, Circle } from "@/components/ui/animated-beam";
import WorldMap from "@/components/ui/world-map";
import { useGeoCountry } from "@/hooks/useGeoCountry";

/* -------------------------------------------------------------
   Shared card chrome
-------------------------------------------------------------- */
function PillarCard({
  index,
  title,
  tag,
  specs,
  visual,
}: {
  index: string;
  title: string;
  tag: string;
  specs: string[];
  visual: React.ReactNode;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong">
      {/* Panel chrome */}
      <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
        <span className="font-mono-ui text-[11px] text-muted-foreground">
          pillar / {index}
        </span>
        <span className="font-mono-ui text-[11px] text-primary">{tag}</span>
      </div>

      {/* Visual */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dev-grid-bg-fine opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="relative flex h-full w-full items-center justify-center px-4 py-5">
          {visual}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col gap-3 border-t border-border px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="font-sora text-[1.125rem] font-semibold tracking-[-0.015em] text-foreground sm:text-xl">
          {title}
        </h3>
        <ul className="grid grid-cols-1 gap-x-5 gap-y-1.5 sm:grid-cols-2">
          {specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2 text-[13px] text-muted-foreground">
              <span className="font-mono-ui mt-0.5 text-primary">›</span>
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   Main section
-------------------------------------------------------------- */
export default function WhyHumanLike() {
  const { rawCountry } = useGeoCountry();
  const isIndia = rawCountry === "IN";

  return (
    <section id="section-pillars" className="relative w-full border-t border-border">
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        {/* Kicker */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">05</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>pillars</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>four pillars of a human-like agent</span>
        </div>

        {/* Heading */}
        <div className="mt-8 max-w-3xl">
          <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
            Why are Plivo's voice AI agents human-like
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <PillarCard
            index="01"
            title="< 500ms latency"
            tag="realtime"
            specs={[
              "700-900ms optimal response",
              "One-hop global routing",
              "No awkward pauses",
              "Real-time processing",
            ]}
            visual={<LatencyVisual />}
          />
          <PillarCard
            index="02"
            title="Human-like conversation quality"
            tag="audio"
            specs={[
              "AI noise cancellation",
              "30+ accents & languages",
              "Tone & hallucination control",
              "Natural prosody",
            ]}
            visual={<QualityVisual isIndia={isIndia} />}
          />
          <PillarCard
            index="03"
            title="Natural turn taking"
            tag="conversation"
            specs={[
              "Interruption detection",
              "Smart turn detection",
              "Barge-in handling",
              "Silence detection",
            ]}
            visual={<TurnTakingVisual isIndia={isIndia} />}
          />
          <PillarCard
            index="04"
            title="Self-improving"
            tag="feedback loop"
            specs={[
              "Auto simulations & evals",
              "Real-time observability",
              "Goal-based optimization",
              "Continuous learning",
            ]}
            visual={<SelfImprovingVisual />}
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------
   Visuals
-------------------------------------------------------------- */
function LatencyVisual() {
  return (
    <div className="relative h-full w-full">
      <WorldMap
        lineColor="#323dfe"
        dots={[
          { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
          { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
          { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
          { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
          { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
          { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
        ]}
      />
      {/* Latency readout */}
      <div className="absolute right-3 top-3 flex flex-col items-end gap-1 sm:right-4 sm:top-4">
        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono-ui text-[11.5px] font-medium tabular-nums text-foreground">
            500 ms
          </span>
        </div>
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          1 hop
        </span>
      </div>
    </div>
  );
}

function QualityVisual({ isIndia }: { isIndia: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      {isIndia ? (
        <>
          <div className="w-full max-w-[240px]">
            <AudioPlayer
              audioSrc="/audio/without-noise-cancellation.mp3"
              title="Noise cancellation"
              variant="off"
              language="Hindi"
            />
          </div>
          <div className="w-full max-w-[240px]">
            <AudioPlayer
              audioSrc="/audio/with-noise-cancellation.mp3"
              title="Noise cancellation"
              variant="on"
              language="Hindi"
            />
          </div>
        </>
      ) : (
        <div className="w-full max-w-[340px]">
          <VoiceDemoCard />
        </div>
      )}
    </div>
  );
}

function TurnTakingVisual({ isIndia }: { isIndia: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      <div className="w-full max-w-[240px]">
        <AudioPlayer
          audioSrc={isIndia ? "/audio/without-turn-detection.mp3" : "/audio/without-turn-detection-us.mp3"}
          title="Turn detection"
          variant="off"
          language={isIndia ? "Hindi" : "English"}
        />
      </div>
      <div className="w-full max-w-[240px]">
        <AudioPlayer
          audioSrc={isIndia ? "/audio/with-turn-detection.mp3" : "/audio/with-turn-detection-us.mp3"}
          title="Turn detection"
          variant="on"
          language={isIndia ? "Hindi" : "English"}
        />
      </div>
    </div>
  );
}

function SelfImprovingVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[180px] max-w-md flex-col items-stretch justify-between gap-4">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="size-10 border-border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </Circle>
          <Circle ref={div5Ref} className="size-10 border-border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="size-10 border-border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </Circle>
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/50 blur-md" />
            <Circle
              ref={centerRef}
              className="relative size-14 border-0 bg-primary text-white shadow-lg"
            >
              <svg className="size-6 animate-pulse-spark" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C13.5 4.5 19.5 10.5 24 12C19.5 13.5 13.5 19.5 12 24C10.5 19.5 4.5 13.5 0 12C4.5 10.5 10.5 4.5 12 0Z" />
              </svg>
            </Circle>
          </div>
          <Circle ref={div6Ref} className="size-10 border-border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="size-10 border-border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </Circle>
          <Circle ref={div7Ref} className="size-10 border-border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={centerRef} pathWidth={1} dashed rightAngle />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={centerRef} pathWidth={1} dashed rightAngle />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={centerRef} pathWidth={1} dashed rightAngle />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={centerRef} reverse pathWidth={1} dashed rightAngle />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={centerRef} reverse pathWidth={1} dashed rightAngle />
      <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={centerRef} reverse pathWidth={1} dashed rightAngle />
    </div>
  );
}

/* -------------------------------------------------------------
   Audio players - theme-aware, compact
-------------------------------------------------------------- */
function AudioPlayer({
  audioSrc,
  title,
  variant,
  language = "English",
}: {
  audioSrc: string;
  title: string;
  variant: "off" | "on";
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
    const onMeta = () => {
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onTime = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.load();
    return () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const isOn = variant === "on";

  return (
    <div
      className={`relative overflow-hidden rounded-md border bg-background ${isOn ? "border-primary/40" : "border-border"}`}
    >
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between">
          <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.08em] text-foreground">
            {title}
          </h4>
          <div className="flex items-center gap-1.5">
            <span className={`font-mono-ui text-[10px] font-medium ${isOn ? "text-primary" : "text-muted-foreground"}`}>
              {isOn ? "ON" : "OFF"}
            </span>
            <div className={`relative h-3.5 w-6 rounded-full transition-colors ${isOn ? "bg-primary" : "bg-muted-foreground/30"}`}>
              <div className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-background shadow transition-transform ${isOn ? "left-[13px]" : "left-0.5"}`} />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="font-mono-ui rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
            {language === "Hindi" ? "🇮🇳" : "🇺🇸"} {language}
          </span>
          <span className="font-mono-ui rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
            support
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 border-t border-border px-3 py-2.5">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            isOn ? "bg-primary text-white hover:brightness-110" : "bg-foreground text-background hover:bg-primary hover:text-white"
          }`}
        >
          {isPlaying ? (
            <Pause className="h-3 w-3" fill="currentColor" />
          ) : (
            <Play className="ml-[1px] h-3 w-3" fill="currentColor" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all ${isOn ? "bg-primary" : "bg-muted-foreground/60"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="font-mono-ui flex-shrink-0 text-[10px] tabular-nums text-muted-foreground">
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
    const onMeta = () => {
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onTime = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.load();
    return () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-background">
      <div className="px-3.5 pt-3 pb-1">
        <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.08em] text-foreground">
          Inbound support call
        </h4>
      </div>
      <div className="flex items-center gap-1.5 px-3.5 pt-1.5 pb-1.5">
        <span className="font-mono-ui rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
          travel · hospitality
        </span>
        <span className="font-mono-ui rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
          🇺🇸 english
        </span>
      </div>
      <div className="flex items-center gap-2.5 border-t border-border px-3.5 py-2.5">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105"
        >
          {isPlaying ? <Pause className="h-3 w-3" fill="currentColor" /> : <Play className="ml-[1px] h-3 w-3" fill="currentColor" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="font-mono-ui flex-shrink-0 text-[10px] tabular-nums text-muted-foreground">
          {duration > 0 ? `${Math.floor(currentTime)}s/${Math.floor(duration)}s` : "0s/0s"}
        </span>
      </div>
      <audio ref={audioRef} src="/audio/no-latency-us.mp3" preload="metadata" />
    </div>
  );
}
