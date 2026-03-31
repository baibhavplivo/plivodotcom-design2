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
export const WA_CALL_PRIORITY_COUNTRIES: CountryOption[] = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

// Phone number rental rates - shared between Voice and WhatsApp Call pages
export const PHONE_RENTAL_RATES: Record<string, PhoneRentalRates> = {
  IN: { local: { rate: 2.94, currency: "$" } },
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
    localInbound: "$0.0087/min",
    localOutbound: "$0.0087/min",
    tollfreeInbound: "Not Supported",
    tollfreeOutbound: "Not Supported",
    ipInbound: "$0.0055/min",
    ipOutbound: "$0.0055/min",
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

// WhatsApp Chat pricing by country (from Google Sheets - live data as of Feb 2026)
// All rates in USD. Components handle INR conversion via useExchangeRate.
export const WA_CHAT_RATES: Record<string, WhatsAppChatRates> = {
  US: { marketing: 0.0275, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  CA: { marketing: 0.0275, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: "$" },
  GB: { marketing: 0.05819, utility: 0.0242, authentication: 0.0242, authenticationIntl: 0, service: 0, currency: "$" },
  AU: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: "$" },
  IN: { marketing: 0.01177, utility: 0.00154, authentication: 0.00154, authenticationIntl: 0.0308, service: 0, currency: "$" },
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
  IN: { inbound: "$0.0053/min", outbound: "$0.0088/min", currency: "$" },
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
  localIn: number;
  localOut: number;
  mobileIn: number;
  mobileOut: number;
  nationalIn: number;
  nationalOut: number;
  tollfreeIn: number;
  tollfreeOut: number;
}

export const SIP_PRIORITY_COUNTRIES = TOP_COUNTRIES;

// SIP per-minute rates by country (0 means not available)
export const SIP_RATES: Record<string, SIPRates> = {
  US: { localIn: 0.003, localOut: 0.0055, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.012, tollfreeOut: 0.001 },
  CA: { localIn: 0.0045, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.03, tollfreeOut: 0 },
  GB: { localIn: 0.006, localOut: 0, mobileIn: 0.003, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.047, tollfreeOut: 0 },
  AU: { localIn: 0.0025, localOut: 0, mobileIn: 0.005, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.045, tollfreeOut: 0 },
  IN: { localIn: 0.74, localOut: 0.74, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  FR: { localIn: 0.003, localOut: 0, mobileIn: 0.003, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.247, tollfreeOut: 0 },
  ES: { localIn: 0.003, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2642, tollfreeOut: 0 },
  AE: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.225, tollfreeOut: 0 },
  AR: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  AT: { localIn: 0, localOut: 0, mobileIn: 0.003, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1946, tollfreeOut: 0 },
  BH: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2, tollfreeOut: 0 },
  BE: { localIn: 0.003, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2591, tollfreeOut: 0 },
  BR: { localIn: 0.006, localOut: 0, mobileIn: 0.006, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.18, tollfreeOut: 0 },
  BG: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  CL: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  CN: { localIn: 0.055, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.8, tollfreeOut: 0 },
  CO: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1421, tollfreeOut: 0 },
  HR: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.4267, tollfreeOut: 0 },
  CY: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1138, tollfreeOut: 0 },
  CZ: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2539, tollfreeOut: 0 },
  DK: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0.003, nationalOut: 0, tollfreeIn: 0.3333, tollfreeOut: 0 },
  DO: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1458, tollfreeOut: 0 },
  EG: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.55, tollfreeOut: 0 },
  FI: { localIn: 0.003, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2444, tollfreeOut: 0 },
  GR: { localIn: 0.003, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1059, tollfreeOut: 0 },
  HK: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0.0063, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  HU: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1967, tollfreeOut: 0 },
  ID: { localIn: 0.017, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  IE: { localIn: 0.0055, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0.003, nationalOut: 0, tollfreeIn: 0.4965, tollfreeOut: 0 },
  IL: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1112, tollfreeOut: 0 },
  JP: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  LV: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  LT: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.0512, tollfreeOut: 0 },
  MY: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  MX: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1807, tollfreeOut: 0 },
  NL: { localIn: 0.003, localOut: 0, mobileIn: 0.003, mobileOut: 0, nationalIn: 0.003, nationalOut: 0, tollfreeIn: 0.3067, tollfreeOut: 0 },
  NZ: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2082, tollfreeOut: 0 },
  PE: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.3033, tollfreeOut: 0 },
  PH: { localIn: 0.22, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.45, tollfreeOut: 0 },
  PL: { localIn: 0.003, localOut: 0, mobileIn: 0.003, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  PT: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0.003, nationalOut: 0, tollfreeIn: 0.3833, tollfreeOut: 0 },
  QA: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.5342, tollfreeOut: 0 },
  RO: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  RU: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.214, tollfreeOut: 0 },
  SA: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.744, tollfreeOut: 0 },
  SG: { localIn: 0, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0.0063, nationalOut: 0, tollfreeIn: 0, tollfreeOut: 0 },
  SK: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2766, tollfreeOut: 0 },
  SI: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.3067, tollfreeOut: 0 },
  ZA: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.0817, tollfreeOut: 0 },
  SE: { localIn: 0.003, localOut: 0, mobileIn: 0.003, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1262, tollfreeOut: 0 },
  CH: { localIn: 0.003, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.1635, tollfreeOut: 0 },
  TR: { localIn: 0.0063, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.0583, tollfreeOut: 0 },
  DE: { localIn: 0.003, localOut: 0, mobileIn: 0, mobileOut: 0, nationalIn: 0, nationalOut: 0, tollfreeIn: 0.2, tollfreeOut: 0 },
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
      { type: "Long Codes*", outbound: "$0.0077/sms", inbound: "$0.0077/sms" },
      { type: "Toll-Free", outbound: "$0.0079/sms", inbound: "$0.0079/sms" },
      { type: "Short Code*", outbound: "$0.0077/sms", inbound: "$0.0077/sms" },
    ],
    mms: [
      { type: "Long Codes*", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
      { type: "Toll-Free Numbers", outbound: "$0.0200/mms", inbound: "$0.0200/mms" },
      { type: "Short Code*", outbound: "$0.0200/mms", inbound: "$0.0200/mms" },
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
      { type: "Long Codes", outbound: "$0.0077/sms", inbound: "$0.0077/sms" },
      { type: "Toll-Free", outbound: "$0.0079/sms", inbound: "$0.0077/sms" },
      { type: "Short Code", outbound: "$0.0250/sms", inbound: "$0.0077/sms" },
    ],
    mms: [
      { type: "Long Codes", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
      { type: "Toll-Free", outbound: "$0.020/mms", inbound: "$0.020/mms" },
      { type: "Short Code", outbound: "$0.020/mms", inbound: "$0.020/mms" },
    ],
    phoneNumbers: {
      types: [
        { type: "Long Codes", price: "$10.00/month" },
        { type: "Toll-Free Numbers", price: "$10.00/month" },
        { type: "Short Code", price: "", children: [
          { type: "Standard", price: "$500/month (Billed quarterly)" },
          { type: "Vanity", price: "$1,000/month (Billed quarterly)" },
        ]},
      ],
      note: "All short codes have a $1,500 one-time fee charged at the time of purchase.",
    },
    hasCarrierFees: true,
    currency: "$",
  },
  GB: {
    sms: [
      { type: "Long Codes", outbound: "$0.0372/sms", inbound: "$0.0030/sms" },
      { type: "Mobile", outbound: "$0.0372/sms", inbound: "$0.0030/sms" },
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
      { type: "Local", outbound: "$0.0451/sms", inbound: "$0.0030/sms" },
      { type: "Mobile", outbound: "$0.0451/sms", inbound: "$0.0030/sms" },
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
      { type: "Domestic", outbound: "$0.00187/sms", inbound: "Not Supported" },
      { type: "International", outbound: "$0.0800/sms", inbound: "Not Supported" },
    ],
    phoneNumbers: {
      types: [
        { type: "Local Numbers", price: "$2.94/month" },
      ],
    },
    currency: "$",
  },
  DE: {
    sms: [
      { type: "Long Codes", outbound: "$0.0950/sms", inbound: "Not Supported" },
    ],
    currency: "$",
  },
  FR: {
    sms: [
      { type: "Long Codes", outbound: "$0.0664/sms", inbound: "Not Supported" },
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

export interface PhoneNumberCompliance {
  label: string;
  detail: string;
}

export interface PhoneNumberCountryPricing {
  numbers: PhoneNumberRentalEntry[];
  currency: string;
  note?: string;
  compliance?: PhoneNumberCompliance[];
}

export const PHONE_NUMBER_PRIORITY_COUNTRIES = TOP_COUNTRIES;

export const PHONE_NUMBER_PRICING: Record<string, PhoneNumberCountryPricing> = {
  US: {
    numbers: [
      { type: "Local numbers", price: "$0.50/month", capabilities: ["Voice", "SMS", "MMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Short code", price: "", capabilities: ["SMS", "MMS"], children: [
        { type: "Standard", price: "$500/month (billed quarterly)" },
        { type: "Vanity", price: "$1,000/month (billed quarterly)" },
      ]},
    ],
    note: "All short codes have a $1,500 one-time fee charged at the time of purchase.",
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Not Needed" },
      { label: "Toll-free numbers", detail: "Not Needed" },
    ],
  },
  CA: {
    numbers: [
      { type: "Local numbers", price: "$0.75/month", capabilities: ["Voice", "SMS", "MMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Short code", price: "", capabilities: ["SMS", "MMS"], children: [
        { type: "Standard", price: "$700/month (billed every 4 months)" },
      ]},
    ],
    note: "Short codes have a $4,000 one-time setup fee.",
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Not Needed" },
      { label: "Toll-free numbers", detail: "Not Needed" },
    ],
  },
  GB: {
    numbers: [
      { type: "Local numbers", price: "$0.55/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Mobile numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Not Needed" },
      { label: "Mobile numbers", detail: "Not Needed" },
    ],
  },
  AU: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Mobile numbers", price: "$3.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$12.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Not Needed" },
      { label: "Toll-free numbers", detail: "Not Needed" },
      { label: "Mobile numbers", detail: "Not Needed" },
    ],
  },
  IN: {
    numbers: [
      { type: "Local numbers", price: "$2.94/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Certificate of Incorporation, GST" },
    ],
  },
  DE: {
    numbers: [
      { type: "Local numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$1.50/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$5.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  FR: {
    numbers: [
      { type: "Local numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$1.35/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  BR: {
    numbers: [
      { type: "Local numbers", price: "$6.17/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Mobile numbers", price: "$20.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$30.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Local address, Tax ID (CNPJ)" },
      { label: "Toll-free numbers", detail: "National address, Tax ID (CNPJ)" },
    ],
  },
  SG: {
    numbers: [
      { type: "National numbers", price: "$16.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "National numbers", detail: "National address, Tax ID (NRIC)" },
    ],
  },
  AE: {
    numbers: [
      { type: "Toll-free numbers", price: "$50.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Toll-free numbers", detail: "Copy of Business Registration, Foreign Address, LOI" },
    ],
  },
  NZ: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$34.00/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "National address, NZBN" },
      { label: "Toll-free numbers", detail: "National address, NZBN" },
    ],
  },
  IE: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "National numbers", price: "$0.85/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  NL: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$10.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "National numbers", price: "$2.55/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  SE: {
    numbers: [
      { type: "Local numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Mobile numbers", price: "$2.50/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
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
      { type: "Mobile numbers", price: "$11.50/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
    ],
    currency: "$",
  },
  MX: {
    numbers: [
      { type: "Local numbers", price: "$5.83/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$25.50/month", capabilities: ["Voice", "SIP trunking"] },
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
      { type: "Mobile numbers", price: "$25.00/month", capabilities: ["Voice", "SIP trunking"] },
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
      { type: "Mobile numbers", price: "$7.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP trunking"] },
    ],
    currency: "$",
  },
  BE: {
    numbers: [
      { type: "Local numbers", price: "$2.50/month", capabilities: ["Voice", "SIP trunking"] },
      { type: "Mobile numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP trunking"] },
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

// Phone number rental calculator data — per-type monthly rates
// For 9 priority countries: uses HARDCODED_PHONE_RATES (correct/current prices)
// For remaining countries: from PHONE_PRICING reference (phone-number-pricing.html)
// India uses INR values directly; all others USD
export interface PhoneCalculatorEntry {
  local: number;
  mobile: number;
  national: number;
  shortcode: number;
  tollfree: number;
}

export const PHONE_CALCULATOR_DATA: Record<string, PhoneCalculatorEntry> = {
  // 9 priority countries (from HARDCODED_PHONE_RATES)
  US: { local: 0.50, mobile: 0, national: 0, shortcode: 1000, tollfree: 1.00 },
  CA: { local: 0.75, mobile: 0, national: 0, shortcode: 0, tollfree: 1.00 },
  GB: { local: 0.55, mobile: 0.85, national: 0, shortcode: 0, tollfree: 0 },
  AU: { local: 1.50, mobile: 3, national: 0, shortcode: 0, tollfree: 12 },
  IN: { local: 250, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  BR: { local: 6.17, mobile: 20, national: 0, shortcode: 0, tollfree: 30 },
  AE: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 50 },
  NZ: { local: 2.55, mobile: 0, national: 0, shortcode: 0, tollfree: 34 },
  SG: { local: 0, mobile: 0, national: 16, shortcode: 0, tollfree: 0 },
  // Remaining countries (from reference PHONE_PRICING)
  FR: { local: 2, mobile: 2, national: 0, shortcode: 0, tollfree: 1.35 },
  ES: { local: 3, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  AR: { local: 7.5, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  AT: { local: 0, mobile: 7, national: 0, shortcode: 0, tollfree: 21.25 },
  BH: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 10 },
  BE: { local: 2.5, mobile: 1, national: 0, shortcode: 0, tollfree: 21.25 },
  BG: { local: 2.55, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  CL: { local: 5.95, mobile: 0, national: 0, shortcode: 0, tollfree: 43.22 },
  CN: { local: 75, mobile: 0, national: 0, shortcode: 0, tollfree: 150 },
  CO: { local: 17, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  HR: { local: 4.25, mobile: 0, national: 0, shortcode: 0, tollfree: 6.5 },
  CY: { local: 30, mobile: 0, national: 0, shortcode: 0, tollfree: 11.67 },
  CZ: { local: 1.25, mobile: 0, national: 0, shortcode: 0, tollfree: 29.75 },
  DK: { local: 0, mobile: 0, national: 2.1, shortcode: 0, tollfree: 21.25 },
  DO: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 46 },
  EG: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 50 },
  FI: { local: 1.25, mobile: 0, national: 0, shortcode: 0, tollfree: 34 },
  GR: { local: 1.25, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  HK: { local: 0, mobile: 25, national: 5.1, shortcode: 0, tollfree: 0 },
  HU: { local: 3.4, mobile: 0, national: 0, shortcode: 0, tollfree: 11.5 },
  ID: { local: 25, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  IE: { local: 0.85, mobile: 0, national: 0.85, shortcode: 0, tollfree: 21.25 },
  IL: { local: 3.4, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  IT: { local: 1.5, mobile: 0, national: 0, shortcode: 0, tollfree: 8 },
  JP: { local: 5, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  LV: { local: 1.5, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  LT: { local: 1.5, mobile: 0, national: 0, shortcode: 0, tollfree: 22 },
  MY: { local: 18, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  MX: { local: 5.83, mobile: 0, national: 0, shortcode: 0, tollfree: 25.5 },
  NL: { local: 2.55, mobile: 10, national: 2.55, shortcode: 0, tollfree: 21.25 },
  PE: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 43.33 },
  PH: { local: 25, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  PL: { local: 0.85, mobile: 11.5, national: 0, shortcode: 0, tollfree: 0 },
  PT: { local: 0, mobile: 0, national: 1.25, shortcode: 0, tollfree: 21.25 },
  QA: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 750 },
  RO: { local: 2.55, mobile: 0, national: 0, shortcode: 0, tollfree: 0 },
  RU: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 54 },
  SA: { local: 0, mobile: 0, national: 0, shortcode: 0, tollfree: 115 },
  SK: { local: 1.5, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  SI: { local: 4.25, mobile: 0, national: 0, shortcode: 0, tollfree: 6 },
  ZA: { local: 1.28, mobile: 0, national: 0, shortcode: 0, tollfree: 7.5 },
  SE: { local: 1, mobile: 2.5, national: 0, shortcode: 0, tollfree: 10 },
  CH: { local: 0.85, mobile: 0, national: 0, shortcode: 0, tollfree: 21.25 },
  TR: { local: 45, mobile: 0, national: 0, shortcode: 0, tollfree: 85 },
  DE: { local: 1, mobile: 1.5, national: 0, shortcode: 0, tollfree: 5 },
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

// Voice destination rates per network group (fallback when API fails)
// India uses hardcoded rate matching live plivo.com; all others from API
export const VOICE_DESTINATION_RATES: Record<string, Array<{ group: string; rate: string; prefixes: string[] }>> = {
  IN: [
    { group: "India All Networks from Plivo-IN numbers", rate: "0.0047", prefixes: ["91"] },
  ],
  US: [
    { group: "United States", rate: "0.0115", prefixes: ["1"] },
    { group: "United States - Hawaii", rate: "0.0125", prefixes: ["1808"] },
    { group: "United States - Alaska", rate: "0.0850", prefixes: ["1907"] },
  ],
  CA: [
    { group: "Canada", rate: "0.0120", prefixes: ["1"] },
  ],
  GB: [
    { group: "United Kingdom from EEA", rate: "0.0075", prefixes: ["44"] },
    { group: "United Kingdom - Mobile (VODAFONE, LYCA) from EEA", rate: "0.0270", prefixes: ["44"] },
    { group: "United Kingdom - Mobile - Major Carriers (H3G, ORANGE, SKY, TIER 2, T-MOBILE, O2, O3) from EEA", rate: "0.0270", prefixes: ["44"] },
    { group: "United Kingdom", rate: "0.2800", prefixes: ["44"] },
    { group: "United Kingdom - Mobile - Major Carriers (H3G, ORANGE, SKY, TIER 2, T-MOBILE, O2, O3)", rate: "0.3000", prefixes: ["44"] },
    { group: "United Kingdom - Mobile (VODAFONE, LYCA)", rate: "0.3200", prefixes: ["44"] },
    { group: "United Kingdom - Mobile Others (GUERNSEY, JERSEY, MANX, PNS, DIGICEL, OTHERS)", rate: "0.4720", prefixes: ["44"] },
    { group: "United Kingdom - Mobile - Major Carriers (H3G, ORANGE, SKY, TIER 2, T-MOBILE, O2, O3) from High Cost Origins", rate: "0.9333", prefixes: ["44"] },
    { group: "United Kingdom from High Cost Origins", rate: "0.9375", prefixes: ["44"] },
    { group: "United Kingdom - Premium Services", rate: "0.9500", prefixes: ["44"] },
    { group: "United Kingdom - Mobile (VODAFONE, LYCA) from High Cost Origins", rate: "1.6333", prefixes: ["44"] },
    { group: "United Kingdom from Ultra High Cost Origins", rate: "6.0000", prefixes: ["44"] },
  ],
  AU: [
    { group: "Australia", rate: "0.0230", prefixes: ["61"] },
    { group: "Australia - Mobile", rate: "0.0730", prefixes: ["61"] },
    { group: "Australia - Premium Services", rate: "3.7830", prefixes: ["61"] },
  ],
  FR: [
    { group: "France from EEA", rate: "0.0195", prefixes: ["33"] },
    { group: "France - Mobile from EEA", rate: "0.0426", prefixes: ["33"] },
    { group: "France - Mobile - Major Carriers (Orange, SFR, Bouygues) from EEA", rate: "0.0495", prefixes: ["33"] },
    { group: "France", rate: "0.0530", prefixes: ["33"] },
    { group: "France - Mobile", rate: "0.3030", prefixes: ["33"] },
    { group: "France - Mobile - Major Carriers (Orange, SFR, Bouygues)", rate: "0.3530", prefixes: ["33"] },
    { group: "France - Premium Services", rate: "5.5000", prefixes: ["33"] },
  ],
  DE: [
    { group: "Germany from EEA", rate: "0.0135", prefixes: ["49"] },
    { group: "Germany - Mobile - Major Carriers (Vodafone, T-Mob, Telefonica, E Plus) from EEA", rate: "0.0359", prefixes: ["49"] },
    { group: "Germany - Mobile from EEA", rate: "0.0495", prefixes: ["49"] },
    { group: "Germany - Mobile - Major Carriers (Vodafone, T-Mob, Telefonica, E Plus)", rate: "0.3850", prefixes: ["49"] },
    { group: "Germany - Mobile", rate: "0.3850", prefixes: ["49"] },
    { group: "Germany", rate: "1.0674", prefixes: ["49"] },
  ],
  ES: [
    { group: "Spain from EEA", rate: "0.0071", prefixes: ["34"] },
    { group: "Spain - Mobile from EEA", rate: "0.0314", prefixes: ["34"] },
    { group: "Spain - Mobile", rate: "0.2530", prefixes: ["34"] },
    { group: "Spain", rate: "0.3625", prefixes: ["34"] },
    { group: "Spain - Premium Services", rate: "0.9030", prefixes: ["34"] },
    { group: "Spain - Mobile from Spain Fixed", rate: "1.2190", prefixes: ["34"] },
  ],
  SG: [
    { group: "Singapore", rate: "0.0340", prefixes: ["65"] },
    { group: "Singapore - Mobile", rate: "0.0489", prefixes: ["65"] },
  ],
  JP: [
    { group: "Japan", rate: "0.0385", prefixes: ["81"] },
    { group: "Japan - IP Phone", rate: "0.1110", prefixes: ["81"] },
    { group: "Japan - Mobile", rate: "0.1398", prefixes: ["81"] },
  ],
  BR: [
    { group: "Brazil - Fixed - Major Cities (Rio, Sao Paulo, Brasilia, Belo, Campinas, Curitiba, Fortaleza, Golania, Porto Alegre, Recife, Salvador, Vitoria)", rate: "0.0210", prefixes: ["55"] },
    { group: "Brazil", rate: "0.0330", prefixes: ["55"] },
    { group: "Brazil - Mobile", rate: "0.0980", prefixes: ["55"] },
  ],
  NZ: [
    { group: "New Zealand", rate: "0.0233", prefixes: ["64"] },
    { group: "New Zealand - Mobile", rate: "0.0714", prefixes: ["64"] },
  ],
  IT: [
    { group: "Italy", rate: "0.0130", prefixes: ["39"] },
    { group: "Italy - Mobile from EEA", rate: "0.0359", prefixes: ["39"] },
    { group: "Italy - Mobile", rate: "0.4530", prefixes: ["39"] },
    { group: "Italy - Premium Services", rate: "0.6030", prefixes: ["39"] },
  ],
  ID: [
    { group: "Indonesia", rate: "0.0830", prefixes: ["62"] },
    { group: "Indonesia - Mobile", rate: "0.0830", prefixes: ["62"] },
  ],
  PH: [
    { group: "Philippines", rate: "0.2230", prefixes: ["63"] },
    { group: "Philippines - Mobile", rate: "0.2890", prefixes: ["63"] },
    { group: "Philippines - Premium Services", rate: "0.8210", prefixes: ["63"] },
  ],
  MX: [
    { group: "Mexico", rate: "0.0125", prefixes: ["52"] },
    { group: "Mexico - Mobile", rate: "0.0390", prefixes: ["52"] },
  ],
  NL: [
    { group: "Netherlands from EEA", rate: "0.0145", prefixes: ["31"] },
    { group: "Netherlands - Mobile - Major Carriers (Lycamobile, Ibasis, Tele2, T-mobile, Telfort, Vodafone) from EEA", rate: "0.0195", prefixes: ["31"] },
    { group: "Netherlands", rate: "0.3490", prefixes: ["31"] },
    { group: "Netherlands - Mobile - Major Carriers (Lycamobile, Ibasis, Tele2, T-mobile, Telfort, Vodafone)", rate: "0.4030", prefixes: ["31"] },
    { group: "Netherlands - Mobile - Others (KPN)", rate: "0.5390", prefixes: ["31"] },
    { group: "Netherlands - Mobile from Netherlands Fixed", rate: "0.6881", prefixes: ["31"] },
    { group: "Netherlands - Premium Services", rate: "2.8310", prefixes: ["31"] },
  ],
  SE: [
    { group: "Sweden", rate: "0.0150", prefixes: ["46"] },
    { group: "Sweden - Shared Services", rate: "0.0309", prefixes: ["46"] },
    { group: "Sweden - Mobile", rate: "0.5930", prefixes: ["46"] },
  ],
  CH: [
    { group: "Switzerland", rate: "0.0299", prefixes: ["41"] },
    { group: "Switzerland - Mobile (Swisscom, Sunrise, Salt, Lyca)", rate: "0.1195", prefixes: ["41"] },
    { group: "Switzerland - Mobile (Swisscom, Lyca) from High Cost Origins", rate: "0.3394", prefixes: ["41"] },
    { group: "Switzerland - Mobile (Swisscom, Lyca) from Ultra High Cost Origins", rate: "0.6814", prefixes: ["41"] },
    { group: "Switzerland - Mobile (Sunrise, Salt) from High Cost Origins", rate: "0.9910", prefixes: ["41"] },
    { group: "Switzerland - Mobile", rate: "0.9982", prefixes: ["41"] },
    { group: "Switzerland - Mobile (Sunrise, Salt) from Ultra High Cost Origins", rate: "1.6896", prefixes: ["41"] },
  ],
  IE: [
    { group: "Ireland", rate: "0.0130", prefixes: ["353"] },
    { group: "Ireland - Mobile - Major Carriers (Vodafone, Tesco, O2, Lycatel, Three)", rate: "0.0460", prefixes: ["353"] },
    { group: "Ireland - Mobile", rate: "0.0804", prefixes: ["353"] },
    { group: "Ireland - Premium Services", rate: "0.2210", prefixes: ["353"] },
  ],
  IL: [
    { group: "Israel", rate: "0.0170", prefixes: ["972"] },
    { group: "Israel - Mobile", rate: "0.1510", prefixes: ["972"] },
    { group: "Israel - Fixed - Others (Palestine)", rate: "0.3010", prefixes: ["972"] },
    { group: "Israel - Mobile - Others (Palestine)", rate: "0.3010", prefixes: ["972"] },
  ],
  KR: [
    { group: "South Korea - Mobile", rate: "0.0223", prefixes: ["82"] },
    { group: "South Korea", rate: "0.0296", prefixes: ["82"] },
  ],
  MY: [
    { group: "Malaysia", rate: "0.0444", prefixes: ["60"] },
    { group: "Malaysia - Mobile", rate: "0.0714", prefixes: ["60"] },
  ],
  TH: [
    { group: "Thailand", rate: "0.0880", prefixes: ["66"] },
    { group: "Thailand - Mobile", rate: "0.0894", prefixes: ["66"] },
    { group: "Thailand - Premium Services", rate: "0.9030", prefixes: ["66"] },
  ],
  ZA: [
    { group: "South Africa - Mobile", rate: "0.3390", prefixes: ["27"] },
    { group: "South Africa", rate: "0.4044", prefixes: ["27"] },
    { group: "South Africa - Premium Services", rate: "0.8490", prefixes: ["27"] },
  ],
  PL: [
    { group: "Poland", rate: "0.0270", prefixes: ["48"] },
    { group: "Poland - Fixed - Others (Netia, OLO, T-mobile)", rate: "0.0330", prefixes: ["48"] },
    { group: "Poland - Mobile from EEA", rate: "0.0584", prefixes: ["48"] },
    { group: "Poland - Mobile", rate: "0.2330", prefixes: ["48"] },
    { group: "Poland - Premium Services", rate: "1.1810", prefixes: ["48"] },
  ],
  PT: [
    { group: "Portugal - Fixed - National from EEA", rate: "0.0066", prefixes: ["351"] },
    { group: "Portugal", rate: "0.0111", prefixes: ["351"] },
    { group: "Portugal from EEA", rate: "0.0123", prefixes: ["351"] },
    { group: "Portugal - Fixed - National", rate: "0.0410", prefixes: ["351"] },
    { group: "Portugal - Mobile from EEA", rate: "0.0430", prefixes: ["351"] },
    { group: "Portugal - Mobile", rate: "0.4330", prefixes: ["351"] },
    { group: "Portugal - Premium Services", rate: "0.9430", prefixes: ["351"] },
    { group: "Portugal - Mobile from Portugal Fixed", rate: "1.2200", prefixes: ["351"] },
  ],
  TR: [
    { group: "Turkey", rate: "0.0530", prefixes: ["90"] },
    { group: "Turkey - Mobile", rate: "0.2210", prefixes: ["90"] },
    { group: "Turkey - Premium Services", rate: "0.9010", prefixes: ["90"] },
  ],
};

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
  { country: "France", code: "FR", flag: "🇫🇷", others: 7980, plivo: 7099.6 },
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

// Verify WhatsApp rates — from live plivo.com/verify/pricing/ whatsappPricing object
// These are distinct from WA_CHAT_RATES (which are for the WhatsApp chat pricing page)
export const VERIFY_WHATSAPP_RATES: Record<string, number> = {
  // Named country rates
  AR: 0.0375, BR: 0.0323, CL: 0.0535, CO: 0.0085, EG: 0.0626,
  FR: 0.0699, DE: 0.0776, IN: 0.0022, ID: 0.0308, IL: 0.0177,
  IT: 0.0386, MY: 0.0188, MX: 0.0247, NL: 0.0728, NG: 0.0295,
  PK: 0.0236, PE: 0.0385, RU: 0.0437, SA: 0.0234, ZA: 0.0188,
  ES: 0.035, TR: 0.0091, AE: 0.0186, GB: 0.0366, US: 0.0143, CA: 0.0143,
  // Africa tier (0.0152)
  DZ: 0.0152, AO: 0.0152, BW: 0.0152, BF: 0.0152, BI: 0.0152, CV: 0.0152,
  CM: 0.0152, CF: 0.0152, TD: 0.0152, KM: 0.0152, CD: 0.0152, DJ: 0.0152,
  GQ: 0.0152, ER: 0.0152, SZ: 0.0152, ET: 0.0152, GA: 0.0152, GM: 0.0152,
  GH: 0.0152, GN: 0.0152, GW: 0.0152, CI: 0.0152, KE: 0.0152, LS: 0.0152,
  LR: 0.0152, LY: 0.0152, MG: 0.0152, MW: 0.0152, ML: 0.0152, MR: 0.0152,
  MU: 0.0152, MA: 0.0152, MZ: 0.0152, NA: 0.0152, NE: 0.0152, RW: 0.0152,
  ST: 0.0152, SN: 0.0152, SC: 0.0152, SL: 0.0152, SO: 0.0152, SS: 0.0152,
  TZ: 0.0152, TG: 0.0152, UG: 0.0152, ZM: 0.0152, ZW: 0.0152,
  // Asia-Pacific tier (0.0433)
  AF: 0.0433, AU: 0.0433, BD: 0.0433, BT: 0.0433, BN: 0.0433, KH: 0.0433,
  CN: 0.0433, TL: 0.0433, FJ: 0.0433, JP: 0.0433, KZ: 0.0433, KG: 0.0433,
  LA: 0.0433, MV: 0.0433, MN: 0.0433, MM: 0.0433, NZ: 0.0433, KP: 0.0433,
  PG: 0.0433, PH: 0.0433, SG: 0.0433, KR: 0.0433, LK: 0.0433, TJ: 0.0433,
  TH: 0.0433, TM: 0.0433, UZ: 0.0433, VN: 0.0433,
  // Eastern Europe tier (0.0565)
  AL: 0.0565, BA: 0.0565, BG: 0.0565, HR: 0.0565, CZ: 0.0565, EE: 0.0565,
  HU: 0.0565, LV: 0.0565, LT: 0.0565, PL: 0.0565, RO: 0.0565, SK: 0.0565,
  SI: 0.0565, UA: 0.0565,
  // Americas tier (0.0453)
  BO: 0.0453, CR: 0.0453, CU: 0.0453, DO: 0.0453, EC: 0.0453, SV: 0.0453,
  GT: 0.0453, HN: 0.0453, NI: 0.0453, PA: 0.0453, PY: 0.0453, UY: 0.0453,
  VE: 0.0453,
  // Middle East tier (0.0186)
  BH: 0.0186, IR: 0.0186, IQ: 0.0186, JO: 0.0186, KW: 0.0186, LB: 0.0186,
  OM: 0.0186, QA: 0.0186, SY: 0.0186, YE: 0.0186,
  // Western Europe tier (0.0386)
  AT: 0.0386, BE: 0.0386, DK: 0.0386, FI: 0.0386, GR: 0.0386, IS: 0.0386,
  IE: 0.0386, LU: 0.0386, NO: 0.0386, PT: 0.0386, SE: 0.0386, CH: 0.0386,
};
export const VERIFY_WHATSAPP_DEFAULT = 0.0312;
