"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useSignupUrl } from "@/hooks/useSignupUrl";

interface PreFooterCTAProps {
  title?: string;
  subtitle?: string;
}

const TERMINAL_LINES: Array<{ prompt?: boolean; text: string; tone?: "muted" | "accent" | "default" }> = [
  { prompt: true, text: "plivo agents create --voice nova --language en-US", tone: "default" },
  { text: "✓ spinning up runtime ...", tone: "muted" },
  { text: "✓ routing in 150+ countries", tone: "muted" },
  { text: "✓ ready: agent id = ag_01HAZ7K2...", tone: "accent" },
  { prompt: true, text: "open https://cx.plivo.com/agents/ag_01HAZ7K2", tone: "default" },
];

export default function PreFooterCTA({
  title = "Ready to make every call count?",
  subtitle,
}: PreFooterCTAProps) {
  const { country } = useGeoCountry();
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  const isIndia = country === "IN";
  const resolvedSubtitle =
    subtitle ??
    `Get ${isIndia ? "₹1,000" : "$10"} in free credits. No credit card required. Deploy your first agent in under 10 minutes.`;

  // Visible-line reveal for the terminal block
  const [visibleLines, setVisibleLines] = useState(1);
  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 700);
    return () => clearTimeout(t);
  }, [visibleLines]);

  // Time string - shown in status pill, updates every second
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString("en-US", { hour12: false }));
  useEffect(() => {
    const i = setInterval(() => {
      setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="section-ship" className="relative w-full border-t border-border bg-surface-2">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:py-28">
        {/* Kicker */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">07</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>ship it</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>one command · production-ready</span>
        </div>

        {/* Split */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: headline + CTA */}
          <div className="lg:col-span-6 lg:pt-2">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {resolvedSubtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={signupUrl}
                {...(signupUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center rounded-md bg-foreground px-4 py-2.5 text-[13.5px] font-medium text-background transition-colors hover:bg-primary hover:text-white"
              >
                {signupLabel}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/contact/sales/"
                className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
              >
                Talk to sales
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 font-mono-ui text-[11px] text-muted-foreground">
              <span>› no credit card</span>
              <span>› free credits</span>
              <span>› cancel anytime</span>
            </div>
          </div>

          {/* Right: terminal */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                </div>
                <span className="font-mono-ui text-[11px] text-muted-foreground">~/plivo</span>
                <span className="font-mono-ui tabular-nums text-[11px] text-muted-foreground">
                  {clock}
                </span>
              </div>
              <div className="bg-code px-5 py-6 font-mono-ui text-[13px] leading-[1.9] text-code-foreground">
                {TERMINAL_LINES.map((line, i) => {
                  const visible = i < visibleLines;
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-2 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
                      aria-hidden={!visible}
                    >
                      <span className="shrink-0 text-muted-foreground">
                        {line.prompt ? "$" : " "}
                      </span>
                      <span
                        className={
                          line.tone === "accent"
                            ? "text-primary"
                            : line.tone === "muted"
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }
                      >
                        {line.text}
                        {visible && i === visibleLines - 1 && (
                          <span className="ml-1 inline-block h-[1em] w-[7px] translate-y-[1px] animate-pulse bg-primary align-middle" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between border-t border-border bg-background/40 px-4 py-2">
                <span className="font-mono-ui inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  agent deployed · {TERMINAL_LINES.length} steps
                </span>
                <a
                  href="https://www.plivo.com/docs/voice/quickstart/"
                  className="font-mono-ui text-[11px] text-foreground/70 hover:text-foreground transition-colors"
                >
                  quickstart →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
