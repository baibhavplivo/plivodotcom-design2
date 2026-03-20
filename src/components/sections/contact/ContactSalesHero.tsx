"use client";

import { useEffect, useRef } from "react";
import { customerLogos } from "@/data/navigation";

const VALUE_PROPS = [
  "Whiteglove onboarding & dedicated account manager",
  "Tiered discounts for committed monthly volumes",
  "Custom AI agents designed for your use case",
];

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.it", "hotmail.es",
  "outlook.com", "outlook.co.uk", "outlook.fr", "outlook.de",
  "live.com", "live.co.uk", "live.fr", "msn.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.fr", "yahoo.de",
  "yahoo.it", "yahoo.es", "yahoo.ca", "yahoo.com.au", "yahoo.com.br",
  "ymail.com", "rocketmail.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com", "aim.com",
  "protonmail.com", "proton.me", "pm.me",
  "mail.com", "gmx.com", "gmx.de", "gmx.net",
  "yandex.com", "yandex.ru",
  "inbox.com", "fastmail.com",
  "tutanota.com", "tuta.io",
  "rediffmail.com",
]);

function isPersonalEmail(email: string): boolean {
  const atIndex = email.lastIndexOf("@");
  if (atIndex < 1) return false;
  const domain = email.slice(atIndex + 1).toLowerCase().trim();
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}

function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

const ENRICH_API_URL =
  "https://plivo-static-forms.netlify.app/.netlify/functions/enrich";

// Cache enrichment results so we don't re-call for the same email
const enrichCache = new Map<string, boolean>();

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

  // Submit handler: prevents native POST (which causes 405 on static hosting)
  // and submits to both the Netlify function (primary) and HubSpot (fallback).
  useEffect(() => {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form) return;

    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : "";
    };

    const handler = (e: Event) => {
      e.preventDefault();

      // --- Client-side validation ---
      const phoneInput = form.querySelector("#phone") as HTMLInputElement | null;
      const phoneIti = phoneInput ? (phoneInput as any)._iti : null;
      const phoneFeedback = document.getElementById("lbl-invalid-phone-number");
      const emailInput = form.querySelector("#company_email") as HTMLInputElement | null;
      const emailFeedback = emailInput?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
      const fullNameInput = form.querySelector("#full_name") as HTMLInputElement | null;
      const fullNameFeedback = fullNameInput?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
      const reqInput = form.querySelector("#detailed_requirement") as HTMLTextAreaElement | null;
      const reqFeedback = reqInput?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;

      // Clear previous errors
      if (fullNameInput) fullNameInput.classList.remove("input-error");
      if (fullNameFeedback) fullNameFeedback.textContent = "";
      if (emailInput) emailInput.classList.remove("input-error");
      if (emailFeedback) emailFeedback.textContent = "";
      if (phoneInput) phoneInput.classList.remove("input-error");
      if (phoneFeedback) phoneFeedback.textContent = "";
      if (reqInput) reqInput.classList.remove("input-error");
      if (reqFeedback) reqFeedback.textContent = "";

      // Validate full name
      if (!fullNameInput?.value.trim()) {
        fullNameInput?.classList.add("input-error");
        if (fullNameFeedback) fullNameFeedback.textContent = "Full name is required.";
        fullNameInput?.focus();
        return;
      }

      // Validate email
      const emailValue = emailInput?.value.trim() || "";
      if (!emailValue) {
        emailInput?.classList.add("input-error");
        if (emailFeedback) emailFeedback.textContent = "Work email is required.";
        emailInput?.focus();
        return;
      }
      if (!isValidEmailFormat(emailValue)) {
        emailInput?.classList.add("input-error");
        if (emailFeedback) emailFeedback.textContent = "Please enter a valid email address.";
        emailInput?.focus();
        return;
      }
      if (isPersonalEmail(emailValue)) {
        emailInput?.classList.add("input-error");
        if (emailFeedback) emailFeedback.textContent = "Please use your work email address.";
        const invalidIcon = emailInput?.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
        if (invalidIcon) invalidIcon.style.display = "block";
        emailInput?.focus();
        return;
      }

      // Validate phone
      if (!phoneInput?.value.trim()) {
        phoneInput?.classList.add("input-error");
        if (phoneFeedback) phoneFeedback.textContent = "Phone number is required.";
        phoneInput?.focus();
        return;
      }
      if (phoneIti && typeof phoneIti.isValidNumber === "function" && !phoneIti.isValidNumber()) {
        phoneInput?.classList.add("input-error");
        if (phoneFeedback) {
          const countryData = phoneIti.getSelectedCountryData();
          const countryName = countryData?.name || "the selected country";
          phoneFeedback.textContent = `Please enter a valid phone number for ${countryName}.`;
        }
        phoneInput?.focus();
        return;
      }

      // Validate detailed requirement (minimum 100 characters)
      const reqValue = reqInput?.value.trim() || "";
      if (!reqValue) {
        reqInput?.classList.add("input-error");
        if (reqFeedback) reqFeedback.textContent = "Please describe your requirement.";
        reqInput?.focus();
        return;
      }
      if (reqValue.length < 100) {
        reqInput?.classList.add("input-error");
        if (reqFeedback) reqFeedback.textContent = `Please provide at least 100 characters (${reqValue.length}/100).`;
        reqInput?.focus();
        return;
      }

      // --- Collect form data ---
      const btn = form.querySelector('[type="submit"]') as HTMLButtonElement | null;
      if (btn) { btn.disabled = true; btn.textContent = "Submitting..."; }

      const fullName = fullNameInput?.value || "";
      const parts = fullName.trim().split(/\s+/);
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";
      const email = emailValue;
      const phone = phoneInput?.value || "";
      const phoneCode = (form.querySelector("#phone-code") as HTMLInputElement)?.value || "";
      const phoneCountry = (form.querySelector("#phone_country") as HTMLInputElement)?.value || "";
      const description = (form.querySelector("#detailed_requirement") as HTMLTextAreaElement)?.value || "";
      const formattedPhone = phoneIti && typeof phoneIti.getNumber === "function"
        ? phoneIti.getNumber()
        : (phoneCode ? `+${phoneCode} ${phone}` : phone);
      const pageUrl = window.location.origin + window.location.pathname;

      // Build payload for the Netlify function (same format as form-submission.js)
      const formData = new URLSearchParams();
      formData.set("first_name", firstName);
      formData.set("last_name", lastName);
      formData.set("full_name", fullName);
      formData.set("company_email", email);
      formData.set("phone", formattedPhone);
      formData.set("phone_code", phoneCode);
      formData.set("phone_country", phoneCountry);
      formData.set("description", description);
      formData.set("page_url", pageUrl);
      formData.set("conversion_channel", "contact-sales");
      formData.set("landing_page", "https://plivo.com");

      const body = new URLSearchParams();
      body.set("formData", formData.toString());
      body.set("hubspotutk", getCookie("hubspotutk"));
      body.set("hubSpot", "contactForm");
      body.set("ipAddress", "");

      // Primary: submit to Netlify function (same path as production form-submission.js)
      fetch("https://plivo-static-forms.netlify.app/.netlify/functions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })
        .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
          if (ok && data.status === "Submitted") {
            // Set emailCookie from response for cross-page personalization
            if (data.emailCookie) {
              try {
                document.cookie = `plivoEmail=${data.emailCookie};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
              } catch { /* cookie set failed */ }
            }

            // Handle leadStatus — redirect small leads to signup
            if (data.leadStatus === "redirectSignup") {
              window.location.href = "https://console.plivo.com/accounts/register/";
              return;
            }

            // Success — show thank-you
            const step1 = form.closest('[vpf="1"]');
            const step4 = document.querySelector('[vpf="4"]');
            if (step1) (step1 as HTMLElement).style.display = "none";
            if (step4) (step4 as HTMLElement).style.display = "block";
          } else if (data.status === "Personal Email" || data.status === "Invalid Email") {
            // Personal/invalid email rejected — show inline error
            const emailInput = form.querySelector("#company_email") as HTMLInputElement | null;
            if (emailInput) {
              emailInput.classList.add("input-error");
              let fb = emailInput.parentElement?.querySelector(".invalid-feedback") as HTMLElement | null;
              if (!fb) {
                fb = document.createElement("div");
                fb.className = "invalid-feedback";
                emailInput.parentElement?.appendChild(fb);
              }
              fb.textContent = "Please use your work email address.";
            }
            if (btn) { btn.disabled = false; btn.textContent = "Submit"; }
          } else {
            // Other error — fallback to direct HubSpot
            return submitToHubSpot(firstName, lastName, email, formattedPhone, description, btn);
          }
        })
        .catch(() => {
          // Network error — fallback to direct HubSpot
          submitToHubSpot(firstName, lastName, email, formattedPhone, description, btn);
        });
    };

    const submitToHubSpot = (
      firstName: string, lastName: string, email: string,
      phone: string, message: string,
      btn: HTMLButtonElement | null
    ) => {
      const hutk = getCookie("hubspotutk");
      const fields = [
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "email", value: email },
        { name: "phone", value: phone },
        { name: "message", value: message },
      ];
      return fetch("https://api.hsforms.com/submissions/v3/integration/submit/20451141/1bd8ce72-8c0d-4dd0-89c2-f2d2bd7dfcd5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            hutk: hutk || undefined,
            pageUri: window.location.href,
            pageName: "Contact Sales",
          },
        }),
      }).then((res) => {
        if (res.ok) {
          const step1 = document.getElementById("contact-form")?.closest('[vpf="1"]');
          const step4 = document.querySelector('[vpf="4"]');
          if (step1) (step1 as HTMLElement).style.display = "none";
          if (step4) (step4 as HTMLElement).style.display = "block";
        } else {
          alert("Something went wrong. Please try again or email support@plivo.com.");
          if (btn) { btn.disabled = false; btn.textContent = "Submit"; }
        }
      }).catch(() => {
        alert("Network error. Please try again or email support@plivo.com.");
        if (btn) { btn.disabled = false; btn.textContent = "Submit"; }
      });
    };

    form.addEventListener("submit", handler, true);
    return () => form.removeEventListener("submit", handler, true);
  }, []);

  // Initialize intl-tel-input on #phone immediately (don't wait for form-submission.js)
  useEffect(() => {
    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval>;

    const init = () => {
      const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
      if (!phoneInput || !(window as any).intlTelInput) return false;

      // Already initialized — skip
      if ((phoneInput as any)._iti) return true;

      const iti = (window as any).intlTelInput(phoneInput, {
        preferredCountries: ["us", "gb", "in", "ca", "au", "de", "fr", "sg", "br", "mx", "ae", "sa"],
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
        autoPlaceholder: "aggressive",
      });

      // Store instance as sentinel for form-submission.js
      (phoneInput as any)._iti = iti;

      const syncHiddenFields = () => {
        const countryData = iti.getSelectedCountryData();
        const phoneCodeInput = document.getElementById("phone-code") as HTMLInputElement | null;
        const phoneCountryInput = document.getElementById("phone_country") as HTMLInputElement | null;
        if (phoneCodeInput) phoneCodeInput.value = countryData.dialCode || "";
        if (phoneCountryInput) phoneCountryInput.value = (countryData.iso2 || "").toUpperCase();
      };

      // Get max digits allowed from the country's example number placeholder
      const getMaxDigits = () => {
        const placeholder = phoneInput.getAttribute("placeholder") || "";
        const digitCount = (placeholder.match(/\d/g) || []).length;
        return digitCount || 15; // ITU E.164 max as fallback
      };

      let maxDigits = getMaxDigits();

      // Strip non-digits and enforce max digit count on input
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
        // Wait a tick for intl-tel-input to update the placeholder
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

  // Email: blur validation — client-side checks + server-side enrichment API
  useEffect(() => {
    const emailInput = document.getElementById("company_email") as HTMLInputElement | null;
    if (!emailInput) return;

    let enrichAbort: AbortController | null = null;

    const getEmailFeedback = () =>
      emailInput.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;

    const getLoader = () =>
      emailInput.parentElement?.querySelector('[vpf="email-loader"]') as HTMLElement | null;

    const clearEmailError = () => {
      emailInput.classList.remove("input-error");
      const fb = getEmailFeedback();
      if (fb) fb.textContent = "";
      const invalidIcon = emailInput.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
      if (invalidIcon) invalidIcon.style.display = "none";
      const validIcon = emailInput.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      if (validIcon) validIcon.style.display = "none";
      const loader = getLoader();
      if (loader) loader.style.display = "none";
    };

    const showEmailError = (message: string) => {
      emailInput.classList.add("input-error");
      const fb = getEmailFeedback();
      if (fb) fb.textContent = message;
      const invalidIcon = emailInput.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
      if (invalidIcon) invalidIcon.style.display = "block";
      const validIcon = emailInput.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      if (validIcon) validIcon.style.display = "none";
      const loader = getLoader();
      if (loader) loader.style.display = "none";
    };

    const showEmailValid = () => {
      emailInput.classList.remove("input-error");
      const fb = getEmailFeedback();
      if (fb) fb.textContent = "";
      const invalidIcon = emailInput.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
      if (invalidIcon) invalidIcon.style.display = "none";
      const validIcon = emailInput.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      if (validIcon) validIcon.style.display = "block";
      const loader = getLoader();
      if (loader) loader.style.display = "none";
    };

    const handleBlur = () => {
      const value = emailInput.value.trim();
      if (!value) { clearEmailError(); return; }
      if (!isValidEmailFormat(value)) { showEmailError("Please enter a valid email address."); return; }
      if (isPersonalEmail(value)) { showEmailError("Please use your work email address."); return; }

      // Check cache first
      const cached = enrichCache.get(value.toLowerCase());
      if (cached === true) { showEmailValid(); return; }
      if (cached === false) { showEmailError("Please use your work email address."); return; }

      // Call enrichment API for server-side validation
      if (enrichAbort) enrichAbort.abort();
      enrichAbort = new AbortController();

      // Show loader
      const loader = getLoader();
      if (loader) loader.style.display = "block";
      const validIcon = emailInput.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      if (validIcon) validIcon.style.display = "none";
      const invalidIcon = emailInput.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
      if (invalidIcon) invalidIcon.style.display = "none";

      fetch(`${ENRICH_API_URL}?email=${encodeURIComponent(value)}`, {
        signal: enrichAbort.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          // Use isAuthentic if present, otherwise compute from person.domain_type
          const domainType = data.person?.domain_type || data.email?.domain_type || "";
          const invalidTypes = ["personal", "disposable", "malicious", "blacklisted"];
          const isValid = data.isAuthentic !== undefined
            ? data.isAuthentic !== false
            : !invalidTypes.includes(domainType);
          enrichCache.set(value.toLowerCase(), isValid);
          if (isValid) {
            showEmailValid();
          } else {
            showEmailError(
              domainType === "personal"
                ? "Please use your work email address."
                : "This email address cannot be used. Please try another."
            );
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          // On API failure, accept the email (backend will validate on submit)
          clearEmailError();
        });
    };

    const handleInput = () => {
      if (enrichAbort) { enrichAbort.abort(); enrichAbort = null; }
      if (emailInput.classList.contains("input-error")) clearEmailError();
      // Also hide valid icon while typing
      const validIcon = emailInput.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      if (validIcon) validIcon.style.display = "none";
    };

    emailInput.addEventListener("blur", handleBlur);
    emailInput.addEventListener("input", handleInput);
    return () => {
      emailInput.removeEventListener("blur", handleBlur);
      emailInput.removeEventListener("input", handleInput);
      if (enrichAbort) enrichAbort.abort();
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
      // Clear error while typing
      if (textarea.classList.contains("input-error") && len >= MIN_CHARS) {
        textarea.classList.remove("input-error");
        const fb = textarea.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
        if (fb) fb.textContent = "";
      }
    };

    textarea.addEventListener("input", update);
    return () => textarea.removeEventListener("input", update);
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
                      <h2 className="font-inter text-xl font-semibold text-black mb-3">
                        Let's create your custom plan together
                      </h2>

                      <form
                        id="contact-form"
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
                            <svg vpf="valid-tick" style={{ display: "none" }} className="mail-valid" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            {/* @ts-expect-error vpf is a custom attribute */}
                            <svg vpf="invalid-wrong" style={{ display: "none" }} className="mail-invalid" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
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
