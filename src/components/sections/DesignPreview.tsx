import { Check, ArrowRight, Code2, Terminal, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const swatches = [
  { name: "background", token: "bg-background", note: "Page base" },
  { name: "surface", token: "bg-surface", note: "Elevation 1 - cards" },
  { name: "surface-2", token: "bg-surface-2", note: "Elevation 2 - popovers" },
  { name: "primary", token: "bg-primary", note: "Plivo blue · #323dfe" },
  { name: "foreground", token: "bg-foreground", note: "Text + fills" },
  { name: "muted", token: "bg-muted", note: "Muted bg" },
];

const typeScale = [
  { label: "display / H1", cls: "font-sora text-[3rem] leading-[1.05] tracking-[-0.025em] font-normal", sample: "Build without limits" },
  { label: "heading / H2", cls: "font-sora text-[2rem] leading-[1.15] tracking-[-0.025em] font-normal", sample: "APIs that scale with you" },
  { label: "heading / H3", cls: "font-sora text-[1.25rem] leading-[1.4] tracking-[-0.015em] font-semibold", sample: "Voice, SMS, WhatsApp" },
  { label: "body-lg", cls: "text-[1.125rem] leading-relaxed", sample: "Deploy AI voice agents that sound human in minutes, not months." },
  { label: "body", cls: "text-base leading-relaxed", sample: "Plivo's cloud communications platform ships with the SDKs, APIs, and tooling you expect." },
  { label: "caption", cls: "text-sm text-muted-foreground", sample: "Available in 150+ countries · 50+ languages" },
  { label: "mono-ui", cls: "font-mono-ui text-xs tracking-[0.02em]", sample: "POST /v1/agents · 200 OK" },
];

export default function DesignPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header strip */}
      <header className="sticky top-[72px] z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              plivo / design v2
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
            <h1 className="hidden font-sora text-lg font-semibold tracking-tight sm:block">
              Developer-precision preview
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-ui hidden text-[11px] text-muted-foreground sm:inline">
              theme
            </span>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 dev-grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative container mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              phase 1 · preview
            </span>
          </div>
          <h2 className="max-w-2xl font-sora text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] sm:text-[3rem]">
            A quieter, sharper system - with a true dark theme.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Hairline borders over heavy shadows. Monospace accents on numbers, labels, and code. Plivo blue kept as a single confident accent, not a gradient everywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/" className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-white">
              View homepage <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
            <a href="#tokens" className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface">
              See tokens
            </a>
          </div>
        </div>
      </section>

      {/* Token swatches */}
      <section id="tokens" className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <SectionHeader kicker="01 · tokens" title="Semantic surfaces" subtitle="Every color on the site is driven by these tokens. Swap the theme in the top-right and everything re-paints." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map((s) => (
              <div key={s.name} className="group flex flex-col gap-2">
                <div className={`h-20 rounded-md border border-border ${s.token}`} />
                <div>
                  <div className="font-mono-ui text-[12px] text-foreground">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <SectionHeader kicker="02 · typography" title="Sora · Inter · JetBrains Mono" subtitle="Display in Sora, body in Inter. JetBrains Mono shows up quietly in labels, code, and numeric stats." />
          <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface">
            {typeScale.map((t) => (
              <div key={t.label} className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-[160px_1fr] sm:items-baseline sm:px-6">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {t.label}
                </div>
                <div className={t.cls}>{t.sample}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <SectionHeader kicker="03 · actions" title="Buttons" subtitle="Primary = foreground-on-background with blue hover. Outline = hairline on background. Accent = used sparingly, never on every CTA." />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {/* Primary */}
            <CardDemo title="Primary" tag="default">
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-white">
                  Start for free <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
                <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:brightness-110">
                  Accent action
                </button>
              </div>
            </CardDemo>

            {/* Secondary */}
            <CardDemo title="Secondary" tag="outline">
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface">
                  Read the docs
                </button>
                <button className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  Ghost
                </button>
              </div>
            </CardDemo>
          </div>
        </div>
      </section>

      {/* Cards + code sample */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <SectionHeader kicker="04 · surfaces" title="Cards &amp; code surfaces" subtitle="The card pattern - hairline border on a surface elevation. Terminal/code blocks reuse the same chrome." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard icon={<Zap className="h-5 w-5" />} title="Sub-500ms latency" body="Turn-taking, VAD, and barge-in tuned for natural conversation." metric="<500ms" />
            <FeatureCard icon={<Code2 className="h-5 w-5" />} title="SDKs that feel native" body="Python, Node, Go, and REST. No proprietary abstractions." metric="6 SDKs" />
            <FeatureCard icon={<Terminal className="h-5 w-5" />} title="Deploy from your terminal" body="CLI-first workflow. Version agents with git. Roll back in seconds." metric="v2.14" />
          </div>

          {/* Code block */}
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="font-mono-ui text-[11px] text-muted-foreground">examples/create-agent.py</span>
              <span className="font-mono-ui text-[11px] text-primary">● running</span>
            </div>
            <pre className="overflow-x-auto bg-code px-5 py-4 text-[12.5px] leading-relaxed text-code-foreground font-mono-ui sm:text-[13px]">
{`from plivo import Plivo

client = Plivo(api_key="plivo_...")

agent = client.agents.create(
    voice="nova",
    language="en-US",
    tools=["knowledge_base", "transfer_call"],
)

print(agent.id) # ag_01HA...`}
            </pre>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <SectionHeader kicker="05 · numbers" title="Numeric emphasis" subtitle="Stats use monospace tabular numerals. Reads as an instrument panel, not a brochure." />
          <div className="mt-10 grid grid-cols-2 divide-border rounded-xl border border-border bg-surface sm:grid-cols-4 sm:divide-x">
            {[
              { value: "<500ms", label: "Voice latency" },
              { value: "99.99%", label: "Platform uptime" },
              { value: "50+", label: "Languages" },
              { value: "150+", label: "Countries" },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col gap-1 px-6 py-6 ${i < 2 ? "border-b sm:border-b-0" : ""} ${i % 2 === 0 ? "border-r sm:border-r-0" : ""} border-border`}>
                <div className="font-mono-ui text-2xl font-semibold tabular-nums tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start gap-4">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">next</span>
          <h3 className="max-w-xl font-sora text-2xl font-normal tracking-[-0.02em]">
            If this direction feels right, Phase 2 rolls it out to the remaining ~150 section components and product pages.
          </h3>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {["Homepage ✓", "Navbar ✓", "Footer ✓", "Hero ✓", "Stats ✓", "Logos ✓", "Preview page ✓"].map((x) => (
              <span key={x} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 font-mono-ui text-[11px]">
                <Check className="h-3 w-3 text-primary" />
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: React.ReactNode; subtitle: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {kicker}
      </div>
      <h3 className="mt-3 font-sora text-[1.75rem] font-normal leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
        {title}
      </h3>
      <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function CardDemo({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="font-sora text-base font-semibold">{title}</div>
        <span className="font-mono-ui rounded-full bg-background px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground border border-border">
          {tag}
        </span>
      </div>
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, body, metric }: { icon: React.ReactNode; title: string; body: string; metric: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-primary">
          {icon}
        </div>
        <span className="font-mono-ui text-xs text-muted-foreground">{metric}</span>
      </div>
      <div>
        <h4 className="font-sora text-lg font-semibold tracking-[-0.01em]">{title}</h4>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
