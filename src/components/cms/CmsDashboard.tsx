import { useRef, useEffect, useState, useCallback } from "react";
import { listPosts, deletePost, triggerDeploy, logout } from "./cms-api";
import type { BlogPostMeta } from "./cms-types";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Loader2,
} from "lucide-react";

interface CmsDashboardProps {
  onEdit: (slug: string) => void;
  onNew: () => void;
  onLogout: () => void;
}

type FilterTab = "all" | "published" | "drafts";

const POSTS_PER_PAGE = 20;

export default function CmsDashboard({ onEdit, onNew, onLogout }: CmsDashboardProps) {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FilterTab>("all");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const newBtnRef = useRef<HTMLButtonElement>(null);
  const logoutBtnRef = useRef<HTMLButtonElement>(null);
  const deployBtnRef = useRef<HTMLButtonElement>(null);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listPosts();
      setPosts(data.posts as unknown as BlogPostMeta[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filter & search
  useEffect(() => {
    let result = posts;

    if (tab === "published") result = result.filter((p) => !p.draft);
    else if (tab === "drafts") result = result.filter((p) => p.draft);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q)) ||
          (p.authorName || "").toLowerCase().includes(q)
      );
    }

    setFilteredPosts(result);
    setPage(1);
  }, [posts, tab, search]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // Native event listeners for buttons
  useEffect(() => {
    const newBtn = newBtnRef.current;
    const logoutBtn = logoutBtnRef.current;
    const deployBtn = deployBtnRef.current;
    const searchInput = searchRef.current;

    const handleNew = () => onNew();
    const handleLogout = () => {
      logout();
      onLogout();
    };
    const handleDeploy = async () => {
      setDeploying(true);
      try {
        await triggerDeploy();
        alert("Deploy triggered! Changes will be live in ~2-3 minutes.");
      } catch {
        alert("Deploy trigger failed. Check deploy hook configuration.");
      } finally {
        setDeploying(false);
      }
    };
    const handleSearch = (e: Event) => {
      setSearch((e.target as HTMLInputElement).value);
    };

    newBtn?.addEventListener("click", handleNew);
    logoutBtn?.addEventListener("click", handleLogout);
    deployBtn?.addEventListener("click", handleDeploy);
    searchInput?.addEventListener("input", handleSearch);

    return () => {
      newBtn?.removeEventListener("click", handleNew);
      logoutBtn?.removeEventListener("click", handleLogout);
      deployBtn?.removeEventListener("click", handleDeploy);
      searchInput?.removeEventListener("input", handleSearch);
    };
  }, [onNew, onLogout]);

  const handleDelete = async (slug: string, sha: string) => {
    try {
      await deletePost(slug, sha);
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setDeleteConfirm(null);
    } catch {
      alert("Failed to delete post");
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <h1 className="font-sora text-lg font-semibold text-gray-900">
              Blog CMS
            </h1>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {posts.length} posts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              ref={newBtnRef}
              className="flex items-center gap-1.5 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors cta-hover-gradient"
            >
              <Plus className="h-4 w-4" />
              New Post
            </button>
            <button
              ref={logoutBtnRef}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Search & filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search posts..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-1 rounded-md border border-gray-200 bg-white p-0.5">
            {(["all", "published", "drafts"] as FilterTab[]).map((t) => (
              <button
                key={t}
                className={`rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  tab === t
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                data-tab={t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-3 text-sm text-gray-500">Loading posts...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Posts table */}
        {!loading && !error && (
          <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Title
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                      Author
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                      Categories
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedPosts.map((post) => (
                    <tr
                      key={post.slug}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="max-w-xs truncate px-4 py-3 text-sm font-medium text-gray-900">
                        {post.title}
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-gray-500 md:table-cell">
                        {post.authorName || "—"}
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-gray-500 sm:table-cell">
                        {formatDate(post.pubDate)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            post.draft
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {post.draft ? "Draft" : "Published"}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {post.categories.slice(0, 3).map((cat) => (
                            <span
                              key={cat}
                              className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600"
                            >
                              {cat}
                            </span>
                          ))}
                          {post.categories.length > 3 && (
                            <span className="text-xs text-gray-400">
                              +{post.categories.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            title="Edit"
                            data-action="edit"
                            data-slug={post.slug}
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            title="View on site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          {deleteConfirm === post.slug ? (
                            <div className="flex items-center gap-1">
                              <button
                                className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                                data-action="confirm-delete"
                                data-slug={post.slug}
                              >
                                Confirm
                              </button>
                              <button
                                className="rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                                data-action="cancel-delete"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                              title="Delete"
                              data-action="delete"
                              data-slug={post.slug}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {paginatedPosts.length === 0 && (
                <div className="py-12 text-center text-sm text-gray-500">
                  {search ? "No posts match your search." : "No posts found."}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {(page - 1) * POSTS_PER_PAGE + 1}–
                  {Math.min(page * POSTS_PER_PAGE, filteredPosts.length)} of{" "}
                  {filteredPosts.length}
                </p>
                <div className="flex gap-1">
                  <button
                    disabled={page === 1}
                    className="rounded-md border border-gray-300 p-1.5 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30"
                    data-action="prev-page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    disabled={page === totalPages}
                    className="rounded-md border border-gray-300 p-1.5 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30"
                    data-action="next-page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Table event delegation via native listener */}
      <TableActions
        posts={posts}
        onEdit={onEdit}
        onDelete={handleDelete}
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        tab={tab}
        setTab={setTab}
      />
    </div>
  );
}

// Separate component for native event delegation on table actions
function TableActions({
  posts,
  onEdit,
  onDelete,
  deleteConfirm,
  setDeleteConfirm,
  page,
  setPage,
  totalPages,
  tab,
  setTab,
}: {
  posts: BlogPostMeta[];
  onEdit: (slug: string) => void;
  onDelete: (slug: string, sha: string) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (slug: string | null) => void;
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  tab: FilterTab;
  setTab: (t: FilterTab) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("[data-action]") as HTMLElement | null;
      const tabButton = target.closest("[data-tab]") as HTMLElement | null;

      if (tabButton) {
        const t = tabButton.getAttribute("data-tab") as FilterTab;
        if (t) setTab(t);
        return;
      }

      if (!button) return;

      const action = button.getAttribute("data-action");
      const slug = button.getAttribute("data-slug") || "";

      switch (action) {
        case "edit":
          onEdit(slug);
          break;
        case "delete":
          setDeleteConfirm(slug);
          break;
        case "confirm-delete": {
          const post = posts.find((p) => p.slug === slug);
          if (post) onDelete(slug, (post as any).sha || "");
          break;
        }
        case "cancel-delete":
          setDeleteConfirm(null);
          break;
        case "prev-page":
          if (page > 1) setPage(page - 1);
          break;
        case "next-page":
          if (page < totalPages) setPage(page + 1);
          break;
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [posts, onEdit, onDelete, deleteConfirm, setDeleteConfirm, page, setPage, totalPages, tab, setTab]);

  return <div ref={containerRef} />;
}
