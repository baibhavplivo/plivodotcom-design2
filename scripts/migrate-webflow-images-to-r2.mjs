#!/usr/bin/env node
/**
 * Download Webflow-hosted blog images, upload to R2, and update markdown refs.
 *
 * Usage:
 *   R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=yyy node scripts/migrate-webflow-images-to-r2.mjs
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile, writeFile } from "fs/promises";
import { extname, join } from "path";

const ACCOUNT_ID = "e3740b343696a1485ad723c926c0b687";
const BLOG_DIR = "src/content/blog";
const BUCKET = "plivo-blog-images";
const CONCURRENCY = 10;

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

// Regex to match Webflow URLs
const WEBFLOW_URL_REGEX = /https:\/\/uploads-ssl\.webflow\.com\/[^\s"')]+/g;

async function downloadBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function extractFilename(url) {
  // URL like: https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657d5f58ffd0b1429fc7de6c_Blog_why_transcribe_calls.svg
  // Extract: 657d5f58ffd0b1429fc7de6c_Blog_why_transcribe_calls.svg
  const parts = url.split("/");
  let filename = parts[parts.length - 1];
  // Decode percent-encoded characters
  filename = decodeURIComponent(filename);
  // Sanitize for filesystem
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  return filename;
}

async function main() {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error("Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY env vars");
    process.exit(1);
  }

  // Step 1: Scan all blog markdown files for Webflow URLs
  const mdFiles = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  console.log(`Scanning ${mdFiles.length} blog files for Webflow URLs...`);

  const urlMap = new Map(); // webflow URL -> local filename
  const fileUrls = new Map(); // file -> [urls found]

  for (const file of mdFiles) {
    const content = await readFile(join(BLOG_DIR, file), "utf-8");
    const matches = content.match(WEBFLOW_URL_REGEX);
    if (matches) {
      fileUrls.set(file, [...new Set(matches)]);
      for (const url of matches) {
        if (!urlMap.has(url)) {
          urlMap.set(url, extractFilename(url));
        }
      }
    }
  }

  const uniqueUrls = [...urlMap.entries()];
  console.log(`Found ${uniqueUrls.length} unique Webflow URLs across ${fileUrls.size} files`);

  // Step 2: Download and upload to R2 in one pass
  console.log("\nDownloading + uploading to R2...");
  let uploaded = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < uniqueUrls.length; i += CONCURRENCY) {
    const batch = uniqueUrls.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async ([url, filename]) => {
        const buffer = await downloadBuffer(url);
        const ext = extname(filename).toLowerCase();
        const contentType = MIME_MAP[ext] || "application/octet-stream";
        const key = `images/blog/${filename}`;

        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: buffer,
            ContentType: contentType,
            CacheControl: "public, max-age=31536000, immutable",
          })
        );
        return { url, filename };
      })
    );

    for (const r of results) {
      if (r.status === "fulfilled") {
        uploaded++;
      } else {
        failed++;
        failures.push(r.reason?.message || "unknown");
      }
    }
    console.log(`  Progress: ${uploaded + failed}/${uniqueUrls.length} (${uploaded} ok, ${failed} failed)`);
  }

  // Step 3: Update markdown files
  console.log("\nUpdating markdown files...");
  let filesUpdated = 0;
  let refsUpdated = 0;

  for (const [file, urls] of fileUrls) {
    const filePath = join(BLOG_DIR, file);
    let content = await readFile(filePath, "utf-8");
    let changed = false;

    for (const url of urls) {
      const filename = urlMap.get(url);
      const newPath = `/images/blog/${filename}`;
      const before = content;
      content = content.replaceAll(url, newPath);
      if (content !== before) {
        changed = true;
        refsUpdated += (before.match(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
      }
    }

    if (changed) {
      await writeFile(filePath, content, "utf-8");
      filesUpdated++;
    }
  }

  console.log(`\nDone!`);
  console.log(`  Images uploaded to R2: ${uploaded} (${failed} failed)`);
  console.log(`  Markdown files updated: ${filesUpdated}`);
  console.log(`  Total references updated: ${refsUpdated}`);

  if (failures.length > 0) {
    console.log("\nFailures:");
    failures.slice(0, 20).forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch(console.error);
