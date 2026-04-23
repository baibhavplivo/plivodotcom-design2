#!/usr/bin/env node
/**
 * Apply homepage editorial styling to every interior channel-page section.
 *
 * Conservative, style-only. No content changes.
 *
 *   1. Ensure every `<section class="bg-background py-12 …">` (and bg-surface
 *      variant) has `border-t border-border` so sections read as one doc.
 *   2. Convert the old tailwind eyebrow pattern
 *        `uppercase tracking-wide(r|st)`
 *      to the homepage's monospace kicker pattern
 *        `font-mono-ui tracking-[0.1em]`
 *      everywhere it appears.
 *   3. Leave all text content untouched.
 *
 * Usage:
 *   node scripts/migrate-section-style.mjs           # dry-run
 *   node scripts/migrate-section-style.mjs --apply   # write
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const INCLUDE_DIRS = [
  "src/components/sections",
];
const SKIP_NAMES = new Set(["node_modules", ".git", "dist", ".astro"]);
const EXTS = new Set([".tsx", ".astro", ".jsx"]);

// Only apply to channel-page sections and common components — never to
// hero files (they already have the kicker baked in) and never to
// voice-homepage files (the homepage itself is already editorial).
const EXCLUDE_PATTERNS = [
  /voice-homepage\//,               // homepage sections already done
  /ChannelHero\./,                  // hero files already styled
  /Hero\.astro$/,
  /SubNav\./,
  /VoiceAgentDemo\./,
  /DesignSystem\.tsx$/,
  /DesignPreview\.tsx$/,
];

const RULES = [
  // 1. Add border-t border-border to bg-background/bg-surface section wrappers
  //    that don't already have a border-t.
  //
  //    Matches:  <section className="... bg-background py-12 ..."
  //    Skips:    already has border-t
  [
    /(<section[^>]*\b(?:class|className)=(?:"|')[^"']*)\bbg-background\b(?![^"']*\bborder-t\b)([^"']*(?:"|'))/g,
    "$1bg-background border-t border-border$2",
    "section bg-background + border-t",
  ],
  [
    /(<section[^>]*\b(?:class|className)=(?:"|')[^"']*)\bbg-surface\b(?![^"']*\bborder-t\b)([^"']*(?:"|'))/g,
    "$1bg-surface border-t border-border$2",
    "section bg-surface + border-t",
  ],

  // 2. Standardize eyebrow pattern
  //    "uppercase tracking-wider" → "font-mono-ui uppercase tracking-[0.1em]"
  [
    /\buppercase\s+tracking-wider\b/g,
    "font-mono-ui uppercase tracking-[0.1em]",
    "uppercase tracking-wider",
  ],
  [
    /\buppercase\s+tracking-wide\b/g,
    "font-mono-ui uppercase tracking-[0.1em]",
    "uppercase tracking-wide",
  ],
  [
    /\buppercase\s+tracking-widest\b/g,
    "font-mono-ui uppercase tracking-[0.12em]",
    "uppercase tracking-widest",
  ],
  // Reversed ordering (tracking-X uppercase)
  [
    /\btracking-wider\s+uppercase\b/g,
    "font-mono-ui uppercase tracking-[0.1em]",
    "tracking-wider uppercase",
  ],
  [
    /\btracking-wide\s+uppercase\b/g,
    "font-mono-ui uppercase tracking-[0.1em]",
    "tracking-wide uppercase",
  ],

  // 3. tabular-nums helper on stat numbers — tiny touch
  //    (leave for future)
];

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
  const rel = path.relative(ROOT, file);
  if (EXCLUDE_PATTERNS.some((re) => re.test(rel))) return;

  let src = await fs.readFile(file, "utf8");
  const original = src;
  let fileChanges = 0;

  for (const [regex, replacement, label] of RULES) {
    const before = src;
    src = src.replace(regex, replacement);
    if (src !== before) {
      const matches = before.match(regex) || [];
      counts[label] = (counts[label] || 0) + matches.length;
      fileChanges += matches.length;
    }
  }

  if (src !== original) {
    changedFiles.push({ file: rel, changes: fileChanges });
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
    } catch {}
  }

  for (const f of allFiles) await processFile(f);

  const totalChanges = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\nScanned ${allFiles.length} files · ${changedFiles.length} would change · ${totalChanges} replacements\n`);
  for (const [label, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${label}`);
  }

  if (!apply) console.log(`\n(dry-run — re-run with --apply to write)`);
  else console.log(`\n✓ applied to ${changedFiles.length} files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
