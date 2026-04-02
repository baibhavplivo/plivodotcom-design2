const VERIFY_COUNTRY_STORAGE_KEY = "plivo_verify_selected_country";
const VERIFY_COUNTRY_EVENT = "plivo:verify-country-change";

export function getStoredVerifyCountryCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const code = sessionStorage.getItem(VERIFY_COUNTRY_STORAGE_KEY);
    return code ? code.toUpperCase() : null;
  } catch {
    return null;
  }
}

export function syncVerifyCountryCode(code: string) {
  if (typeof window === "undefined") return;
  const normalizedCode = code.toUpperCase();

  try {
    sessionStorage.setItem(VERIFY_COUNTRY_STORAGE_KEY, normalizedCode);
  } catch {
    /* ignore storage errors */
  }

  window.dispatchEvent(
    new CustomEvent(VERIFY_COUNTRY_EVENT, {
      detail: { code: normalizedCode },
    }),
  );
}

export function subscribeToVerifyCountryChange(
  listener: (code: string) => void,
) {
  if (typeof window === "undefined") return () => {};

  const handleEvent = (event: Event) => {
    const code = (event as CustomEvent<{ code?: string }>).detail?.code;
    if (code) listener(code.toUpperCase());
  };

  window.addEventListener(VERIFY_COUNTRY_EVENT, handleEvent);
  return () => window.removeEventListener(VERIFY_COUNTRY_EVENT, handleEvent);
}
