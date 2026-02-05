import { Globe } from "@/components/ui/globe";

interface Feature {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

// Illustration: Official WhatsApp Business API
function OfficialAPIIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* WhatsApp Business badge */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">WhatsApp Business API</p>
                <p className="text-xs text-gray-500">Official Meta Partner</p>
              </div>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
            <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium text-gray-700">Verified Business</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Rich Media Messages
function RichMediaIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        {/* Media types grid */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[240px]">
          {/* Image card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-14 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <p className="text-[10px] font-medium text-gray-700 p-1.5 text-center">Images</p>
          </div>

          {/* Video card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-14 bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <p className="text-[10px] font-medium text-gray-700 p-1.5 text-center">Videos</p>
          </div>

          {/* Document card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-14 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <p className="text-[10px] font-medium text-gray-700 p-1.5 text-center">Documents</p>
          </div>

          {/* Location card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-14 bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <p className="text-[10px] font-medium text-gray-700 p-1.5 text-center">Location</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Quick Reply Buttons
function QuickReplyIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 overflow-hidden">
      <div className="relative h-full w-full p-4 flex items-center justify-center">
        {/* WhatsApp message with buttons */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-[220px]">
          <div className="p-3">
            <p className="text-[12px] text-gray-800 mb-2">How would you like to proceed?</p>
          </div>
          <div className="border-t border-gray-100">
            {["View Products", "Talk to Agent", "Check Order"].map((btn, i) => (
              <button
                key={i}
                className="w-full px-3 py-2.5 text-[12px] font-medium text-[#25D366] border-b border-gray-100 last:border-0 hover:bg-[#25D366]/5 transition-colors text-center"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Multi-language Support
function MultiLanguageIllustration() {
  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "PT", name: "Português", flag: "🇧🇷" },
    { code: "HI", name: "हिंदी", flag: "🇮🇳" },
    { code: "AR", name: "العربية", flag: "🇸🇦" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[260px]">
          {/* Header */}
          <div className="text-center mb-3">
            <span className="text-[22px] font-semibold bg-gradient-to-r from-[#25D366] to-[#128C7E] bg-clip-text text-transparent">50+</span>
            <p className="text-[11px] text-gray-500">Languages Supported</p>
          </div>

          {/* Language grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {languages.map((lang, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 px-2 py-1.5 text-center"
              >
                <span className="text-base">{lang.flag}</span>
                <p className="text-[9px] font-medium text-gray-700 mt-0.5">{lang.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: CRM Integrations
function IntegrationsIllustration() {
  const brands = [
    { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify/96BF48" },
    { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
    { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
    { name: "Zendesk", logo: "https://cdn.simpleicons.org/zendesk/03363D" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 overflow-hidden">
      <div className="relative h-full w-full p-4 flex items-center justify-center">
        <div className="text-center w-full">
          {/* WhatsApp icon in center */}
          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>

          {/* Integration logos */}
          <div className="flex items-center justify-center gap-3">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-5 h-5 object-contain"
                />
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-500 mt-3">+ 50 more integrations</p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Global Reach
function GlobalReachIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/5 overflow-hidden">
      <div className="relative h-full w-full">
        {/* Rotating Globe */}
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '-10px',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '280px',
          }}
        >
          <Globe
            size={280}
            dark={false}
            baseColor={[0.88, 0.92, 0.88]}
            glowColor={[0.9, 0.98, 0.92]}
            markerColor={[0.14, 0.83, 0.4]}
            opacity={1}
            interactive={false}
          />
        </div>

        {/* 2B+ Users pill */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[20px] font-semibold text-[#25D366] leading-none">2B+</span>
              <span className="text-[10px] text-gray-600 font-medium">Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Verified Business Profile",
    description:
      "Get a green tick verified business profile. Direct Meta partnership ensures compliance, reliability, and access to the latest features.",
    illustration: <OfficialAPIIllustration />,
  },
  {
    title: "Rich media & catalogs",
    description:
      "Send images, videos, documents, and locations. Create interactive catalogs and carousels that showcase your products beautifully.",
    illustration: <RichMediaIllustration />,
  },
  {
    title: "Quick reply & interactive buttons",
    description:
      "Guide conversations with call-to-action buttons, quick reply options, and list messages that boost engagement and conversions.",
    illustration: <QuickReplyIllustration />,
  },
  {
    title: "Multi-language support",
    description:
      "AI agents that understand and respond in 28+ languages, automatically detecting and adapting to customer language preferences.",
    illustration: <MultiLanguageIllustration />,
  },
  {
    title: "Seamless integrations",
    description:
      "Connect with Shopify, Salesforce, HubSpot, Zendesk and 50+ platforms. Sync customer data and trigger automated workflows.",
    illustration: <IntegrationsIllustration />,
  },
  {
    title: "Global inventory & fast onboarding",
    description:
      "WhatsApp-ready numbers across 50+ countries. Priority account approval and expedited Meta issue resolution.",
    illustration: <GlobalReachIllustration />,
  },
];

export default function WhatsAppConnectivityGrid() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Built for enterprise scale & reliability
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 md:mb-16">
          Official WhatsApp Business API with 99.99% uptime, 95%+ CSAT score, and built-in GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2 compliance.
        </p>

        {/* Features Grid - 2x3 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300"
            >
              {/* Illustration */}
              {feature.illustration}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Logos */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-12 sm:gap-[4.5rem] md:gap-24">
          {[
            { name: "HIPAA", src: "/images/compliance/HIPAA black.svg" },
            { name: "GDPR", src: "/images/compliance/GDPR black.svg" },
            { name: "SOC 2", src: "/images/compliance/AICPA black.svg" },
            { name: "PCI DSS", src: "/images/compliance/PCI black.svg" },
            { name: "STAR", src: "/images/compliance/Star Black.svg" },
          ].map((cert) => (
            <div key={cert.name} className="flex flex-col items-center gap-3">
              <img
                src={cert.src}
                alt={`${cert.name} compliance`}
                className="h-10 sm:h-12 w-10 sm:w-12 object-contain opacity-60"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-500">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
