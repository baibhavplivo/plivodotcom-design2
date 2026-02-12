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
    question: "How much does it cost to set up a business phone number?",
    answer:
      "The cost of setting up a business phone number can vary significantly based on the type of phone system, size of the business, and the company's specific needs. Initial set up costs can vary from minimal - for VoIP systems, for instance - to potentially thousands of dollars for a traditional set up. A small business can expect to pay between $20 and $100 per month per line, depending on the chosen service type and features.",
  },
  {
    question: "Does Plivo provide free phone numbers?",
    answer:
      "While we do not provide free numbers, we do offer trial credits for new accounts to trial our services and features. Refer to our pricing page to learn more about phone number rentals: https://www.plivo.com/virtual-phone-numbers/pricing/",
  },
  {
    question: "What are options for business phone numbers?",
    answer:
      "There are many options for business phone numbers, including local numbers for voice and SMS; national numbers for voice; and toll-free numbers for voice, SMS, and MMS; mobile numbers for voice, SMS, and MMS; short codes for SMS and MMS; and more.",
  },
  {
    question: "How do I get a toll-free number for my business?",
    answer:
      "You can get a toll-free number for your business through a service provider like Plivo. Simply sign up for a Plivo account and purchase one the Plivo console (Phone Numbers > Buy Numbers) or through the Plivo Toll-free Verification API.",
  },
  {
    question: "How do I know if a phone number is owned by Twilio?",
    answer:
      "Find out if a phone number is owned by Twilio by texting the Twilio lookup bot (1-855-747-ROBO), using Twilio's Lookup API, or referring to the resources found in Twilio's helper libraries.",
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
