import { useSignupUrl } from "@/hooks/useSignupUrl";

const COMPARISONS = [
  {
    title: "SMS API",
    highlight: "Starts at 40% less than Twilio",
    description: "And, save up to 70% with volume pricing",
    features: [
      "Send SMS to 220+ countries",
      "Premium direct carrier routes",
      "Real-time delivery reports",
    ],
  },
  {
    title: "Verify API",
    highlight: "$0 authentication fee",
    description: "Only SMS and Voice charges apply",
    features: [
      "Multi-channel: SMS and Voice OTP",
      "Pre-registered sender IDs",
      "Built-in fraud prevention",
    ],
  },
];

export default function CostComparison() {
  const { url: signupUrl, label: signupLabel } = useSignupUrl();

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
            Lower your total costs significantly
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Switch from Twilio and save on every message and call — without compromising on quality or reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {COMPARISONS.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 hover:border-gray-300 transition-colors"
            >
              <div className="text-sm font-medium text-[#323dfe] uppercase tracking-wider mb-3">
                {item.title}
              </div>
              <div className="font-sora text-xl sm:text-2xl font-normal text-black leading-tight">
                {item.highlight}
              </div>
              <p className="text-sm text-gray-500 mt-1.5">{item.description}</p>

              <div className="mt-6 space-y-2.5">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-[#323dfe] mt-[2px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/contact/sales/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-black text-white rounded-md cta-hover-gradient transition-colors"
          >
            Get Volume Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
