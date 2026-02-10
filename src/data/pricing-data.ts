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
export const VOICE_PRIORITY_COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

export const WA_CHAT_PRIORITY_COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

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

// SIP Trunking (Zentrunk) pricing data

export interface SIPRates {
  local: number;
  mobile: number;
  national: number;
  tollfree: number;
}

export const SIP_PRIORITY_COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

// SIP inbound per-minute rates by country (0 means not available)
export const SIP_RATES: Record<string, SIPRates> = {
  US: { local: 0.0075, mobile: 0, national: 0, tollfree: 0.027 },
  CA: { local: 0.0045, mobile: 0, national: 0, tollfree: 0.03 },
  GB: { local: 0.006, mobile: 0.003, national: 0, tollfree: 0.047 },
  AU: { local: 0.0025, mobile: 0.005, national: 0, tollfree: 0.045 },
  IN: { local: 0.0038, mobile: 0, national: 0, tollfree: 0 },
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

// SIP country name mapping for display
export const SIP_COUNTRY_NAMES: Record<string, string> = {
  US: "United States", CA: "Canada", GB: "United Kingdom", AU: "Australia",
  IN: "India", FR: "France", ES: "Spain", AE: "United Arab Emirates",
  AR: "Argentina", AT: "Austria", BH: "Bahrain", BE: "Belgium",
  BR: "Brazil", BG: "Bulgaria", CL: "Chile", CN: "China",
  CO: "Colombia", HR: "Croatia", CY: "Cyprus", CZ: "Czech Republic",
  DK: "Denmark", DO: "Dominican Republic", EG: "Egypt", FI: "Finland",
  GR: "Greece", HK: "Hong Kong", HU: "Hungary", ID: "Indonesia",
  IE: "Ireland", IL: "Israel", JP: "Japan", LV: "Latvia",
  LT: "Lithuania", MY: "Malaysia", MX: "Mexico", NL: "Netherlands",
  NZ: "New Zealand", PE: "Peru", PH: "Philippines", PL: "Poland",
  PT: "Portugal", QA: "Qatar", RO: "Romania", RU: "Russia",
  SA: "Saudi Arabia", SG: "Singapore", SK: "Slovakia", SI: "Slovenia",
  ZA: "South Africa", SE: "Sweden", CH: "Switzerland", TR: "Turkey",
  DE: "Germany",
};

// Voice calculator data - Plivo vs Others (cost per 100K minutes)
export const VOICE_CALCULATOR_DATA: CalculatorEntry[] = [
  { country: "United States", code: "US", flag: "🇺🇸", others: 2250, plivo: 1500 },
  { country: "Canada", code: "CA", flag: "🇨🇦", others: 3160, plivo: 1056 },
  { country: "United Kingdom", code: "GB", flag: "🇬🇧", others: 5650, plivo: 2500 },
  { country: "Australia", code: "AU", flag: "🇦🇺", others: 3800, plivo: 3000 },
  { country: "India", code: "IN", flag: "🇮🇳", others: 3300, plivo: 940 },
  { country: "France", code: "FR", flag: "🇫🇷", others: 5500, plivo: 4000 },
  { country: "Italy", code: "IT", flag: "🇮🇹", others: 6200, plivo: 4800 },
  { country: "Spain", code: "ES", flag: "🇪🇸", others: 5900, plivo: 4500 },
  { country: "Philippines", code: "PH", flag: "🇵🇭", others: 30000, plivo: 23000 },
  { country: "Singapore", code: "SG", flag: "🇸🇬", others: 4500, plivo: 3000 },
  { country: "Indonesia", code: "ID", flag: "🇮🇩", others: 23000, plivo: 18000 },
  { country: "Germany", code: "DE", flag: "🇩🇪", others: 7000, plivo: 5500 },
];
