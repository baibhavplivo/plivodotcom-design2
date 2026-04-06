const UPSTREAM = "https://plivo-static-forms.netlify.app/.netlify/functions/voice-agent";

const ALLOWED_ORIGINS = [
  "https://www.plivo.com",
  "https://plivo.com",
  "https://dev-plivo.plivops.com",
];

function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  const body = await request.text();
  const allowedOrigin = getAllowedOrigin(request);

  const upstream = await fetch(UPSTREAM, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://www.plivo.com" },
    body,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") || "application/json",
      "Access-Control-Allow-Origin": allowedOrigin,
    },
  });
};

export const onRequestOptions: PagesFunction = async ({ request }) => {
  const allowedOrigin = getAllowedOrigin(request);
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
