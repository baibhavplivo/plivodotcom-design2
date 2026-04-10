// Country categories for signup CTA routing
// Category A: direct signup, Category B: request trial form, Unsupported: request trial page (blocked)

export const CATEGORY_A: ReadonlySet<string> = new Set([
  "US", "CA", "IN", "GB", "AU", "NZ", "SG",
]);

export const CATEGORY_B: ReadonlySet<string> = new Set([
  "BR", "AE", "AR", "DE", "FR", "NL", "BE", "IE", "IT",
  "IL", "MY", "ID", "PT",
]);

export type GeoCategory = "A" | "B" | "unsupported";

export function getGeoCategory(countryCode: string): GeoCategory {
  const code = countryCode.toUpperCase();
  if (CATEGORY_A.has(code)) return "A";
  if (CATEGORY_B.has(code)) return "B";
  return "unsupported";
}

export const SIGNUP_URL = "https://plivo.com/signup";
export const REQUEST_TRIAL_URL = "/request-trial/";
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
