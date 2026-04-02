/**
 * SMS coverage cache generated from the live Plivo coverage page.
 * Source: https://www.plivo.com/sms/coverage/
 * Generated: 2026-04-02 | Countries: 226
 */

export type SmsCoverageContinent =
  | "north-america"
  | "south-america"
  | "europe"
  | "asia"
  | "africa"
  | "oceania";

export type SmsCoverageDeliveryType = "Inbound & Outbound" | "Inbound Only";

export interface SmsCoverageCountry {
  name: string;
  code: string;
  flag: string;
  continent: SmsCoverageContinent;
  outbound: boolean;
  inbound: boolean;
  deliveryType: SmsCoverageDeliveryType;
}

export const SMS_COVERAGE_PAGE_META = {
  title: "Global SMS API Coverage",
  description: "Communicate with your customers in India and 190 other countries. Plivo's global SMS coverage is equal to its expansive feature set. Try it for free!",
  eyebrow: "Messaging Platform",
  heading: "Guaranteed Global SMS Delivery",
  subheading: "Reach your customers across any country in the world",
  stats: [
    {
      value: "220+",
      label: "Countries"
    },
    {
      value: "900+",
      label: "Networks"
    }
  ]
};

export const SMS_COVERAGE_PRIORITY_COUNTRY_CODES = ["US", "IN", "CA", "GB", "AU"] as const;

export const SMS_COVERAGE_CONTINENT_LABELS: Record<SmsCoverageContinent, string> = {
  "north-america": "North America",
  "south-america": "South America",
  europe: "Europe",
  asia: "Asia",
  africa: "Africa",
  oceania: "Oceania",
};

export const SMS_COVERAGE_CONTINENT_ORDER: SmsCoverageContinent[] = [
  "north-america",
  "south-america",
  "europe",
  "asia",
  "africa",
  "oceania",
];

export const SMS_COVERAGE_COUNTRIES: SmsCoverageCountry[] = [
  {
    name: "Anguilla",
    code: "AI",
    flag: "🇦🇮",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
    flag: "🇦🇬",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Aruba",
    code: "AW",
    flag: "🇦🇼",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bahamas",
    code: "BS",
    flag: "🇧🇸",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Barbados",
    code: "BB",
    flag: "🇧🇧",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Belize",
    code: "BZ",
    flag: "🇧🇿",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bermuda",
    code: "BM",
    flag: "🇧🇲",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    continent: "north-america",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Cayman Islands",
    code: "KY",
    flag: "🇰🇾",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Costa Rica",
    code: "CR",
    flag: "🇨🇷",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Cuba",
    code: "CU",
    flag: "🇨🇺",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Dominica",
    code: "DM",
    flag: "🇩🇲",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Dominican Republic",
    code: "DO",
    flag: "🇩🇴",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "El Salvador",
    code: "SV",
    flag: "🇸🇻",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Greenland",
    code: "GL",
    flag: "🇬🇱",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Grenada",
    code: "GD",
    flag: "🇬🇩",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guadeloupe & Martinique",
    code: "GP",
    flag: "🇬🇵",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guatemala",
    code: "GT",
    flag: "🇬🇹",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Haiti",
    code: "HT",
    flag: "🇭🇹",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Honduras",
    code: "HN",
    flag: "🇭🇳",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Jamaica",
    code: "JM",
    flag: "🇯🇲",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Mexico",
    code: "MX",
    flag: "🇲🇽",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Montserrat",
    code: "MS",
    flag: "🇲🇸",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Netherlands Antilles",
    code: "AN",
    flag: "🇦🇳",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Nicaragua",
    code: "NI",
    flag: "🇳🇮",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
    flag: "🇲🇵",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Panama",
    code: "PA",
    flag: "🇵🇦",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Puerto Rico",
    code: "PR",
    flag: "🇵🇷",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saint Barthelemy",
    code: "BL",
    flag: "🇧🇱",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
    flag: "🇰🇳",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saint Lucia",
    code: "LC",
    flag: "🇱🇨",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saint Martin",
    code: "MF",
    flag: "🇲🇫",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM",
    flag: "🇵🇲",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
    flag: "🇻🇨",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Trinidad and Tobago",
    code: "TT",
    flag: "🇹🇹",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC",
    flag: "🇹🇨",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    continent: "north-america",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "United States Virgin Islands",
    code: "VI",
    flag: "🇻🇮",
    continent: "north-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Argentina",
    code: "AR",
    flag: "🇦🇷",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bolivia",
    code: "BO",
    flag: "🇧🇴",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Chile",
    code: "CL",
    flag: "🇨🇱",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Colombia",
    code: "CO",
    flag: "🇨🇴",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Curacao",
    code: "CW",
    flag: "🇨🇼",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Ecuador",
    code: "EC",
    flag: "🇪🇨",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Falkland Islands",
    code: "FK",
    flag: "🇫🇰",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "French Guiana",
    code: "GF",
    flag: "🇬🇫",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guyana",
    code: "GY",
    flag: "🇬🇾",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Paraguay",
    code: "PY",
    flag: "🇵🇾",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Peru",
    code: "PE",
    flag: "🇵🇪",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Suriname",
    code: "SR",
    flag: "🇸🇷",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Uruguay",
    code: "UY",
    flag: "🇺🇾",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Venezuela",
    code: "VE",
    flag: "🇻🇪",
    continent: "south-america",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Afghanistan",
    code: "AF",
    flag: "🇦🇫",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Armenia",
    code: "AM",
    flag: "🇦🇲",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Azerbaijan",
    code: "AZ",
    flag: "🇦🇿",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bahrain",
    code: "BH",
    flag: "🇧🇭",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bangladesh",
    code: "BD",
    flag: "🇧🇩",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bhutan",
    code: "BT",
    flag: "🇧🇹",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Brunei",
    code: "BN",
    flag: "🇧🇳",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Cambodia",
    code: "KH",
    flag: "🇰🇭",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "China",
    code: "CN",
    flag: "🇨🇳",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Georgia",
    code: "GE",
    flag: "🇬🇪",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Hong Kong",
    code: "HK",
    flag: "🇭🇰",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Indonesia",
    code: "ID",
    flag: "🇮🇩",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Iran",
    code: "IR",
    flag: "🇮🇷",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Iraq",
    code: "IQ",
    flag: "🇮🇶",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Israel",
    code: "IL",
    flag: "🇮🇱",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Jordan",
    code: "JO",
    flag: "🇯🇴",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    flag: "🇰🇿",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Kuwait",
    code: "KW",
    flag: "🇰🇼",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
    flag: "🇰🇬",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Laos",
    code: "LA",
    flag: "🇱🇦",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Lebanon",
    code: "LB",
    flag: "🇱🇧",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Macao",
    code: "MO",
    flag: "🇲🇴",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Malaysia",
    code: "MY",
    flag: "🇲🇾",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Maldives",
    code: "MV",
    flag: "🇲🇻",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Mongolia",
    code: "MN",
    flag: "🇲🇳",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Myanmar",
    code: "MM",
    flag: "🇲🇲",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Nepal",
    code: "NP",
    flag: "🇳🇵",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Oman",
    code: "OM",
    flag: "🇴🇲",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Pakistan",
    code: "PK",
    flag: "🇵🇰",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Palestine",
    code: "PS",
    flag: "🇵🇸",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Philippines",
    code: "PH",
    flag: "🇵🇭",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Qatar",
    code: "QA",
    flag: "🇶🇦",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    flag: "🇸🇦",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Singapore",
    code: "SG",
    flag: "🇸🇬",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "South Korea",
    code: "KR",
    flag: "🇰🇷",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Sri Lanka",
    code: "LK",
    flag: "🇱🇰",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Syria",
    code: "SY",
    flag: "🇸🇾",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Taiwan",
    code: "TW",
    flag: "🇹🇼",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Tajikistan",
    code: "TJ",
    flag: "🇹🇯",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Thailand",
    code: "TH",
    flag: "🇹🇭",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Timor-Leste",
    code: "TL",
    flag: "🇹🇱",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Turkey",
    code: "TR",
    flag: "🇹🇷",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Turkmenistan",
    code: "TM",
    flag: "🇹🇲",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Uzbekistan",
    code: "UZ",
    flag: "🇺🇿",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Vietnam",
    code: "VN",
    flag: "🇻🇳",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Yemen",
    code: "YE",
    flag: "🇾🇪",
    continent: "asia",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Albania",
    code: "AL",
    flag: "🇦🇱",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Andorra",
    code: "AD",
    flag: "🇦🇩",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Austria",
    code: "AT",
    flag: "🇦🇹",
    continent: "europe",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Belarus",
    code: "BY",
    flag: "🇧🇾",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Belgium",
    code: "BE",
    flag: "🇧🇪",
    continent: "europe",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
    flag: "🇧🇦",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "British Virgin Islands",
    code: "VG",
    flag: "🇻🇬",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Bulgaria",
    code: "BG",
    flag: "🇧🇬",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Croatia",
    code: "HR",
    flag: "🇭🇷",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Cyprus",
    code: "CY",
    flag: "🇨🇾",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Czech Republic",
    code: "CZ",
    flag: "🇨🇿",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Denmark",
    code: "DK",
    flag: "🇩🇰",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Estonia",
    code: "EE",
    flag: "🇪🇪",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Faroe Islands",
    code: "FO",
    flag: "🇫🇴",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Finland",
    code: "FI",
    flag: "🇫🇮",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "France",
    code: "FR",
    flag: "🇫🇷",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Gibraltar",
    code: "GI",
    flag: "🇬🇮",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Greece",
    code: "GR",
    flag: "🇬🇷",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guernsey",
    code: "GG",
    flag: "🇬🇬",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Hungary",
    code: "HU",
    flag: "🇭🇺",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Iceland",
    code: "IS",
    flag: "🇮🇸",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Ireland",
    code: "IE",
    flag: "🇮🇪",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Kosovo",
    code: "XK",
    flag: "🇽🇰",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Latvia",
    code: "LV",
    flag: "🇱🇻",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Liechtenstein",
    code: "LI",
    flag: "🇱🇮",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Lithuania",
    code: "LT",
    flag: "🇱🇹",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Luxembourg",
    code: "LU",
    flag: "🇱🇺",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Macedonia",
    code: "MK",
    flag: "🇲🇰",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Malta",
    code: "MT",
    flag: "🇲🇹",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Martinique",
    code: "MQ",
    flag: "🇲🇶",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Moldova",
    code: "MD",
    flag: "🇲🇩",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Monaco",
    code: "MC",
    flag: "🇲🇨",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Montenegro",
    code: "ME",
    flag: "🇲🇪",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Netherlands",
    code: "NL",
    flag: "🇳🇱",
    continent: "europe",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Norway",
    code: "NO",
    flag: "🇳🇴",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Poland",
    code: "PL",
    flag: "🇵🇱",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Portugal",
    code: "PT",
    flag: "🇵🇹",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Romania",
    code: "RO",
    flag: "🇷🇴",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Russia",
    code: "RU",
    flag: "🇷🇺",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "San Marino",
    code: "SM",
    flag: "🇸🇲",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Serbia",
    code: "RS",
    flag: "🇷🇸",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Slovakia",
    code: "SK",
    flag: "🇸🇰",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Slovenia",
    code: "SI",
    flag: "🇸🇮",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Spain",
    code: "ES",
    flag: "🇪🇸",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Sweden",
    code: "SE",
    flag: "🇸🇪",
    continent: "europe",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Switzerland",
    code: "CH",
    flag: "🇨🇭",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Ukraine",
    code: "UA",
    flag: "🇺🇦",
    continent: "europe",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    continent: "europe",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Algeria",
    code: "DZ",
    flag: "🇩🇿",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Angola",
    code: "AO",
    flag: "🇦🇴",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Benin",
    code: "BJ",
    flag: "🇧🇯",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Botswana",
    code: "BW",
    flag: "🇧🇼",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Burkina Faso",
    code: "BF",
    flag: "🇧🇫",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Burundi",
    code: "BI",
    flag: "🇧🇮",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Cameroon",
    code: "CM",
    flag: "🇨🇲",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Cape Verde",
    code: "CV",
    flag: "🇨🇻",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Central African Republic",
    code: "CF",
    flag: "🇨🇫",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Chad",
    code: "TD",
    flag: "🇹🇩",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Comoros",
    code: "KM",
    flag: "🇰🇲",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Congo",
    code: "CG",
    flag: "🇨🇬",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Democratic Republic Congo",
    code: "CD",
    flag: "🇨🇩",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Djibouti",
    code: "DJ",
    flag: "🇩🇯",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Egypt",
    code: "EG",
    flag: "🇪🇬",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
    flag: "🇬🇶",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Eritrea",
    code: "ER",
    flag: "🇪🇷",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Ethiopia",
    code: "ET",
    flag: "🇪🇹",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Gabon",
    code: "GA",
    flag: "🇬🇦",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Gambia",
    code: "GM",
    flag: "🇬🇲",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Ghana",
    code: "GH",
    flag: "🇬🇭",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guinea",
    code: "GN",
    flag: "🇬🇳",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
    flag: "🇬🇼",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Ivory Coast",
    code: "CI",
    flag: "🇨🇮",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Kenya",
    code: "KE",
    flag: "🇰🇪",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Lesotho",
    code: "LS",
    flag: "🇱🇸",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Liberia",
    code: "LR",
    flag: "🇱🇷",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Libya",
    code: "LY",
    flag: "🇱🇾",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Madagascar",
    code: "MG",
    flag: "🇲🇬",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Malawi",
    code: "MW",
    flag: "🇲🇼",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Mali",
    code: "ML",
    flag: "🇲🇱",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Mauritania",
    code: "MR",
    flag: "🇲🇷",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Mauritius",
    code: "MU",
    flag: "🇲🇺",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Morocco",
    code: "MA",
    flag: "🇲🇦",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Mozambique",
    code: "MZ",
    flag: "🇲🇿",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Namibia",
    code: "NA",
    flag: "🇳🇦",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Niger",
    code: "NE",
    flag: "🇳🇪",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Nigeria",
    code: "NG",
    flag: "🇳🇬",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Reunion",
    code: "RE",
    flag: "🇷🇪",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Rwanda",
    code: "RW",
    flag: "🇷🇼",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Sao Tome and Principe",
    code: "ST",
    flag: "🇸🇹",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Senegal",
    code: "SN",
    flag: "🇸🇳",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Seychelles",
    code: "SC",
    flag: "🇸🇨",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Sierra Leone",
    code: "SL",
    flag: "🇸🇱",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Somalia",
    code: "SO",
    flag: "🇸🇴",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "South Sudan",
    code: "SS",
    flag: "🇸🇸",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Sudan",
    code: "SD",
    flag: "🇸🇩",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Swaziland",
    code: "SZ",
    flag: "🇸🇿",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Tanzania",
    code: "TZ",
    flag: "🇹🇿",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Togo",
    code: "TG",
    flag: "🇹🇬",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Tunisia",
    code: "TN",
    flag: "🇹🇳",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Uganda",
    code: "UG",
    flag: "🇺🇬",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Zambia",
    code: "ZM",
    flag: "🇿🇲",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    flag: "🇿🇼",
    continent: "africa",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "American-Samoa",
    code: "AS",
    flag: "🇦🇸",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    continent: "oceania",
    outbound: true,
    inbound: true,
    deliveryType: "Inbound Only"
  },
  {
    name: "Cook Islands",
    code: "CK",
    flag: "🇨🇰",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Fiji",
    code: "FJ",
    flag: "🇫🇯",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "French Polynesia",
    code: "PF",
    flag: "🇵🇫",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Guam",
    code: "GU",
    flag: "🇬🇺",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Marshall Islands",
    code: "MH",
    flag: "🇲🇭",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Micronesia",
    code: "FM",
    flag: "🇫🇲",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "New Caledonia",
    code: "NC",
    flag: "🇳🇨",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "New Zealand",
    code: "NZ",
    flag: "🇳🇿",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Niue",
    code: "NU",
    flag: "🇳🇺",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Norfolk Island",
    code: "NF",
    flag: "🇳🇫",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Palau",
    code: "PW",
    flag: "🇵🇼",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Papua New Guinea",
    code: "PG",
    flag: "🇵🇬",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Samoa",
    code: "WS",
    flag: "🇼🇸",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Solomon Islands",
    code: "SB",
    flag: "🇸🇧",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Tonga",
    code: "TO",
    flag: "🇹🇴",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Tuvalu",
    code: "TV",
    flag: "🇹🇻",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  },
  {
    name: "Vanuatu",
    code: "VU",
    flag: "🇻🇺",
    continent: "oceania",
    outbound: true,
    inbound: false,
    deliveryType: "Inbound & Outbound"
  }
];

export const SMS_COVERAGE_COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  SMS_COVERAGE_COUNTRIES.map((country) => [country.code, country.name]),
);
