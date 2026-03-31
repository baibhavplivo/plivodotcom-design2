interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Create your agent",
    description:
      "Use our no-code builder to design your voice agent in minutes.",
  },
  {
    number: "2",
    title: "Connect your systems",
    description:
      "Integrate with your CRM, helpdesk, or custom APIs.",
  },
  {
    number: "3",
    title: "Deploy & scale",
    description:
      "Go live with one click. Handle thousands of concurrent calls.",
  },
];

export default function GettingStartedSteps() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Get up and running in no time
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          From sign-up to your first call in under 10 minutes.
        </p>

        {/* Two Column Layout - Compact Steps on Left, Large Video on Right */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] lg:gap-8 items-center mb-10 md:mb-12">
          {/* Left - Compact Steps List */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-3 p-3 sm:p-4"
              >
                {/* Step Number with Dotted Line */}
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base border-2 border-gray-300 text-gray-700 bg-white">
                    {step.number}
                  </div>
                  {/* Dotted line connector (not on last step) */}
                  {index < steps.length - 1 && (
                    <div className="w-px h-8 sm:h-10 border-l-2 border-dashed border-gray-300 mt-2" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <h3 className="text-sm sm:text-base font-semibold mb-0.5 text-black">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="pt-3 pl-3 sm:pl-4">
              <a
                href="https://cx.plivo.com/pungis2"
                className="inline-flex items-center justify-center rounded-md bg-black px-5 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors cta-hover-gradient"
              >
                Start building for free
              </a>
            </div>
          </div>

          {/* Right - Large Video Player */}
          <div className="order-first lg:order-last">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
              {/* Vimeo Embed */}
              <iframe
                src="https://player.vimeo.com/video/1135279848?h=c7f952c829&autoplay=0&loop=1&title=0&byline=0&portrait=0"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Plivo Voice AI Demo"
              />

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#323dfe]/20 to-[#cd3ef9]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#cd3ef9]/20 to-[#323dfe]/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
