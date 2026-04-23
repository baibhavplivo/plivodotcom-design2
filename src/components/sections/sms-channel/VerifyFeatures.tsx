"use client";

import { Globe, TrendingUp, MessageSquare, Shield, DollarSign, Headphones } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Go live in 150+ countries in 5 minutes",
    description: "Use Plivo's pre-registered Sender IDs and templates to bypass regulatory paperwork.",
  },
  {
    icon: TrendingUp,
    title: "Best-in-class Conversion Rates",
    description: "Get 95% conversion across multiple authentication channels.",
  },
  {
    icon: MessageSquare,
    title: "Reach users across multiple channels",
    description: "Send OTPs to customers using SMS, Voice and WhatsApp. RCS & Email coming soon.",
  },
  {
    icon: Shield,
    title: "$0 cost leakage to SMS Pumping",
    description: "Save on SMS pumping fraud expenses with Plivo's Fraud Shield solution at no extra cost.",
  },
  {
    icon: DollarSign,
    title: "Lowest cost per verification",
    description: "We don't bill you for verification. Only pay for channel costs with no hidden charges.",
  },
  {
    icon: Headphones,
    title: "Support at your fingertips",
    description: "24/7 availability over Slack and phone calls, guaranteed same-day response.",
  },
];

export default function VerifyFeatures() {
  return (
    <section className="bg-background border-t border-border py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Left - Sticky Headline */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>features</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] font-normal leading-[1.2] tracking-[-0.035em] text-foreground">
              Plivo Verify is the best way to secure users & boost OTP conversions
            </h2>
          </div>

          {/* Right - Features Grid */}
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="space-y-3">
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-green-600 dark:text-green-300 stroke-[1.5]" />
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {feature.title}
                  </h3>
                  {/* Description */}
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
