"use client";

// Illustration: Fraud Shield - Clean dashboard style
function FraudShieldIllustration() {
  const verificationRequests = [
    { number: "+1 (202) 555-0147", country: "US", status: "verified" },
    { number: "+44 (20) 7946-0958", country: "UK", status: "verified" },
    { number: "+263 (77) 456-7890", country: "ZW", status: "blocked" },
    { number: "+91 (98) 7654-3210", country: "IN", status: "verified" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-[#323dfe]/5 to-black/10 overflow-hidden p-4 sm:p-6">
      {/* Main Card */}
      <div className="bg-background rounded-xl border border-border h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="url(#shieldGradient)">
                <defs>
                  <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#323dfe" />
                    <stop offset="100%" stopColor="#323dfe" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Fraud Shield</p>
              <p className="text-xs text-muted-foreground">AI-powered protection</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-300">Active</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="px-5 py-4 border-b border-border grid grid-cols-3">
          <div className="text-center">
            <p className="text-2xl font-semibold text-foreground">847</p>
            <p className="text-[10px] text-muted-foreground font-mono-ui uppercase tracking-[0.1em] mt-0.5">Verified</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-2xl font-semibold text-foreground">23</p>
            <p className="text-[10px] text-muted-foreground font-mono-ui uppercase tracking-[0.1em] mt-0.5">Blocked</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-foreground">$0</p>
            <p className="text-[10px] text-muted-foreground font-mono-ui uppercase tracking-[0.1em] mt-0.5">Fraud Cost</p>
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 px-4 py-3 overflow-hidden">
          <p className="text-[10px] font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em] mb-2">Recent Activity</p>
          <div className="space-y-1">
            {verificationRequests.map((req, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-surface"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                    {req.status === 'verified' ? (
                      <svg className="w-3 h-3 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-foreground">{req.number}</p>
                    <p className="text-[9px] text-muted-foreground">{req.country}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                  req.status === 'verified'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300'
                    : 'bg-red-50 dark:bg-red-900/30 text-red-500'
                }`}>
                  {req.status === 'verified' ? 'Verified' : 'Blocked'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Cost comparison - Clean modern design
function CostComparisonIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-[#323dfe]/5 to-black/10 overflow-hidden p-4 sm:p-6">
      {/* Single unified comparison card */}
      <div className="bg-background rounded-xl border border-border h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Cost Comparison</p>
          <p className="text-xs text-muted-foreground">100K verifications/month</p>
        </div>

        {/* Comparison content */}
        <div className="flex-1 p-5 flex flex-col justify-center">
          {/* Other Platforms */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground font-mono-ui uppercase tracking-[0.1em]">Others</span>
              <span className="text-xl font-semibold text-muted-foreground">$23,050</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-full bg-gray-300 rounded-full" />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] text-muted-foreground">SMS $3,050</span>
              <span className="text-[10px] text-muted-foreground">OTP $5,000</span>
              <span className="text-[10px] text-muted-foreground">Fraud $15,000</span>
            </div>
          </div>

          {/* Plivo */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-primary font-mono-ui uppercase tracking-[0.1em]">Plivo</span>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-black dark:to-white bg-clip-text text-transparent">$2,760</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[12%] bg-gradient-to-r from-primary to-black rounded-full" />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] text-muted-foreground">SMS $2,760</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-medium">OTP Free</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-medium">Fraud Free</span>
            </div>
          </div>
        </div>

        {/* Footer - Savings highlight */}
        <div className="px-5 py-4 bg-surface border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Annual Savings</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">$243,480</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">88% less</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyAlternatingFeatures() {
  return (
    <section className="bg-background border-t border-border py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Feature 1: Fraud Shield - Asset Left, Content Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Left - Illustration */}
          <div className="order-2 lg:order-1">
            <FraudShieldIllustration />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>alternating features</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.2] tracking-[-0.035em] text-foreground mb-4">
              Prevent SMS pumping from eroding your budget
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Plivo Fraud Shield is an AI-driven model that automatically detects and blocks fraudulent messages. Set up your SMS Pumping Fraud Protection with a simple 1-click setup.
            </p>
          </div>
        </div>

        {/* Feature 2: Lowest Cost - Content Left, Asset Right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="order-1">
            <span className="inline-block bg-gradient-to-r from-primary to-black dark:to-white bg-clip-text text-transparent text-sm font-medium mb-3">
              No Hidden Charges
            </span>
            <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>alternating features</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.2] tracking-[-0.035em] text-foreground mb-4">
              Plivo offers the lowest cost per verification
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Zero charges for both Fraud Shield and OTP verification services. Only pay SMS, Voice, or WhatsApp charges.
            </p>
          </div>

          {/* Right - Illustration */}
          <div className="order-2">
            <CostComparisonIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
