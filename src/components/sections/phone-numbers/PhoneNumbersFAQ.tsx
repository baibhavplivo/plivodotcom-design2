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
    question: "How much does a virtual phone number cost on Plivo?",
    answer:
      "Plivo offers competitive pay-as-you-go pricing for phone numbers. US local numbers start at $0.50/month, toll-free numbers at $1.00/month, and pricing varies by country and number type. There are no setup fees. Visit our pricing page at /virtual-phone-numbers/pricing/ for detailed rates by country.",
  },
  {
    question: "Does Plivo provide free phone numbers?",
    answer:
      "While we do not provide free numbers, new accounts receive trial credits to test our services and features. You can use these credits to rent numbers and make test calls or send messages. Visit our pricing page at /virtual-phone-numbers/pricing/ for phone number rental rates.",
  },
  {
    question: "What types of phone numbers does Plivo offer?",
    answer:
      "Plivo offers local numbers for voice and SMS, toll-free numbers for voice, SMS, and MMS, mobile numbers for voice, SMS, and MMS, and short codes for high-volume SMS and MMS. Numbers are available across 100+ countries.",
  },
  {
    question: "How do I get a toll-free number for my business?",
    answer:
      "You can get a toll-free number through Plivo by signing up for an account and purchasing one from the Plivo console (Phone Numbers > Buy Numbers) or through the Plivo Phone Number API. Toll-free verification is required for US/Canadian toll-free numbers used for messaging.",
  },
  {
    question: "Can I port my existing phone numbers to Plivo?",
    answer:
      "Yes, Plivo supports number porting for most number types across supported countries. You can keep your existing phone numbers while taking advantage of Plivo's platform. Contact our sales team to initiate a porting request.",
  },
];

export default function PhoneNumbersFAQ() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-600 text-center mb-10 md:mb-12">
          Everything you need to know about Plivo phone numbers.
        </p>

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
