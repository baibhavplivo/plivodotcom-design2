# Plivo.com Migration Plan: Webflow → Astro

## Overview

Migrate plivo.com from Webflow to Astro, using Streamline (shadcn/ui) as the structural foundation while preserving Plivo's exact visual identity.

**Target folder:** `/Users/venky/tech/plivodotcom`
**Source design:** plivo.com (Webflow)
**Theme base:** Streamline from shadcnblocks.com
**Framework:** Astro + React islands

---

## Site Architecture

### Complete Page Inventory

#### Header Navigation Pages
| Section | Page | URL | Priority |
|---------|------|-----|----------|
| **Home** | Homepage | `/` | P0 |
| **AI Agents** | AI Agents Platform | `/platform/ai-agents/` | P0 |
| **AI Agents** | AI Agents Builder | `/platform/ai-agents-builder/` | P1 |
| **AI Agents** | Personalized Agents | `/platform/personalized-agents/` | P1 |
| **AI Agents** | AI Voice Agents | `/ai-voice-agents/` | P1 |
| **Platform** | Platform Overview | `/platform/` | P1 |
| **Platform** | Integrations | `/integrations/` | P1 |
| **Channels** | Voice Overview | `/voice/overview/` | P0 |
| **Channels** | Voice API | `/voice/` | P1 |
| **Channels** | Voice Features | `/voice/features/` | P2 |
| **Channels** | SMS Overview | `/sms/overview/` | P0 |
| **Channels** | SMS API | `/sms/` | P1 |
| **Channels** | WhatsApp AI Agents | `/whatsapp-ai-agents/` | P1 |
| **Channels** | WhatsApp API | `/whatsapp/` | P1 |
| **Channels** | WhatsApp Call | `/whatsapp/call/` | P2 |
| **Channels** | Chat Overview | `/chat/overview/` | P1 |
| **Channels** | RCS | `/rcs/` | P2 |
| **Other Products** | Verify | `/verify/` | P1 |
| **Other Products** | Virtual Phone Numbers | `/virtual-phone-numbers/` | P2 |
| **Other Products** | SIP Trunking (Zentrunk) | `/sip-trunking/` | P2 |
| **Pricing** | Main Pricing | `/pricing/` | P0 |

#### Pricing Subpages
| Page | URL | Priority |
|------|-----|----------|
| US Voice Pricing | `/voice/pricing/us/` | P1 |
| US SMS Pricing | `/sms/pricing/us/` | P1 |
| US WhatsApp Pricing | `/whatsapp/pricing/us/` | P1 |
| India Voice Pricing | `/voice/pricing/in/` | P2 |
| India SMS Pricing | `/sms/pricing/in/` | P2 |
| Verify Pricing | `/verify/pricing/` | P1 |
| SIP Trunking Pricing | `/sip-trunking/pricing/us/` | P2 |
| API Platform Pricing | `/pricing-api-platform/` | P2 |
| Support Plans | `/support-plans/` | P2 |

#### Company Pages
| Page | URL | Priority |
|------|-----|----------|
| About | `/about/` | P1 |
| Customers | `/customers/` | P1 |
| Blog | `/blog/` | P1 |
| Careers/Jobs | `/jobs/` | P2 |
| Contact Sales | `/contact/sales/` | P1 |
| Security | `/security/` | P2 |
| Legal/ToS | `/legal/tos/` | P2 |

#### Resources
| Page | URL | Priority |
|------|-----|----------|
| Resources Hub | `/resources/` | P2 |
| Guides | `/guide/` | P2 |
| Blog Articles | `/blog/[slug]/` | P1 |

#### Comparison Pages
| Page | URL | Priority |
|------|-----|----------|
| Plivo vs Bland AI | `/compare/bland-ai-vs-plivo/` | P2 |

---

## Design System Extraction

### Colors (from plivo.com)

```css
/* Primary Brand Gradient */
--plivo-purple: #cd3ef9;
--plivo-blue: #323dfe;
--plivo-gradient: linear-gradient(90deg, #cd3ef9, #323dfe);

/* Backgrounds */
--bg-white: #ffffff;
--bg-dark: rgb(15, 17, 23);
--bg-darker: rgb(0, 0, 0);

/* Text */
--text-primary: rgb(15, 17, 23);
--text-muted: rgb(107, 114, 128);
--text-light: #ffffff;

/* Accent */
--accent-teal: rgb(17, 120, 102);  /* docs */
--accent-green: #22c55e;  /* success states */

/* Borders */
--border-dark: #202020;
--border-light: #e5e7eb;
```

### Typography

```css
/* Display Font - Headlines */
font-family: 'Sora', sans-serif;
weights: 100, 200, 300, 400, 500, 600, 700, 800

/* Body Font - Text */
font-family: 'Inter', sans-serif;
weights: 400, 500, 600, 700
```

### Spacing System

```css
/* Container widths */
--container-small: 768px;
--container-medium: 1024px;
--container-large: 1200px;

/* Responsive padding */
mobile: 1rem
tablet: 2rem
desktop: 2.5rem
```

### Animation Patterns

```css
/* Marquee - Logo carousel */
animation: marquee 40s linear infinite;
transform: translateX(-50%);

/* Hover lift - CTAs and cards */
transition: transform 0.2s ease-out;
transform: translateY(-0.5rem);

/* Loading state - Barberpole */
animation: barberpole 4s linear infinite reverse;
```

---

## Component Mapping - Multi-Template Sourcing

### Component Source Priority
1. **Local Templates** (84 section components) - Already in `/templates/`
2. **shadcnblocks.com Blocks** (1,110+ blocks) - For anything not in templates
3. **shadcnblocks.com Components** (1,145 components) - UI primitives
4. **Custom Code** - LAST RESORT ONLY

### Local Template Inventory
We have **4 shadcnblocks templates** with **84 total section components**:

| Template | Path | Sections | Best For |
|----------|------|----------|----------|
| **Streamline** | `templates/streamline-astro-shadcnblocks/streamline-astro-template-1.0.0/` | 18 | Base structure, FAQ, Metrics |
| **Lumen** | `templates/lumen-astro-shadcnblocks/lumen-astro-template-1.0.0/` | 17 | Marquee, Testimonials, Carousel |
| **Metafi** | `templates/metafi-astro-shadcnblocks/metafi-astro-template-1.0.0/` | 25 | Hero, Tabs, CTA, Integrations |
| **Aspect** | `templates/aspect-astro-shadcnblocks/aspect-astro-template-1.1.0/` | 24 | Navbar, Pricing, FAQ page, Contact |

### shadcnblocks.com Online Library (Premium Access)

**URL:** https://www.shadcnblocks.com

#### Blocks (1,110+)
| Category | Count | Best For Plivo |
|----------|-------|----------------|
| Hero | 175+ | `hero103` (2-col + logo carousel), `hero201` (animated gradient) |
| Feature | 272+ | Various grid and showcase layouts |
| Pricing | 35+ | Plan cards, comparison tables |
| Testimonial | 28+ | Carousel, grid, marquee variants |
| Logos | 13+ | Marquee/carousel for customer logos |
| Stats | 18+ | Metrics display (99.99% uptime, etc.) |
| FAQ | 16+ | Accordion, tabbed, categorized |
| CTA | 26+ | Bottom-of-page conversions |
| Navbar | 18+ | Mega menu, dropdowns |
| Footer | 25+ | Multi-column layouts |
| Contact | 17+ | Forms with validation |
| Blog | 22+ | Grid, featured post layouts |
| About | 17+ | Company pages |
| Team | 14+ | Team member displays |
| Careers | 9+ | Job listings |

#### Components (1,145)
70+ categories: Accordion, Avatar, Badge, Button, Card, Carousel, Chart (70!), Dialog, Dropdown, Form (86!), Input, Navigation Menu, Pagination, Select, Tabs, Toast, Tooltip, etc.

#### How to Use
```bash
# Option 1: Copy from website
# Visit shadcnblocks.com/block/[block-name] and copy code

# Option 2: CLI (if supported)
npx shadcn@latest add [block-name]
```

### Component Source Mapping

#### Navigation & Layout
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Main Navbar | **Aspect** | `navbar.tsx` | Best mega-menu structure |
| Footer | **Streamline** | `footer.tsx` | Multi-column layout |
| Announcement Banner | **Metafi** | `banner.tsx` | Top banner |

#### Hero Sections
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Homepage Hero | **Metafi** | `metafi-hero.tsx` | Gradient + dashboard preview |
| Product Page Hero | **Aspect** | `aspect-hero.tsx` | Clean with side image |
| About Hero | **Metafi** | `metafi-about-hero.tsx` | Company pages |
| Pricing Hero | **Metafi** | `metafi-pricing-hero.tsx` | With toggle |

#### Features
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Feature Grid | **Aspect** | `aspect-features.tsx` | Flexible card layouts |
| Feature Tabs | **Metafi** | `metafi-tabs.tsx` | Auto-rotating tabs |
| Features Carousel | **Lumen** | `features-carousel.tsx` | Swiper-based |
| Metrics Display | **Streamline** | `feature1.tsx` | Stats with icons |

#### Pricing
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Pricing Cards | **Aspect** | `aspect-pricing.tsx` | 3-tier cards |
| Comparison Table | **Aspect** | `aspect-pricing-table.tsx` | Feature comparison |
| Monthly/Annual Toggle | **Streamline** | `pricing1.tsx` | Switch component |

#### Social Proof
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Logo Marquee | **Lumen** | `magicui/marquee.tsx` + `logos.tsx` | Infinite scroll |
| Testimonials Grid | **Lumen** | `testimonials.tsx` | Masonry layout |
| Testimonials Scroll | **Lumen** | `testimonials-marquee.tsx` | Auto-scroll |

#### FAQ
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| FAQ Section | **Streamline** | `faq.tsx` | 2-column accordion |
| Full FAQ Page | **Aspect** | `aspect-faq-page.tsx` | Multi-section |

#### Blog
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Blog Grid | **Metafi** | `metafi-blog-grid.tsx` | Card grid |
| Blog Post | **Lumen** | `blog-post.tsx` | Article layout |
| Featured Post | **Aspect** | `aspect-featured-post.tsx` | Highlighted |

#### Company Pages
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| About Mission | **Metafi** | `metafi-mission.tsx` | Mission statement |
| Timeline | **Metafi** | `metafi-trough-years.tsx` | History |
| Team Grid | **Metafi** | `metafi-team.tsx` | Team members |
| Job Listings | **Aspect** | `aspect-open-positions.tsx` | Careers |
| Contact Form | **Aspect** | `aspect-contact-form.tsx` | With validation |

#### Integrations
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| Integrations Grid | **Metafi** | `metafi-all-integrations.tsx` | Logo grid |
| Integrations Hero | **Metafi** | `metafi-integrations-hero.tsx` | Page header |

#### Special Components
| Plivo Need | Source | File | Notes |
|------------|--------|------|-------|
| World Map | **Aspect** | `aspect-world-map.tsx` | Global coverage |
| CTA Section | **Metafi** | `matafi-cta.tsx` | Bottom CTA |
| Dashboard Preview | **Aspect** | `aspect-dashboard.tsx` | Product preview |

### Components to Create from Scratch
**ALMOST NONE** - With 84 template components + 1,110 shadcnblocks, custom code should be rare.

Potentially custom (check shadcnblocks first!):
- `PriceCalculator.tsx` - Interactive voice/SMS pricing with volume slider
  → Check: shadcnblocks.com/blocks/pricing for similar
- `CountrySelector.tsx` - Country dropdown with flags
  → Check: shadcnblocks.com/components/select for flag support

**Rule:** Search shadcnblocks.com BEFORE writing any custom component!

### React Islands (client:load / client:visible)

**client:load (immediate interactivity):**
- Mobile navigation menu
- Price calculator
- Contact/trial forms
- Country selector (pricing)

**client:visible (lazy load):**
- Logo marquee
- Testimonial carousel
- Tabbed sections
- FAQ accordion

---

## Project Structure

```
plivodotcom/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── logos/           # Customer logos
│   │   ├── icons/           # UI icons
│   │   ├── products/        # Product screenshots
│   │   └── team/            # Team photos
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   ├── MobileMenu.tsx
│   │   │   └── MegaMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── UseCases.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── Pricing.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── CTA.astro
│   │   │   └── TrustBadges.astro
│   │   ├── interactive/
│   │   │   ├── LogoMarquee.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── PriceCalculator.tsx
│   │   │   ├── TabsSection.tsx
│   │   │   ├── CodeBlockSwitcher.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── CountrySelector.tsx
│   │   │   └── VoiceDemo.tsx
│   │   └── common/
│   │       ├── CTAButton.astro
│   │       ├── FeatureCard.astro
│   │       ├── UseCaseCard.astro
│   │       ├── PricingCard.astro
│   │       ├── TestimonialCard.astro
│   │       ├── BlogCard.astro
│   │       ├── ComplianceBadge.astro
│   │       └── GradientText.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── LegalLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── pricing.astro
│   │   ├── about.astro
│   │   ├── customers.astro
│   │   ├── jobs.astro
│   │   ├── security.astro
│   │   ├── integrations.astro
│   │   ├── platform/
│   │   │   ├── index.astro
│   │   │   ├── ai-agents.astro
│   │   │   ├── ai-agents-builder.astro
│   │   │   └── personalized-agents.astro
│   │   ├── voice/
│   │   │   ├── index.astro
│   │   │   ├── overview.astro
│   │   │   ├── features.astro
│   │   │   └── pricing/
│   │   │       ├── us.astro
│   │   │       └── in.astro
│   │   ├── sms/
│   │   │   ├── index.astro
│   │   │   ├── overview.astro
│   │   │   └── pricing/
│   │   │       ├── us.astro
│   │   │       └── in.astro
│   │   ├── whatsapp/
│   │   │   ├── index.astro
│   │   │   ├── call.astro
│   │   │   └── pricing/
│   │   │       └── us.astro
│   │   ├── whatsapp-ai-agents.astro
│   │   ├── ai-voice-agents.astro
│   │   ├── chat/
│   │   │   └── overview.astro
│   │   ├── rcs.astro
│   │   ├── verify/
│   │   │   ├── index.astro
│   │   │   └── pricing.astro
│   │   ├── virtual-phone-numbers.astro
│   │   ├── sip-trunking/
│   │   │   ├── index.astro
│   │   │   └── pricing/
│   │   │       └── us.astro
│   │   ├── contact/
│   │   │   └── sales.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── guide/
│   │   │   └── index.astro
│   │   ├── resources.astro
│   │   ├── compare/
│   │   │   └── bland-ai-vs-plivo.astro
│   │   ├── legal/
│   │   │   └── tos.astro
│   │   └── support-plans.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── blog/
│   │   │   └── *.md
│   │   ├── customers/
│   │   │   └── *.md
│   │   ├── guides/
│   │   │   └── *.md
│   │   └── testimonials/
│   │       └── *.json
│   ├── data/
│   │   ├── navigation.ts
│   │   ├── pricing.ts
│   │   ├── integrations.ts
│   │   ├── customerLogos.ts
│   │   └── complianceBadges.ts
│   ├── styles/
│   │   └── global.css
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
└── CLAUDE.md
```

---

## Implementation Phases

### Phase 1: Foundation (P0)
1. Initialize Astro project with TypeScript
2. Configure Tailwind with Plivo design tokens
3. Set up shadcn/ui components
4. Create BaseLayout and PageLayout
5. Build Header with mega menu navigation
6. Build Footer (8-column layout)
7. Implement core UI components (Button, Card, etc.)

### Phase 2: Homepage (P0)
1. Hero section with gradient text
2. Logo marquee (GSAP)
3. Three-step onboarding flow
4. Feature tabs section
5. Trust badges and compliance
6. Testimonials carousel
7. Final CTA section

### Phase 3: Core Product Pages (P0)
1. `/platform/ai-agents/` - AI Agents platform
2. `/voice/overview/` - Voice overview
3. `/sms/overview/` - SMS overview
4. `/pricing/` - Main pricing page

### Phase 4: Channel Pages (P1)
1. Voice API and features
2. SMS API
3. WhatsApp pages (API, AI Agents, Call)
4. Chat overview
5. Verify API

### Phase 5: Pricing Subpages (P1)
1. Voice pricing (US, India)
2. SMS pricing (US, India)
3. WhatsApp pricing
4. Verify pricing
5. Price calculator component

### Phase 6: Company Pages (P1)
1. About page
2. Customers/case studies
3. Blog listing and posts
4. Contact sales form

### Phase 7: Secondary Pages (P2)
1. RCS
2. Virtual phone numbers
3. SIP Trunking (Zentrunk)
4. Integrations marketplace
5. Security page
6. Legal/ToS
7. Careers/Jobs
8. Resources and guides
9. Comparison pages

### Phase 8: Polish & Optimization
1. Image optimization (WebP/AVIF)
2. Font subsetting
3. Performance audit (Lighthouse)
4. SEO meta tags and OG images
5. Sitemap generation
6. 404 page
7. Analytics integration

---

## Key Components Detail

### Header Navigation Structure

```
Header
├── Logo (links to /)
├── Main Nav (desktop)
│   ├── AI Agents (mega menu)
│   │   ├── AI Agents Platform
│   │   ├── AI Agents Builder
│   │   ├── Personalized Agents
│   │   └── AI Voice Agents
│   ├── Platform (mega menu)
│   │   ├── Platform Overview
│   │   └── Integrations
│   ├── Channels (mega menu)
│   │   ├── Voice
│   │   ├── SMS
│   │   ├── WhatsApp
│   │   ├── Chat
│   │   └── RCS
│   ├── Other Products (mega menu)
│   │   ├── Verify
│   │   ├── Virtual Phone Numbers
│   │   └── SIP Trunking
│   └── Pricing
├── Secondary Nav
│   ├── Documentation (external)
│   ├── Contact Sales
│   └── Get Access (primary CTA)
└── Mobile Menu (hamburger)
```

### Footer Structure

```
Footer (dark background)
├── Column 1: Platform
│   ├── AI Agents
│   ├── Personalized Agents
│   ├── Agent Studio
│   └── Integrations
├── Column 2: Channels
│   ├── Voice
│   ├── SMS
│   ├── WhatsApp
│   ├── Chat
│   └── RCS
├── Column 3: Products
│   ├── Verify
│   ├── Phone Numbers
│   └── SIP Trunking
├── Column 4: Use Cases
│   ├── 2FA/OTP
│   ├── Customer Support
│   ├── Marketing
│   └── Alerts
├── Column 5: Resources
│   ├── Documentation
│   ├── Blog
│   ├── Guides
│   └── API Reference
├── Column 6: Company
│   ├── About
│   ├── Customers
│   ├── Careers
│   └── Contact
├── Column 7: Legal
│   ├── Privacy Policy
│   ├── Terms of Service
│   └── Security
└── Bottom Bar
    ├── Copyright
    └── Social Links (YouTube, X, Facebook, LinkedIn, GitHub)
```

### Pricing Calculator Component

```typescript
interface PriceCalculatorProps {
  service: 'voice' | 'sms' | 'whatsapp' | 'verify';
  defaultCountry: string;
  showCompetitorComparison: boolean;
}

// Features:
// - Country selector with flags
// - Volume slider (min 1000, max 10M)
// - Call type toggles (local, mobile, toll-free)
// - Real-time price calculation
// - Competitor comparison table
// - "Get Volume Pricing" CTA at threshold
```

---

## Content Migration

### From Webflow
1. **Images**: Download from CDN, optimize with Sharp
2. **Copy**: Extract text, store in content collections
3. **Blog posts**: Convert to MDX format
4. **Customer logos**: Organize by region/industry
5. **Testimonials**: JSON data files

### Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Team Plivo'),
    image: z.string().optional(),
    categories: z.array(z.string()),
    readTime: z.string(),
    featured: z.boolean().default(false),
  }),
});

const customers = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    industry: z.string(),
    useCase: z.string(),
    products: z.array(z.string()),
    testimonial: z.string().optional(),
    stats: z.object({
      metric: z.string(),
      value: z.string(),
    }).optional(),
  }),
});

export const collections = { blog, customers };
```

---

## Technical Requirements

### Dependencies

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/react": "^3.x",
    "@astrojs/tailwind": "^5.x",
    "@astrojs/sitemap": "^3.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "tailwindcss": "^3.x",
    "tailwindcss-animate": "^1.x",
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "lucide-react": "^0.x",
    "gsap": "^3.x",
    "swiper": "^11.x",
    "@fontsource/sora": "^5.x",
    "@fontsource/inter": "^5.x"
  }
}
```

### Performance Targets
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Lighthouse Best Practices: > 95
- Lighthouse SEO: > 95
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

---

## Homepage Pixel-Perfect Fixes (COMPLETED)

All major issues have been fixed to match plivo.com:

### Header/Navbar ✅ (FULLY COMPLETE - Jan 2025)
- [x] **Logo**: Actual Plivo SVG logo downloaded and implemented
- [x] **Menu Structure**: New structure implemented:
  - **Products**: AI Agents (Programmable AI Agents, No-code AI Agent Studio) + Communications (Voice, Messaging, WhatsApp)
  - **Solutions**: 8 Use Cases + 7 Industries with icons and descriptions
  - **Developers**: Documentation + Support sections
  - **Resources**: Learn + Company sections
  - **Pricing**: Direct link
- [x] **Menu Icons**: 30+ Lucide icons for all dropdown items
- [x] **Click-based dropdowns**: Changed from hover to click behavior
- [x] **Click-outside to close**: Dropdowns close when clicking outside
- [x] **Stripe-like animation**: Smooth scale/opacity/translate animation on appear
- [x] **Hover states**: Full-row hover for items without sublinks, title-only hover for items with sublinks
- [x] **SubLinks**: Voice and Messaging have inline sublinks (Audio Streaming, SIP Trunking, SMS, Chat, RCS)
- [x] **CTA Buttons**: "Contact Sales" + "Get Access" (black)
- [x] **Sticky Behavior**: Activates on 5px scroll with shadow

### Hero Section ✅
- [x] **Headline**: "AI Agents that handle your conversations just like humans"
- [x] **Subheadline**: Exact Plivo copy implemented
- [x] **Badge**: "Available On" with 4 channel icons (Voice, Chat, WhatsApp, SMS)
- [x] **Primary CTA**: "Get Access" button (single CTA)
- [x] **Background**: Light gradient background

### Feature Sections ✅
- [x] **"Go live with AI agents in minutes"**: 3-step cards
- [x] **Build agents your way**: Green checkmark icons, features list
- [x] **Voices that feel real**: Feature list with placeholder mockup
- [x] **Full-stack platform**: Features with placeholder mockup

### Compliance/Trust Section ✅
- [x] **Badges**: HIPAA, GDPR, SOC 2, PCI DSS, STAR text badges
- [x] **Stats**: "99.99% Platform Uptime", "1 Billion+ Conversations"
- [x] **Copy**: "Trusted by Fortune 500 companies worldwide"

### Colors ✅
- [x] **Primary Button**: Blue (#323dfe)
- [x] **Gradient CTA**: `linear-gradient(90deg, #cd3ef9, #323dfe)`
- [x] **Backgrounds**: White primary, gray-50 for alternating sections

### Typography ✅
- [x] **Fonts**: Sora (display) + Inter (body) via Google Fonts
- [x] **Font classes**: font-sora utility for headlines

### Buttons ✅
- [x] **Primary**: Blue (#323dfe) background, white text
- [x] **Secondary/Outline**: Border with transparent bg
- [x] **Hover**: translateY(-0.5rem) elevation + shadow

### Footer ✅ (FULLY COMPLETE - Jan 2025)
- [x] **Structure**: 6-column grid (Platform, Communications, AI Agents, API Platform, Resources, Company)
- [x] **Links**: All sections with correct links
- [x] **Social Icons**: YouTube, X, Facebook, LinkedIn, GitHub
- [x] **Copyright**: "Copyright © {currentYear} Plivo Inc." (dynamic)
- [x] **Dark Background**: #0f1117
- [x] **Centered copyright**: Properly centered at bottom

### Remaining Tasks
- [ ] Download and add actual customer logos (Meta, Discord, etc.)
- [ ] Add actual product mockup images
- [ ] Download and add compliance badge SVGs

---

## Verification Plan

### Manual Testing
- [ ] Visual comparison with plivo.com (side-by-side)
- [ ] All navigation links work
- [ ] Mobile menu functions correctly
- [ ] Forms submit and validate
- [ ] Pricing calculator updates correctly
- [ ] Carousels/sliders work
- [ ] Responsive at 375px, 768px, 1024px, 1440px

### Automated Testing
```bash
# Lighthouse CI
npx lhci autorun

# Link checking
npx broken-link-checker http://localhost:4321 -ro

# Build verification
npm run build && npm run preview
```

### SEO Checklist
- [ ] Unique meta titles/descriptions per page
- [ ] OG images configured
- [ ] Sitemap at /sitemap.xml
- [ ] robots.txt configured
- [ ] Canonical URLs set
- [ ] Structured data (Organization, Product, Article)
