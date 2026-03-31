"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { useCountryPricing } from "@/hooks/useCountryPricing";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import type { PhoneNumberInfo, SMSRateRow } from "@/hooks/useCountryPricing";
import { xlsxCoverageData } from "@/data/sms-coverage-data";

type FeatureSectionId = "number-types" | "features" | "regulations" | "deliverability" | "verify-coverage" | "country-specs" | "pricing";

const featureSections: { id: FeatureSectionId; label: string }[] = [
  { id: "number-types", label: "Number Types" },
  { id: "features", label: "Features" },
  { id: "regulations", label: "Regulations" },
  { id: "deliverability", label: "Deliverability" },
  { id: "verify-coverage", label: "Verify Coverage" },
  { id: "country-specs", label: "Country Specs" },
  { id: "pricing", label: "Pricing" },
];

type CoverageType = "outbound" | "inbound";
type Continent = "north-america" | "south-america" | "europe" | "asia" | "africa" | "oceania";

// Popular countries shown at the top of dropdown selectors
const PRIORITY_COUNTRY_CODES = ["US", "IN", "CA", "GB", "AU"];

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
    senderIdType: string;
    senderIdRegulations: string;
    registrationRequirements: string;
    contentRestrictions: string;
    consentRequirements: string;
    optOutRequirements: string;
    complianceNotes: string;
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
  { name: "Anguilla", code: "AI", flag: "\u{1F1E6}\u{1F1EE}", continent: "north-america", outbound: true, inbound: true },
  { name: "Antigua and Barbuda", code: "AG", flag: "\u{1F1E6}\u{1F1EC}", continent: "north-america", outbound: true, inbound: true },
  { name: "Aruba", code: "AW", flag: "\u{1F1E6}\u{1F1FC}", continent: "north-america", outbound: true, inbound: true },
  { name: "Bahamas", code: "BS", flag: "\u{1F1E7}\u{1F1F8}", continent: "north-america", outbound: true, inbound: true },
  { name: "Barbados", code: "BB", flag: "\u{1F1E7}\u{1F1E7}", continent: "north-america", outbound: true, inbound: true },
  { name: "Belize", code: "BZ", flag: "\u{1F1E7}\u{1F1FF}", continent: "north-america", outbound: true, inbound: false },
  { name: "Bermuda", code: "BM", flag: "\u{1F1E7}\u{1F1F2}", continent: "north-america", outbound: true, inbound: true },
  { name: "Canada", code: "CA", flag: "\u{1F1E8}\u{1F1E6}", continent: "north-america", outbound: true, inbound: true },
  { name: "Cayman Islands", code: "KY", flag: "\u{1F1F0}\u{1F1FE}", continent: "north-america", outbound: true, inbound: true },
  { name: "Costa Rica", code: "CR", flag: "\u{1F1E8}\u{1F1F7}", continent: "north-america", outbound: true, inbound: false },
  { name: "Cuba", code: "CU", flag: "\u{1F1E8}\u{1F1FA}", continent: "north-america", outbound: true, inbound: false },
  { name: "Dominica", code: "DM", flag: "\u{1F1E9}\u{1F1F2}", continent: "north-america", outbound: true, inbound: true },
  { name: "Dominican Republic", code: "DO", flag: "\u{1F1E9}\u{1F1F4}", continent: "north-america", outbound: true, inbound: false },
  { name: "El Salvador", code: "SV", flag: "\u{1F1F8}\u{1F1FB}", continent: "north-america", outbound: true, inbound: false },
  { name: "Greenland", code: "GL", flag: "\u{1F1EC}\u{1F1F1}", continent: "north-america", outbound: true, inbound: false },
  { name: "Grenada", code: "GD", flag: "\u{1F1EC}\u{1F1E9}", continent: "north-america", outbound: true, inbound: true },
  { name: "Guadeloupe & Martinique", code: "GP", flag: "\u{1F1EC}\u{1F1F5}", continent: "north-america", outbound: true, inbound: false },
  { name: "Guatemala", code: "GT", flag: "\u{1F1EC}\u{1F1F9}", continent: "north-america", outbound: true, inbound: false },
  { name: "Haiti", code: "HT", flag: "\u{1F1ED}\u{1F1F9}", continent: "north-america", outbound: true, inbound: false },
  { name: "Honduras", code: "HN", flag: "\u{1F1ED}\u{1F1F3}", continent: "north-america", outbound: true, inbound: false },
  { name: "Jamaica", code: "JM", flag: "\u{1F1EF}\u{1F1F2}", continent: "north-america", outbound: true, inbound: true },
  { name: "Mexico", code: "MX", flag: "\u{1F1F2}\u{1F1FD}", continent: "north-america", outbound: true, inbound: true },
  { name: "Montserrat", code: "MS", flag: "\u{1F1F2}\u{1F1F8}", continent: "north-america", outbound: true, inbound: true },
  { name: "Netherlands Antilles", code: "AN", flag: "\u{1F1E7}\u{1F1F6}", continent: "north-america", outbound: true, inbound: false },
  { name: "Nicaragua", code: "NI", flag: "\u{1F1F3}\u{1F1EE}", continent: "north-america", outbound: true, inbound: false },
  { name: "Northern Mariana Islands", code: "MP", flag: "\u{1F1F2}\u{1F1F5}", continent: "north-america", outbound: true, inbound: false },
  { name: "Panama", code: "PA", flag: "\u{1F1F5}\u{1F1E6}", continent: "north-america", outbound: true, inbound: false },
  { name: "Puerto Rico", code: "PR", flag: "\u{1F1F5}\u{1F1F7}", continent: "north-america", outbound: true, inbound: true },
  { name: "Saint Barthelemy", code: "BL", flag: "\u{1F1E7}\u{1F1F1}", continent: "north-america", outbound: true, inbound: false },
  { name: "Saint Kitts and Nevis", code: "KN", flag: "\u{1F1F0}\u{1F1F3}", continent: "north-america", outbound: true, inbound: true },
  { name: "Saint Lucia", code: "LC", flag: "\u{1F1F1}\u{1F1E8}", continent: "north-america", outbound: true, inbound: true },
  { name: "Saint Martin", code: "MF", flag: "\u{1F1F2}\u{1F1EB}", continent: "north-america", outbound: true, inbound: false },
  { name: "Saint Pierre and Miquelon", code: "PM", flag: "\u{1F1F5}\u{1F1F2}", continent: "north-america", outbound: true, inbound: false },
  { name: "Saint Vincent and the Grenadines", code: "VC", flag: "\u{1F1FB}\u{1F1E8}", continent: "north-america", outbound: true, inbound: true },
  { name: "Trinidad and Tobago", code: "TT", flag: "\u{1F1F9}\u{1F1F9}", continent: "north-america", outbound: true, inbound: true },
  { name: "Turks and Caicos Islands", code: "TC", flag: "\u{1F1F9}\u{1F1E8}", continent: "north-america", outbound: true, inbound: true },
  { name: "United States", code: "US", flag: "\u{1F1FA}\u{1F1F8}", continent: "north-america", outbound: true, inbound: true },
  { name: "United States Virgin Islands", code: "VI", flag: "\u{1F1FB}\u{1F1EE}", continent: "north-america", outbound: true, inbound: true },

  // South America
  { name: "Argentina", code: "AR", flag: "\u{1F1E6}\u{1F1F7}", continent: "south-america", outbound: true, inbound: true },
  { name: "Bolivia", code: "BO", flag: "\u{1F1E7}\u{1F1F4}", continent: "south-america", outbound: true, inbound: false },
  { name: "Brazil", code: "BR", flag: "\u{1F1E7}\u{1F1F7}", continent: "south-america", outbound: true, inbound: true },
  { name: "Chile", code: "CL", flag: "\u{1F1E8}\u{1F1F1}", continent: "south-america", outbound: true, inbound: true },
  { name: "Colombia", code: "CO", flag: "\u{1F1E8}\u{1F1F4}", continent: "south-america", outbound: true, inbound: false },
  { name: "Curacao", code: "CW", flag: "\u{1F1E8}\u{1F1FC}", continent: "south-america", outbound: true, inbound: false },
  { name: "Ecuador", code: "EC", flag: "\u{1F1EA}\u{1F1E8}", continent: "south-america", outbound: true, inbound: false },
  { name: "Falkland Islands", code: "FK", flag: "\u{1F1EB}\u{1F1F0}", continent: "south-america", outbound: true, inbound: false },
  { name: "French Guiana", code: "GF", flag: "\u{1F1EC}\u{1F1EB}", continent: "south-america", outbound: true, inbound: false },
  { name: "Guyana", code: "GY", flag: "\u{1F1EC}\u{1F1FE}", continent: "south-america", outbound: true, inbound: false },
  { name: "Paraguay", code: "PY", flag: "\u{1F1F5}\u{1F1FE}", continent: "south-america", outbound: true, inbound: false },
  { name: "Peru", code: "PE", flag: "\u{1F1F5}\u{1F1EA}", continent: "south-america", outbound: true, inbound: false },
  { name: "Suriname", code: "SR", flag: "\u{1F1F8}\u{1F1F7}", continent: "south-america", outbound: true, inbound: false },
  { name: "Uruguay", code: "UY", flag: "\u{1F1FA}\u{1F1FE}", continent: "south-america", outbound: true, inbound: false },
  { name: "Venezuela", code: "VE", flag: "\u{1F1FB}\u{1F1EA}", continent: "south-america", outbound: true, inbound: false },

  // Asia
  { name: "Afghanistan", code: "AF", flag: "\u{1F1E6}\u{1F1EB}", continent: "asia", outbound: true, inbound: false },
  { name: "Armenia", code: "AM", flag: "\u{1F1E6}\u{1F1F2}", continent: "asia", outbound: true, inbound: false },
  { name: "Azerbaijan", code: "AZ", flag: "\u{1F1E6}\u{1F1FF}", continent: "asia", outbound: true, inbound: false },
  { name: "Bahrain", code: "BH", flag: "\u{1F1E7}\u{1F1ED}", continent: "asia", outbound: true, inbound: false },
  { name: "Bangladesh", code: "BD", flag: "\u{1F1E7}\u{1F1E9}", continent: "asia", outbound: true, inbound: false },
  { name: "Bhutan", code: "BT", flag: "\u{1F1E7}\u{1F1F9}", continent: "asia", outbound: true, inbound: false },
  { name: "Brunei", code: "BN", flag: "\u{1F1E7}\u{1F1F3}", continent: "asia", outbound: true, inbound: false },
  { name: "Cambodia", code: "KH", flag: "\u{1F1F0}\u{1F1ED}", continent: "asia", outbound: true, inbound: false },
  { name: "China", code: "CN", flag: "\u{1F1E8}\u{1F1F3}", continent: "asia", outbound: true, inbound: false },
  { name: "Georgia", code: "GE", flag: "\u{1F1EC}\u{1F1EA}", continent: "asia", outbound: true, inbound: false },
  { name: "Hong Kong", code: "HK", flag: "\u{1F1ED}\u{1F1F0}", continent: "asia", outbound: true, inbound: true },
  { name: "India", code: "IN", flag: "\u{1F1EE}\u{1F1F3}", continent: "asia", outbound: true, inbound: true },
  { name: "Indonesia", code: "ID", flag: "\u{1F1EE}\u{1F1E9}", continent: "asia", outbound: true, inbound: true },
  { name: "Iran", code: "IR", flag: "\u{1F1EE}\u{1F1F7}", continent: "asia", outbound: true, inbound: false },
  { name: "Iraq", code: "IQ", flag: "\u{1F1EE}\u{1F1F6}", continent: "asia", outbound: true, inbound: false },
  { name: "Israel", code: "IL", flag: "\u{1F1EE}\u{1F1F1}", continent: "asia", outbound: true, inbound: true },
  { name: "Japan", code: "JP", flag: "\u{1F1EF}\u{1F1F5}", continent: "asia", outbound: true, inbound: true },
  { name: "Jordan", code: "JO", flag: "\u{1F1EF}\u{1F1F4}", continent: "asia", outbound: true, inbound: false },
  { name: "Kazakhstan", code: "KZ", flag: "\u{1F1F0}\u{1F1FF}", continent: "asia", outbound: true, inbound: false },
  { name: "Kuwait", code: "KW", flag: "\u{1F1F0}\u{1F1FC}", continent: "asia", outbound: true, inbound: false },
  { name: "Kyrgyzstan", code: "KG", flag: "\u{1F1F0}\u{1F1EC}", continent: "asia", outbound: true, inbound: false },
  { name: "Laos", code: "LA", flag: "\u{1F1F1}\u{1F1E6}", continent: "asia", outbound: true, inbound: false },
  { name: "Lebanon", code: "LB", flag: "\u{1F1F1}\u{1F1E7}", continent: "asia", outbound: true, inbound: false },
  { name: "Macao", code: "MO", flag: "\u{1F1F2}\u{1F1F4}", continent: "asia", outbound: true, inbound: false },
  { name: "Malaysia", code: "MY", flag: "\u{1F1F2}\u{1F1FE}", continent: "asia", outbound: true, inbound: true },
  { name: "Maldives", code: "MV", flag: "\u{1F1F2}\u{1F1FB}", continent: "asia", outbound: true, inbound: false },
  { name: "Mongolia", code: "MN", flag: "\u{1F1F2}\u{1F1F3}", continent: "asia", outbound: true, inbound: false },
  { name: "Myanmar", code: "MM", flag: "\u{1F1F2}\u{1F1F2}", continent: "asia", outbound: true, inbound: false },
  { name: "Nepal", code: "NP", flag: "\u{1F1F3}\u{1F1F5}", continent: "asia", outbound: true, inbound: false },
  { name: "Oman", code: "OM", flag: "\u{1F1F4}\u{1F1F2}", continent: "asia", outbound: true, inbound: false },
  { name: "Pakistan", code: "PK", flag: "\u{1F1F5}\u{1F1F0}", continent: "asia", outbound: true, inbound: false },
  { name: "Palestine", code: "PS", flag: "\u{1F1F5}\u{1F1F8}", continent: "asia", outbound: true, inbound: false },
  { name: "Philippines", code: "PH", flag: "\u{1F1F5}\u{1F1ED}", continent: "asia", outbound: true, inbound: true },
  { name: "Qatar", code: "QA", flag: "\u{1F1F6}\u{1F1E6}", continent: "asia", outbound: true, inbound: false },
  { name: "Saudi Arabia", code: "SA", flag: "\u{1F1F8}\u{1F1E6}", continent: "asia", outbound: true, inbound: false },
  { name: "Singapore", code: "SG", flag: "\u{1F1F8}\u{1F1EC}", continent: "asia", outbound: true, inbound: true },
  { name: "South Korea", code: "KR", flag: "\u{1F1F0}\u{1F1F7}", continent: "asia", outbound: true, inbound: true },
  { name: "Sri Lanka", code: "LK", flag: "\u{1F1F1}\u{1F1F0}", continent: "asia", outbound: true, inbound: false },
  { name: "Syria", code: "SY", flag: "\u{1F1F8}\u{1F1FE}", continent: "asia", outbound: true, inbound: false },
  { name: "Taiwan", code: "TW", flag: "\u{1F1F9}\u{1F1FC}", continent: "asia", outbound: true, inbound: false },
  { name: "Tajikistan", code: "TJ", flag: "\u{1F1F9}\u{1F1EF}", continent: "asia", outbound: true, inbound: false },
  { name: "Thailand", code: "TH", flag: "\u{1F1F9}\u{1F1ED}", continent: "asia", outbound: true, inbound: false },
  { name: "Timor-Leste", code: "TL", flag: "\u{1F1F9}\u{1F1F1}", continent: "asia", outbound: true, inbound: false },
  { name: "Turkey", code: "TR", flag: "\u{1F1F9}\u{1F1F7}", continent: "asia", outbound: true, inbound: false },
  { name: "Turkmenistan", code: "TM", flag: "\u{1F1F9}\u{1F1F2}", continent: "asia", outbound: true, inbound: false },
  { name: "United Arab Emirates", code: "AE", flag: "\u{1F1E6}\u{1F1EA}", continent: "asia", outbound: true, inbound: true },
  { name: "Uzbekistan", code: "UZ", flag: "\u{1F1FA}\u{1F1FF}", continent: "asia", outbound: true, inbound: false },
  { name: "Vietnam", code: "VN", flag: "\u{1F1FB}\u{1F1F3}", continent: "asia", outbound: true, inbound: false },
  { name: "Yemen", code: "YE", flag: "\u{1F1FE}\u{1F1EA}", continent: "asia", outbound: true, inbound: false },

  // Europe
  { name: "Albania", code: "AL", flag: "\u{1F1E6}\u{1F1F1}", continent: "europe", outbound: true, inbound: false },
  { name: "Andorra", code: "AD", flag: "\u{1F1E6}\u{1F1E9}", continent: "europe", outbound: true, inbound: false },
  { name: "Austria", code: "AT", flag: "\u{1F1E6}\u{1F1F9}", continent: "europe", outbound: true, inbound: true },
  { name: "Belarus", code: "BY", flag: "\u{1F1E7}\u{1F1FE}", continent: "europe", outbound: true, inbound: false },
  { name: "Belgium", code: "BE", flag: "\u{1F1E7}\u{1F1EA}", continent: "europe", outbound: true, inbound: true },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "\u{1F1E7}\u{1F1E6}", continent: "europe", outbound: true, inbound: false },
  { name: "British Virgin Islands", code: "VG", flag: "\u{1F1FB}\u{1F1EC}", continent: "europe", outbound: true, inbound: true },
  { name: "Bulgaria", code: "BG", flag: "\u{1F1E7}\u{1F1EC}", continent: "europe", outbound: true, inbound: false },
  { name: "Croatia", code: "HR", flag: "\u{1F1ED}\u{1F1F7}", continent: "europe", outbound: true, inbound: true },
  { name: "Cyprus", code: "CY", flag: "\u{1F1E8}\u{1F1FE}", continent: "europe", outbound: true, inbound: false },
  { name: "Czech Republic", code: "CZ", flag: "\u{1F1E8}\u{1F1FF}", continent: "europe", outbound: true, inbound: true },
  { name: "Denmark", code: "DK", flag: "\u{1F1E9}\u{1F1F0}", continent: "europe", outbound: true, inbound: true },
  { name: "Estonia", code: "EE", flag: "\u{1F1EA}\u{1F1EA}", continent: "europe", outbound: true, inbound: true },
  { name: "Faroe Islands", code: "FO", flag: "\u{1F1EB}\u{1F1F4}", continent: "europe", outbound: true, inbound: false },
  { name: "Finland", code: "FI", flag: "\u{1F1EB}\u{1F1EE}", continent: "europe", outbound: true, inbound: true },
  { name: "France", code: "FR", flag: "\u{1F1EB}\u{1F1F7}", continent: "europe", outbound: true, inbound: true },
  { name: "Germany", code: "DE", flag: "\u{1F1E9}\u{1F1EA}", continent: "europe", outbound: true, inbound: true },
  { name: "Gibraltar", code: "GI", flag: "\u{1F1EC}\u{1F1EE}", continent: "europe", outbound: true, inbound: false },
  { name: "Greece", code: "GR", flag: "\u{1F1EC}\u{1F1F7}", continent: "europe", outbound: true, inbound: false },
  { name: "Guernsey", code: "GG", flag: "\u{1F1EC}\u{1F1EC}", continent: "europe", outbound: true, inbound: false },
  { name: "Hungary", code: "HU", flag: "\u{1F1ED}\u{1F1FA}", continent: "europe", outbound: true, inbound: true },
  { name: "Iceland", code: "IS", flag: "\u{1F1EE}\u{1F1F8}", continent: "europe", outbound: true, inbound: false },
  { name: "Ireland", code: "IE", flag: "\u{1F1EE}\u{1F1EA}", continent: "europe", outbound: true, inbound: true },
  { name: "Italy", code: "IT", flag: "\u{1F1EE}\u{1F1F9}", continent: "europe", outbound: true, inbound: true },
  { name: "Kosovo", code: "XK", flag: "\u{1F1FD}\u{1F1F0}", continent: "europe", outbound: true, inbound: false },
  { name: "Latvia", code: "LV", flag: "\u{1F1F1}\u{1F1FB}", continent: "europe", outbound: true, inbound: true },
  { name: "Liechtenstein", code: "LI", flag: "\u{1F1F1}\u{1F1EE}", continent: "europe", outbound: true, inbound: false },
  { name: "Lithuania", code: "LT", flag: "\u{1F1F1}\u{1F1F9}", continent: "europe", outbound: true, inbound: true },
  { name: "Luxembourg", code: "LU", flag: "\u{1F1F1}\u{1F1FA}", continent: "europe", outbound: true, inbound: false },
  { name: "Macedonia", code: "MK", flag: "\u{1F1F2}\u{1F1F0}", continent: "europe", outbound: true, inbound: false },
  { name: "Malta", code: "MT", flag: "\u{1F1F2}\u{1F1F9}", continent: "europe", outbound: true, inbound: false },
  { name: "Martinique", code: "MQ", flag: "\u{1F1F2}\u{1F1F6}", continent: "europe", outbound: true, inbound: false },
  { name: "Moldova", code: "MD", flag: "\u{1F1F2}\u{1F1E9}", continent: "europe", outbound: true, inbound: false },
  { name: "Monaco", code: "MC", flag: "\u{1F1F2}\u{1F1E8}", continent: "europe", outbound: true, inbound: false },
  { name: "Montenegro", code: "ME", flag: "\u{1F1F2}\u{1F1EA}", continent: "europe", outbound: true, inbound: false },
  { name: "Netherlands", code: "NL", flag: "\u{1F1F3}\u{1F1F1}", continent: "europe", outbound: true, inbound: true },
  { name: "Norway", code: "NO", flag: "\u{1F1F3}\u{1F1F4}", continent: "europe", outbound: true, inbound: true },
  { name: "Poland", code: "PL", flag: "\u{1F1F5}\u{1F1F1}", continent: "europe", outbound: true, inbound: true },
  { name: "Portugal", code: "PT", flag: "\u{1F1F5}\u{1F1F9}", continent: "europe", outbound: true, inbound: true },
  { name: "Romania", code: "RO", flag: "\u{1F1F7}\u{1F1F4}", continent: "europe", outbound: true, inbound: true },
  { name: "Russia", code: "RU", flag: "\u{1F1F7}\u{1F1FA}", continent: "europe", outbound: true, inbound: false },
  { name: "San Marino", code: "SM", flag: "\u{1F1F8}\u{1F1F2}", continent: "europe", outbound: true, inbound: false },
  { name: "Serbia", code: "RS", flag: "\u{1F1F7}\u{1F1F8}", continent: "europe", outbound: true, inbound: false },
  { name: "Slovakia", code: "SK", flag: "\u{1F1F8}\u{1F1F0}", continent: "europe", outbound: true, inbound: true },
  { name: "Slovenia", code: "SI", flag: "\u{1F1F8}\u{1F1EE}", continent: "europe", outbound: true, inbound: true },
  { name: "Spain", code: "ES", flag: "\u{1F1EA}\u{1F1F8}", continent: "europe", outbound: true, inbound: true },
  { name: "Sweden", code: "SE", flag: "\u{1F1F8}\u{1F1EA}", continent: "europe", outbound: true, inbound: true },
  { name: "Switzerland", code: "CH", flag: "\u{1F1E8}\u{1F1ED}", continent: "europe", outbound: true, inbound: true },
  { name: "Ukraine", code: "UA", flag: "\u{1F1FA}\u{1F1E6}", continent: "europe", outbound: true, inbound: false },
  { name: "United Kingdom", code: "GB", flag: "\u{1F1EC}\u{1F1E7}", continent: "europe", outbound: true, inbound: true },

  // Africa
  { name: "Algeria", code: "DZ", flag: "\u{1F1E9}\u{1F1FF}", continent: "africa", outbound: true, inbound: false },
  { name: "Angola", code: "AO", flag: "\u{1F1E6}\u{1F1F4}", continent: "africa", outbound: true, inbound: false },
  { name: "Benin", code: "BJ", flag: "\u{1F1E7}\u{1F1EF}", continent: "africa", outbound: true, inbound: false },
  { name: "Botswana", code: "BW", flag: "\u{1F1E7}\u{1F1FC}", continent: "africa", outbound: true, inbound: false },
  { name: "Burkina Faso", code: "BF", flag: "\u{1F1E7}\u{1F1EB}", continent: "africa", outbound: true, inbound: false },
  { name: "Burundi", code: "BI", flag: "\u{1F1E7}\u{1F1EE}", continent: "africa", outbound: true, inbound: false },
  { name: "Cameroon", code: "CM", flag: "\u{1F1E8}\u{1F1F2}", continent: "africa", outbound: true, inbound: false },
  { name: "Cape Verde", code: "CV", flag: "\u{1F1E8}\u{1F1FB}", continent: "africa", outbound: true, inbound: false },
  { name: "Central African Republic", code: "CF", flag: "\u{1F1E8}\u{1F1EB}", continent: "africa", outbound: true, inbound: false },
  { name: "Chad", code: "TD", flag: "\u{1F1F9}\u{1F1E9}", continent: "africa", outbound: true, inbound: false },
  { name: "Comoros", code: "KM", flag: "\u{1F1F0}\u{1F1F2}", continent: "africa", outbound: true, inbound: false },
  { name: "Congo", code: "CG", flag: "\u{1F1E8}\u{1F1EC}", continent: "africa", outbound: true, inbound: false },
  { name: "Democratic Republic Congo", code: "CD", flag: "\u{1F1E8}\u{1F1E9}", continent: "africa", outbound: true, inbound: false },
  { name: "Djibouti", code: "DJ", flag: "\u{1F1E9}\u{1F1EF}", continent: "africa", outbound: true, inbound: false },
  { name: "Egypt", code: "EG", flag: "\u{1F1EA}\u{1F1EC}", continent: "africa", outbound: true, inbound: false },
  { name: "Equatorial Guinea", code: "GQ", flag: "\u{1F1EC}\u{1F1F6}", continent: "africa", outbound: true, inbound: false },
  { name: "Eritrea", code: "ER", flag: "\u{1F1EA}\u{1F1F7}", continent: "africa", outbound: true, inbound: false },
  { name: "Ethiopia", code: "ET", flag: "\u{1F1EA}\u{1F1F9}", continent: "africa", outbound: true, inbound: false },
  { name: "Gabon", code: "GA", flag: "\u{1F1EC}\u{1F1E6}", continent: "africa", outbound: true, inbound: false },
  { name: "Gambia", code: "GM", flag: "\u{1F1EC}\u{1F1F2}", continent: "africa", outbound: true, inbound: false },
  { name: "Ghana", code: "GH", flag: "\u{1F1EC}\u{1F1ED}", continent: "africa", outbound: true, inbound: false },
  { name: "Guinea", code: "GN", flag: "\u{1F1EC}\u{1F1F3}", continent: "africa", outbound: true, inbound: false },
  { name: "Guinea-Bissau", code: "GW", flag: "\u{1F1EC}\u{1F1FC}", continent: "africa", outbound: true, inbound: false },
  { name: "Ivory Coast", code: "CI", flag: "\u{1F1E8}\u{1F1EE}", continent: "africa", outbound: true, inbound: false },
  { name: "Kenya", code: "KE", flag: "\u{1F1F0}\u{1F1EA}", continent: "africa", outbound: true, inbound: true },
  { name: "Lesotho", code: "LS", flag: "\u{1F1F1}\u{1F1F8}", continent: "africa", outbound: true, inbound: false },
  { name: "Liberia", code: "LR", flag: "\u{1F1F1}\u{1F1F7}", continent: "africa", outbound: true, inbound: false },
  { name: "Libya", code: "LY", flag: "\u{1F1F1}\u{1F1FE}", continent: "africa", outbound: true, inbound: false },
  { name: "Madagascar", code: "MG", flag: "\u{1F1F2}\u{1F1EC}", continent: "africa", outbound: true, inbound: false },
  { name: "Malawi", code: "MW", flag: "\u{1F1F2}\u{1F1FC}", continent: "africa", outbound: true, inbound: false },
  { name: "Mali", code: "ML", flag: "\u{1F1F2}\u{1F1F1}", continent: "africa", outbound: true, inbound: false },
  { name: "Mauritania", code: "MR", flag: "\u{1F1F2}\u{1F1F7}", continent: "africa", outbound: true, inbound: false },
  { name: "Mauritius", code: "MU", flag: "\u{1F1F2}\u{1F1FA}", continent: "africa", outbound: true, inbound: false },
  { name: "Morocco", code: "MA", flag: "\u{1F1F2}\u{1F1E6}", continent: "africa", outbound: true, inbound: false },
  { name: "Mozambique", code: "MZ", flag: "\u{1F1F2}\u{1F1FF}", continent: "africa", outbound: true, inbound: false },
  { name: "Namibia", code: "NA", flag: "\u{1F1F3}\u{1F1E6}", continent: "africa", outbound: true, inbound: false },
  { name: "Niger", code: "NE", flag: "\u{1F1F3}\u{1F1EA}", continent: "africa", outbound: true, inbound: false },
  { name: "Nigeria", code: "NG", flag: "\u{1F1F3}\u{1F1EC}", continent: "africa", outbound: true, inbound: false },
  { name: "Reunion", code: "RE", flag: "\u{1F1F7}\u{1F1EA}", continent: "africa", outbound: true, inbound: false },
  { name: "Rwanda", code: "RW", flag: "\u{1F1F7}\u{1F1FC}", continent: "africa", outbound: true, inbound: false },
  { name: "Sao Tome and Principe", code: "ST", flag: "\u{1F1F8}\u{1F1F9}", continent: "africa", outbound: true, inbound: false },
  { name: "Senegal", code: "SN", flag: "\u{1F1F8}\u{1F1F3}", continent: "africa", outbound: true, inbound: false },
  { name: "Seychelles", code: "SC", flag: "\u{1F1F8}\u{1F1E8}", continent: "africa", outbound: true, inbound: false },
  { name: "Sierra Leone", code: "SL", flag: "\u{1F1F8}\u{1F1F1}", continent: "africa", outbound: true, inbound: false },
  { name: "Somalia", code: "SO", flag: "\u{1F1F8}\u{1F1F4}", continent: "africa", outbound: true, inbound: false },
  { name: "South Africa", code: "ZA", flag: "\u{1F1FF}\u{1F1E6}", continent: "africa", outbound: true, inbound: true },
  { name: "South Sudan", code: "SS", flag: "\u{1F1F8}\u{1F1F8}", continent: "africa", outbound: true, inbound: false },
  { name: "Sudan", code: "SD", flag: "\u{1F1F8}\u{1F1E9}", continent: "africa", outbound: true, inbound: false },
  { name: "Swaziland", code: "SZ", flag: "\u{1F1F8}\u{1F1FF}", continent: "africa", outbound: true, inbound: false },
  { name: "Tanzania", code: "TZ", flag: "\u{1F1F9}\u{1F1FF}", continent: "africa", outbound: true, inbound: false },
  { name: "Togo", code: "TG", flag: "\u{1F1F9}\u{1F1EC}", continent: "africa", outbound: true, inbound: false },
  { name: "Tunisia", code: "TN", flag: "\u{1F1F9}\u{1F1F3}", continent: "africa", outbound: true, inbound: false },
  { name: "Uganda", code: "UG", flag: "\u{1F1FA}\u{1F1EC}", continent: "africa", outbound: true, inbound: false },
  { name: "Zambia", code: "ZM", flag: "\u{1F1FF}\u{1F1F2}", continent: "africa", outbound: true, inbound: false },
  { name: "Zimbabwe", code: "ZW", flag: "\u{1F1FF}\u{1F1FC}", continent: "africa", outbound: true, inbound: false },

  // Oceania
  { name: "American-Samoa", code: "AS", flag: "\u{1F1E6}\u{1F1F8}", continent: "oceania", outbound: true, inbound: false },
  { name: "Australia", code: "AU", flag: "\u{1F1E6}\u{1F1FA}", continent: "oceania", outbound: true, inbound: true },
  { name: "Cook Islands", code: "CK", flag: "\u{1F1E8}\u{1F1F0}", continent: "oceania", outbound: true, inbound: false },
  { name: "Fiji", code: "FJ", flag: "\u{1F1EB}\u{1F1EF}", continent: "oceania", outbound: true, inbound: false },
  { name: "French Polynesia", code: "PF", flag: "\u{1F1F5}\u{1F1EB}", continent: "oceania", outbound: true, inbound: false },
  { name: "Guam", code: "GU", flag: "\u{1F1EC}\u{1F1FA}", continent: "oceania", outbound: true, inbound: false },
  { name: "Marshall Islands", code: "MH", flag: "\u{1F1F2}\u{1F1ED}", continent: "oceania", outbound: true, inbound: false },
  { name: "Micronesia", code: "FM", flag: "\u{1F1EB}\u{1F1F2}", continent: "oceania", outbound: true, inbound: false },
  { name: "New Caledonia", code: "NC", flag: "\u{1F1F3}\u{1F1E8}", continent: "oceania", outbound: true, inbound: false },
  { name: "New Zealand", code: "NZ", flag: "\u{1F1F3}\u{1F1FF}", continent: "oceania", outbound: true, inbound: true },
  { name: "Niue", code: "NU", flag: "\u{1F1F3}\u{1F1FA}", continent: "oceania", outbound: true, inbound: false },
  { name: "Norfolk Island", code: "NF", flag: "\u{1F1F3}\u{1F1EB}", continent: "oceania", outbound: true, inbound: false },
  { name: "Palau", code: "PW", flag: "\u{1F1F5}\u{1F1FC}", continent: "oceania", outbound: true, inbound: false },
  { name: "Papua New Guinea", code: "PG", flag: "\u{1F1F5}\u{1F1EC}", continent: "oceania", outbound: true, inbound: false },
  { name: "Samoa", code: "WS", flag: "\u{1F1FC}\u{1F1F8}", continent: "oceania", outbound: true, inbound: false },
  { name: "Solomon Islands", code: "SB", flag: "\u{1F1F8}\u{1F1E7}", continent: "oceania", outbound: true, inbound: false },
  { name: "Tonga", code: "TO", flag: "\u{1F1F9}\u{1F1F4}", continent: "oceania", outbound: true, inbound: false },
  { name: "Tuvalu", code: "TV", flag: "\u{1F1F9}\u{1F1FB}", continent: "oceania", outbound: true, inbound: false },
  { name: "Vanuatu", code: "VU", flag: "\u{1F1FB}\u{1F1FA}", continent: "oceania", outbound: true, inbound: false },
];

// Country details data
const countryDetailsData: Record<string, CountryDetails> = {
  US: {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Supported (If enabled for SMS)",
      smsConcatenation: "Yes",
      smsConcatenationNote: "Sprint does not support proper concatenation for P2P messages. They do support it for A2P.",
      twoWaySms: "Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdType: "Numeric only (10DLC, Short Code, Toll-Free)",
      senderIdRegulations: "Alphanumeric sender IDs are not supported. The originating number must be an SMS-enabled Plivo number in US/Canada or a US short code.",
      registrationRequirements: "10DLC registration via The Campaign Registry (TCR) is mandatory for A2P messaging over long codes. Register your brand (with exact EIN match) and each messaging campaign. Unregistered traffic is blocked by all major US carriers since February 2025.",
      contentRestrictions: "CTIA messaging guidelines apply. Messages must clearly identify the sender and purpose. Prohibited content includes SHAFT (Sex, Hate, Alcohol, Firearms, Tobacco) for standard campaigns.",
      consentRequirements: "Express written consent required for marketing messages. Prior express consent required for informational messages. Consent must be documented and retained.",
      optOutRequirements: "STOP keyword support mandatory. Must honor opt-out requests immediately. Include opt-out instructions in first message and periodically.",
      complianceNotes: "Brand vetting score determines message throughput. Campaign registration typically takes 3-7 business days. Auth+ 2.0 verification required for brands. Short codes require separate approval process.",
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
  },
};

// Get country details with fallback for countries without specific data
const getCountryDetails = (country: Country): CountryDetails => {
  // 1. Hand-written detailed data (US only — has unique 10DLC/carrier data)
  if (countryDetailsData[country.code]) {
    return countryDetailsData[country.code];
  }

  // 2. XLSX-derived data (227 countries from SMS Coverage Excel)
  if (xlsxCoverageData[country.code]) {
    return xlsxCoverageData[country.code] as CountryDetails;
  }

  // 3. Generic fallback for SMS-outbound-only countries
  return {
    features: {
      sendingToMobile: "Supported",
      sendingToLandline: "Not Supported",
      smsConcatenation: "Yes",
      twoWaySms: country.inbound ? "Supported" : "Not Supported",
      powerpack: "Supported",
    },
    regulations: {
      senderIdType: "Varies by country",
      senderIdRegulations: "Sender ID regulations vary. Contact Plivo support for country-specific requirements.",
      registrationRequirements: "Registration requirements vary by country. Some countries require pre-registration of sender IDs.",
      contentRestrictions: "Content must comply with local regulations. Avoid prohibited content categories.",
      consentRequirements: "Consent requirements vary. Express consent recommended for all commercial messaging.",
      optOutRequirements: "Opt-out mechanism recommended in all commercial messages.",
      complianceNotes: "Contact Plivo support for detailed compliance requirements in this country.",
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
  };
};

// Get United States as default selected country
const defaultCountry = countries.find((c) => c.code === "US") || null;

export default function CoverageTabs({ initialCountry }: { initialCountry?: string } = {}) {
  const { country: geoCountry } = useGeoCountry();
  const [coverageType, setCoverageType] = useState<CoverageType>("outbound");
  const [activeContinent, setActiveContinent] = useState<Continent>("north-america");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry);
  const [activeFeatureSection, setActiveFeatureSection] = useState<FeatureSectionId>("features");
  const [featureSidebarStyle, setFeatureSidebarStyle] = useState<React.CSSProperties>({});
  const [isDesktopCountryOpen, setIsDesktopCountryOpen] = useState(false);
  const [isMobileCountryOpen, setIsMobileCountryOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  // Fetch live pricing + phone number data from API
  const { data: pricingData, loading: pricingLoading } = useCountryPricing(selectedCountry?.code || "US");
  const { convertPriceString } = useExchangeRate();

  // SMS-capable number types from API
  const smsNumberTypes = useMemo(() => {
    if (!pricingData?.phoneNumbers) return [];
    return pricingData.phoneNumbers.filter(
      (pn) => pn.capabilities.includes("sms") && (pn.status === "GA" || pn.status === "BETA")
    );
  }, [pricingData]);

  // Auto-select country based on user's IP location
  const geoApplied = useRef(false);
  useEffect(() => {
    if (geoApplied.current) return;
    const target = initialCountry || geoCountry;
    if (!target) return;
    const match = countries.find((c) => c.code === target);
    if (match) {
      geoApplied.current = true;
      setSelectedCountry(match);
      setActiveContinent(match.continent);
    }
  }, [geoCountry, initialCountry]);

  const featureSidebarWrapperRef = useRef<HTMLDivElement>(null);
  const featureContentRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // ── NEW REFS for native event delegation ──
  const coverageToggleRef = useRef<HTMLDivElement>(null);
  const continentTabsRef = useRef<HTMLDivElement>(null);
  const countryGridRef = useRef<HTMLDivElement>(null);
  const desktopDropdownToggleRef = useRef<HTMLButtonElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const desktopDropdownListRef = useRef<HTMLDivElement>(null);
  const featureNavRef = useRef<HTMLUListElement>(null);
  const mobileDropdownToggleRef = useRef<HTMLButtonElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileDropdownListRef = useRef<HTMLDivElement>(null);

  // ── State refs so native handlers can read current state ──
  const filteredCountriesRef = useRef<Country[]>([]);
  const searchFilteredCountriesRef = useRef<Country[]>([]);
  const availableContinentsRef = useRef<Continent[]>([]);

  // Filtered countries for dropdown search (priority countries at top)
  const searchFilteredCountries = useMemo(() => {
    const coverageFiltered = countries
      .filter((c) => (coverageType === "outbound" ? c.outbound : c.inbound))
      .sort((a, b) => {
        const aIdx = PRIORITY_COUNTRY_CODES.indexOf(a.code);
        const bIdx = PRIORITY_COUNTRY_CODES.indexOf(b.code);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return a.name.localeCompare(b.name);
      });
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

  // Keep refs in sync with latest data
  filteredCountriesRef.current = filteredCountries;
  searchFilteredCountriesRef.current = searchFilteredCountries;
  availableContinentsRef.current = availableContinents;

  // Get country details for selected country
  const countryDetails = useMemo(() => {
    if (!selectedCountry) return null;
    return getCountryDetails(selectedCountry);
  }, [selectedCountry]);

  // Reset continent selection when coverage type changes
  const handleCoverageTypeChange = useCallback((type: CoverageType) => {
    setCoverageType(type);
    setSelectedCountry(null);
    // Keep continent if available, otherwise select first available
    const avail = availableContinentsRef.current;
    setActiveContinent((prev) => {
      if (!avail.includes(prev)) {
        return avail[0] || "north-america";
      }
      return prev;
    });
  }, []);

  const scrollToFeatureSection = useCallback((id: FeatureSectionId) => {
    const element = document.getElementById(`feature-${id}`);
    if (element) {
      const offset = 130; // Account for fixed headers
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // NATIVE EVENT LISTENERS (replacing all React onClick/onChange)
  // ═══════════════════════════════════════════════════════════════

  // 1. Coverage type toggle (outbound/inbound) — event delegation
  useEffect(() => {
    const el = coverageToggleRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-coverage-type]");
      if (!btn) return;
      const type = btn.getAttribute("data-coverage-type") as CoverageType;
      if (type) handleCoverageTypeChange(type);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [handleCoverageTypeChange]);

  // 2. Continent tabs — event delegation
  useEffect(() => {
    const el = continentTabsRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-continent]");
      if (!btn) return;
      const continent = btn.getAttribute("data-continent") as Continent;
      if (continent) {
        setActiveContinent(continent);
        setSelectedCountry(null);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 3. Country grid items — event delegation
  useEffect(() => {
    const el = countryGridRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-country-code]");
      if (!btn) return;
      const code = btn.getAttribute("data-country-code");
      if (code) {
        const country = filteredCountriesRef.current.find((c) => c.code === code);
        if (country) setSelectedCountry(country);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 4. Desktop country dropdown toggle
  useEffect(() => {
    const el = desktopDropdownToggleRef.current;
    if (!el) return;
    const handler = () => {
      setIsDesktopCountryOpen((prev) => !prev);
      setCountrySearchQuery("");
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 5. Desktop country search input
  useEffect(() => {
    const el = desktopSearchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setCountrySearchQuery((e.target as HTMLInputElement).value);
    };
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, []);

  // 6. Desktop country dropdown items — event delegation
  useEffect(() => {
    const el = desktopDropdownListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-dropdown-country-code]");
      if (!btn) return;
      const code = btn.getAttribute("data-dropdown-country-code");
      if (code) {
        const country = searchFilteredCountriesRef.current.find((c) => c.code === code);
        if (country) {
          setSelectedCountry(country);
          setActiveContinent(country.continent);
          setIsDesktopCountryOpen(false);
          setCountrySearchQuery("");
        }
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 7. Feature section nav tabs — event delegation
  useEffect(() => {
    const el = featureNavRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-section-id]");
      if (!btn) return;
      const sectionId = btn.getAttribute("data-section-id") as FeatureSectionId;
      if (sectionId) scrollToFeatureSection(sectionId);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [scrollToFeatureSection]);

  // 8. Mobile country dropdown toggle
  useEffect(() => {
    const el = mobileDropdownToggleRef.current;
    if (!el) return;
    const handler = () => {
      setIsMobileCountryOpen((prev) => !prev);
      setCountrySearchQuery("");
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // 9. Mobile country search input
  useEffect(() => {
    const el = mobileSearchInputRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setCountrySearchQuery((e.target as HTMLInputElement).value);
    };
    el.addEventListener("input", handler);
    return () => el.removeEventListener("input", handler);
  }, []);

  // 10. Mobile country dropdown items — event delegation
  useEffect(() => {
    const el = mobileDropdownListRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-dropdown-country-code]");
      if (!btn) return;
      const code = btn.getAttribute("data-dropdown-country-code");
      if (code) {
        const country = searchFilteredCountriesRef.current.find((c) => c.code === code);
        if (country) {
          setSelectedCountry(country);
          setActiveContinent(country.continent);
          setIsMobileCountryOpen(false);
          setCountrySearchQuery("");
        }
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

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

        {/* Primary Tabs: Outbound / Inbound — event delegation via ref */}
        <div className="flex justify-center mb-8">
          <div ref={coverageToggleRef} className="inline-flex rounded-lg bg-white border border-gray-200 p-1">
            <button
              data-coverage-type="outbound"
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
              data-coverage-type="inbound"
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
          {/* Continent Tabs — event delegation via ref */}
          <div ref={continentTabsRef} className="flex flex-wrap border-b border-gray-200">
            {availableContinents.map((continent) => (
              <button
                key={continent}
                data-continent={continent}
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

          {/* Countries — event delegation via ref */}
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-5">
              Select to view features and capabilities
            </p>
            {filteredCountries.length > 0 ? (
              <div ref={countryGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    data-country-code={country.code}
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
                    ref={desktopDropdownToggleRef}
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
                          ref={desktopSearchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div ref={desktopDropdownListRef} className="overflow-y-auto">
                        {searchFilteredCountries.map((c, idx) => (
                          <div key={c.code}>
                            {!PRIORITY_COUNTRY_CODES.includes(c.code) && idx > 0 && PRIORITY_COUNTRY_CODES.includes(searchFilteredCountries[idx - 1]?.code) && (
                              <div className="border-t border-gray-200 my-1" />
                            )}
                            <button
                              data-dropdown-country-code={c.code}
                              className={cn(
                                "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                                selectedCountry?.code === c.code && "bg-[#323dfe]/5"
                              )}
                            >
                              <span className="text-xl">{c.flag}</span>
                              <span className="text-sm text-gray-900">{c.name}</span>
                            </button>
                          </div>
                        ))}
                        {searchFilteredCountries.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Navigation — event delegation via ref */}
                <nav>
                  <p className="text-sm font-medium text-gray-700 mb-3">Jump to section</p>
                  <ul ref={featureNavRef} className="space-y-1">
                    {featureSections.map((section) => (
                      <li key={section.id}>
                        <button
                          data-section-id={section.id}
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
                    ref={mobileDropdownToggleRef}
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
                          ref={mobileSearchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={countrySearchQuery}
                          className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
                          autoFocus
                        />
                      </div>
                      <div ref={mobileDropdownListRef} className="overflow-y-auto">
                        {searchFilteredCountries.map((c, idx) => (
                          <div key={c.code}>
                            {!PRIORITY_COUNTRY_CODES.includes(c.code) && idx > 0 && PRIORITY_COUNTRY_CODES.includes(searchFilteredCountries[idx - 1]?.code) && (
                              <div className="border-t border-gray-200 my-1" />
                            )}
                            <button
                              data-dropdown-country-code={c.code}
                              className={cn(
                                "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                                selectedCountry?.code === c.code && "bg-[#323dfe]/5"
                              )}
                            >
                              <span className="text-xl">{c.flag}</span>
                              <span className="text-sm text-gray-900">{c.name}</span>
                            </button>
                          </div>
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

              {/* Supported Number Types Section */}
              <div id="feature-number-types" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-4">Supported Number Types</h4>
                {pricingLoading ? (
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className="inline-block h-8 w-32 bg-gray-100 rounded-full animate-pulse" />
                    ))}
                  </div>
                ) : smsNumberTypes.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {smsNumberTypes.map((pn) => (
                      <span
                        key={pn.type}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-black"
                      >
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {pn.type} Numbers
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Contact support for available number types.</p>
                )}
              </div>

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
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600 w-1/2">Sender ID Type</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.senderIdType}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Sender ID Regulations</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.senderIdRegulations}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Registration Requirements</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.registrationRequirements}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Content Restrictions</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.contentRestrictions}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Consent Requirements</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.consentRequirements}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Opt-Out Requirements</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.optOutRequirements}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-sm text-gray-600">Compliance Notes</td>
                        <td className="py-3 text-sm font-medium text-black">{countryDetails.regulations.complianceNotes}</td>
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

              {/* Pricing Section -- Dynamic from API */}
              <div id="feature-pricing" className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-inter text-lg font-semibold text-black mb-2">Pricing</h4>
                <p className="text-xs text-gray-500 mb-4">*Additional carrier charges may apply to outbound & inbound SMS rates.</p>
                {pricingLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <span className="inline-block h-5 w-24 bg-gray-100 rounded animate-pulse" />
                        <span className="inline-block h-5 w-28 bg-gray-100 rounded animate-pulse" />
                        <span className="inline-block h-5 w-28 bg-gray-100 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : pricingData && pricingData.smsRates.length > 0 ? (
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
                        {pricingData.smsRates.map((row, i) => (
                          <tr key={i}>
                            <td className="py-3 pr-4 text-sm text-gray-900">{row.type}</td>
                            <td className="py-3 pr-4 text-sm font-medium text-black">{convertPriceString(row.outbound, selectedCountry?.code || "US")}</td>
                            <td className="py-3 text-sm font-medium text-black">{convertPriceString(row.inbound, selectedCountry?.code || "US")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    <a href="/contact/sales/" className="text-[#323dfe] hover:underline font-medium">Contact sales</a> for pricing details in {selectedCountry.name}.
                  </p>
                )}
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
