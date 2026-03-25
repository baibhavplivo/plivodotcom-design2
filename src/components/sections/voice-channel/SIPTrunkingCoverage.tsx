"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SIP_RATES, SIP_COUNTRY_NAMES, PHONE_RENTAL_RATES } from "@/data/pricing-data";
import { useGeoCountry } from "@/hooks/useGeoCountry";

type CoverageType = "outbound" | "inbound";
type Continent = "north-america" | "south-america" | "europe" | "asia" | "africa" | "oceania";

interface SIPCountry {
  name: string;
  code: string;
  flag: string;
  continent: Continent;
  outbound: boolean;
  inbound: boolean;
  numberTypes: string[];
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

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Derive number types from SIP_RATES
function getNumberTypes(code: string): string[] {
  const rates = SIP_RATES[code];
  if (!rates) return [];
  const types: string[] = [];
  if (rates.local > 0) types.push("Local");
  if (rates.mobile > 0) types.push("Mobile");
  if (rates.national > 0) types.push("National");
  if (rates.tollfree > 0) types.push("Toll-Free");
  return types;
}

// SIP trunking coverage countries
// Outbound: 220+ countries (voice termination) - all countries listed
// Inbound: Countries with rates in SIP_RATES
const sipCountries: SIPCountry[] = [
  // North America
  { name: "United States", code: "US", flag: "🇺🇸", continent: "north-america", outbound: true, inbound: true, numberTypes: getNumberTypes("US") },
  { name: "Canada", code: "CA", flag: "🇨🇦", continent: "north-america", outbound: true, inbound: true, numberTypes: getNumberTypes("CA") },
  { name: "Mexico", code: "MX", flag: "🇲🇽", continent: "north-america", outbound: true, inbound: true, numberTypes: getNumberTypes("MX") },
  { name: "Dominican Republic", code: "DO", flag: "🇩🇴", continent: "north-america", outbound: true, inbound: true, numberTypes: getNumberTypes("DO") },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Panama", code: "PA", flag: "🇵🇦", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Jamaica", code: "JM", flag: "🇯🇲", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Guatemala", code: "GT", flag: "🇬🇹", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Honduras", code: "HN", flag: "🇭🇳", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "El Salvador", code: "SV", flag: "🇸🇻", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Nicaragua", code: "NI", flag: "🇳🇮", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Puerto Rico", code: "PR", flag: "🇵🇷", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Cuba", code: "CU", flag: "🇨🇺", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Haiti", code: "HT", flag: "🇭🇹", continent: "north-america", outbound: true, inbound: false, numberTypes: [] },

  // South America
  { name: "Brazil", code: "BR", flag: "🇧🇷", continent: "south-america", outbound: true, inbound: true, numberTypes: getNumberTypes("BR") },
  { name: "Argentina", code: "AR", flag: "🇦🇷", continent: "south-america", outbound: true, inbound: true, numberTypes: getNumberTypes("AR") },
  { name: "Chile", code: "CL", flag: "🇨🇱", continent: "south-america", outbound: true, inbound: true, numberTypes: getNumberTypes("CL") },
  { name: "Colombia", code: "CO", flag: "🇨🇴", continent: "south-america", outbound: true, inbound: true, numberTypes: getNumberTypes("CO") },
  { name: "Peru", code: "PE", flag: "🇵🇪", continent: "south-america", outbound: true, inbound: true, numberTypes: getNumberTypes("PE") },
  { name: "Venezuela", code: "VE", flag: "🇻🇪", continent: "south-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Ecuador", code: "EC", flag: "🇪🇨", continent: "south-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Bolivia", code: "BO", flag: "🇧🇴", continent: "south-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Uruguay", code: "UY", flag: "🇺🇾", continent: "south-america", outbound: true, inbound: false, numberTypes: [] },
  { name: "Paraguay", code: "PY", flag: "🇵🇾", continent: "south-america", outbound: true, inbound: false, numberTypes: [] },

  // Europe
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("GB") },
  { name: "Germany", code: "DE", flag: "🇩🇪", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("DE") },
  { name: "France", code: "FR", flag: "🇫🇷", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("FR") },
  { name: "Spain", code: "ES", flag: "🇪🇸", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("ES") },
  { name: "Italy", code: "IT", flag: "🇮🇹", continent: "europe", outbound: true, inbound: false, numberTypes: [] },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("NL") },
  { name: "Belgium", code: "BE", flag: "🇧🇪", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("BE") },
  { name: "Austria", code: "AT", flag: "🇦🇹", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("AT") },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("CH") },
  { name: "Sweden", code: "SE", flag: "🇸🇪", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("SE") },
  { name: "Denmark", code: "DK", flag: "🇩🇰", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("DK") },
  { name: "Finland", code: "FI", flag: "🇫🇮", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("FI") },
  { name: "Ireland", code: "IE", flag: "🇮🇪", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("IE") },
  { name: "Poland", code: "PL", flag: "🇵🇱", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("PL") },
  { name: "Portugal", code: "PT", flag: "🇵🇹", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("PT") },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("CZ") },
  { name: "Greece", code: "GR", flag: "🇬🇷", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("GR") },
  { name: "Hungary", code: "HU", flag: "🇭🇺", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("HU") },
  { name: "Romania", code: "RO", flag: "🇷🇴", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("RO") },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("BG") },
  { name: "Croatia", code: "HR", flag: "🇭🇷", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("HR") },
  { name: "Slovakia", code: "SK", flag: "🇸🇰", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("SK") },
  { name: "Slovenia", code: "SI", flag: "🇸🇮", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("SI") },
  { name: "Lithuania", code: "LT", flag: "🇱🇹", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("LT") },
  { name: "Latvia", code: "LV", flag: "🇱🇻", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("LV") },
  { name: "Cyprus", code: "CY", flag: "🇨🇾", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("CY") },
  { name: "Russia", code: "RU", flag: "🇷🇺", continent: "europe", outbound: true, inbound: true, numberTypes: getNumberTypes("RU") },
  { name: "Norway", code: "NO", flag: "🇳🇴", continent: "europe", outbound: true, inbound: false, numberTypes: [] },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", continent: "europe", outbound: true, inbound: false, numberTypes: [] },
  { name: "Serbia", code: "RS", flag: "🇷🇸", continent: "europe", outbound: true, inbound: false, numberTypes: [] },

  // Asia
  { name: "India", code: "IN", flag: "🇮🇳", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("IN") },
  { name: "Singapore", code: "SG", flag: "🇸🇬", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("SG") },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("HK") },
  { name: "Japan", code: "JP", flag: "🇯🇵", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("JP") },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("ID") },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("MY") },
  { name: "Philippines", code: "PH", flag: "🇵🇭", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("PH") },
  { name: "Israel", code: "IL", flag: "🇮🇱", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("IL") },
  { name: "Turkey", code: "TR", flag: "🇹🇷", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("TR") },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("AE") },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("SA") },
  { name: "Qatar", code: "QA", flag: "🇶🇦", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("QA") },
  { name: "Bahrain", code: "BH", flag: "🇧🇭", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("BH") },
  { name: "China", code: "CN", flag: "🇨🇳", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("CN") },
  { name: "Egypt", code: "EG", flag: "🇪🇬", continent: "asia", outbound: true, inbound: true, numberTypes: getNumberTypes("EG") },
  { name: "South Korea", code: "KR", flag: "🇰🇷", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Thailand", code: "TH", flag: "🇹🇭", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Oman", code: "OM", flag: "🇴🇲", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Jordan", code: "JO", flag: "🇯🇴", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Lebanon", code: "LB", flag: "🇱🇧", continent: "asia", outbound: true, inbound: false, numberTypes: [] },
  { name: "Iraq", code: "IQ", flag: "🇮🇶", continent: "asia", outbound: true, inbound: false, numberTypes: [] },

  // Africa
  { name: "South Africa", code: "ZA", flag: "🇿🇦", continent: "africa", outbound: true, inbound: true, numberTypes: getNumberTypes("ZA") },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Kenya", code: "KE", flag: "🇰🇪", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Ghana", code: "GH", flag: "🇬🇭", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Uganda", code: "UG", flag: "🇺🇬", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Morocco", code: "MA", flag: "🇲🇦", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Tunisia", code: "TN", flag: "🇹🇳", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Cameroon", code: "CM", flag: "🇨🇲", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Senegal", code: "SN", flag: "🇸🇳", continent: "africa", outbound: true, inbound: false, numberTypes: [] },
  { name: "Ivory Coast", code: "CI", flag: "🇨🇮", continent: "africa", outbound: true, inbound: false, numberTypes: [] },

  // Oceania
  { name: "Australia", code: "AU", flag: "🇦🇺", continent: "oceania", outbound: true, inbound: true, numberTypes: getNumberTypes("AU") },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", continent: "oceania", outbound: true, inbound: true, numberTypes: getNumberTypes("NZ") },
  { name: "Fiji", code: "FJ", flag: "🇫🇯", continent: "oceania", outbound: true, inbound: false, numberTypes: [] },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬", continent: "oceania", outbound: true, inbound: false, numberTypes: [] },
  { name: "Samoa", code: "WS", flag: "🇼🇸", continent: "oceania", outbound: true, inbound: false, numberTypes: [] },
];

const defaultCountry = sipCountries.find((c) => c.code === "US") || null;

export default function SIPTrunkingCoverage() {
  const { country: geoCountry } = useGeoCountry();
  const [coverageType, setCoverageType] = useState<CoverageType>("outbound");
  const [activeContinent, setActiveContinent] = useState<Continent>("north-america");
  const [selectedCountry, setSelectedCountry] = useState<SIPCountry | null>(null);

  // Auto-select country based on user's IP location
  const geoApplied = useRef(false);
  useEffect(() => {
    if (geoApplied.current) return;
    const match = sipCountries.find((c) => c.code === geoCountry);
    if (match) {
      geoApplied.current = true;
      setSelectedCountry(match);
      setActiveContinent(match.continent);
    }
  }, [geoCountry]);

  const filteredCountries = useMemo(() => {
    return sipCountries.filter((country) => {
      const matchesCoverage = coverageType === "outbound" ? country.outbound : country.inbound;
      const matchesContinent = country.continent === activeContinent;
      return matchesCoverage && matchesContinent;
    });
  }, [coverageType, activeContinent]);

  const availableContinents = useMemo(() => {
    return continentOrder.filter((continent) =>
      sipCountries.some((country) => {
        const matchesCoverage = coverageType === "outbound" ? country.outbound : country.inbound;
        return matchesCoverage && country.continent === continent;
      })
    );
  }, [coverageType]);

  const handleCoverageTypeChange = (type: CoverageType) => {
    setCoverageType(type);
    setSelectedCountry(null);
    if (!availableContinents.includes(activeContinent)) {
      setActiveContinent(availableContinents[0] || "north-america");
    }
  };

  return (
    <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-12 lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
            SIP trunking coverage
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Global SIP trunking coverage with outbound termination to 220+ countries and inbound origination in 50+ countries.
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
              Outbound (220+ countries)
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
              Inbound (50+ countries)
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
              {coverageType === "inbound"
                ? "Select a country to view available number types and inbound rates"
                : "Showing countries with outbound voice termination support"}
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
                No countries available for {coverageType} SIP trunking in {continentLabels[activeContinent]}.
              </div>
            )}
          </div>
        </div>

        {/* Country Detail Panel */}
        {selectedCountry && (
          <CountryDetailPanel country={selectedCountry} coverageType={coverageType} />
        )}
      </div>
    </section>
  );
}

function CountryDetailPanel({ country, coverageType }: { country: SIPCountry; coverageType: CoverageType }) {
  const rates = SIP_RATES[country.code];
  const rental = PHONE_RENTAL_RATES[country.code];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <h3 className="text-xl font-semibold text-black">{country.name}</h3>
          <p className="text-sm text-gray-500">
            {coverageType === "outbound" ? "Outbound voice termination" : "Inbound voice origination"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Available Number Types */}
        {country.numberTypes.length > 0 && (
          <div>
            <h4 className="font-inter text-base font-semibold text-black mb-3">Available number types</h4>
            <div className="flex flex-wrap gap-2">
              {country.numberTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#323dfe] bg-[#323dfe]/5 rounded-full border border-[#323dfe]/10"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Inbound Rates */}
        {rates && coverageType === "inbound" && (
          <div>
            <h4 className="font-inter text-base font-semibold text-black mb-3">Inbound call rates</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 text-left text-sm font-semibold text-black">Type</th>
                    <th className="py-2 text-left text-sm font-semibold text-black">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rates.local > 0 && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">Local</td>
                      <td className="py-2 text-sm font-medium text-black">${rates.local.toFixed(4)}/min</td>
                    </tr>
                  )}
                  {rates.mobile > 0 && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">Mobile</td>
                      <td className="py-2 text-sm font-medium text-black">${rates.mobile.toFixed(4)}/min</td>
                    </tr>
                  )}
                  {rates.national > 0 && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">National</td>
                      <td className="py-2 text-sm font-medium text-black">${rates.national.toFixed(4)}/min</td>
                    </tr>
                  )}
                  {rates.tollfree > 0 && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">Toll-Free</td>
                      <td className="py-2 text-sm font-medium text-black">${rates.tollfree.toFixed(4)}/min</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Phone Number Rental — only for inbound (numbers needed for origination) */}
        {coverageType === "inbound" && rental && (
          <div>
            <h4 className="font-inter text-base font-semibold text-black mb-3">Phone number rental</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 text-left text-sm font-semibold text-black">Type</th>
                    <th className="py-2 text-left text-sm font-semibold text-black">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rental.local && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">Local</td>
                      <td className="py-2 text-sm font-medium text-black">
                        {rental.local.currency}{rental.local.rate.toFixed(2)}/mo
                      </td>
                    </tr>
                  )}
                  {rental.tollfree && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">Toll-Free</td>
                      <td className="py-2 text-sm font-medium text-black">
                        {rental.tollfree.currency}{rental.tollfree.rate.toFixed(2)}/mo
                      </td>
                    </tr>
                  )}
                  {rental.mobile && (
                    <tr>
                      <td className="py-2 pr-4 text-sm text-gray-900">Mobile</td>
                      <td className="py-2 text-sm font-medium text-black">
                        {rental.mobile.currency}{rental.mobile.rate.toFixed(2)}/mo
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Outbound info for countries without rates */}
        {coverageType === "outbound" && !rates && (
          <div>
            <h4 className="font-inter text-base font-semibold text-black mb-3">Outbound termination</h4>
            <p className="text-sm text-gray-600">
              Voice termination to {country.name} is available. Outbound rates are determined by destination network group. Contact sales for detailed per-route pricing.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
        <a
          href={`/voice/sip-trunking/pricing`}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors"
        >
          View full pricing
        </a>
        <a
          href="https://cx.plivo.com/pungis2"
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign up for free
        </a>
      </div>
    </div>
  );
}
