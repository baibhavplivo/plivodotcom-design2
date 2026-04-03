"use client";

import { customerLogos } from "@/data/navigation";
import { Globe } from "@/components/ui/globe";

import {
  Sparkles,
  MessageSquareText,
  Phone,
  ArrowRight,
  Hash,
  Network,
  Pencil,
  Briefcase,
} from "lucide-react";

const stats = [
  { value: "2011", label: "Founded" },
  { value: "2015", label: "Profitable since" },
  { value: "1B+", label: "API requests / month" },
  { value: "190+", label: "Countries served" },
];

const investors = [
  { name: "Y Combinator", logo: "/images/investors/yc.svg" },
  { name: "Battery Ventures", logo: "/images/investors/battery.svg" },
  { name: "Andreessen Horowitz", logo: "/images/investors/a16z.svg" },
  { name: "Qualcomm Ventures", logo: "/images/investors/qualcomm.svg" },
];

const stackLayers = [
  {
    title: "AI Agent Platform",
    desc: "Built on top of our infrastructure, the AI Agent Platform empowers businesses to create AI agents that understand, act, and deliver results at scale.",
    products: [
      { name: "AI Agent Platform", icon: Sparkles, href: "/ai/" },
    ],
  },
  {
    title: "API Suite",
    desc: "Our API platform enables web and mobile apps to integrate messaging and voice functionality and engage with customers programmatically.",
    products: [
      {
        name: "Messaging API",
        icon: MessageSquareText,
        href: "",
        sub: [
          { label: "SMS", href: "/sms/overview/" },
          { label: "WhatsApp Message", href: "/whatsapp-message/overview/" },
          { label: "RCS", href: "/rcs/" },
        ],
      },
      {
        name: "Voice API",
        icon: Phone,
        href: "",
        sub: [
          { label: "Voice Call", href: "/voice/overview/" },
          { label: "WhatsApp Call", href: "/whatsapp-call/pricing/" },
        ],
      },
    ],
  },
  {
    title: "Carrier Network",
    desc: "At our core is a cloud-based carrier network that provides connectivity to 190+ countries globally.",
    products: [
      { name: "SIP Trunking", icon: Network, href: "/sip-trunking/" },
      { name: "Phone Numbers", icon: Hash, href: "/virtual-phone-numbers/" },
    ],
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
      <section className="relative overflow-hidden bg-white pb-12 lg:pb-16">
        {/* Dotted Grid - behind the entire section */}
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />

        {/* Side fades over the grid */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 z-[2] bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 z-[2] bg-gradient-to-l from-white to-transparent" />
        {/* Top/bottom fades */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-12 z-[2] bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 z-[2] bg-gradient-to-t from-white to-transparent" />

        <div className="container relative z-[5] mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
            {/* Globe - right side, cropped */}
            <div className="absolute -right-28 top-1/2 hidden lg:block z-[1]" style={{ transform: 'translateY(-50%)' }}>
              <Globe
                size={400}
                baseColor={[0.95, 0.95, 0.97]}
                glowColor={[0.9, 0.9, 0.95]}
                markerColor={[0.2, 0.24, 1]}
                opacity={0.35}
                interactive={true}
              />
            </div>

            {/* Stats Grid - ends before the globe on lg */}
            <div className="relative z-[3] grid grid-cols-2 lg:grid-cols-4 lg:mr-[220px]">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center px-4 py-8 sm:py-10 md:py-12 ${
                    index % 2 === 0 ? "border-r border-gray-200" : ""
                  } ${
                    index % 2 !== 0 && index < stats.length - 1 ? "lg:border-r lg:border-gray-200" : ""
                  } ${index >= 2 ? "border-t lg:border-t-0 border-gray-200" : ""}`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - Marquee */}
      <section className="bg-white pb-12 lg:pb-16 relative overflow-hidden">
        <style>{`
          .about-marquee-content {
            animation: about-marquee 30s linear infinite;
          }
          .about-marquee-container:hover .about-marquee-content {
            animation-play-state: paused;
          }
          @keyframes about-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-center mb-6">
            Trusted by industry leaders
          </p>
        </div>
        <div className="about-marquee-container max-w-[1400px] mx-auto overflow-hidden">
          <div className="about-marquee-content flex gap-8 sm:gap-16 items-center">
            {[...customerLogos, ...customerLogos].map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="flex-shrink-0">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 w-auto grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </section>

      {/* Enterprise Stack */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Enterprise-grade engagement stack
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto text-center mb-8">
            Three layers, one unified mission: making customer engagement effortless.
          </p>

          <div className="space-y-3">
            {stackLayers.map((layer) => (
              <div
                key={layer.title}
                className="grid gap-4 lg:grid-cols-[1fr_1fr] items-center rounded-lg border border-gray-200 bg-white px-5 py-4 sm:px-6 sm:py-5"
              >
                {/* Left: Product cards */}
                <div className="space-y-2">
                  {layer.products.map((product) => {
                    const Icon = product.icon;
                    const hasSub = "sub" in product && product.sub;
                    const Wrapper = hasSub ? "div" : "a";
                    return (
                      <Wrapper
                        key={product.name}
                        {...(!hasSub ? { href: product.href } : {})}
                        className={`flex items-center gap-2.5 rounded-md bg-gray-50 px-3 py-2.5 transition-colors ${!hasSub ? "group hover:bg-gray-100" : ""}`}
                      >
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-white border border-gray-200">
                          <Icon className="h-3.5 w-3.5 text-[#323dfe]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-black">{product.name}</span>
                            {!hasSub && <ArrowRight className="h-3 w-3 text-gray-400 transition-transform group-hover:translate-x-0.5" />}
                          </div>
                          {hasSub && (
                            <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 mt-0.5">
                              {(product.sub as { label: string; href: string }[]).map((s) => (
                                <a key={s.label} href={s.href} className="text-xs text-gray-400 hover:text-[#323dfe] transition-colors">
                                  {s.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>

                {/* Right: Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-black mb-1">
                    {layer.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Backed by the best
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto text-center mb-8">
            Profitable since 2015, backed by leading venture capital firms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {investors.map((inv) => (
              <div
                key={inv.name}
                className="flex items-center justify-center bg-gray-50 rounded-lg p-6"
              >
                <img
                  src={inv.logo}
                  alt={inv.name}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Our offices
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto text-center mb-8">
            A 100+ person team spanning two countries.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {offices.map((office) => (
              <div
                key={office.country}
                className="rounded-lg border border-gray-200 p-5 text-center"
              >
                <div className="text-3xl mb-2">{office.flag}</div>
                <h3 className="font-inter text-base font-semibold text-black">
                  {office.country}
                </h3>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/jobs/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors"
            >
              See open positions
            </a>
          </div>
        </div>
      </section>

      {/* Connect with us */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Connect with us
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto text-center mb-8">
            Whether it's sales, support, press, or legal inquiries - we're here to help.
          </p>

          {/* Contact grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-inter text-base font-semibold text-black mb-1.5">Sales</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                For all product, coverage, and pricing-related inquiries
              </p>
              <a href="/contact/sales/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors">
                Contact Sales <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-inter text-base font-semibold text-black mb-1.5">Support</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                For technical answers, or to create a ticket
              </p>
              <a href="https://support.plivo.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors">
                Contact Support <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-inter text-base font-semibold text-black mb-1.5">Press</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                For PR and media inquiries, please email us at
              </p>
              <a href="mailto:press@plivo.com" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors">
                press@plivo.com <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-inter text-base font-semibold text-black mb-1.5">Legal</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                For legal queries, please email us at
              </p>
              <a href="mailto:legalrequests@plivo.com" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors">
                legalrequests@plivo.com <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Bottom cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-6 flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                <Pencil className="h-4 w-4 text-[#323dfe]" />
              </div>
              <div>
                <h3 className="font-inter text-sm font-semibold text-black mb-1">
                  Interested in writing about Plivo?
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-2">
                  We've put together some guidelines, tips, and information to help you along.
                </p>
                <a href="/brand/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors">
                  View Brand Guidelines <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                <Briefcase className="h-4 w-4 text-[#323dfe]" />
              </div>
              <div>
                <h3 className="font-inter text-sm font-semibold text-black mb-1">
                  Come join our global team
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-2">
                  We're always looking for great talent to join our team.
                </p>
                <a href="/jobs/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#323dfe] hover:text-[#2a34d6] transition-colors">
                  View Current Openings <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
