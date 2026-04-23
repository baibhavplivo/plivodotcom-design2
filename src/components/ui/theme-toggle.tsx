import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  try {
    localStorage.setItem("plivo-theme", theme);
  } catch {}
}

interface ThemeToggleProps {
  className?: string;
  /** Visual size of the toggle button */
  size?: "sm" | "md";
  /** Extra ARIA label override */
  ariaLabel?: string;
}

export function ThemeToggle({
  className,
  size = "md",
  ariaLabel,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readInitialTheme());
    setMounted(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "plivo-theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setTheme(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const sizeClasses =
    size === "sm" ? "h-8 w-8" : "h-9 w-9";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={ariaLabel ?? `Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        sizeClasses,
        className,
      )}
    >
      {/* Render both icons and cross-fade; avoids layout shift & SSR hydration mismatch */}
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-200",
          mounted && theme === "dark"
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100",
        )}
        strokeWidth={1.75}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-200",
          mounted && theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0",
        )}
        strokeWidth={1.75}
      />
    </button>
  );
}

export default ThemeToggle;
