#!/usr/bin/env node
/**
 * Add `dark:invert` to compliance badge img tags so HIPAA/GDPR/SOC2/PCI/STAR
 * logos stay legible in dark mode. The SVG files in /images/compliance/ are
 * black-on-transparent, so they disappear on dark backgrounds without the
 * filter.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const FILES = [
  "src/components/sections/chat-channel/ChatEngagementPlatform.tsx",
  "src/components/sections/sms-channel/VerifyCompliance.tsx",
  "src/components/sections/sms-channel/SMSConnectivityGrid.tsx",
  "src/components/sections/whatsapp-channel/WhatsAppEngagementPlatform.tsx",
  "src/components/sections/voice-homepage/ComplianceSection.tsx",
  "src/components/sections/security/SecurityPage.tsx",
  "src/components/sections/request-trial/RequestTrialHero.tsx",
  "src/components/sections/contact/ContactSalesHero.tsx",
];

// Find <img> tags within ~200 chars of a `compliance/` or `badge`/`logo`
// reference, and if they lack `dark:invert`, add it.
//
// We do this per <img …/> tag inside each file. For each img, check if it
// sits within a scope that maps to a compliance logo — if so, add dark:invert.

let totalTagsPatched = 0;
const changed = [];

async function processFile(rel) {
  const abs = path.join(ROOT, rel);
  let src;
  try {
    src = await fs.readFile(abs, "utf8");
  } catch {
    console.warn(`skip: ${rel}`);
    return;
  }
  const original = src;

  // Simple approach: find every <img .../> and check if the whole file has
  // a compliance logo reference AND if this tag's src prop looks like a
  // badge source (logo, icon, cert, badge, compliance).
  //
  // If the img tag's className doesn't already include `dark:invert`, add it.
  const imgRe = /<img\s+([^/>]*?)(\/?>)/g;
  src = src.replace(imgRe, (full, attrs, close) => {
    // Is this likely a compliance badge?
    const isBadge = /\{\s*(?:badge\.icon|badge\.src|logo\.src|logo\.icon|cert\.logo|cert\.icon)\s*\}/.test(attrs)
      || /compliance\//.test(attrs);
    if (!isBadge) return full;
    if (/dark:invert/.test(attrs)) return full;

    // Inject dark:invert into className
    const cnRe = /(className="[^"]*)"/;
    if (cnRe.test(attrs)) {
      totalTagsPatched++;
      return `<img ${attrs.replace(cnRe, '$1 dark:invert"')}${close}`;
    }
    // No className — add one
    totalTagsPatched++;
    return `<img ${attrs.trim()} className="dark:invert"${close.startsWith("/") ? " /" : ""}>`;
  });

  if (src !== original) {
    if (apply) await fs.writeFile(abs, src);
    changed.push(rel);
  }
}

async function main() {
  for (const f of FILES) await processFile(f);
  console.log(`\nChanged ${changed.length} files · ${totalTagsPatched} img tags patched\n`);
  for (const f of changed) console.log(`  ✓ ${f}`);
  if (!apply) console.log(`\n(dry-run — re-run with --apply)`);
}
main();
