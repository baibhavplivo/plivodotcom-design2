import {
  ArrowRight,
  Volume2,
  FileJson,
  MessageCircle,
  Mic,
  AudioWaveform,
} from "lucide-react";

const STACK = [
  { id: "tts", icon: Volume2, name: "TTS", detail: "Natural Text-to-Speech voices (or bring your own)" },
  { id: "stt", icon: FileJson, name: "STT", detail: "Speech-to-Text with 95%+ accuracy across accents" },
  { id: "turn", icon: MessageCircle, name: "Turn detection", detail: "Intelligent turn-taking that eliminates awkward interruptions" },
  { id: "vad", icon: Mic, name: "VAD", detail: "Voice Activity Detection that knows when users start and stop speaking" },
  { id: "audio", icon: AudioWaveform, name: "Audio stream", detail: "Real-time bi-directional audio with <300ms latency" },
];

const PROMPTS = [
  '"Agent for appointment scheduling at a dental clinic. Should confirm, reschedule, or cancel."',
  '"Outbound agent for collecting post-delivery feedback."',
  '"Inbound support agent. Lookup order by phone number, read ETA."',
];

export default function AgentBuilder() {
  return (
    <section id="section-stack" className="relative w-full border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        {/* Kicker */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">03</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>stack</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>two ways to build</span>
        </div>

        {/* Headline */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Build AI agents your way with <span className="text-primary">code</span> or <span className="text-primary">prompt</span>
            </h2>
          </div>
        </div>

        {/* Two panels */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {/* -------- Panel A : Programmable -------- */}
          <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong">
            {/* Panel chrome */}
            <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
              <span className="font-mono-ui text-[11px] text-muted-foreground">
                /stack/programmable
              </span>
              <span className="font-mono-ui inline-flex items-center gap-1 text-[11px] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                modular
              </span>
            </div>

            {/* Visual: stack of tagged rows (animated on hover) */}
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-5 py-8 sm:px-7 sm:py-10">
              <div className="pointer-events-none absolute inset-0 dev-grid-bg-fine opacity-[0.5] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]" />
              <ul className="relative space-y-2.5">
                {STACK.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 rounded-md border border-border bg-background/80 px-3.5 py-2.5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-background"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="w-32 shrink-0">
                        <span className="font-sora text-[13px] font-semibold text-foreground">{item.name}</span>
                      </div>
                      <span className="hidden flex-1 text-[12px] text-muted-foreground sm:inline">{item.detail}</span>
                      <span className="font-mono-ui text-[10.5px] text-muted-foreground/60">[{String(i + 1).padStart(2, "0")}]</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Panel description + CTA */}
            <div className="flex flex-col gap-4 border-t border-border px-5 py-6 sm:px-7">
              <div className="flex items-baseline gap-3">
                <h3 className="font-sora text-xl font-semibold tracking-[-0.015em] text-foreground">
                  Programmable AI agents
                </h3>
                <span className="font-mono-ui text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                  sdk · api
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Start with our fully managed stack or strip it down to just audio streaming. Swap in your own LLM, customize ASR and TTS. Full control, zero hassle.
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                <li className="flex items-center gap-1.5 text-sm text-foreground/80">
                  <span className="font-mono-ui text-primary">›</span>
                  Pick and choose what you want
                </li>
                <li className="flex items-center gap-1.5 text-sm text-foreground/80">
                  <span className="font-mono-ui text-primary">›</span>
                  Bring your own LLM
                </li>
              </ul>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono-ui text-[11px] text-muted-foreground">
                  <span>› python</span>
                  <span>› node</span>
                  <span>› go</span>
                  <span>› rest</span>
                </div>
                <a
                  href="/contact/sales/"
                  className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-colors hover:bg-primary hover:text-white"
                >
                  Talk to us
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* -------- Panel B : No-code -------- */}
          <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong">
            <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
              <span className="font-mono-ui text-[11px] text-muted-foreground">
                /stack/studio
              </span>
              <span className="font-mono-ui inline-flex items-center gap-1 text-[11px] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                prompt
              </span>
            </div>

            {/* Visual: prompt + prompt rotator */}
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-5 py-8 sm:px-7 sm:py-10">
              <div className="pointer-events-none absolute inset-0 dev-grid-bg-fine opacity-[0.5] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]" />
              <div className="relative space-y-3">
                {/* Prompt input */}
                <div className="rounded-md border border-border bg-background p-4 shadow-[0_0_0_1px_rgba(50,61,254,0.08)]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono-ui text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
                      describe your agent
                    </span>
                    <span className="font-mono-ui text-[10.5px] text-muted-foreground">↵ enter</span>
                  </div>
                  <div className="min-h-[74px] text-[14px] leading-relaxed text-foreground">
                    <span className="relative">
                      Agent for appointment scheduling at a dental clinic. Should confirm, reschedule, or cancel appointments. Transfer to a human if the caller is upset.
                      <span className="ml-0.5 inline-block h-[1.05em] w-[2px] -translate-y-[1px] animate-pulse bg-primary align-middle" />
                    </span>
                  </div>
                </div>

                {/* Prompt rotator: stacked examples */}
                <ul className="space-y-1.5">
                  {PROMPTS.slice(1).map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-md border border-dashed border-border bg-background/50 px-3 py-2 text-[12px] text-muted-foreground"
                    >
                      <span className="font-mono-ui shrink-0 text-primary">›</span>
                      <span className="line-clamp-1">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Panel description + CTA */}
            <div className="flex flex-col gap-4 border-t border-border px-5 py-6 sm:px-7">
              <div className="flex items-baseline gap-3">
                <h3 className="font-sora text-xl font-semibold tracking-[-0.015em] text-foreground">
                  No-code AI agent studio
                </h3>
                <span className="font-mono-ui text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                  visual · prompt
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Build, test, and deploy omni-channel AI agents in minutes. No code required. Best for teams who want to move fast and focus on outcomes.
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                <li className="flex items-center gap-1.5 text-sm text-foreground/80">
                  <span className="font-mono-ui text-primary">›</span>
                  Build agent in plain English
                </li>
                <li className="flex items-center gap-1.5 text-sm text-foreground/80">
                  <span className="font-mono-ui text-primary">›</span>
                  Drag and drop simplicity
                </li>
              </ul>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono-ui text-[11px] text-muted-foreground">
                  <span>› studio</span>
                  <span>› templates</span>
                  <span>› instant preview</span>
                </div>
                <a
                  href="https://cx.plivo.com/pungis2"
                  data-geo-cta="signup"
                  className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-colors hover:bg-primary hover:text-white"
                >
                  Sign up free
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
