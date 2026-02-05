"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are WhatsApp AI Agents?",
    answer:
      "WhatsApp AI Agents are intelligent virtual assistants that automate customer interactions on WhatsApp. They handle queries, process orders, send notifications, and provide 24/7 support - all while maintaining natural, human-like conversations.",
  },
  {
    question: "How do WhatsApp AI Agents differ from traditional chatbots?",
    answer:
      "Unlike traditional chatbots that follow predefined scripts, WhatsApp AI Agents leverage advanced AI technologies to understand context, remember past interactions, and provide personalized responses. They learn from each conversation and can handle complex, multi-turn dialogues naturally.",
  },
  {
    question: "What tasks can WhatsApp AI Agents automate?",
    answer:
      "WhatsApp AI Agents can automate a wide range of tasks including answering FAQs, processing orders, sending order confirmations and shipping updates, scheduling appointments, collecting feedback, handling returns and exchanges, providing product recommendations, and much more.",
  },
  {
    question: "Are WhatsApp AI Agents suitable for small businesses?",
    answer:
      "Yes! WhatsApp AI Agents are scalable and work for businesses of all sizes. Small businesses benefit from 24/7 customer support without needing to hire large support teams, while enterprise companies can handle massive volumes of conversations efficiently.",
  },
  {
    question: "Do WhatsApp AI Agents support multiple languages?",
    answer:
      "Yes, our WhatsApp AI Agents support 28+ languages and can automatically detect customer language preferences. This allows you to serve customers in their preferred language without manual intervention.",
  },
  {
    question: "How do I get started with WhatsApp AI Agents?",
    answer:
      "Getting started is easy! Sign up for a Plivo account, and our team will help you with priority WhatsApp Business API approval. You can then use our no-code Agent Studio to build and deploy your first AI agent in minutes.",
  },
];

export default function WhatsAppFAQ() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-600 text-center mb-10 md:mb-12">
          Everything you need to know about WhatsApp AI Agents.
        </p>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200 bg-white first:rounded-t-lg last:rounded-b-lg"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                <span className="text-base font-medium text-black pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
