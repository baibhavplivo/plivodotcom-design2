"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  Clock,
  MessageSquare,
  Users,
  BookOpen,
  Blocks,
  UserCheck,
  BarChart3,
  Link2,
  Image,
  BadgeCheck,
  MousePointerClick,
  FileText,
  Languages,
  Megaphone,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import BasicAIChatInput from "@/components/ui/ai-chat-input-block";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ── Sub-category 1: AI Agents ──────────────────────────────────────────────
const aiAgentFeatures: Feature[] = [
  {
    id: "customize-brand",
    icon: <Sparkles className="h-4 w-4" />,
    title: "Customize AI agents to your brand",
    description:
      "Customize your WhatsApp AI agents to speak your brand's language, personality and values, while delivering highly personalized interactions.",
  },
  {
    id: "247-availability",
    icon: <Clock className="h-4 w-4" />,
    title: "24/7 availability",
    description:
      "Works round the clock, ensuring customers receive instant assistance - from processing orders, to resolving support issues. No more lost sales or unanswered questions outside business hours.",
  },
  {
    id: "natural-conversations",
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Natural, human-like conversations",
    description:
      "Chat with an AI Agent that responds just like a real person would - understanding context to handle high-volume queries and accelerate resolution.",
  },
];

// ── Sub-category 2: Customer Engagement Platform ───────────────────────────
const engagementFeatures: Feature[] = [
  {
    id: "no-code-studio",
    icon: <Blocks className="h-4 w-4" />,
    title: "No-code AI agent studio",
    description:
      "Easily create your custom AI agent - without writing a single line of code.",
  },
  {
    id: "knowledge-sources",
    icon: <BookOpen className="h-4 w-4" />,
    title: "Integrate knowledge sources",
    description:
      "Our AI utilizes internal business documents like SOPs, FAQs, and blog posts to accurately resolve customer queries.",
  },
  {
    id: "human-in-loop",
    icon: <UserCheck className="h-4 w-4" />,
    title: "Human-in-the-loop",
    description:
      "Seamlessly escalate complex queries to human agents, while carrying forward the context of the entire conversation.",
  },
  {
    id: "seamless-integrations",
    icon: <Link2 className="h-4 w-4" />,
    title: "Seamless integrations",
    description:
      "Connect with Shopify, Zoho, Salesforce, HubSpot, Zendesk, and other business systems effortlessly, for Agents to be context-aware and take actions.",
  },
];

// ── Sub-category 3: WhatsApp Channel ───────────────────────────────────────
const channelFeatures: Feature[] = [
  {
    id: "rich-media",
    icon: <Image className="h-4 w-4" />,
    title: "Rich media support",
    description:
      "Share images, videos, documents and buttons to create engaging WhatsApp conversations with customers.",
  },
  {
    id: "verified-profile",
    icon: <BadgeCheck className="h-4 w-4" />,
    title: "Verified business profile & green tick",
    description:
      "Build trust with an official WhatsApp Business presence.",
  },
  {
    id: "quick-reply",
    icon: <MousePointerClick className="h-4 w-4" />,
    title: "Quick reply & interactive buttons",
    description:
      "Add one-tap response options that help customers make choices quickly and keep conversations flowing.",
  },
  {
    id: "message-templates",
    icon: <FileText className="h-4 w-4" />,
    title: "Message templates",
    description:
      "Build and reuse approved WhatsApp templates for consistent, personalized messages across all customer communications.",
  },
  {
    id: "multi-language",
    icon: <Languages className="h-4 w-4" />,
    title: "Chat across multiple languages",
    description:
      "Detect and chat with customers in their preferred language - automatic detection and natural responses across 28 global languages.",
  },
  {
    id: "broadcast",
    icon: <Megaphone className="h-4 w-4" />,
    title: "Broadcast & bulk messages",
    description:
      "Send personalized updates, offers, and announcements to thousands of customers simultaneously with targeted delivery.",
  },
];

// ── Illustrations ──────────────────────────────────────────────────────────

// Reusable illustration wrapper
function IllustrationCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <span className="text-foreground">{icon}</span>
            <p className="text-sm font-semibold text-foreground flex-1">{title}</p>
            {badge && (
              <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50">
                {badge}
              </span>
            )}
          </div>
          <div className="flex-1 p-4 overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── AI Agent Illustrations ─────────────────────────────────────────────────

function CustomizeBrandIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-2.5 sm:p-3 md:p-4">
        <div className="bg-background rounded-xl shadow-sm border border-border h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-2.5 sm:p-3 border-b border-border">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-sm">
                <span className="text-white text-[10px] sm:text-xs">✦</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-foreground truncate">Acme Support Agent</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Brand voice configured</p>
              </div>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] sm:text-xs text-primary font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 sm:p-4 space-y-4 sm:space-y-5 min-h-0">
            {/* Personality traits */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 font-medium font-mono-ui uppercase tracking-[0.1em]">Personality Traits</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  { trait: 'Friendly', active: true },
                  { trait: 'Professional', active: true },
                  { trait: 'Helpful', active: true },
                  { trait: 'Empathetic', active: false },
                ].map((item, i) => (
                  <span
                    key={i}
                    className={`text-[11px] sm:text-xs px-2.5 py-1 sm:py-1.5 rounded-full border transition-all duration-200 ${
                      item.active
                        ? 'bg-muted text-foreground border-gray-900'
                        : 'bg-surface/50 text-gray-300 border-border'
                    }`}
                  >
                    {item.trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Tone slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium font-mono-ui uppercase tracking-[0.1em]">Conversation Tone</p>
                <span className="text-[10px] sm:text-xs text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">Warm</span>
              </div>
              <div className="h-1.5 sm:h-2 rounded-full bg-muted relative">
                <div className="absolute left-0 top-0 h-1.5 sm:h-2 w-3/4 rounded-full bg-gradient-to-r from-gray-400 to-primary" />
                <div className="absolute left-3/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-background border-2 border-primary shadow-sm" />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">Formal</span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">Casual</span>
              </div>
            </div>

            {/* Response style */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 font-medium font-mono-ui uppercase tracking-[0.1em]">Response Style</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Concise', active: false },
                  { label: 'Balanced', active: true },
                  { label: 'Detailed', active: false },
                ].map((item, i) => (
                  <span
                    key={i}
                    className={`text-[11px] sm:text-xs py-1.5 sm:py-2 rounded-lg border text-center ${
                      item.active
                        ? 'bg-surface border border-border text-foreground/80 border-primary shadow-sm'
                        : 'bg-background text-muted-foreground border-border'
                    }`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preview footer */}
          <div className="p-2.5 sm:p-3 bg-surface border-t border-border">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-[7px] sm:text-[8px]">✦</span>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Preview</p>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
              "Hey there! Thanks for reaching out to Acme. I'm here to help - what can I do for you today?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Availability247Illustration() {
  const hours = [
    { label: "12a", val: 20 }, { label: "2a", val: 12 }, { label: "4a", val: 8 },
    { label: "6a", val: 18 }, { label: "8a", val: 42 }, { label: "10a", val: 65 },
    { label: "12p", val: 82 }, { label: "2p", val: 90 }, { label: "4p", val: 95 },
    { label: "6p", val: 78 }, { label: "8p", val: 55 }, { label: "10p", val: 35 },
  ];
  const maxVal = Math.max(...hours.map(h => h.val));
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Clock className="w-5 h-5 text-foreground" />
            <p className="text-sm font-semibold text-foreground flex-1">24/7 Activity</p>
            <span className="text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium border border-green-200 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Live
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between gap-3 sm:gap-4 overflow-hidden">
            {/* Activity chart */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] sm:text-xs font-medium text-muted-foreground">Conversations today</p>
                <span className="text-sm sm:text-base font-bold text-foreground">1,847</span>
              </div>
              <div className="flex items-end gap-[4px] sm:gap-[6px]" style={{ height: '80px' }}>
                {hours.map((h, i) => {
                  const pxHeight = Math.max(4, Math.round((h.val / maxVal) * 80));
                  return (
                    <div key={i} className="flex-1 flex items-end justify-center">
                      <div
                        style={{
                          height: `${pxHeight}px`,
                          background: h.val > 70
                            ? 'linear-gradient(to top, #000000, #323dfe)'
                            : h.val > 40
                              ? 'linear-gradient(to top, #818cf8, #a5b4fc)'
                              : '#c7d2fe',
                          borderRadius: '3px 3px 1px 1px',
                          width: '100%',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex mt-1.5">
                {hours.map((h, i) => (
                  <span key={i} className="flex-1 text-center text-[8px] sm:text-[9px] text-muted-foreground">{i % 2 === 0 ? h.label : ''}</span>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Uptime", value: "99.9%" },
                { label: "Avg response", value: "1.8s" },
                { label: "Resolved", value: "96%" },
              ].map((stat, i) => (
                <div key={i} className="text-center px-2 py-2.5 sm:py-3 rounded-xl border border-border bg-surface">
                  <p className="text-base sm:text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Live status footer */}
            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-surface rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-medium text-foreground/80">After-hours active</span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-foreground">524 chats handled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NaturalConversationIllustration() {
  const chatMessages = [
    { id: 1, type: "outgoing" as const, text: "Do you have blue sneakers in size 10?" },
    { id: 2, type: "incoming" as const, text: "Yes! They run small though - I'd recommend 10.5 👟" },
    { id: 3, type: "outgoing" as const, text: "Sounds good, add to cart!" },
    { id: 4, type: "incoming" as const, text: "Done! Ships today. Anything else? 😊" },
  ];

  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);

  useEffect(() => {
    const run = () => {
      setVisibleMsgs([]);
      chatMessages.forEach((msg, i) => {
        setTimeout(() => setVisibleMsgs((prev) => [...prev, msg.id]), 700 * (i + 1));
      });
    };
    run();
    const loop = setInterval(run, 7000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative h-full w-full flex items-start justify-center rounded-xl overflow-hidden pt-4 sm:pt-6" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      {/* Phone device */}
      <div className="relative w-[280px] sm:w-[310px] h-[480px] sm:h-[520px]">
        {/* Phone outer frame */}
        <div
          className="relative rounded-[32px] p-1.5 h-full"
          style={{ background: "linear-gradient(135deg, rgba(205,62,249,0.45) 0%, rgba(50,61,254,0.45) 100%)" }}
        >
          {/* 3D highlight */}
          <div
            className="absolute inset-0 rounded-[32px] opacity-15 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" }}
          />

          {/* Screen */}
          <div className="relative rounded-[30px] overflow-hidden bg-[#efeae2] dark:bg-[#0b141a] shadow-inner h-full flex flex-col">
            {/* WhatsApp header */}
            <div className="h-16 bg-[#075E54] dark:bg-[#1f2c33] flex items-center px-3 gap-2 flex-shrink-0">
              <svg className="w-5 h-5 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">ShoeStore AI</p>
                <p className="text-white/70 text-xs">online</p>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
            </div>

            {/* Chat area with WA pattern */}
            <div
              className="relative flex-1 px-3 pb-3 pt-1 overflow-hidden"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1c4b8' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundColor: "#efeae2" }}
            >
              {/* Date badge */}
              <div className="flex justify-center py-3">
                <span className="px-3 py-1 rounded-md bg-background/80 text-[11px] text-muted-foreground shadow-sm">Today</span>
              </div>

              {/* Messages */}
              <div className="space-y-2">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "transition-all duration-500",
                      visibleMsgs.includes(msg.id)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    )}
                  >
                    {msg.type === "outgoing" ? (
                      <div className="flex justify-end">
                        <div className="relative rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] bg-[#dcf8c6] dark:bg-[#005c4b] shadow-sm text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
                          <div className="absolute -right-2 top-0 w-0 h-0 border-t-8 border-t-[#dcf8c6] dark:border-t-[#005c4b] border-r-8 border-r-transparent" />
                          <p className="text-[13px] text-[#111b21] leading-snug">{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-0.5">
                            <span className="text-[10px] text-[#667781]">9:41 AM</span>
                            <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor">
                              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start max-w-[85%]">
                        <div className="relative rounded-lg rounded-tl-sm px-2.5 py-1.5 bg-background shadow-sm text-[#111b21] [&_p]:!text-[#111b21]">
                          <div className="absolute -left-2 top-0 w-0 h-0 border-t-8 border-t-white dark:border-t-[#1f2c33] border-l-8 border-l-transparent" />
                          <p className="text-[13px] text-foreground leading-snug">{msg.text}</p>
                          <p className="text-[10px] text-muted-foreground text-right mt-0.5">9:41 AM</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* Input area */}
            <div className="px-2 py-2 bg-[#f0f0f0] dark:bg-[#1f2c33] flex items-center gap-2 flex-shrink-0">
              <svg className="w-6 h-6 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <div className="flex-1 rounded-full px-4 py-2 bg-background">
                <span className="text-[13px] text-muted-foreground">Type a message</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 2.76 2.24 5 5 5s5-2.24 5-5h2c0 4.08-3.06 7.44-7 7.93V21h-2v-4.07z" />
                </svg>
              </div>
            </div>

            {/* Home indicator */}
            <div className="h-6 bg-[#f0f0f0] dark:bg-[#1f2c33] flex items-center justify-center flex-shrink-0">
              <div className="w-28 h-1 rounded-full bg-foreground/$1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Customer Engagement Platform Illustrations ─────────────────────────────

function UnifiedProfilesIllustration() {
  return (
    <IllustrationCard icon={<Users className="w-5 h-5" />} title="Customer 360°" badge="Live">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src="/images/avatars/face-1.jpg"
              alt="Customer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground">James Wilson</p>
            <p className="text-[10px] text-muted-foreground">Premium member since 2023</p>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-surface border border-border text-foreground/80 font-medium">VIP</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Orders", value: "47" },
            { label: "LTV", value: "$2.8k" },
            { label: "CSAT", value: "98%" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-1.5 bg-surface rounded-md border border-border">
              <p className="text-[13px] font-semibold text-foreground">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Recent Activity</p>
          {[
            { action: "Purchased Premium Plan", time: "2h ago" },
            { action: "Asked about shipping to UK", time: "1d ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-1.5 bg-surface rounded text-[10px]">
              <span className="text-foreground/80">{item.action}</span>
              <span className="text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </IllustrationCard>
  );
}

function KnowledgeSourcesIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          {/* Header bar */}
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-foreground" />
            <p className="text-[15px] font-semibold text-foreground">Knowledge Base</p>
          </div>

          {/* Content */}
          <div className="flex-1 px-5 py-4 space-y-4 overflow-hidden">
            {/* Sync tabs */}
            <div className="flex gap-2.5">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-[13px] font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Apps
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground text-[13px] font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.2 2.4 3.5 5.5 3.5 9s-1.3 6.6-3.5 9c-2.2-2.4-3.5-5.5-3.5-9s1.3-6.6 3.5-9z" />
                </svg>
                Website
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground text-[13px] font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Files
              </div>
            </div>

            {/* Data source dropdown */}
            <div>
              <p className="text-[12px] text-muted-foreground mb-1.5 font-medium">Select data source</p>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2.5">
                  {/* Notion logo */}
                  <img src="/images/logos/notion.png" alt="Notion" className="w-5 h-5 object-contain" />
                  <span className="text-[13px] text-foreground font-medium">Notion</span>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>

            {/* File tree */}
            <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
              {/* FAQs row */}
              <div className="flex items-center gap-2.5">
                <div className="w-[18px] h-[18px] rounded-[3px] border border-primary bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold text-foreground">FAQs</span>
                <span className="text-[12px] text-muted-foreground">9 pages</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
              </div>

              {/* Policies row */}
              <div className="flex items-center gap-2.5">
                <div className="w-[18px] h-[18px] rounded-[3px] border border-primary bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <svg className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span className="text-[13px] font-semibold text-foreground">Policies</span>
                <span className="text-[12px] text-muted-foreground">3 pages</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
              </div>

              {/* Sub-items */}
              <div className="pl-6 space-y-2.5 border-l-2 border-border ml-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-[3px] border border-border-strong bg-background flex-shrink-0" />
                  <FileText className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <div className="h-2 w-24 rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-[18px] h-[18px] rounded-[3px] border border-border-strong bg-background flex-shrink-0" />
                  <FileText className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <div className="h-2 w-16 rounded-full bg-gray-200" />
                </div>
              </div>

              {/* Blog Posts row */}
              <div className="flex items-center gap-2.5">
                <div className="w-[18px] h-[18px] rounded-[3px] border border-border-strong bg-background flex-shrink-0" />
                <span className="text-[13px] font-medium text-muted-foreground">Blog Posts</span>
                <span className="text-[12px] text-gray-300">124 posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoCodeStudioIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Blocks className="w-5 h-5 text-foreground" />
            <p className="text-sm font-semibold text-foreground flex-1">AI Agent Studio</p>
          </div>
          <div className="flex-1 p-4 overflow-hidden flex items-center justify-center">
            <BasicAIChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}

function HumanInLoopIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-foreground" />
            <p className="text-sm font-semibold text-foreground flex-1">Agent Handoff</p>
            <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50">
              Active
            </span>
          </div>

          {/* Content: Two panels side by side */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Flow diagram */}
            <div className="flex-1 p-5 flex flex-col items-center justify-center border-r border-border bg-surface/50">
              {/* Dashed line top */}
              <div className="w-px h-8 border-l border-dashed border-border-strong" />

              {/* Transfer node */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-background shadow-sm">
                <span className="text-[13px] font-medium text-foreground whitespace-nowrap">Transfer to human agent</span>
                <svg className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                </svg>
              </div>

              {/* Dashed connector with dot */}
              <div className="flex flex-col items-center">
                <div className="w-px h-5 border-l border-dashed border-border-strong" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <div className="w-px h-5 border-l border-dashed border-border-strong" />
              </div>

              {/* Assign node */}
              <div className="w-full max-w-[200px] rounded-xl border border-border bg-background shadow-sm p-3">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-[13px] font-medium text-foreground flex-1">Assign to IT team</span>
                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="18" r="1.5" />
                  </svg>
                </div>
                {/* Skeleton lines */}
                <div className="space-y-2 pl-8">
                  <div className="h-2 w-full rounded-full bg-muted" />
                  <div className="h-2 w-4/5 rounded-full bg-muted" />
                  <div className="h-2 w-3/5 rounded-full bg-muted" />
                </div>
              </div>

              {/* Plus button */}
              <div className="mt-4">
                <div className="w-7 h-7 rounded-full border border-dashed border-border-strong flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right: Settings panel */}
            <div className="flex-1 p-5 flex flex-col">
              <p className="text-[15px] font-semibold text-foreground mb-4">Transfer to human</p>

              {/* Assign to label */}
              <p className="text-[13px] text-muted-foreground font-medium mb-2">Assign to</p>

              {/* Select dropdown */}
              <div className="px-3.5 py-2.5 rounded-lg border border-border mb-4">
                <span className="text-[13px] text-muted-foreground">Select agent or team</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-5 mb-4 border-b border-border">
                <span className="text-[13px] text-muted-foreground pb-2.5">Human Agents</span>
                <span className="text-[13px] font-semibold text-foreground pb-2.5 border-b-2 border-gray-900">Teams</span>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-border mb-4">
                <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <span className="text-[13px] text-muted-foreground">Search Agents</span>
              </div>

              {/* Team list */}
              <div className="space-y-3.5">
                {/* Active row */}
                <div className="flex items-center gap-3">
                  <div className="w-[20px] h-[20px] rounded-[3px] border border-primary bg-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-foreground">IT Support</span>
                  <span className="text-[12px] text-muted-foreground">(25 members)</span>
                </div>

                {/* Inactive rows with skeletons */}
                <div className="flex items-center gap-3">
                  <div className="w-[20px] h-[20px] rounded-[3px] border border-border bg-background flex-shrink-0" />
                  <div className="h-2.5 w-28 rounded-full bg-muted" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[20px] h-[20px] rounded-[3px] border border-border bg-background flex-shrink-0" />
                  <div className="h-2.5 w-24 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EngagementAnalyticsIllustration() {
  return (
    <IllustrationCard icon={<BarChart3 className="w-5 h-5" />} title="Analytics Dashboard" badge="Real-time">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "CSAT Score", value: "95.2%", color: "text-primary" },
            { label: "Response Time", value: "1.8s", color: "text-foreground" },
            { label: "Resolution Rate", value: "94%", color: "text-foreground" },
            { label: "Active Conv.", value: "1,247", color: "text-primary" },
          ].map((metric, i) => (
            <div key={i} className="p-2 bg-surface rounded-lg border border-border">
              <p className={`text-base font-semibold ${metric.color}`}>{metric.value}</p>
              <p className="text-[9px] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground font-medium mb-1.5">Campaign Performance</p>
          <div className="space-y-1.5">
            {[
              { name: "Welcome Series", rate: 82, color: "from-primary to-black" },
              { name: "Cart Recovery", rate: 67, color: "from-primary to-black" },
              { name: "Re-engagement", rate: 54, color: "from-primary to-black" },
            ].map((campaign, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground w-20 truncate">{campaign.name}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full">
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r ${campaign.color}`}
                    style={{ width: `${campaign.rate}%` }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground w-7 text-right">{campaign.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IllustrationCard>
  );
}

function SeamlessIntegrationsIllustration() {
  const brands: { name: string; logo: React.ReactNode }[] = [
    { name: "Shopify", logo: <img src="/images/icons/shopify.svg" alt="Shopify" className="w-8 h-8 object-contain" /> },
    { name: "HubSpot", logo: <img src="/images/icons/hubspot.svg" alt="HubSpot" className="w-8 h-8 object-contain" /> },
    { name: "Zendesk", logo: <img src="/images/icons/zendesk.svg" alt="Zendesk" className="w-8 h-8 object-contain" /> },
    { name: "Zoho", logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#C8202B">
        <path d="M8.66 6.897a1.299 1.299 0 0 0-1.205.765l-.642 1.44-.062-.385A1.291 1.291 0 0 0 5.27 7.648l-4.185.678A1.291 1.291 0 0 0 .016 9.807l.678 4.18a1.293 1.293 0 0 0 1.27 1.087c.074 0 .143-.01.216-.017l4.18-.678c.436-.07.784-.351.96-.723l2.933 1.307a1.304 1.304 0 0 0 .988.026c.321-.12.575-.365.716-.678l.28-.629.038.276a1.297 1.297 0 0 0 1.455 1.103l3.712-.501a1.29 1.29 0 0 0 1.03.514h4.236c.713 0 1.29-.58 1.291-1.291V9.545c0-.712-.58-1.291-1.291-1.291h-4.236c-.079 0-.155.008-.23.022a1.309 1.309 0 0 0-.275-.288c-.275-.21-.614-.3-.958-.253l-4.197.571c-.155.021-.3.07-.432.14L9.159 7.01a1.27 1.27 0 0 0-.499-.113zm-.025.705c.077 0 .159.013.24.052l2.971 1.324c-.128.238-.18.508-.142.782l.357 2.596h.002l-.745 1.672a.59.59 0 0 1-.777.296l-3.107-1.385-.004-.041-.41-2.526L8.1 7.95a.589.589 0 0 1 .536-.348zm-3.159.733c.125 0 .245.039.343.112.13.09.21.227.237.382l.234 1.446-.56 1.259a1.27 1.27 0 0 0-.026.987c.12.322.364.575.678.717l.295.131a.585.585 0 0 1-.428.314l-4.185.678a.59.59 0 0 1-.674-.485l-.678-4.18a.588.588 0 0 1 .485-.674l4.185-.678c.03-.004.064-.01.094-.01zm11.705.09a.59.59 0 0 1 .415.173 1.287 1.287 0 0 0-.416.947v4.237c0 .033.003.065.005.097l-3.55.482a.586.586 0 0 1-.66-.502l-.191-1.403.899-2.017a1.29 1.29 0 0 0-.333-1.5l3.754-.51c.026-.004.051-.004.077-.004zm1.3.532h4.227c.326 0 .588.266.588.588v4.237a.589.589 0 0 1-.588.588h-4.237a.564.564 0 0 1-.12-.013c.47-.246.758-.765.684-1.318zm-5.988.309.254.113c.296.133.43.48.296.777l-.432.97-.207-1.465a.58.58 0 0 1 .09-.395zm5.39.538.453 3.325a.583.583 0 0 1-.453.65zM6.496 11.545l.17 1.052a.588.588 0 0 1-.293-.776zm3.985 4.344a.588.588 0 0 0-.612.603c0 .358.244.61.601.61a.582.582 0 0 0 .607-.608c0-.35-.242-.605-.596-.605zm5.545 0a.588.588 0 0 0-.612.603c0 .358.245.61.602.61a.582.582 0 0 0 .606-.608c0-.35-.24-.605-.596-.605zm-8.537.018a.047.047 0 0 0-.048.047v.085c0 .026.021.047.048.047h.52l-.623.9a.052.052 0 0 0-.009.027v.027c0 .026.021.047.048.047h.815a.047.047 0 0 0 .047-.047v-.085a.047.047 0 0 0-.047-.047h-.55l.606-.9a.05.05 0 0 0 .008-.026v-.028a.047.047 0 0 0-.047-.047zm5.303 0a.047.047 0 0 0-.047.047v1.086c0 .026.02.047.047.047h.135a.047.047 0 0 0 .047-.047v-.454h.545v.454c0 .026.02.047.047.047h.134a.047.047 0 0 0 .047-.047v-1.086a.047.047 0 0 0-.047-.047h-.134a.047.047 0 0 0-.047.047v.453h-.545v-.453a.047.047 0 0 0-.047-.047zm-2.324.164c.25 0 .372.194.372.425 0 .219-.109.425-.358.426-.242 0-.375-.197-.375-.419 0-.235.108-.432.36-.432zm5.545 0c.25 0 .372.194.372.425 0 .219-.108.425-.358.426-.242 0-.374-.197-.374-.419 0-.235.108-.432.36-.432z"/>
      </svg>
    )},
    { name: "Stripe", logo: <img src="/images/icons/stripe.svg" alt="Stripe" className="w-8 h-8 object-contain" /> },
    { name: "Salesforce", logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00A1E0">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.884-.06-1.305-.165a3.975 3.975 0 01-3.525 2.145 4.08 4.08 0 01-1.98-.51 4.47 4.47 0 01-3.99 2.46c-2.1 0-3.87-1.44-4.35-3.39a3.3 3.3 0 01-.54.045c-1.95 0-3.15-1.545-3.15-3.42 0-1.2.6-2.28 1.53-2.91a4.14 4.14 0 01-.48-1.95c0-2.34 1.89-4.23 4.23-4.23 1.08 0 2.07.42 2.82 1.08z"/>
      </svg>
    )},
    { name: "Freshdesk", logo: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <path d="M31.9 0h24.036A8 8 0 0 1 64 8.073V32.1C64 49.722 49.722 64 32.1 64h-.182A31.89 31.89 0 0 1 0 32.109C0 14.437 14.254.182 31.9 0z" fill="#25c16f"/>
        <path d="M31.9 14.255c-8.093 0-14.654 6.56-14.654 14.654v9.964c.058 2.667 2.206 4.815 4.873 4.873h4.145V32.3h-5.6v-3.2c.34-6.026 5.327-10.74 11.364-10.74S43.04 23.065 43.38 29.1v3.2H37.7v11.454h3.745v.182c-.04 2.474-2.035 4.47-4.5 4.5h-4.473c-.364 0-.764.182-.764.545a.8.8 0 0 0 .764.764h4.5c3.205-.02 5.798-2.613 5.818-5.818v-.364a4.8 4.8 0 0 0 3.745-4.727V29.1c.182-8.254-6.364-14.836-14.654-14.836z" fill="#fff"/>
      </svg>
    )},
    { name: "WooCommerce", logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#96588A">
        <path d="M.754 9.58a.754.754 0 00-.754.758v2.525c0 .42.339.758.758.758h3.135l1.431.799-.326-.799h2.373a.757.757 0 00.758-.758v-2.525a.757.757 0 00-.758-.758H.754zm2.709.445h.03c.065.001.124.023.179.067a.26.26 0 01.103.19.29.29 0 01-.033.16c-.13.239-.236.64-.322 1.199-.083.541-.114.965-.094 1.267a.392.392 0 01-.039.219.213.213 0 01-.176.12c-.086.006-.177-.034-.263-.124-.31-.316-.555-.788-.735-1.416-.216.425-.375.744-.478.957-.196.376-.363.568-.502.578-.09.007-.166-.069-.233-.228-.17-.436-.352-1.277-.548-2.524a.297.297 0 01.054-.222c.047-.064.116-.095.21-.102.169-.013.265.065.288.238.103.695.217 1.284.336 1.766l.727-1.387c.066-.126.15-.192.25-.199.146-.01.237.083.273.28.083.441.188.817.315 1.136.086-.844.233-1.453.44-1.828a.255.255 0 01.218-.147zm1.293.36c.056 0 .116.006.18.02.232.05.411.177.53.386.107.18.161.395.161.654 0 .343-.087.654-.26.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.158-.659c0-.342.085-.655.258-.937.202-.333.462-.498.78-.498zm2.084 0c.056 0 .116.006.18.02.236.05.411.177.53.386.107.18.16.395.16.654 0 .343-.086.654-.259.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.16-.659c0-.342.087-.655.26-.937.202-.333.462-.498.78-.498zm4.437.047c-.305 0-.546.102-.718.304-.173.203-.256.49-.256.856 0 .395.086.697.256.906.17.21.418.316.744.316.315 0 .559-.107.728-.316.17-.21.256-.504.256-.883s-.087-.673-.26-.879c-.176-.202-.424-.304-.75-.304zm-1.466.002a1.13 1.13 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.505.336.861.336.103 0 .22-.016.346-.052v-.54c-.117.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm12.414 0a1.135 1.135 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.506.336.861.336.103 0 .22-.016.346-.052v-.54c-.116.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm-9.598.06l-.29 2.264h.579l.156-1.559.395 1.559h.412l.379-1.555.164 1.555h.603l-.304-2.264h-.791l-.12.508c-.03.13-.06.264-.087.4l-.067.352a29.97 29.97 0 00-.258-1.26h-.771zm2.768 0l-.29 2.264h.579l.156-1.559.396 1.559h.412l.375-1.555.165 1.555h.603l-.305-2.264h-.789l-.119.508c-.03.13-.06.264-.086.4l-.066.352c-.063-.352-.15-.771-.26-1.26h-.771zm3.988 0v2.264h.611v-1.031h.012l.494 1.03h.645l-.489-1.019a.61.61 0 00.37-.552.598.598 0 00-.25-.506c-.167-.123-.394-.186-.68-.186h-.713zm3.377 0v2.264H24v-.483h-.63v-.414h.54v-.468h-.54v-.416h.626v-.483H22.76zm-4.793.004v2.264h1.24v-.483h-.627v-.416h.541v-.468h-.54v-.415h.622v-.482h-1.236zm2.025.432c.146.003.25.025.313.072.063.046.091.12.091.227 0 .156-.135.236-.404.24v-.54zm-15.22.011c-.104 0-.205.069-.301.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.016-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm2.083 0c-.103 0-.204.069-.3.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.013-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm4.428.006c.233 0 .354.218.354.66-.004.273-.038.46-.098.553a.293.293 0 01-.262.139.266.266 0 01-.242-.139c-.056-.093-.084-.28-.084-.562 0-.436.11-.65.332-.65Z"/>
      </svg>
    )},
    { name: "Slack", logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z" fill="#E01E5A"/>
        <path d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.163 0a2.528 2.528 0 012.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.163 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.163 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.527 2.527 0 012.52-2.52h6.314A2.528 2.528 0 0124 15.163a2.528 2.528 0 01-2.523 2.523h-6.314z" fill="#ECB22E"/>
      </svg>
    )},
  ];
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4">
        <div className="bg-background rounded-lg border border-border shadow-sm h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <Link2 className="w-5 h-5 text-foreground" />
            <p className="text-sm font-semibold text-foreground flex-1">Integrations</p>
            <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50">
              {brands.length} Active
            </span>
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <div className="space-y-3 h-full flex flex-col">
              <div className="grid grid-cols-3 gap-2.5 flex-1">
                {brands.map((brand, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-surface border border-border relative">
                    {brand.logo}
                    <span className="text-[11px] font-medium text-foreground/80">{brand.name}</span>
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-surface rounded-lg">
                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-[12px] text-muted-foreground">All integrations synced and active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── WhatsApp Channel Illustrations ─────────────────────────────────────────

function RichMediaIllustration() {
  return (
    <IllustrationCard icon={<Image className="w-5 h-5" />} title="Rich Media Messages">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Images", desc: "JPG, PNG, WebP" },
            { label: "Videos", desc: "MP4, up to 16MB" },
            { label: "Documents", desc: "PDF, XLSX, DOCX" },
            { label: "Location", desc: "Maps & pins" },
          ].map((item, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-surface border border-border">
              <p className="text-[11px] font-medium text-foreground">{item.label}</p>
              <p className="text-[9px] text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-lg bg-surface border border-border">
          <p className="text-[11px] font-medium text-foreground">Interactive Catalogs</p>
          <p className="text-[9px] text-muted-foreground">Product carousels with images, prices & buy buttons</p>
        </div>
      </div>
    </IllustrationCard>
  );
}

function VerifiedProfileIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Verified badge */}
          <div className="bg-background rounded-2xl shadow-sm border border-border p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Your Business Name</p>
                <p className="text-xs text-muted-foreground">Official Business Account</p>
              </div>
            </div>
          </div>
          {/* Green tick pill */}
          <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shadow-sm border border-border">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium text-foreground/80">Verified Green Tick</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickReplyIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4 flex items-center justify-center">
        <div className="space-y-3 w-full max-w-[260px]">
          {/* Message with CTA buttons */}
          <div className="bg-background rounded-xl shadow-sm border border-border">
            <div className="px-3 py-2.5">
              <p className="text-[12px] text-foreground leading-snug">How would you like to proceed with your order?</p>
            </div>
            <div className="border-t border-border">
              {["Track My Order", "Talk to Support", "Browse Products"].map((btn, i) => (
                <button
                  key={i}
                  className="w-full px-3 py-2 text-[12px] font-medium text-primary border-b border-border last:border-0 text-center"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
          {/* List message */}
          <div className="bg-background rounded-xl shadow-sm border border-border px-3 py-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-foreground">Select a product category</p>
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageTemplatesIllustration() {
  return (
    <IllustrationCard icon={<FileText className="w-5 h-5" />} title="Template Manager" badge="12 Active">
      <div className="space-y-2">
        {[
          { name: "Order Confirmation", status: "Approved", category: "Utility" },
          { name: "Welcome Message", status: "Approved", category: "Marketing" },
          { name: "Cart Reminder", status: "Approved", category: "Marketing" },
          { name: "Shipping Update", status: "Pending", category: "Utility" },
        ].map((tpl, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-surface border border-border">
            <div className="w-7 h-7 rounded-md bg-background border border-border flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-foreground">{tpl.name}</p>
              <p className="text-[9px] text-muted-foreground">{tpl.category}</p>
            </div>
            <span
              className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${
                tpl.status === "Approved"
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {tpl.status}
            </span>
          </div>
        ))}
      </div>
    </IllustrationCard>
  );
}

function MultiLanguageIllustration() {
  const row1 = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "PT", name: "Português", flag: "🇧🇷" },
    { code: "HI", name: "हिंदी", flag: "🇮🇳" },
    { code: "AR", name: "العربية", flag: "🇸🇦" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
    { code: "JA", name: "日本語", flag: "🇯🇵" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "KO", name: "한국어", flag: "🇰🇷" },
  ];
  const row2 = [
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
    { code: "RU", name: "Русский", flag: "🇷🇺" },
    { code: "TH", name: "ไทย", flag: "🇹🇭" },
    { code: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "TR", name: "Türkçe", flag: "🇹🇷" },
    { code: "PL", name: "Polski", flag: "🇵🇱" },
    { code: "NL", name: "Nederlands", flag: "🇳🇱" },
    { code: "SV", name: "Svenska", flag: "🇸🇪" },
    { code: "ID", name: "Bahasa", flag: "🇮🇩" },
    { code: "MS", name: "Malay", flag: "🇲🇾" },
  ];
  const row3 = [
    { code: "UK", name: "Українська", flag: "🇺🇦" },
    { code: "BN", name: "বাংলা", flag: "🇧🇩" },
    { code: "TA", name: "தமிழ்", flag: "🇮🇳" },
    { code: "FI", name: "Suomi", flag: "🇫🇮" },
    { code: "EL", name: "Ελληνικά", flag: "🇬🇷" },
    { code: "HE", name: "עברית", flag: "🇮🇱" },
    { code: "RO", name: "Română", flag: "🇷🇴" },
    { code: "CS", name: "Čeština", flag: "🇨🇿" },
  ];
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="flex flex-col gap-2 h-full justify-center py-4">
        <Marquee className="[--duration:25s] [--gap:0.6rem] px-0 py-1.5" pauseOnHover>
          {row1.map((lang, i) => (
            <div key={i} className="flex items-center gap-2 bg-background rounded-full border border-border px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{lang.name}</span>
            </div>
          ))}
        </Marquee>
        <Marquee className="[--duration:30s] [--gap:0.6rem] px-0 py-1.5" reverse pauseOnHover>
          {row2.map((lang, i) => (
            <div key={i} className="flex items-center gap-2 bg-background rounded-full border border-border px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{lang.name}</span>
            </div>
          ))}
        </Marquee>
        <Marquee className="[--duration:22s] [--gap:0.6rem] px-0 py-1.5" pauseOnHover>
          {row3.map((lang, i) => (
            <div key={i} className="flex items-center gap-2 bg-background rounded-full border border-border px-4 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{lang.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface/50 to-transparent pointer-events-none z-10" />
    </div>
  );
}

function BroadcastIllustration() {
  return (
    <IllustrationCard icon={<Megaphone className="w-5 h-5" />} title="Broadcast Campaign" badge="Sending">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Audience", value: "12,480" },
            { label: "Delivered", value: "98.2%" },
            { label: "Opened", value: "67%" },
            { label: "Clicked", value: "23%" },
          ].map((stat, i) => (
            <div key={i} className="p-2 bg-surface rounded-lg border border-border text-center">
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="p-2.5 bg-surface rounded-lg border border-border">
          <p className="text-[10px] font-medium text-foreground/80 mb-1">Target Segments</p>
          <div className="flex flex-wrap gap-1">
            {["Premium Users", "Cart Abandoned", "Inactive 30d"].map((seg, i) => (
              <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
                {seg}
              </span>
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-muted rounded-full">
          <div className="h-1.5 rounded-full bg-gradient-to-r from-primary to-black transition-all" style={{ width: "73%" }} />
        </div>
        <p className="text-[9px] text-muted-foreground ">9,110 of 12,480 delivered</p>
      </div>
    </IllustrationCard>
  );
}

// ── Illustration Switches ──────────────────────────────────────────────────

function AIAgentIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "247-availability":
      return <Availability247Illustration />;
    case "natural-conversations":
      return <NaturalConversationIllustration />;
    case "customize-brand":
    default:
      return <CustomizeBrandIllustration />;
  }
}

function EngagementIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "knowledge-sources":
      return <KnowledgeSourcesIllustration />;
    case "human-in-loop":
      return <HumanInLoopIllustration />;
    case "seamless-integrations":
      return <SeamlessIntegrationsIllustration />;
    case "no-code-studio":
    default:
      return <NoCodeStudioIllustration />;
  }
}

function ChannelIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "verified-profile":
      return <VerifiedProfileIllustration />;
    case "quick-reply":
      return <QuickReplyIllustration />;
    case "message-templates":
      return <MessageTemplatesIllustration />;
    case "multi-language":
      return <MultiLanguageIllustration />;
    case "broadcast":
      return <BroadcastIllustration />;
    case "rich-media":
    default:
      return <RichMediaIllustration />;
  }
}

// ── Reusable Accordion Section ─────────────────────────────────────────────

function AccordionSection({
  label,
  features,
  activeFeature,
  onFeatureChange,
  illustration,
  imageFirst,
}: {
  label: string;
  features: Feature[];
  activeFeature: string;
  onFeatureChange: (value: string) => void;
  illustration: React.ReactNode;
  imageFirst?: boolean;
}) {
  const accordionBlock = (
    <div>
      <p className="text-sm font-semibold text-primary mb-5">{label}</p>
      <Accordion
        type="single"
        collapsible
        value={activeFeature}
        onValueChange={(value) => value && onFeatureChange(value)}
        className="w-full"
      >
        {features.map((feature) => (
          <AccordionItem
            key={feature.id}
            value={feature.id}
            className="border-b border-border"
          >
            <AccordionTrigger className="py-4 hover:no-underline group">
              <div className="flex items-center gap-3 text-left">
                <span
                  className={`transition-colors ${
                    activeFeature === feature.id
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-muted-foreground"
                  }`}
                >
                  {feature.icon}
                </span>
                <span
                  className={`text-base font-medium transition-colors ${
                    activeFeature === feature.id
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
  );

  const illustrationBlock = (
    <div className={imageFirst ? "" : "order-first lg:order-last"}>
      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
        {illustration}
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
      {imageFirst ? (
        <>
          {illustrationBlock}
          {accordionBlock}
        </>
      ) : (
        <>
          {accordionBlock}
          {illustrationBlock}
        </>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function WhatsAppFeatureRichAgents() {
  const [activeAIAgent, setActiveAIAgent] = useState<string>(aiAgentFeatures[0].id);
  const [activeEngagement, setActiveEngagement] = useState<string>(engagementFeatures[0].id);

  return (
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>feature rich agents</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          Feature-rich AI agents for complete
          <br />
          customer engagement
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-12 md:mb-16">
          Context-aware Agents that reflect your brand, understand customers, execute actions in your systems, and handle customer interactions.
        </p>

        {/* Sub-category 1: AI Agents - Text Left, Image Right */}
        <AccordionSection
          label="AI agents"
          features={aiAgentFeatures}
          activeFeature={activeAIAgent}
          onFeatureChange={setActiveAIAgent}
          illustration={<AIAgentIllustrationSwitch activeFeature={activeAIAgent} />}
        />

        <div className="my-16 lg:my-24" />

        {/* Sub-category 2: Customer Engagement Platform - Image Left, Text Right */}
        <AccordionSection
          label="Customer engagement platform"
          features={engagementFeatures}
          activeFeature={activeEngagement}
          onFeatureChange={setActiveEngagement}
          illustration={<EngagementIllustrationSwitch activeFeature={activeEngagement} />}
          imageFirst
        />

      </div>
    </section>
  );
}
