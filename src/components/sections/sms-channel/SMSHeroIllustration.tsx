"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: "incoming" | "outgoing";
  text: string;
}

const messages: Message[] = [
  {
    id: 1,
    type: "incoming",
    text: "🔥 Flash Sale! The Classic Denim Jacket you viewed is now 30% off. Only 12 left!",
  },
  {
    id: 2,
    type: "outgoing",
    text: "Oh nice! What sizes do you have?",
  },
  {
    id: 3,
    type: "incoming",
    text: "We have M, L, and XL available. S is sold out. Which size works for you?",
  },
  {
    id: 4,
    type: "outgoing",
    text: "Large please!",
  },
  {
    id: 5,
    type: "incoming",
    text: "Done! 🎉 Order #4821 confirmed. You saved $45. Arriving Thu, Feb 6.",
  },
];

export default function SMSHeroIllustration() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const runAnimation = () => {
      setVisibleMessages([]);
      messages.forEach((message, index) => {
        const timer = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message.id]);
        }, 800 * (index + 1)); // Slower animation
      });
    };

    // Initial run
    runAnimation();

    // Loop every 8 seconds (after all messages appear + pause)
    const loopInterval = setInterval(() => {
      runAnimation();
    }, 8000);

    return () => clearInterval(loopInterval);
  }, []);

  return (
    <div className="relative flex justify-center">
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.30) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          backgroundPosition: 'center center',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 70%)"
        }}
      />

      {/* Phone container - centered */}
      <div className="relative h-[520px] sm:h-[560px] overflow-hidden">
        {/* Phone device */}
        <div className="w-[288px] sm:w-[320px]">
          {/* Phone outer frame */}
          <div className="relative rounded-[32px] p-1.5 border border-border-strong bg-muted">

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
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="ml-1 text-foreground">Plivo</span>
                </div>
                <span className="text-foreground opacity-50">9:41 AM</span>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="text-foreground text-[10px]">100%</span>
                  <div className="w-5 h-2.5 rounded-sm bg-foreground" />
                </div>
              </div>

              {/* Navigation bar */}
              <div className="h-11 bg-muted border-b border-border-strong relative flex items-center px-3">
                <div className="flex items-center" style={{ color: '#007AFF' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <span className="text-sm font-normal">Messages</span>
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-foreground">Acme</span>
                <span className="ml-auto text-sm font-normal" style={{ color: '#007AFF' }}>Details</span>
              </div>

              {/* Timestamp */}
              <div className="py-2 text-center bg-background opacity-50">
                <p className="text-xs text-muted-foreground">iMessage</p>
                <p className="text-xs text-muted-foreground">Today 9:41 AM</p>
              </div>

              {/* Messages area */}
              <div className="px-3 pb-3 space-y-4 min-h-[380px] bg-background">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "transition-all duration-500",
                      visibleMessages.includes(message.id)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                  >
                    {message.type === "incoming" ? (
                      <div className="flex items-start">
                        <div className="rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%] bg-muted">
                          <p className="text-[13px] text-foreground leading-snug">{message.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%] bg-primary">
                          <p className="text-[13px] text-white leading-snug">{message.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>

              {/* Input area */}
              <div className="px-3 py-2 bg-muted border-t border-border-strong flex items-center gap-2">
                <div className="text-blue-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                </div>
                <div className="flex-1 rounded-full px-4 py-1.5 bg-background border border-border-strong">
                  <span className="text-[13px] text-muted-foreground">iMessage</span>
                </div>
                <div className="text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 2.76 2.24 5 5 5s5-2.24 5-5h2c0 4.08-3.06 7.44-7 7.93V21h-2v-4.07z"/>
                  </svg>
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-7 bg-background flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-foreground/$1" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade - moved down to show last message */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 20%, hsl(var(--background) / 0.9) 50%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}
