import { useEffect, useRef, useState } from "react";
import {
  Target,
  Package,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Globe } from "@/components/ui/globe";

const USE_CASES = [
  { label: "Sales", icon: TrendingUp },
  { label: "Lead qualification", icon: Target },
  { label: "Order tracking", icon: Package },
  { label: "Payment collection", icon: CreditCard },
  { label: "Feedback surveys", icon: MessageSquare },
  { label: "Identity verification", icon: ShieldCheck },
];

const STATS = [
  { value: "<500ms", label: "Voice latency" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "50+", label: "Languages supported" },
  { value: "150+", label: "Countries connected" },
];

function getBaseCounter(): number {
  const launchDate = new Date("2024-01-01").getTime();
  const now = Date.now();
  const daysSinceLaunch = Math.floor((now - launchDate) / (1000 * 60 * 60 * 24));
  return 50_000_000 + daysSinceLaunch * 15_234;
}

function SmoothDigit({ digit }: { digit: number }) {
  const prevRef = useRef(digit);
  const [pos, setPos] = useState(digit);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = digit;

    if (prev === 9 && digit === 0) {
      setAnimate(true);
      setPos(10);
      const timer = setTimeout(() => {
        setAnimate(false);
        setPos(0);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setAnimate(true);
      setPos(digit);
    }
  }, [digit]);

  return (
    <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden tabular-nums">
      <span
        className="absolute inset-x-0 flex flex-col"
        style={{
          transition: animate ? "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          transform: `translateY(-${pos}em)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => (
          <span key={i} className="flex h-[1em] items-center justify-center">
            {num}
          </span>
        ))}
      </span>
    </span>
  );
}

function LiveCounter({ value }: { value: number }) {
  const formatted = value.toLocaleString("en-US");
  return (
    <span className="inline-flex items-baseline">
      {formatted.split("").map((char, i) =>
        char === "," ? (
          <span key={`c-${i}`}>,</span>
        ) : (
          <SmoothDigit key={`d-${i}`} digit={parseInt(char)} />
        ),
      )}
    </span>
  );
}

export default function ImpactStats() {
  const [counter, setCounter] = useState(() => getBaseCounter());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const increment = Math.floor(Math.random() * 90) + 10;
      const delay = 2000 + Math.random() * 2000;
      setCounter((prev) => prev + increment);
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="section-scale" className="relative w-full border-t border-border">
      <style>{`
        .use-cases-marquee { animation: marquee-scroll 22s linear infinite; }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        {/* Kicker */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">04</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>scale</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>
            <span className="font-mono-ui inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              live · realtime counter
            </span>
          </span>
        </div>

        {/* Heading */}
        <div className="mt-8 max-w-3xl">
          <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
            Plivo is built to scale
          </h2>
        </div>

        {/* Unified container */}
        <div className="relative mt-10 overflow-hidden rounded-lg border border-border bg-surface">
          {/* Globe - right side */}
          <div
            className="absolute -right-28 top-1/2 z-20 hidden lg:block"
            style={{ transform: "translateY(calc(-50% + 40px))" }}
          >
            <Globe
              size={504}
              baseColor={[1, 1, 1]}
              glowColor={[0.96, 0.96, 1]}
              markerColor={[0.2, 0.24, 1]}
              opacity={0.9}
              interactive={true}
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-[340px] bg-gradient-to-l from-surface via-surface/85 to-transparent lg:block" />

          <div className="relative z-10 flex flex-col">
            {/* Counter */}
            <div className="flex flex-col gap-3 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:pr-[380px]">
              <div className="font-mono-ui text-[2rem] font-semibold tabular-nums leading-none tracking-[-0.04em] text-foreground sm:text-[3rem] md:text-5xl lg:text-[5.5rem]">
                <LiveCounter value={counter} />
              </div>
              <div className="text-base sm:text-lg font-medium text-muted-foreground">
                minutes of customer conversations handled by our AI Agents
              </div>
            </div>

            {/* Stats row */}
            <div className="relative grid grid-cols-2 border-t border-border lg:mr-[380px] sm:grid-cols-4">
              {STATS.map((stat, index) => {
                const mobileRight = index % 2 === 0; // 0,2 → right border on mobile
                const mobileBottom = index < 2;       // 0,1 → bottom border on mobile
                const desktopRight = index < STATS.length - 1; // 0,1,2 → right border on desktop
                const cls = [
                  "flex flex-col gap-1 px-5 py-5 sm:px-6 sm:py-6",
                  mobileRight ? "border-r border-border" : "",
                  mobileBottom ? "border-b border-border" : "",
                  "sm:border-b-0",
                  desktopRight ? "sm:border-r sm:border-border" : "sm:border-r-0",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <div key={stat.label} className={cls}>
                    <div className="font-mono-ui text-xl font-semibold tabular-nums tracking-tight text-foreground sm:text-2xl">
                      {stat.value}
                    </div>
                    <div className="font-mono-ui text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Use-case marquee */}
            <div className="relative overflow-hidden border-t border-border py-4 lg:mr-[380px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-surface to-transparent lg:block" />
              <div className="use-cases-marquee flex cursor-default select-none items-center gap-10 pl-4">
                {[...USE_CASES, ...USE_CASES, ...USE_CASES, ...USE_CASES].map((uc, i) => {
                  const Icon = uc.icon;
                  return (
                    <span
                      key={`${uc.label}-${i}`}
                      className="flex items-center gap-2 whitespace-nowrap font-mono-ui text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {uc.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
