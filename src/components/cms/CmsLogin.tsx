import { useRef, useEffect, useState, useCallback } from "react";
import { login } from "./cms-api";

// Turnstile site key — replace with your actual key from Cloudflare Dashboard
const TURNSTILE_SITE_KEY = "0x4AAAAAAC5MIQRQhUfMm71t";

interface CmsLoginProps {
  onSuccess: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function CmsLogin({ onSuccess }: CmsLoginProps) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileTokenRef = useRef<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetTurnstile = useCallback(() => {
    turnstileTokenRef.current = null;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  // Load Turnstile script and render widget
  useEffect(() => {
    const container = turnstileRef.current;
    if (!container) return;

    function renderWidget() {
      if (!window.turnstile || !container) return;
      if (widgetIdRef.current) return; // already rendered
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          turnstileTokenRef.current = token;
        },
        "error-callback": () => {
          turnstileTokenRef.current = null;
        },
        "expired-callback": () => {
          turnstileTokenRef.current = null;
        },
        theme: "light",
        size: "normal",
      });
    }

    // If script already loaded
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => renderWidget();
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  // Login handler
  useEffect(() => {
    const input = passwordRef.current;
    const button = buttonRef.current;
    if (!input || !button) return;

    const handleSubmit = async () => {
      const password = input.value.trim();
      if (!password) {
        setError("Please enter a password");
        return;
      }

      const turnstileToken = turnstileTokenRef.current;
      if (!turnstileToken) {
        setError("Please complete the CAPTCHA verification");
        return;
      }

      setLoading(true);
      setError("");

      try {
        await login(password, turnstileToken);
        onSuccess();
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Invalid password";
        setError(msg);
        setLoading(false);
        resetTurnstile();
      }
    };

    const handleClick = () => handleSubmit();
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    };

    button.addEventListener("click", handleClick);
    input.addEventListener("keydown", handleKeydown);

    return () => {
      button.removeEventListener("click", handleClick);
      input.removeEventListener("keydown", handleKeydown);
    };
  }, [onSuccess, resetTurnstile]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-border bg-background p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-2 font-sora text-2xl font-semibold text-foreground">
              Plivo
            </div>
            <p className="text-sm text-muted-foreground">Blog Content Management</p>
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label
              htmlFor="cms-password"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="cms-password"
              type="password"
              autoFocus
              placeholder="Enter CMS password"
              className="w-full rounded-md border border-border-strong bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors hover:border-border-strong focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Turnstile CAPTCHA */}
          <div className="mb-4 flex justify-center">
            <div ref={turnstileRef} />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          {/* Submit button */}
          <button
            ref={buttonRef}
            disabled={loading}
            className="w-full rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors cta-hover-gradient disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Access CMS"}
          </button>
        </div>
      </div>
    </div>
  );
}
