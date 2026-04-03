"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  UserSquare2,
  Headphones,
  Mic2,
  Brain,
  ShieldCheck,
  Clock,
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// First accordion features (Brand-aligned, Human-like voices, etc.)
const brandFeatures: Feature[] = [
  {
    id: "brand-aligned",
    icon: <UserSquare2 className="h-4 w-4" />,
    title: "Brand-aligned AI agents",
    description:
      "Create voice agents that speak your brand's language and personality, delivering engaging customer interactions.",
  },
  {
    id: "human-voices",
    icon: <Headphones className="h-4 w-4" />,
    title: "Human-like voices",
    description:
      "Choose from natural-sounding voices or create your own to ensure recognizable, consistent brand communication.",
  },
  {
    id: "speech-recognition",
    icon: <Mic2 className="h-4 w-4" />,
    title: "Advanced speech recognition",
    description:
      "Natural voice conversations without keypresses using top speech-to-text models like Deepgram & OpenAI.",
  },
];

// Second accordion features (Context-aware, Guardrails, 24/7)
const contextFeatures: Feature[] = [
  {
    id: "context-aware",
    icon: <Brain className="h-4 w-4" />,
    title: "Context-aware & memory-driven AI",
    description:
      "Agents remember past interactions and preferences to provide personalized responses, just like human support.",
  },
  {
    id: "guardrails",
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "AI guardrails & compliance",
    description:
      "Set clear boundaries to keep conversations on-topic and compliant with your business guidelines.",
  },
  {
    id: "availability",
    icon: <Clock className="h-4 w-4" />,
    title: "24/7 availability",
    description:
      "Never miss a customer inquiry or sale with AI agents that handle orders and support requests at any hour, any day of the week.",
  },
];

// Illustration for Human-Like Voices - Voice selector UI
function HumanLikeVoicesIllustration() {
  const languages = [
    { name: "English (US)", flag: "🇺🇸", selected: true },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Hindi", flag: "🇮🇳" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Portuguese", flag: "🇧🇷" },
    { name: "Italian", flag: "🇮🇹" },
    { name: "Dutch", flag: "🇳🇱" },
    { name: "Korean", flag: "🇰🇷" },
    { name: "Chinese", flag: "🇨🇳" },
    { name: "Arabic", flag: "🇸🇦" },
  ];

  // Voice options based on Plivo voice library - shorter descriptions for desktop fit
  const voices = [
    { name: "Caleb", type: "Trustworthy. Great for support & sales.", gradient: "from-white via-amber-400 to-orange-500", selected: true },
    { name: "Jack John", type: "Engaging and positive for support.", gradient: "from-white via-blue-400 to-indigo-500" },
    { name: "Joseph", type: "Professional and patient. For IVR.", gradient: "from-white via-cyan-400 to-blue-500" },
    { name: "Kyle", type: "Confident. Great for storytelling.", gradient: "from-white via-purple-400 to-pink-500" },
    { name: "Sarah", type: "Warm and friendly. Ideal for sales.", gradient: "from-white via-rose-400 to-red-500" },
    { name: "Emma", type: "Clear and articulate. For support.", gradient: "from-white via-emerald-400 to-teal-500" },
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-2.5 sm:p-3 md:p-4">
        {/* Main card - light theme with grey accents */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
          {/* Header */}
          <div className="p-2.5 sm:p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Voice Configuration</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Natural-sounding AI voices</p>
              </div>
            </div>
          </div>

          {/* Side by side dropdowns - stack on mobile */}
          <div className="flex-1 p-2.5 sm:p-3 flex flex-col sm:flex-row gap-2 sm:gap-2.5 min-h-0">
            {/* Language Dropdown - Wider fixed width on desktop */}
            <div className="sm:w-[140px] md:w-[160px] flex flex-col min-h-0 flex-shrink-0">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">Language</p>
              <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex flex-col min-h-0">
                {/* Selected value */}
                <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-gray-200 bg-white">
                  <span className="text-xs sm:text-sm">🇺🇸</span>
                  <span className="text-[11px] sm:text-xs text-gray-900 font-medium truncate">English (US)</span>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                {/* Dropdown options */}
                <div className="flex-1 overflow-hidden">
                  {languages.map((lang, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 cursor-pointer transition-colors ${
                        lang.selected ? 'bg-[#323dfe]/5' : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs">{lang.flag}</span>
                      <span className={`text-[11px] sm:text-xs truncate ${lang.selected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {lang.name}
                      </span>
                      {lang.selected && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#323dfe] ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Voice Dropdown - Takes remaining space */}
            <div className="flex-1 flex flex-col min-h-0">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">Voice</p>
              <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex flex-col min-h-0">
                {/* Selected value */}
                <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-gray-200 bg-white">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-white via-amber-400 to-orange-500 flex items-center justify-center shadow-sm flex-shrink-0">
                    <div className="w-0 h-0 border-l-[3px] sm:border-l-[4px] border-l-white border-y-[2px] sm:border-y-[2.5px] border-y-transparent ml-0.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-900 font-medium">Caleb</span>
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                {/* Voice options */}
                <div className="flex-1 overflow-hidden">
                  {voices.map((voice, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 cursor-pointer transition-colors ${
                        voice.selected ? 'bg-[#323dfe]/5' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br ${voice.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <div className="w-0 h-0 border-l-[2px] sm:border-l-[3px] border-l-white border-y-[1.5px] sm:border-y-[2px] border-y-transparent ml-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[11px] sm:text-xs ${voice.selected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                          {voice.name}
                        </p>
                        <p className="text-[9px] sm:text-[11px] text-gray-500 truncate">{voice.type}</p>
                      </div>
                      {voice.selected && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#323dfe] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Illustration for Brand-Aligned section
function BrandAlignedIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-2.5 sm:p-3 md:p-4">
        {/* Main card - light theme with grey accents */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-2.5 sm:p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                <span className="text-white text-[10px] sm:text-xs">✦</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">Acme Support Agent</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Brand voice configured</p>
              </div>
              <div className="flex items-center gap-1 bg-[#323dfe]/10 px-2 py-1 rounded-full border border-[#323dfe]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#323dfe]" />
                <span className="text-[10px] sm:text-xs text-[#323dfe] font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 sm:p-4 space-y-4 sm:space-y-5 min-h-0">
            {/* Personality traits */}
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Personality Traits</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  { trait: 'Friendly', active: true },
                  { trait: 'Professional', active: true },
                  { trait: 'Helpful', active: true },
                  { trait: 'Empathetic', active: false },
                ].map((item, i) => (
                  <button
                    key={i}
                    className={`text-[11px] sm:text-xs px-2.5 py-1 sm:py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                      item.active
                        ? 'bg-[#323dfe]/10 text-gray-900 border-[#323dfe]/30 hover:bg-[#323dfe]/15'
                        : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {item.trait}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">Conversation Tone</p>
                <span className="text-[10px] sm:text-xs text-[#323dfe] font-medium bg-[#323dfe]/10 px-1.5 py-0.5 rounded">Warm</span>
              </div>
              <div className="h-1.5 sm:h-2 rounded-full bg-gray-100 relative group cursor-pointer">
                <div className="absolute left-0 top-0 h-1.5 sm:h-2 w-3/4 rounded-full bg-gradient-to-r from-gray-400 to-[#323dfe] transition-all duration-300" />
                <div className="absolute left-3/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-[#323dfe] shadow-md transition-transform duration-200 group-hover:scale-110" />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] sm:text-[10px] text-gray-400">Formal</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400">Casual</span>
              </div>
            </div>

            {/* Response speed */}
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Response Style</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Concise', active: false },
                  { label: 'Balanced', active: true },
                  { label: 'Detailed', active: false },
                ].map((item, i) => (
                  <button
                    key={i}
                    className={`text-[11px] sm:text-xs py-1.5 sm:py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                      item.active
                        ? 'bg-[#323dfe] text-white border-[#323dfe] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sample response - footer */}
          <div className="p-2.5 sm:p-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-[7px] sm:text-[8px]">✦</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Preview</p>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
              "Hey there! Thanks for reaching out to Acme. I'm here to help - what can I do for you today?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration for Speech Recognition
function SpeechRecognitionIllustration() {
  // Generate consistent wave heights for animation
  const waveHeights = [
    12, 20, 8, 28, 16, 24, 10, 32, 14, 22, 8, 26, 18, 30, 12, 20, 6, 24, 16, 28,
    10, 22, 14, 26, 8, 32, 20, 18, 24, 12, 28, 16, 22, 10, 26
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      {/* CSS for natural wave animation */}
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(0.3);
          }
          25% {
            transform: scaleY(0.8);
          }
          50% {
            transform: scaleY(1);
          }
          75% {
            transform: scaleY(0.6);
          }
        }
        .wave-bar {
          animation: wave 1s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="relative h-full w-full p-2.5 sm:p-3 md:p-4">
        {/* Main card - light theme with grey accents */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col p-2.5 sm:p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 sm:mb-2.5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Speech Recognition</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Deepgram & OpenAI Whisper</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[#323dfe]/10 px-1.5 py-0.5 rounded-full border border-[#323dfe]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#323dfe] animate-pulse" />
              <span className="text-[10px] sm:text-xs text-[#323dfe] font-medium">Live</span>
            </div>
          </div>

          {/* Live waveform with animation */}
          <div className="rounded-lg bg-gray-50 border border-gray-100 p-2 mb-2 sm:mb-2.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium uppercase tracking-wide">Recording</span>
            </div>
            <div className="flex items-center justify-center gap-[2px] sm:gap-[3px] h-8 sm:h-10">
              {waveHeights.map((height, i) => (
                <div
                  key={i}
                  className="wave-bar w-[2px] sm:w-[3px] rounded-full bg-[#323dfe]"
                  style={{
                    height: `${height}px`,
                    animationDelay: `${(i * 0.08) % 1.2}s`,
                    opacity: 0.6 + (Math.sin(i * 0.5) * 0.4)
                  }}
                />
              ))}
            </div>
          </div>

          {/* Transcription output with icons */}
          <div className="flex-1 rounded-lg bg-gray-50 border border-gray-100 p-2 overflow-hidden min-h-0">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Real-time transcription</p>
              <span className="text-[9px] sm:text-[10px] text-gray-400">00:32</span>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              {/* Customer message 1 */}
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-emerald-600 font-medium mb-0.5">Customer</p>
                  <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed">"Hi, I'd like to check my order status for order #45892."</p>
                </div>
              </div>

              {/* Agent message 1 */}
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#323dfe]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[8px] sm:text-[9px] text-[#323dfe]">✦</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-[#323dfe] font-medium mb-0.5">AI Agent</p>
                  <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed">"Of course! Let me look that up for you right away."</p>
                </div>
              </div>

              {/* Customer message 2 */}
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-emerald-600 font-medium mb-0.5">Customer</p>
                  <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed">"It was supposed to arrive yesterday..."</p>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#323dfe]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] sm:text-[9px] text-[#323dfe]">✦</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-2 sm:mt-2.5 pt-2 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold text-[#323dfe]">98.5%</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">&lt;200ms</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500">Latency</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">50+</p>
              <p className="text-[9px] sm:text-[10px] text-gray-500">Languages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration for Context-Aware section
function ContextAwareIllustration() {
  // Generate wave heights for audio visualization
  const waveHeights = [
    4, 8, 6, 12, 4, 16, 8, 20, 6, 14, 4, 18, 10, 8, 4, 22, 8, 6, 14, 4,
    10, 18, 6, 12, 4, 8, 16, 6, 10, 4, 14, 8, 6, 12, 4, 8, 6, 10, 4, 6
  ];

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-3 sm:p-4 md:p-6 flex flex-col justify-center gap-3 sm:gap-4">

        {/* Top Card - Order Context */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
          {/* Order header */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-3">
            <span>Order placed on - 2nd April</span>
            <span className="text-emerald-600 font-medium">Payment received</span>
          </div>

          {/* Product details */}
          <div className="flex items-start gap-3">
            {/* Product image placeholder */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-cyan-100 via-sky-100 to-rose-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <div className="text-2xl sm:text-3xl">👕</div>
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-base sm:text-lg font-medium text-gray-600 mb-1">Cloudscape T-shirt</h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-2">Size: L</p>
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs text-[#323dfe]">Track Order</span>
                <span className="text-[11px] sm:text-xs text-[#323dfe]">Invoice</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card - AI Conversation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
          {/* Audio waveform bar */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-400">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs font-medium">01:56</span>
            </div>
            {/* Waveform */}
            <div className="flex-1 flex items-center justify-center gap-[1px] h-5 sm:h-6">
              {waveHeights.map((height, i) => (
                <div
                  key={i}
                  className="w-[2px] sm:w-[2.5px] rounded-full bg-gray-300"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>

          {/* AI Agent message */}
          <div className="flex items-start gap-2.5 sm:gap-3">
            {/* Agent avatar - gradient orb */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#cd3ef9] via-[#323dfe] to-black flex items-center justify-center flex-shrink-0 shadow-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#323dfe]/80 to-[#8b5cf6]/80 flex items-center justify-center border border-white/30">
                <span className="text-white text-xs sm:text-sm">✦</span>
              </div>
            </div>

            {/* Message content */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-1">TrendFit AI Agent</p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 leading-snug">
                Our new hoodie collection just dropped - perfect with your Cloudscape tee.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Illustration for AI Guardrails
function GuardrailsIllustration() {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-2.5 sm:p-3 md:p-4">
        {/* Main card - light theme with grey accents */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold text-gray-900">AI Guardrails</p>
              <p className="text-xs sm:text-sm text-[#323dfe]">All checks passing</p>
            </div>
          </div>

          {/* Guardrail rules with checkboxes */}
          <div className="space-y-1.5 sm:space-y-2 flex-1 min-h-0 overflow-hidden">
            {[
              { rule: "Stay on approved topics", active: true },
              { rule: "No competitor mentions", active: true },
              { rule: "Escalate pricing questions", active: true },
              { rule: "PII data protection", active: true },
              { rule: "Brand voice compliance", active: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                {/* Checkbox */}
                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center flex-shrink-0 border-[1.5px] ${
                  item.active
                    ? 'bg-[#323dfe] border-[#323dfe]'
                    : 'bg-white border-gray-300'
                }`}>
                  {item.active && (
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs text-gray-800 flex-1 font-medium">{item.rule}</span>
                <span className="text-[9px] sm:text-[10px] text-[#323dfe] bg-[#323dfe]/10 px-1.5 py-0.5 rounded font-medium">Active</span>
              </div>
            ))}
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm sm:text-base font-semibold text-gray-900">0</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Violations</p>
            </div>
            <div className="text-center">
              <p className="text-sm sm:text-base font-semibold text-gray-900">2,847</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Monitored</p>
            </div>
            <div className="text-center">
              <p className="text-sm sm:text-base font-semibold text-[#323dfe]">100%</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration for 24/7 Availability
function AvailabilityIllustration() {
  // Area chart data points for call volume - organic pattern
  const chartData = [25, 32, 28, 42, 35, 48, 52, 45, 58, 62, 55, 70, 65, 78, 72, 82];
  const maxValue = Math.max(...chartData);
  const chartHeight = 60;
  const chartWidth = 100;

  // Generate smooth curve points
  const getPoints = () => {
    return chartData.map((value, i) => ({
      x: (i / (chartData.length - 1)) * chartWidth,
      y: chartHeight - (value / maxValue) * chartHeight,
    }));
  };

  // Generate smooth bezier curve path for area
  const generateAreaPath = () => {
    const points = getPoints();
    if (points.length < 2) return '';

    let path = `M0,${chartHeight} L${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      path += ` C${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
    }

    path += ` L${chartWidth},${chartHeight} Z`;
    return path;
  };

  // Generate smooth bezier curve path for line
  const generateLinePath = () => {
    const points = getPoints();
    if (points.length < 2) return '';

    let path = `M${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      path += ` C${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
    }

    return path;
  };

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="relative h-full w-full p-2.5 sm:p-3 md:p-4">
        {/* Main Dashboard Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#323dfe] to-[#8b5cf6] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-900">Voice AI Dashboard</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Real-time analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-green-700 font-medium">Live</span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex-1 grid grid-cols-5 gap-3 min-h-0">
            {/* Left - Area Chart */}
            <div className="col-span-3 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Call Volume (24h)</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-green-600 font-medium">+12%</span>
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 bg-gray-50/50 rounded-lg p-2 relative">
                {/* SVG Area Chart */}
                <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#323dfe" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#323dfe" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[15, 30, 45].map((y) => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.3" strokeDasharray="2,2" />
                  ))}
                  {/* Area fill */}
                  <path d={generateAreaPath()} fill="url(#areaGradient)" />
                  {/* Line */}
                  <path d={generateLinePath()} fill="none" stroke="#323dfe" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* X-axis labels */}
                <div className="absolute bottom-0.5 left-1 right-1 flex justify-between text-[7px] text-gray-400">
                  <span>12am</span>
                  <span>6am</span>
                  <span>12pm</span>
                  <span>6pm</span>
                </div>
              </div>
            </div>

            {/* Right - Stats & Donut */}
            <div className="col-span-2 flex flex-col gap-2">
              {/* Resolution Rate Donut */}
              <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15" fill="none" stroke="#323dfe" strokeWidth="3"
                      strokeDasharray="94.2" strokeDashoffset="5.65" strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-900">94%</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Resolution</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500">1,247 resolved</p>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="bg-[#323dfe]/5 rounded-lg p-2 border border-[#323dfe]/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold text-[#323dfe]">28</span>
                  <span className="text-[9px] text-gray-500">active</span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-600">Concurrent Calls</p>
              </div>

              {/* Call Type Bars */}
              <div className="bg-gray-50 rounded-lg p-2 flex-1">
                <p className="text-[9px] text-gray-500 mb-1.5">By Type</p>
                <div className="space-y-1.5">
                  {[
                    { type: 'Support', value: 45, color: '#323dfe' },
                    { type: 'Sales', value: 30, color: '#8b5cf6' },
                    { type: 'Billing', value: 25, color: '#06b6d4' },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center gap-1.5">
                      <span className="text-[8px] sm:text-[9px] text-gray-600 w-10">{item.type}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-[8px] text-gray-500 w-6">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] sm:text-xs text-gray-600">All systems operational</span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400">Updated 2s ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render the correct illustration based on active feature
function BrandIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "human-voices":
      return <HumanLikeVoicesIllustration />;
    case "speech-recognition":
      return <SpeechRecognitionIllustration />;
    case "brand-aligned":
    default:
      return <BrandAlignedIllustration />;
  }
}

function ContextIllustrationSwitch({ activeFeature }: { activeFeature: string }) {
  switch (activeFeature) {
    case "guardrails":
      return <GuardrailsIllustration />;
    case "availability":
      return <AvailabilityIllustration />;
    case "context-aware":
    default:
      return <ContextAwareIllustration />;
  }
}

export default function FeatureAccordion() {
  const [activeBrandFeature, setActiveBrandFeature] = useState<string>(brandFeatures[0].id);
  const [activeContextFeature, setActiveContextFeature] = useState<string>(contextFeatures[0].id);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Exhaustive AI features for
          <br />
          natural voice interactions
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 md:mb-16">
          Everything you need to build, deploy, and scale intelligent voice
          agents that deliver exceptional customer experiences.
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
              <ContextIllustrationSwitch activeFeature={activeContextFeature} />
            </div>
          </div>

          {/* Right - Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              value={activeContextFeature}
              onValueChange={(value) => value && setActiveContextFeature(value)}
              className="w-full"
            >
              {contextFeatures.map((feature) => (
                <AccordionItem
                  key={feature.id}
                  value={feature.id}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="py-4 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`transition-colors ${
                          activeContextFeature === feature.id
                            ? "text-[#323dfe]"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {feature.icon}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors ${
                          activeContextFeature === feature.id
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
