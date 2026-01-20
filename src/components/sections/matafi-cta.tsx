import { Button } from "@/components/ui/button";

const MetafiCta = () => {
  return (
    <section
      id="metafi-cta"
      className="bg-tagline relative overflow-hidden px-6"
    >
      {/* dotted pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 [color:oklch(1_0_89.88)]" />

      {/* centered rectangle behind text */}
      <div className="bg-tagline pointer-events-none absolute left-1/2 top-0 h-full w-[500px] -translate-x-1/2" />

      <div className="container relative px-0 py-16 text-center sm:py-20 md:px-6 md:py-28">
        <h2 className="text-primary-foreground mx-auto max-w-5xl text-balance text-4xl font-medium leading-tight sm:text-5xl md:text-6xl">
          Simplifying Payments
          <br className="hidden sm:block" /> for Growing Business
        </h2>

        <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl text-base font-normal sm:text-lg">
          Join over 300+ partners and customers already growing with Metafi
        </p>

        <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
          {/* Primary button */}
          <Button
            asChild
            className="bg-primary-foreground text-tagline hover:bg-primary-foreground/90 h-12 w-full rounded-[12px] sm:w-auto"
          >
            <a href="/pricing">Get Started</a>
          </Button>

          {/* Transparent button */}
          <Button
            asChild
            variant="ghost"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 w-full rounded-[12px] border bg-transparent sm:w-auto"
          >
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MetafiCta;
