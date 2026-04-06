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
  mobileInbound: string;
  mobileOutbound: string;
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
export const WA_CALL_PRIORITY_COUNTRIES: CountryOption[] = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

// Phone number coverage — source: "Plivo Phone Number Coverage" spreadsheet
// Only these 9 countries have phone number support (and thus inbound calling)
export const NUMBER_COVERAGE_COUNTRIES = new Set([
  "US", "CA", "IN", "AE", "BR", "AU", "NZ", "GB", "SG",
]);

// Which number types each coverage country supports
export interface NumberTypeCoverage {
  local: boolean;
  mobile: boolean;
  tollfree: boolean;
}

export const NUMBER_TYPE_COVERAGE: Record<string, NumberTypeCoverage> = {
  US: { local: true, mobile: false, tollfree: true },
  CA: { local: true, mobile: false, tollfree: true },
  IN: { local: true, mobile: false, tollfree: true },
  AE: { local: true, mobile: false, tollfree: true },
  BR: { local: true, mobile: false, tollfree: true },
  AU: { local: true, mobile: true, tollfree: true },
  NZ: { local: true, mobile: false, tollfree: true },
  GB: { local: true, mobile: true, tollfree: false },
  SG: { local: true, mobile: false, tollfree: false },
};

// Helper: does this country have inbound number coverage?
export function hasNumberCoverage(countryCode: string): boolean {
  return NUMBER_COVERAGE_COUNTRIES.has(countryCode);
}

// Helper: does this country support toll-free numbers?
export function hasTollfreeSupport(countryCode: string): boolean {
  return NUMBER_TYPE_COVERAGE[countryCode]?.tollfree ?? false;
}

// Phone number rental rates - shared between Voice and WhatsApp Call pages
export const PHONE_RENTAL_RATES: Record<string, PhoneRentalRates> = {
  IN: { local: { rate: 2.94, currency: "$" } },
  US: { local: { rate: 0.50, currency: "$" }, tollfree: { rate: 1.00, currency: "$" } },
  CA: { local: { rate: 0.75, currency: "$" }, tollfree: { rate: 1.00, currency: "$" } },
  AE: { tollfree: { rate: 50.00, currency: "$" } },
  BR: { local: { rate: 6.17, currency: "$" }, tollfree: { rate: 30.00, currency: "$" } },
  AU: { local: { rate: 2.50, currency: "$" }, tollfree: { rate: 12.00, currency: "$" }, mobile: { rate: 5.00, currency: "$" } },
  NZ: { local: { rate: 2.55, currency: "$" }, tollfree: { rate: 34.00, currency: "$" } },
  GB: { local: { rate: 0.85, currency: "$" }, mobile: { rate: 0.90, currency: "$" } },
  SG: { local: { rate: 16.00, currency: "$" } },
};

// Voice pricing - from SIP Trunking + Internal API (matching live plivo.com)
// Voice pricing - from SIP Trunking API (matching live plivo.com)
export const VOICE_RATES: Record<string, VoiceRates> = {
  US: { localInbound: "$0.0030/min", localOutbound: "$0.0055/min", tollfreeInbound: "$0.0120/min", tollfreeOutbound: "$0.0030/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CA: { localInbound: "$0.0040/min", localOutbound: "$0.0120/min", tollfreeInbound: "$0.0120/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  GB: { localInbound: "$0.0030/min", localOutbound: "$0.0072/min", tollfreeInbound: "$0.0470/min", tollfreeOutbound: "$0.0075/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AU: { localInbound: "$0.0025/min", localOutbound: "$0.0188/min", tollfreeInbound: "$0.0450/min", tollfreeOutbound: "$0.0669/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  IN: { localInbound: "$0.0092/min", localOutbound: "$0.0092/min", tollfreeInbound: "$0.2200/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  FR: { localInbound: "$0.0030/min", localOutbound: "$0.0160/min", tollfreeInbound: "$0.2470/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ES: { localInbound: "$0.0030/min", localOutbound: "$0.0113/min", tollfreeInbound: "$0.2642/min", tollfreeOutbound: "$0.9030/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AE: { localInbound: "$NaN/min", localOutbound: "$0.2180/min", tollfreeInbound: "$0.2250/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AF: { localInbound: "$NaN/min", localOutbound: "$0.3780/min", tollfreeInbound: "$NaN/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AL: { localInbound: "$NaN/min", localOutbound: "$0.2598/min", tollfreeInbound: "$NaN/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  DZ: { localInbound: "$NaN/min", localOutbound: "$0.1480/min", tollfreeInbound: "$NaN/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AO: { localInbound: "$NaN/min", localOutbound: "$0.0569/min", tollfreeInbound: "$NaN/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AR: { localInbound: "$0.0063/min", localOutbound: "$0.0130/min", tollfreeInbound: "$0.1965/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AM: { localInbound: "$NaN/min", localOutbound: "$0.2081/min", tollfreeInbound: "$NaN/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AT: { localInbound: "$0.0030/min", localOutbound: "$0.0108/min", tollfreeInbound: "$0.1946/min", tollfreeOutbound: "$0.0143/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  AZ: { localInbound: "Not Supported", localOutbound: "$0.2810/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BH: { localInbound: "$0.0085/min", localOutbound: "$0.1530/min", tollfreeInbound: "$0.2500/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BD: { localInbound: "$0.0910/min", localOutbound: "$0.0460/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BY: { localInbound: "Not Supported", localOutbound: "$0.5443/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BE: { localInbound: "$0.0070/min", localOutbound: "$0.0395/min", tollfreeInbound: "$0.2621/min", tollfreeOutbound: "$1.2030/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BJ: { localInbound: "Not Supported", localOutbound: "$0.4858/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BO: { localInbound: "Not Supported", localOutbound: "$0.3075/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BW: { localInbound: "Not Supported", localOutbound: "$0.1451/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BR: { localInbound: "$0.0085/min", localOutbound: "$0.0210/min", tollfreeInbound: "$0.2000/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BN: { localInbound: "Not Supported", localOutbound: "$0.0404/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BG: { localInbound: "$0.0085/min", localOutbound: "$0.1372/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  BF: { localInbound: "Not Supported", localOutbound: "$0.5075/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  KH: { localInbound: "Not Supported", localOutbound: "$0.0910/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CM: { localInbound: "Not Supported", localOutbound: "$0.4463/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CL: { localInbound: "$0.0085/min", localOutbound: "$0.0230/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CN: { localInbound: "$0.0085/min", localOutbound: "$0.0399/min", tollfreeInbound: "$0.3800/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CO: { localInbound: "$0.0085/min", localOutbound: "$0.0330/min", tollfreeInbound: "$0.1451/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CD: { localInbound: "Not Supported", localOutbound: "$0.5552/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CR: { localInbound: "$0.0230/min", localOutbound: "$0.0308/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CI: { localInbound: "Not Supported", localOutbound: "$0.5435/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  HR: { localInbound: "$0.0050/min", localOutbound: "$0.2283/min", tollfreeInbound: "$0.4267/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CY: { localInbound: "$0.0085/min", localOutbound: "$0.1057/min", tollfreeInbound: "$0.1138/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CZ: { localInbound: "$0.0050/min", localOutbound: "$0.0304/min", tollfreeInbound: "$0.2569/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  DK: { localInbound: "$0.0085/min", localOutbound: "$0.0165/min", tollfreeInbound: "$0.3333/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  DO: { localInbound: "$0.0085/min", localOutbound: "$0.0760/min", tollfreeInbound: "$0.1458/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  EC: { localInbound: "$0.4830/min", localOutbound: "$0.1980/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  EG: { localInbound: "$0.7333/min", localOutbound: "$0.1410/min", tollfreeInbound: "$0.5500/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SV: { localInbound: "$0.0085/min", localOutbound: "$0.2510/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  EE: { localInbound: "$0.0085/min", localOutbound: "$0.0310/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ET: { localInbound: "Not Supported", localOutbound: "$0.3604/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  FI: { localInbound: "$0.0085/min", localOutbound: "$0.6010/min", tollfreeInbound: "$0.2474/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  GE: { localInbound: "$0.0085/min", localOutbound: "$0.2730/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  DE: { localInbound: "$0.0085/min", localOutbound: "$0.0135/min", tollfreeInbound: "$0.2630/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  GH: { localInbound: "$0.0200/min", localOutbound: "$0.4210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  GR: { localInbound: "$0.0085/min", localOutbound: "$0.0581/min", tollfreeInbound: "$0.1089/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  GT: { localInbound: "$0.0280/min", localOutbound: "$0.2017/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  GN: { localInbound: "Not Supported", localOutbound: "$0.6610/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  HN: { localInbound: "$0.0200/min", localOutbound: "$0.2350/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  HK: { localInbound: "$0.0085/min", localOutbound: "$0.0410/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  HU: { localInbound: "$0.0200/min", localOutbound: "$0.0530/min", tollfreeInbound: "$0.1967/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  IS: { localInbound: "Not Supported", localOutbound: "$0.0272/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ID: { localInbound: "$0.0030/min", localOutbound: "$0.0830/min", tollfreeInbound: "$1.1300/min", tollfreeOutbound: "$0.0830/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  IQ: { localInbound: "Not Supported", localOutbound: "$0.3010/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  IE: { localInbound: "$0.0085/min", localOutbound: "$0.0130/min", tollfreeInbound: "$0.4995/min", tollfreeOutbound: "$0.2210/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  IL: { localInbound: "$0.0082/min", localOutbound: "$0.0170/min", tollfreeInbound: "$0.1142/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  IT: { localInbound: "$0.0085/min", localOutbound: "$0.0130/min", tollfreeInbound: "$0.3943/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  JM: { localInbound: "$0.0200/min", localOutbound: "$0.3510/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  JP: { localInbound: "$0.0085/min", localOutbound: "$0.0385/min", tollfreeInbound: "$0.6666/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  JO: { localInbound: "$0.0730/min", localOutbound: "$0.3010/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  KZ: { localInbound: "Not Supported", localOutbound: "$0.0673/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  KE: { localInbound: "$0.0230/min", localOutbound: "$0.3810/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  KW: { localInbound: "Not Supported", localOutbound: "$0.1210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  KG: { localInbound: "Not Supported", localOutbound: "$0.2203/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LA: { localInbound: "Not Supported", localOutbound: "$0.1012/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LV: { localInbound: "$0.0050/min", localOutbound: "$0.8490/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LB: { localInbound: "Not Supported", localOutbound: "$0.1210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LR: { localInbound: "Not Supported", localOutbound: "$0.6619/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LT: { localInbound: "$0.0050/min", localOutbound: "$0.2295/min", tollfreeInbound: "$0.0512/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LU: { localInbound: "$0.0085/min", localOutbound: "$0.0192/min", tollfreeInbound: "$0.4800/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MG: { localInbound: "Not Supported", localOutbound: "$0.8680/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MW: { localInbound: "Not Supported", localOutbound: "$0.5351/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MY: { localInbound: "$0.0085/min", localOutbound: "$0.0444/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ML: { localInbound: "Not Supported", localOutbound: "$0.3072/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MT: { localInbound: "$0.0085/min", localOutbound: "$0.0127/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MX: { localInbound: "$0.0083/min", localOutbound: "$0.0125/min", tollfreeInbound: "$0.1837/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MD: { localInbound: "Not Supported", localOutbound: "$0.3758/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MN: { localInbound: "Not Supported", localOutbound: "$0.0260/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MA: { localInbound: "Not Supported", localOutbound: "$0.3210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MZ: { localInbound: "Not Supported", localOutbound: "$0.0808/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  MM: { localInbound: "Not Supported", localOutbound: "$0.3752/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NA: { localInbound: "Not Supported", localOutbound: "$0.0747/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NP: { localInbound: "Not Supported", localOutbound: "$0.2210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NL: { localInbound: "$0.0050/min", localOutbound: "$0.0145/min", tollfreeInbound: "$0.3097/min", tollfreeOutbound: "$2.8310/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NZ: { localInbound: "$0.0085/min", localOutbound: "$0.0233/min", tollfreeInbound: "$0.2112/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NI: { localInbound: "Not Supported", localOutbound: "$0.1795/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NE: { localInbound: "Not Supported", localOutbound: "$0.4920/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NG: { localInbound: "$0.0400/min", localOutbound: "$0.1610/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  NO: { localInbound: "$0.0050/min", localOutbound: "$0.0160/min", tollfreeInbound: "$0.0615/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  OM: { localInbound: "Not Supported", localOutbound: "$0.2244/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PK: { localInbound: "Not Supported", localOutbound: "$0.1410/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PA: { localInbound: "$0.0085/min", localOutbound: "$0.0418/min", tollfreeInbound: "$0.0517/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PY: { localInbound: "$0.2000/min", localOutbound: "$0.0444/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PE: { localInbound: "$0.0085/min", localOutbound: "$0.0125/min", tollfreeInbound: "$0.3033/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PH: { localInbound: "$0.2200/min", localOutbound: "$0.2230/min", tollfreeInbound: "$0.4500/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PL: { localInbound: "$0.0085/min", localOutbound: "$0.0270/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  PT: { localInbound: "$0.0085/min", localOutbound: "$0.0066/min", tollfreeInbound: "$0.3833/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  QA: { localInbound: "Not Supported", localOutbound: "$0.2710/min", tollfreeInbound: "$1.0150/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  RO: { localInbound: "$0.0085/min", localOutbound: "$0.0210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  RU: { localInbound: "$0.0085/min", localOutbound: "$0.0390/min", tollfreeInbound: "$0.2170/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  RW: { localInbound: "Not Supported", localOutbound: "$0.4090/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SA: { localInbound: "$0.1367/min", localOutbound: "$0.1390/min", tollfreeInbound: "$0.7470/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SN: { localInbound: "Not Supported", localOutbound: "$0.3320/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  RS: { localInbound: "Not Supported", localOutbound: "$0.2417/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SG: { localInbound: "$0.0085/min", localOutbound: "$0.0340/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SK: { localInbound: "$0.0085/min", localOutbound: "$0.0072/min", tollfreeInbound: "$0.2796/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SI: { localInbound: "$0.0085/min", localOutbound: "$0.2596/min", tollfreeInbound: "$0.3067/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ZA: { localInbound: "$0.0085/min", localOutbound: "$0.3390/min", tollfreeInbound: "$0.2500/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  KR: { localInbound: "$0.0085/min", localOutbound: "$0.0223/min", tollfreeInbound: "$0.1500/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  LK: { localInbound: "$0.2730/min", localOutbound: "$0.2210/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  SE: { localInbound: "$0.0065/min", localOutbound: "$0.0150/min", tollfreeInbound: "$0.1292/min", tollfreeOutbound: "$0.0309/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  CH: { localInbound: "$0.0085/min", localOutbound: "$0.0299/min", tollfreeInbound: "$0.1665/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TW: { localInbound: "$0.0970/min", localOutbound: "$0.0235/min", tollfreeInbound: "$0.6066/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TZ: { localInbound: "Not Supported", localOutbound: "$0.4685/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TH: { localInbound: "$0.0230/min", localOutbound: "$0.0880/min", tollfreeInbound: "$0.6683/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TG: { localInbound: "Not Supported", localOutbound: "$2.0410/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TT: { localInbound: "Not Supported", localOutbound: "$0.2310/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TN: { localInbound: "Not Supported", localOutbound: "$1.2010/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TR: { localInbound: "$0.0085/min", localOutbound: "$0.0530/min", tollfreeInbound: "$0.0085/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  TM: { localInbound: "Not Supported", localOutbound: "$0.1407/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  UG: { localInbound: "$0.0430/min", localOutbound: "$0.5469/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  UA: { localInbound: "$0.0130/min", localOutbound: "$0.2043/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  UY: { localInbound: "$0.3800/min", localOutbound: "$0.0890/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  UZ: { localInbound: "Not Supported", localOutbound: "$0.1457/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  VE: { localInbound: "Not Supported", localOutbound: "$0.0460/min", tollfreeInbound: "$0.4270/min", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  VN: { localInbound: "$0.0113/min", localOutbound: "$0.1030/min", tollfreeInbound: "$0.6370/min", tollfreeOutbound: "$0.1074/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  YE: { localInbound: "Not Supported", localOutbound: "$0.2010/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ZM: { localInbound: "Not Supported", localOutbound: "$0.5786/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
  ZW: { localInbound: "Not Supported", localOutbound: "$0.3010/min", tollfreeInbound: "Not Supported", tollfreeOutbound: "$0.0000/min", ipInbound: "$0.0033/min", ipOutbound: "$0.0033/min" },
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

// SIP Trunking pricing data

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
      { type: "Long Codes*", outbound: "$0.0055/sms", inbound: "$0.0055/sms" },
      { type: "Toll-Free", outbound: "$0.0055/sms", inbound: "$0.0055/sms" },
      { type: "Short Code*", outbound: "$0.0055/sms", inbound: "$0.0055/sms" },
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
      { type: "Long Codes", outbound: "$0.0055/sms", inbound: "$0.0055/sms" },
      { type: "Toll-Free", outbound: "$0.0055/sms", inbound: "$0.0055/sms" },
      { type: "Short Code", outbound: "$0.0250/sms", inbound: "$0.0055/sms" },
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
  ES: {
    sms: [
      { type: "Long codes", outbound: "$0.0716/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AE: {
    sms: [
      { type: "Long codes", outbound: "$0.0988/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AF: {
    sms: [
      { type: "Long codes", outbound: "$0.2330/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AL: {
    sms: [
      { type: "Long codes", outbound: "$0.1021/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  DZ: {
    sms: [
      { type: "Long codes", outbound: "$0.2077/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AO: {
    sms: [
      { type: "Long codes", outbound: "$0.1687/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AR: {
    sms: [
      { type: "Long codes", outbound: "$0.0795/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AM: {
    sms: [
      { type: "Long codes", outbound: "$0.1294/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AT: {
    sms: [
      { type: "Long codes", outbound: "$0.0828/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  AZ: {
    sms: [
      { type: "Long codes", outbound: "$0.2483/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BH: {
    sms: [
      { type: "Long codes", outbound: "$0.0319/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BD: {
    sms: [
      { type: "Long codes", outbound: "$0.2824/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BY: {
    sms: [
      { type: "Long codes", outbound: "$0.2500/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BE: {
    sms: [
      { type: "Long codes", outbound: "$0.0433/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BJ: {
    sms: [
      { type: "Long codes", outbound: "$0.2172/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BO: {
    sms: [
      { type: "Long codes", outbound: "$0.1916/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BW: {
    sms: [
      { type: "Long codes", outbound: "$0.0777/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BR: {
    sms: [
      { type: "Long codes", outbound: "$0.0484/sms", inbound: "$0.0100/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BN: {
    sms: [
      { type: "Long codes", outbound: "$0.0547/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BG: {
    sms: [
      { type: "Long codes", outbound: "$0.1420/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  BF: {
    sms: [
      { type: "Long codes", outbound: "$0.2000/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  KH: {
    sms: [
      { type: "Long codes", outbound: "$0.3400/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CM: {
    sms: [
      { type: "Long codes", outbound: "$0.2113/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CL: {
    sms: [
      { type: "Long codes", outbound: "$0.0630/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CN: {
    sms: [
      { type: "Long codes", outbound: "$0.1082/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CO: {
    sms: [
      { type: "Long codes", outbound: "$0.0471/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CD: {
    sms: [
      { type: "Long codes", outbound: "$0.0842/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CR: {
    sms: [
      { type: "Long codes", outbound: "$0.0358/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CI: {
    sms: [
      { type: "Long codes", outbound: "$0.0800/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  HR: {
    sms: [
      { type: "Long codes", outbound: "$0.0956/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CY: {
    sms: [
      { type: "Long codes", outbound: "$0.0837/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CZ: {
    sms: [
      { type: "Long codes", outbound: "$0.0597/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  DK: {
    sms: [
      { type: "Long codes", outbound: "$0.0469/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  DO: {
    sms: [
      { type: "Long codes", outbound: "$0.0673/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  EC: {
    sms: [
      { type: "Long codes", outbound: "$0.2516/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  EG: {
    sms: [
      { type: "Long codes", outbound: "$0.1615/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SV: {
    sms: [
      { type: "Long codes", outbound: "$0.1005/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  EE: {
    sms: [
      { type: "Long codes", outbound: "$0.0825/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  ET: {
    sms: [
      { type: "Long codes", outbound: "$0.3352/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  FI: {
    sms: [
      { type: "Long codes", outbound: "$0.0724/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  GE: {
    sms: [
      { type: "Long codes", outbound: "$0.0191/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  GH: {
    sms: [
      { type: "Long codes", outbound: "$0.3064/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  GR: {
    sms: [
      { type: "Long codes", outbound: "$0.0585/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  GT: {
    sms: [
      { type: "Long codes", outbound: "$0.1019/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  GN: {
    sms: [
      { type: "Long codes", outbound: "$0.2000/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  HN: {
    sms: [
      { type: "Long codes", outbound: "$0.2029/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  HK: {
    sms: [
      { type: "Long codes", outbound: "$0.0586/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  HU: {
    sms: [
      { type: "Long codes", outbound: "$0.0703/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  IS: {
    sms: [
      { type: "Long codes", outbound: "$0.0638/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  ID: {
    sms: [
      { type: "Long codes", outbound: "$0.3333/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  IQ: {
    sms: [
      { type: "Long codes", outbound: "$0.2857/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  IE: {
    sms: [
      { type: "Long codes", outbound: "$0.0664/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  IL: {
    sms: [
      { type: "Long codes", outbound: "$0.1824/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  IT: {
    sms: [
      { type: "Long codes", outbound: "$0.0860/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  JM: {
    sms: [
      { type: "Long codes", outbound: "$0.2305/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  JP: {
    sms: [
      { type: "Long codes", outbound: "$0.0587/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  JO: {
    sms: [
      { type: "Long codes", outbound: "$0.3235/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  KZ: {
    sms: [
      { type: "Long codes", outbound: "$0.2709/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  KE: {
    sms: [
      { type: "Long codes", outbound: "$0.1398/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  KW: {
    sms: [
      { type: "Long codes", outbound: "$0.2504/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  KG: {
    sms: [
      { type: "Long codes", outbound: "$0.2948/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LA: {
    sms: [
      { type: "Long codes", outbound: "$0.0679/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LV: {
    sms: [
      { type: "Long codes", outbound: "$0.0667/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LB: {
    sms: [
      { type: "Long codes", outbound: "$0.3154/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LR: {
    sms: [
      { type: "Long codes", outbound: "$0.1733/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LT: {
    sms: [
      { type: "Long codes", outbound: "$0.0477/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LU: {
    sms: [
      { type: "Long codes", outbound: "$0.0673/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MG: {
    sms: [
      { type: "Long codes", outbound: "$0.3352/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MW: {
    sms: [
      { type: "Long codes", outbound: "$0.3120/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MY: {
    sms: [
      { type: "Long codes", outbound: "$0.0316/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  ML: {
    sms: [
      { type: "Long codes", outbound: "$0.2902/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MT: {
    sms: [
      { type: "Long codes", outbound: "$0.0549/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MX: {
    sms: [
      { type: "Long codes", outbound: "$0.0836/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MD: {
    sms: [
      { type: "Long codes", outbound: "$0.0882/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MN: {
    sms: [
      { type: "Long codes", outbound: "$0.1872/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MA: {
    sms: [
      { type: "Long codes", outbound: "$0.1613/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MZ: {
    sms: [
      { type: "Long codes", outbound: "$0.1333/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  MM: {
    sms: [
      { type: "Long codes", outbound: "$0.1891/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NA: {
    sms: [
      { type: "Long codes", outbound: "$0.0512/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NP: {
    sms: [
      { type: "Long codes", outbound: "$0.2546/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NL: {
    sms: [
      { type: "Long codes", outbound: "$0.1632/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NZ: {
    sms: [
      { type: "Long codes", outbound: "$0.0980/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NI: {
    sms: [
      { type: "Long codes", outbound: "$0.0853/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NE: {
    sms: [
      { type: "Long codes", outbound: "$0.0656/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NG: {
    sms: [
      { type: "Long codes", outbound: "$0.0236/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  NO: {
    sms: [
      { type: "Long codes", outbound: "$0.0584/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  OM: {
    sms: [
      { type: "Long codes", outbound: "$0.1378/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PK: {
    sms: [
      { type: "Long codes", outbound: "$0.2574/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PA: {
    sms: [
      { type: "Long codes", outbound: "$0.1253/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PY: {
    sms: [
      { type: "Long codes", outbound: "$0.0197/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PE: {
    sms: [
      { type: "Long codes", outbound: "$0.1850/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PH: {
    sms: [
      { type: "Long codes", outbound: "$0.1733/sms", inbound: "$0.0050/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PL: {
    sms: [
      { type: "Long codes", outbound: "$0.0285/sms", inbound: "$0.0065/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  PT: {
    sms: [
      { type: "Long codes", outbound: "$0.0460/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  QA: {
    sms: [
      { type: "Long codes", outbound: "$0.1819/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  RO: {
    sms: [
      { type: "Long codes", outbound: "$0.0656/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  RU: {
    sms: [
      { type: "Long codes", outbound: "$0.3962/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  RW: {
    sms: [
      { type: "Long codes", outbound: "$0.2054/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SA: {
    sms: [
      { type: "Long codes", outbound: "$0.1312/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SN: {
    sms: [
      { type: "Long codes", outbound: "$0.2917/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  RS: {
    sms: [
      { type: "Long codes", outbound: "$0.1326/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SG: {
    sms: [
      { type: "Long codes", outbound: "$0.0516/sms", inbound: "$0.1000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SK: {
    sms: [
      { type: "Long codes", outbound: "$0.0771/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SI: {
    sms: [
      { type: "Long codes", outbound: "$0.1049/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  ZA: {
    sms: [
      { type: "Long codes", outbound: "$0.0156/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  KR: {
    sms: [
      { type: "Long codes", outbound: "$0.0500/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  LK: {
    sms: [
      { type: "Long codes", outbound: "$0.2993/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  SE: {
    sms: [
      { type: "Long codes", outbound: "$0.0550/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  CH: {
    sms: [
      { type: "Long codes", outbound: "$0.0700/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TW: {
    sms: [
      { type: "Long codes", outbound: "$0.0621/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TZ: {
    sms: [
      { type: "Long codes", outbound: "$0.1695/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TH: {
    sms: [
      { type: "Long codes", outbound: "$0.0271/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TG: {
    sms: [
      { type: "Long codes", outbound: "$0.2657/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TT: {
    sms: [
      { type: "Long codes", outbound: "$0.2344/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TN: {
    sms: [
      { type: "Long codes", outbound: "$0.2664/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TR: {
    sms: [
      { type: "Long codes", outbound: "$0.0285/sms", inbound: "$0.0000/sms" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  TM: {
    sms: [
      { type: "Long codes", outbound: "$0.3125/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  UG: {
    sms: [
      { type: "Long codes", outbound: "$0.1595/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  UA: {
    sms: [
      { type: "Long codes", outbound: "$0.1660/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  UY: {
    sms: [
      { type: "Long codes", outbound: "$0.0559/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  UZ: {
    sms: [
      { type: "Long codes", outbound: "$0.1310/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  VE: {
    sms: [
      { type: "Long codes", outbound: "$0.1914/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  VN: {
    sms: [
      { type: "Long codes", outbound: "$0.0687/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  YE: {
    sms: [
      { type: "Long codes", outbound: "$0.2697/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  ZM: {
    sms: [
      { type: "Long codes", outbound: "$0.2349/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
    ],
    currency: "$",
  },
  ZW: {
    sms: [
      { type: "Long codes", outbound: "$0.1015/sms", inbound: "Not Supported" },
      { type: "Short codes", outbound: "Not Supported", inbound: "$0.0000/sms" },
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
      { type: "Local numbers", price: "$0.50/month", capabilities: ["Voice", "SMS", "MMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
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
      { type: "Local numbers", price: "$0.75/month", capabilities: ["Voice", "SMS", "MMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
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
      { type: "Local numbers", price: "$0.55/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Not Needed" },
      { label: "Mobile numbers", detail: "Not Needed" },
    ],
  },
  AU: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$3.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$12.00/month", capabilities: ["Voice", "SIP Trunking"] },
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
      { type: "Local numbers", price: "$2.94/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Certificate of Incorporation, GST" },
    ],
  },
  DE: {
    numbers: [
      { type: "Local numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$1.50/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$5.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  FR: {
    numbers: [
      { type: "Local numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$2.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$1.35/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  BR: {
    numbers: [
      { type: "Local numbers", price: "$6.17/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$20.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$30.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "Local address, Tax ID (CNPJ)" },
      { label: "Toll-free numbers", detail: "National address, Tax ID (CNPJ)" },
    ],
  },
  SG: {
    numbers: [
      { type: "National numbers", price: "$16.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "National numbers", detail: "National address, Tax ID (NRIC)" },
    ],
  },
  AE: {
    numbers: [
      { type: "Toll-free numbers", price: "$50.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Toll-free numbers", detail: "Copy of Business Registration, Foreign Address, LOI" },
    ],
  },
  NZ: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$34.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
    compliance: [
      { label: "Local numbers", detail: "National address, NZBN" },
      { label: "Toll-free numbers", detail: "National address, NZBN" },
    ],
  },
  IE: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "National numbers", price: "$0.85/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  NL: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$10.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "National numbers", price: "$2.55/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  SE: {
    numbers: [
      { type: "Local numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$2.50/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$10.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  CH: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  IT: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$8.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  ES: {
    numbers: [
      { type: "Local numbers", price: "$3.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  PL: {
    numbers: [
      { type: "Local numbers", price: "$0.85/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$11.50/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
    ],
    currency: "$",
  },
  MX: {
    numbers: [
      { type: "Local numbers", price: "$5.83/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$25.50/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  JP: {
    numbers: [
      { type: "Local numbers", price: "$5.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  IL: {
    numbers: [
      { type: "Local numbers", price: "$3.40/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  ZA: {
    numbers: [
      { type: "Local numbers", price: "$1.28/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$7.50/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  HK: {
    numbers: [
      { type: "Mobile numbers", price: "$25.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "National numbers", price: "$5.10/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  DK: {
    numbers: [
      { type: "National numbers", price: "$2.10/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  AT: {
    numbers: [
      { type: "Mobile numbers", price: "$7.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  BE: {
    numbers: [
      { type: "Local numbers", price: "$2.50/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Mobile numbers", price: "$1.00/month", capabilities: ["Voice", "SMS", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  PH: {
    numbers: [
      { type: "Local numbers", price: "$25.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  CZ: {
    numbers: [
      { type: "Local numbers", price: "$1.25/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$29.75/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  FI: {
    numbers: [
      { type: "Local numbers", price: "$1.25/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$34.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  AR: {
    numbers: [
      { type: "Local numbers", price: "$7.50/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  BH: {
    numbers: [
      { type: "Toll-free numbers", price: "$10.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  BG: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  CL: {
    numbers: [
      { type: "Local numbers", price: "$5.95/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$43.22/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  CN: {
    numbers: [
      { type: "Local numbers", price: "$75.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$150.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  CO: {
    numbers: [
      { type: "Local numbers", price: "$17.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  HR: {
    numbers: [
      { type: "Local numbers", price: "$4.25/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$6.50/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  CY: {
    numbers: [
      { type: "Local numbers", price: "$30.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$11.67/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  DO: {
    numbers: [
      { type: "Toll-free numbers", price: "$46.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  EG: {
    numbers: [
      { type: "Toll-free numbers", price: "$50.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  GR: {
    numbers: [
      { type: "Local numbers", price: "$1.25/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  HU: {
    numbers: [
      { type: "Local numbers", price: "$3.40/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$11.50/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  ID: {
    numbers: [
      { type: "Local numbers", price: "$25.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  LV: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  LT: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$22.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  MY: {
    numbers: [
      { type: "Local numbers", price: "$18.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  PE: {
    numbers: [
      { type: "Toll-free numbers", price: "$43.33/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  PT: {
    numbers: [
      { type: "National numbers", price: "$1.25/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  QA: {
    numbers: [
      { type: "Toll-free numbers", price: "$750.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  RO: {
    numbers: [
      { type: "Local numbers", price: "$2.55/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  RU: {
    numbers: [
      { type: "Toll-free numbers", price: "$54.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  SA: {
    numbers: [
      { type: "Toll-free numbers", price: "$115.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  SK: {
    numbers: [
      { type: "Local numbers", price: "$1.50/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$21.25/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  SI: {
    numbers: [
      { type: "Local numbers", price: "$4.25/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$6.00/month", capabilities: ["Voice", "SIP Trunking"] },
    ],
    currency: "$",
  },
  TR: {
    numbers: [
      { type: "Local numbers", price: "$45.00/month", capabilities: ["Voice", "SIP Trunking"] },
      { type: "Toll-free numbers", price: "$85.00/month", capabilities: ["Voice", "SIP Trunking"] },
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
// Voice destination/network rates - from SIP Trunking API (matches live plivo.com)
// Voice destination/network rates - from SIP Trunking API (matching live plivo.com)
export const VOICE_DESTINATION_RATES: Record<string, { group: string; rate: string; prefixes: string[] }[]> = {
  US: [
    { group: "United States 800", rate: "0.001", prefixes: [] },
    { group: "United States", rate: "0.0055", prefixes: [] },
    { group: "United States", rate: "0.0055", prefixes: [] },
    { group: "United States", rate: "0.0055", prefixes: [] },
    { group: "United States", rate: "0.0055", prefixes: [] },
    { group: "United States Hawaii", rate: "0.032", prefixes: [] },
    { group: "United States Alaska", rate: "0.177", prefixes: [] },
  ],
  CA: [
    { group: "Canada", rate: "0.01200", prefixes: ["1204","1204200","1204201","1204202","1204203"] },
  ],
  GB: [
    { group: "United Kingdom", rate: "0.0072", prefixes: [] },
    { group: "United Kingdom - Fixed - Others", rate: "0.0072", prefixes: [] },
    { group: "United Kingdom - Tollfree", rate: "0.0072", prefixes: [] },
    { group: "United Kingdom - Major Mobile (H3G, O2, ORANGE, T-MOBILE, VODAFONE)", rate: "0.0171", prefixes: [] },
    { group: "United Kingdom - Mobile (SKY, Tier 3, Lyca,O3)", rate: "0.2844", prefixes: [] },
    { group: "United Kingdom - Mobile - Others (MANX, PNS, Digicel)", rate: "0.386", prefixes: [] },
    { group: "United Kingdom - Premium Services", rate: "0.8946", prefixes: [] },
  ],
  AU: [
    { group: "Australia", rate: "0.0188", prefixes: [] },
    { group: "Australia City Group", rate: "0.0188", prefixes: [] },
    { group: "Australia Special Services", rate: "0.04", prefixes: [] },
    { group: "Australia Mobile", rate: "0.058", prefixes: [] },
    { group: "Australia Mobile Optus Mobile", rate: "0.058", prefixes: [] },
    { group: "Australia Mobile Telstra", rate: "0.058", prefixes: [] },
    { group: "Australia Mobile Telstra Australia Via Lycatel", rate: "0.058", prefixes: [] },
    { group: "Australia Mobile Vodafone Hutchison", rate: "0.058", prefixes: [] },
    { group: "Australia Mobility Services", rate: "3.498", prefixes: [] },
    { group: "Australia Satellite Fixed Telstra", rate: "3.498", prefixes: [] },
    { group: "Australia Satellite Mobile Optus Mobile", rate: "3.498", prefixes: [] },
    { group: "Australia Satellite Mobile Telstra", rate: "3.498", prefixes: [] },
  ],
  IN: [
    { group: "India", rate: "0.00925", prefixes: [] },
    { group: "India Ahmedabad", rate: "0.00925", prefixes: [] },
    { group: "India Bangalore", rate: "0.00925", prefixes: [] },
    { group: "India Calcutta", rate: "0.00925", prefixes: [] },
    { group: "India Domestic", rate: "0.00925", prefixes: [] },
    { group: "India Ernakulam", rate: "0.00925", prefixes: [] },
    { group: "India Gujarat", rate: "0.00925", prefixes: [] },
    { group: "India Hyderabad", rate: "0.00925", prefixes: [] },
    { group: "India Jullundur", rate: "0.00925", prefixes: [] },
    { group: "India Kerala", rate: "0.00925", prefixes: [] },
    { group: "India Madras", rate: "0.00925", prefixes: [] },
    { group: "India Mobile", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Aircel", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Airtel", rate: "0.00925", prefixes: [] },
    { group: "India Mobile BSNL", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Idea", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Reliance", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Reliance Jio", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Tata", rate: "0.00925", prefixes: [] },
    { group: "India Mobile Vodafone", rate: "0.00925", prefixes: [] },
    { group: "India Mumbai", rate: "0.00925", prefixes: [] },
    { group: "India New Delhi", rate: "0.00925", prefixes: [] },
    { group: "India Pune", rate: "0.00925", prefixes: [] },
    { group: "India Punjab", rate: "0.00925", prefixes: [] },
    { group: "India Tamil Nadu", rate: "0.00925", prefixes: [] },
    { group: "India", rate: "0.00925", prefixes: [] },
    { group: "India", rate: "0.05", prefixes: [] },
    { group: "India Ahmedabad", rate: "0.05", prefixes: [] },
    { group: "India Bangalore", rate: "0.05", prefixes: [] },
    { group: "India Calcutta", rate: "0.05", prefixes: [] },
    { group: "India Domestic", rate: "0.05", prefixes: [] },
    { group: "India Ernakulam", rate: "0.05", prefixes: [] },
    { group: "India Gujarat", rate: "0.05", prefixes: [] },
    { group: "India Hyderabad", rate: "0.05", prefixes: [] },
    { group: "India Jullundur", rate: "0.05", prefixes: [] },
    { group: "India Kerala", rate: "0.05", prefixes: [] },
    { group: "India Madras", rate: "0.05", prefixes: [] },
    { group: "India Mobile", rate: "0.05", prefixes: [] },
    { group: "India Mobile Aircel", rate: "0.05", prefixes: [] },
    { group: "India Mobile Airtel", rate: "0.05", prefixes: [] },
    { group: "India Mobile BSNL", rate: "0.05", prefixes: [] },
    { group: "India Mobile Idea", rate: "0.05", prefixes: [] },
    { group: "India Mobile Reliance", rate: "0.05", prefixes: [] },
    { group: "India Mobile Reliance Jio", rate: "0.05", prefixes: [] },
    { group: "India Mobile Tata", rate: "0.05", prefixes: [] },
    { group: "India Mobile Vodafone", rate: "0.05", prefixes: [] },
    { group: "India Mumbai", rate: "0.05", prefixes: [] },
    { group: "India New Delhi", rate: "0.05", prefixes: [] },
    { group: "India Pune", rate: "0.05", prefixes: [] },
    { group: "India Punjab", rate: "0.05", prefixes: [] },
    { group: "India Tamil Nadu", rate: "0.05", prefixes: [] },
  ],
  FR: [
    { group: "France", rate: "0.016", prefixes: [] },
    { group: "France - Fixed Extended", rate: "0.024", prefixes: [] },
    { group: "France - Mobile (Primary)", rate: "0.0391", prefixes: [] },
    { group: "France - Mobile (Orange, SFR)", rate: "0.046", prefixes: [] },
    { group: "France", rate: "0.05", prefixes: [] },
    { group: "France - Fixed Extended", rate: "0.05", prefixes: [] },
    { group: "France - Mobile (Bouygues)", rate: "0.055", prefixes: [] },
    { group: "France - Mobile (Primary)", rate: "0.3", prefixes: [] },
    { group: "France - Mobile (Bouygues)", rate: "0.35", prefixes: [] },
    { group: "France - Mobile (Orange, SFR)", rate: "0.35", prefixes: [] },
    { group: "France - Mobile (Globalstar)", rate: "0.55", prefixes: [] },
    { group: "France - Premium Services", rate: "5.5", prefixes: [] },
    { group: "France High Cost", rate: "5.5", prefixes: [] },
    { group: "France High Cost", rate: "5.5", prefixes: [] },
  ],
  ES: [
    { group: "Spain", rate: "0.0113", prefixes: [] },
    { group: "Spain - Mobile", rate: "0.0279", prefixes: [] },
    { group: "Spain - Mobile", rate: "0.25", prefixes: [] },
    { group: "Spain - Premium Services", rate: "0.9", prefixes: [] },
  ],
  AE: [
    { group: "United Arab Emirates", rate: "0.218", prefixes: [] },
    { group: "United Arab Emirates Du", rate: "0.218", prefixes: [] },
    { group: "United Arab Emirates Mobile", rate: "0.218", prefixes: [] },
    { group: "United Arab Emirates Mobile Du", rate: "0.218", prefixes: [] },
    { group: "United Arab Emirates", rate: "1.747", prefixes: [] },
    { group: "United Arab Emirates Du", rate: "1.747", prefixes: [] },
    { group: "United Arab Emirates Mobile", rate: "1.747", prefixes: [] },
    { group: "United Arab Emirates Mobile Du", rate: "1.747", prefixes: [] },
  ],
  AF: [
    { group: "Afghanistan", rate: "0.378", prefixes: [] },
    { group: "Afghanistan - Mobile", rate: "0.378", prefixes: [] },
  ],
  AL: [
    { group: "Albania", rate: "0.2598", prefixes: [] },
    { group: "Albania - Mobile", rate: "0.6888", prefixes: [] },
    { group: "Albania - Premium Services", rate: "0.978", prefixes: [] },
  ],
  DZ: [
    { group: "Algeria", rate: "0.148", prefixes: [] },
    { group: "Algeria - Mobile", rate: "2.09", prefixes: [] },
  ],
  AO: [
    { group: "Angola", rate: "0.0569", prefixes: [] },
    { group: "Angola - Mobile - Others (Unitel)", rate: "0.2519", prefixes: [] },
    { group: "Angola - Mobile - Major Carriers (Movicel)", rate: "0.978", prefixes: [] },
    { group: "Angola - Premium Services", rate: "0.978", prefixes: [] },
  ],
  AR: [
    { group: "Argentina - Major Cities", rate: "0.013", prefixes: [] },
    { group: "Argentina - Other Cities", rate: "0.025", prefixes: [] },
    { group: "Argentina", rate: "0.038", prefixes: [] },
    { group: "Argentina - Mobile", rate: "0.3", prefixes: [] },
    { group: "Argentina - Mobile - Movistar", rate: "0.37", prefixes: [] },
  ],
  AM: [
    { group: "Armenia - Mobile - Others (Karabakh Telecom)", rate: "0.2081", prefixes: [] },
    { group: "Armenia", rate: "0.253", prefixes: [] },
    { group: "Armenia - Fixed - Others (Karabakh)", rate: "0.3333", prefixes: [] },
    { group: "Armenia - Mobile - Major Carriers (Orange, VEON)", rate: "0.3333", prefixes: [] },
    { group: "Armenia - Premium Services", rate: "0.348", prefixes: [] },
  ],
  AT: [
    { group: "Austria", rate: "0.0108", prefixes: [] },
    { group: "Austria Mobile", rate: "0.0369", prefixes: [] },
    { group: "Austria", rate: "0.24", prefixes: [] },
    { group: "Austria Mobile", rate: "0.398", prefixes: [] },
    { group: "Austria - Premium Services", rate: "0.598", prefixes: [] },
  ],
  AZ: [
    { group: "Azerbaijan", rate: "0.28100", prefixes: ["994"] },
    { group: "Azerbaijan - Mobile", rate: "1.54630", prefixes: ["994400","994404","99444","99450","99451"] },
    { group: "Azerbaijan - Mobile - Others (Bakcell)", rate: "0.45170", prefixes: ["99455"] },
  ],
  BH: [
    { group: "Bahrain", rate: "0.15300", prefixes: ["973","9731310","9731311","973136","97317"] },
    { group: "Bahrain - Mobile", rate: "0.18100", prefixes: ["97331","97332","97333","97334","973340"] },
  ],
  BD: [
    { group: "Bangladesh", rate: "0.04600", prefixes: ["880","8802","88031","880821"] },
    { group: "Bangladesh - Mobile", rate: "0.04600", prefixes: ["88011","88015","88016","88017","88018"] },
  ],
  BY: [
    { group: "Belarus", rate: "0.5443", prefixes: [] },
    { group: "Belarus - Mobile", rate: "0.5443", prefixes: [] },
    { group: "Belarus - Premium Services", rate: "1.798", prefixes: [] },
  ],
  BE: [
    { group: "Belgium from EEA", rate: "0.05350", prefixes: ["32","32102","32103","32104","32105"] },
    { group: "Belgium", rate: "0.12900", prefixes: ["32","32102","32103","32104","32105"] },
    { group: "Belgium - Mobile", rate: "0.70100", prefixes: ["32455","32456","32460","32461","324618"] },
    { group: "Belgium - Premium Services", rate: "1.20300", prefixes: ["32465","32466","32475","32486","32492"] },
    { group: "Belgium - Mobile from EEA", rate: "0.03950", prefixes: ["32455","32456","32460","32461","324618"] },
  ],
  BJ: [
    { group: "Benin", rate: "0.58870", prefixes: ["229"] },
    { group: "Benin - Mobile - Others (Libercom)", rate: "0.48580", prefixes: ["22990"] },
    { group: "Benin - Mobile Major Carriers (BELL, Moov, MTN)", rate: "0.58870", prefixes: ["22960","22961","22962","22963","22964"] },
  ],
  BO: [
    { group: "Bolivia", rate: "0.30750", prefixes: ["591","591220","5912210","5912211","5912212"] },
    { group: "Bolivia - Mobile", rate: "0.30750", prefixes: ["59160","59161","59165","59167","59168"] },
  ],
  BW: [
    { group: "Botswana - Mobile - Major Carrier (MTN)", rate: "0.30050", prefixes: ["26771","267740","267741","267742","267745"] },
    { group: "Botswana", rate: "0.14510", prefixes: ["267"] },
    { group: "Botswana - Mobile", rate: "0.37170", prefixes: ["26772","26773","267743","267744","267748"] },
  ],
  BR: [
    { group: "Brazil", rate: "0.03300", prefixes: ["55"] },
    { group: "Brazil - Fixed - Major Cities (Rio, Sao Paulo, Brasilia, Belo, Campinas, Curitiba, Fortaleza, Golania, Porto Alegre, Recife, Salvador, Vitoria)", rate: "0.02100", prefixes: ["551","5511","55112","551120","551121"] },
    { group: "Brazil - Mobile", rate: "0.09800", prefixes: ["551153","55116","55117","551170","551177"] },
  ],
  BN: [
    { group: "Brunei", rate: "0.04040", prefixes: ["673"] },
    { group: "Brunei - Mobile", rate: "0.04040", prefixes: ["673228","67371","67372","67373","67377"] },
  ],
  BG: [
    { group: "Bulgaria", rate: "0.13720", prefixes: ["359","3592"] },
    { group: "Bulgaria - Fixed - Others (OLO)", rate: "0.37780", prefixes: ["359240","359241","359242","359243","359244"] },
    { group: "Bulgaria - Mobile", rate: "0.58730", prefixes: ["359179","35943087","35943088","35943089","35987"] },
    { group: "Bulgaria - Premium Services", rate: "0.80100", prefixes: ["35924700","35924845","35924846","35924925041","35956934"] },
  ],
  BF: [
    { group: "Burkina Faso", rate: "0.50750", prefixes: ["226"] },
    { group: "Burkina Faso - Mobile", rate: "0.60600", prefixes: ["2262567","22651","22652","22654","22655"] },
    { group: "Burkina Faso - Premium Services", rate: "1.50100", prefixes: ["2265050","2265077"] },
  ],
  KH: [
    { group: "Cambodia", rate: "0.09100", prefixes: ["855","855236","855246","855256","855266"] },
    { group: "Cambodia - Mobile", rate: "0.09100", prefixes: ["8551","855100","855101","855102","855103"] },
  ],
  CM: [
    { group: "Cameroon - Premium Services", rate: "2.50100", prefixes: ["237222258","23722258","237222945","23722945","23733320294"] },
    { group: "Cameroon", rate: "0.44630", prefixes: ["237","2373342","2373343"] },
    { group: "Cameroon - Mobile", rate: "0.51480", prefixes: ["2376","237650","237651","237652","237653"] },
  ],
  CL: [
    { group: "Chile - Fixed - Other Cities (Easter Island, Punta Arenas)", rate: "1.10300", prefixes: ["562196","562197","562198","56224195701","56225880110"] },
    { group: "Chile - Mobile", rate: "0.07300", prefixes: ["569","56920","569300","569301","569302"] },
    { group: "Chile - Premium Services", rate: "1.15300", prefixes: ["5611","5615","562241","562258","562279"] },
    { group: "Chile - Fixed - Santiago", rate: "0.02300", prefixes: ["562","5622","5623","5624","5625"] },
    { group: "Chile", rate: "0.03900", prefixes: ["56"] },
  ],
  CN: [
    { group: "China", rate: "0.40000", prefixes: ["86"] },
    { group: "China - Mobile", rate: "0.40000", prefixes: ["8610646","8610647","8613","86130","86131"] },
  ],
  CO: [
    { group: "Colombia", rate: "0.05300", prefixes: ["57","5712","5713","5714","5715"] },
    { group: "Colombia - Mobile - Major Carriers (Comcel, Movistar, Tigo)", rate: "0.03300", prefixes: ["573","57300","57301","57302","573022"] },
    { group: "Colombia - Mobile - Others (Avantel)", rate: "0.04800", prefixes: ["57330","573300","57333","57350","57351"] },
  ],
  CD: [
    { group: "Democratic Republic Of The Congo", rate: "0.73110", prefixes: ["243"] },
    { group: "Democratic Republic Of The Congo - Mobile", rate: "0.73110", prefixes: ["24373","24378","24387","24392","24393"] },
    { group: "Democratic Republic Of The Congo - Mobile - Major Carriers (Africell, Airtel, Orange, Vodacom)", rate: "0.55520", prefixes: ["243800","243801","243802","243803","243804"] },
    { group: "Democratic Republic Of The Congo - Premium Services", rate: "3.68100", prefixes: ["243123","243124","243127","243133","243141"] },
  ],
  CR: [
    { group: "Costa Rica - Mobile - Major Carriers (ICE, Claro)", rate: "0.07980", prefixes: ["50650","50657","5067","5068"] },
    { group: "Costa Rica - Mobile - Others (Movistar)", rate: "0.10950", prefixes: ["5066"] },
    { group: "Costa Rica", rate: "0.03080", prefixes: ["506"] },
  ],
  CI: [
    { group: "Ivory Coast", rate: "0.54350", prefixes: ["225","225200","225210","225220","225230"] },
    { group: "Ivory Coast - Mobile", rate: "0.58230", prefixes: ["2251","2252","2253","2254","22540"] },
    { group: "Ivory Coast - Premium Services", rate: "3.80100", prefixes: ["22521780403","22521780404","2252178120","22521785","22521786"] },
  ],
  HR: [
    { group: "Croatia", rate: "0.22830", prefixes: ["385"] },
    { group: "Croatia - Mobile", rate: "0.67100", prefixes: ["38589091","38589098","385901","385902","385903"] },
    { group: "Croatia - Premium Services", rate: "0.90100", prefixes: ["38512389"] },
  ],
  CY: [
    { group: "Cyprus", rate: "0.10570", prefixes: ["357","35722000","35722001","35722002","35722003"] },
    { group: "Cyprus - Fixed - Others", rate: "0.21100", prefixes: ["35722022500","35722222","35723023000","35723232","35724024"] },
    { group: "Cyprus - Mobile", rate: "0.17490", prefixes: ["357121","357122","3571239","35794","357942"] },
  ],
  CZ: [
    { group: "Czech Republic", rate: "0.03040", prefixes: ["420"] },
    { group: "Czech Republic - Mobile", rate: "0.09680", prefixes: ["420600","420601","420602","420603","420604"] },
    { group: "Czech Republic - Premium Services", rate: "0.13100", prefixes: ["420840","420841","420842","420847","420848"] },
  ],
  DK: [
    { group: "Denmark", rate: "0.01650", prefixes: ["45"] },
    { group: "Denmark - Mobile", rate: "0.04280", prefixes: ["452","45200","45201","45202","45203"] },
  ],
  DO: [
    { group: "Dominican Republic - Mobile", rate: "0.18100", prefixes: ["1809201","1809202","1809203","1809204","1809205"] },
    { group: "Dominican Republic", rate: "0.07600", prefixes: ["1809","1809422","1809435","1809450","1809503"] },
  ],
  EC: [
    { group: "Ecuador - Mobile", rate: "0.46300", prefixes: ["5937288","5937289","593729","593730","593731"] },
    { group: "Ecuador - Major Cities (Cuenca - Etapa, Guayaquil)", rate: "0.19800", prefixes: ["5932","593222","593223","593224","593225"] },
    { group: "Ecuador", rate: "0.19800", prefixes: ["593"] },
  ],
  EG: [
    { group: "Egypt", rate: "0.14100", prefixes: ["20"] },
    { group: "Egypt - Mobile", rate: "0.19100", prefixes: ["2010","2011","2012","2015"] },
  ],
  SV: [
    { group: "El Salvador", rate: "0.25100", prefixes: ["503","5032121","50321224","50321225","5032124"] },
    { group: "El Salvador - Mobile", rate: "0.25100", prefixes: ["503600","503601","503602","503610","503611"] },
  ],
  EE: [
    { group: "Estonia", rate: "0.03100", prefixes: ["372"] },
    { group: "Estonia - Mobile - Major Carriers (Telia, Elisa, EMT)", rate: "0.56100", prefixes: ["3725","37250","37251","37252","372530"] },
    { group: "Estonia - Mobile - Others (Tele2)", rate: "1.10100", prefixes: ["37255","372580","372581","372582","372583"] },
    { group: "Estonia - Premium Services", rate: "1.10100", prefixes: ["3723302","3723520","37240","37253101220","37253101230"] },
  ],
  ET: [
    { group: "Ethiopia", rate: "0.42740", prefixes: ["251"] },
    { group: "Ethiopia - Fixed - Major Cities (Addis Abeba)", rate: "0.36040", prefixes: ["25111"] },
    { group: "Ethiopia - Mobile", rate: "0.42740", prefixes: ["25190","25191","251910","251911","251912"] },
  ],
  FI: [
    { group: "Finland", rate: "0.60100", prefixes: ["358"] },
    { group: "Finland - Mobile", rate: "0.60100", prefixes: ["35810","358294","358295","358299","3584"] },
  ],
  GE: [
    { group: "Georgia - Premium Services", rate: "0.95100", prefixes: ["995322010","995322153636","995322153747","995322153773","995322153965"] },
    { group: "Georgia", rate: "0.41770", prefixes: ["995"] },
    { group: "Georgia - Fixed - Major Cities (Rbilisi)", rate: "0.27300", prefixes: ["99532"] },
    { group: "Georgia - Mobile", rate: "0.47020", prefixes: ["9955","995514","99554444","995551","995555"] },
  ],
  DE: [
    { group: "Germany - Mobile from EEA", rate: "0.04950", prefixes: ["4915","49150","491510","491513","491518"] },
    { group: "Germany", rate: "1.06740", prefixes: ["49","4911","49115","49116","4912"] },
    { group: "Germany - Mobile", rate: "0.38500", prefixes: ["4915","49150","491510","491513","491518"] },
    { group: "Germany - Mobile - Major Carriers (Vodafone, T-Mob, Telefonica, E Plus)", rate: "0.38500", prefixes: ["49151","491511","491512","491514","491515"] },
    { group: "Germany - Mobile - Major Carriers (Vodafone, T-Mob, Telefonica, E Plus) from EEA", rate: "0.03590", prefixes: ["49151","491511","491512","491514","491515"] },
    { group: "Germany from EEA", rate: "0.01350", prefixes: ["49","4911","49115","49116","4912"] },
  ],
  GH: [
    { group: "Ghana - Mobile", rate: "0.42100", prefixes: ["23320","23323","23324","2332540","23326"] },
    { group: "Ghana", rate: "0.42100", prefixes: ["233","233308","233318","233328","233338"] },
  ],
  GR: [
    { group: "Greece", rate: "0.05810", prefixes: ["30","3021"] },
    { group: "Greece - Mobile", rate: "0.13010", prefixes: ["30212333","305005000","30685500","30685501","30685505"] },
    { group: "Greece - Premium Services", rate: "1.07100", prefixes: ["30210375","30213114","30231214","30261451","30692354"] },
  ],
  GT: [
    { group: "Guatemala", rate: "0.21950", prefixes: ["502","502220","502221","5022220","5022221"] },
    { group: "Guatemala - Mobile", rate: "0.20170", prefixes: ["50230","50231","502320","502321","5023220"] },
  ],
  GN: [
    { group: "Guinea", rate: "0.74810", prefixes: ["224"] },
    { group: "Guinea - Mobile", rate: "0.66100", prefixes: ["22462","22463","22465","22466","22479"] },
    { group: "Guinea - Premium Services", rate: "1.61100", prefixes: ["22430186640","22430189167","2243044008","22430441","22430446"] },
  ],
  HN: [
    { group: "Honduras", rate: "0.23500", prefixes: ["504"] },
    { group: "Honduras - Mobile", rate: "0.24080", prefixes: ["5043","504314","504315","504316","504317"] },
  ],
  HK: [
    { group: "Hong Kong", rate: "0.04100", prefixes: ["852"] },
    { group: "Hong Kong - Mobile", rate: "0.06800", prefixes: ["85217","852171","852173","852174","852175"] },
  ],
  HU: [
    { group: "Hungary - Mobile - Major Carriers (Telenor, T-mobile)", rate: "0.11100", prefixes: ["3620","3630","3631200","3631201","36312020"] },
    { group: "Hungary - Premium Services", rate: "0.95100", prefixes: ["36212354","36212921","3621361","3621362"] },
    { group: "Hungary - Mobile from EEA", rate: "0.05660", prefixes: ["3631","3631310","3631311","3631312","3631313"] },
    { group: "Hungary - Mobile - Major Carriers (Telenor, T-mobile) from EEA", rate: "0.05660", prefixes: ["3620","3630","3631200","3631201","36312020"] },
    { group: "Hungary from EEA", rate: "0.05300", prefixes: ["36","361","3621","36212354","36212921"] },
    { group: "Hungary", rate: "0.10800", prefixes: ["36","361","3621"] },
    { group: "Hungary - Mobile", rate: "0.12400", prefixes: ["3631","3631310","3631311","3631312","3631313"] },
  ],
  IS: [
    { group: "Iceland", rate: "0.02720", prefixes: ["354"] },
    { group: "Iceland - Mobile", rate: "0.03320", prefixes: ["354380","354385","354388","354389","3546"] },
  ],
  ID: [
    { group: "Indonesia - Mobile", rate: "0.08300", prefixes: ["62628","6262811","6262812","6262813","6262814"] },
    { group: "Indonesia", rate: "0.08300", prefixes: ["6221","6222","62251","6231","62341"] },
  ],
  IQ: [
    { group: "Iraq", rate: "0.30100", prefixes: ["964","9641","9642","96430","96432"] },
    { group: "Iraq - Mobile", rate: "0.32300", prefixes: ["9645321","9645322","9645323","9645324","964622"] },
    { group: "Iraq - Premium Services", rate: "1.08100", prefixes: ["964821","964822"] },
  ],
  IE: [
    { group: "Ireland", rate: "0.01300", prefixes: ["353","35310","35311","35312","35313"] },
    { group: "Ireland - Mobile", rate: "0.08040", prefixes: ["35388","35389","353890","353891","353892"] },
    { group: "Ireland - Mobile - Major Carriers (Vodafone, Tesco, O2, Lycatel, Three)", rate: "0.04600", prefixes: ["35376682","35382","35383","35385","35386"] },
    { group: "Ireland - Premium Services", rate: "0.22100", prefixes: ["3531850","3531890","3533364444","353700","35376"] },
  ],
  IL: [
    { group: "Israel", rate: "0.01700", prefixes: ["972"] },
    { group: "Israel - Mobile", rate: "0.15100", prefixes: ["972151","97215152","97215154","972153","97215352"] },
    { group: "Israel - Fixed - Others (Palestine)", rate: "0.30100", prefixes: ["97222","97242","97282","97292"] },
    { group: "Israel - Mobile - Others (Palestine)", rate: "0.30100", prefixes: ["97256","97259"] },
  ],
  IT: [
    { group: "Italy - Mobile from EEA", rate: "0.03590", prefixes: ["393","3930","3931","39310","39313"] },
    { group: "Italy", rate: "0.01300", prefixes: ["39"] },
    { group: "Italy - Mobile", rate: "0.45300", prefixes: ["393","3930","3931","39310","39311"] },
    { group: "Italy - Premium Services", rate: "0.60300", prefixes: ["395500711","395599928"] },
  ],
  JM: [
    { group: "Jamaica", rate: "0.35100", prefixes: ["1658","1876"] },
    { group: "Jamaica - Mobile", rate: "0.37100", prefixes: ["1658295022","1658295023","1658295024","1658295025","1876210"] },
  ],
  JP: [
    { group: "Japan", rate: "0.03850", prefixes: ["81"] },
    { group: "Japan - IP Phone", rate: "0.11100", prefixes: ["8150"] },
    { group: "Japan - Mobile", rate: "0.13980", prefixes: ["8120100","8120101","8120102","8120103","8120104"] },
  ],
  JO: [
    { group: "Jordan", rate: "0.30100", prefixes: ["962"] },
    { group: "Jordan - Mobile", rate: "0.30100", prefixes: ["962745","962746","962747","9627555","9627556"] },
  ],
  KZ: [
    { group: "Kazakhstan", rate: "0.06730", prefixes: ["7710","7711","7712","7713","7714"] },
    { group: "Kazakhstan - Fixed - Others (OLO)", rate: "0.79740", prefixes: ["7760","77620","77621","77622","77623"] },
    { group: "Kazakhstan - Mobile", rate: "0.33250", prefixes: ["7700","7707","7708","7747"] },
    { group: "Kazakhstan - Mobile - Major Carriers (Kcell, Beeline)", rate: "0.14570", prefixes: ["7701","7702","7705","7771","7775"] },
    { group: "Kazakhstan - Premium Services", rate: "0.95100", prefixes: ["7762531","77757839237","7785","7788","77900"] },
  ],
  KE: [
    { group: "Kenya", rate: "0.38100", prefixes: ["254"] },
    { group: "Kenya - Mobile", rate: "0.38100", prefixes: ["2547","254747","25477"] },
    { group: "Kenya - Mobile - Major Carriers (Safaricom, Airtel)", rate: "0.45100", prefixes: ["25470","25471","25472","25473","254740"] },
    { group: "Kenya - Premium Services", rate: "1.06100", prefixes: ["25420479","254206180304","254207608203","254207608290","254207608312"] },
  ],
  KW: [
    { group: "Kuwait", rate: "0.12100", prefixes: ["965"] },
    { group: "Kuwait - Mobile", rate: "0.12100", prefixes: ["965500","965501","965502","965503","965504"] },
  ],
  KG: [
    { group: "Kyrgyzstan", rate: "0.22030", prefixes: ["996","996312"] },
    { group: "Kyrgyzstan - Mobile", rate: "0.27560", prefixes: ["996200","996201","996202","996203","996204"] },
    { group: "Kyrgyzstan - Premium Services", rate: "2.59100", prefixes: ["996312264","996312788","99631286","996566200","99656687"] },
  ],
  LA: [
    { group: "Laos - Mobile", rate: "0.10120", prefixes: ["85620","856307"] },
    { group: "Laos", rate: "0.10120", prefixes: ["856"] },
  ],
  LV: [
    { group: "Latvia", rate: "0.84900", prefixes: ["371","37161301","37161302","37161303","37161304"] },
    { group: "Latvia - Fixed - Others (OLO)", rate: "1.11820", prefixes: ["3716000","37160606","37160666","37161300","37161305"] },
    { group: "Latvia - Mobile", rate: "1.11820", prefixes: ["3712010","3712011","3712012","3712013","3712014"] },
    { group: "Latvia - Mobile - Major Carriers (Tele2, VENTAmobile)", rate: "0.94320", prefixes: ["371200","371203","371204","371205","3712094"] },
    { group: "Latvia - Premium Services", rate: "2.12100", prefixes: ["3711010","3711012","3711019","3711026","3711033"] },
  ],
  LB: [
    { group: "Lebanon", rate: "0.12100", prefixes: ["961"] },
    { group: "Lebanon - Mobile", rate: "0.28100", prefixes: ["9613","96170","96171","961760","961761"] },
  ],
  LR: [
    { group: "Liberia", rate: "0.66190", prefixes: ["231"] },
    { group: "Liberia - Mobile", rate: "0.71040", prefixes: ["2314","23150","23151","23152","23153"] },
    { group: "Liberia - Premium Services", rate: "1.24100", prefixes: ["231252053","2312995290","231315816","2313301","2313302"] },
  ],
  LT: [
    { group: "Lithuania - Mobile - Others (Telia)", rate: "0.81750", prefixes: ["37061","37062","370662","3706630","37066311"] },
    { group: "Lithuania - Premium Services", rate: "2.24100", prefixes: ["37031050","37031330","37031331","37031335","37031593250"] },
    { group: "Lithuania", rate: "0.22950", prefixes: ["370"] },
    { group: "Lithuania - Fixed - Others", rate: "0.81750", prefixes: ["3706","3706638","3706639","3706663","3706664"] },
    { group: "Lithuania - Mobile - Major Carriers (Bite, Tele2)", rate: "1.38300", prefixes: ["37060","37063","370640","370641","370642"] },
  ],
  LU: [
    { group: "Luxembourg", rate: "0.01920", prefixes: ["352","3522062","3522461","3522624","3522711"] },
    { group: "Luxembourg - Mobile", rate: "0.03230", prefixes: ["3526000","3526001","3526002","3526021","3526061"] },
    { group: "Luxembourg - Premium Services", rate: "0.33100", prefixes: ["35212","35220881784","352261516222","352900","352901"] },
  ],
  MG: [
    { group: "Madagascar", rate: "0.86800", prefixes: ["261"] },
    { group: "Madagascar - Mobile", rate: "1.01350", prefixes: ["26130","26132","26133","26134","26139"] },
    { group: "Madagascar - Premium Services", rate: "1.86100", prefixes: ["261200","261204","261206","26120742199","261208"] },
  ],
  MW: [
    { group: "Malawi", rate: "0.53510", prefixes: ["265"] },
    { group: "Malawi - Mobile", rate: "0.56710", prefixes: ["2652","26531","26588","26599"] },
    { group: "Malawi - Premium Services", rate: "1.80100", prefixes: ["2658810646","26588110793","26588110794","26588110796","26588110797"] },
  ],
  MY: [
    { group: "Malaysia", rate: "0.04440", prefixes: ["60","603","607"] },
    { group: "Malaysia - Mobile", rate: "0.07140", prefixes: ["601","601017","60102","601030","601031"] },
  ],
  ML: [
    { group: "Mali", rate: "0.30720", prefixes: ["223","223202","223207"] },
    { group: "Mali - Mobile", rate: "0.62970", prefixes: ["2236","2237","22382","22383","22389"] },
    { group: "Mali - Mobile - Others (Telecel)", rate: "0.30720", prefixes: ["22340","22342","2235"] },
  ],
  MT: [
    { group: "Malta", rate: "0.53560", prefixes: ["356"] },
    { group: "Malta - Mobile", rate: "1.40100", prefixes: ["35672","35677","35679","35692","35694"] },
    { group: "Malta from EEA", rate: "0.01270", prefixes: ["356"] },
    { group: "Malta - Mobile from EEA", rate: "0.02130", prefixes: ["35672","35677","35679","35692","35694"] },
  ],
  MX: [
    { group: "Mexico", rate: "0.01250", prefixes: ["52"] },
    { group: "Mexico - Mobile", rate: "0.03900", prefixes: ["521","5210018349","5210018359","5210018658","5210018659"] },
  ],
  MD: [
    { group: "Moldova - Mobile", rate: "0.37580", prefixes: ["37377"] },
    { group: "Moldova - Mobile - Major Carriers (Orange, Moldcell)", rate: "0.52400", prefixes: ["37360","373610","373611","373620","373621"] },
    { group: "Moldova - Premium Services", rate: "1.14100", prefixes: ["37322208068","37322208191","3732537017","37325371842","37329921370"] },
    { group: "Moldova", rate: "0.45120", prefixes: ["373","37321","3735"] },
  ],
  MN: [
    { group: "Mongolia", rate: "0.02600", prefixes: ["976"] },
    { group: "Mongolia - Mobile", rate: "0.02600", prefixes: ["97650","97653","97655","97680","97685"] },
    { group: "Mongolia - Premium Services", rate: "2.50100", prefixes: ["9761800","9761900"] },
  ],
  MA: [
    { group: "Morocco", rate: "0.32100", prefixes: ["212","212520","212521","212525","212529"] },
    { group: "Morocco - Mobile", rate: "0.85100", prefixes: ["2126","21260","212612","212614","212617"] },
    { group: "Morocco - Mobile - Others (Inwi Far Zone)", rate: "0.50100", prefixes: ["212526","212527","212533","212534","212540"] },
    { group: "Morocco - Premium Services", rate: "0.90100", prefixes: ["212610609012","212610609091","212611085208","212611855131","212611940125"] },
  ],
  MZ: [
    { group: "Mozambique", rate: "0.08080", prefixes: ["258"] },
    { group: "Mozambique - Mobile", rate: "0.59710", prefixes: ["25884","25885","258852894998","258852894999","258852895"] },
    { group: "Mozambique - Mobile - Major Carriers (Mcel, Movitel)", rate: "0.32510", prefixes: ["25882","25883","25886","25887"] },
  ],
  MM: [
    { group: "Myanmar", rate: "0.37520", prefixes: ["95"] },
    { group: "Myanmar - Mobile", rate: "0.38350", prefixes: ["959","959750","959751","959752","959753"] },
    { group: "Myanmar - Premium Services", rate: "0.53100", prefixes: ["95957"] },
  ],
  NA: [
    { group: "Namibia", rate: "0.07470", prefixes: ["264"] },
    { group: "Namibia - Mobile", rate: "0.08320", prefixes: ["26460","26481","26485","26489081"] },
    { group: "Namibia - Premium Services", rate: "0.08430", prefixes: ["264857120501","264857120502","264857120503","264857120504","264857120505"] },
  ],
  NP: [
    { group: "Nepal", rate: "0.22100", prefixes: ["977","9771"] },
    { group: "Nepal - Mobile", rate: "0.22100", prefixes: ["977960","977961","977962","977963","977972"] },
  ],
  NL: [
    { group: "Netherlands - Mobile - Major Carriers (Lycamobile, Ibasis, Tele2, T-mobile, Telfort, Vodafone) from EEA", rate: "0.01950", prefixes: ["316","3160","31610","31611","31612"] },
    { group: "Netherlands - Mobile from Netherlands Fixed", rate: "0.68810", prefixes: ["316","3160","31610","31611","31612"] },
    { group: "Netherlands from EEA", rate: "0.01450", prefixes: ["31","31202626905","3120807","31208080102","31242002"] },
    { group: "Netherlands", rate: "0.34900", prefixes: ["31","318"] },
    { group: "Netherlands - Mobile - Major Carriers (Lycamobile, Ibasis, Tele2, T-mobile, Telfort, Vodafone)", rate: "0.40300", prefixes: ["316","3160","31610","31611","31612"] },
    { group: "Netherlands - Mobile - Others (KPN)", rate: "0.53900", prefixes: ["3163230","3163240","3163241","3163242","3163243"] },
    { group: "Netherlands - Premium Services", rate: "2.83100", prefixes: ["3114","31202626905","3120807","31208080102","31242002"] },
  ],
  NZ: [
    { group: "New Zealand", rate: "0.02330", prefixes: ["64","64205","64240","64241","64242"] },
    { group: "New Zealand - Mobile", rate: "0.07140", prefixes: ["642","6420","64201","6421","6422"] },
  ],
  NI: [
    { group: "Nicaragua", rate: "0.17950", prefixes: ["505"] },
    { group: "Nicaragua - Mobile", rate: "0.35750", prefixes: ["505550","505551","505552","505553","505554"] },
    { group: "Nicaragua - Premium Services", rate: "2.06100", prefixes: ["50588903","50588904","50588905","50588906","50588907"] },
  ],
  NE: [
    { group: "Niger", rate: "0.54030", prefixes: ["227"] },
    { group: "Niger - Mobile", rate: "0.54030", prefixes: ["22784","22785","2279","22794","22795"] },
    { group: "Niger - Mobile - Major carriers (Airtel, Orange)", rate: "0.49200", prefixes: ["22780","22788","22789","22790","22791"] },
    { group: "Niger - Premium Services", rate: "2.27100", prefixes: ["2271","227201","2272039","22739","22793009"] },
  ],
  NG: [
    { group: "Nigeria", rate: "0.16100", prefixes: ["234","2341","234121","234122","234129"] },
    { group: "Nigeria - Mobile", rate: "0.16300", prefixes: ["234140","234141","234143","234147","234148"] },
    { group: "Nigeria - Premium Services", rate: "1.80100", prefixes: ["234700","234702","234800"] },
  ],
  NO: [
    { group: "Norway", rate: "0.01600", prefixes: ["47"] },
    { group: "Norway - Mobile", rate: "0.06100", prefixes: ["47400","474002","474003","474004","474005"] },
    { group: "Norway - Premium Services", rate: "0.29100", prefixes: ["4702","4703","4704","4705","4706"] },
  ],
  OM: [
    { group: "Oman", rate: "0.22440", prefixes: ["968","96822","9682200","9682201","9682202"] },
    { group: "Oman - Mobile", rate: "0.40900", prefixes: ["9681505","9687","96871","96872","96878"] },
  ],
  PK: [
    { group: "Pakistan", rate: "0.14100", prefixes: ["92","9221","9242","9251","9258"] },
    { group: "Pakistan - Mobile", rate: "0.14100", prefixes: ["9230","9231","9232","9233","9234"] },
  ],
  PA: [
    { group: "Panama", rate: "0.04180", prefixes: ["507"] },
    { group: "Panama - Mobile", rate: "0.04180", prefixes: ["5076"] },
    { group: "Panama - Mobile - Major Carriers (C&W, Digicel, Movistar)", rate: "0.17330", prefixes: ["50760","507610","507611","507612","507613"] },
  ],
  PY: [
    { group: "Paraguay", rate: "0.04440", prefixes: ["595"] },
    { group: "Paraguay - Mobile", rate: "0.11580", prefixes: ["59594","595951","595961","595962","595969"] },
  ],
  PE: [
    { group: "Peru", rate: "0.01600", prefixes: ["51"] },
    { group: "Peru - Fixed - Lima", rate: "0.01250", prefixes: ["511","5112","511220","511227","511228"] },
    { group: "Peru - Fixed - Rural", rate: "0.50300", prefixes: ["511600","5118","51418","514181","51428"] },
    { group: "Peru - Mobile", rate: "0.03300", prefixes: ["51419","51429","514299","51439","514394"] },
  ],
  PH: [
    { group: "Philippines - Mobile", rate: "0.28900", prefixes: ["63813","63817","639","63906","63907"] },
    { group: "Philippines - Premium Services", rate: "0.82100", prefixes: ["63101","63329","63840","63846","63848"] },
    { group: "Philippines", rate: "0.22300", prefixes: ["63","632","63220","63221","63222"] },
  ],
  PL: [
    { group: "Poland - Mobile from EEA", rate: "0.05840", prefixes: ["48450","4850","4851","4853","48530"] },
    { group: "Poland", rate: "0.02700", prefixes: ["48"] },
    { group: "Poland - Fixed - Others (Netia, OLO, T-mobile)", rate: "0.03300", prefixes: ["48122","48122004","48122123","48122124","48122125"] },
    { group: "Poland - Mobile", rate: "0.23300", prefixes: ["48450","4850","4851","4853","48530"] },
    { group: "Poland - Premium Services", rate: "1.18100", prefixes: ["48123","48126","48221","48223","48227"] },
  ],
  PT: [
    { group: "Portugal - Mobile", rate: "0.43300", prefixes: ["351169","3511691","3511692","3511696","351189"] },
    { group: "Portugal - Fixed - National", rate: "0.04100", prefixes: ["3511","3517","3518"] },
    { group: "Portugal - Premium Services", rate: "0.94300", prefixes: ["35170"] },
    { group: "Portugal - Fixed - National from EEA", rate: "0.00660", prefixes: ["3511","3517","3518"] },
    { group: "Portugal - Mobile from Portugal Fixed", rate: "1.22000", prefixes: ["351169","3511691","3511692","3511696","351189"] },
    { group: "Portugal from EEA", rate: "0.01230", prefixes: ["351","35121","351210","351211","351212"] },
    { group: "Portugal - Mobile from EEA", rate: "0.04300", prefixes: ["351169","3511691","3511692","3511696","351189"] },
    { group: "Portugal", rate: "0.01110", prefixes: ["351","35121","351210","351211","351212"] },
  ],
  QA: [
    { group: "Qatar", rate: "0.27100", prefixes: ["974","97423","974400","974401","974404"] },
    { group: "Qatar - Mobile", rate: "0.29100", prefixes: ["9742","97428","97429","9743","97430"] },
  ],
  RO: [
    { group: "Romania", rate: "0.02100", prefixes: ["40","4021","4030","403100","403101"] },
    { group: "Romania - Mobile", rate: "0.03600", prefixes: ["407000","40701","407020","40711","407120"] },
    { group: "Romania - Premium Services", rate: "1.18100", prefixes: ["40118","40312499","4033751","4033851","4033951"] },
  ],
  RU: [
    { group: "Russia - Mobile", rate: "0.31100", prefixes: ["7850","79","790","79003","7900335"] },
    { group: "Russia - Mobile - MVNO", rate: "0.82300", prefixes: ["79238","79300","79560","79582","79585"] },
    { group: "Russia - Premium Services", rate: "6.80300", prefixes: ["74953","74959","78202","78401","78432"] },
    { group: "Russia", rate: "0.08400", prefixes: ["7","7010"] },
    { group: "Russia - Fixed - Abkhazia", rate: "0.36700", prefixes: ["7840","7940"] },
    { group: "Russia - Fixed - Zone 1-5", rate: "0.03900", prefixes: ["7301","73010","73011","73012","73013"] },
  ],
  RW: [
    { group: "Rwanda", rate: "0.40900", prefixes: ["250","25028"] },
    { group: "Rwanda - Mobile", rate: "0.49020", prefixes: ["25072","25073","25075","25078"] },
  ],
  SA: [
    { group: "Saudi Arabia - High Cost Origins", rate: "2.50000", prefixes: ["966","96611","96611512","96611513","96611514"] },
    { group: "Saudi Arabia", rate: "0.13900", prefixes: ["966","96611","96611514","96612","96613"] },
    { group: "Saudi Arabia - Mobile", rate: "0.22400", prefixes: ["96611512","96611513","96611515","96611516","96611517"] },
  ],
  SN: [
    { group: "Senegal - Premium Services", rate: "0.58650", prefixes: ["2213016","2213017","2213018","2213019","221338292929"] },
    { group: "Senegal", rate: "0.33200", prefixes: ["221"] },
    { group: "Senegal - Fixed - Major Carriers (Tigo, Expresso)", rate: "0.62720", prefixes: ["221300","2213010","2213011","2213012","2213013"] },
    { group: "Senegal - Mobile", rate: "0.59150", prefixes: ["22170","22172110","22172111","22172112","22176"] },
  ],
  RS: [
    { group: "Serbia", rate: "0.27320", prefixes: ["381","38111","38128","38129","38138"] },
    { group: "Serbia - Fixed - Major Cities (Kosovo)", rate: "0.24170", prefixes: ["3812804","381281","3812901","381291","3813840"] },
    { group: "Serbia - Fixed - Others (Orion Telekom)", rate: "0.62920", prefixes: ["3811051","3811059","38111410","38111411","38111412"] },
    { group: "Serbia - Mobile", rate: "0.60820", prefixes: ["381600","381601","3816020","3816021","38160220"] },
    { group: "Serbia - Premium Services", rate: "0.69100", prefixes: ["38176540","38176541","38176543","38176655","38176767"] },
  ],
  SG: [
    { group: "Singapore", rate: "0.03400", prefixes: ["65","653","656206","656300","65640"] },
    { group: "Singapore - Mobile", rate: "0.04890", prefixes: ["6514420","653153","653155","658","658027"] },
  ],
  SK: [
    { group: "Slovakia - Mobile", rate: "0.00720", prefixes: ["421913"] },
    { group: "Slovakia - Mobile - Major Carriers (O2, Orange, Slovak Telecom, SWAN)", rate: "0.04060", prefixes: ["421901","421902","421903","421904","421905"] },
    { group: "Slovakia - Premium Services", rate: "1.06100", prefixes: ["421650700","421650906"] },
    { group: "Slovakia", rate: "0.00720", prefixes: ["421","42118"] },
  ],
  SI: [
    { group: "Slovenia - Mobile - Others (Ipko)", rate: "0.76530", prefixes: ["386432","386433","386434","386438","386439"] },
    { group: "Slovenia - Premium Services", rate: "1.25100", prefixes: ["38641400007","38641400025","38641400034","38641400035","38641400047"] },
    { group: "Slovenia", rate: "0.25960", prefixes: ["386"] },
    { group: "Slovenia - Fixed - Others (Ipko)", rate: "0.76530", prefixes: ["386437"] },
    { group: "Slovenia - Fixed (Type A and Type B)", rate: "0.49300", prefixes: ["38612009","38612350","38612355","38612430","38612432"] },
    { group: "Slovenia - Mobile - Major Carriers ( Telekom Slovenje, A1 Slovenija, Telematch)", rate: "0.62870", prefixes: ["38630","38631","38640","38641","38651"] },
  ],
  ZA: [
    { group: "South Africa - Mobile", rate: "0.33900", prefixes: ["27603","27604","27605","27606","27607"] },
    { group: "South Africa - Premium Services", rate: "0.84900", prefixes: ["27100","27112","27115","27116","27120"] },
    { group: "South Africa", rate: "0.40440", prefixes: ["27","27101","27102","27103","27104"] },
  ],
  KR: [
    { group: "South Korea", rate: "0.02960", prefixes: ["82"] },
    { group: "South Korea - Mobile", rate: "0.02230", prefixes: ["821000","821001","82102","821020","821021"] },
  ],
  LK: [
    { group: "Sri Lanka", rate: "0.22100", prefixes: ["94","94112","94113","94117","9419733"] },
    { group: "Sri Lanka - Mobile", rate: "0.22100", prefixes: ["94702","94703","94704","94705","9471"] },
  ],
  SE: [
    { group: "Sweden", rate: "0.01500", prefixes: ["46"] },
    { group: "Sweden - Mobile", rate: "0.59300", prefixes: ["46252","46254","46376","46518","46519"] },
    { group: "Sweden - Shared Services", rate: "0.03090", prefixes: ["467190005","4671910002","4671910107","4671910108","4671910109"] },
  ],
  CH: [
    { group: "Switzerland - Mobile (Swisscom, Sunrise, Salt, Lyca)", rate: "0.11950", prefixes: ["41750","417510","417512","417513","417517"] },
    { group: "Switzerland - Mobile (Swisscom, Lyca) from High Cost Origins", rate: "0.33940", prefixes: ["41750","417510","417512","417513","417517"] },
    { group: "Switzerland - Mobile (Sunrise, Salt) from High Cost Origins", rate: "0.99100", prefixes: ["41760","41761","41762","41763","41764"] },
    { group: "Switzerland - Mobile (Swisscom, Lyca) from Ultra High Cost Origins", rate: "0.68140", prefixes: ["41750","417510","417512","417513","417517"] },
    { group: "Switzerland - Mobile (Sunrise, Salt) from Ultra High Cost Origins", rate: "1.68960", prefixes: ["41760","41761","41762","41763","41764"] },
    { group: "Switzerland", rate: "0.02990", prefixes: ["41"] },
    { group: "Switzerland - Mobile", rate: "0.99820", prefixes: ["4174","4175","417698","417699","417730"] },
  ],
  TW: [
    { group: "Taiwan", rate: "0.02350", prefixes: ["886"] },
    { group: "Taiwan - Mobile", rate: "0.13600", prefixes: ["8869000","8869001","8869002","8869003","8869004"] },
    { group: "Taiwan - Mobile - Others (Star Telecom)", rate: "0.02350", prefixes: ["8869020","8869021","8869022","8869023","8869024"] },
    { group: "Taiwan - Premium Services", rate: "0.13600", prefixes: ["886913541480","886925239870","8869401","8869402","8869403"] },
  ],
  TZ: [
    { group: "Tanzania", rate: "0.46850", prefixes: ["255"] },
    { group: "Tanzania - Mobile", rate: "0.51440", prefixes: ["25561","25562","25565","25566","25567"] },
    { group: "Tanzania - Premium Services", rate: "0.70100", prefixes: ["25541147","25541175","25541179","255901135","255901136"] },
  ],
  TH: [
    { group: "Thailand - Mobile", rate: "0.08940", prefixes: ["66112","66118","66145","66167","66180"] },
    { group: "Thailand - Premium Services", rate: "0.90300", prefixes: ["66812"] },
    { group: "Thailand", rate: "0.08800", prefixes: ["66","662"] },
  ],
  TG: [
    { group: "Togo", rate: "2.04100", prefixes: ["228"] },
    { group: "Togo - Mobile", rate: "2.04100", prefixes: ["22870","22879","2289","22896","22897"] },
    { group: "Togo - Premium Services", rate: "2.33100", prefixes: ["2282426","2282427","2282626","2282627","2282726"] },
  ],
  TT: [
    { group: "Trinidad And Tobago", rate: "0.23100", prefixes: ["1868"] },
    { group: "Trinidad And Tobago - Mobile", rate: "0.28100", prefixes: ["1868220","1868227","1868228","1868229","1868266"] },
  ],
  TN: [
    { group: "Tunisia - Premium Services", rate: "9.45100", prefixes: ["216366","216367","216368","216369","2167016004"] },
    { group: "Tunisia", rate: "1.20100", prefixes: ["216","21630","21631","21632","21633"] },
    { group: "Tunisia - Mobile", rate: "1.20100", prefixes: ["2162","21640","21641","21642","216430"] },
  ],
  TR: [
    { group: "Turkey", rate: "0.05300", prefixes: ["90","90212","90216","90222","90224"] },
    { group: "Turkey - Mobile", rate: "0.22100", prefixes: ["90500","905010","905011","9050120","9050121"] },
    { group: "Turkey - Premium Services", rate: "0.90100", prefixes: ["90510260","90510261","90510266","90592216","905926160"] },
  ],
  TM: [
    { group: "Turkmenistan", rate: "0.14070", prefixes: ["993"] },
    { group: "Turkmenistan - Mobile", rate: "0.20520", prefixes: ["99360","99361","99362","99363","99364"] },
  ],
  UG: [
    { group: "Uganda - Mobile - Major Carriers (MTN, Airtel, Africell,Gemtel, K2 Telecom, Lycatel)", rate: "0.54690", prefixes: ["25632","25639","25670","256730","2567330"] },
    { group: "Uganda", rate: "0.61640", prefixes: ["256","256200","256201","2562025","2562026"] },
    { group: "Uganda - Mobile", rate: "0.63680", prefixes: ["2562065","2562066","2562067","2562068","2562069"] },
  ],
  UA: [
    { group: "Ukraine", rate: "0.20430", prefixes: ["380","380322","38044","380482","380487"] },
    { group: "Ukraine - Mobile", rate: "0.39300", prefixes: ["38050","38063","38066","38067","38068"] },
    { group: "Ukraine - Premium Services", rate: "1.00100", prefixes: ["380487374","380487408","380623430","380623431","3808929"] },
  ],
  UY: [
    { group: "Uruguay - Mobile", rate: "0.31300", prefixes: ["5989","59891","59892","59893","59894"] },
    { group: "Uruguay", rate: "0.12300", prefixes: ["598"] },
    { group: "Uruguay - Fixed - Major Cities (Montevideo)", rate: "0.08900", prefixes: ["5981","5982"] },
  ],
  UZ: [
    { group: "Uzbekistan", rate: "0.14570", prefixes: ["998","998711","998712","998713"] },
    { group: "Uzbekistan - Mobile", rate: "0.14570", prefixes: ["9989"] },
    { group: "Uzbekistan - Premium Services", rate: "0.92100", prefixes: ["998611199","998711132"] },
  ],
  VE: [
    { group: "Venezuela - Premium Services", rate: "0.90100", prefixes: ["58415217"] },
    { group: "Venezuela", rate: "0.04600", prefixes: ["58","58212"] },
    { group: "Venezuela - Mobile", rate: "0.12100", prefixes: ["5841","58412","58414","58416","58424"] },
  ],
  VN: [
    { group: "Vietnam - Mobile", rate: "0.10300", prefixes: ["8412","84120","84121","84122","84126"] },
    { group: "Vietnam - Premium Services", rate: "2.89300", prefixes: ["84123","84124","84125","84127","84129"] },
    { group: "Vietnam", rate: "0.10740", prefixes: ["84","84106","84198","84202","842032"] },
  ],
  YE: [
    { group: "Yemen", rate: "0.20100", prefixes: ["967"] },
    { group: "Yemen - Mobile", rate: "0.20100", prefixes: ["96770","96771","96773","96777"] },
    { group: "Yemen - Premium Services", rate: "1.80100", prefixes: ["9677052"] },
  ],
  ZM: [
    { group: "Zambia", rate: "0.57860", prefixes: ["260"] },
    { group: "Zambia - Mobile", rate: "0.74980", prefixes: ["26095","26096","26097"] },
  ],
  ZW: [
    { group: "Zimbabwe - Mobile", rate: "0.80100", prefixes: ["26371","26373","26377","26378"] },
    { group: "Zimbabwe - Premium Services", rate: "0.84100", prefixes: ["2638630030"] },
    { group: "Zimbabwe", rate: "0.30100", prefixes: ["263"] },
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

// Phone number data from API - GA status only, rental > 0
export const API_PHONE_NUMBERS: Record<string, { type: string; rentalRate: number; inboundVoiceRate: number | null; inboundSmsRate: number | null; capabilities: string[]; status: string }[]> = {
  US: [
    { type: "Shortcode", rentalRate: 1000, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms"], status: "GA" },
    { type: "Local", rentalRate: 0.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "mms", "voice"], status: "GA" },
    { type: "Local", rentalRate: 0.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
    { type: "Tollfree", rentalRate: 1, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
  ],
  CA: [
    { type: "Local", rentalRate: 0.75, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "mms", "voice"], status: "GA" },
    { type: "Tollfree", rentalRate: 1, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
  ],
  GB: [
    { type: "Local", rentalRate: 0.85, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
    { type: "Tollfree", rentalRate: 1, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
    { type: "Mobile", rentalRate: 0.9, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
    { type: "Local", rentalRate: 0.85, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
  ],
  AU: [
    { type: "Tollfree", rentalRate: 12, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
    { type: "Mobile", rentalRate: 5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
    { type: "Local", rentalRate: 2.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  ES: [
    { type: "Tollfree", rentalRate: 21.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
    { type: "Local", rentalRate: 3, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  AT: [
    { type: "Mobile", rentalRate: 7, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
  ],
  BE: [
    { type: "Local", rentalRate: 2.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  BR: [
    { type: "Tollfree", rentalRate: 30, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  BG: [
    { type: "Local", rentalRate: 2.55, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  CO: [
    { type: "Local", rentalRate: 17, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  HR: [
    { type: "Local", rentalRate: 4.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  CY: [
    { type: "Local", rentalRate: 30, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  CZ: [
    { type: "Local", rentalRate: 1.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  FI: [
    { type: "Local", rentalRate: 1.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  GR: [
    { type: "Local", rentalRate: 1.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  HU: [
    { type: "Local", rentalRate: 20, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  IE: [
    { type: "Local", rentalRate: 0.85, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  IL: [
    { type: "Local", rentalRate: 3.4, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  LV: [
    { type: "Local", rentalRate: 1.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  LT: [
    { type: "Local", rentalRate: 1.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  MX: [
    { type: "Local", rentalRate: 5.83, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  NL: [
    { type: "Local", rentalRate: 2.55, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  NZ: [
    { type: "Local", rentalRate: 2.55, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  PL: [
    { type: "Local", rentalRate: 0.85, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  PT: [
    { type: "Tollfree", rentalRate: 21.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  RO: [
    { type: "Local", rentalRate: 2.55, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  SK: [
    { type: "Local", rentalRate: 1.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  SI: [
    { type: "Local", rentalRate: 4.25, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  ZA: [
    { type: "Local", rentalRate: 1.28, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  SE: [
    { type: "Mobile", rentalRate: 2.5, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["sms", "voice"], status: "GA" },
    { type: "Local", rentalRate: 1, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
  CH: [
    { type: "Local", rentalRate: 0.85, inboundVoiceRate: null, inboundSmsRate: null, capabilities: ["voice"], status: "GA" },
  ],
};
