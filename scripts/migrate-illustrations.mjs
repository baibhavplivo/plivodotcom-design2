#!/usr/bin/env node
/**
 * Fix dark-mode legibility issues in hero illustrations and inline styles.
 *
 *   1. `radial-gradient(… transparent X%, white Y%)` → uses theme background
 *   2. `radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)` grid
 *      bg → uses theme border (adapts to both themes)
 *   3. `rgba(255,255,255,0.N)` in linear-gradient → background/alpha tokens
 *
 * Content preserved. Style-only.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const INCLUDE_DIRS = ["src/components/sections", "src/pages"];
const SKIP = new Set(["node_modules", ".git", "dist", ".astro"]);
const EXTS = new Set([".tsx", ".astro", ".jsx"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (EXTS.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

const counts = {};
const changed = [];

const RULES = [
  // Radial gradients with `white` as an inner color — used as vignettes.
  // Replace with the background token so they behave in both themes.
  [
    /radial-gradient\(([^)]*?)\btransparent\b([^)]*?)\bwhite\b([^)]*?)\)/g,
    "radial-gradient($1transparent$2hsl(var(--background))$3)",
    "radial-gradient white vignette",
  ],
  // Dot pattern background: rgba(0,0,0,0.15) → border token (adapts to theme)
  [
    /rgba\(0,\s*0,\s*0,\s*0\.15\)/g,
    "hsl(var(--border))",
    "dot pattern rgba black 0.15",
  ],
  [
    /rgba\(0,\s*0,\s*0,\s*0\.1\)/g,
    "hsl(var(--border))",
    "dot pattern rgba black 0.1",
  ],
  // White alpha in linear gradients (fade overlays) → foreground token
  [
    /rgba\(255,\s*255,\s*255,\s*0\.9\)/g,
    "hsl(var(--background) / 0.9)",
    "rgba white 0.9",
  ],
  [
    /rgba\(255,\s*255,\s*255,\s*0\.8\)/g,
    "hsl(var(--background) / 0.8)",
    "rgba white 0.8",
  ],
  [
    /rgba\(255,\s*255,\s*255,\s*0\.5\)/g,
    "hsl(var(--background) / 0.5)",
    "rgba white 0.5",
  ],
];

async function processFile(file) {
  let src = await fs.readFile(file, "utf8");
  const original = src;
  for (const [re, rep, label] of RULES) {
    const before = src;
    src = src.replace(re, rep);
    if (src !== before) {
      const matches = before.match(re) || [];
      counts[label] = (counts[label] || 0) + matches.length;
    }
  }
  if (src !== original) {
    changed.push({ file: path.relative(ROOT, file) });
    if (apply) await fs.writeFile(file, src);
  }
}

async function main() {
  const files = [];
  for (const rel of INCLUDE_DIRS) {
    files.push(...(await walk(path.join(ROOT, rel))));
  }
  for (const f of files) await processFile(f);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\nScanned ${files.length} · changed ${changed.length} · ${total} replacements\n`);
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(v).padStart(4)}  ${k}`);
  }
  if (!apply) console.log(`\n(dry-run — re-run with --apply)`);
  else console.log(`\n✓ applied to ${changed.length} files`);
}
main();
