// FooterCTA.tsx - Footer CTA section (dark theme matching hero)

export default function FooterCTA() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, #131340 0%, #0a0a1a 60%)",
      }}
    >
      {/* Motif top border */}
      <div
        className="absolute top-0 left-0 right-0 z-10 h-[56px] bg-repeat-x opacity-50"
        style={{
          backgroundImage: "url(/images/build-for-bharat/motif.svg)",
          backgroundSize: "auto 56px",
        }}
      />

      {/* Subtle light glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(100,120,255,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Motif bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-[56px] bg-repeat-x opacity-50"
        style={{
          backgroundImage: "url(/images/build-for-bharat/motif.svg)",
          backgroundSize: "auto 56px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-white">
          Start building your AI agent now
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-400 mt-4">
          No coding required. Get your agents up and running in under 30
          minutes.
        </p>
        <a
          href="https://console.plivo.com/accounts/register/"
          className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 mt-8"
        >
          Sign Up Now
        </a>
      </div>
    </section>
  );
}
