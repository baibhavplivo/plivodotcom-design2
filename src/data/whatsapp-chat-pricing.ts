// Static WhatsApp Message pricing data sourced from the live Plivo pricing page on April 1, 2026.
// Sources:
// - https://www.plivo.com/whatsapp-message/pricing/in/
// - https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYIs5NmkcMiH9cFl_wv8VPogqDbQIO6X3Sx0yEEr-FqcANPw5Dm4U77sqfyMk80stTyW5l2WubBSo/pub?output=csv
// - https://cdn.prod.website-files.com/6565737286e587567248583f/67efaa961229ab650e108791_country-iso.csv

export interface WhatsAppChatPricingValue {
  marketing: number;
  utility: number;
  authentication: number;
  authenticationIntl: number;
  service: number;
  currency: "$" | "₹";
}

export interface WhatsAppChatMetaMessageType {
  type: string;
  description: string;
}

export interface WhatsAppChatPricingFaq {
  question: string;
  answer: string;
}

export const WHATSAPP_CHAT_DEFAULT_COUNTRY_CODE = "US";
export const WHATSAPP_CHAT_PLATFORM_FEE = "$0.00080";
export const WHATSAPP_CHAT_PLATFORM_FEE_UNIT = "conversation";
export const WHATSAPP_CHAT_PRIORITY_CODES = ["US", "CA", "GB", "AU", "IN", "FR"] as const;

export const WHATSAPP_CHAT_PAGE_COPY = {
  title: "WhatsApp Pricing",
  subtitle: "Simplified pricing for all WhatsApp messages",
  metaFeeTitle: "Meta Fee",
  metaFeeDescription:
    "Meta charges a fee per conversation at rates that depend on the type of conversation.",
  metaFeeCtaLabel: "Visit Meta's website for details",
  metaFeeCtaHref: "https://developers.facebook.com/docs/whatsapp/pricing",
  platformFeeTitle: "Plivo Platform Fee",
  platformFeeDescription: "Pay per conversation, not per message.",
  platformFeeFootnote:
    "One fee for any conversation, anywhere, with no extra charge for media messages.",
  countrySelectorLabel: "Select Country",
  sectionNavLabel: "Jump to section",
  messagingRatesTitle: "WhatsApp Messages",
  pricingColumnLabel: "Price per message",
  metaTypesTitle: "Meta Message Types",
  metaTypesDescription:
    "Meta categorizes templates as either utility, marketing, or authentication, depending on message content.",
  metaTypesNote:
    "Note: Marketing, utility, and authentication conversations can only be opened with template messages. Service conversations can be opened with any type of message other than a template message.",
  metaTypesCtaLabel: "Visit Meta’s website for more information",
  metaTypesCtaHref: "https://developers.facebook.com/docs/whatsapp/pricing",
  metaTypesIntroHref:
    "https://developers.facebook.com/docs/whatsapp/updates-to-pricing/new-template-guidelines",
  metaTypesIntroLabel: "Meta categorizes templates",
  volumeCtaTitle: "Our volume-based discounts offer significant savings",
  volumeCtaLabel: "Get Volume Pricing",
  volumeCtaHref: "https://console.plivo.com/accounts/request-trial/",
} as const;

export const WHATSAPP_CHAT_META_MESSAGE_TYPES: WhatsAppChatMetaMessageType[] = [
  {
    type: "Marketing",
    description:
      "Enables you to achieve a wide range of goals, from generating awareness to driving sales and retargeting customers. Examples include new product, service, or feature announcements, targeted promotions/offers, and cart abandonment reminders",
  },
  {
    type: "Utility",
    description:
      "Enables you to follow-up on user actions or requests. Examples include opt-in confirmation, order/delivery management (e.g., delivery update); account updates or alerts (for example., payment reminder); or feedback surveys.",
  },
  {
    type: "Authentication",
    description:
      "Enables you to authenticate users with one-time passcodes, potentially at multiple steps in the login process (e.g., account verification, account recovery, integrity challenges).",
  },
  {
    type: "Service",
    description: "Enables you to resolve customer inquiries",
  },
];

export const WHATSAPP_CHAT_PRICING_FAQS: WhatsAppChatPricingFaq[] = [
  {
    question: "Can businesses be billed in currencies other than USD or INR with Plivo?",
    answer:
      "Currently, Plivo supports billing only in USD and INR to cater to global clients efficiently.",
  },
  {
    question:
      "Does Plivo charge extra for sending multimedia messages within WhatsApp conversations?",
    answer:
      "No. Plivo supports multimedia messaging within WhatsApp conversations, allowing for a richer, more engaging customer experience without additional costs",
  },
];

export const WHATSAPP_CHAT_COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'North America', isPriority: true, pricing: { marketing: 0.0275, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.3, marketingToAuthentication: 6.3 } },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'North America', isPriority: true, pricing: { marketing: 0.0275, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.3, marketingToAuthentication: 6.3 } },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'United Kingdom', isPriority: true, pricing: { marketing: 0.05819, utility: 0.0242, authentication: 0.0242, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 2.4, marketingToAuthentication: 2.4 } },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Rest of Asia Pacific', isPriority: true, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'India', isPriority: true, pricing: { marketing: 0.8536, utility: 0.1232, authentication: 0.1232, authenticationIntl: 2.508, service: 0, currency: '₹' }, ratios: { marketingToUtility: 7.6, marketingToAuthentication: 7.6 } },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'France', isPriority: true, pricing: { marketing: 0.15752, utility: 0.033, authentication: 0.033, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.8, marketingToAuthentication: 4.8 } },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'Argentina', isPriority: false, pricing: { marketing: 0.06798, utility: 0.03179, authentication: 0.03179, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 2.1, marketingToAuthentication: 2.1 } },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Brazil', isPriority: false, pricing: { marketing: 0.06875, utility: 0.00748, authentication: 0.00748, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 9.2, marketingToAuthentication: 9.2 } },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'Chile', isPriority: false, pricing: { marketing: 0.09779, utility: 0.022, authentication: 0.022, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.4, marketingToAuthentication: 4.4 } },
  { code: 'CN', name: 'China', flag: '🇨🇳', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'Colombia', isPriority: false, pricing: { marketing: 0.01375, utility: 0.00022, authentication: 0.00022, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 62.5, marketingToAuthentication: 62.5 } },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Egypt', isPriority: false, pricing: { marketing: 0.11803, utility: 0.00572, authentication: 0.00572, authenticationIntl: 0.0715, service: 0, currency: '$' }, ratios: { marketingToUtility: 20.6, marketingToAuthentication: 20.6 } },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Germany', isPriority: false, pricing: { marketing: 0.15015, utility: 0.0605, authentication: 0.0605, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 2.5, marketingToAuthentication: 2.5 } },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Indonesia', isPriority: false, pricing: { marketing: 0.04521, utility: 0.0275, authentication: 0.0275, authenticationIntl: 0.1496, service: 0, currency: '$' }, ratios: { marketingToUtility: 1.6, marketingToAuthentication: 1.6 } },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', region: 'Israel', isPriority: false, pricing: { marketing: 0.03883, utility: 0.00583, authentication: 0.00583, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.7, marketingToAuthentication: 6.7 } },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Italy', isPriority: false, pricing: { marketing: 0.07601, utility: 0.033, authentication: 0.033, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 2.3, marketingToAuthentication: 2.3 } },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Malaysia', isPriority: false, pricing: { marketing: 0.0946, utility: 0.0154, authentication: 0.0154, authenticationIntl: 0.04598, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.1, marketingToAuthentication: 6.1 } },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'Mexico', isPriority: false, pricing: { marketing: 0.04796, utility: 0.00935, authentication: 0.00935, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.1, marketingToAuthentication: 5.1 } },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Netherlands', isPriority: false, pricing: { marketing: 0.17567, utility: 0.055, authentication: 0.055, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.2, marketingToAuthentication: 3.2 } },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Nigeria', isPriority: false, pricing: { marketing: 0.05676, utility: 0.00737, authentication: 0.00737, authenticationIntl: 0.0825, service: 0, currency: '$' }, ratios: { marketingToUtility: 7.7, marketingToAuthentication: 7.7 } },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', region: 'Pakistan', isPriority: false, pricing: { marketing: 0.05203, utility: 0.00594, authentication: 0.00594, authenticationIntl: 0.0825, service: 0, currency: '$' }, ratios: { marketingToUtility: 8.8, marketingToAuthentication: 8.8 } },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'Peru', isPriority: false, pricing: { marketing: 0.07733, utility: 0.022, authentication: 0.022, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'CG', name: 'Republic of the Congo (Brazzaville)', flag: '🇨🇬', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', region: 'Russia', isPriority: false, pricing: { marketing: 0.08822, utility: 0.044, authentication: 0.044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 2, marketingToAuthentication: 2 } },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Saudi Arabia', isPriority: false, pricing: { marketing: 0.05005, utility: 0.01265, authentication: 0.01265, authenticationIntl: 0.06578, service: 0, currency: '$' }, ratios: { marketingToUtility: 4, marketingToAuthentication: 4 } },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'South Africa', isPriority: false, pricing: { marketing: 0.04169, utility: 0.00836, authentication: 0.00836, authenticationIntl: 0.022, service: 0, currency: '$' }, ratios: { marketingToUtility: 5, marketingToAuthentication: 5 } },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Spain', isPriority: false, pricing: { marketing: 0.06765, utility: 0.022, authentication: 0.022, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.1, marketingToAuthentication: 3.1 } },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'SZ', name: 'Swaziland', flag: '🇸🇿', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Rest of Western Europe', isPriority: false, pricing: { marketing: 0.06512, utility: 0.01881, authentication: 0.01881, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.5, marketingToAuthentication: 3.5 } },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Turkey', isPriority: false, pricing: { marketing: 0.01199, utility: 0.00583, authentication: 0.00583, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 2.1, marketingToAuthentication: 2.1 } },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', region: 'Rest of Central & Eastern Europe', isPriority: false, pricing: { marketing: 0.0946, utility: 0.02332, authentication: 0.02332, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 4.1, marketingToAuthentication: 4.1 } },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'United Arab Emirates', isPriority: false, pricing: { marketing: 0.04224, utility: 0.01727, authentication: 0.01727, authenticationIntl: 0.0561, service: 0, currency: '$' }, ratios: { marketingToUtility: 2.4, marketingToAuthentication: 2.4 } },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', region: 'Rest of Latin America', isPriority: false, pricing: { marketing: 0.0814, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Rest of Asia Pacific', isPriority: false, pricing: { marketing: 0.08052, utility: 0.01243, authentication: 0.01243, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 6.5, marketingToAuthentication: 6.5 } },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', region: 'Rest of Middle East', isPriority: false, pricing: { marketing: 0.03751, utility: 0.01001, authentication: 0.01001, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 3.7, marketingToAuthentication: 3.7 } },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', region: 'Rest of Africa', isPriority: false, pricing: { marketing: 0.02475, utility: 0.0044, authentication: 0.0044, authenticationIntl: 0, service: 0, currency: '$' }, ratios: { marketingToUtility: 5.6, marketingToAuthentication: 5.6 } },
] as const;

export type WhatsAppChatCountry = (typeof WHATSAPP_CHAT_COUNTRIES)[number];

export const WHATSAPP_CHAT_COUNTRY_CODES = WHATSAPP_CHAT_COUNTRIES.map(
  (country) => country.code
);

export const WHATSAPP_CHAT_COUNTRY_NAME_BY_CODE = Object.fromEntries(
  WHATSAPP_CHAT_COUNTRIES.map((country) => [country.code, country.name])
) as Record<string, string>;

export const WHATSAPP_CHAT_COUNTRY_BY_CODE = Object.fromEntries(
  WHATSAPP_CHAT_COUNTRIES.map((country) => [country.code, country])
) as Record<string, WhatsAppChatCountry>;

export function getWhatsAppChatCountry(code?: string | null): WhatsAppChatCountry | null {
  if (!code) return null;
  return WHATSAPP_CHAT_COUNTRY_BY_CODE[code.toUpperCase()] ?? null;
}

export function getWhatsAppChatPricingMeta(countryCode?: string | null) {
  const country = getWhatsAppChatCountry(countryCode);

  if (!country) {
    return {
      title: "WhatsApp Business Pricing | Simple & Transparent Rates",
      description:
        "Get transparent WhatsApp pricing with no hidden fees. Plivo passes on Meta's official rates for messaging and offers pay-as-you-go WhatsApp conversations with a simple platform fee.",
      countryName: null,
    };
  }

  return {
    title: `WhatsApp Business Pricing for ${country.name} | Simple & Transparent Rates`,
    description: `Get transparent WhatsApp Business pricing for ${country.name} with no hidden fees. Plivo passes on Meta's official conversation rates and adds a simple pay-as-you-go platform fee.`,
    countryName: country.name,
  };
}
