interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Icons = {
  Security: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Trust: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Onboarding: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Pricing: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
};

const topFeatures: Feature[] = [
  {
    title: "Secure, reliable platform",
    description:
      "SOC 2, HIPAA, and PCI DSS compliant with 99.99% uptime SLA. Enterprise-grade security and reliability you can depend on.",
    icon: <Icons.Security />,
  },
  {
    title: "Proven success & customer trust",
    description:
      "Billions of interactions processed with 95%+ customer satisfaction ratings on G2. Trusted by leading B2C brands worldwide.",
    icon: <Icons.Trust />,
  },
];

const bottomFeatures: Feature[] = [
  {
    title: "Whiteglove onboarding",
    description:
      "Dedicated implementation engineers and 24/7 support to get your AI chat agents up and running quickly.",
    icon: <Icons.Onboarding />,
  },
  {
    title: "Flexible, scalable pricing",
    description:
      "Pay-as-you-go model with no upfront costs. Scale your AI chat operations as your business grows.",
    icon: <Icons.Pricing />,
  },
];

export default function ChatEngagementPlatform() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4 max-w-3xl mx-auto">
            An enterprise foundation for
            <br />
            your AI-powered chat
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade security, compliance, 99.99% uptime, proven performance, flexible pay-as-you-go pricing, and dedicated support.
          </p>
        </div>

        {/* Bordered Grid Container */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Top Row - 2 Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
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

          {/* Bottom Row - 2 Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
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
