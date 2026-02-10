interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Icon components
const Icons = {
  FastOnboarding: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  GlobalInventory: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  NumberFlexibility: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  MetaAssistance: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  CustomerExcellence: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Compliance: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
};

const topFeatures: Feature[] = [
  {
    title: "Fast onboarding",
    description:
      "Get your verified WhatsApp Business account with priority approval and hassle-free setup.",
    icon: <Icons.FastOnboarding />,
  },
  {
    title: "Global inventory",
    description:
      "Access WhatsApp-ready business phone numbers across 50+ countries worldwide.",
    icon: <Icons.GlobalInventory />,
  },
  {
    title: "Number flexibility",
    description:
      "Choose from an inventory of mobile, landline, or toll-free numbers, or bring your own.",
    icon: <Icons.NumberFlexibility />,
  },
];

const bottomFeatures: Feature[] = [
  {
    title: "Priority Meta assistance",
    description:
      "Get expedited issue resolution with priority Meta responses for uninterrupted operations.",
    icon: <Icons.MetaAssistance />,
  },
  {
    title: "Customer excellence",
    description:
      "Consistent 95%+ CSAT score with responsive support, and guaranteed 99.99% uptime.",
    icon: <Icons.CustomerExcellence />,
  },
  {
    title: "Built-in compliance",
    description:
      "Pre-configured controls for GDPR, HIPAA, PCI DSS, ISO 27001, and SOC 2 compliance.",
    icon: <Icons.Compliance />,
  },
];

export default function WhatsAppEngagementPlatform() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4 max-w-3xl mx-auto">
            Plivo: Your unbeatable
            <br />
            WhatsApp advantage
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From rapid setup to guaranteed compliance, we eliminate barriers to your WhatsApp success. Our unmatched reliability, speed, and expertise put you ahead.
          </p>
        </div>

        {/* Bordered Grid Container */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Top Row - 3 Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {topFeatures.map((feature, index) => (
              <div key={index} className="p-6 lg:p-8">
                <span className="text-[#323dfe] mb-4 block">{feature.icon}</span>
                <h3 className="text-base font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Bottom Row - 3 Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {bottomFeatures.map((feature, index) => (
              <div key={index} className="p-6 lg:p-8">
                <span className="text-[#323dfe] mb-4 block">{feature.icon}</span>
                <h3 className="text-base font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Logos */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-12 sm:gap-[4.5rem] md:gap-24">
          {[
            { name: "HIPAA", src: "/images/compliance/HIPAA black.svg" },
            { name: "GDPR", src: "/images/compliance/GDPR black.svg" },
            { name: "SOC 2", src: "/images/compliance/AICPA black.svg" },
            { name: "PCI DSS", src: "/images/compliance/PCI black.svg" },
            { name: "STAR", src: "/images/compliance/Star Black.svg" },
          ].map((cert) => (
            <div key={cert.name} className="flex flex-col items-center gap-3">
              <img
                src={cert.src}
                alt={`${cert.name} compliance`}
                className="h-10 sm:h-12 w-10 sm:w-12 object-contain opacity-60"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-500">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
