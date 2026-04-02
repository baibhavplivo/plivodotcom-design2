/**
 * SMS coverage pricing cache generated from the live Plivo coverage workbook and CountryPricing API.
 * Sources:
 * - https://cdn.prod.website-files.com/6565737286e587567248583f/691472d0bebd52a7d8b7b895_3f1d1f9b39853e0c22991fd810e4fd64_SMS%20Coverage%20new.xlsx
 * - https://api.plivo.com/v1/Internal/CountryPricing/
 * Generated: 2026-04-02
 * Countries: 226 | Failures: 0
 */

export interface SmsCoveragePricingRow {
  type: string;
  outbound: string;
  inbound: string;
}

export interface SmsCoverageCountryPricingData {
  supportedNumberTypes: string[];
  pricingRows: SmsCoveragePricingRow[];
}

export const SMS_COVERAGE_PRICING_CACHE: Record<string, SmsCoverageCountryPricingData> = {
  "AI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1733/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0692/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0567/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0614/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BB": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2355/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2478/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2683/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CA": {
    "supportedNumberTypes": [
      "Local Numbers",
      "Short Codes",
      "Toll-free Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0077/sms",
        "inbound": "$0.0077/sms"
      },
      {
        "type": "Short Codes",
        "outbound": "$0.0250/sms",
        "inbound": "$0.0077/sms"
      },
      {
        "type": "Toll-Free Numbers",
        "outbound": "$0.0079/sms",
        "inbound": "$0.0077/sms"
      }
    ]
  },
  "KY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1588/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0358/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1101/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "DM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.2174/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "DO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0673/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SV": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1005/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0410/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.2401/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GP": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1310/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1019/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "HT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2657/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "HN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2029/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "JM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2305/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MX": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0836/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1837/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1300/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0853/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MP": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0581/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1253/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0429/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported"
      }
    ]
  },
  "KN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1631/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.2200/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0400/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.2039/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "VC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.2600/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2344/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2333/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "US": {
    "supportedNumberTypes": [
      "Local Numbers",
      "Short Codes",
      "Toll-free Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0077/sms",
        "inbound": "$0.0077/sms"
      },
      {
        "type": "Short Codes",
        "outbound": "$0.0077/sms",
        "inbound": "$0.0077/sms"
      },
      {
        "type": "Toll-Free Numbers",
        "outbound": "$0.0079/sms",
        "inbound": "$0.0079/sms"
      }
    ]
  },
  "VI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1500/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0795/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1916/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0484/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0630/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0471/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported"
      }
    ]
  },
  "EC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2516/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "FK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0863/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1567/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1011/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0197/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1850/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0616/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "UY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0559/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "VE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1914/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2330/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1294/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2483/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0319/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2824/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3604/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0547/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.3400/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1082/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0191/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "HK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0586/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Domestic",
        "outbound": "₹0.20/sms",
        "inbound": "Not Supported"
      },
      {
        "type": "ILDO",
        "outbound": "$0.0800/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ID": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3333/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0779/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IQ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2857/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1824/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "JP": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0587/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "JO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3235/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2709/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2504/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2948/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0679/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LB": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3154/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0360/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0316/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MV": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1637/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1872/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1891/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NP": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2546/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "OM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1378/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2574/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3877/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1733/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "QA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1819/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1312/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0516/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0500/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2993/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3325/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0621/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TJ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.4229/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0271/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0484/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0285/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.3125/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0988/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "UZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1310/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "VN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0687/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "YE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2697/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1021/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1338/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AT": {
    "supportedNumberTypes": [
      "Mobile Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0828/sms",
        "inbound": "Not Supported"
      },
      {
        "type": "Mobile Numbers",
        "outbound": "Starts at $0.0828/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2500/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BE": {
    "supportedNumberTypes": [
      "Mobile Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0433/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1343/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "VG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2531/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1420/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "HR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0956/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0837/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0597/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "DK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0469/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "EE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0825/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "FO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0573/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "FI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0724/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "FR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0664/sms",
        "inbound": "Not Supported"
      },
      {
        "type": "Mobile Numbers",
        "outbound": "Starts at $0.0664/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "DE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0950/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1076/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0585/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0857/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "HU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0703/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0638/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0664/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "IT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0860/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "XK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2144/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LV": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0667/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0311/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0477/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0673/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0975/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0549/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MQ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1800/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0882/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1643/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ME": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1005/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NL": {
    "supportedNumberTypes": [
      "Mobile Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1632/sms",
        "inbound": "Not Supported"
      },
      {
        "type": "Mobile Numbers",
        "outbound": "Starts at $0.1632/sms",
        "inbound": "$0.3750/sms"
      }
    ]
  },
  "NO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0584/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0285/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PT": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0460/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "RO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0656/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "RU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3962/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0700/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "RS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1326/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0771/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1049/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ES": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0716/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SE": {
    "supportedNumberTypes": [
      "Mobile Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0550/sms",
        "inbound": "Not Supported"
      },
      {
        "type": "Mobile Numbers",
        "outbound": "Starts at $0.0550/sms",
        "inbound": "$0.0200/sms"
      }
    ]
  },
  "CH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0700/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "UA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1660/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GB": {
    "supportedNumberTypes": [
      "Mobile Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0372/sms",
        "inbound": "$0.0030/sms"
      },
      {
        "type": "Mobile Numbers",
        "outbound": "Starts at $0.0372/sms",
        "inbound": "$0.0030/sms"
      }
    ]
  },
  "DZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2077/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1687/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BJ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2172/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0777/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2000/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "BI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3082/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2113/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CV": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1707/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2109/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2000/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.4174/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2679/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0842/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "DJ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1764/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "EG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1615/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GQ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1333/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ER": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1424/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ET": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.3352/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2181/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1162/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3064/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2000/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2637/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "CI": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0800/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "KE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1398/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0360/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1733/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "LY": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3682/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3352/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.3120/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ML": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2902/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MR": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2059/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1436/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1613/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1333/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0512/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0656/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0236/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "RE": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1224/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "RW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2054/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ST": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1098/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2917/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1655/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SL": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1975/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2450/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ZA": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0156/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1916/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SD": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2012/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2080/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1695/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2657/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TN": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2664/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "UG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1595/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ZM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2349/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "ZW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1015/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.2069/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "AU": {
    "supportedNumberTypes": [
      "Mobile Numbers"
    ],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0451/sms",
        "inbound": "Not Supported"
      },
      {
        "type": "Mobile Numbers",
        "outbound": "Starts at $0.0451/sms",
        "inbound": "$0.0030/sms"
      }
    ]
  },
  "CK": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1295/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "FJ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2145/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.1523/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "GU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0650/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "MH": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Not Supported",
        "inbound": "Not Supported"
      }
    ]
  },
  "FM": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0902/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NC": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1560/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NZ": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0980/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0650/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "NF": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0400/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PW": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.0995/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "PG": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.5250/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "WS": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.2355/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "SB": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1018/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TO": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.0748/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "TV": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "$0.3500/sms",
        "inbound": "Not Supported"
      }
    ]
  },
  "VU": {
    "supportedNumberTypes": [],
    "pricingRows": [
      {
        "type": "Local Numbers",
        "outbound": "Starts at $0.1260/sms",
        "inbound": "Not Supported"
      }
    ]
  }
};

export const SMS_COVERAGE_PRICING_FAILURES = [];
