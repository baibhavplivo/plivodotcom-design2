#!/usr/bin/env node
/**
 * Site-wide Tailwind class migration to semantic theme tokens.
 *
 * Converts hardcoded grayscale and brand classes across all component files so
 * that dark mode works automatically. Conservative — only replaces patterns
 * where the intent is unambiguous.
 *
 * Usage:
 *   node scripts/migrate-tokens.mjs           # dry-run, shows counts
 *   node scripts/migrate-tokens.mjs --apply   # writes changes
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

// ─── target roots ─────────────────────────────────────────────
const INCLUDE_DIRS = [
  "src/components/sections",
  "src/components/blog",
  "src/components/cms",
  "src/components/elements",
  "src/components/magicui",
  "src/components/ui",
  "src/pages",
  "src/layouts",
];
const SKIP_NAMES = new Set(["node_modules", ".git", "dist", ".astro"]);
const EXTS = new Set([".tsx", ".astro", ".jsx"]);

// ─── replacement rules ────────────────────────────────────────
// Each rule: [regex, replacement, label]
// Rules run in order — earlier rules can set up context for later ones.
const RULES = [
  // ─ Brand primary (hex → semantic), fully case-insensitive ──
  [/\btext-\[#323dfe\]/gi, "text-primary", "text-primary-hex"],
  [/\bbg-\[#323dfe\]/gi, "bg-primary", "bg-primary-hex"],
  [/\bborder-\[#323dfe\]/gi, "border-primary", "border-primary-hex"],
  [/\bring-\[#323dfe\]/gi, "ring-primary", "ring-primary-hex"],
  [/\bfrom-\[#323dfe\]/gi, "from-primary", "from-primary-hex"],
  [/\bto-\[#323dfe\]/gi, "to-primary", "to-primary-hex"],
  // Plivo brand purple/blue variants — map to primary
  [/\btext-\[#2832cc\]/gi, "text-primary", "plivo-blue-dark-text"],
  [/\btext-\[#2a34d6\]/gi, "text-primary", "plivo-blue-alt-text"],
  [/\bbg-\[#cd3ef9\]/gi, "bg-primary", "plivo-purple-bg"],
  [/\btext-\[#cd3ef9\]/gi, "text-primary", "plivo-purple-text"],

  // ─ Directional border-black (border-l-black etc.) ──
  [/\bborder-([rltb])-black\b/g, "border-$1-foreground", "border-X-black"],
  [/\bborder-black\b/g, "border-foreground", "border-black (lone)"],

  // ─ Decorative bg-black (small dots, dividers etc) — becomes foreground token ──
  [/\bbg-black\b/g, "bg-foreground", "bg-black (decorative)"],

  // ─ Dark section background (legacy #0f1117) ──
  [/\bbg-\[#0f1117\]/g, "bg-surface-2", "bg-dark-section"],
  [/\bfrom-\[#0f1117\]/g, "from-surface-2", "from-dark-section"],
  [/\bto-\[#0f1117\]/g, "to-surface-2", "to-dark-section"],

  // ─ Plain grayscale surfaces ──
  [/\bbg-white\b/g, "bg-background", "bg-white"],
  [/\bbg-gray-50\b/g, "bg-surface", "bg-gray-50"],
  [/\bbg-gray-100\b/g, "bg-muted", "bg-gray-100"],

  // ─ Text colors ──
  [/\btext-black\b/g, "text-foreground", "text-black"],
  [/\btext-gray-900\b/g, "text-foreground", "text-gray-900"],
  [/\btext-gray-800\b/g, "text-foreground", "text-gray-800"],
  [/\btext-gray-700\b/g, "text-foreground/80", "text-gray-700"],
  [/\btext-gray-600\b/g, "text-muted-foreground", "text-gray-600"],
  [/\btext-gray-500\b/g, "text-muted-foreground", "text-gray-500"],
  [/\btext-gray-400\b/g, "text-muted-foreground", "text-gray-400"],

  // ─ Borders ──
  [/\bborder-gray-100\b/g, "border-border", "border-gray-100"],
  [/\bborder-gray-200\b/g, "border-border", "border-gray-200"],
  [/\bborder-gray-300\b/g, "border-border-strong", "border-gray-300"],
  [/\bdivide-gray-100\b/g, "divide-border", "divide-gray-100"],
  [/\bdivide-gray-200\b/g, "divide-border", "divide-gray-200"],

  // ─ CTA button pattern: `bg-black ... text-white` (with cta-hover-gradient) ──
  // Replace bg-black alone with bg-foreground (background-contrast neutral)
  // and text-white on the same element with text-background. Hover
  // override stays intentional.
  //
  // Match with middle content (bg-black [...] text-white)
  [
    /\bbg-black(\s+[^"'`]*?\s+)text-white\b/g,
    "bg-foreground$1text-background",
    "bg-black <mid> text-white → semantic",
  ],
  // Match adjacent (bg-black text-white)
  [
    /\bbg-black\s+text-white\b/g,
    "bg-foreground text-background",
    "bg-black+text-white (adjacent) → semantic",
  ],
  // Match reversed adjacent (text-white bg-black)
  [
    /\btext-white\s+bg-black\b/g,
    "text-background bg-foreground",
    "text-white+bg-black (adjacent) → semantic",
  ],
  // Lone bg-black (less common — often a backdrop, becomes surface-2)
  [/\bbg-black\/(\d+)\b/g, "bg-foreground/$1", "bg-black/N → bg-foreground/N"],

  // ─ Sections that explicitly use the dark palette via rgb() → token ──
  [/\bbg-\[rgb\(15,\s*17,\s*23\)\]/g, "bg-surface-2", "bg-rgb(15,17,23)"],
  [/\bfrom-\[rgb\(15,\s*17,\s*23\)\]/g, "from-surface-2", "from-rgb(15,17,23)"],

  // ─ Ring offset (light) ──
  [/\bring-offset-white\b/g, "ring-offset-background", "ring-offset-white"],

  // ─ Shadows on cards — no-op (shadow-sm etc are fine on both themes) ──

  // ─ hover:bg-gray-50 / 100 ──
  [/\bhover:bg-gray-50\b/g, "hover:bg-surface", "hover:bg-gray-50"],
  [/\bhover:bg-gray-100\b/g, "hover:bg-muted", "hover:bg-gray-100"],

  // ─ focus/hover text ──
  [/\bhover:text-black\b/g, "hover:text-foreground", "hover:text-black"],
  [/\bhover:text-gray-900\b/g, "hover:text-foreground", "hover:text-gray-900"],

  // ─ placeholder ──
  [/\bplaceholder-gray-400\b/g, "placeholder-muted-foreground", "placeholder-gray-400"],
  [/\bplaceholder:text-gray-400\b/g, "placeholder:text-muted-foreground", "placeholder:text-gray-400"],

  // ─ Tailwind gradient stops — white → background ──
  [/\bfrom-white\b/g, "from-background", "from-white"],
  [/\bto-white\b/g, "to-background", "to-white"],
  [/\bvia-white\b/g, "via-background", "via-white"],
  [/\bvia-white\/(\d+)\b/g, "via-background/$1", "via-white/N"],
  // Gradient stops → surface
  [/\bfrom-gray-50\b/g, "from-surface", "from-gray-50"],
  [/\bto-gray-50\b/g, "to-surface", "to-gray-50"],
  [/\bfrom-gray-100\b/g, "from-muted", "from-gray-100"],
  [/\bto-gray-100\b/g, "to-muted", "to-gray-100"],

  // ─ Inline style linear-gradient(... white ...) → uses --background token ──
  [/linear-gradient\(([^)]*?)white\b([^)]*)\)/g, "linear-gradient($1hsl(var(--background))$2)", "inline gradient white"],

  // ─ hover borders ──
  [/\bhover:border-gray-400\b/g, "hover:border-border-strong", "hover:border-gray-400"],
  [/\bhover:border-gray-500\b/g, "hover:border-border-strong", "hover:border-gray-500"],
];

// ─── main ────────────────────────────────────────────────────
const counts = {};
const changedFiles = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (SKIP_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

async function processFile(file) {
  let src = await fs.readFile(file, "utf8");
  const original = src;
  let fileChanges = 0;

  for (const [regex, replacement, label] of RULES) {
    const before = src;
    // Pass replacement as a string (not function) so $1…$N interpolate.
    src = src.replace(regex, replacement);
    if (src !== before) {
      const matches = before.match(regex) || [];
      counts[label] = (counts[label] || 0) + matches.length;
      fileChanges += matches.length;
    }
  }

  if (src !== original) {
    changedFiles.push({ file, changes: fileChanges });
    if (apply) await fs.writeFile(file, src);
  }
}

async function main() {
  const allFiles = [];
  for (const rel of INCLUDE_DIRS) {
    const dir = path.join(ROOT, rel);
    try {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) allFiles.push(...(await walk(dir)));
    } catch {
      /* dir missing, skip */
    }
  }

  for (const f of allFiles) await processFile(f);

  const totalChanges = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\nScanned ${allFiles.length} files · ${changedFiles.length} would change · ${totalChanges} total replacements\n`);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  for (const [label, n] of sorted) console.log(`  ${String(n).padStart(4)}  ${label}`);

  if (!apply) {
    console.log(`\n(dry-run — re-run with --apply to write changes)`);
  } else {
    console.log(`\n✓ applied to ${changedFiles.length} files`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
