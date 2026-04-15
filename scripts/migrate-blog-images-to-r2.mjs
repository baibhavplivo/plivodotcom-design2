#!/usr/bin/env node
/**
 * Migrate existing blog images from public/images/blog/ to Cloudflare R2.
 * Uses wrangler CLI for uploads with parallel execution.
 *
 * Usage: node scripts/migrate-blog-images-to-r2.mjs
 */

import { readdir, stat } from "fs/promises";
import { execSync } from "child_process";
import { extname, join } from "path";

const SOURCE_DIR = "public/images/blog";
const BUCKET = "plivo-blog-images";
const CONCURRENCY = 10;

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

async function uploadFile(file) {
  const ext = extname(file).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";
  const key = `images/blog/${file}`;
  const filePath = join(SOURCE_DIR, file);

  try {
    execSync(
      `npx wrangler r2 object put "${BUCKET}/${key}" --file="${filePath}" --content-type="${contentType}"`,
      { stdio: "pipe", timeout: 30000 }
    );
    return { file, success: true };
  } catch (err) {
    return { file, success: false, error: err.message?.slice(0, 200) };
  }
}

async function runBatch(files, startIdx) {
  const batch = files.slice(startIdx, startIdx + CONCURRENCY);
  return Promise.all(batch.map(uploadFile));
}

async function main() {
  // Get only files (not directories)
  const entries = await readdir(SOURCE_DIR);
  const files = [];
  for (const entry of entries) {
    const s = await stat(join(SOURCE_DIR, entry));
    if (s.isFile()) files.push(entry);
  }

  console.log(`Found ${files.length} files to upload to R2 bucket "${BUCKET}"`);

  let uploaded = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const results = await runBatch(files, i);
    for (const r of results) {
      if (r.success) {
        uploaded++;
      } else {
        failed++;
        failures.push(r);
      }
    }
    console.log(`Progress: ${uploaded + failed}/${files.length} (${uploaded} ok, ${failed} failed)`);
  }

  console.log(`\nDone: ${uploaded} uploaded, ${failed} failed`);
  if (failures.length > 0) {
    console.log("\nFailed files:");
    for (const f of failures) {
      console.log(`  - ${f.file}: ${f.error}`);
    }
  }
}

main().catch(console.error);
