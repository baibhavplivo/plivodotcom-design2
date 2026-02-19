"use client";

import { useEffect, useRef } from "react";
import { customerLogos } from "@/data/navigation";

const VALUE_PROPS = [
  "Whiteglove onboarding & dedicated account manager",
  "Tiered discounts for committed monthly volumes",
  "Custom AI agents designed for your use case",
];

const COMPLIANCE_BADGES = [
  { src: "/images/compliance/HIPAA black.svg", alt: "HIPAA", label: "HIPAA" },
  { src: "/images/compliance/GDPR black.svg", alt: "GDPR", label: "GDPR" },
  { src: "/images/compliance/AICPA black.svg", alt: "AICPA SOC 2", label: "AICPA SOC 2" },
  { src: "/images/compliance/PCI black.svg", alt: "PCI DSS", label: "PCI DSS" },
  { src: "/images/compliance/Star Black.svg", alt: "STAR", label: "STAR" },
];

export default function ContactSalesHero() {
  // Flickering grid canvas
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = gridContainerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SQUARE_SIZE = 4;
    const GRID_GAP = 6;
    const MAX_OPACITY = 0.3;
    const FLICKER_CHANCE = 0.15;
    const COLOR = "139, 92, 246"; // #8B5CF6

    let cols = 0;
    let rows = 0;
    let squares = new Float32Array(0);
    let animationFrameId: number;

    const setupCanvas = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      cols = Math.floor(w / (SQUARE_SIZE + GRID_GAP));
      rows = Math.floor(h / (SQUARE_SIZE + GRID_GAP));
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * MAX_OPACITY;
      }
    };

    setupCanvas();

    let lastTime = 0;
    const animate = (time: number) => {
      if (cols === 0 || rows === 0) {
        setupCanvas();
        lastTime = time;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const dpr = window.devicePixelRatio || 1;

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < FLICKER_CHANCE * delta) {
          squares[i] = Math.random() * MAX_OPACITY;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `rgba(${COLOR}, ${opacity})`;
          ctx.fillRect(
            i * (SQUARE_SIZE + GRID_GAP) * dpr,
            j * (SQUARE_SIZE + GRID_GAP) * dpr,
            SQUARE_SIZE * dpr,
            SQUARE_SIZE * dpr
          );
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="bg-white pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
              Talk to our sales team
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-lg">
              Connect with our experts to design the right solution for your
              business - from pricing and compliance to AI agent setup tailored
              to your use case.
            </p>

            {/* Value Props */}
            <div className="mt-8 space-y-3">
              {VALUE_PROPS.map((prop) => (
                <div key={prop} className="flex items-start gap-2.5">
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
                  <span className="text-sm text-black">{prop}</span>
                </div>
              ))}
            </div>

            {/* Compliance Badges */}
            <div className="mt-10">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Enterprise-grade reliability, guaranteed
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
                {COMPLIANCE_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center gap-1"
                  >
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      className="h-7 sm:h-9 w-auto opacity-60"
                    />
                    <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted By Logos */}
            <div className="mt-10">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Trusted by leading consumer brands worldwide
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6">
                {customerLogos.slice(0, 6).map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="h-4 sm:h-[18px] w-auto opacity-40 grayscale"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form with flickering grid background */}
          <div ref={gridContainerRef} className="order-1 lg:order-2 relative rounded-2xl">
            {/* Background layer - overflow-hidden only here so dropdown can escape */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <canvas ref={canvasRef} className="absolute top-0 left-0 z-0 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 z-[1] w-6 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 z-[1] w-6 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 z-[1] h-6 bg-gradient-to-b from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 z-[1] h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Form Card */}
            <div className="relative z-10 flex items-center justify-center py-6 sm:py-10 md:py-14 px-2 sm:px-6 md:px-10">
              <div className="w-full sm:max-w-md rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4 sm:p-5 md:p-6">
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
                      <h2 className="text-xl font-semibold text-black mb-3">
                        Let's create your custom plan together
                      </h2>

                      <form
                        id="contact-form"
                        method="post"
                        noValidate
                        // @ts-expect-error custom attributes for form-submission.js
                        hubspot="contactForm"
                        conversion_channel="contact-sales"
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
                              placeholder="olivia@plivo.com"
                              required
                              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                            />
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <div vpf="email-loader" style={{ display: "none" }} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <img vpf="valid-tick" style={{ display: "none" }} alt="valid" src="/images/icons/tick-green.webp" className="mail-valid" />
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <img vpf="invalid-wrong" style={{ display: "none" }} alt="invalid" src="/images/icons/red-cross.webp" className="mail-invalid" />
                          </div>
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Phone number (intl-tel-input attaches here) */}
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

                        {/* Use case */}
                        <div className="form-field">
                          <label htmlFor="latest_use_case" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Use case <span className="text-red-400">*</span>
                          </label>
                          <select
                            id="latest_use_case"
                            name="latest_use_case"
                            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 cursor-pointer focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 hover:border-gray-400 transition-all"
                          >
                            <option value="" disabled hidden>Select use case</option>
                            <option value="AI Agents">AI Agents</option>
                            <option value="Reseller, Solutions Provider">Reseller, Solutions Provider</option>
                            <option value="Alerts and Notifications">Alerts and Notifications</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="2FA, OTP Verifications">2FA, OTP Verifications</option>
                            <option value="Other">Other</option>
                          </select>
                          <span className="invalid-feedback error" id="lbl-invalid-usecase" />
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
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Submit button */}
                        <button
                          id="vpf-submit-btn"
                          type="submit"
                          // @ts-expect-error vpf is a custom attribute
                          vpf="submit-btn"
                          className="w-full rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
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
                        <input type="hidden" id="conversion_channel" name="conversion_channel" defaultValue="contact-sales" />
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
                        <a
                          href="/legal/tos/"
                          className="underline hover:text-gray-600"
                        >
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a
                          href="/legal/privacy/"
                          className="underline hover:text-gray-600"
                        >
                          privacy policy
                        </a>
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

                  {/* Step 4: Thank you (hidden until form-submission.js shows it) */}
                  {/* @ts-expect-error vpf is a custom attribute */}
                  <div vpf="4" style={{ display: "none" }} className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-7 h-7 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {/* @ts-expect-error vpf is a custom attribute */}
                    <h3 vpf="4-title" className="text-xl font-normal text-black">
                      You're all set!
                    </h3>
                    {/* @ts-expect-error vpf is a custom attribute */}
                    <p vpf="4-desc" className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                      Thank you. We've received your request. A member of our sales team will get back to you within 1 business day.
                    </p>
                    <a
                      href="/"
                      className="inline-block mt-6 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
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
