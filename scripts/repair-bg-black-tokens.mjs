#!/usr/bin/env node
/**
 * Repair botched `bg-foreground$1text-background` substitutions left by
 * an earlier migration pass. The `$1` placeholder leaked literally because
 * the migration used a callback, not a string, for `String.replace`.
 *
 * Fix: for each broken file, read the pre-migration version from git HEAD,
 * recover the captured-whitespace groups in order, and splice them back in.
 */

import { promises as fs } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const BROKEN_PATTERN = /bg-foreground\$1text-background/g;
const ORIGINAL_PATTERN = /\bbg-black(\s+[^"'`]*?\s+)text-white\b/g;

const FILES = [
  "src/components/sections/plivo-pricing.tsx",
  "src/pages/blog/[...page].astro",
  "src/components/cms/CmsLogin.tsx",
  "src/components/cms/CmsEditor.tsx",
  "src/components/cms/CmsDashboard.tsx",
  "src/components/cms/CmsBannerGenerator.tsx",
  "src/components/sections/whatsapp-channel/WhatsAppPreFooterCTA.tsx",
  "src/components/sections/voice-channel/VoiceConnectivity.astro",
  "src/components/sections/voice-channel/SIPTrunkingPricing.tsx",
  "src/components/sections/voice-channel/SIPTrunkingCoverage.tsx",
  "src/components/sections/voice-channel/GettingStartedSteps.tsx",
  "src/components/sections/startups/StartupsHero.tsx",
  "src/components/sections/sms-channel/SMSPreFooterCTA.tsx",
  "src/components/sections/sms-channel/CoveragePreFooterCTA.tsx",
  "src/components/sections/request-trial/RequestTrialHero.tsx",
  "src/components/sections/rcs-channel/RCSPage.tsx",
  "src/components/sections/plivo-hero.tsx",
  "src/components/sections/phone-numbers/PhoneNumbersPreFooterCTA.tsx",
  "src/components/sections/contact/ContactSalesHero.tsx",
  "src/components/sections/chat-channel/ChatPreFooterCTA.tsx",
  "src/components/sections/brand/BrandPage.tsx",
  "src/components/sections/DesignSystem.tsx",
];

async function main() {
  let totalRepaired = 0;
  for (const rel of FILES) {
    const abs = path.join(ROOT, rel);
    let current;
    try {
      current = await fs.readFile(abs, "utf8");
    } catch (err) {
      console.warn(`skip (read failed): ${rel}`);
      continue;
    }

    const brokenCount = (current.match(BROKEN_PATTERN) || []).length;
    if (brokenCount === 0) continue;

    let head;
    try {
      head = execSync(`git show HEAD:"${rel}"`, { cwd: ROOT, encoding: "utf8" });
    } catch (err) {
      console.warn(`skip (no HEAD): ${rel}`);
      continue;
    }

    const captures = [...head.matchAll(ORIGINAL_PATTERN)].map((m) => m[1]);
    if (captures.length < brokenCount) {
      console.warn(
        `skip (HEAD has ${captures.length} captures, current has ${brokenCount} broken): ${rel}`,
      );
      continue;
    }

    let i = 0;
    const fixed = current.replace(BROKEN_PATTERN, () => {
      const mid = captures[i++] ?? " ";
      return `bg-foreground${mid}text-background`;
    });

    if (fixed !== current) {
      await fs.writeFile(abs, fixed);
      totalRepaired += brokenCount;
      console.log(`  ✓ ${rel} (${brokenCount} fixed)`);
    }
  }
  console.log(`\n✓ repaired ${totalRepaired} sites across ${FILES.length} files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
