import type { AuthResponse, BlogPost, PostListResponse } from "./cms-types";

const TOKEN_KEY = "cms_token";
const EXPIRES_KEY = "cms_expires";

// In dev, Worker runs on :8787. In production, same origin.
function getApiBase(): string {
  if (typeof window === "undefined") return "";
  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8787";
  }
  return "";
}

function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expires = localStorage.getItem(EXPIRES_KEY);
  if (!token || !expires) return null;
  if (Date.now() > Number(expires)) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    return null;
  }
  return token;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = getApiBase();
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${base}${path}`, { ...options, headers });

  if (res.status === 401) {
    logout();
    window.location.hash = "#login";
    throw new Error("Session expired");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error: ${res.status}`);
  }

  return res.json();
}

export async function login(password: string, turnstileToken?: string): Promise<void> {
  const data = await apiFetch<AuthResponse>("/api/cms/auth", {
    method: "POST",
    body: JSON.stringify({ password, turnstileToken }),
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(EXPIRES_KEY, String(data.expiresAt));
}

export async function listPosts(): Promise<PostListResponse> {
  return apiFetch<PostListResponse>("/api/cms/posts");
}

export async function getPost(slug: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/api/cms/posts/${encodeURIComponent(slug)}`);
}

export async function createPost(
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string
): Promise<{ slug: string }> {
  return apiFetch<{ slug: string }>("/api/cms/posts", {
    method: "POST",
    body: JSON.stringify({ slug, frontmatter, body }),
  });
}

export async function updatePost(
  slug: string,
  frontmatter: Record<string, unknown>,
  body: string,
  sha: string
): Promise<{ slug: string }> {
  return apiFetch<{ slug: string }>(
    `/api/cms/posts/${encodeURIComponent(slug)}`,
    {
      method: "PUT",
      body: JSON.stringify({ frontmatter, body, sha }),
    }
  );
}

export async function deletePost(
  slug: string,
  sha: string
): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(
    `/api/cms/posts/${encodeURIComponent(slug)}`,
    {
      method: "DELETE",
      body: JSON.stringify({ sha }),
    }
  );
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const base = getApiBase();
  const token = getToken();
  const res = await fetch(`${base}/api/cms/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Upload failed");
  }
  return res.json();
}

export async function triggerDeploy(): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/api/cms/deploy", { method: "POST" });
}

export async function fetchGoogleDoc(url: string): Promise<{ html: string; title: string }> {
  return apiFetch<{ html: string; title: string }>("/api/cms/fetch-gdoc", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export interface AuthorProfile {
  id: string;
  name: string;
  bio: string;
  image: string;
}

export async function listAuthors(): Promise<{ authors: AuthorProfile[]; sha?: string }> {
  return apiFetch<{ authors: AuthorProfile[]; sha?: string }>("/api/cms/authors");
}

export async function saveAuthors(
  authors: AuthorProfile[],
  sha?: string
): Promise<{ ok: boolean; sha: string }> {
  return apiFetch<{ ok: boolean; sha: string }>("/api/cms/authors", {
    method: "POST",
    body: JSON.stringify({ authors, sha }),
  });
}
