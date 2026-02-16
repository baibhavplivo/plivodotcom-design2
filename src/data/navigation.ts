// Plivo Navigation Data - Exact match to plivo.com

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
  badge?: string;
  subLinks?: { title: string; href: string }[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavDropdown {
  title: string;
  href?: string;
  sections?: NavSection[];
  items?: NavItem[];
  bottomItems?: NavItem[];
}

// Main navigation - AI Agents, Platform, Documentation, Pricing
export const mainNavigation: NavDropdown[] = [
  {
    title: "AI Agents",
    href: "/platform/ai-agents/",
  },
  {
    title: "Platform",
    sections: [
      {
        title: "Communications",
        items: [
          {
            title: "Voice",
            description:
              "Enable your AI agents with voice call connectivity in 100+ countries",
            href: "/voice/overview/",
            icon: "phone-call",
          },
          {
            title: "SMS",
            description:
              "Multi-channel messaging APIs built for global connectivity & scale",
            href: "/sms/overview/",
            icon: "message-square",
          },
          {
            title: "WhatsApp",
            description:
              "Build AI agents with messaging and calling for 2B+ WhatsApp users",
            href: "/whatsapp/overview/",
            icon: "whatsapp",
          },
          {
            title: "Chat",
            description:
              "AI chat agents that resolve customer queries instantly, 24/7",
            href: "/chat/overview/",
            icon: "message-circle",
          },
        ],
      },
    ],
    bottomItems: [
      {
        title: "SIP trunking",
        href: "/voice/sip-trunking/",
        icon: "sip",
      },
      {
        title: "Verify",
        href: "/sms/verify-api/",
        icon: "shield-check",
      },
      {
        title: "Phone Numbers",
        href: "/phone-numbers/",
        icon: "smartphone",
      },
    ],
  },
  {
    title: "Documentation",
    href: "https://www.plivo.com/docs/",
  },
  {
    title: "Pricing",
    href: "/pricing/",
  },
];

// Secondary navigation (right side before CTA)
export const secondaryNavigation: NavItem[] = [
  {
    title: "Contact sales",
    href: "/contact/sales/",
  },
];

// CTA button
export const ctaNavigation: NavItem = {
  title: "Get started now",
  href: "https://cx.plivo.com/",
  external: true,
};

// Footer navigation - matches plivo.com exactly
export const footerNavigation = {
  platform: {
    title: "Platform",
    items: [
      { title: "AI Agents", href: "/platform/ai-agents/" },
      { title: "Pricing", href: "/pricing/" },
    ],
  },
  communications: {
    title: "Communications",
    items: [
      { title: "Voice", href: "/voice/overview/" },
      { title: "SMS", href: "/sms/overview/" },
      { title: "WhatsApp", href: "/whatsapp/overview/" },
      { title: "Chat", href: "/chat/overview/" },
    ],
  },
  apiPlatform: {
    title: "API platform",
    items: [
      {
        title: "API login",
        href: "https://console.plivo.com/",
        external: true,
      },
      {
        title: "Documentation",
        href: "https://www.plivo.com/docs/",
        external: true,
      },
      {
        title: "Platform status",
        href: "https://status.plivo.com/",
        external: true,
      },
      {
        title: "API reference",
        href: "https://www.plivo.com/docs/voice/api/overview/",
        external: true,
      },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog/" },
      {
        title: "Knowledge base",
        href: "https://support.plivo.com/",
        external: true,
      },
      {
        title: "Get support",
        href: "https://support.plivo.com/",
        external: true,
      },
      { title: "Security", href: "/security/" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { title: "About", href: "/about/" },
      { title: "Jobs", href: "/jobs/" },
      { title: "Talk to sales", href: "/contact/sales/" },
      { title: "Legal", href: "/legal/tos/" },
    ],
  },
};

// Social links - matches plivo.com
export const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@plivo",
    icon: "youtube",
  },
  { name: "X", href: "https://x.com/plivo", icon: "twitter" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Plivo/",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/plivo-inc",
    icon: "linkedin",
  },
  { name: "GitHub", href: "https://github.com/plivo", icon: "github" },
];

// Trust badges / compliance
export const complianceBadges = [
  { id: "hipaa", name: "HIPAA" },
  { id: "gdpr", name: "GDPR" },
  { id: "soc2", name: "AICPA SOC 2" },
  { id: "pci", name: "PCI DSS" },
  { id: "star", name: "STAR" },
];

// Stats for social proof - matches plivo.com
export const socialProofStats = [
  { value: "99.99%", label: "Platform Uptime" },
  { value: "1 Billion+", label: "Conversations Processed Annually" },
];

// Customer logos for marquee
export const customerLogos = [
  { name: "Meta", src: "/images/logos/meta.svg" },
  { name: "Hoka", src: "/images/logos/hoka.svg" },
  { name: "Discord", src: "/images/logos/discord.svg" },
  { name: "Trip", src: "/images/logos/trip.svg" },
  { name: "GoDaddy", src: "/images/logos/godaddy.svg" },
  { name: "Atomberg", src: "/images/logos/atomberg.svg" },
  { name: "Tata 1mg", src: "/images/logos/tata1mg.svg" },
];
