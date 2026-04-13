// Country categories for signup CTA routing
// Supported: direct signup, Unsupported: blocked with "not available in your region"

export const SUPPORTED_COUNTRIES: ReadonlySet<string> = new Set([
  "US", "CA", "BR", "AR",
  "GB", "DE", "FR", "NL", "BE", "IE", "ES", "PT", "IT", "IL",
  "AE", "SA", "QA", "BH",
  "IN", "SG", "MY", "ID", "VN",
  "AU", "NZ",
]);

export type GeoCategory = "supported" | "unsupported";

export function getGeoCategory(countryCode: string): GeoCategory {
  const code = countryCode.toUpperCase();
  if (SUPPORTED_COUNTRIES.has(code)) return "supported";
  return "unsupported";
}

export const SIGNUP_URL = "https://plivo.com/signup";
export const CONTACT_SALES_URL = "/contact/sales/";

/** Countries where cookie consent banners are legally required */
export const CONSENT_REQUIRED_COUNTRIES: ReadonlySet<string> = new Set([
  // EU (27)
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA (3)
  "NO", "IS", "LI",
  // UK
  "GB",
  // Switzerland
  "CH",
  // Brazil (LGPD)
  "BR",
  // South Africa (POPIA)
  "ZA",
  // Thailand (PDPA)
  "TH",
  // South Korea (PIPA)
  "KR",
  // Japan (APPI)
  "JP",
  // Canada (PIPEDA)
  "CA",
  // Argentina (PDPL)
  "AR",
  // Turkey (KVKK)
  "TR",
  // Kenya (Data Protection Act)
  "KE",
  // Nigeria (NDPR)
  "NG",
]);
