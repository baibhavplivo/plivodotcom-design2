"use client";

const pricingHighlights = [
  {
    title: "Only pay to verify REAL users",
    description: "No charges for fraudulent or failed verification attempts.",
  },
  {
    title: "$0 Verification fee",
    description: "Only pay for SMS, Voice, or WhatsApp channel charges.",
  },
  {
    title: "$0 for Plivo Fraud Shield",
    description: "AI-driven fraud prevention included at no extra cost.",
  },
];

const countryRates = [
  {
    country: "United States",
    sms: "$0.0070/sms",
    voice: "$0.0100/min",
    whatsapp: "$0.0044/msg",
  },
  {
    country: "Canada",
    sms: "$0.0070/sms",
    voice: "$0.0120/min",
    whatsapp: "$0.0044/msg",
  },
  {
    country: "India",
    sms: "₹0.00018/sms",
    voice: "₹0.0048/min",
    whatsapp: "₹0.1232/msg",
  },
  {
    country: "Australia",
    sms: "$0.0451/sms",
    voice: "$0.0230/min",
    whatsapp: "$0.0124/msg",
  },
];

export default function VerifyPricingComparison() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
            No hidden charges
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Plivo offers the lowest cost per verification. Zero charges for both Fraud Shield and OTP verification services.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Pricing highlights */}
          <div className="space-y-4">
            {pricingHighlights.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#323dfe]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#323dfe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing comparison card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200">
            <h3 className="font-semibold text-black mb-4">Cost comparison: 100,000 SMS in US</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#323dfe]/5 rounded-lg border border-[#323dfe]/10">
                <div className="flex items-center gap-3">
                  <img src="/images/plivo-logo.svg" alt="Plivo" className="h-5" />
                  <span className="font-medium text-black">Plivo</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">$2,760</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <span className="text-gray-600">Other Platforms</span>
                <span className="text-xl font-bold text-gray-400 line-through">$23,050</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Your savings with Plivo</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">$20,290</span>
                    <span className="block text-sm bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent font-medium">88% reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing table */}
        <div className="mt-10 md:mt-12 overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">Country</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">SMS Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">Voice Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">WhatsApp Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {countryRates.map((rate, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{rate.country}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rate.sms}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rate.voice}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rate.whatsapp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
