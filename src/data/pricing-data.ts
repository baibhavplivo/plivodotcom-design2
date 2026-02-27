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
  IN: { local: { rate: 250, currency: "₹" }, tollfree: { rate: 1200, currency: "₹" } },
  US: { local: { rate: 0.50, currency: "$" }, tollfree: { rate: 1.00, currency: "$" } },
  CA: { local: { rate: 0.75, currency: "$" }, tollfree: { rate: 1.00, currency: "$" } },
  AE: { tollfree: { rate: 50.00, currency: "$" } },
  BR: { local: { rate: 6.17, currency: "$" }, tollfree: { rate: 30.00, currency: "$" } },
  AU: { local: { rate: 1.50, currency: "$" }, tollfree: { rate: 12.00, currency: "$" }, mobile: { rate: 3.00, currency: "$" } },
  NZ: { local: { rate: 2.55, currency: "$" }, tollfree: { rate: 34.00, currency: "$" } },
  GB: { local: { rate: 1.40, currency: "$" }, mobile: { rate: 0.85, currency: "$" } },
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
  },
  CA: {
    localInbound: "$0.0040/min",
    localOutbound: "$0.0100/min",
    tollfreeInbound: "$0.0060/min",
    tollfreeOutbound: "$0.0060/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
  },
  GB: {
    localInbound: "$0.0050/min",
    localOutbound: "$0.0250/min",
    tollfreeInbound: "$0.0080/min",
    tollfreeOutbound: "$0.0080/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
  },
  AU: {
    localInbound: "$0.0070/min",
    localOutbound: "$0.0300/min",
    tollfreeInbound: "$0.0120/min",
    tollfreeOutbound: "$0.0120/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
  },
  IN: {
    localInbound: "₹0.74/min",
    localOutbound: "₹0.74/min",
    tollfreeInbound: "Not Supported",
    tollfreeOutbound: "Not Supported",
    ipInbound: "₹0.50/min",
    ipOutbound: "₹0.50/min",
  },
  FR: {
    localInbound: "$0.0050/min",
    localOutbound: "$0.0400/min",
    tollfreeInbound: "$0.0100/min",
    tollfreeOutbound: "$0.0100/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
  },
  DE: {
    localInbound: "$0.0050/min",
    localOutbound: "$0.0550/min",
    tollfreeInbound: "$0.0100/min",
    tollfreeOutbound: "$0.0100/min",
    ipInbound: "$0.0030/min",
    ipOutbound: "$0.0030/min",
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

// WhatsApp Chat pricing by country (from Google Sheets - live data as of Feb 2026)
export const WA_CHAT_RATES: Record<string, WhatsAppChatRates> = {
  US: { marketing: 0.0275, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  CA: { marketing: 0.0275, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  GB: { marketing: 0.05819, utility: 0.0242, authentication: 0.0242, authenticationIntl: 0, service: 0, currency: "$" },
  AU: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  IN: { marketing: 0.8536, utility: 0.1232, authentication: 0.1232, authenticationIntl: 2.508, service: 0, currency: "₹" },
  FR: { marketing: 0.15752, utility: 0.033, authentication: 0.033, authenticationIntl: 0, service: 0, currency: "$" },
  DE: { marketing: 0.15015, utility: 0.0605, authentication: 0.0605, authenticationIntl: 0, service: 0, currency: "$" },
  BR: { marketing: 0.06875, utility: 0.00748, authentication: 0.00748, authenticationIntl: 0, service: 0, currency: "$" },
  MX: { marketing: 0.04796, utility: 0.00935, authentication: 0.00935, authenticationIntl: 0, service: 0, currency: "$" },
  ID: { marketing: 0.04521, utility: 0.0275, authentication: 0.0275, authenticationIntl: 0.1496, service: 0, currency: "$" },
  NG: { marketing: 0.05676, utility: 0.00737, authentication: 0.00737, authenticationIntl: 0.0825, service: 0, currency: "$" },
  ZA: { marketing: 0.04169, utility: 0.00836, authentication: 0.00836, authenticationIntl: 0.022, service: 0, currency: "$" },
  SA: { marketing: 0.05005, utility: 0.01265, authentication: 0.01265, authenticationIntl: 0.06578, service: 0, currency: "$" },
  AE: { marketing: 0.04224, utility: 0.01727, authentication: 0.01727, authenticationIntl: 0.0561, service: 0, currency: "$" },
  EG: { marketing: 0.11803, utility: 0.00572, authentication: 0.00572, authenticationIntl: 0.0715, service: 0, currency: "$" },
  SG: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  MY: { marketing: 0.0946, utility: 0.0154, authentication: 0.0154, authenticationIntl: 0.04598, service: 0, currency: "$" },
  IT: { marketing: 0.07601, utility: 0.033, authentication: 0.033, authenticationIntl: 0, service: 0, currency: "$" },
  ES: { marketing: 0.06765, utility: 0.022, authentication: 0.022, authenticationIntl: 0, service: 0, currency: "$" },
  IL: { marketing: 0.03883, utility: 0.00583, authentication: 0.00583, authenticationIntl: 0, service: 0, currency: "$" },
  // Additional countries from live Google Sheets data
  AF: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  AL: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  DZ: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  AO: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  AR: { marketing: 0.06798, utility: 0.03179, authentication: 0.03179, authenticationIntl: 0, service: 0, currency: "$" },
  AM: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  AT: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  AZ: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  BH: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  BD: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  BY: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  BE: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  BJ: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  BO: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  BW: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  BG: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  BF: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  BI: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  KH: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  CM: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  TD: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  CL: { marketing: 0.09779, utility: 0.022, authentication: 0.022, authenticationIntl: 0, service: 0, currency: "$" },
  CN: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  CO: { marketing: 0.01375, utility: 0.00022, authentication: 0.00022, authenticationIntl: 0, service: 0, currency: "$" },
  CR: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  CZ: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  DK: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  DO: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  EC: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  SV: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  ER: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  ET: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  FI: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  GA: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  GM: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  GE: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  GH: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  GR: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  GT: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  GW: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  HT: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  HN: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  HK: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  HU: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  IQ: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  IE: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  CI: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  JM: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  JP: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  JO: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  KE: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  KW: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  LA: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  LV: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  LB: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  LS: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  LR: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  LY: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  LT: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  MG: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  MW: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  ML: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  MR: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  MD: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  MN: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  MA: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  MZ: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  NP: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  NL: { marketing: 0.17567, utility: 0.055, authentication: 0.055, authenticationIntl: 0, service: 0, currency: "$" },
  NZ: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  NI: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  NE: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  MK: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  NO: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  OM: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  PK: { marketing: 0.05203, utility: 0.00594, authentication: 0.00594, authenticationIntl: 0.0825, service: 0, currency: "$" },
  PA: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  PG: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  PY: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  PE: { marketing: 0.07733, utility: 0.022, authentication: 0.022, authenticationIntl: 0, service: 0, currency: "$" },
  PH: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  PL: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  PT: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  PR: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  CG: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  RO: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  RU: { marketing: 0.08822, utility: 0.044, authentication: 0.044, authenticationIntl: 0, service: 0, currency: "$" },
  RW: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  SN: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  RS: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  SL: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  SO: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  SS: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  LK: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  SD: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  SZ: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  SE: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  CH: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: "$" },
  TW: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  TJ: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  TZ: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  TH: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  TG: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  TN: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  TR: { marketing: 0.01199, utility: 0.00583, authentication: 0.00583, authenticationIntl: 0, service: 0, currency: "$" },
  TM: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  UG: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  UA: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: "$" },
  UY: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  UZ: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  VE: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  VN: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  YE: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: "$" },
  ZM: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
};

// WhatsApp Call pricing by country (from Google Sheets - live data as of Feb 2026)
export const WA_CALL_RATES: Record<string, WhatsAppCallRates> = {
  US: { inbound: "$0.0040/min", outbound: "$0.0160/min", currency: "$" },
  CA: { inbound: "$0.0040/min", outbound: "$0.0160/min", currency: "$" },
  GB: { inbound: "$0.0040/min", outbound: "$0.0134/min", currency: "$" },
  AU: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  IN: { inbound: "₹0.45/min", outbound: "₹0.75/min", currency: "₹" },
  FR: { inbound: "$0.0040/min", outbound: "$0.0134/min", currency: "$" },
  DE: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  BR: { inbound: "$0.0040/min", outbound: "$0.0142/min", currency: "$" },
  SG: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  MX: { inbound: "$0.0040/min", outbound: "$0.0130/min", currency: "$" },
  ID: { inbound: "$0.0040/min", outbound: "$0.0263/min", currency: "$" },
  // Additional countries from live Google Sheets data
  AF: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  AL: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  DZ: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  AO: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  AR: { inbound: "$0.0040/min", outbound: "$0.0136/min", currency: "$" },
  AM: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  AT: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  AZ: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  BH: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  BD: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  BY: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  BE: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  BJ: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  BO: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  BW: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  BG: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  BF: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  BI: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  KH: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  CM: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  TD: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  CL: { inbound: "$0.0040/min", outbound: "$0.0154/min", currency: "$" },
  CN: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  CO: { inbound: "$0.0040/min", outbound: "$0.0145/min", currency: "$" },
  CR: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  HR: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  CZ: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  DK: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  DO: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  EC: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  EG: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  SV: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  ER: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  ET: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  FI: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  GA: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  GM: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  GE: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  GH: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  GR: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  GT: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  GW: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  HT: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  HN: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  HK: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  HU: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  IQ: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  IE: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  IL: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  IT: { inbound: "$0.0040/min", outbound: "$0.0154/min", currency: "$" },
  CI: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  JM: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  JP: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  JO: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  KE: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  KW: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  LA: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  LV: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  LB: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  LS: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  LR: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  LY: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  LT: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  MG: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  MW: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  MY: { inbound: "$0.0040/min", outbound: "$0.0142/min", currency: "$" },
  ML: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  MR: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  MD: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  MN: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  MA: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  MZ: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  NP: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  NL: { inbound: "$0.0040/min", outbound: "$0.0102/min", currency: "$" },
  NZ: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  NI: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  NE: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  NG: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  MK: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  NO: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  OM: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  PK: { inbound: "$0.0040/min", outbound: "$0.0152/min", currency: "$" },
  PA: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  PG: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  PY: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  PE: { inbound: "$0.0040/min", outbound: "$0.0154/min", currency: "$" },
  PH: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  PL: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  PT: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  PR: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  QA: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  CG: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  RO: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  RU: { inbound: "$0.0040/min", outbound: "$0.0132/min", currency: "$" },
  RW: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  SA: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  SN: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  RS: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  SL: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  SO: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  ZA: { inbound: "$0.0040/min", outbound: "$0.0142/min", currency: "$" },
  SS: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  ES: { inbound: "$0.0040/min", outbound: "$0.0161/min", currency: "$" },
  LK: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  SD: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  SZ: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  SE: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  CH: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  TW: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  TJ: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  TZ: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  TH: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  TG: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  TN: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  TR: { inbound: "$0.0040/min", outbound: "$0.0142/min", currency: "$" },
  TM: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  UG: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  UA: { inbound: "$0.0040/min", outbound: "$0.0131/min", currency: "$" },
  UY: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  UZ: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  VE: { inbound: "$0.0040/min", outbound: "$0.0149/min", currency: "$" },
  VN: { inbound: "$0.0040/min", outbound: "$0.0148/min", currency: "$" },
  YE: { inbound: "$0.0040/min", outbound: "$0.0159/min", currency: "$" },
  ZM: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
  ZW: { inbound: "$0.0040/min", outbound: "$0.0138/min", currency: "$" },
};

// WhatsApp Call fallback pricing for countries not in the list
export const WA_CALL_FALLBACK: WhatsAppCallRates = {
  inbound: "$0.0040/min", outbound: "$0.0164/min", currency: "$"
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
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AO: "Angola",
  AR: "Argentina", AM: "Armenia", AT: "Austria", AZ: "Azerbaijan",
  BH: "Bahrain", BD: "Bangladesh", BY: "Belarus", BE: "Belgium",
  BJ: "Benin", BO: "Bolivia", BW: "Botswana", BR: "Brazil",
  BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi", KH: "Cambodia",
  CM: "Cameroon", TD: "Chad", CL: "Chile", CN: "China",
  CO: "Colombia", CG: "Republic of the Congo", CR: "Costa Rica", CI: "Ivory Coast",
  HR: "Croatia", CY: "Cyprus", CZ: "Czech Republic", DK: "Denmark",
  DO: "Dominican Republic", EC: "Ecuador", EG: "Egypt", SV: "El Salvador",
  ER: "Eritrea", ET: "Ethiopia", FI: "Finland", GA: "Gabon",
  GM: "Gambia", GE: "Georgia", DE: "Germany", GH: "Ghana",
  GR: "Greece", GT: "Guatemala", GW: "Guinea-Bissau", HT: "Haiti",
  HN: "Honduras", HK: "Hong Kong", HU: "Hungary", ID: "Indonesia",
  IQ: "Iraq", IE: "Ireland", IL: "Israel", IT: "Italy",
  JM: "Jamaica", JP: "Japan", JO: "Jordan", KE: "Kenya",
  KW: "Kuwait", KR: "South Korea", LA: "Laos", LV: "Latvia",
  LB: "Lebanon", LS: "Lesotho", LR: "Liberia", LY: "Libya",
  LT: "Lithuania", MG: "Madagascar", MW: "Malawi", MY: "Malaysia",
  ML: "Mali", MR: "Mauritania", MX: "Mexico", MD: "Moldova",
  MN: "Mongolia", MA: "Morocco", MZ: "Mozambique", NA: "Namibia",
  NP: "Nepal", NL: "Netherlands", NZ: "New Zealand", NI: "Nicaragua",
  NE: "Niger", NG: "Nigeria", MK: "North Macedonia", NO: "Norway",
  OM: "Oman", PK: "Pakistan", PA: "Panama", PG: "Papua New Guinea",
  PY: "Paraguay", PE: "Peru", PH: "Philippines", PL: "Poland",
  PT: "Portugal", PR: "Puerto Rico", QA: "Qatar", RO: "Romania",
  RU: "Russia", RW: "Rwanda", SA: "Saudi Arabia", SN: "Senegal",
  RS: "Serbia", SL: "Sierra Leone", SG: "Singapore", SK: "Slovakia",
  SI: "Slovenia", SO: "Somalia", ZA: "South Africa", SS: "South Sudan",
  LK: "Sri Lanka", SD: "Sudan", SZ: "Eswatini", SE: "Sweden",
  CH: "Switzerland", TW: "Taiwan", TJ: "Tajikistan", TZ: "Tanzania",
  TH: "Thailand", TG: "Togo", TN: "Tunisia", TR: "Turkey",
  TM: "Turkmenistan", UG: "Uganda", UA: "Ukraine", UY: "Uruguay",
  UZ: "Uzbekistan", VE: "Venezuela", VN: "Vietnam", YE: "Yemen",
  ZM: "Zambia", ZW: "Zimbabwe",
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
        { type: "Short Code", price: "$700/month (Billed quarterly)" },
      ],
      note: "All short codes have a $4,000 one-time fee charged at the time of purchase.",
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
  { country: "Algeria", code: "DZ", flag: "🇩🇿", others: 29550, plivo: 23264 },
  { country: "Bangladesh", code: "BD", flag: "🇧🇩", others: 32220, plivo: 26534 },
  { country: "China", code: "CN", flag: "🇨🇳", others: 3860, plivo: 3337 },
  { country: "France", code: "FR", flag: "🇫🇷", others: 7980, plivo: 7100 },
  { country: "Indonesia", code: "ID", flag: "🇮🇩", others: 44140, plivo: 29591 },
  { country: "Iraq", code: "IQ", flag: "🇮🇶", others: 35000, plivo: 28196 },
  { country: "Israel", code: "IL", flag: "🇮🇱", others: 20040, plivo: 14626 },
  { country: "Italy", code: "IT", flag: "🇮🇹", others: 9930, plivo: 8317 },
  { country: "Brazil", code: "BR", flag: "🇧🇷", others: 5990, plivo: 5137 },
  { country: "Morocco", code: "MA", flag: "🇲🇦", others: 22440, plivo: 20802 },
  { country: "Pakistan", code: "PK", flag: "🇵🇰", others: 33100, plivo: 29368 },
  { country: "Philippines", code: "PH", flag: "🇵🇭", others: 20010, plivo: 14750 },
  { country: "Russia", code: "RU", flag: "🇷🇺", others: 70960, plivo: 61478 },
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
