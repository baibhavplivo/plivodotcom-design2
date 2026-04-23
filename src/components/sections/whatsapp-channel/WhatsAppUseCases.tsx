"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

interface UseCaseCategory {
  id: string;
  label: string;
  useCases: UseCase[];
}

// Consistent card frame for all illustrations
function ChatWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-56 w-full rounded-xl overflow-hidden", className)} style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="h-full px-5 py-3 flex flex-col justify-center gap-1.5">
        {children}
      </div>
    </div>
  );
}

// Reusable message components
function IncomingMsg({ children, time = "9:41 AM" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex items-start max-w-[88%]">
      <div className="relative rounded-lg rounded-tl-sm px-2.5 py-1.5 bg-white dark:bg-[#1f2c33] shadow-sm text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
        <div className="absolute -left-2 top-0 w-0 h-0 border-t-[8px] border-t-white dark:border-t-[#1f2c33] border-l-[8px] border-l-transparent" />
        {children}
        <p className="!text-[#667781] dark:!text-[#8696a0] text-[10px] text-right mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function OutgoingMsg({ children, time = "9:41 AM" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex justify-end">
      <div className="relative rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] bg-[#dcf8c6] dark:bg-[#005c4b] shadow-sm text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
        <div className="absolute -right-2 top-0 w-0 h-0 border-t-[8px] border-t-[#dcf8c6] dark:border-t-[#005c4b] border-r-[8px] border-r-transparent" />
        {children}
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <p className="!text-[#667781] dark:!text-[#8696a0] text-[10px]">{time}</p>
          <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor">
            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Buying Assistant Illustration
function BuyingAssistantIllustration() {
  return (
    <ChatWrapper>
      <OutgoingMsg time="10:22 AM">
        <p className="text-[12px] text-foreground leading-snug">Looking for a gift for my mom 🎁</p>
      </OutgoingMsg>
      <IncomingMsg time="10:22 AM">
        <p className="text-[12px] text-foreground leading-snug">I'd love to help! What does she enjoy?</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["Serums", "Gift Sets", "Moisturizers"].map((opt, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-foreground/80 font-medium">{opt}</span>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="10:23 AM">
        <p className="text-[12px] text-foreground leading-snug">She'd love a gift set!</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Cart Recovery Illustration
function CartRecoveryIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="6:30 PM">
        <p className="text-[12px] text-foreground leading-snug">Hey! 👋 You left something in your cart</p>
        <div className="flex items-center gap-2 mt-1.5 p-1.5 bg-white dark:bg-[#2a3942] rounded text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
          <img src="/images/products/designer-bag.jpg" alt="Designer Bag" className="w-8 h-8 rounded object-cover flex-shrink-0" />
          <div>
            <p className="text-[11px] font-medium text-foreground">Designer Bag</p>
            <p className="text-[11px] text-primary font-medium">15% off - expires in 2h</p>
          </div>
        </div>
      </IncomingMsg>
      <OutgoingMsg time="6:32 PM">
        <p className="text-[12px] text-foreground leading-snug">Yes, complete my order!</p>
      </OutgoingMsg>
      <IncomingMsg time="6:32 PM">
        <p className="text-[12px] text-foreground leading-snug">🎉 Order confirmed! You saved $42</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

// Upsell Agent Illustration
function UpsellAgentIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="11:05 AM">
        <p className="text-[12px] text-foreground leading-snug">Based on your purchase, you might love these! ✨</p>
        <div className="grid grid-cols-3 gap-1 mt-1.5 max-w-[200px]">
          {[
            { name: "Earbuds", price: 29, img: "/images/products/earbuds.jpg" },
            { name: "Case", price: 19, img: "/images/products/phone-case.jpg" },
            { name: "Charger", price: 24, img: "/images/products/charger.jpg" },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#2a3942] rounded p-1 min-w-0 text-[#111b21] dark:text-[#e9edef] [&_p]:!text-[#111b21] dark:[&_p]:!text-[#e9edef]">
              <div className="w-full aspect-square rounded bg-muted overflow-hidden mb-0.5">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-[8px] text-muted-foreground truncate">{item.name}</p>
              <p className="text-[8px] font-semibold text-foreground">${item.price}</p>
            </div>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="11:07 AM">
        <p className="text-[12px] text-foreground leading-snug">Add the earbuds to my order</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Booking & Reminder Illustration
function BookingReminderIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="3:00 PM">
        <p className="text-[12px] text-foreground leading-snug">📅 Book your appointment:</p>
        <div className="grid grid-cols-3 gap-1 mt-1.5">
          {["Mon 10am", "Tue 2pm", "Wed 4pm"].map((slot, i) => (
            <span key={i} className="px-1.5 py-1 rounded text-[10px] font-medium text-center bg-muted text-primary">{slot}</span>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="3:01 PM">
        <p className="text-[12px] text-foreground leading-snug">Tue 2pm please</p>
      </OutgoingMsg>
      <IncomingMsg time="3:01 PM">
        <p className="text-[12px] text-foreground leading-snug">✅ Confirmed! Calendar invite sent to your email.</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

// Customer Service Illustration
function CustomerServiceIllustration() {
  return (
    <ChatWrapper>
      <OutgoingMsg time="4:10 PM">
        <p className="text-[12px] text-foreground leading-snug">Need to return order #4821</p>
      </OutgoingMsg>
      <IncomingMsg time="4:10 PM">
        <p className="text-[12px] text-foreground leading-snug">I can help with that! What's the reason for the return?</p>
      </IncomingMsg>
      <OutgoingMsg time="4:11 PM">
        <p className="text-[12px] text-foreground leading-snug">Wrong size</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Order Tracking Illustration
function OrderTrackingIllustration() {
  return (
    <ChatWrapper>
      <OutgoingMsg time="1:30 PM">
        <p className="text-[12px] text-foreground leading-snug">Where is my order #4821?</p>
      </OutgoingMsg>
      <IncomingMsg time="1:30 PM">
        <p className="text-[12px] text-foreground leading-snug mb-2">📦 Order #4821 Update</p>
        <div className="flex items-center gap-1">
          {["Ordered", "Shipped", "Out", "Delivered"].map((stage, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full flex items-center justify-center",
                i < 3 ? "bg-primary" : "bg-gray-200"
              )}>
                {i < 3 && (
                  <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {i < 3 && <div className={cn("flex-1 h-0.5", i < 2 ? "bg-primary" : "bg-gray-200")} />}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">Out for delivery - arriving by 4 PM</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

// --- CALL-SPECIFIC ILLUSTRATIONS (Phone widget, half-cropped) ---

// Phone frame - oversized so bottom half crops outside the container
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="absolute inset-x-0 top-3 flex justify-center">
        {/* Phone device - taller than container so bottom crops */}
        <div className="relative w-[180px] h-[320px] rounded-[22px] border-[3px] border-gray-400 bg-gray-300 overflow-hidden ">
          {/* Side buttons */}
          <div className="absolute -left-[4px] top-16 w-[4px] h-6 bg-gray-400 rounded-l" />
          <div className="absolute -left-[4px] top-24 w-[4px] h-10 bg-gray-400 rounded-l" />
          <div className="absolute -right-[4px] top-20 w-[4px] h-8 bg-gray-400 rounded-r" />
          {/* Dynamic island */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-16 h-[6px] bg-gray-800 rounded-full z-20" />
          {/* Screen */}
          <div className="absolute inset-[3px] rounded-[19px] overflow-hidden bg-[#075E54] dark:bg-[#1f2c33] flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact call status bar
function CallStatusBar({ name, time }: { name: string; time: string }) {
  return (
    <div className="bg-[#075E54] dark:bg-[#1f2c33] pt-5 pb-2 px-3 flex items-center gap-2">
      <svg className="w-3 h-3 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      <div className="w-6 h-6 rounded-full bg-background/15 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-semibold text-white truncate">{name}</p>
        <p className="text-[7px] text-[#25D366] font-medium">{time}</p>
      </div>
      {/* Call controls (inline) */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-background/10 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.383 3.07C11.009 2.87 10.579 2.9 10.232 3.15L5.636 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.636l4.596 3.85c.347.25.777.28 1.151.08A1 1 0 0 0 12 20V4a1 1 0 0 0-.617-.93zM16.066 7.504a.75.75 0 0 1 1.06.036 6.5 6.5 0 0 1 0 8.92.75.75 0 1 1-1.096-1.024 5 5 0 0 0 0-6.872.75.75 0 0 1 .036-1.06z" />
          </svg>
        </div>
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Lead Qualification Call Illustration
function LeadQualificationCallIllustration() {
  return (
    <PhoneFrame>
      <CallStatusBar name="Sarah Mitchell" time="02:34" />
      {/* Transcript */}
      <div className="flex-1 bg-[#ECE5DD] dark:bg-[#0b141a] px-2 py-2 flex flex-col gap-1.5 overflow-hidden">
        <div className="self-start max-w-[88%] rounded-lg rounded-tl-sm bg-white dark:bg-[#1f2c33] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">Great, and what's your typical monthly budget for this?</p>
          <p className="text-[6px] text-[#667781] text-right mt-0.5">02:31</p>
        </div>
        <div className="self-end max-w-[88%] rounded-lg rounded-tr-sm bg-[#dcf8c6] dark:bg-[#005c4b] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">We're looking at around $50k per quarter.</p>
          <div className="flex items-center justify-end gap-0.5 mt-0.5">
            <p className="text-[6px] text-[#667781]">02:33</p>
            <svg className="w-3 h-2 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" /></svg>
          </div>
        </div>
        <div className="self-start max-w-[88%] rounded-lg rounded-tl-sm bg-white dark:bg-[#1f2c33] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] dark:text-[#e9edef] leading-[1.4]">Perfect. Let me connect you with our enterprise team right away.</p>
          <p className="text-[6px] text-[#667781] dark:text-[#8696a0] text-right mt-0.5">02:34</p>
        </div>
        <div className="self-end max-w-[88%] rounded-lg rounded-tr-sm bg-[#dcf8c6] dark:bg-[#005c4b] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">That would be great, thanks!</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

// Booking Call Illustration
function BookingCallIllustration() {
  return (
    <PhoneFrame>
      <CallStatusBar name="Priya Sharma" time="01:18" />
      {/* Transcript */}
      <div className="flex-1 bg-[#ECE5DD] dark:bg-[#0b141a] px-2 py-2 flex flex-col gap-1.5 overflow-hidden">
        <div className="self-start max-w-[88%] rounded-lg rounded-tl-sm bg-white dark:bg-[#1f2c33] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">I have 3 slots this week: Tue 2:30 PM, Wed 10 AM, or Thu 4 PM.</p>
          <p className="text-[6px] text-[#667781] text-right mt-0.5">01:15</p>
        </div>
        <div className="self-end max-w-[88%] rounded-lg rounded-tr-sm bg-[#dcf8c6] dark:bg-[#005c4b] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">Tuesday 2:30 works for me!</p>
          <div className="flex items-center justify-end gap-0.5 mt-0.5">
            <p className="text-[6px] text-[#667781]">01:16</p>
            <svg className="w-3 h-2 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" /></svg>
          </div>
        </div>
        <div className="self-start max-w-[88%] rounded-lg rounded-tl-sm bg-white dark:bg-[#1f2c33] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] dark:text-[#e9edef] leading-[1.4]">Done! Confirmed for Tue, Jan 7 at 2:30 PM. You'll get a calendar invite shortly.</p>
          <p className="text-[6px] text-[#667781] dark:text-[#8696a0] text-right mt-0.5">01:18</p>
        </div>
        <div className="self-end max-w-[88%] rounded-lg rounded-tr-sm bg-[#dcf8c6] dark:bg-[#005c4b] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">Perfect, thank you!</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

// Payment Reminder Call Illustration
function PaymentReminderCallIllustration() {
  return (
    <PhoneFrame>
      <CallStatusBar name="Raj Patel" time="00:52" />
      {/* Transcript */}
      <div className="flex-1 bg-[#ECE5DD] dark:bg-[#0b141a] px-2 py-2 flex flex-col gap-1.5 overflow-hidden">
        <div className="self-start max-w-[88%] rounded-lg rounded-tl-sm bg-white dark:bg-[#1f2c33] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">Hi Raj, this is a reminder about Invoice #4821 for $2,450 - it's 5 days overdue.</p>
          <p className="text-[6px] text-[#667781] text-right mt-0.5">00:48</p>
        </div>
        <div className="self-end max-w-[88%] rounded-lg rounded-tr-sm bg-[#dcf8c6] dark:bg-[#005c4b] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">Oh right, can I set up a payment plan?</p>
          <div className="flex items-center justify-end gap-0.5 mt-0.5">
            <p className="text-[6px] text-[#667781]">00:50</p>
            <svg className="w-3 h-2 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" /></svg>
          </div>
        </div>
        <div className="self-start max-w-[88%] rounded-lg rounded-tl-sm bg-white dark:bg-[#1f2c33] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] dark:text-[#e9edef] leading-[1.4]">Of course! I can split it into 3 monthly installments of $817. Shall I set that up?</p>
          <p className="text-[6px] text-[#667781] dark:text-[#8696a0] text-right mt-0.5">00:52</p>
        </div>
        <div className="self-end max-w-[88%] rounded-lg rounded-tr-sm bg-[#dcf8c6] dark:bg-[#005c4b] px-2 py-1.5 shadow-sm text-[#111b21] [&_p]:!text-[#111b21] dark:text-[#e9edef] dark:[&_p]:!text-[#e9edef]">
          <p className="text-[8px] text-[#111b21] leading-[1.4]">Yes please, that works.</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

const categories: UseCaseCategory[] = [
  {
    id: "convert",
    label: "Convert",
    useCases: [
      {
        title: "Buying assistant",
        tags: ["eCommerce", "Retail", "Consumer services"],
        description: "Help customers find the perfect product with personalized recommendations based on their preferences and needs.",
        illustration: <BuyingAssistantIllustration />,
      },
      {
        title: "Lead qualification agent (Call)",
        tags: ["Sales", "B2B", "WhatsApp Call"],
        description: "Engage inbound callers on WhatsApp, capture intent with smart questions, score leads in real-time, and route high-value prospects to your sales team.",
        illustration: <LeadQualificationCallIllustration />,
      },
      {
        title: "Cart recovery agent",
        tags: ["eCommerce", "Retail", "Fashion"],
        description: "Automatically reach out to customers who abandoned their carts with personalized offers to complete purchases.",
        illustration: <CartRecoveryIllustration />,
      },
    ],
  },
  {
    id: "engage",
    label: "Engage",
    useCases: [
      {
        title: "Booking & reminder agent",
        tags: ["Health", "Education", "Local services"],
        description: "Automate appointment scheduling, confirmations, and reminders to reduce no-shows.",
        illustration: <BookingReminderIllustration />,
      },
      {
        title: "Booking & appointment agent (Call)",
        tags: ["Healthcare", "Services", "WhatsApp Call"],
        description: "Confirm, reschedule, and manage customer bookings directly over WhatsApp calls with real-time availability checks.",
        illustration: <BookingCallIllustration />,
      },
      {
        title: "AI-powered upsell agent",
        tags: ["eCommerce", "Retail", "Food & dining"],
        description: "Suggest complementary products and upgrades based on purchase history and browsing behavior.",
        illustration: <UpsellAgentIllustration />,
      },
    ],
  },
  {
    id: "delight",
    label: "Delight",
    useCases: [
      {
        title: "AI customer service agent",
        tags: ["eCommerce", "Health", "Travel"],
        description: "Provide 24/7 instant support for returns, exchanges, FAQs, and account issues without wait times.",
        illustration: <CustomerServiceIllustration />,
      },
      {
        title: "Payment reminder agent (Call)",
        tags: ["Finance", "Insurance", "WhatsApp Call"],
        description: "Automate follow-up calls for due or failed payments, offer payment plan options, and process payments - improving collection rates.",
        illustration: <PaymentReminderCallIllustration />,
      },
      {
        title: "Order tracking agent",
        tags: ["eCommerce", "Logistics", "Food delivery"],
        description: "Send proactive shipping updates and delivery notifications to keep customers informed.",
        illustration: <OrderTrackingIllustration />,
      },
    ],
  },
];

export default function WhatsAppUseCases() {
  const [activeCategory, setActiveCategory] = useState<string>("convert");
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navLeftOffset, setNavLeftOffset] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scroll to section when clicking nav
  const scrollToSection = (categoryId: string) => {
    setActiveCategory(categoryId);
    const section = sectionRefs.current[categoryId];
    if (section) {
      const offset = 120;
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
        const navbarHeight = 96;

        const shouldFix = containerRect.top <= navbarHeight && contentRect.bottom > navbarHeight + 150;
        setIsNavFixed(shouldFix);
        setNavLeftOffset(containerRect.left);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
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
          <span>use cases</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          WhatsApp AI agents for every
          <br />
          customer interaction
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-10 md:mb-14">
          From lead conversion to customer delight, deploy AI agents that handle it all on WhatsApp.
        </p>

        {/* Navigation + Content Layout */}
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Navigation Container */}
          <div ref={navContainerRef} className="lg:w-40 flex-shrink-0">
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
                      ? "lg:border-l-[#323dfe] text-foreground font-semibold bg-primary/10 lg:bg-transparent"
                      : "lg:border-l-gray-200 text-muted-foreground hover:text-foreground/80 hover:bg-surface lg:hover:bg-transparent"
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
                {/* Use Case Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.useCases.map((useCase, index) => (
                    <div key={index} className="group">
                      {/* Illustration */}
                      <div className="mb-4 overflow-hidden rounded-lg border border-border transition-all">
                        {useCase.illustration}
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {useCase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
