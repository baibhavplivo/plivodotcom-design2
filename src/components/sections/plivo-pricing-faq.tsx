"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGeoCountry } from "@/hooks/useGeoCountry";

function getFaqItems(isIndia: boolean) {
  const credits = isIndia ? "₹1,000" : "$10";
  const limit = isIndia ? "₹2,00,000" : "$2,500";
  return [
    {
      question: "How does pay-as-you-go pricing work?",
      answer:
        "With pay-as-you-go pricing, you only pay for what you use. There are no monthly commitments or minimum fees. You're charged based on actual usage-per minute for voice calls, per message for SMS, and per conversation for WhatsApp.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        `New accounts receive ${credits} in free credits with no credit card required. This allows you to test our Voice, SMS, WhatsApp, and AI Agent capabilities before committing to any paid usage.`,
    },
    {
      question: "Are there volume discounts available?",
      answer:
        "Yes, we offer volume-based discounts for high-volume users. Contact our sales team to discuss custom pricing packages tailored to your specific usage patterns and business needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express) and support ACH bank transfers for US-based customers. Enterprise customers can also arrange invoice-based billing.",
    },
    {
      question: "Can I set spending limits on my account?",
      answer:
        `Yes, you can configure spending alerts and limits in your dashboard. Free trial accounts are limited to ${limit} in monthly usage. You can also set up automatic top-ups to ensure uninterrupted service.`,
    },
    {
      question: "How are AI Agent costs calculated?",
      answer:
        "AI Agent costs are calculated based on usage type: voice agents are billed per minute of conversation, text agents per outcome/interaction, and media generation (images, audio) per item generated.",
    },
    {
      question: "Do prices vary by country?",
      answer:
        "Yes, pricing varies by destination country due to differences in carrier costs and local regulations. Use the country selector above to see specific rates for your target markets.",
    },
    {
      question: "Is there a contract or commitment required?",
      answer:
        "No, there's no contract or long-term commitment required. You can start and stop using our services at any time. Enterprise customers may opt for annual agreements with additional benefits.",
    },
  ];
}

export function PlivoPricingFAQ() {
  const { country } = useGeoCountry("US", { mode: "exact" });
  const isIndia = country === "IN";
  const faqItems = getFaqItems(isIndia);
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="font-sora text-center text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-10">
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-base font-medium text-black hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-[15px] leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default PlivoPricingFAQ;
