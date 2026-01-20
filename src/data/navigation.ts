// Plivo Navigation Data - Exact match to plivo.com

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
  badge?: string;
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

// Main navigation - exact match to plivo.com header
export const mainNavigation: NavDropdown[] = [
  {
    title: "AI Agents",
    href: "/platform/ai-agents/",
  },
  {
    title: "Platform",
    sections: [
      {
        title: "Features",
        items: [
          {
            title: "Personalize Your AI Agent",
            description: "Train agents on your brand, policies and data for tailored responses",
            href: "/platform/personalized-agents/",
            icon: "sparkles",
          },
          {
            title: "No-code Agent Studio",
            description: "Create powerful AI Agents with no-code in minutes using our drag-and-drop builder",
            href: "/platform/ai-agents-builder/",
            icon: "wand",
          },
          {
            title: "Integrations",
            description: "Connect your tools so agents can fetch data and act in real time",
            href: "/integrations/",
            icon: "link",
          },
        ],
      },
      {
        title: "Channels",
        items: [
          {
            title: "Voice",
            description: "AI voice agents that answer, assist, and automate customer calls",
            href: "/voice/overview/",
            icon: "phone-call",
          },
          {
            title: "WhatsApp Message",
            description: "AI agents to sell, support, and engage customers 24/7 on WhatsApp",
            href: "/whatsapp/",
            icon: "whatsapp",
          },
          {
            title: "WhatsApp Call",
            description: "AI Agents that handle your customer conversations over WhatsApp Call",
            href: "/whatsapp/call/",
            icon: "whatsapp-call",
          },
          {
            title: "SMS",
            description: "Secure OTPs and AI-driven customer engagement at scale",
            href: "/sms/overview/",
            icon: "message-square",
          },
          {
            title: "Chat",
            description: "Real-time AI chat agents for support, lead capture, and retention",
            href: "/chat/overview/",
            icon: "messages-square",
          },
        ],
      },
    ],
    bottomItems: [
      {
        title: "Verify",
        href: "/verify/",
        icon: "shield-check",
      },
      {
        title: "Number Masking",
        href: "/number-masking/",
        icon: "eye-off",
      },
      {
        title: "Phone Numbers",
        href: "/phone-numbers/",
        icon: "smartphone",
      },
      {
        title: "SIP Trunking",
        href: "/sip-trunking/",
        icon: "sip",
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
    title: "Contact Sales",
    href: "/contact/sales/",
  },
];

// CTA button
export const ctaNavigation: NavItem = {
  title: "Get Access",
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
      { title: "Personalize Your AI Agent", href: "/platform/personalized-agents/" },
      { title: "Human handoff", href: "/platform/human-handoff/" },
      { title: "MCP Tools & Actions", href: "/platform/mcp-tools/" },
      { title: "Pricing", href: "/pricing/" },
    ],
  },
  channels: {
    title: "Channels",
    items: [
      { title: "Voice", href: "/voice/overview/" },
      { title: "SMS", href: "/sms/overview/" },
      { title: "WhatsApp Message", href: "/whatsapp/" },
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
      { title: "API Login", href: "https://console.plivo.com/", external: true },
      { title: "Documentation", href: "https://www.plivo.com/docs/", external: true },
      { title: "Platform Status", href: "https://status.plivo.com/", external: true },
      { title: "Twilio Alternative", href: "/compare/twilio-alternative/" },
      { title: "API Reference", href: "https://www.plivo.com/docs/voice/api/overview/", external: true },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog/" },
      { title: "Guides", href: "/guide/" },
      { title: "Knowledge Base", href: "https://support.plivo.com/", external: true },
      { title: "Content Library", href: "/resources/" },
      { title: "Get Support", href: "https://support.plivo.com/", external: true },
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
      { title: "Talk to Sales", href: "/contact/sales/" },
      { title: "Legal", href: "/legal/tos/" },
    ],
  },
};

// Social links - matches plivo.com
export const socialLinks = [
  { name: "YouTube", href: "https://www.youtube.com/@Plivo_Inc", icon: "youtube" },
  { name: "X", href: "https://twitter.com/plaboratories", icon: "twitter" },
  { name: "Facebook", href: "https://www.facebook.com/paboratories", icon: "facebook" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/plivo", icon: "linkedin" },
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
