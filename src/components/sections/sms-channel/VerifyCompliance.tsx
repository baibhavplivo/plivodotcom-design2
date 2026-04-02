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
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header - Centered */}
        <div className="text-center mb-10">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
            Simplify compliance and go-live instantly
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
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
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto object-contain grayscale opacity-70"
              />
              <span className="text-xs text-gray-500 mt-2">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
