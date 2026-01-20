"use client";

import { Button } from "@/components/ui/button";

import { GridBackground } from "../ui/grid-background";

const MetafiHero = () => {
  return (
    <section
      id="metafi-hero"
      className="bg-background border-b-border relative overflow-hidden border-b px-6 lg:px-0"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-[530px] md:h-[686px]">
          <img
            src="/images/homepage/hero/Gradient.webp"
            alt="background gradient"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="eager"
            decoding="async"
          />
          <GridBackground className="[background-size:calc(var(--square-size,64px))_calc(var(--square-size,64px))]" />

          <div className="from-background to-background/0 absolute inset-x-0 top-0 h-40 bg-gradient-to-b" />
        </div>
      </div>

      <div className="container relative px-0 md:px-6">
        <div className="mx-auto grid max-w-4xl gap-6 py-14 text-center sm:py-16 md:gap-8 md:pb-20 md:pt-24">
          <h1 className="text-foreground text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-[68px]">
            Simplifying Payments for Growing Business
          </h1>

          <p className="text-muted-foreground md:text-md mx-auto max-w-2xl text-base sm:text-lg">
            Streamlining transactions for expanding enterprises. Our solutions
            simplify payment processes, empowering businesses to focus on growth
            and innovation.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            <Button
              aria-label="Get started"
              variant="default"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="/pricing">Get Started</a>
            </Button>

            <Button
              aria-label="Contact us"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[994px] items-center justify-center rounded-t-[16px] bg-white/20 shadow-[0_15px_80px_-1px_rgba(8,9,10,0.04)] backdrop-blur-[20px]">
          <img
            src="/images/homepage/hero/Dashboard.webp"
            alt="Metafi dashboard preview"
            width={994}
            height={707}
            sizes="(max-width: 1024px) 100vw, 994px"
            className="h-auto w-full rounded-t-[16px] object-cover object-top"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default MetafiHero;
