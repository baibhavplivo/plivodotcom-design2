const VOICE_AGENT_UPSTREAM =
  "https://plivo-static-forms.netlify.app/.netlify/functions/voice-agent";

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle /api/voice-agent proxy
    if (url.pathname === "/api/voice-agent") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
          },
        });
      }

      if (request.method === "POST") {
        const body = await request.text();
        const upstream = await fetch(VOICE_AGENT_UPSTREAM, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

    // Serve static assets for everything else
    return env.ASSETS.fetch(request);
  },
};
