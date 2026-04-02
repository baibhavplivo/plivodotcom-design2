import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const sitemapIndexPath = resolve(distDir, "sitemap-index.xml");
const sitemapAliasPath = resolve(distDir, "sitemap.xml");

if (!existsSync(sitemapIndexPath)) {
  console.error("Missing dist/sitemap-index.xml; cannot create sitemap.xml alias.");
  process.exit(1);
}

copyFileSync(sitemapIndexPath, sitemapAliasPath);
console.log("Created dist/sitemap.xml alias from dist/sitemap-index.xml");
