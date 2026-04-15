const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak
} = require("docx");

// Shared config
const PAGE = { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } };
const STYLES = {
  default: { document: { run: { font: "Arial", size: 22 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 36, bold: true, font: "Arial", color: "1a1a1a" },
      paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, font: "Arial", color: "333333" },
      paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, font: "Arial", color: "444444" },
      paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
  ]
};
const NUMBERING = {
  config: [
    { reference: "bullets", levels: [
      { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
      { level: 1, format: LevelFormat.BULLET, text: "\u2013", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
    ]},
    { reference: "numbers", levels: [
      { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
    ]},
  ]
};

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: "2D3748", type: ShadingType.CLEAR };
const altShading = { fill: "F7FAFC", type: ShadingType.CLEAR };

function p(text, opts = {}) {
  const runs = [];
  if (opts.label) {
    runs.push(new TextRun({ text: opts.label, bold: true, font: "Arial", size: opts.size || 22 }));
    runs.push(new TextRun({ text: " " + text, font: "Arial", size: opts.size || 22 }));
  } else {
    runs.push(new TextRun({ text, bold: opts.bold, italics: opts.italic, font: "Arial", size: opts.size || 22, color: opts.color }));
  }
  return new Paragraph({
    children: runs,
    heading: opts.heading,
    spacing: { after: opts.after || 120 },
    alignment: opts.align,
  });
}

function bullet(text, opts = {}) {
  const children = [];
  if (opts.bold_prefix) {
    children.push(new TextRun({ text: opts.bold_prefix, bold: true, font: "Arial", size: 22 }));
    children.push(new TextRun({ text: " " + text, font: "Arial", size: 22 }));
  } else {
    children.push(new TextRun({ text, font: "Arial", size: 22 }));
  }
  return new Paragraph({
    numbering: { reference: "bullets", level: opts.level || 0 },
    children,
    spacing: { after: 80 },
  });
}

function numbered(text, opts = {}) {
  const children = [];
  if (opts.bold_prefix) {
    children.push(new TextRun({ text: opts.bold_prefix, bold: true, font: "Arial", size: 22 }));
    children.push(new TextRun({ text: " - " + text, font: "Arial", size: 22 }));
  } else {
    children.push(new TextRun({ text, font: "Arial", size: 22 }));
  }
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    children,
    spacing: { after: 80 },
  });
}

function h1(text) { return p(text, { heading: HeadingLevel.HEADING_1 }); }
function h2(text) { return p(text, { heading: HeadingLevel.HEADING_2 }); }
function h3(text) { return p(text, { heading: HeadingLevel.HEADING_3 }); }
function meta(label, value) { return p(value, { label: label + ":", size: 20, color: "555555" }); }
function spacer() { return new Paragraph({ spacing: { after: 200 }, children: [] }); }
function divider() {
  return new Paragraph({ spacing: { before: 200, after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "E2E8F0", space: 1 } }, children: [] });
}

function simpleTable(headers, rows) {
  const colWidth = Math.floor(9360 / headers.length);
  const colWidths = headers.map(() => colWidth);
  const headerRow = new TableRow({
    children: headers.map(h => new TableCell({
      borders, width: { size: colWidth, type: WidthType.DXA }, shading: headerShading,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, font: "Arial", size: 20, color: "FFFFFF" })] })]
    }))
  });
  const dataRows = rows.map((row, i) => new TableRow({
    children: row.map(cell => new TableCell({
      borders, width: { size: colWidth, type: WidthType.DXA },
      shading: i % 2 === 1 ? altShading : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, font: "Arial", size: 20 })] })]
    }))
  }));
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: colWidths, rows: [headerRow, ...dataRows] });
}

function featureBlock(title, desc, tags) {
  const items = [];
  items.push(p(title, { bold: true, after: 40 }));
  if (tags) items.push(p("Tags: " + tags, { italic: true, size: 18, color: "888888", after: 40 }));
  items.push(p(desc, { after: 160 }));
  return items;
}

async function buildDoc(name, buildFn) {
  const children = buildFn();
  const doc = new Document({ styles: STYLES, numbering: NUMBERING, sections: [{ properties: { page: PAGE }, children }] });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(`${name}.docx`, buffer);
  console.log(`Created ${name}.docx`);
}

// ============================================================
// 1. HOMEPAGE
// ============================================================
async function homepage() {
  await buildDoc("content-homepage", () => [
    h1("Homepage (plivo.com)"),
    meta("Page Title", "Plivo - Build Voice AI Agents That Sound Human"),
    meta("Meta Description", "From no-code builders for teams to flexible APIs for developers, deploy voice agents that actually sound human."),
    divider(),

    h2("Section 1: Hero"),
    p("Available on: Voice | SMS | WhatsApp | Chat", { italic: true, color: "666666" }),
    p("Build human-like voice AI agents", { bold: true, size: 28 }),
    p("From no-code builders for teams to flexible APIs for developers, deploy voice agents that actually sound human."),
    p("CTA: Start for free", { bold: true, color: "323dfe" }),
    p("$10 in free credits. (India: \u20B91,000 in free credits.)", { italic: true }),
    divider(),

    h2("Section 2: Client Logos"),
    p("International:", { bold: true }),
    p("Meta, Decker Brands, Adobe, Trip.com, Uber, Laz Parking, Discord, Atlassian, GoDaddy, DocuSign, Yahoo"),
    p("India:", { bold: true }),
    p("Meta, Atomberg, Uber, Trip.com, Zomato, Masai, Discord, Great Learning, Amul, Zolve, GoDaddy, Tata 1mg, Yahoo, Healthify"),
    divider(),

    h2("Section 3: Agent Builder"),
    p("Build AI agents your way with code or prompt", { bold: true, size: 26 }),
    spacer(),
    h3("Modular Cards"),
    bullet("TTS - Natural Text-to-Speech voices (or bring your own)", { bold_prefix: "TTS" }),
    bullet("STT - Speech-to-Text with 95%+ accuracy across accents", { bold_prefix: "STT" }),
    bullet("Turn detection - Intelligent turn-taking that eliminates awkward interruptions", { bold_prefix: "Turn detection" }),
    bullet("VAD - Voice Activity Detection that knows when users start and stop speaking", { bold_prefix: "VAD" }),
    bullet("Audio stream - Real-time bi-directional audio with <300ms latency", { bold_prefix: "Audio stream" }),
    spacer(),
    h3("Card 1: Programmable AI agents"),
    p("Start with our fully managed stack or strip it down to just audio streaming. Swap in your own LLM, customize ASR and TTS. Full control, zero hassle."),
    bullet("Pick and choose what you want"),
    bullet("Bring your own LLM"),
    p("CTA: Talk to us", { bold: true, color: "323dfe" }),
    spacer(),
    h3("Card 2: No-Code AI agent studio"),
    p("Build, test, and deploy omni-channel AI agents in minutes. No code required. Best for teams who want to move fast and focus on outcomes."),
    bullet("Build agent in plain English"),
    bullet("Drag and drop simplicity"),
    p("CTA: Sign up free", { bold: true, color: "323dfe" }),
    divider(),

    h2("Section 4: Impact Stats"),
    p("Plivo is built to scale", { bold: true, size: 26 }),
    p("Live Counter: minutes of customer conversations handled by our AI Agents", { italic: true }),
    simpleTable(["Metric", "Value"], [
      ["Voice latency", "<500ms"],
      ["Platform uptime", "99.99%"],
      ["Languages supported", "50+"],
      ["Countries connected", "150+"],
    ]),
    spacer(),
    p("Use Cases (scrolling marquee): Sales | Lead qualification | Order tracking | Payment collection | Feedback surveys | Identity verification", { italic: true }),
    divider(),

    h2("Section 5: Why Human-Like"),
    p("Why are Plivo\u2019s voice AI agents human-like", { bold: true, size: 26 }),
    spacer(),
    h3("< 500ms latency"),
    bullet("700-900ms optimal response"),
    bullet("One-hop global routing"),
    bullet("No awkward pauses"),
    bullet("Real-time processing"),
    h3("Human-like conversation quality"),
    bullet("AI noise cancellation"),
    bullet("30+ accents & languages"),
    bullet("Tone & hallucination control"),
    bullet("Natural prosody"),
    h3("Natural turn taking"),
    bullet("Interruption detection"),
    bullet("Smart turn detection"),
    bullet("Barge-in handling"),
    bullet("Silence detection"),
    h3("Self-improving"),
    bullet("Auto simulations & evals"),
    bullet("Real-time observability"),
    bullet("Goal-based optimization"),
    bullet("Continuous learning"),
    divider(),

    h2("Section 6: Enterprise Security & Compliance"),
    p("Enterprise-grade security & compliance", { bold: true, size: 26 }),
    p("Compliance Badges: HIPAA | GDPR | SOC 2 | PCI DSS | STAR", { bold: true }),
    spacer(),
    ...featureBlock("Encryption everywhere", "TLS in transit. AES-256 at rest. No exceptions."),
    ...featureBlock("Data residency", "Choose US, EU, or APAC. Your data stays where you need it."),
    ...featureBlock("Audit-ready", "Full access logs, RBAC, and compliance reports on demand."),
    divider(),

    h2("Section 7: Pre-Footer CTA"),
    p("Ready to make every call count?", { bold: true, size: 26 }),
    p("US/International: Get $10 in free credits. No credit card required. Deploy your first agent in under 10 minutes."),
    p("India: Get \u20B91,000 in free credits. No credit card required. Deploy your first agent in under 10 minutes."),
    p("CTA: Sign up", { bold: true, color: "323dfe" }),
  ]);
}

// ============================================================
// 2. VOICE
// ============================================================
async function voice() {
  await buildDoc("content-voice", () => [
    h1("Voice Channel Overview"),
    meta("URL", "plivo.com/voice/overview/"),
    meta("Page Title", "Voice AI Agents | Plivo"),
    meta("Meta Description", "Build, deploy, and scale voice AI agents with sub-500ms latency. Start with our no-code builder or bring your own LLM."),
    divider(),

    h2("Section 1: Hero"),
    p("Voice AI agents that handle all your customer requests", { bold: true, size: 28 }),
    p("Deliver human-quality service at machine scale with Voice agents that can schedule appointments, manage orders & bookings, and resolve support issues."),
    p("CTAs: Start for free | Talk to sales", { bold: true, color: "323dfe" }),
    divider(),

    h2("Section 2: AI Voice Agents - Tabbed Categories"),
    p("AI voice agents for every customer interaction", { bold: true, size: 26 }),
    p("From lead conversion to customer delight, deploy voice AI that handles it all."),
    spacer(),

    h3("Tab: Convert"),
    ...featureBlock("Lead qualification agent", "Automates qualifying inbound leads through intelligent voice interactions to identify high-quality prospects.", "Financial services, Travel, Local consumer services"),
    ...featureBlock("Appointment scheduler", "Automates scheduling consults, appointments through interactive voice conversations.", "Health, Education, Local consumer services"),
    ...featureBlock("Booking & reservation agent", "Offers 24/7 automated booking assistance, managing reservations, cancellations, and scheduling.", "Travel, Food & dining, Health & wellness"),

    h3("Tab: Engage"),
    ...featureBlock("Voice alerts agent", "Sends automated voice alerts about important updates, reminders, or critical information.", "Financial services, Health, Consumer services"),
    ...featureBlock("Payment reminder agent", "Automatically reminds customers about upcoming or overdue payments, reducing churn.", "Financial services, Health, Local consumer services"),
    ...featureBlock("Appointment reminder agent", "Confirms, reminds, and facilitates easy rescheduling of appointments or reservations, reducing no-shows.", "Education, Hiring, Finance, Consumer services"),

    h3("Tab: Delight"),
    ...featureBlock("Customer support agent", "Offers 24/7 automated customer support, resolving common issues without human intervention.", "eCommerce, Health, Travel"),
    ...featureBlock("Complaint resolution agent", "Handles customer complaints promptly, improving customer satisfaction and brand reputation.", "eCommerce, Health, Financial services, Travel"),
    ...featureBlock("Feedback & survey agent", "Collects customer feedback and conducts satisfaction surveys automatically via voice calls.", "Travel, Health, Education, eCommerce"),
    divider(),

    h2("Section 3: Getting Started Steps"),
    p("Get up and running in no time", { bold: true, size: 26 }),
    p("From sign-up to your first call in under 10 minutes."),
    numbered("Create your agent - Use our no-code builder to design your voice agent in minutes.", { bold_prefix: "Create your agent" }),
    numbered("Connect your systems - Integrate with your CRM, helpdesk, or custom APIs.", { bold_prefix: "Connect your systems" }),
    numbered("Deploy & scale - Go live with one click. Handle thousands of concurrent calls.", { bold_prefix: "Deploy & scale" }),
    divider(),

    h2("Section 4: Exhaustive AI Features"),
    p("Exhaustive AI features for natural voice interactions", { bold: true, size: 26 }),
    p("Everything you need to build, deploy, and scale intelligent voice agents that deliver exceptional customer experiences."),
    spacer(),
    h3("Group 1: Brand-Aligned Features"),
    ...featureBlock("Brand-aligned AI agents", "Create voice agents that speak your brand\u2019s language and personality, delivering engaging customer interactions."),
    ...featureBlock("Human-like voices", "Choose from natural-sounding voices or create your own to ensure recognizable, consistent brand communication. Voice options: Caleb, Jack John, Joseph, Kyle, Sarah, Emma. Languages: English, Spanish, French, German, Hindi, Japanese, Portuguese, Italian, Dutch, Korean, Chinese, Arabic."),
    ...featureBlock("Advanced speech recognition", "Natural voice conversations without keypresses using top speech-to-text models like Deepgram & OpenAI. Stats: 98.5% Accuracy | <200ms Latency | 50+ Languages"),
    h3("Group 2: Context-Aware Features"),
    ...featureBlock("Context-aware & memory-driven AI", "Agents remember past interactions and preferences to provide personalized responses, just like human support."),
    ...featureBlock("AI guardrails & compliance", "Set clear boundaries to keep conversations on-topic and compliant with your business guidelines. Guardrails: Stay on approved topics, No competitor mentions, Escalate pricing questions, PII data protection, Brand voice compliance."),
    ...featureBlock("24/7 availability", "Never miss a customer inquiry or sale with AI agents that handle orders and support requests at any hour, any day of the week."),
    divider(),

    h2("Section 5: Voice Connectivity Grid"),
    p("Powerful voice connectivity", { bold: true, size: 26 }),
    p("Enterprise-grade telephony infrastructure that scales with your business."),
    spacer(),
    ...featureBlock("Global coverage", "Local, toll-free, and mobile numbers in 50+ countries for inbound calls. Reach customers in 190+ countries without managing multiple telecom carriers.", "50+ countries, Direct PSTN"),
    ...featureBlock("Human-like call quality", "Regional Points of Presence across five continents ensure low-latency, high-quality voice calls with direct one-hop carrier connectivity.", "Sub-500ms latency, HD voice"),
    ...featureBlock("Intelligent call routing", "Our routing engine dynamically selects the optimal call path based on latency, jitter, and MOS scores for the best possible call quality.", "Real-time, Data-driven"),
    ...featureBlock("Verified & trusted calls", "Display your business name and logo on caller ID with CNAM registration and full SHAKEN/STIR compliance to boost answer rates.", "Branded calling, SHAKEN/STIR"),
    ...featureBlock("Real-time audio streaming", "Stream audio in real-time via WebSocket for live transcription, sentiment analysis, and AI-powered voice processing with minimal delay.", "WebSocket, Low latency"),
    ...featureBlock("Enterprise SIP trunking", "Connect your existing PBX or UCaaS platform to Plivo\u2019s global network with flexible SIP trunking and unlimited concurrent call capacity.", "Bring your own carrier, Scalable"),
    divider(),

    h2("Section 6: Next-Gen Engagement Platform"),
    p("Next-gen engagement platform", { bold: true, size: 26 }),
    p("A complete platform to build, monitor, and optimize your voice AI operations. Everything you need in one place."),
    spacer(),
    h3("Connected to all business tools"),
    ...featureBlock("Customer profiles", "Connect voice agents to your databases for comprehensive profiling and personalized customer engagement."),
    ...featureBlock("All essential integrations", "Connect AI agents to CRMs, ERPs and other business tools for intelligent, contextual conversations."),
    ...featureBlock("Omnichannel conversations", "Move conversations across voice, SMS, WhatsApp with complete context."),
    ...featureBlock("No-code AI agent studio", "Build & Deploy AI-powered voice assistants without writing a single line of code."),
    h3("Seamless AI-human collaboration"),
    ...featureBlock("Call queuing", "Let AI handle sudden call surges and multiple conversations simultaneously, drastically reducing wait times."),
    ...featureBlock("Call transfer", "Transfer to specific agents, teams, or queues with blind or assisted options for optimal call routing."),
    ...featureBlock("Call summaries & notes", "Agents can add structured summaries & notes to customer interactions for improved collaboration."),
    ...featureBlock("Supervisor coaching", "Provide discreet coaching to agents during live calls, improving service quality and conversation outcomes."),
    h3("Real-time analytics"),
    ...featureBlock("Advanced engagement analytics", "Leverage real-time insights on call performance, customer behavior, and team efficiency for data-driven decisions."),
    ...featureBlock("Call recording & monitoring", "Monitor and analyze calls to track team performance, ensure compliance, and continuously improve service quality."),
    divider(),

    h2("Section 7: Enterprise Security & Compliance"),
    p("Same as homepage - HIPAA, GDPR, SOC 2, PCI DSS, STAR", { italic: true }),
    divider(),

    h2("Section 8: Pre-Footer CTA"),
    p("Same as homepage", { italic: true }),
  ]);
}

// ============================================================
// 3. SMS
// ============================================================
async function sms() {
  await buildDoc("content-sms", () => [
    h1("SMS Channel Overview"),
    meta("URL", "plivo.com/sms/overview/"),
    meta("Page Title", "SMS API & Marketing Platform | Plivo"),
    meta("Meta Description", "Send reliable SMS for OTP verification, alerts, and marketing campaigns to 190+ countries. Enterprise-grade delivery with built-in fraud prevention."),
    divider(),

    h2("Section 1: Hero"),
    p("Compliant, reliable SMS for verification & customer engagement", { bold: true, size: 28 }),
    p("Ensure secure logins with instant OTPs, deliver critical notifications & marketing campaigns to 190+ countries with enterprise-grade reliability and compliance."),
    p("CTAs: Get volume pricing | Sign up for free", { bold: true, color: "323dfe" }),
    divider(),

    h2("Section 2: SMS Use Cases"),
    p("Engage your customers at every step of their journey", { bold: true, size: 26 }),
    p("An all-in-one platform that delivers all your messaging needs with OTPs, alerts & notifications, promotional & loyalty campaigns, and conversational messaging."),
    spacer(),
    ...featureBlock("Alerts & notifications", "Send customers real-time updates on orders, deliveries, appointments, and account changes through reliable SMS notifications.", "eCommerce, Logistics, Healthcare"),
    ...featureBlock("Verify", "Secure your platform with instant OTPs for authentication. Prevent SMS pumping and fake signups with built-in FraudShield.", "Fintech, eCommerce, SaaS"),
    ...featureBlock("Promotional marketing", "Run high-converting SMS campaigns to deliver personalized promotions, launch new product arrivals, and more - directly to customer\u2019s phone.", "Retail, eCommerce, Food & Dining"),
    ...featureBlock("Abandoned cart campaigns", "Recover abandoned carts with timely SMS reminders and personalized incentives to complete purchases.", "eCommerce, Retail, Travel"),
    ...featureBlock("Loyalty marketing", "Reward loyal customers with exclusive perks, point updates, and personalized birthday offers to drive retention.", "Retail, eCommerce, Food & Dining"),
    ...featureBlock("Conversational messaging", "Provide real-time assistance to help customers with product recommendations, order tracking, or FAQs, without any human intervention.", "eCommerce, Travel, Consumer Services"),
    divider(),

    h2("Section 3: SMS Platform Features"),
    p("The SMS platform for reliable authentication & verification", { bold: true, size: 26 }),
    p("Enterprise-grade infrastructure that delivers messages when it matters most. Built for developers who need bulletproof reliability."),
    spacer(),
    ...featureBlock("High-performance SMS", "Deliver 10,000+ messages per second with sub-3-second latency and 99%+ delivery rates through direct carrier connections."),
    ...featureBlock("Built-in fraud prevention", "Block spam and fraud automatically with ML-powered detection that screens every message without impacting legitimate traffic."),
    ...featureBlock("Owns the messaging infrastructure", "Direct carrier relationships and proprietary routing ensure your messages bypass third-party bottlenecks."),
    ...featureBlock("Smart routing", "Intelligent algorithms analyze real-time carrier performance to route each message through the fastest, most reliable path."),
    ...featureBlock("Global scale & local compliance", "Send to 190+ countries while staying compliant with local regulations including GDPR, TCPA, and carrier-specific requirements."),
    ...featureBlock("Enterprise-grade reliability", "99.99% platform uptime backed by redundant infrastructure, automatic failover, and 24/7 monitoring."),
    p("Compliance: HIPAA | GDPR | SOC 2 | PCI DSS | STAR", { bold: true }),
    divider(),

    h2("Section 4: AI Agents for SMS"),
    p("24/7 AI agents that automate marketing for you", { bold: true, size: 26 }),
    p("Transform customer interactions with brand-aligned SMS agents that drive sales, recommend products, and handle inquiries - without human intervention."),
    spacer(),
    ...featureBlock("Brand-personalized AI agents", "Configure your SMS AI agents with your brand\u2019s vocabulary, personality, and tone of voice for consistent, on-brand customer interactions."),
    ...featureBlock("Two-way conversations that feel human", "Engage customers with natural, conversational SMS interactions that understand context and respond intelligently."),
    ...featureBlock("High-performance AI content", "Generate compelling SMS content at scale with AI that understands your products, promotions, and customer preferences."),
    divider(),

    h2("Section 5: Customer Engagement Suite"),
    p("Customer engagement suite for AI-powered campaigns", { bold: true, size: 26 }),
    p("Empower both AI and human agents with tools to create, automate, and optimize personalized marketing campaigns that drive engagement and conversions at scale."),
    spacer(),
    ...featureBlock("Customer data & segmentation", "Unify customer data across touchpoints and create advanced segments based on behavior, purchase history, and engagement patterns."),
    ...featureBlock("Intelligent automation & journeys", "Build automated SMS workflows with event-based triggers and launch timely campaigns based on customer actions and lifecycle stages."),
    ...featureBlock("Engagement & performance analytics", "Optimize campaigns by testing different messages, tracking open rates, click-through rates, and conversion performance."),
    ...featureBlock("No-code agent studio", "Easily create automated customer journeys and messaging flows - no coding required."),
    ...featureBlock("Seamless integrations", "Connect with Shopify, WooCommerce, Salesforce, HubSpot, Zoho to sync customer data effortlessly."),
    divider(),

    h2("Section 6: Pre-Footer CTA"),
    p("It\u2019s easy to get started. Sign up for free.", { bold: true, size: 26 }),
    p("Create your account and receive trial credits or get in touch with us."),
  ]);
}

// ============================================================
// 4. WHATSAPP
// ============================================================
async function whatsapp() {
  await buildDoc("content-whatsapp", () => {
    const children = [
      h1("WhatsApp Channel Overview"),
      meta("URL", "plivo.com/whatsapp-message/overview/"),
      meta("Page Title", "WhatsApp AI Agents | Plivo"),
      meta("Meta Description", "Let WhatsApp AI Agents handle your customer chats 24/7. Autonomous agents that answer purchase inquiries, close new sales, engage loyal customers & resolve support queries instantly."),
      divider(),

      h2("Section 1: Hero"),
      p("Let WhatsApp AI agents handle your customer conversations 24/7", { bold: true, size: 28 }),
      p("AI-powered chat and voice agents that answer purchase inquiries, close new sales, engage loyal customers & resolve support queries instantly."),
      p("CTAs: Talk to Sales | Sign up for free", { bold: true, color: "323dfe" }),
      divider(),

      h2("Section 2: WhatsApp Use Cases"),
      p("WhatsApp AI agents for every customer interaction", { bold: true, size: 26 }),
      p("From lead conversion to customer delight, deploy AI agents that handle it all on WhatsApp."),
      spacer(),
      h3("Convert"),
      ...featureBlock("Buying assistant", "Help customers find the perfect product with personalized recommendations based on their preferences and needs.", "eCommerce, Retail, Consumer services"),
      ...featureBlock("Lead qualification agent (Call)", "Engage inbound callers on WhatsApp, capture intent with smart questions, score leads in real-time, and route high-value prospects to your sales team.", "Sales, B2B, WhatsApp Call"),
      ...featureBlock("Cart recovery agent", "Automatically reach out to customers who abandoned their carts with personalized offers to complete purchases.", "eCommerce, Retail, Fashion"),
      h3("Engage"),
      ...featureBlock("Booking & reminder agent", "Automate appointment scheduling, confirmations, and reminders to reduce no-shows.", "Health, Education, Local services"),
      ...featureBlock("Booking & appointment agent (Call)", "Confirm, reschedule, and manage customer bookings directly over WhatsApp calls with real-time availability checks.", "Healthcare, Services, WhatsApp Call"),
      ...featureBlock("AI-powered upsell agent", "Suggest complementary products and upgrades based on purchase history and browsing behavior.", "eCommerce, Retail, Food & dining"),
      h3("Delight"),
      ...featureBlock("AI customer service agent", "Provide 24/7 instant support for returns, exchanges, FAQs, and account issues without wait times.", "eCommerce, Health, Travel"),
      ...featureBlock("Payment reminder agent (Call)", "Automate follow-up calls for due or failed payments, offer payment plan options, and process payments - improving collection rates.", "Finance, Insurance, WhatsApp Call"),
      ...featureBlock("Order tracking agent", "Send proactive shipping updates and delivery notifications to keep customers informed.", "eCommerce, Logistics, Food delivery"),
      divider(),

      h2("Section 3: Feature-Rich AI Agents"),
      p("Feature-rich AI agents for complete customer engagement", { bold: true, size: 26 }),
      p("Context-aware Agents that reflect your brand, understand customers, execute actions in your systems, and handle customer interactions."),
      spacer(),
      h3("AI Agents"),
      ...featureBlock("Customize AI agents to your brand", "Customize your WhatsApp AI agents to speak your brand\u2019s language, personality and values, while delivering highly personalized interactions."),
      ...featureBlock("24/7 availability", "Works round the clock, ensuring customers receive instant assistance - from processing orders, to resolving support issues. No more lost sales or unanswered questions outside business hours."),
      ...featureBlock("Natural, human-like conversations", "Chat with an AI Agent that responds just like a real person would - understanding context to handle high-volume queries and accelerate resolution."),
      h3("Customer Engagement Platform"),
      ...featureBlock("No-code AI agent studio", "Easily create your custom AI agent - without writing a single line of code."),
      ...featureBlock("Integrate knowledge sources", "Our AI utilizes internal business documents like SOPs, FAQs, and blog posts to accurately resolve customer queries."),
      ...featureBlock("Human-in-the-loop", "Seamlessly escalate complex queries to human agents, while carrying forward the context of the entire conversation."),
      ...featureBlock("Seamless integrations", "Connect with Shopify, Zoho, Salesforce, HubSpot, Zendesk, and other business systems effortlessly, for Agents to be context-aware and take actions."),
      divider(),

      h2("Section 4: WhatsApp Features (9-Card Grid)"),
      p("Everything you need to engage customers on WhatsApp", { bold: true, size: 26 }),
      p("From verified business profiles and rich media messaging to WhatsApp calling and smart routing - all the tools to deliver standout customer experiences."),
      spacer(),
    ];

    const features = [
      ["Verified business profile", "Get a green tick verified business profile. Direct Meta partnership ensures compliance, reliability, and access to the latest features."],
      ["Rich media & catalogs", "Send images, videos, documents, and locations. Create interactive catalogs and carousels that showcase your products beautifully."],
      ["Quick reply & interactive buttons", "Guide conversations with call-to-action buttons, quick reply options, and list messages that boost engagement and conversions."],
      ["Multi-language support", "AI agents that understand and respond in 28+ languages, automatically detecting and adapting to customer language preferences."],
      ["Message templates", "Build and reuse approved WhatsApp templates for consistent, personalized messages across all customer communications."],
      ["Broadcast & bulk messages", "Send personalized updates, offers, and announcements to thousands of customers simultaneously with targeted delivery."],
      ["WhatsApp calling", "Escalate from chat to voice seamlessly within the same WhatsApp thread for complex queries that need a personal touch."],
      ["Smarter call handling", "Reduce wait times and route every caller to the right agent, team, or queue automatically based on intent and context."],
      ["Real-time call transcripts", "Get live transcriptions of every WhatsApp call for quality monitoring, compliance records, and seamless agent handoff context."],
    ];
    features.forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(divider());

    children.push(h2("Section 5: WhatsApp Advantage"));
    children.push(p("Plivo: Your unbeatable WhatsApp advantage", { bold: true, size: 26 }));
    children.push(p("From rapid setup to guaranteed compliance, we eliminate barriers to your WhatsApp success."));
    children.push(spacer());
    const adv = [
      ["Fast onboarding", "Get your verified WhatsApp Business account with priority approval and hassle-free setup."],
      ["Global inventory", "Access WhatsApp-ready business phone numbers across 50+ countries worldwide."],
      ["Number flexibility", "Choose from an inventory of mobile, landline, or toll-free numbers, or bring your own."],
      ["Priority Meta assistance", "Get expedited issue resolution with priority Meta responses for uninterrupted operations."],
      ["Lowest latency in the industry", "Sub-500ms call latency with regional Points of Presence (PoPs) across five continents for crystal-clear WhatsApp voice."],
      ["Built-in compliance", "Pre-configured controls for GDPR, HIPAA, PCI DSS, ISO 27001, and SOC 2 compliance."],
    ];
    adv.forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(p("Compliance: HIPAA | GDPR | SOC 2 | PCI DSS | STAR", { bold: true }));
    children.push(divider());

    children.push(h2("Section 6: FAQ"));
    children.push(p("Frequently asked questions", { bold: true, size: 26 }));
    children.push(p("Everything you need to know about WhatsApp AI Agents - chat and voice."));
    children.push(spacer());
    const faqs = [
      ["What are WhatsApp AI Agents?", "WhatsApp AI Agents are intelligent virtual assistants that automate customer interactions on WhatsApp. They handle queries, process orders, send notifications, and provide 24/7 support - all while maintaining natural, human-like conversations."],
      ["How do WhatsApp AI Agents differ from traditional chatbots?", "Unlike traditional chatbots that follow predefined scripts, WhatsApp AI Agents leverage advanced AI technologies to understand context, remember past interactions, and provide personalized responses. They learn from each conversation and can handle complex, multi-turn dialogues naturally."],
      ["What tasks can WhatsApp AI Agents automate?", "WhatsApp AI Agents can automate a wide range of tasks including answering FAQs, processing orders, sending order confirmations and shipping updates, scheduling appointments, collecting feedback, handling returns and exchanges, providing product recommendations, and much more."],
      ["Are WhatsApp AI Agents suitable for small businesses?", "Yes! WhatsApp AI Agents are scalable and work for businesses of all sizes. Small businesses benefit from 24/7 customer support without needing to hire large support teams, while enterprise companies can handle massive volumes of conversations efficiently."],
      ["Do WhatsApp AI Agents support multiple languages?", "Yes, our WhatsApp AI Agents support 28+ languages and can automatically detect customer language preferences. This allows you to serve customers in their preferred language without manual intervention."],
      ["How do I get started with WhatsApp AI Agents?", "Getting started is easy! Sign up for a Plivo account, and our team will help you with priority WhatsApp Business API approval. You can then use our no-code Agent Studio to build and deploy your first AI agent in minutes."],
      ["How do I start using WhatsApp messaging with Plivo?", "Use our integrated sign-up and registration to start using WhatsApp messaging on Plivo\u2019s console. Verify your WhatsApp numbers and begin sending messages within seconds."],
      ["How does the pricing work for using WhatsApp through Plivo?", "Pricing is conversation-based, which includes Meta\u2019s fees and Plivo\u2019s pay-as-you-go platform fee. Meta charges per conversation, which is defined as a 24-hour message thread. Plivo charges a platform fee per conversation in addition to Meta\u2019s fees."],
      ["How does billing work with Plivo for WhatsApp messaging services?", "Plivo consolidates all billing for both Plivo and Meta charges into a single invoice. This includes both the conversation-based charges by Meta and the platform fees by Plivo."],
      ["What are WhatsApp Calls and how do they work with AI agents?", "WhatsApp Calls allow AI agents to make and receive voice calls directly within WhatsApp. Customers can escalate from a chat to a voice call seamlessly within the same thread. AI agents handle calls with natural-sounding voices, understanding context from prior chat interactions for a unified experience."],
      ["Can I escalate a WhatsApp chat to a voice call?", "Yes! Plivo supports seamless chat-to-call escalation within the same WhatsApp thread. When a conversation requires a more personal touch or involves complex issues, the AI agent can initiate a voice call while retaining full context from the chat history."],
      ["What languages are supported for WhatsApp voice AI?", "Plivo\u2019s WhatsApp voice AI agents support 10+ languages and accents including English (US, UK, AU), Hindi, Spanish, Portuguese, Japanese, Arabic, and more. Each voice can be customized to match your brand\u2019s tone and personality."],
    ];
    faqs.forEach(([q, a]) => {
      children.push(p(q, { bold: true, after: 40 }));
      children.push(p(a, { after: 160 }));
    });
    children.push(divider());

    children.push(h2("Section 7: Pre-Footer CTA"));
    children.push(p("Launch your WhatsApp AI agents today", { bold: true, size: 26 }));
    children.push(p("Deploy intelligent WhatsApp agents that convert prospects, engage customers through chat and voice, and deliver instant support."));

    return children;
  });
}

// ============================================================
// 5. CHAT
// ============================================================
async function chat() {
  await buildDoc("content-chat", () => {
    const children = [
      h1("Chat Channel Overview"),
      meta("URL", "plivo.com/chat/overview/"),
      meta("Page Title", "AI Chat Agents | Plivo"),
      meta("Meta Description", "AI Chat that resolves customer queries instantly, 24/7. Automate FAQs, process refunds, track orders, and handle complex queries - without human intervention."),
      divider(),

      h2("Section 1: Hero"),
      p("AI chat that resolves customer queries instantly, 24/7", { bold: true, size: 28 }),
      p("Automate FAQs, process refunds, track orders, and handle complex queries - without human intervention. Scale customer service effortlessly while keeping satisfaction high."),
      p("CTAs: Contact Sales | Sign up for free", { bold: true, color: "323dfe" }),
      divider(),

      h2("Section 2: AI Chat Use Cases"),
      p("AI chat agents for every customer interaction", { bold: true, size: 26 }),
      p("From automating routine queries to delighting customers with instant support, deploy AI agents that handle it all."),
      spacer(),
    ];

    const useCases = [
      ["Order management agent", "Track orders, modify purchases, process refunds and handle all order-related queries automatically.", "eCommerce, Retail, Logistics"],
      ["Booking assistant", "Schedule appointments, manage travel reservations, and handle service bookings with ease.", "Health, Education, Services"],
      ["Reservation manager", "Handle restaurant reservations, modifications, and cancellations seamlessly.", "Hospitality, Food & dining, Events"],
      ["Lead qualification agent", "Identify and qualify potential customers through smart conversational flows that capture intent and route high-value leads.", "Sales, B2B, SaaS"],
      ["Returns & exchanges assistant", "Handle return policies, exchange requests, and refund processing with clear, step-by-step guidance.", "eCommerce, Retail, Fashion"],
      ["24/7 support agent", "Handle account inquiries, password resets, and general support queries around the clock.", "All industries, Customer service"],
      ["Product enquiry agent", "Help customers discover products with personalized recommendations based on preferences and needs.", "eCommerce, Retail, Consumer"],
      ["FAQ agent", "Instantly answer common questions about products, policies, and services with accurate, detailed responses.", "All industries, Support"],
      ["Technical support agent", "Provide setup guidance, troubleshooting steps, and issue resolution for technical products.", "SaaS, Technology, Electronics"],
    ];
    useCases.forEach(([t, d, tags]) => children.push(...featureBlock(t, d, tags)));
    children.push(divider());

    children.push(h2("Section 3: AI Chat Capabilities"));
    children.push(p("AI chat, built for B2C brands - powerful, customizable, always-on", { bold: true, size: 26 }));
    children.push(p("Powerful chat features that make conversations impactful with context-rich, instant answers, takes actions and completes tasks."));
    children.push(spacer());
    children.push(h3("AI Agent Capabilities"));
    [
      ["Personality that matches your brand", "Customize your AI agent\u2019s tone, language, and personality to perfectly reflect your brand voice. Deliver consistent, on-brand conversations at scale."],
      ["Trained on your knowledge sources", "Connect your product docs, FAQs, policies, and SOPs so the AI agent answers with accurate, up-to-date information from your own business data."],
      ["AI that takes actions", "Go beyond answering questions - AI agents can process orders, update accounts, schedule appointments, and trigger workflows in your connected systems."],
      ["Understands customer sentiment in real-time", "Detect frustration, urgency, or satisfaction in real-time. Automatically adjust responses or escalate to human agents when sentiment shifts."],
    ].forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(h3("Customer Engagement Platform"));
    [
      ["Seamless handoff to human agents", "When a conversation needs a human touch, the AI seamlessly transfers with full context - so customers never have to repeat themselves."],
      ["Comprehensive tools for human reps", "Give your team chat history, customer profiles, AI-generated summaries, and suggested responses to handle escalations efficiently."],
      ["Monitor performance & coach", "Supervise live conversations, provide real-time coaching to agents, and ensure quality standards are met across every interaction."],
      ["Engagement analytics & reports", "Track interaction metrics, resolution rates, satisfaction scores, and agent performance with detailed dashboards and exportable reports."],
      ["Support for multiple brands", "Manage AI agents across multiple brands, locations, or business units from a single platform with independent configurations."],
    ].forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(divider());

    children.push(h2("Section 4: Integrations"));
    children.push(p("Integrates with your favorite tools", { bold: true, size: 26 }));
    children.push(p("Row 1: Salesforce, HubSpot, Zoho CRM, Shopify, Zapier, Woo, Stripe, Intercom"));
    children.push(p("Row 2: Zendesk, Freshdesk, Zoho Desk, Slack, Google Calendar, Calendly, ServiceNow, GitHub"));
    children.push(divider());

    children.push(h2("Section 5: Interactive Chat Features"));
    children.push(p("Interactive chat features for seamless, multilingual conversations", { bold: true, size: 26 }));
    [
      ["Diverse message types", "Support text, images, videos, carousels, buttons, quick replies, forms, and file uploads for rich conversations."],
      ["Conversational forms", "Collect customer information naturally through conversational flows instead of static forms."],
      ["Custom interactive messages", "Embed calendars, payment forms, location pickers, and biometric auth directly into your chat experience."],
      ["Custom-branded chat interface", "Match your chat widget to your brand with custom colors, fonts, logo, and messaging style."],
      ["Web chat", "Add a floating widget or inline chat to your website - embed anywhere with a simple code snippet."],
      ["Mobile app chat", "Native SDKs for React Native, iOS, and Android with full customization and push notification support."],
      ["Message snippets & templates", "Build and reuse prebuilt response templates for consistent, fast replies across all conversations."],
      ["Multi-language support", "Automatically detect and respond in 50+ languages to serve customers in their preferred language."],
      ["Persistent conversations", "Maintain conversation continuity across sessions, devices, and channels - customers never lose context."],
    ].forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(divider());

    children.push(h2("Section 6: Metrics"));
    children.push(p("Measurable results with AI chat agents that drive business growth", { bold: true, size: 26 }));
    children.push(simpleTable(["Metric", "Value"], [
      ["Customer queries resolved without human intervention", "80%"],
      ["Reduction in support operations costs", "60%"],
      ["Faster responses to customers", "3x"],
      ["Higher CSAT scores", "35%"],
    ]));
    children.push(divider());

    children.push(h2("Section 7: Enterprise Foundation"));
    children.push(p("An enterprise foundation for your AI-powered chat", { bold: true, size: 26 }));
    [
      ["Secure, reliable platform", "SOC 2, HIPAA, and PCI DSS compliant with 99.99% uptime SLA. Enterprise-grade security and reliability you can depend on."],
      ["Proven success & customer trust", "Billions of interactions processed with 95%+ customer satisfaction ratings on G2. Trusted by leading B2C brands worldwide."],
      ["Whiteglove onboarding", "Dedicated implementation engineers and 24/7 support to get your AI chat agents up and running quickly."],
      ["Flexible, scalable pricing", "Pay-as-you-go model with no upfront costs. Scale your AI chat operations as your business grows."],
    ].forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(p("Compliance: HIPAA | GDPR | SOC 2 | PCI DSS | STAR", { bold: true }));
    children.push(divider());

    children.push(h2("Section 8: FAQ"));
    children.push(p("Frequently asked questions", { bold: true, size: 26 }));
    const faqs = [
      ["What are AI chat agents?", "AI chat agents are intelligent virtual assistants that automate customer interactions through text-based conversations. They handle queries, process orders, send notifications, and provide 24/7 support - all while maintaining natural, human-like conversations across web chat, mobile apps, and messaging platforms."],
      ["How do AI chat agents differ from traditional chatbots?", "Unlike traditional chatbots that follow predefined scripts, AI chat agents leverage advanced AI technologies to understand context, remember past interactions, and provide personalized responses. They learn from each conversation and can handle complex, multi-turn dialogues naturally."],
      ["What tasks can AI chat agents automate?", "AI chat agents can automate a wide range of tasks including answering FAQs, processing orders, tracking shipments, scheduling appointments, collecting feedback, handling returns and exchanges, qualifying leads, providing product recommendations, and escalating complex issues to human agents."],
      ["Are AI chat agents suitable for small businesses?", "Yes! AI chat agents are scalable and work for businesses of all sizes. Small businesses benefit from 24/7 customer support without needing to hire large support teams, while enterprise companies can handle massive volumes of conversations efficiently."],
      ["Do AI chat agents support multiple languages?", "Yes, our AI chat agents support 50+ languages and can automatically detect customer language preferences. This allows you to serve customers in their preferred language without manual intervention."],
      ["How do I get started with AI chat agents?", "Getting started is easy! Sign up for a Plivo account, and use our no-code Agent Studio to build and deploy your first AI chat agent in minutes. You can embed it on your website, mobile app, or connect it to messaging platforms."],
      ["Can AI chat agents hand off to human agents?", "Absolutely. When a conversation requires human expertise, the AI agent seamlessly transfers the chat to a live agent along with the full conversation context. This ensures the customer doesn\u2019t have to repeat themselves and the human agent has all the information needed."],
      ["How does the pricing work for AI chat?", "Plivo offers flexible, pay-as-you-go pricing for AI chat. You pay based on the number of conversations handled. There are no upfront costs or long-term commitments, making it easy to scale as your business grows."],
      ["What integrations are supported?", "Plivo AI chat integrates with popular CRMs (Salesforce, HubSpot, Zoho), helpdesks (Zendesk, Freshdesk), e-commerce platforms (Shopify, WooCommerce), and productivity tools (Slack, Google Calendar, Zapier). Custom integrations are also available via our API."],
    ];
    faqs.forEach(([q, a]) => {
      children.push(p(q, { bold: true, after: 40 }));
      children.push(p(a, { after: 160 }));
    });
    children.push(divider());

    children.push(h2("Section 9: Pre-Footer CTA"));
    children.push(p("Let AI handle your customer queries instantly", { bold: true, size: 26 }));
    children.push(p("Deploy AI chat agents that resolve 80% of customer queries without human intervention. Scale support effortlessly while keeping satisfaction high."));

    return children;
  });
}

// ============================================================
// 6. AI AGENTS
// ============================================================
async function aiAgents() {
  await buildDoc("content-ai-agents", () => [
    h1("AI Agents Page"),
    meta("URL", "plivo.com/ai/"),
    meta("Page Title", "AI Agents That Just Work | Plivo"),
    meta("Meta Description", "Build and launch AI agents in minutes across voice, chat, SMS, and WhatsApp. No code, no guesswork - just reliable automation for key customer moments."),
    divider(),

    h2("Section 1: Hero"),
    p("AI agents that just work", { bold: true, size: 28 }),
    p("No code. No guesswork. Just reliable automation for key customer moments."),
    p("CTAs: Contact Sales | Signup now", { bold: true, color: "323dfe" }),
    divider(),

    h2("Section 2: AI Agent Use Cases"),
    ...featureBlock("Lead capture & qualification", "Capture inbound leads across chat, SMS, and voice, qualify them in real-time using smart branching logic, and instantly route high-intent prospects to your sales team."),
    ...featureBlock("Customer support", "Connect to Shopify or Woo to automatically manage order status, shipping updates, and product inquiries, directly on call."),
    ...featureBlock("Appointment booking", "Let customers schedule appointments via phone or chat, with real-time availability synced to Calendly or your booking system."),
    ...featureBlock("Tech support", "Troubleshoot common tech queries using your knowledge base, with smart conversational flows that route only complex cases to humans."),
    ...featureBlock("Survey & feedback", "Gather timely input from customers through surveys and conversations, so you can improve continuously."),
    ...featureBlock("Multichannel engagement", "Build agents that work where your customers are - voice, chat, SMS, or WhatsApp - with context preserved across every touchpoint."),
    divider(),

    h2("Section 3: Go Live Steps"),
    p("Go live with AI agents in minutes", { bold: true, size: 26 }),
    p("With Plivo\u2019s guided setup, you can build, test, and launch production-ready agents - without code or complexity."),
    numbered("Describe your use case - Share what you want your agent to do. Vibe understands your intent and gets to work.", { bold_prefix: "Step 1: Describe your use case" }),
    numbered("Let Vibe Agent build the flow - Vibe connects the dots - setting up actions, triggers, and integrations automatically.", { bold_prefix: "Step 2: Let Vibe Agent build the flow" }),
    numbered("Review and launch - Test the experience, make quick tweaks, and deploy your agent across channels with a single click.", { bold_prefix: "Step 3: Review and launch" }),
    p("CTAs: Contact Sales | Get Started Now", { bold: true, color: "323dfe" }),
    divider(),

    h2("Section 4: Build Smarter"),
    p("Build smarter, launch faster", { bold: true, size: 26 }),
    p("Build and deploy high-performing agents without code. AI Agent connects to your tools, understands your workflows, and starts delivering results on day one."),
    spacer(),
    h3("Vibe Agent Builder"),
    ...featureBlock("Just say what you want to build", "Describe the use case, and Vibe Agent builds the agent instantly."),
    ...featureBlock("Ask to make changes anytime", "Update steps, messages, or logic in Vibe Agent by simply describing what you want. No coding required."),
    ...featureBlock("Test and go live", "Test conversations in a safe environment, fine-tune responses, and go live instantly when you\u2019re ready."),
    h3("Works Across Every Channel"),
    ...featureBlock("One agent across all channels", "Build agents that work where your customers are, whether it is voice, chat, SMS or WhatsApp."),
    ...featureBlock("Consistent across touchpoints", "Agents remember context and move with the customer across every interaction."),
    ...featureBlock("Every agent is multimodal and multichannel", "Agents can understand and generate text, audio, images, and video while communicating seamlessly across multiple channels."),
    p("Channels: Voice | Web Chat | SMS | WhatsApp", { bold: true }),
    divider(),

    h2("Section 5: Integrations"),
    p("Connect the tools that your business uses", { bold: true, size: 26 }),
    p("Easily integrate MCP servers and API based tools so every agent can work with your existing stack without extra effort."),
    p("Row 1: HubSpot, Salesforce, Zoho CRM, Shopify, Zapier, Woo, Stripe, Intercom, Jira, Notion, Airtable"),
    p("Row 2: Zendesk, Freshdesk, Zoho Desk, Slack, Google Calendar, Calendly, ServiceNow, GitHub, Google Sheets, MongoDB, BigQuery, PostgreSQL"),
    divider(),

    h2("Section 6: Feature Cards"),
    h3("Knowledge Base"),
    p("Conversations that sound like you and stay accurate", { bold: true }),
    p("AI agents adapt to your brand voice and pull answers from your latest knowledge base and connected data sources."),
    spacer(),
    h3("Human in the Loop"),
    p("Human in the loop", { bold: true }),
    p("Easily route conversations to the right support team when human help is needed. Assign by agent, team, or custom rules, without breaking the flow."),
    divider(),

    h2("Section 7: Pre-Footer CTA"),
    p("Start building your AI agent now", { bold: true, size: 26 }),
    p("No setup fees, no coding required."),
  ]);
}

// ============================================================
// 7. VERIFY
// ============================================================
async function verify() {
  await buildDoc("content-verify", () => {
    const children = [
      h1("Verify Page"),
      meta("URL", "plivo.com/verify/"),
      meta("Page Title", "Verify API | Plivo"),
      meta("Meta Description", "Verify new users with Plivo. Eliminate fake accounts and verify customers anywhere, in real time, with a 95% conversion rate."),
      divider(),

      h2("Section 1: Hero"),
      p("Verify new users with Plivo", { bold: true, size: 28 }),
      p("Eliminate fake accounts and verify customers - anywhere, in real time, with a 95% conversion rate."),
      p("CTAs: Get volume pricing | Sign up for free", { bold: true, color: "323dfe" }),
      p("Badges: Instant Integration | Zero Compliance Hurdles", { italic: true }),
      divider(),

      h2("Section 2: Features Grid"),
      p("Plivo Verify is the best way to secure users & boost OTP conversions", { bold: true, size: 26 }),
      spacer(),
      ...featureBlock("Go live in 150+ countries in 5 minutes", "Use Plivo\u2019s pre-registered Sender IDs and templates to bypass regulatory paperwork."),
      ...featureBlock("Best-in-class Conversion Rates", "Get 95% conversion across multiple authentication channels."),
      ...featureBlock("Reach users across multiple channels", "Send OTPs to customers using SMS, Voice and WhatsApp. RCS & Email coming soon."),
      ...featureBlock("$0 cost leakage to SMS Pumping", "Save on SMS pumping fraud expenses with Plivo\u2019s Fraud Shield solution at no extra cost."),
      ...featureBlock("Lowest cost per verification", "We don\u2019t bill you for verification. Only pay for channel costs with no hidden charges."),
      ...featureBlock("Support at your fingertips", "24/7 availability over Slack and phone calls, guaranteed same-day response."),
      divider(),

      h2("Section 3: Code Section"),
      p("Switch to Plivo in under 5 minutes", { bold: true, size: 26 }),
      p("Plivo\u2019s Verify API is designed to \u2018Go live in one sprint\u2019. Our developer-first APIs and sample code can slash implementation time by 90% so your business never misses a beat!"),
      p("Code examples: Ruby, Python, Node.js, Go, PHP, Java, .NET, cURL", { italic: true }),
      divider(),

      h2("Section 4: Compliance"),
      p("Simplify compliance and go-live instantly", { bold: true, size: 26 }),
      p("Bypass regulatory paperwork and go live instantly in countries like the US, India, and the UK using pre-registered sender IDs (e.g., PLVRFY, PLVSMS) and templates. Send OTPs globally in multiple languages."),
      p("Compliance: GDPR | HIPAA | PCI DSS | SOC 2 | CSA STAR", { bold: true }),
      divider(),

      h2("Section 5: Customization"),
      p("Customize Plivo\u2019s OTP solution with ease", { bold: true, size: 26 }),
      spacer(),
      ...featureBlock("Seamlessly auto-fill OTPs on Android", "When a user receives an OTP on their Android device, Plivo can configure the code to auto-fill into the app, eliminating the need for users to manually type in the OTP."),
      ...featureBlock("Configure, control and execute", "Customize your OTP settings to send messages in multiple languages, switch templates, adjust configurations, and easily manage channels. No more complex code changes! Settings: Channels (SMS, VOICE, WHATSAPP), Code Length (6), Code Expiry (3 Min), Android/iOS Autofill."),
      divider(),

      h2("Section 6: Key Differentiators"),
      p("Plivo\u2019s Key Differentiators", { bold: true, size: 26 }),
      p("Plivo is a Trusted Partner for Superior Support, Guaranteed Delivery, and Simple Pricing"),
      spacer(),
      ...featureBlock("Trusted Partner", "Sent OTP\u2019s to customers using SMS, Voice and Whatsapp. RCS & Email coming soon."),
      ...featureBlock("Simple Pricing", "Get robust SMS Pumping fraud control with Plivo\u2019s Fraud Shield solution at no extra cost."),
      ...featureBlock("Superior Support", "Use Plivo\u2019s pre-registered sender IDs and templates to bypass regulatory paperwork."),
      ...featureBlock("Guaranteed Delivery", "Our team provides continuous assistance and support to users."),
      divider(),

      h2("Section 7: FAQ"),
      p("Frequently asked questions", { bold: true, size: 26 }),
      spacer(),
    ];

    const faqs = [
      ["What is the difference between verification & authentication?", "Verification and authentication are typically used interchangeably, but they aren\u2019t the same thing. Verification occurs at signup. It ensures that a user is who they say they are. Authentication occurs every time a user logs in. Plivo Verify can be used for both verification and authentication."],
      ["What\u2019s the difference between SMS verification and voice verification?", "SMS verification is fast and easy for users to complete with great reach. Voice verification provides an accessible alternative for individuals with visual disabilities, works for landline-only customers, and offers higher delivery rates as voice is prioritized on carrier networks. Voice also offers richer data points for analytics."],
      ["Is 2FA the same as OTP for verification?", "Two-factor authentication (2FA) requires two different types of identity factors: Something you know (password), Something you have (phone/device), Something you are (biometrics). OTP is one method used within 2FA - specifically the \u201Csomething you have\u201D factor."],
      ["What is SMS verification?", "SMS verification adds an extra layer of security by using two-factor authentication (2FA) to verify users\u2019 identities. It helps ensure that the person trying to access the account has a mobile device tied to that account, preventing unauthorized access."],
      ["How does SMS verification work?", "An 8-step process: User enters phone number \u2192 App sends verification request to Plivo \u2192 Plivo generates OTP \u2192 OTP sent via SMS \u2192 User receives OTP \u2192 User enters OTP in app \u2192 App verifies with Plivo \u2192 Access granted or denied."],
    ];
    faqs.forEach(([q, a]) => {
      children.push(p(q, { bold: true, after: 40 }));
      children.push(p(a, { after: 160 }));
    });
    children.push(divider());
    children.push(h2("Section 8: Pre-Footer CTA"));
    children.push(p("It\u2019s easy to get started. Sign up for free.", { bold: true, size: 26 }));
    children.push(p("Create your account and receive trial credits or get in touch with us."));

    return children;
  });
}

// ============================================================
// 8. PHONE NUMBERS
// ============================================================
async function phoneNumbers() {
  await buildDoc("content-phone-numbers", () => {
    const children = [
      h1("Virtual Phone Numbers Page"),
      meta("URL", "plivo.com/virtual-phone-numbers/"),
      meta("Page Title", "Phone Numbers"),
      meta("Meta Description", "Instantly buy local, mobile, and toll-free numbers in more than 65 countries using Plivo\u2019s API and console."),
      divider(),

      h2("Section 1: Hero"),
      p("Phone Numbers", { bold: true, size: 28 }),
      p("Instantly buy local, mobile, and toll-free numbers in more than 65 countries using Plivo\u2019s API and console."),
      p("CTAs: Sign up for free | Talk to sales", { bold: true, color: "323dfe" }),
      divider(),

      h2("Section 2: Use Cases"),
      p("Explore our most loved products today", { bold: true, size: 26 }),
      spacer(),
      ...featureBlock("Call forwarding", "Forward calls to another phone, such as your home or office number."),
      ...featureBlock("Conference call", "Connect multiple people in a secure voice call."),
      ...featureBlock("Voicemail", "Record important customer information while you\u2019re away."),
      ...featureBlock("SMS autoresponder", "Automatically respond to your customers while you\u2019re away."),
      ...featureBlock("Scalable cloud IVR", "Build powerful multilevel IVR menus to route calls intelligently."),
      ...featureBlock("SMS survey", "Send and receive SMS messages to conduct surveys."),
      divider(),

      h2("Section 3: Number Types"),
      p("Multiple types of numbers to suit your business needs", { bold: true, size: 26 }),
      spacer(),
      h3("Voice & SMS Numbers"),
    ];
    const voiceNums = [
      ["Toll-free numbers", "Improve your brand recall with a memorable phone number.", "Voice, SMS, MMS"],
      ["Local numbers", "Voice and SMS-enabled numbers for localizing your business.", "Voice, SMS"],
      ["National numbers", "Receive nationwide voice calls at a standard cost.", "Voice"],
    ];
    voiceNums.forEach(([t, d, caps]) => { children.push(...featureBlock(t, d)); children.push(p("Capabilities: " + caps, { italic: true, size: 18, after: 120 })); });

    children.push(h3("Messaging Numbers"));
    const msgNums = [
      ["Mobile numbers", "Send and receive SMS and MMS messages with higher throughput.", "Voice, SMS, MMS"],
      ["Short code", "Gain brand recognition for your message with higher throughput and performance.", "SMS, MMS"],
      ["Bring your own number", "Use your existing numbers on Plivo using SIP forwarding or via your own RespOrg.", "Voice"],
    ];
    msgNums.forEach(([t, d, caps]) => { children.push(...featureBlock(t, d)); children.push(p("Capabilities: " + caps, { italic: true, size: 18, after: 120 })); });
    children.push(divider());

    children.push(h2("Section 4: Pricing"));
    children.push(p("Flexible pricing models to meet your needs", { bold: true, size: 26 }));
    children.push(spacer());
    children.push(...featureBlock("Dynamic usage-based pricing", "Pay only for what you use while automatically unlocking volume discounts as your usage grows. The more you use, the more you save."));
    children.push(...featureBlock("Committed spend volume discounts", "Simple, predictable pricing with maximum benefits. Commit to a monthly spend and enjoy flat-rate discounts, no tiers needed."));
    children.push(divider());

    children.push(h2("Section 5: Features"));
    children.push(p("Powerful features out of the box", { bold: true, size: 26 }));
    children.push(p("Search for, buy, and activate phone numbers instantly to give your business a local presence."));
    children.push(spacer());
    [
      ["Seamless activation", "Instant activation with API-based address and identity verification."],
      ["Assured numbers", "Only clean, verified numbers with a cool-off period to prevent unwanted calls."],
      ["High-quality standards", "Handpicked processes for optimal customer experience and minimal call failures."],
      ["Broad coverage", "Access local, mobile, national, and toll-free numbers across 50+ countries."],
      ["Search", "Find number ranges or prefixes across 120+ countries by capability and region."],
      ["Purchase", "Frictionless purchase and instant activation via API at account or subaccount level."],
      ["Verification", "Verify addresses and identity documents in a single API call."],
      ["Number porting", "Port existing numbers to Plivo - our team handles the entire process."],
    ].forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(divider());

    children.push(h2("Section 6: Why Plivo"));
    children.push(p("Top reasons why businesses choose Plivo", { bold: true, size: 26 }));
    [
      ["Proven quality and scale", "With over a billion API requests every month, our globally distributed direct-to-carrier network and intelligent routing ensures highest SMS delivery and lowest latency for your calls."],
      ["Enterprise-grade platform", "Engineered for high availability, extreme reliability and 99.95% uptime SLA. Privacy Shield and GDPR Compliance means any business can trust Plivo with data privacy and security."],
      ["A team that truly cares about your success", "Our 24x7 premium support and a consultative customer success team provide you with all the technical guidance and industry expertise you need, when you need it."],
      ["Lower cost of ownership", "Receive discounted pricing from the start with simple usage-based pricing where you only pay for what you use. Avail additional discounts with committed usage as you scale."],
    ].forEach(([t, d]) => children.push(...featureBlock(t, d)));
    children.push(divider());

    children.push(h2("Section 7: FAQ"));
    children.push(p("Frequently asked questions", { bold: true, size: 26 }));
    children.push(spacer());
    [
      ["How much does a virtual phone number cost on Plivo?", "Plivo offers competitive pay-as-you-go pricing for phone numbers. US local numbers start at $0.50/month, toll-free numbers at $1.00/month, and pricing varies by country and number type. There are no setup fees."],
      ["Does Plivo provide free phone numbers?", "While we do not provide free numbers, new accounts receive trial credits to test our services and features. You can use these credits to rent numbers and make test calls or send messages."],
      ["What types of phone numbers does Plivo offer?", "Plivo offers local numbers for voice and SMS, toll-free numbers for voice, SMS, and MMS, mobile numbers for voice, SMS, and MMS, and short codes for high-volume SMS and MMS. Numbers are available across 100+ countries."],
      ["How do I get a toll-free number for my business?", "You can get a toll-free number through Plivo by signing up for an account and purchasing one from the Plivo console (Phone Numbers > Buy Numbers) or through the Plivo Phone Number API. Toll-free verification is required for US/Canadian toll-free numbers used for messaging."],
      ["Can I port my existing phone numbers to Plivo?", "Yes, Plivo supports number porting for most number types across supported countries. You can keep your existing phone numbers while taking advantage of Plivo\u2019s platform. Contact our sales team to initiate a porting request."],
    ].forEach(([q, a]) => {
      children.push(p(q, { bold: true, after: 40 }));
      children.push(p(a, { after: 160 }));
    });
    children.push(divider());
    children.push(h2("Section 8: Pre-Footer CTA"));
    children.push(p("It\u2019s easy to get started. Sign up for free.", { bold: true, size: 26 }));
    children.push(p("Create your account and receive trial credits or get in touch with us."));

    return children;
  });
}

// ============================================================
// 9. SIP TRUNKING
// ============================================================
async function sipTrunking() {
  await buildDoc("content-sip-trunking", () => [
    h1("SIP Trunking Page"),
    meta("URL", "plivo.com/sip-trunking/"),
    meta("Page Title", "SIP trunking | Plivo"),
    meta("Meta Description", "Cloud-based SIP trunking with global connectivity and unlimited concurrent calls. Flexible pay-as-you-go pricing. Connect your VoIP infrastructure in minutes."),
    divider(),

    h2("Section 1: Hero"),
    p("Cloud-based SIP trunking", { bold: true, size: 28 }),
    p("Global connectivity and unlimited concurrent calls with flexible pay-as-you-go pricing. Connect your VoIP infrastructure in minutes."),
    p("CTAs: Get volume pricing | Sign up for free", { bold: true, color: "323dfe" }),
    divider(),

    h2("Section 2: Quality SIP Trunking"),
    p("Quality SIP trunking", { bold: true, size: 26 }),
    p("Learn how thousands of innovative businesses rely on Plivo for their customer engagement"),
    spacer(),
    ...featureBlock("Guaranteed quality", "Your calls are terminated through one-hop local carriers to give you low post-dial delay, guaranteed features such as CLI and DTMF, and no out-of-region audio looping. Features: 1-hop, CLI, DTMF, Low post-dial delay."),
    ...featureBlock("Global infrastructure", "Our PoPs are located in seven locations (California, Virginia, Frankfurt, Mumbai, Singapore, Sydney, S\u00E3o Paulo) across five continents to ensure low latency and high voice quality. Stats: 7 PoPs active, 5 continents."),
    ...featureBlock("High availability and uptime", "With a redundant infrastructure across multiple geographies and at least three local carrier connections across countries, Plivo SIP trunking promises 99.99% uptime."),
    divider(),

    h2("Section 3: Outbound & Inbound"),
    h3("SIP Trunking Outbound"),
    ...featureBlock("Make calls to more than 220 countries", "Connect to mobile or fixed phone numbers globally using your existing VoIP infrastructure."),
    ...featureBlock("Multiple authentication options", "Secure your SIP trunk using IP-based or credentials-based authentication."),
    ...featureBlock("Unlimited concurrent calls", "Scale your outbound calls and experience unlimited concurrent calls at no extra cost."),
    h3("SIP Trunking Inbound"),
    ...featureBlock("Receive calls in more than 70 countries", "Purchase Local, National, Mobile or Toll-Free phone numbers across the globe."),
    ...featureBlock("Instantly provision phone numbers", "Configure phone numbers with SIP trunking and start receiving calls in minutes."),
    ...featureBlock("Unlimited concurrent calls", "Receive unlimited concurrent calls on your phone numbers at no extra cost."),
    divider(),

    h2("Section 4: Robust Feature Set"),
    p("Robust feature set for all your business needs", { bold: true, size: 26 }),
    spacer(),
    ...featureBlock("IP authentication", "Authenticate and access your SIP trunks using IP authentication or credentials for added security."),
    ...featureBlock("Encrypted trunks", "Secure your trunks with Transport Layer Security (TLS) and Secure Real-Time Transport Protocol (SRTP)."),
    ...featureBlock("Fraud protection and alerts", "Our systems automatically detect and alert you to fraudulent activity on your account."),
    ...featureBlock("Interoperability", "Interoperate with standard softswitches and IP PBXs."),
    ...featureBlock("Self-service portal", "Easily access and manage your account analytics, logs, and SIP trunks."),
    ...featureBlock("Separated trunks", "Each trunk has a unique SIP domain for easy traffic segmentation and management."),
    divider(),

    h2("Section 5: Why Choose Plivo"),
    p("Top reasons why businesses choose Plivo", { bold: true, size: 26 }),
    spacer(),
    ...featureBlock("Proven quality and scale", "With over a billion API requests every month, our globally distributed direct to carrier network and intelligent routing ensures highest SMS delivery and lowest latency for your calls."),
    ...featureBlock("Enterprise grade platform", "Engineered for high availability, extreme reliability and 99.95% uptime SLA. Privacy Shield and GDPR Compliance means any business can trust Plivo with data privacy and security."),
    ...featureBlock("A team that truly cares about your success", "Our 24x7 premium support and a consultative customer success team, provide you with all the technical guidance and industry expertise you need, when you need it."),
    ...featureBlock("Lower cost of ownership", "Receive discounted pricing from the start with simple usage based pricing where you only pay for what you use. Avail additional discounts with committed usage as you scale."),
    divider(),

    h2("Section 6: Pre-Footer CTA"),
    p("It\u2019s easy to get started. Sign up for free.", { bold: true, size: 26 }),
    p("Create your account and receive trial credits or get in touch with us."),
  ]);
}

// Run all
async function main() {
  await Promise.all([
    homepage(),
    voice(),
    sms(),
    whatsapp(),
    chat(),
    aiAgents(),
    verify(),
    phoneNumbers(),
    sipTrunking(),
  ]);
  console.log("\nAll 9 .docx files created successfully!");
}

main().catch(console.error);
