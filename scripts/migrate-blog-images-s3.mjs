#!/usr/bin/env node
/**
 * Fast migration of blog images to Cloudflare R2 using S3-compatible API.
 * Uploads 20 files concurrently — completes in ~2-3 minutes for 1,765 files.
 *
 * Usage:
 *   R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=yyy node scripts/migrate-blog-images-s3.mjs
 *
 * Required env vars:
 *   R2_ACCESS_KEY_ID     - R2 API token Access Key ID
 *   R2_SECRET_ACCESS_KEY - R2 API token Secret Access Key
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile, stat } from "fs/promises";
import { extname, join } from "path";

const ACCOUNT_ID = "e3740b343696a1485ad723c926c0b687";
const BUCKET = "plivo-blog-images";
const SOURCE_DIR = "public/images/blog";
const CONCURRENCY = 20;

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

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function objectExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(file) {
  const ext = extname(file).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";
  const key = `images/blog/${file}`;

  // Skip if already uploaded
  if (await objectExists(key)) {
    return { file, status: "skipped" };
  }

  const body = await readFile(join(SOURCE_DIR, file));

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return { file, status: "uploaded" };
}

async function main() {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error("Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY env vars");
    process.exit(1);
  }

  const entries = await readdir(SOURCE_DIR);
  const files = [];
  for (const entry of entries) {
    const s = await stat(join(SOURCE_DIR, entry));
    if (s.isFile()) files.push(entry);
  }

  console.log(`Found ${files.length} files to upload`);

  let uploaded = 0, skipped = 0, failed = 0;
  const failures = [];
  const startTime = Date.now();

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(batch.map(uploadFile));

    for (const r of results) {
      if (r.status === "fulfilled") {
        if (r.value.status === "uploaded") uploaded++;
        else skipped++;
      } else {
        failed++;
        failures.push(r.reason?.message || "unknown");
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const total = uploaded + skipped + failed;
    console.log(`[${elapsed}s] ${total}/${files.length} (${uploaded} uploaded, ${skipped} skipped, ${failed} failed)`);
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nDone in ${totalTime}s: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`);

  if (failures.length > 0) {
    console.log("\nFailures:");
    failures.slice(0, 20).forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch(console.error);
