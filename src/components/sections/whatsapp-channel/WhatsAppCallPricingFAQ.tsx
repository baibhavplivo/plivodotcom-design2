import { ChevronDown } from "lucide-react";

import { WHATSAPP_CALL_PRICING_FAQS } from "@/data/whatsapp-call-pricing";

export default function WhatsAppCallPricingFAQ() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.16em] text-gray-500">
          FAQs
        </p>
        <h2 className="mb-10 text-center font-sora text-[1.75rem] font-normal leading-[1.25] tracking-[-0.02em] text-black sm:text-[2rem] md:text-[2.5rem]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-0">
          {WHATSAPP_CALL_PRICING_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-gray-200 bg-white first:rounded-t-lg last:rounded-b-lg"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-left">
                <span className="pr-4 text-base font-medium text-black">{faq.question}</span>
                <ChevronDown className="size-4 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-4">
                <p className="text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
