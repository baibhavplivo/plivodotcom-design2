"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Agent {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

interface Category {
  id: string;
  label: string;
  agents: Agent[];
}

// Reusable voice waveform component - primary gradient accent
function VoiceWaveform({ color = "gradient", size = "sm" }: { color?: "gradient" | "gray" | "white"; size?: "sm" | "md" }) {
  const heights = size === "md" ? [4, 8, 12, 6, 14, 8, 10, 6, 12, 8, 4] : [3, 6, 10, 5, 12, 6, 8, 5, 10, 6, 3];
  const colorClass = color === "gradient" ? "bg-gradient-to-t from-black via-[#323dfe] to-primary" : color === "white" ? "bg-background/70" : "bg-gray-300";

  return (
    <div className="flex items-center gap-[2px]">
      {heights.map((h, i) => (
        <div key={i} className={cn("w-[2px] rounded-full", colorClass)} style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

// AI Avatar with SVG gradient
function AIAvatar({ size = 8 }: { size?: number }) {
  const id = `ai-gradient-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="flex-shrink-0" style={{ width: size * 4, height: size * 4 }}>
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#323dfe" />
            <stop offset="50%" stopColor="#323dfe" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="16" fill={`url(#${id})`} />
        {/* Curved 4-point star sparkle (matches Self-improving avatar) */}
        <path
          d="M16 7C16.9 10.4 21.6 15.1 25 16C21.6 16.9 16.9 21.6 16 25C15.1 21.6 10.4 16.9 7 16C10.4 15.1 15.1 10.4 16 7Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// Agent card illustrations - voice conversations with clean UI
function LeadQualificationIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Customer message */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border max-w-[75%]">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"I need a home loan for $300K"</p>
          </div>
          <img src="/images/avatars/man-32.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {/* AI Response */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl px-3 py-2 border border-border max-w-[75%]">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"Great! What's your annual income?"</p>
          </div>
        </div>

        {/* Lead score widget */}
        <div className="mt-auto bg-background rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Lead Score</span>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={cn("w-1.5 h-3 rounded-sm", i <= 4 ? "bg-gradient-to-t from-black via-[#323dfe] to-primary" : "bg-gray-200")} />
                ))}
              </div>
              <span className="text-[10px] font-medium text-primary">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentSchedulerIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* AI message with calendar */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"I have these slots available:"</p>
            <div className="flex gap-1.5 justify-center">
              {['Mon', 'Tue', 'Wed'].map((d, i) => (
                <div key={d} className={cn(
                  "w-10 text-center py-1.5 rounded-lg",
                  i === 1 ? "bg-gradient-to-br from-black via-[#323dfe] to-primary" : "bg-muted"
                )}>
                  <div className={cn("text-[8px]", i === 1 ? "text-white/90" : "text-muted-foreground")}>{d}</div>
                  <div className={cn("text-[11px] font-semibold", i === 1 ? "text-white" : "text-muted-foreground")}>{15 + i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer response - Indian woman */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"Tuesday at 9 AM works!"</p>
          </div>
          <img src="/images/avatars/woman-79.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {/* Confirmation */}
        <div className="mt-auto bg-background rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-[11px] text-foreground/80">Tue, 16th at 9 AM</span>
            </div>
            <VoiceWaveform color="gradient" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingReservationIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* AI message with booking card */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"Your reservation is confirmed!"</p>
            <div className="flex gap-2 items-center bg-surface rounded-lg p-2">
              <img
                src="/images/products/hotel.jpg"
                alt="Hotel"
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-foreground">Grand Hotel Plaza</p>
                <p className="text-[10px] text-muted-foreground">Mar 20-22 • 2 nights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer response - African man */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"Perfect, thank you!"</p>
          </div>
          <img src="/images/avatars/man-81.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

function VoiceAlertsIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Alert card with user info */}
        <div className="bg-background rounded-xl p-3 border border-border">
          <div className="flex items-center gap-2.5 mb-2.5">
            <img src="/images/avatars/woman-44.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[12px] font-medium text-foreground">Sarah Mitchell</p>
              <p className="text-[10px] text-muted-foreground">Calling about appointment...</p>
            </div>
          </div>
          {/* Voice playback bar */}
          <div className="flex items-center gap-2 bg-surface rounded-lg px-2.5 py-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-black flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {/* Wide waveform */}
            <div className="flex-1 flex items-center gap-[2px]">
              {[4, 8, 12, 6, 14, 8, 10, 6, 12, 8, 4, 6, 10, 14, 8, 12, 6, 10, 4, 8, 12, 6, 14, 10, 8].map((h, i) => (
                <div key={i} className="w-[2px] rounded-full bg-gradient-to-t from-black via-[#323dfe] to-primary" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span className="text-[9px] text-muted-foreground">0:15</span>
          </div>
        </div>

        {/* AI message */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"Your appointment is tomorrow at 4 PM"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentReminderIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* AI message with payment info */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"You have an upcoming payment:"</p>
            <div className="bg-surface rounded-lg p-2">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] text-muted-foreground">Amount Due</span>
                <span className="text-[9px] text-muted-foreground">Due Date</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">$245</span>
                <span className="text-[11px] font-medium text-foreground/80">Feb 15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer response - Indian man */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"I'll pay now, thanks!"</p>
          </div>
          <img src="/images/avatars/man-86.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

function AppointmentReminderIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Customer request */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"Can I reschedule to next week?"</p>
          </div>
          <img src="/images/avatars/woman-68.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {/* AI response with calendar */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"Sure! Pick a new time:"</p>
            <div className="flex gap-1.5">
              {['Tue 4 PM', 'Wed 2 PM', 'Thu 10 AM'].map((t, i) => (
                <span key={t} className={cn(
                  "flex-1 text-center text-[10px] px-2 py-1.5 rounded-lg",
                  i === 0 ? "bg-gradient-to-r from-black via-[#323dfe] to-primary text-white font-medium" : "bg-muted text-muted-foreground"
                )}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <div className="mt-auto bg-background rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Rescheduled to:</span>
            <span className="text-[11px] font-medium text-primary">Tue, 4 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerSupportIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Customer issue - Indian man */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"My internet isn't working"</p>
          </div>
          <img src="/images/avatars/man-94.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {/* AI response with steps */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"Let me help you troubleshoot:"</p>
            <div className="space-y-1">
              {['Check router lights', 'Restart modem'].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center text-[9px]",
                    i === 0 ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300" : "bg-muted text-muted-foreground"
                  )}>
                    {i === 0 ? '✓' : '2'}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-auto bg-background rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Issue Status</span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-300">Resolving...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplaintResolutionIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Customer complaint - Indian woman */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"I got the wrong item in my order"</p>
          </div>
          <img src="/images/avatars/woman-90.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {/* AI response with options */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"I apologize! Here's what I can do:"</p>
            <div className="flex gap-1.5">
              <span className="flex-1 text-center text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 px-2 py-1.5 rounded-lg font-medium">Free Replacement</span>
              <span className="flex-1 text-center text-[10px] bg-indigo-50 text-primary px-2 py-1.5 rounded-lg font-medium">20% Credit</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-auto bg-background rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Resolution</span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-300">Replacement Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackSurveyIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* AI asking for rating */}
        <div className="flex items-start gap-2">
          <AIAvatar size={8} />
          <div className="bg-background rounded-xl p-2.5 flex-1 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gradient" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80 mb-2">"How was your experience today?"</p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium",
                    num === 5
                      ? "bg-gradient-to-br from-black via-[#323dfe] to-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer response */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background rounded-xl px-3 py-2 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <VoiceWaveform color="gray" size="sm" />
            </div>
            <p className="text-[11px] text-foreground/80">"Five stars, great service!"</p>
          </div>
          <img src="/images/avatars/man-22.jpg" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {/* Thank you */}
        <div className="mt-auto bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-3 py-2">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">Thank you for your feedback!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories: Category[] = [
  {
    id: "convert",
    label: "Convert",
    agents: [
      {
        title: "Lead qualification agent",
        tags: ["Financial services", "Travel", "Local consumer services"],
        description: "Automates qualifying inbound leads through intelligent voice interactions to identify high-quality prospects.",
        illustration: <LeadQualificationIllustration />,
      },
      {
        title: "Appointment scheduler",
        tags: ["Health", "Education", "Local consumer services"],
        description: "Automates scheduling consults, appointments through interactive voice conversations.",
        illustration: <AppointmentSchedulerIllustration />,
      },
      {
        title: "Booking & reservation agent",
        tags: ["Travel", "Food & dining", "Health & wellness"],
        description: "Offers 24/7 automated booking assistance, managing reservations, cancellations, and scheduling.",
        illustration: <BookingReservationIllustration />,
      },
    ],
  },
  {
    id: "engage",
    label: "Engage",
    agents: [
      {
        title: "Voice alerts agent",
        tags: ["Financial services", "Health", "Consumer services"],
        description: "Sends automated voice alerts about important updates, reminders, or critical information.",
        illustration: <VoiceAlertsIllustration />,
      },
      {
        title: "Payment reminder agent",
        tags: ["Financial services", "Health", "Local consumer services"],
        description: "Automatically reminds customers about upcoming or overdue payments, reducing churn.",
        illustration: <PaymentReminderIllustration />,
      },
      {
        title: "Appointment reminder agent",
        tags: ["Education", "Hiring", "Finance", "Consumer services"],
        description: "Confirms, reminds, and facilitates easy rescheduling of appointments or reservations, reducing no-shows.",
        illustration: <AppointmentReminderIllustration />,
      },
    ],
  },
  {
    id: "delight",
    label: "Delight",
    agents: [
      {
        title: "Customer support agent",
        tags: ["eCommerce", "Health", "Travel"],
        description: "Offers 24/7 automated customer support, resolving common issues without human intervention.",
        illustration: <CustomerSupportIllustration />,
      },
      {
        title: "Complaint resolution agent",
        tags: ["eCommerce", "Health", "Financial services", "Travel"],
        description: "Handles customer complaints promptly, improving customer satisfaction and brand reputation.",
        illustration: <ComplaintResolutionIllustration />,
      },
      {
        title: "Feedback & survey agent",
        tags: ["Travel", "Health", "Education", "eCommerce"],
        description: "Collects customer feedback and conducts satisfaction surveys automatically via voice calls.",
        illustration: <FeedbackSurveyIllustration />,
      },
    ],
  },
];

export default function AIVoiceAgentsTabs() {
  const [activeCategory, setActiveCategory] = useState<string>("convert");
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navLeftOffset, setNavLeftOffset] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scroll to section when clicking nav
  const scrollToSection = (categoryId: string) => {
    setActiveCategory(categoryId); // Immediately update active state
    const section = sectionRefs.current[categoryId];
    if (section) {
      const offset = 120; // Account for sticky header
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Handle scroll for both active category and sticky nav
  useEffect(() => {
    const handleScroll = () => {
      // Update active category based on which section is in view
      for (const category of categories) {
        const section = sectionRefs.current[category.id];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveCategory(category.id);
            break;
          }
        }
      }

      // Handle sticky nav positioning
      if (navContainerRef.current && contentRef.current) {
        const containerRect = navContainerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const navbarHeight = 96; // 72px navbar + 24px padding

        // Check if we should fix the nav
        const shouldFix = containerRect.top <= navbarHeight && contentRect.bottom > navbarHeight + 150;
        setIsNavFixed(shouldFix);
        setNavLeftOffset(containerRect.left);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>ai voice agents tabs</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          AI voice agents for every
          <br />
          customer interaction
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-10 md:mb-14">
          From lead conversion to customer delight, deploy voice AI that handles it all.
        </p>

        {/* Navigation + Content Layout */}
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Navigation Container (placeholder for fixed nav) */}
          <div ref={navContainerRef} className="lg:w-40 flex-shrink-0">
            {/* Inner nav element - becomes fixed on scroll */}
            <div
              className={cn(
                "flex lg:flex-col gap-2",
                isNavFixed ? "lg:fixed lg:top-24 lg:w-40" : ""
              )}
              style={isNavFixed ? { left: navLeftOffset } : undefined}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={cn(
                    "px-4 py-3 text-left transition-all rounded-lg lg:rounded-none lg:border-l-2 lg:pl-4 lg:pr-0",
                    activeCategory === category.id
                      ? "lg:border-l-primary text-foreground font-semibold bg-primary/10 dark:bg-primary/15 lg:bg-transparent lg:dark:bg-transparent"
                      : "lg:border-l-border text-muted-foreground hover:text-foreground/80 hover:bg-surface lg:hover:bg-transparent"
                  )}
                >
                  <span className="text-base">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right - All Category Sections */}
          <div ref={contentRef} className="flex-1 space-y-16">
            {categories.map((category) => (
              <div
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el; }}
                id={`category-${category.id}`}
              >
                {/* Agent Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.agents.map((agent, index) => (
                    <div
                      key={index}
                      className="group"
                    >
                      {/* Illustration */}
                      <div className="mb-4 overflow-hidden rounded-lg border border-border transition-all">
                        {agent.illustration}
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {agent.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {agent.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
