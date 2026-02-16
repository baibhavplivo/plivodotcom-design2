"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Image,
  MousePointerClick,
  ShieldCheck,
  CalendarCheck,
  PackageCheck,
  CreditCard,
  BarChart3,
  Sparkles,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

// ── RCS Phone Illustration ──────────────────────────────────────────────────
function RCSPhoneIllustration() {
  return (
    <div className="relative flex justify-center">
      {/* Flickering Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={4}
            gridGap={6}
            color="rgb(50, 61, 254)"
            maxOpacity={0.6}
            flickerChance={0.1}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, white 70%)",
            }}
          />
        </div>
      </div>

      {/* Phone container */}
      <div className="relative h-[520px] sm:h-[560px] overflow-hidden">
        <div className="w-[288px] sm:w-[320px]">
          {/* Phone outer frame */}
          <div
            className="relative rounded-[32px] p-1.5 shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(205, 62, 249, 0.5) 0%, rgba(50, 61, 254, 0.5) 100%)",
            }}
          >
            <div
              className="absolute inset-0 rounded-[32px] opacity-15"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
              }}
            />

            {/* Screen */}
            <div className="relative rounded-[30px] overflow-hidden bg-white shadow-inner">
              {/* Status bar */}
              <div className="h-7 bg-gray-100 flex items-center justify-between px-5 text-xs font-medium rounded-t-[30px]">
                <div className="flex items-center gap-1 opacity-50">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                  </div>
                  <span className="ml-1 text-black">Plivo</span>
                </div>
                <span className="text-black opacity-50">9:41 AM</span>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="text-black text-[10px]">100%</span>
                  <div className="w-5 h-2.5 rounded-sm bg-black" />
                </div>
              </div>

              {/* Chat Header - Branded Sender */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="url(#cartGradient)" strokeWidth={1.5}>
                    <defs>
                      <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#cd3ef9" />
                        <stop offset="100%" stopColor="#323dfe" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V4.125A1.125 1.125 0 014.125 3h15.75A1.125 1.125 0 0121 4.125V9.35" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-900">StyleCart</span>
                    <svg className="w-4 h-4 text-[#323dfe]" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">Verified business</span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="px-3 pt-3 pb-4 min-h-[440px] bg-gray-50 space-y-3">
                {/* Rich Card - Product Promotion */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 max-w-[260px]">
                  {/* Product image - actual shoe photo */}
                  <div className="h-36 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)" }}>
                    <img
                      src="/images/shoe-product.jpg"
                      alt="Summer collection sneaker"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <span className="text-[7px] font-bold text-indigo-600">NEW</span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-900 mb-1">Summer collection is here!</p>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      Free shipping on orders over $50
                    </p>
                  </div>
                  {/* Card actions */}
                  <div className="border-t border-gray-100 flex">
                    <button className="flex-1 py-2 text-[11px] font-semibold text-[#323dfe]">
                      Shop now
                    </button>
                    <div className="w-px bg-gray-100" />
                    <button className="flex-1 py-2 text-[11px] font-semibold text-[#323dfe]">
                      View all
                    </button>
                  </div>
                </div>

                {/* Suggested Replies */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-3 py-1.5 rounded-full border border-gray-300 text-[11px] font-medium text-gray-700 bg-white">
                    View deals
                  </span>
                  <span className="px-3 py-1.5 rounded-full border border-gray-300 text-[11px] font-medium text-gray-700 bg-white">
                    Track order
                  </span>
                </div>

                {/* Delivery update message */}
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 max-w-[260px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <p className="text-[11px] font-medium text-gray-900">Order shipped!</p>
                  </div>
                  <p className="text-[10px] text-gray-500">Your order #4829 is on its way. Arriving Feb 18.</p>
                  <button className="mt-2 w-full py-1.5 rounded-lg border border-gray-200 text-[10px] font-medium text-gray-700">
                    Track shipment
                  </button>
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-7 bg-gray-50 flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.9) 50%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function RCSHero() {
  return (
    <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-1 lg:order-1 max-w-[820px] text-center lg:text-left">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
              The future of{" "}
              <br className="hidden sm:block" />
              messaging: RCS API
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-[540px] mx-auto lg:mx-0 leading-relaxed">
              Connect with customers like never before. Deliver interactive, branded
              messages that boost engagement and drive conversions—all with our RCS
              APIs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
              <a
                href="/contact/sales/"
                className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Talk to sales
              </a>
            </div>
            {/* Feature badges */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-[#323dfe]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Branded messages
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-[#323dfe]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Rich media support
              </span>
            </div>
          </div>

          {/* Right Content - RCS Phone Illustration */}
          <div className="order-2 lg:order-2">
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
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-12">
          Send richer, more rewarding messages with RCS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-[#323dfe]" />
              </div>
              <h3 className="text-base font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
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
    <div className={`relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${className || ""}`}>
      <div className="relative h-full w-full px-6 py-5 flex flex-col items-center">
        <div className="w-full max-w-[220px] flex flex-col flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

function ProductShowcaseIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex-1 flex flex-col">
        <div className="h-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
          <div className="absolute top-1.5 left-1.5 z-10 text-white text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: "linear-gradient(135deg, #cd3ef9, #323dfe)" }}>NEW</div>
          <img src="/images/shoe-product.jpg" alt="Product" className="w-full h-full object-cover" />
        </div>
        <div className="p-2.5 flex-1">
          <p className="text-[10px] font-semibold text-gray-900">Summer collection is here!</p>
          <p className="text-[9px] text-gray-500 mt-0.5">Free shipping on orders over $50</p>
        </div>
        <div className="border-t border-gray-100 flex">
          <button className="flex-1 py-1.5 text-[10px] font-semibold text-[#323dfe]">Shop now</button>
          <div className="w-px bg-gray-100" />
          <button className="flex-1 py-1.5 text-[10px] font-semibold text-[#323dfe]">View all</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <span className="px-2.5 py-1 rounded-full border border-gray-300 text-[9px] font-medium text-gray-600 bg-white">View deals</span>
        <span className="px-2.5 py-1 rounded-full border border-gray-300 text-[9px] font-medium text-gray-600 bg-white">Track order</span>
      </div>
    </RCSIllustrationWrapper>
  );
}

function AppointmentReminderIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col p-3">
        <div className="flex items-start gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="url(#apptGradient)" strokeWidth={1.5}>
              <defs>
                <linearGradient id="apptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cd3ef9" />
                  <stop offset="100%" stopColor="#323dfe" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">Appointment reminder</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Dr. Smith - Feb 18, 10:30 AM</p>
            <p className="text-[9px] text-[#323dfe]/60 mt-0.5">Dental checkup &amp; cleaning</p>
          </div>
        </div>
        <div className="mt-auto flex gap-2">
          <button className="flex-1 py-2 rounded-lg bg-gray-800 text-white text-[10px] font-semibold">Confirm</button>
          <button className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 text-[10px] font-semibold">Reschedule</button>
        </div>
      </div>
    </RCSIllustrationWrapper>
  );
}

function TicketsPassesIllustration() {
  return (
    <RCSIllustrationWrapper>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="px-3 py-2.5" style={{ background: "linear-gradient(135deg, rgba(205,62,249,0.1), rgba(50,61,254,0.12))" }}>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Boarding pass</p>
          <div className="flex justify-between items-end mt-1.5">
            <div>
              <p className="text-[16px] font-bold text-black leading-none">SFO</p>
              <p className="text-[8px] text-gray-500">San Francisco</p>
            </div>
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
            <div className="text-right">
              <p className="text-[16px] font-bold text-black leading-none">NYC</p>
              <p className="text-[8px] text-gray-500">New York</p>
            </div>
          </div>
        </div>
        <div className="p-3 flex justify-between items-center border-b border-dashed border-gray-200">
          <div>
            <p className="text-[8px] text-gray-400 uppercase">Gate</p>
            <p className="text-[12px] font-bold text-black">B42</p>
          </div>
          <div>
            <p className="text-[8px] text-gray-400 uppercase">Seat</p>
            <p className="text-[12px] font-bold text-black">14A</p>
          </div>
          <div>
            <p className="text-[8px] text-gray-400 uppercase">Boards</p>
            <p className="text-[12px] font-bold text-black">9:15 AM</p>
          </div>
        </div>
        <div className="px-3 py-2 flex items-center justify-center">
          <div className="flex gap-px">
            {[3,1,2,1,3,1,1,2,1,3,1,2,1,1,3,2,1,1,3,1].map((w, i) => (
              <div key={i} className="bg-black" style={{ width: `${w}px`, height: "20px" }} />
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex-1 flex flex-col p-3">
        <p className="text-[11px] font-semibold text-gray-900 mb-2">Your order is on the way!</p>
        {/* Progress tracker */}
        <div className="flex items-center gap-1 mb-3">
          <div className="w-4 h-4 rounded-full bg-[#323dfe] flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <div className="flex-1 h-1 bg-[#323dfe] rounded-full" />
          <div className="w-4 h-4 rounded-full bg-[#323dfe] flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <div className="flex-1 h-1 bg-[#323dfe] rounded-full" />
          <div className="w-4 h-4 rounded-full bg-[#323dfe] flex items-center justify-center ring-2 ring-blue-200">
            <PackageCheck className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full" />
          <div className="w-4 h-4 rounded-full bg-gray-200" />
        </div>
        <div className="flex justify-between text-[8px] text-gray-400 mb-3">
          <span>Ordered</span>
          <span>Shipped</span>
          <span className="text-[#323dfe] font-medium">Out for delivery</span>
          <span>Delivered</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-2 flex items-center gap-2 mt-auto">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
            <PackageCheck className="w-4 h-4 text-[#323dfe]" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">Order #82941</p>
            <p className="text-[9px] text-gray-500">Arriving today by 5 PM</p>
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
          <div className="bg-white rounded-xl rounded-bl-sm px-3 py-2 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-900">Hi! How can I help you today?</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full border border-blue-200 text-[9px] font-medium text-[#323dfe] bg-blue-50">Return an item</span>
          <span className="px-2.5 py-1 rounded-full border border-blue-200 text-[9px] font-medium text-[#323dfe] bg-blue-50">Track order</span>
          <span className="px-2.5 py-1 rounded-full border border-blue-200 text-[9px] font-medium text-[#323dfe] bg-blue-50">Billing help</span>
        </div>
        <div className="max-w-[85%] self-end">
          <div className="rounded-xl rounded-br-sm px-3 py-2" style={{ background: "linear-gradient(135deg, #323dfe, #4f5aff)" }}>
            <p className="text-[11px] text-white">I'd like to return an item</p>
          </div>
        </div>
        <div className="max-w-[85%] self-start">
          <div className="bg-white rounded-xl rounded-bl-sm px-3 py-2 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-900">Sure! Please share your order number and I'll get that started.</p>
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
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4">
          Real-world applications, powered by RCS
        </h2>
        <p className="text-gray-600 text-center text-base sm:text-lg max-w-2xl mx-auto mb-12">
          From product showcases to customer support, RCS transforms how you
          engage with customers.
        </p>
        <div className="grid gap-x-6 gap-y-14 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase, i) => (
            <div key={i} className="group">
              <div className="mb-4 overflow-hidden rounded-xl transition-all">
                {useCase.illustration}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {useCase.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs text-gray-600"
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
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-12">
          Benefits of RCS over SMS
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-[#323dfe]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-black mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
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
          setSubmitted(true);
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
    <section id="early-access" className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left - Content & Stats */}
          <div>
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
              Request early access to RCS messaging
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mb-8">
              Be among the first to unlock the power of RCS. Our team will help you get started with branded, interactive messaging.
            </p>
            <div className="space-y-5">
              {RCS_STATS.map((stat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-sora text-xl sm:text-2xl font-semibold text-black flex-shrink-0">
                    {stat.value}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form Card */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5 sm:p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-sora text-xl font-normal text-black">
                  Thank you for your interest!
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  We'll reach out to you soon with early access details for RCS messaging.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <h3 className="text-xl font-semibold text-black mb-3">
                  Talk to sales
                </h3>

                <div>
                  <label htmlFor="rcs-fullName" className="text-[13px] font-medium text-gray-700 mb-1 block">
                    Full name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="rcs-fullName"
                    type="text"
                    placeholder="Jane Smith"
                    className={`w-full h-10 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.fullName ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="rcs-email" className="text-[13px] font-medium text-gray-700 mb-1 block">
                    Work email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="rcs-email"
                    type="email"
                    placeholder="jane@company.com"
                    className={`w-full h-10 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="rcs-phone" className="text-[13px] font-medium text-gray-700 mb-1 block">
                    Phone number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="rcs-country-select"
                      defaultValue={selectedCode}
                      className="flex-shrink-0 h-10 w-28 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-900 cursor-pointer focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 hover:border-gray-400"
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
                      className={`flex-1 h-10 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="rcs-requirement" className="text-[13px] font-medium text-gray-700 mb-1 block">
                    Tell us about your use case <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="rcs-requirement"
                    placeholder="Describe your messaging needs, target audience, and expected volume"
                    className={`w-full min-h-[88px] rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 resize-none hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.requirement ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                  />
                  {errors.requirement && <p className="text-xs text-red-500 mt-1">{errors.requirement}</p>}
                </div>

                <button
                  id="rcs-submit-btn"
                  type="button"
                  className="w-full rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Get access
                </button>

                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  By submitting, you agree to our{" "}
                  <a href="/legal/tos/" className="underline hover:text-gray-600">terms of service</a>{" "}
                  and{" "}
                  <a href="/legal/privacy/" className="underline hover:text-gray-600">privacy policy</a>
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
      'Rich Communications Services (RCS) is the next generation of SMS messaging. It combines the global reach and reliability of SMS with the rich, interactive features of chat apps like WhatsApp and WeChat. Read more about RCS messaging in our blog post: <a href="https://www.plivo.com/blog/what-is-rcs-messaging/" class="text-[#323dfe] hover:underline">What is RCS Messaging? A Complete Guide</a>.',
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
    <div className="border-b border-gray-200">
      <button
        ref={btnRef}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-black pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 pr-8">
          {answer.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0"
              dangerouslySetInnerHTML={{ __html: para }}
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
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4">
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
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          Ready to transform your messaging?
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 mt-3">
          Be among the first to unlock the power of RCS messaging with Plivo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="/contact/sales/"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-black transition-colors hover:bg-gray-50"
          >
            Talk to sales
          </a>
          <a
            href="#early-access"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
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
      <RCSPreFooter />
    </>
  );
}
