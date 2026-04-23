"use client";
import React from "react";
import { motion } from "motion/react";
import { useSignupUrl } from "@/hooks/useSignupUrl";

export default function HeroSection() {
  const { url: signupUrl, label: signupLabel } = useSignupUrl();
  return (
    <div
      className="relative overflow-hidden w-full z-0 h-screen"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url(/images/build-for-bharat/backdrop.png)",
        }}
      />

      {/* Motif top border - edge to edge, 2x size */}
      <div
        className="absolute top-0 left-0 right-0 z-[60] h-[56px] bg-repeat-x opacity-50"
        style={{
          backgroundImage: "url(/images/build-for-bharat/motif.svg)",
          backgroundSize: "auto 56px",
        }}
      />

      {/* Logos - pinned to top */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-16 sm:pt-20 px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <img
            src="/images/build-for-bharat/plivo-logo.svg"
            alt="Plivo"
            className="h-5 sm:h-7 lg:h-8 w-auto"
          />
          <img
            src="/images/build-for-bharat/ai-summit-logo.svg"
            alt="AI Impact Summit India 2026"
            className="h-8 sm:h-12 lg:h-14 w-auto"
          />
        </div>
      </div>


      {/* Content - vertically & horizontally centered */}
      <div className="relative z-50 flex flex-col items-center justify-center h-full px-5 text-center">
        {/* Badge pill */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
          className="inline-flex items-center rounded-full border border-white/20 bg-background/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-300 backdrop-blur-sm mb-5 sm:mb-6 tracking-wide"
        >
          India AI Summit 2026
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0.5, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="font-sora text-[2.75rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-normal leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-6"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #323DFE 0%, #a0a8ff 25%, #ffffff 50%, #a0a8ff 75%, #323DFE 100%)",
            }}
          >
            Built for Bharat
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
          className="text-base sm:text-xl md:text-2xl text-gray-200 font-light mb-8 sm:mb-12 px-4"
        >
          100% extra credits on every recharge. Feb 16-20 only.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
          className="mb-8 sm:mb-14"
        >
          <a
            href={signupUrl}
            {...(signupUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-background text-foreground rounded-lg hover:bg-muted transition-all duration-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
          >
            {signupLabel}
          </a>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
          className="text-sm sm:text-base lg:text-lg text-white max-w-2xl mx-auto leading-relaxed px-4"
        >
          Sign up during India AI Summit week and we'll match every recharge you
          make. No code. No limits. Applied automatically.
        </motion.p>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-white/60">
            <path d="M2 2L10 10L18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-white/30">
            <path d="M2 2L10 10L18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
