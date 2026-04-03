"use client";

import { useEffect, useRef, useState } from "react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { getGeoCategory, SIGNUP_URL } from "@/data/geo-categories";
import { getCookie, syncFormAttribution } from "@/lib/form-attribution";
import { splitFullName, validateBusinessEmail } from "@/lib/form-shared";

// International logos (default)
const intlLogosRow1 = [
  { name: "Meta", src: "/images/client-logos/meta.svg" },
  { name: "DocuSign", src: "/images/client-logos/docusign.svg" },
  { name: "Adobe", src: "/images/client-logos/adobe.svg" },
  { name: "Uber", src: "/images/client-logos/uber.svg" },
  { name: "Atlassian", src: "/images/client-logos/atlassian.svg" },
  { name: "Yahoo", src: "/images/client-logos/yahoo.svg" },
];
const intlLogosRow2 = [
  { name: "Discord", src: "/images/client-logos/discord.svg" },
  { name: "GoDaddy", src: "/images/client-logos/godaddy.svg" },
  { name: "Trip.com", src: "/images/client-logos/trip.com.svg" },
  { name: "Decker Brands", src: "/images/client-logos/decker-brands.svg" },
  { name: "Laz Parking", src: "/images/client-logos/laz-parking.svg" },
];

// India logos
const indiaLogosRow1 = [
  { name: "Meta", src: "/images/client-logos/meta.svg" },
  { name: "DocuSign", src: "/images/client-logos/docusign.svg" },
  { name: "Zomato", src: "/images/client-logos/zomato.svg" },
  { name: "Uber", src: "/images/client-logos/uber.svg" },
  { name: "Tata 1mg", src: "/images/client-logos/tata-1mg.svg" },
  { name: "Atomberg", src: "/images/client-logos/atomberg.svg" },
];
const indiaLogosRow2 = [
  { name: "Discord", src: "/images/client-logos/discord.svg" },
  { name: "GoDaddy", src: "/images/client-logos/godaddy.svg" },
  { name: "Amul", src: "/images/client-logos/amul.svg" },
  { name: "Healthify", src: "/images/client-logos/healthify.svg" },
  { name: "Great Learning", src: "/images/client-logos/great-learning.svg" },
];

const VALUE_PROPS = [
  "$10 in free credits to test voice, SMS and WhatsApp",
  "Full API access to all communication channels",
  "Dedicated support during your trial period",
];

const ENRICH_API_URL = "/api/forms/validate-email";

const enrichCache = new Map<string, { isValid: boolean; message: string }>();

const COMPLIANCE_BADGES = [
  { src: "/images/compliance/HIPAA black.svg", alt: "HIPAA", label: "HIPAA" },
  { src: "/images/compliance/GDPR black.svg", alt: "GDPR", label: "GDPR" },
  { src: "/images/compliance/AICPA black.svg", alt: "AICPA SOC 2", label: "AICPA SOC 2" },
  { src: "/images/compliance/PCI black.svg", alt: "PCI DSS", label: "PCI DSS" },
  { src: "/images/compliance/Star Black.svg", alt: "STAR", label: "STAR" },
];

export default function RequestTrialHero() {
  // Geo-gating: detect category and gate access
  const { rawCountry } = useGeoCountry();
  const category = getGeoCategory(rawCountry);
  const isIndia = rawCountry === "IN";

  const [geoReady, setGeoReady] = useState(() => {
    if (typeof window === "undefined") return false;
    try { return !!sessionStorage.getItem("plivo_geo_country"); } catch { return false; }
  });

  useEffect(() => {
    if (geoReady) return;
    const poll = setInterval(() => {
      try {
        if (sessionStorage.getItem("plivo_geo_country")) {
          setGeoReady(true);
          clearInterval(poll);
        }
      } catch { /* ignore */ }
    }, 200);
    const timeout = setTimeout(() => { setGeoReady(true); clearInterval(poll); }, 4000);
    return () => { clearInterval(poll); clearTimeout(timeout); };
  }, [geoReady]);

  // Redirect Cat A users to signup
  useEffect(() => {
    if (geoReady && category === "A") {
      window.location.href = SIGNUP_URL;
    }
  }, [geoReady, category]);

  const logosRow1 = isIndia ? indiaLogosRow1 : intlLogosRow1;
  const logosRow2 = isIndia ? indiaLogosRow2 : intlLogosRow2;

  }, []);

  // Submit handler: validates client-side, then posts to our Worker for
  // server-side validation and HubSpot submission.
  useEffect(() => {
    if (!geoReady || category === "A" || category === "unsupported") return;

    const form = document.getElementById("request-trial-form") as HTMLFormElement | null;
    if (!form) return;

    const showThankYou = () => {
      const step1 = form.closest('[vpf="1"]');
      const step4 = document.querySelector('[vpf="4"]');
      if (step1) (step1 as HTMLElement).style.display = "none";
      if (step4) (step4 as HTMLElement).style.display = "block";
    };

    const resetSubmitButton = (btn: HTMLButtonElement | null) => {
      if (!btn) return;
      btn.disabled = false;
      btn.textContent = "Request Trial";
    };

    const showFormErrorBanner = (message: string, btn: HTMLButtonElement | null) => {
      const existing = document.getElementById("form-error-banner");
      if (existing) existing.remove();

      const banner = document.createElement("div");
      banner.id = "form-error-banner";
      banner.className = "form-error-banner";
      banner.textContent = message;
      form.insertAdjacentElement("beforebegin", banner);
      setTimeout(() => banner.remove(), 8000);
      resetSubmitButton(btn);
    };

    const handler = async (e: Event) => {
      e.preventDefault();

      const phoneInput = form.querySelector("#phone") as HTMLInputElement | null;
      const phoneIti = phoneInput ? (phoneInput as any)._iti : null;
      const phoneFeedback = document.getElementById("lbl-invalid-phone-number");
      const emailInput = form.querySelector("#company_email") as HTMLInputElement | null;
      const emailFeedback = emailInput?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
      const fullNameInput = form.querySelector("#full_name") as HTMLInputElement | null;
      const fullNameFeedback = fullNameInput?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
      const reqInput = form.querySelector("#detailed_requirement") as HTMLTextAreaElement | null;
      const reqFeedback = reqInput?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
      const termsCheckbox = form.querySelector("#terms_accepted") as HTMLInputElement | null;
      const termsFeedback = termsCheckbox?.closest(".form-field")?.querySelector(".invalid-feedback") as HTMLElement | null;
      const invalidIcon = emailInput?.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
      const validIcon = emailInput?.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      const existingBanner = document.getElementById("form-error-banner");

      if (existingBanner) existingBanner.remove();
      [fullNameInput, emailInput, phoneInput, reqInput].forEach(el => el?.classList.remove("input-error"));
      [fullNameFeedback, emailFeedback, phoneFeedback, reqFeedback, termsFeedback].forEach(el => { if (el) el.textContent = ""; });
      if (invalidIcon) invalidIcon.style.display = "none";
      if (validIcon) validIcon.style.display = "none";

      if (!fullNameInput?.value.trim()) {
        fullNameInput?.classList.add("input-error");
        if (fullNameFeedback) fullNameFeedback.textContent = "Full name is required.";
        fullNameInput?.focus();
        return;
      }

      const emailValue = emailInput?.value.trim() || "";
      if (!emailValue) {
        emailInput?.classList.add("input-error");
        if (emailFeedback) emailFeedback.textContent = "Work email is required.";
        emailInput?.focus();
        return;
      }
      const emailValidation = validateBusinessEmail(emailValue);
      if (!emailValidation.isValid) {
        emailInput?.classList.add("input-error");
        if (emailFeedback) emailFeedback.textContent = emailValidation.message;
        if (invalidIcon) invalidIcon.style.display = "block";
        emailInput?.focus();
        return;
      }

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

      if (!termsCheckbox?.checked) {
        if (termsFeedback) termsFeedback.textContent = "You must agree to the terms to continue.";
        return;
      }

      const btn = form.querySelector('[type="submit"]') as HTMLButtonElement | null;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Submitting...";
      }

      try {
        syncFormAttribution(form);

        const fullName = fullNameInput?.value || "";
        const { firstName, lastName } = splitFullName(fullName);
        const phone = phoneInput?.value || "";
        const phoneCode = (form.querySelector("#phone-code") as HTMLInputElement)?.value || "";
        const formattedPhone =
          phoneIti && typeof phoneIti.getNumber === "function"
            ? phoneIti.getNumber()
            : phoneCode
              ? `+${phoneCode}${phone.replace(/\D/g, "")}`
              : phone;

        const formData = new FormData(form);
        formData.set("first_name", firstName);
        formData.set("last_name", lastName);
        formData.set("full_name", fullName);
        formData.set("company_email", emailValue);
        formData.set("phone", formattedPhone);
        formData.set("description", reqValue);
        formData.set("detailed_requirement", reqValue);
        formData.set("page_url", `${window.location.origin}${window.location.pathname}`);
        formData.set("conversion_channel", "request-trial");

        const response = await fetch("/api/forms/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: "request-trial",
            fields: Object.fromEntries(
              Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
            ),
            context: {
              hutk: getCookie("hubspotutk"),
              pageUri: window.location.href,
              pageName: "Request Trial",
            },
          }),
        });

        const data = (await response.json().catch(() => null)) as
          | {
              ok?: boolean;
              fieldErrors?: Record<string, string>;
              message?: string;
            }
          | null;

        if (!response.ok || !data?.ok) {
          if (data?.fieldErrors?.full_name) {
            fullNameInput?.classList.add("input-error");
            if (fullNameFeedback) fullNameFeedback.textContent = data.fieldErrors.full_name;
          }
          if (data?.fieldErrors?.company_email) {
            emailInput?.classList.add("input-error");
            if (emailFeedback) emailFeedback.textContent = data.fieldErrors.company_email;
            if (invalidIcon) invalidIcon.style.display = "block";
          }
          if (data?.fieldErrors?.phone) {
            phoneInput?.classList.add("input-error");
            if (phoneFeedback) phoneFeedback.textContent = data.fieldErrors.phone;
          }
          if (data?.fieldErrors?.detailed_requirement) {
            reqInput?.classList.add("input-error");
            if (reqFeedback) reqFeedback.textContent = data.fieldErrors.detailed_requirement;
          }
          if (data?.fieldErrors?.terms_accepted && termsFeedback) {
            termsFeedback.textContent = data.fieldErrors.terms_accepted;
          }

          if (!data?.fieldErrors || Object.keys(data.fieldErrors).length === 0) {
            showFormErrorBanner(
              data?.message || "Something went wrong. Please try again or email support@plivo.com.",
              btn
            );
          } else {
            resetSubmitButton(btn);
          }
          return;
        }

        showThankYou();
      } catch {
        showFormErrorBanner("Network error. Please try again or email support@plivo.com.", btn);
      }
    };

    form.addEventListener("submit", handler, true);
    return () => form.removeEventListener("submit", handler, true);
  }, [category, geoReady]);

  useEffect(() => {
    if (!geoReady || category === "A" || category === "unsupported") return;

    const form = document.getElementById("request-trial-form") as HTMLFormElement | null;
    if (!form) return;
    syncFormAttribution(form);
  }, [category, geoReady]);

  // Initialize intl-tel-input on #phone
  useEffect(() => {
    if (!geoReady || category === "A" || category === "unsupported") return;

    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval>;

    const init = () => {
      const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
      if (!phoneInput || !(window as any).intlTelInput) return false;
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

          const t = ["1aff", "17b3", "d558", "ec"].join("");
          fetch(`https://ipinfo.io/json?token=${t}`)
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
  }, [category, geoReady]);

  // Email blur validation with enrichment API
  useEffect(() => {
    if (!geoReady || category === "A" || category === "unsupported") return;

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
      const localValidation = validateBusinessEmail(value);
      if (!localValidation.isValid) {
        showEmailError(localValidation.message);
        return;
      }

      const cached = enrichCache.get(value.toLowerCase());
      if (cached?.isValid) { showEmailValid(); return; }
      if (cached && !cached.isValid) {
        showEmailError(cached.message);
        return;
      }

      if (enrichAbort) enrichAbort.abort();
      enrichAbort = new AbortController();

      const loader = getLoader();
      if (loader) loader.style.display = "block";
      const validIcon = emailInput.parentElement?.querySelector('[vpf="valid-tick"]') as HTMLElement | null;
      if (validIcon) validIcon.style.display = "none";
      const invalidIcon = emailInput.parentElement?.querySelector('[vpf="invalid-wrong"]') as HTMLElement | null;
      if (invalidIcon) invalidIcon.style.display = "none";

      fetch(ENRICH_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: enrichAbort.signal,
        body: JSON.stringify({
          formType: "request-trial",
          email: value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const isValid = data?.ok === true;
          const message = typeof data?.message === "string" ? data.message : "Please use your work email address.";
          enrichCache.set(value.toLowerCase(), { isValid, message });
          if (isValid) {
            showEmailValid();
          } else {
            showEmailError(message);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          clearEmailError();
        });
    };

    const handleInput = () => {
      if (enrichAbort) { enrichAbort.abort(); enrichAbort = null; }
      if (emailInput.classList.contains("input-error")) clearEmailError();
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
  }, [category, geoReady]);

  // Detailed requirement: live character counter
  useEffect(() => {
    if (!geoReady || category === "A" || category === "unsupported") return;

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
  }, [category, geoReady]);

  // Loading state while waiting for geo data
  if (!geoReady) {
    return (
      <section className="bg-white pt-24 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  // Cat A: show redirect spinner (useEffect above handles the actual redirect)
  if (category === "A") {
    return (
      <section className="bg-white pt-24 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Redirecting you to sign up...</p>
        </div>
      </section>
    );
  }

  // Unsupported: show "not available in your region" message
  if (category === "unsupported") {
    return (
      <section className="bg-white pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
            We're not available in your region yet
          </h1>
          <p className="text-base text-gray-600 mt-4 max-w-lg mx-auto leading-relaxed">
            Plivo services are currently available in select countries. Please contact our sales team to learn more about availability in your area.
          </p>
          <a
            href="/contact/sales/"
            className="inline-flex items-center justify-center mt-8 rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </section>
    );
  }

  // Cat B: show the trial request form
  return (
    <section className="bg-white pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black">
              Get access to your trial account
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed max-w-lg">
              Try Plivo's AI-powered communication platform with full API access. Our team will set up your trial account and guide you through the process.
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
                  <div key={badge.label} className="flex flex-col items-center gap-1">
                    <img src={badge.src} alt={badge.alt} className="h-7 sm:h-9 w-auto opacity-60" />
                    <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted By Logos */}
            <div className="mt-10">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Trusted by leading consumer brands worldwide
              </p>
              <div className="flex flex-wrap items-center">
                {logosRow1.map((logo) => (
                  <img key={logo.name} src={logo.src} alt={logo.name} className="h-10 sm:h-12 w-auto opacity-40 grayscale" />
                ))}
              </div>
              <div className="flex flex-wrap items-center">
                {logosRow2.map((logo) => (
                  <img key={logo.name} src={logo.src} alt={logo.name} className="h-10 sm:h-12 w-auto opacity-40 grayscale" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form with dotted grid background */}
          <div className="order-1 lg:order-2 relative rounded-2xl">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
              <div className="absolute inset-y-0 left-0 z-[1] w-6 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 z-[1] w-6 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 z-[1] h-6 bg-gradient-to-b from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 z-[1] h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Form Card */}
            <div className="relative z-10 flex items-center justify-center py-6 sm:py-10 md:py-14 px-2 sm:px-6 md:px-10">
              <div className="w-full sm:max-w-md rounded-xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
                {/* @ts-expect-error vpf is a custom attribute used by form-submission.js */}
                <div vpf="form-wrapper">
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
                        Request your trial account
                      </h2>

                      <form
                        id="request-trial-form"
                        noValidate
                        // @ts-expect-error custom attributes for form-submission.js
                        hubspot="contactForm"
                        conversion_channel="request-trial"
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

                        {/* Detailed requirement */}
                        <div className="form-field">
                          <label htmlFor="detailed_requirement" className="text-[13px] font-medium text-gray-700 mb-1 block">
                            Detailed requirement <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            id="detailed_requirement"
                            name="detailed_requirement"
                            maxLength={5000}
                            placeholder="Describe your use case, channels needed, countries you need service for and estimated volume"
                            required
                            className="w-full min-h-[88px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 resize-none hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all"
                          />
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="invalid-feedback error" />
                            <span id="req-char-count" className="text-[11px] text-gray-400 tabular-nums" />
                          </div>
                        </div>

                        {/* Terms checkbox */}
                        <div className="form-field">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              id="terms_accepted"
                              name="terms_accepted"
                              type="checkbox"
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#323dfe] focus:ring-[#323dfe]"
                            />
                            <span className="text-[12px] text-gray-500 leading-relaxed">
                              I agree to Plivo's{" "}
                              <a href="/legal/tos/" className="underline hover:text-gray-700">terms of service</a>{" "}
                              and{" "}
                              <a href="/legal/privacy/" className="underline hover:text-gray-700">privacy policy</a>
                            </span>
                          </label>
                          <span className="invalid-feedback error" />
                        </div>

                        {/* Submit button */}
                        <button
                          id="vpf-submit-btn"
                          type="submit"
                          // @ts-expect-error vpf is a custom attribute
                          vpf="submit-btn"
                          className="w-full rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors cta-hover-gradient"
                        >
                          Request Trial
                        </button>

                        {/* Hidden tracking fields */}
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
                        <input type="hidden" id="conversion_channel" name="conversion_channel" defaultValue="request-trial" />
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

                        {/* UTM fields */}
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
                    </div>
                  </div>

                  {/* Step 2: Chat agent (hidden until form-submission.js shows it) */}
                  {/* @ts-expect-error vpf is a custom attribute */}
                  <div vpf="2" style={{ display: "none" }} className="p-5">
                    <div id="chat-widget" className="chat-agent-cx" />
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
                      Thank you. We've received your trial request. A member of our team will reach out within 1 business day to set up your account.
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
