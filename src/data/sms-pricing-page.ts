import type { CountryOption } from "@/data/pricing-data";
import { COUNTRY_NAMES, buildCountryList } from "@/data/pricing-data";
import {
  PRICING_CACHE,
  type CachedPricingData,
} from "@/data/pricing-cache";

export interface MMSRateRow {
  type: string;
  outbound: string;
  inbound: string;
}

export interface CarrierFeeRow {
  carrier: string;
  values: string[];
}

export interface CarrierFeeGroup {
  title: string;
  columns: string[];
  rows: CarrierFeeRow[];
  footnote?: string;
}

export const SMS_PRICING_SUPPORT_URL =
  "https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292";

export const SMS_VOLUME_PRICING_URL = "/contact/sales";

export const SMS_PRICING_PRIORITY_COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

export const SMS_PRICING_COUNTRY_CODES = Object.keys(PRICING_CACHE);

export const SMS_PRICING_COUNTRIES = buildCountryList(
  SMS_PRICING_COUNTRY_CODES,
  SMS_PRICING_PRIORITY_COUNTRIES,
);

export const SMS_PRICING_HERO_COPY =
  "Competitive pay-as-you-go SMS pricing with add-on features included. Volume discounts as you scale.";

export const SMS_ADD_ON_SERVICES = [
  { name: "Message Queueing", price: "Included" },
  { name: "Powerpack", price: "Included" },
];

export const SMS_VOLUME_CTA = {
  title:
    "Get volume discounts on committed spends as you scale your usage.",
  buttonLabel: "Get Volume Pricing",
  buttonHref: SMS_VOLUME_PRICING_URL,
};

export const SMS_RCS_RATES = [
  { type: "RCS Rich*", outbound: "$0.00770", inbound: "$0.00770" },
  {
    type: "RCS Rich Media*",
    outbound: "$0.01800",
    inbound: "$0.01800",
  },
];

export const SMS_MMS_RATES: Record<"US" | "CA", MMSRateRow[]> = {
  US: [
    { type: "Long Codes*", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
    {
      type: "Toll-Free Numbers",
      outbound: "$0.0200/mms",
      inbound: "$0.0200/mms",
    },
    { type: "Short Code*", outbound: "$0.0200/mms", inbound: "$0.0200/mms" },
  ],
  CA: [
    { type: "Long Codes*", outbound: "$0.0180/mms", inbound: "$0.0180/mms" },
    {
      type: "Toll-Free Numbers",
      outbound: "$0.0200/mms",
      inbound: "$0.0200/mms",
    },
  ],
};

export const SMS_CARRIER_SURCHARGE_FOOTNOTE =
  "Rates are for long codes that are successfully linked to 10DLC campaigns (i.e. registered traffic). Starting June 1, 2023, unregistered traffic toward AT&T, T-Mobile, Sprint, and Verizon will incur a surcharge of $0.0100, $0.0080, $0.080, and $0.0100 respectively.";

export const SMS_CARRIER_SURCHARGE: Record<
  "US" | "CA",
  CarrierFeeGroup[]
> = {
  US: [
    {
      title: "SMS Carrier Surcharge Fee",
      columns: [
        "Long Codes / To send SMS",
        "Long Codes / To receive SMS",
        "Short Codes / To send SMS",
        "Short Codes / To receive SMS",
        "Toll-Free / To send SMS",
        "Toll-Free / To receive SMS",
      ],
      rows: [
        {
          carrier: "AT&T",
          values: [
            "$0.0035/sms",
            "$0.0035/sms",
            "$0.0035/sms",
            "$0.0035/sms",
            "$0.0035/sms",
            "$0.0035/sms",
          ],
        },
        {
          carrier: "T-Mobile",
          values: [
            "$0.0045/sms",
            "$0.0025/sms",
            "$0.0045/sms",
            "$0.0025/sms",
            "$0.0045/sms",
            "$0.0025/sms",
          ],
        },
        {
          carrier: "Verizon",
          values: [
            "$0.0040/sms",
            "NA",
            "$0.0040/sms",
            "NA",
            "$0.0040/sms",
            "NA",
          ],
        },
        {
          carrier: "US Cellular & Other Carrier Networks",
          values: [
            "$0.0050/sms",
            "$0.0025/sms",
            "$0.0045/sms",
            "$0.0025/sms",
            "$0.0045/sms",
            "$0.0025/sms",
          ],
        },
      ],
      footnote: SMS_CARRIER_SURCHARGE_FOOTNOTE,
    },
    {
      title: "RCS Carrier Surcharge Fee",
      columns: [
        "RCS Rich / Outbound",
        "RCS Rich / Inbound",
        "RCS Rich Media / Outbound",
        "RCS Rich Media / Inbound",
      ],
      rows: [
        {
          carrier: "AT&T",
          values: ["$0.0045", "$0.0045", "$0.01", "$0.01"],
        },
        {
          carrier: "T-Mobile",
          values: ["$0.0062", "$0.0025", "$0.0125", "$0.0125"],
        },
        {
          carrier: "Verizon",
          values: ["$0.004", "$0", "$0.006", "$0"],
        },
        {
          carrier: "US Cellular",
          values: ["$0.0062", "$0.0025", "$0.0135", "$0.0135"],
        },
        {
          carrier: "Other Carrier Networks",
          values: ["$0.0045", "$0.0045", "$0.01", "$0.01"],
        },
      ],
      footnote: SMS_CARRIER_SURCHARGE_FOOTNOTE,
    },
    {
      title: "MMS Carrier Surcharge Fee",
      columns: [
        "Long Codes / To send MMS",
        "Long Codes / To receive MMS",
        "Short Codes / To send MMS",
        "Short Codes / To receive MMS",
        "Toll-Free / To send MMS",
        "Toll-Free / To receive MMS",
      ],
      rows: [
        {
          carrier: "AT&T",
          values: [
            "$0.0090/mms",
            "$0.0090/mms",
            "$0.0090/mms",
            "$0.0090/mms",
            "$0.0090/mms",
            "$0.0090/mms",
          ],
        },
        {
          carrier: "T-Mobile",
          values: [
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
          ],
        },
        {
          carrier: "Verizon",
          values: [
            "$0.0065/mms",
            "NA",
            "$0.0065/mms",
            "NA",
            "$0.0065/mms",
            "NA",
          ],
        },
        {
          carrier: "US Cellular & Other Carrier Networks",
          values: [
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
            "$0.0100/mms",
          ],
        },
      ],
      footnote: SMS_CARRIER_SURCHARGE_FOOTNOTE,
    },
  ],
  CA: [
    {
      title: "SMS Carrier Surcharge Fee",
      columns: [
        "Long Codes / To send SMS",
        "Long Codes / To receive SMS",
        "Short Codes / To send SMS",
        "Short Codes / To receive SMS",
        "Toll-Free / To send SMS",
        "Toll-Free / To receive SMS",
      ],
      rows: [
        {
          carrier: "Bell & Virgin",
          values: [
            "$0.0088/sms",
            "NA",
            "$0.0054/sms",
            "$0.0054/sms",
            "$0.0088/sms",
            "NA",
          ],
        },
        {
          carrier: "Rogers & Fido",
          values: [
            "$0.0097/sms",
            "NA",
            "$0.0044/sms",
            "$0.0044/sms",
            "$0.0088/sms",
            "NA",
          ],
        },
        {
          carrier: "Telus",
          values: [
            "$0.0100/sms",
            "NA",
            "$0.0065/sms",
            "NA",
            "$0.0100/sms",
            "NA",
          ],
        },
        {
          carrier: "Freedom",
          values: [
            "$0.0072/sms",
            "NA",
            "$0.0080/sms",
            "NA",
            "$0.0072/sms",
            "NA",
          ],
        },
        {
          carrier: "Videotron",
          values: [
            "$0.0072/sms",
            "NA",
            "$0.0040/sms",
            "$0.0040/sms",
            "$0.0072/sms",
            "NA",
          ],
        },
        {
          carrier: "Other Carrier Networks",
          values: [
            "$0.0080/sms",
            "NA",
            "$0.0080/sms",
            "NA",
            "$0.0080/sms",
            "NA",
          ],
        },
      ],
      footnote: SMS_CARRIER_SURCHARGE_FOOTNOTE,
    },
    {
      title: "MMS Carrier Surcharge Fee",
      columns: [
        "Long Codes / To send MMS",
        "Long Codes / To receive MMS",
        "Toll-Free / To send MMS",
        "Toll-Free / To receive MMS",
      ],
      rows: [
        {
          carrier: "Bell & Virgin",
          values: ["$0.0310/mms", "NA", "$0.0310/mms", "NA"],
        },
        {
          carrier: "Rogers & Fido",
          values: ["$0.0194/mms", "NA", "$0.0176/mms", "NA"],
        },
        {
          carrier: "Telus",
          values: ["$0.0200/mms", "NA", "$0.0200/mms", "NA"],
        },
        {
          carrier: "Freedom",
          values: ["$0.0096/mms", "NA", "$0.0096/mms", "NA"],
        },
        {
          carrier: "Videotron",
          values: ["$0.0096/mms", "NA", "$0.0096/mms", "NA"],
        },
        {
          carrier: "Other Carrier Networks",
          values: ["$0.0160/mms", "NA", "$0.0160/mms", "NA"],
        },
      ],
      footnote: SMS_CARRIER_SURCHARGE_FOOTNOTE,
    },
  ],
};

export function getSMSPricingData(
  countryCode: string | undefined,
): CachedPricingData | null {
  if (!countryCode) return null;
  return PRICING_CACHE[countryCode.toUpperCase()] || null;
}

export function getSMSPricingMeta(countryCode: string) {
  const normalizedCode = countryCode.toUpperCase();
  const countryName = COUNTRY_NAMES[normalizedCode] || normalizedCode;

  return {
    title: `SMS Messaging API Pricing - ${countryName}`,
    description: `Get competitive pay-as-you-go SMS pricing, MMS pricing, and phone number rentals in ${countryName}, with volume discounts available for committed spend.`,
    countryName,
  };
}
