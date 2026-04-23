"use client";

const complianceLogos = [
  { src: "/images/compliance/GDPR black.svg", alt: "GDPR Compliant", name: "GDPR" },
  { src: "/images/compliance/HIPAA black.svg", alt: "HIPAA Compliant", name: "HIPAA" },
  { src: "/images/compliance/PCI black.svg", alt: "PCI DSS Compliant", name: "PCI DSS" },
  { src: "/images/compliance/AICPA black.svg", alt: "SOC 2 Type II", name: "SOC 2" },
  { src: "/images/compliance/Star Black.svg", alt: "CSA STAR", name: "CSA STAR" },
];

export default function VerifyCompliance() {
  return (
    <section className="bg-background border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header - Centered */}
        <div className="mb-10">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>compliance</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
            Simplify compliance and go-live instantly
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
            Bypass regulatory paperwork and go live instantly in countries like the US, India, and the UK using pre-registered sender IDs (e.g., PLVRFY, PLVSMS) and templates. Send OTPs globally in multiple languages.
          </p>
        </div>

        {/* Compliance Logos - Horizontal Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {complianceLogos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4"
            >
              <img src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto object-contain grayscale opacity-70 dark:invert"
              />
              <span className="text-xs text-muted-foreground mt-2">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
