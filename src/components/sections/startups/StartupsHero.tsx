"use client";

import { useEffect } from "react";
import { syncFormAttribution } from "@/lib/form-attribution";

const VALUE_PROPS = [
  {
    title: "Full-Stack Voice AI Solution",
    desc: "All core elements integrated: Enterprise Telephony (India/US numbers), Agentic STT (noise cancellation, natural turn-taking), Bring-Your-Own LLM, and Managed TTS",
  },
  {
    title: "Flexible Deployment",
    desc: "Launch immediately using the turnkey solution or integrate individual modules. Start small and scale/expand your agent stack",
  },
  {
    title: "Enterprise Reliability & Unified Channels",
    desc: "99.95% platform uptime and proven adoption by hundreds of startups. Use one partner for Voice AI, WhatsApp, SMS, and RCS",
  },
  {
    title: "Optimized for Performance & Compliance",
    desc: "Real-Time Observability (simulation/tracking) to improve agent metrics. Stack hosted locally for maximum speed",
  },
];

const LOGOS = [
  { name: "Meta", src: "/images/client-logos/meta.svg" },
  { name: "DocuSign", src: "/images/client-logos/docusign.svg" },
  { name: "Adobe", src: "/images/client-logos/adobe.svg" },
  { name: "Uber", src: "/images/client-logos/uber.svg" },
  { name: "Discord", src: "/images/client-logos/discord.svg" },
  { name: "GoDaddy", src: "/images/client-logos/godaddy.svg" },
  { name: "Trip.com", src: "/images/client-logos/trip.com.svg" },
  { name: "Decker Brands", src: "/images/client-logos/decker-brands.svg" },
];

export default function StartupsHero() {
  // Sync UTM attribution fields from cookies into hidden form fields
  useEffect(() => {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form) return;
    syncFormAttribution(form);
  }, []);

  // Initialize intl-tel-input on #phone (with sentinel to avoid double-init by Netlify script)
  useEffect(() => {
    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval>;

    const init = () => {
      const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
      if (!phoneInput || !(window as any).intlTelInput) return false;

      // Already initialized — skip
      if ((phoneInput as any)._iti) return true;

      const iti = (window as any).intlTelInput(phoneInput, {
        initialCountry: "auto",
        preferredCountries: ["us", "gb", "in", "ca", "au", "de", "fr", "sg", "br", "mx", "ae", "sa"],
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
        autoPlaceholder: "aggressive",
        geoIpLookup: (callback: (countryCode: string) => void) => {
          const syncHiddenGeo = (country: string, ip?: string) => {
            const ipCountryEl = document.getElementById("plivo_ip_country_code") as HTMLInputElement | null;
            const ipAddressEl = document.getElementById("ip_address") as HTMLInputElement | null;
            if (ipCountryEl) ipCountryEl.value = country;
            if (ipAddressEl && ip) ipAddressEl.value = ip;
          };

          const cfCountry = (window as any).__CF_COUNTRY;
          if (cfCountry && cfCountry !== "XX") {
            sessionStorage.setItem("plivo_ip_info", JSON.stringify({ country: cfCountry }));
            syncHiddenGeo(cfCountry);
            return callback(cfCountry);
          }

          const cached = sessionStorage.getItem("plivo_ip_info");
          if (cached) {
            try {
              const { country, ip } = JSON.parse(cached);
              if (country) {
                syncHiddenGeo(country, ip);
                return callback(country);
              }
            } catch { /* fall through */ }
          }
          const geoCountry = sessionStorage.getItem("plivo_geo_country");
          if (geoCountry && /^[A-Z]{2}$/.test(geoCountry)) {
            syncHiddenGeo(geoCountry);
            return callback(geoCountry);
          }

          fetch("/api/geo")
            .then((r) => r.json())
            .then((r) => {
              const country = (r && r.country) || "US";
              const ip = (r && r.ip) || "";
              sessionStorage.setItem("plivo_ip_info", JSON.stringify({ country, ip }));
              syncHiddenGeo(country, ip);
              callback(country);
            })
            .catch(() => callback("US"));
        },
      });

      (phoneInput as any)._iti = iti;

      const syncHiddenFields = () => {
        const countryData = iti.getSelectedCountryData();
        const phoneCodeInput = document.getElementById("phone-code") as HTMLInputElement | null;
        const phoneCountryInput = document.getElementById("phone_country") as HTMLInputElement | null;
        if (phoneCodeInput) phoneCodeInput.value = countryData.dialCode || "";
        if (phoneCountryInput) phoneCountryInput.value = (countryData.iso2 || "").toUpperCase();
      };

      const getMaxDigits = () => {
        const placeholder = phoneInput.getAttribute("placeholder") || "";
        const digitCount = (placeholder.match(/\d/g) || []).length;
        return digitCount || 15;
      };

      let maxDigits = getMaxDigits();

      const enforceDigitLimit = () => {
        const raw = phoneInput.value;
        const digitsOnly = raw.replace(/\D/g, "");
        if (digitsOnly.length > maxDigits) {
          phoneInput.value = digitsOnly.slice(0, maxDigits);
        }
      };

      phoneInput.addEventListener("input", enforceDigitLimit);

      syncHiddenFields();
      phoneInput.addEventListener("countrychange", () => {
        syncHiddenFields();
        setTimeout(() => { maxDigits = getMaxDigits(); }, 0);
      });
      return true;
    };

    if (!init()) {
      pollTimer = setInterval(() => {
        if (cancelled) { clearInterval(pollTimer); return; }
        if (init()) clearInterval(pollTimer);
      }, 50);
    }

    return () => {
      cancelled = true;
      if (pollTimer) clearInterval(pollTimer);
    };
  }, []);

  // Detailed requirement: live character counter
  useEffect(() => {
    const textarea = document.getElementById("detailed_requirement") as HTMLTextAreaElement | null;
    const counter = document.getElementById("req-char-count");
    if (!textarea || !counter) return;

    const MIN_CHARS = 100;
    const update = () => {
      const len = textarea.value.trim().length;
      if (len === 0) {
        counter.textContent = "";
      } else {
        counter.textContent = `${len}/${MIN_CHARS}`;
        counter.style.color = len >= MIN_CHARS ? "#9ca3af" : "#ef4444";
      }
      if (textarea.classList.contains("input-error") && len >= MIN_CHARS) {
        textarea.classList.remove("input-error");
        const fb = textarea.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
        if (fb) fb.textContent = "";
      }
    };

    textarea.addEventListener("input", update);
    return () => textarea.removeEventListener("input", update);
  }, []);

  // Initialize Cal.com embed
  useEffect(() => {
    const Cal = (window as any).Cal;
    if (!Cal?.ns?.routi) return;

    const target = document.getElementById("cal-div-embed");
    if (!target) return;

    Cal.ns.routi("inline", {
      elementOrSelector: "#cal-div-embed",
      calLink: "routi",
      layout: "month_view",
    });
    Cal.ns.routi("ui", {
      styles: { branding: { brandColor: "#323dfe" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <section className="relative z-[1] bg-white pt-2 sm:pt-3 md:pt-4 pb-0">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="order-2 lg:order-1">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
              Why Startups Build on Plivo:
            </h1>

            {/* Value Propositions */}
            <div className="mt-8 space-y-5">
              {VALUE_PROPS.map((prop) => (
                <div key={prop.title} className="flex items-start gap-2.5">
                  <svg
                    className="w-4 h-4 text-[#323dfe] mt-[1px] flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <span className="text-sm font-semibold text-black">{prop.title}</span>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trusted By Logos */}
            <div className="mt-10">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Trusted by leading consumer brands worldwide
              </p>
              <div className="flex flex-wrap items-center gap-1">
                {LOGOS.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="h-10 sm:h-12 w-auto opacity-40 grayscale"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-1 lg:order-2 relative rounded-2xl">
            <div className="relative z-10 flex items-center justify-center py-6 sm:py-10 md:py-14 px-2 sm:px-6 md:px-10">
              <div className="w-full sm:max-w-md rounded-xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
                {/* @ts-expect-error vpf is a custom attribute used by form-submission.js */}
                <div vpf="form-wrapper">
                  {/* Progress indicators (hidden by default, script controls visibility) */}
                  <div className="steps_progress_wrapper">
                    <div className="steps_progress_container">
                      {/* @ts-expect-error vpf is a custom attribute */}
                      <div vpf="progress-line" className="steps_progress_line" style={{ width: "0%" }} />
                    </div>
                    {/* @ts-expect-error vpf is a custom attribute */}
                    <div vpf="step-2-circle" className="step_circle" />
                    {/* @ts-expect-error vpf is a custom attribute */}
                    <div vpf="step-3-circle" className="step_circle" />
                  </div>

                  {/* Step 1: Form fields */}
                  {/* @ts-expect-error vpf is a custom attribute */}
                  <div vpf="1">
                    <div className="space-y-3.5">
                      <h2 className="font-inter text-xl font-semibold text-black mb-3">
                        Secure your partner grant
                      </h2>

                      <form
                        id="contact-form"
                        noValidate
                        // @ts-expect-error custom attributes for form-submission.js
                        hubspot="contactForm"
                        conversion_channel="startups"
                        campaign_source=""
                        pardoturl="https://go.plivo.com/l/873501/2020-07-14/29m2s"
                        zaphook="https://hooks.zapier.com/hooks/catch/23753/o7suwnw/"
                        className="space-y-3.5"
                      >
                        {/* Full name */}
                        <div className="form-field">
                          <label htmlFor="full_name" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Full name <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            maxLength={256}
                            placeholder="Olivia Rodriguez"
                            required
                            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                          />
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Work email */}
                        <div className="form-field">
                          <label htmlFor="company_email" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Work email <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="company_email"
                              name="company_email"
                              type="email"
                              maxLength={256}
                              placeholder="olivia@company.com"
                              required
                              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                            />
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <div vpf="email-loader" style={{ display: "none" }} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <svg vpf="valid-tick" style={{ display: "none" }} className="mail-valid" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <svg vpf="invalid-wrong" style={{ display: "none" }} className="mail-invalid" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          </div>
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Phone number */}
                        <div className="form-field">
                          <label htmlFor="phone" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Phone number <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="text"
                            maxLength={256}
                            placeholder="888888 88888"
                            required
                            autoComplete="off"
                            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                          />
                          <span className="invalid-feedback error" id="lbl-invalid-phone-number" />
                        </div>

                        {/* Partner Fund */}
                        <div className="form-field">
                          <label htmlFor="partner_fund" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Partner fund <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="partner_fund"
                            name="partner_fund"
                            type="text"
                            maxLength={256}
                            placeholder="e.g. Y Combinator, Techstars"
                            required
                            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                          />
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Role */}
                        <div className="form-field">
                          <label htmlFor="role" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Role <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="role"
                            name="role"
                            type="text"
                            maxLength={256}
                            placeholder="e.g. Founder, CTO, Developer"
                            required
                            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                          />
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Detailed requirement */}
                        <div className="form-field">
                          <label htmlFor="detailed_requirement" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Detailed requirement <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            id="detailed_requirement"
                            name="detailed_requirement"
                            maxLength={5000}
                            placeholder="Detail your use case, channel(s), countries you need service for and estimated volume"
                            required
                            className="w-full min-h-[88px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 resize-none hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                          />
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="invalid-feedback error" />
                            <span id="req-char-count" className="text-[11px] text-gray-400 tabular-nums" />
                          </div>
                        </div>

                        {/* Submit button */}
                        <button
                          id="vpf-submit-btn"
                          type="submit"
                          // @ts-expect-error vpf is a custom attribute
                          vpf="submit-btn"
                          className="w-full rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors cta-hover-gradient"
                        >
                          Submit
                        </button>

                        {/* ===== Hidden tracking fields ===== */}
                        <input type="hidden" id="phone_country" name="phone_country" />
                        <input type="hidden" id="phone-code" name="phone_code" />
                        <input type="hidden" id="ip_country" name="ip_country" />
                        <input type="hidden" id="plivo_ip_country_code" name="plivo_ip_country_code" />
                        <input type="hidden" id="ip_address" name="ip_address" />
                        <input type="hidden" id="page_url" name="page_url" />
                        <input type="hidden" id="company-name" name="company" />
                        <input type="hidden" id="company_risk_profile" name="company_risk_profile" defaultValue="blocked" />
                        <input type="hidden" id="enriched_segment" name="enriched_segment" />
                        <input type="hidden" id="isTwoLevel" name="isTwoLevel" />
                        <input type="hidden" id="conversion_channel" name="conversion_channel" defaultValue="startups" />
                        <input type="hidden" id="campaign_source" name="campaign_source" />
                        <input type="hidden" id="plivo_product" name="plivo_product" defaultValue="Voice and SMS API" />
                        <input type="hidden" id="original_referrer" name="original_referrer" />
                        <input type="hidden" id="last_visited" name="last_visited" />
                        <input type="hidden" id="pardot_visitor_id" name="pardot_visitor_id" />
                        <input type="hidden" id="gclid" name="gclid" />
                        <input type="hidden" id="gclid_field" name="gclid" />
                        <input type="hidden" id="asset_downloaded" name="asset_downloaded" />
                        <input type="hidden" id="asset_type" name="asset_type" />
                        <input type="hidden" id="content_type" name="content_type" />

                        {/* Initial UTM fields */}
                        <input type="hidden" id="initial_utm_source" name="initial_utm_source" />
                        <input type="hidden" id="initial_utm_medium" name="initial_utm_medium" />
                        <input type="hidden" id="initial_utm_campaign" name="initial_utm_campaign" />
                        <input type="hidden" id="initial_utm_term" name="initial_utm_term" />
                        <input type="hidden" id="initial_utm_content" name="initial_utm_content" />
                        <input type="hidden" id="initial_utm_creative" name="initial_utm_creative" />
                        <input type="hidden" id="initial_utm_device" name="initial_utm_device" />
                        <input type="hidden" id="initial_utm_matchtype" name="initial_utm_matchtype" />
                        <input type="hidden" id="initial_utm_network" name="initial_utm_network" />
                        <input type="hidden" id="initial_utm_campaignid" name="initial_utm_campaignid" />
                        <input type="hidden" id="initial_utm_keywordid" name="initial_utm_keywordid" />
                        <input type="hidden" id="initial_utm_adposition" name="initial_utm_adposition" />
                        <input type="hidden" id="initial_utm_adgroupid" name="initial_utm_adgroupid" />
                        <input type="hidden" id="initial_utm_referrer" name="initial_utm_referrer" />
                        <input type="hidden" id="initial_utm_landing_page" name="initial_utm_landing_page" />
                        <input type="hidden" id="initial_utm_campaign_type" name="initial_utm_campaign_type" />
                        <input type="hidden" id="initial_utm_engagement_type" name="initial_utm_engagement_type" />
                        <input type="hidden" id="initial_use_case" name="initial_use_case" />

                        {/* Latest UTM fields */}
                        <input type="hidden" id="latest_utm_source" name="latest_utm_source" />
                        <input type="hidden" id="latest_utm_medium" name="latest_utm_medium" />
                        <input type="hidden" id="latest_utm_campaign" name="latest_utm_campaign" />
                        <input type="hidden" id="latest_utm_term" name="latest_utm_term" />
                        <input type="hidden" id="latest_utm_content" name="latest_utm_content" />
                        <input type="hidden" id="latest_utm_creative" name="latest_utm_creative" />
                        <input type="hidden" id="latest_utm_device" name="latest_utm_device" />
                        <input type="hidden" id="latest_utm_matchtype" name="latest_utm_matchtype" />
                        <input type="hidden" id="latest_utm_network" name="latest_utm_network" />
                        <input type="hidden" id="latest_utm_campaignid" name="latest_utm_campaignid" />
                        <input type="hidden" id="latest_utm_keywordid" name="latest_utm_keywordid" />
                        <input type="hidden" id="latest_utm_adposition" name="latest_utm_adposition" />
                        <input type="hidden" id="latest_utm_adgroupid" name="latest_utm_adgroupid" />
                        <input type="hidden" id="latest_utm_referrer" name="latest_utm_referrer" />
                        <input type="hidden" id="latest_utm_landing_page" name="latest_utm_landing_page" />
                        <input type="hidden" id="latest_utm_campaign_type" name="latest_utm_campaign_type" />
                        <input type="hidden" id="latest_utm_engagement_type" name="latest_utm_engagement_type" />

                        {/* Current UTM fields */}
                        <input type="hidden" id="utm_source" name="utm_source" />
                        <input type="hidden" id="utm_medium" name="utm_medium" />
                        <input type="hidden" id="utm_campaign" name="utm_campaign" />
                        <input type="hidden" id="utm_term" name="utm_term" />
                        <input type="hidden" id="utm_content" name="utm_content" />
                        <input type="hidden" id="utm_creative" name="utm_creative" />
                        <input type="hidden" id="utm_device" name="utm_device" />
                        <input type="hidden" id="utm_matchtype" name="utm_matchtype" />
                        <input type="hidden" id="utm_network" name="utm_network" />
                        <input type="hidden" id="utm_campaignid" name="utm_campaignid" />
                        <input type="hidden" id="utm_keywordid" name="utm_keywordid" />
                        <input type="hidden" id="utm_adposition" name="utm_adposition" />
                        <input type="hidden" id="utm_adgroupid" name="utm_adgroupid" />
                        <input type="hidden" id="utm_campaign_type" name="utm_campaign_type" />
                        <input type="hidden" id="utm_engagement_type" name="utm_engagement_type" />
                        <input type="hidden" id="utm_referrer" name="utm_referrer" />
                        <input type="hidden" id="landing_page" name="landing_page" />

                        {/* Secondary UTM fields */}
                        <input type="hidden" id="utm_source_2" name="utm_source_2" />
                        <input type="hidden" id="utm_medium_2" name="utm_medium_2" />
                        <input type="hidden" id="utm_campaign_2" name="utm_campaign_2" />
                        <input type="hidden" id="utm_term_2" name="utm_term_2" />
                        <input type="hidden" id="utm_content_2" name="utm_content_2" />
                        <input type="hidden" id="utm_creative_2" name="utm_creative_2" />
                        <input type="hidden" id="utm_device_2" name="utm_device_2" />
                        <input type="hidden" id="utm_matchtype_2" name="utm_matchtype_2" />
                        <input type="hidden" id="utm_network_2" name="utm_network_2" />
                        <input type="hidden" id="utm_campaignid_2" name="utm_campaignid_2" />
                        <input type="hidden" id="utm_keywordid_2" name="utm_keywordid_2" />
                        <input type="hidden" id="utm_adposition_2" name="utm_adposition_2" />
                        <input type="hidden" id="utm_adgroupid_2" name="utm_adgroupid_2" />
                        <input type="hidden" id="utm_campaign_type_2" name="utm_campaign_type_2" />
                        <input type="hidden" id="utm_engagement_type_2" name="utm_engagement_type_2" />
                        <input type="hidden" id="utm_referrer_2" name="utm_referrer_2" />
                        <input type="hidden" id="landing_page_2" name="landing_page_2" />
                      </form>

                      <p className="text-[11px] text-gray-400 text-center leading-relaxed mt-3">
                        By creating an account with Plivo, you agree to Plivo's{" "}
                        <a href="/legal/tos/" className="underline hover:text-gray-600">terms of service</a>{" "}
                        and{" "}
                        <a href="/legal/privacy/" className="underline hover:text-gray-600">privacy policy</a>
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Chat agent (hidden until form-submission.js shows it) */}
                  {/* @ts-expect-error vpf is a custom attribute */}
                  <div vpf="2" style={{ display: "none" }} className="p-5">
                    <div id="chat-widget" className="chat-agent-cx" />
                  </div>

                  {/* Cal.com embed container */}
                  <div className="cal-embed-wrapper" style={{ display: "none" }}>
                    <div id="cal-div-embed" />
                    <button type="button" className="cal-cross" style={{ display: "none" }}>&times;</button>
                  </div>

                  {/* Step 4: Thank you */}
                  {/* @ts-expect-error vpf is a custom attribute */}
                  <div vpf="4" style={{ display: "none" }} className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {/* @ts-expect-error vpf is a custom attribute */}
                    <h3 vpf="4-title" className="text-xl font-normal text-black">
                      You're all set!
                    </h3>
                    {/* @ts-expect-error vpf is a custom attribute */}
                    <p vpf="4-desc" className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                      Thank you for your submission. We will reach out to you soon.
                    </p>
                    <a href="/" className="inline-block mt-6 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                      &larr; Back to homepage
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
