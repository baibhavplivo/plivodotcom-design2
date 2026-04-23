interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Icon components matching the screenshot style
const Icons = {
  CustomerData: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  Automation: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  NoCode: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  Integrations: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
};

const topFeatures: Feature[] = [
  {
    title: "Customer data & segmentation",
    description:
      "Unify customer data across touchpoints and create advanced segments based on behavior, purchase history, and engagement patterns.",
    icon: <Icons.CustomerData />,
  },
  {
    title: "Intelligent automation & journeys",
    description:
      "Build automated SMS workflows with event-based triggers and launch timely campaigns based on customer actions and lifecycle stages.",
    icon: <Icons.Automation />,
  },
  {
    title: "Engagement & performance analytics",
    description:
      "Optimize campaigns by testing different messages, tracking open rates, click-through rates, and conversion performance.",
    icon: <Icons.Analytics />,
  },
];

const bottomFeatures: Feature[] = [
  {
    title: "No-code agent studio",
    description:
      "Easily create automated customer journeys and messaging flows - no coding required.",
    icon: <Icons.NoCode />,
  },
  {
    title: "Seamless integrations",
    description:
      "Connect with Shopify, WooCommerce, Salesforce, HubSpot, Zoho to sync customer data effortlessly.",
    icon: <Icons.Integrations />,
  },
];

export default function SMSEngagementPlatform() {
  const allFeatures = [...topFeatures, ...bottomFeatures];
  const metaTags = ["data", "automation", "analytics", "no-code", "integrations"];
  return (
    <section className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>engagement platform</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>{allFeatures.length} capabilities</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Customer engagement suite for AI-powered campaigns
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Empower both AI and human agents with tools to create, automate, and optimize personalized marketing campaigns that drive engagement and conversions at scale.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-border">
            {allFeatures.map((feature, index) => {
              const cols = 3; // lg cols; sm is 2
              const lgCol = index % 3;
              const lgRow = Math.floor(index / 3);
              const smCol = index % 2;
              const smRow = Math.floor(index / 2);
              return (
                <div
                  key={index}
                  className={[
                    "group relative flex flex-col gap-3 p-6 sm:p-8 transition-colors hover:bg-background",
                    // lg vertical dividers
                    lgCol < 2 ? "lg:border-r lg:border-border" : "",
                    lgRow > 0 ? "lg:border-t lg:border-border" : "",
                    // sm dividers
                    smCol === 0 ? "sm:border-r sm:border-border" : "",
                    smRow > 0 ? "sm:border-t sm:border-border" : "",
                    // reset sm when lg kicks in
                    "sm:max-lg:border-r-0 sm:max-lg:border-t-0",
                  ].filter(Boolean).join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:text-primary [&_svg]:h-5 [&_svg]:w-5">
                      {feature.icon}
                    </div>
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {metaTags[index]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sora text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <span className="font-mono-ui mt-auto text-[10px] text-muted-foreground/60">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
