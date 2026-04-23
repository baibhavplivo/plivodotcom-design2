import InPageCTA from "@/components/ui/in-page-cta";

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
    title: "IP authentication",
    description:
      "Authenticate and access your SIP trunks using IP authentication or credentials for added security.",
    icon: <Icons.IPAuth />,
  },
  {
    title: "Encrypted trunks",
    description:
      "Secure your trunks with Transport Layer Security (TLS) and Secure Real-Time Transport Protocol (SRTP).",
    icon: <Icons.Encrypted />,
  },
  {
    title: "Fraud protection and alerts",
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
    title: "Self-service portal",
    description:
      "Easily access and manage your account analytics, logs, and SIP trunks.",
    icon: <Icons.Portal />,
  },
  {
    title: "Separated trunks",
    description:
      "Each trunk has a unique SIP domain for easy traffic segmentation and management.",
    icon: <Icons.Separated />,
  },
];

export default function SIPRobustFeatures() {
  const metaTags = ["ip auth", "encrypted", "fraud", "interop", "self-serve", "separated"];
  return (
    <section className="relative w-full bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>robust features</span>
          <span className="flex-1 border-t border-dashed border-border" />
          <span>{features.length} capabilities</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-[2rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2.5rem] md:text-[3rem]">
              Robust feature set for all your business needs
            </h2>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const lgCol = index % 3;
              const lgRow = Math.floor(index / 3);
              const smCol = index % 2;
              const smRow = Math.floor(index / 2);
              return (
                <div
                  key={index}
                  className={[
                    "group relative flex flex-col gap-3 p-5 sm:p-6 transition-colors hover:bg-background border-t border-border",
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
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:text-primary [&_svg]:h-4 [&_svg]:w-4">
                      {feature.icon}
                    </div>
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {metaTags[index]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-sora text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
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

        <div className="mt-12 sm:mt-16">
          <InPageCTA />
        </div>
      </div>
    </section>
  );
}
