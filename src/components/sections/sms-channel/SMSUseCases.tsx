"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

// Wrapper component for illustrations - simulates phone message screen
function IllustrationWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100", className)}>
      {/* Content */}
      <div className="relative h-full w-full px-3 py-4 flex flex-col">
        {children}
      </div>
    </div>
  );
}

// Incoming message bubble (gray, left aligned) - like iMessage
function IncomingBubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-[85%] self-start", className)}>
      <div className="rounded-2xl rounded-bl-sm bg-[#e9e9eb] px-3 py-2">
        <p className="text-[13px] leading-[1.35] text-black whitespace-pre-line">{children}</p>
      </div>
    </div>
  );
}

// Outgoing message bubble (blue, right aligned) - like iMessage
function OutgoingBubble({ children, className, delivered }: { children: React.ReactNode; className?: string; delivered?: boolean }) {
  return (
    <div className={cn("max-w-[85%] self-end", className)}>
      <div className="rounded-2xl rounded-br-sm bg-[#007AFF] px-3 py-2">
        <p className="text-[13px] leading-[1.35] text-white">{children}</p>
      </div>
      {delivered && (
        <p className="text-[10px] text-gray-400 text-right mt-0.5 mr-1">Delivered</p>
      )}
    </div>
  );
}

// Chat header with contact info
function ChatHeader({ name, subtitle }: { name: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3 pb-2 border-b border-gray-200/60">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-[10px] font-semibold text-gray-600">
        {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>
      <div className="text-center">
        <p className="text-[11px] font-medium text-gray-900 leading-tight">{name}</p>
        {subtitle && <p className="text-[9px] text-gray-500 leading-tight">{subtitle}</p>}
      </div>
    </div>
  );
}

// Time stamp between messages
function TimeStamp({ time }: { time: string }) {
  return (
    <p className="text-[9px] text-gray-400 text-center my-1.5">{time}</p>
  );
}

// Alerts & Notifications Illustration - Stacked cards design with animation
function AlertsNotificationsIllustration() {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setAnimationStep(0);
      setTimeout(() => setAnimationStep(1), 600);
      setTimeout(() => setAnimationStep(2), 1200);
      setTimeout(() => setAnimationStep(3), 1800);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper className="bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Badge with blue dot */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-[#323dfe]" />
          8 messages
        </span>
      </div>

      {/* Stacked notification cards - proper card heights */}
      <div className="relative flex-1 px-3">
        {/* Back card (3rd) - partial card visible */}
        <div
          className={cn(
            "absolute left-6 right-6 top-0 rounded-xl bg-white/70 border border-gray-200/50 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
            animationStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          )}
        >
          <div className="p-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200/80" />
              <div className="flex-1">
                <div className="h-2 w-16 bg-gray-200/80 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle card (2nd) - more visible */}
        <div
          className={cn(
            "absolute left-4 right-4 top-6 rounded-xl bg-white/85 border border-gray-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
            animationStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          )}
        >
          <div className="p-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200/90" />
              <div className="flex-1">
                <div className="h-2.5 w-20 bg-gray-200/90 rounded mb-1" />
                <div className="h-2 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Front card (1st) - with full content */}
        <div
          className={cn(
            "relative w-full rounded-xl bg-white border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-3 mt-12 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
            animationStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          )}
        >
          {/* Notification header */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-[10px] font-semibold text-gray-700">
              FP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-gray-900 leading-tight">FitPro Gym</p>
              <p className="text-[10px] text-gray-400">now</p>
            </div>
          </div>
          {/* Message preview */}
          <p className="text-[12px] text-gray-600 leading-snug">
            Dear Jacky, your $199 payment is due on Mar 5.
          </p>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Verify/OTP Illustration - Two card layout with OTP animation
function VerifyIllustration() {
  const [visibleDigits, setVisibleDigits] = useState(0);
  const digits = ["2", "8", "3", "4"];

  useEffect(() => {
    const runAnimation = () => {
      setVisibleDigits(0);
      digits.forEach((_, i) => {
        setTimeout(() => setVisibleDigits(i + 1), 700 * (i + 1));
      });
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper className="bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="relative flex-1 px-3 pt-2">
        {/* Top card - OTP Input (right aligned) */}
        <div className="relative z-10 flex justify-end">
          <div className="inline-block rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-3">Enter OTP to login</p>
            {/* OTP Input boxes with gradient border */}
            <div className="flex gap-2">
              {digits.map((digit, i) => (
                <div
                  key={i}
                  className="w-10 h-11 rounded-lg p-[1.5px] bg-gradient-to-br from-[#cd3ef9] to-[#323dfe]"
                >
                  <div className="w-full h-full rounded-[6px] bg-gray-50 flex items-center justify-center text-[18px] font-semibold text-gray-900">
                    <span
                      className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        i < visibleDigits ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      )}
                    >
                      {digit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom card - SMS Message (offset to bottom-left) */}
        <div className="absolute left-3 bottom-0 w-[85%] rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3.5">
          {/* Message header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-[10px] font-semibold text-gray-700">
              V
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight">Verify</p>
              <p className="text-[11px] text-gray-400">just now</p>
            </div>
          </div>
          {/* Message content */}
          <p className="text-[13px] text-gray-600 leading-snug">
            Your OTP is <span className="font-semibold text-gray-900">2834</span>. Don't share this with anyone.
          </p>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Promotional Marketing Illustration - Small square image with text on side
function PromotionalMarketingIllustration() {
  return (
    <IllustrationWrapper className="bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="relative flex-1 px-3 flex items-center justify-center">
        {/* Message card with small image + text layout */}
        <div className="rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 p-3 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-[10px] font-semibold text-gray-700">
              SS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight">StyleShop</p>
              <p className="text-[11px] text-gray-400">1-800-STYLE</p>
            </div>
          </div>

          {/* Message with small square image + text on side */}
          <div className="px-3 pb-3">
            <div className="flex gap-3">
              {/* Small Square Product Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                <img
                  src="/images/shoe-product.jpg"
                  alt="Sneaker"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-700 leading-snug">
                  🎉 Flash Sale! Get 20% off our spring collection.
                </p>
                <p className="text-[12px] text-gray-700 mt-1">
                  Use code <span className="font-semibold">SPRING20</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Abandoned Cart Illustration - Two card layout like Verify
function AbandonedCartIllustration() {
  return (
    <IllustrationWrapper className="bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="relative flex-1 px-3 pt-2">
        {/* Top card - Shopping Cart preview (right aligned) */}
        <div className="relative z-10 flex justify-end">
          <div className="inline-block rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cd3ef9" />
                    <stop offset="100%" stopColor="#323dfe" />
                  </linearGradient>
                </defs>
                <path stroke="url(#cartGradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-[12px] text-gray-500">Your cart</p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900">Designer Bag</p>
                <p className="text-[12px] text-gray-500">$89.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card - SMS Message (offset to bottom-left) */}
        <div className="absolute left-3 bottom-0 w-[88%] rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3.5">
          {/* Message header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-[10px] font-semibold text-gray-700">
              GL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight">GlamLooks</p>
              <p className="text-[11px] text-gray-400">2h ago</p>
            </div>
          </div>
          {/* Message content */}
          <p className="text-[13px] text-gray-600 leading-snug">
            Hey! Complete your order now & get 10% off with code <span className="font-semibold">COMEBACK10</span>
          </p>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Loyalty Marketing Illustration - RCS-style with rewards card and progress animation
function LoyaltyMarketingIllustration() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setProgress(0);
      // Animate to 83% over 2.5 seconds
      const startTime = Date.now();
      const duration = 2500;
      const targetProgress = 83;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min(elapsed / duration, 1);
        // Ease out quart for smoother animation
        const eased = 1 - Math.pow(1 - progressPercent, 4);
        setProgress(Math.round(eased * targetProgress));

        if (progressPercent < 1) {
          requestAnimationFrame(animate);
        }
      };

      setTimeout(() => requestAnimationFrame(animate), 800);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper className="bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="relative flex-1 px-3 pt-2 flex flex-col">
        {/* Message card with rewards content */}
        <div className="rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 p-2.5 pb-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-[9px] font-semibold text-gray-700">
              RC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-gray-900 leading-tight">Rewards Club</p>
              <p className="text-[10px] text-gray-400">Loyalty Program</p>
            </div>
          </div>

          {/* Message */}
          <p className="text-[12px] text-gray-700 leading-snug px-2.5 pb-2">
            🎁 You've earned <span className="font-semibold">500 points</span>. Redeem for $10 off!
          </p>

          {/* Rewards Card - light grey with gradient progress bar */}
          <div className="mx-2.5 mb-2.5 rounded-lg overflow-hidden bg-gray-100 p-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] text-gray-500">Your Points</p>
                <p className="text-[18px] font-bold text-gray-900 leading-tight">500</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500">Member</p>
                <p className="text-[11px] font-medium text-gray-700">2023</p>
              </div>
            </div>
            {/* Progress bar with gradient - animated */}
            <div className="mt-1.5">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[9px] text-gray-500">Next reward</p>
                <p className="text-[9px] text-gray-700 font-medium">{progress}%</p>
              </div>
              <div className="w-full h-1 rounded-full bg-gray-300 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Conversational Messaging Illustration - Phone UI with message animation
function ConversationalMessagingIllustration() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  const messages = [
    { type: "incoming", text: "🍔 20% off combos! Reply MENU" },
    { type: "outgoing", text: "MENU" },
    { type: "incoming", text: "1. Burger + Fries $8.99" },
    { type: "outgoing", text: "1" },
  ];

  useEffect(() => {
    const runAnimation = () => {
      setVisibleMessages(0);
      messages.forEach((_, i) => {
        setTimeout(() => setVisibleMessages(i + 1), 900 * (i + 1));
      });
    };

    runAnimation();
    const interval = setInterval(runAnimation, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper className="bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="relative flex-1 flex items-center justify-center px-6 py-2">
        {/* Phone device - compact */}
        <div className="w-full max-w-[220px]">
          {/* Phone outer frame with gradient */}
          <div className="relative rounded-[20px] p-1 shadow-xl" style={{ background: 'linear-gradient(135deg, rgba(205, 62, 249, 0.5) 0%, rgba(50, 61, 254, 0.5) 100%)' }}>
            {/* Screen */}
            <div className="relative rounded-[18px] overflow-hidden bg-white">
              {/* Status bar - compact */}
              <div className="h-5 bg-gray-100 flex items-center justify-between px-3 text-[9px] font-medium">
                <span className="text-black/50">9:41</span>
                <div className="flex items-center gap-1 text-black/50">
                  <div className="flex gap-0.5">
                    {[1,2,3,4].map(i => <span key={i} className="w-0.5 h-0.5 rounded-full bg-black" />)}
                  </div>
                  <div className="w-3.5 h-1.5 rounded-sm bg-black/50" />
                </div>
              </div>

              {/* Navigation bar - compact */}
              <div className="h-7 bg-gray-100 border-b border-gray-200 flex items-center px-2">
                <svg className="w-3.5 h-3.5 text-[#007AFF]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="flex-1 text-center text-[11px] font-semibold text-black">RapidFood</span>
                <span className="text-[9px] text-[#007AFF]">Details</span>
              </div>

              {/* Messages area - compact */}
              <div className="px-2 py-2 space-y-1.5 bg-white min-h-[173px]">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={cn(
                      "transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      i < visibleMessages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
                    )}
                  >
                    {message.type === "incoming" ? (
                      <div className="flex items-start">
                        <div className="rounded-2xl rounded-bl-sm px-2 py-1 max-w-[85%] bg-gray-200">
                          <p className="text-[10px] text-black leading-snug">{message.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-sm px-2 py-1 max-w-[85%] bg-[#007AFF]">
                          <p className="text-[10px] text-white leading-snug">{message.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Home indicator */}
              <div className="h-4 bg-white flex items-center justify-center">
                <div className="w-12 h-0.5 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

const useCases: UseCase[] = [
  {
    title: "Alerts & notifications",
    tags: ["eCommerce", "Logistics", "Healthcare"],
    description: "Send customers real-time updates on orders, deliveries, appointments, and account changes through reliable SMS notifications.",
    illustration: <AlertsNotificationsIllustration />,
  },
  {
    title: "Verify",
    tags: ["Fintech", "eCommerce", "SaaS"],
    description: "Secure your platform with instant OTPs for authentication. Prevent SMS pumping and fake signups with built-in FraudShield.",
    illustration: <VerifyIllustration />,
  },
  {
    title: "Promotional marketing",
    tags: ["Retail", "eCommerce", "Food & Dining"],
    description: "Run high-converting SMS campaigns to deliver personalized promotions, launch new product arrivals, and more - directly to customer's phone.",
    illustration: <PromotionalMarketingIllustration />,
  },
  {
    title: "Abandoned cart campaigns",
    tags: ["eCommerce", "Retail", "Travel"],
    description: "Recover abandoned carts with timely SMS reminders and personalized incentives to complete purchases.",
    illustration: <AbandonedCartIllustration />,
  },
  {
    title: "Loyalty marketing",
    tags: ["Retail", "eCommerce", "Food & Dining"],
    description: "Reward loyal customers with exclusive perks, point updates, and personalized birthday offers to drive retention.",
    illustration: <LoyaltyMarketingIllustration />,
  },
  {
    title: "Conversational messaging",
    tags: ["eCommerce", "Travel", "Consumer Services"],
    description: "Provide real-time assistance to help customers with product recommendations, order tracking, or FAQs, without any human intervention.",
    illustration: <ConversationalMessagingIllustration />,
  },
];

export default function SMSUseCases() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Engage your customers at every step of their journey
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 md:mb-14">
          An all-in-one platform that delivers all your messaging needs with OTPs, alerts & notifications, promotional & loyalty campaigns, and conversational messaging.
        </p>

        {/* Use Cases Grid - 3 columns */}
        <div className="grid gap-x-6 gap-y-14 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group"
            >
              {/* Illustration */}
              <div className="mb-4 overflow-hidden rounded-xl transition-all">
                {useCase.illustration}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-black">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {useCase.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {useCase.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
