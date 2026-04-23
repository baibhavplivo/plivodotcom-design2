import { MessageSquare, ShieldCheck, Globe, BarChart3, Fingerprint, Zap } from "lucide-react";

const SMS_FEATURES = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Send SMS to 220+ countries with premium direct carrier routes for reliable delivery.",
  },
  {
    icon: BarChart3,
    title: "Detailed Logs",
    description: "Real-time delivery reports and detailed logs for debugging and optimizing your messaging.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Prevention",
    description: "Built-in SMS pumping protection and intelligent routing to minimize costs and fraud.",
  },
];

const VERIFY_FEATURES = [
  {
    icon: Fingerprint,
    title: "Multi-Channel OTP",
    description: "Deliver one-time passwords via SMS and Voice for maximum reach and user convenience.",
  },
  {
    icon: MessageSquare,
    title: "Pre-Registered IDs",
    description: "Pre-registered sender IDs and templates for faster delivery and higher trust.",
  },
  {
    icon: Zap,
    title: "Optimized Delivery",
    description: "Intelligent routing and retry logic ensures OTPs are delivered fast, every time.",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Globe;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4.5 h-4.5 text-primary" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function FeatureSuite() {
  return (
    <section className="py-12 lg:py-16 bg-surface border-t border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>feature suite</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground">
            A robust suite of feature-rich APIs
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl">
            Everything you need to build reliable communication at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* SMS API */}
          <div className="rounded-lg border border-border bg-background p-6 sm:p-8">
            <div className="text-sm font-medium text-primary font-mono-ui uppercase tracking-[0.1em] mb-1">
              SMS API
            </div>
            <h3 className="font-sora text-xl font-semibold text-foreground mb-6">
              Programmable messaging at scale
            </h3>
            <div className="space-y-5">
              {SMS_FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>

          {/* Verify API */}
          <div className="rounded-lg border border-border bg-background p-6 sm:p-8">
            <div className="text-sm font-medium text-primary font-mono-ui uppercase tracking-[0.1em] mb-1">
              Verify API
            </div>
            <h3 className="font-sora text-xl font-semibold text-foreground mb-6">
              Secure authentication, zero hassle
            </h3>
            <div className="space-y-5">
              {VERIFY_FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
