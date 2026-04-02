import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const COVERAGE_FILE = path.join(ROOT, "src/data/sip-coverage-data.ts");
const OUTPUT_FILE = path.join(ROOT, "src/data/sip-pricing-page.ts");
const CACHE_DIR = path.join(ROOT, "tmp", "sip-pricing-api-cache");

const LIVE_PAGE_URL = "https://www.plivo.com/sip-trunking/pricing/in/";
const COUNTRY_ISOS_URL = "https://api.plivo.com/v1/Internal/CountryISOs/";
const COUNTRY_PRICING_URL =
  "https://api.plivo.com/v1/Internal/CountryPricing/?country=";
const SIP_INBOUND_URL =
  "https://prod-routing-central-pub.zt.plivo.com/api/v1/zt/pricing/inbound?&country=";
const SIP_OUTBOUND_URL =
  "https://prod-routing-central-pub.zt.plivo.com/api/v1/zt/pricing?&country=";
const REQUEST_HEADERS = {
  Accept: "application/json, text/plain, */*",
  Origin: "https://www.plivo.com",
  Referer: "https://www.plivo.com/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
};
const REQUEST_DELAY_MS = 250;

const PRIORITY_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

const BILLING_NOTE =
  "Billing interval for the US and Canada is 6/6, Brazil is 30/30 and for all major international destinations is 1/1. Some international destinations may be at 60/60.";
const PHONE_NUMBER_NOTE =
  "**All short codes have a $1,500 one-time fee charged at the time of purchase.";
const VOLUME_CTA_TITLE =
  "Get volume discounts on committed spends as you scale your usage.";

function normalizeNumber(value) {
  if (value == null || value === "" || value === "NA") return null;
  const parsed =
    typeof value === "number"
      ? value
      : Number.parseFloat(String(value).replace(/\$/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatUsd(value, unit, decimals = 4) {
  const amount = normalizeNumber(value);
  if (amount == null || amount < 0) return "Not Supported";
  return `$${amount.toFixed(decimals)}/${unit}`;
}

function formatUsdNumber(value, decimals = 2) {
  const amount = normalizeNumber(value);
  if (amount == null || amount < 0) return null;
  return `$${amount.toFixed(decimals)}/month`;
}

function getFirstRate(value) {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function parseSupportedCountryCodes(fileContents) {
  const matches = fileContents.matchAll(
    /pricingPath": "\/sip-trunking\/pricing\/([a-z]{2})\/"/g,
  );
  return [...new Set([...matches].map((match) => match[1].toUpperCase()))];
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((character) => 127397 + character.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

function parseCoverageCountries(fileContents) {
  const match = fileContents.match(
    /export const SIP_COVERAGE_COUNTRIES: SIPCoverageCountry\[] = (\[[\s\S]*?\n\] as SIPCoverageCountry\[]);/,
  );
  if (!match) {
    throw new Error("Unable to locate SIP_COVERAGE_COUNTRIES");
  }

  // Trusted source: checked-in generated coverage data.
  return new Function(
    `return ${match[1].replace(/ as SIPCoverageCountry\[\]$/, "")};`,
  )();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCachePath(cacheKey) {
  return path.join(CACHE_DIR, `${cacheKey}.json`);
}

async function readCachedJson(cacheKey) {
  try {
    const contents = await fs.readFile(getCachePath(cacheKey), "utf8");
    return JSON.parse(contents);
  } catch {
    return null;
  }
}

async function writeCachedJson(cacheKey, value) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(getCachePath(cacheKey), JSON.stringify(value, null, 2));
}

async function fetchJson(url, cacheKey) {
  const cached = cacheKey ? await readCachedJson(cacheKey) : null;
  if (cached) return cached;

  let lastError = null;

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      const response = await fetch(url, { headers: REQUEST_HEADERS });
      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = Number.parseInt(
            response.headers.get("retry-after") || "",
            10,
          );
          const waitMs = Number.isFinite(retryAfter)
            ? retryAfter * 1000
            : Math.min(30000, attempt * 2000);
          await sleep(waitMs);
          continue;
        }

        throw new Error(`Request failed with ${response.status}`);
      }

      const json = await response.json();
      if (json?.error === "Access Denied") {
        throw new Error("Access Denied");
      }

      if (cacheKey) {
        await writeCachedJson(cacheKey, json);
      }

      await sleep(REQUEST_DELAY_MS);
      return json;
    } catch (error) {
      lastError = error;
      await sleep(Math.min(30000, attempt * 1500));
    }
  }

  throw lastError;
}

async function parseCalculatorRates() {
  const html = await fetch(LIVE_PAGE_URL, { headers: REQUEST_HEADERS }).then(
    (response) => response.text(),
  );
  const match = html.match(/var SIP_PRICING = \{([\s\S]*?)\n\};/);
  if (!match) {
    throw new Error("Unable to locate live SIP_PRICING object");
  }

  // Trusted source: official Plivo page script.
  return new Function(`return ({${match[1]}});`)();
}

function getCoverageValue(coverageCountry, key, direction) {
  const row = coverageCountry?.pricingRows?.find(
    (pricingRow) => pricingRow.key === key,
  );
  return row?.[direction]?.value || null;
}

function preferCoverage(apiValue, coverageValue) {
  if (
    (apiValue == null || apiValue === "Not Supported") &&
    coverageValue &&
    coverageValue !== "Not Supported"
  ) {
    return coverageValue;
  }

  return apiValue || coverageValue || "Not Supported";
}

function buildCallRows(code, coverageCountry, inbound, outbound) {
  if (code === "IN") {
    return [
      {
        label: "Local Numbers",
        outbound: "₹0.74/min",
        inbound: "₹0.74/min",
        startsAt: false,
        showDetailedPricingLink: false,
      },
      {
        label: "Toll-Free Numbers",
        outbound: "Not Supported",
        inbound: "₹1.30/min",
        startsAt: false,
        showDetailedPricingLink: false,
      },
    ];
  }

  const rows = [];
  const inboundRates = inbound?.zentrunk?.inbound?.rates || {};
  const outboundRates = outbound?.zentrunk?.outbound?.rates || {};
  const networkGroupCount = Object.keys(
    outbound?.zentrunk?.outbound?.network_groups || {},
  ).length;

  if (
    inboundRates.local ||
    outboundRates.Fixed ||
    getCoverageValue(coverageCountry, "local", "outbound") ||
    getCoverageValue(coverageCountry, "local", "inbound")
  ) {
    rows.push({
      label: getCoverageValue(coverageCountry, "local", "outbound")
        ? coverageCountry.pricingRows.find((row) => row.key === "local").label
        : "Local Numbers",
      outbound: preferCoverage(
        formatUsd(getFirstRate(outboundRates.Fixed), "min"),
        getCoverageValue(coverageCountry, "local", "outbound"),
      ),
      inbound: preferCoverage(
        formatUsd(getFirstRate(inboundRates.local), "min"),
        getCoverageValue(coverageCountry, "local", "inbound"),
      ),
      startsAt: networkGroupCount > 1,
      showDetailedPricingLink: networkGroupCount > 0,
    });
  }

  if (
    inboundRates.mobile ||
    outboundRates.Mobile ||
    getCoverageValue(coverageCountry, "mobile", "outbound") ||
    getCoverageValue(coverageCountry, "mobile", "inbound")
  ) {
    rows.push({
      label: getCoverageValue(coverageCountry, "mobile", "outbound")
        ? coverageCountry.pricingRows.find((row) => row.key === "mobile").label
        : "Mobile Numbers",
      outbound: preferCoverage(
        formatUsd(getFirstRate(outboundRates.Mobile), "min"),
        getCoverageValue(coverageCountry, "mobile", "outbound"),
      ),
      inbound: preferCoverage(
        formatUsd(getFirstRate(inboundRates.mobile), "min"),
        getCoverageValue(coverageCountry, "mobile", "inbound"),
      ),
      startsAt: networkGroupCount > 1,
      showDetailedPricingLink: false,
    });
  }

  if (
    inboundRates.tollfree ||
    outboundRates.tollfree ||
    code === "CA" ||
    getCoverageValue(coverageCountry, "tollfree", "outbound") ||
    getCoverageValue(coverageCountry, "tollfree", "inbound")
  ) {
    const tollfreeOutbound =
      code === "CA" &&
      (!Array.isArray(outboundRates.tollfree) ||
        !outboundRates.tollfree[0] ||
        outboundRates.tollfree[0] === "NA")
        ? "$0.0010/min"
        : preferCoverage(
            formatUsd(getFirstRate(outboundRates.tollfree), "min"),
            getCoverageValue(coverageCountry, "tollfree", "outbound"),
          );

    rows.push({
      label: getCoverageValue(coverageCountry, "tollfree", "outbound")
        ? coverageCountry.pricingRows.find((row) => row.key === "tollfree").label
        : "Toll-Free Numbers",
      outbound: tollfreeOutbound,
      inbound: preferCoverage(
        formatUsd(getFirstRate(inboundRates.tollfree), "min"),
        getCoverageValue(coverageCountry, "tollfree", "inbound"),
      ),
      startsAt: false,
      showDetailedPricingLink: false,
    });
  }

  return rows;
}

function buildPhoneRows(code, countryPricing) {
  if (code === "IN") {
    return [{ label: "Local Numbers", price: "₹250/month" }];
  }

  const phoneNumbers = Array.isArray(countryPricing?.phone_numbers)
    ? countryPricing.phone_numbers
    : [];

  const byType = new Map();

  for (const phoneNumber of phoneNumbers) {
    const type = String(phoneNumber.number_type || "").toLowerCase();
    const status = String(phoneNumber.status || "").toLowerCase();
    const capabilities = Array.isArray(phoneNumber.capabilities)
      ? phoneNumber.capabilities.map((capability) =>
          String(capability || "").toLowerCase(),
        )
      : [];
    const rentalRate = normalizeNumber(phoneNumber.rental_rate);

    if (status === "preview") continue;
    if (!capabilities.includes("voice")) continue;
    if (rentalRate == null || rentalRate <= 0) continue;

    const labelByType = {
      local: "Local Numbers",
      mobile: "Mobile Numbers",
      national: "National Numbers",
      tollfree: "Toll-Free Numbers",
    };

    const label = labelByType[type];
    if (!label) continue;

    const existing = byType.get(label);
    if (!existing || rentalRate < existing.rate) {
      byType.set(label, { label, rate: rentalRate });
    }
  }

  const order = [
    "Local Numbers",
    "Mobile Numbers",
    "National Numbers",
    "Toll-Free Numbers",
  ];

  return order
    .map((label) => byType.get(label))
    .filter(Boolean)
    .map((entry) => ({
      label: entry.label,
      price: formatUsdNumber(entry.rate),
    }));
}

function buildAddOns(code, countryPricing) {
  const rows = [{ label: "Secure Trunking", price: "$0.0000/min" }];

  if (code !== "US") return rows;

  const localVoiceNumber = (countryPricing?.phone_numbers || []).find(
    (phoneNumber) =>
      String(phoneNumber.number_type || "").toLowerCase() === "local" &&
      Array.isArray(phoneNumber.capabilities) &&
      phoneNumber.capabilities
        .map((capability) => String(capability || "").toLowerCase())
        .includes("voice"),
  );

  const cnamLookupRate = normalizeNumber(localVoiceNumber?.cnam_lookup_rate);
  if (cnamLookupRate != null) {
    rows.push({
      label: "CNAM Lookup",
      price: `$${cnamLookupRate.toFixed(5)}/lookup`,
    });
  }

  return rows;
}

function buildNetworkRows(code, outbound) {
  if (code === "IN") {
    return [
      {
        label: "India All Networks from Plivo-IN numbers",
        price: "₹0.74/min",
      },
    ];
  }

  const groups = outbound?.zentrunk?.outbound?.network_groups || {};
  return Object.entries(groups).map(([label, rate]) => ({
    label,
    price: formatUsd(rate, "min"),
  }));
}

function buildCalculator(code, countryName, calculatorRates) {
  const liveRates = calculatorRates[countryName];
  if (!liveRates) return null;

  return {
    localRate: normalizeNumber(liveRates.local) ?? 0,
    tollfreeRate: normalizeNumber(liveRates.tollfree) ?? 0,
    currencySymbol: code === "IN" ? "₹" : "$",
  };
}

function buildCountryEntry(
  code,
  countryName,
  calculatorRates,
  coverageCountry,
  countryPricing,
  inbound,
  outbound,
) {
  return {
    name: countryName,
    code,
    callRows: buildCallRows(code, coverageCountry, inbound, outbound),
    phoneRows: buildPhoneRows(code, countryPricing),
    addOnRows: buildAddOns(code, countryPricing),
    networkRows: buildNetworkRows(code, outbound),
    calculator: buildCalculator(code, countryName, calculatorRates),
  };
}

async function fetchCountryPricingPayloads(code) {
  const [countryPricing, inbound, outbound] = await Promise.all([
    fetchJson(`${COUNTRY_PRICING_URL}${code}`, `${code}-country-pricing`).catch(
      (error) => {
        if (String(error).includes("404")) return null;
        throw error;
      },
    ),
    fetchJson(`${SIP_INBOUND_URL}${code}`, `${code}-sip-inbound`).catch(
      (error) => {
        if (String(error).includes("404")) return null;
        throw error;
      },
    ),
    fetchJson(`${SIP_OUTBOUND_URL}${code}`, `${code}-sip-outbound`).catch(
      (error) => {
        if (String(error).includes("404")) return null;
        throw error;
      },
    ),
  ]);

  return { countryPricing, inbound, outbound };
}

function buildFileContents(countryCodes, countryData) {
  const pricingCountries = countryCodes
    .map((code) => {
      const priorityCountry = PRIORITY_COUNTRIES.find(
        (country) => country.code === code,
      );

      return {
        code,
        name: countryData[code]?.name || code,
        flag: priorityCountry?.flag || getFlagEmoji(code),
        isPriority: Boolean(priorityCountry),
      };
    })
    .sort((left, right) => {
      const leftPriorityIndex = PRIORITY_COUNTRIES.findIndex(
        (country) => country.code === left.code,
      );
      const rightPriorityIndex = PRIORITY_COUNTRIES.findIndex(
        (country) => country.code === right.code,
      );

      if (leftPriorityIndex !== -1 && rightPriorityIndex !== -1) {
        return leftPriorityIndex - rightPriorityIndex;
      }
      if (leftPriorityIndex !== -1) return -1;
      if (rightPriorityIndex !== -1) return 1;
      return left.name.localeCompare(right.name);
    });

  return `export interface SIPPricingCallRow {
  label: string;
  outbound: string;
  inbound: string;
  startsAt: boolean;
  showDetailedPricingLink: boolean;
}

export interface SIPPricingPhoneRow {
  label: string;
  price: string | null;
}

export interface SIPPricingAddOnRow {
  label: string;
  price: string;
}

export interface SIPPricingNetworkRow {
  label: string;
  price: string;
}

export interface SIPPricingCalculator {
  localRate: number;
  tollfreeRate: number;
  currencySymbol: "$" | "₹";
}

export interface SIPPricingCountryOption {
  code: string;
  name: string;
  flag: string;
  isPriority: boolean;
}

export interface SIPPricingCountryData {
  name: string;
  code: string;
  callRows: SIPPricingCallRow[];
  phoneRows: SIPPricingPhoneRow[];
  addOnRows: SIPPricingAddOnRow[];
  networkRows: SIPPricingNetworkRow[];
  calculator: SIPPricingCalculator | null;
}

export const SIP_PRICING_SUPPORT_URL = "https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292";
export const SIP_PRICING_VOLUME_URL = "/contact/sales";
export const SIP_PRICING_VOICE_DETAILS_URL = "/voice/pricing/";

export const SIP_PRICING_PRIORITY_COUNTRIES: SIPPricingCountryOption[] = ${JSON.stringify(PRIORITY_COUNTRIES, null, 2)};

export const SIP_PRICING_COUNTRY_CODES = ${JSON.stringify(countryCodes, null, 2)} as const;

export const SIP_PRICING_COUNTRIES: SIPPricingCountryOption[] = ${JSON.stringify(pricingCountries, null, 2)};

export const SIP_PRICING_HERO = {
  title: "SIP Trunking Pricing",
  description:
    "Competitive pay-as-you-go SIP Trunking pricing with add-on features included.",
  volumeLinkLabel: "Contact Sales for Volume Discount",
  volumeLinkHref: "/contact/sales/",
} as const;

export const SIP_PRICING_BILLING_NOTE = ${JSON.stringify(BILLING_NOTE)};
export const SIP_PRICING_PHONE_NOTE = ${JSON.stringify(PHONE_NUMBER_NOTE)};

export const SIP_PRICING_VOLUME_CTA = {
  title: ${JSON.stringify(VOLUME_CTA_TITLE)},
  buttonLabel: "Get Volume Pricing",
  buttonHref: SIP_PRICING_VOLUME_URL,
} as const;

export const SIP_PRICING_DATA: Record<string, SIPPricingCountryData> = ${JSON.stringify(countryData, null, 2)};
`;
}

async function main() {
  const [coverageSource, countryNames, calculatorRates] = await Promise.all([
    fs.readFile(COVERAGE_FILE, "utf8"),
    fetchJson(COUNTRY_ISOS_URL, "country-isos"),
    parseCalculatorRates(),
  ]);

  const countryCodes = parseSupportedCountryCodes(coverageSource);
  const coverageCountries = parseCoverageCountries(coverageSource);
  const coverageMap = Object.fromEntries(
    coverageCountries.map((country) => [country.code, country]),
  );
  const entries = [];

  for (const [index, code] of countryCodes.entries()) {
    if (!process.env.QUIET) {
      console.log(`[${index + 1}/${countryCodes.length}] Fetching ${code}`);
    }
    const { countryPricing, inbound, outbound } =
      await fetchCountryPricingPayloads(code);

    entries.push(
      buildCountryEntry(
      code,
      countryNames[code] || code,
      calculatorRates,
      coverageMap[code],
      countryPricing,
      inbound,
      outbound,
      ),
    );
  }

  const countryData = Object.fromEntries(
    entries.map((entry) => [entry.code, entry]),
  );

  await fs.writeFile(
    OUTPUT_FILE,
    buildFileContents(countryCodes, countryData),
  );

  console.log(`Wrote ${OUTPUT_FILE} with ${countryCodes.length} countries.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
