import {
  MIN_DETAILED_REQUIREMENT_CHARS,
  isLikelyValidInternationalPhone,
  isTruthyFieldValue,
  normalizePhoneNumber,
  splitFullName,
  validateBusinessEmail,
} from "./src/lib/form-shared";

const VOICE_AGENT_UPSTREAM =
  "https://plivo-static-forms.netlify.app/.netlify/functions/voice-agent";
const DOCS_UPSTREAM = "https://docs.plivo.com";
const DOCS_PUBLIC_PREFIX = "https://www.plivo.com/docs";
const DOCS_APEX_PREFIX = "https://plivo.com/docs";

const GITHUB_API = "https://api.github.com";
const BLOG_PATH = "src/content/blog";
const IMAGE_PATH = "public/images/blog";
const JWT_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const DEFAULT_HUBSPOT_PORTAL_ID = "20451141";
const DEFAULT_CONTACT_SALES_FORM_ID = "1bd8ce72-8c0d-4dd0-89c2-f2d2bd7dfcd5";
const DEFAULT_REQUEST_TRIAL_FORM_ID = "988f6264-585c-4985-aaab-f0abedcb9950";

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CMS_PASSWORD: string;
  CMS_JWT_SECRET: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string; // e.g. "org/repo"
  GITHUB_BRANCH?: string; // defaults to "staging"
  DEPLOY_HOOK_URL?: string;
  HUBSPOT_PORTAL_ID?: string;
  HUBSPOT_CONTACT_SALES_FORM_ID?: string;
  HUBSPOT_REQUEST_TRIAL_FORM_ID?: string;
  HUBSPOT_PRIVATE_APP_TOKEN?: string;
  FORM_ALLOWED_ORIGINS?: string;
}

type FormType = "contact-sales" | "request-trial";

type FormSubmitPayload = {
  formType: FormType;
  fields: Record<string, string>;
  context?: {
    hutk?: string;
    ipAddress?: string;
    pageUri?: string;
    pageName?: string;
  };
};

type FormField = {
  name: string;
  value: string;
};

const HUBSPOT_PASS_THROUGH_FIELDS = [
  "full_name",
  "phone_code",
  "phone_country",
  "ip_country",
  "plivo_ip_country_code",
  "ip_address",
  "page_url",
  "company",
  "company_risk_profile",
  "enriched_segment",
  "conversion_channel",
  "campaign_source",
  "plivo_product",
  "original_referrer",
  "last_visited",
  "pardot_visitor_id",
  "gclid",
  "asset_downloaded",
  "asset_type",
  "content_type",
  "use_case",
  "latest_use_case",
  "initial_use_case",
  "description",
  "initial_utm_source",
  "initial_utm_medium",
  "initial_utm_campaign",
  "initial_utm_term",
  "initial_utm_content",
  "initial_utm_creative",
  "initial_utm_device",
  "initial_utm_matchtype",
  "initial_utm_network",
  "initial_utm_campaignid",
  "initial_utm_keywordid",
  "initial_utm_adposition",
  "initial_utm_adgroupid",
  "initial_utm_referrer",
  "initial_utm_landing_page",
  "initial_utm_campaign_type",
  "initial_utm_engagement_type",
  "latest_utm_source",
  "latest_utm_medium",
  "latest_utm_campaign",
  "latest_utm_term",
  "latest_utm_content",
  "latest_utm_creative",
  "latest_utm_device",
  "latest_utm_matchtype",
  "latest_utm_network",
  "latest_utm_campaignid",
  "latest_utm_keywordid",
  "latest_utm_adposition",
  "latest_utm_adgroupid",
  "latest_utm_referrer",
  "latest_utm_landing_page",
  "latest_utm_campaign_type",
  "latest_utm_engagement_type",
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
  "utm_referrer",
  "landing_page",
  "utm_campaign_type",
  "utm_engagement_type",
  "utm_source_2",
  "utm_medium_2",
  "utm_campaign_2",
  "utm_term_2",
  "utm_content_2",
  "utm_creative_2",
  "utm_device_2",
  "utm_matchtype_2",
  "utm_network_2",
  "utm_campaignid_2",
  "utm_keywordid_2",
  "utm_adposition_2",
  "utm_adgroupid_2",
  "utm_referrer_2",
  "landing_page_2",
  "utm_campaign_type_2",
  "utm_engagement_type_2",
];

function getFormOrigin(request: Request): string | undefined {
  return request.headers.get("Origin") || undefined;
}

function getAllowedOrigins(env: Env): string[] {
  if (!env.FORM_ALLOWED_ORIGINS) return [];
  return env.FORM_ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedFormRequest(request: Request, env: Env): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true;

  const requestOrigin = new URL(request.url).origin;
  if (origin === requestOrigin) return true;

  return getAllowedOrigins(env).includes(origin);
}

async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function sanitizeFields(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object") return {};

  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (typeof value === "string") {
      sanitized[key] = value.trim();
    }
  }

  return sanitized;
}

function parseCookieHeader(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get("Cookie") || "";
  return cookieHeader.split(";").reduce<Record<string, string>>((acc, pair) => {
    const separatorIndex = pair.indexOf("=");
    if (separatorIndex === -1) return acc;

    const key = pair.slice(0, separatorIndex).trim();
    const value = pair.slice(separatorIndex + 1).trim();
    if (key) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
}

function getHubSpotConfig(formType: FormType, env: Env): {
  portalId: string;
  formId: string;
  pageName: string;
} {
  // Use the known live public HubSpot forms directly so Cloudflare env drift
  // cannot silently route successful submissions into the wrong HubSpot form.
  return {
    portalId: DEFAULT_HUBSPOT_PORTAL_ID,
    formId:
      formType === "contact-sales"
        ? DEFAULT_CONTACT_SALES_FORM_ID
        : DEFAULT_REQUEST_TRIAL_FORM_ID,
    pageName: formType === "contact-sales" ? "Contact Sales" : "Request Trial",
  };
}

/** Rewrite any staging/preview URL to the canonical www.plivo.com origin
 *  so HubSpot doesn't flag the submission as "Unregistered Site Domain" spam. */
function canonicalizePageUri(raw: string): string {
  try {
    const url = new URL(raw);
    if (url.hostname !== "www.plivo.com" && url.hostname !== "plivo.com") {
      url.hostname = "www.plivo.com";
      url.port = "";
      url.protocol = "https:";
    }
    return url.toString();
  } catch {
    return `https://www.plivo.com/`;
  }
}

function buildHubSpotContext(
  request: Request,
  payload: FormSubmitPayload,
  defaultPageName: string
): Record<string, string> {
  const cookies = parseCookieHeader(request);
  const rawPageUri = payload.context?.pageUri || payload.fields.page_url || request.url;
  const context: Record<string, string> = {
    pageUri: canonicalizePageUri(rawPageUri),
    pageName: payload.context?.pageName || defaultPageName,
  };

  const hutk = payload.context?.hutk || cookies.hubspotutk;
  if (hutk) {
    context.hutk = hutk;
  }

  const ipAddress =
    payload.context?.ipAddress ||
    payload.fields.ip_address ||
    request.headers.get("CF-Connecting-IP") ||
    "";
  if (ipAddress) {
    context.ipAddress = ipAddress;
  }

  return context;
}

function dedupeFields(fields: FormField[]): FormField[] {
  const seen = new Set<string>();
  const output: FormField[] = [];

  for (const field of fields) {
    if (!field.value || seen.has(field.name)) continue;
    seen.add(field.name);
    output.push(field);
  }

  return output;
}

function buildHubSpotFields(
  formType: FormType,
  fields: Record<string, string>,
  normalizedPhone: string
): {
  primary: FormField[];
  fallback: FormField[];
} {
  const fullName = fields.full_name || `${fields.first_name || ""} ${fields.last_name || ""}`.trim();
  const { firstName, lastName } = splitFullName(fullName);
  const email = fields.company_email || fields.email || "";
  const description = fields.description || fields.detailed_requirement || "";
  const useCase = fields.use_case || fields.latest_use_case || "";
  const latestUseCase = useCase || fields.latest_use_case || "";
  const message =
    formType === "request-trial" && useCase
      ? `[Request Trial] Use case: ${useCase}\n\n${description}`
      : description;

  const primary = dedupeFields([
    { name: "firstname", value: firstName },
    { name: "lastname", value: lastName },
    { name: "first_name", value: firstName },
    { name: "last_name", value: lastName },
    { name: "full_name", value: fullName },
    { name: "email", value: email },
    { name: "phone", value: normalizedPhone },
    { name: "message", value: message },
    { name: "description", value: description },
    { name: "use_case", value: useCase },
    { name: "latest_use_case", value: latestUseCase },
    ...HUBSPOT_PASS_THROUGH_FIELDS.map((name) => ({
      name,
      value: fields[name] || "",
    })),
  ]);

  const fallback = dedupeFields([
    { name: "firstname", value: firstName },
    { name: "lastname", value: lastName },
    { name: "email", value: email },
    { name: "phone", value: normalizedPhone },
    { name: "message", value: message },
    { name: "use_case", value: useCase },
  ]);

  return { primary, fallback };
}

async function submitToHubSpot(
  portalId: string,
  formId: string,
  fields: FormField[],
  context: Record<string, string>
): Promise<Response> {
  return fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields,
        context,
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow Plivo to store and process my personal data.",
          },
        },
        skipValidation: true,
      }),
    }
  );
}

async function handleValidateEmail(request: Request, env: Env, origin?: string): Promise<Response> {
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405, origin);
  }

  if (!isAllowedFormRequest(request, env)) {
    return errorResponse("Forbidden", 403, origin);
  }

  const payload = await parseJsonBody<{ email?: string }>(request);
  if (!payload?.email) {
    return jsonResponse(
      {
        ok: false,
        status: "invalid",
        message: "Email is required.",
        companyRiskProfile: "blocked",
      },
      200,
      origin
    );
  }

  const validation = validateBusinessEmail(payload.email);
  return jsonResponse(
    {
      ok: validation.isValid,
      status: validation.status,
      message: validation.message,
      domainType: validation.domainType,
      companyRiskProfile: validation.companyRiskProfile,
      enrichedSegment: "",
    },
    200,
    origin
  );
}

async function handleFormSubmit(request: Request, env: Env, origin?: string): Promise<Response> {
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405, origin);
  }

  if (!isAllowedFormRequest(request, env)) {
    return errorResponse("Forbidden", 403, origin);
  }

  const payload = await parseJsonBody<FormSubmitPayload>(request);
  if (!payload || (payload.formType !== "contact-sales" && payload.formType !== "request-trial")) {
    return errorResponse("Invalid form submission payload", 400, origin);
  }

  const fields = sanitizeFields(payload.fields);
  const fullName = fields.full_name || "";
  const splitName = splitFullName(fullName);
  const email = fields.company_email || fields.email || "";
  const phone = normalizePhoneNumber(fields.phone || "", fields.phone_code || "");
  const description = fields.detailed_requirement || fields.description || "";
  const emailValidation = validateBusinessEmail(email);
  const fieldErrors: Record<string, string> = {};

  if (!fullName) {
    fieldErrors.full_name = "Full name is required.";
  }

  if (!emailValidation.isValid) {
    fieldErrors.company_email = emailValidation.message;
  }

  if (!phone) {
    fieldErrors.phone = "Phone number is required.";
  } else if (!isLikelyValidInternationalPhone(phone)) {
    fieldErrors.phone = "Please enter a valid phone number.";
  }

  if (!description) {
    fieldErrors.detailed_requirement = "Please describe your requirement.";
  } else if (description.length < MIN_DETAILED_REQUIREMENT_CHARS) {
    fieldErrors.detailed_requirement = `Please provide at least ${MIN_DETAILED_REQUIREMENT_CHARS} characters.`;
  }

  if (payload.formType === "request-trial") {
    if (!isTruthyFieldValue(fields.terms_accepted)) {
      fieldErrors.terms_accepted = "You must agree to the terms to continue.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse(
      {
        ok: false,
        status: "rejected",
        fieldErrors,
        message: "Please review the highlighted fields.",
      },
      400,
      origin
    );
  }

  fields.first_name = fields.first_name || splitName.firstName;
  fields.last_name = fields.last_name || splitName.lastName;
  fields.full_name = fullName;
  fields.company_email = email;
  fields.email = email;
  fields.phone = phone;
  fields.description = description;
  fields.company_risk_profile = emailValidation.companyRiskProfile;
  fields.enriched_segment = fields.enriched_segment || "unknown";
  fields.page_url = fields.page_url || payload.context?.pageUri || request.url;
  fields.landing_page = fields.landing_page || "https://plivo.com";
  fields.latest_use_case = fields.latest_use_case || fields.use_case || "";
  if (!fields.initial_use_case && fields.latest_use_case) {
    fields.initial_use_case = fields.latest_use_case;
  }

  const { portalId, formId, pageName } = getHubSpotConfig(payload.formType, env);
  const context = buildHubSpotContext(request, payload, pageName);
  const hubSpotFields = buildHubSpotFields(payload.formType, fields, phone);

  let response = await submitToHubSpot(portalId, formId, hubSpotFields.primary, context);
  let responseBody = await response.text();
  let usedFallback = false;

  if (!response.ok) {
    console.error("HubSpot primary submit failed", {
      formType: payload.formType,
      status: response.status,
      body: responseBody,
    });

    usedFallback = true;
    response = await submitToHubSpot(portalId, formId, hubSpotFields.fallback, context);
    responseBody = await response.text();
  }

  if (!response.ok) {
    console.error("HubSpot fallback submit failed", {
      formType: payload.formType,
      status: response.status,
      body: responseBody,
    });

    return jsonResponse(
      {
        ok: false,
        status: "error",
        message: "Something went wrong. Please try again or email support@plivo.com.",
        _debug: {
          hubspotStatus: response.status,
          hubspotResponse: responseBody.slice(0, 500),
        },
      },
      502,
      origin
    );
  }

  console.log("HubSpot submit succeeded", {
    formType: payload.formType,
    hubspotStatus: response.status,
    usedFallback,
    fieldCount: usedFallback ? hubSpotFields.fallback.length : hubSpotFields.primary.length,
    email: fields.email,
  });

  return jsonResponse(
    {
      ok: true,
      status: "submitted",
      _debug: {
        hubspotStatus: response.status,
        hubspotResponse: responseBody.slice(0, 200),
        fieldCount: usedFallback ? hubSpotFields.fallback.length : hubSpotFields.primary.length,
        usedFallback,
      },
    },
    200,
    origin
  );
}

// ─── JWT helpers (Web Crypto API) ───────────────────────────────

async function createJWT(secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const payload = btoa(
    JSON.stringify({
      sub: "cms",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + JWT_EXPIRY_MS) / 1000),
    })
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const data = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const signature = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${data}.${signature}`;
}

async function verifyJWT(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const data = `${parts[0]}.${parts[1]}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  // Restore base64 padding
  let sig = parts[2].replace(/-/g, "+").replace(/_/g, "/");
  while (sig.length % 4) sig += "=";
  const sigBytes = Uint8Array.from(atob(sig), (c) => c.charCodeAt(0));

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    new TextEncoder().encode(data)
  );
  if (!valid) return false;

  // Check expiry
  let payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  while (payloadB64.length % 4) payloadB64 += "=";
  const payload = JSON.parse(atob(payloadB64));
  return payload.exp > Date.now() / 1000;
}

// ─── CORS helpers ───────────────────────────────────────────────

function corsHeaders(origin?: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(data: unknown, status = 200, origin?: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function errorResponse(error: string, status: number, origin?: string): Response {
  return jsonResponse({ error }, status, origin);
}

async function proxyDocsRequest(request: Request): Promise<Response> {
  const upstreamUrl = new URL(request.url);
  upstreamUrl.protocol = "https:";
  upstreamUrl.host = new URL(DOCS_UPSTREAM).host;

  const upstreamResponse = await fetch(new Request(upstreamUrl.toString(), request));
  const headers = new Headers(upstreamResponse.headers);
  const location = headers.get("Location");
  const contentType = headers.get("Content-Type") || "";
  const shouldRewriteBody =
    contentType.includes("text/html") ||
    contentType.includes("text/xml") ||
    contentType.includes("application/xml");

  if (location?.includes(DOCS_APEX_PREFIX)) {
    headers.set("Location", location.replaceAll(DOCS_APEX_PREFIX, DOCS_PUBLIC_PREFIX));
  }

  if (!shouldRewriteBody) {
    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  }

  headers.delete("Content-Length");

  const body = (await upstreamResponse.text()).replaceAll(
    DOCS_APEX_PREFIX,
    DOCS_PUBLIC_PREFIX
  );

  return new Response(body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

// ─── Frontmatter parser/serializer ──────────────────────────────

function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const fm: Record<string, unknown> = {};
  const lines = match[1].split("\n");
  let currentKey = "";
  let currentValue = "";
  let inArray = false;

  for (const line of lines) {
    if (inArray) {
      const arrItem = line.match(/^\s*-\s*"?(.*?)"?\s*$/);
      if (arrItem) {
        (fm[currentKey] as string[]).push(arrItem[1]);
        continue;
      } else {
        inArray = false;
      }
    }

    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      currentValue = kv[2].trim();

      // Array on same line: ["a", "b"]
      if (currentValue.startsWith("[")) {
        try {
          fm[currentKey] = JSON.parse(currentValue);
        } catch {
          fm[currentKey] = currentValue;
        }
      } else if (currentValue === "") {
        // Could be start of array
        fm[currentKey] = [];
        inArray = true;
      } else if (currentValue === "true") {
        fm[currentKey] = true;
      } else if (currentValue === "false") {
        fm[currentKey] = false;
      } else {
        // Strip quotes
        fm[currentKey] = currentValue.replace(/^"(.*)"$/, "$1");
      }
    }
  }

  return { frontmatter: fm, body: match[2] };
}

function serializeFrontmatter(fm: Record<string, unknown>, body: string): string {
  const lines: string[] = ["---"];

  for (const [key, value] of Object.entries(fm)) {
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "string") {
      // Quote strings that contain special chars
      const needsQuotes = value.includes(":") || value.includes("#") || value.includes('"') || value.includes("'");
      lines.push(`${key}: ${needsQuotes ? JSON.stringify(value) : `"${value}"`}`);
    } else {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }

  lines.push("---");
  return lines.join("\n") + "\n" + body + "\n";
}

// ─── GitHub API helpers ─────────────────────────────────────────

async function githubFetch(path: string, env: Env, options: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "plivo-cms",
    ...(options.headers as Record<string, string> || {}),
  };
  return fetch(`${GITHUB_API}${path}`, { ...options, headers });
}

async function getFileSha(slug: string, env: Env): Promise<string | null> {
  const branch = env.GITHUB_BRANCH || "staging";
  const res = await githubFetch(
    `/repos/${env.GITHUB_REPO}/contents/${BLOG_PATH}/${slug}.md?ref=${branch}`,
    env
  );
  if (!res.ok) return null;
  const data: { sha: string } = await res.json();
  return data.sha;
}

// ─── CMS Route Handlers ────────────────────────────────────────

async function handleAuth(request: Request, env: Env, origin?: string): Promise<Response> {
  if (request.method !== "POST") return errorResponse("Method not allowed", 405, origin);

  const { password } = await request.json() as { password: string };
  if (password !== env.CMS_PASSWORD) {
    return errorResponse("Invalid password", 401, origin);
  }

  const token = await createJWT(env.CMS_JWT_SECRET);
  return jsonResponse({
    token,
    expiresAt: Date.now() + JWT_EXPIRY_MS,
  }, 200, origin);
}

async function handleListPosts(env: Env, origin?: string): Promise<Response> {
  const branch = env.GITHUB_BRANCH || "staging";

  // Get the tree for the blog directory
  const refRes = await githubFetch(`/repos/${env.GITHUB_REPO}/git/ref/heads/${branch}`, env);
  if (!refRes.ok) return errorResponse("Failed to fetch branch ref", 500, origin);
  const refData: { object: { sha: string } } = await refRes.json();

  const treeRes = await githubFetch(
    `/repos/${env.GITHUB_REPO}/git/trees/${refData.object.sha}?recursive=1`,
    env
  );
  if (!treeRes.ok) return errorResponse("Failed to fetch tree", 500, origin);
  const treeData: { tree: Array<{ path: string; type: string }> } = await treeRes.json();

  // Filter to blog .md files
  const blogFiles = treeData.tree
    .filter((f) => f.type === "blob" && f.path.startsWith(`${BLOG_PATH}/`) && f.path.endsWith(".md"))
    .map((f) => f.path.replace(`${BLOG_PATH}/`, "").replace(".md", ""));

  // Fetch frontmatter for each file (in batches of 20 to avoid rate limits)
  const posts: Array<Record<string, unknown>> = [];
  const batchSize = 20;

  for (let i = 0; i < blogFiles.length; i += batchSize) {
    const batch = blogFiles.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (slug) => {
        const res = await githubFetch(
          `/repos/${env.GITHUB_REPO}/contents/${BLOG_PATH}/${slug}.md?ref=${branch}`,
          env
        );
        if (!res.ok) return null;
        const data: { content: string; sha: string } = await res.json();
        const content = atob(data.content.replace(/\n/g, ""));
        const { frontmatter } = parseFrontmatter(content);
        return {
          slug,
          sha: data.sha,
          title: frontmatter.title || slug,
          description: frontmatter.description || "",
          pubDate: frontmatter.pubDate || "",
          authorName: frontmatter.authorName || "",
          draft: frontmatter.draft === true,
          featured: frontmatter.featured === true,
          noindex: frontmatter.noindex === true,
          categories: Array.isArray(frontmatter.categories) ? frontmatter.categories : [],
          image: frontmatter.image || "",
        };
      })
    );
    posts.push(...results.filter(Boolean) as Array<Record<string, unknown>>);
  }

  // Sort by date descending
  posts.sort((a, b) => {
    const da = new Date(a.pubDate as string).getTime() || 0;
    const db = new Date(b.pubDate as string).getTime() || 0;
    return db - da;
  });

  return jsonResponse({ posts, total: posts.length }, 200, origin);
}

async function handleGetPost(slug: string, env: Env, origin?: string): Promise<Response> {
  const branch = env.GITHUB_BRANCH || "staging";
  const res = await githubFetch(
    `/repos/${env.GITHUB_REPO}/contents/${BLOG_PATH}/${slug}.md?ref=${branch}`,
    env
  );
  if (!res.ok) return errorResponse("Post not found", 404, origin);

  const data: { content: string; sha: string } = await res.json();
  const content = atob(data.content.replace(/\n/g, ""));
  const { frontmatter, body } = parseFrontmatter(content);

  return jsonResponse({
    slug,
    sha: data.sha,
    body,
    ...frontmatter,
    categories: Array.isArray(frontmatter.categories) ? frontmatter.categories : [],
    draft: frontmatter.draft === true,
    featured: frontmatter.featured === true,
    noindex: frontmatter.noindex === true,
  }, 200, origin);
}

async function handleCreatePost(request: Request, env: Env, origin?: string): Promise<Response> {
  const { slug, frontmatter, body } = await request.json() as {
    slug: string;
    frontmatter: Record<string, unknown>;
    body: string;
  };

  if (!slug || !frontmatter.title) {
    return errorResponse("Slug and title are required", 400, origin);
  }

  const branch = env.GITHUB_BRANCH || "staging";
  const content = serializeFrontmatter(frontmatter, body);
  const encoded = btoa(unescape(encodeURIComponent(content)));

  const res = await githubFetch(
    `/repos/${env.GITHUB_REPO}/contents/${BLOG_PATH}/${slug}.md`,
    env,
    {
      method: "PUT",
      body: JSON.stringify({
        message: `Add blog post: ${frontmatter.title}`,
        content: encoded,
        branch,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return errorResponse(`Failed to create post: ${JSON.stringify(err)}`, 500, origin);
  }

  return jsonResponse({ slug }, 201, origin);
}

async function handleUpdatePost(slug: string, request: Request, env: Env, origin?: string): Promise<Response> {
  const { frontmatter, body, sha } = await request.json() as {
    frontmatter: Record<string, unknown>;
    body: string;
    sha: string;
  };

  if (!sha) return errorResponse("SHA is required for update", 400, origin);

  const branch = env.GITHUB_BRANCH || "staging";
  const content = serializeFrontmatter(frontmatter, body);
  const encoded = btoa(unescape(encodeURIComponent(content)));

  const res = await githubFetch(
    `/repos/${env.GITHUB_REPO}/contents/${BLOG_PATH}/${slug}.md`,
    env,
    {
      method: "PUT",
      body: JSON.stringify({
        message: `Update blog post: ${frontmatter.title || slug}`,
        content: encoded,
        sha,
        branch,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return errorResponse(`Failed to update post: ${JSON.stringify(err)}`, 500, origin);
  }

  return jsonResponse({ slug }, 200, origin);
}

async function handleDeletePost(slug: string, request: Request, env: Env, origin?: string): Promise<Response> {
  const { sha } = await request.json() as { sha: string };
  if (!sha) return errorResponse("SHA is required for delete", 400, origin);

  const branch = env.GITHUB_BRANCH || "staging";
  const res = await githubFetch(
    `/repos/${env.GITHUB_REPO}/contents/${BLOG_PATH}/${slug}.md`,
    env,
    {
      method: "DELETE",
      body: JSON.stringify({
        message: `Delete blog post: ${slug}`,
        sha,
        branch,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return errorResponse(`Failed to delete post: ${JSON.stringify(err)}`, 500, origin);
  }

  return jsonResponse({ ok: true }, 200, origin);
}

async function handleImageUpload(request: Request, env: Env, origin?: string): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) return errorResponse("No file provided", 400, origin);

  // Generate a unique filename
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").replace(/\.[^.]+$/, "");
  const filename = `${safeName}-${timestamp}.${ext}`;

  const buffer = await file.arrayBuffer();
  const encoded = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  const branch = env.GITHUB_BRANCH || "staging";
  const res = await githubFetch(
    `/repos/${env.GITHUB_REPO}/contents/${IMAGE_PATH}/${filename}`,
    env,
    {
      method: "PUT",
      body: JSON.stringify({
        message: `Upload blog image: ${filename}`,
        content: encoded,
        branch,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return errorResponse(`Upload failed: ${JSON.stringify(err)}`, 500, origin);
  }

  return jsonResponse({ url: `/images/blog/${filename}` }, 201, origin);
}

async function handleDeploy(env: Env, origin?: string): Promise<Response> {
  if (!env.DEPLOY_HOOK_URL) {
    return errorResponse("Deploy hook not configured", 500, origin);
  }

  const res = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });
  if (!res.ok) {
    return errorResponse("Deploy trigger failed", 500, origin);
  }

  return jsonResponse({ ok: true }, 200, origin);
}

// ─── Main fetch handler ────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || undefined;

    // Handle CORS preflight for all /api/ routes
    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // ── Documentation passthrough ──
    if (url.pathname === "/docs" || url.pathname.startsWith("/docs/")) {
      return proxyDocsRequest(request);
    }

    // ── Voice agent proxy (existing) ──
    if (url.pathname === "/api/voice-agent") {
      if (request.method === "POST") {
        const body = await request.text();
        const upstream = await fetch(VOICE_AGENT_UPSTREAM, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://www.plivo.com",
          },
          body,
        });

        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type":
              upstream.headers.get("Content-Type") || "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    if (url.pathname === "/api/forms/validate-email") {
      return handleValidateEmail(request, env, getFormOrigin(request));
    }

    if (url.pathname === "/api/forms/submit") {
      return handleFormSubmit(request, env, getFormOrigin(request));
    }

    // ── CMS: Auth (no JWT required) ──
    if (url.pathname === "/api/cms/auth") {
      return handleAuth(request, env, origin);
    }

    // ── CMS: All other routes require JWT ──
    if (url.pathname.startsWith("/api/cms/")) {
      const authHeader = request.headers.get("Authorization");
      const token = authHeader?.replace("Bearer ", "");
      if (!token || !(await verifyJWT(token, env.CMS_JWT_SECRET))) {
        return errorResponse("Unauthorized", 401, origin);
      }

      // POST /api/cms/posts - Create
      if (url.pathname === "/api/cms/posts" && request.method === "POST") {
        return handleCreatePost(request, env, origin);
      }

      // GET /api/cms/posts - List
      if (url.pathname === "/api/cms/posts" && request.method === "GET") {
        return handleListPosts(env, origin);
      }

      // POST /api/cms/upload
      if (url.pathname === "/api/cms/upload" && request.method === "POST") {
        return handleImageUpload(request, env, origin);
      }

      // POST /api/cms/deploy
      if (url.pathname === "/api/cms/deploy" && request.method === "POST") {
        return handleDeploy(env, origin);
      }

      // Routes with slug: /api/cms/posts/:slug
      const slugMatch = url.pathname.match(/^\/api\/cms\/posts\/(.+)$/);
      if (slugMatch) {
        const slug = decodeURIComponent(slugMatch[1]);

        if (request.method === "GET") return handleGetPost(slug, env, origin);
        if (request.method === "PUT") return handleUpdatePost(slug, request, env, origin);
        if (request.method === "DELETE") return handleDeletePost(slug, request, env, origin);
      }

      return errorResponse("Not found", 404, origin);
    }

    // ── Signup redirect ──
    const normalizedPath = url.pathname.replace(/\/+$/, "");
    if (normalizedPath === "/signup") {
      return Response.redirect("https://cx.plivo.com/signup", 302);
    }

    // Serve static assets, injecting geo-country for HTML pages
    const response = await env.ASSETS.fetch(request);

    // Only transform HTML responses
    const contentType = response.headers.get("Content-Type") || "";
    if (!contentType.includes("text/html")) return response;

    const country = request.headers.get("CF-IPCountry") || "XX";

    // Always inject country code into <head> so client JS can read it instantly.
    // Use "XX" as sentinel when CF-IPCountry is missing so the client knows
    // the Worker ran but geo was unavailable (vs not injected at all).
    return new HTMLRewriter()
      .on("head", {
        element(el) {
          el.prepend(
            `<script>window.__CF_COUNTRY="${country}"</script>`,
            { html: true }
          );
        },
      })
      .transform(response);
  },
};
