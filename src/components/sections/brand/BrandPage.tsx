"use client";

import { Download } from "lucide-react";

const LOGO_VARIANTS = [
  { name: "Primary Logo", desc: "Full-color logo on white", bg: "bg-white", file: "plivo-logo-primary.svg", full: true },
  { name: "Logo on Dark", desc: "White logo for dark backgrounds", bg: "bg-[#0f1117]", file: "plivo-logo-white.svg", dark: true, full: true },
  { name: "Logo Symbol", desc: "Icon mark on white", bg: "bg-white", file: "plivo-symbol.svg" },
  { name: "Symbol on Dark", desc: "Icon mark for dark backgrounds", bg: "bg-[#0f1117]", file: "plivo-symbol-white.svg", dark: true },
];

const BRAND_COLORS = [
  { name: "Plivo Purple", hex: "#cd3ef9", text: "text-white" },
  { name: "Plivo Blue", hex: "#323dfe", text: "text-white" },
  { name: "Dark", hex: "#0f1117", text: "text-white" },
  { name: "White", hex: "#ffffff", text: "text-gray-900", border: true },
  { name: "Gray 50", hex: "#f9fafb", text: "text-gray-900", border: true },
];

const FONT_WEIGHTS = ["Light", "Regular", "Semibold", "Bold"];

export default function BrandPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
            Brand Guidelines
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            A guide to Plivo's visual identity standards. Use these resources to
            represent Plivo consistently across all media.
          </p>
          <a
            href="mailto:marketing@plivo.com"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors"
          >
            Questions? Email marketing@plivo.com
          </a>
        </div>
      </section>

      {/* Logo Usage */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-2xl sm:text-3xl font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Logo
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">
            These logos are the trademarked property of Plivo, Inc. Avoid using
            our name, logo, or screenshots in a manner that may be confusing,
            misleading, or suggests sponsorship, endorsement, or partnership
            with Plivo. Do not alter the logo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {LOGO_VARIANTS.map((v) => (
              <div key={v.name} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className={`${v.bg} flex items-center justify-center h-44 p-6`}>
                  <img
                    src={`/images/brand/${v.file}`}
                    alt={v.name}
                    className={`${v.full ? "max-h-16" : "max-h-10"} w-auto`}
                    loading="lazy"
                  />
                </div>
                <div className="bg-white p-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-black">{v.name}</p>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Do's and Don'ts */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-5">
              <h3 className="font-inter text-sm font-semibold text-green-800 mb-3">Do</h3>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">&#10003;</span>
                  Use the official logo files provided
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">&#10003;</span>
                  Maintain adequate clear space around the logo
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">&#10003;</span>
                  Use the dark version on light backgrounds and vice versa
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-5">
              <h3 className="font-inter text-sm font-semibold text-red-800 mb-3">Don't</h3>
              <ul className="space-y-2 text-sm text-red-900">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">&#10007;</span>
                  Alter, rotate, or distort the logo in any way
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">&#10007;</span>
                  Change the logo colors or add effects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">&#10007;</span>
                  Use the logo to imply sponsorship or endorsement
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-2xl sm:text-3xl font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Brand Colors
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">
            Our primary palette uses bold, confident colors that reflect
            Plivo's modern identity.
          </p>

          {/* Gradient bar */}
          <div className="rounded-lg overflow-hidden mb-6 h-16" style={{ background: "linear-gradient(90deg, #cd3ef9, #323dfe)" }}>
            <div className="h-full flex items-center justify-between px-6">
              <span className="text-white text-sm font-medium tracking-wide">#cd3ef9</span>
              <span className="text-white text-sm font-medium tracking-wide">Plivo Gradient</span>
              <span className="text-white text-sm font-medium tracking-wide">#323dfe</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BRAND_COLORS.map((c) => (
              <div key={c.name} className="rounded-lg overflow-hidden border border-gray-200">
                <div
                  className={`h-20 flex items-end p-3 ${c.text}`}
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="text-xs font-medium opacity-90">{c.hex}</span>
                </div>
                <div className="bg-white p-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-black">{c.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-2xl sm:text-3xl font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Typography
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">
            Plivo uses two carefully selected typefaces for a clean, balanced
            aesthetic across all communications.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Sora */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-sora text-3xl font-normal text-black mb-1">Sora</h3>
              <p className="text-sm text-gray-500 mb-4">Display / Headlines</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                A display-oriented sans-serif font designed with modernity and
                confidence. Used for all headers across brand communications.
              </p>
              <div className="flex flex-wrap gap-2">
                {FONT_WEIGHTS.map((w) => (
                  <span key={w} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                    {w}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="font-sora text-2xl font-light text-black leading-tight">
                  Aa Bb Cc Dd Ee
                </p>
                <p className="font-sora text-sm text-gray-500 mt-2">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
              </div>
            </div>

            {/* Inter */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-inter text-3xl font-normal text-black mb-1">Inter</h3>
              <p className="text-sm text-gray-500 mb-4">Body Text / UI</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                A versatile, highly legible sans-serif typeface optimized for
                digital interfaces. Used for body copy and long-form content.
              </p>
              <div className="flex flex-wrap gap-2">
                {FONT_WEIGHTS.map((w) => (
                  <span key={w} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                    {w}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="font-inter text-2xl font-light text-black leading-tight">
                  Aa Bb Cc Dd Ee
                </p>
                <p className="font-inter text-sm text-gray-500 mt-2">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Icons */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-2xl sm:text-3xl font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Product Icons
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">
            Simple, geometric icon set designed for product and feature
            communication. Icons use consistent stroke widths and rounded
            corners for a unified look.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Voice", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
              { label: "SMS", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
              { label: "WhatsApp", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" },
              { label: "AI Agents", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { label: "SIP Trunking", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
              { label: "Verify", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-4 flex flex-col items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                  <svg className="h-5 w-5 text-[#323dfe]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads / Contact */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-sora text-2xl sm:text-3xl font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Downloads
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Download our logo kit and brand book for use in press, partnerships,
            and co-marketing materials.
          </p>
          <div className="flex justify-center">
            <a
              href="https://drive.google.com/file/d/1S_CH5okXH1eMYSilV6mbQNDfCaGPvOC7/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white cta-hover-gradient transition-colors"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Brand Kit
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            For logo usage questions, contact{" "}
            <a href="mailto:marketing@plivo.com" className="text-[#323dfe] hover:text-[#2a34d6]">
              marketing@plivo.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
