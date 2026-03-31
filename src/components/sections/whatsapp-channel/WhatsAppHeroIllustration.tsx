"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

interface Message {
  id: number;
  type: "incoming" | "outgoing";
  text: string;
  hasCheckmarks?: boolean;
  link?: string;
}

const messages: Message[] = [
  {
    id: 1,
    type: "outgoing",
    text: "Where's my order #45821?",
    hasCheckmarks: true,
  },
  {
    id: 2,
    type: "incoming",
    text: "Your order shipped yesterday and arrives Friday, Feb 7. Want the tracking link?",
  },
  {
    id: 3,
    type: "outgoing",
    text: "Yes please! 🙏",
    hasCheckmarks: true,
  },
  {
    id: 4,
    type: "incoming",
    text: "Here you go 📦\n\nAnything else I can help with?",
    link: "track.techstore.com/45821",
  },
];

export default function WhatsAppHeroIllustration() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const runAnimation = () => {
      setVisibleMessages([]);
      messages.forEach((message, index) => {
        const timer = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message.id]);
        }, 800 * (index + 1));
      });
    };

    runAnimation();
    const loopInterval = setInterval(() => {
      runAnimation();
    }, 8000);

    return () => clearInterval(loopInterval);
  }, []);

  return (
    <div className="relative flex justify-center">
      {/* Flickering Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={4}
            gridGap={6}
            color="rgb(139, 92, 246)"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
          {/* Radial fade from all sides */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 20%, white 70%)"
            }}
          />
        </div>
      </div>

      {/* Phone container */}
      <div className="relative h-[460px] sm:h-[500px] overflow-hidden">
        {/* Phone device */}
        <div className="w-[288px] sm:w-[320px]">
          {/* Phone outer frame */}
          <div className="relative rounded-[32px] p-1.5 shadow-2xl border border-gray-300 bg-gray-100">

            {/* Screen */}
            <div className="relative rounded-[30px] overflow-hidden bg-[#efeae2] shadow-inner">
              {/* WhatsApp header */}
              <div className="h-16 bg-[#075E54] flex items-center px-3 gap-2 rounded-t-[30px]">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">TechStore AI</p>
                  <p className="text-white/70 text-xs">online</p>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
              </div>

              {/* Chat background pattern */}
              <div className="relative min-h-[400px] bg-[#efeae2]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1c4b8' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
                {/* Date badge */}
                <div className="flex justify-center py-3">
                  <span className="px-3 py-1 rounded-md bg-white/80 text-[11px] text-gray-600 shadow-sm">
                    Today
                  </span>
                </div>

                {/* Messages area */}
                <div className="px-3 pb-3 space-y-2">
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
                        <div className="flex items-start max-w-[85%]">
                          <div className="relative rounded-lg rounded-tl-sm px-2.5 py-1.5 bg-white shadow-sm">
                            {/* Tail */}
                            <div className="absolute -left-2 top-0 w-0 h-0 border-t-8 border-t-white border-l-8 border-l-transparent" />
                            <p className="text-[13px] text-gray-800 leading-snug whitespace-pre-line">{message.text}</p>
                            {message.link && (
                              <span className="text-[13px] text-[#53bdeb] underline break-all leading-snug">{message.link}</span>
                            )}
                            <p className="text-[10px] text-gray-400 text-right mt-0.5">9:41 AM</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <div className="relative rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] bg-[#dcf8c6] shadow-sm">
                            {/* Tail */}
                            <div className="absolute -right-2 top-0 w-0 h-0 border-t-8 border-t-[#dcf8c6] border-r-8 border-r-transparent" />
                            <p className="text-[13px] text-gray-800 leading-snug">{message.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-[10px] text-gray-500">9:41 AM</p>
                              {message.hasCheckmarks && (
                                <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor">
                                  <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="px-2 py-2 bg-[#f0f0f0] flex items-center gap-2">
                <div className="text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
                <div className="flex-1 rounded-full px-4 py-2 bg-white">
                  <span className="text-[13px] text-gray-400">Type a message</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#323dfe] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 2.76 2.24 5 5 5s5-2.24 5-5h2c0 4.08-3.06 7.44-7 7.93V21h-2v-4.07z"/>
                  </svg>
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-6 bg-[#f0f0f0] flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, white 0%, white 20%, rgba(255,255,255,0.9) 50%, transparent 100%)'
          }}
        />
      </div>
    </div>
  );
}
