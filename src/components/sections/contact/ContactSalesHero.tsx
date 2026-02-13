"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { customerLogos } from "@/data/navigation";

const VALUE_PROPS = [
  {
    title: "Whiteglove onboarding",
    description: "Dedicated account manager to get you live fast",
  },
  {
    title: "Volume discounts",
    description: "Tiered pricing for committed monthly volumes",
  },
  {
    title: "Custom AI Agents",
    description: "Agents designed and tuned for your use case",
  },
  {
    title: "Enterprise reliability",
    description: "99.99% uptime SLA with 24/7 support",
  },
];

const USE_CASE_OPTIONS = [
  "AI Agents",
  "Reseller / Solutions Provider",
  "Alerts & Notifications",
  "Marketing",
  "Customer Service",
  "2FA / OTP Verifications",
  "Other",
];

const COMPLIANCE_BADGES = [
  { src: "/images/compliance/HIPAA black.svg", alt: "HIPAA", label: "HIPAA" },
  { src: "/images/compliance/GDPR black.svg", alt: "GDPR", label: "GDPR" },
  { src: "/images/compliance/AICPA black.svg", alt: "SOC 2", label: "SOC 2" },
  { src: "/images/compliance/PCI black.svg", alt: "PCI DSS", label: "PCI DSS" },
  { src: "/images/compliance/Star Black.svg", alt: "STAR", label: "STAR" },
];

export default function ContactSalesHero() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <h1 className="font-sora text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
              Talk to Sales
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-lg">
              Connect with our experts to design the right solution for your
              business - from pricing and compliance to AI Agent setup tailored
              to your use case.
            </p>

            {/* Value Props */}
            <div className="mt-8 space-y-3">
              {VALUE_PROPS.map((prop) => (
                <div key={prop.title} className="flex items-start gap-2.5">
                  <svg
                    className="w-4 h-4 text-[#323dfe] mt-[1px] flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <span className="text-sm font-semibold text-black">
                      {prop.title}
                    </span>
                    <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">
                      {prop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Badges */}
            <div className="mt-10">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Compliance & Security
              </p>
              <div className="flex items-center gap-6 sm:gap-8">
                {COMPLIANCE_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center gap-1"
                  >
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      className="h-7 sm:h-9 w-auto opacity-60"
                    />
                    <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted By Logos */}
            <div className="mt-10">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Trusted by leading brands worldwide
              </p>
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                {customerLogos.slice(0, 6).map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="h-4 sm:h-[18px] w-auto opacity-40 grayscale"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-1 lg:order-2 max-w-md lg:ml-auto">
            <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5 sm:p-6">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-sora text-lg font-normal text-black">
                    Thank you!
                  </h3>
                  <p className="text-sm text-gray-500 mt-1.5 max-w-xs mx-auto">
                    Our sales team will get back to you within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="text-[13px] font-medium text-gray-700 mb-1 block"
                    >
                      Full Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="First and last name"
                      required
                      className="h-10 text-sm border-gray-300 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-[13px] font-medium text-gray-700 mb-1 block"
                    >
                      Work Email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="h-10 text-sm border-gray-300 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-[13px] font-medium text-gray-700 mb-1 block"
                    >
                      Phone Number <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      required
                      className="h-10 text-sm border-gray-300 hover:border-gray-400"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="usecase"
                      className="text-[13px] font-medium text-gray-700 mb-1 block"
                    >
                      Use Case <span className="text-red-400">*</span>
                    </Label>
                    <Select name="usecase" required>
                      <SelectTrigger className="h-10 text-sm border-gray-300 hover:border-gray-400">
                        <SelectValue placeholder="Select a use case" />
                      </SelectTrigger>
                      <SelectContent>
                        {USE_CASE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="requirement"
                      className="text-[13px] font-medium text-gray-700 mb-1 block"
                    >
                      Detailed Requirement{" "}
                      <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="requirement"
                      name="requirement"
                      placeholder="Tell us about your project, expected volumes, and timeline..."
                      required
                      className="min-h-[88px] text-sm resize-none border-gray-300 hover:border-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    Submit
                  </button>

                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                    By submitting, you agree to our{" "}
                    <a
                      href="/legal/tos/"
                      className="underline hover:text-gray-600"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/legal/privacy/"
                      className="underline hover:text-gray-600"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
