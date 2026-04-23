import { cn } from "@/lib/utils";

/**
 * Editorial section framing used across the homepage.
 * Enforces consistent kicker strip, spacing, and hairline rules.
 *
 *   SectionFrame
 *   ├── SectionKicker       (01 / label                              meta)
 *   └── children            (left-aligned content, full container width)
 */

interface SectionFrameProps {
  id?: string;
  number?: string;          // "01", "02"... optional
  label: string;            // "voice ai", "customers"...
  meta?: React.ReactNode;   // right-rail micro-meta
  /** First section on the page - no top border */
  first?: boolean;
  /** Darker background variant (for final CTA) */
  tone?: "default" | "inverted";
  /** Compact top padding (logos row) */
  tight?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function SectionFrame({
  id,
  number,
  label,
  meta,
  first = false,
  tone = "default",
  tight = false,
  className,
  children,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        !first && "border-t border-border",
        tone === "inverted" && "bg-surface-2 text-foreground",
        className,
      )}
    >
      <div className={cn(
        "container mx-auto max-w-7xl px-4 sm:px-6",
        tight ? "py-10 sm:py-12" : "py-14 sm:py-20 md:py-24",
      )}>
        <SectionKicker number={number} label={label} meta={meta} />
        <div className="mt-8 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

interface SectionKickerProps {
  number?: string;
  label: string;
  meta?: React.ReactNode;
}

export function SectionKicker({ number, label, meta }: SectionKickerProps) {
  return (
    <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {number && (
        <span className="flex items-center gap-2">
          <span className="tabular-nums text-foreground/70">{number}</span>
          <span className="h-px w-6 bg-border" aria-hidden />
        </span>
      )}
      <span>{label}</span>
      {meta && (
        <>
          <span className="flex-1 border-t border-dashed border-border" aria-hidden />
          <span className="text-muted-foreground">{meta}</span>
        </>
      )}
      {!meta && <span className="flex-1 border-t border-dashed border-border" aria-hidden />}
    </div>
  );
}

/**
 * Asymmetric 12-col content frame - headline block left, aside right.
 * Used inside SectionFrame for the canonical section layout.
 */
export function SectionSplit({
  head,
  aside,
  headSpan = 8,
  className,
}: {
  head: React.ReactNode;
  aside?: React.ReactNode;
  /** columns out of 12 for the headline/intro */
  headSpan?: 6 | 7 | 8;
  className?: string;
}) {
  const headCols =
    headSpan === 6 ? "lg:col-span-6" :
    headSpan === 7 ? "lg:col-span-7" : "lg:col-span-8";
  const asideCols =
    headSpan === 6 ? "lg:col-span-6" :
    headSpan === 7 ? "lg:col-span-5" : "lg:col-span-4";

  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className={headCols}>{head}</div>
      {aside && <div className={cn(headCols === "lg:col-span-8" ? "lg:col-span-4" : asideCols, "lg:pt-2")}>{aside}</div>}
    </div>
  );
}

/**
 * H2 headline specimen. Tight tracking, left-aligned default.
 */
export function SectionTitle({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-[1.75rem] sm:text-[2rem] md:text-[2.25rem]",
    md: "text-[2rem] sm:text-[2.5rem] md:text-[3rem]",
    lg: "text-[2.5rem] sm:text-[3rem] md:text-[3.75rem]",
  };
  return (
    <h2 className={cn(
      "font-sora font-normal leading-[1.04] tracking-[-0.035em] text-foreground",
      sizes[size],
      className,
    )}>
      {children}
    </h2>
  );
}

/**
 * Terminal/code chrome used across the page.
 */
export function TerminalFrame({
  title,
  status,
  children,
  className,
}: {
  /** e.g. "POST /v1/agents" */
  title?: string;
  /** e.g. "200 OK" - rendered in accent */
  status?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "overflow-hidden rounded-lg border border-border bg-surface",
      className,
    )}>
      <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        </div>
        {title && <span className="font-mono-ui text-[11px] text-muted-foreground">{title}</span>}
        {status && <span className="font-mono-ui text-[11px] text-primary">{status}</span>}
        {!title && !status && <span />}
      </div>
      <div className="bg-code text-code-foreground">{children}</div>
    </div>
  );
}
