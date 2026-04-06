// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const DOCS_SITEMAP_URL = "https://www.plivo.com/docs/sitemap.xml";
const EXCLUDED_SITEMAP_PATHS = new Set(["/cms/", "/design-system/"]);
const EXCLUDED_SITEMAP_PREFIXES = [
  "/draft/",
  "/dev-pages/",
  "/dev-pages-and-components/",
  "/bb-trial-",
  "/home-old-",
  "/pricing-old/",
];

// https://astro.build/config
export default defineConfig({
  site: "https://www.plivo.com",
  integrations: [
    mdx(),
    sitemap({
      customSitemaps: [DOCS_SITEMAP_URL],
      filter(page) {
        const path = new URL(page).pathname;
        if (EXCLUDED_SITEMAP_PATHS.has(path)) return false;
        if (EXCLUDED_SITEMAP_PREFIXES.some((prefix) => path.startsWith(prefix))) return false;
        return true;
      },
    }),
    react(),
  ],
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
