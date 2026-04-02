const CAMPAIGN_COOKIE_FIRST = "campaign_first";
const CAMPAIGN_COOKIE_LATEST = "campaign_latest";
const LAST_VISITED_COOKIE = "last_visited";
const VISITOR_ID_COOKIE = "visitor_id873501";
const COOKIE_MAX_AGE_SECONDS = 10 * 365 * 24 * 60 * 60;

const TRACKED_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_creative",
  "utm_device",
  "utm_matchtype",
  "utm_network",
  "utm_campaignid",
  "utm_keywordid",
  "utm_adposition",
  "utm_adgroupid",
  "utm_campaign_type",
  "utm_engagement_type",
  "utm_referrer",
  "landing_page",
  "gclid",
] as const;

type CampaignKey = (typeof TRACKED_KEYS)[number];
type CampaignData = Partial<Record<CampaignKey, string>>;

function parseQueryString(input: string): Record<string, string> {
  const params = new URLSearchParams(input);
  const output: Record<string, string> = {};

  params.forEach((value, key) => {
    if (value !== "") {
      output[key] = value;
    }
  });

  return output;
}

function getCurrentPageUrl(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

export function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
}

function readJsonCookie(name: string): CampaignData {
  const value = getCookie(name);
  if (!value) return {};

  try {
    return JSON.parse(value) as CampaignData;
  } catch {
    return {};
  }
}

function collectCampaignData(): CampaignData {
  let query = window.location.search.slice(1);
  const hashIndex = window.location.href.indexOf("#");
  if (hashIndex !== -1) {
    const afterHash = window.location.href.slice(hashIndex + 1);
    const questionMarkIndex = afterHash.indexOf("?");
    if (questionMarkIndex !== -1) {
      const hashQuery = afterHash.slice(questionMarkIndex + 1);
      query = query ? `${query}&${hashQuery}` : hashQuery;
    }
  }

  const params = parseQueryString(query);
  const campaignData: CampaignData = {};

  TRACKED_KEYS.forEach((key) => {
    if (params[key]) {
      campaignData[key] = params[key];
    }
  });

  campaignData.utm_referrer = document.referrer || "";
  campaignData.landing_page = getCurrentPageUrl();

  if (params.gclid) {
    campaignData.gclid = params.gclid;
  }

  return campaignData;
}

export function captureCampaignAttribution(): {
  first: CampaignData;
  latest: CampaignData;
} {
  const latest = collectCampaignData();
  setCookie(LAST_VISITED_COOKIE, getCurrentPageUrl());

  const existingFirst = readJsonCookie(CAMPAIGN_COOKIE_FIRST);
  if (Object.keys(existingFirst).length === 0) {
    setCookie(CAMPAIGN_COOKIE_FIRST, JSON.stringify(latest));
  }

  setCookie(CAMPAIGN_COOKIE_LATEST, JSON.stringify(latest));

  return {
    first: Object.keys(existingFirst).length === 0 ? latest : existingFirst,
    latest,
  };
}

function setHiddenFieldValue(form: HTMLFormElement, name: string, value: string): void {
  const field = form.querySelector(`[id="${name}"]`) as HTMLInputElement | null;
  if (!field) return;
  field.value = value;
}

function populateTrackedFieldGroup(
  form: HTMLFormElement,
  prefix: "" | "initial_" | "latest_",
  source: CampaignData
): void {
  TRACKED_KEYS.forEach((key) => {
    const value = source[key] || "";
    const targetName =
      key === "landing_page" && prefix !== ""
        ? `${prefix}utm_landing_page`
        : `${prefix}${key}`;
    setHiddenFieldValue(form, targetName, value);
  });
}

export function syncFormAttribution(
  form: HTMLFormElement,
  options?: { currentUseCase?: string }
): void {
  const { first, latest } = captureCampaignAttribution();

  populateTrackedFieldGroup(form, "", latest);
  populateTrackedFieldGroup(form, "initial_", first);
  populateTrackedFieldGroup(form, "latest_", latest);

  TRACKED_KEYS.forEach((key) => {
    const value = latest[key] || "";
    const secondaryName = key === "landing_page" ? "landing_page_2" : `${key}_2`;
    setHiddenFieldValue(form, secondaryName, value);
  });

  const currentPageUrl = getCurrentPageUrl();
  setHiddenFieldValue(form, "page_url", currentPageUrl);
  setHiddenFieldValue(form, "last_visited", getCookie(LAST_VISITED_COOKIE) || currentPageUrl);
  setHiddenFieldValue(form, "original_referrer", first.utm_referrer || document.referrer || "");
  setHiddenFieldValue(form, "pardot_visitor_id", getCookie(VISITOR_ID_COOKIE));
  setHiddenFieldValue(form, "campaign_source", form.getAttribute("campaign_source") || latest.utm_source || "");

  const gclid = latest.gclid || first.gclid || "";
  setHiddenFieldValue(form, "gclid", gclid);
  setHiddenFieldValue(form, "gclid_field", gclid);

  if (options?.currentUseCase) {
    const initialUseCaseField = form.querySelector("#initial_use_case") as HTMLInputElement | null;
    if (initialUseCaseField && !initialUseCaseField.value) {
      initialUseCaseField.value = options.currentUseCase;
    }
  }
}
