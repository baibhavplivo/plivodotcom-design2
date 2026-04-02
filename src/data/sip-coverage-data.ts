// Generated from live Plivo SIP coverage sources on 2026-04-02.
// Sources audited: https://www.plivo.com/sip-trunking/coverage/in/
// CountryPricing API, SIP Trunking inbound/outbound pricing APIs, and the Plivo coverage XLSX.

export type SIPCoverageContinent =
  | "north-america"
  | "south-america"
  | "europe"
  | "asia"
  | "africa"
  | "oceania";

export interface SIPCoverageRateCell {
  note: string;
  value: string;
}

export interface SIPCoveragePricingRow {
  key: "local" | "mobile" | "tollfree";
  label: string;
  outbound: SIPCoverageRateCell;
  inbound: SIPCoverageRateCell;
}

export interface SIPCoverageCountry {
  name: string;
  code: string;
  continent: SIPCoverageContinent;
  continentLabel: string;
  deliveryType: string;
  outbound: boolean;
  inbound: boolean;
  countryCode: string;
  numberTypes: string[];
  features: {
    makeCallsToPstn: boolean;
    receiveCallsFromPstn: boolean;
    secureTrunking: boolean;
  };
  pricingRows: SIPCoveragePricingRow[];
  pricingPath: string;
}

export const SIP_COVERAGE_HERO = {
  title: "SIP trunking - coverage across the globe",
  description:
    "Reach your customers across any country in the world with coverage across 225 countries and 900+ networks.",
};

export const SIP_COVERAGE_BILLING_NOTE =
  "Billing interval for the US and Canada is 6/6, Brazil is 30/30 and for all major international destinations is 1/1. Some international destinations may be at 60/60.";

export const SIP_COVERAGE_COUNTRIES: SIPCoverageCountry[] = [
  {
    "name": "Anguilla",
    "code": "AI",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1264",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ai/"
  },
  {
    "name": "Antigua and Barbuda",
    "code": "AG",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1268",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ag/"
  },
  {
    "name": "Aruba",
    "code": "AW",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 297",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3118/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/aw/"
  },
  {
    "name": "Bahamas",
    "code": "BS",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1242",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3930/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bs/"
  },
  {
    "name": "Barbados",
    "code": "BB",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1246",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2880/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bb/"
  },
  {
    "name": "Belize",
    "code": "BZ",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 501",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3025/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bz/"
  },
  {
    "name": "Bermuda",
    "code": "BM",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1441",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0600/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bm/"
  },
  {
    "name": "Canada",
    "code": "CA",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 1",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0090/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ca/"
  },
  {
    "name": "Cayman Islands",
    "code": "KY",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1345",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1880/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ky/"
  },
  {
    "name": "Costa Rica",
    "code": "CR",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound Only",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 506",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0278/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cr/"
  },
  {
    "name": "Cuba",
    "code": "CU",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 53",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$1.0321/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cu/"
  },
  {
    "name": "Dominica",
    "code": "DM",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1767",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/dm/"
  },
  {
    "name": "Dominican Republic",
    "code": "DO",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 1809",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0730/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1458/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/do/"
  },
  {
    "name": "El Salvador",
    "code": "SV",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 503",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2480/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sv/"
  },
  {
    "name": "Greenland",
    "code": "GL",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 299",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6470/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gl/"
  },
  {
    "name": "Grenada",
    "code": "GD",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1473",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3080/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gd/"
  },
  {
    "name": "Guadeloupe & Martinique",
    "code": "GP",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 590",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0139/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gp/"
  },
  {
    "name": "Guatemala",
    "code": "GT",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 502",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2165/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gt/"
  },
  {
    "name": "Haiti",
    "code": "HT",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 509",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5080/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ht/"
  },
  {
    "name": "Honduras",
    "code": "HN",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 504",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2320/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/hn/"
  },
  {
    "name": "Jamaica",
    "code": "JM",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1876",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/jm/"
  },
  {
    "name": "Mexico",
    "code": "MX",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 52",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0095/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1807/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mx/"
  },
  {
    "name": "Montserrat",
    "code": "MS",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1664",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ms/"
  },
  {
    "name": "Netherlands Antilles",
    "code": "AN",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 599",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/an/"
  },
  {
    "name": "Nicaragua",
    "code": "NI",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 505",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1765/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ni/"
  },
  {
    "name": "Northern Mariana Islands",
    "code": "MP",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1670",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1080/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mp/"
  },
  {
    "name": "Panama",
    "code": "PA",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 507",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0388/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pa/"
  },
  {
    "name": "Puerto Rico",
    "code": "PR",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0140/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pr/"
  },
  {
    "name": "Saint Barthelemy",
    "code": "BL",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 590",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bl/"
  },
  {
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1869",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2780/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/kn/"
  },
  {
    "name": "Saint Lucia",
    "code": "LC",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1758",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3080/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lc/"
  },
  {
    "name": "Saint Martin",
    "code": "MF",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1599",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mf/"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "code": "PM",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 508",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3030/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pm/"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1784",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3080/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/vc/"
  },
  {
    "name": "Trinidad and Tobago",
    "code": "TT",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1868",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2280/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tt/"
  },
  {
    "name": "Turks and Caicos Islands",
    "code": "TC",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1649",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tc/"
  },
  {
    "name": "United States",
    "code": "US",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 1",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0055/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0010/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0120/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/us/"
  },
  {
    "name": "United States Virgin Islands",
    "code": "VI",
    "continent": "north-america",
    "continentLabel": "North America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1340",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/vi/"
  },
  {
    "name": "Argentina",
    "code": "AR",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 54",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0130/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ar/"
  },
  {
    "name": "Bolivia",
    "code": "BO",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 591",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3045/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bo/"
  },
  {
    "name": "Brazil",
    "code": "BR",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 55",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0180/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0060/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0180/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0085/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1800/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/br/"
  },
  {
    "name": "Chile",
    "code": "CL",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 56",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0200/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cl/"
  },
  {
    "name": "Colombia",
    "code": "CO",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 57",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0500/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1421/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/co/"
  },
  {
    "name": "Curacao",
    "code": "CW",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cw/"
  },
  {
    "name": "Ecuador",
    "code": "EC",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 593",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1950/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ec/"
  },
  {
    "name": "Falkland Islands",
    "code": "FK",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 500",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.3974/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/fk/"
  },
  {
    "name": "French Guiana",
    "code": "GF",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 594",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0139/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gf/"
  },
  {
    "name": "Guyana",
    "code": "GY",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 592",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3570/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gy/"
  },
  {
    "name": "Paraguay",
    "code": "PY",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 595",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0414/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/py/"
  },
  {
    "name": "Peru",
    "code": "PE",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 51",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0095/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.3033/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pe/"
  },
  {
    "name": "Suriname",
    "code": "SR",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 597",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.1247/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sr/"
  },
  {
    "name": "Uruguay",
    "code": "UY",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 598",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0860/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/uy/"
  },
  {
    "name": "Venezuela",
    "code": "VE",
    "continent": "south-america",
    "continentLabel": "South America",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 58",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0430/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ve/"
  },
  {
    "name": "Afghanistan",
    "code": "AF",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 93",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3780/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/af/"
  },
  {
    "name": "Armenia",
    "code": "AM",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 374",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2530/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/am/"
  },
  {
    "name": "Azerbaijan",
    "code": "AZ",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 994",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2780/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/az/"
  },
  {
    "name": "Bahrain",
    "code": "BH",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 973",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1500/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.2000/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bh/"
  },
  {
    "name": "Bangladesh",
    "code": "BD",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 880",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0430/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0910/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bd/"
  },
  {
    "name": "Bhutan",
    "code": "BT",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 975",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0997/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bt/"
  },
  {
    "name": "Brunei",
    "code": "BN",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 673",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0374/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bn/"
  },
  {
    "name": "Cambodia",
    "code": "KH",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 855",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0880/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/kh/"
  },
  {
    "name": "China",
    "code": "CN",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 86",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3970/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0550/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.8000/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cn/"
  },
  {
    "name": "Georgia",
    "code": "GE",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 995",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2700/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ge/"
  },
  {
    "name": "Hong Kong",
    "code": "HK",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 852",
    "numberTypes": [
      "National Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0380/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0380/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0243/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/hk/"
  },
  {
    "name": "India",
    "code": "IN",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 91",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "₹0.7400/min"
        },
        "inbound": {
          "note": "",
          "value": "₹0.7400/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/in/"
  },
  {
    "name": "Indonesia",
    "code": "ID",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 62",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0660/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0170/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/id/"
  },
  {
    "name": "Iran",
    "code": "IR",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 98",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2780/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ir/"
  },
  {
    "name": "Iraq",
    "code": "IQ",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 964",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/iq/"
  },
  {
    "name": "Israel",
    "code": "IL",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 972",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0140/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1112/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/il/"
  },
  {
    "name": "Japan",
    "code": "JP",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 81",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0355/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/jp/"
  },
  {
    "name": "Jordan",
    "code": "JO",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 962",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/jo/"
  },
  {
    "name": "Kazakhstan",
    "code": "KZ",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 7",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0643/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/kz/"
  },
  {
    "name": "Kuwait",
    "code": "KW",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 965",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/kw/"
  },
  {
    "name": "Kyrgyzstan",
    "code": "KG",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 996",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2173/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/kg/"
  },
  {
    "name": "Laos",
    "code": "LA",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 856",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0982/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/la/"
  },
  {
    "name": "Lebanon",
    "code": "LB",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 961",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lb/"
  },
  {
    "name": "Macao",
    "code": "MO",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 853",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.0000/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mo/"
  },
  {
    "name": "Malaysia",
    "code": "MY",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 60",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0480/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/my/"
  },
  {
    "name": "Maldives",
    "code": "MV",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 960",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.7800/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mv/"
  },
  {
    "name": "Mongolia",
    "code": "MN",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 976",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0230/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mn/"
  },
  {
    "name": "Myanmar",
    "code": "MM",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 95",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3722/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mm/"
  },
  {
    "name": "Nepal",
    "code": "NP",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 977",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/np/"
  },
  {
    "name": "Oman",
    "code": "OM",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 968",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1780/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/om/"
  },
  {
    "name": "Pakistan",
    "code": "PK",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 92",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1380/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pk/"
  },
  {
    "name": "Palestine",
    "code": "PS",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 970",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2369/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ps/"
  },
  {
    "name": "Philippines",
    "code": "PH",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 63",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1530/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.2200/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.4500/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ph/"
  },
  {
    "name": "Qatar",
    "code": "QA",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 974",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2680/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.5342/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/qa/"
  },
  {
    "name": "Saudi Arabia",
    "code": "SA",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 966",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.1800/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.7440/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sa/"
  },
  {
    "name": "Singapore",
    "code": "SG",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 65",
    "numberTypes": [
      "National Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0530/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sg/"
  },
  {
    "name": "South Korea",
    "code": "KR",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 82",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0266/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/kr/"
  },
  {
    "name": "Sri Lanka",
    "code": "LK",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 94",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lk/"
  },
  {
    "name": "Syria",
    "code": "SY",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 963",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3482/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sy/"
  },
  {
    "name": "Taiwan",
    "code": "TW",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 886",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0205/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0940/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tw/"
  },
  {
    "name": "Tajikistan",
    "code": "TJ",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 992",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2512/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tj/"
  },
  {
    "name": "Thailand",
    "code": "TH",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 66",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0850/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/th/"
  },
  {
    "name": "Timor-Leste",
    "code": "TL",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 670",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.8482/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tl/"
  },
  {
    "name": "Turkey",
    "code": "TR",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 90",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0600/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.0583/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tr/"
  },
  {
    "name": "Turkmenistan",
    "code": "TM",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 993",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1377/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tm/"
  },
  {
    "name": "United Arab Emirates",
    "code": "AE",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 971",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.2250/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ae/"
  },
  {
    "name": "Uzbekistan",
    "code": "UZ",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 998",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1427/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/uz/"
  },
  {
    "name": "Vietnam",
    "code": "VN",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 84",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.1030/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/vn/"
  },
  {
    "name": "Yemen",
    "code": "YE",
    "continent": "asia",
    "continentLabel": "Asia",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 967",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ye/"
  },
  {
    "name": "Albania",
    "code": "AL",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 355",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2598/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/al/"
  },
  {
    "name": "Andorra",
    "code": "AD",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 376",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0462/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ad/"
  },
  {
    "name": "Austria",
    "code": "AT",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 43",
    "numberTypes": [
      "Mobile Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0108/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0108/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0085/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1946/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/at/"
  },
  {
    "name": "Belarus",
    "code": "BY",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 375",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5443/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/by/"
  },
  {
    "name": "Belgium",
    "code": "BE",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 32",
    "numberTypes": [
      "Local Numbers",
      "Mobile Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0500/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0500/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0070/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.2591/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/be/"
  },
  {
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 387",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2430/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ba/"
  },
  {
    "name": "British Virgin Islands",
    "code": "VG",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1284",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/vg/"
  },
  {
    "name": "Bulgaria",
    "code": "BG",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 359",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.1342/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bg/"
  },
  {
    "name": "Croatia",
    "code": "HR",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 385",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2253/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.4267/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/hr/"
  },
  {
    "name": "Cyprus",
    "code": "CY",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 357",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.1027/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1138/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cy/"
  },
  {
    "name": "Czech Republic",
    "code": "CZ",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 420",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0274/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cz/"
  },
  {
    "name": "Denmark",
    "code": "DK",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 45",
    "numberTypes": [
      "National Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0135/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.3333/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/dk/"
  },
  {
    "name": "Estonia",
    "code": "EE",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 372",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0280/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ee/"
  },
  {
    "name": "Faroe Islands",
    "code": "FO",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 298",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0713/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/fo/"
  },
  {
    "name": "Finland",
    "code": "FI",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 358",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5980/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/fi/"
  },
  {
    "name": "France",
    "code": "FR",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 33",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0160/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0160/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0095/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/fr/"
  },
  {
    "name": "Germany",
    "code": "DE",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 49",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0096/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/de/"
  },
  {
    "name": "Gibraltar",
    "code": "GI",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 350",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0462/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gi/"
  },
  {
    "name": "Greece",
    "code": "GR",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 30",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0551/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1059/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gr/"
  },
  {
    "name": "Guernsey",
    "code": "GG",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gg/"
  },
  {
    "name": "Hungary",
    "code": "HU",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 36",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0110/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1967/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/hu/"
  },
  {
    "name": "Iceland",
    "code": "IS",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 354",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0242/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/is/"
  },
  {
    "name": "Ireland",
    "code": "IE",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 353",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0100/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0055/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.4965/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ie/"
  },
  {
    "name": "Italy",
    "code": "IT",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 39",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0100/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/it/"
  },
  {
    "name": "Latvia",
    "code": "LV",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound Only",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 371",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.8460/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lv/"
  },
  {
    "name": "Liechtenstein",
    "code": "LI",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 423",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1132/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/li/"
  },
  {
    "name": "Lithuania",
    "code": "LT",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 370",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2265/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.0512/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lt/"
  },
  {
    "name": "Luxembourg",
    "code": "LU",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 352",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0162/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lu/"
  },
  {
    "name": "Macedonia",
    "code": "MK",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 389",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2220/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mk/"
  },
  {
    "name": "Malta",
    "code": "MT",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 356",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0097/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mt/"
  },
  {
    "name": "Martinique",
    "code": "MQ",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 596",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0139/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mq/"
  },
  {
    "name": "Moldova",
    "code": "MD",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 373",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4482/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/md/"
  },
  {
    "name": "Monaco",
    "code": "MC",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 377",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1132/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mc/"
  },
  {
    "name": "Montenegro",
    "code": "ME",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 382",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2513/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/me/"
  },
  {
    "name": "Netherlands",
    "code": "NL",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 31",
    "numberTypes": [
      "Local Numbers",
      "Mobile Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0110/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0110/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.1530/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/nl/"
  },
  {
    "name": "Norway",
    "code": "NO",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 47",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0130/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/no/"
  },
  {
    "name": "Poland",
    "code": "PL",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 48",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0240/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0240/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0085/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pl/"
  },
  {
    "name": "Portugal",
    "code": "PT",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 351",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0031/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pt/"
  },
  {
    "name": "Romania",
    "code": "RO",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 40",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0180/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ro/"
  },
  {
    "name": "Russia",
    "code": "RU",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound Only",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 7",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0330/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ru/"
  },
  {
    "name": "San Marino",
    "code": "SM",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 378",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0378/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sm/"
  },
  {
    "name": "Serbia",
    "code": "RS",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 381",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2387/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/rs/"
  },
  {
    "name": "Slovakia",
    "code": "SK",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 421",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0042/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.2766/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sk/"
  },
  {
    "name": "Slovenia",
    "code": "SI",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 386",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2566/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.3067/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/si/"
  },
  {
    "name": "Spain",
    "code": "ES",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 34",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0113/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.2642/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/es/"
  },
  {
    "name": "Sweden",
    "code": "SE",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 46",
    "numberTypes": [
      "Local Numbers",
      "Mobile Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0120/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0120/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0065/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/se/"
  },
  {
    "name": "Switzerland",
    "code": "CH",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 41",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0280/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.1635/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ch/"
  },
  {
    "name": "Ukraine",
    "code": "UA",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 380",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2013/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0110/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ua/"
  },
  {
    "name": "United Kingdom",
    "code": "GB",
    "continent": "europe",
    "continentLabel": "Europe",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 44",
    "numberTypes": [
      "Local Numbers",
      "Mobile Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0072/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0030/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0072/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0075/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0072/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0470/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gb/"
  },
  {
    "name": "Algeria",
    "code": "DZ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 213",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1480/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/dz/"
  },
  {
    "name": "Angola",
    "code": "AO",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 244",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0569/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ao/"
  },
  {
    "name": "Benin",
    "code": "BJ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 229",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5857/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bj/"
  },
  {
    "name": "Botswana",
    "code": "BW",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 267",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1421/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bw/"
  },
  {
    "name": "Burkina Faso",
    "code": "BF",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 226",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bf/"
  },
  {
    "name": "Burundi",
    "code": "BI",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 257",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.9580/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/bi/"
  },
  {
    "name": "Cameroon",
    "code": "CM",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 237",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4433/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cm/"
  },
  {
    "name": "Cape Verde",
    "code": "CV",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 238",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2658/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cv/"
  },
  {
    "name": "Central African Republic",
    "code": "CF",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 236",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6950/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cf/"
  },
  {
    "name": "Chad",
    "code": "TD",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 235",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.8990/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/td/"
  },
  {
    "name": "Comoros",
    "code": "KM",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 269",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6135/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/km/"
  },
  {
    "name": "Democratic Republic Congo",
    "code": "CD",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 243",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7281/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cd/"
  },
  {
    "name": "Djibouti",
    "code": "DJ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 253",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5483/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/dj/"
  },
  {
    "name": "Egypt",
    "code": "EG",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 20",
    "numberTypes": [
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1380/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/eg/"
  },
  {
    "name": "Equatorial Guinea",
    "code": "GQ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 240",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.8001/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gq/"
  },
  {
    "name": "Eritrea",
    "code": "ER",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 291",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3896/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/er/"
  },
  {
    "name": "Ethiopia",
    "code": "ET",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 251",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.3574/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/et/"
  },
  {
    "name": "Gabon",
    "code": "GA",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 241",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5995/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ga/"
  },
  {
    "name": "Gambia",
    "code": "GM",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 220",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.9038/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gm/"
  },
  {
    "name": "Ghana",
    "code": "GH",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 233",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4180/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0170/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gh/"
  },
  {
    "name": "Guinea",
    "code": "GN",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 224",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7451/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gn/"
  },
  {
    "name": "Guinea-Bissau",
    "code": "GW",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 245",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.8552/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gw/"
  },
  {
    "name": "Ivory Coast",
    "code": "CI",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 225",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5405/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ci/"
  },
  {
    "name": "Kenya",
    "code": "KE",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 254",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3780/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ke/"
  },
  {
    "name": "Lesotho",
    "code": "LS",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 266",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6468/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ls/"
  },
  {
    "name": "Liberia",
    "code": "LR",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 231",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6589/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/lr/"
  },
  {
    "name": "Libya",
    "code": "LY",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 218",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4480/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ly/"
  },
  {
    "name": "Madagascar",
    "code": "MG",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 261",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.8650/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mg/"
  },
  {
    "name": "Malawi",
    "code": "MW",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 265",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5321/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mw/"
  },
  {
    "name": "Mali",
    "code": "ML",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 223",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3042/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ml/"
  },
  {
    "name": "Mauritania",
    "code": "MR",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 222",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7939/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mr/"
  },
  {
    "name": "Mauritius",
    "code": "MU",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 230",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2377/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mu/"
  },
  {
    "name": "Morocco",
    "code": "MA",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 212",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3180/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ma/"
  },
  {
    "name": "Mozambique",
    "code": "MZ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 258",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0778/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mz/"
  },
  {
    "name": "Namibia",
    "code": "NA",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 264",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0717/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/na/"
  },
  {
    "name": "Niger",
    "code": "NE",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 227",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5373/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ne/"
  },
  {
    "name": "Nigeria",
    "code": "NG",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 234",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1580/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ng/"
  },
  {
    "name": "Reunion",
    "code": "RE",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 262",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1085/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/re/"
  },
  {
    "name": "Rwanda",
    "code": "RW",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 250",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4060/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/rw/"
  },
  {
    "name": "Sao Tome and Principe",
    "code": "ST",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 239",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.7830/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/st/"
  },
  {
    "name": "Senegal",
    "code": "SN",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 221",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.3290/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sn/"
  },
  {
    "name": "Seychelles",
    "code": "SC",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 248",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sc/"
  },
  {
    "name": "Sierra Leone",
    "code": "SL",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 232",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7941/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sl/"
  },
  {
    "name": "Somalia",
    "code": "SO",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 252",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7851/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/so/"
  },
  {
    "name": "South Africa",
    "code": "ZA",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 27",
    "numberTypes": [
      "Local Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.2480/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/za/"
  },
  {
    "name": "South Sudan",
    "code": "SS",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6480/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ss/"
  },
  {
    "name": "Sudan",
    "code": "SD",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 249",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2580/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sd/"
  },
  {
    "name": "Swaziland",
    "code": "SZ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 268",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.1345/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sz/"
  },
  {
    "name": "Tanzania",
    "code": "TZ",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 255",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4655/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tz/"
  },
  {
    "name": "Togo",
    "code": "TG",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 228",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.0380/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tg/"
  },
  {
    "name": "Tunisia",
    "code": "TN",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 216",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.1980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tn/"
  },
  {
    "name": "Uganda",
    "code": "UG",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 256",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.6134/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ug/"
  },
  {
    "name": "Zambia",
    "code": "ZM",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 260",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.5756/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/zm/"
  },
  {
    "name": "Zimbabwe",
    "code": "ZW",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 263",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.2980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/zw/"
  },
  {
    "name": "congo",
    "code": "CG",
    "continent": "africa",
    "continentLabel": "Africa",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 242",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7319/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/cg/"
  },
  {
    "name": "American-Samoa",
    "code": "AS",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1684",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/as/"
  },
  {
    "name": "Australia",
    "code": "AU",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 61",
    "numberTypes": [
      "Local Numbers",
      "Mobile Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0188/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0025/min"
        }
      },
      {
        "key": "mobile",
        "label": "Mobile Numbers",
        "outbound": {
          "note": "Starts at",
          "value": "$0.0188/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0075/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.0450/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/au/"
  },
  {
    "name": "Cook Islands",
    "code": "CK",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 682",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.7980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ck/"
  },
  {
    "name": "Fiji",
    "code": "FJ",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 679",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/fj/"
  },
  {
    "name": "French Polynesia",
    "code": "PF",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 689",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4480/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pf/"
  },
  {
    "name": "Guam",
    "code": "GU",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 1671",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0340/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/gu/"
  },
  {
    "name": "Marshall Islands",
    "code": "MH",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 692",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.4980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/mh/"
  },
  {
    "name": "Micronesia",
    "code": "FM",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 691",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.8980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/fm/"
  },
  {
    "name": "New Caledonia",
    "code": "NC",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 687",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.3480/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/nc/"
  },
  {
    "name": "New Zealand",
    "code": "NZ",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": true,
    "countryCode": "+ 64",
    "numberTypes": [
      "Local Numbers",
      "Toll-free Numbers"
    ],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": true,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.0190/min"
        },
        "inbound": {
          "note": "",
          "value": "$0.0063/min"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "$0.2082/min"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/nz/"
  },
  {
    "name": "Niue",
    "code": "NU",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 683",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.5980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/nu/"
  },
  {
    "name": "Norfolk Island",
    "code": "NF",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/nf/"
  },
  {
    "name": "Palau",
    "code": "PW",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 680",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$0.7980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pw/"
  },
  {
    "name": "Papua New Guinea",
    "code": "PG",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 675",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.3100/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/pg/"
  },
  {
    "name": "Samoa",
    "code": "WS",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 685",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.9980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/ws/"
  },
  {
    "name": "Solomon Islands",
    "code": "SB",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 677",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$1.8480/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/sb/"
  },
  {
    "name": "Tonga",
    "code": "TO",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 676",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.1980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/to/"
  },
  {
    "name": "Tuvalu",
    "code": "TV",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 688",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": false,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/tv/"
  },
  {
    "name": "Vanuatu",
    "code": "VU",
    "continent": "oceania",
    "continentLabel": "Oceania",
    "deliveryType": "Inbound & Outbound",
    "outbound": true,
    "inbound": false,
    "countryCode": "+ 678",
    "numberTypes": [],
    "features": {
      "makeCallsToPstn": true,
      "receiveCallsFromPstn": false,
      "secureTrunking": true
    },
    "pricingRows": [
      {
        "key": "local",
        "label": "Local Numbers",
        "outbound": {
          "note": "",
          "value": "$2.1980/min"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      },
      {
        "key": "tollfree",
        "label": "Toll-Free Numbers",
        "outbound": {
          "note": "",
          "value": "Not Supported"
        },
        "inbound": {
          "note": "",
          "value": "Not Supported"
        }
      }
    ],
    "pricingPath": "/sip-trunking/pricing/vu/"
  }
] as SIPCoverageCountry[];

export const SIP_COVERAGE_COUNTRY_MAP: Record<string, SIPCoverageCountry> = Object.fromEntries(
  SIP_COVERAGE_COUNTRIES.map((country) => [country.code, country])
) as Record<string, SIPCoverageCountry>;

export const SIP_COVERAGE_COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  SIP_COVERAGE_COUNTRIES.map((country) => [country.code, country.name])
) as Record<string, string>;
