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
        title: "AI Agents",
        items: [
          {
            title: "Programmable AI Agents",
            description:
              "Modular building blocks from Audio Streaming to ASR, Turn detection, TTS to build your voice AI agents",
            href: "/platform/ai-agents/",
            icon: "sparkles",
          },
          {
            title: "No-code AI Agent Studio",
            description:
              "Build, test and deploy omnichannel AI agents within minutes using our drag and drop vibe agent builder",
            href: "/platform/ai-agents-builder/",
            icon: "wand",
          },
        ],
      },
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
  href: "https://console.plivo.com/accounts/register/",
  external: true,
};

// Footer navigation - matches plivo.com exactly
export const footerNavigation = {
  platform: {
    title: "Platform",
    items: [
      { title: "AI Agents", href: "/platform/ai-agents/" },
      { title: "No-Code Agent Studio", href: "/platform/ai-agents-builder/" },
      {
        title: "Personalize Your AI Agent",
        href: "/platform/personalized-agents/",
      },
      { title: "Human handoff", href: "/platform/human-handoff/" },
      { title: "MCP Tools & Actions", href: "/platform/mcp-tools/" },
      { title: "Pricing", href: "/pricing/" },
    ],
  },
  communications: {
    title: "Communications",
    items: [
      { title: "Voice", href: "/voice/overview/" },
      { title: "SMS", href: "/sms/overview/" },
      { title: "WhatsApp Message", href: "/whatsapp/overview/" },
      { title: "WhatsApp Call", href: "/whatsapp/call/" },
      { title: "Chat", href: "/chat/overview/" },
      { title: "RCS", href: "/rcs/" },
    ],
  },
  aiAgents: {
    title: "AI Agents",
    items: [
      { title: "Lead Qualification", href: "/use-cases/lead-qualification/" },
      { title: "Customer Support", href: "/use-cases/customer-support/" },
      { title: "Appointment Booking", href: "/use-cases/appointment-booking/" },
      { title: "Sales Conversion", href: "/use-cases/sales-conversion/" },
    ],
  },
  apiPlatform: {
    title: "API Platform",
    items: [
      {
        title: "API Login",
        href: "https://console.plivo.com/",
        external: true,
      },
      {
        title: "Documentation",
        href: "https://www.plivo.com/docs/",
        external: true,
      },
      {
        title: "Platform Status",
        href: "https://status.plivo.com/",
        external: true,
      },
      { title: "Twilio Alternative", href: "/compare/twilio-alternative/" },
      {
        title: "API Reference",
        href: "https://www.plivo.com/docs/voice/api/overview/",
        external: true,
      },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog/" },
      { title: "Guides", href: "/guide/" },
      {
        title: "Knowledge Base",
        href: "https://support.plivo.com/",
        external: true,
      },
      { title: "Content Library", href: "/resources/" },
      {
        title: "Get support",
        href: "https://support.plivo.com/",
        external: true,
      },
      { title: "Support Plans", href: "/support-plans/" },
      { title: "Security", href: "/security/" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { title: "About", href: "/about/" },
      { title: "Customers", href: "/customers/" },
      { title: "Jobs", href: "/jobs/" },
      { title: "Talk to sales", href: "/contact/sales/" },
      { title: "Legal", href: "/legal/tos/" },
      { title: "Design System", href: "/design-system/" },
    ],
  },
};

// Social links - matches plivo.com
export const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Plivo_Inc",
    icon: "youtube",
  },
  { name: "X", href: "https://twitter.com/plaboratories", icon: "twitter" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/paboratories",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/plivo",
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
