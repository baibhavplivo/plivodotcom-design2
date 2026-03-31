import { Marquee } from "@/components/magicui/marquee";

interface Feature {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

// Illustration: Official WhatsApp Business API
function OfficialAPIIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* WhatsApp Business badge */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="waGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#cd3ef9" />
                      <stop offset="100%" stopColor="#323dfe" />
                    </linearGradient>
                  </defs>
                  <g fill="url(#waGrad)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </g>
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
            <svg className="w-5 h-5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="verifiedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cd3ef9" />
                  <stop offset="100%" stopColor="#323dfe" />
                </linearGradient>
              </defs>
              <path fill="url(#verifiedGrad)" fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
  const mediaTypes = [
    {
      label: "Images",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="url(#iconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      ),
    },
    {
      label: "Videos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="url(#iconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
    },
    {
      label: "Docs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="url(#iconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      label: "Location",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="url(#iconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      {/* Shared SVG gradient definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cd3ef9" />
            <stop offset="100%" stopColor="#323dfe" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative h-full w-full px-4 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-3 w-full">
          {mediaTypes.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col items-center gap-2">
              {item.icon}
              <p className="text-[10px] font-medium text-gray-600">{item.label}</p>
            </div>
          ))}
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
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        {/* WhatsApp message with buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-[200px]">
          <div className="px-3 py-2">
            <p className="text-[12px] text-gray-800">How would you like to proceed?</p>
          </div>
          <div className="border-t border-gray-100">
            {["View Products", "Talk to Agent", "Check Order"].map((btn, i) => (
              <button
                key={i}
                className="w-full px-3 py-2 text-[12px] font-medium text-[#323dfe] border-b border-gray-100 last:border-0 hover:bg-[#323dfe]/5 transition-colors text-center"
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
  const row1 = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "PT", name: "Português", flag: "🇧🇷" },
    { code: "HI", name: "हिंदी", flag: "🇮🇳" },
    { code: "AR", name: "العربية", flag: "🇸🇦" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
    { code: "JA", name: "日本語", flag: "🇯🇵" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "KO", name: "한국어", flag: "🇰🇷" },
  ];
  const row2 = [
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
    { code: "RU", name: "Русский", flag: "🇷🇺" },
    { code: "TH", name: "ไทย", flag: "🇹🇭" },
    { code: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "TR", name: "Türkçe", flag: "🇹🇷" },
    { code: "PL", name: "Polski", flag: "🇵🇱" },
    { code: "NL", name: "Nederlands", flag: "🇳🇱" },
    { code: "SV", name: "Svenska", flag: "🇸🇪" },
    { code: "ID", name: "Bahasa", flag: "🇮🇩" },
    { code: "MS", name: "Malay", flag: "🇲🇾" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      {/* Marquee rows */}
      <div className="flex flex-col gap-1 h-full justify-center">
        <Marquee className="[--duration:25s] [--gap:0.5rem] px-0 py-1.5" pauseOnHover>
          {row1.map((lang, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white rounded-full border border-gray-200 px-3 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="text-sm">{lang.flag}</span>
              <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{lang.name}</span>
            </div>
          ))}
        </Marquee>
        <Marquee className="[--duration:30s] [--gap:0.5rem] px-0 py-1.5" reverse pauseOnHover>
          {row2.map((lang, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white rounded-full border border-gray-200 px-3 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="text-sm">{lang.flag}</span>
              <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{lang.name}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-100/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-100/70 to-transparent pointer-events-none z-10" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

// Illustration: Message Templates
function MessageTemplatesIllustration() {
  const templates = [
    { name: "Order confirmation", status: "Approved", category: "Utility" },
    { name: "Shipping update", status: "Approved", category: "Marketing" },
  ];

  const TemplateIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
      <defs>
        <linearGradient id="tplIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cd3ef9" />
          <stop offset="100%" stopColor="#323dfe" />
        </linearGradient>
      </defs>
      <path stroke="url(#tplIconGrad)" strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="relative w-full max-w-[240px]">
          {/* Stacked cards behind (3rd and 4th) */}
          <div className="absolute left-3 right-3 top-1 h-8 bg-white rounded-lg border border-gray-200/60 opacity-30" />
          <div className="absolute left-1.5 right-1.5 top-3 h-8 bg-white rounded-lg border border-gray-200/80 opacity-50" />

          {/* Visible template cards */}
          <div className="relative space-y-2 pt-5">
            {templates.map((tpl, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-2.5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <TemplateIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-900 truncate">{tpl.name}</p>
                  <p className="text-[9px] text-gray-400">{tpl.category}</p>
                </div>
                <span className="text-[9px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100 flex-shrink-0">{tpl.status}</span>
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

// Illustration: Broadcast & Bulk Messages
function BroadcastIllustration() {
  const recipients = [
    { name: "Sarah M.", segment: "VIP", status: "Delivered" },
    { name: "James K.", segment: "New", status: "Delivered" },
    { name: "Priya R.", segment: "VIP", status: "Read" },
    { name: "Alex T.", segment: "Active", status: "Delivered" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[250px]">
          {/* Broadcast header */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#cd3ef9] via-[#323dfe] to-black flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-900">Holiday sale blast</p>
                <p className="text-[8px] text-gray-400">4,280 recipients</p>
              </div>
            </div>
            <span className="text-[8px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">Sending</span>
          </div>

          {/* Recipient rows */}
          <div className="space-y-1">
            {recipients.map((r, i) => (
              <div key={i} className="bg-white rounded-md border border-gray-100 px-2.5 py-1.5 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-semibold text-gray-500">{r.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-gray-800 truncate">{r.name}</p>
                </div>
                <span className="text-[8px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">{r.segment}</span>
                <div className="flex items-center gap-0.5">
                  <svg className={`w-2.5 h-2.5 ${r.status === "Read" ? "text-blue-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <svg className={`w-2.5 h-2.5 -ml-1.5 ${r.status === "Read" ? "text-blue-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
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

// Illustration: WhatsApp Calling
function WhatsAppCallingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[220px]">
          {/* Chat to call escalation */}
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="waCallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cd3ef9" />
                <stop offset="100%" stopColor="#323dfe" />
              </linearGradient>
            </defs>
          </svg>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="url(#waCallGrad)" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium text-gray-800">Chat to Voice</p>
                <p className="text-[9px] text-gray-500">Same WhatsApp thread</p>
              </div>
            </div>
            {/* Flow visualization */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-gray-200 bg-white">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <p className="text-[9px] font-medium text-gray-600">Chat</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-gray-200 bg-white">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <p className="text-[9px] font-medium text-gray-600">Voice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Real-time Call Transcripts
function CallTranscriptsIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[230px]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[10px] font-semibold text-gray-800">Live Transcript</p>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-50 border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] font-medium text-green-600">LIVE</span>
              </span>
            </div>
            {/* Transcript lines */}
            <div className="space-y-1.5">
              {[
                { speaker: "Agent", text: "I can see your account. Let me pull up the details." },
                { speaker: "Customer", text: "Yes, I need to update the billing address." },
              ].map((line, i) => (
                <div key={i} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5">
                  <p className="text-[8px] font-semibold text-gray-400 mb-0.5">{line.speaker}</p>
                  <p className="text-[9px] text-gray-700 leading-[1.3]">{line.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Smarter Call Handling
function SmarterCallHandlingIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[230px]">
          {/* Call routing panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <p className="text-[10px] font-semibold text-gray-800 mb-2">Smart Call Routing</p>
            {/* Routing rules */}
            <div className="space-y-1.5">
              {[
                { label: "Sales inquiries", team: "Sales Team", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { label: "Support issues", team: "Support Queue", color: "bg-green-50 text-green-700 border-green-200" },
                { label: "Billing queries", team: "Finance Team", color: "bg-amber-50 text-amber-700 border-amber-200" },
              ].map((rule, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="text-gray-600 flex-1 truncate">{rule.label}</span>
                  <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${rule.color} flex-shrink-0`}>{rule.team}</span>
                </div>
              ))}
            </div>
            {/* Latency badge */}
            <div className="mt-2.5 flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-[9px] text-gray-600">Avg. wait time: <span className="font-semibold text-gray-900">{"<"}3s</span></span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Verified business profile",
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
    title: "Message templates",
    description:
      "Build and reuse approved WhatsApp templates for consistent, personalized messages across all customer communications.",
    illustration: <MessageTemplatesIllustration />,
  },
  {
    title: "Broadcast & bulk messages",
    description:
      "Send personalized updates, offers, and announcements to thousands of customers simultaneously with targeted delivery.",
    illustration: <BroadcastIllustration />,
  },
  {
    title: "WhatsApp calling",
    description:
      "Escalate from chat to voice seamlessly within the same WhatsApp thread for complex queries that need a personal touch.",
    illustration: <WhatsAppCallingIllustration />,
  },
  {
    title: "Smarter call handling",
    description:
      "Reduce wait times and route every caller to the right agent, team, or queue automatically based on intent and context.",
    illustration: <SmarterCallHandlingIllustration />,
  },
  {
    title: "Real-time call transcripts",
    description:
      "Get live transcriptions of every WhatsApp call for quality monitoring, compliance records, and seamless agent handoff context.",
    illustration: <CallTranscriptsIllustration />,
  },
];

export default function WhatsAppConnectivityGrid() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Everything you need to engage customers on WhatsApp
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 md:mb-16">
          From verified business profiles and rich media messaging to WhatsApp calling and smart routing - all the tools to deliver standout customer experiences.
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

      </div>
    </section>
  );
}
