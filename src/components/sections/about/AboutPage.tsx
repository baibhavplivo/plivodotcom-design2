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
      <section className="relative w-full overflow-hidden bg-background border-t border-border">
        <div className="pointer-events-none absolute inset-0 dev-grid-bg opacity-[0.3] [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)]" />
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-12 sm:pt-14 md:pt-20">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="tabular-nums text-foreground/70">~</span>
              <span className="h-px w-6 bg-border" />
            </span>
            <span>about plivo</span>
            <span className="flex-1 border-t border-dashed border-border" />
            <span>founded 2011 · profitable since 2015</span>
          </div>
          <div className="mt-10 max-w-3xl">
            <h1 className="font-sora text-[2.25rem] font-normal leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[3rem] md:text-[3.5rem]">
              Our mission is to simplify <span className="[text-decoration-line:underline] decoration-primary/25 [text-decoration-thickness:0.14em] [text-underline-offset:0.12em]">customer engagement</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Plivo is transforming how businesses communicate with their customers by merging AI with enterprise-grade infrastructure. From autonomous communication agents to global messaging and voice APIs, we power billions of interactions every month.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden border-t border-border bg-background pb-12 lg:pb-16 pt-12 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 dev-grid-bg-fine opacity-[0.35] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

        <div className="container relative z-[5] mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-lg border border-border bg-background">
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
                    index % 2 === 0 ? "border-r border-border" : ""
                  } ${
                    index % 2 !== 0 && index < stats.length - 1 ? "lg:border-r lg:border-border" : ""
                  } ${index >= 2 ? "border-t lg:border-t-0 border-border" : ""}`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - Marquee */}
      <section className="bg-background border-t border-border pb-12 lg:pb-16 relative overflow-hidden">
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
          <p className="text-xs font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em] mb-6">
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
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </section>

      {/* Enterprise Stack */}
      <section className="bg-background border-t border-border py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>about page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-3">
            Enterprise-grade engagement stack
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mb-8">
            Three layers, one unified mission: making customer engagement effortless.
          </p>

          <div className="space-y-3">
            {stackLayers.map((layer) => (
              <div
                key={layer.title}
                className="grid gap-4 lg:grid-cols-[1fr_1fr] items-center rounded-lg border border-border bg-background px-5 py-4 sm:px-6 sm:py-5"
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
                        className={`flex items-center gap-2.5 rounded-md bg-surface px-3 py-2.5 transition-colors ${!hasSub ? "group hover:bg-muted" : ""}`}
                      >
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-background border border-border">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-foreground">{product.name}</span>
                            {!hasSub && <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />}
                          </div>
                          {hasSub && (
                            <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 mt-0.5">
                              {(product.sub as { label: string; href: string }[]).map((s) => (
                                <a key={s.label} href={s.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
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
                  <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">
                    {layer.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="bg-background border-t border-border py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>about page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-3">
            Backed by the best
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-8">
            Profitable since 2015, backed by leading venture capital firms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {investors.map((inv) => (
              <div
                key={inv.name}
                className="flex items-center justify-center bg-surface rounded-lg p-6"
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
      <section className="bg-background border-t border-border py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>about page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-3">
            Our offices
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-8">
            A 100+ person team spanning two countries.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {offices.map((office) => (
              <div
                key={office.country}
                className="rounded-lg border border-border p-5 text-center"
              >
                <div className="text-3xl mb-2">{office.flag}</div>
                <h3 className="font-inter text-base font-semibold text-foreground">
                  {office.country}
                </h3>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/jobs/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md border border-border-strong text-foreground hover:bg-surface transition-colors"
            >
              See open positions
            </a>
          </div>
        </div>
      </section>

      {/* Connect with us */}
      <section className="bg-background border-t border-border py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>about page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-3">
            Connect with us
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-8">
            Whether it's sales, support, press, or legal inquiries - we're here to help.
          </p>

          {/* Contact grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-lg border border-border p-5">
              <h3 className="font-inter text-base font-semibold text-foreground mb-1.5">Sales</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                For all product, coverage, and pricing-related inquiries
              </p>
              <a href="/contact/sales/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors">
                Contact Sales <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-inter text-base font-semibold text-foreground mb-1.5">Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                For technical answers, or to create a ticket
              </p>
              <a href="https://support.plivo.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors">
                Contact Support <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-inter text-base font-semibold text-foreground mb-1.5">Press</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                For PR and media inquiries, please email us at
              </p>
              <a href="mailto:press@plivo.com" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors">
                press@plivo.com <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-inter text-base font-semibold text-foreground mb-1.5">Legal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                For legal queries, please email us at
              </p>
              <a href="mailto:legalrequests@plivo.com" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors">
                legalrequests@plivo.com <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Bottom cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-surface p-6 flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-background border border-border">
                <Pencil className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-inter text-sm font-semibold text-foreground mb-1">
                  Interested in writing about Plivo?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  We've put together some guidelines, tips, and information to help you along.
                </p>
                <a href="/brand/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors">
                  View Brand Guidelines <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-surface p-6 flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-background border border-border">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-inter text-sm font-semibold text-foreground mb-1">
                  Come join our global team
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  We're always looking for great talent to join our team.
                </p>
                <a href="/jobs/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors">
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
