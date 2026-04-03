"use client";


import { WHATSAPP_CHAT_PAGE_COPY } from "@/data/whatsapp-chat-pricing";

export default function WhatsAppPricingVolumeCTA() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#0f1117]">
          <div className="relative z-10 flex flex-col gap-6 px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10">
            <h2 className="max-w-2xl font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-white">
              {WHATSAPP_CHAT_PAGE_COPY.volumeCtaTitle}
            </h2>
            <a
              href={WHATSAPP_CHAT_PAGE_COPY.volumeCtaHref}
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
            >
              {WHATSAPP_CHAT_PAGE_COPY.volumeCtaLabel}
            </a>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-1/2" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
        </div>
      </div>
    </section>
  );
}
