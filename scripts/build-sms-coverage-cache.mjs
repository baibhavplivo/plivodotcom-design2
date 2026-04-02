import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, "src/data/sms-coverage-cache.ts");
const PAGE_URL = "https://www.plivo.com/sms/coverage/";

const CONTINENT_ID_BY_LABEL = {
  "North America": "north-america",
  "South America": "south-america",
  Europe: "europe",
  Asia: "asia",
  Africa: "africa",
  Oceania: "oceania",
};

function normalizeWhitespace(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function isoToFlag(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function uniqueByCode(countries) {
  const seen = new Set();
  return countries.filter((country) => {
    if (seen.has(country.code)) return false;
    seen.add(country.code);
    return true;
  });
}

function serializeObject(value, indent = 0) {
  const spacing = "  ".repeat(indent);
  const nextSpacing = "  ".repeat(indent + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value
      .map((item) => `${nextSpacing}${serializeObject(item, indent + 1)}`)
      .join(",\n");
    return `[\n${items}\n${spacing}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const body = entries
      .map(
        ([key, entryValue]) =>
          `${nextSpacing}${key}: ${serializeObject(entryValue, indent + 1)}`,
      )
      .join(",\n");
    return `{\n${body}\n${spacing}}`;
  }

  return JSON.stringify(value);
}

async function main() {
  const response = await fetch(PAGE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${PAGE_URL}: ${response.status}`);
  }

  const html = await response.text();
  const $ = load(html);

  const title =
    normalizeWhitespace($("title").first().text()).replace(/\s+\|\s+Plivo$/, "") ||
    "Global SMS API Coverage";
  const description =
    normalizeWhitespace($('meta[name="description"]').attr("content")) ||
    "Communicate with your customers in India and 190 other countries. Plivo's global SMS coverage is equal to its expansive feature set. Try it for free!";
  const eyebrow =
    normalizeWhitespace($(".section_hero .text-color-grey-600").first().text()) ||
    "Messaging Platform";
  const heading =
    normalizeWhitespace($(".section_hero h1").first().text()) ||
    "Guaranteed Global SMS Delivery";
  const subheading =
    normalizeWhitespace($(".section_hero .hero_para").first().text()) ||
    "Reach your customers across any country in the world";

  const statValues = $(".section_hero .hero-stat_block-v2")
    .map((_, element) => ({
      value: normalizeWhitespace($(element).find(".hero-stat_title").text()),
      label: normalizeWhitespace($(element).find(".hero-stat_para").text()),
    }))
    .get()
    .filter((item) => item.value && item.label);

  const countries = uniqueByCode(
    $("div[continent_countries-item][role='listitem']")
      .map((_, element) => {
        const entry = $(element);
        const name = normalizeWhitespace(entry.find(".country_name").text());
        const code = normalizeWhitespace(entry.attr("iso")).toUpperCase();
        const continentLabel = normalizeWhitespace(entry.attr("continent"));
        const continent = CONTINENT_ID_BY_LABEL[continentLabel];
        const deliveryType =
          normalizeWhitespace(entry.attr("delivery-type")) || "Inbound & Outbound";

        if (!name || !code || !continent) {
          return null;
        }

        return {
          name,
          code,
          flag: isoToFlag(code),
          continent,
          outbound: true,
          inbound: deliveryType === "Inbound Only",
          deliveryType,
        };
      })
      .get()
      .filter(Boolean),
  );

  const fileContents = `/**
 * SMS coverage cache generated from the live Plivo coverage page.
 * Source: ${PAGE_URL}
 * Generated: ${new Date().toISOString().slice(0, 10)} | Countries: ${countries.length}
 */

export type SmsCoverageContinent =
  | "north-america"
  | "south-america"
  | "europe"
  | "asia"
  | "africa"
  | "oceania";

export type SmsCoverageDeliveryType = "Inbound & Outbound" | "Inbound Only";

export interface SmsCoverageCountry {
  name: string;
  code: string;
  flag: string;
  continent: SmsCoverageContinent;
  outbound: boolean;
  inbound: boolean;
  deliveryType: SmsCoverageDeliveryType;
}

export const SMS_COVERAGE_PAGE_META = ${serializeObject({
    title,
    description,
    eyebrow,
    heading,
    subheading,
    stats: statValues,
  })};

export const SMS_COVERAGE_PRIORITY_COUNTRY_CODES = ["US", "IN", "CA", "GB", "AU"] as const;

export const SMS_COVERAGE_CONTINENT_LABELS: Record<SmsCoverageContinent, string> = {
  "north-america": "North America",
  "south-america": "South America",
  europe: "Europe",
  asia: "Asia",
  africa: "Africa",
  oceania: "Oceania",
};

export const SMS_COVERAGE_CONTINENT_ORDER: SmsCoverageContinent[] = [
  "north-america",
  "south-america",
  "europe",
  "asia",
  "africa",
  "oceania",
];

export const SMS_COVERAGE_COUNTRIES: SmsCoverageCountry[] = ${serializeObject(countries)};

export const SMS_COVERAGE_COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  SMS_COVERAGE_COUNTRIES.map((country) => [country.code, country.name]),
);
`;

  await fs.writeFile(OUTPUT_FILE, fileContents);
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
