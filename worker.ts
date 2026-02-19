const VOICE_AGENT_UPSTREAM =
  "https://plivo-static-forms.netlify.app/.netlify/functions/voice-agent";

const GITHUB_API = "https://api.github.com";
const BLOG_PATH = "src/content/blog";
const IMAGE_PATH = "public/images/blog";
const JWT_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CMS_PASSWORD: string;
  CMS_JWT_SECRET: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string; // e.g. "org/repo"
  GITHUB_BRANCH?: string; // defaults to "staging"
  DEPLOY_HOOK_URL?: string;
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

    // ── Voice agent proxy (existing) ──
    if (url.pathname === "/api/voice-agent") {
      if (request.method === "POST") {
        const body = await request.text();
        const upstream = await fetch(VOICE_AGENT_UPSTREAM, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://plivo.com",
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

    // Serve static assets for everything else
    return env.ASSETS.fetch(request);
  },
};
