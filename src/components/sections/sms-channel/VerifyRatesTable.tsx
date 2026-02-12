"use client";

// Rates table data - per-unit Plivo Verify channel rates
const ratesTableData = [
  { country: "United States", sms: "$0.0070/sms", voice: "$0.0100/min", whatsapp: "$0.0048/conversation" },
  { country: "Canada", sms: "$0.0070/sms", voice: "$0.0120/min", whatsapp: "$0.0048/conversation" },
  { country: "United Kingdom", sms: "$0.0400/sms", voice: "$0.0150/min", whatsapp: "$0.0098/conversation" },
  { country: "India", sms: "$0.00018/sms", voice: "$0.0048/min", whatsapp: "$0.0022/conversation" },
  { country: "Australia", sms: "$0.04513/sms", voice: "$0.0230/min", whatsapp: "$0.0165/conversation" },
  { country: "Germany", sms: "$0.0750/sms", voice: "$0.0180/min", whatsapp: "$0.0131/conversation" },
  { country: "Brazil", sms: "$0.0350/sms", voice: "$0.0200/min", whatsapp: "$0.0080/conversation" },
];

export default function VerifyRatesTable() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-3">
            Plivo offers the lowest cost per verification
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            No hidden charges. Discover your potential savings with Plivo.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px] items-stretch">
          {/* Left - Rates Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Country</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">SMS Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Voice Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">WhatsApp Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ratesTableData.map((rate) => (
                    <tr key={rate.country}>
                      <td className="px-6 py-4 text-sm font-medium text-black">{rate.country}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rate.sms}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rate.voice}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rate.whatsapp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right - Pricing Info */}
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col">
            <h3 className="font-semibold text-black text-lg mb-4">Our Pricing</h3>
            <p className="text-gray-600 text-sm mb-6 flex-1">
              Zero charges for both Fraud Shield and OTP verification services. Only pay SMS, Voice or WhatsApp charges.
            </p>
            <a
              href="/sms/pricing"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              View Detailed Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
