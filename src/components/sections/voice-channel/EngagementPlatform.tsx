interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureSection {
  subheader: string;
  items: FeatureItem[];
}

// Icon components
const Icons = {
  CustomerProfiles: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Integrations: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  Omnichannel: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  NoCode: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  CallQueuing: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  CallTransfer: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  CallSummaries: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  SupervisorCoaching: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Recording: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
};

const featureSections: FeatureSection[] = [
  {
    subheader: "Connected to all business tools",
    items: [
      {
        title: "Customer profiles",
        description:
          "Connect voice agents to your databases for comprehensive profiling and personalized customer engagement.",
        icon: <Icons.CustomerProfiles />,
      },
      {
        title: "All essential integrations",
        description:
          "Connect AI agents to CRMs, ERPs and other business tools for intelligent, contextual conversations.",
        icon: <Icons.Integrations />,
      },
      {
        title: "Omnichannel conversations",
        description:
          "Move conversations across voice, SMS, WhatsApp with complete context.",
        icon: <Icons.Omnichannel />,
      },
      {
        title: "No-code AI agent studio",
        description:
          "Build & Deploy AI-powered voice assistants without writing a single line of code.",
        icon: <Icons.NoCode />,
      },
    ],
  },
  {
    subheader: "Seamless AI-human collaboration",
    items: [
      {
        title: "Call queuing",
        description:
          "Let AI handle sudden call surges and multiple conversations simultaneously, drastically reducing wait times.",
        icon: <Icons.CallQueuing />,
      },
      {
        title: "Call transfer",
        description:
          "Transfer to specific agents, teams, or queues with blind or assisted options for optimal call routing.",
        icon: <Icons.CallTransfer />,
      },
      {
        title: "Call summaries & notes",
        description:
          "Agents can add structured summaries & notes to customer interactions for improved collaboration.",
        icon: <Icons.CallSummaries />,
      },
      {
        title: "Supervisor coaching",
        description:
          "Provide discreet coaching to agents during live calls, improving service quality and conversation outcomes.",
        icon: <Icons.SupervisorCoaching />,
      },
    ],
  },
  {
    subheader: "Real-time analytics",
    items: [
      {
        title: "Advanced engagement analytics",
        description:
          "Leverage real-time insights on call performance, customer behavior, and team efficiency for data-driven decisions.",
        icon: <Icons.Analytics />,
      },
      {
        title: "Call recording & monitoring",
        description:
          "Monitor and analyze calls to track team performance, ensure compliance, and continuously improve service quality.",
        icon: <Icons.Recording />,
      },
    ],
  },
];

export default function EngagementPlatform() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
            Next-gen engagement platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A complete platform to build, monitor, and optimize your voice AI
            operations. Everything you need in one place.
          </p>
        </div>

        {/* Feature Sections - Single unified bordered box */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {featureSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Subheader Row */}
              <div className={`px-6 py-4 border-b border-gray-200 ${sectionIndex !== 0 ? "border-t border-gray-200" : ""}`}>
                <h3 className="text-lg font-semibold text-black">
                  {section.subheader}
                </h3>
              </div>

              {/* Feature Cards Grid */}
              <div
                className={`grid ${
                  section.items.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`p-5 ${
                      itemIndex !== 0 ? "sm:border-l border-gray-200" : ""
                    } ${
                      itemIndex >= 1 ? "max-sm:border-t border-gray-200" : ""
                    } ${
                      section.items.length === 4 && itemIndex >= 2
                        ? "max-lg:border-t max-lg:border-l-0" : ""
                    }`}
                  >
                    <span className="text-[#323dfe] mb-3 block">{item.icon}</span>
                    <h4 className="text-sm font-semibold text-black mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
