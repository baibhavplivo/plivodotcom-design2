#!/usr/bin/env node
/**
 * Fix WhatsApp chat bubble text legibility:
 *
 * WhatsApp UI is always light (green outgoing / white incoming) regardless of
 * app theme — so the text inside must always be dark. In our codebase, bubble
 * text uses `text-foreground` which inverts in dark mode, producing white-on-
 * green bubbles that are unreadable.
 *
 * For the hardcoded WhatsApp bubble backgrounds (`bg-[#dcf8c6]` outgoing and
 * `bg-[#ECE5DD]` backdrop), we replace the bubble + its nearest `text-foreground`
 * / `text-muted-foreground` descendants with fixed dark tokens.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

// Target files — anywhere WhatsApp chat bubbles are rendered with the authentic UI
const FILES = [
  "src/components/sections/whatsapp-channel/WhatsAppUseCases.tsx",
  "src/components/sections/whatsapp-channel/WhatsAppHeroIllustration.tsx",
  "src/components/sections/whatsapp-channel/WhatsAppFeatureRichAgents.tsx",
  "src/components/sections/whatsapp-channel/WhatsAppAIAgentsAccordion.tsx",
];

// Inside a `bg-[#dcf8c6]` or `bg-white` WhatsApp-style bubble, the child
// <p className="... text-foreground ..."> should use an always-dark class.
// We use Tailwind arbitrary: `text-[#111b21]` (WhatsApp's actual text color).
const WA_TEXT = "text-[#111b21]";
const WA_META_TEXT = "text-[#667781]"; // timestamp gray used in actual WhatsApp

let totalChanges = 0;
const changed = [];

async function processFile(rel) {
  const abs = path.join(ROOT, rel);
  let src;
  try {
    src = await fs.readFile(abs, "utf8");
  } catch {
    return;
  }

  const original = src;

  // Pattern: a div with `bg-[#dcf8c6]` (outgoing), find the direct <p> child
  // with `text-foreground` or `text-muted-foreground` and swap.
  //
  // We do this by locating the bubble's opening tag, then walking forward a
  // bounded distance and replacing specific tokens. Easiest: multi-step
  // replace in whole-file.
  //
  // Since the bubbles are tightly scoped, and every descendant `text-foreground`
  // inside `bg-[#dcf8c6]` blocks should switch, we do a bounded window replace.

  // Find each outgoing bubble opening div, then within the next ~400 chars
  // (a single bubble block), swap text colors.
  const outRe = /bg-\[#dcf8c6\][^"'`]*/g;
  const recipientRe = /bg-\[#ECE5DD\][^"'`]*/g;

  // Simpler strategy: find ALL bubble wrappers; then replace text inside
  // bubble elements between the bubble's opening quote and the block's </div>.
  //
  // Let's just do targeted, narrow replacements within 500-char windows
  // after each bubble opening.
  const windows = [];
  let m;
  while ((m = outRe.exec(src))) windows.push([m.index, m.index + 500]);
  while ((m = recipientRe.exec(src))) windows.push([m.index, m.index + 500]);

  let out = src;
  // Process windows back-to-front so offsets don't drift
  windows.sort((a, b) => b[0] - a[0]);
  for (const [start, end] of windows) {
    const segment = out.slice(start, end);
    const replaced = segment
      .replace(/\btext-foreground\b/g, WA_TEXT)
      .replace(/\btext-muted-foreground\b/g, WA_META_TEXT);
    if (replaced !== segment) {
      out = out.slice(0, start) + replaced + out.slice(end);
      totalChanges++;
    }
  }

  if (out !== original) {
    if (apply) await fs.writeFile(abs, out);
    changed.push(rel);
  }
}

async function main() {
  for (const f of FILES) await processFile(f);
  console.log(`\nChanged ${changed.length} files · ${totalChanges} windows patched\n`);
  for (const f of changed) console.log(`  ✓ ${f}`);
  if (!apply) console.log(`\n(dry-run — re-run with --apply)`);
}
main();
