#!/usr/bin/env node
/**
 * Aggressive rewrite: inject the homepage's kicker strip above every
 * `<h2 class="font-sora ...">` in channel/product section components, and
 * upgrade the H2 to the homepage display scale.
 *
 *   ~ kicker-label ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ meta
 *   Left-aligned H2 at homepage scale
 *
 * The kicker label is derived from the filename. Preserves every letter of
 * the existing headline text — zero copy changes.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const INCLUDE_DIRS = ["src/components/sections"];
const SKIP = new Set(["node_modules", ".git", "dist", ".astro"]);
const EXTS = new Set([".tsx", ".astro", ".jsx"]);

// Skip homepage (done), heroes (bespoke), subnav, and a few special files.
const EXCLUDE = [
  /voice-homepage\//,
  /ChannelHero\./,
  /Hero\.astro$/,
  /Hero\.tsx$/,
  /SubNav\./,
  /VoiceAgentDemo\./,
  /DesignSystem\.tsx$/,
  /DesignPreview\.tsx$/,
  /PreFooterCTA\./,         // these already have kickers or unique layout
  /PriceCalculator\./,
  /FAQ\.tsx$/,              // FAQ sections have special sidebar layout
  /faq-page\.tsx$/,
  /Coverage/,
  /legal\//,
  /blog-post\.tsx$/,
  /blog-posts\.tsx$/,
  /case-study\//,
  /CmsEditor|Cms/,
  /DesignSystem/,
  /BrandPage/,
  /JobsPage|jobs\//,
];

function kickerLabelFromPath(rel) {
  const base = path.basename(rel, path.extname(rel));
  // Strip common product prefixes so the label stays generic
  let stem = base
    .replace(/^(SMS|WhatsApp|Chat|Voice|RCS|Verify|SIPTrunking|SIP|PhoneNumbers|AIAgent)s?/, "")
    .replace(/^Plivo/, "");
  if (!stem) stem = base;
  // Split CamelCase, preserving acronyms: "AICapabilities" → "AI Capabilities"
  // Step 1: split between lowercase/digit and uppercase: "aB" → "a B"
  // Step 2: split between uppercase-run and subsequent UpperLower: "AIA" → "AI A"
  const spaced = stem
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();
  return spaced.toLowerCase();
}

// The kicker block (Astro and React accept the same class-quoting style;
// for .astro we use single-brace `class=`, for .tsx we use `className=`).
function kickerBlockTSX(label) {
  return `<div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>${label}</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        `;
}
function kickerBlockAstro(label) {
  return `<div class="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span class="flex items-center gap-2">
            <span class="tabular-nums text-foreground/70">~</span>
            <span class="h-px w-6 bg-border"></span>
          </span>
          <span>${label}</span>
          <span class="flex-1 border-t border-dashed border-border"></span>
        </div>
        `;
}

const counts = { kickerInjected: 0, h2Upgraded: 0, filesChanged: 0 };
const changed = [];

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

const H2_TSX_RE = /(<h2\s+className=")([^"]*font-sora[^"]*)("[^>]*>)/g;
const H2_ASTRO_RE = /(<h2\s+class=")([^"]*font-sora[^"]*)("[^>]*>)/g;

// Insert kicker before the H2 (only if no kicker already exists within the
// previous ~200 chars in the source).
function hasNearbyKicker(src, idx) {
  const region = src.slice(Math.max(0, idx - 400), idx);
  return /font-mono-ui[^"]*uppercase[^"]*tracking-\[0\.12em\]/.test(region);
}

function upgradeH2Classes(classStr) {
  let updated = classStr;
  // Replace the old scale `text-[1.75rem] sm:text-[2rem] md:text-[2.5rem]`
  // with the homepage display scale.
  updated = updated.replace(
    /\btext-\[1\.75rem\]\s+sm:text-\[2rem\]\s+md:text-\[2\.5rem\]\b/g,
    "text-[2rem] sm:text-[2.5rem] md:text-[3rem]",
  );
  // Tighten tracking to match homepage
  updated = updated.replace(/\btracking-\[-0\.02em\]/g, "tracking-[-0.035em]");
  // Homepage leading is tighter
  updated = updated.replace(/\bleading-\[1\.25\]/g, "leading-[1.04]");
  return updated;
}

async function processFile(file) {
  const rel = path.relative(ROOT, file);
  if (EXCLUDE.some((re) => re.test(rel))) return;

  const src = await fs.readFile(file, "utf8");
  const label = kickerLabelFromPath(rel);
  const isAstro = file.endsWith(".astro");
  const kicker = isAstro ? kickerBlockAstro(label) : kickerBlockTSX(label);
  const RE = isAstro ? H2_ASTRO_RE : H2_TSX_RE;

  let h2Upgraded = 0;
  let kickerInjected = 0;

  // Walk through H2 matches sequentially, since each insertion shifts offsets.
  const matches = [...src.matchAll(RE)];
  if (matches.length === 0) return;

  // Build the result by stitching segments.
  let result = "";
  let cursor = 0;
  for (const m of matches) {
    const idx = m.index;
    const full = m[0];
    const classStr = m[2];

    // Copy the part before the match.
    result += src.slice(cursor, idx);

    // Upgrade class string
    const upgraded = upgradeH2Classes(classStr);
    if (upgraded !== classStr) h2Upgraded++;

    // Insert kicker if there isn't one nearby (looking at the result so far).
    const shouldInject = !hasNearbyKicker(result + full, result.length);

    if (shouldInject) {
      result += kicker;
      kickerInjected++;
    }

    result += `${m[1]}${upgraded}${m[3]}`;
    cursor = idx + full.length;
  }
  result += src.slice(cursor);

  if (result !== src) {
    if (apply) await fs.writeFile(file, result);
    counts.kickerInjected += kickerInjected;
    counts.h2Upgraded += h2Upgraded;
    counts.filesChanged++;
    changed.push({ file: rel, label, kickerInjected, h2Upgraded });
  }
}

async function main() {
  const files = [];
  for (const rel of INCLUDE_DIRS) files.push(...(await walk(path.join(ROOT, rel))));
  for (const f of files) await processFile(f);

  console.log(`\nScanned ${files.length} files · changed ${counts.filesChanged}\n`);
  console.log(`  kicker strips injected:  ${counts.kickerInjected}`);
  console.log(`  h2 scale upgraded:       ${counts.h2Upgraded}`);
  console.log();

  for (const c of changed.slice(0, 20)) {
    console.log(`  [${c.label.padEnd(20)}]  ${c.file}  (+${c.kickerInjected}k / +${c.h2Upgraded}h2)`);
  }
  if (changed.length > 20) console.log(`  … ${changed.length - 20} more files`);

  if (!apply) console.log(`\n(dry-run — re-run with --apply)`);
  else console.log(`\n✓ applied to ${counts.filesChanged} files`);
}
main();
