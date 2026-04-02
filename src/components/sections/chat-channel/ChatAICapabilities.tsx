"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  BookOpen,
  Zap,
  HeartPulse,
  ArrowRightLeft,
  Wrench,
  Eye,
  BarChart3,
  Building2,
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const aiAgentFeatures: Feature[] = [
  {
    id: "personality",
    icon: <Sparkles className="w-7 h-7" />,
    title: "Personality that matches your brand",
    description:
      "Customize your AI agent's tone, language, and personality to perfectly reflect your brand voice. Deliver consistent, on-brand conversations at scale.",
  },
  {
    id: "knowledge",
    icon: <BookOpen className="w-7 h-7" />,
    title: "Trained on your knowledge sources",
    description:
      "Connect your product docs, FAQs, policies, and SOPs so the AI agent answers with accurate, up-to-date information from your own business data.",
  },
  {
    id: "actions",
    icon: <Zap className="w-7 h-7" />,
    title: "AI that takes actions",
    description:
      "Go beyond answering questions - AI agents can process orders, update accounts, schedule appointments, and trigger workflows in your connected systems.",
  },
  {
    id: "sentiment",
    icon: <HeartPulse className="w-7 h-7" />,
    title: "Understands customer sentiment in real-time",
    description:
      "Detect frustration, urgency, or satisfaction in real-time. Automatically adjust responses or escalate to human agents when sentiment shifts.",
  },
];

const platformFeatures: Feature[] = [
  {
    id: "handoff",
    icon: <ArrowRightLeft className="w-7 h-7" />,
    title: "Seamless handoff to human agents",
    description:
      "When a conversation needs a human touch, the AI seamlessly transfers with full context - so customers never have to repeat themselves.",
  },
  {
    id: "tools",
    icon: <Wrench className="w-7 h-7" />,
    title: "Comprehensive tools for human reps",
    description:
      "Give your team chat history, customer profiles, AI-generated summaries, and suggested responses to handle escalations efficiently.",
  },
  {
    id: "monitor",
    icon: <Eye className="w-7 h-7" />,
    title: "Monitor performance & coach",
    description:
      "Supervise live conversations, provide real-time coaching to agents, and ensure quality standards are met across every interaction.",
  },
  {
    id: "analytics",
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Engagement analytics & reports",
    description:
      "Track interaction metrics, resolution rates, satisfaction scores, and agent performance with detailed dashboards and exportable reports.",
  },
  {
    id: "multibrand",
    icon: <Building2 className="w-7 h-7" />,
    title: "Support for multiple brands",
    description:
      "Manage AI agents across multiple brands, locations, or business units from a single platform with independent configurations.",
  },
];

interface CategoryConfig {
  id: string;
  label: string;
  features: Feature[];
}

const subcategories: CategoryConfig[] = [
  { id: "ai-agents", label: "AI agent capabilities", features: aiAgentFeatures },
  { id: "platform", label: "Customer engagement platform", features: platformFeatures },
];

function FeatureCell({ feature }: { feature: Feature }) {
  return (
    <div className="p-6 lg:p-8">
      <span className="text-[#323dfe] mb-4 block">{feature.icon}</span>
      <h3 className="text-base font-semibold text-black mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function ChatAICapabilities() {
  const [activeSubcategory, setActiveSubcategory] = useState<string>("ai-agents");

  const currentCategory = subcategories.find((s) => s.id === activeSubcategory) || subcategories[0];
  const is2x2 = currentCategory.features.length === 4;
  const topRow = currentCategory.features.slice(0, is2x2 ? 2 : 3);
  const bottomRow = currentCategory.features.slice(is2x2 ? 2 : 3);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          AI chat, built for B2C brands -
          <br />
          powerful, customizable, always-on
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          Powerful chat features that make conversations impactful with context-rich, instant answers, takes actions and completes tasks.
        </p>

        {/* Sub-category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg border border-gray-200 p-1">
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={cn(
                  "px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all",
                  activeSubcategory === sub.id
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bordered Grid */}
        <div className="border border-gray-200 rounded-xl overflow-hidden" key={activeSubcategory}>
          {/* Top Row */}
          <div className={cn("grid grid-cols-1 divide-y md:divide-y-0 md:divide-x divide-gray-200", is2x2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
            {topRow.map((feature) => (
              <FeatureCell key={feature.id} feature={feature} />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {bottomRow.map((feature) => (
              <FeatureCell key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
