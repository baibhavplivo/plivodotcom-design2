#!/usr/bin/env node
/**
 * Dedupe accidental `border-t border-border` duplicates inside a single
 * class attribute. Leaves single instances and differing occurrences alone.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const EXTS = new Set([".tsx", ".astro", ".jsx"]);
const SKIP = new Set(["node_modules", ".git", "dist", ".astro"]);

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

// Match a class="..." or className="..." attribute and dedupe inside it.
const ATTR_RE = /(\b(?:class|className)=)("([^"]*)"|'([^']*)')/g;

async function processFile(file) {
  const src = await fs.readFile(file, "utf8");
  let changes = 0;
  const next = src.replace(ATTR_RE, (m, prefix, full, dq, sq) => {
    const quote = dq !== undefined ? '"' : "'";
    const classes = (dq ?? sq).split(/\s+/);
    const seen = new Set();
    const kept = [];
    for (let i = 0; i < classes.length; i++) {
      const cls = classes[i];
      // Dedupe only exact "border-t" and "border-border" tokens (consecutive counts still OK — they're harmless
      // individually; it's only the duplicate pairing that looks bad).
      if ((cls === "border-t" || cls === "border-border") && seen.has(cls)) {
        changes++;
        continue;
      }
      seen.add(cls);
      kept.push(cls);
    }
    return `${prefix}${quote}${kept.join(" ")}${quote}`;
  });

  if (next !== src) {
    if (apply) await fs.writeFile(file, next);
    return { file: path.relative(ROOT, file), changes };
  }
  return null;
}

async function main() {
  const files = await walk(path.join(ROOT, "src/components/sections"));
  const changed = [];
  for (const f of files) {
    const r = await processFile(f);
    if (r) changed.push(r);
  }
  console.log(`Found ${changed.length} files with duplicate border-t/border-border tokens`);
  for (const { file, changes } of changed) console.log(`  ${changes}× ${file}`);
  if (!apply) console.log("\n(dry-run — re-run with --apply)");
}
main();
