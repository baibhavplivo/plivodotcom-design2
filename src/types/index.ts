export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
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
}

export interface CTAProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  step?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  logo?: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: string | number;
  unit?: string;
  features: string[];
  cta: CTAProps;
  highlighted?: boolean;
}

export interface PriceRate {
  country: string;
  countryCode: string;
  inbound: number;
  outbound: number;
  sms?: number;
}

export interface CustomerLogo {
  name: string;
  src: string;
  alt: string;
  region?: string;
  industry?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  description: string;
  slug: string;
  pubDate: Date;
  author: string;
  image?: string;
  categories: string[];
  readTime: string;
}

export interface ComplianceBadge {
  id: string;
  name: string;
  icon: string;
}
