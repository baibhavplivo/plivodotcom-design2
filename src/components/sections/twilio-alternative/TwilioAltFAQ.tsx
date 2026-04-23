"use client";

import { useRef, useEffect, useState } from "react";

const FAQS = [
  {
    q: "How does Plivo's pricing compare with Twilio?",
    a: "Our starting price is 30–40% lower than Twilio, and with volume pricing you can experience overall savings ranging from 70–90%, making Plivo the most cost-efficient Twilio alternative.",
  },
  {
    q: "How easy is it to migrate my 10DLC campaigns from Twilio?",
    a: "We offer a seamless 10DLC migration process with guided compliance expert assistance. Our solutions engineers will walk you through every step to ensure zero disruption to your messaging.",
  },
  {
    q: "Do you support Sender ID registration?",
    a: "Yes. We support Sender ID registration in 20+ countries with 24/7 support guidance and assisted registration to help you meet local compliance requirements.",
  },
  {
    q: "What is Plivo's geographical coverage?",
    a: "Plivo offers SMS and voice services to 220+ countries. We also provide local, toll-free, and mobile phone numbers in 60+ countries so you can establish a local presence globally.",
  },
  {
    q: "What are the advantages of Plivo's Verify API over Twilio Verify?",
    a: "Plivo's Verify API charges no per-authentication fee — you only pay for SMS and voice delivery. We also include built-in SMS pumping fraud prevention and optimized OTP delivery routes.",
  },
  {
    q: "What is Plivo's uptime guarantee?",
    a: "We offer a 99.99% uptime SLA backed by 1,600+ Tier 1 carrier relationships, 7 global points of presence, and 2 network operations centers for maximum reliability.",
  },
  {
    q: "Is Plivo compliant with data security regulations?",
    a: "Yes. Plivo is PCI-DSS, GDPR, and HIPAA compliant, and holds SOC 2 Type II certification. We maintain the highest standards of data security and privacy.",
  },
  {
    q: "Can I port my phone numbers from Twilio to Plivo?",
    a: "Absolutely. We support self-service number porting for US and Canada numbers. For international numbers, our support team will assist you through the porting process.",
  },
  {
    q: "What kind of customer support does Plivo offer?",
    a: "We provide personalized, 24/7, 1:1 premium support with dedicated Customer Success Managers. Every customer gets white-glove onboarding and proactive account management.",
  },
  {
    q: "What use cases can I migrate from Twilio to Plivo?",
    a: "You can migrate all standard communication use cases including two-factor authentication, appointment reminders, alerts and notifications, SMS marketing campaigns, click-to-call, call forwarding, call tracking, IVRs, and intelligent call routing.",
  },
];

export default function TwilioAltFAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll<HTMLButtonElement>("[data-faq-trigger]");
    const handlers: Array<() => void> = [];

    buttons.forEach((btn, i) => {
      const handler = () => {
        setOpenIndex((prev) => (prev === i ? null : i));
      };
      btn.addEventListener("click", handler);
      handlers.push(handler);
    });

    return () => {
      buttons.forEach((btn, i) => {
        btn.removeEventListener("click", handlers[i]);
      });
    };
  }, []);

  return (
    <section className="py-12 lg:py-16 bg-background border-t border-border">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10">
          <h2 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-foreground">
            Frequently asked questions
          </h2>
        </div>

        <div ref={containerRef} className="divide-y divide-border border-t border-b border-border">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  data-faq-trigger
                  className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:text-foreground/80"
                >
                  {faq.q}
                  <svg
                    className={`ml-4 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
