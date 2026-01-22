"use client";

import { Layers, Bot, Zap, Globe, Phone, MessageSquare } from "lucide-react";

// Custom WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Chat icon
const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const channels = [
  { name: "Voice", icon: Phone },
  { name: "Chat", icon: ChatIcon },
  { name: "WhatsApp", icon: WhatsAppIcon },
  { name: "SMS", icon: MessageSquare },
];

interface PlivoHeroProps {
  headline: string;
  subheadline: string;
}

const features = [
  {
    title: "Ultra-low latency infrastructure",
    icon: Zap,
  },
  {
    title: "Global telephony built-in",
    icon: Globe,
  },
  {
    title: "API & no-code options",
    icon: Bot,
  },
  {
    title: "ASR/TTS & LLM - yours or ours",
    icon: Layers,
  },
];

export const PlivoHero = ({
  headline,
  subheadline,
}: PlivoHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-8 md:pt-16 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Headline */}
            <div>
              <h1 className="font-sora text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-black sm:text-[36px] lg:text-[42px]">
                {headline}
              </h1>
              <p className="mt-4 text-[15px] font-normal text-gray-600 leading-[1.7] sm:text-[16px] lg:text-[17px]">
                {subheadline}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-2.5"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#323dfe]" />
                    <span className="font-medium text-[14px] text-black">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://console.plivo.com/accounts/register/"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 text-[14px] font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md"
              >
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                Get started now
              </a>
              <a
                href="/talk-to-agent/"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-[14px] font-medium text-black transition-all hover:bg-gray-50"
              >
                Talk to an Agent
              </a>
            </div>
          </div>

          {/* Right side - Video with Available On */}
          <div className="relative">
            {/* Works on - Top Right */}
            <div className="flex items-center justify-end gap-2 mb-3">
              <span className="text-[11px] text-gray-500">Works on:</span>
              <div className="flex items-center gap-1.5">
                {channels.map((channel) => (
                  <div
                    key={channel.name}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-500"
                  >
                    <channel.icon className="h-3 w-3" />
                    {channel.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#d4f5ed] via-[#e8f9f4] to-[#c5f0e8]">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                  }}
                />
                <iframe
                  src="https://player.vimeo.com/video/1050107257?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Plivo AI Agents Demo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlivoHero;
