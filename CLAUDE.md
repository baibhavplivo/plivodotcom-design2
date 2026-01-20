# CLAUDE.md - Plivo.com Migration Project

## Project Overview

Migrate plivo.com from Webflow to Astro using **4 shadcnblocks templates** as component sources.

**Location:** `/Users/venky/tech/plivodotcom`
**Templates:** `/Users/venky/tech/plivodotcom/templates/`

---

## CRITICAL: Component Reuse Strategy

### Source Priority Order
1. **Local Templates** (4 templates in `/templates/`) - First choice, already set up
2. **shadcnblocks.com Blocks** (1,110+ blocks) - For gaps not covered by templates
3. **shadcnblocks.com Components** (1,145 components) - UI primitives
4. **Custom Code** - LAST RESORT only

### Available Local Templates
| Template | Location | Best For |
|----------|----------|----------|
| **Streamline** | `templates/streamline-astro-shadcnblocks/streamline-astro-template-1.0.0/` | Base structure, FAQ, Pricing toggle |
| **Lumen** | `templates/lumen-astro-shadcnblocks/lumen-astro-template-1.0.0/` | Marquee, Testimonials, Features carousel |
| **Metafi** | `templates/metafi-astro-shadcnblocks/metafi-astro-template-1.0.0/` | Integrations, Tabs, CTA, About pages |
| **Aspect** | `templates/aspect-astro-shadcnblocks/aspect-astro-template-1.1.0/` | World map, Pricing cards, FAQ page, Contact |

### shadcnblocks.com Resources (Premium Access Available)

**Website:** https://www.shadcnblocks.com

#### Blocks Library (1,110+ blocks)
| Category | Count | URL | Use For |
|----------|-------|-----|---------|
| **Hero** | 175+ | `/blocks/hero` | Landing pages, product pages |
| **Feature** | 272+ | `/blocks/feature` | Feature showcases |
| **Pricing** | 35+ | `/blocks/pricing` | Pricing pages |
| **Testimonial** | 28+ | `/blocks/testimonial` | Social proof |
| **Logos** | 13+ | `/blocks/logos` | Customer logos, marquee |
| **Stats** | 18+ | `/blocks/stats` | Metrics display |
| **FAQ** | 16+ | `/blocks/faq` | FAQ sections |
| **CTA** | 26+ | `/blocks/cta` | Call-to-action |
| **Navbar** | 18+ | `/blocks/navbar` | Navigation |
| **Footer** | 25+ | `/blocks/footer` | Footer sections |
| **Contact** | 17+ | `/blocks/contact` | Contact forms |
| **Blog** | 22+ | `/blocks/blog` | Blog layouts |
| **About** | 17+ | `/blocks/about` | About pages |
| **Team** | 14+ | `/blocks/team` | Team sections |
| **Careers** | 9+ | `/blocks/careers` | Job listings |

#### Recommended Specific Blocks for Plivo
| Block ID | Description | Best For |
|----------|-------------|----------|
| `hero103` | Two-column hero + logo carousel built-in | Homepage |
| `hero201` | Animated hero with gradient backdrop | Product pages |
| Various navbar blocks | Mega menu support | Main navigation |
| Stats blocks | Grid layouts for metrics | Trust indicators |

#### Components Library (1,145 components)
70+ component categories including: Accordion, Avatar, Badge, Button, Card, Carousel, Chart (70!), Combobox, Dialog, Dropdown, Form (86!), Input, Navigation Menu, Pagination, Popover, Select, Tabs, Toast, Tooltip, etc.

**How to get blocks:**
1. Visit the block page (e.g., `/block/hero103`)
2. Copy code or use CLI: `npx shadcn@latest add [block-name]`
3. Customize colors/content for Plivo

### Component Source Mapping

#### Navigation & Layout
| Component | Source Template | File |
|-----------|----------------|------|
| Navbar | **Aspect** | `aspect-astro-template-1.1.0/src/components/sections/navbar.tsx` |
| Footer | **Streamline** | `streamline-astro-template-1.0.0/src/components/sections/footer.tsx` |
| Banner | **Metafi** | `metafi-astro-template-1.0.0/src/components/sections/banner.tsx` |

#### Hero Sections
| Component | Source Template | File |
|-----------|----------------|------|
| Homepage Hero | **Metafi** | `metafi-hero.tsx` (gradient bg + dashboard) |
| Product Hero | **Aspect** | `aspect-hero.tsx` (clean with image) |
| About Hero | **Metafi** | `metafi-about-hero.tsx` |
| Pricing Hero | **Metafi** | `metafi-pricing-hero.tsx` |

#### Features
| Component | Source Template | File |
|-----------|----------------|------|
| Feature Grid | **Aspect** | `aspect-features.tsx` |
| Feature Tabs | **Metafi** | `metafi-tabs.tsx` |
| Features Carousel | **Lumen** | `features-carousel.tsx` |
| Metrics/Stats | **Streamline** | `feature1.tsx` |

#### Pricing
| Component | Source Template | File |
|-----------|----------------|------|
| Pricing Cards | **Aspect** | `aspect-pricing.tsx` |
| Pricing Table | **Aspect** | `aspect-pricing-table.tsx` |
| Pricing Toggle | **Streamline** | `pricing1.tsx` |

#### Social Proof
| Component | Source Template | File |
|-----------|----------------|------|
| Logo Marquee | **Lumen** | `src/components/magicui/marquee.tsx` + `logos.tsx` |
| Testimonials Grid | **Lumen** | `testimonials.tsx` |
| Testimonials Marquee | **Lumen** | `testimonials-marquee.tsx` |

#### FAQ & Support
| Component | Source Template | File |
|-----------|----------------|------|
| FAQ Accordion | **Streamline** | `faq.tsx` |
| FAQ Full Page | **Aspect** | `aspect-faq-page.tsx` |

#### Blog
| Component | Source Template | File |
|-----------|----------------|------|
| Blog Grid | **Metafi** | `metafi-blog-grid.tsx` |
| Blog Post | **Lumen** | `blog-post.tsx` |
| Featured Post | **Aspect** | `aspect-featured-post.tsx` |

#### Company Pages
| Component | Source Template | File |
|-----------|----------------|------|
| About Section | **Metafi** | `metafi-mission.tsx`, `metafi-trough-years.tsx` |
| Team Grid | **Metafi** | `metafi-team.tsx` |
| Team Carousel | **Aspect** | `aspect-team-carousel.tsx` |
| Job Openings | **Aspect** | `aspect-open-positions.tsx` |
| Contact Form | **Aspect** | `aspect-contact-form.tsx` |

#### Integrations
| Component | Source Template | File |
|-----------|----------------|------|
| Integrations Grid | **Metafi** | `metafi-all-integrations.tsx` |
| Integrations Hero | **Metafi** | `metafi-integrations-hero.tsx` |

#### Special Components
| Component | Source Template | File |
|-----------|----------------|------|
| World Map | **Aspect** | `aspect-world-map.tsx` |
| CTA Section | **Metafi** | `matafi-cta.tsx` |
| Dashboard Preview | **Aspect** | `aspect-dashboard.tsx` |

#### Auth
| Component | Source Template | File |
|-----------|----------------|------|
| Login | **Metafi** | `metafi-login.tsx` |
| Signup | **Metafi** | `metafi-signup.tsx` |

---

## Page-to-Component Mapping

### Homepage (`/`)
```
Metafi Hero → Logo Marquee (Lumen) → Feature Tabs (Metafi) →
Metrics (Streamline feature1) → Testimonials (Lumen) →
FAQ (Streamline) → CTA (Metafi)
```

### AI Agents (`/platform/ai-agents/`)
```
Aspect Hero → Logo Marquee (Lumen) → Features Grid (Aspect) →
Feature Tabs (Metafi) → Testimonials (Lumen) → FAQ (Streamline) → CTA
```

### Voice/SMS Overview
```
Aspect Hero → Logos → Features Carousel (Lumen) →
Use Cases (Aspect features) → Testimonials → Pricing Cards → CTA
```

### Pricing (`/pricing/`)
```
Metafi Pricing Hero → Pricing Cards (Aspect) →
Pricing Table (Aspect) → FAQ (Streamline) → CTA
```

### About (`/about/`)
```
Metafi About Hero → Mission (Metafi) → Through Years (Metafi) →
Team (Metafi) → CTA
```

### Contact (`/contact/sales/`)
```
Aspect Contact Hero → Aspect Contact Form → World Map (Aspect)
```

---

## shadcn/ui Components Available

All templates include these primitives in `src/components/ui/`:
- `accordion.tsx` - Collapsible sections
- `avatar.tsx` - User avatars
- `badge.tsx` - Labels/tags
- `button.tsx` - Buttons
- `card.tsx` - Content cards
- `carousel.tsx` - Slideshows (embla)
- `checkbox.tsx` - Form checkboxes
- `collapsible.tsx` - Expandable content
- `input.tsx` - Text inputs
- `label.tsx` - Form labels
- `navigation-menu.tsx` - Nav dropdowns
- `select.tsx` - Dropdowns
- `separator.tsx` - Dividers
- `switch.tsx` - Toggle switches
- `tabs.tsx` - Tab navigation
- `textarea.tsx` - Multi-line input

**Lumen extras:** `pagination.tsx`, `scroll-area.tsx`, `toggle.tsx`
**Metafi extras:** `dotted-map.tsx`, `grid-background.tsx`, animation components
**Aspect extras:** `world-map.tsx`

---

## Implementation Approach

### Step 1: Copy Base Template
```bash
cp -r templates/streamline-astro-shadcnblocks/streamline-astro-template-1.0.0/* .
```

### Step 2: Add Components from Other Templates
Copy needed section components to `src/components/sections/`:
```bash
# From Lumen
cp templates/lumen-astro-shadcnblocks/.../marquee.tsx src/components/magicui/
cp templates/lumen-astro-shadcnblocks/.../testimonials*.tsx src/components/sections/

# From Metafi
cp templates/metafi-astro-shadcnblocks/.../metafi-hero.tsx src/components/sections/
cp templates/metafi-astro-shadcnblocks/.../metafi-tabs.tsx src/components/sections/

# From Aspect
cp templates/aspect-astro-shadcnblocks/.../navbar.tsx src/components/sections/
cp templates/aspect-astro-shadcnblocks/.../aspect-pricing*.tsx src/components/sections/
```

### Step 3: Customize for Plivo
1. Update `tailwind.config.mjs` with Plivo colors
2. Update `src/styles/global.css` with Sora/Inter fonts
3. Update navbar with Plivo navigation structure
4. Update footer with Plivo links
5. Replace placeholder content with Plivo copy

---

## Plivo Design Tokens

### Colors
```css
--plivo-purple: #cd3ef9
--plivo-blue: #323dfe
--plivo-gradient: linear-gradient(90deg, #cd3ef9, #323dfe)
--bg-dark: rgb(15, 17, 23)
```

### Typography
```css
font-display: 'Sora', sans-serif  /* Headlines */
font-body: 'Inter', sans-serif    /* Body text */
```

### Patterns
```jsx
// Gradient text
<span className="bg-gradient-to-r from-plivo-purple to-plivo-blue bg-clip-text text-transparent">

// Hover lift
<div className="transition-transform hover:-translate-y-2">

// Dual CTAs (always use both)
<Button className="bg-gradient-to-r from-plivo-purple to-plivo-blue">Get Access</Button>
<Button variant="outline">Contact Sales</Button>
```

---

## Components to Create from Scratch

**ALMOST NOTHING** - Between 4 templates + 1,110 shadcnblocks, we should find everything.

Only create custom if truly unique to Plivo:
- [ ] `PriceCalculator.tsx` - Interactive voice/SMS pricing with volume slider (check shadcnblocks /blocks/pricing first!)
- [ ] `CountrySelector.tsx` - Country dropdown with flags (check shadcnblocks /components/select first!)

**Before writing ANY component:**
1. Check local templates first
2. Search shadcnblocks.com/blocks
3. Search shadcnblocks.com/components
4. Only then write custom code

---

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview build
```

---

## Page Verification Process

### How to Verify Local vs plivo.com

After making changes, always verify the local implementation against the live plivo.com site.

#### 1. Fetch Live Page Structure
```bash
# Use WebFetch to extract current plivo.com design
# Extract: header, hero, sections, footer, colors, fonts, animations
```

#### 2. Key Elements to Compare

| Element | What to Check |
|---------|---------------|
| **Header** | Logo, nav items, dropdown styling, CTA button color/text |
| **Hero** | Headline text, subheadline, CTA text, channel icons |
| **Logos** | Actual company logos (Meta, Discord, etc.), marquee animation |
| **Features** | Section titles, feature lists, mockup images |
| **Footer** | Column headers, link text, social icons, copyright |
| **Colors** | Button colors, gradients, backgrounds |
| **Typography** | Font families (Sora/Inter), sizes, weights |
| **Animations** | Marquee speed (40s), hover effects (-0.5rem), transitions |

#### 3. Verification Checklist

Before marking a page complete, verify:
- [ ] Header matches (logo, nav structure, dropdown style, CTA)
- [ ] Hero section matches (headline, subheadline, CTAs)
- [ ] Logo marquee uses real logos from plivo.com CDN
- [ ] Feature sections match layout and content
- [ ] Images/mockups are actual plivo.com assets
- [ ] Footer structure matches (columns, links, social)
- [ ] Colors match exactly (use browser inspector on plivo.com)
- [ ] Fonts load correctly (Sora for headings, Inter for body)
- [ ] Animations work (marquee, hover states)

#### 4. Asset URLs from plivo.com

**Logo:**
```
https://cdn.prod.website-files.com/6836fa6fd9f61895cba27d8b/6842ca7808ff42cfd420b97c_Group%201000007593.svg
```

**Customer Logos:**
```
/images/logos/meta.svg     # Downloaded from plivo CDN
/images/logos/hoka.svg
/images/logos/discord.svg
/images/logos/trip.svg
/images/logos/godaddy.svg
/images/logos/atomberg.svg
/images/logos/tata1mg.svg
```

**Product Mockups:**
```
/images/mockups/build-agents.avif
/images/mockups/voices.avif
/images/mockups/telephony.png
/images/mockups/hero-mockup.png
/images/mockups/knowledge-base.png
```

#### 5. Quick Verification Command

To compare structure, use WebFetch:
```
WebFetch URL: https://www.plivo.com/
Prompt: "Extract exact [element] styling and content"
```

Then compare with local implementation.

---

## Current Status

**Phase:** Base work complete, now building individual pages
**Base Template:** Streamline (structure + core)
**Mix in from:** Lumen (marquee, testimonials), Metafi (hero, tabs, CTA), Aspect (navbar, pricing, FAQ)

See `plan.md` for page-by-page implementation details.

---

## ⚠️ CRITICAL: Base Work Protection

The following components are **COMPLETE and LOCKED**. Do NOT modify unless explicitly requested:

### Locked Components (DO NOT CHANGE)
| Component | File | Status |
|-----------|------|--------|
| **Navbar** | `src/components/sections/plivo-navbar.tsx` | ✅ LOCKED |
| **Footer** | `src/components/sections/plivo-footer.tsx` | ✅ LOCKED |
| **Navigation Data** | `src/data/navigation.ts` | ✅ LOCKED |
| **Global Styles** | `src/styles/global.css` | ✅ LOCKED |
| **Tailwind Config** | `tailwind.config.mjs` | ✅ LOCKED |
| **Base Layout** | `src/layouts/Layout.astro` | ✅ LOCKED |
| **Homepage** | `src/pages/index.astro` | ✅ LOCKED |

### What This Means
1. **New pages** must use the existing Layout.astro which includes navbar and footer
2. **New pages** must follow the established design tokens (colors, fonts, spacing)
3. **Do NOT** create alternative navbars, footers, or layouts
4. **Do NOT** modify the navigation structure without explicit request
5. **Do NOT** change global CSS variables or Tailwind config

---

## Design System (MUST FOLLOW for all new pages)

### Typography
```css
/* Headlines - ALWAYS use font-sora */
font-family: 'Sora', sans-serif
H1: text-[3rem] md:text-[3.5rem] font-normal leading-[1.1] tracking-[-0.02em]
H2: text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em]
H3: text-[1.25rem] font-semibold

/* Body - ALWAYS use font-inter (default) */
font-family: 'Inter', sans-serif
Body: text-[1rem] or text-[1.125rem]
Small: text-[0.875rem] or text-[13px]
```

### Colors
```css
/* Primary */
--plivo-purple: #cd3ef9
--plivo-blue: #323dfe
--plivo-gradient: linear-gradient(90deg, #cd3ef9, #323dfe)

/* Backgrounds */
White sections: bg-white
Alternating sections: bg-gray-50
Dark sections: bg-[#0f1117]

/* Text */
Primary: text-black or text-gray-900
Muted: text-gray-500 or text-gray-600
On dark: text-white
```

### Spacing
```css
/* Section padding */
Standard: py-12 lg:py-16
Large: py-16 lg:py-24

/* Container */
max-w-7xl mx-auto px-4
```

### Buttons
```css
/* Primary CTA */
bg-black text-white hover:bg-gray-800

/* Secondary/Outline */
border border-gray-300 text-black hover:bg-gray-50

/* Gradient (special) */
bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] text-white
```

### Patterns to Reuse
```jsx
// Gradient text
<span className="bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] bg-clip-text text-transparent">

// Section with heading
<section className="py-12 lg:py-16 bg-white">
  <div className="container mx-auto max-w-7xl px-4">
    <h2 className="font-sora text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-12">
      Section Title
    </h2>
    {/* Content */}
  </div>
</section>

// Feature item with icon
<div className="flex items-start gap-3">
  <CheckCircle className="h-5 w-5 text-[#4f5aff] mt-0.5 flex-shrink-0" />
  <div>
    <span className="font-semibold text-[1rem] text-black">Feature Title</span>
    <p className="text-[1rem] text-black opacity-70 mt-1">Description</p>
  </div>
</div>
```

---

## Building New Pages

### Required Structure
Every new page MUST:
1. Import and use `Layout` from `@/layouts/Layout.astro`
2. Set appropriate `title` and `description` props
3. Follow the typography scale above
4. Use consistent section spacing
5. Match the visual style of the homepage

### Example New Page Template
```astro
---
import Layout from "@/layouts/Layout.astro";
---

<Layout title="Page Title | Plivo" description="Page description for SEO">
  <!-- Hero Section -->
  <section className="py-16 lg:py-24 bg-white">
    <div className="container mx-auto max-w-7xl px-4">
      <h1 className="font-sora text-[3rem] md:text-[3.5rem] font-normal leading-[1.1] tracking-[-0.02em] text-black text-center">
        Page Headline
      </h1>
      <p className="text-[1.125rem] text-gray-600 text-center mt-6 max-w-3xl mx-auto">
        Subheadline text
      </p>
    </div>
  </section>

  <!-- Additional sections... -->
</Layout>
```

---

## Git Commit Guidelines

- Do NOT include "Claude Code", "Anthropic", or "Co-Authored-By" in commit messages
- Keep commit messages concise and descriptive
