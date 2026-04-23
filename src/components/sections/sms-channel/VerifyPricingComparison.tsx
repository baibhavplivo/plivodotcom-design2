"use client";

const pricingHighlights = [
  {
    title: "Only pay to verify REAL users",
    description: "No charges for fraudulent or failed verification attempts.",
  },
  {
    title: "$0 Verification fee",
    description: "Only pay for SMS, Voice, or WhatsApp channel charges.",
  },
  {
    title: "$0 for Plivo Fraud Shield",
    description: "AI-driven fraud prevention included at no extra cost.",
  },
];

const countryRates = [
  {
    country: "United States",
    sms: "$0.0077/sms",
    voice: "$0.0115/min",
    whatsapp: "$0.0143/conversation",
  },
  {
    country: "Canada",
    sms: "$0.0077/sms",
    voice: "$0.0120/min",
    whatsapp: "$0.0143/conversation",
  },
  {
    country: "India",
    sms: "₹0.0800/sms",
    voice: "₹0.0093/min",
    whatsapp: "₹0.0022/conversation",
  },
  {
    country: "Australia",
    sms: "$0.0451/sms",
    voice: "$0.0230/min",
    whatsapp: "$0.0433/conversation",
  },
];

export default function VerifyPricingComparison() {
  return (
    <section className="bg-surface border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>pricing comparison</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
            No hidden charges
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            Plivo offers the lowest cost per verification. Zero charges for both Fraud Shield and OTP verification services.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Pricing highlights */}
          <div className="space-y-4">
            {pricingHighlights.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing comparison card */}
          <div className="bg-background rounded-xl p-6 sm:p-8 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Cost comparison: 100,000 SMS in US</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-center gap-3">
                  <img src="/images/plivo-logo.svg" alt="Plivo" className="h-5" />
                  <span className="font-medium text-foreground">Plivo</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-black dark:to-white bg-clip-text text-transparent">$530</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground">Other Platforms</span>
                <span className="text-xl font-bold text-muted-foreground line-through">$5,720</span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Your savings with Plivo</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-black dark:to-white bg-clip-text text-transparent">$5,190</span>
                    <span className="block text-sm bg-gradient-to-r from-primary to-black dark:to-white bg-clip-text text-transparent font-medium">91% reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing table */}
        <div className="mt-10 md:mt-12 overflow-x-auto">
          <table className="w-full bg-background rounded-xl overflow-hidden border border-border">
            <thead>
              <tr className="bg-surface">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Country</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">SMS Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Voice Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">WhatsApp Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {countryRates.map((rate, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{rate.country}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{rate.sms}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{rate.voice}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{rate.whatsapp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
