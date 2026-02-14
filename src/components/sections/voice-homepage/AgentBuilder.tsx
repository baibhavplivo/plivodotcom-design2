import {
  Check,
  AudioWaveform,
  Mic,
  MessageCircle,
  FileJson,
  Volume2,
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import BasicAIChatInput from "@/components/ui/ai-chat-input-block";

export default function AgentBuilder() {

  const modularCards = [
    {
      icon: <Volume2 className="size-5 text-[#323DFE]" />,
      title: "TTS",
      description: "Natural Text-to-Speech voices (or bring your own)",
      className:
        "scale-75 [grid-area:stack] -translate-x-16 -translate-y-24 hover:-translate-y-32 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <FileJson className="size-5 text-[#323DFE]" />,
      title: "STT",
      description: "Speech-to-Text with 95%+ accuracy across accents",
      className:
        "scale-75 [grid-area:stack] -translate-x-8 -translate-y-12 hover:-translate-y-20 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <MessageCircle className="size-5 text-[#323DFE]" />,
      title: "Turn detection",
      description: "Intelligent turn-taking that eliminates awkward interruptions",
      className:
        "scale-75 [grid-area:stack] hover:-translate-y-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <Mic className="size-5 text-[#323DFE]" />,
      title: "VAD",
      description: "Voice Activity Detection that knows when users start and stop speaking",
      className:
        "scale-75 [grid-area:stack] translate-x-8 translate-y-12 hover:translate-y-4 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
    {
      icon: <AudioWaveform className="size-5 text-[#323DFE]" />,
      title: "Audio stream",
      description: "Real-time bi-directional audio with <300ms latency",
      className:
        "scale-75 [grid-area:stack] translate-x-16 translate-y-24 hover:translate-y-16 bg-white shadow-xl hover:shadow-2xl transition-all duration-700 ease-out",
    },
  ];

  return (
    <section className="agent-builder-section bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black max-w-3xl mx-auto">
            Build AI agents your way with code or prompt
          </h2>
        </div>

        {/* Slider */}
        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: Modular Infrastructure */}
          <div className="flex flex-col overflow-hidden rounded-lg bg-gradient-to-b from-fuchsia-100 via-fuchsia-50 via-60% to-neutral-50">
            {/* Visual Top */}
            <div className="relative flex h-[260px] sm:h-[350px] md:h-[380px] items-center justify-center overflow-hidden px-4 py-4 sm:px-8 sm:py-6 [&>*]:scale-[0.7] sm:[&>*]:scale-100">
              <DisplayCards cards={modularCards} />
            </div>

            {/* Content Bottom */}
            <div className="flex flex-grow flex-col p-5 sm:p-8 md:p-10">
              <h3 className="mb-3 text-2xl font-semibold text-black">
                Programmable AI agents
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Start with our fully managed stack or strip it down to just audio streaming. Swap in your own LLM, customize ASR and TTS. Full control, zero hassle.
              </p>
              <div className="mb-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600" strokeWidth={3} />
                  <span className="text-sm font-medium text-gray-700">
                    Pick and choose what you want
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600" strokeWidth={3} />
                  <span className="text-sm font-medium text-gray-700">
                    Bring your own LLM
                  </span>
                </div>
              </div>
              <div className="mt-auto">
                <a href="/contact/sales/" className="inline-block w-max rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                  Talk to us
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: No-Code Builder */}
          <div className="flex flex-col overflow-visible sm:overflow-hidden rounded-lg bg-gradient-to-b from-indigo-100 via-indigo-50 via-60% to-neutral-50">
            {/* Visual Top */}
            <div className="relative flex h-[280px] sm:h-[350px] md:h-[380px] items-center justify-center overflow-visible sm:overflow-hidden px-3 sm:px-8 pt-6 sm:pt-6 pb-4 sm:pb-6">
              <BasicAIChatInput />
            </div>
            {/* Content Bottom */}
            <div className="flex flex-grow flex-col p-5 sm:p-8 md:p-10">
              <h3 className="mb-3 text-2xl font-semibold text-black">
                No-code AI agent studio
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Build, test, and deploy omni-channel AI agents in minutes. No code required. Best for teams who want to move fast and focus on outcomes.
              </p>
              <div className="mb-8 flex flex-wrap gap-4">
                {[
                  "Build agent in plain English",
                  "Drag and drop simplicity",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" strokeWidth={3} />
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <a href="/signup" className="inline-block w-max rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                  Sign up free
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
