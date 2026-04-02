import type { SyncedLegalDocumentKey } from "./synced-documents";

export const legalArchiveRoutes = [
  {
    section: "tos",
    version: "previous-tos",
    pageKey: "tosPrevious",
    activePage: "/legal/tos/",
    title: "Terms of Service Previous Version | Plivo",
    description: "Archived previous version of Plivo Terms of Service.",
  },
  {
    section: "privacy",
    version: "2024",
    pageKey: "privacy2024",
    activePage: "/legal/privacy/",
    title: "Privacy Policy Previous Version | Plivo",
    description: "Archived previous version of Plivo Privacy Policy.",
  },
  {
    section: "aup",
    version: "aup-2024-12-20",
    pageKey: "aup20241220",
    activePage: "/legal/aup/",
    title: "Acceptable Use Policy Previous Version | Plivo",
    description: "Archived previous version of Plivo Acceptable Use Policy.",
  },
  {
    section: "aup",
    version: "2021",
    pageKey: "aup2021",
    activePage: "/legal/aup/",
    title: "Acceptable Use Policy 2021 | Plivo",
    description: "Archived 2021 version of Plivo Acceptable Use Policy.",
  },
  {
    section: "supplemental",
    version: "2023",
    pageKey: "supplemental2023",
    activePage: "/legal/supplemental/",
    title: "Supplemental Terms Previous Version | Plivo",
    description:
      "Archived previous version of Plivo Supplemental Terms for WhatsApp Business Solution.",
  },
  {
    section: "responsible-disclosure",
    version: "2021",
    pageKey: "responsibleDisclosure2021",
    activePage: "/legal/responsible-disclosure/",
    title: "Responsible Disclosure Policy 2021 | Plivo",
    description:
      "Archived 2021 version of Plivo Responsible Disclosure Policy.",
  },
] as const satisfies {
  section: string;
  version: string;
  pageKey: SyncedLegalDocumentKey;
  activePage: string;
  title: string;
  description: string;
}[];
