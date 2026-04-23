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
  const allFeatures = [...topFeatures, ...bottomFeatures];
  const metaTags = ["soc 2 · hipaa", "95%+ csat", "24 / 7", "pay as you go"];
  return (
    <section className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        {/* Kicker */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>engagement platform</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>{allFeatures.length} pillars</span>
        </div>

        {/* Heading + subhead */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              An enterprise foundation for your AI-powered chat
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Enterprise-grade security, compliance, 99.99% uptime, proven performance, flexible pay-as-you-go pricing, and dedicated support.
            </p>
          </div>
        </div>

        {/* Feature grid — hairline cells, mono meta tags */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-border">
            {allFeatures.map((feature, index) => {
              const col = index % 2;
              const row = Math.floor(index / 2);
              return (
                <div
                  key={index}
                  className={[
                    "group relative flex flex-col gap-3 p-6 sm:p-8 transition-colors hover:bg-background",
                    col === 0 ? "md:border-r md:border-border" : "",
                    row > 0 ? "md:border-t md:border-border" : "",
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
