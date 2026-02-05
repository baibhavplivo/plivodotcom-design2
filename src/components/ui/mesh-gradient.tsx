"use client";

import { cn } from "@/lib/utils";

interface MeshGradientProps {
  className?: string;
  variant?: "default" | "purple" | "blue" | "cyan" | "dark" | "darkPurple" | "darkBlue" | "darkCyan";
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
}

export default function MeshGradient({
  className,
  variant = "default",
  blur = "xl",
  opacity = 1,
}: MeshGradientProps) {
  const blurClasses = {
    sm: "blur-[40px]",
    md: "blur-[60px]",
    lg: "blur-[80px]",
    xl: "blur-[100px]",
  };

  const variantColors = {
    // Light variants
    default: {
      fuchsia300: "bg-fuchsia-300",
      fuchsia400: "bg-fuchsia-400",
      cyan300: "bg-cyan-300",
      blue400: "bg-blue-400",
    },
    purple: {
      fuchsia300: "bg-purple-300",
      fuchsia400: "bg-purple-400",
      cyan300: "bg-violet-300",
      blue400: "bg-indigo-400",
    },
    blue: {
      fuchsia300: "bg-blue-300",
      fuchsia400: "bg-blue-400",
      cyan300: "bg-sky-300",
      blue400: "bg-indigo-400",
    },
    cyan: {
      fuchsia300: "bg-cyan-300",
      fuchsia400: "bg-teal-400",
      cyan300: "bg-emerald-300",
      blue400: "bg-cyan-400",
    },
    // Dark variants
    dark: {
      fuchsia300: "bg-fuchsia-600",
      fuchsia400: "bg-fuchsia-700",
      cyan300: "bg-cyan-600",
      blue400: "bg-blue-700",
    },
    darkPurple: {
      fuchsia300: "bg-purple-600",
      fuchsia400: "bg-purple-700",
      cyan300: "bg-violet-600",
      blue400: "bg-indigo-700",
    },
    darkBlue: {
      fuchsia300: "bg-blue-600",
      fuchsia400: "bg-blue-700",
      cyan300: "bg-sky-600",
      blue400: "bg-indigo-700",
    },
    darkCyan: {
      fuchsia300: "bg-cyan-600",
      fuchsia400: "bg-teal-700",
      cyan300: "bg-emerald-600",
      blue400: "bg-cyan-700",
    },
  };

  const colors = variantColors[variant];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
      style={{ opacity }}
    >
      <div className={cn("absolute inset-0", blurClasses[blur])}>
        {/* Layer 1 */}
        <div
          className={cn(
            "absolute w-[50%] h-[55%] left-[-12%] top-[14%] origin-top-left rotate-[-23deg]",
            colors.fuchsia300
          )}
        />
        <div
          className={cn(
            "absolute w-[38%] h-[50%] left-[43%] top-[-13%]",
            colors.fuchsia400
          )}
        />
        <div
          className={cn(
            "absolute w-[42%] h-[55%] left-[5%] top-[34%]",
            colors.fuchsia400
          )}
        />
        <div
          className={cn(
            "absolute w-[42%] h-[55%] left-[60%] top-[10%] origin-top-left rotate-[59deg]",
            colors.cyan300
          )}
        />
        <div
          className={cn(
            "absolute w-[42%] h-[55%] left-[35%] top-[-22%] origin-top-left rotate-[59deg]",
            colors.blue400
          )}
        />

        {/* Layer 2 - Duplicate for richness */}
        <div
          className={cn(
            "absolute w-[50%] h-[55%] left-[-12%] top-[14%] origin-top-left rotate-[-23deg]",
            colors.fuchsia300
          )}
        />
        <div
          className={cn(
            "absolute w-[50%] h-[70%] left-[57%] top-[-18%]",
            colors.fuchsia400
          )}
        />
        <div
          className={cn(
            "absolute w-[42%] h-[55%] left-[5%] top-[34%]",
            colors.fuchsia400
          )}
        />
        <div
          className={cn(
            "absolute w-[62%] h-[85%] left-[80%] top-[6%] origin-top-left rotate-[59deg]",
            colors.cyan300
          )}
        />
        <div
          className={cn(
            "absolute w-[42%] h-[55%] left-[35%] top-[-22%] origin-top-left rotate-[59deg]",
            colors.blue400
          )}
        />
      </div>
    </div>
  );
}
