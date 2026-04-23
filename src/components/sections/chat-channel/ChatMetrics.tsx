export default function ChatMetrics() {
  const metrics = [
    {
      value: "80%",
      label: "of customer queries resolved without human intervention",
    },
    {
      value: "60%",
      label: "reduction in support operations costs",
    },
    {
      value: "3x",
      label: "faster responses to customers",
    },
    {
      value: "35%",
      label: "higher CSAT scores",
    },
  ];

  return (
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>metrics</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          Measurable results with AI chat agents that drive business growth
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-10 md:mb-14">
          Real outcomes from businesses using Plivo AI chat to transform their customer experience.
        </p>

        {/* Metrics Grid */}
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {metrics.map((metric, index) => (
              <div key={index} className="p-6 lg:p-8 text-center">
                <p className="text-[2.5rem] sm:text-[3rem] font-normal leading-[1] tracking-[-0.02em] text-foreground mb-3">
                  {metric.value}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
