#!/usr/bin/env node
/**
 * Downshift heavy box-shadows on cards to hairline borders — matches the
 * homepage's "hairlines over shadows" doctrine.
 *
 *   shadow-md   → shadow-sm
 *   shadow-lg   → (removed) rely on border
 *   shadow-xl   → (removed)
 *   shadow-2xl  → (removed)
 *
 * Leaves hover:shadow-* alone (subtle hover feedback is OK).
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");
const INCLUDE = ["src/components/sections"];
const SKIP = new Set(["node_modules", ".git", "dist", ".astro"]);
const EXTS = new Set([".tsx", ".astro", ".jsx"]);
const EXCLUDE = [/voice-homepage\//, /ChannelHero\./, /Hero\.(astro|tsx)$/];

async function walk(d) {
  const out = [];
  for (const e of await fs.readdir(d, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(d, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (EXTS.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

const RULES = [
  // Only non-hover, non-group-hover shadow utilities.
  // `(?<!:)shadow-…` = not preceded by `:` (hover:, focus:, etc.)
  [/(?<!:)\bshadow-2xl\b/g, "", "shadow-2xl"],
  [/(?<!:)\bshadow-xl\b/g, "", "shadow-xl"],
  [/(?<!:)\bshadow-lg\b/g, "shadow-sm", "shadow-lg → shadow-sm"],
  [/(?<!:)\bshadow-md\b/g, "shadow-sm", "shadow-md → shadow-sm"],
];

const counts = {};
const changed = [];

async function processFile(file) {
  const rel = path.relative(ROOT, file);
  if (EXCLUDE.some((re) => re.test(rel))) return;
  let src = await fs.readFile(file, "utf8");
  const original = src;
  for (const [re, rep, label] of RULES) {
    const before = src;
    src = src.replace(re, rep);
    if (src !== before) {
      counts[label] = (counts[label] || 0) + (before.match(re) || []).length;
    }
  }
  // Collapse double spaces from empty replacements
  src = src.replace(/\s{2,}/g, (m) => m.includes("\n") ? m : " ");
  if (src !== original) {
    if (apply) await fs.writeFile(file, src);
    changed.push(rel);
  }
}

async function main() {
  const files = [];
  for (const rel of INCLUDE) files.push(...(await walk(path.join(ROOT, rel))));
  for (const f of files) await processFile(f);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\nScanned ${files.length} · changed ${changed.length} · ${total} replacements\n`);
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(v).padStart(4)}  ${k}`);
  }
  if (!apply) console.log("\n(dry-run — re-run with --apply)");
  else console.log(`\n✓ applied to ${changed.length} files`);
}
main();
