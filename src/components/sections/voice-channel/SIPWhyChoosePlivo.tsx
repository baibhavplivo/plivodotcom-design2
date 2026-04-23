interface Reason {
  title: string;
  description: string;
  meta: string;
  icon: React.ReactNode;
}

const reasons: Reason[] = [
  {
    title: "Proven quality and scale",
    description:
      "With over a billion API requests every month, our globally distributed direct to carrier network and intelligent routing ensures highest SMS delivery and lowest latency for your calls.",
    meta: "1B+ req / mo",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Enterprise grade platform",
    description:
      "Engineered for high availability, extreme reliability and 99.95% uptime SLA. Privacy Shield and GDPR Compliance means any business can trust Plivo with data privacy and security.",
    meta: "99.95% sla",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "A team that truly cares about your success",
    description:
      "Our 24x7 premium support and a consultative customer success team, provide you with all the technical guidance and industry expertise you need, when you need it.",
    meta: "24×7 support",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Lower cost of ownership",
    description:
      "Receive discounted pricing from the start with simple usage based pricing where you only pay for what you use. Avail additional discounts with committed usage as you scale.",
    meta: "pay as you go",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function SIPWhyChoosePlivo() {
  return (
    <section className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>why choose plivo</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>{reasons.length} reasons</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Top reasons why businesses choose Plivo
            </h2>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-border">
            {reasons.map((reason, index) => {
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
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:text-primary">
                      {reason.icon}
                    </div>
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {reason.meta}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sora text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
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
