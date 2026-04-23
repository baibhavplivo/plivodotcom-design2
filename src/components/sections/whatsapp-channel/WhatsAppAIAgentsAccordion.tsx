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
  AudioLines,
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// First accordion features
const brandFeatures: Feature[] = [
  {
    id: "brand-personalized",
    icon: <Sparkles className="h-4 w-4" />,
    title: "Brand-personalized AI agents",
    description:
      "Configure your WhatsApp AI agents with your brand's vocabulary, personality, and tone of voice for consistent, on-brand customer interactions.",
  },
  {
    id: "two-way-conversations",
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Two-way conversations that feel human",
    description:
      "Engage customers with natural, conversational WhatsApp interactions that understand context and respond intelligently.",
  },
  {
    id: "high-performance",
    icon: <Zap className="h-4 w-4" />,
    title: "High-performance AI content",
    description:
      "Generate compelling WhatsApp content at scale with AI that understands your products, promotions, and customer preferences.",
  },
  {
    id: "voices-feel-real",
    icon: <AudioLines className="h-4 w-4" />,
    title: "Voices that feel real",
    description:
      "Deliver natural WhatsApp voice conversations in 10+ languages and accents while staying true to your brand's tone, style, and emotion.",
  },
];

// Second accordion features
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
      "Connect your product catalog, CRM, and support docs so AI agents have complete context for every WhatsApp interaction.",
  },
  {
    id: "24-7-availability",
    icon: <Clock className="h-4 w-4" />,
    title: "Works 24/7, handles every customer action",
    description:
      "Never miss a lead or support request. AI agents work around the clock on WhatsApp to engage customers and drive conversions.",
  },
];

// Brand Personality Configuration Illustration
function BrandPersonalityIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        {/* Configuration Panel */}
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">Brand Voice Configuration</p>
              <p className="text-[10px] text-muted-foreground">Configure AI personality settings</p>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-4 space-y-4 overflow-hidden">
            {/* Brand Name Input */}
            <div>
              <label className="text-[11px] font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Brand Name</label>
              <div className="mt-1.5 px-3 py-2 bg-surface rounded-md border border-border text-sm text-foreground">
                TechStore
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="text-[11px] font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Tone of Voice</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {["Friendly", "Professional", "Casual"].map((tone, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-md text-xs font-medium text-center cursor-pointer transition-colors ${
                      i === 0
                        ? "bg-surface border border-border text-foreground/80 border border-primary"
                        : "bg-surface text-muted-foreground border border-border"
                    }`}
                  >
                    {tone}
                  </div>
                ))}
              </div>
            </div>

            {/* Personality Traits */}
            <div>
              <label className="text-[11px] font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Personality Traits</label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["Empathetic", "Helpful", "Enthusiastic", "Concise"].map((trait, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                      i < 3
                        ? "bg-surface border border-border text-foreground/80 border border-primary/20"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-surface/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-[11px] text-muted-foreground">AI agent configured and active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Two-Way Conversation Illustration - WhatsApp Phone UI
function TwoWayConversationIllustration() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full pt-3 sm:pt-4 flex justify-center overflow-hidden">
        {/* Phone device */}
        <div className="w-[280px] sm:w-[320px] h-[500px]">
          {/* Phone outer frame */}
          <div className="relative rounded-[36px] p-1.5 h-full border border-border-strong bg-muted">

            {/* Screen */}
            <div className="relative rounded-[32px] overflow-hidden bg-[#efeae2] dark:bg-[#0b141a] shadow-inner h-full flex flex-col">
              {/* WhatsApp header */}
              <div className="h-14 bg-[#075E54] dark:bg-[#1f2c33] flex items-center px-3 gap-2 rounded-t-[32px]">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-semibold text-muted-foreground">TS</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">TechStore AI</p>
                  <p className="text-white/70 text-[10px]">online</p>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 px-3 py-3 space-y-2 bg-[#efeae2] dark:bg-[#0b141a]">
                {/* AI message */}
                <div
                  className="flex items-start transition-all duration-700 ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '0ms'
                  }}
                >
                  <div className="relative rounded-lg rounded-tl-sm px-2.5 py-1.5 max-w-[85%] bg-background shadow-sm text-[#111b21] [&_p]:!text-[#111b21]">
                    <p className="text-[12px] text-foreground leading-snug">Hi Sarah! 👋 Your cart has some great items. Ready to check out?</p>
                    <p className="text-[5px] text-muted-foreground text-right mt-0.5">9:41 AM</p>
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
                  <div className="relative rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] bg-[#dcf8c6] dark:bg-[#005c4b] shadow-sm text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
                    <p className="text-[12px] text-[#111b21] leading-snug">Yes! But I had a question about sizing</p>
                    <p className="text-[5px] text-[#667781] text-right mt-0.5 flex items-center justify-end gap-0.5">9:41 AM <svg className="w-[5px] h-[5px] text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.88 5.64 6.37a.365.365 0 00-.51-.063l-.478.372a.365.365 0 00-.063.51l3.65 4.49a.365.365 0 00.564.004l6.145-7.858a.365.365 0 00-.063-.51z"/><path d="M12.01 3.316l-.478-.372a.365.365 0 00-.51.063L5.666 9.88 4.64 8.37a.365.365 0 00-.51-.063l-.478.372a.365.365 0 00-.063.51l1.65 2.49a.365.365 0 00.564.004l6.145-7.858a.365.365 0 00-.063-.51z"/></svg></p>
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
                  <div className="relative rounded-lg rounded-tl-sm px-2.5 py-1.5 max-w-[85%] bg-background shadow-sm text-[#111b21] [&_p]:!text-[#111b21]">
                    <p className="text-[12px] text-foreground leading-snug">The blue dress runs true to size. Based on your orders, Medium would be perfect!</p>
                    <p className="text-[5px] text-muted-foreground text-right mt-0.5">9:42 AM</p>
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
                  <div className="relative rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] bg-[#dcf8c6] dark:bg-[#005c4b] shadow-sm text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
                    <p className="text-[12px] text-[#111b21] leading-snug">Add it to my cart! 🙌</p>
                    <p className="text-[5px] text-[#667781] text-right mt-0.5 flex items-center justify-end gap-0.5">9:42 AM <svg className="w-[5px] h-[5px] text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 00-.51.063L8.666 9.88 5.64 6.37a.365.365 0 00-.51-.063l-.478.372a.365.365 0 00-.063.51l3.65 4.49a.365.365 0 00.564.004l6.145-7.858a.365.365 0 00-.063-.51z"/><path d="M12.01 3.316l-.478-.372a.365.365 0 00-.51.063L5.666 9.88 4.64 8.37a.365.365 0 00-.51-.063l-.478.372a.365.365 0 00-.063.51l1.65 2.49a.365.365 0 00.564.004l6.145-7.858a.365.365 0 00-.063-.51z"/></svg></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 20%, transparent 100%)'
          }}
        />
      </div>
    </div>
  );
}

// High-Performance AI Content Illustration
function HighPerformanceContentIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Zap className="w-5 h-5 text-foreground" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Message Generator</p>
              <p className="text-[10px] text-muted-foreground">A/B variants generated</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-200">Ready</span>
          </div>

          {/* Content variants */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Variant A - Winner */}
              <div className="rounded-lg border border-primary bg-primary/5 p-3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-xs font-semibold">
                      A
                    </div>
                    <span className="text-[10px] text-primary font-medium font-mono-ui uppercase tracking-[0.1em]">Winner</span>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-primary">92%</p>
                    <p className="text-[9px] text-muted-foreground">score</p>
                  </div>
                </div>
                <div className="flex-1 bg-background rounded-md border border-border p-3">
                  <p className="text-[12px] text-foreground/80 leading-relaxed">
                    🎉 Flash Sale! 40% off ends tonight. Shop now →
                  </p>
                </div>
              </div>

              {/* Variant B */}
              <div className="rounded-lg border border-border bg-background p-3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold">
                      B
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium font-mono-ui uppercase tracking-[0.1em]">Variant</span>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-muted-foreground">85%</p>
                    <p className="text-[9px] text-muted-foreground">score</p>
                  </div>
                </div>
                <div className="flex-1 bg-surface rounded-md border border-border p-3">
                  <p className="text-[12px] text-foreground/80 leading-relaxed">
                    Hey! Your favorites are on sale. 40% off for 24hrs!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="px-4 py-3 border-t border-border bg-surface/50">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">28%</p>
                <p className="text-[9px] text-muted-foreground">Open rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">$15.2k</p>
                <p className="text-[9px] text-muted-foreground">Est. revenue</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">9.4x</p>
                <p className="text-[9px] text-muted-foreground">ROI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Personalized Recommendations Illustration
function PersonalizedRecommendationsIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Target className="w-5 h-5 text-foreground" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Smart Recommendations</p>
              <p className="text-[10px] text-muted-foreground">AI-powered personalization</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-200">Live</span>
          </div>

          {/* Customer Profile */}
          <div className="px-4 py-3 border-b border-border bg-surface/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                <img
                  src="/images/avatars/face-4.jpg"
                  alt="Jessica"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-foreground">Jessica Davis</p>
                <p className="text-[10px] text-muted-foreground">Based on 24 interactions</p>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="flex-1 px-4 py-3 space-y-2.5 overflow-hidden">
            <p className="text-[10px] text-muted-foreground font-medium font-mono-ui uppercase tracking-[0.1em]">Recommended for Jessica</p>

            {[
              { name: "Summer Dress", match: "94%", img: "/images/products/summer-dress.jpg" },
              { name: "Beach Sandals", match: "89%", img: "/images/products/beach-sandals.jpg" },
              { name: "Sun Hat", match: "85%", img: "/images/products/sun-hat.jpg" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-surface border border-border">
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold text-primary">{item.match}</p>
                  <p className="text-[9px] text-muted-foreground">match</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Knowledge Integration Illustration
function KnowledgeIntegrationIllustration() {
  const brands = [
    { name: "Shopify", logo: "/images/icons/shopify.svg" },
    { name: "Salesforce", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300A1E0'%3E%3Cpath d='M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.884-.06-1.305-.165a3.975 3.975 0 0 1-3.525 2.145c-.57 0-1.125-.12-1.62-.36a4.795 4.795 0 0 1-4.29 2.655 4.815 4.815 0 0 1-4.56-3.27A4.05 4.05 0 0 1 0 13.124a4.05 4.05 0 0 1 2.25-3.63 4.785 4.785 0 0 1-.45-2.04A4.79 4.79 0 0 1 6.6 2.664c1.38 0 2.61.585 3.405 1.5z'/%3E%3C/svg%3E" },
    { name: "HubSpot", logo: "/images/icons/hubspot.svg" },
    { name: "Zendesk", logo: "/images/icons/zendesk.svg" },
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Database className="w-5 h-5 text-foreground" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Knowledge Sources</p>
              <p className="text-[10px] text-muted-foreground">Connected integrations</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-200">Synced</span>
          </div>

          {/* Integration logos */}
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              {brands.map((brand, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center p-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center font-medium">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 py-3 bg-surface/50 border-b border-border">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-background rounded-md border border-border">
                <p className="text-lg font-semibold text-foreground">12.4k</p>
                <p className="text-[9px] text-muted-foreground">Products</p>
              </div>
              <div className="text-center p-2 bg-background rounded-md border border-border">
                <p className="text-lg font-semibold text-foreground">856</p>
                <p className="text-[9px] text-muted-foreground">FAQs</p>
              </div>
              <div className="text-center p-2 bg-background rounded-md border border-border">
                <p className="text-lg font-semibold text-foreground">45k</p>
                <p className="text-[9px] text-muted-foreground">Customers</p>
              </div>
            </div>
          </div>

          {/* Recent sync */}
          <div className="flex-1 p-4">
            <p className="text-[10px] text-muted-foreground font-medium font-mono-ui uppercase tracking-[0.1em] mb-2">Last Sync</p>
            <div className="flex items-center gap-2 text-[10px] p-2 bg-surface rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground/80 flex-1">All sources synced</span>
              <span className="text-muted-foreground">2m ago</span>
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
    const timer = setTimeout(() => setAnimatedBars(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const hourlyData = [
    { hour: "12a", value: 12 }, { hour: "3a", value: 6 }, { hour: "6a", value: 18 },
    { hour: "9a", value: 55 }, { hour: "12p", value: 72 }, { hour: "3p", value: 85 },
    { hour: "6p", value: 95 }, { hour: "9p", value: 42 },
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-xl border border-border shadow-sm h-full flex flex-col">
          <div className="px-4 py-3.5 border-b border-border flex items-center gap-3">
            <Clock className="w-6 h-6 text-foreground" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-foreground">24/7 Automation</p>
              <p className="text-[11px] text-muted-foreground">Always-on WhatsApp engagement</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-primary">99.9%</p>
              <p className="text-[10px] text-muted-foreground">Uptime</p>
            </div>
          </div>

          {/* Chart */}
          <div className="px-4 py-4 border-b border-border flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-muted-foreground font-semibold font-mono-ui uppercase tracking-[0.1em]">Messages by Hour</p>
              <p className="text-[11px] text-foreground font-medium">3,247 today</p>
            </div>
            <div className="relative h-20">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-border" />
                <div className="border-b border-border" />
                <div className="border-b border-border" />
              </div>
              <div className="relative h-full flex items-end justify-between gap-2 px-1">
                {hourlyData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex items-end justify-center h-[60px]">
                      <div
                        className="w-full max-w-[28px] rounded-t-sm bg-gradient-to-t from-primary to-black transition-all duration-700 ease-out"
                        style={{
                          height: animatedBars ? `${item.value}%` : '0%',
                          transitionDelay: `${i * 80}ms`
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1.5">{item.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 py-3">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="text-center py-2.5 px-2 bg-background rounded-lg border border-border">
                <p className="text-xl font-semibold text-foreground">2s</p>
                <p className="text-[9px] text-muted-foreground">Avg response</p>
              </div>
              <div className="text-center py-2.5 px-2 bg-background rounded-lg border border-border">
                <p className="text-xl font-semibold text-foreground">96%</p>
                <p className="text-[9px] text-muted-foreground">Resolution</p>
              </div>
              <div className="text-center py-2.5 px-2 bg-background rounded-lg border border-border">
                <p className="text-xl font-semibold text-primary">0</p>
                <p className="text-[9px] text-muted-foreground">Missed</p>
              </div>
            </div>
          </div>

          {/* After-hours */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 p-3.5 bg-surface rounded-xl border border-border">
              <div className="w-11 h-11 rounded-xl bg-gray-200/70 flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground">After-hours coverage</p>
                <p className="text-[11px] text-muted-foreground">524 conversations handled overnight</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[15px] font-semibold text-primary">$11.2k</p>
                <p className="text-[9px] text-muted-foreground">revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Voices that Feel Real Illustration
function VoicesFeelRealIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <AudioLines className="w-5 h-5 text-foreground" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Voice Configuration</p>
              <p className="text-[10px] text-muted-foreground">WhatsApp call voice settings</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium border border-green-200">Active</span>
          </div>

          {/* Voice options */}
          <div className="flex-1 p-4 space-y-3 overflow-hidden">
            {/* Selected voice */}
            <div className="rounded-lg border-2 border-primary bg-primary/5 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <AudioLines className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-foreground">Sarah</p>
                    <p className="text-[10px] text-muted-foreground">English (US) - Warm & Friendly</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              {/* Waveform */}
              <div className="flex items-center gap-0.5 h-6">
                {[3, 5, 8, 12, 7, 10, 14, 6, 9, 13, 5, 8, 11, 7, 4, 6, 10, 8, 5, 3].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/40 rounded-full" style={{ height: `${h * 1.5}px` }} />
                ))}
              </div>
            </div>

            {/* Other voices */}
            {[
              { name: "Priya", lang: "Hindi - Professional", flag: "🇮🇳" },
              { name: "Carlos", lang: "Spanish (MX) - Casual", flag: "🇲🇽" },
              { name: "Yuki", lang: "Japanese - Polite", flag: "🇯🇵" },
            ].map((voice, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface border border-border">
                <span className="text-sm">{voice.flag}</span>
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-foreground">{voice.name}</p>
                  <p className="text-[9px] text-muted-foreground">{voice.lang}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration switches
function BrandIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "two-way-conversations":
      return <TwoWayConversationIllustration />;
    case "high-performance":
      return <HighPerformanceContentIllustration />;
    case "voices-feel-real":
      return <VoicesFeelRealIllustration />;
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

export default function WhatsAppAIAgentsAccordion() {
  const [activeBrandFeature, setActiveBrandFeature] = useState<string>(brandFeatures[0].id);
  const [activeKnowledgeFeature, setActiveKnowledgeFeature] = useState<string>(knowledgeFeatures[0].id);

  return (
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>ai agents accordion</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          AI agents that remember context
          <br />
          and personalize every interaction
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-12 md:mb-16">
          Unified 360° customer profiles, knowledge source integration, and human-like conversations that understand preferences and history.
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
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-4 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`transition-colors ${
                          activeBrandFeature === feature.id
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-muted-foreground"
                        }`}
                      >
                        {feature.icon}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors ${
                          activeBrandFeature === feature.id
                            ? "text-foreground"
                            : "text-foreground/80"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 pr-4 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-4 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`transition-colors ${
                          activeKnowledgeFeature === feature.id
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-muted-foreground"
                        }`}
                      >
                        {feature.icon}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors ${
                          activeKnowledgeFeature === feature.id
                            ? "text-foreground"
                            : "text-foreground/80"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 pr-4 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
