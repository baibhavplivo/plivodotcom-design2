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
  LowestLatency: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    title: "Lowest latency in the industry",
    description:
      "Sub-500ms call latency with regional Points of Presence (PoPs) across five continents for crystal-clear WhatsApp voice.",
    icon: <Icons.LowestLatency />,
  },
  {
    title: "Built-in compliance",
    description:
      "Pre-configured controls for GDPR, HIPAA, PCI DSS, ISO 27001, and SOC 2 compliance.",
    icon: <Icons.Compliance />,
  },
];

export default function WhatsAppEngagementPlatform() {
  const allFeatures = [...topFeatures, ...bottomFeatures];
  const metaTags = ["onboarding", "global", "flexible", "meta assist", "low latency", "compliant"];
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
          <span>{allFeatures.length} advantages</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Plivo: Your unbeatable WhatsApp advantage
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              From rapid setup to guaranteed compliance, we eliminate barriers to your WhatsApp success. Our unmatched reliability, speed, and expertise put you ahead.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {allFeatures.map((feature, index) => {
              const lgCol = index % 3;
              const lgRow = Math.floor(index / 3);
              const smCol = index % 2;
              const smRow = Math.floor(index / 2);
              return (
                <div
                  key={index}
                  className={[
                    "group relative flex flex-col gap-3 p-6 sm:p-8 transition-colors hover:bg-background border-t border-border",
                    index === 0 ? "border-t-0" : "",
                    "sm:border-t-0",
                    smRow > 0 ? "sm:border-t sm:border-border" : "",
                    smCol === 0 ? "sm:border-r sm:border-border" : "",
                    "lg:border-t-0 lg:border-r-0",
                    lgRow > 0 ? "lg:border-t lg:border-border" : "",
                    lgCol < 2 ? "lg:border-r lg:border-border" : "",
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
                className="h-10 sm:h-12 w-10 sm:w-12 object-contain opacity-60 dark:invert"
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
