"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  monthlyPrice?: string;
  annualPrice?: string;
  perUnitMonthly?: string;
  perUnitAnnual?: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  highlight?: boolean;
  badge?: string;
  blurb?: string;
};

const PLANS: Plan[] = [
  {
    name: "Standard",
    monthlyPrice: "$22.99",
    annualPrice: "$15.99",
    perUnitMonthly: "Per user / billed monthly",
    perUnitAnnual: "Per user / billed yearly",
    blurb: "Access a complete payments platform with simple.",
    features: [
      "All features from the Personal package",
      "File upload limit of up to 100MB per file",
      "Unlimited revision & request",
      "Unlimited users",
      "Pause & Cancel anytime",
    ],
    ctaLabel: "Get started",
    ctaHref: "/pricing",
    highlight: true,
    badge: "🔥 30% off",
  },
  {
    name: "Custom",
    blurb: "Access a complete payments platform with simple.",
    features: [
      "All features from the Team package",
      "Deeper integration and API customization",
      "Unlimited revision & request",
      "Unlimited users",
      "Pause & Cancel anytime",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "/contact",
  },
];

export default function MetafiPricingHero() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="metafi-pricing-hero" className="bg-background px-6 lg:px-0">
      <div className="container px-0 md:px-6">
        <div className="bg-features-hero relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:px-8 sm:py-16 md:py-20">
            <p className="text-tagline text-sm sm:text-base">Pricing</p>
            <h1 className="mt-4 text-balance text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl md:text-[68px]">
              Simple, Flexible
              <br className="hidden sm:block" /> Pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Pricing plans for businesses at every stage of growth.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <span
                className={cn(
                  "text-sm text-muted-foreground sm:text-base",
                  !yearly && "text-muted-foreground",
                )}
              >
                Monthly
              </span>
              <Switch
                checked={yearly}
                onCheckedChange={setYearly}
                aria-label="Toggle yearly billing"
              />
              <span
                className={cn(
                  "text-sm sm:text-base",
                  yearly && "text-foreground",
                )}
              >
                Yearly
              </span>
            </div>
            {yearly && (
              <div className="text-success mt-4 text-sm font-medium">
                Save 30% OFF
              </div>
            )}
          </div>

          {/* Cards */}
          <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-12 sm:px-8 md:grid-cols-2 md:gap-8 md:pb-16">
            {PLANS.map((plan) => {
              const price = yearly ? plan.annualPrice : plan.monthlyPrice;
              const perUnit = yearly ? plan.perUnitAnnual : plan.perUnitMonthly;

              return (
                <article
                  key={plan.name}
                  className={cn(
                    "rounded-[20px] border shadow-card",
                    plan.highlight
                      ? "bg-tagline border-transparent text-primary-foreground"
                      : "border-border-light bg-card",
                  )}
                >
                  {/* two-column interior */}
                  <div className="grid gap-6 p-5 sm:p-6 md:p-7 lg:grid-cols-2">
                    {/* Left column: title/price/blurb */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          className={cn(
                            "text-lg font-semibold",
                            plan.highlight
                              ? "text-primary-foreground"
                              : "text-foreground",
                          )}
                        >
                          {plan.name}
                        </h3>
                        {yearly && plan.badge && plan.highlight && (
                          <span className="text-tagline rounded-md bg-primary-foreground/95 px-2 py-0.5 text-xs">
                            {plan.badge}
                          </span>
                        )}
                        {yearly && plan.badge && !plan.highlight && (
                          <span className="bg-accent rounded-md px-2 py-0.5 text-xs text-foreground">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      {!!plan.blurb && (
                        <p
                          className={cn(
                            "mt-2 text-sm",
                            plan.highlight
                              ? "text-primary-foreground/85"
                              : "text-muted-foreground",
                          )}
                        >
                          {plan.blurb}
                        </p>
                      )}

                      {/* Price or Let’s Talk */}
                      {price ? (
                        <>
                          <div
                            className={cn(
                              "mt-6 text-[40px] font-semibold leading-none sm:text-[44px]",
                            )}
                          >
                            {price}
                          </div>
                          {!!perUnit && (
                            <div
                              className={cn(
                                "mt-2 text-sm",
                                plan.highlight
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground",
                              )}
                            >
                              {perUnit}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div
                            className={cn(
                              "mt-6 text-[44px] font-medium",
                              plan.highlight
                                ? "text-primary-foreground"
                                : "text-foreground",
                            )}
                          >
                            Let’s Talk
                          </div>
                          <div
                            className={cn(
                              "mt-1 text-sm",
                              plan.highlight
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground",
                            )}
                          >
                            Contact us for details
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right column: features with checkmarks */}
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <Check
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              plan.highlight
                                ? "text-primary-foreground"
                                : "text-tagline",
                            )}
                            strokeWidth={2.5}
                          />
                          <span
                            className={cn(
                              "text-sm sm:text-base",
                              plan.highlight
                                ? "text-primary-foreground/95"
                                : "text-muted-foreground",
                            )}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA spans both columns */}
                    <div className="lg:col-span-2">
                      <Button
                        asChild
                        className={cn(
                          "h-12 w-full rounded-[12px]",
                          plan.highlight &&
                            "text-tagline bg-primary-foreground hover:bg-primary-foreground/90",
                        )}
                        variant={plan.highlight ? "default" : "default"}
                      >
                        <a href={plan.ctaHref ?? "#"}>{plan.ctaLabel}</a>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* spacer */}
        <div className="h-6 sm:h-8" />
      </div>
    </section>
  );
}
