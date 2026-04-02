// Static WhatsApp Call pricing data sourced from the live Plivo pricing page on April 1, 2026.
// Sources:
// - https://www.plivo.com/whatsapp-call/pricing/in/
// - https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYIs5NmkcMiH9cFl_wv8VPogqDbQIO6X3Sx0yEEr-FqcANPw5Dm4U77sqfyMk80stTyW5l2WubBSo/pub?gid=1923183027&single=true&output=csv

import { getFlagEmoji, type CountryListItem } from "@/data/pricing-data";

export interface WhatsAppCallRateValue {
  value: number;
  currency: "USD" | "INR";
}

export interface WhatsAppCallPricingValue {
  inbound: WhatsAppCallRateValue;
  outbound: WhatsAppCallRateValue;
}

export interface WhatsAppCallCountry extends CountryListItem {
  pricing: WhatsAppCallPricingValue;
}

export interface WhatsAppCallPhoneRate {
  label: string;
  price: string;
}

export interface WhatsAppCallAddOnChild {
  label: string;
  price: string;
}

export interface WhatsAppCallAddOnRow {
  label: string;
  price?: string;
  badge?: string;
  children?: WhatsAppCallAddOnChild[];
}

export interface WhatsAppCallPricingFaq {
  question: string;
  answer: string;
}

export const WHATSAPP_CALL_DEFAULT_COUNTRY_CODE = "US";
export const WHATSAPP_CALL_PLATFORM_FEE = "$0.00080";
export const WHATSAPP_CALL_PLATFORM_FEE_UNIT = "conversation";
export const WHATSAPP_CALL_PRIORITY_CODES = ["IN", "US", "CA", "GB", "AU", "FR"] as const;

const WHATSAPP_CALL_PRIORITY_CODE_SET = new Set<string>(WHATSAPP_CALL_PRIORITY_CODES);

export const WHATSAPP_CALL_PAGE_COPY = {
  title: "WhatsApp Call Pricing",
  subtitle: "Simplified pricing for all WhatsApp calling conversations",
  metaFeeTitle: "Meta Fee",
  metaFeeDescription:
    "Meta charges a fee per conversation at rates that depend on the type of conversation.",
  metaFeeCtaLabel: "Visit Meta's website for details",
  metaFeeCtaHref: "https://developers.facebook.com/docs/whatsapp/pricing",
  platformFeeTitle: "Plivo Platform Fee",
  platformFeeDescription: "Pay per conversation, not per message.",
  platformFeeFootnote:
    "One fee for any conversation, anywhere, with no extra charge for media messages.",
  countrySelectorLabel: "Select Country",
  sectionNavLabel: "Jump to section",
  callingSectionTitle: "WhatsApp Calling",
  phoneNumbersTitle: "Phone Numbers",
  addOnsTitle: "Add-On Services",
  volumeCtaTitle: "Our volume-based discounts offer significant savings",
  volumeCtaLabel: "Get Volume Pricing",
  volumeCtaHref: "https://console.plivo.com/accounts/request-trial/",
  recordingStorageSupportHref:
    "https://support.plivo.com/hc/en-us/articles/20048101619353-Does-Plivo-charge-for-recording-storage",
} as const;

export const WHATSAPP_CALL_PRICING_FAQS: WhatsAppCallPricingFaq[] = [
  {
    question: "What is the 24-hour customer service window on WhatsApp?",
    answer:
      "When a customer messages or calls your business on WhatsApp, a 24-hour customer service window begins. During this period, your business can freely send messages, replies, and follow-ups without using pre-approved templates. Once the window ends, you can only send template messages unless the customer messages or calls you again.",
  },
  {
    question:
      "How does WhatsApp Calling affect the 24-hour customer service window?",
    answer:
      "With the new WhatsApp Calling API, the 24-hour customer service window now starts or refreshes not only when a user messages your business, but also when they call you - whether you answer or not. It also refreshes when a user accepts your call. Every call now extends your ability to engage customers via chat for 24 hours, letting you offer faster follow-ups, confirmations, and support - all within WhatsApp.",
  },
];

export const WHATSAPP_CALL_PHONE_NUMBER_RATES: Record<
  string,
  WhatsAppCallPhoneRate[]
> = {
  IN: [{ label: "Local Numbers", price: "₹250.00/month" }],
  US: [
    { label: "Local Numbers", price: "$0.50/month" },
    { label: "Toll-Free Numbers", price: "$1.00/month" },
  ],
  CA: [
    { label: "Local Numbers", price: "$0.75/month" },
    { label: "Toll-Free Numbers", price: "$1.00/month" },
  ],
  AE: [{ label: "Toll-Free Numbers", price: "$50.00/month" }],
  BR: [
    { label: "Local Numbers", price: "$6.17/month" },
    { label: "Toll-Free Numbers", price: "$30.00/month" },
  ],
  AU: [
    { label: "Local Numbers", price: "$1.50/month" },
    { label: "Toll-Free Numbers", price: "$12.00/month" },
    { label: "Mobile Numbers", price: "$3.00/month" },
  ],
  NZ: [
    { label: "Local Numbers", price: "$2.55/month" },
    { label: "Toll-Free Numbers", price: "$34.00/month" },
  ],
  GB: [
    { label: "Local Numbers", price: "$0.55/month" },
    { label: "Mobile Numbers", price: "$0.85/month" },
  ],
  SG: [{ label: "Local Numbers", price: "$16.00/month" }],
};

export const WHATSAPP_CALL_ADD_ONS_USD_NOTE =
  "*Free recording storage available for 90 days. Recording storage is charged at $0.0004 per minute per month thereafter.";

export const WHATSAPP_CALL_ADD_ONS_INR_NOTE =
  "* Free for 90 days. $0.0004/min per month afterwards.";

export const WHATSAPP_CALL_ADD_ONS_USD: WhatsAppCallAddOnRow[] = [
  { label: "Answering Machine Detection", price: "$0.0000/min" },
  {
    label: "Call Insights",
    badge: "Beta",
    children: [
      { label: "Basic", price: "$0.0000/min" },
      { label: "Premium", price: "$0.0025/min" },
    ],
  },
  { label: "Call Recording", price: "$0.0000/min" },
  { label: "Recording Storage *", price: "$0.0000/min" },
  { label: "Automatic Speech Recognition", price: "$0.02/ 15 seconds" },
  { label: "Call Transcription", price: "$0.0095/min" },
  { label: "Conference Calls", price: "$0.0000/min" },
  { label: "Multilingual Text to Speech", price: "$0.0000/min" },
  { label: "CNAM Lookup", price: "$0.00500/lookup" },
];

export const WHATSAPP_CALL_ADD_ONS_INR: WhatsAppCallAddOnRow[] = [
  { label: "Answering Machine Detection", price: "₹0.0000/min" },
  {
    label: "Call Insights",
    badge: "Beta",
    children: [
      { label: "Basic", price: "₹0.0000/min" },
      { label: "Premium", price: "₹0.22/min" },
    ],
  },
  { label: "Call Recording", price: "₹0.0000/min" },
  { label: "Recording Storage *", price: "₹0.0000/min" },
  { label: "Automatic Speech Recognition", price: "₹1.7/ 15 seconds" },
  { label: "Call Transcription", price: "₹0.81/min" },
  { label: "Conference Calls", price: "₹0.0000/min" },
  { label: "Multilingual Text to Speech", price: "₹0.0000/min" },
];

const WHATSAPP_CALL_MASTER_COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "\u00c5land Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "VG", name: "British Virgin Islands" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "BQ", name: "Caribbean Netherlands" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Cura\u00e7ao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "CD", name: "DR Congo" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern and Antarctic Lands" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "CI", name: "Ivory Coast" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "XK", name: "Kosovo" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macau" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "KP", name: "North Korea" },
  { code: "MK", name: "North Macedonia" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn Islands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "CG", name: "Republic of the Congo (Brazzaville)" },
  { code: "RE", name: "R\u00e9union" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barth\u00e9lemy" },
  { code: "SH", name: "Saint Helena Ascension and Tristan da Cunha" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "S\u00e3o Tom\u00e9 and Pr\u00edncipe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia" },
  { code: "KR", name: "South Korea" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "VI", name: "United States Virgin Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VA", name: "Vatican City" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
] as const;

const WHATSAPP_CALL_PRICING_BY_CODE = {
  AF: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  AL: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  DZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  AO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  AR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01359, currency: "USD" } },
  AM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  AU: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  AT: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  AZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  BH: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  BD: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  BY: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  BE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  BJ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  BO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  BW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  BR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01422, currency: "USD" } },
  BG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  BF: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  BI: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  KH: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  CM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  CA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.016, currency: "USD" } },
  TD: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  CL: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01539, currency: "USD" } },
  CN: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  CO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01449, currency: "USD" } },
  CR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  HR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  CZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  DK: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  DO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  EC: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  EG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  SV: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  ER: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  ET: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  FI: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  FR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01341, currency: "USD" } },
  GA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  GM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  GE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  DE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  GH: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  GR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  GT: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  GW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  HT: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  HN: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  HK: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  HU: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  IN: { inbound: { value: 0.45, currency: "INR" }, outbound: { value: 0.75, currency: "INR" } },
  ID: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.02628, currency: "USD" } },
  IQ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  IE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  IL: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  IT: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01539, currency: "USD" } },
  CI: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  JM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  JP: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  JO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  KE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  KW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  LA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  LV: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  LB: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  LS: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  LR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  LY: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  LT: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  MG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  MW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  MY: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01422, currency: "USD" } },
  ML: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  MR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  MX: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01296, currency: "USD" } },
  MD: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  MN: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  MA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  MZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  NA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  NP: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  NL: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01017, currency: "USD" } },
  NZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  NI: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  NE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  NG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  MK: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  NO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  OM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  PK: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01521, currency: "USD" } },
  PA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  PG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  PY: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  PE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01539, currency: "USD" } },
  PH: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  PL: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  PT: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  PR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  QA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  CG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  RO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  RU: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01323, currency: "USD" } },
  RW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  SA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  SN: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  RS: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  SL: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  SG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  SK: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  SI: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  SO: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  ZA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01422, currency: "USD" } },
  SS: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  ES: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01611, currency: "USD" } },
  LK: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  SD: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  SZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  SE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  CH: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  TW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  TJ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  TZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  TH: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  TG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  TN: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  TR: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01422, currency: "USD" } },
  TM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  UG: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  UA: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01305, currency: "USD" } },
  AE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  GB: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01341, currency: "USD" } },
  US: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.016, currency: "USD" } },
  UY: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  UZ: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  VE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01494, currency: "USD" } },
  VN: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01476, currency: "USD" } },
  YE: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01593, currency: "USD" } },
  ZM: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
  ZW: { inbound: { value: 0.004, currency: "USD" }, outbound: { value: 0.01377, currency: "USD" } },
} as const;

const WHATSAPP_CALL_FALLBACK_PRICING = {
  inbound: { value: 0.004, currency: "USD" },
  outbound: { value: 0.01638, currency: "USD" },
} as const;

export const WHATSAPP_CALL_COUNTRIES = WHATSAPP_CALL_MASTER_COUNTRIES.map(
  (country) => ({
    ...country,
    flag: getFlagEmoji(country.code),
    isPriority: WHATSAPP_CALL_PRIORITY_CODE_SET.has(country.code),
    pricing:
      WHATSAPP_CALL_PRICING_BY_CODE[
        country.code as keyof typeof WHATSAPP_CALL_PRICING_BY_CODE
      ] ?? WHATSAPP_CALL_FALLBACK_PRICING,
  }),
).sort((left, right) => {
  if (left.isPriority && !right.isPriority) return -1;
  if (!left.isPriority && right.isPriority) return 1;
  if (left.isPriority && right.isPriority) {
    return (
      WHATSAPP_CALL_PRIORITY_CODES.indexOf(
        left.code as (typeof WHATSAPP_CALL_PRIORITY_CODES)[number],
      ) -
      WHATSAPP_CALL_PRIORITY_CODES.indexOf(
        right.code as (typeof WHATSAPP_CALL_PRIORITY_CODES)[number],
      )
    );
  }
  return left.name.localeCompare(right.name);
}) as WhatsAppCallCountry[];

export const WHATSAPP_CALL_COUNTRY_CODES = WHATSAPP_CALL_COUNTRIES.map(
  (country) => country.code,
);

export const WHATSAPP_CALL_COUNTRY_NAME_BY_CODE = Object.fromEntries(
  WHATSAPP_CALL_COUNTRIES.map((country) => [country.code, country.name]),
) as Record<string, string>;

export const WHATSAPP_CALL_COUNTRY_BY_CODE = Object.fromEntries(
  WHATSAPP_CALL_COUNTRIES.map((country) => [country.code, country]),
) as Record<string, WhatsAppCallCountry>;

export function getWhatsAppCallCountry(
  code?: string | null,
): WhatsAppCallCountry | null {
  if (!code) return null;
  return WHATSAPP_CALL_COUNTRY_BY_CODE[code.toUpperCase()] ?? null;
}

export function formatWhatsAppCallRate(rate: WhatsAppCallRateValue): string {
  const symbol = rate.currency === "INR" ? "₹" : "$";
  const decimals = rate.currency === "INR" ? 2 : 4;
  return `${symbol}${rate.value.toFixed(decimals)}/min`;
}

export function getWhatsAppCallPhoneRates(code?: string | null) {
  if (!code) return null;
  return WHATSAPP_CALL_PHONE_NUMBER_RATES[code.toUpperCase()] ?? null;
}

export function getWhatsAppCallAddOns(code?: string | null) {
  return code?.toUpperCase() === "IN"
    ? WHATSAPP_CALL_ADD_ONS_INR
    : WHATSAPP_CALL_ADD_ONS_USD;
}

export function getWhatsAppCallPricingMeta(countryCode?: string | null) {
  const country = getWhatsAppCallCountry(countryCode);
  const description =
    "Get transparent WhatsApp Call pricing with no hidden fees. Plivo passes on Meta's official rates for messaging and offers AI-driven customer engagement on a pay-as-you-go basis - ensuring cost-effective, scalable interactions.";

  if (!country) {
    return {
      title: "WhatsApp Business Call Pricing | Simple & Transparent Rates",
      description,
      countryName: null,
    };
  }

  return {
    title: `WhatsApp Business Call Pricing for ${country.name} | Simple & Transparent Rates`,
    description,
    countryName: country.name,
  };
}
