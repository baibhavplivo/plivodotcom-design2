"use client";

import { Check } from "lucide-react";
import BasicAIChatInput from "@/components/ui/ai-chat-input-block";
import DisplayCards from "@/components/ui/display-cards";
import Noise from "@/components/elements/noise";
import {
  Volume2,
  FileJson,
  MessageCircle,
  Mic,
  AudioWaveform,
} from "lucide-react";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="h-4 w-4 flex-shrink-0 text-[#323dfe] mt-0.5" strokeWidth={2.5} />
      <span className="text-sm font-medium text-gray-700">{children}</span>
    </li>
  );
}

export default function TwoWaysToBuild() {
  const modularCards = [
    {
      icon: <Volume2 className="size-4 text-[#323DFE]" />,
      title: "TTS",
      description: "Natural Text-to-Speech voices (or bring your own)",
      className:
        "scale-75 [grid-area:stack] -translate-x-16 -translate-y-24 hover:-translate-y-32 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <FileJson className="size-4 text-[#323DFE]" />,
      title: "STT",
      description: "Speech-to-Text with 95%+ accuracy across accents",
      className:
        "scale-75 [grid-area:stack] -translate-x-8 -translate-y-12 hover:-translate-y-20 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <MessageCircle className="size-4 text-[#323DFE]" />,
      title: "Turn detection",
      description: "Intelligent turn-taking that eliminates awkward interruptions",
      className:
        "scale-75 [grid-area:stack] hover:-translate-y-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <Mic className="size-4 text-[#323DFE]" />,
      title: "VAD",
      description: "Voice Activity Detection that knows when users start and stop speaking",
      className:
        "scale-75 [grid-area:stack] translate-x-8 translate-y-12 hover:translate-y-4 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <AudioWaveform className="size-4 text-[#323DFE]" />,
      title: "Audio stream",
      description: "Real-time bi-directional audio with <300ms latency",
      className:
        "scale-75 [grid-area:stack] translate-x-16 translate-y-24 hover:translate-y-16 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          Two ways to build your<br />voice AI agents
        </h2>

        {/* No-Code Platform - Text Left, Asset Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-16 md:mb-24">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3">
              No-code voice AI platform
            </h3>
            <p className="text-gray-600 mb-6">
              Build, deploy, and scale voice agents without writing a single line of code. Perfect for teams who want results fast.
            </p>
            <ul className="space-y-3">
              <CheckItem>Build agents in plain English with Prompt Builder</CheckItem>
              <CheckItem>Drag-and-drop conversation flows</CheckItem>
              <CheckItem>Auto-evaluation and improvement</CheckItem>
              <CheckItem>One-click deployment</CheckItem>
            </ul>
          </div>

          {/* Asset - Chat Input with Mesh Gradient Background */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative aspect-square w-full max-w-[480px] rounded-lg overflow-hidden">
              {/* Mesh Gradient Background */}
              <img
                src="/images/mesh-gradient.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Noise Overlay */}
              <Noise className="opacity-[0.15]" />
              {/* White Card Overlay */}
              <div className="relative z-10 flex items-center justify-center h-full p-4">
                <div className="aspect-square w-full max-w-[400px] rounded-lg bg-white p-6 shadow-xl flex flex-col justify-center">
                  <BasicAIChatInput />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Infrastructure - Asset Left, Text Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Asset - Card Stack with Mesh Gradient Background */}
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[480px] rounded-lg overflow-hidden">
              {/* Mesh Gradient Background */}
              <img
                src="/images/mesh-gradient.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Noise Overlay */}
              <Noise className="opacity-[0.15]" />
              {/* Content Overlay - Cards directly on gradient */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <DisplayCards cards={modularCards} />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3">
              Modular voice infrastructure
            </h3>
            <p className="text-gray-600 mb-6">
              Get the audio pipeline components you need. Plug in your own LLM, bring your own STT/TTS, or use ours. Full control, zero lock-in.
            </p>
            <ul className="space-y-3">
              <CheckItem>Pick and choose: Telephony, STT, TTS, LLM</CheckItem>
              <CheckItem>Bring your own models (OpenAI, Anthropic, custom)</CheckItem>
              <CheckItem>Sub-300ms streaming pipeline</CheckItem>
              <CheckItem>WebRTC, SIP, and PSTN support</CheckItem>
              <CheckItem>White-label ready</CheckItem>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
