"use client";



interface InPageCTAProps {
  title?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function InPageCTA({
  title = "Let's find the right plan for your business",
  ctaText = "Get volume pricing",
  ctaHref = "/contact/sales",
}: InPageCTAProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0f1117]">
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 sm:px-10 py-8 sm:py-10">
        {/* Left - Text */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-white max-w-lg">
          {title}
        </h2>

        {/* Right - CTA */}
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200 flex-shrink-0"
        >
          {ctaText}
        </a>
      </div>

      {/* Dotted grid on the right half */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 z-[1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
    </div>
  );
}
