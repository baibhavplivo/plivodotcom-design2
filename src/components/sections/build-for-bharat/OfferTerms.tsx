// OfferTerms.tsx - Terms & Conditions section (light theme)

const terms = [
  {
    label: "Offer Period",
    value:
      "February 16, 2026, 12:00 AM IST - February 20, 2026, 11:59 PM IST",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Eligibility",
    value:
      "This offer is applicable only to new accounts created during the specified offer period. Existing Plivo customers who open a new account will not qualify for this offer.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
  },
  {
    label: "Bonus Credits",
    value:
      "100% match on every recharge during the Offer Period. No cap. Applied automatically within 24 hours.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Usage",
    value:
      "Valid for all Plivo services - Voice AI, SMS, WhatsApp, Chat. Non-transferable. No cash value.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Expiration",
    value: "Bonus credits expire 12 months from date of issue.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Refunds",
    value:
      "Bonus credits are non-refundable. Refund on a paid recharge forfeits corresponding bonus.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
  {
    label: "Abuse",
    value:
      "Plivo may revoke credits for fraudulent activity including multiple accounts, false information, or reselling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Modifications",
    value:
      "Plivo reserves the right to modify or end the Offer at any time without notice.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    label: "Liability",
    value:
      "Plivo is not liable for indirect or consequential damages. Total liability limited to paid recharges during Offer Period.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

export default function OfferTerms() {
  return (
    <section className="py-10 sm:py-12 lg:py-[60px] bg-white">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Section header */}
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
            Offer Terms
          </h2>
        </div>

        {/* Terms list */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {terms.map((term, idx) => (
            <div
              key={term.label}
              className={`flex gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 ${
                idx !== terms.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="shrink-0 mt-0.5 text-[#323DFE]">
                {term.icon}
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 flex-1">
                <div className="sm:w-[160px] shrink-0">
                  <span className="text-sm font-semibold text-black">
                    {term.label}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {term.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Questions callout */}
        <div className="mt-8 rounded-xl border border-gray-200 px-6 py-5 text-center">
          <p className="text-sm text-gray-600">
            Questions? Email{" "}
            <a
              href="mailto:events@plivo.com?subject=Build%20for%20Bharat%20Inquiry"
              className="font-medium text-black hover:text-[#cd3ef9] transition-colors underline underline-offset-2"
            >
              events@plivo.com
            </a>{" "}
            with subject "Build for Bharat Inquiry"
          </p>
        </div>
      </div>
    </section>
  );
}
