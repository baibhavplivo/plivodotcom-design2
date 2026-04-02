export type FormType = "contact-sales" | "request-trial";

export type EmailValidationStatus =
  | "valid"
  | "invalid"
  | "personal"
  | "disposable";

export const MIN_DETAILED_REQUIREMENT_CHARS = 100;

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.it",
  "hotmail.es",
  "outlook.com",
  "outlook.co.uk",
  "outlook.fr",
  "outlook.de",
  "live.com",
  "live.co.uk",
  "live.fr",
  "msn.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "yahoo.fr",
  "yahoo.de",
  "yahoo.it",
  "yahoo.es",
  "yahoo.ca",
  "yahoo.com.au",
  "yahoo.com.br",
  "ymail.com",
  "rocketmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "aim.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "mail.com",
  "gmx.com",
  "gmx.de",
  "gmx.net",
  "yandex.com",
  "yandex.ru",
  "inbox.com",
  "fastmail.com",
  "tutanota.com",
  "tuta.io",
  "rediffmail.com",
]);

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "10minutemail.com",
  "20minutemail.com",
  "discard.email",
  "dispostable.com",
  "emailondeck.com",
  "fakeinbox.com",
  "fakemail.net",
  "getairmail.com",
  "getnada.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "guerrillamail.org",
  "inboxbear.com",
  "maildrop.cc",
  "mailinator.com",
  "mailnesia.com",
  "mintemail.com",
  "moakt.com",
  "mytemp.email",
  "nada.email",
  "sharklasers.com",
  "temp-mail.org",
  "tempail.com",
  "tempinbox.com",
  "tempmail.com",
  "tempmailo.com",
  "temporary-mail.net",
  "throwawaymail.com",
  "trashmail.com",
  "yopmail.com",
]);

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getEmailDomain(email: string): string {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex < 1) return "";
  return normalized.slice(atIndex + 1);
}

export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function isPersonalEmail(email: string): boolean {
  const domain = getEmailDomain(email);
  return domain !== "" && PERSONAL_EMAIL_DOMAINS.has(domain);
}

export function isDisposableEmail(email: string): boolean {
  const domain = getEmailDomain(email);
  return domain !== "" && DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

export function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function normalizePhoneNumber(rawPhone: string, rawPhoneCode = ""): string {
  const trimmedPhone = rawPhone.trim();
  if (!trimmedPhone && !rawPhoneCode) return "";

  if (trimmedPhone.startsWith("+")) {
    return `+${trimmedPhone.replace(/\D/g, "")}`;
  }

  const phoneCode = rawPhoneCode.replace(/\D/g, "");
  const phoneDigits = trimmedPhone.replace(/\D/g, "");
  if (!phoneDigits) return "";
  if (!phoneCode) return `+${phoneDigits}`;
  return `+${phoneCode}${phoneDigits}`;
}

export function isLikelyValidInternationalPhone(phone: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

export function isTruthyFieldValue(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "on" || normalized === "yes" || normalized === "1";
}

export function validateBusinessEmail(email: string): {
  isValid: boolean;
  status: EmailValidationStatus;
  message: string;
  domainType: "business" | "personal" | "disposable" | "invalid";
  companyRiskProfile: "unknown" | "blocked";
} {
  if (!email.trim()) {
    return {
      isValid: false,
      status: "invalid",
      message: "Work email is required.",
      domainType: "invalid",
      companyRiskProfile: "blocked",
    };
  }

  if (!isValidEmailFormat(email)) {
    return {
      isValid: false,
      status: "invalid",
      message: "Please enter a valid email address.",
      domainType: "invalid",
      companyRiskProfile: "blocked",
    };
  }

  if (isPersonalEmail(email)) {
    return {
      isValid: false,
      status: "personal",
      message: "Please use your work email address.",
      domainType: "personal",
      companyRiskProfile: "blocked",
    };
  }

  if (isDisposableEmail(email)) {
    return {
      isValid: false,
      status: "disposable",
      message: "This email address cannot be used. Please try another.",
      domainType: "disposable",
      companyRiskProfile: "blocked",
    };
  }

  return {
    isValid: true,
    status: "valid",
    message: "",
    domainType: "business",
    companyRiskProfile: "unknown",
  };
}
