import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, "src/data/phone-number-pricing-cache.ts");

const PAGE_URL = "https://www.plivo.com/virtual-phone-numbers/pricing/us/";
const SITEMAP_URL = "https://www.plivo.com/sitemap.xml";
const COUNTRY_ISOS_URL = "https://api.plivo.com/v1/Internal/CountryISOs/";
const COUNTRY_PRICING_URL =
  "https://api.plivo.com/v1/Internal/CountryPricing/?country=";
const REFERER = "https://www.plivo.com/";
const REQUEST_HEADERS = { Referer: REFERER };
const CONCURRENCY = 8;
const INDIA_RATE_NOTE_URL =
  "https://support.plivo.com/hc/en-us/articles/16859884362265";

const DISPLAY_TYPE_BY_API_TYPE = {
  Local: "Local Numbers",
  Mobile: "Mobile Numbers",
  National: "National Numbers",
  Tollfree: "Toll-Free Numbers",
};

const TYPE_ORDER = ["Local", "Mobile", "National", "Tollfree"];

function parseHtmlEntities(value) {
  return String(value || "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripTags(value) {
  return parseHtmlEntities(String(value || ""))
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHref(value) {
  const match = String(value || "").match(/href=['"]([^'"]+)['"]/i);
  return match?.[1] || undefined;
}

function extractConstObject(html, constName) {
  const startToken = `const ${constName} = {`;
  const startIndex = html.indexOf(startToken);
  if (startIndex === -1) {
    throw new Error(`Could not locate ${constName} in live page`);
  }

  const braceStart = html.indexOf("{", startIndex);
  let depth = 0;
  let endIndex = -1;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let index = braceStart; index < html.length; index += 1) {
    const char = html[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (inSingle) {
      if (char === "'") inSingle = false;
      continue;
    }

    if (inDouble) {
      if (char === '"') inDouble = false;
      continue;
    }

    if (inTemplate) {
      if (char === "`") inTemplate = false;
      continue;
    }

    if (char === "'") {
      inSingle = true;
      continue;
    }

    if (char === '"') {
      inDouble = true;
      continue;
    }

    if (char === "`") {
      inTemplate = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        endIndex = index;
        break;
      }
    }
  }

  if (endIndex === -1) {
    throw new Error(`Could not parse ${constName} object`);
  }

  const objectSource = html.slice(braceStart, endIndex + 1);
  return vm.runInNewContext(`(${objectSource})`);
}

function unique(array) {
  return [...new Set(array)];
}

function buildCapabilities(capabilities) {
  const raw = unique(
    (Array.isArray(capabilities) ? capabilities : [])
      .map((capability) => String(capability || "").toLowerCase().trim())
      .filter(Boolean),
  );

  const output = [];

  if (raw.includes("voice")) output.push("Voice");
  if (raw.includes("sms")) output.push("SMS");
  if (raw.includes("mms")) output.push("MMS");
  if (raw.includes("sip_trunking") || raw.includes("sip trunking") || raw.includes("voice")) {
    output.push("SIP Trunking");
  }

  return unique(output);
}

function formatMoneyValue(code, value, options = {}) {
  const { stripWhole = false } = options;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return String(value || "");

  const currency = code === "IN" ? "₹" : "$";
  const formatted =
    stripWhole && Number.isInteger(amount)
      ? amount.toLocaleString("en-US")
      : amount.toFixed(2);

  return `${currency}${formatted}`;
}

function formatMonthlyPrice(code, price) {
  if (typeof price === "string") {
    const normalized = price.replaceAll("Ã¢â€šÂ¹", "₹").trim();
    if (normalized.startsWith("$") || normalized.startsWith("₹")) {
      return normalized.includes("/month") ? normalized : `${normalized}/month`;
    }

    const numeric = Number.parseFloat(normalized);
    if (Number.isFinite(numeric)) {
      return `${formatMoneyValue(code, numeric)}/month`;
    }

    return normalized;
  }

  return `${formatMoneyValue(code, price)}/month`;
}

function formatShortCodePrice(code, price, cycle) {
  const base =
    typeof price === "string"
      ? price.replaceAll("Ã¢â€šÂ¹", "₹")
      : `${formatMoneyValue(code, price, { stripWhole: true })}/month`;

  return cycle ? `${base} ${cycle}` : base;
}

function parsePriceNumber(price) {
  const match = String(price || "").replaceAll(",", "").match(/([\d.]+)/);
  return match ? Number.parseFloat(match[1]) : 0;
}

function buildRegularNumbers(code, apiData, hardcodedRates) {
  const hardcoded = hardcodedRates[code];
  if (hardcoded) {
    return TYPE_ORDER.filter((type) => hardcoded[type.toLowerCase()])
      .map((type) => {
        const entry = hardcoded[type.toLowerCase()];
        return {
          type: DISPLAY_TYPE_BY_API_TYPE[type],
          price: formatMonthlyPrice(code, entry.price),
          capabilities: buildCapabilities(entry.capablity),
        };
      });
  }

  const grouped = {};
  const phoneNumbers = Array.isArray(apiData.phone_numbers)
    ? apiData.phone_numbers
    : [];

  phoneNumbers
    .filter((item) => item.number_type !== "Shortcode" && item.rental_rate != null)
    .sort((left, right) => Number(right.rental_rate) - Number(left.rental_rate))
    .forEach((item) => {
      const apiType = String(item.number_type || "").trim();
      if (!TYPE_ORDER.includes(apiType)) return;

      const existing = grouped[apiType];
      grouped[apiType] = {
        price: Number(item.rental_rate),
        capabilities: buildCapabilities([
          ...(existing?.rawCapabilities || []),
          ...(Array.isArray(item.capabilities) ? item.capabilities : []),
        ]),
        rawCapabilities: [
          ...(existing?.rawCapabilities || []),
          ...(Array.isArray(item.capabilities) ? item.capabilities : []),
        ],
      };
    });

  return TYPE_ORDER.filter((type) => grouped[type]).map((type) => ({
    type: DISPLAY_TYPE_BY_API_TYPE[type],
    price: formatMonthlyPrice(code, grouped[type].price.toFixed(2)),
    capabilities: grouped[type].capabilities,
  }));
}

function buildShortCodes(code, shortcodePricing) {
  const entries = Array.isArray(shortcodePricing[code]) ? shortcodePricing[code] : [];
  const shortCodes = [];
  let shortCodeNote = null;
  let regularNote = null;

  for (const entry of entries) {
    const key = String(entry.key || "");
    const cycle = entry?.value?.cycle || "";
    const capabilities = buildCapabilities(entry?.value?.capablity || []);

    if (!key.includes("Short Code")) {
      if (entry.setupFees) {
        regularNote = {
          text: stripTags(entry.setupFees),
          href: extractHref(entry.setupFees),
        };
      }
      continue;
    }

    if (entry.setupFees) {
      shortCodeNote = {
        text: stripTags(entry.setupFees),
      };
    }

    let type = "Short Code*";
    if (key.includes("Regular")) type = "Regular";
    if (key.includes("Vanity")) type = "Vanity";

    shortCodes.push({
      type,
      price: formatShortCodePrice(code, entry?.value?.price, cycle),
      capabilities,
    });
  }

  if (code === "IN" && !regularNote) {
    regularNote = {
      text: "Rate for Domestic Calling",
      href: INDIA_RATE_NOTE_URL,
    };
  }

  return { shortCodes, shortCodeNote, regularNote };
}

function buildRequirements(code, requirementsData) {
  const requirements = requirementsData[code];
  if (!requirements) return [];

  const rows = [];
  if (requirements.local) {
    rows.push({ label: "Local Numbers", detail: requirements.local });
  }
  if (requirements.mobile) {
    rows.push({ label: "Mobile Numbers", detail: requirements.mobile });
  }
  if (requirements.tollfree) {
    rows.push({ label: "Toll-Free Numbers", detail: requirements.tollfree });
  }

  return rows;
}

function buildCalculator(code, countryName, calculatorByCountryName) {
  const entry = calculatorByCountryName[countryName];
  if (!entry) return null;

  return {
    local: Number(entry.local || 0),
    mobile: Number(entry.mobile || 0),
    national: Number(entry.national || 0),
    shortcode: Number(entry.shortcode || 0),
    tollfree: Number(entry.tollfree || 0),
    currency: code === "IN" ? "₹" : "$",
  };
}

function buildEntry(
  code,
  countryNames,
  apiData,
  shortcodePricing,
  requirementsData,
  hardcodedRates,
  calculatorByCountryName,
) {
  const countryName = countryNames[code] || apiData.country || code;
  const { shortCodes, shortCodeNote, regularNote } = buildShortCodes(
    code,
    shortcodePricing,
  );

  return {
    name: countryName,
    regularNumbers: buildRegularNumbers(code, apiData, hardcodedRates),
    regularNote,
    shortCodes,
    shortCodeNote,
    compliance: buildRequirements(code, requirementsData),
    calculator: buildCalculator(code, countryName, calculatorByCountryName),
  };
}

async function fetchJson(url) {
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: REQUEST_HEADERS });
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const json = await response.json();
      if (json?.error === "Access Denied") {
        return {};
      }

      return json;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 300));
    }
  }

  throw lastError;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: REQUEST_HEADERS });
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return response.text();
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (true) {
      const nextIndex = currentIndex;
      currentIndex += 1;

      if (nextIndex >= items.length) return;
      results[nextIndex] = await mapper(items[nextIndex], nextIndex);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => worker(),
  );

  await Promise.all(workers);
  return results;
}

function buildFile(codes, countryNames, entries) {
  return `// AUTO-GENERATED — do not edit manually.
// Generated by scripts/build-phone-number-pricing-cache.mjs on ${new Date()
    .toISOString()
    .slice(0, 10)}

export interface PhoneNumberPricingNote {
  text: string;
  href?: string;
}

export interface PhoneNumberPricingRow {
  type: string;
  price: string;
  capabilities: string[];
}

export interface PhoneNumberComplianceRow {
  label: string;
  detail: string;
}

export interface PhoneNumberCalculatorData {
  local: number;
  mobile: number;
  national: number;
  shortcode: number;
  tollfree: number;
  currency: string;
}

export interface PhoneNumberPricingCountryData {
  name: string;
  regularNumbers: PhoneNumberPricingRow[];
  regularNote: PhoneNumberPricingNote | null;
  shortCodes: PhoneNumberPricingRow[];
  shortCodeNote: PhoneNumberPricingNote | null;
  compliance: PhoneNumberComplianceRow[];
  calculator: PhoneNumberCalculatorData | null;
}

export const PHONE_NUMBER_PRICING_COUNTRY_CODES = ${JSON.stringify(codes, null, 2)} as const;

export const PHONE_NUMBER_PRICING_COUNTRY_NAMES: Record<string, string> = ${JSON.stringify(
    countryNames,
    null,
    2,
  )};

export const PHONE_NUMBER_PRICING_CACHE: Record<string, PhoneNumberPricingCountryData> = ${JSON.stringify(
    entries,
    null,
    2,
  )};
`;
}

async function main() {
  const [pageHtml, sitemap, countryIsos] = await Promise.all([
    fetchText(PAGE_URL),
    fetchText(SITEMAP_URL),
    fetchJson(COUNTRY_ISOS_URL),
  ]);

  delete countryIsos.api_id;

  const liveCodes = [...sitemap.matchAll(/https:\/\/www\.plivo\.com\/virtual-phone-numbers\/pricing\/([a-z]{2})\//g)]
    .map((match) => match[1].toUpperCase())
    .filter((code, index, array) => array.indexOf(code) === index)
    .sort();

  const calculatorByCountryName = extractConstObject(pageHtml, "PHONE_PRICING");
  const shortcodePricing = extractConstObject(pageHtml, "shortcodePricing");
  const requirementsData = extractConstObject(pageHtml, "REQUIREMENTS_DATA");
  const hardcodedRates = extractConstObject(pageHtml, "HARDCODED_PHONE_RATES");

  const entries = {};
  const failures = [];

  await mapWithConcurrency(liveCodes, CONCURRENCY, async (code) => {
    try {
      const apiData = await fetchJson(`${COUNTRY_PRICING_URL}${code}`);
      entries[code] = buildEntry(
        code,
        countryIsos,
        apiData,
        shortcodePricing,
        requirementsData,
        hardcodedRates,
        calculatorByCountryName,
      );
    } catch (error) {
      failures.push({
        code,
        message: error instanceof Error ? error.message : String(error),
      });
      entries[code] = buildEntry(
        code,
        countryIsos,
        {},
        shortcodePricing,
        requirementsData,
        hardcodedRates,
        calculatorByCountryName,
      );
    }
  });

  const orderedNames = Object.fromEntries(
    liveCodes.map((code) => [code, countryIsos[code] || code]),
  );
  const orderedEntries = Object.fromEntries(
    liveCodes.map((code) => [code, entries[code]]),
  );

  await fs.writeFile(
    OUTPUT_FILE,
    buildFile(liveCodes, orderedNames, orderedEntries),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        countryCount: liveCodes.length,
        calculatorCountryCount: Object.keys(calculatorByCountryName).length,
        outputFile: path.relative(ROOT, OUTPUT_FILE),
        failures,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
