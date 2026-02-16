"use client";

import { useState, useEffect, useRef } from "react";
import { useGeoCountry } from "@/hooks/useGeoCountry";
import { customerLogos } from "@/data/navigation";

const VALUE_PROPS = [
  "Whiteglove onboarding & dedicated account manager",
  "Tiered discounts for committed monthly volumes",
  "Custom AI agents designed for your use case",
];

const COUNTRY_CODES = [
  { code: "US", dial: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States", digits: [10, 10] },
  { code: "GB", dial: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom", digits: [10, 10] },
  { code: "IN", dial: "+91", flag: "\u{1F1EE}\u{1F1F3}", name: "India", digits: [10, 10] },
  { code: "CA", dial: "+1", flag: "\u{1F1E8}\u{1F1E6}", name: "Canada", digits: [10, 10] },
  { code: "AU", dial: "+61", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia", digits: [9, 9] },
  { code: "AF", dial: "+93", flag: "\u{1F1E6}\u{1F1EB}", name: "Afghanistan", digits: [9, 9] },
  { code: "AL", dial: "+355", flag: "\u{1F1E6}\u{1F1F1}", name: "Albania", digits: [8, 9] },
  { code: "DZ", dial: "+213", flag: "\u{1F1E9}\u{1F1FF}", name: "Algeria", digits: [9, 9] },
  { code: "AR", dial: "+54", flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina", digits: [10, 10] },
  { code: "AM", dial: "+374", flag: "\u{1F1E6}\u{1F1F2}", name: "Armenia", digits: [8, 8] },
  { code: "AT", dial: "+43", flag: "\u{1F1E6}\u{1F1F9}", name: "Austria", digits: [10, 11] },
  { code: "AZ", dial: "+994", flag: "\u{1F1E6}\u{1F1FF}", name: "Azerbaijan", digits: [9, 9] },
  { code: "BH", dial: "+973", flag: "\u{1F1E7}\u{1F1ED}", name: "Bahrain", digits: [8, 8] },
  { code: "BD", dial: "+880", flag: "\u{1F1E7}\u{1F1E9}", name: "Bangladesh", digits: [10, 10] },
  { code: "BY", dial: "+375", flag: "\u{1F1E7}\u{1F1FE}", name: "Belarus", digits: [9, 10] },
  { code: "BE", dial: "+32", flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium", digits: [8, 9] },
  { code: "BO", dial: "+591", flag: "\u{1F1E7}\u{1F1F4}", name: "Bolivia", digits: [8, 8] },
  { code: "BA", dial: "+387", flag: "\u{1F1E7}\u{1F1E6}", name: "Bosnia", digits: [8, 8] },
  { code: "BR", dial: "+55", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil", digits: [10, 11] },
  { code: "BN", dial: "+673", flag: "\u{1F1E7}\u{1F1F3}", name: "Brunei", digits: [7, 7] },
  { code: "BG", dial: "+359", flag: "\u{1F1E7}\u{1F1EC}", name: "Bulgaria", digits: [8, 9] },
  { code: "KH", dial: "+855", flag: "\u{1F1F0}\u{1F1ED}", name: "Cambodia", digits: [8, 9] },
  { code: "CM", dial: "+237", flag: "\u{1F1E8}\u{1F1F2}", name: "Cameroon", digits: [9, 9] },
  { code: "CL", dial: "+56", flag: "\u{1F1E8}\u{1F1F1}", name: "Chile", digits: [9, 9] },
  { code: "CN", dial: "+86", flag: "\u{1F1E8}\u{1F1F3}", name: "China", digits: [11, 11] },
  { code: "CO", dial: "+57", flag: "\u{1F1E8}\u{1F1F4}", name: "Colombia", digits: [10, 10] },
  { code: "CR", dial: "+506", flag: "\u{1F1E8}\u{1F1F7}", name: "Costa Rica", digits: [8, 8] },
  { code: "HR", dial: "+385", flag: "\u{1F1ED}\u{1F1F7}", name: "Croatia", digits: [8, 9] },
  { code: "CY", dial: "+357", flag: "\u{1F1E8}\u{1F1FE}", name: "Cyprus", digits: [8, 8] },
  { code: "CZ", dial: "+420", flag: "\u{1F1E8}\u{1F1FF}", name: "Czech Republic", digits: [9, 9] },
  { code: "DK", dial: "+45", flag: "\u{1F1E9}\u{1F1F0}", name: "Denmark", digits: [8, 8] },
  { code: "DO", dial: "+1809", flag: "\u{1F1E9}\u{1F1F4}", name: "Dominican Republic", digits: [10, 10] },
  { code: "EC", dial: "+593", flag: "\u{1F1EA}\u{1F1E8}", name: "Ecuador", digits: [9, 9] },
  { code: "EG", dial: "+20", flag: "\u{1F1EA}\u{1F1EC}", name: "Egypt", digits: [10, 10] },
  { code: "SV", dial: "+503", flag: "\u{1F1F8}\u{1F1FB}", name: "El Salvador", digits: [8, 8] },
  { code: "EE", dial: "+372", flag: "\u{1F1EA}\u{1F1EA}", name: "Estonia", digits: [7, 8] },
  { code: "ET", dial: "+251", flag: "\u{1F1EA}\u{1F1F9}", name: "Ethiopia", digits: [9, 9] },
  { code: "FI", dial: "+358", flag: "\u{1F1EB}\u{1F1EE}", name: "Finland", digits: [9, 10] },
  { code: "FR", dial: "+33", flag: "\u{1F1EB}\u{1F1F7}", name: "France", digits: [9, 9] },
  { code: "GE", dial: "+995", flag: "\u{1F1EC}\u{1F1EA}", name: "Georgia", digits: [9, 9] },
  { code: "DE", dial: "+49", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany", digits: [10, 11] },
  { code: "GH", dial: "+233", flag: "\u{1F1EC}\u{1F1ED}", name: "Ghana", digits: [9, 9] },
  { code: "GR", dial: "+30", flag: "\u{1F1EC}\u{1F1F7}", name: "Greece", digits: [10, 10] },
  { code: "GT", dial: "+502", flag: "\u{1F1EC}\u{1F1F9}", name: "Guatemala", digits: [8, 8] },
  { code: "HN", dial: "+504", flag: "\u{1F1ED}\u{1F1F3}", name: "Honduras", digits: [8, 8] },
  { code: "HK", dial: "+852", flag: "\u{1F1ED}\u{1F1F0}", name: "Hong Kong", digits: [8, 8] },
  { code: "HU", dial: "+36", flag: "\u{1F1ED}\u{1F1FA}", name: "Hungary", digits: [8, 9] },
  { code: "IS", dial: "+354", flag: "\u{1F1EE}\u{1F1F8}", name: "Iceland", digits: [7, 7] },
  { code: "ID", dial: "+62", flag: "\u{1F1EE}\u{1F1E9}", name: "Indonesia", digits: [9, 12] },
  { code: "IQ", dial: "+964", flag: "\u{1F1EE}\u{1F1F6}", name: "Iraq", digits: [10, 10] },
  { code: "IE", dial: "+353", flag: "\u{1F1EE}\u{1F1EA}", name: "Ireland", digits: [7, 9] },
  { code: "IL", dial: "+972", flag: "\u{1F1EE}\u{1F1F1}", name: "Israel", digits: [9, 9] },
  { code: "IT", dial: "+39", flag: "\u{1F1EE}\u{1F1F9}", name: "Italy", digits: [9, 10] },
  { code: "JM", dial: "+1876", flag: "\u{1F1EF}\u{1F1F2}", name: "Jamaica", digits: [10, 10] },
  { code: "JP", dial: "+81", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan", digits: [10, 10] },
  { code: "JO", dial: "+962", flag: "\u{1F1EF}\u{1F1F4}", name: "Jordan", digits: [9, 9] },
  { code: "KZ", dial: "+7", flag: "\u{1F1F0}\u{1F1FF}", name: "Kazakhstan", digits: [10, 10] },
  { code: "KE", dial: "+254", flag: "\u{1F1F0}\u{1F1EA}", name: "Kenya", digits: [9, 10] },
  { code: "KW", dial: "+965", flag: "\u{1F1F0}\u{1F1FC}", name: "Kuwait", digits: [8, 8] },
  { code: "LV", dial: "+371", flag: "\u{1F1F1}\u{1F1FB}", name: "Latvia", digits: [8, 8] },
  { code: "LB", dial: "+961", flag: "\u{1F1F1}\u{1F1E7}", name: "Lebanon", digits: [7, 8] },
  { code: "LT", dial: "+370", flag: "\u{1F1F1}\u{1F1F9}", name: "Lithuania", digits: [8, 8] },
  { code: "LU", dial: "+352", flag: "\u{1F1F1}\u{1F1FA}", name: "Luxembourg", digits: [8, 9] },
  { code: "MY", dial: "+60", flag: "\u{1F1F2}\u{1F1FE}", name: "Malaysia", digits: [9, 10] },
  { code: "MX", dial: "+52", flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico", digits: [10, 10] },
  { code: "MA", dial: "+212", flag: "\u{1F1F2}\u{1F1E6}", name: "Morocco", digits: [9, 9] },
  { code: "MM", dial: "+95", flag: "\u{1F1F2}\u{1F1F2}", name: "Myanmar", digits: [8, 10] },
  { code: "NP", dial: "+977", flag: "\u{1F1F3}\u{1F1F5}", name: "Nepal", digits: [10, 10] },
  { code: "NL", dial: "+31", flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands", digits: [9, 9] },
  { code: "NZ", dial: "+64", flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand", digits: [8, 10] },
  { code: "NG", dial: "+234", flag: "\u{1F1F3}\u{1F1EC}", name: "Nigeria", digits: [10, 10] },
  { code: "NO", dial: "+47", flag: "\u{1F1F3}\u{1F1F4}", name: "Norway", digits: [8, 8] },
  { code: "OM", dial: "+968", flag: "\u{1F1F4}\u{1F1F2}", name: "Oman", digits: [8, 8] },
  { code: "PK", dial: "+92", flag: "\u{1F1F5}\u{1F1F0}", name: "Pakistan", digits: [10, 10] },
  { code: "PA", dial: "+507", flag: "\u{1F1F5}\u{1F1E6}", name: "Panama", digits: [7, 8] },
  { code: "PY", dial: "+595", flag: "\u{1F1F5}\u{1F1FE}", name: "Paraguay", digits: [9, 9] },
  { code: "PE", dial: "+51", flag: "\u{1F1F5}\u{1F1EA}", name: "Peru", digits: [9, 9] },
  { code: "PH", dial: "+63", flag: "\u{1F1F5}\u{1F1ED}", name: "Philippines", digits: [10, 10] },
  { code: "PL", dial: "+48", flag: "\u{1F1F5}\u{1F1F1}", name: "Poland", digits: [9, 9] },
  { code: "PT", dial: "+351", flag: "\u{1F1F5}\u{1F1F9}", name: "Portugal", digits: [9, 9] },
  { code: "QA", dial: "+974", flag: "\u{1F1F6}\u{1F1E6}", name: "Qatar", digits: [8, 8] },
  { code: "RO", dial: "+40", flag: "\u{1F1F7}\u{1F1F4}", name: "Romania", digits: [9, 9] },
  { code: "RU", dial: "+7", flag: "\u{1F1F7}\u{1F1FA}", name: "Russia", digits: [10, 10] },
  { code: "RW", dial: "+250", flag: "\u{1F1F7}\u{1F1FC}", name: "Rwanda", digits: [9, 9] },
  { code: "SA", dial: "+966", flag: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia", digits: [9, 9] },
  { code: "SN", dial: "+221", flag: "\u{1F1F8}\u{1F1F3}", name: "Senegal", digits: [9, 9] },
  { code: "RS", dial: "+381", flag: "\u{1F1F7}\u{1F1F8}", name: "Serbia", digits: [8, 9] },
  { code: "SG", dial: "+65", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore", digits: [8, 8] },
  { code: "SK", dial: "+421", flag: "\u{1F1F8}\u{1F1F0}", name: "Slovakia", digits: [9, 9] },
  { code: "SI", dial: "+386", flag: "\u{1F1F8}\u{1F1EE}", name: "Slovenia", digits: [8, 8] },
  { code: "ZA", dial: "+27", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa", digits: [9, 9] },
  { code: "KR", dial: "+82", flag: "\u{1F1F0}\u{1F1F7}", name: "South Korea", digits: [9, 11] },
  { code: "ES", dial: "+34", flag: "\u{1F1EA}\u{1F1F8}", name: "Spain", digits: [9, 9] },
  { code: "LK", dial: "+94", flag: "\u{1F1F1}\u{1F1F0}", name: "Sri Lanka", digits: [9, 9] },
  { code: "SE", dial: "+46", flag: "\u{1F1F8}\u{1F1EA}", name: "Sweden", digits: [9, 10] },
  { code: "CH", dial: "+41", flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland", digits: [9, 9] },
  { code: "TW", dial: "+886", flag: "\u{1F1F9}\u{1F1FC}", name: "Taiwan", digits: [9, 9] },
  { code: "TZ", dial: "+255", flag: "\u{1F1F9}\u{1F1FF}", name: "Tanzania", digits: [9, 9] },
  { code: "TH", dial: "+66", flag: "\u{1F1F9}\u{1F1ED}", name: "Thailand", digits: [9, 9] },
  { code: "TR", dial: "+90", flag: "\u{1F1F9}\u{1F1F7}", name: "Turkey", digits: [10, 10] },
  { code: "UG", dial: "+256", flag: "\u{1F1FA}\u{1F1EC}", name: "Uganda", digits: [9, 9] },
  { code: "UA", dial: "+380", flag: "\u{1F1FA}\u{1F1E6}", name: "Ukraine", digits: [9, 9] },
  { code: "AE", dial: "+971", flag: "\u{1F1E6}\u{1F1EA}", name: "UAE", digits: [9, 9] },
  { code: "UY", dial: "+598", flag: "\u{1F1FA}\u{1F1FE}", name: "Uruguay", digits: [8, 8] },
  { code: "UZ", dial: "+998", flag: "\u{1F1FA}\u{1F1FF}", name: "Uzbekistan", digits: [9, 9] },
  { code: "VE", dial: "+58", flag: "\u{1F1FB}\u{1F1EA}", name: "Venezuela", digits: [10, 10] },
  { code: "VN", dial: "+84", flag: "\u{1F1FB}\u{1F1F3}", name: "Vietnam", digits: [9, 10] },
  { code: "ZM", dial: "+260", flag: "\u{1F1FF}\u{1F1F2}", name: "Zambia", digits: [9, 9] },
  { code: "ZW", dial: "+263", flag: "\u{1F1FF}\u{1F1FC}", name: "Zimbabwe", digits: [9, 9] },
];

const COMPLIANCE_BADGES = [
  { src: "/images/compliance/HIPAA black.svg", alt: "HIPAA", label: "HIPAA" },
  { src: "/images/compliance/GDPR black.svg", alt: "GDPR", label: "GDPR" },
  { src: "/images/compliance/AICPA black.svg", alt: "AICPA SOC 2", label: "AICPA SOC 2" },
  { src: "/images/compliance/PCI black.svg", alt: "PCI DSS", label: "PCI DSS" },
  { src: "/images/compliance/Star Black.svg", alt: "STAR", label: "STAR" },
];

const PERSONAL_DOMAINS = [
  "gmail.com", "yahoo.com", "yahoo.co.in", "hotmail.com", "outlook.com",
  "aol.com", "icloud.com", "mail.com", "protonmail.com", "zoho.com",
  "yandex.com", "gmx.com", "live.com", "msn.com", "me.com",
  "rediffmail.com", "inbox.com", "fastmail.com", "tutanota.com",
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !PERSONAL_DOMAINS.includes(domain);
}

function isValidPhone(phone: string, min: number, max: number): { valid: boolean; count: number } {
  const digits = phone.replace(/[\s\-()\.+]/g, "");
  const count = digits.length;
  const valid = /^\d+$/.test(digits) && count >= min && count <= max;
  return { valid, count };
}

export default function ContactSalesHero() {
  const [submitted, setSubmitted] = useState(false);
  const { country: geoCountry } = useGeoCountry("US");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Resolve to geo country once it loads, or use manual selection
  const selectedCode = countryCode ?? (COUNTRY_CODES.find(c => c.code === geoCountry) ? geoCountry : "US");

  // Keep latest selectedCode in a ref so native event handlers aren't stale
  const selectedCodeRef = useRef(selectedCode);
  selectedCodeRef.current = selectedCode;

  // Sync country select element when geo detection updates
  useEffect(() => {
    const el = document.getElementById("contact-country-select") as HTMLSelectElement | null;
    if (el) el.value = selectedCode;
  }, [selectedCode]);

  // ALL form interaction via document.getElementById — bypasses React ref + synthetic event issues with Astro hydration
  useEffect(() => {
    // Store handlers so we can clean them up
    const cleanups: (() => void)[] = [];

    // Small delay ensures DOM is fully ready after Astro client:load hydration
    const timer = setTimeout(() => {
      const submitBtn = document.getElementById("contact-submit-btn");
      const countrySelect = document.getElementById("contact-country-select") as HTMLSelectElement | null;
      const phoneEl = document.getElementById("contact-phone") as HTMLInputElement | null;

      // Country select → update React state
      if (countrySelect) {
        const handler = () => setCountryCode(countrySelect.value);
        countrySelect.addEventListener("change", handler);
        cleanups.push(() => countrySelect.removeEventListener("change", handler));
      }

      // Phone input → only digits allowed, enforce max digit count for selected country
      if (phoneEl) {
        const handler = () => {
          let digitsOnly = phoneEl.value.replace(/[^\d]/g, "");
          const code = selectedCodeRef.current;
          const ctry = COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];
          const maxD = ctry.digits[1];
          if (digitsOnly.length > maxD) {
            digitsOnly = digitsOnly.slice(0, maxD);
          }
          phoneEl.value = digitsOnly;
        };
        phoneEl.addEventListener("input", handler);
        cleanups.push(() => phoneEl.removeEventListener("input", handler));
      }

      // Submit button click → validate + show thank you
      if (submitBtn) {
        const handler = (e: Event) => {
          e.preventDefault();

          // Prevent double-submit
          const btn = submitBtn as HTMLButtonElement;
          if (btn.disabled) return;
          btn.disabled = true;
          btn.textContent = "Submitting...";
          btn.classList.add("opacity-70", "cursor-not-allowed");

          const fullName = (document.getElementById("contact-fullName") as HTMLInputElement)?.value?.trim() ?? "";
          const email = (document.getElementById("contact-email") as HTMLInputElement)?.value?.trim() ?? "";
          const phone = (document.getElementById("contact-phone") as HTMLInputElement)?.value?.trim() ?? "";
          const requirement = (document.getElementById("contact-requirement") as HTMLTextAreaElement)?.value?.trim() ?? "";

          const newErrors: Record<string, string> = {};

          if (!fullName || fullName.length < 2) {
            newErrors.fullName = "Please enter your full name";
          }

          if (!email) {
            newErrors.email = "Please enter your email";
          } else if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address";
          } else if (!isWorkEmail(email)) {
            newErrors.email = "Please use your work email address";
          }

          const code = selectedCodeRef.current;
          const country = COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];
          const [minDigits, maxDigits] = country.digits;
          if (!phone) {
            newErrors.phone = "Please enter your phone number";
          } else {
            const { valid, count } = isValidPhone(phone, minDigits, maxDigits);
            if (!valid) {
              const expected = minDigits === maxDigits ? `${minDigits}` : `${minDigits}-${maxDigits}`;
              newErrors.phone = `${country.name} requires ${expected} digits (you entered ${count})`;
            }
          }

          if (!requirement) {
            newErrors.requirement = "Please describe your requirement";
          } else if (requirement.length < 100) {
            newErrors.requirement = `Please provide more detail (${requirement.length}/100 characters)`;
          }

          setErrors(newErrors);
          if (Object.keys(newErrors).length > 0) {
            // Re-enable button on validation failure
            btn.disabled = false;
            btn.textContent = "Submit";
            btn.classList.remove("opacity-70", "cursor-not-allowed");
            return;
          }
          setSubmitted(true);
        };
        submitBtn.addEventListener("click", handler);
        cleanups.push(() => submitBtn.removeEventListener("click", handler));
      }

      // Clear field errors on input
      const fields = ["fullName", "email", "phone", "requirement"];
      fields.forEach((fieldName) => {
        const el = document.getElementById(`contact-${fieldName}`);
        if (el) {
          const handler = () => {
            setErrors((prev) => {
              if (!prev[fieldName]) return prev;
              const next = { ...prev };
              delete next[fieldName];
              return next;
            });
          };
          el.addEventListener("input", handler);
          cleanups.push(() => el.removeEventListener("input", handler));
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // Inline flickering grid canvas
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
    const MAX_OPACITY = 0.5;
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
    <section className="bg-white py-12 sm:py-16 md:py-24">
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
              <div className="flex items-center gap-6 sm:gap-8">
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
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
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
            <div className="relative z-10 flex items-center justify-center py-10 sm:py-14 px-6 sm:px-10">
              <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5 sm:p-6">
              {submitted ? (
                <div className="text-center py-12">
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
                  <h3 className="font-sora text-xl font-normal text-black">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                    A member of our sales team will get back to you within 1 business day to discuss your requirements.
                  </p>
                  <a
                    href="/"
                    className="inline-block mt-6 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  >
                    &larr; Back to homepage
                  </a>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <h2 className="font-sora text-xl font-semibold text-black mb-3">
                    Let's create your custom plan together
                  </h2>

                  {/* Full name */}
                  <div>
                    <label htmlFor="contact-fullName" className="text-[13px] font-medium text-gray-700 mb-1 block">
                      Full name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-fullName"
                      type="text"
                      placeholder="Olivia Rodriguez"
                      className={`w-full h-10 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.fullName ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Work email */}
                  <div>
                    <label htmlFor="contact-email" className="text-[13px] font-medium text-gray-700 mb-1 block">
                      Work email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="olivia@plivo.com"
                      className={`w-full h-10 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone number */}
                  <div>
                    <label htmlFor="contact-phone" className="text-[13px] font-medium text-gray-700 mb-1 block">
                      Phone number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="contact-country-select"
                        defaultValue={selectedCode}
                        className="flex-shrink-0 h-10 w-28 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-900 cursor-pointer focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 hover:border-gray-400"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="888888 88888"
                        className={`flex-1 h-10 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Detailed requirement */}
                  <div>
                    <label htmlFor="contact-requirement" className="text-[13px] font-medium text-gray-700 mb-1 block">
                      Detailed requirement <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-requirement"
                      placeholder="Detail your use case, channel(s), countries you need service for and estimated volume"
                      className={`w-full min-h-[88px] rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 resize-none hover:border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-[3px] focus:ring-blue-100 transition-all ${errors.requirement ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300"}`}
                    />
                    {errors.requirement && (
                      <p className="text-xs text-red-500 mt-1">{errors.requirement}</p>
                    )}
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="button"
                    className="w-full rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    Submit
                  </button>

                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
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
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
