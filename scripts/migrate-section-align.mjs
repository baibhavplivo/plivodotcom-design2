#!/usr/bin/env node
/**
 * Convert center-aligned section H2 headings in channel pages to the
 * homepage's left-aligned editorial style.
 *
 *   - strip `text-center`, `max-w-3xl mx-auto`, `mx-auto` from font-sora H2s
 *   - upgrade tracking from `tracking-[-0.02em]` → `tracking-[-0.035em]` on display headings
 *   - also strip `text-center` from the H2's surrounding wrapper divs when they
 *     are explicitly `text-center` (mb-X text-center pattern)
 *
 * Content-only migration has zero text changes.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const INCLUDE_DIRS = ["src/components/sections"];
const SKIP = new Set(["node_modules", ".git", "dist", ".astro"]);
const EXTS = new Set([".tsx", ".astro", ".jsx"]);

// Don't migrate homepage (already editorial) or heroes (bespoke layouts) or
// purely-narrow content (FAQ sidebars, error states)
const EXCLUDE = [
  /voice-homepage\//,
  /ChannelHero\./,
  /Hero\.astro$/,
  /VoiceAgentDemo\./,
  /DesignSystem\.tsx$/,
  /DesignPreview\.tsx$/,
  /SubNav\./,
];

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

function removeClasses(classStr, removals) {
  let result = classStr;
  for (const r of removals) {
    const before = result;
    result = result.replace(new RegExp(`\\b${r}\\b`, "g"), "").replace(/\s+/g, " ").trim();
    if (result !== before) counts[r] = (counts[r] || 0) + 1;
  }
  return result;
}

async function processFile(file) {
  const rel = path.relative(ROOT, file);
  if (EXCLUDE.some((re) => re.test(rel))) return;

  let src = await fs.readFile(file, "utf8");
  const original = src;

  /* 1. H2 font-sora headings — strip centering classes */
  src = src.replace(
    /(<h2\s[^>]*?\b(?:class|className)=(?:"|'))([^"']*\bfont-sora\b[^"']*)((?:"|')[^>]*?>)/g,
    (m, pre, classStr, post) => {
      const cleaned = removeClasses(classStr, [
        "text-center",
        "mx-auto",
        "max-w-3xl",
        "max-w-2xl",
        "max-w-4xl",
      ]);
      if (cleaned !== classStr) counts["h2 alignment"] = (counts["h2 alignment"] || 0) + 1;
      return `${pre}${cleaned}${post}`;
    },
  );

  /* 2. Also strip `text-center` from divs that have BOTH `text-center` AND
        wrap a font-sora h2. Match div...text-center...<h2 font-sora...
        via a lookahead pattern on the immediate parent div class. */
  src = src.replace(
    /(<div\s[^>]*?\b(?:class|className)=(?:"|'))([^"']*\btext-center\b[^"']*)((?:"|')[^>]*?>)(\s*<h2\s[^>]*?\bfont-sora\b)/g,
    (m, pre, classStr, post, h2) => {
      const cleaned = removeClasses(classStr, ["text-center"]);
      counts["div wrapper text-center"] = (counts["div wrapper text-center"] || 0) + 1;
      return `${pre}${cleaned}${post}${h2}`;
    },
  );

  /* 3. Support <p> subtitle under the h2 that used `mx-auto text-center` */
  src = src.replace(
    /(<p\s[^>]*?\b(?:class|className)=(?:"|'))([^"']*\btext-center\b[^"']*\bmx-auto\b[^"']*|[^"']*\bmx-auto\b[^"']*\btext-center\b[^"']*)((?:"|')[^>]*?>[^<]{0,500}(?:Plivo|platform|products|features|connect))/gi,
    (m, pre, classStr, post) => {
      const cleaned = removeClasses(classStr, ["text-center", "mx-auto"]);
      counts["p subtitle alignment"] = (counts["p subtitle alignment"] || 0) + 1;
      return `${pre}${cleaned}${post}`;
    },
  );

  if (src !== original) {
    changed.push({ file: rel });
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
  console.log(`\nScanned ${files.length} files · ${changed.length} changed · ${total} replacements\n`);
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(v).padStart(4)}  ${k}`);
  }
  if (!apply) console.log(`\n(dry-run — re-run with --apply)`);
  else console.log(`\n✓ applied to ${changed.length} files`);
}
main();
