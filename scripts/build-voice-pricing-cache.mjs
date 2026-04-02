import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, "src/data/voice-pricing-cache.ts");

const SITEMAP_URL = "https://www.plivo.com/sitemap.xml";
const COUNTRY_ISOS_URL = "https://api.plivo.com/v1/Internal/CountryISOs/";
const COUNTRY_PRICING_URL =
  "https://api.plivo.com/v1/Internal/CountryPricing/?country=";
const REFERER = "https://www.plivo.com/";
const REQUEST_HEADERS = { Referer: REFERER };
const CONCURRENCY = 8;

function formatRate(rate, unit, currency = "$") {
  if (rate == null) return "Not Supported";
  const num = typeof rate === "string" ? Number.parseFloat(rate) : rate;
  if (!Number.isFinite(num) || num === 0) return "Not Supported";
  return `${currency}${num.toFixed(4)}/${unit}`;
}

function getMinInboundRate(phoneNumbers, matcher) {
  let min = null;

  for (const phoneNumber of phoneNumbers) {
    const type = String(phoneNumber.number_type || "").toLowerCase();
    const capabilities = Array.isArray(phoneNumber.capabilities)
      ? phoneNumber.capabilities.map((capability) =>
          String(capability || "").toLowerCase(),
        )
      : [];
    const status = String(phoneNumber.status || "");
    const inboundVoiceRate = phoneNumber.inbound_voice_rate;

    if (!capabilities.includes("voice")) continue;
    if (status !== "GA" && status !== "BETA") continue;
    if (inboundVoiceRate == null) continue;
    if (!matcher(type)) continue;

    if (min === null || inboundVoiceRate < min) {
      min = inboundVoiceRate;
    }
  }

  return min;
}

function getStartsAtDisplay(rate, rates, unit) {
  const display = formatRate(rate, unit);
  if (!Array.isArray(rates) || rates.length <= 1 || !rate) {
    return display;
  }

  const normalized = rates
    .map((entry) => Number.parseFloat(entry.rate))
    .filter((value) => Number.isFinite(value));

  if (normalized.length <= 1) {
    return display;
  }

  return new Set(normalized).size > 1
    ? `Starts at $${Number.parseFloat(rate).toFixed(4)}/${unit}`
    : display;
}

function buildVoiceRates(code, apiData) {
  const phoneNumbers = Array.isArray(apiData.phone_numbers)
    ? apiData.phone_numbers
    : [];
  const localOutboundRates = apiData?.voice?.local?.outbound?.rates;
  const localOutboundRate = apiData?.voice?.local?.outbound?.rate;
  const tollfreeOutboundRates = apiData?.voice?.tollfree?.outbound?.rates;
  const tollfreeOutboundRate = apiData?.voice?.tollfree?.outbound?.rate;

  const localInbound = getMinInboundRate(phoneNumbers, (type) =>
    ["local", "national"].includes(type),
  );
  const mobileInbound = getMinInboundRate(phoneNumbers, (type) => type === "mobile");
  const tollfreeInbound = getMinInboundRate(phoneNumbers, (type) => type === "tollfree");

  let mobileOutbound = "Not Supported";
  if (Array.isArray(localOutboundRates)) {
    const mobileGroup = localOutboundRates.find((entry) => {
      const group = String(entry.voice_network_group || "").toLowerCase();
      return group.includes("mobile") && !group.includes("premium");
    });

    if (mobileGroup?.rate != null) {
      mobileOutbound = formatRate(mobileGroup.rate, "min");
    }
  }

  const audioStreamingRate = apiData?.voice?.add_on_pricing?.audio_streaming_rate;
  const audioStreaming =
    audioStreamingRate != null && audioStreamingRate !== 0
      ? formatRate(audioStreamingRate, "min")
      : "Not Supported";

  const voiceRates = {
    localInbound: formatRate(localInbound, "min"),
    localOutbound: getStartsAtDisplay(
      localOutboundRate,
      localOutboundRates,
      "min",
    ),
    mobileInbound: formatRate(mobileInbound, "min"),
    mobileOutbound,
    tollfreeInbound: formatRate(tollfreeInbound, "min"),
    tollfreeOutbound: getStartsAtDisplay(
      tollfreeOutboundRate,
      tollfreeOutboundRates,
      "min",
    ),
    ipInbound: formatRate(apiData?.voice?.ip?.inbound?.rate, "min"),
    ipOutbound: formatRate(
      apiData?.voice?.ip?.outbound?.rates?.all ??
        apiData?.voice?.ip?.outbound?.rate,
      "min",
    ),
    audioStreaming,
  };

  if (code === "US") {
    voiceRates.localOutbound = "$0.0115/min";
    voiceRates.tollfreeOutbound = "$0.0060/min";
  } else if (code === "CA") {
    voiceRates.tollfreeOutbound = "$0.0060/min";
  } else if (code === "IN") {
    voiceRates.localInbound = "$0.0087/min";
    voiceRates.localOutbound = "$0.0087/min";
    voiceRates.mobileInbound = "Not Supported";
    voiceRates.mobileOutbound = "Not Supported";
    voiceRates.tollfreeInbound = "$0.0153/min";
    voiceRates.tollfreeOutbound = "Not Supported";
    voiceRates.ipInbound = "$0.0040/min";
    voiceRates.ipOutbound = "$0.0040/min";
  }

  return voiceRates;
}

function buildDestinationRates(code, apiData) {
  if (code === "IN") {
    return [
      {
        networkGroup: "India All Networks from Plivo-IN numbers",
        rate: "$0.0047/min",
        destinationPrefixes: ["91"],
        originationPrefixes: ["91"],
      },
    ];
  }

  const rates = Array.isArray(apiData?.voice?.local?.outbound?.rates)
    ? [...apiData.voice.local.outbound.rates]
    : [];

  return rates
    .map((entry) => ({
      networkGroup: entry.voice_network_group || "Default",
      rate: formatRate(entry.rate, "min"),
      destinationPrefixes: Array.isArray(entry.destination_prefix)
        ? entry.destination_prefix
        : [],
      originationPrefixes: Array.isArray(entry.origination_prefix)
        ? entry.origination_prefix.filter(Boolean)
        : [],
    }))
    .filter((entry) => entry.rate !== "Not Supported")
    .sort((left, right) => {
      const leftRate = Number.parseFloat(left.rate.replace(/[^0-9.]/g, ""));
      const rightRate = Number.parseFloat(right.rate.replace(/[^0-9.]/g, ""));
      return leftRate - rightRate;
    });
}

function buildPhoneNumbers(code, apiData) {
  const rawPhoneNumbers = Array.isArray(apiData.phone_numbers)
    ? apiData.phone_numbers
    : [];

  const normalized = rawPhoneNumbers.map((phoneNumber) => ({
    type: phoneNumber.number_type || "",
    rentalRate:
      phoneNumber.rental_rate == null ? null : Number(phoneNumber.rental_rate),
    inboundVoiceRate:
      phoneNumber.inbound_voice_rate == null
        ? null
        : Number(phoneNumber.inbound_voice_rate),
    inboundSmsRate:
      phoneNumber.inbound_sms_rate == null
        ? null
        : Number(phoneNumber.inbound_sms_rate),
    capabilities: Array.isArray(phoneNumber.capabilities)
      ? phoneNumber.capabilities.map((capability) => String(capability || ""))
      : [],
    status: String(phoneNumber.status || ""),
  }));

  if (code !== "IN") return normalized;

  const hasLocal = normalized.some((phoneNumber) => {
    const type = String(phoneNumber.type).toLowerCase();
    return (
      ["local", "national", "mobile"].includes(type) &&
      phoneNumber.rentalRate != null &&
      phoneNumber.rentalRate > 0
    );
  });

  if (hasLocal) return normalized;

  return [
    ...normalized,
    {
      type: "Local",
      rentalRate: 2.94,
      inboundVoiceRate: null,
      inboundSmsRate: null,
      capabilities: ["voice", "sip_trunking"],
      status: "GA",
    },
  ];
}

function buildEntry(code, countryNames, apiData) {
  return {
    name: countryNames[code] || code,
    voiceRates: buildVoiceRates(code, apiData),
    voiceDestinationRates: buildDestinationRates(code, apiData),
    phoneNumbers: buildPhoneNumbers(code, apiData),
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
        throw new Error("Access Denied");
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
  const response = await fetch(url);
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
// Generated by scripts/build-voice-pricing-cache.mjs on ${new Date().toISOString().slice(0, 10)}

export interface VoicePricingPhoneNumberInfo {
  type: string;
  rentalRate: number | null;
  inboundVoiceRate: number | null;
  inboundSmsRate: number | null;
  capabilities: string[];
  status: string;
}

export interface VoicePricingNetworkRate {
  networkGroup: string;
  rate: string;
  destinationPrefixes: string[];
  originationPrefixes: string[];
}

export interface VoicePricingRates {
  localInbound: string;
  localOutbound: string;
  mobileInbound: string;
  mobileOutbound: string;
  tollfreeInbound: string;
  tollfreeOutbound: string;
  ipInbound: string;
  ipOutbound: string;
  audioStreaming: string;
}

export interface VoicePricingCountryData {
  name: string;
  voiceRates: VoicePricingRates;
  voiceDestinationRates: VoicePricingNetworkRate[];
  phoneNumbers: VoicePricingPhoneNumberInfo[];
}

export const VOICE_PRICING_COUNTRY_CODES = ${JSON.stringify(codes, null, 2)} as const;

export const VOICE_PRICING_COUNTRY_NAMES: Record<string, string> = ${JSON.stringify(
    countryNames,
    null,
    2,
  )};

export const VOICE_PRICING_CACHE: Record<string, VoicePricingCountryData> = ${JSON.stringify(
    entries,
    null,
    2,
  )};
`;
}

async function main() {
  const sitemap = await fetchText(SITEMAP_URL);
  const liveCodes = [...sitemap.matchAll(/https:\/\/www\.plivo\.com\/voice\/pricing\/([a-z]{2})\//g)]
    .map((match) => match[1].toUpperCase())
    .filter((code, index, array) => array.indexOf(code) === index)
    .sort();

  const countryIsos = await fetchJson(COUNTRY_ISOS_URL);
  delete countryIsos.api_id;

  const entries = {};
  const failures = [];

  await mapWithConcurrency(liveCodes, CONCURRENCY, async (code) => {
    try {
      const apiData = await fetchJson(`${COUNTRY_PRICING_URL}${code}`);
      entries[code] = buildEntry(code, countryIsos, apiData);
    } catch (error) {
      failures.push({
        code,
        message: error instanceof Error ? error.message : String(error),
      });
      entries[code] = buildEntry(code, countryIsos, {});
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
