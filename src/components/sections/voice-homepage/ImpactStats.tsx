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

// Calculate a realistic base number that grows over time
function getBaseCounter(): number {
  const launchDate = new Date("2024-01-01").getTime();
  const now = Date.now();
  const daysSinceLaunch = Math.floor((now - launchDate) / (1000 * 60 * 60 * 24));
  // Starting from 50 million, growing ~15k per day
  return 50_000_000 + daysSinceLaunch * 15_234;
}

// Smooth animated digit with 9→0 wrap-around support
function SmoothDigit({ digit }: { digit: number }) {
  const prevRef = useRef(digit);
  const [pos, setPos] = useState(digit);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = digit;

    if (prev === 9 && digit === 0) {
      // Wrap-around: roll forward to extra "0" at position 10
      setAnimate(true);
      setPos(10);
      const timer = setTimeout(() => {
        // Snap back to position 0 without transition
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
          transition: animate
            ? "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
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

// Counter with smooth animated digits
function LiveCounter({ value }: { value: number }) {
  const formatted = value.toLocaleString("en-US");

  return (
    <span className="inline-flex items-baseline">
      {formatted.split("").map((char, i) =>
        char === "," ? (
          <span key={`comma-${i}`}>,</span>
        ) : (
          <SmoothDigit key={`digit-${i}`} digit={parseInt(char)} />
        )
      )}
    </span>
  );
}

export default function ImpactStats() {
  const [counter, setCounter] = useState(() => getBaseCounter());

  // Slow counter: random 2-digit increment every 2-4 seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const increment = Math.floor(Math.random() * 90) + 10; // 10–99
      const delay = 2000 + Math.random() * 2000; // 2–4 seconds
      setCounter((prev) => prev + increment);
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="impact-section bg-white py-12 sm:py-16 md:py-20">
      <style>{`
        .use-cases-marquee {
          animation: marquee-scroll 20s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora mb-6 text-center text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          Plivo is built to scale
        </h2>

        {/* Unified Container with Globe */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* Globe - Positioned absolute on right, cropped */}
          <div className="absolute -right-28 top-1/2 hidden lg:block z-30" style={{ transform: 'translateY(calc(-50% + 40px))' }}>
            <Globe
              size={504}
              baseColor={[1, 1, 1]}
              glowColor={[0.96, 0.96, 1]}
              markerColor={[0.2, 0.24, 1]}
              opacity={0.9}
              interactive={true}
            />
          </div>

          {/* Fade overlay for lines near globe */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[350px] hidden lg:block z-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Stats Content */}
          <div className="relative flex flex-col z-20">
            {/* Large Counter Block */}
            <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-10 lg:py-10 lg:pr-[380px]">
              <div className="mb-2 text-[2rem] font-semibold tabular-nums tracking-[-0.04em] text-black sm:text-[3rem] md:text-5xl lg:text-7xl">
                <LiveCounter value={counter} />
              </div>
              <div className="text-base sm:text-lg font-medium text-gray-600">
                minutes of customer conversations handled by our AI Agents
              </div>
            </div>

            {/* Stats Row */}
            <div className="relative border-t border-gray-200 lg:mr-[380px]">
              {/* Right fade overlay */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 hidden lg:block bg-gradient-to-l from-white to-transparent z-10" />
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {STATS.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className={`flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-5 ${
                      index < STATS.length - 1 ? "border-r border-gray-200" : ""
                    } ${index >= 2 ? "border-t sm:border-t-0 border-gray-200" : ""}`}
                  >
                    <div className="text-xl font-semibold text-black sm:text-2xl">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases Marquee */}
            <div className="relative overflow-hidden border-t border-gray-200 py-4 lg:mr-[380px]">
              {/* Right fade overlay */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 hidden lg:block bg-gradient-to-l from-white to-transparent z-10" />
              <div className="use-cases-marquee flex cursor-default select-none items-center gap-8">
                {[...USE_CASES, ...USE_CASES, ...USE_CASES, ...USE_CASES].map((useCase, i) => {
                  const Icon = useCase.icon;
                  return (
                    <span
                      key={`${useCase.label}-${i}`}
                      className="flex items-center gap-1.5 whitespace-nowrap text-sm text-gray-600"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#323DFE]" />
                      {useCase.label}
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
