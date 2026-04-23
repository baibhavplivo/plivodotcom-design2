import { useSignupUrl } from "@/hooks/useSignupUrl";

const COMPARISONS = [
  {
    title: "SMS API",
    highlight: "Starts at 40% less than Twilio",
    description: "And, save up to 70% with volume pricing",
    features: [
      "Send SMS to 220+ countries",
      "Premium direct carrier routes",
      "Real-time delivery reports",
    ],
  },
  {
    title: "Verify API",
    highlight: "$0 authentication fee",
    description: "Only SMS and Voice charges apply",
    features: [
      "Multi-channel: SMS and Voice OTP",
      "Pre-registered sender IDs",
      "Built-in fraud prevention",
    ],
  },
];

export default function CostComparison() {
  const { url: signupUrl, label: signupLabel } = useSignupUrl();

  return (
    <section className="py-12 lg:py-16 bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>cost comparison</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground">
            Lower your total costs significantly
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl">
            Switch from Twilio and save on every message and call — without compromising on quality or reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {COMPARISONS.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-background p-6 sm:p-8 hover:border-border-strong transition-colors"
            >
              <div className="text-sm font-medium text-primary font-mono-ui uppercase tracking-[0.1em] mb-3">
                {item.title}
              </div>
              <div className="font-sora text-xl sm:text-2xl font-normal text-foreground leading-tight">
                {item.highlight}
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{item.description}</p>

              <div className="mt-6 space-y-2.5">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-primary mt-[2px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/contact/sales/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-foreground text-background rounded-md cta-hover-gradient transition-colors"
          >
            Get Volume Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
