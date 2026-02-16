"use client";

// Illustration: Android OTP Autofill with phone mockup (hero style)
function AndroidAutofillIllustration() {
  return (
    <div className="relative w-full h-56 sm:h-72 overflow-hidden">
      <div className="relative h-full flex items-start justify-center pt-4 sm:pt-6">
        {/* Phone mockup - gradient frame like hero */}
        <div className="relative w-48 sm:w-56">
          {/* Phone outer frame with gradient */}
          <div
            className="relative rounded-t-[24px] sm:rounded-t-[28px] p-1 shadow-xl"
            style={{
              background: "linear-gradient(135deg, rgba(205, 62, 249, 0.5) 0%, rgba(50, 61, 254, 0.5) 100%)",
            }}
          >
            {/* Screen */}
            <div className="relative rounded-t-[22px] sm:rounded-t-[26px] overflow-hidden bg-white">
              {/* Status bar */}
              <div className="h-5 bg-gray-50 flex items-center justify-between px-4 text-[9px] font-medium">
                <span className="text-gray-500">9:41</span>
                <span className="text-gray-500">100%</span>
              </div>

              {/* App header */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="text-xs font-medium text-gray-900">QuickPay</span>
              </div>

              {/* Content - simplified */}
              <div className="px-4 py-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Enter OTP to</p>
                  <p className="text-sm font-semibold text-gray-900">complete payment</p>
                </div>

                {/* OTP boxes - square */}
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gray-50 border border-gray-200" />
                  ))}
                </div>

                {/* Confirm button - white with grey outline */}
                <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-lg">
                  Confirm
                </button>

                <p className="text-center text-[10px] text-gray-400">Resend code</p>
              </div>
            </div>
          </div>
        </div>

        {/* Permission dialog overlay - positioned to right of phone */}
        <div className="absolute right-4 sm:right-8 top-[52px] sm:top-[60px] bg-white rounded-xl shadow-lg p-3 sm:p-4 w-44 sm:w-52 border border-gray-100">
          <p className="text-xs font-semibold text-gray-900 leading-tight">
            Allow QuickPay to read the message below?
          </p>

          <div className="flex items-center gap-2 my-3">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-gray-500 text-xs font-medium">OTP is 3857</span>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button className="px-3 py-1.5 text-gray-600 font-medium text-[10px]">
              Deny
            </button>
            <button
              className="px-4 py-1.5 text-white font-medium text-[10px] rounded-full"
              style={{
                background: "linear-gradient(135deg, #cd3ef9 0%, #323dfe 100%)",
              }}
            >
              Allow
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
    </div>
  );
}

// Illustration: Configuration Dashboard
function ConfigurationIllustration() {
  return (
    <div className="relative w-full h-56 sm:h-72 overflow-hidden">
      <div className="relative h-full flex items-start justify-center pt-4 sm:pt-6 px-4 sm:px-8">
        {/* Side by side cards container - wider layout */}
        <div className="flex gap-4 sm:gap-5 w-full max-w-[420px]">
          {/* Left card - Channels */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900 text-sm">Channels</span>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>

            {/* Channel tags */}
            <div className="flex flex-wrap gap-1.5 mb-3 p-2 border border-gray-200 rounded-md bg-gray-50/50">
              {['SMS', 'VOICE', 'WHATSAPP'].map((channel) => (
                <span key={channel} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#323dfe]/10 text-[#323dfe] text-[10px] font-medium rounded">
                  {channel}
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              ))}
            </div>

            {/* Autofill options - stacked */}
            <div className="space-y-2">
              <div className="border border-gray-200 rounded-md p-2 bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-xs">Android Autofill</p>
                    <p className="text-[10px] text-gray-400">Auto-detect OTP</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #cd3ef9 0%, #323dfe 100%)" }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-2 bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-xs">iOS Autofill</p>
                    <p className="text-[10px] text-gray-400">Auto-detect OTP</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-sm flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #cd3ef9 0%, #323dfe 100%)",
                      padding: "2px",
                    }}
                  >
                    <div className="w-full h-full rounded-sm bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right card - Code settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900 text-sm">Settings</span>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-gray-900">Code Length</span>
                <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md mt-1 bg-white">
                  <span className="text-sm text-gray-900">6</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-900">Code Expiry</span>
                <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md mt-1 bg-white">
                  <span className="text-sm text-gray-900">3 Min</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
    </div>
  );
}

export default function VerifyCustomization() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-center mb-8 text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.2] tracking-[-0.02em] text-black">
          Customize Plivo's OTP solution with ease
        </h2>

        {/* Two Column Cards Layout */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Card 1: Android Autofill */}
          <div className="overflow-hidden rounded-lg bg-gray-50">
            <AndroidAutofillIllustration />
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
                Seamlessly auto-fill OTPs on Android
              </h3>
              <p className="text-sm text-gray-600">
                When a user receives an OTP on their Android device, Plivo can configure the code to auto-fill into the app, eliminating the need for users to manually type in the OTP.
              </p>
            </div>
          </div>

          {/* Card 2: Configuration */}
          <div className="overflow-hidden rounded-lg bg-gray-50">
            <ConfigurationIllustration />
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-black">
                Configure, control and execute
              </h3>
              <p className="text-sm text-gray-600">
                Customize your OTP settings to send messages in multiple languages, switch templates, adjust configurations, and easily manage channels. No more complex code changes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
