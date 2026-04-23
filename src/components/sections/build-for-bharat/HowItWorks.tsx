// HowItWorks.tsx - 4-step process section (light theme)

const steps = [
  {
    number: "01",
    title: "Sign up",
    description: "Create your Plivo account between Feb 16-20, 2026",
  },
  {
    number: "02",
    title: "Recharge",
    description: "Add credits to your account - any amount",
  },
  {
    number: "03",
    title: "Get matched",
    description: "100% bonus credits applied automatically within 24 hours",
  },
  {
    number: "04",
    title: "Repeat",
    description: "Every recharge that week is matched. No limits.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 sm:py-12 lg:py-[60px] bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-3 font-mono-ui uppercase tracking-[0.1em]">
            How It Works
          </span>
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>how it works</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground">
            Go live with bonus credits in minutes
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col">
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[2rem] font-semibold text-gray-300">
                  {step.number}
                </span>
                {step.number !== "04" && <div className="h-px flex-1 bg-gray-200" />}
              </div>
              {/* Step content */}
              <h3 className="font-inter text-[1.125rem] font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Example callout with motif background */}
      <div className="relative overflow-hidden">
        {/* Motif background layer - 10% opacity */}
        <div
          className="absolute inset-0 bg-repeat-x opacity-10"
          style={{
            backgroundImage: "url(/images/build-for-bharat/motif.svg)",
            backgroundSize: "auto 50%",
            backgroundPosition: "center",
          }}
        />
        {/* Card centered on top of motifs */}
        <div className="relative z-10 flex items-center justify-center py-8 sm:py-10 px-4">
          <div
            className="max-w-lg w-full rounded-xl px-6 sm:px-10 py-6 text-center"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, #131340 0%, #0a0a1a 60%)",
            }}
          >
            <p className="text-gray-300 text-base sm:text-lg mb-2">
              You recharge <span className="font-semibold text-white">{"\u20B9"}10,000</span>{" "}
              <span className="text-muted-foreground mx-1">&rarr;</span> You get{" "}
              <span className="font-semibold text-white">{"\u20B9"}10,000 bonus</span>
            </p>
            <p className="font-inter text-xl sm:text-2xl font-bold text-white">
              {"\u20B9"}20,000 to build with
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
