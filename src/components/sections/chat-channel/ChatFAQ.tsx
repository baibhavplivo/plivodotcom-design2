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
    question: "What are AI chat agents?",
    answer:
      "AI chat agents are intelligent virtual assistants that automate customer interactions through text-based conversations. They handle queries, process orders, send notifications, and provide 24/7 support - all while maintaining natural, human-like conversations across web chat, mobile apps, and messaging platforms.",
  },
  {
    question: "How do AI chat agents differ from traditional chatbots?",
    answer:
      "Unlike traditional chatbots that follow predefined scripts, AI chat agents leverage advanced AI technologies to understand context, remember past interactions, and provide personalized responses. They learn from each conversation and can handle complex, multi-turn dialogues naturally.",
  },
  {
    question: "What tasks can AI chat agents automate?",
    answer:
      "AI chat agents can automate a wide range of tasks including answering FAQs, processing orders, tracking shipments, scheduling appointments, collecting feedback, handling returns and exchanges, qualifying leads, providing product recommendations, and escalating complex issues to human agents.",
  },
  {
    question: "Are AI chat agents suitable for small businesses?",
    answer:
      "Yes! AI chat agents are scalable and work for businesses of all sizes. Small businesses benefit from 24/7 customer support without needing to hire large support teams, while enterprise companies can handle massive volumes of conversations efficiently.",
  },
  {
    question: "Do AI chat agents support multiple languages?",
    answer:
      "Yes, our AI chat agents support 50+ languages and can automatically detect customer language preferences. This allows you to serve customers in their preferred language without manual intervention.",
  },
  {
    question: "How do I get started with AI chat agents?",
    answer:
      "Getting started is easy! Sign up for a Plivo account, and use our no-code Agent Studio to build and deploy your first AI chat agent in minutes. You can embed it on your website, mobile app, or connect it to messaging platforms.",
  },
  {
    question: "Can AI chat agents hand off to human agents?",
    answer:
      "Absolutely. When a conversation requires human expertise, the AI agent seamlessly transfers the chat to a live agent along with the full conversation context. This ensures the customer doesn't have to repeat themselves and the human agent has all the information needed.",
  },
  {
    question: "How does the pricing work for AI chat?",
    answer:
      "Plivo offers flexible, pay-as-you-go pricing for AI chat. You pay based on the number of conversations handled. There are no upfront costs or long-term commitments, making it easy to scale as your business grows.",
  },
  {
    question: "What integrations are supported?",
    answer:
      "Plivo AI chat integrates with popular CRMs (Salesforce, HubSpot, Zoho), helpdesks (Zendesk, Freshdesk), e-commerce platforms (Shopify, WooCommerce), and productivity tools (Slack, Google Calendar, Zapier). Custom integrations are also available via our API.",
  },
];

export default function ChatFAQ() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-600 text-center mb-10 md:mb-12">
          Everything you need to know about Plivo AI chat agents.
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
