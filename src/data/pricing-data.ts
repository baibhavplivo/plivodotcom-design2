// Shared pricing data constants used across Voice, WhatsApp Chat, and WhatsApp Call pricing pages

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

export interface PhoneRentalRate {
  rate: number;
  currency: string;
}

export interface PhoneRentalRates {
  local?: PhoneRentalRate;
  tollfree?: PhoneRentalRate;
  mobile?: PhoneRentalRate;
}

export interface VoiceRates {
  localInbound: string;
  localOutbound: string;
  tollfreeInbound: string;
  tollfreeOutbound: string;
  ipInbound: string;
  ipOutbound: string;
  audioStreaming: string;
}

export interface WhatsAppChatRates {
  marketing: number;
  utility: number;
  authentication: number;
  authenticationIntl: number;
  service: number;
  currency: string;
}

export interface WhatsAppCallRates {
  inbound: string;
  outbound: string;
  currency: string;
}

export interface CalculatorEntry {
  country: string;
  code: string;
  flag: string;
  others: number;
  plivo: number;
}

// Priority country lists per product
export const TOP_COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];

export const TOP_COUNTRY_CODES = new Set(TOP_COUNTRIES.map(c => c.code));

export const VOICE_PRIORITY_COUNTRIES = TOP_COUNTRIES;
export const WA_CHAT_PRIORITY_COUNTRIES = TOP_COUNTRIES;
export const WA_CALL_PRIORITY_COUNTRIES = TOP_COUNTRIES;

// Phone number rental rates - shared between Voice and WhatsApp Call pages
export const PHONE_RENTAL_RATES: Record<string, PhoneRentalRates> = {
  IN: { local: { rate: 250, currency: "₹" } },
  US: { local: { rate: 0.50, currency: "$" }, tollfree: { rate: 1.00, currency: "$" } },
  CA: { local: { rate: 0.75, currency: "$" }, tollfree: { rate: 1.00, currency: "$" } },
  AE: { tollfree: { rate: 50.00, currency: "$" } },
  BR: { local: { rate: 6.17, currency: "$" }, tollfree: { rate: 30.00, currency: "$" } },
  AU: { local: { rate: 1.50, currency: "$" }, tollfree: { rate: 12.00, currency: "$" }, mobile: { rate: 3.00, currency: "$" } },
  NZ: { local: { rate: 2.55, currency: "$" }, tollfree: { rate: 34.00, currency: "$" } },
  GB: { local: { rate: 0.55, currency: "$" }, mobile: { rate: 0.85, currency: "$" } },
  SG: { local: { rate: 16.00, currency: "$" } },
};

// Voice pricing overrides
export const VOICE_RATES: Record<string, VoiceRates> = {
  US: {
    localInbound: "$0.0040/min",
    localOutbound: "$0.0115/min",
    tollfreeInbound: "$0.0060/min",
    tollfreeOutbound: "$0.0060/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
    audioStreaming: "$0.0020/min",
  },
  CA: {
    localInbound: "$0.0040/min",
    localOutbound: "$0.0100/min",
    tollfreeInbound: "$0.0060/min",
    tollfreeOutbound: "$0.0060/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
    audioStreaming: "$0.0020/min",
  },
  GB: {
    localInbound: "$0.0050/min",
    localOutbound: "$0.0250/min",
    tollfreeInbound: "$0.0080/min",
    tollfreeOutbound: "$0.0080/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
    audioStreaming: "$0.0020/min",
  },
  AU: {
    localInbound: "$0.0070/min",
    localOutbound: "$0.0300/min",
    tollfreeInbound: "$0.0120/min",
    tollfreeOutbound: "$0.0120/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
    audioStreaming: "$0.0020/min",
  },
  IN: {
    localInbound: "₹0.74/min",
    localOutbound: "₹0.74/min",
    tollfreeInbound: "Not Supported",
    tollfreeOutbound: "Not Supported",
    ipInbound: "₹0.50/min",
    ipOutbound: "₹0.50/min",
    audioStreaming: "₹0.30/min",
  },
  FR: {
    localInbound: "$0.0050/min",
    localOutbound: "$0.0400/min",
    tollfreeInbound: "$0.0100/min",
    tollfreeOutbound: "$0.0100/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
    audioStreaming: "$0.0020/min",
  },
  DE: {
    localInbound: "$0.0050/min",
    localOutbound: "$0.0550/min",
    tollfreeInbound: "$0.0100/min",
    tollfreeOutbound: "$0.0100/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
    audioStreaming: "$0.0020/min",
  },
};

// India WhatsApp Chat overrides (INR)
export const INDIA_WA_CHAT_OVERRIDES: WhatsAppChatRates = {
  marketing: 0.8536,
  utility: 0.1232,
  authentication: 0.1232,
  authenticationIntl: 2.508,
  service: 0,
  currency: "₹",
};

// WhatsApp Chat pricing by country (from Google Sheets reference data)
export const WA_CHAT_RATES: Record<string, WhatsAppChatRates> = {
  US: { marketing: 0.025, utility: 0.004, authentication: 0.0135, authenticationIntl: 0.036, service: 0, currency: "$" },
  CA: { marketing: 0.025, utility: 0.004, authentication: 0.0135, authenticationIntl: 0.036, service: 0, currency: "$" },
  GB: { marketing: 0.0582, utility: 0.0080, authentication: 0.0426, authenticationIntl: 0.036, service: 0, currency: "$" },
  AU: { marketing: 0.0766, utility: 0.0165, authentication: 0.0540, authenticationIntl: 0.036, service: 0, currency: "$" },
  IN: { marketing: 0.8536, utility: 0.1232, authentication: 0.1232, authenticationIntl: 2.508, service: 0, currency: "₹" },
  FR: { marketing: 0.1168, utility: 0.0200, authentication: 0.0689, authenticationIntl: 0.036, service: 0, currency: "$" },
  DE: { marketing: 0.1131, utility: 0.0292, authentication: 0.0713, authenticationIntl: 0.036, service: 0, currency: "$" },
  BR: { marketing: 0.0531, utility: 0.0080, authentication: 0.0312, authenticationIntl: 0.036, service: 0, currency: "$" },
  MX: { marketing: 0.0382, utility: 0.0043, authentication: 0.0272, authenticationIntl: 0.036, service: 0, currency: "$" },
  ID: { marketing: 0.0350, utility: 0.0165, authentication: 0.0253, authenticationIntl: 0.036, service: 0, currency: "$" },
  NG: { marketing: 0.0453, utility: 0.0060, authentication: 0.0225, authenticationIntl: 0.036, service: 0, currency: "$" },
  ZA: { marketing: 0.0380, utility: 0.0060, authentication: 0.0168, authenticationIntl: 0.036, service: 0, currency: "$" },
  SA: { marketing: 0.0358, utility: 0.0128, authentication: 0.0187, authenticationIntl: 0.036, service: 0, currency: "$" },
  AE: { marketing: 0.0340, utility: 0.0128, authentication: 0.0165, authenticationIntl: 0.036, service: 0, currency: "$" },
  EG: { marketing: 0.0918, utility: 0.0050, authentication: 0.0538, authenticationIntl: 0.036, service: 0, currency: "$" },
  SG: { marketing: 0.0600, utility: 0.0128, authentication: 0.0140, authenticationIntl: 0.036, service: 0, currency: "$" },
  MY: { marketing: 0.0730, utility: 0.0120, authentication: 0.0165, authenticationIntl: 0.036, service: 0, currency: "$" },
  IT: { marketing: 0.0582, utility: 0.0200, authentication: 0.0426, authenticationIntl: 0.036, service: 0, currency: "$" },
  ES: { marketing: 0.0513, utility: 0.0131, authentication: 0.0337, authenticationIntl: 0.036, service: 0, currency: "$" },
  IL: { marketing: 0.0282, utility: 0.0060, authentication: 0.0145, authenticationIntl: 0.036, service: 0, currency: "$" },
};

// WhatsApp Call pricing by country (from Google Sheets reference data)
export const WA_CALL_RATES: Record<string, WhatsAppCallRates> = {
  US: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  CA: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  GB: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  AU: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  IN: { inbound: "₹0.50/min", outbound: "₹3.00/min", currency: "₹" },
  FR: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  DE: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  BR: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  SG: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  MX: { inbound: "$0.0040/min", outbound: "$0.0800/min", currency: "$" },
  ID: { inbound: "$0.0040/min", outbound: "$0.0140/min", currency: "$" },
};

// SIP trunking pricing data

export interface SIPRates {
  local: number;
  mobile: number;
  national: number;
  tollfree: number;
}

export const SIP_PRIORITY_COUNTRIES = TOP_COUNTRIES;

// SIP inbound per-minute rates by country (0 means not available)
export const SIP_RATES: Record<string, SIPRates> = {
  US: { local: 0.0075, mobile: 0, national: 0, tollfree: 0.027 },
  CA: { local: 0.0045, mobile: 0, national: 0, tollfree: 0.03 },
  GB: { local: 0.006, mobile: 0.003, national: 0, tollfree: 0.047 },
  AU: { local: 0.0025, mobile: 0.005, national: 0, tollfree: 0.045 },
  IN: { local: 0.74, mobile: 0, national: 0, tollfree: 0 },
  FR: { local: 0.003, mobile: 0.003, national: 0, tollfree: 0.247 },
  ES: { local: 0.003, mobile: 0, national: 0, tollfree: 0.2642 },
  AE: { local: 0, mobile: 0, national: 0, tollfree: 0.225 },
  AR: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  AT: { local: 0, mobile: 0.003, national: 0, tollfree: 0.1946 },
  BH: { local: 0, mobile: 0, national: 0, tollfree: 0.2 },
  BE: { local: 0.003, mobile: 0, national: 0, tollfree: 0.2591 },
  BR: { local: 0.006, mobile: 0.006, national: 0, tollfree: 0.18 },
  BG: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  CL: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  CN: { local: 0.055, mobile: 0, national: 0, tollfree: 0.8 },
  CO: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.1421 },
  HR: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.4267 },
  CY: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.1138 },
  CZ: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.2539 },
  DK: { local: 0, mobile: 0, national: 0.003, tollfree: 0.3333 },
  DO: { local: 0, mobile: 0, national: 0, tollfree: 0.1458 },
  EG: { local: 0, mobile: 0, national: 0, tollfree: 0.55 },
  FI: { local: 0.003, mobile: 0, national: 0, tollfree: 0.2444 },
  GR: { local: 0.003, mobile: 0, national: 0, tollfree: 0.1059 },
  HK: { local: 0, mobile: 0, national: 0.0063, tollfree: 0 },
  HU: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.1967 },
  ID: { local: 0.017, mobile: 0, national: 0, tollfree: 0 },
  IE: { local: 0.0055, mobile: 0, national: 0.003, tollfree: 0.4965 },
  IL: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.1112 },
  JP: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  LV: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  LT: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.0512 },
  MY: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  MX: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.1807 },
  NL: { local: 0.003, mobile: 0.003, national: 0.003, tollfree: 0.3067 },
  NZ: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.2082 },
  PE: { local: 0, mobile: 0, national: 0, tollfree: 0.3033 },
  PH: { local: 0.22, mobile: 0, national: 0, tollfree: 0.45 },
  PL: { local: 0.003, mobile: 0.003, national: 0, tollfree: 0 },
  PT: { local: 0, mobile: 0, national: 0.003, tollfree: 0.3833 },
  QA: { local: 0, mobile: 0, national: 0, tollfree: 0.5342 },
  RO: { local: 0.0063, mobile: 0, national: 0, tollfree: 0 },
  RU: { local: 0, mobile: 0, national: 0, tollfree: 0.214 },
  SA: { local: 0, mobile: 0, national: 0, tollfree: 0.744 },
  SG: { local: 0, mobile: 0, national: 0.0063, tollfree: 0 },
  SK: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.2766 },
  SI: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.3067 },
  ZA: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.0817 },
  SE: { local: 0.003, mobile: 0.003, national: 0, tollfree: 0.1262 },
  CH: { local: 0.003, mobile: 0, national: 0, tollfree: 0.1635 },
  TR: { local: 0.0063, mobile: 0, national: 0, tollfree: 0.0583 },
  DE: { local: 0.003, mobile: 0, national: 0, tollfree: 0.2 },
};

// Shared country name mapping for display (used across all pricing pages)
export const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", CA: "Canada", GB: "United Kingdom", AU: "Australia",
  IN: "India", FR: "France", ES: "Spain", AE: "United Arab Emirates",
  AR: "Argentina", AT: "Austria", BH: "Bahrain", BE: "Belgium",
  BR: "Brazil", BG: "Bulgaria", CL: "Chile", CN: "China",
  CO: "Colombia", HR: "Croatia", CY: "Cyprus", CZ: "Czech Republic",
  DK: "Denmark", DO: "Dominican Republic", EG: "Egypt", FI: "Finland",
  GR: "Greece", HK: "Hong Kong", HU: "Hungary", ID: "Indonesia",
  IE: "Ireland", IL: "Israel", IT: "Italy", JP: "Japan",
  KR: "South Korea", LV: "Latvia", LT: "Lithuania", MY: "Malaysia",
  MX: "Mexico", NG: "Nigeria", NL: "Netherlands", NO: "Norway",
  NZ: "New Zealand", PE: "Peru", PH: "Philippines", PL: "Poland",
  PT: "Portugal", QA: "Qatar", RO: "Romania", RU: "Russia",
  SA: "Saudi Arabia", SG: "Singapore", SK: "Slovakia", SI: "Slovenia",
  TH: "Thailand", VN: "Vietnam", ZA: "South Africa", SE: "Sweden",
  CH: "Switzerland", TR: "Turkey", DE: "Germany",
};

/** @deprecated Use COUNTRY_NAMES instead */
export const SIP_COUNTRY_NAMES = COUNTRY_NAMES;

// Convert country code to flag emoji
export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Build a sorted country list from data keys, with priority countries first
export interface CountryListItem extends CountryOption {
  isPriority: boolean;
}

export function buildCountryList(
  dataKeys: string[],
  priorityCountries: CountryOption[]
): CountryListItem[] {
  return dataKeys
    .map((code) => {
      const priority = priorityCountries.find((c) => c.code === code);
      return {
        code,
        name: COUNTRY_NAMES[code] || code,
        flag: priority?.flag || getFlagEmoji(code),
        isPriority: !!priority,
      };
    })
    .sort((a, b) => {
      const aIdx = priorityCountries.findIndex((c) => c.code === a.code);
      const bIdx = priorityCountries.findIndex((c) => c.code === b.code);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
}

// SMS pricing data per country

export interface SMSMessageRate {
  type: string;
  outbound: string;
  inbound: string;
}

export interface SMSPhoneType {
  type: string;
  price: string;
  note?: string;
  children?: { type: string; price: string }[];
}

export interface SMSCountryRates {
  sms: SMSMessageRate[];
  mms?: SMSMessageRate[];
  phoneNumbers?: {
    types: SMSPhoneType[];
    note?: string;
  };
  hasCarrierFees?: boolean;
  currency: string;
}

export const SMS_PRIORITY_COUNTRIES = TOP_COUNTRIES;

export const SMS_RATES: Record<string, SMSCountryRates> = {
  US: {
    sms: [
      { type: "Long Codes*", outbound: "$0.0070/sms", inbound: "$0.0070/sms" },
      { type: "Toll-Free", outbound: "$0.0072/sms", inbound: "$0.0072/sms" },
      { type: "Short Code*", outbound: "$0.0070/sms", inbound: "$0.0070/sms" },
    ],
    mms: [
      { type: "Long Codes*", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
      { type: "Toll-Free Numbers", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
      { type: "Short Code*", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
    ],
    phoneNumbers: {
      types: [
        { type: "Long Codes", price: "$0.50/month" },
        { type: "Toll-Free Numbers", price: "$1.00/month" },
        { type: "Short Code", price: "", children: [
          { type: "Regular", price: "$500/month (Billed quarterly)" },
          { type: "Vanity", price: "$1,000/month (Billed quarterly)" },
        ]},
      ],
      note: "All short codes have a $1,500 one-time fee charged at the time of purchase.",
    },
    hasCarrierFees: true,
    currency: "$",
  },
  CA: {
    sms: [
      { type: "Long Codes", outbound: "$0.0070/sms", inbound: "$0.0050/sms" },
      { type: "Toll-Free", outbound: "$0.0072/sms", inbound: "$0.0072/sms" },
      { type: "Short Code", outbound: "$0.0070/sms", inbound: "$0.0070/sms" },
    ],
    mms: [
      { type: "Long Codes", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
      { type: "Toll-Free", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
    ],
    phoneNumbers: {
      types: [
        { type: "Long Codes", price: "$0.75/month" },
        { type: "Toll-Free Numbers", price: "$1.00/month" },
      ],
    },
    currency: "$",
  },
  GB: {
    sms: [
      { type: "Long Codes", outbound: "$0.0400/sms", inbound: "$0.0075/sms" },
      { type: "Mobile", outbound: "$0.0400/sms", inbound: "$0.0075/sms" },
    ],
    phoneNumbers: {
      types: [
        { type: "Long Codes", price: "$0.55/month" },
        { type: "Mobile Numbers", price: "$0.85/month" },
      ],
    },
    currency: "$",
  },
  AU: {
    sms: [
      { type: "Local", outbound: "$0.0450/sms", inbound: "$0.0075/sms" },
      { type: "Mobile", outbound: "$0.0450/sms", inbound: "$0.0075/sms" },
      { type: "Toll-Free", outbound: "$0.0500/sms", inbound: "$0.0100/sms" },
    ],
    phoneNumbers: {
      types: [
        { type: "Local Numbers", price: "$1.50/month" },
        { type: "Toll-Free Numbers", price: "$12.00/month" },
        { type: "Mobile Numbers", price: "$3.00/month" },
      ],
    },
    currency: "$",
  },
  IN: {
    sms: [
      { type: "Transactional", outbound: "₹0.155/sms", inbound: "Not Supported" },
      { type: "Promotional", outbound: "₹0.155/sms", inbound: "Not Supported" },
    ],
    phoneNumbers: {
      types: [
        { type: "Local Numbers", price: "₹250/month" },
      ],
    },
    currency: "₹",
  },
  DE: {
    sms: [
      { type: "Long Codes", outbound: "$0.0750/sms", inbound: "$0.0075/sms" },
      { type: "Mobile", outbound: "$0.0750/sms", inbound: "$0.0075/sms" },
    ],
    currency: "$",
  },
  FR: {
    sms: [
      { type: "Long Codes", outbound: "$0.0650/sms", inbound: "$0.0075/sms" },
      { type: "Mobile", outbound: "$0.0650/sms", inbound: "$0.0075/sms" },
    ],
    currency: "$",
  },
};

// Phone number rental pricing - comprehensive data for Phone Numbers pricing page
export interface PhoneNumberRentalEntry {
  type: string;
  price: string;
  capabilities: string[];
  note?: string;
  children?: { type: string; price: string }[];
}

export interface PhoneNumberCountryPricing {
  numbers: PhoneNumberRentalEntry[];
  currency: string;
  note?: string;
}

export const PHONE_NUMBER_PRIORITY_COUNTRIES = TOP_COUNTRIES;

export const PHONE_NUMBER_PRICING: Record<string, PhoneNumberCountryPricing> = {
  US: {
    numbers: [
      { type: "Local numbers", price: "$1.80/month", capabilities: ["Voice", "SMS", "MMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "MMS", "SIP trunking"] },
      { type: "Short code", price: "", capabilities: ["SMS", "MMS"], children: [
        { type: "Standard", price: "$500/month (billed quarterly)" },
        { type: "Vanity", price: "$1,000/month (billed quarterly)" },
      ]},
    ],
    note: "All short codes have a $1,500 one-time fee charged at the time of purchase.",
    currency: "$",
  },
  CA: {
    numbers: [
      { type: "Local numbers", price: "$0.75/month", capabilities: ["Voice", "SMS", "MMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "MMS", "SIP trunking"] },
    ],
    currency: "$",
  },
  GB: {
    numbers: [
      { type: "Local numbers", price: "$1.40/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$0.85/month", capabilities: ["Voice", "SMS"] },
    ],
    currency: "$",
  },
  AU: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$3.00/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$12.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
    ],
    currency: "$",
  },
  IN: {
    numbers: [
      { type: "Local numbers", price: "₹250/month", capabilities: ["Voice", "SMS"] },
    ],
    currency: "₹",
  },
  DE: {
    numbers: [
      { type: "Local numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$1.50/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$5.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  FR: {
    numbers: [
      { type: "Local numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$2.00/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$1.35/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  BR: {
    numbers: [
      { type: "Local numbers", price: "$6.17/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$20.00/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$30.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  SG: {
    numbers: [
      { type: "National numbers", price: "$16.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  AE: {
    numbers: [
      { type: "Toll-free numbers", price: "$20.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  NZ: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$34.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  IE: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "National numbers", price: "$0.85/month", capabilities: ["Voice"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  NL: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$10.00/month", capabilities: ["Voice", "SMS"] },
      { type: "National numbers", price: "$2.55/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  SE: {
    numbers: [
      { type: "Local numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$2.50/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$10.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  CH: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  IT: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$8.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  ES: {
    numbers: [
      { type: "Local numbers", price: "$3.00/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  PL: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$11.50/month", capabilities: ["Voice", "SMS"] },
    ],
    currency: "$",
  },
  MX: {
    numbers: [
      { type: "Local numbers", price: "$5.83/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$25.50/month", capabilities: ["Voice"] },
    ],
    currency: "$",
  },
  JP: {
    numbers: [
      { type: "Local numbers", price: "$5.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  IL: {
    numbers: [
      { type: "Local numbers", price: "$3.40/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  ZA: {
    numbers: [
      { type: "Local numbers", price: "$1.28/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$7.50/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  HK: {
    numbers: [
      { type: "Mobile numbers", price: "$25.00/month", capabilities: ["Voice"] },
      { type: "National numbers", price: "$5.10/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  DK: {
    numbers: [
      { type: "National numbers", price: "$2.10/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  AT: {
    numbers: [
      { type: "Mobile numbers", price: "$7.00/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  BE: {
    numbers: [
      { type: "Local numbers", price: "$2.50/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Mobile numbers", price: "$1.00/month", capabilities: ["Voice", "SMS"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  PH: {
    numbers: [
      { type: "Local numbers", price: "$25.00/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  CZ: {
    numbers: [
      { type: "Local numbers", price: "$1.25/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$29.75/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  FI: {
    numbers: [
      { type: "Local numbers", price: "$1.25/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$34.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  AR: {
    numbers: [
      { type: "Local numbers", price: "$7.50/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  BH: {
    numbers: [
      { type: "Toll-free numbers", price: "$10.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  BG: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  CL: {
    numbers: [
      { type: "Local numbers", price: "$5.95/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$43.22/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  CN: {
    numbers: [
      { type: "Local numbers", price: "$75.00/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$150.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  CO: {
    numbers: [
      { type: "Local numbers", price: "$17.00/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  HR: {
    numbers: [
      { type: "Local numbers", price: "$4.25/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$6.50/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  CY: {
    numbers: [
      { type: "Local numbers", price: "$30.00/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$11.67/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  DO: {
    numbers: [
      { type: "Toll-free numbers", price: "$46.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  EG: {
    numbers: [
      { type: "Toll-free numbers", price: "$50.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  GR: {
    numbers: [
      { type: "Local numbers", price: "$1.25/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  HU: {
    numbers: [
      { type: "Local numbers", price: "$3.40/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$11.50/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  ID: {
    numbers: [
      { type: "Local numbers", price: "$25.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  LV: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  LT: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$22.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  MY: {
    numbers: [
      { type: "Local numbers", price: "$18.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  PE: {
    numbers: [
      { type: "Toll-free numbers", price: "$43.33/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  PT: {
    numbers: [
      { type: "National numbers", price: "$1.25/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  QA: {
    numbers: [
      { type: "Toll-free numbers", price: "$750.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  RO: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  RU: {
    numbers: [
      { type: "Toll-free numbers", price: "$54.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  SA: {
    numbers: [
      { type: "Toll-free numbers", price: "$115.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  SK: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  SI: {
    numbers: [
      { type: "Local numbers", price: "$4.25/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$6.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  TR: {
    numbers: [
      { type: "Local numbers", price: "$45.00/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$85.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
};

// Voice calculator data - Plivo vs Others (cost per 100K minutes)
export const VOICE_CALCULATOR_DATA: CalculatorEntry[] = [
  { country: "United States", code: "US", flag: "🇺🇸", others: 2250, plivo: 1500 },
  { country: "India", code: "IN", flag: "🇮🇳", others: 3300, plivo: 940 },
  { country: "Canada", code: "CA", flag: "🇨🇦", others: 3160, plivo: 1056 },
  { country: "United Kingdom", code: "GB", flag: "🇬🇧", others: 5650, plivo: 2500 },
  { country: "Australia", code: "AU", flag: "🇦🇺", others: 3800, plivo: 3000 },
  { country: "France", code: "FR", flag: "🇫🇷", others: 5500, plivo: 4000 },
  { country: "Germany", code: "DE", flag: "🇩🇪", others: 7000, plivo: 5500 },
  { country: "Indonesia", code: "ID", flag: "🇮🇩", others: 23000, plivo: 18000 },
  { country: "Italy", code: "IT", flag: "🇮🇹", others: 6200, plivo: 4800 },
  { country: "Philippines", code: "PH", flag: "🇵🇭", others: 30000, plivo: 23000 },
  { country: "Singapore", code: "SG", flag: "🇸🇬", others: 4500, plivo: 3000 },
  { country: "Spain", code: "ES", flag: "🇪🇸", others: 5900, plivo: 4500 },
];

// SMS calculator data - Plivo vs Others (cost per 100K SMS)
export const SMS_CALCULATOR_DATA: CalculatorEntry[] = [
  { country: "United States", code: "US", flag: "🇺🇸", others: 790, plivo: 528 },
  { country: "India", code: "IN", flag: "🇮🇳", others: 8320, plivo: 180 },
  { country: "Canada", code: "CA", flag: "🇨🇦", others: 1580, plivo: 528 },
  { country: "United Kingdom", code: "GB", flag: "🇬🇧", others: 6320, plivo: 3981 },
  { country: "Australia", code: "AU", flag: "🇦🇺", others: 5150, plivo: 4730 },
  { country: "Algeria", code: "DZ", flag: "🇩🇿", others: 29550, plivo: 23263 },
  { country: "Bangladesh", code: "BD", flag: "🇧🇩", others: 32220, plivo: 26531 },
  { country: "China", code: "CN", flag: "🇨🇳", others: 1000, plivo: 3337 },
  { country: "France", code: "FR", flag: "🇫🇷", others: 7980, plivo: 7100 },
  { country: "Indonesia", code: "ID", flag: "🇮🇩", others: 44140, plivo: 29591 },
  { country: "Iraq", code: "IQ", flag: "🇮🇶", others: 35000, plivo: 28200 },
  { country: "Israel", code: "IL", flag: "🇮🇱", others: 20040, plivo: 14626 },
  { country: "Italy", code: "IT", flag: "🇮🇹", others: 9930, plivo: 8317 },
  { country: "Mexico", code: "MX", flag: "🇲🇽", others: 10790, plivo: 12480 },
  { country: "Morocco", code: "MA", flag: "🇲🇦", others: 15060, plivo: 11395 },
  { country: "Pakistan", code: "PK", flag: "🇵🇰", others: 33100, plivo: 29368 },
  { country: "Philippines", code: "PH", flag: "🇵🇭", others: 20010, plivo: 14750 },
  { country: "Russia", code: "RU", flag: "🇷🇺", others: 70960, plivo: 61484 },
  { country: "Singapore", code: "SG", flag: "🇸🇬", others: 4350, plivo: 3697 },
  { country: "Spain", code: "ES", flag: "🇪🇸", others: 8750, plivo: 7665 },
  { country: "Sri Lanka", code: "LK", flag: "🇱🇰", others: 39620, plivo: 25668 },
  { country: "Turkey", code: "TR", flag: "🇹🇷", others: 3050, plivo: 2756 },
  { country: "Uzbekistan", code: "UZ", flag: "🇺🇿", others: 38280, plivo: 28335 },
];

// Verify API calculator data - cost per 1000 verifications (Plivo vs Others with 3-component breakdown)
export interface VerifyCalculatorEntry {
  country: string;
  code: string;
  flag: string;
  otherSmsCost: number;
  otherVerifyCost: number;
  otherFraudCost: number;
  plivoSmsCost: number;
}

export const VERIFY_CALCULATOR_DATA: VerifyCalculatorEntry[] = [
  { country: "United States", code: "US", flag: "🇺🇸", otherSmsCost: 7.2, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 5.3 },
  { country: "India", code: "IN", flag: "🇮🇳", otherSmsCost: 67.1, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 76.8 },
  { country: "Canada", code: "CA", flag: "🇨🇦", otherSmsCost: 15.8, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 5.3 },
  { country: "United Kingdom", code: "GB", flag: "🇬🇧", otherSmsCost: 63.2, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 39.8 },
  { country: "Australia", code: "AU", flag: "🇦🇺", otherSmsCost: 51.5, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 47 },
  { country: "Algeria", code: "DZ", flag: "🇩🇿", otherSmsCost: 295.5, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 232.6 },
  { country: "Bangladesh", code: "BD", flag: "🇧🇩", otherSmsCost: 322.2, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 265.3 },
  { country: "Brazil", code: "BR", flag: "🇧🇷", otherSmsCost: 59.9, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 51.4 },
  { country: "China", code: "CN", flag: "🇨🇳", otherSmsCost: 10, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 33.4 },
  { country: "France", code: "FR", flag: "🇫🇷", otherSmsCost: 79.8, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 71 },
  { country: "Germany", code: "DE", flag: "🇩🇪", otherSmsCost: 93.6, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 94.2 },
  { country: "Indonesia", code: "ID", flag: "🇮🇩", otherSmsCost: 441.4, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 295.9 },
  { country: "Iraq", code: "IQ", flag: "🇮🇶", otherSmsCost: 350, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 282 },
  { country: "Israel", code: "IL", flag: "🇮🇱", otherSmsCost: 200.4, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 146.3 },
  { country: "Italy", code: "IT", flag: "🇮🇹", otherSmsCost: 99.3, otherVerifyCost: 50, otherFraudCost: 0, plivoSmsCost: 83.2 },
  { country: "Mexico", code: "MX", flag: "🇲🇽", otherSmsCost: 107.9, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 124.8 },
  { country: "Morocco", code: "MA", flag: "🇲🇦", otherSmsCost: 224.4, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 208 },
  { country: "Pakistan", code: "PK", flag: "🇵🇰", otherSmsCost: 331, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 293.7 },
  { country: "Philippines", code: "PH", flag: "🇵🇭", otherSmsCost: 200.1, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 147.5 },
  { country: "Russia", code: "RU", flag: "🇷🇺", otherSmsCost: 709.6, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 614.8 },
  { country: "Singapore", code: "SG", flag: "🇸🇬", otherSmsCost: 43.5, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 37 },
  { country: "Spain", code: "ES", flag: "🇪🇸", otherSmsCost: 74.5, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 76.7 },
  { country: "Sri Lanka", code: "LK", flag: "🇱🇰", otherSmsCost: 396.2, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 256.7 },
  { country: "Turkey", code: "TR", flag: "🇹🇷", otherSmsCost: 30.5, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 27.6 },
  { country: "Uzbekistan", code: "UZ", flag: "🇺🇿", otherSmsCost: 382.8, otherVerifyCost: 50, otherFraudCost: 150, plivoSmsCost: 283.4 },
];
