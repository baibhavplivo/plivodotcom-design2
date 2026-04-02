"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useSignupUrl } from "@/hooks/useSignupUrl";

interface PreFooterCTAProps {
  title?: string;
  subtitle?: string;
}

export default function PreFooterCTA({
  title = "Ready to make every call count?",
  subtitle,
}: PreFooterCTAProps) {
  const { country } = useGeoCountry();
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  const isIndia = country === "IN";
  const resolvedSubtitle = subtitle ?? `Get ${isIndia ? "₹800" : "$10"} in free credits. No credit card required. Deploy your first agent in under 10 minutes.`;
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      {/* Flickering Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={4}
          gridGap={6}
          color="rgb(139, 92, 246)"
          maxOpacity={0.225}
          flickerChance={0.1}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        <h2 className="font-sora animate-appear text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          {title}
        </h2>
        <p className="animate-appear mx-auto max-w-2xl text-base sm:text-lg text-gray-600 delay-100 mt-3">
          {resolvedSubtitle}
        </p>
        <a
          href={signupUrl}
          {...(signupUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="animate-appear inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-base font-medium text-white transition-colors delay-100 cta-hover-gradient mt-6"
        >
          {signupLabel}
        </a>
      </div>
    </section>
  );
}
