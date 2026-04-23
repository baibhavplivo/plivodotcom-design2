#!/usr/bin/env node
/**
 * Replace the absolute-positioned underline span inside H1s with native
 * text-decoration so the decorated text can wrap across lines without
 * orphaning preceding words.
 *
 * Before:
 *   <span class="relative inline-block">
 *     <span class="relative">Underlined text</span>
 *     <span aria-hidden="true" class="absolute ... h-[0.14em] bg-primary/25"></span>
 *   </span>
 *
 * After:
 *   <span class="[text-decoration-line:underline] [text-decoration-color:rgb(50_61_254_/_0.25)] [text-decoration-thickness:0.14em] [text-underline-offset:0.12em]">Underlined text</span>
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const FILES = [
  "src/components/sections/voice-homepage/VoiceHero.astro",
  "src/components/sections/voice-channel/VoiceChannelHero.astro",
  "src/components/sections/voice-channel/SIPTrunkingHero.astro",
  "src/components/sections/sms-channel/SMSChannelHero.astro",
  "src/components/sections/sms-channel/VerifyHero.astro",
  "src/components/sections/whatsapp-channel/WhatsAppChannelHero.astro",
  "src/components/sections/chat-channel/ChatChannelHero.astro",
  "src/components/sections/about/AboutPage.tsx",
  "src/components/sections/contact/ContactSalesHero.tsx",
  "src/components/sections/plivo-pricing.tsx",
  "src/components/sections/faq-page.tsx",
  "src/components/sections/rcs-channel/RCSPage.tsx",
];

// The decoration utilities: underline, colour (primary @ 25% alpha), thickness, offset
const DECO = '[text-decoration-line:underline] decoration-primary/25 [text-decoration-thickness:0.14em] [text-underline-offset:0.12em]';

// Match the 3-span structure in .astro (class=) and .tsx (className=), allowing
// varied whitespace. The capture is the *text* content of the inner `relative` span.
function build(attr) {
  return new RegExp(
    `<span\\s+${attr}="relative inline-block">\\s*` +
      `<span\\s+${attr}="relative">([\\s\\S]*?)</span>\\s*` +
      `<span\\s+aria-hidden="true"\\s+${attr}="absolute[^"]*?bg-primary/25[^"]*"\\s*(?:/>|></span>)\\s*` +
      `</span>`,
    "g",
  );
}

const RE_ASTRO = build("class");
const RE_TSX = build("className");

let totalReplacements = 0;
const changed = [];

async function processFile(rel) {
  const abs = path.join(ROOT, rel);
  let src;
  try {
    src = await fs.readFile(abs, "utf8");
  } catch {
    console.warn(`skip (not found): ${rel}`);
    return;
  }

  const original = src;
  const isAstro = rel.endsWith(".astro");
  const re = isAstro ? RE_ASTRO : RE_TSX;
  const attr = isAstro ? "class" : "className";

  src = src.replace(re, (m, inner) => {
    totalReplacements++;
    return `<span ${attr}="${DECO}">${inner}</span>`;
  });

  if (src !== original) {
    if (apply) await fs.writeFile(abs, src);
    changed.push(rel);
  }
}

async function main() {
  for (const f of FILES) await processFile(f);
  console.log(`\nReplaced ${totalReplacements} underline spans across ${changed.length} files\n`);
  for (const f of changed) console.log(`  ✓ ${f}`);
  if (!apply) console.log(`\n(dry-run — re-run with --apply)`);
  else console.log(`\n✓ applied`);
}
main();
