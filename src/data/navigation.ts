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

// Main navigation - Products, Solutions, Developers, Resources, Pricing
export const mainNavigation: NavDropdown[] = [
  {
    title: "Products",
    sections: [
      {
        title: "AI Agents",
        items: [
          {
            title: "Programmable AI Agents",
            description: "Modular building blocks from Audio Streaming to ASR, Turn detection, TTS to build your voice AI agents",
            href: "/platform/ai-agents/",
            icon: "sparkles",
          },
          {
            title: "No-code AI Agent Studio",
            description: "Build, test and deploy omnichannel AI agents within minutes using our drag and drop vibe agent builder",
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
            description: "Enable your AI agents with voice call connectivity in 100+ countries",
            href: "/voice/overview/",
            icon: "phone-call",
            subLinks: [
              { title: "Audio Streaming", href: "/voice/audio-streaming/" },
              { title: "SIP Trunking", href: "/sip-trunking/" },
            ],
          },
          {
            title: "Messaging",
            description: "Multi-channel messaging APIs built for global connectivity & scale",
            href: "/sms/overview/",
            icon: "message-square",
            subLinks: [
              { title: "SMS", href: "/sms/overview/" },
              { title: "Chat", href: "/chat/overview/" },
              { title: "RCS", href: "/rcs/" },
            ],
          },
          {
            title: "WhatsApp",
            description: "Build AI agents with messaging and calling for 2B+ WhatsApp users",
            href: "/whatsapp/",
            icon: "whatsapp",
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
        title: "Phone Numbers",
        href: "/phone-numbers/",
        icon: "smartphone",
      },
    ],
  },
  {
    title: "Solutions",
    sections: [
      {
        title: "Use Cases",
        items: [
          {
            title: "Lead Qualification",
            description: "Automatically qualify, score, and route leads to your sales team",
            href: "/solutions/lead-qualification/",
            icon: "target",
          },
          {
            title: "Customer Support",
            description: "24/7 AI-powered support across voice, SMS, and WhatsApp",
            href: "/solutions/customer-support/",
            icon: "headphones",
          },
          {
            title: "Appointment Booking",
            description: "Automate scheduling, reminders, and confirmations",
            href: "/solutions/appointment-booking/",
            icon: "calendar",
          },
          {
            title: "Sales & Outreach",
            description: "Scale outbound campaigns with AI-powered calling and messaging",
            href: "/solutions/sales-outreach/",
            icon: "trending-up",
          },
          {
            title: "Verification & OTP",
            description: "Secure user authentication with SMS, voice, and WhatsApp OTPs",
            href: "/solutions/verification/",
            icon: "shield-check",
          },
          {
            title: "Alerts & Notifications",
            description: "Real-time alerts and updates across all channels",
            href: "/solutions/alerts-notifications/",
            icon: "bell",
          },
          {
            title: "AI Receptionist",
            description: "Intelligent call answering, routing, and IVR automation",
            href: "/solutions/ai-receptionist/",
            icon: "phone-call",
          },
          {
            title: "Dispatch & Logistics",
            description: "Coordinate deliveries and field operations in real-time",
            href: "/solutions/dispatch-logistics/",
            icon: "truck",
          },
        ],
      },
      {
        title: "Industries",
        items: [
          {
            title: "Healthcare",
            description: "HIPAA-compliant patient engagement and care coordination",
            href: "/industries/healthcare/",
            icon: "heart-pulse",
          },
          {
            title: "Financial Services",
            description: "Secure, compliant communications for banking and insurance",
            href: "/industries/financial-services/",
            icon: "landmark",
          },
          {
            title: "Retail & eCommerce",
            description: "Drive sales and deliver exceptional customer experiences",
            href: "/industries/retail-ecommerce/",
            icon: "shopping-cart",
          },
          {
            title: "Travel & Hospitality",
            description: "Seamless guest communications and reservation management",
            href: "/industries/travel-hospitality/",
            icon: "plane",
          },
          {
            title: "Logistics & Home Services",
            description: "Streamline dispatch, scheduling, and field coordination",
            href: "/industries/logistics-home-services/",
            icon: "truck",
          },
          {
            title: "Education",
            description: "Engage students, parents, and staff across all channels",
            href: "/industries/education/",
            icon: "graduation-cap",
          },
          {
            title: "Real Estate",
            description: "Automate lead follow-up and property showing scheduling",
            href: "/industries/real-estate/",
            icon: "building",
          },
        ],
      },
    ],
  },
  {
    title: "Developers",
    sections: [
      {
        title: "Documentation",
        items: [
          {
            title: "Getting Started",
            description: "Quick start guides and tutorials",
            href: "https://www.plivo.com/docs/",
            icon: "book-open",
          },
          {
            title: "API Reference",
            description: "Complete API documentation for all endpoints",
            href: "https://www.plivo.com/docs/voice/api/overview/",
            icon: "code",
          },
          {
            title: "SDKs & Libraries",
            description: "Official SDKs for Python, Node.js, Ruby, and more",
            href: "https://www.plivo.com/docs/sdks/",
            icon: "package",
          },
          {
            title: "Platform Status",
            description: "Real-time system status and uptime",
            href: "https://status.plivo.com/",
            icon: "activity",
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            title: "Knowledge Base",
            description: "FAQs, troubleshooting, and how-to articles",
            href: "https://support.plivo.com/",
            icon: "help-circle",
          },
          {
            title: "Community",
            description: "Connect with other developers",
            href: "https://community.plivo.com/",
            icon: "users",
          },
          {
            title: "Contact Support",
            description: "Get help from our technical team",
            href: "/support/",
            icon: "headphones",
          },
        ],
      },
    ],
  },
  {
    title: "Resources",
    sections: [
      {
        title: "Learn",
        items: [
          {
            title: "Blog",
            description: "Product updates, engineering deep-dives, and AI insights",
            href: "/blog/",
            icon: "pen-line",
          },
          {
            title: "Guides",
            description: "Implementation guides and developer tutorials",
            href: "/guide/",
            icon: "book-open",
          },
          {
            title: "Content Library",
            description: "Ebooks, case studies, and industry reports",
            href: "/resources/",
            icon: "folder",
          },
        ],
      },
      {
        title: "Company",
        items: [
          {
            title: "About Us",
            description: "Our story, mission, and leadership team",
            href: "/about/",
            icon: "building",
          },
          {
            title: "Customers",
            description: "Success stories from companies using Plivo",
            href: "/customers/",
            icon: "star",
          },
          {
            title: "Jobs",
            description: "Open positions and career opportunities",
            href: "/jobs/",
            icon: "briefcase",
          },
        ],
      },
    ],
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
  communications: {
    title: "Communications",
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
