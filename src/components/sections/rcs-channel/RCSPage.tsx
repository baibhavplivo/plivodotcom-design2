"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Image,
  MousePointerClick,
  ShieldCheck,
  PackageCheck,
  CreditCard,
  BarChart3,
  Sparkles,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

import DOMPurify from "isomorphic-dompurify";

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["a", "strong", "em", "br"], ALLOWED_ATTR: ["href", "target", "rel"] });
}
import { useGeoCountry } from "@/hooks/useGeoCountry";
import PreFooterCTA from "@/components/sections/voice-homepage/PreFooterCTA";


// ── RCS Phone Illustration ──────────────────────────────────────────────────
function RCSPhoneIllustration() {
  return (
    <div className="relative flex justify-center">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, hsl(var(--background)) 70%)",
            }}
          />
        </div>
      </div>

      {/* Phone container */}
      <div className="relative h-[520px] sm:h-[560px] overflow-hidden">
        <div className="w-[288px] sm:w-[320px]">
          {/* Phone outer frame */}
          <div
            className="relative rounded-[36px] p-1.5 border border-border-strong bg-muted"
          >

            {/* Screen */}
            <div className="relative rounded-[30px] overflow-hidden bg-background shadow-inner">
              {/* Status bar */}
              <div className="h-7 bg-muted flex items-center justify-between px-5 text-xs font-medium rounded-t-[30px]">
                <div className="flex items-center gap-1 opacity-50">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-foreground" />
                    <span className="w-1 h-1 rounded-full bg-foreground" />
                    <span className="w-1 h-1 rounded-full bg-foreground" />
                    <span className="w-1 h-1 rounded-full bg-foreground" />
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                  </div>
                  <span className="ml-1 text-foreground">Plivo</span>
                </div>
                <span className="text-foreground opacity-50">9:41 AM</span>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="text-foreground text-[10px]">100%</span>
                  <div className="w-5 h-2.5 rounded-sm bg-foreground" />
                </div>
              </div>

              {/* Chat Header - Branded Sender */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="url(#cartGradient)" strokeWidth={1.5}>
                    <defs>
                      <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#323dfe" />
                        <stop offset="100%" stopColor="#323dfe" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V4.125A1.125 1.125 0 014.125 3h15.75A1.125 1.125 0 0121 4.125V9.35" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">StyleCart</span>
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">Verified business</span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="px-3 pt-3 pb-4 min-h-[440px] bg-surface space-y-3">
                {/* Rich Card - Product Promotion */}
                <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border max-w-[260px]">
                  {/* Product image - actual shoe photo */}
                  <div className="h-36 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)" }}>
                    <img
                      src="/images/shoe-product.jpg"
                      alt="Summer collection sneaker"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background shadow-sm flex items-center justify-center">
                      <span className="text-[7px] font-bold text-indigo-600">NEW</span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground mb-1">Summer collection is here!</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Free shipping on orders over $50
                    </p>
                  </div>
                  {/* Card actions */}
                  <div className="border-t border-border flex">
                    <button className="flex-1 py-2 text-[11px] font-semibold text-primary">
                      Shop now
                    </button>
                    <div className="w-px bg-muted" />
                    <button className="flex-1 py-2 text-[11px] font-semibold text-primary">
                      View all
                    </button>
                  </div>
                </div>

                {/* Suggested Replies */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-3 py-1.5 rounded-full border border-border-strong text-[11px] font-medium text-foreground/80 bg-background">
                    View deals
                  </span>
                  <span className="px-3 py-1.5 rounded-full border border-border-strong text-[11px] font-medium text-foreground/80 bg-background">
                    Track order
                  </span>
                </div>

                {/* Delivery update message */}
                <div className="bg-background rounded-xl p-3 shadow-sm border border-border max-w-[260px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <p className="text-[11px] font-medium text-foreground">Order shipped!</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Your order #4829 is on its way. Arriving Feb 18.</p>
                  <button className="mt-2 w-full py-1.5 rounded-lg border border-border text-[10px] font-medium text-foreground/80">
                    Track shipment
                  </button>
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-7 bg-surface flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-foreground/$1" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 20%, hsl(var(--background) / 0.9) 50%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function RCSHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dev-grid-bg opacity-[0.3] [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)]" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-20 md:pt-20 md:pb-24">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>rcs api</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>rich messaging · verified brands · carrier-native</span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="font-sora text-[2.25rem] font-normal leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[3rem] md:text-[3.5rem]">
              The future of <span className="[text-decoration-line:underline] decoration-primary/25 [text-decoration-thickness:0.14em] [text-underline-offset:0.12em]">messaging: RCS API</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Connect with customers like never before. Deliver interactive, branded messages that boost engagement and drive conversions, all with our RCS APIs.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/contact/sales/"
                className="group inline-flex items-center rounded-md bg-foreground px-4 py-2.5 text-[13.5px] font-medium text-background transition-colors hover:bg-primary hover:text-white"
              >
                Talk to sales
                <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href="/pricing/"
                className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
              >
                See pricing
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:max-w-lg">
              <div>
                <dt className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">cta types</dt>
                <dd className="mt-1 font-mono-ui text-xl font-semibold tabular-nums text-foreground">11<span className="text-muted-foreground text-sm">+</span></dd>
              </div>
              <div>
                <dt className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">media</dt>
                <dd className="mt-1 font-mono-ui text-xl font-semibold tabular-nums text-foreground">rich</dd>
              </div>
              <div>
                <dt className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">support</dt>
                <dd className="mt-1 font-mono-ui text-xl font-semibold tabular-nums text-foreground">24/7</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <RCSPhoneIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features grid ───────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: MessageSquare,
    title: "Branded messaging",
    description:
      "Make your conversations stand out with your logo and branding.",
  },
  {
    icon: Image,
    title: "Rich media",
    description:
      "Engage in visual storytelling with rich cards and carousels.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive elements",
    description:
      "Empower customers to act in real time with suggested actions and replies.",
  },
  {
    icon: ShieldCheck,
    title: "Verified sender",
    description:
      "Build trust by sending messages from a verified sender customers recognize.",
  },
];

function RCSFeatures() {
  return (
    <section className="bg-surface border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-12">
          Send richer, more rewarding messages with RCS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="bg-background rounded-lg border border-border p-6 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Use case illustrations ──────────────────────────────────────────────────
function RCSIllustrationWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative h-56 w-full rounded-xl overflow-hidden ${className || ""}`} style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full px-6 py-5 flex flex-col items-center justify-center">
        <div className="w-full max-w-[220px] flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

function ProductShowcaseIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-background rounded-lg overflow-hidden shadow-sm border border-border flex-1 flex flex-col">
        <div className="h-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
          <div className="absolute top-1.5 left-1.5 z-10 text-white text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: "linear-gradient(135deg, #323dfe, #000000)" }}>NEW</div>
          <img src="/images/shoe-product.jpg" alt="Product" className="w-full h-full object-cover" />
        </div>
        <div className="p-2.5 flex-1">
          <p className="text-[10px] font-semibold text-foreground">Summer collection is here!</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Free shipping on orders over $50</p>
        </div>
        <div className="border-t border-border flex">
          <button className="flex-1 py-1.5 text-[10px] font-semibold text-primary">Shop now</button>
          <div className="w-px bg-muted" />
          <button className="flex-1 py-1.5 text-[10px] font-semibold text-primary">View all</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <span className="px-2.5 py-1 rounded-full border border-border-strong text-[9px] font-medium text-muted-foreground bg-background">View deals</span>
        <span className="px-2.5 py-1 rounded-full border border-border-strong text-[9px] font-medium text-muted-foreground bg-background">Track order</span>
      </div>
    </RCSIllustrationWrapper>
  );
}

function AppointmentReminderIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-background rounded-lg shadow-sm border border-border flex flex-col p-3">
        <div className="flex items-start gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="url(#apptGradient)" strokeWidth={1.5}>
              <defs>
                <linearGradient id="apptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#323dfe" />
                  <stop offset="100%" stopColor="#323dfe" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-foreground">Appointment reminder</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Dr. Smith - Feb 18, 10:30 AM</p>
            <p className="text-[9px] text-primary/60 mt-0.5">Dental checkup &amp; cleaning</p>
          </div>
        </div>
        <div className="mt-auto flex gap-2">
          <button className="flex-1 py-2 rounded-lg bg-gray-800 text-white text-[10px] font-semibold">Confirm</button>
          <button className="flex-1 py-2 rounded-lg border border-border text-foreground/80 text-[10px] font-semibold">Reschedule</button>
        </div>
      </div>
    </RCSIllustrationWrapper>
  );
}

function TicketsPassesIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-background rounded-lg shadow-sm border border-border flex-1 flex flex-col overflow-hidden">
        <div className="px-3 py-2.5" style={{ background: "linear-gradient(135deg, rgba(205,62,249,0.1), rgba(50,61,254,0.12))" }}>
          <p className="text-[9px] font-bold text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Boarding pass</p>
          <div className="flex justify-between items-end mt-1.5">
            <div>
              <p className="text-[16px] font-bold text-foreground leading-none">SFO</p>
              <p className="text-[8px] text-muted-foreground">San Francisco</p>
            </div>
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
            <div className="text-right">
              <p className="text-[16px] font-bold text-foreground leading-none">NYC</p>
              <p className="text-[8px] text-muted-foreground">New York</p>
            </div>
          </div>
        </div>
        <div className="p-3 flex justify-between items-center border-b border-dashed border-border">
          <div>
            <p className="text-[8px] text-muted-foreground uppercase">Gate</p>
            <p className="text-[12px] font-bold text-foreground">B42</p>
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground uppercase">Seat</p>
            <p className="text-[12px] font-bold text-foreground">14A</p>
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground uppercase">Boards</p>
            <p className="text-[12px] font-bold text-foreground">9:15 AM</p>
          </div>
        </div>
        <div className="px-3 py-2 flex items-center justify-center">
          <div className="flex gap-px">
            {[3,1,2,1,3,1,1,2,1,3,1,2,1,1,3,2,1,1,3,1].map((w, i) => (
              <div key={i} className="bg-foreground" style={{ width: `${w}px`, height: "20px" }} />
            ))}
          </div>
        </div>
      </div>
    </RCSIllustrationWrapper>
  );
}

function OrderUpdatesIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-background rounded-lg shadow-sm border border-border flex-1 flex flex-col p-3">
        <p className="text-[11px] font-semibold text-foreground mb-2">Your order is on the way!</p>
        {/* Progress tracker */}
        <div className="flex items-center gap-1 mb-3">
          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <div className="flex-1 h-1 bg-primary rounded-full" />
          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <div className="flex-1 h-1 bg-primary rounded-full" />
          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-2 ring-blue-200">
            <PackageCheck className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="w-4 h-4 rounded-full bg-gray-200" />
        </div>
        <div className="flex justify-between text-[8px] text-muted-foreground mb-3">
          <span>Ordered</span>
          <span>Shipped</span>
          <span className="text-primary font-medium">Out for delivery</span>
          <span>Delivered</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-2 flex items-center gap-2 mt-auto">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
            <PackageCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-foreground">Order #82941</p>
            <p className="text-[9px] text-muted-foreground">Arriving today by 5 PM</p>
          </div>
        </div>
      </div>
    </RCSIllustrationWrapper>
  );
}

function CustomerSupportIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="flex-1 flex flex-col gap-2">
        <div className="max-w-[85%] self-start">
          <div className="bg-background rounded-xl rounded-bl-sm px-3 py-2 shadow-sm border border-border">
            <p className="text-[11px] text-foreground">Hi! How can I help you today?</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full border border-border text-[9px] font-medium text-foreground/80 bg-surface">Return an item</span>
          <span className="px-2.5 py-1 rounded-full border border-border text-[9px] font-medium text-foreground/80 bg-surface">Track order</span>
          <span className="px-2.5 py-1 rounded-full border border-border text-[9px] font-medium text-foreground/80 bg-surface">Billing help</span>
        </div>
        <div className="max-w-[85%] self-end">
          <div className="rounded-xl rounded-br-sm px-3 py-2" style={{ background: "linear-gradient(135deg, #323dfe, #4f5aff)" }}>
            <p className="text-[11px] text-white">I'd like to return an item</p>
          </div>
        </div>
        <div className="max-w-[85%] self-start">
          <div className="bg-background rounded-xl rounded-bl-sm px-3 py-2 shadow-sm border border-border">
            <p className="text-[11px] text-foreground">Sure! Please share your order number and I'll get that started.</p>
          </div>
        </div>
      </div>
    </RCSIllustrationWrapper>
  );
}

// ── Use cases ───────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    title: "Showcase your product offerings",
    description:
      "Let customers browse and shop your products without leaving the conversation.",
    tags: ["Rich cards", "Carousels", "Action buttons"],
    illustration: <ProductShowcaseIllustration />,
  },
  {
    title: "Send interactive appointment reminders",
    description:
      "Empower customers to confirm or reschedule with just one tap.",
    tags: ["Suggested actions", "Quick replies"],
    illustration: <AppointmentReminderIllustration />,
  },
  {
    title: "Deliver tickets and passes",
    description:
      "Offer easy access to scannable tickets and boarding passes.",
    tags: ["Rich media", "Branded sender"],
    illustration: <TicketsPassesIllustration />,
  },
  {
    title: "Send rich order updates",
    description:
      "Keep customers up-to-date on their orders with visual order details.",
    tags: ["Progress tracking", "Real-time updates"],
    illustration: <OrderUpdatesIllustration />,
  },
  {
    title: "Automate customer support",
    description: "Resolve issues quickly with intelligent chatbot flows.",
    tags: ["Suggested replies", "Chatbot flows"],
    illustration: <CustomerSupportIllustration />,
  },
];

function RCSUseCases() {
  return (
    <section className="bg-background border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          Real-world applications, powered by RCS
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-12">
          From product showcases to customer support, RCS transforms how you
          engage with customers.
        </p>
        <div className="grid gap-x-6 gap-y-14 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase, i) => (
            <div key={i} className="group">
              <div className="mb-4 overflow-hidden rounded-xl border border-border transition-all">
                {useCase.illustration}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {useCase.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Benefits ────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: CreditCard,
    title: "Pay on delivery",
    description:
      "You only pay for messages that successfully reach your customers.",
  },
  {
    icon: BarChart3,
    title: "Track reads & clicks",
    description:
      "Get actionable insights with read receipts and click-through data.",
  },
  {
    icon: Sparkles,
    title: "Interactive messaging functions",
    description:
      "Enable rich interactions with action buttons, quick replies, and carousels.",
  },
  {
    icon: BadgeCheck,
    title: "Branded & verified sender",
    description:
      "Build trust with branded and verified sender profiles.",
  },
];

function RCSBenefits() {
  return (
    <section className="bg-surface border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-12">
          Benefits of RCS over SMS
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className="bg-background rounded-lg border border-border p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Early access form (Talk to Sales style) ─────────────────────────────────
const RCS_COUNTRY_CODES = [
  { code: "US", dial: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States", digits: [10, 10] },
  { code: "GB", dial: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom", digits: [10, 10] },
  { code: "IN", dial: "+91", flag: "\u{1F1EE}\u{1F1F3}", name: "India", digits: [10, 10] },
  { code: "CA", dial: "+1", flag: "\u{1F1E8}\u{1F1E6}", name: "Canada", digits: [10, 10] },
  { code: "AU", dial: "+61", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia", digits: [9, 9] },
  { code: "DE", dial: "+49", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany", digits: [10, 11] },
  { code: "FR", dial: "+33", flag: "\u{1F1EB}\u{1F1F7}", name: "France", digits: [9, 9] },
  { code: "BR", dial: "+55", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil", digits: [10, 11] },
  { code: "JP", dial: "+81", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan", digits: [10, 10] },
  { code: "SG", dial: "+65", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore", digits: [8, 8] },
];

const RCS_STATS = [
  { value: "70%", label: "of users are more likely to communicate with brands via RCS" },
  { value: "900M+", label: "people worldwide are using RCS" },
  { value: "35x", label: "higher open rate than email" },
];

function RCSEarlyAccess() {
  const { country } = useGeoCountry("US");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const selectedCode = countryCode ?? (RCS_COUNTRY_CODES.find(c => c.code === country) ? country : "US");
  const selectedCodeRef = useRef(selectedCode);
  selectedCodeRef.current = selectedCode;

  useEffect(() => {
    const el = document.getElementById("rcs-country-select") as HTMLSelectElement | null;
    if (el) el.value = selectedCode;
  }, [selectedCode]);

  // Native DOM events for Astro hydration compatibility
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const timer = setTimeout(() => {
      const submitBtn = document.getElementById("rcs-submit-btn");
      const countrySelect = document.getElementById("rcs-country-select") as HTMLSelectElement | null;
      const phoneEl = document.getElementById("rcs-phone") as HTMLInputElement | null;

      if (countrySelect) {
        const handler = () => setCountryCode(countrySelect.value);
        countrySelect.addEventListener("change", handler);
        cleanups.push(() => countrySelect.removeEventListener("change", handler));
      }

      if (phoneEl) {
        const handler = () => {
          let digitsOnly = phoneEl.value.replace(/[^\d]/g, "");
          const code = selectedCodeRef.current;
          const ctry = RCS_COUNTRY_CODES.find((c) => c.code === code) ?? RCS_COUNTRY_CODES[0];
          if (digitsOnly.length > ctry.digits[1]) digitsOnly = digitsOnly.slice(0, ctry.digits[1]);
          phoneEl.value = digitsOnly;
        };
        phoneEl.addEventListener("input", handler);
        cleanups.push(() => phoneEl.removeEventListener("input", handler));
      }

      if (submitBtn) {
        const getCookie = (name: string) => {
          const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
          return match ? match[2] : "";
        };

        const submitToHubSpot = (
          firstName: string, lastName: string, email: string,
          phone: string, message: string,
          btn: HTMLButtonElement
        ) => {
          const hutk = getCookie("hubspotutk");
          const fields = [
            { name: "firstname", value: firstName },
            { name: "lastname", value: lastName },
            { name: "email", value: email },
            { name: "phone", value: phone },
            { name: "message", value: message },
          ];
          return fetch("https://api.hsforms.com/submissions/v3/integration/submit/20451141/1bd8ce72-8c0d-4dd0-89c2-f2d2bd7dfcd5", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields,
              context: {
                hutk: hutk || undefined,
                pageUri: window.location.href,
                pageName: "RCS Early Access",
              },
              legalConsentOptions: {
                consent: {
                  consentToProcess: true,
                  text: "I agree to allow Plivo to store and process my personal data.",
                },
              },
              skipValidation: true,
            }),
          }).then((res) => {
            if (res.ok) {
              setSubmitted(true);
            } else {
              btn.disabled = false;
              btn.textContent = "Get access";
              btn.classList.remove("opacity-70", "cursor-not-allowed");
              setErrors({ form: "Something went wrong. Please try again." });
            }
          }).catch(() => {
            btn.disabled = false;
            btn.textContent = "Get access";
            btn.classList.remove("opacity-70", "cursor-not-allowed");
            setErrors({ form: "Network error. Please try again." });
          });
        };

        const handler = (e: Event) => {
          e.preventDefault();
          const btn = submitBtn as HTMLButtonElement;
          if (btn.disabled) return;

          const fullName = (document.getElementById("rcs-fullName") as HTMLInputElement)?.value?.trim() ?? "";
          const email = (document.getElementById("rcs-email") as HTMLInputElement)?.value?.trim() ?? "";
          const phone = (document.getElementById("rcs-phone") as HTMLInputElement)?.value?.trim() ?? "";
          const requirement = (document.getElementById("rcs-requirement") as HTMLTextAreaElement)?.value?.trim() ?? "";

          const newErrors: Record<string, string> = {};
          if (!fullName || fullName.length < 2) newErrors.fullName = "Please enter your full name";
          if (!email) newErrors.email = "Please enter your email";
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
          if (!phone) newErrors.phone = "Please enter your phone number";
          if (!requirement || requirement.length < 20) newErrors.requirement = "Please provide more detail about your use case";

          setErrors(newErrors);
          if (Object.keys(newErrors).length > 0) return;

          btn.disabled = true;
          btn.textContent = "Submitting...";
          btn.classList.add("opacity-70", "cursor-not-allowed");

          const parts = fullName.split(/\s+/);
          const firstName = parts[0] || "";
          const lastName = parts.slice(1).join(" ") || "";
          const code = selectedCodeRef.current;
          const ctry = RCS_COUNTRY_CODES.find((c) => c.code === code) ?? RCS_COUNTRY_CODES[0];
          const formattedPhone = `+${ctry.dial.replace("+", "")} ${phone}`;
          const description = `[RCS Early Access] ${requirement}`;

          // Primary: submit to Netlify function (same as contact sales)
          const formData = new URLSearchParams();
          formData.set("first_name", firstName);
          formData.set("last_name", lastName);
          formData.set("full_name", fullName);
          formData.set("company_email", email);
          formData.set("phone", formattedPhone);
          formData.set("description", description);
          formData.set("page_url", window.location.href);
          formData.set("conversion_channel", "rcs-early-access");
          formData.set("landing_page", window.location.origin);

          const body = new URLSearchParams();
          body.set("formData", formData.toString());
          body.set("hubspotutk", getCookie("hubspotutk"));
          body.set("hubSpot", "contactForm");
          body.set("ipAddress", "");

          fetch("https://plivo-static-forms.netlify.app/.netlify/functions/submit", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          })
            .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
              if (ok && data.status === "Submitted") {
                setSubmitted(true);
              } else {
                // Fallback to direct HubSpot
                return submitToHubSpot(firstName, lastName, email, formattedPhone, description, btn);
              }
            })
            .catch(() => {
              // Network error — fallback to direct HubSpot
              submitToHubSpot(firstName, lastName, email, formattedPhone, description, btn);
            });
        };
        submitBtn.addEventListener("click", handler);
        cleanups.push(() => submitBtn.removeEventListener("click", handler));
      }

      ["fullName", "email", "phone", "requirement"].forEach((fieldName) => {
        const el = document.getElementById(`rcs-${fieldName}`);
        if (el) {
          const handler = () => setErrors((prev) => {
            if (!prev[fieldName]) return prev;
            const next = { ...prev };
            delete next[fieldName];
            return next;
          });
          el.addEventListener("input", handler);
          cleanups.push(() => el.removeEventListener("input", handler));
        }
      });
    }, 50);
    return () => { clearTimeout(timer); cleanups.forEach((fn) => fn()); };
  }, []);

  return (
    <section id="early-access" className="bg-background border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left - Content & Stats */}
          <div>
            <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
              Request early access to RCS messaging
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mb-8">
              Be among the first to unlock the power of RCS. Our team will help you get started with branded, interactive messaging.
            </p>
            <div className="space-y-5">
              {RCS_STATS.map((stat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl font-semibold text-foreground flex-shrink-0">
                    {stat.value}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed pt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form Card */}
          <div className="rounded-xl border border-border bg-background p-5 sm:p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-normal text-foreground">
                  Thank you for your interest!
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
                  We'll reach out to you soon with early access details for RCS messaging.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Talk to sales
                </h3>

                <div>
                  <label htmlFor="rcs-fullName" className="text-[13px] font-medium text-foreground/80 mb-1 block">
                    Full name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="rcs-fullName"
                    type="text"
                    placeholder="Jane Smith"
                    className={`w-full h-10 rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.fullName ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-border-strong"}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="rcs-email" className="text-[13px] font-medium text-foreground/80 mb-1 block">
                    Work email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="rcs-email"
                    type="email"
                    placeholder="jane@company.com"
                    className={`w-full h-10 rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-border-strong"}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="rcs-phone" className="text-[13px] font-medium text-foreground/80 mb-1 block">
                    Phone number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="rcs-country-select"
                      defaultValue={selectedCode}
                      className="flex-shrink-0 h-10 w-28 rounded-lg border border-border-strong bg-background px-2 text-sm text-foreground cursor-pointer focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 hover:border-border-strong"
                    >
                      {RCS_COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dial}
                        </option>
                      ))}
                    </select>
                    <input
                      id="rcs-phone"
                      type="tel"
                      placeholder="888888 88888"
                      className={`flex-1 h-10 rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-border-strong"}`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="rcs-requirement" className="text-[13px] font-medium text-foreground/80 mb-1 block">
                    Tell us about your use case <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="rcs-requirement"
                    placeholder="Describe your messaging needs, target audience, and expected volume"
                    className={`w-full min-h-[88px] rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none hover:border-border-strong focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.requirement ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-border-strong"}`}
                  />
                  {errors.requirement && <p className="text-xs text-red-500 mt-1">{errors.requirement}</p>}
                </div>

                <button
                  id="rcs-submit-btn"
                  type="button"
                  className="w-full rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors cta-hover-gradient"
                >
                  Get access
                </button>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  By submitting, you agree to our{" "}
                  <a href="/legal/tos/" className="underline hover:text-muted-foreground">terms of service</a>{" "}
                  and{" "}
                  <a href="/legal/privacy/" className="underline hover:text-muted-foreground">privacy policy</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: "What is RCS messaging?",
    answer:
      'Rich Communications Services (RCS) is the next generation of SMS messaging. It combines the global reach and reliability of SMS with the rich, interactive features of chat apps like WhatsApp and WeChat. Read more about RCS messaging in our blog post: <a href="https://www.plivo.com/blog/what-is-rcs-messaging/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">What is RCS Messaging? A Complete Guide</a>.',
  },
  {
    question:
      "What is RCS Business Messaging (RBM), and how is it different from RCS messaging?",
    answer:
      "RCS Business Messaging (RBM) is a version of RCS designed for businesses to communicate with customers. While RCS messaging supports P2P messaging, RBM focuses on A2P messaging, allowing businesses to send branded, interactive, and rich media messages.\n\nWith RBM, businesses can include logos, images, videos, and action buttons in their messages, delivering a conversational experience similar to chat apps, but with the reach and reliability of RCS.",
  },
  {
    question: "Do all mobile phones support RCS?",
    answer:
      "RCS is supported on Android and iOS devices. However, availability depends on the region and carrier network. While person-to-person (P2P) RCS messaging is widely supported in many regions, Rich Business Messaging (RBM) is still growing and available in an increasing number of countries.\n\nFor Android devices, most modern smartphones support RCS. Apple began supporting RCS for P2P messaging in select markets in late 2024.\n\nTo learn more about device and regional support for RBM, contact our experts.",
  },
  {
    question: "Does RCS messaging need an internet connection?",
    answer:
      "For RCS message delivery to work, the end user must have an internet connection enabled through Wi-Fi or mobile data. This applies to both text-based and rich media messages.",
  },
  {
    question: "Is Rich Business Messaging available for international use?",
    answer:
      "While P2P RCS messages can be sent globally, A2P RCS messaging is subject to operator and regional restrictions. In most regions, operators currently support only domestic A2P messaging.\n\nPlivo can help you navigate these restrictions and set up RCS messaging across multiple geographies. Contact our experts to learn more about regional coverage and availability.",
  },
  {
    question: "Does Rich Business Messaging support two-way communication?",
    answer:
      "Yes, Rich Business Messaging enables two-way communication. Customers can respond to messages, interact with suggested replies or action buttons, and engage in real-time conversations with businesses.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handler = () => onToggle();
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, [onToggle]);

  return (
    <div className="border-b border-border">
      <button
        ref={btnRef}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-foreground pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 pr-8">
          {answer.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(para) }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RCSFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background border-t border-border py-12 lg:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          FAQs about RCS
        </h2>
        <div className="mt-8">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pre-footer CTA ──────────────────────────────────────────────────────────
function RCSPreFooter() {
  return (
    <section className="relative overflow-hidden bg-background border-t border-border py-12 sm:py-16 md:py-20">
      {/* Dotted Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground">
          Ready to transform your messaging?
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground mt-3">
          Be among the first to unlock the power of RCS messaging with Plivo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="/contact/sales/"
            className="inline-flex items-center justify-center rounded-md border border-border-strong bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
          >
            Talk to sales
          </a>
          <a
            href="#early-access"
            className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-colors cta-hover-gradient"
          >
            Request early access
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function RCSPage() {
  return (
    <>
      <RCSHero />
      <RCSFeatures />
      <RCSUseCases />
      <RCSBenefits />
      <RCSEarlyAccess />
      <RCSFAQ />
      <PreFooterCTA title="Ready to transform your messaging?" subtitle="Be among the first to unlock the power of RCS messaging with Plivo." />
    </>
  );
}
