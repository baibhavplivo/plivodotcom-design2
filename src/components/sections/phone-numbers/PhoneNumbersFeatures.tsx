"use client";

interface Feature {
  title: string;
  description: string;
  meta: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Seamless activation",
    description: "Instant activation with API-based address and identity verification.",
    meta: "instant",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Assured numbers",
    description: "Only clean, verified numbers with a cool-off period to prevent unwanted calls.",
    meta: "verified",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "High-quality standards",
    description: "Handpicked processes for optimal customer experience and minimal call failures.",
    meta: "quality",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Broad coverage",
    description: "Access local, mobile, national, and toll-free numbers across 50+ countries.",
    meta: "50+ countries",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Search",
    description: "Find number ranges or prefixes across 120+ countries by capability and region.",
    meta: "120+ countries",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Purchase",
    description: "Frictionless purchase and instant activation via API at account or subaccount level.",
    meta: "api · subaccount",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    title: "Verification",
    description: "Verify addresses and identity documents in a single API call.",
    meta: "single call",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
  },
  {
    title: "Number porting",
    description: "Port existing numbers to Plivo - our team handles the entire process.",
    meta: "fully managed",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
];

export default function PhoneNumbersFeatures() {
  return (
    <section className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        {/* Kicker */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>features</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>{features.length} capabilities</span>
        </div>

        {/* Heading + subhead block — same scale as homepage */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Powerful features out of the box
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Search for, buy, and activate phone numbers instantly to give your business a local presence.
            </p>
          </div>
        </div>

        {/* Feature grid — hairline cells, mono meta tags */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-border">
            {features.map((feature, index) => {
              const col = index % 4;
              const row = Math.floor(index / 4);
              return (
                <div
                  key={index}
                  className={[
                    "group relative flex flex-col gap-3 p-5 sm:p-6 transition-colors hover:bg-background",
                    // lg (4-col) vertical dividers on 0,1,2 col
                    col < 3 ? "lg:border-r lg:border-border" : "",
                    // lg horizontal divider between row 0 and row 1
                    row > 0 ? "lg:border-t lg:border-border" : "",
                    // sm (2-col) vertical divider on col 0
                    col % 2 === 0 ? "sm:border-r sm:border-border" : "",
                    // sm horizontal dividers for rows 1,2,3
                    row > 0 && (col % 2 === 0) ? "sm:border-t sm:border-border" : "",
                    row > 0 && (col % 2 === 1) ? "sm:border-t sm:border-border" : "",
                  ].filter(Boolean).join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:text-primary">
                      {feature.icon}
                    </div>
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {feature.meta}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sora text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
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
