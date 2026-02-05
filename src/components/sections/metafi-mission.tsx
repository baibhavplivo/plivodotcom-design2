"use client";

type MetafiMissionProps = {
  overline?: string;
  primary?: string;
  secondary?: string;
  showDivider?: boolean;
};

export default function MetafiMission({
  overline = "Our Mission",
  primary = `At Metafi, we’re building the place to pay for today’s businesses.`,
  secondary = `Our mission is to build the first premium payment platform for everyone.`,
  showDivider = true,
}: MetafiMissionProps) {
  return (
    <section id="metafi-mission" className="bg-background px-6 lg:px-0">
      <div className="container px-0 py-12 sm:py-16 md:px-6 md:py-20">
        <p className="text-tagline text-sm sm:text-base">{overline}</p>

        <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[56px]">
          <span>{primary} </span>
          <span className="text-muted-foreground">{secondary}</span>
        </h2>

        {showDivider && (
          <div className="mt-10 h-px w-full border-t border-border/60" />
        )}
      </div>
    </section>
  );
}
