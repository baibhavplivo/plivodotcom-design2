"use client";

interface PricingModel {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta?: { label: string; href: string };
}

const pricingModels: PricingModel[] = [
  {
    title: "Dynamic usage-based pricing",
    description:
      "Pay only for what you use while automatically unlocking volume discounts as your usage grows. The more you use, the more you save.",
    cta: { label: "Contact sales", href: "/contact/sales" },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: "Committed spend volume discounts",
    description:
      "Simple, predictable pricing with maximum benefits. Commit to a monthly spend and enjoy flat-rate discounts, no tiers needed.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    cta: { label: "Contact sales", href: "/contact/sales" },
  },
];

export default function PhoneNumbersPricing() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4 max-w-3xl mx-auto">
            Flexible pricing models to meet your needs
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {pricingModels.map((model, index) => (
            <div
              key={index}
              className="rounded-xl bg-white border border-gray-200 p-6 lg:p-8 transition-all hover:shadow-lg hover:border-gray-300"
            >
              <span className="text-[#323dfe] mb-4 block">{model.icon}</span>
              <h3 className="text-lg font-semibold text-black mb-3">
                {model.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {model.description}
              </p>
              {model.cta && (
                <a
                  href={model.cta.href}
                  className="inline-flex items-center text-sm font-medium text-[#323dfe] hover:text-[#323dfe]/80 transition-colors"
                >
                  {model.cta.label}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
