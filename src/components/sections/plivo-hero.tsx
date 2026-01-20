"use client";

import { Phone, MessageSquare } from "lucide-react";

// Custom WhatsApp icon matching plivo.com style
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Chat icon matching plivo.com
const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

interface PlivoHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
}

const channels = [
  { name: "Voice", icon: Phone, href: "/voice/overview/" },
  { name: "Chat", icon: ChatIcon, href: "/chat/overview/" },
  { name: "WhatsApp", icon: WhatsAppIcon, href: "/whatsapp-ai-agents/" },
  { name: "SMS", icon: MessageSquare, href: "/sms/overview/" },
];

export const PlivoHero = ({
  headline,
  subheadline,
  ctaText,
  ctaHref,
}: PlivoHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Text Content */}
        <div className="mx-auto max-w-[900px] text-center">
          {/* Headline */}
          <h1 className="mb-5 font-sora text-[32px] font-normal leading-[1.2] tracking-[-0.01em] text-black sm:text-[42px] lg:text-[48px]">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-[720px] text-[16px] font-normal text-black leading-[1.7] sm:text-[17px]">
            {subheadline}
          </p>

          {/* Single CTA Button */}
          <div className="mb-12">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-black/90"
            >
              {ctaText}
            </a>
          </div>
        </div>

        {/* Hero Video Section */}
        <div className="relative mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Available On - Top Right positioned outside/above gradient */}
            <div className="absolute right-0 top-0 z-20 flex flex-col items-start gap-2 bg-white rounded-bl-xl py-4 px-5">
              <span className="text-[13px] font-normal text-gray-400">
                Available On
              </span>
              <div className="flex items-center gap-2">
                {channels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-normal text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
                  >
                    <channel.icon className="h-3.5 w-3.5" />
                    {channel.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Video/Gradient Background */}
            <div
              className="relative aspect-[16/9] w-full"
              style={{
                background: 'linear-gradient(120deg, #c5f0e8 0%, #d5f5ee 20%, #e5faf4 40%, #f2fcf9 60%, #e8f8f2 80%, #d0f2e8 100%)'
              }}
            >
              {/* Grid pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
                  backgroundSize: '45px 45px'
                }}
              />

              {/* Vimeo Video Embed */}
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
    </section>
  );
};

export default PlivoHero;
