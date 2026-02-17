/**
 * Blog Migration Script
 * Converts Webflow CSV export (743 blog posts) into Astro content collection .md files.
 *
 * Usage: node scripts/migrate-blog.mjs
 *
 * Dependencies: csv-parse, cheerio (install as dev deps)
 */

import { createReadStream } from "fs";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import { join } from "path";
import { parse } from "csv-parse";
import * as cheerio from "cheerio";

// ── Config ──────────────────────────────────────────────────────────────────
const CSV_PATH =
  "/Users/baibhavparida/Downloads/Blogs/Plivo - Blog Posts - 657aab285c0bbca529c6df35.csv";
const OUTPUT_DIR = join(
  import.meta.dirname,
  "..",
  "src",
  "content",
  "blog"
);
const CATEGORIES_OUTPUT = join(
  import.meta.dirname,
  "..",
  "src",
  "data",
  "blog-categories.ts"
);

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Parse Webflow date string → ISO string, or null */
function parseDate(dateStr) {
  if (!dateStr || dateStr.trim() === "") return null;
  // Remove the "(Coordinated Universal Time)" suffix
  const cleaned = dateStr.replace(/\s*\(.*\)\s*$/, "").trim();
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) {
    console.warn(`  ⚠ Could not parse date: "${dateStr}"`);
    return null;
  }
  return d.toISOString();
}

/** Clean HTML body content */
function cleanHtml(html) {
  if (!html || html.trim() === "") return "";

  const $ = cheerio.load(html, { decodeEntities: false });

  // 1. Strip <script> tags entirely
  $("script").remove();

  // 2. Remove empty id="" attributes
  $("[id]").each((_, el) => {
    const id = $(el).attr("id");
    if (id === "" || id === undefined) {
      $(el).removeAttr("id");
    }
  });

  // 3. Unwrap data-rt-embed-type divs (keep inner content)
  $("div[data-rt-embed-type]").each((_, el) => {
    $(el).replaceWith($(el).html());
  });

  // 4. Remove Webflow-specific w-richtext classes from figures (they add no value)
  $("figure").each((_, el) => {
    $(el).removeAttr("class");
    $(el).removeAttr("data-rt-type");
    $(el).removeAttr("data-rt-align");
  });

  // Return the cleaned body HTML
  return $("body").html().trim();
}

/** Escape a string for YAML double-quoted scalar */
function yamlEscape(str) {
  if (str === null || str === undefined) return '""';
  // Replace backslashes first, then double quotes
  return (
    '"' +
    str
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t") +
    '"'
  );
}

/** Convert a category slug to a display name */
function slugToDisplayName(slug) {
  return slug
    .split("-")
    .map((word) => {
      // Keep known acronyms uppercase
      const acronyms = [
        "ai",
        "sms",
        "api",
        "ivr",
        "sip",
        "cx",
        "rcs",
        "cpaas",
        "ucaas",
        "ccaas",
        "voip",
      ];
      if (acronyms.includes(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/** Parse boolean from CSV string */
function parseBool(val) {
  return val?.toLowerCase?.() === "true";
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔄 Starting blog migration...\n");

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Delete existing placeholder posts
  const existingFiles = await readdir(OUTPUT_DIR);
  for (const file of existingFiles) {
    if (file.startsWith("post-") && (file.endsWith(".md") || file.endsWith(".mdx"))) {
      await unlink(join(OUTPUT_DIR, file));
      console.log(`  🗑 Deleted placeholder: ${file}`);
    }
  }

  // Parse CSV
  const records = await new Promise((resolve, reject) => {
    const rows = [];
    createReadStream(CSV_PATH, { encoding: "utf-8" })
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          relax_column_count: true,
          relax_quotes: true,
        })
      )
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });

  console.log(`\n📊 Parsed ${records.length} rows from CSV\n`);

  // Track stats
  let created = 0;
  let skippedDraft = 0;
  let skippedArchived = 0;
  let skippedNoSlug = 0;
  let errors = 0;
  const allCategories = new Set();
  const slugsSeen = new Set();

  for (const row of records) {
    const slug = (row["Slug"] || "").trim();
    const isDraft = parseBool(row["Draft"]);
    const isArchived = parseBool(row["Archived"]);

    // Skip posts without slugs
    if (!slug) {
      skippedNoSlug++;
      continue;
    }

    // Skip archived posts entirely
    if (isArchived) {
      skippedArchived++;
      continue;
    }

    // Skip drafts
    if (isDraft) {
      skippedDraft++;
      console.log(`  📝 Skipped draft: ${slug}`);
      continue;
    }

    // Check for duplicate slugs
    if (slugsSeen.has(slug)) {
      console.warn(`  ⚠ Duplicate slug skipped: ${slug}`);
      errors++;
      continue;
    }
    slugsSeen.add(slug);

    try {
      // Parse fields
      const title = (row["Name"] || "").trim();
      const description = (row["[SEO] Meta Description"] || "").trim();
      const seoTitle = (row["[SEO] Meta Title"] || "").trim();
      const mainImage = (row["Main Image"] || "").trim();
      const thumbnail = (row["Thumbnail image"] || "").trim();
      const featured = parseBool(row["Featured?"]);
      const noindex = parseBool(row["Noindex"]);
      const keyTakeaways = (row["Key takeaways"] || "").trim();
      const heroCTA = (row["Hero CTA text"] || "").trim();
      const breadcrumb = (row["Breadcrumb keyword"] || "").trim();
      const itemId = (row["Item ID"] || "").trim();
      const postBody = (row["Post Body"] || "").trim();

      // Parse dates
      const pubDate = parseDate(row["Blog Published Date"]);
      const updatedDate = parseDate(row["Updated On"]);

      if (!pubDate) {
        console.warn(`  ⚠ No publish date for: ${slug}, using Created On`);
      }
      const finalPubDate = pubDate || parseDate(row["Created On"]) || new Date().toISOString();

      // Parse categories
      const categoriesRaw = (row["Categories"] || "").trim();
      const categories = categoriesRaw
        ? categoriesRaw
            .split(";")
            .map((c) => c.trim())
            .filter((c) => c.length > 0)
        : [];

      // Track all categories
      categories.forEach((c) => allCategories.add(c));

      // Clean the HTML body
      const cleanedBody = cleanHtml(postBody);

      // Build frontmatter
      const frontmatter = [
        "---",
        `title: ${yamlEscape(title)}`,
        `description: ${yamlEscape(description || title)}`,
        `pubDate: ${yamlEscape(finalPubDate)}`,
      ];

      if (updatedDate) {
        frontmatter.push(`updatedDate: ${yamlEscape(updatedDate)}`);
      }

      if (mainImage) {
        frontmatter.push(`image: ${yamlEscape(mainImage)}`);
      }

      if (thumbnail) {
        frontmatter.push(`thumbnail: ${yamlEscape(thumbnail)}`);
      }

      frontmatter.push(`authorName: "Team Plivo"`);
      frontmatter.push(`featured: ${featured}`);
      frontmatter.push(`noindex: ${noindex}`);

      if (categories.length > 0) {
        frontmatter.push(`categories: [${categories.map((c) => yamlEscape(c)).join(", ")}]`);
      } else {
        frontmatter.push(`categories: []`);
      }

      if (seoTitle) {
        frontmatter.push(`seoTitle: ${yamlEscape(seoTitle)}`);
      }

      if (keyTakeaways) {
        frontmatter.push(`keyTakeaways: ${yamlEscape(keyTakeaways)}`);
      }

      if (itemId) {
        frontmatter.push(`webflowItemId: ${yamlEscape(itemId)}`);
      }

      frontmatter.push("---");
      frontmatter.push("");

      // Combine frontmatter + body
      const fileContent = frontmatter.join("\n") + cleanedBody + "\n";

      // Write file
      const filePath = join(OUTPUT_DIR, `${slug}.md`);
      await writeFile(filePath, fileContent, "utf-8");
      created++;

      if (created % 50 === 0) {
        console.log(`  ✅ Created ${created} posts...`);
      }
    } catch (err) {
      console.error(`  ❌ Error processing "${slug}": ${err.message}`);
      errors++;
    }
  }

  console.log(`\n✅ Created ${created} blog posts`);
  console.log(`📝 Skipped ${skippedDraft} drafts`);
  console.log(`📦 Skipped ${skippedArchived} archived`);
  console.log(`🔗 Skipped ${skippedNoSlug} without slug`);
  console.log(`❌ ${errors} errors`);
  console.log(`🏷️  ${allCategories.size} unique categories\n`);

  // Generate categories data file
  const sortedCategories = [...allCategories].sort();
  const categoriesTs = [
    "// Auto-generated by scripts/migrate-blog.mjs",
    "// Maps category slugs to display names",
    "",
    "export const BLOG_CATEGORIES: Record<string, string> = {",
    ...sortedCategories.map(
      (slug) => `  "${slug}": "${slugToDisplayName(slug)}",`
    ),
    "};",
    "",
    "export const CATEGORY_SLUGS = Object.keys(BLOG_CATEGORIES);",
    "",
  ];

  // Ensure data directory exists
  await mkdir(join(import.meta.dirname, "..", "src", "data"), { recursive: true });
  await writeFile(CATEGORIES_OUTPUT, categoriesTs.join("\n"), "utf-8");
  console.log(`📁 Generated categories file: src/data/blog-categories.ts`);
  console.log(`   ${sortedCategories.length} categories mapped\n`);

  console.log("🎉 Migration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
