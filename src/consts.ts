// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "AI Agents to Automate Your Customer Engagement";
export const SITE_DESCRIPTION =
  "Purpose-built AI Agents that convert, engage, and support customers 24/7 by automating conversations across Voice, Chat, SMS, and WhatsApp. Choose from a range of specialized agents or create custom AI agents - no coding required.";

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: "%s | Plivo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI Agents",
    "Voice AI",
    "Conversational AI",
    "Customer Engagement",
    "SMS API",
    "Voice API",
    "WhatsApp Business",
    "Chat Automation",
    "Customer Support AI",
    "No-code AI",
    "Plivo",
  ],
  authors: [{ name: "Plivo" }],
  creator: "Plivo",
  publisher: "Plivo Inc.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "256x256" }],
    shortcut: [{ url: "/favicon/favicon-32x32.png" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Plivo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plivo - AI Agents to Automate Your Customer Engagement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@plivo",
    site: "@plivo",
  },
};
