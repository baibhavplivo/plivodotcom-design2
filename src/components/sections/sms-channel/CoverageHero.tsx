"use client";

import Globe from "@/components/ui/globe";

export default function CoverageHero() {
  return (
    <section className="bg-white py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-6">
              Guaranteed Global SMS Delivery
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Reach your customers across any country in the world with reliable,
              high-quality SMS delivery powered by direct carrier connections.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">
                  220+
                </div>
                <div className="text-gray-600 text-sm mt-1">Countries Covered</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">
                  900+
                </div>
                <div className="text-gray-600 text-sm mt-1">Networks Supported</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://cx.plivo.com/pungis2"
                className="inline-flex items-center justify-center rounded-md bg-black text-white px-6 py-3 text-sm font-medium cta-hover-gradient transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 text-black px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Right - Globe */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Cropped frame container */}
            <div className="relative w-full max-w-[600px] h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden">
              {/* Globe container - positioned to show upper portion */}
              <div className="absolute -top-[100px] left-1/2 -translate-x-1/2">
                {/* Gradient glow behind globe */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{
                    background: "radial-gradient(circle, rgba(205, 62, 249, 0.4) 0%, rgba(50, 61, 254, 0.4) 50%, transparent 70%)"
                  }}
                />
                <Globe
                  size={800}
                  baseColor={[0.95, 0.95, 0.97]}
                  glowColor={[0.9, 0.9, 0.95]}
                  markerColor={[0.8, 0.24, 0.98]}
                  opacity={0.5}
                  interactive={true}
                />
              </div>
              {/* Bottom fade overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, white 0%, white 20%, transparent 100%)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
