"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type FeatureSectionId = "features" | "regulations" | "deliverability" | "verify-coverage" | "country-specs" | "pricing";

const featureSections: { id: FeatureSectionId; label: string }[] = [
  { id: "features", label: "Features" },
  { id: "regulations", label: "Regulations" },
  { id: "deliverability", label: "Deliverability" },
  { id: "verify-coverage", label: "Verify Coverage" },
  { id: "country-specs", label: "Country Specs" },
  { id: "pricing", label: "Pricing" },
];

type CoverageType = "outbound" | "inbound";
type Continent = "north-america" | "south-america" | "europe" | "asia" | "africa" | "oceania";

interface Country {
  name: string;
  code: string;
  flag: string;
  continent: Continent;
  outbound: boolean;
  inbound: boolean;
}

interface CountryDetails {
  features: {
    sendingToMobile: string;
    sendingToLandline: string;
    smsConcatenation: string;
    smsConcatenationNote?: string;
    twoWaySms: string;
    powerpack: string;
  };
  regulations: {
    senderIdRegulations: string;
  };
  deliverability: {
    deliveryReportType: string;
    deliveryReportReliability: string;
    senderIdProvisioningTime: string;
    senderIdRegistrationCharges: string;
    numericSenderIdSupported: string;
  };
  verifyCoverage: {
    servicability: string;
    sidUsed: string;
    contentMaintained: string;
  };
  countrySpecs: {
    isoCode: string;
    countryCode: string;
    mcc: string;
  };
  pricing: {
    routeType: string;
    outboundRate: string;
    inboundRate: string;
  }[];
}

const continentLabels: Record<Continent, string> = {
  "north-america": "North America",
  "south-america": "South America",
  "europe": "Europe",
  "asia": "Asia",
  "africa": "Africa",
  "oceania": "Oceania",
};

const continentOrder: Continent[] = [
  "north-america",
  "south-america",
  "europe",
  "asia",
  "africa",
  "oceania",
];

// Complete countries data from screenshots
const countries: Country[] = [
  // North America
  { name: "Anguilla", code: "AI", flag: "🇦🇮", continent: "north-america", outbound: true, inbound: true },
  { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬", continent: "north-america", outbound: true, inbound: true },
  { name: "Aruba", code: "AW", flag: "🇦🇼", continent: "north-america", outbound: true, inbound: true },
  { name: "Bahamas", code: "BS", flag: "🇧🇸", continent: "north-america", outbound: true, inbound: true },
  { name: "Barbados", code: "BB", flag: "🇧🇧", continent: "north-america", outbound: true, inbound: true },
  { name: "Belize", code: "BZ", flag: "🇧🇿", continent: "north-america", outbound: true, inbound: false },
  { name: "Bermuda", code: "BM", flag: "🇧🇲", continent: "north-america", outbound: true, inbound: true },
  { name: "Canada", code: "CA", flag: "🇨🇦", continent: "north-america", outbound: true, inbound: true },
  { name: "Cayman Islands", code: "KY", flag: "🇰🇾", continent: "north-america", outbound: true, inbound: true },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷", continent: "north-america", outbound: true, inbound: false },
  { name: "Cuba", code: "CU", flag: "🇨🇺", continent: "north-america", outbound: true, inbound: false },
  { name: "Dominica", code: "DM", flag: "🇩🇲", continent: "north-america", outbound: true, inbound: true },
  { name: "Dominican Republic", code: "DO", flag: "🇩🇴", continent: "north-america", outbound: true, inbound: false },
  { name: "El Salvador", code: "SV", flag: "🇸🇻", continent: "north-america", outbound: true, inbound: false },
  { name: "Greenland", code: "GL", flag: "🇬🇱", continent: "north-america", outbound: true, inbound: false },
  { name: "Grenada", code: "GD", flag: "🇬🇩", continent: "north-america", outbound: true, inbound: true },
  { name: "Guadeloupe & Martinique", code: "GP", flag: "🇬🇵", continent: "north-america", outbound: true, inbound: false },
  { name: "Guatemala", code: "GT", flag: "🇬🇹", continent: "north-america", outbound: true, inbound: false },
  { name: "Haiti", code: "HT", flag: "🇭🇹", continent: "north-america", outbound: true, inbound: false },
  { name: "Honduras", code: "HN", flag: "🇭🇳", continent: "north-america", outbound: true, inbound: false },
  { name: "Jamaica", code: "JM", flag: "🇯🇲", continent: "north-america", outbound: true, inbound: true },
  { name: "Mexico", code: "MX", flag: "🇲🇽", continent: "north-america", outbound: true, inbound: true },
  { name: "Montserrat", code: "MS", flag: "🇲🇸", continent: "north-america", outbound: true, inbound: true },
  { name: "Netherlands Antilles", code: "AN", flag: "🇧🇶", continent: "north-america", outbound: true, inbound: false },
  { name: "Nicaragua", code: "NI", flag: "🇳🇮", continent: "north-america", outbound: true, inbound: false },
  { name: "Northern Mariana Islands", code: "MP", flag: "🇲🇵", continent: "north-america", outbound: true, inbound: false },
  { name: "Panama", code: "PA", flag: "🇵🇦", continent: "north-america", outbound: true, inbound: false },
  { name: "Puerto Rico", code: "PR", flag: "🇵🇷", continent: "north-america", outbound: true, inbound: true },
  { name: "Saint Barthelemy", code: "BL", flag: "🇧🇱", continent: "north-america", outbound: true, inbound: false },
  { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳", continent: "north-america", outbound: true, inbound: true },
  { name: "Saint Lucia", code: "LC", flag: "🇱🇨", continent: "north-america", outbound: true, inbound: true },
  { name: "Saint Martin", code: "MF", flag: "🇲🇫", continent: "north-america", outbound: true, inbound: false },
  { name: "Saint Pierre and Miquelon", code: "PM", flag: "🇵🇲", continent: "north-america", outbound: true, inbound: false },
  { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨", continent: "north-america", outbound: true, inbound: true },
  { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹", continent: "north-america", outbound: true, inbound: true },
  { name: "Turks and Caicos Islands", code: "TC", flag: "🇹🇨", continent: "north-america", outbound: true, inbound: true },
  { name: "United States", code: "US", flag: "🇺🇸", continent: "north-america", outbound: true, inbound: true },
  { name: "United States Virgin Islands", code: "VI", flag: "🇻🇮", continent: "north-america", outbound: true, inbound: true },

  // South America
  { name: "Argentina", code: "AR", flag: "🇦🇷", continent: "south-america", outbound: true, inbound: true },
  { name: "Bolivia", code: "BO", flag: "🇧🇴", continent: "south-america", outbound: true, inbound: false },
  { name: "Brazil", code: "BR", flag: "🇧🇷", continent: "south-america", outbound: true, inbound: true },
  { name: "Chile", code: "CL", flag: "🇨🇱", continent: "south-america", outbound: true, inbound: true },
  { name: "Colombia", code: "CO", flag: "🇨🇴", continent: "south-america", outbound: true, inbound: false },
  { name: "Curacao", code: "CW", flag: "🇨🇼", continent: "south-america", outbound: true, inbound: false },
  { name: "Ecuador", code: "EC", flag: "🇪🇨", continent: "south-america", outbound: true, inbound: false },
  { name: "Falkland Islands", code: "FK", flag: "🇫🇰", continent: "south-america", outbound: true, inbound: false },
  { name: "French Guiana", code: "GF", flag: "🇬🇫", continent: "south-america", outbound: true, inbound: false },
  { name: "Guyana", code: "GY", flag: "🇬🇾", continent: "south-america", outbound: true, inbound: false },
  { name: "Paraguay", code: "PY", flag: "🇵🇾", continent: "south-america", outbound: true, inbound: false },
  { name: "Peru", code: "PE", flag: "🇵🇪", continent: "south-america", outbound: true, inbound: false },
  { name: "Suriname", code: "SR", flag: "🇸🇷", continent: "south-america", outbound: true, inbound: false },
  { name: "Uruguay", code: "UY", flag: "🇺🇾", continent: "south-america", outbound: true, inbound: false },
  { name: "Venezuela", code: "VE", flag: "🇻🇪", continent: "south-america", outbound: true, inbound: false },

  // Asia
  { name: "Afghanistan", code: "AF", flag: "🇦🇫", continent: "asia", outbound: true, inbound: false },
  { name: "Armenia", code: "AM", flag: "🇦🇲", continent: "asia", outbound: true, inbound: false },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", continent: "asia", outbound: true, inbound: false },
  { name: "Bahrain", code: "BH", flag: "🇧🇭", continent: "asia", outbound: true, inbound: false },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", continent: "asia", outbound: true, inbound: false },
  { name: "Bhutan", code: "BT", flag: "🇧🇹", continent: "asia", outbound: true, inbound: false },
  { name: "Brunei", code: "BN", flag: "🇧🇳", continent: "asia", outbound: true, inbound: false },
  { name: "Cambodia", code: "KH", flag: "🇰🇭", continent: "asia", outbound: true, inbound: false },
  { name: "China", code: "CN", flag: "🇨🇳", continent: "asia", outbound: true, inbound: false },
  { name: "Georgia", code: "GE", flag: "🇬🇪", continent: "asia", outbound: true, inbound: false },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰", continent: "asia", outbound: true, inbound: true },
  { name: "India", code: "IN", flag: "🇮🇳", continent: "asia", outbound: true, inbound: true },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", continent: "asia", outbound: true, inbound: true },
  { name: "Iran", code: "IR", flag: "🇮🇷", continent: "asia", outbound: true, inbound: false },
  { name: "Iraq", code: "IQ", flag: "🇮🇶", continent: "asia", outbound: true, inbound: false },
  { name: "Israel", code: "IL", flag: "🇮🇱", continent: "asia", outbound: true, inbound: true },
  { name: "Japan", code: "JP", flag: "🇯🇵", continent: "asia", outbound: true, inbound: true },
  { name: "Jordan", code: "JO", flag: "🇯🇴", continent: "asia", outbound: true, inbound: false },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", continent: "asia", outbound: true, inbound: false },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", continent: "asia", outbound: true, inbound: false },
  { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬", continent: "asia", outbound: true, inbound: false },
  { name: "Laos", code: "LA", flag: "🇱🇦", continent: "asia", outbound: true, inbound: false },
  { name: "Lebanon", code: "LB", flag: "🇱🇧", continent: "asia", outbound: true, inbound: false },
  { name: "Macao", code: "MO", flag: "🇲🇴", continent: "asia", outbound: true, inbound: false },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", continent: "asia", outbound: true, inbound: true },
  { name: "Maldives", code: "MV", flag: "🇲🇻", continent: "asia", outbound: true, inbound: false },
  { name: "Mongolia", code: "MN", flag: "🇲🇳", continent: "asia", outbound: true, inbound: false },
  { name: "Myanmar", code: "MM", flag: "🇲🇲", continent: "asia", outbound: true, inbound: false },
  { name: "Nepal", code: "NP", flag: "🇳🇵", continent: "asia", outbound: true, inbound: false },
  { name: "Oman", code: "OM", flag: "🇴🇲", continent: "asia", outbound: true, inbound: false },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", continent: "asia", outbound: true, inbound: false },
  { name: "Palestine", code: "PS", flag: "🇵🇸", continent: "asia", outbound: true, inbound: false },
  { name: "Philippines", code: "PH", flag: "🇵🇭", continent: "asia", outbound: true, inbound: true },
  { name: "Qatar", code: "QA", flag: "🇶🇦", continent: "asia", outbound: true, inbound: false },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", continent: "asia", outbound: true, inbound: false },
  { name: "Singapore", code: "SG", flag: "🇸🇬", continent: "asia", outbound: true, inbound: true },
  { name: "South Korea", code: "KR", flag: "🇰🇷", continent: "asia", outbound: true, inbound: true },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰", continent: "asia", outbound: true, inbound: false },
  { name: "Syria", code: "SY", flag: "🇸🇾", continent: "asia", outbound: true, inbound: false },
  { name: "Taiwan", code: "TW", flag: "🇹🇼", continent: "asia", outbound: true, inbound: false },
  { name: "Tajikistan", code: "TJ", flag: "🇹🇯", continent: "asia", outbound: true, inbound: false },
  { name: "Thailand", code: "TH", flag: "🇹🇭", continent: "asia", outbound: true, inbound: false },
  { name: "Timor-Leste", code: "TL", flag: "🇹🇱", continent: "asia", outbound: true, inbound: false },
  { name: "Turkey", code: "TR", flag: "🇹🇷", continent: "asia", outbound: true, inbound: false },
  { name: "Turkmenistan", code: "TM", flag: "🇹🇲", continent: "asia", outbound: true, inbound: false },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", continent: "asia", outbound: true, inbound: true },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿", continent: "asia", outbound: true, inbound: false },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", continent: "asia", outbound: true, inbound: false },
  { name: "Yemen", code: "YE", flag: "🇾🇪", continent: "asia", outbound: true, inbound: false },

  // Europe
  { name: "Albania", code: "AL", flag: "🇦🇱", continent: "europe", outbound: true, inbound: false },
  { name: "Andorra", code: "AD", flag: "🇦🇩", continent: "europe", outbound: true, inbound: false },
  { name: "Austria", code: "AT", flag: "🇦🇹", continent: "europe", outbound: true, inbound: true },
  { name: "Belarus", code: "BY", flag: "🇧🇾", continent: "europe", outbound: true, inbound: false },
  { name: "Belgium", code: "BE", flag: "🇧🇪", continent: "europe", outbound: true, inbound: true },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦", continent: "europe", outbound: true, inbound: false },
  { name: "British Virgin Islands", code: "VG", flag: "🇻🇬", continent: "europe", outbound: true, inbound: true },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬", continent: "europe", outbound: true, inbound: false },
  { name: "Croatia", code: "HR", flag: "🇭🇷", continent: "europe", outbound: true, inbound: true },
  { name: "Cyprus", code: "CY", flag: "🇨🇾", continent: "europe", outbound: true, inbound: false },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿", continent: "europe", outbound: true, inbound: true },
  { name: "Denmark", code: "DK", flag: "🇩🇰", continent: "europe", outbound: true, inbound: true },
  { name: "Estonia", code: "EE", flag: "🇪🇪", continent: "europe", outbound: true, inbound: true },
  { name: "Faroe Islands", code: "FO", flag: "🇫🇴", continent: "europe", outbound: true, inbound: false },
  { name: "Finland", code: "FI", flag: "🇫🇮", continent: "europe", outbound: true, inbound: true },
  { name: "France", code: "FR", flag: "🇫🇷", continent: "europe", outbound: true, inbound: true },
  { name: "Germany", code: "DE", flag: "🇩🇪", continent: "europe", outbound: true, inbound: true },
  { name: "Gibraltar", code: "GI", flag: "🇬🇮", continent: "europe", outbound: true, inbound: false },
  { name: "Greece", code: "GR", flag: "🇬🇷", continent: "europe", outbound: true, inbound: false },
  { name: "Guernsey", code: "GG", flag: "🇬🇬", continent: "europe", outbound: true, inbound: false },
  { name: "Hungary", code: "HU", flag: "🇭🇺", continent: "europe", outbound: true, inbound: true },
  { name: "Iceland", code: "IS", flag: "🇮🇸", continent: "europe", outbound: true, inbound: false },
  { name: "Ireland", code: "IE", flag: "🇮🇪", continent: "europe", outbound: true, inbound: true },
  { name: "Italy", code: "IT", flag: "🇮🇹", continent: "europe", outbound: true, inbound: true },
  { name: "Kosovo", code: "XK", flag: "🇽🇰", continent: "europe", outbound: true, inbound: false },
  { name: "Latvia", code: "LV", flag: "🇱🇻", continent: "europe", outbound: true, inbound: true },
  { name: "Liechtenstein", code: "LI", flag: "🇱🇮", continent: "europe", outbound: true, inbound: false },
  { name: "Lithuania", code: "LT", flag: "🇱🇹", continent: "europe", outbound: true, inbound: true },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺", continent: "europe", outbound: true, inbound: false },
  { name: "Macedonia", code: "MK", flag: "🇲🇰", continent: "europe", outbound: true, inbound: false },
  { name: "Malta", code: "MT", flag: "🇲🇹", continent: "europe", outbound: true, inbound: false },
  { name: "Martinique", code: "MQ", flag: "🇲🇶", continent: "europe", outbound: true, inbound: false },
  { name: "Moldova", code: "MD", flag: "🇲🇩", continent: "europe", outbound: true, inbound: false },
  { name: "Monaco", code: "MC", flag: "🇲🇨", continent: "europe", outbound: true, inbound: false },
  { name: "Montenegro", code: "ME", flag: "🇲🇪", continent: "europe", outbound: true, inbound: false },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", continent: "europe", outbound: true, inbound: true },
  { name: "Norway", code: "NO", flag: "🇳🇴", continent: "europe", outbound: true, inbound: true },
  { name: "Poland", code: "PL", flag: "🇵🇱", continent: "europe", outbound: true, inbound: true },
  { name: "Portugal", code: "PT", flag: "🇵🇹", continent: "europe", outbound: true, inbound: true },
  { name: "Romania", code: "RO", flag: "🇷🇴", continent: "europe", outbound: true, inbound: true },
  { name: "Russia", code: "RU", flag: "🇷🇺", continent: "europe", outbound: true, inbound: false },
  { name: "San Marino", code: "SM", flag: "🇸🇲", continent: "europe", outbound: true, inbound: false },
  { name: "Serbia", code: "RS", flag: "🇷🇸", continent: "europe", outbound: true, inbound: false },
  { name: "Slovakia", code: "SK", flag: "🇸🇰", continent: "europe", outbound: true, inbound: true },
  { name: "Slovenia", code: "SI", flag: "🇸🇮", continent: "europe", outbound: true, inbound: true },
  { name: "Spain", code: "ES", flag: "🇪🇸", continent: "europe", outbound: true, inbound: true },
  { name: "Sweden", code: "SE", flag: "🇸🇪", continent: "europe", outbound: true, inbound: true },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", continent: "europe", outbound: true, inbound: true },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", continent: "europe", outbound: true, inbound: false },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", continent: "europe", outbound: true, inbound: true },

  // Africa
  { name: "Algeria", code: "DZ", flag: "🇩🇿", continent: "africa", outbound: true, inbound: false },
  { name: "Angola", code: "AO", flag: "🇦🇴", continent: "africa", outbound: true, inbound: false },
  { name: "Benin", code: "BJ", flag: "🇧🇯", continent: "africa", outbound: true, inbound: false },
  { name: "Botswana", code: "BW", flag: "🇧🇼", continent: "africa", outbound: true, inbound: false },
  { name: "Burkina Faso", code: "BF", flag: "🇧🇫", continent: "africa", outbound: true, inbound: false },
  { name: "Burundi", code: "BI", flag: "🇧🇮", continent: "africa", outbound: true, inbound: false },
  { name: "Cameroon", code: "CM", flag: "🇨🇲", continent: "africa", outbound: true, inbound: false },
  { name: "Cape Verde", code: "CV", flag: "🇨🇻", continent: "africa", outbound: true, inbound: false },
  { name: "Central African Republic", code: "CF", flag: "🇨🇫", continent: "africa", outbound: true, inbound: false },
  { name: "Chad", code: "TD", flag: "🇹🇩", continent: "africa", outbound: true, inbound: false },
  { name: "Comoros", code: "KM", flag: "🇰🇲", continent: "africa", outbound: true, inbound: false },
  { name: "Congo", code: "CG", flag: "🇨🇬", continent: "africa", outbound: true, inbound: false },
  { name: "Democratic Republic Congo", code: "CD", flag: "🇨🇩", continent: "africa", outbound: true, inbound: false },
  { name: "Djibouti", code: "DJ", flag: "🇩🇯", continent: "africa", outbound: true, inbound: false },
  { name: "Egypt", code: "EG", flag: "🇪🇬", continent: "africa", outbound: true, inbound: false },
  { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶", continent: "africa", outbound: true, inbound: false },
  { name: "Eritrea", code: "ER", flag: "🇪🇷", continent: "africa", outbound: true, inbound: false },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", continent: "africa", outbound: true, inbound: false },
  { name: "Gabon", code: "GA", flag: "🇬🇦", continent: "africa", outbound: true, inbound: false },
  { name: "Gambia", code: "GM", flag: "🇬🇲", continent: "africa", outbound: true, inbound: false },
  { name: "Ghana", code: "GH", flag: "🇬🇭", continent: "africa", outbound: true, inbound: false },
  { name: "Guinea", code: "GN", flag: "🇬🇳", continent: "africa", outbound: true, inbound: false },
  { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼", continent: "africa", outbound: true, inbound: false },
  { name: "Ivory Coast", code: "CI", flag: "🇨🇮", continent: "africa", outbound: true, inbound: false },
  { name: "Kenya", code: "KE", flag: "🇰🇪", continent: "africa", outbound: true, inbound: true },
  { name: "Lesotho", code: "LS", flag: "🇱🇸", continent: "africa", outbound: true, inbound: false },
  { name: "Liberia", code: "LR", flag: "🇱🇷", continent: "africa", outbound: true, inbound: false },
  { name: "Libya", code: "LY", flag: "🇱🇾", continent: "africa", outbound: true, inbound: false },
  { name: "Madagascar", code: "MG", flag: "🇲🇬", continent: "africa", outbound: true, inbound: false },
  { name: "Malawi", code: "MW", flag: "🇲🇼", continent: "africa", outbound: true, inbound: false },
  { name: "Mali", code: "ML", flag: "🇲🇱", continent: "africa", outbound: true, inbound: false },
  { name: "Mauritania", code: "MR", flag: "🇲🇷", continent: "africa", outbound: true, inbound: false },
  { name: "Mauritius", code: "MU", flag: "🇲🇺", continent: "africa", outbound: true, inbound: false },
  { name: "Morocco", code: "MA", flag: "🇲🇦", continent: "africa", outbound: true, inbound: false },
  { name: "Mozambique", code: "MZ", flag: "🇲🇿", continent: "africa", outbound: true, inbound: false },
  { name: "Namibia", code: "NA", flag: "🇳🇦", continent: "africa", outbound: true, inbound: false },
  { name: "Niger", code: "NE", flag: "🇳🇪", continent: "africa", outbound: true, inbound: false },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", continent: "africa", outbound: true, inbound: false },
  { name: "Reunion", code: "RE", flag: "🇷🇪", continent: "africa", outbound: true, inbound: false },
  { name: "Rwanda", code: "RW", flag: "🇷🇼", continent: "africa", outbound: true, inbound: false },
  { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹", continent: "africa", outbound: true, inbound: false },
  { name: "Senegal", code: "SN", flag: "🇸🇳", continent: "africa", outbound: true, inbound: false },
  { name: "Seychelles", code: "SC", flag: "🇸🇨", continent: "africa", outbound: true, inbound: false },
  { name: "Sierra Leone", code: "SL", flag: "🇸🇱", continent: "africa", outbound: true, inbound: false },
  { name: "Somalia", code: "SO", flag: "🇸🇴", continent: "africa", outbound: true, inbound: false },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", continent: "africa", outbound: true, inbound: true },
  { name: "South Sudan", code: "SS", flag: "🇸🇸", continent: "africa", outbound: true, inbound: false },
  { name: "Sudan", code: "SD", flag: "🇸🇩", continent: "africa", outbound: true, inbound: false },
  { name: "Swaziland", code: "SZ", flag: "🇸🇿", continent: "africa", outbound: true, inbound: false },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", continent: "africa", outbound: true, inbound: false },
  { name: "Togo", code: "TG", flag: "🇹🇬", continent: "africa", outbound: true, inbound: false },
  { name: "Tunisia", code: "TN", flag: "🇹🇳", continent: "africa", outbound: true, inbound: false },
  { name: "Uganda", code: "UG", flag: "🇺🇬", continent: "africa", outbound: true, inbound: false },
  { name: "Zambia", code: "ZM", flag: "🇿🇲", continent: "africa", outbound: true, inbound: false },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼", continent: "africa", outbound: true, inbound: false },

  // Oceania
  { name: "American-Samoa", code: "AS", flag: "🇦🇸", continent: "oceania", outbound: true, inbound: false },
  { name: "Australia", code: "AU", flag: "🇦🇺", continent: "oceania", outbound: true, inbound: true },
  { name: "Cook Islands", code: "CK", flag: "🇨🇰", continent: "oceania", outbound: true, inbound: false },
  { name: "Fiji", code: "FJ", flag: "🇫🇯", continent: "oceania", outbound: true, inbound: false },
  { name: "French Polynesia", code: "PF", flag: "🇵🇫", continent: "oceania", outbound: true, inbound: false },
  { name: "Guam", code: "GU", flag: "🇬🇺", continent: "oceania", outbound: true, inbound: false },
  { name: "Marshall Islands", code: "MH", flag: "🇲🇭", continent: "oceania", outbound: true, inbound: false },
  { name: "Micronesia", code: "FM", flag: "🇫🇲", continent: "oceania", outbound: true, inbound: false },
  { name: "New Caledonia", code: "NC", flag: "🇳🇨", continent: "oceania", outbound: true, inbound: false },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", continent: "oceania", outbound: true, inbound: true },
  { name: "Niue", code: "NU", flag: "🇳🇺", continent: "oceania", outbound: true, inbound: false },
  { name: "Norfolk Island", code: "NF", flag: "🇳🇫", continent: "oceania", outbound: true, inbound: false },
  { name: "Palau", code: "PW", flag: "🇵🇼", continent: "oceania", outbound: true, inbound: false },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬", continent: "oceania", outbound: true, inbound: false },
  { name: "Samoa", code: "WS", flag: "🇼🇸", continent: "oceania", outbound: true, inbound: false },
  { name: "Solomon Islands", code: "SB", flag: "🇸🇧", continent: "oceania", outbound: true, inbound: false },
  { name: "Tonga", code: "TO", flag: "🇹🇴", continent: "oceania", outbound: true, inbound: false },
  { name: "Tuvalu", code: "TV", flag: "🇹🇻", continent: "oceania", outbound: true, inbound: false },
  { name: "Vanuatu", code: "VU", flag: "🇻🇺", continent: "oceania", outbound: true, inbound: false },
];

// Country details data
const countryDetailsData: Record<string, CountryDetails> = {
  US: {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      smsConcatenationNote: "Sprint does not support proper concatenation for P2P messages. They do support it for A2P.",
      twoWaySms: "Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdRegulations: "The originating number must be an SMS-enabled Plivo number in US/Canada or a US short code.",
    },
    deliverability: {
      deliveryReportType: "Network (Longcodes) / Handset (TF & short codes)",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "Not supported",
      senderIdRegistrationCharges: "No",
      numericSenderIdSupported: "Supported",
    },
    verifyCoverage: {
      servicability: "Very Reliable",
      sidUsed: "Does not support SID",
      contentMaintained: "Yes",
    },
    countrySpecs: {
      isoCode: "US",
      countryCode: "+ 1",
      mcc: "+ 310, 311, 316",
    },
    pricing: [
      { routeType: "Local Numbers", outboundRate: "$0.0070/sms", inboundRate: "$0.0070/sms" },
      { routeType: "Short Codes", outboundRate: "$0.0070/sms", inboundRate: "$0.0070/sms" },
      { routeType: "Toll-Free Numbers", outboundRate: "$0.0072/sms", inboundRate: "$0.0072/sms" },
    ],
  },
  CA: {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: "Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdRegulations: "The originating number must be an SMS-enabled Plivo number in US/Canada.",
    },
    deliverability: {
      deliveryReportType: "Network",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "Not supported",
      senderIdRegistrationCharges: "No",
      numericSenderIdSupported: "Supported",
    },
    verifyCoverage: {
      servicability: "Very Reliable",
      sidUsed: "Does not support SID",
      contentMaintained: "Yes",
    },
    countrySpecs: {
      isoCode: "CA",
      countryCode: "+ 1",
      mcc: "+ 302",
    },
    pricing: [
      { routeType: "Local Numbers", outboundRate: "$0.0085/sms", inboundRate: "$0.0085/sms" },
      { routeType: "Toll-Free Numbers", outboundRate: "$0.0090/sms", inboundRate: "$0.0090/sms" },
    ],
  },
  GB: {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: "Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdRegulations: "Alphanumeric Sender IDs are supported. Pre-registration not required.",
    },
    deliverability: {
      deliveryReportType: "Network",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "Instant",
      senderIdRegistrationCharges: "No",
      numericSenderIdSupported: "Supported",
    },
    verifyCoverage: {
      servicability: "Very Reliable",
      sidUsed: "Alphanumeric SID",
      contentMaintained: "Yes",
    },
    countrySpecs: {
      isoCode: "GB",
      countryCode: "+ 44",
      mcc: "+ 234, 235",
    },
    pricing: [
      { routeType: "Local Numbers", outboundRate: "$0.0450/sms", inboundRate: "$0.0080/sms" },
      { routeType: "Alphanumeric Sender ID", outboundRate: "$0.0450/sms", inboundRate: "N/A" },
    ],
  },
  IN: {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: "Limited",
      powerpack: "Not Supported",
    },
    regulations: {
      senderIdRegulations: "DLT registration required. All sender IDs must be pre-registered with TRAI.",
    },
    deliverability: {
      deliveryReportType: "Handset",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "2-5 business days",
      senderIdRegistrationCharges: "Yes",
      numericSenderIdSupported: "Not Supported",
    },
    verifyCoverage: {
      servicability: "Reliable",
      sidUsed: "Pre-registered SID only",
      contentMaintained: "Template-based",
    },
    countrySpecs: {
      isoCode: "IN",
      countryCode: "+ 91",
      mcc: "+ 404, 405",
    },
    pricing: [
      { routeType: "DLT Route", outboundRate: "$0.0025/sms", inboundRate: "$0.0025/sms" },
    ],
  },
  AU: {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: "Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdRegulations: "Alphanumeric Sender IDs are supported with pre-registration.",
    },
    deliverability: {
      deliveryReportType: "Network",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "1-2 business days",
      senderIdRegistrationCharges: "No",
      numericSenderIdSupported: "Supported",
    },
    verifyCoverage: {
      servicability: "Very Reliable",
      sidUsed: "Alphanumeric SID",
      contentMaintained: "Yes",
    },
    countrySpecs: {
      isoCode: "AU",
      countryCode: "+ 61",
      mcc: "+ 505",
    },
    pricing: [
      { routeType: "Local Numbers", outboundRate: "$0.0550/sms", inboundRate: "$0.0075/sms" },
      { routeType: "Alphanumeric Sender ID", outboundRate: "$0.0550/sms", inboundRate: "N/A" },
    ],
  },
};

// Get country details with fallback for countries without specific data
const getCountryDetails = (country: Country): CountryDetails => {
  if (countryDetailsData[country.code]) {
    return countryDetailsData[country.code];
  }

  // Default/fallback data for countries without specific details
  return {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: country.inbound ? "Supported" : "Not Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdRegulations: "Contact support for sender ID regulations in this country.",
    },
    deliverability: {
      deliveryReportType: "Network",
      deliveryReportReliability: "Reliable",
      senderIdProvisioningTime: "Varies",
      senderIdRegistrationCharges: "Varies",
      numericSenderIdSupported: "Contact support",
    },
    verifyCoverage: {
      servicability: "Reliable",
      sidUsed: "Contact support",
      contentMaintained: "Yes",
    },
    countrySpecs: {
      isoCode: country.code,
      countryCode: "Contact support",
      mcc: "Contact support",
    },
    pricing: [
      { routeType: "Standard Route", outboundRate: "Contact sales", inboundRate: country.inbound ? "Contact sales" : "N/A" },
    ],
  };
};

// Get United States as default selected country
const defaultCountry = countries.find((c) => c.code === "US") || null;

export default function CoverageTabs() {
  const [coverageType, setCoverageType] = useState<CoverageType>("outbound");
  const [activeContinent, setActiveContinent] = useState<Continent>("north-america");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry);
  const [activeFeatureSection, setActiveFeatureSection] = useState<FeatureSectionId>("features");
  const [featureSidebarStyle, setFeatureSidebarStyle] = useState<React.CSSProperties>({});
  const [isDesktopCountryOpen, setIsDesktopCountryOpen] = useState(false);
  const [isMobileCountryOpen, setIsMobileCountryOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const featureSidebarWrapperRef = useRef<HTMLDivElement>(null);
  const featureContentRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Filtered countries for dropdown search
  const searchFilteredCountries = useMemo(() => {
    const coverageFiltered = countries
      .filter((c) => (coverageType === "outbound" ? c.outbound : c.inbound))
      .sort((a, b) => a.name.localeCompare(b.name));
    if (!countrySearchQuery) return coverageFiltered;
    const q = countrySearchQuery.toLowerCase();
    return coverageFiltered.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [coverageType, countrySearchQuery]);

  // Click outside handler for country dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setIsDesktopCountryOpen(false);
        setCountrySearchQuery("");
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileCountryOpen(false);
        setCountrySearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries by coverage type and continent
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesCoverage = coverageType === "outbound" ? country.outbound : country.inbound;
      const matchesContinent = country.continent === activeContinent;
      return matchesCoverage && matchesContinent;
    });
  }, [coverageType, activeContinent]);

  // Get continents that have countries for current coverage type
  const availableContinents = useMemo(() => {
    return continentOrder.filter((continent) =>
      countries.some((country) => {
        const matchesCoverage = coverageType === "outbound" ? country.outbound : country.inbound;
        return matchesCoverage && country.continent === continent;
      })
    );
  }, [coverageType]);

  // Get country details for selected country
  const countryDetails = useMemo(() => {
    if (!selectedCountry) return null;
    return getCountryDetails(selectedCountry);
  }, [selectedCountry]);

  // Reset continent selection when coverage type changes
  const handleCoverageTypeChange = (type: CoverageType) => {
    setCoverageType(type);
    setSelectedCountry(null);
    // Keep continent if available, otherwise select first available
    if (!availableContinents.includes(activeContinent)) {
      setActiveContinent(availableContinents[0] || "north-america");
    }
  };

  // Handle sticky sidebar and scroll spy for feature sections
  useEffect(() => {
    const handleScrollAndResize = () => {
      // Scroll spy for active feature section
      const sectionElements = featureSections.map(s => ({
        id: s.id,
        element: document.getElementById(`feature-${s.id}`)
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveFeatureSection(section.id);
            break;
          }
        }
      }

      // Sticky sidebar logic (only on desktop)
      if (window.innerWidth >= 1024 && featureSidebarWrapperRef.current && featureContentRef.current) {
        const wrapperRect = featureSidebarWrapperRef.current.getBoundingClientRect();
        const contentRect = featureContentRef.current.getBoundingClientRect();
        const topThreshold = 125; // navbar + subnav height + gap

        // Check if wrapper top is above threshold AND content is still visible
        if (wrapperRect.top <= topThreshold && contentRect.bottom > 300) {
          setFeatureSidebarStyle({
            position: 'fixed',
            top: `${topThreshold}px`,
            left: `${wrapperRect.left}px`,
            width: '220px',
          });
        } else {
          setFeatureSidebarStyle({});
        }
      } else {
        setFeatureSidebarStyle({});
      }
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [selectedCountry]);

  const scrollToFeatureSection = (id: FeatureSectionId) => {
    const element = document.getElementById(`feature-${id}`);
    if (element) {
      const offset = 130; // Account for fixed headers
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-12 lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
            Global SMS Coverage
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our comprehensive SMS coverage across 220+ countries with direct carrier connections.
          </p>
        </div>

        {/* Primary Tabs: Outbound / Inbound */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-white border border-gray-200 p-1">
            <button
              onClick={() => handleCoverageTypeChange("outbound")}
              className={cn(
                "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                coverageType === "outbound"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              )}
            >
              Outbound SMS
            </button>
            <button
              onClick={() => handleCoverageTypeChange("inbound")}
              className={cn(
                "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                coverageType === "inbound"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              )}
            >
              Inbound SMS
            </button>
          </div>
        </div>

        {/* Countries Grid with Continent Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          {/* Continent Tabs */}
          <div className="flex flex-wrap border-b border-gray-200">
            {availableContinents.map((continent) => (
              <button
                key={continent}
                onClick={() => {
                  setActiveContinent(continent);
                  setSelectedCountry(null);
                }}
                className={cn(
                  "px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all -mb-[1px]",
                  activeContinent === continent
                    ? "text-black border-b-4 border-[#323dfe]"
                    : "text-gray-600 border-b-4 border-transparent hover:text-black hover:bg-gray-50"
                )}
              >
                {continentLabels[continent]}
              </button>
            ))}
          </div>

          {/* Countries */}
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-5">
              Select to view features and capabilities
            </p>
            {filteredCountries.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country)}
                    className={cn(
                      "flex items-center gap-2 py-1.5 px-2 rounded text-left transition-all",
                      selectedCountry?.code === country.code
                        ? "bg-gray-100 ring-1 ring-gray-900"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <span className="text-lg flex-shrink-0">{country.flag}</span>
                    <span className="text-sm font-normal text-black truncate">
                      {country.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No countries available for {coverageType} SMS in {continentLabels[activeContinent]}.
              </div>
            )}
          </div>
        </div>

        {/* Country Details - Two Column Layout */}
        {selectedCountry && countryDetails && (
          <div className="mt-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8 lg:items-start">
            {/* Left Sidebar Wrapper */}
            <div ref={featureSidebarWrapperRef} className="mb-6 lg:mb-0 hidden lg:block">
              <aside
                className="bg-white z-30"
                style={featureSidebarStyle}
              >
                {/* Country Selector */}
                <div className="relative mb-6" ref={desktopDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
                  <button
                    onClick={() => { setIsDesktopCountryOpen(!isDesktopCountryOpen); setCountrySearchQuery(""); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">{selectedCountry.name}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", isDesktopCountryOpen && "rotate-180")} />
                  </button>

                  {isDesktopCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto">
                        {searchFilteredCountries.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => {
                              setSelectedCountry(c);
                              setActiveContinent(c.continent);
                              setIsDesktopCountryOpen(false);
                              setCountrySearchQuery("");
                            }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                              selectedCountry?.code === c.code && "bg-[#323dfe]/5"
                            )}
                          >
                            <span className="text-xl">{c.flag}</span>
                            <span className="text-sm text-gray-900">{c.name}</span>
                          </button>
                        ))}
                        {searchFilteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Navigation */}
                <nav>
                  <p className="text-sm font-medium text-gray-700 mb-3">Jump to section</p>
                  <ul className="space-y-1">
                    {featureSections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToFeatureSection(section.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                            activeFeatureSection === section.id
                              ? "border-[#323dfe] text-[#323dfe] font-medium"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
                          )}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            </div>

            {/* Right Content */}
            <div ref={featureContentRef} className="min-w-0">
              {/* Mobile Country Selector */}
              <div className="lg:hidden mb-4" ref={mobileDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
                <div className="relative">
                  <button
                    onClick={() => { setIsMobileCountryOpen(!isMobileCountryOpen); setCountrySearchQuery(""); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">{selectedCountry.name}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform flex-shrink-0", isMobileCountryOpen && "rotate-180")} />
                  </button>

                  {isMobileCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto">
                        {searchFilteredCountries.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => {
                              setSelectedCountry(c);
                              setActiveContinent(c.continent);
                              setIsMobileCountryOpen(false);
                              setCountrySearchQuery("");
                            }}
                            className={cn(
                              "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                              selectedCountry?.code === c.code && "bg-[#323dfe]/5"
                            )}
                          >
                            <span className="text-xl">{c.flag}</span>
                            <span className="text-sm text-gray-900">{c.name}</span>
                          </button>
                        ))}
                        {searchFilteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section Title */}
              <h3 className="text-xl font-semibold text-black mb-6">
                SMS Features and Capabilities in {selectedCountry.name}
              </h3>

              {/* Features Section */}
              <div id="feature-features" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Features</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Sending SMS to Mobile Numbers</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.sendingToMobile}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sending SMS to Landline Numbers</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.sendingToLandline}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">SMS Concatenation</td>
                        <td className="py-3 text-sm font-medium text-black">
                          {countryDetails.features.smsConcatenation}
                          {countryDetails.features.smsConcatenationNote && (
                            <p className="text-xs text-gray-500 mt-1">{countryDetails.features.smsConcatenationNote}</p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Two-Way SMS</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.twoWaySms}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Powerpack</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.features.powerpack}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Regulations Section */}
              <div id="feature-regulations" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Regulations</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Sender IDs Regulations</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.senderIdRegulations}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deliverability Section */}
              <div id="feature-deliverability" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Deliverability</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Delivery Report Type and Origin</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.deliveryReportType}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Delivery Report Reliability</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.deliveryReportReliability}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sender IDs Provisioning Time</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.senderIdProvisioningTime}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sender IDs Registration Charges</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.senderIdRegistrationCharges}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Numeric Sender IDs supported?</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.deliverability.numericSenderIdSupported}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verify Coverage Section */}
              <div id="feature-verify-coverage" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Verify Coverage</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Servicability</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.verifyCoverage.servicability}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">SID Used</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.verifyCoverage.sidUsed}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Content maintained</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.verifyCoverage.contentMaintained}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Country Specs Section */}
              <div id="feature-country-specs" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Country Specs</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 pr-4 text-left text-sm font-semibold text-black">ISO Code</th>
                        <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Country Code</th>
                        <th className="py-3 text-left text-sm font-semibold text-black">MCC (Mobile Country Code)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 pr-4 text-sm font-medium text-black">{countryDetails.countrySpecs.isoCode}</td>
                        <td className="py-3 pr-4 text-sm font-medium text-black">{countryDetails.countrySpecs.countryCode}</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.countrySpecs.mcc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pricing Section */}
              <div id="feature-pricing" className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-2">Pricing</h4>
                <p className="text-xs text-gray-500 mb-4">*Additional carrier charges may apply to outbound & inbound SMS rates.</p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Route Type</th>
                        <th className="py-3 pr-4 text-left text-sm font-semibold text-black">To send SMS (Outbound)</th>
                        <th className="py-3 text-left text-sm font-semibold text-black">To receive SMS (Inbound)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {countryDetails.pricing.map((row, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-4 text-sm text-gray-900">{row.routeType}</td>
                          <td className="py-3 pr-4 text-sm font-medium text-black">{row.outboundRate}</td>
                          <td className="py-3 text-sm font-medium text-black">{row.inboundRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Rates are subject to change. Contact sales for volume discounts and enterprise pricing.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
