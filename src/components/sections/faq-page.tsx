import { useCallback, useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

type Category = "Getting Started" | "Products" | "Pricing" | "Security" | "Support";

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

const faqItems: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "What is Plivo?",
    answer:
      "Plivo is a cloud communications platform that enables businesses to build, deploy, and scale AI-powered voice and messaging solutions. From no-code AI agent builders to flexible APIs for developers, Plivo powers customer interactions across voice, SMS, WhatsApp, and web chat.",
  },
  {
    category: "Getting Started",
    question: "How do I get started with Plivo?",
    answer:
      "Sign up for a free Plivo account to receive trial credits. No credit card is required. You can start building voice AI agents with our no-code Agent Studio, send SMS or WhatsApp messages via our APIs, or explore our full product suite from the console.",
  },
  {
    category: "Getting Started",
    question: "Do I need technical expertise to use Plivo?",
    answer:
      "Not necessarily. Our no-code Agent Studio lets non-technical teams build and deploy AI agents without writing code. For developers, we offer comprehensive APIs, SDKs (Python, Node.js, Ruby, PHP, Java, .NET, Go), and detailed documentation.",
  },
  // Products
  {
    category: "Products",
    question: "What products does Plivo offer?",
    answer:
      "Plivo offers Voice AI Agents, SMS, WhatsApp Business API, web chat agents, SIP trunking, virtual phone numbers, and Verify (OTP/2FA). All products can be used independently or combined for omnichannel customer engagement.",
  },
  {
    category: "Products",
    question: "What are Voice AI Agents?",
    answer:
      "Voice AI Agents are intelligent virtual assistants that handle inbound and outbound phone calls with human-like conversation quality. They can schedule appointments, manage orders, resolve support issues, and qualify leads — all with sub-500ms latency.",
  },
  {
    category: "Products",
    question: "What channels does Plivo support?",
    answer:
      "Plivo supports voice calls (PSTN and SIP), SMS, MMS, WhatsApp Business messaging and calling, and web chat. You can reach customers on the channels they prefer with a unified platform.",
  },
  // Pricing
  {
    category: "Pricing",
    question: "How does Plivo pricing work?",
    answer:
      "Plivo uses pay-as-you-go pricing with no monthly commitments or minimum fees. Voice calls are billed per minute, SMS per message, and WhatsApp per conversation. Volume discounts are available for high-usage customers.",
  },
  {
    category: "Pricing",
    question: "Is there a free trial?",
    answer:
      "Yes, new accounts receive free trial credits with no credit card required. This lets you test voice, SMS, WhatsApp, and AI Agent capabilities before committing to paid usage.",
  },
  {
    category: "Pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and ACH bank transfers for US-based customers. Enterprise customers can arrange invoice-based billing.",
  },
  // Security
  {
    category: "Security",
    question: "How secure is Plivo?",
    answer:
      "Plivo is SOC 2 Type II compliant and follows enterprise-grade security practices. All data is encrypted in transit (TLS) and at rest. We maintain strict access controls, regular security audits, and comprehensive monitoring across our global infrastructure.",
  },
  {
    category: "Security",
    question: "Is Plivo compliant with industry regulations?",
    answer:
      "Yes. Plivo supports GDPR, HIPAA, TCPA, and other regulatory requirements. We provide tools for consent management, opt-out handling, and data residency to help you stay compliant across different markets.",
  },
  {
    category: "Security",
    question: "Where is my data stored?",
    answer:
      "Plivo operates a globally distributed infrastructure with data centers in multiple regions. Enterprise customers can discuss data residency requirements with our sales team to meet specific compliance needs.",
  },
  // Support
  {
    category: "Support",
    question: "What support options are available?",
    answer:
      "All Plivo accounts get access to our documentation, community resources, and email support. Business and Enterprise plans include priority support with dedicated account managers and faster response times.",
  },
  {
    category: "Support",
    question: "Do you offer onboarding assistance?",
    answer:
      "Yes. Our team helps with WhatsApp Business API approval, number provisioning, integration setup, and AI agent configuration. Enterprise customers receive dedicated onboarding and solution architecture support.",
  },
  {
    category: "Support",
    question: "Is there a contract or commitment required?",
    answer:
      "No. Plivo operates on a pay-as-you-go model with no contracts or long-term commitments. You can start and stop using our services at any time. Enterprise customers may opt for annual agreements with additional benefits.",
  },
];

const categories: Category[] = [
  "Getting Started",
  "Products",
  "Pricing",
  "Security",
  "Support",
];

const TOP_PADDING = 300;

export const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Getting Started");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const categoryRefs = useRef<Record<Category, HTMLDivElement | null>>({
    "Getting Started": null,
    Products: null,
    Pricing: null,
    Security: null,
    Support: null,
  });

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    let debounceTimeout: NodeJS.Timeout;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip if we're programmatically scrolling
        if (isScrollingRef.current) return;

        // Clear any pending timeout
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        // Debounce the category update
        debounceTimeout = setTimeout(() => {
          const intersectingEntries = entries.filter(
            (entry) => entry.isIntersecting,
          );

          // Find the entry that's closest to being 100px from the top
          const entry = intersectingEntries.reduce(
            (closest, current) => {
              const rect = current.boundingClientRect;
              const distanceFromThreshold = Math.abs(rect.top - TOP_PADDING);
              const closestDistance = closest
                ? Math.abs(closest.boundingClientRect.top - TOP_PADDING)
                : Infinity;

              return distanceFromThreshold < closestDistance
                ? current
                : closest;
            },
            null as IntersectionObserverEntry | null,
          );

          if (entry) {
            const category = entry.target.getAttribute(
              "data-category",
            ) as Category;
            if (category) {
              setActiveCategory(category);
            }
          }
        }, 150);
      },
      {
        root: null,
        rootMargin: `-${TOP_PADDING}px 0px -100% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    Object.entries(categoryRefs.current).forEach(([category, element]) => {
      if (element) {
        element.setAttribute("data-category", category);
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = setupObserver();
    return () => {
      cleanup();
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    isScrollingRef.current = true;

    const element = document.getElementById(`faq-${category.toLowerCase()}`);
    if (element) {
      element.style.scrollMargin = `${TOP_PADDING}px`;
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <section className="bg-sand-100 min-h-screen py-16 md:py-28 lg:py-32">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h1 className="font-sora text-center text-4xl font-normal tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-center text-muted-foreground">
            Everything you need to know about Plivo's cloud communications platform.
          </p>
        </div>

        <div className="mt-8 grid max-w-5xl gap-8 md:mt-12 md:grid-cols-[200px_1fr] md:gap-12 lg:mt-16">
          {/* Sidebar */}
          <div className="sticky top-24 flex h-fit flex-col gap-4 max-md:hidden">
            {categories.map((category) => (
              <Button
                variant="ghost"
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`justify-start text-left text-xl transition-colors ${
                  activeCategory === category
                    ? "font-semibold"
                    : "font-normal hover:opacity-75"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Items by Category */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryItems = faqItems.filter(
                (item) => item.category === category,
              );

              return (
                <div
                  key={category}
                  id={`faq-${category.toLowerCase()}`}
                  ref={(el) => {
                    categoryRefs.current[category] = el;
                  }}
                  className={cn(
                    `rounded-xl`,
                    activeCategory === category
                      ? "bg-background"
                      : "bg-background/40",
                    "px-6",
                  )}
                  style={{
                    scrollMargin: `${TOP_PADDING}px`,
                  }}
                >
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={`${categories[0]}-0`}
                    className="w-full"
                  >
                    {categoryItems.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`${category}-${i}`}
                        className="border-b border-muted last:border-0"
                      >
                        <AccordionTrigger className="text-base font-medium hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base font-medium text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
