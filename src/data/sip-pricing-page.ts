export interface SIPPricingCallRow {
  label: string;
  outbound: string;
  inbound: string;
  startsAt: boolean;
  showDetailedPricingLink: boolean;
}

export interface SIPPricingPhoneRow {
  label: string;
  price: string | null;
}

export interface SIPPricingAddOnRow {
  label: string;
  price: string;
}

export interface SIPPricingNetworkRow {
  label: string;
  price: string;
}

export interface SIPPricingCalculator {
  localRate: number;
  tollfreeRate: number;
  currencySymbol: "$" | "₹";
}

export interface SIPPricingCountryOption {
  code: string;
  name: string;
  flag: string;
  isPriority: boolean;
}

export interface SIPPricingCountryData {
  name: string;
  code: string;
  callRows: SIPPricingCallRow[];
  phoneRows: SIPPricingPhoneRow[];
  addOnRows: SIPPricingAddOnRow[];
  networkRows: SIPPricingNetworkRow[];
  calculator: SIPPricingCalculator | null;
}

export const SIP_PRICING_SUPPORT_URL = "https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292";
export const SIP_PRICING_VOLUME_URL = "/contact/sales";
export const SIP_PRICING_VOICE_DETAILS_URL = "/voice/pricing/";

export const SIP_PRICING_PRIORITY_COUNTRIES: SIPPricingCountryOption[] = [
  {
    "code": "US",
    "name": "United States",
    "flag": "🇺🇸"
  },
  {
    "code": "CA",
    "name": "Canada",
    "flag": "🇨🇦"
  },
  {
    "code": "GB",
    "name": "United Kingdom",
    "flag": "🇬🇧"
  },
  {
    "code": "AU",
    "name": "Australia",
    "flag": "🇦🇺"
  },
  {
    "code": "IN",
    "name": "India",
    "flag": "🇮🇳"
  },
  {
    "code": "FR",
    "name": "France",
    "flag": "🇫🇷"
  }
];

export const SIP_PRICING_COUNTRY_CODES = [
  "AI",
  "AG",
  "AW",
  "BS",
  "BB",
  "BZ",
  "BM",
  "CA",
  "KY",
  "CR",
  "CU",
  "DM",
  "DO",
  "SV",
  "GL",
  "GD",
  "GP",
  "GT",
  "HT",
  "HN",
  "JM",
  "MX",
  "MS",
  "AN",
  "NI",
  "MP",
  "PA",
  "PR",
  "BL",
  "KN",
  "LC",
  "MF",
  "PM",
  "VC",
  "TT",
  "TC",
  "US",
  "VI",
  "AR",
  "BO",
  "BR",
  "CL",
  "CO",
  "CW",
  "EC",
  "FK",
  "GF",
  "GY",
  "PY",
  "PE",
  "SR",
  "UY",
  "VE",
  "AF",
  "AM",
  "AZ",
  "BH",
  "BD",
  "BT",
  "BN",
  "KH",
  "CN",
  "GE",
  "HK",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IL",
  "JP",
  "JO",
  "KZ",
  "KW",
  "KG",
  "LA",
  "LB",
  "MO",
  "MY",
  "MV",
  "MN",
  "MM",
  "NP",
  "OM",
  "PK",
  "PS",
  "PH",
  "QA",
  "SA",
  "SG",
  "KR",
  "LK",
  "SY",
  "TW",
  "TJ",
  "TH",
  "TL",
  "TR",
  "TM",
  "AE",
  "UZ",
  "VN",
  "YE",
  "AL",
  "AD",
  "AT",
  "BY",
  "BE",
  "BA",
  "VG",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FO",
  "FI",
  "FR",
  "DE",
  "GI",
  "GR",
  "GG",
  "HU",
  "IS",
  "IE",
  "IT",
  "LV",
  "LI",
  "LT",
  "LU",
  "MK",
  "MT",
  "MQ",
  "MD",
  "MC",
  "ME",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RU",
  "SM",
  "RS",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "UA",
  "GB",
  "DZ",
  "AO",
  "BJ",
  "BW",
  "BF",
  "BI",
  "CM",
  "CV",
  "CF",
  "TD",
  "KM",
  "CD",
  "DJ",
  "EG",
  "GQ",
  "ER",
  "ET",
  "GA",
  "GM",
  "GH",
  "GN",
  "GW",
  "CI",
  "KE",
  "LS",
  "LR",
  "LY",
  "MG",
  "MW",
  "ML",
  "MR",
  "MU",
  "MA",
  "MZ",
  "NA",
  "NE",
  "NG",
  "RE",
  "RW",
  "ST",
  "SN",
  "SC",
  "SL",
  "SO",
  "ZA",
  "SS",
  "SD",
  "SZ",
  "TZ",
  "TG",
  "TN",
  "UG",
  "ZM",
  "ZW",
  "CG",
  "AS",
  "AU",
  "CK",
  "FJ",
  "PF",
  "GU",
  "MH",
  "FM",
  "NC",
  "NZ",
  "NU",
  "NF",
  "PW",
  "PG",
  "WS",
  "SB",
  "TO",
  "TV",
  "VU"
] as const;

export const SIP_PRICING_COUNTRIES: SIPPricingCountryOption[] = [
  {
    "code": "US",
    "name": "United States",
    "flag": "🇺🇸",
    "isPriority": true
  },
  {
    "code": "CA",
    "name": "Canada",
    "flag": "🇨🇦",
    "isPriority": true
  },
  {
    "code": "GB",
    "name": "United Kingdom",
    "flag": "🇬🇧",
    "isPriority": true
  },
  {
    "code": "AU",
    "name": "Australia",
    "flag": "🇦🇺",
    "isPriority": true
  },
  {
    "code": "IN",
    "name": "India",
    "flag": "🇮🇳",
    "isPriority": true
  },
  {
    "code": "FR",
    "name": "France",
    "flag": "🇫🇷",
    "isPriority": true
  },
  {
    "code": "AF",
    "name": "Afghanistan",
    "flag": "🇦🇫",
    "isPriority": false
  },
  {
    "code": "AL",
    "name": "Albania",
    "flag": "🇦🇱",
    "isPriority": false
  },
  {
    "code": "DZ",
    "name": "Algeria",
    "flag": "🇩🇿",
    "isPriority": false
  },
  {
    "code": "AS",
    "name": "American Samoa",
    "flag": "🇦🇸",
    "isPriority": false
  },
  {
    "code": "AD",
    "name": "Andorra",
    "flag": "🇦🇩",
    "isPriority": false
  },
  {
    "code": "AO",
    "name": "Angola",
    "flag": "🇦🇴",
    "isPriority": false
  },
  {
    "code": "AI",
    "name": "Anguilla",
    "flag": "🇦🇮",
    "isPriority": false
  },
  {
    "code": "AG",
    "name": "Antigua and Barbuda",
    "flag": "🇦🇬",
    "isPriority": false
  },
  {
    "code": "AR",
    "name": "Argentina",
    "flag": "🇦🇷",
    "isPriority": false
  },
  {
    "code": "AM",
    "name": "Armenia",
    "flag": "🇦🇲",
    "isPriority": false
  },
  {
    "code": "AW",
    "name": "Aruba",
    "flag": "🇦🇼",
    "isPriority": false
  },
  {
    "code": "AT",
    "name": "Austria",
    "flag": "🇦🇹",
    "isPriority": false
  },
  {
    "code": "AZ",
    "name": "Azerbaijan",
    "flag": "🇦🇿",
    "isPriority": false
  },
  {
    "code": "BS",
    "name": "Bahamas",
    "flag": "🇧🇸",
    "isPriority": false
  },
  {
    "code": "BH",
    "name": "Bahrain",
    "flag": "🇧🇭",
    "isPriority": false
  },
  {
    "code": "BD",
    "name": "Bangladesh",
    "flag": "🇧🇩",
    "isPriority": false
  },
  {
    "code": "BB",
    "name": "Barbados",
    "flag": "🇧🇧",
    "isPriority": false
  },
  {
    "code": "BY",
    "name": "Belarus",
    "flag": "🇧🇾",
    "isPriority": false
  },
  {
    "code": "BE",
    "name": "Belgium",
    "flag": "🇧🇪",
    "isPriority": false
  },
  {
    "code": "BZ",
    "name": "Belize",
    "flag": "🇧🇿",
    "isPriority": false
  },
  {
    "code": "BJ",
    "name": "Benin",
    "flag": "🇧🇯",
    "isPriority": false
  },
  {
    "code": "BM",
    "name": "Bermuda",
    "flag": "🇧🇲",
    "isPriority": false
  },
  {
    "code": "BT",
    "name": "Bhutan",
    "flag": "🇧🇹",
    "isPriority": false
  },
  {
    "code": "BO",
    "name": "Bolivia",
    "flag": "🇧🇴",
    "isPriority": false
  },
  {
    "code": "BA",
    "name": "Bosnia and Herzegovina",
    "flag": "🇧🇦",
    "isPriority": false
  },
  {
    "code": "BW",
    "name": "Botswana",
    "flag": "🇧🇼",
    "isPriority": false
  },
  {
    "code": "BR",
    "name": "Brazil",
    "flag": "🇧🇷",
    "isPriority": false
  },
  {
    "code": "BN",
    "name": "Brunei",
    "flag": "🇧🇳",
    "isPriority": false
  },
  {
    "code": "BG",
    "name": "Bulgaria",
    "flag": "🇧🇬",
    "isPriority": false
  },
  {
    "code": "BF",
    "name": "Burkina Faso",
    "flag": "🇧🇫",
    "isPriority": false
  },
  {
    "code": "BI",
    "name": "Burundi",
    "flag": "🇧🇮",
    "isPriority": false
  },
  {
    "code": "KH",
    "name": "Cambodia",
    "flag": "🇰🇭",
    "isPriority": false
  },
  {
    "code": "CM",
    "name": "Cameroon",
    "flag": "🇨🇲",
    "isPriority": false
  },
  {
    "code": "CV",
    "name": "Cape Verde",
    "flag": "🇨🇻",
    "isPriority": false
  },
  {
    "code": "KY",
    "name": "Cayman Islands",
    "flag": "🇰🇾",
    "isPriority": false
  },
  {
    "code": "CF",
    "name": "Central African Republic",
    "flag": "🇨🇫",
    "isPriority": false
  },
  {
    "code": "TD",
    "name": "Chad",
    "flag": "🇹🇩",
    "isPriority": false
  },
  {
    "code": "CL",
    "name": "Chile",
    "flag": "🇨🇱",
    "isPriority": false
  },
  {
    "code": "CN",
    "name": "China",
    "flag": "🇨🇳",
    "isPriority": false
  },
  {
    "code": "CO",
    "name": "Colombia",
    "flag": "🇨🇴",
    "isPriority": false
  },
  {
    "code": "KM",
    "name": "Comoros",
    "flag": "🇰🇲",
    "isPriority": false
  },
  {
    "code": "CG",
    "name": "Congo",
    "flag": "🇨🇬",
    "isPriority": false
  },
  {
    "code": "CD",
    "name": "Congo Democratic Republic",
    "flag": "🇨🇩",
    "isPriority": false
  },
  {
    "code": "CK",
    "name": "Cook Islands",
    "flag": "🇨🇰",
    "isPriority": false
  },
  {
    "code": "CR",
    "name": "Costa Rica",
    "flag": "🇨🇷",
    "isPriority": false
  },
  {
    "code": "HR",
    "name": "Croatia",
    "flag": "🇭🇷",
    "isPriority": false
  },
  {
    "code": "CU",
    "name": "Cuba",
    "flag": "🇨🇺",
    "isPriority": false
  },
  {
    "code": "CW",
    "name": "Curaao",
    "flag": "🇨🇼",
    "isPriority": false
  },
  {
    "code": "CY",
    "name": "Cyprus",
    "flag": "🇨🇾",
    "isPriority": false
  },
  {
    "code": "CZ",
    "name": "Czech Republic",
    "flag": "🇨🇿",
    "isPriority": false
  },
  {
    "code": "DK",
    "name": "Denmark",
    "flag": "🇩🇰",
    "isPriority": false
  },
  {
    "code": "DJ",
    "name": "Djibouti",
    "flag": "🇩🇯",
    "isPriority": false
  },
  {
    "code": "DM",
    "name": "Dominica",
    "flag": "🇩🇲",
    "isPriority": false
  },
  {
    "code": "DO",
    "name": "Dominican Republic",
    "flag": "🇩🇴",
    "isPriority": false
  },
  {
    "code": "EC",
    "name": "Ecuador",
    "flag": "🇪🇨",
    "isPriority": false
  },
  {
    "code": "EG",
    "name": "Egypt",
    "flag": "🇪🇬",
    "isPriority": false
  },
  {
    "code": "SV",
    "name": "El Salvador",
    "flag": "🇸🇻",
    "isPriority": false
  },
  {
    "code": "GQ",
    "name": "Equatorial Guinea",
    "flag": "🇬🇶",
    "isPriority": false
  },
  {
    "code": "ER",
    "name": "Eritrea",
    "flag": "🇪🇷",
    "isPriority": false
  },
  {
    "code": "EE",
    "name": "Estonia",
    "flag": "🇪🇪",
    "isPriority": false
  },
  {
    "code": "ET",
    "name": "Ethiopia",
    "flag": "🇪🇹",
    "isPriority": false
  },
  {
    "code": "FO",
    "name": "Faeroe Islands",
    "flag": "🇫🇴",
    "isPriority": false
  },
  {
    "code": "FK",
    "name": "Falkland Islands (Malvinas)",
    "flag": "🇫🇰",
    "isPriority": false
  },
  {
    "code": "FJ",
    "name": "Fiji",
    "flag": "🇫🇯",
    "isPriority": false
  },
  {
    "code": "FI",
    "name": "Finland",
    "flag": "🇫🇮",
    "isPriority": false
  },
  {
    "code": "GF",
    "name": "French Guiana",
    "flag": "🇬🇫",
    "isPriority": false
  },
  {
    "code": "PF",
    "name": "French Polynesia",
    "flag": "🇵🇫",
    "isPriority": false
  },
  {
    "code": "GA",
    "name": "Gabon",
    "flag": "🇬🇦",
    "isPriority": false
  },
  {
    "code": "GM",
    "name": "Gambia",
    "flag": "🇬🇲",
    "isPriority": false
  },
  {
    "code": "GE",
    "name": "Georgia",
    "flag": "🇬🇪",
    "isPriority": false
  },
  {
    "code": "DE",
    "name": "Germany",
    "flag": "🇩🇪",
    "isPriority": false
  },
  {
    "code": "GH",
    "name": "Ghana",
    "flag": "🇬🇭",
    "isPriority": false
  },
  {
    "code": "GI",
    "name": "Gibraltar",
    "flag": "🇬🇮",
    "isPriority": false
  },
  {
    "code": "GR",
    "name": "Greece",
    "flag": "🇬🇷",
    "isPriority": false
  },
  {
    "code": "GL",
    "name": "Greenland",
    "flag": "🇬🇱",
    "isPriority": false
  },
  {
    "code": "GD",
    "name": "Grenada",
    "flag": "🇬🇩",
    "isPriority": false
  },
  {
    "code": "GP",
    "name": "Guadeloupe",
    "flag": "🇬🇵",
    "isPriority": false
  },
  {
    "code": "GU",
    "name": "Guam",
    "flag": "🇬🇺",
    "isPriority": false
  },
  {
    "code": "GT",
    "name": "Guatemala",
    "flag": "🇬🇹",
    "isPriority": false
  },
  {
    "code": "GG",
    "name": "Guernsey",
    "flag": "🇬🇬",
    "isPriority": false
  },
  {
    "code": "GN",
    "name": "Guinea",
    "flag": "🇬🇳",
    "isPriority": false
  },
  {
    "code": "GW",
    "name": "Guinea Bissau",
    "flag": "🇬🇼",
    "isPriority": false
  },
  {
    "code": "GY",
    "name": "Guyana",
    "flag": "🇬🇾",
    "isPriority": false
  },
  {
    "code": "HT",
    "name": "Haiti",
    "flag": "🇭🇹",
    "isPriority": false
  },
  {
    "code": "HN",
    "name": "Honduras",
    "flag": "🇭🇳",
    "isPriority": false
  },
  {
    "code": "HK",
    "name": "Hong Kong",
    "flag": "🇭🇰",
    "isPriority": false
  },
  {
    "code": "HU",
    "name": "Hungary",
    "flag": "🇭🇺",
    "isPriority": false
  },
  {
    "code": "IS",
    "name": "Iceland",
    "flag": "🇮🇸",
    "isPriority": false
  },
  {
    "code": "ID",
    "name": "Indonesia",
    "flag": "🇮🇩",
    "isPriority": false
  },
  {
    "code": "IR",
    "name": "Iran",
    "flag": "🇮🇷",
    "isPriority": false
  },
  {
    "code": "IQ",
    "name": "Iraq",
    "flag": "🇮🇶",
    "isPriority": false
  },
  {
    "code": "IE",
    "name": "Ireland",
    "flag": "🇮🇪",
    "isPriority": false
  },
  {
    "code": "IL",
    "name": "Israel",
    "flag": "🇮🇱",
    "isPriority": false
  },
  {
    "code": "IT",
    "name": "Italy",
    "flag": "🇮🇹",
    "isPriority": false
  },
  {
    "code": "CI",
    "name": "Ivory Coast",
    "flag": "🇨🇮",
    "isPriority": false
  },
  {
    "code": "JM",
    "name": "Jamaica",
    "flag": "🇯🇲",
    "isPriority": false
  },
  {
    "code": "JP",
    "name": "Japan",
    "flag": "🇯🇵",
    "isPriority": false
  },
  {
    "code": "JO",
    "name": "Jordan",
    "flag": "🇯🇴",
    "isPriority": false
  },
  {
    "code": "KZ",
    "name": "Kazakhstan",
    "flag": "🇰🇿",
    "isPriority": false
  },
  {
    "code": "KE",
    "name": "Kenya",
    "flag": "🇰🇪",
    "isPriority": false
  },
  {
    "code": "KW",
    "name": "Kuwait",
    "flag": "🇰🇼",
    "isPriority": false
  },
  {
    "code": "KG",
    "name": "Kyrgyzstan",
    "flag": "🇰🇬",
    "isPriority": false
  },
  {
    "code": "LA",
    "name": "Laos",
    "flag": "🇱🇦",
    "isPriority": false
  },
  {
    "code": "LV",
    "name": "Latvia",
    "flag": "🇱🇻",
    "isPriority": false
  },
  {
    "code": "LB",
    "name": "Lebanon",
    "flag": "🇱🇧",
    "isPriority": false
  },
  {
    "code": "LS",
    "name": "Lesotho",
    "flag": "🇱🇸",
    "isPriority": false
  },
  {
    "code": "LR",
    "name": "Liberia",
    "flag": "🇱🇷",
    "isPriority": false
  },
  {
    "code": "LY",
    "name": "Libya",
    "flag": "🇱🇾",
    "isPriority": false
  },
  {
    "code": "LI",
    "name": "Liechtenstein",
    "flag": "🇱🇮",
    "isPriority": false
  },
  {
    "code": "LT",
    "name": "Lithuania",
    "flag": "🇱🇹",
    "isPriority": false
  },
  {
    "code": "LU",
    "name": "Luxembourg",
    "flag": "🇱🇺",
    "isPriority": false
  },
  {
    "code": "MO",
    "name": "Macao",
    "flag": "🇲🇴",
    "isPriority": false
  },
  {
    "code": "MK",
    "name": "Macedonia",
    "flag": "🇲🇰",
    "isPriority": false
  },
  {
    "code": "MG",
    "name": "Madagascar",
    "flag": "🇲🇬",
    "isPriority": false
  },
  {
    "code": "MW",
    "name": "Malawi",
    "flag": "🇲🇼",
    "isPriority": false
  },
  {
    "code": "MY",
    "name": "Malaysia",
    "flag": "🇲🇾",
    "isPriority": false
  },
  {
    "code": "MV",
    "name": "Maldives",
    "flag": "🇲🇻",
    "isPriority": false
  },
  {
    "code": "ML",
    "name": "Mali",
    "flag": "🇲🇱",
    "isPriority": false
  },
  {
    "code": "MT",
    "name": "Malta",
    "flag": "🇲🇹",
    "isPriority": false
  },
  {
    "code": "MH",
    "name": "Marshall Islands",
    "flag": "🇲🇭",
    "isPriority": false
  },
  {
    "code": "MQ",
    "name": "Martinique",
    "flag": "🇲🇶",
    "isPriority": false
  },
  {
    "code": "MR",
    "name": "Mauritania",
    "flag": "🇲🇷",
    "isPriority": false
  },
  {
    "code": "MU",
    "name": "Mauritius",
    "flag": "🇲🇺",
    "isPriority": false
  },
  {
    "code": "MX",
    "name": "Mexico",
    "flag": "🇲🇽",
    "isPriority": false
  },
  {
    "code": "FM",
    "name": "Micronesia",
    "flag": "🇫🇲",
    "isPriority": false
  },
  {
    "code": "MD",
    "name": "Moldova",
    "flag": "🇲🇩",
    "isPriority": false
  },
  {
    "code": "MC",
    "name": "Monaco",
    "flag": "🇲🇨",
    "isPriority": false
  },
  {
    "code": "MN",
    "name": "Mongolia",
    "flag": "🇲🇳",
    "isPriority": false
  },
  {
    "code": "ME",
    "name": "Montenegro",
    "flag": "🇲🇪",
    "isPriority": false
  },
  {
    "code": "MS",
    "name": "Montserrat",
    "flag": "🇲🇸",
    "isPriority": false
  },
  {
    "code": "MA",
    "name": "Morocco",
    "flag": "🇲🇦",
    "isPriority": false
  },
  {
    "code": "MZ",
    "name": "Mozambique",
    "flag": "🇲🇿",
    "isPriority": false
  },
  {
    "code": "MM",
    "name": "Myanmar",
    "flag": "🇲🇲",
    "isPriority": false
  },
  {
    "code": "NA",
    "name": "Namibia",
    "flag": "🇳🇦",
    "isPriority": false
  },
  {
    "code": "NP",
    "name": "Nepal",
    "flag": "🇳🇵",
    "isPriority": false
  },
  {
    "code": "NL",
    "name": "Netherlands",
    "flag": "🇳🇱",
    "isPriority": false
  },
  {
    "code": "AN",
    "name": "Netherlands Antilles",
    "flag": "🇦🇳",
    "isPriority": false
  },
  {
    "code": "NC",
    "name": "New Caledonia",
    "flag": "🇳🇨",
    "isPriority": false
  },
  {
    "code": "NZ",
    "name": "New Zealand",
    "flag": "🇳🇿",
    "isPriority": false
  },
  {
    "code": "NI",
    "name": "Nicaragua",
    "flag": "🇳🇮",
    "isPriority": false
  },
  {
    "code": "NE",
    "name": "Niger",
    "flag": "🇳🇪",
    "isPriority": false
  },
  {
    "code": "NG",
    "name": "Nigeria",
    "flag": "🇳🇬",
    "isPriority": false
  },
  {
    "code": "NU",
    "name": "Niue",
    "flag": "🇳🇺",
    "isPriority": false
  },
  {
    "code": "NF",
    "name": "Norfolk Island",
    "flag": "🇳🇫",
    "isPriority": false
  },
  {
    "code": "MP",
    "name": "Northern Mariana Islands",
    "flag": "🇲🇵",
    "isPriority": false
  },
  {
    "code": "NO",
    "name": "Norway",
    "flag": "🇳🇴",
    "isPriority": false
  },
  {
    "code": "OM",
    "name": "Oman",
    "flag": "🇴🇲",
    "isPriority": false
  },
  {
    "code": "PK",
    "name": "Pakistan",
    "flag": "🇵🇰",
    "isPriority": false
  },
  {
    "code": "PW",
    "name": "Palau",
    "flag": "🇵🇼",
    "isPriority": false
  },
  {
    "code": "PS",
    "name": "Palestinian Authority",
    "flag": "🇵🇸",
    "isPriority": false
  },
  {
    "code": "PA",
    "name": "Panama",
    "flag": "🇵🇦",
    "isPriority": false
  },
  {
    "code": "PG",
    "name": "Papua New Guinea",
    "flag": "🇵🇬",
    "isPriority": false
  },
  {
    "code": "PY",
    "name": "Paraguay",
    "flag": "🇵🇾",
    "isPriority": false
  },
  {
    "code": "PE",
    "name": "Peru",
    "flag": "🇵🇪",
    "isPriority": false
  },
  {
    "code": "PH",
    "name": "Philippines",
    "flag": "🇵🇭",
    "isPriority": false
  },
  {
    "code": "PL",
    "name": "Poland",
    "flag": "🇵🇱",
    "isPriority": false
  },
  {
    "code": "PT",
    "name": "Portugal",
    "flag": "🇵🇹",
    "isPriority": false
  },
  {
    "code": "PR",
    "name": "Puerto Rico",
    "flag": "🇵🇷",
    "isPriority": false
  },
  {
    "code": "QA",
    "name": "Qatar",
    "flag": "🇶🇦",
    "isPriority": false
  },
  {
    "code": "RE",
    "name": "Reunion",
    "flag": "🇷🇪",
    "isPriority": false
  },
  {
    "code": "RO",
    "name": "Romania",
    "flag": "🇷🇴",
    "isPriority": false
  },
  {
    "code": "RU",
    "name": "Russia",
    "flag": "🇷🇺",
    "isPriority": false
  },
  {
    "code": "RW",
    "name": "Rwanda",
    "flag": "🇷🇼",
    "isPriority": false
  },
  {
    "code": "KN",
    "name": "Saint Kitts And Nevis",
    "flag": "🇰🇳",
    "isPriority": false
  },
  {
    "code": "LC",
    "name": "Saint Lucia",
    "flag": "🇱🇨",
    "isPriority": false
  },
  {
    "code": "MF",
    "name": "Saint Martin",
    "flag": "🇲🇫",
    "isPriority": false
  },
  {
    "code": "PM",
    "name": "Saint Pierre and Miquelon",
    "flag": "🇵🇲",
    "isPriority": false
  },
  {
    "code": "VC",
    "name": "Saint Vincent and Grenadines",
    "flag": "🇻🇨",
    "isPriority": false
  },
  {
    "code": "BL",
    "name": "Saint-Barthelemy",
    "flag": "🇧🇱",
    "isPriority": false
  },
  {
    "code": "WS",
    "name": "Samoa",
    "flag": "🇼🇸",
    "isPriority": false
  },
  {
    "code": "SM",
    "name": "San Marino",
    "flag": "🇸🇲",
    "isPriority": false
  },
  {
    "code": "ST",
    "name": "Sao Tome and Principe",
    "flag": "🇸🇹",
    "isPriority": false
  },
  {
    "code": "SA",
    "name": "Saudi Arabia",
    "flag": "🇸🇦",
    "isPriority": false
  },
  {
    "code": "SN",
    "name": "Senegal",
    "flag": "🇸🇳",
    "isPriority": false
  },
  {
    "code": "RS",
    "name": "Serbia",
    "flag": "🇷🇸",
    "isPriority": false
  },
  {
    "code": "SC",
    "name": "Seychelles",
    "flag": "🇸🇨",
    "isPriority": false
  },
  {
    "code": "SL",
    "name": "Sierra Leone",
    "flag": "🇸🇱",
    "isPriority": false
  },
  {
    "code": "SG",
    "name": "Singapore",
    "flag": "🇸🇬",
    "isPriority": false
  },
  {
    "code": "SK",
    "name": "Slovakia",
    "flag": "🇸🇰",
    "isPriority": false
  },
  {
    "code": "SI",
    "name": "Slovenia",
    "flag": "🇸🇮",
    "isPriority": false
  },
  {
    "code": "SB",
    "name": "Solomon Islands",
    "flag": "🇸🇧",
    "isPriority": false
  },
  {
    "code": "SO",
    "name": "Somalia",
    "flag": "🇸🇴",
    "isPriority": false
  },
  {
    "code": "ZA",
    "name": "South Africa",
    "flag": "🇿🇦",
    "isPriority": false
  },
  {
    "code": "KR",
    "name": "South Korea",
    "flag": "🇰🇷",
    "isPriority": false
  },
  {
    "code": "SS",
    "name": "South Sudan",
    "flag": "🇸🇸",
    "isPriority": false
  },
  {
    "code": "ES",
    "name": "Spain",
    "flag": "🇪🇸",
    "isPriority": false
  },
  {
    "code": "LK",
    "name": "Sri Lanka",
    "flag": "🇱🇰",
    "isPriority": false
  },
  {
    "code": "SD",
    "name": "Sudan",
    "flag": "🇸🇩",
    "isPriority": false
  },
  {
    "code": "SR",
    "name": "Suriname",
    "flag": "🇸🇷",
    "isPriority": false
  },
  {
    "code": "SZ",
    "name": "Swaziland",
    "flag": "🇸🇿",
    "isPriority": false
  },
  {
    "code": "SE",
    "name": "Sweden",
    "flag": "🇸🇪",
    "isPriority": false
  },
  {
    "code": "CH",
    "name": "Switzerland",
    "flag": "🇨🇭",
    "isPriority": false
  },
  {
    "code": "SY",
    "name": "Syria",
    "flag": "🇸🇾",
    "isPriority": false
  },
  {
    "code": "TW",
    "name": "Taiwan",
    "flag": "🇹🇼",
    "isPriority": false
  },
  {
    "code": "TJ",
    "name": "Tajikistan",
    "flag": "🇹🇯",
    "isPriority": false
  },
  {
    "code": "TZ",
    "name": "Tanzania",
    "flag": "🇹🇿",
    "isPriority": false
  },
  {
    "code": "TH",
    "name": "Thailand",
    "flag": "🇹🇭",
    "isPriority": false
  },
  {
    "code": "TL",
    "name": "Timor Leste",
    "flag": "🇹🇱",
    "isPriority": false
  },
  {
    "code": "TG",
    "name": "Togo",
    "flag": "🇹🇬",
    "isPriority": false
  },
  {
    "code": "TO",
    "name": "Tonga",
    "flag": "🇹🇴",
    "isPriority": false
  },
  {
    "code": "TT",
    "name": "Trinidad and Tobago",
    "flag": "🇹🇹",
    "isPriority": false
  },
  {
    "code": "TN",
    "name": "Tunisia",
    "flag": "🇹🇳",
    "isPriority": false
  },
  {
    "code": "TR",
    "name": "Turkey",
    "flag": "🇹🇷",
    "isPriority": false
  },
  {
    "code": "TM",
    "name": "Turkmenistan",
    "flag": "🇹🇲",
    "isPriority": false
  },
  {
    "code": "TC",
    "name": "Turks and Caicos Islands",
    "flag": "🇹🇨",
    "isPriority": false
  },
  {
    "code": "TV",
    "name": "Tuvalu",
    "flag": "🇹🇻",
    "isPriority": false
  },
  {
    "code": "UG",
    "name": "Uganda",
    "flag": "🇺🇬",
    "isPriority": false
  },
  {
    "code": "UA",
    "name": "Ukraine",
    "flag": "🇺🇦",
    "isPriority": false
  },
  {
    "code": "AE",
    "name": "United Arab Emirates",
    "flag": "🇦🇪",
    "isPriority": false
  },
  {
    "code": "UY",
    "name": "Uruguay",
    "flag": "🇺🇾",
    "isPriority": false
  },
  {
    "code": "UZ",
    "name": "Uzbekistan",
    "flag": "🇺🇿",
    "isPriority": false
  },
  {
    "code": "VU",
    "name": "Vanuatu",
    "flag": "🇻🇺",
    "isPriority": false
  },
  {
    "code": "VE",
    "name": "Venezuela",
    "flag": "🇻🇪",
    "isPriority": false
  },
  {
    "code": "VN",
    "name": "Vietnam",
    "flag": "🇻🇳",
    "isPriority": false
  },
  {
    "code": "VG",
    "name": "Virgin Islands - British",
    "flag": "🇻🇬",
    "isPriority": false
  },
  {
    "code": "VI",
    "name": "Virgin Islands - United States",
    "flag": "🇻🇮",
    "isPriority": false
  },
  {
    "code": "YE",
    "name": "Yemen",
    "flag": "🇾🇪",
    "isPriority": false
  },
  {
    "code": "ZM",
    "name": "Zambia",
    "flag": "🇿🇲",
    "isPriority": false
  },
  {
    "code": "ZW",
    "name": "Zimbabwe",
    "flag": "🇿🇼",
    "isPriority": false
  }
];

export const SIP_PRICING_HERO = {
  title: "SIP Trunking Pricing",
  description:
    "Competitive pay-as-you-go SIP Trunking pricing with add-on features included.",
  volumeLinkLabel: "Contact Sales for Volume Discount",
  volumeLinkHref: "/contact/sales/",
} as const;

export const SIP_PRICING_BILLING_NOTE = "Billing interval for the US and Canada is 6/6, Brazil is 30/30 and for all major international destinations is 1/1. Some international destinations may be at 60/60.";
export const SIP_PRICING_PHONE_NOTE = "**All short codes have a $1,500 one-time fee charged at the time of purchase.";

export const SIP_PRICING_VOLUME_CTA = {
  title: "Get volume discounts on committed spends as you scale your usage.",
  buttonLabel: "Get Volume Pricing",
  buttonHref: SIP_PRICING_VOLUME_URL,
} as const;

export const SIP_PRICING_DATA: Record<string, SIPPricingCountryData> = {
  "AI": {
    "name": "Anguilla",
    "code": "AI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Anguilla",
        "price": "$0.3180/min"
      },
      {
        "label": "Anguilla - Mobile",
        "price": "$0.3780/min"
      },
      {
        "label": "Anguilla - Premium Services",
        "price": "$0.9780/min"
      }
    ],
    "calculator": null
  },
  "AG": {
    "name": "Antigua and Barbuda",
    "code": "AG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Antigua And Barbuda",
        "price": "$0.3180/min"
      },
      {
        "label": "Antigua And Barbuda - Mobile",
        "price": "$0.3580/min"
      }
    ],
    "calculator": null
  },
  "AW": {
    "name": "Aruba",
    "code": "AW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3118/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3100/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Aruba",
        "price": "$0.3118/min"
      },
      {
        "label": "Aruba - Mobile",
        "price": "$0.3100/min"
      }
    ],
    "calculator": null
  },
  "BS": {
    "name": "Bahamas",
    "code": "BS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3930/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bahamas",
        "price": "$0.3930/min"
      },
      {
        "label": "Bahamas - Mobile",
        "price": "$0.3980/min"
      }
    ],
    "calculator": null
  },
  "BB": {
    "name": "Barbados",
    "code": "BB",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2880/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Barbados",
        "price": "$0.2880/min"
      },
      {
        "label": "Barbados Mobile",
        "price": "$0.3480/min"
      },
      {
        "label": "Barbados Mobile Digicel",
        "price": "$0.3480/min"
      },
      {
        "label": "Barbados Special Services",
        "price": "$1.7980/min"
      }
    ],
    "calculator": null
  },
  "BZ": {
    "name": "Belize",
    "code": "BZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3025/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3062/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Belize",
        "price": "$0.3025/min"
      },
      {
        "label": "Belize - Mobile",
        "price": "$0.3062/min"
      }
    ],
    "calculator": null
  },
  "BM": {
    "name": "Bermuda",
    "code": "BM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0600/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bermuda",
        "price": "$0.0600/min"
      }
    ],
    "calculator": null
  },
  "CA": {
    "name": "Canada",
    "code": "CA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0090/min",
        "inbound": "$0.0040/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "$0.0010/min",
        "inbound": "$0.0120/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$0.75/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$1.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Canada",
        "price": "$0.0090/min"
      },
      {
        "label": "Canada Northwest Territories",
        "price": "$0.1405/min"
      }
    ],
    "calculator": {
      "localRate": 0.0045,
      "tollfreeRate": 0.03,
      "currencySymbol": "$"
    }
  },
  "KY": {
    "name": "Cayman Islands",
    "code": "KY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1880/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3080/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cayman Islands",
        "price": "$0.1880/min"
      },
      {
        "label": "Cayman Islands - Mobile",
        "price": "$0.3080/min"
      }
    ],
    "calculator": null
  },
  "CR": {
    "name": "Costa Rica",
    "code": "CR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0278/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0768/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Costa Rica",
        "price": "$0.0278/min"
      },
      {
        "label": "Costa Rica - Mobile - Major Carriers (ICE, Claro)",
        "price": "$0.0768/min"
      },
      {
        "label": "Costa Rica - Mobile - Others (Movistar)",
        "price": "$0.1065/min"
      }
    ],
    "calculator": null
  },
  "CU": {
    "name": "Cuba",
    "code": "CU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.0321/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.0321/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cuba",
        "price": "$1.0321/min"
      },
      {
        "label": "Cuba - Fixed - Major Cities (Guantanamo)",
        "price": "$1.9780/min"
      },
      {
        "label": "Cuba - Mobile",
        "price": "$1.0321/min"
      }
    ],
    "calculator": null
  },
  "DM": {
    "name": "Dominica",
    "code": "DM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Dominica",
        "price": "$0.3180/min"
      },
      {
        "label": "Dominica - Mobile",
        "price": "$0.3780/min"
      },
      {
        "label": "Dominica - Premium Services",
        "price": "$3.8580/min"
      }
    ],
    "calculator": null
  },
  "DO": {
    "name": "Dominican Republic",
    "code": "DO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0730/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1458/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$46.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Dominican Republic",
        "price": "$0.0730/min"
      },
      {
        "label": "Dominican Republic Fixed Viva",
        "price": "$0.0730/min"
      },
      {
        "label": "Dominican Republic Mobile",
        "price": "$0.1780/min"
      },
      {
        "label": "Dominican Republic Mobile ALTICE Dominicana",
        "price": "$0.1780/min"
      },
      {
        "label": "Dominican Republic Mobile Claro",
        "price": "$0.1780/min"
      },
      {
        "label": "Dominican Republic Mobile Viva",
        "price": "$0.2180/min"
      },
      {
        "label": "Dominican Republic Santo Domingo",
        "price": "$0.1780/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.1458,
      "currencySymbol": "$"
    }
  },
  "SV": {
    "name": "El Salvador",
    "code": "SV",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2480/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "El Salvador",
        "price": "$0.2480/min"
      },
      {
        "label": "El Salvador - Mobile",
        "price": "$0.2480/min"
      }
    ],
    "calculator": null
  },
  "GL": {
    "name": "Greenland",
    "code": "GL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6470/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6470/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Greenland",
        "price": "$0.6470/min"
      },
      {
        "label": "Greenland Mobile",
        "price": "$0.6470/min"
      }
    ],
    "calculator": null
  },
  "GD": {
    "name": "Grenada",
    "code": "GD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3080/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Grenada",
        "price": "$0.3080/min"
      },
      {
        "label": "Grenada - Mobile",
        "price": "$0.3580/min"
      },
      {
        "label": "Grenada - Premium Services",
        "price": "$1.9580/min"
      }
    ],
    "calculator": null
  },
  "GP": {
    "name": "Guadeloupe",
    "code": "GP",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0139/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0917/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Guadeloupe",
        "price": "$0.0139/min"
      },
      {
        "label": "Guadeloupe Mobile",
        "price": "$0.1155/min"
      },
      {
        "label": "Guadeloupe Mobile Digicel",
        "price": "$0.1482/min"
      },
      {
        "label": "Guadeloupe Mobile Orange",
        "price": "$0.0917/min"
      },
      {
        "label": "Guadeloupe Mobile Outremer",
        "price": "$0.1137/min"
      }
    ],
    "calculator": null
  },
  "GT": {
    "name": "Guatemala",
    "code": "GT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2165/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1987/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Guatemala",
        "price": "$0.2165/min"
      },
      {
        "label": "Guatemala - Mobile",
        "price": "$0.1987/min"
      }
    ],
    "calculator": null
  },
  "HT": {
    "name": "Haiti",
    "code": "HT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5080/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4230/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Haiti",
        "price": "$0.5080/min"
      },
      {
        "label": "Haiti - Mobile",
        "price": "$0.4230/min"
      },
      {
        "label": "Haiti - Mobile - Major Carriers (Digicel)",
        "price": "$0.8365/min"
      },
      {
        "label": "Haiti - Mobile - Others (Haitel)",
        "price": "$0.5080/min"
      },
      {
        "label": "Haiti - Premium Services",
        "price": "$1.3980/min"
      }
    ],
    "calculator": null
  },
  "HN": {
    "name": "Honduras",
    "code": "HN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2320/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2378/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Honduras",
        "price": "$0.2320/min"
      },
      {
        "label": "Honduras - Mobile",
        "price": "$0.2378/min"
      }
    ],
    "calculator": null
  },
  "JM": {
    "name": "Jamaica",
    "code": "JM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3680/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Jamaica",
        "price": "$0.3480/min"
      },
      {
        "label": "Jamaica - Mobile",
        "price": "$0.3680/min"
      }
    ],
    "calculator": null
  },
  "MX": {
    "name": "Mexico",
    "code": "MX",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0095/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0360/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1807/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$5.83/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$25.50/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Mexico",
        "price": "$0.0095/min"
      },
      {
        "label": "Mexico - Mobile",
        "price": "$0.0360/min"
      },
      {
        "label": "Mexico - Mobile - Major Carriers",
        "price": "$0.0400/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.1807,
      "currencySymbol": "$"
    }
  },
  "MS": {
    "name": "Montserrat",
    "code": "MS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Montserrat",
        "price": "$0.4180/min"
      },
      {
        "label": "Montserrat - Mobile",
        "price": "$0.4180/min"
      }
    ],
    "calculator": null
  },
  "AN": {
    "name": "Netherlands Antilles",
    "code": "AN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1937/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Netherlands Antilles",
        "price": "$0.1937/min"
      },
      {
        "label": "Netherlands Antilles Bonaire",
        "price": "$0.1937/min"
      },
      {
        "label": "Netherlands Antilles Curacao",
        "price": "$0.1937/min"
      },
      {
        "label": "Netherlands Antilles Mobile",
        "price": "$0.1937/min"
      },
      {
        "label": "Netherlands Antilles Mobile Digicel",
        "price": "$0.1937/min"
      }
    ],
    "calculator": null
  },
  "NI": {
    "name": "Nicaragua",
    "code": "NI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1765/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3545/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Nicaragua",
        "price": "$0.1765/min"
      },
      {
        "label": "Nicaragua - Mobile",
        "price": "$0.3545/min"
      },
      {
        "label": "Nicaragua - Premium Services",
        "price": "$2.0580/min"
      }
    ],
    "calculator": null
  },
  "MP": {
    "name": "Northern Mariana Islands",
    "code": "MP",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1080/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Northern Mariana Islands",
        "price": "$0.1080/min"
      }
    ],
    "calculator": null
  },
  "PA": {
    "name": "Panama",
    "code": "PA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0388/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0388/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0517/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Panama",
        "price": "$0.0388/min"
      },
      {
        "label": "Panama - Mobile",
        "price": "$0.0388/min"
      },
      {
        "label": "Panama - Mobile - Major Carriers (C&W, Digicel, Movistar)",
        "price": "$0.1703/min"
      }
    ],
    "calculator": null
  },
  "PR": {
    "name": "Puerto Rico",
    "code": "PR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0140/min",
        "inbound": "$0.0063/min",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0800/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Puerto Rico",
        "price": "$0.0140/min"
      }
    ],
    "calculator": null
  },
  "BL": {
    "name": "Saint-Barthelemy",
    "code": "BL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [],
    "calculator": null
  },
  "KN": {
    "name": "Saint Kitts And Nevis",
    "code": "KN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Saint Kitts And Nevis",
        "price": "$0.2780/min"
      },
      {
        "label": "Saint Kitts And Nevis - Mobile",
        "price": "$0.3780/min"
      }
    ],
    "calculator": null
  },
  "LC": {
    "name": "Saint Lucia",
    "code": "LC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3080/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Saint Lucia",
        "price": "$0.3080/min"
      },
      {
        "label": "Saint Lucia - Mobile",
        "price": "$0.3780/min"
      }
    ],
    "calculator": null
  },
  "MF": {
    "name": "Saint Martin",
    "code": "MF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [],
    "calculator": null
  },
  "PM": {
    "name": "Saint Pierre and Miquelon",
    "code": "PM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3030/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6545/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Saint Pierre And Miquelon",
        "price": "$0.3030/min"
      },
      {
        "label": "Saint Pierre And Miquelon Mobile",
        "price": "$0.6545/min"
      }
    ],
    "calculator": null
  },
  "VC": {
    "name": "Saint Vincent and Grenadines",
    "code": "VC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3080/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Saint Vincent And The Grenadines",
        "price": "$0.3080/min"
      },
      {
        "label": "Saint Vincent And The Grenadines - Mobile",
        "price": "$0.3780/min"
      }
    ],
    "calculator": null
  },
  "TT": {
    "name": "Trinidad and Tobago",
    "code": "TT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2280/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Trinidad And Tobago",
        "price": "$0.2280/min"
      },
      {
        "label": "Trinidad And Tobago - Mobile",
        "price": "$0.2780/min"
      }
    ],
    "calculator": null
  },
  "TC": {
    "name": "Turks and Caicos Islands",
    "code": "TC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Turks And Caicos Islands",
        "price": "$0.2880/min"
      },
      {
        "label": "Turks And Caicos Islands - Mobile",
        "price": "$0.3780/min"
      }
    ],
    "calculator": null
  },
  "US": {
    "name": "United States",
    "code": "US",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0055/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "$0.0010/min",
        "inbound": "$0.0120/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$0.50/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$1.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      },
      {
        "label": "CNAM Lookup",
        "price": "$0.00500/lookup"
      }
    ],
    "networkRows": [
      {
        "label": "United States",
        "price": "$0.0055/min"
      },
      {
        "label": "United States 800",
        "price": "$0.0010/min"
      },
      {
        "label": "United States Alaska",
        "price": "$0.1770/min"
      },
      {
        "label": "United States Hawaii",
        "price": "$0.0320/min"
      }
    ],
    "calculator": {
      "localRate": 0.0075,
      "tollfreeRate": 0.027,
      "currencySymbol": "$"
    }
  },
  "VI": {
    "name": "Virgin Islands - United States",
    "code": "VI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1000/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "United States Virgin Islands",
        "price": "$0.0380/min"
      }
    ],
    "calculator": null
  },
  "AR": {
    "name": "Argentina",
    "code": "AR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0130/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3000/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1965/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Argentina",
        "price": "$0.0380/min"
      },
      {
        "label": "Argentina - Major Cities",
        "price": "$0.0130/min"
      },
      {
        "label": "Argentina - Mobile",
        "price": "$0.3000/min"
      },
      {
        "label": "Argentina - Mobile - Movistar",
        "price": "$0.3700/min"
      },
      {
        "label": "Argentina - Other Cities",
        "price": "$0.0250/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "BO": {
    "name": "Bolivia",
    "code": "BO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3045/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2766/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bolivia",
        "price": "$0.3045/min"
      },
      {
        "label": "Bolivia - Mobile",
        "price": "$0.3045/min"
      },
      {
        "label": "Bolivia Mobile Entel",
        "price": "$0.2766/min"
      }
    ],
    "calculator": null
  },
  "BR": {
    "name": "Brazil",
    "code": "BR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0180/min",
        "inbound": "$0.0060/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0950/min",
        "inbound": "$0.0060/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1800/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$6.17/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$30.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Brazil",
        "price": "$0.0300/min"
      },
      {
        "label": "Brazil - Major Cities",
        "price": "$0.0180/min"
      },
      {
        "label": "Brazil - Mobile",
        "price": "$0.0950/min"
      }
    ],
    "calculator": {
      "localRate": 0.006,
      "tollfreeRate": 0.18,
      "currencySymbol": "$"
    }
  },
  "CL": {
    "name": "Chile",
    "code": "CL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0200/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0700/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$43.22/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Chile",
        "price": "$0.0400/min"
      },
      {
        "label": "Chile - Fixed - Others",
        "price": "$1.1000/min"
      },
      {
        "label": "Chile - Mobile",
        "price": "$0.0700/min"
      },
      {
        "label": "Chile - Premium Services",
        "price": "$1.1500/min"
      },
      {
        "label": "Chile - Santiago",
        "price": "$0.0200/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "CO": {
    "name": "Colombia",
    "code": "CO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0500/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0300/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1421/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$17.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Colombia",
        "price": "$0.0500/min"
      },
      {
        "label": "Colombia - Mobile - Major Carriers (Comcel, Movistar, Tigo)",
        "price": "$0.0300/min"
      },
      {
        "label": "Colombia - Mobile - Others (Avantel)",
        "price": "$0.0450/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.1421,
      "currencySymbol": "$"
    }
  },
  "CW": {
    "name": "Curaao",
    "code": "CW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [],
    "calculator": null
  },
  "EC": {
    "name": "Ecuador",
    "code": "EC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1950/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4600/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Ecuador",
        "price": "$0.1950/min"
      },
      {
        "label": "Ecuador - Major Cities (Cuenca - Etapa, Guayaquil)",
        "price": "$0.1950/min"
      },
      {
        "label": "Ecuador - Mobile",
        "price": "$0.4600/min"
      }
    ],
    "calculator": null
  },
  "FK": {
    "name": "Falkland Islands (Malvinas)",
    "code": "FK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.3974/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$2.3974/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Falkland Islands",
        "price": "$2.3974/min"
      },
      {
        "label": "Falkland Islands Mobile",
        "price": "$2.3974/min"
      }
    ],
    "calculator": null
  },
  "GF": {
    "name": "French Guiana",
    "code": "GF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0139/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0244/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "French Guiana",
        "price": "$0.0139/min"
      },
      {
        "label": "French Guiana - Mobile",
        "price": "$0.0244/min"
      },
      {
        "label": "French Guiana - Mobile - Major Carriers (Orange, Outremer)",
        "price": "$0.1135/min"
      },
      {
        "label": "French Guiana - Mobile - Others (Digicel)",
        "price": "$0.0838/min"
      }
    ],
    "calculator": null
  },
  "GY": {
    "name": "Guyana",
    "code": "GY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3570/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3658/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Guyana",
        "price": "$0.3570/min"
      },
      {
        "label": "Guyana - Mobile",
        "price": "$0.3658/min"
      }
    ],
    "calculator": null
  },
  "PY": {
    "name": "Paraguay",
    "code": "PY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0414/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1128/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Paraguay",
        "price": "$0.0414/min"
      },
      {
        "label": "Paraguay - Mobile",
        "price": "$0.1128/min"
      }
    ],
    "calculator": null
  },
  "PE": {
    "name": "Peru",
    "code": "PE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0095/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0300/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3033/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$43.33/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Peru",
        "price": "$0.0130/min"
      },
      {
        "label": "Peru - Lima",
        "price": "$0.0095/min"
      },
      {
        "label": "Peru - Mobile",
        "price": "$0.0300/min"
      },
      {
        "label": "Peru - Mobile - Major Carriers",
        "price": "$0.0300/min"
      },
      {
        "label": "Peru - Rural",
        "price": "$0.5000/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.3033,
      "currencySymbol": "$"
    }
  },
  "SR": {
    "name": "Suriname",
    "code": "SR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.1247/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$3.2278/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Suriname",
        "price": "$2.1247/min"
      },
      {
        "label": "Suriname - Mobile",
        "price": "$3.2278/min"
      }
    ],
    "calculator": null
  },
  "UY": {
    "name": "Uruguay",
    "code": "UY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0860/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3100/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Uruguay",
        "price": "$0.1200/min"
      },
      {
        "label": "Uruguay - Fixed - Major Cities (Montevideo)",
        "price": "$0.0860/min"
      },
      {
        "label": "Uruguay - Mobile",
        "price": "$0.3100/min"
      }
    ],
    "calculator": null
  },
  "VE": {
    "name": "Venezuela",
    "code": "VE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0430/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.4240/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Venezuela",
        "price": "$0.0430/min"
      },
      {
        "label": "Venezuela - Mobile",
        "price": "$0.1180/min"
      },
      {
        "label": "Venezuela - Premium Services",
        "price": "$0.8980/min"
      }
    ],
    "calculator": null
  },
  "AF": {
    "name": "Afghanistan",
    "code": "AF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Afghanistan",
        "price": "$0.3780/min"
      },
      {
        "label": "Afghanistan - Mobile",
        "price": "$0.3780/min"
      }
    ],
    "calculator": null
  },
  "AM": {
    "name": "Armenia",
    "code": "AM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2530/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2081/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Armenia",
        "price": "$0.2530/min"
      },
      {
        "label": "Armenia - Fixed - Others (Karabakh)",
        "price": "$0.3333/min"
      },
      {
        "label": "Armenia - Mobile - Major Carriers (Orange, VEON)",
        "price": "$0.3333/min"
      },
      {
        "label": "Armenia - Mobile - Others (Karabakh Telecom)",
        "price": "$0.2081/min"
      },
      {
        "label": "Armenia - Premium Services",
        "price": "$0.3480/min"
      }
    ],
    "calculator": null
  },
  "AZ": {
    "name": "Azerbaijan",
    "code": "AZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4487/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Azerbaijan",
        "price": "$0.2780/min"
      },
      {
        "label": "Azerbaijan - Mobile",
        "price": "$1.5433/min"
      },
      {
        "label": "Azerbaijan - Mobile - Others (Bakcell)",
        "price": "$0.4487/min"
      }
    ],
    "calculator": null
  },
  "BH": {
    "name": "Bahrain",
    "code": "BH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1500/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2000/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$10.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bahrain",
        "price": "$0.1500/min"
      },
      {
        "label": "Bahrain - Mobile",
        "price": "$0.1780/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.2,
      "currencySymbol": "$"
    }
  },
  "BD": {
    "name": "Bangladesh",
    "code": "BD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0430/min",
        "inbound": "$0.0910/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0430/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bangladesh",
        "price": "$0.0430/min"
      },
      {
        "label": "Bangladesh - Mobile",
        "price": "$0.0430/min"
      }
    ],
    "calculator": null
  },
  "BT": {
    "name": "Bhutan",
    "code": "BT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0997/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0997/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bhutan",
        "price": "$0.0997/min"
      },
      {
        "label": "Bhutan - Mobile",
        "price": "$0.0997/min"
      }
    ],
    "calculator": null
  },
  "BN": {
    "name": "Brunei",
    "code": "BN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0374/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0374/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Brunei",
        "price": "$0.0374/min"
      },
      {
        "label": "Brunei - Mobile",
        "price": "$0.0374/min"
      }
    ],
    "calculator": null
  },
  "KH": {
    "name": "Cambodia",
    "code": "KH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0880/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0880/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cambodia",
        "price": "$0.0880/min"
      },
      {
        "label": "Cambodia - Mobile",
        "price": "$0.0880/min"
      }
    ],
    "calculator": null
  },
  "CN": {
    "name": "China",
    "code": "CN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3970/min",
        "inbound": "$0.0550/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3970/min",
        "inbound": "$0.0550/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.8000/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$75.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$150.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "China",
        "price": "$0.3970/min"
      },
      {
        "label": "China Mobile",
        "price": "$0.3970/min"
      },
      {
        "label": "China Mobile Unicom",
        "price": "$0.3970/min"
      }
    ],
    "calculator": {
      "localRate": 0.055,
      "tollfreeRate": 0.8,
      "currencySymbol": "$"
    }
  },
  "GE": {
    "name": "Georgia",
    "code": "GE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2700/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4672/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Georgia",
        "price": "$0.4147/min"
      },
      {
        "label": "Georgia - Fixed - Major Cities (Tbilisi)",
        "price": "$0.2700/min"
      },
      {
        "label": "Georgia - Mobile",
        "price": "$0.4672/min"
      },
      {
        "label": "Georgia - Premium Services",
        "price": "$0.9480/min"
      }
    ],
    "calculator": null
  },
  "HK": {
    "name": "Hong Kong",
    "code": "HK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0380/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0380/min",
        "inbound": "$0.0243/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Hong Kong",
        "price": "$0.0380/min"
      },
      {
        "label": "Hong Kong - Mobile",
        "price": "$0.0650/min"
      },
      {
        "label": "Hong Kong Mobile CSL",
        "price": "$0.0380/min"
      },
      {
        "label": "Hong Kong Mobile HGC Global Comm",
        "price": "$0.0380/min"
      },
      {
        "label": "Hong Kong Mobile Smartone",
        "price": "$0.0380/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "IN": {
    "name": "India",
    "code": "IN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "₹0.74/min",
        "inbound": "₹0.74/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "₹1.30/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "₹250/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "India All Networks from Plivo-IN numbers",
        "price": "₹0.74/min"
      }
    ],
    "calculator": {
      "localRate": 0.0038,
      "tollfreeRate": 0,
      "currencySymbol": "₹"
    }
  },
  "ID": {
    "name": "Indonesia",
    "code": "ID",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0660/min",
        "inbound": "$0.0170/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0700/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$1.1270/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Indonesia",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Bandung",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Batam",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Bogor",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Denpasar",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Jakarta",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Malang",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Medan",
        "price": "$0.0660/min"
      },
      {
        "label": "Indonesia Mobile",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Mobile Indosat Ooredoo",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Mobile Indosat Ooredoo II",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Mobile Telkomsel",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Mobile Three",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Mobile XL",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Satellite Mobile",
        "price": "$0.0700/min"
      },
      {
        "label": "Indonesia Surabaya",
        "price": "$0.0660/min"
      }
    ],
    "calculator": {
      "localRate": 0.017,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "IR": {
    "name": "Iran",
    "code": "IR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Iran",
        "price": "$0.2780/min"
      },
      {
        "label": "Iran Mobile",
        "price": "$0.2780/min"
      },
      {
        "label": "Iran Mobile Irancell",
        "price": "$0.2780/min"
      },
      {
        "label": "Iran Tehran",
        "price": "$0.2780/min"
      }
    ],
    "calculator": null
  },
  "IQ": {
    "name": "Iraq",
    "code": "IQ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3200/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Iraq",
        "price": "$0.2980/min"
      },
      {
        "label": "Iraq - Mobile",
        "price": "$0.3200/min"
      },
      {
        "label": "Iraq - Premium Services",
        "price": "$1.0780/min"
      }
    ],
    "calculator": null
  },
  "IL": {
    "name": "Israel",
    "code": "IL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0140/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1480/min",
        "inbound": "$0.0085/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1112/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$3.40/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Israel",
        "price": "$0.0140/min"
      },
      {
        "label": "Israel - Fixed - Others (Palestine)",
        "price": "$0.2980/min"
      },
      {
        "label": "Israel - Mobile",
        "price": "$0.1480/min"
      },
      {
        "label": "Israel - Mobile - Others (Palestine)",
        "price": "$0.2980/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.1112,
      "currencySymbol": "$"
    }
  },
  "JP": {
    "name": "Japan",
    "code": "JP",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0355/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1368/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2370/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Japan",
        "price": "$0.0355/min"
      },
      {
        "label": "Japan - IP Phone",
        "price": "$0.1080/min"
      },
      {
        "label": "Japan - Mobile",
        "price": "$0.1368/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "JO": {
    "name": "Jordan",
    "code": "JO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Jordan",
        "price": "$0.2980/min"
      },
      {
        "label": "Jordan - Mobile",
        "price": "$0.2980/min"
      }
    ],
    "calculator": null
  },
  "KZ": {
    "name": "Kazakhstan",
    "code": "KZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0643/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1427/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Kazakhstan",
        "price": "$0.0643/min"
      },
      {
        "label": "Kazakhstan - Fixed - Others (OLO)",
        "price": "$0.7944/min"
      },
      {
        "label": "Kazakhstan - Mobile",
        "price": "$0.3295/min"
      },
      {
        "label": "Kazakhstan - Mobile - Major Carriers (Kcell, Beeline)",
        "price": "$0.1427/min"
      },
      {
        "label": "Kazakhstan - Premium Services",
        "price": "$0.9480/min"
      }
    ],
    "calculator": null
  },
  "KW": {
    "name": "Kuwait",
    "code": "KW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Kuwait",
        "price": "$0.1180/min"
      },
      {
        "label": "Kuwait Mobile",
        "price": "$0.1180/min"
      },
      {
        "label": "Kuwait Mobile Ooredoo",
        "price": "$0.1180/min"
      },
      {
        "label": "Kuwait Mobile Zain",
        "price": "$0.1180/min"
      }
    ],
    "calculator": null
  },
  "KG": {
    "name": "Kyrgyzstan",
    "code": "KG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2173/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2726/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Kyrgyzstan",
        "price": "$0.2173/min"
      },
      {
        "label": "Kyrgyzstan - Mobile",
        "price": "$0.2726/min"
      },
      {
        "label": "Kyrgyzstan - Premium Services",
        "price": "$2.5880/min"
      }
    ],
    "calculator": null
  },
  "LA": {
    "name": "Laos",
    "code": "LA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0982/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0982/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Laos",
        "price": "$0.0982/min"
      },
      {
        "label": "Laos Mobile",
        "price": "$0.0982/min"
      }
    ],
    "calculator": null
  },
  "LB": {
    "name": "Lebanon",
    "code": "LB",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Lebanon",
        "price": "$0.1180/min"
      },
      {
        "label": "Lebanon Mobile",
        "price": "$0.2780/min"
      }
    ],
    "calculator": null
  },
  "MO": {
    "name": "Macao",
    "code": "MO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.0000/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.9100/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Macao",
        "price": "$1.0000/min"
      },
      {
        "label": "Macao - Mobile",
        "price": "$0.9100/min"
      }
    ],
    "calculator": null
  },
  "MY": {
    "name": "Malaysia",
    "code": "MY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0480/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0680/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$18.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Malaysia",
        "price": "$0.0480/min"
      },
      {
        "label": "Malaysia Mobile",
        "price": "$0.0680/min"
      },
      {
        "label": "Malaysia Mobile Celcom",
        "price": "$0.0680/min"
      },
      {
        "label": "Malaysia Mobile DiGi",
        "price": "$0.0680/min"
      },
      {
        "label": "Malaysia Mobile Maxis",
        "price": "$0.0680/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "MV": {
    "name": "Maldives",
    "code": "MV",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.7800/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Maldives",
        "price": "$1.7800/min"
      },
      {
        "label": "Maldives Mobility Services",
        "price": "$1.7800/min"
      },
      {
        "label": "Maldives Mobility Services TYPE_A",
        "price": "$1.7800/min"
      },
      {
        "label": "Maldives Special Services TYPE_A",
        "price": "$1.7800/min"
      }
    ],
    "calculator": null
  },
  "MN": {
    "name": "Mongolia",
    "code": "MN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0230/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0230/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Mongolia",
        "price": "$0.0230/min"
      },
      {
        "label": "Mongolia - Mobile",
        "price": "$0.0230/min"
      },
      {
        "label": "Mongolia - Premium Services",
        "price": "$2.4980/min"
      }
    ],
    "calculator": null
  },
  "MM": {
    "name": "Myanmar",
    "code": "MM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3722/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3805/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Myanmar",
        "price": "$0.3722/min"
      },
      {
        "label": "Myanmar - Mobile",
        "price": "$0.3805/min"
      },
      {
        "label": "Myanmar - Premium Services",
        "price": "$0.5280/min"
      }
    ],
    "calculator": null
  },
  "NP": {
    "name": "Nepal",
    "code": "NP",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Nepal",
        "price": "$0.2180/min"
      },
      {
        "label": "Nepal - Mobile",
        "price": "$0.2180/min"
      }
    ],
    "calculator": null
  },
  "OM": {
    "name": "Oman",
    "code": "OM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Oman",
        "price": "$0.1780/min"
      },
      {
        "label": "Oman Fixed Ooredoo",
        "price": "$0.1780/min"
      },
      {
        "label": "Oman Mobile",
        "price": "$0.4580/min"
      },
      {
        "label": "Oman Mobile Ooredoo",
        "price": "$0.4580/min"
      }
    ],
    "calculator": null
  },
  "PK": {
    "name": "Pakistan",
    "code": "PK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1380/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1380/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Pakistan",
        "price": "$0.1380/min"
      },
      {
        "label": "Pakistan - Mobile",
        "price": "$0.1380/min"
      }
    ],
    "calculator": null
  },
  "PS": {
    "name": "Palestinian Authority",
    "code": "PS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2369/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2657/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Palestine",
        "price": "$0.2369/min"
      },
      {
        "label": "Palestine Mobile",
        "price": "$0.2657/min"
      }
    ],
    "calculator": null
  },
  "PH": {
    "name": "Philippines",
    "code": "PH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1530/min",
        "inbound": "$0.2200/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.4500/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$25.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Philippines",
        "price": "$0.1530/min"
      },
      {
        "label": "Philippines BayanTel",
        "price": "$0.1530/min"
      },
      {
        "label": "Philippines Globe",
        "price": "$0.1530/min"
      },
      {
        "label": "Philippines Mobile",
        "price": "$0.1980/min"
      },
      {
        "label": "Philippines Mobile Globe",
        "price": "$0.1980/min"
      },
      {
        "label": "Philippines Mobile Smart",
        "price": "$0.1980/min"
      },
      {
        "label": "Philippines Mobility Services",
        "price": "$0.3280/min"
      },
      {
        "label": "Philippines PLDT",
        "price": "$0.1530/min"
      },
      {
        "label": "Philippines Special Services",
        "price": "$0.8180/min"
      }
    ],
    "calculator": {
      "localRate": 0.22,
      "tollfreeRate": 0.45,
      "currencySymbol": "$"
    }
  },
  "QA": {
    "name": "Qatar",
    "code": "QA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2680/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2880/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.5342/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$750.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Qatar",
        "price": "$0.2680/min"
      },
      {
        "label": "Qatar Mobile",
        "price": "$0.2880/min"
      },
      {
        "label": "Qatar Mobile Vodafone",
        "price": "$0.2880/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.5342,
      "currencySymbol": "$"
    }
  },
  "SA": {
    "name": "Saudi Arabia",
    "code": "SA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1800/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2800/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.7440/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$115.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Saudi Arabia",
        "price": "$0.1800/min"
      },
      {
        "label": "Saudi Arabia - From High Cost Origins",
        "price": "$2.4970/min"
      },
      {
        "label": "Saudi Arabia Fixed Atheeb Wimax",
        "price": "$0.1800/min"
      },
      {
        "label": "Saudi Arabia Fixed Atheeb Wimax - From High Cost Origins",
        "price": "$2.4970/min"
      },
      {
        "label": "Saudi Arabia Mobile",
        "price": "$0.2800/min"
      },
      {
        "label": "Saudi Arabia Mobile - From High Cost Origins",
        "price": "$2.4970/min"
      },
      {
        "label": "Saudi Arabia Mobile ETISALAT MOBILY",
        "price": "$0.2800/min"
      },
      {
        "label": "Saudi Arabia Mobile ETISALAT MOBILY - From High Cost Origins",
        "price": "$2.4970/min"
      },
      {
        "label": "Saudi Arabia Mobile Zain",
        "price": "$0.2800/min"
      },
      {
        "label": "Saudi Arabia Mobile Zain - From High Cost Origins",
        "price": "$2.4970/min"
      },
      {
        "label": "Saudi Arabia Riyad",
        "price": "$0.1800/min"
      },
      {
        "label": "Saudi Arabia Riyad - From High Cost Origins",
        "price": "$2.4970/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.744,
      "currencySymbol": "$"
    }
  },
  "SG": {
    "name": "Singapore",
    "code": "SG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0530/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0530/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "National Numbers",
        "price": "$16.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Singapore",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore - From Singapore",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Fixed Starhub",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Fixed Starhub - From Singapore",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile - From Singapore",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile M1",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile M1 - From Singapore",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile Singtel",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile Singtel - From Singapore",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile Starhub",
        "price": "$0.0530/min"
      },
      {
        "label": "Singapore Mobile Starhub - From Singapore",
        "price": "$0.0530/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "KR": {
    "name": "South Korea",
    "code": "KR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0266/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0193/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1064/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "South Korea",
        "price": "$0.0266/min"
      },
      {
        "label": "South Korea - Mobile",
        "price": "$0.0193/min"
      }
    ],
    "calculator": null
  },
  "LK": {
    "name": "Sri Lanka",
    "code": "LK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Sri Lanka",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka Fixed Dialog",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka Mobile",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka Mobile Airtel",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka Mobile Dialog",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka Mobile Etisalat",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka Mobile Mobitel",
        "price": "$0.2180/min"
      },
      {
        "label": "Sri Lanka SLT",
        "price": "$0.2180/min"
      }
    ],
    "calculator": null
  },
  "SY": {
    "name": "Syria",
    "code": "SY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3482/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5208/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Syria",
        "price": "$0.3482/min"
      },
      {
        "label": "Syria Mobile",
        "price": "$0.5208/min"
      },
      {
        "label": "Syria Mobile MTN",
        "price": "$0.5208/min"
      }
    ],
    "calculator": null
  },
  "TW": {
    "name": "Taiwan",
    "code": "TW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0205/min",
        "inbound": "$0.0940/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0205/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3200/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Taiwan",
        "price": "$0.0205/min"
      },
      {
        "label": "Taiwan Mobile",
        "price": "$0.1330/min"
      },
      {
        "label": "Taiwan Mobile Chunghwa Mobile",
        "price": "$0.1330/min"
      },
      {
        "label": "Taiwan Mobile Far Eastone",
        "price": "$0.1330/min"
      },
      {
        "label": "Taiwan Mobile Taiwan Mobile",
        "price": "$0.1330/min"
      },
      {
        "label": "Taiwan Mobile Taiwan Star Telecom",
        "price": "$0.0205/min"
      },
      {
        "label": "Taiwan Mobility Services",
        "price": "$0.1330/min"
      }
    ],
    "calculator": null
  },
  "TJ": {
    "name": "Tajikistan",
    "code": "TJ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2512/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1618/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Tajikistan",
        "price": "$0.2512/min"
      },
      {
        "label": "Tajikistan Mobile",
        "price": "$0.2512/min"
      },
      {
        "label": "Tajikistan Mobile Babilon",
        "price": "$0.2512/min"
      },
      {
        "label": "Tajikistan Mobile Beeline",
        "price": "$0.1618/min"
      },
      {
        "label": "Tajikistan Mobile M Teko",
        "price": "$0.2197/min"
      },
      {
        "label": "Tajikistan Mobile Megafon",
        "price": "$0.2105/min"
      },
      {
        "label": "Tajikistan Mobile TK Mobile",
        "price": "$0.2197/min"
      },
      {
        "label": "Tajikistan Mobile Tcell",
        "price": "$0.2428/min"
      },
      {
        "label": "Tajikistan Mobile Telcom",
        "price": "$0.2197/min"
      },
      {
        "label": "Tajikistan Mobile Tochik Telecom",
        "price": "$0.2197/min"
      },
      {
        "label": "Tajikistan Special Services",
        "price": "$1.1780/min"
      }
    ],
    "calculator": null
  },
  "TH": {
    "name": "Thailand",
    "code": "TH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0850/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0864/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3540/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Thailand",
        "price": "$0.0850/min"
      },
      {
        "label": "Thailand - Mobile",
        "price": "$0.0864/min"
      },
      {
        "label": "Thailand Mobile AWN",
        "price": "$0.0930/min"
      },
      {
        "label": "Thailand Mobile DTAC",
        "price": "$0.0930/min"
      },
      {
        "label": "Thailand Mobile True Move",
        "price": "$0.0930/min"
      }
    ],
    "calculator": null
  },
  "TL": {
    "name": "Timor Leste",
    "code": "TL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8482/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.8482/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "East Timor",
        "price": "$0.8482/min"
      },
      {
        "label": "East Timor Mobile",
        "price": "$0.8482/min"
      },
      {
        "label": "East Timor Mobile Telkomcel",
        "price": "$0.8482/min"
      }
    ],
    "calculator": null
  },
  "TR": {
    "name": "Turkey",
    "code": "TR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0600/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3900/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0583/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$45.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$85.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Turkey",
        "price": "$0.0600/min"
      },
      {
        "label": "Turkey - Mobile",
        "price": "$0.3900/min"
      },
      {
        "label": "Turkey - Premium Services",
        "price": "$0.8980/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.0583,
      "currencySymbol": "$"
    }
  },
  "TM": {
    "name": "Turkmenistan",
    "code": "TM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1377/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2022/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Turkmenistan",
        "price": "$0.1377/min"
      },
      {
        "label": "Turkmenistan Mobile",
        "price": "$0.2022/min"
      }
    ],
    "calculator": null
  },
  "AE": {
    "name": "United Arab Emirates",
    "code": "AE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2250/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$20.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "United Arab Emirates",
        "price": "$0.2180/min"
      },
      {
        "label": "United Arab Emirates - From High Cost Origins",
        "price": "$1.7470/min"
      },
      {
        "label": "United Arab Emirates Du",
        "price": "$0.2180/min"
      },
      {
        "label": "United Arab Emirates Du - From High Cost Origins",
        "price": "$1.7470/min"
      },
      {
        "label": "United Arab Emirates Mobile",
        "price": "$0.2180/min"
      },
      {
        "label": "United Arab Emirates Mobile - From High Cost Origins",
        "price": "$1.7470/min"
      },
      {
        "label": "United Arab Emirates Mobile Du",
        "price": "$0.2180/min"
      },
      {
        "label": "United Arab Emirates Mobile Du - From High Cost Origins",
        "price": "$1.7470/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.225,
      "currencySymbol": "$"
    }
  },
  "UZ": {
    "name": "Uzbekistan",
    "code": "UZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1427/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1427/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Uzbekistan",
        "price": "$0.1427/min"
      },
      {
        "label": "Uzbekistan - Mobile",
        "price": "$0.1427/min"
      },
      {
        "label": "Uzbekistan - Premium Services",
        "price": "$0.9180/min"
      }
    ],
    "calculator": null
  },
  "VN": {
    "name": "Vietnam",
    "code": "VN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1030/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1000/min",
        "inbound": "$0.0083/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.6370/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Viet Nam Fixed Viettel",
        "price": "$0.1030/min"
      },
      {
        "label": "Viet Nam Mobile Viettel",
        "price": "$0.1030/min"
      },
      {
        "label": "Vietnam",
        "price": "$0.1044/min"
      },
      {
        "label": "Vietnam - Mobile",
        "price": "$0.1000/min"
      },
      {
        "label": "Vietnam - Premium Services",
        "price": "$2.8900/min"
      }
    ],
    "calculator": null
  },
  "YE": {
    "name": "Yemen",
    "code": "YE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Yemen",
        "price": "$0.1980/min"
      },
      {
        "label": "Yemen - Mobile",
        "price": "$0.1980/min"
      },
      {
        "label": "Yemen - Premium Services",
        "price": "$1.7980/min"
      }
    ],
    "calculator": null
  },
  "AL": {
    "name": "Albania",
    "code": "AL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2598/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6888/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Albania",
        "price": "$0.2598/min"
      },
      {
        "label": "Albania - Mobile",
        "price": "$0.6888/min"
      },
      {
        "label": "Albania - Premium Services",
        "price": "$0.9780/min"
      }
    ],
    "calculator": null
  },
  "AD": {
    "name": "Andorra",
    "code": "AD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0462/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2953/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Andorra",
        "price": "$0.0462/min"
      },
      {
        "label": "Andorra - Mobile",
        "price": "$0.2953/min"
      }
    ],
    "calculator": null
  },
  "AT": {
    "name": "Austria",
    "code": "AT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0108/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0369/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1946/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Mobile Numbers",
        "price": "$7.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Austria",
        "price": "$0.2400/min"
      },
      {
        "label": "Austria - From Europe",
        "price": "$0.0108/min"
      },
      {
        "label": "Austria - Premium Services",
        "price": "$0.5980/min"
      },
      {
        "label": "Austria Mobile",
        "price": "$0.3980/min"
      },
      {
        "label": "Austria Mobile - From Europe",
        "price": "$0.0369/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.1946,
      "currencySymbol": "$"
    }
  },
  "BY": {
    "name": "Belarus",
    "code": "BY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5443/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5443/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Belarus",
        "price": "$0.5443/min"
      },
      {
        "label": "Belarus - Mobile",
        "price": "$0.5443/min"
      },
      {
        "label": "Belarus - Premium Services",
        "price": "$1.7980/min"
      }
    ],
    "calculator": null
  },
  "BE": {
    "name": "Belgium",
    "code": "BE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0500/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0260/min",
        "inbound": "$0.0070/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2591/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.50/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Belgium",
        "price": "$0.1260/min"
      },
      {
        "label": "Belgium - From Europe",
        "price": "$0.0500/min"
      },
      {
        "label": "Belgium - Mobile (Lycamobile and Telenet)",
        "price": "$0.6980/min"
      },
      {
        "label": "Belgium - Mobile (Lycamobile and Telenet) - From Europe",
        "price": "$0.0260/min"
      },
      {
        "label": "Belgium - Mobile (Orange, Proximus, Base)",
        "price": "$0.6980/min"
      },
      {
        "label": "Belgium - Mobile (Orange, Proximus, Base) - From Europe",
        "price": "$0.0360/min"
      },
      {
        "label": "Belgium - Premium Services",
        "price": "$1.2000/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.2591,
      "currencySymbol": "$"
    }
  },
  "BA": {
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2430/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5320/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bosnia And Herzegovina",
        "price": "$0.2430/min"
      },
      {
        "label": "Bosnia And Herzegovina - Mobile",
        "price": "$0.5320/min"
      }
    ],
    "calculator": null
  },
  "VG": {
    "name": "Virgin Islands - British",
    "code": "VG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3680/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "British Virgin Islands",
        "price": "$0.3080/min"
      },
      {
        "label": "British Virgin Islands Mobile",
        "price": "$0.3680/min"
      },
      {
        "label": "British Virgin Islands Mobile Digicel",
        "price": "$0.3680/min"
      }
    ],
    "calculator": null
  },
  "BG": {
    "name": "Bulgaria",
    "code": "BG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1342/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5843/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.55/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Bulgaria",
        "price": "$0.1342/min"
      },
      {
        "label": "Bulgaria - Fixed - Others (OLO)",
        "price": "$0.3748/min"
      },
      {
        "label": "Bulgaria - Mobile",
        "price": "$0.5843/min"
      },
      {
        "label": "Bulgaria - Premium Services",
        "price": "$0.7980/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "HR": {
    "name": "Croatia",
    "code": "HR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2253/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6680/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.4267/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$4.25/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$6.50/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Croatia",
        "price": "$0.2253/min"
      },
      {
        "label": "Croatia Mobile",
        "price": "$0.6680/min"
      },
      {
        "label": "Croatia Mobile T-Mobile",
        "price": "$0.6680/min"
      },
      {
        "label": "Croatia Mobile Vipnet",
        "price": "$0.6680/min"
      },
      {
        "label": "Croatia Special Services",
        "price": "$0.8980/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.4267,
      "currencySymbol": "$"
    }
  },
  "CY": {
    "name": "Cyprus",
    "code": "CY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1027/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1719/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1138/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$30.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$11.67/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cyprus",
        "price": "$0.1027/min"
      },
      {
        "label": "Cyprus - Fixed - Others",
        "price": "$0.2080/min"
      },
      {
        "label": "Cyprus - Mobile",
        "price": "$0.1719/min"
      },
      {
        "label": "Cyprus Mobility Services",
        "price": "$0.9580/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.1138,
      "currencySymbol": "$"
    }
  },
  "CZ": {
    "name": "Czech Republic",
    "code": "CZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0274/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0938/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2539/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.25/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$29.75/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Czech Republic",
        "price": "$0.0274/min"
      },
      {
        "label": "Czech Republic Mobile",
        "price": "$0.0938/min"
      },
      {
        "label": "Czech Republic Mobile O2",
        "price": "$0.0938/min"
      },
      {
        "label": "Czech Republic Mobile T-Mobile",
        "price": "$0.0938/min"
      },
      {
        "label": "Czech Republic Mobile Vodafone",
        "price": "$0.0938/min"
      },
      {
        "label": "Czech Republic Mobility Services",
        "price": "$0.0938/min"
      },
      {
        "label": "Czech Republic Special Services",
        "price": "$0.1280/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.2539,
      "currencySymbol": "$"
    }
  },
  "DK": {
    "name": "Denmark",
    "code": "DK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0135/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0398/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3333/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "National Numbers",
        "price": "$2.10/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Denmark",
        "price": "$0.0135/min"
      },
      {
        "label": "Denmark - Mobile",
        "price": "$0.0398/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.3333,
      "currencySymbol": "$"
    }
  },
  "EE": {
    "name": "Estonia",
    "code": "EE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0280/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Estonia",
        "price": "$0.0280/min"
      },
      {
        "label": "Estonia - Mobile - Major Carriers (Telia, Elisa, EMT)",
        "price": "$0.5580/min"
      },
      {
        "label": "Estonia - Mobile - Others (Tele2)",
        "price": "$1.0980/min"
      },
      {
        "label": "Estonia - Premium Services",
        "price": "$1.0980/min"
      }
    ],
    "calculator": null
  },
  "FO": {
    "name": "Faeroe Islands",
    "code": "FO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0713/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1217/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Faroe Islands",
        "price": "$0.0713/min"
      },
      {
        "label": "Faroe Islands Mobile",
        "price": "$0.1217/min"
      }
    ],
    "calculator": null
  },
  "FI": {
    "name": "Finland",
    "code": "FI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5980/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5980/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2444/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.25/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$34.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Finland",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Mobile",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Mobile Elisa",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Mobile Telia Company",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Mobile Tismi",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Mobility Services",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Personal Numbering",
        "price": "$0.5980/min"
      },
      {
        "label": "Finland Special Services",
        "price": "$0.5980/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.2444,
      "currencySymbol": "$"
    }
  },
  "FR": {
    "name": "France",
    "code": "FR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0160/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0391/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2470/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.00/month"
      },
      {
        "label": "Mobile Numbers",
        "price": "$2.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "France",
        "price": "$0.0500/min"
      },
      {
        "label": "France - Fixed Extended",
        "price": "$0.0500/min"
      },
      {
        "label": "France - Fixed Extended - From Europe",
        "price": "$0.0240/min"
      },
      {
        "label": "France - From Europe",
        "price": "$0.0160/min"
      },
      {
        "label": "France - Mobile (Bouygues)",
        "price": "$0.3500/min"
      },
      {
        "label": "France - Mobile (Bouygues) - From Europe",
        "price": "$0.0550/min"
      },
      {
        "label": "France - Mobile (Globalstar)",
        "price": "$0.5500/min"
      },
      {
        "label": "France - Mobile (Orange, SFR)",
        "price": "$0.3500/min"
      },
      {
        "label": "France - Mobile (Orange, SFR) - From Europe",
        "price": "$0.0460/min"
      },
      {
        "label": "France - Mobile (Primary)",
        "price": "$0.3000/min"
      },
      {
        "label": "France - Mobile (Primary) - From Europe",
        "price": "$0.0391/min"
      },
      {
        "label": "France - Premium Services",
        "price": "$5.5000/min"
      },
      {
        "label": "France High Cost",
        "price": "$5.5000/min"
      },
      {
        "label": "France High Cost - From Europe",
        "price": "$5.5000/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.247,
      "currencySymbol": "$"
    }
  },
  "DE": {
    "name": "Germany",
    "code": "DE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0096/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0324/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2500/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Germany",
        "price": "$0.0096/min"
      },
      {
        "label": "Germany - Mobile",
        "price": "$0.3820/min"
      },
      {
        "label": "Germany - Mobile (Vodafone, T-Mob, Telefonica, E Plus)",
        "price": "$0.3820/min"
      },
      {
        "label": "Germany - Mobile (Vodafone, T-Mob, Telefonica, E Plus) - From Europe",
        "price": "$0.0324/min"
      },
      {
        "label": "Germany - Mobile - From Europe",
        "price": "$0.0460/min"
      }
    ],
    "calculator": null
  },
  "GI": {
    "name": "Gibraltar",
    "code": "GI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0462/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1968/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Gibraltar",
        "price": "$0.0462/min"
      },
      {
        "label": "Gibraltar - Mobile",
        "price": "$0.1968/min"
      }
    ],
    "calculator": null
  },
  "GR": {
    "name": "Greece",
    "code": "GR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0551/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1271/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1059/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.25/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Greece",
        "price": "$0.0551/min"
      },
      {
        "label": "Greece - Mobile",
        "price": "$0.1271/min"
      },
      {
        "label": "Greece - Premium Services",
        "price": "$1.0680/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.1059,
      "currencySymbol": "$"
    }
  },
  "GG": {
    "name": "Guernsey",
    "code": "GG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [],
    "calculator": null
  },
  "HU": {
    "name": "Hungary",
    "code": "HU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0110/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0531/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1967/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$20.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$11.50/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Hungary",
        "price": "$0.1050/min"
      },
      {
        "label": "Hungary - From Europe",
        "price": "$0.0110/min"
      },
      {
        "label": "Hungary - Premium Services",
        "price": "$0.9480/min"
      },
      {
        "label": "Hungary Mobile",
        "price": "$0.1210/min"
      },
      {
        "label": "Hungary Mobile - From Europe",
        "price": "$0.0531/min"
      },
      {
        "label": "Hungary Mobile - Telenor and T-mobile",
        "price": "$0.1080/min"
      },
      {
        "label": "Hungary Mobile - Telenor and T-mobile - From Europe",
        "price": "$0.0531/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.1967,
      "currencySymbol": "$"
    }
  },
  "IS": {
    "name": "Iceland",
    "code": "IS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0242/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0302/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Iceland",
        "price": "$0.0242/min"
      },
      {
        "label": "Iceland - Mobile",
        "price": "$0.0302/min"
      }
    ],
    "calculator": null
  },
  "IE": {
    "name": "Ireland",
    "code": "IE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0100/min",
        "inbound": "$0.0055/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0430/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.4965/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$0.85/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Ireland",
        "price": "$0.0100/min"
      },
      {
        "label": "Ireland - Mobile",
        "price": "$0.0774/min"
      },
      {
        "label": "Ireland - Mobile - Major Carriers (Vodafone, Tesco, O2, Lycatel, Three)",
        "price": "$0.0430/min"
      },
      {
        "label": "Ireland - Premium Services",
        "price": "$0.2180/min"
      }
    ],
    "calculator": {
      "localRate": 0.0055,
      "tollfreeRate": 0.4965,
      "currencySymbol": "$"
    }
  },
  "IT": {
    "name": "Italy",
    "code": "IT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0100/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0324/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.5950/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Italy",
        "price": "$0.0100/min"
      },
      {
        "label": "Italy - Mobile",
        "price": "$0.4500/min"
      },
      {
        "label": "Italy - Mobile - From Europe",
        "price": "$0.0324/min"
      },
      {
        "label": "Italy - Premium Services",
        "price": "$0.6000/min"
      }
    ],
    "calculator": null
  },
  "LV": {
    "name": "Latvia",
    "code": "LV",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8460/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.9402/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.50/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Latvia",
        "price": "$0.8460/min"
      },
      {
        "label": "Latvia - Fixed - Others (OLO)",
        "price": "$1.1152/min"
      },
      {
        "label": "Latvia - Mobile",
        "price": "$1.1152/min"
      },
      {
        "label": "Latvia - Mobile - Major Carriers (Tele2, VENTAmobile)",
        "price": "$0.9402/min"
      },
      {
        "label": "Latvia - Premium Services",
        "price": "$2.1180/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "LI": {
    "name": "Liechtenstein",
    "code": "LI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1132/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1823/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Liechtenstein",
        "price": "$0.1132/min"
      },
      {
        "label": "Liechtenstein - Mobile",
        "price": "$0.9707/min"
      },
      {
        "label": "Liechtenstein - Mobile - Others (Mobile Type A, Voicemail)",
        "price": "$0.1823/min"
      }
    ],
    "calculator": null
  },
  "LT": {
    "name": "Lithuania",
    "code": "LT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2265/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.8145/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0512/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.50/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$22.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Lithuania",
        "price": "$0.2265/min"
      },
      {
        "label": "Lithuania - Fixed - Others",
        "price": "$0.8145/min"
      },
      {
        "label": "Lithuania - Mobile - Major Carriers (Bite, Tele2)",
        "price": "$1.3800/min"
      },
      {
        "label": "Lithuania - Mobile - Others (Telia)",
        "price": "$0.8145/min"
      },
      {
        "label": "Lithuania - Premium Services",
        "price": "$2.2380/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.0512,
      "currencySymbol": "$"
    }
  },
  "LU": {
    "name": "Luxembourg",
    "code": "LU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0162/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0293/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.4800/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Luxembourg",
        "price": "$0.0162/min"
      },
      {
        "label": "Luxembourg - Mobile",
        "price": "$0.0293/min"
      },
      {
        "label": "Luxembourg - Premium Services",
        "price": "$0.3280/min"
      }
    ],
    "calculator": null
  },
  "MK": {
    "name": "Macedonia",
    "code": "MK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2220/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5423/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Macedonia",
        "price": "$0.2220/min"
      },
      {
        "label": "Macedonia Fixed One",
        "price": "$0.2220/min"
      },
      {
        "label": "Macedonia Mobile",
        "price": "$0.5423/min"
      },
      {
        "label": "Macedonia Mobile One",
        "price": "$0.5423/min"
      },
      {
        "label": "Macedonia Mobile T-Mobile",
        "price": "$0.5423/min"
      },
      {
        "label": "Macedonia Mobility Services",
        "price": "$0.5423/min"
      },
      {
        "label": "Macedonia Skopje",
        "price": "$0.2220/min"
      },
      {
        "label": "Macedonia Special Services",
        "price": "$0.7080/min"
      },
      {
        "label": "Macedonia Special Services TYPE_A",
        "price": "$0.7080/min"
      },
      {
        "label": "Macedonia Special Services TYPE_B",
        "price": "$0.7080/min"
      }
    ],
    "calculator": null
  },
  "MT": {
    "name": "Malta",
    "code": "MT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0097/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0183/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Malta",
        "price": "$0.0097/min"
      },
      {
        "label": "Malta - Mobile",
        "price": "$0.0183/min"
      }
    ],
    "calculator": null
  },
  "MQ": {
    "name": "Martinique",
    "code": "MQ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0139/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0862/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Martinique",
        "price": "$0.0139/min"
      },
      {
        "label": "Martinique - Mobile",
        "price": "$0.1155/min"
      },
      {
        "label": "Martinique - Mobile - Major Carriers (Orange, Digicel, Outremer)",
        "price": "$0.0862/min"
      }
    ],
    "calculator": null
  },
  "MD": {
    "name": "Moldova",
    "code": "MD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4482/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3687/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Moldova",
        "price": "$0.4482/min"
      },
      {
        "label": "Moldova Mobile",
        "price": "$0.3728/min"
      },
      {
        "label": "Moldova Mobile MoldCell",
        "price": "$0.5210/min"
      },
      {
        "label": "Moldova Mobile Orange",
        "price": "$0.3687/min"
      },
      {
        "label": "Moldova Mobile Unite",
        "price": "$0.4482/min"
      },
      {
        "label": "Moldova Pridnestrovje",
        "price": "$0.4482/min"
      },
      {
        "label": "Moldova Special Services",
        "price": "$1.1380/min"
      }
    ],
    "calculator": null
  },
  "MC": {
    "name": "Monaco",
    "code": "MC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1132/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4315/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Monaco",
        "price": "$0.1132/min"
      },
      {
        "label": "Monaco - Mobile",
        "price": "$0.4315/min"
      },
      {
        "label": "Monaco - Mobile - Others (Kosovo)",
        "price": "$0.7425/min"
      }
    ],
    "calculator": null
  },
  "ME": {
    "name": "Montenegro",
    "code": "ME",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2513/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5990/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Montenegro",
        "price": "$0.2513/min"
      },
      {
        "label": "Montenegro - Mobile",
        "price": "$0.5990/min"
      },
      {
        "label": "Montenegro - Premium Services",
        "price": "$0.9480/min"
      }
    ],
    "calculator": null
  },
  "NL": {
    "name": "Netherlands",
    "code": "NL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0110/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0160/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3067/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.55/month"
      },
      {
        "label": "Mobile Numbers",
        "price": "$10.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Netherlands",
        "price": "$0.3460/min"
      },
      {
        "label": "Netherlands - From Europe",
        "price": "$0.0110/min"
      },
      {
        "label": "Netherlands - Mobile (Tismi)",
        "price": "$0.3114/min"
      },
      {
        "label": "Netherlands - Mobile - Major Carriers (Lycamobile, Ibasis, Tele2, T-mobile, Telfort, Vodafone)",
        "price": "$0.4000/min"
      },
      {
        "label": "Netherlands - Mobile - Major Carriers (Lycamobile, Ibasis, Tele2, T-mobile, Telfort, Vodafone) - From Europe",
        "price": "$0.0160/min"
      },
      {
        "label": "Netherlands - Mobile - Others (KPN)",
        "price": "$0.5360/min"
      },
      {
        "label": "Netherlands - Premium Services",
        "price": "$2.8280/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.3067,
      "currencySymbol": "$"
    }
  },
  "NO": {
    "name": "Norway",
    "code": "NO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0130/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0580/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0615/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Norway",
        "price": "$0.0130/min"
      },
      {
        "label": "Norway - Mobile",
        "price": "$0.0580/min"
      },
      {
        "label": "Norway - Premium Services",
        "price": "$0.2880/min"
      }
    ],
    "calculator": null
  },
  "PL": {
    "name": "Poland",
    "code": "PL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0240/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0300/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$0.85/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Poland",
        "price": "$0.0240/min"
      },
      {
        "label": "Poland - Fixed - Others (Netia, OLO, T-mobile)",
        "price": "$0.0300/min"
      },
      {
        "label": "Poland - Mobile",
        "price": "$0.2300/min"
      },
      {
        "label": "Poland - Mobile - From Europe",
        "price": "$0.0549/min"
      },
      {
        "label": "Poland - Premium Services",
        "price": "$1.1780/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "PT": {
    "name": "Portugal",
    "code": "PT",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0031/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1500/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3833/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Portugal",
        "price": "$0.0081/min"
      },
      {
        "label": "Portugal - Fixed - National",
        "price": "$0.0380/min"
      },
      {
        "label": "Portugal - Fixed - National - From Europe",
        "price": "$0.0031/min"
      },
      {
        "label": "Portugal - From Europe",
        "price": "$0.0088/min"
      },
      {
        "label": "Portugal - Mobile",
        "price": "$0.4300/min"
      },
      {
        "label": "Portugal - Mobile - From Europe",
        "price": "$0.1500/min"
      },
      {
        "label": "Portugal - Premium Services",
        "price": "$0.9400/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.3833,
      "currencySymbol": "$"
    }
  },
  "RO": {
    "name": "Romania",
    "code": "RO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0180/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0330/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.55/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Romania",
        "price": "$0.0180/min"
      },
      {
        "label": "Romania - Mobile",
        "price": "$0.0330/min"
      },
      {
        "label": "Romania - Premium Services",
        "price": "$1.1780/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0,
      "currencySymbol": "$"
    }
  },
  "RU": {
    "name": "Russia",
    "code": "RU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0330/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2820/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2140/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$54.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Russia",
        "price": "$0.0980/min"
      },
      {
        "label": "Russia Abkhazia",
        "price": "$0.3480/min"
      },
      {
        "label": "Russia Far Zone",
        "price": "$0.0443/min"
      },
      {
        "label": "Russia Fixed 1",
        "price": "$0.0330/min"
      },
      {
        "label": "Russia Fixed 2",
        "price": "$0.0380/min"
      },
      {
        "label": "Russia Fixed 5",
        "price": "$0.0980/min"
      },
      {
        "label": "Russia Mobile",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobile Abkhazia",
        "price": "$0.3027/min"
      },
      {
        "label": "Russia Mobile Beeline",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobile GTNT",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobile Globaltel",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobile Iridium Satellite",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobile MTS",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobile MVNO",
        "price": "$1.8980/min"
      },
      {
        "label": "Russia Mobile Megafon",
        "price": "$0.2820/min"
      },
      {
        "label": "Russia Mobility Services TYPE_A",
        "price": "$1.8980/min"
      },
      {
        "label": "Russia Moscow",
        "price": "$0.0330/min"
      },
      {
        "label": "Russia South Ossetia",
        "price": "$0.3580/min"
      },
      {
        "label": "Russia Special Services",
        "price": "$1.4480/min"
      },
      {
        "label": "Russia St Petersburg",
        "price": "$0.0330/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.214,
      "currencySymbol": "$"
    }
  },
  "SM": {
    "name": "San Marino",
    "code": "SM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0378/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.0190/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "San Marino",
        "price": "$0.0378/min"
      },
      {
        "label": "San Marino Fixed TIS",
        "price": "$1.9872/min"
      },
      {
        "label": "San Marino Mobile Alternative",
        "price": "$1.0190/min"
      },
      {
        "label": "San Marino Mobile San Marino Telecom",
        "price": "$1.0190/min"
      },
      {
        "label": "San Marino Special Services",
        "price": "$1.4580/min"
      },
      {
        "label": "San Marino Special Services TYPE_A",
        "price": "$1.6180/min"
      },
      {
        "label": "San Marino Special Services TYPE_B",
        "price": "$1.1980/min"
      }
    ],
    "calculator": null
  },
  "RS": {
    "name": "Serbia",
    "code": "RS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2387/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6052/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Serbia",
        "price": "$0.2702/min"
      },
      {
        "label": "Serbia - Fixed - Major Cities (Kosovo)",
        "price": "$0.2387/min"
      },
      {
        "label": "Serbia - Fixed - Others (Orion Telekom)",
        "price": "$0.6262/min"
      },
      {
        "label": "Serbia - Mobile",
        "price": "$0.6052/min"
      },
      {
        "label": "Serbia - Premium Services",
        "price": "$0.6880/min"
      }
    ],
    "calculator": null
  },
  "SK": {
    "name": "Slovakia",
    "code": "SK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0042/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0042/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2766/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.50/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Slovakia",
        "price": "$0.0042/min"
      },
      {
        "label": "Slovakia - Mobile",
        "price": "$0.0042/min"
      },
      {
        "label": "Slovakia - Mobile - Major Carriers (O2, Orange, Slovak Telecom, SWAN)",
        "price": "$0.0376/min"
      },
      {
        "label": "Slovakia - Premium Services",
        "price": "$1.0580/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.2766,
      "currencySymbol": "$"
    }
  },
  "SI": {
    "name": "Slovenia",
    "code": "SI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2566/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6257/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.3067/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$4.25/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$6.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Slovenia",
        "price": "$0.2566/min"
      },
      {
        "label": "Slovenia - Fixed (Type A and Type B)",
        "price": "$0.4900/min"
      },
      {
        "label": "Slovenia - Fixed - Others (Ipko)",
        "price": "$0.7623/min"
      },
      {
        "label": "Slovenia - Mobile - Major Carriers ( Telekom Slovenje, A1 Slovenija, Telematch)",
        "price": "$0.6257/min"
      },
      {
        "label": "Slovenia - Mobile - Others (Ipko)",
        "price": "$0.7623/min"
      },
      {
        "label": "Slovenia - Premium Services",
        "price": "$1.2480/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.3067,
      "currencySymbol": "$"
    }
  },
  "ES": {
    "name": "Spain",
    "code": "ES",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0113/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0279/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2642/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$3.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Spain",
        "price": "$0.0113/min"
      },
      {
        "label": "Spain - Mobile",
        "price": "$0.2500/min"
      },
      {
        "label": "Spain - Mobile - From Europe",
        "price": "$0.0279/min"
      },
      {
        "label": "Spain - Premium Services",
        "price": "$0.9000/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.2642,
      "currencySymbol": "$"
    }
  },
  "SE": {
    "name": "Sweden",
    "code": "SE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0120/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5900/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1262/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.00/month"
      },
      {
        "label": "Mobile Numbers",
        "price": "$2.50/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$10.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Sweden",
        "price": "$0.0120/min"
      },
      {
        "label": "Sweden - Shared Services",
        "price": "$0.0279/min"
      },
      {
        "label": "Sweden Mobile",
        "price": "$0.5900/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.1262,
      "currencySymbol": "$"
    }
  },
  "CH": {
    "name": "Switzerland",
    "code": "CH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0280/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0980/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.1635/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$0.85/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$21.25/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Switzerland",
        "price": "$0.0280/min"
      },
      {
        "label": "Switzerland Mobile",
        "price": "$0.7980/min"
      },
      {
        "label": "Switzerland Mobile Lycamobile",
        "price": "$0.1180/min"
      },
      {
        "label": "Switzerland Mobile Salt Mobile SA",
        "price": "$0.1180/min"
      },
      {
        "label": "Switzerland Mobile Sunrise",
        "price": "$0.0980/min"
      },
      {
        "label": "Switzerland Mobile Swisscom",
        "price": "$0.7980/min"
      }
    ],
    "calculator": {
      "localRate": 0.003,
      "tollfreeRate": 0.1635,
      "currencySymbol": "$"
    }
  },
  "UA": {
    "name": "Ukraine",
    "code": "UA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2013/min",
        "inbound": "$0.0110/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3900/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Ukraine",
        "price": "$0.2013/min"
      },
      {
        "label": "Ukraine - Mobile",
        "price": "$0.3900/min"
      },
      {
        "label": "Ukraine - Premium Services",
        "price": "$0.9980/min"
      }
    ],
    "calculator": null
  },
  "GB": {
    "name": "United Kingdom",
    "code": "GB",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0072/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0171/min",
        "inbound": "$0.0030/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "$0.0072/min",
        "inbound": "$0.0470/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$0.85/month"
      },
      {
        "label": "Mobile Numbers",
        "price": "$0.90/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$1.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "United Kingdom",
        "price": "$0.0072/min"
      },
      {
        "label": "United Kingdom - Fixed - Others",
        "price": "$0.0072/min"
      },
      {
        "label": "United Kingdom - Major Mobile (H3G, O2, ORANGE, T-MOBILE, VODAFONE)",
        "price": "$0.0171/min"
      },
      {
        "label": "United Kingdom - Mobile (SKY, Tier 3, Lyca,O3)",
        "price": "$0.2844/min"
      },
      {
        "label": "United Kingdom - Mobile - Others (MANX, PNS, Digicel)",
        "price": "$0.3860/min"
      },
      {
        "label": "United Kingdom - Premium Services",
        "price": "$0.8946/min"
      },
      {
        "label": "United Kingdom - Tollfree",
        "price": "$0.0072/min"
      }
    ],
    "calculator": {
      "localRate": 0.006,
      "tollfreeRate": 0.047,
      "currencySymbol": "$"
    }
  },
  "DZ": {
    "name": "Algeria",
    "code": "DZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$2.0900/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Algeria",
        "price": "$0.1480/min"
      },
      {
        "label": "Algeria - Mobile",
        "price": "$2.0900/min"
      }
    ],
    "calculator": null
  },
  "AO": {
    "name": "Angola",
    "code": "AO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0569/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2519/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Angola",
        "price": "$0.0569/min"
      },
      {
        "label": "Angola - Mobile - Major Carriers (Movicel)",
        "price": "$0.9780/min"
      },
      {
        "label": "Angola - Mobile - Others (Unitel)",
        "price": "$0.2519/min"
      },
      {
        "label": "Angola - Premium Services",
        "price": "$0.9780/min"
      }
    ],
    "calculator": null
  },
  "BJ": {
    "name": "Benin",
    "code": "BJ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5857/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4828/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Benin",
        "price": "$0.5857/min"
      },
      {
        "label": "Benin - Mobile - Others (Libercom)",
        "price": "$0.4828/min"
      },
      {
        "label": "Benin - Mobile Major Carriers (BELL, Moov, MTN)",
        "price": "$0.5857/min"
      },
      {
        "label": "Benin Mobility Services",
        "price": "$0.5579/min"
      }
    ],
    "calculator": null
  },
  "BW": {
    "name": "Botswana",
    "code": "BW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1421/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2975/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Botswana",
        "price": "$0.1421/min"
      },
      {
        "label": "Botswana - Mobile",
        "price": "$0.3687/min"
      },
      {
        "label": "Botswana - Mobile - Major Carrier (MTN)",
        "price": "$0.2975/min"
      }
    ],
    "calculator": null
  },
  "BF": {
    "name": "Burkina Faso",
    "code": "BF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6030/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Burkina Faso",
        "price": "$0.5045/min"
      },
      {
        "label": "Burkina Faso - Mobile",
        "price": "$0.6030/min"
      },
      {
        "label": "Burkina Faso - Premium Services",
        "price": "$1.4980/min"
      }
    ],
    "calculator": null
  },
  "BI": {
    "name": "Burundi",
    "code": "BI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.9580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.8518/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Burundi",
        "price": "$0.9580/min"
      },
      {
        "label": "Burundi Mobile",
        "price": "$0.9580/min"
      },
      {
        "label": "Burundi Mobile Africell",
        "price": "$0.9533/min"
      },
      {
        "label": "Burundi Mobile Econet Wireless",
        "price": "$0.8518/min"
      },
      {
        "label": "Burundi Mobile Onatel",
        "price": "$0.9252/min"
      },
      {
        "label": "Burundi Mobile Smart",
        "price": "$0.9163/min"
      },
      {
        "label": "Burundi Special Services",
        "price": "$1.1980/min"
      }
    ],
    "calculator": null
  },
  "CM": {
    "name": "Cameroon",
    "code": "CM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4433/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5118/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cameroon",
        "price": "$0.4433/min"
      },
      {
        "label": "Cameroon - Mobile",
        "price": "$0.5118/min"
      },
      {
        "label": "Cameroon - Premium Services",
        "price": "$2.4980/min"
      }
    ],
    "calculator": null
  },
  "CV": {
    "name": "Cape Verde",
    "code": "CV",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2658/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4027/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cape Verde",
        "price": "$0.2658/min"
      },
      {
        "label": "Cape Verde - Mobile",
        "price": "$0.4027/min"
      }
    ],
    "calculator": null
  },
  "CF": {
    "name": "Central African Republic",
    "code": "CF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6950/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.9330/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Central African Republic",
        "price": "$0.6950/min"
      },
      {
        "label": "Central African Republic - Mobile",
        "price": "$0.9330/min"
      },
      {
        "label": "Central African Republic - Premium Services",
        "price": "$1.1980/min"
      }
    ],
    "calculator": null
  },
  "TD": {
    "name": "Chad",
    "code": "TD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8990/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.9357/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Chad",
        "price": "$0.8990/min"
      },
      {
        "label": "Chad - Mobile",
        "price": "$0.9357/min"
      },
      {
        "label": "Chad Special Services",
        "price": "$0.8990/min"
      }
    ],
    "calculator": null
  },
  "KM": {
    "name": "Comoros",
    "code": "KM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6135/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6144/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Comoros",
        "price": "$0.6135/min"
      },
      {
        "label": "Comoros - Mobile",
        "price": "$0.6144/min"
      },
      {
        "label": "Comoros - Premium Services",
        "price": "$1.8380/min"
      }
    ],
    "calculator": null
  },
  "CD": {
    "name": "Congo Democratic Republic",
    "code": "CD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7281/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5158/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Democratic Republic Of The Congo",
        "price": "$0.7281/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobile",
        "price": "$0.7281/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobile Africell",
        "price": "$0.6360/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobile Airtel",
        "price": "$0.5522/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobile Orange",
        "price": "$0.5158/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobile Tatem",
        "price": "$0.7407/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobile Vodacom",
        "price": "$0.5203/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobility Services",
        "price": "$1.7180/min"
      },
      {
        "label": "Democratic Republic Of The Congo Mobility Services TYPE_A",
        "price": "$2.0880/min"
      },
      {
        "label": "Democratic Republic Of The Congo Special Services",
        "price": "$3.6780/min"
      }
    ],
    "calculator": null
  },
  "DJ": {
    "name": "Djibouti",
    "code": "DJ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5483/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5483/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Djibouti",
        "price": "$0.5483/min"
      },
      {
        "label": "Djibouti Mobile",
        "price": "$0.5483/min"
      }
    ],
    "calculator": null
  },
  "EG": {
    "name": "Egypt",
    "code": "EG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1380/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1880/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.5500/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Toll-Free Numbers",
        "price": "$50.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Egypt",
        "price": "$0.1380/min"
      },
      {
        "label": "Egypt - Mobile",
        "price": "$0.1880/min"
      }
    ],
    "calculator": {
      "localRate": 0,
      "tollfreeRate": 0.55,
      "currencySymbol": "$"
    }
  },
  "GQ": {
    "name": "Equatorial Guinea",
    "code": "GQ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8001/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.7148/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Equatorial Guinea",
        "price": "$0.8001/min"
      },
      {
        "label": "Equatorial Guinea Fixed Getesa",
        "price": "$0.8001/min"
      },
      {
        "label": "Equatorial Guinea Fixed Muni",
        "price": "$0.8047/min"
      },
      {
        "label": "Equatorial Guinea Mobile",
        "price": "$0.8001/min"
      },
      {
        "label": "Equatorial Guinea Mobile Getesa",
        "price": "$0.7148/min"
      },
      {
        "label": "Equatorial Guinea Mobile Muni",
        "price": "$0.8047/min"
      }
    ],
    "calculator": null
  },
  "ER": {
    "name": "Eritrea",
    "code": "ER",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3896/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3803/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Eritrea",
        "price": "$0.3896/min"
      },
      {
        "label": "Eritrea - Mobile",
        "price": "$0.3803/min"
      }
    ],
    "calculator": null
  },
  "ET": {
    "name": "Ethiopia",
    "code": "ET",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3574/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4244/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Ethiopia",
        "price": "$0.4244/min"
      },
      {
        "label": "Ethiopia - Fixed - Major Cities (Addis Abeba)",
        "price": "$0.3574/min"
      },
      {
        "label": "Ethiopia - Mobile",
        "price": "$0.4244/min"
      }
    ],
    "calculator": null
  },
  "GA": {
    "name": "Gabon",
    "code": "GA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5995/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6658/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Gabon",
        "price": "$0.5995/min"
      },
      {
        "label": "Gabon - Mobile",
        "price": "$0.6658/min"
      },
      {
        "label": "Gabon - Mobile - Others (Azur)",
        "price": "$0.9693/min"
      },
      {
        "label": "Gabon Mobile Airtel",
        "price": "$0.6658/min"
      }
    ],
    "calculator": null
  },
  "GM": {
    "name": "Gambia",
    "code": "GM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.9038/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.9185/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Gambia",
        "price": "$0.9038/min"
      },
      {
        "label": "Gambia - Mobile",
        "price": "$0.9185/min"
      },
      {
        "label": "Gambia - Premium Services",
        "price": "$2.3980/min"
      }
    ],
    "calculator": null
  },
  "GH": {
    "name": "Ghana",
    "code": "GH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4180/min",
        "inbound": "$0.0170/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Ghana",
        "price": "$0.4180/min"
      },
      {
        "label": "Ghana - Mobile",
        "price": "$0.4180/min"
      }
    ],
    "calculator": null
  },
  "GN": {
    "name": "Guinea",
    "code": "GN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7451/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Guinea",
        "price": "$0.7451/min"
      },
      {
        "label": "Guinea - Mobile",
        "price": "$0.6580/min"
      },
      {
        "label": "Guinea - Premium Services",
        "price": "$1.6080/min"
      }
    ],
    "calculator": null
  },
  "GW": {
    "name": "Guinea Bissau",
    "code": "GW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8552/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.8552/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Guinea-Bissau",
        "price": "$0.8552/min"
      },
      {
        "label": "Guinea-Bissau - Mobile",
        "price": "$0.8552/min"
      },
      {
        "label": "Guinea-Bissau - Premium Services",
        "price": "$1.2480/min"
      }
    ],
    "calculator": null
  },
  "CI": {
    "name": "Ivory Coast",
    "code": "CI",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5405/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5793/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Ivory Coast",
        "price": "$0.5405/min"
      },
      {
        "label": "Ivory Coast - Mobile",
        "price": "$0.5793/min"
      },
      {
        "label": "Ivory Coast - Premium Services",
        "price": "$3.7980/min"
      }
    ],
    "calculator": null
  },
  "KE": {
    "name": "Kenya",
    "code": "KE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3780/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Kenya",
        "price": "$0.3780/min"
      },
      {
        "label": "Kenya - Mobile",
        "price": "$0.3780/min"
      },
      {
        "label": "Kenya - Mobile - Major Carriers (Safaricom, Airtel)",
        "price": "$0.4480/min"
      },
      {
        "label": "Kenya - Premium Services",
        "price": "$1.0580/min"
      }
    ],
    "calculator": null
  },
  "LS": {
    "name": "Lesotho",
    "code": "LS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6468/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6133/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Lesotho",
        "price": "$0.6468/min"
      },
      {
        "label": "Lesotho Mobile Econet",
        "price": "$0.6133/min"
      },
      {
        "label": "Lesotho Mobile Vodacom",
        "price": "$0.6335/min"
      }
    ],
    "calculator": null
  },
  "LR": {
    "name": "Liberia",
    "code": "LR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6589/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.7074/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Liberia",
        "price": "$0.6589/min"
      },
      {
        "label": "Liberia - Mobile",
        "price": "$0.7074/min"
      },
      {
        "label": "Liberia - Premium Services",
        "price": "$1.2380/min"
      }
    ],
    "calculator": null
  },
  "LY": {
    "name": "Libya",
    "code": "LY",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Libya",
        "price": "$0.4480/min"
      },
      {
        "label": "Libya Mobile",
        "price": "$0.5980/min"
      },
      {
        "label": "Libya Mobile Almadar",
        "price": "$0.5980/min"
      }
    ],
    "calculator": null
  },
  "MG": {
    "name": "Madagascar",
    "code": "MG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8650/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.0105/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Madagascar",
        "price": "$0.8650/min"
      },
      {
        "label": "Madagascar - Mobile",
        "price": "$1.0105/min"
      },
      {
        "label": "Madagascar - Premium Services",
        "price": "$1.8580/min"
      }
    ],
    "calculator": null
  },
  "MW": {
    "name": "Malawi",
    "code": "MW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5321/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5641/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Malawi",
        "price": "$0.5321/min"
      },
      {
        "label": "Malawi - Mobile",
        "price": "$0.5641/min"
      },
      {
        "label": "Malawi - Premium Services",
        "price": "$1.7980/min"
      }
    ],
    "calculator": null
  },
  "ML": {
    "name": "Mali",
    "code": "ML",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3042/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3042/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Mali",
        "price": "$0.3042/min"
      },
      {
        "label": "Mali - Mobile",
        "price": "$0.6267/min"
      },
      {
        "label": "Mali - Mobile - Others (Telecel)",
        "price": "$0.3042/min"
      }
    ],
    "calculator": null
  },
  "MR": {
    "name": "Mauritania",
    "code": "MR",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7939/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.7860/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Mauritania",
        "price": "$0.7939/min"
      },
      {
        "label": "Mauritania - Mobile - Major Carriers (Mauritel, Chinguitel)",
        "price": "$0.7860/min"
      },
      {
        "label": "Mauritania - Mobile - Others (Mattel)",
        "price": "$0.9929/min"
      }
    ],
    "calculator": null
  },
  "MU": {
    "name": "Mauritius",
    "code": "MU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2377/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2377/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Mauritius",
        "price": "$0.2377/min"
      },
      {
        "label": "Mauritius - Mobile",
        "price": "$0.2377/min"
      }
    ],
    "calculator": null
  },
  "MA": {
    "name": "Morocco",
    "code": "MA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3180/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Morocco",
        "price": "$0.3180/min"
      },
      {
        "label": "Morocco Fixed Inwi",
        "price": "$0.3180/min"
      },
      {
        "label": "Morocco Fixed Orange Maroc",
        "price": "$0.3180/min"
      },
      {
        "label": "Morocco Mobile",
        "price": "$0.8480/min"
      },
      {
        "label": "Morocco Mobile Al Hourria Telecom",
        "price": "$0.8480/min"
      },
      {
        "label": "Morocco Mobile Inwi",
        "price": "$0.8480/min"
      },
      {
        "label": "Morocco Mobile Inwi Far Zone",
        "price": "$0.4980/min"
      },
      {
        "label": "Morocco Mobile Orange Maroc",
        "price": "$0.8480/min"
      },
      {
        "label": "Morocco Mobility Services",
        "price": "$0.8980/min"
      }
    ],
    "calculator": null
  },
  "MZ": {
    "name": "Mozambique",
    "code": "MZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0778/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3221/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Mozambique",
        "price": "$0.0778/min"
      },
      {
        "label": "Mozambique - Mobile",
        "price": "$0.5941/min"
      },
      {
        "label": "Mozambique - Mobile - Major Carriers (Mcel, Movitel)",
        "price": "$0.3221/min"
      }
    ],
    "calculator": null
  },
  "NA": {
    "name": "Namibia",
    "code": "NA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0717/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0802/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Namibia",
        "price": "$0.0717/min"
      },
      {
        "label": "Namibia - Mobile",
        "price": "$0.0802/min"
      },
      {
        "label": "Namibia - Premium Services",
        "price": "$0.0813/min"
      }
    ],
    "calculator": null
  },
  "NE": {
    "name": "Niger",
    "code": "NE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5373/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4739/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Niger",
        "price": "$0.5373/min"
      },
      {
        "label": "Niger Mobile",
        "price": "$0.5373/min"
      },
      {
        "label": "Niger Mobile Airtel",
        "price": "$0.4890/min"
      },
      {
        "label": "Niger Mobile Moov",
        "price": "$0.5373/min"
      },
      {
        "label": "Niger Mobile Orange",
        "price": "$0.4739/min"
      },
      {
        "label": "Niger Mobility Services",
        "price": "$2.2680/min"
      },
      {
        "label": "Niger Special Services",
        "price": "$2.2580/min"
      }
    ],
    "calculator": null
  },
  "NG": {
    "name": "Nigeria",
    "code": "NG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Nigeria",
        "price": "$0.1580/min"
      },
      {
        "label": "Nigeria - Mobile",
        "price": "$0.1600/min"
      },
      {
        "label": "Nigeria - Premium Services",
        "price": "$1.7980/min"
      },
      {
        "label": "Nigeria Fixed VGC",
        "price": "$0.1580/min"
      },
      {
        "label": "Nigeria Fixed VODACOM",
        "price": "$0.1580/min"
      },
      {
        "label": "Nigeria Mobile MTN",
        "price": "$0.1580/min"
      },
      {
        "label": "Nigeria Mobile Smile",
        "price": "$0.1580/min"
      },
      {
        "label": "Nigeria Mobile Visafone",
        "price": "$0.1580/min"
      }
    ],
    "calculator": null
  },
  "RE": {
    "name": "Reunion",
    "code": "RE",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1085/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.1408/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Reunion",
        "price": "$0.1085/min"
      },
      {
        "label": "Reunion - Mobile",
        "price": "$0.1408/min"
      }
    ],
    "calculator": null
  },
  "RW": {
    "name": "Rwanda",
    "code": "RW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4060/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4872/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Rwanda",
        "price": "$0.4060/min"
      },
      {
        "label": "Rwanda - Mobile",
        "price": "$0.4872/min"
      }
    ],
    "calculator": null
  },
  "ST": {
    "name": "Sao Tome and Principe",
    "code": "ST",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.7830/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.7830/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Sao Tome And Principe",
        "price": "$1.7830/min"
      },
      {
        "label": "Sao Tome And Principe - Mobile",
        "price": "$1.7830/min"
      }
    ],
    "calculator": null
  },
  "SN": {
    "name": "Senegal",
    "code": "SN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3290/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5885/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Senegal",
        "price": "$0.3290/min"
      },
      {
        "label": "Senegal - Fixed - Major Carriers (Tigo, Expresso)",
        "price": "$0.6242/min"
      },
      {
        "label": "Senegal - Mobile",
        "price": "$0.5885/min"
      },
      {
        "label": "Senegal - Premium Services",
        "price": "$0.5835/min"
      }
    ],
    "calculator": null
  },
  "SC": {
    "name": "Seychelles",
    "code": "SC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.0235/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.0634/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Seychelles",
        "price": "$1.0235/min"
      },
      {
        "label": "Seychelles - Mobile",
        "price": "$1.0634/min"
      },
      {
        "label": "Seychelles - Premium Services",
        "price": "$1.1080/min"
      }
    ],
    "calculator": null
  },
  "SL": {
    "name": "Sierra Leone",
    "code": "SL",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7941/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.7941/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Sierra Leone",
        "price": "$0.7941/min"
      },
      {
        "label": "Sierra Leone - Mobile",
        "price": "$0.7941/min"
      },
      {
        "label": "Sierra Leone - Premium Services",
        "price": "$0.7380/min"
      }
    ],
    "calculator": null
  },
  "SO": {
    "name": "Somalia",
    "code": "SO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7851/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5197/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Somalia",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Fixed Golis",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Fixed Hortel",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Fixed Telcom",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Fixed Telesom",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Mobile",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Mobile Golis",
        "price": "$0.5197/min"
      },
      {
        "label": "Somalia Mobile Hortel",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Mobile Somafone",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Mobile Somtel",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Mobile Telesom",
        "price": "$0.6440/min"
      },
      {
        "label": "Somalia Mobility Services",
        "price": "$0.7851/min"
      },
      {
        "label": "Somalia Special Services",
        "price": "$0.9180/min"
      }
    ],
    "calculator": null
  },
  "ZA": {
    "name": "South Africa",
    "code": "ZA",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2480/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2280/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0817/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$1.28/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$7.50/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "South Africa",
        "price": "$0.4014/min"
      },
      {
        "label": "South Africa - Mobile",
        "price": "$0.3360/min"
      },
      {
        "label": "South Africa - Premium Services",
        "price": "$0.8460/min"
      },
      {
        "label": "South Africa Fixed MTN",
        "price": "$0.2480/min"
      },
      {
        "label": "South Africa Mobile Openserve",
        "price": "$0.2480/min"
      },
      {
        "label": "South Africa Mobile Vodacom",
        "price": "$0.2280/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.0817,
      "currencySymbol": "$"
    }
  },
  "SS": {
    "name": "South Sudan",
    "code": "SS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "South Sudan",
        "price": "$0.6480/min"
      },
      {
        "label": "South Sudan - Mobile",
        "price": "$0.4980/min"
      },
      {
        "label": "South Sudan - Premium Services",
        "price": "$1.4280/min"
      }
    ],
    "calculator": null
  },
  "SD": {
    "name": "Sudan",
    "code": "SD",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.2580/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Sudan",
        "price": "$0.2580/min"
      },
      {
        "label": "Sudan - Mobile",
        "price": "$0.2580/min"
      },
      {
        "label": "Sudan - Premium Services",
        "price": "$1.2380/min"
      }
    ],
    "calculator": null
  },
  "SZ": {
    "name": "Swaziland",
    "code": "SZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.1345/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3343/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Swaziland",
        "price": "$0.1345/min"
      },
      {
        "label": "Swaziland - Mobile",
        "price": "$0.3343/min"
      }
    ],
    "calculator": null
  },
  "TZ": {
    "name": "Tanzania",
    "code": "TZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4655/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4655/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Tanzania",
        "price": "$0.4655/min"
      },
      {
        "label": "Tanzania Mobile",
        "price": "$0.4835/min"
      },
      {
        "label": "Tanzania Mobile Airtel",
        "price": "$0.4655/min"
      },
      {
        "label": "Tanzania Mobile SMART",
        "price": "$0.5237/min"
      },
      {
        "label": "Tanzania Mobile Smile",
        "price": "$0.6224/min"
      },
      {
        "label": "Tanzania Mobile Tigo",
        "price": "$0.4875/min"
      },
      {
        "label": "Tanzania Mobile Vodacom",
        "price": "$0.5114/min"
      },
      {
        "label": "Tanzania Mobile Zantel",
        "price": "$0.5299/min"
      },
      {
        "label": "Tanzania Special Services",
        "price": "$0.6980/min"
      }
    ],
    "calculator": null
  },
  "TG": {
    "name": "Togo",
    "code": "TG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.0380/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$2.0380/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Togo",
        "price": "$2.0380/min"
      },
      {
        "label": "Togo - Mobile",
        "price": "$2.0380/min"
      },
      {
        "label": "Togo - Premium Services",
        "price": "$2.3280/min"
      }
    ],
    "calculator": null
  },
  "TN": {
    "name": "Tunisia",
    "code": "TN",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Tunisia",
        "price": "$1.1980/min"
      },
      {
        "label": "Tunisia - Mobile",
        "price": "$1.1980/min"
      },
      {
        "label": "Tunisia - Premium Services",
        "price": "$9.4480/min"
      }
    ],
    "calculator": null
  },
  "UG": {
    "name": "Uganda",
    "code": "UG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.6134/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.5439/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Uganda",
        "price": "$0.6134/min"
      },
      {
        "label": "Uganda - Mobile",
        "price": "$0.6338/min"
      },
      {
        "label": "Uganda - Mobile - Major Carriers (MTN, Airtel, Africell,Gemtel, K2 Telecom, Lycatel)",
        "price": "$0.5439/min"
      },
      {
        "label": "Uganda Special Services",
        "price": "$0.5980/min"
      },
      {
        "label": "Uganda Special Services TYPE_A",
        "price": "$0.5580/min"
      }
    ],
    "calculator": null
  },
  "ZM": {
    "name": "Zambia",
    "code": "ZM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.5756/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.7468/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Zambia",
        "price": "$0.5756/min"
      },
      {
        "label": "Zambia - Mobile",
        "price": "$0.7468/min"
      }
    ],
    "calculator": null
  },
  "ZW": {
    "name": "Zimbabwe",
    "code": "ZW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.2980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.7980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Zimbabwe",
        "price": "$0.2980/min"
      },
      {
        "label": "Zimbabwe - Mobile",
        "price": "$0.7980/min"
      },
      {
        "label": "Zimbabwe - Premium Services",
        "price": "$0.8380/min"
      }
    ],
    "calculator": null
  },
  "CG": {
    "name": "Congo",
    "code": "CG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7319/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.6789/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Congo",
        "price": "$0.7319/min"
      },
      {
        "label": "Congo - Mobile",
        "price": "$0.7867/min"
      },
      {
        "label": "Congo - Mobile - Others (MTN)",
        "price": "$0.6789/min"
      },
      {
        "label": "Congo - Mobile -Major Carriers (Airtel)",
        "price": "$0.8560/min"
      },
      {
        "label": "Congo - Premium Services",
        "price": "$1.4980/min"
      }
    ],
    "calculator": null
  },
  "AS": {
    "name": "American Samoa",
    "code": "AS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "American Samoa",
        "price": "$0.0680/min"
      }
    ],
    "calculator": null
  },
  "AU": {
    "name": "Australia",
    "code": "AU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0188/min",
        "inbound": "$0.0025/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0580/min",
        "inbound": "$0.0050/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.0450/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.50/month"
      },
      {
        "label": "Mobile Numbers",
        "price": "$5.00/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$12.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Australia",
        "price": "$0.0188/min"
      },
      {
        "label": "Australia City Group",
        "price": "$0.0188/min"
      },
      {
        "label": "Australia Mobile",
        "price": "$0.0580/min"
      },
      {
        "label": "Australia Mobile Optus Mobile",
        "price": "$0.0580/min"
      },
      {
        "label": "Australia Mobile Telstra",
        "price": "$0.0580/min"
      },
      {
        "label": "Australia Mobile Telstra Australia Via Lycatel",
        "price": "$0.0580/min"
      },
      {
        "label": "Australia Mobile Vodafone Hutchison",
        "price": "$0.0580/min"
      },
      {
        "label": "Australia Mobility Services",
        "price": "$3.4980/min"
      },
      {
        "label": "Australia Satellite Fixed Telstra",
        "price": "$3.4980/min"
      },
      {
        "label": "Australia Satellite Mobile Optus Mobile",
        "price": "$3.4980/min"
      },
      {
        "label": "Australia Satellite Mobile Telstra",
        "price": "$3.4980/min"
      },
      {
        "label": "Australia Special Services",
        "price": "$0.0400/min"
      }
    ],
    "calculator": {
      "localRate": 0.0025,
      "tollfreeRate": 0.045,
      "currencySymbol": "$"
    }
  },
  "CK": {
    "name": "Cook Islands",
    "code": "CK",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.7980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.7980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Cook Islands",
        "price": "$1.7980/min"
      },
      {
        "label": "Cook Islands Mobile",
        "price": "$1.7980/min"
      }
    ],
    "calculator": null
  },
  "FJ": {
    "name": "Fiji",
    "code": "FJ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Fiji",
        "price": "$0.4980/min"
      },
      {
        "label": "Fiji - Mobile",
        "price": "$0.4980/min"
      }
    ],
    "calculator": null
  },
  "PF": {
    "name": "French Polynesia",
    "code": "PF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.4480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "French Polynesia",
        "price": "$0.4480/min"
      },
      {
        "label": "French Polynesia Mobile",
        "price": "$0.4480/min"
      }
    ],
    "calculator": null
  },
  "GU": {
    "name": "Guam",
    "code": "GU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0340/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Guam",
        "price": "$0.0340/min"
      }
    ],
    "calculator": null
  },
  "MH": {
    "name": "Marshall Islands",
    "code": "MH",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.4980/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Marshall Islands",
        "price": "$0.4980/min"
      }
    ],
    "calculator": null
  },
  "FM": {
    "name": "Micronesia",
    "code": "FM",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.8980/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Micronesia",
        "price": "$0.8980/min"
      }
    ],
    "calculator": null
  },
  "NC": {
    "name": "New Caledonia",
    "code": "NC",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.3480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.3480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "New Caledonia",
        "price": "$0.3480/min"
      },
      {
        "label": "New Caledonia - Mobile",
        "price": "$0.3480/min"
      }
    ],
    "calculator": null
  },
  "NZ": {
    "name": "New Zealand",
    "code": "NZ",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.0190/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$0.0580/min",
        "inbound": "$0.0063/min",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "$0.2082/min",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [
      {
        "label": "Local Numbers",
        "price": "$2.55/month"
      },
      {
        "label": "Toll-Free Numbers",
        "price": "$34.00/month"
      }
    ],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "New Zealand",
        "price": "$0.0190/min"
      },
      {
        "label": "New Zealand Mobile",
        "price": "$0.0580/min"
      },
      {
        "label": "New Zealand Mobile Vodafone",
        "price": "$0.0580/min"
      }
    ],
    "calculator": {
      "localRate": 0.0063,
      "tollfreeRate": 0.2082,
      "currencySymbol": "$"
    }
  },
  "NU": {
    "name": "Niue",
    "code": "NU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.5980/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Niue",
        "price": "$2.5980/min"
      }
    ],
    "calculator": null
  },
  "NF": {
    "name": "Norfolk Island",
    "code": "NF",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [],
    "calculator": null
  },
  "PW": {
    "name": "Palau",
    "code": "PW",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$0.7980/min",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Palau",
        "price": "$0.7980/min"
      }
    ],
    "calculator": null
  },
  "PG": {
    "name": "Papua New Guinea",
    "code": "PG",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.3100/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$2.4300/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Papua New Guinea",
        "price": "$2.3100/min"
      },
      {
        "label": "Papua New Guinea - Mobile",
        "price": "$2.4300/min"
      },
      {
        "label": "Papua New Guinea - Premium Services",
        "price": "$2.5600/min"
      }
    ],
    "calculator": null
  },
  "WS": {
    "name": "Samoa",
    "code": "WS",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.9980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.8980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Western Samoa",
        "price": "$1.9980/min"
      },
      {
        "label": "Western Samoa Mobile",
        "price": "$1.8980/min"
      },
      {
        "label": "Western Samoa Mobile Digicel",
        "price": "$1.8980/min"
      }
    ],
    "calculator": null
  },
  "SB": {
    "name": "Solomon Islands",
    "code": "SB",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$1.8480/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.8980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Solomon Islands",
        "price": "$1.8480/min"
      },
      {
        "label": "Solomon Islands - Mobile",
        "price": "$1.8980/min"
      },
      {
        "label": "Solomon Islands Special Services",
        "price": "$1.8480/min"
      }
    ],
    "calculator": null
  },
  "TO": {
    "name": "Tonga",
    "code": "TO",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.8980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Tonga",
        "price": "$2.1980/min"
      },
      {
        "label": "Tonga - Mobile",
        "price": "$1.8980/min"
      }
    ],
    "calculator": null
  },
  "TV": {
    "name": "Tuvalu",
    "code": "TV",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": true
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Tuvalu",
        "price": "$2.4980/min"
      }
    ],
    "calculator": null
  },
  "VU": {
    "name": "Vanuatu",
    "code": "VU",
    "callRows": [
      {
        "label": "Local Numbers",
        "outbound": "$2.1980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": true
      },
      {
        "label": "Mobile Numbers",
        "outbound": "$1.8980/min",
        "inbound": "Not Supported",
        "startsAt": true,
        "showDetailedPricingLink": false
      },
      {
        "label": "Toll-Free Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported",
        "startsAt": false,
        "showDetailedPricingLink": false
      }
    ],
    "phoneRows": [],
    "addOnRows": [
      {
        "label": "Secure Trunking",
        "price": "$0.0000/min"
      }
    ],
    "networkRows": [
      {
        "label": "Vanuatu",
        "price": "$2.1980/min"
      },
      {
        "label": "Vanuatu - Mobile",
        "price": "$1.8980/min"
      }
    ],
    "calculator": null
  }
};
