/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2.5rem",
      },
    },
    extend: {
      colors: {
        // Plivo Brand Colors
        plivo: {
          purple: "#cd3ef9",
          blue: "#323dfe",
          "purple-dark": "#a835cc",
          "blue-dark": "#2830cc",
        },
        // Background Colors
        background: {
          DEFAULT: "#ffffff",
          dark: "rgb(15, 17, 23)",
          darker: "rgb(0, 0, 0)",
        },
        // Text Colors
        foreground: {
          DEFAULT: "rgb(15, 17, 23)",
          muted: "rgb(107, 114, 128)",
          light: "#ffffff",
        },
        // Accent Colors
        accent: {
          teal: "rgb(17, 120, 102)",
          green: "#22c55e",
        },
        // Border Colors
        border: {
          DEFAULT: "#e5e7eb",
          dark: "#202020",
          muted: "rgba(255, 255, 255, 0.1)",
        },
        // UI Colors (shadcn compatible)
        card: {
          DEFAULT: "#ffffff",
          foreground: "rgb(15, 17, 23)",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "rgb(15, 17, 23)",
        },
        primary: {
          DEFAULT: "#cd3ef9",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "rgb(243, 244, 246)",
          foreground: "rgb(15, 17, 23)",
        },
        muted: {
          DEFAULT: "rgb(243, 244, 246)",
          foreground: "rgb(107, 114, 128)",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        input: "#e5e7eb",
        ring: "#cd3ef9",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Display sizes
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.75rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": [
          "2.25rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        // Heading sizes
        "heading-xl": ["1.875rem", { lineHeight: "1.3" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.4" }],
        "heading-md": ["1.25rem", { lineHeight: "1.4" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        "container-sm": "768px",
        "container-md": "1024px",
        "container-lg": "1200px",
        "container-xl": "1440px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "card-hover":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        glow: "0 0 40px rgba(205, 62, 249, 0.3)",
        "glow-blue": "0 0 40px rgba(50, 61, 254, 0.3)",
      },
      backgroundImage: {
        "plivo-gradient": "linear-gradient(90deg, #cd3ef9, #323dfe)",
        "plivo-gradient-vertical": "linear-gradient(180deg, #cd3ef9, #323dfe)",
        "plivo-gradient-radial": "radial-gradient(circle, #cd3ef9, #323dfe)",
        "dark-gradient":
          "linear-gradient(180deg, rgb(15, 17, 23) 0%, rgb(0, 0, 0) 100%)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        barberpole: "barberpole 4s linear infinite reverse",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        barberpole: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.45" },
        },
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
