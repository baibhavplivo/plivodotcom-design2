"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  MessageSquare,
  Zap,
  Target,
  Database,
  Clock,
  Moon,
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// First accordion features (Brand-personalized, Two-way, High-performance)
const brandFeatures: Feature[] = [
  {
    id: "brand-personalized",
    icon: <Sparkles className="h-4 w-4" />,
    title: "Brand-personalized AI agents",
    description:
      "Configure your SMS AI agents with your brand's vocabulary, personality, and tone of voice for consistent, on-brand customer interactions.",
  },
  {
    id: "two-way-conversations",
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Two-way conversations that feel human",
    description:
      "Engage customers with natural, conversational SMS interactions that understand context and respond intelligently.",
  },
  {
    id: "high-performance",
    icon: <Zap className="h-4 w-4" />,
    title: "High-performance AI content",
    description:
      "Generate compelling SMS content at scale with AI that understands your products, promotions, and customer preferences.",
  },
];

// Second accordion features (Recommendations, Knowledge, 24/7)
const knowledgeFeatures: Feature[] = [
  {
    id: "personalized-recommendations",
    icon: <Target className="h-4 w-4" />,
    title: "Intelligently personalized recommendations",
    description:
      "Deliver product recommendations tailored to each customer's browsing history, purchase behavior, and preferences.",
  },
  {
    id: "knowledge-integration",
    icon: <Database className="h-4 w-4" />,
    title: "Deep integration with your knowledge sources",
    description:
      "Connect your product catalog, CRM, and support docs so AI agents have complete context for every interaction.",
  },
  {
    id: "24-7-availability",
    icon: <Clock className="h-4 w-4" />,
    title: "Works 24/7, handles every customer action",
    description:
      "Never miss a lead or support request. AI agents work around the clock to engage customers and drive conversions.",
  },
];

// Brand Personality Configuration Illustration
function BrandPersonalityIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        {/* Configuration Panel */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-black" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Brand Voice Configuration</p>
              <p className="text-[10px] text-gray-500">Configure AI personality settings</p>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-4 space-y-4 overflow-hidden">
            {/* Brand Name Input */}
            <div>
              <label className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">Brand Name</label>
              <div className="mt-1.5 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-900">
                Acme Store
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">Tone of Voice</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {["Friendly", "Professional", "Casual"].map((tone, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-md text-xs font-medium text-center cursor-pointer transition-colors ${
                      i === 0
                        ? "bg-[#323dfe]/10 text-[#323dfe] border border-[#323dfe]"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {tone}
                  </div>
                ))}
              </div>
            </div>

            {/* Personality Traits */}
            <div>
              <label className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">Personality Traits</label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["Empathetic", "Helpful", "Enthusiastic", "Concise"].map((trait, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                      i < 3
                        ? "bg-[#323dfe]/10 text-[#323dfe] border border-[#323dfe]/20"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Brand Vocabulary */}
            <div>
              <label className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">Brand Vocabulary</label>
              <div className="mt-1.5 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-[11px] text-gray-600 leading-relaxed">
                Use "Hey" instead of "Hello" • Refer to customers as "friends" • Sign off with "Cheers!"
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[11px] text-gray-600">AI agent configured and active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Two-Way Conversation Illustration - Phone UI (matching hero style)
function TwoWayConversationIllustration() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full pt-3 sm:pt-4 flex justify-center overflow-hidden">
        {/* Phone device - larger and extends beyond container */}
        <div className="w-[280px] sm:w-[320px] h-[500px]">
          {/* Phone outer frame with gradient border */}
          <div className="relative rounded-[36px] p-1.5 shadow-2xl h-full border border-gray-300 bg-gray-100">

            {/* Screen */}
            <div className="relative rounded-[32px] overflow-hidden bg-white shadow-inner h-full flex flex-col">
              {/* Status bar */}
              <div className="h-7 bg-gray-100 flex items-center justify-between px-5 text-xs font-medium rounded-t-[32px]">
                <div className="flex items-center gap-1 opacity-50">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-black" />
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                  </div>
                  <span className="ml-1 text-black text-[10px]">Plivo</span>
                </div>
                <span className="text-black opacity-50 text-[10px]">9:41 AM</span>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="text-black text-[9px]">100%</span>
                  <div className="w-5 h-2.5 rounded-sm bg-black" />
                </div>
              </div>

              {/* Navigation bar */}
              <div className="h-11 bg-gray-100 border-b border-gray-300 relative flex items-center px-3">
                <div className="flex items-center" style={{ color: '#007AFF' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <span className="text-sm font-normal">Messages</span>
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-black">Acme</span>
                <span className="ml-auto text-sm font-normal" style={{ color: '#007AFF' }}>Details</span>
              </div>

              {/* Timestamp */}
              <div className="py-2 text-center bg-white opacity-50">
                <p className="text-xs text-gray-500">iMessage</p>
                <p className="text-xs text-gray-500">Today 9:41 AM</p>
              </div>

              {/* Messages area */}
              <div className="flex-1 px-3 pb-3 space-y-3 bg-white">
                {/* AI message */}
                <div
                  className="flex items-start transition-all duration-700 ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '0ms'
                  }}
                >
                  <div className="rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%] bg-gray-200">
                    <p className="text-[13px] text-black leading-snug">Hi Sarah! 👋 We noticed you left some items in your cart. Ready to complete your order?</p>
                  </div>
                </div>

                {/* Customer reply */}
                <div
                  className="flex justify-end transition-all duration-700 ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '600ms'
                  }}
                >
                  <div className="rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%] bg-[#323dfe]">
                    <p className="text-[13px] text-white leading-snug">Yes! But I had a question about sizing</p>
                  </div>
                </div>

                {/* AI response */}
                <div
                  className="flex items-start transition-all duration-700 ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '1200ms'
                  }}
                >
                  <div className="rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%] bg-gray-200">
                    <p className="text-[13px] text-black leading-snug">The blue dress runs true to size. Based on your orders, I'd recommend Medium. Add to cart?</p>
                  </div>
                </div>

                {/* Customer reply */}
                <div
                  className="flex justify-end transition-all duration-700 ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '1800ms'
                  }}
                >
                  <div className="rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%] bg-[#323dfe]">
                    <p className="text-[13px] text-white leading-snug">Yes please! 🙌</p>
                  </div>
                </div>

                {/* AI typing */}
                <div
                  className="flex items-start transition-all duration-700 ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '2400ms'
                  }}
                >
                  <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 bg-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade overlay - white */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, white 0%, white 20%, transparent 100%)'
          }}
        />
      </div>
    </div>
  );
}

// High-Performance AI Content Illustration
function HighPerformanceContentIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        {/* Main card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <Zap className="w-5 h-5 text-black" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Content Generator</p>
              <p className="text-[10px] text-gray-500">A/B variants generated</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium border border-green-200">Ready</span>
          </div>

          {/* Side by side content variants */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Variant A - Winner */}
              <div className="rounded-lg border border-[#323dfe] bg-[#323dfe]/5 p-3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#323dfe] text-white flex items-center justify-center text-xs font-semibold">
                      A
                    </div>
                    <span className="text-[10px] text-[#323dfe] font-medium uppercase tracking-wide">Winner</span>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-[#323dfe]">94%</p>
                    <p className="text-[9px] text-gray-500">score</p>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-md border border-gray-200 p-3">
                  <p className="text-[14px] text-gray-700 leading-relaxed">
                    Flash Sale: 40% off everything ends tonight. Shop now →
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-[#323dfe]/20">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Est. CTR</span>
                    <span className="text-[#323dfe] font-medium">24%</span>
                  </div>
                </div>
              </div>

              {/* Variant B */}
              <div className="rounded-lg border border-gray-200 bg-white p-3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-semibold">
                      B
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Variant</span>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-600">87%</p>
                    <p className="text-[9px] text-gray-500">score</p>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-md border border-gray-200 p-3">
                  <p className="text-[14px] text-gray-700 leading-relaxed">
                    Hey {"{name}"}, your favorites are on sale. 40% off for 24hrs!
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Est. CTR</span>
                    <span className="text-gray-600 font-medium">18%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance prediction */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">24%</p>
                <p className="text-[9px] text-gray-500">Click rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">$12.4k</p>
                <p className="text-[9px] text-gray-500">Est. revenue</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-[#323dfe]">8.2x</p>
                <p className="text-[9px] text-gray-500">ROI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Personalized Recommendations Illustration - AI-powered product suggestions
function PersonalizedRecommendationsIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        {/* Recommendations Panel */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <Target className="w-5 h-5 text-black" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Smart Recommendations</p>
              <p className="text-[10px] text-gray-500">AI-powered personalization</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium border border-green-200">Live</span>
          </div>

          {/* Customer Profile */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="/images/avatars/face-4.jpg"
                  alt="Jessica Davis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-gray-900">Jessica Davis</p>
                <p className="text-[10px] text-gray-500">Based on 24 interactions • Last active 2h ago</p>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="flex-1 px-4 py-3 space-y-2.5 overflow-hidden">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Recommended for Jessica</p>

            {[
              { name: "Summer Dress", match: "94%", reason: "Viewed similar", img: "/images/products/summer-dress.jpg" },
              { name: "Beach Sandals", match: "89%", reason: "Complements cart", img: "/images/products/beach-sandals.jpg" },
              { name: "Sun Hat", match: "85%", reason: "Trending in area", img: "/images/products/sun-hat.jpg" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-gray-900">{item.name}</p>
                  <p className="text-[10px] text-gray-500">{item.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold text-[#323dfe]">{item.match}</p>
                  <p className="text-[9px] text-gray-400">match</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">ML model v3.2</span>
            <span className="text-[10px] font-medium text-gray-700">3.2x conversion lift</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Knowledge Integration Illustration with Brand Logos
function KnowledgeIntegrationIllustration() {
  // Brand logos - using Simple Icons CDN (8 integrations in one row)
  const brands = [
    { name: "Shopify", logo: "/images/icons/shopify.svg" },
    { name: "Salesforce", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300A1E0'%3E%3Cpath d='M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.884-.06-1.305-.165a3.975 3.975 0 0 1-3.525 2.145c-.57 0-1.125-.12-1.62-.36a4.795 4.795 0 0 1-4.29 2.655 4.815 4.815 0 0 1-4.56-3.27A4.05 4.05 0 0 1 0 13.124a4.05 4.05 0 0 1 2.25-3.63 4.785 4.785 0 0 1-.45-2.04A4.79 4.79 0 0 1 6.6 2.664c1.38 0 2.61.585 3.405 1.5z'/%3E%3C/svg%3E" },
    { name: "HubSpot", logo: "/images/icons/hubspot.svg" },
    { name: "Zendesk", logo: "/images/icons/zendesk.svg" },
    { name: "Stripe", logo: "/images/icons/stripe.svg" },
    { name: "Intercom", logo: "/images/icons/intercom.svg" },
    { name: "Slack", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23E01E5A' d='M5.042 15.166a2.528 2.528 0 0 1-2.52 2.521A2.528 2.528 0 0 1 0 15.166a2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.528 2.528 0 0 1 2.521-2.52 2.528 2.528 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.521v-6.313z'/%3E%3Cpath fill='%2336C5F0' d='M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z'/%3E%3Cpath fill='%232EB67D' d='M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.52 2.522v6.312z'/%3E%3Cpath fill='%23ECB22E' d='M15.164 18.956a2.528 2.528 0 0 1 2.52 2.522A2.528 2.528 0 0 1 15.165 24a2.528 2.528 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.528 2.528 0 0 1-2.52-2.522 2.528 2.528 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z'/%3E%3C/svg%3E" },
    { name: "Notion", logo: "/images/icons/notion.svg" },
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        {/* Main card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <Database className="w-5 h-5 text-black" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Knowledge Sources</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #cd3ef9, #323dfe)' }} />
                <p className="text-[10px] text-gray-500">8 integrations connected</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium border border-green-200">Synced</span>
          </div>

          {/* Integration sources with real logos - Single row */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between gap-1.5">
              {brands.map((brand, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-1.5">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-gray-600 text-center font-medium">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge stats */}
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-2">Indexed Data</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-white rounded-md border border-gray-200">
                <p className="text-lg font-semibold text-gray-900">12.4k</p>
                <p className="text-[9px] text-gray-500">Products</p>
              </div>
              <div className="text-center p-2 bg-white rounded-md border border-gray-200">
                <p className="text-lg font-semibold text-gray-900">856</p>
                <p className="text-[9px] text-gray-500">FAQs</p>
              </div>
              <div className="text-center p-2 bg-white rounded-md border border-gray-200">
                <p className="text-lg font-semibold text-gray-900">45k</p>
                <p className="text-[9px] text-gray-500">Customers</p>
              </div>
            </div>
          </div>

          {/* Recent sync activity */}
          <div className="flex-1 p-4 overflow-hidden">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mb-2">Sync Activity</p>
            <div className="space-y-2">
              {[
                { action: "Product catalog updated", source: "Shopify", time: "2m ago" },
                { action: "Customer data synced", source: "HubSpot", time: "15m ago" },
                { action: "Support docs indexed", source: "Zendesk", time: "1h ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] p-2 bg-gray-50 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-gray-700 flex-1">{activity.action}</span>
                  <span className="text-gray-500 px-1.5 py-0.5 bg-white rounded border border-gray-200">{activity.source}</span>
                  <span className="text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 24/7 Availability Illustration
function Availability247Illustration() {
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimatedBars(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Chart data matching the reference image pattern
  const hourlyData = [
    { hour: "12a", value: 12 }, { hour: "3a", value: 6 }, { hour: "6a", value: 18 },
    { hour: "9a", value: 55 }, { hour: "12p", value: 72 }, { hour: "3p", value: 85 },
    { hour: "6p", value: 95 }, { hour: "9p", value: 42 },
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        {/* Main card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <Clock className="w-6 h-6 text-black" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-gray-900">24/7 Automation</p>
              <p className="text-[11px] text-gray-500">Always-on engagement</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold bg-gradient-to-r from-[#323dfe] to-[#323dfe] bg-clip-text text-transparent">99.9%</p>
              <p className="text-[10px] text-gray-500">Uptime</p>
            </div>
          </div>

          {/* 24-hour activity chart */}
          <div className="px-4 py-4 border-b border-gray-100 flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Messages by Hour</p>
              <p className="text-[11px] text-gray-900 font-medium">2,847 today</p>
            </div>
            {/* Chart area */}
            <div className="relative h-20">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
              </div>
              {/* Bars */}
              <div className="relative h-full flex items-end justify-between gap-2 px-1">
                {hourlyData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex items-end justify-center h-[60px]">
                      <div
                        className="w-full max-w-[28px] rounded-t-sm bg-gradient-to-t from-[#323dfe] to-[#5b63ff] transition-all duration-700 ease-out"
                        style={{
                          height: animatedBars ? `${item.value}%` : '0%',
                          transitionDelay: `${i * 80}ms`
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1.5">{item.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="px-4 py-3">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="text-center py-2.5 px-2 bg-white rounded-lg border border-gray-200">
                <p className="text-xl font-semibold text-gray-900">3s</p>
                <p className="text-[9px] text-gray-500">Avg response</p>
              </div>
              <div className="text-center py-2.5 px-2 bg-white rounded-lg border border-gray-200">
                <p className="text-xl font-semibold text-gray-900">94%</p>
                <p className="text-[9px] text-gray-500">Resolution</p>
              </div>
              <div className="text-center py-2.5 px-2 bg-white rounded-lg border border-gray-200">
                <p className="text-xl font-semibold text-green-500">0</p>
                <p className="text-[9px] text-gray-500">Missed</p>
              </div>
            </div>
          </div>

          {/* After-hours highlight */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-11 h-11 rounded-xl bg-gray-200/70 flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-black" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">After-hours coverage</p>
                <p className="text-[11px] text-gray-500">412 conversations handled overnight</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[15px] font-semibold bg-gradient-to-r from-[#323dfe] to-[#5b63ff] bg-clip-text text-transparent">$8.4k</p>
                <p className="text-[9px] text-gray-400">revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration switch functions
function BrandIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "two-way-conversations":
      return <TwoWayConversationIllustration />;
    case "high-performance":
      return <HighPerformanceContentIllustration />;
    case "brand-personalized":
    default:
      return <BrandPersonalityIllustration />;
  }
}

function KnowledgeIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "knowledge-integration":
      return <KnowledgeIntegrationIllustration />;
    case "24-7-availability":
      return <Availability247Illustration />;
    case "personalized-recommendations":
    default:
      return <PersonalizedRecommendationsIllustration />;
  }
}

export default function SMSAIAgentsAccordion() {
  const [activeBrandFeature, setActiveBrandFeature] = useState<string>(brandFeatures[0].id);
  const [activeKnowledgeFeature, setActiveKnowledgeFeature] = useState<string>(knowledgeFeatures[0].id);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          24/7 AI agents that automate
          <br />
          marketing for you
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 md:mb-16">
          Transform customer interactions with brand-aligned SMS agents that drive sales, recommend products, and handle inquiries - without human intervention.
        </p>

        {/* First Accordion Section - Text Left, Image Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-16 lg:mb-24">
          {/* Left - Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              value={activeBrandFeature}
              onValueChange={(value) => value && setActiveBrandFeature(value)}
              className="w-full"
            >
              {brandFeatures.map((feature) => (
                <AccordionItem
                  key={feature.id}
                  value={feature.id}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="py-4 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`transition-colors ${
                          activeBrandFeature === feature.id
                            ? "text-[#323dfe]"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {feature.icon}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors ${
                          activeBrandFeature === feature.id
                            ? "text-black"
                            : "text-gray-700"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 pr-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right - Preview Image */}
          <div className="order-first lg:order-last">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
              <BrandIllustrationSwitch activeFeature={activeBrandFeature} />
            </div>
          </div>
        </div>

        {/* Second Accordion Section - Image Left, Text Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left - Preview Image */}
          <div>
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
              <KnowledgeIllustrationSwitch activeFeature={activeKnowledgeFeature} />
            </div>
          </div>

          {/* Right - Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              value={activeKnowledgeFeature}
              onValueChange={(value) => value && setActiveKnowledgeFeature(value)}
              className="w-full"
            >
              {knowledgeFeatures.map((feature) => (
                <AccordionItem
                  key={feature.id}
                  value={feature.id}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="py-4 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`transition-colors ${
                          activeKnowledgeFeature === feature.id
                            ? "text-[#323dfe]"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {feature.icon}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors ${
                          activeKnowledgeFeature === feature.id
                            ? "text-black"
                            : "text-gray-700"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 pr-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
