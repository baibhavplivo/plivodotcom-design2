"use client";

import { customerLogos } from "@/data/navigation";

const stats = [
  { value: "2011", label: "Founded" },
  { value: "2015", label: "Profitable since" },
  { value: "1B+", label: "API requests / month" },
  { value: "190+", label: "Countries served" },
];

const investors = [
  { name: "Andreessen Horowitz", initials: "a16z" },
  { name: "Battery Ventures", initials: "BV" },
  { name: "Qualcomm Ventures", initials: "QV" },
  { name: "Y Combinator", initials: "YC" },
];

const stackItems = [
  {
    title: "AI agent platform",
    desc: "Autonomous agents built on enterprise-grade infrastructure that understand, act, and deliver outcomes at scale.",
  },
  {
    title: "Messaging APIs",
    desc: "SMS, WhatsApp, and RCS messaging APIs serving organizations globally through premium carrier networks.",
  },
  {
    title: "Voice APIs",
    desc: "Voice calls and WhatsApp calls with connectivity in 190+ countries for reliable communications.",
  },
  {
    title: "Supporting services",
    desc: "SIP Trunking (Zentrunk), phone numbers, and carrier network infrastructure powering global reach.",
  },
];

const offices = [
  {
    country: "United States",
    flag: "🇺🇸",
    detail: "Headquarters",
  },
  {
    country: "India",
    flag: "🇮🇳",
    detail: "Engineering & operations",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-16 sm:pt-20 md:pt-24 pb-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-5">
            Our mission is to simplify
            <br className="hidden sm:block" />
            {" "}customer engagement
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Plivo is transforming how businesses communicate with their customers by merging AI with enterprise-grade infrastructure. From autonomous communication agents to global messaging and voice APIs, we power billions of interactions every month.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white pb-12 lg:pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-lg p-5 text-center"
              >
                <div className="font-sora text-2xl sm:text-3xl font-semibold text-black mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="bg-white pb-12 lg:pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-center mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {customerLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-5 sm:h-6 w-auto opacity-40 grayscale"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Two Divisions */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4">
            Enterprise-grade stack
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto text-center mb-10">
            Two platforms, one unified mission: making customer engagement effortless.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {stackItems.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h3 className="font-inter text-base font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Backed by the best
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto text-center mb-8">
            Profitable since 2015, backed by leading venture capital firms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {investors.map((inv) => (
              <div
                key={inv.name}
                className="bg-gray-50 rounded-lg p-5 text-center"
              >
                <div className="font-sora text-lg font-semibold text-[#323dfe] mb-1">
                  {inv.initials}
                </div>
                <div className="text-xs text-gray-600">{inv.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Our offices
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto text-center mb-8">
            A 100+ person team spanning two countries.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {offices.map((office) => (
              <div
                key={office.country}
                className="bg-white rounded-lg border border-gray-200 p-5 text-center"
              >
                <div className="text-3xl mb-2">{office.flag}</div>
                <h3 className="font-inter text-base font-semibold text-black">
                  {office.country}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{office.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Get in touch
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Whether it's sales, support, press, or legal inquiries — we're here to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/contact/sales/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Contact sales
            </a>
            <a
              href="/jobs/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors"
            >
              View open roles
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span>Press: <a href="mailto:press@plivo.com" className="text-[#323dfe] hover:underline">press@plivo.com</a></span>
            <span>Legal: <a href="mailto:legalrequests@plivo.com" className="text-[#323dfe] hover:underline">legalrequests@plivo.com</a></span>
          </div>
        </div>
      </section>
    </>
  );
}
