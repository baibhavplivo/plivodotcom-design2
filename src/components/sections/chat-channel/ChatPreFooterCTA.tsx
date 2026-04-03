"use client";


import { useSignupUrl } from "@/hooks/useSignupUrl";

export default function ChatPreFooterCTA() {
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      {/* Dotted Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          Let AI handle your customer queries instantly
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 mt-3">
          Deploy AI chat agents that resolve 80% of customer queries without human intervention. Scale support effortlessly while keeping satisfaction high.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="/contact/sales"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-black transition-colors hover:bg-gray-50"
          >
            Contact Sales
          </a>
          <a
            href={signupUrl}
            {...(signupUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white transition-colors cta-hover-gradient"
          >
            {signupLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
