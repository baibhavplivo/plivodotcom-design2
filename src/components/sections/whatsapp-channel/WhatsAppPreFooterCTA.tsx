import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function WhatsAppPreFooterCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      {/* Flickering Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={4}
          gridGap={6}
          color="rgb(139, 92, 246)"
          maxOpacity={0.225}
          flickerChance={0.1}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
          Launch your WhatsApp AI agents today
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 mt-3">
          Deploy intelligent, conversational WhatsApp agents that convert prospects, engage customers, and deliver instant support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="/contact/sales"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-black transition-colors hover:bg-gray-50"
          >
            Talk to Sales
          </a>
          <a
            href="https://console.plivo.com/accounts/register/"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
          >
            Request Trial
          </a>
        </div>
      </div>
    </section>
  );
}
