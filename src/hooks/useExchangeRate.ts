/**
 * Default fixed USD to INR conversion.
 * Individual pricing pages can override this when their live-source parity
 * requires a different hardcoded multiplier.
 */
const DEFAULT_INR_RATE = 85;

export function useExchangeRate(overrideRate?: number): {
  rate: number;
  loading: boolean;
  convertToINR: (usd: number) => number;
  formatPrice: (usd: number | string, countryCode: string, unit: string) => string;
  convertPriceString: (priceStr: string, countryCode: string) => string;
} {
  const rate = overrideRate ?? DEFAULT_INR_RATE;
  const loading = false;

  const convertToINR = (usd: number) => usd * rate;

  /**
   * Format a price for display.
   * For India (IN), converts USD to INR with ₹ symbol.
   * For all others, shows USD with $ symbol.
   */
  const formatPrice = (usd: number | string, countryCode: string, unit: string): string => {
    const num = typeof usd === "string" ? parseFloat(usd) : usd;
    if (isNaN(num) || num === 0) return "Not Supported";

    if (countryCode === "IN") {
      const inr = num * rate;
      return `₹${inr.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/${unit}`;
    }

    return `$${num.toFixed(4)}/${unit}`;
  };

  /**
   * Convert a pre-formatted USD price string (e.g. "$2.94/month") to INR for India.
   * For non-India countries, returns the string unchanged.
   */
  const convertPriceString = (priceStr: string, countryCode: string): string => {
    if (countryCode !== "IN") return priceStr;
    if (!priceStr || priceStr === "Not Supported" || priceStr === "Contact sales" || priceStr === "Contact support") return priceStr;

    // Handle "Starts at $X.XXXX/unit" prefix
    let prefix = "";
    let rest = priceStr;
    if (rest.startsWith("Starts at ")) {
      prefix = "Starts at ";
      rest = rest.slice(10);
    }

    // Extract the numeric value and unit from strings like "$2.94/month" or "$0.0018/sms"
    const match = rest.match(/^\$?([\d.]+)\s*\/?\s*(.*)$/);
    if (!match) return priceStr;

    const usd = parseFloat(match[1]);
    if (isNaN(usd)) return priceStr;

    const unit = match[2] || "";
    const inr = usd * rate;
    const formatted = inr.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return unit ? `${prefix}₹${formatted}/${unit}` : `${prefix}₹${formatted}`;
  };

  return { rate, loading, convertToINR, formatPrice, convertPriceString };
}
