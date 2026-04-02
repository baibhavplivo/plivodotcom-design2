import { Marquee } from "@/components/magicui/marquee";

interface Feature {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

// Illustration: Diverse Message Types
function MessageTypesIllustration() {
  const types = [
    { label: "Text", icon: (
      <svg className="w-5 h-5" fill="none" stroke="url(#chatIconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    )},
    { label: "Images", icon: (
      <svg className="w-5 h-5" fill="none" stroke="url(#chatIconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
      </svg>
    )},
    { label: "Videos", icon: (
      <svg className="w-5 h-5" fill="none" stroke="url(#chatIconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    )},
    { label: "Buttons", icon: (
      <svg className="w-5 h-5" fill="none" stroke="url(#chatIconGrad)" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    )},
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="chatIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cd3ef9" />
            <stop offset="100%" stopColor="#323dfe" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative h-full w-full px-4 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-3 w-full">
          {types.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col items-center gap-2">
              {item.icon}
              <p className="text-[10px] font-medium text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Conversational Forms
function ConversationalFormsIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[220px] bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <p className="text-[10px] font-semibold text-gray-800 mb-2">Collect Information</p>
          <div className="space-y-2">
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Full Name</p>
              <div className="h-6 bg-gray-50 rounded border border-gray-200 px-2 flex items-center">
                <p className="text-[10px] text-gray-800">Sarah Mitchell</p>
              </div>
            </div>
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Email</p>
              <div className="h-6 bg-gray-50 rounded border border-gray-200 px-2 flex items-center">
                <p className="text-[10px] text-gray-800">sarah@example.com</p>
              </div>
            </div>
            <div>
              <p className="text-[9px] text-gray-500 mb-0.5">Issue Type</p>
              <div className="h-6 bg-[#323dfe]/5 rounded border border-[#323dfe]/20 px-2 flex items-center justify-between">
                <p className="text-[10px] text-[#323dfe] font-medium">Billing inquiry</p>
                <svg className="w-3 h-3 text-[#323dfe]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Custom Interactive Messages
function CustomInteractiveIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[220px]">
          {/* Calendar picker mini */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <p className="text-[10px] font-semibold text-gray-800 mb-2">Select a date</p>
            <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-[8px] text-gray-400 font-medium">{d}</span>
              ))}
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((d) => (
                <span key={d} className={`text-[9px] rounded-full w-5 h-5 flex items-center justify-center mx-auto ${d === 7 ? "bg-[#323dfe]/10 text-[#323dfe] ring-1 ring-[#323dfe] font-semibold" : "text-gray-600"}`}>{d}</span>
              ))}
            </div>
            <div className="flex gap-1.5">
              <button className="flex-1 py-1 text-[9px] font-medium text-gray-600 bg-gray-100 rounded">Cancel</button>
              <button className="flex-1 py-1 text-[9px] font-medium text-white bg-gradient-to-r from-[#cd3ef9] to-[#323dfe] rounded">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Custom Branded Chat
function BrandedChatIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-start justify-center pt-4">
        <div className="w-full max-w-[220px]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Brand header */}
            <div className="bg-gray-100 px-3 py-2.5 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-[8px] font-bold text-gray-600">B</span>
              </div>
              <p className="text-[10px] font-medium text-gray-700">Your Brand</p>
            </div>
            {/* Color swatches */}
            <div className="p-3.5">
              <p className="text-[9px] text-gray-500 mb-2">Brand Colors</p>
              <div className="flex gap-2.5 mb-3">
                {["#cd3ef9", "#323dfe", "#0f1117", "#ffffff"].map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded border border-gray-200" style={{ backgroundColor: color }} />
                    <span className="text-[7px] text-gray-400">{color}</span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-gray-500 mb-1.5">Font</p>
              <div className="flex items-center gap-1.5 bg-gray-50 rounded px-2.5 py-1.5">
                <span className="text-[10px] font-medium text-gray-800">Sora</span>
                <span className="text-[8px] text-gray-400">+ Inter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Web Chat
function WebChatIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        {/* Browser mockup */}
        <div className="w-full max-w-[240px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Browser bar */}
          <div className="bg-gray-50 border-b border-gray-200 px-3 py-1.5 flex items-center gap-1.5">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-2 py-0.5 ml-2">
              <p className="text-[8px] text-gray-400">yoursite.com</p>
            </div>
          </div>
          {/* Page content */}
          <div className="p-3 h-24 relative">
            <div className="w-3/4 h-2 bg-gray-100 rounded mb-2" />
            <div className="w-1/2 h-2 bg-gray-100 rounded mb-2" />
            <div className="w-2/3 h-2 bg-gray-100 rounded" />
            {/* Chat widget bubble */}
            <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#cd3ef9] via-[#323dfe] to-black flex items-center justify-center shadow-lg">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Mobile App Chat
function MobileAppIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full flex items-start justify-center">
        {/* Centered layout wrapper */}
        <div className="flex items-start gap-3 mt-3">
          {/* Phone mockup - top visible, bottom cropped */}
          <div className="w-[150px] h-[240px] rounded-t-[20px] border-[2px] border-b-0 border-gray-300 bg-white overflow-hidden shadow-lg relative">
            {/* Dynamic Island */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-12 h-[5px] bg-gray-300 rounded-full z-10" />
            {/* Screen */}
            <div className="absolute inset-[2px] rounded-t-[18px] overflow-hidden bg-gray-50 flex flex-col">
              {/* Chat header - light gradient */}
              <div className="bg-gradient-to-r from-[#cd3ef9]/10 to-[#323dfe]/10 px-3 py-2 pt-4 flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#323dfe]/10 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[#323dfe]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.813 15.904L12 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L5.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L12 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <p className="text-[8px] font-semibold text-gray-800">AI Support</p>
              </div>
              {/* Messages - just 2 bubbles */}
              <div className="flex-1 px-3 py-2.5 space-y-2">
                <div className="bg-white rounded-lg rounded-tl-sm px-2.5 py-2 shadow-sm max-w-[85%]">
                  <p className="text-[7.5px] text-gray-700 leading-[1.4]">Hi! How can I help you today?</p>
                </div>
                <div className="bg-white rounded-lg rounded-tr-sm px-2.5 py-2 ml-auto max-w-[80%] shadow-sm border border-gray-200">
                  <p className="text-[7.5px] text-gray-700 leading-[1.4]">I need to track my order</p>
                </div>
              </div>
            </div>
          </div>
          {/* SDK pills - right side */}
          <div className="flex flex-col gap-2 mt-10">
            {[
              { label: "iOS", icon: (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              )},
              { label: "Android", icon: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
              )},
              { label: "React Native", icon: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="11.87" r="2.15"/><path d="M12 6.78c2.95 0 5.65.58 7.6 1.54.97.48 1.75 1.04 2.28 1.65.53.62.82 1.26.82 1.9s-.29 1.28-.82 1.9c-.53.61-1.31 1.17-2.28 1.65-1.95.96-4.65 1.54-7.6 1.54s-5.65-.58-7.6-1.54c-.97-.48-1.75-1.04-2.28-1.65C1.59 13.15 1.3 12.51 1.3 11.87s.29-1.28.82-1.9c.53-.61 1.31-1.17 2.28-1.65C6.35 7.36 9.05 6.78 12 6.78zm0-1.3c-6.08 0-12 2.24-12 6.39s5.92 6.39 12 6.39 12-2.24 12-6.39S18.08 5.48 12 5.48z"/><path d="M8.52 9.32c1.48-2.55 3.37-4.6 5.17-5.73.9-.56 1.77-.9 2.55-1 .78-.1 1.44.04 1.93.53.5.49.7 1.17.68 2-.03.83-.3 1.79-.78 2.84-.96 2.1-2.72 4.47-5.17 6.55-2.44 2.08-4.9 3.4-6.91 3.94-1 .27-1.89.34-2.6.2-.71-.14-1.26-.5-1.5-1.09-.25-.59-.19-1.28.09-2.04.28-.76.78-1.59 1.47-2.46l-.01-.01c1.44-1.84 3.59-3.18 5.08-3.73zm.65-1.12C7.42 9 5.08 10.47 3.5 12.5c-.76.97-1.33 1.92-1.67 2.82-.34.9-.46 1.82-.1 2.66.37.85 1.15 1.37 2.1 1.55.94.19 2.06.08 3.25-.25 2.2-.6 4.83-2.03 7.4-4.22 2.57-2.19 4.44-4.71 5.47-6.98.53-1.14.84-2.24.88-3.24.04-1-.2-1.94-.9-2.64-.7-.7-1.64-.94-2.64-.9-1 .04-2.1.35-3.24.88z"/><path d="M15.48 9.32c-1.48-2.55-3.37-4.6-5.17-5.73-.9-.56-1.77-.9-2.55-1-.78-.1-1.44.04-1.93.53-.5.49-.7 1.17-.68 2 .03.83.3 1.79.78 2.84.96 2.1 2.72 4.47 5.17 6.55 2.44 2.08 4.9 3.4 6.91 3.94 1 .27 1.89.34 2.6.2.71-.14 1.26-.5 1.5-1.09.25-.59.19-1.28-.09-2.04-.28-.76-.78-1.59-1.47-2.46l.01-.01c-1.44-1.84-3.59-3.18-5.08-3.73zm-.65-1.12c1.75.8 4.09 2.27 5.67 4.3.76.97 1.33 1.92 1.67 2.82.34.9.46 1.82.1 2.66-.37.85-1.15 1.37-2.1 1.55-.94.19-2.06.08-3.25-.25-2.2-.6-4.83-2.03-7.4-4.22-2.57-2.19-4.44-4.71-5.47-6.98-.53-1.14-.84-2.24-.88-3.24-.04-1 .2-1.94.9-2.64.7-.7 1.64-.94 2.64-.9 1 .04 2.1.35 3.24.88z"/></svg>
              )},
            ].map((sdk, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg border border-gray-200 px-2.5 py-1.5 shadow-sm">
                <span className="text-gray-500">{sdk.icon}</span>
                <span className="text-[9px] font-medium text-gray-700">{sdk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Message Snippets & Templates
function SnippetsIllustration() {
  const templates = [
    { name: "Welcome message", category: "Greeting" },
    { name: "Issue resolved", category: "Support" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="relative w-full max-w-[240px]">
          <div className="absolute left-3 right-3 top-1 h-8 bg-white rounded-lg border border-gray-200/60 opacity-30" />
          <div className="absolute left-1.5 right-1.5 top-3 h-8 bg-white rounded-lg border border-gray-200/80 opacity-50" />
          <div className="relative space-y-2 pt-5">
            {templates.map((tpl, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-2.5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <defs>
                      <linearGradient id="snipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#cd3ef9" />
                        <stop offset="100%" stopColor="#323dfe" />
                      </linearGradient>
                    </defs>
                    <path stroke="url(#snipGrad)" strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-900 truncate">{tpl.name}</p>
                  <p className="text-[9px] text-gray-400">{tpl.category}</p>
                </div>
                <span className="text-[9px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100 flex-shrink-0">Ready</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Multi-Language Support
function MultiLanguageIllustration() {
  const row1 = [
    { name: "English", flag: "🇺🇸" },
    { name: "Español", flag: "🇪🇸" },
    { name: "Português", flag: "🇧🇷" },
    { name: "हिंदी", flag: "🇮🇳" },
    { name: "العربية", flag: "🇸🇦" },
    { name: "中文", flag: "🇨🇳" },
    { name: "日本語", flag: "🇯🇵" },
    { name: "Deutsch", flag: "🇩🇪" },
    { name: "Français", flag: "🇫🇷" },
    { name: "한국어", flag: "🇰🇷" },
  ];
  const row2 = [
    { name: "Italiano", flag: "🇮🇹" },
    { name: "Русский", flag: "🇷🇺" },
    { name: "ไทย", flag: "🇹🇭" },
    { name: "Tiếng Việt", flag: "🇻🇳" },
    { name: "Türkçe", flag: "🇹🇷" },
    { name: "Polski", flag: "🇵🇱" },
    { name: "Nederlands", flag: "🇳🇱" },
    { name: "Svenska", flag: "🇸🇪" },
    { name: "Bahasa", flag: "🇮🇩" },
    { name: "Malay", flag: "🇲🇾" },
  ];

  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
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
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-100/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-100/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

// Illustration: Persistent Conversations
function PersistentConversationsIllustration() {
  return (
    <div className="relative h-48 w-full rounded-lg bg-gray-100/70 overflow-hidden">
      <div className="relative h-full w-full p-3 flex items-center justify-center">
        <div className="w-full max-w-[230px]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[10px] font-semibold text-gray-800">Conversation History</p>
              <span className="text-[8px] text-gray-400">Cross-device</span>
            </div>
            <div className="space-y-1.5">
              {[
                { device: "Mobile", time: "Yesterday", msg: "I need help with my order..." },
                { device: "Desktop", time: "Today", msg: "Following up on my order issue..." },
              ].map((item, i) => (
                <div key={i} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1">
                      <svg className="w-2.5 h-2.5 text-[#323dfe]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        {i === 0 ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                        )}
                      </svg>
                      <p className="text-[8px] font-semibold text-gray-500">{item.device}</p>
                    </div>
                    <p className="text-[7px] text-gray-400">{item.time}</p>
                  </div>
                  <p className="text-[9px] text-gray-700 leading-[1.3]">{item.msg}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-1 p-1.5 bg-green-50 rounded-md border border-green-100">
              <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[8px] text-green-700 font-medium">Full context preserved</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Diverse message types",
    description:
      "Support text, images, videos, carousels, buttons, quick replies, forms, and file uploads for rich conversations.",
    illustration: <MessageTypesIllustration />,
  },
  {
    title: "Conversational forms",
    description:
      "Collect customer information naturally through conversational flows instead of static forms.",
    illustration: <ConversationalFormsIllustration />,
  },
  {
    title: "Custom interactive messages",
    description:
      "Embed calendars, payment forms, location pickers, and biometric auth directly into your chat experience.",
    illustration: <CustomInteractiveIllustration />,
  },
  {
    title: "Custom-branded chat interface",
    description:
      "Match your chat widget to your brand with custom colors, fonts, logo, and messaging style.",
    illustration: <BrandedChatIllustration />,
  },
  {
    title: "Web chat",
    description:
      "Add a floating widget or inline chat to your website - embed anywhere with a simple code snippet.",
    illustration: <WebChatIllustration />,
  },
  {
    title: "Mobile app chat",
    description:
      "Native SDKs for React Native, iOS, and Android with full customization and push notification support.",
    illustration: <MobileAppIllustration />,
  },
  {
    title: "Message snippets & templates",
    description:
      "Build and reuse prebuilt response templates for consistent, fast replies across all conversations.",
    illustration: <SnippetsIllustration />,
  },
  {
    title: "Multi-language support",
    description:
      "Automatically detect and respond in 50+ languages to serve customers in their preferred language.",
    illustration: <MultiLanguageIllustration />,
  },
  {
    title: "Persistent conversations",
    description:
      "Maintain conversation continuity across sessions, devices, and channels - customers never lose context.",
    illustration: <PersistentConversationsIllustration />,
  },
];

export default function ChatInteractiveFeatures() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          Interactive chat features for seamless,
          <br />
          multilingual conversations
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 md:mb-16">
          From rich media messages to persistent conversations across devices - all the tools to deliver standout chat experiences.
        </p>

        {/* Features Grid - 3x3 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300"
            >
              {feature.illustration}
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
