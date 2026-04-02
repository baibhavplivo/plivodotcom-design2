// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const DOCS_SITEMAP_URL = "https://www.plivo.com/docs/sitemap.xml";
const EXCLUDED_SITEMAP_PATHS = new Set(["/cms/", "/design-system/"]);

// https://astro.build/config
export default defineConfig({
  site: "https://www.plivo.com",
  integrations: [
    mdx(),
    sitemap({
      customSitemaps: [DOCS_SITEMAP_URL],
      filter(page) {
        return !EXCLUDED_SITEMAP_PATHS.has(new URL(page).pathname);
      },
    }),
    react(),
  ],
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
