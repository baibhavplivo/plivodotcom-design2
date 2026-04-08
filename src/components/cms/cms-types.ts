export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  authorName?: string;
  authorBio?: string;
  authorImage?: string;
  image?: string;
  thumbnail?: string;
  draft: boolean;
  featured: boolean;
  noindex: boolean;
  categories: string[];
  seoTitle?: string;
  seoDescription?: string;
  keyTakeaways?: string;
  webflowItemId?: string;
}

export interface BlogPost extends BlogPostMeta {
  body: string;
  sha: string; // GitHub file SHA for updates
}

export interface PostListResponse {
  posts: BlogPostMeta[];
  total: number;
}

export interface AuthResponse {
  token: string;
  expiresAt: number;
}

export interface ApiError {
  error: string;
  status: number;
}

export type CmsView = "login" | "dashboard" | "editor";

export interface EditorState {
  slug?: string; // undefined = new post
}
