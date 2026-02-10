interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Icons = {
  IPAuth: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
      />
    </svg>
  ),
  Encrypted: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  Fraud: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  Interop: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
      />
    </svg>
  ),
  Portal: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Separated: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
};

const features: FeatureItem[] = [
  {
    title: "IP Authentication",
    description:
      "Authenticate and access your SIP trunks using IP authentication or credentials for added security.",
    icon: <Icons.IPAuth />,
  },
  {
    title: "Encrypted Trunks",
    description:
      "Secure your trunks with Transport Layer Security (TLS) and Secure Real-Time Transport Protocol (SRTP).",
    icon: <Icons.Encrypted />,
  },
  {
    title: "Fraud Protection and Alerts",
    description:
      "Our systems automatically detect and alert you to fraudulent activity on your account.",
    icon: <Icons.Fraud />,
  },
  {
    title: "Interoperability",
    description:
      "Interoperate with standard softswitches and IP PBXs.",
    icon: <Icons.Interop />,
  },
  {
    title: "Self-Service Portal",
    description:
      "Easily access and manage your account analytics, logs, and SIP trunks.",
    icon: <Icons.Portal />,
  },
  {
    title: "Separated Trunks",
    description:
      "Each trunk has a unique SIP domain for easy traffic segmentation and management.",
    icon: <Icons.Separated />,
  },
];

export default function SIPRobustFeatures() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
            Robust Feature Set for All Your Business Needs
          </h2>
        </div>

        {/* Feature Grid - Bordered Layout */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-5 sm:p-6 ${
                  index % 3 !== 0
                    ? "lg:border-l border-gray-200"
                    : ""
                } ${
                  index % 2 !== 0
                    ? "max-lg:border-l max-sm:border-l-0 border-gray-200"
                    : ""
                } ${
                  index >= 3
                    ? "border-t border-gray-200"
                    : ""
                } ${
                  index >= 2 && index < 3
                    ? "max-lg:border-t border-gray-200"
                    : ""
                } ${
                  index >= 1 && index < 3
                    ? "max-sm:border-t border-gray-200"
                    : ""
                }`}
              >
                <span className="text-[#323dfe] mb-3 block">
                  {feature.icon}
                </span>
                <h4 className="text-sm font-semibold text-black mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col items-center bg-gray-50 rounded-2xl border border-gray-200 px-8 sm:px-12 py-8 sm:py-10">
            <h3 className="font-sora text-xl sm:text-2xl font-normal text-black mb-3">
              Let's find the right plan for your business
            </h3>
            <a
              href="/contact/sales"
              className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 mt-2"
            >
              Get Volume Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
