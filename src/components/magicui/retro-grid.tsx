"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export function RetroGrid({ className, angle = 65 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 -top-[100px] [transform:rotateX(var(--grid-angle))]">
        <div
          className="[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]"
          style={{
            animation: "grid 20s linear infinite",
            backgroundImage: "linear-gradient(to right, rgba(205,62,249,0.4) 1px, transparent 0), linear-gradient(to bottom, rgba(50,61,254,0.4) 1px, transparent 0)",
          }}
        />
      </div>

      {/* Keyframes for grid animation */}
      <style>{`
        @keyframes grid {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Background Gradient - fade to white at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 via-20% to-transparent" />
    </div>
  );
}
