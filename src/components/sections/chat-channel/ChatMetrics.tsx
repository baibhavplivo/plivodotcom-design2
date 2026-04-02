export default function ChatMetrics() {
  const metrics = [
    {
      value: "80%",
      label: "of customer queries resolved without human intervention",
    },
    {
      value: "60%",
      label: "reduction in support operations costs",
    },
    {
      value: "3x",
      label: "faster responses to customers",
    },
    {
      value: "35%",
      label: "higher CSAT scores",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Measurable results with AI chat agents that drive business growth
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          Real outcomes from businesses using Plivo AI chat to transform their customer experience.
        </p>

        {/* Metrics Grid */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {metrics.map((metric, index) => (
              <div key={index} className="p-6 lg:p-8 text-center">
                <p className="text-[2.5rem] sm:text-[3rem] font-normal leading-[1] tracking-[-0.02em] text-black mb-3">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
