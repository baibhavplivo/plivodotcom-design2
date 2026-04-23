"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VoiceAgentDemo: hero-right-column live call panel.
 *
 * Simulates a live voice-AI call with:
 *   - animated waveform (rAF-driven, DOM-direct for perf)
 *   - transcript stream that reveals one line at a time
 *   - telemetry strip (latency / language / tool invoked)
 *   - pipeline indicator (STT to LLM to TTS)
 *
 * Entirely theme-token-driven. No hardcoded colors.
 */

type Role = "agent" | "caller";
interface Line {
  role: Role;
  text: string;
  /** tool that the *agent* just invoked on this turn (optional) */
  tool?: string;
}

const TRANSCRIPT: Line[] = [
  { role: "caller", text: "Hi, I'd like to reschedule my dental appointment." },
  { role: "agent",  text: "Of course. Can I get your booking ID?", tool: "lookup_customer" },
  { role: "caller", text: "It's B-4281, under Rahul Kumar." },
  { role: "agent",  text: "Found it. I see 3 PM tomorrow is open. Does that work?", tool: "check_availability" },
  { role: "caller", text: "Yes, that's perfect." },
  { role: "agent",  text: "Done. Confirmation text sent. Anything else?", tool: "reschedule_booking" },
];

const PIPELINE_STAGES = [
  { id: "stt", label: "STT", meta: "speech-to-text" },
  { id: "llm", label: "LLM", meta: "reasoning" },
  { id: "tts", label: "TTS", meta: "speech-out" },
];

const WAVEFORM_BARS = 42;

export default function VoiceAgentDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [visibleLines, setVisibleLines] = useState(1);
  const [latency, setLatency] = useState(487);
  const [pipelineActive, setPipelineActive] = useState<string | null>("stt");

  /* Duration counter */
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  /* Transcript reveal */
  useEffect(() => {
    if (visibleLines >= TRANSCRIPT.length) {
      // Loop: hold for a beat then restart
      const reset = setTimeout(() => setVisibleLines(1), 3500);
      return () => clearTimeout(reset);
    }
    const delay = TRANSCRIPT[visibleLines - 1].role === "agent" ? 2200 : 1600;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  /* Latency flutter */
  useEffect(() => {
    const t = setInterval(() => {
      setLatency(380 + Math.floor(Math.random() * 140));
    }, 900);
    return () => clearInterval(t);
  }, []);

  /* Pipeline sequencer: mimics the flow on each new agent turn */
  useEffect(() => {
    const currentLine = TRANSCRIPT[visibleLines - 1];
    if (!currentLine) return;
    if (currentLine.role === "caller") {
      setPipelineActive("stt");
      const t = setTimeout(() => setPipelineActive("llm"), 600);
      return () => clearTimeout(t);
    } else {
      setPipelineActive("llm");
      const t = setTimeout(() => setPipelineActive("tts"), 500);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  /* Who's currently "speaking": drives waveform energy */
  const current = TRANSCRIPT[visibleLines - 1];
  const activeSpeaker: Role | null = current?.role ?? null;

  /* Current tool (sticky across turns until replaced) */
  const currentTool =
    [...TRANSCRIPT.slice(0, visibleLines)]
      .reverse()
      .find((l) => l.role === "agent" && l.tool)?.tool ?? "idle";

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.28)]"
      aria-label="Live voice agent demo"
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono-ui text-[11px] text-foreground/80">live voice agent</span>
        </div>
        <span className="font-mono-ui tabular-nums text-[11px] text-muted-foreground">
          {formatClock(elapsed)}
        </span>
        <span className="font-mono-ui text-[11px] text-muted-foreground truncate max-w-[120px]">
          ag_01HAZ7K
        </span>
      </div>

      {/* ── Waveform ─────────────────────────────────────────── */}
      <div className="relative border-b border-border bg-background/20">
        <Waveform speaker={activeSpeaker} />
        <span className="absolute left-3 top-2 font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          {activeSpeaker === "agent" ? "agent · speaking" : "caller · speaking"}
        </span>
      </div>

      {/* ── Transcript ───────────────────────────────────────── */}
      <div className="relative max-h-[180px] min-h-[180px] overflow-hidden px-4 py-3 sm:px-5">
        <ul className="flex flex-col gap-1.5">
          {TRANSCRIPT.slice(0, visibleLines).map((line, i) => (
            <TranscriptRow
              key={i}
              role={line.role}
              text={line.text}
              isLatest={i === visibleLines - 1}
            />
          ))}
        </ul>
      </div>

      {/* ── Telemetry strip ──────────────────────────────────── */}
      <div className="grid grid-cols-3 border-t border-border text-left">
        <Telem label="latency" value={`${latency}ms`} accent={latency < 500} />
        <Telem label="lang" value="en-US" accent />
        <Telem label="tool" value={currentTool} mono />
      </div>

      {/* ── Pipeline ─────────────────────────────────────────── */}
      <div className="flex items-center gap-1 border-t border-border bg-background/40 px-4 py-2">
        {PIPELINE_STAGES.map((stage, i) => (
          <PipelineStage
            key={stage.id}
            label={stage.label}
            active={pipelineActive === stage.id}
            isLast={i === PIPELINE_STAGES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Waveform ──────────────────────────────────────────────── */
function Waveform({ speaker }: { speaker: Role | null }) {
  const barsRef = useRef<Array<HTMLDivElement | null>>([]);
  const speakerRef = useRef(speaker);
  speakerRef.current = speaker;

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.14;
      const isActive = speakerRef.current !== null;
      const mult = isActive ? 1 : 0.18;
      for (let i = 0; i < barsRef.current.length; i++) {
        const el = barsRef.current[i];
        if (!el) continue;
        // composite wave for organic feel
        const base =
          0.28 +
          0.42 * Math.abs(Math.sin(t * 0.9 + i * 0.35)) +
          0.2 * Math.abs(Math.sin(t * 0.4 + i * 0.12));
        const noise = Math.random() * 0.22;
        const h = Math.min(1, (base + noise) * mult);
        const percent = Math.max(6, Math.round(h * 100));
        el.style.height = `${percent}%`;
        el.style.opacity = String(0.45 + h * 0.55);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-14 items-center justify-center gap-[3px] px-4 py-2 sm:px-6">
      {Array.from({ length: WAVEFORM_BARS }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className="w-[3px] rounded-full bg-primary"
          style={{ height: "20%", opacity: 0.5 }}
        />
      ))}
    </div>
  );
}

/* ─── Transcript row ────────────────────────────────────────── */
function TranscriptRow({
  role,
  text,
  isLatest,
}: {
  role: Role;
  text: string;
  isLatest: boolean;
}) {
  return (
    <li className="flex items-start gap-2 text-[12.5px] leading-snug animate-appear">
      <span
        className={`font-mono-ui shrink-0 pt-[1px] ${
          role === "agent" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        ›
      </span>
      <span
        className={`font-mono-ui shrink-0 pt-[1px] w-[46px] uppercase tracking-[0.06em] text-[10.5px] ${
          role === "agent" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {role}
      </span>
      <span
        className={`flex-1 ${
          role === "agent" ? "text-foreground" : "text-foreground/70"
        }`}
      >
        {text}
        {isLatest && (
          <span className="ml-1 inline-block h-[0.9em] w-[6px] translate-y-[2px] animate-pulse bg-primary align-middle" />
        )}
      </span>
    </li>
  );
}

/* ─── Telemetry cell ─────────────────────────────────────────── */
function Telem({
  label,
  value,
  accent = false,
  mono = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 border-r border-border px-3 py-2 last:border-r-0 sm:px-4">
      <span className="font-mono-ui text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      <span
        className={`font-mono-ui text-[12px] tabular-nums ${
          accent ? "text-primary" : "text-foreground"
        } ${mono ? "truncate" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

/* ─── Pipeline stage ────────────────────────────────────────── */
function PipelineStage({
  label,
  active,
  isLast,
}: {
  label: string;
  active: boolean;
  isLast: boolean;
}) {
  return (
    <>
      <div
        className={`flex items-center gap-1.5 rounded-md px-2 py-1 font-mono-ui text-[10.5px] uppercase tracking-[0.08em] transition-colors ${
          active
            ? "bg-surface border border-border text-foreground/80"
            : "text-muted-foreground"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            active ? "bg-primary" : "bg-muted-foreground/40"
          }`}
        />
        {label}
      </div>
      {!isLast && <FlowingDots active={active} />}
    </>
  );
}

function FlowingDots({ active }: { active: boolean }) {
  return (
    <div className="flex flex-1 items-center gap-1 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={`h-px flex-1 transition-colors duration-200 ${
            active ? "bg-primary/60" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Util ─────────────────────────────────────────────────── */
function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
