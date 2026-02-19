import { useRef, useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { getPost, createPost, updatePost } from "./cms-api";
import type { BlogPost } from "./cms-types";
import CmsImageUpload from "./CmsImageUpload";
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  LinkIcon,
  ImageIcon,
  Quote,
  Code,
  List,
  ListOrdered,
  Minus,
  Undo2,
  Redo2,
  Plus,
  X,
} from "lucide-react";

interface CmsEditorProps {
  slug?: string; // undefined = new post
  onBack: () => void;
}

const INITIAL_FRONTMATTER = {
  title: "",
  description: "",
  pubDate: new Date().toISOString().split("T")[0],
  updatedDate: "",
  authorName: "Team Plivo",
  image: "",
  thumbnail: "",
  draft: true,
  featured: false,
  noindex: false,
  categories: [] as string[],
  seoTitle: "",
  seoDescription: "",
  keyTakeaways: "",
};

export default function CmsEditor({ slug, onBack }: CmsEditorProps) {
  const [loading, setLoading] = useState(!!slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sha, setSha] = useState("");
  const [postSlug, setPostSlug] = useState(slug || "");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageTarget, setImageTarget] = useState<"editor" | "featured" | "thumbnail">("editor");
  const [newCategory, setNewCategory] = useState("");

  // Frontmatter fields
  const [fm, setFm] = useState({ ...INITIAL_FRONTMATTER });

  const updateFm = useCallback((key: string, value: unknown) => {
    setFm((prev) => ({ ...prev, [key]: value }));
  }, []);

  // TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose max-w-none min-h-[400px] px-4 py-3 outline-none focus:outline-none",
      },
    },
  });

  // Load post data
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const post = await getPost(slug);
        setFm({
          title: post.title || "",
          description: post.description || "",
          pubDate: post.pubDate ? post.pubDate.split("T")[0] : "",
          updatedDate: post.updatedDate ? post.updatedDate.split("T")[0] : "",
          authorName: post.authorName || "",
          image: post.image || "",
          thumbnail: post.thumbnail || "",
          draft: post.draft,
          featured: post.featured,
          noindex: post.noindex,
          categories: post.categories || [],
          seoTitle: post.seoTitle || "",
          seoDescription: post.seoDescription || "",
          keyTakeaways: post.keyTakeaways || "",
        });
        setSha(post.sha);
        setPostSlug(slug);
        if (editor) {
          editor.commands.setContent(post.body || "");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, editor]);

  // Auto-generate slug from title
  useEffect(() => {
    if (slug) return; // Don't auto-generate for existing posts
    const generated = fm.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);
    setPostSlug(generated);
  }, [fm.title, slug]);

  const handleSave = useCallback(
    async (asDraft: boolean) => {
      if (!postSlug) {
        setError("Slug is required");
        return;
      }
      if (!fm.title) {
        setError("Title is required");
        return;
      }

      setSaving(true);
      setError("");
      setSuccess("");

      const frontmatter: Record<string, unknown> = {
        title: fm.title,
        description: fm.description,
        pubDate: fm.pubDate ? new Date(fm.pubDate).toISOString() : new Date().toISOString(),
        authorName: fm.authorName,
        draft: asDraft,
        featured: fm.featured,
        noindex: fm.noindex,
        categories: fm.categories,
      };

      // Only include optional fields if they have values
      if (fm.updatedDate) frontmatter.updatedDate = new Date(fm.updatedDate).toISOString();
      if (fm.image) frontmatter.image = fm.image;
      if (fm.thumbnail) frontmatter.thumbnail = fm.thumbnail;
      if (fm.seoTitle) frontmatter.seoTitle = fm.seoTitle;
      if (fm.seoDescription) frontmatter.seoDescription = fm.seoDescription;
      if (fm.keyTakeaways) frontmatter.keyTakeaways = fm.keyTakeaways;

      const body = editor?.getHTML() || "";

      try {
        if (sha) {
          await updatePost(postSlug, frontmatter, body, sha);
        } else {
          await createPost(postSlug, frontmatter, body);
        }
        setSuccess(asDraft ? "Saved as draft" : "Published!");
        updateFm("draft", asDraft);

        // Refetch to get new SHA
        if (sha || !slug) {
          const updated = await getPost(postSlug);
          setSha(updated.sha);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSaving(false);
      }
    },
    [postSlug, fm, editor, sha, slug, updateFm]
  );

  // Native event listeners for buttons
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const publishBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const backBtn = backBtnRef.current;
    const saveBtn = saveBtnRef.current;
    const publishBtn = publishBtnRef.current;

    const handleBack = () => onBack();
    const handleSaveClick = () => handleSave(true);
    const handlePublish = () => handleSave(false);

    backBtn?.addEventListener("click", handleBack);
    saveBtn?.addEventListener("click", handleSaveClick);
    publishBtn?.addEventListener("click", handlePublish);

    return () => {
      backBtn?.removeEventListener("click", handleBack);
      saveBtn?.removeEventListener("click", handleSaveClick);
      publishBtn?.removeEventListener("click", handlePublish);
    };
  }, [onBack, handleSave]);

  // Toolbar handlers
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar || !editor) return;

    const handleToolbar = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-tool]") as HTMLElement | null;
      if (!btn) return;

      const tool = btn.getAttribute("data-tool");
      switch (tool) {
        case "bold":
          editor.chain().focus().toggleBold().run();
          break;
        case "italic":
          editor.chain().focus().toggleItalic().run();
          break;
        case "h2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "h3":
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case "link": {
          const url = prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
          break;
        }
        case "image":
          setImageTarget("editor");
          setShowImageUpload(true);
          break;
        case "blockquote":
          editor.chain().focus().toggleBlockquote().run();
          break;
        case "code":
          editor.chain().focus().toggleCodeBlock().run();
          break;
        case "bullet-list":
          editor.chain().focus().toggleBulletList().run();
          break;
        case "ordered-list":
          editor.chain().focus().toggleOrderedList().run();
          break;
        case "hr":
          editor.chain().focus().setHorizontalRule().run();
          break;
        case "undo":
          editor.chain().focus().undo().run();
          break;
        case "redo":
          editor.chain().focus().redo().run();
          break;
      }
    };

    toolbar.addEventListener("click", handleToolbar);
    return () => toolbar.removeEventListener("click", handleToolbar);
  }, [editor]);

  // Category management
  const catInputRef = useRef<HTMLInputElement>(null);
  const addCatBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const input = catInputRef.current;
    const btn = addCatBtnRef.current;

    const addCategory = () => {
      const val = newCategory.trim().toLowerCase();
      if (val && !fm.categories.includes(val)) {
        updateFm("categories", [...fm.categories, val]);
        setNewCategory("");
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCategory();
      }
    };
    const handleClick = () => addCategory();

    input?.addEventListener("keydown", handleKeydown);
    btn?.addEventListener("click", handleClick);

    return () => {
      input?.removeEventListener("keydown", handleKeydown);
      btn?.removeEventListener("click", handleClick);
    };
  }, [newCategory, fm.categories, updateFm]);

  // Remove category handler
  useEffect(() => {
    const handleRemoveCat = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-remove-cat]") as HTMLElement | null;
      if (btn) {
        const cat = btn.getAttribute("data-remove-cat");
        updateFm("categories", fm.categories.filter((c) => c !== cat));
      }
    };

    document.addEventListener("click", handleRemoveCat);
    return () => document.removeEventListener("click", handleRemoveCat);
  }, [fm.categories, updateFm]);

  // Image upload callback
  const handleImageUpload = (url: string) => {
    if (imageTarget === "featured") {
      updateFm("image", url);
    } else if (imageTarget === "thumbnail") {
      updateFm("thumbnail", url);
    } else if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setShowImageUpload(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-3 text-sm text-gray-500">Loading post...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            ref={backBtnRef}
            className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            {error && (
              <span className="text-sm text-red-500">{error}</span>
            )}
            {success && (
              <span className="text-sm text-green-600">{success}</span>
            )}
            <button
              ref={saveBtnRef}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Draft
            </button>
            <button
              ref={publishBtnRef}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Publish
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left sidebar - Frontmatter fields */}
          <div className="w-full shrink-0 lg:w-80">
            <div className="sticky top-20 space-y-4 rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-sora text-sm font-semibold text-gray-900">
                Post Settings
              </h3>

              {/* Title */}
              <FieldInput
                label="Title"
                value={fm.title}
                onChange={(v) => updateFm("title", v)}
                required
              />

              {/* Slug */}
              <FieldInput
                label="Slug"
                value={postSlug}
                onChange={setPostSlug}
                disabled={!!slug}
                hint={slug ? "Cannot change slug for existing posts" : "Auto-generated from title"}
              />

              {/* Description */}
              <FieldTextarea
                label="Description"
                value={fm.description}
                onChange={(v) => updateFm("description", v)}
                rows={3}
              />

              {/* Author */}
              <FieldInput
                label="Author"
                value={fm.authorName}
                onChange={(v) => updateFm("authorName", v)}
              />

              {/* Publish Date */}
              <FieldInput
                label="Publish Date"
                type="date"
                value={fm.pubDate}
                onChange={(v) => updateFm("pubDate", v)}
              />

              {/* Categories */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Categories
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                  {fm.categories.map((cat) => (
                    <span
                      key={cat}
                      className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {cat}
                      <button
                        data-remove-cat={cat}
                        className="ml-0.5 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-1">
                  <input
                    ref={catInputRef}
                    type="text"
                    value={newCategory}
                    placeholder="Add category"
                    className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button
                    ref={addCatBtnRef}
                    className="rounded-md border border-gray-300 p-1 text-gray-500 hover:bg-gray-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Featured Image URL
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={fm.image}
                    className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    onChange={(e) => updateFm("image", e.target.value)}
                    placeholder="URL or upload"
                  />
                  <button
                    className="rounded-md border border-gray-300 p-1 text-gray-500 hover:bg-gray-50"
                    data-upload-target="featured"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <FieldToggle
                  label="Draft"
                  checked={fm.draft}
                  onChange={(v) => updateFm("draft", v)}
                />
                <FieldToggle
                  label="Featured"
                  checked={fm.featured}
                  onChange={(v) => updateFm("featured", v)}
                />
                <FieldToggle
                  label="No-index"
                  checked={fm.noindex}
                  onChange={(v) => updateFm("noindex", v)}
                />
              </div>

              {/* SEO */}
              <div className="border-t border-gray-100 pt-3">
                <h4 className="mb-2 text-xs font-semibold text-gray-500 uppercase">
                  SEO
                </h4>
                <div className="space-y-3">
                  <FieldInput
                    label="SEO Title"
                    value={fm.seoTitle}
                    onChange={(v) => updateFm("seoTitle", v)}
                    placeholder="Override page title"
                  />
                  <FieldTextarea
                    label="SEO Description"
                    value={fm.seoDescription}
                    onChange={(v) => updateFm("seoDescription", v)}
                    rows={2}
                    placeholder="Override meta description"
                  />
                  <FieldTextarea
                    label="Key Takeaways"
                    value={fm.keyTakeaways}
                    onChange={(v) => updateFm("keyTakeaways", v)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main editor */}
          <div className="flex-1">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              {/* Toolbar */}
              <div
                ref={toolbarRef}
                className="flex flex-wrap gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5"
              >
                <ToolbarButton tool="bold" icon={<Bold className="h-4 w-4" />} title="Bold" active={editor?.isActive("bold")} />
                <ToolbarButton tool="italic" icon={<Italic className="h-4 w-4" />} title="Italic" active={editor?.isActive("italic")} />
                <ToolbarDivider />
                <ToolbarButton tool="h2" icon={<Heading2 className="h-4 w-4" />} title="Heading 2" active={editor?.isActive("heading", { level: 2 })} />
                <ToolbarButton tool="h3" icon={<Heading3 className="h-4 w-4" />} title="Heading 3" active={editor?.isActive("heading", { level: 3 })} />
                <ToolbarDivider />
                <ToolbarButton tool="link" icon={<LinkIcon className="h-4 w-4" />} title="Link" active={editor?.isActive("link")} />
                <ToolbarButton tool="image" icon={<ImageIcon className="h-4 w-4" />} title="Image" />
                <ToolbarDivider />
                <ToolbarButton tool="blockquote" icon={<Quote className="h-4 w-4" />} title="Blockquote" active={editor?.isActive("blockquote")} />
                <ToolbarButton tool="code" icon={<Code className="h-4 w-4" />} title="Code Block" active={editor?.isActive("codeBlock")} />
                <ToolbarDivider />
                <ToolbarButton tool="bullet-list" icon={<List className="h-4 w-4" />} title="Bullet List" active={editor?.isActive("bulletList")} />
                <ToolbarButton tool="ordered-list" icon={<ListOrdered className="h-4 w-4" />} title="Ordered List" active={editor?.isActive("orderedList")} />
                <ToolbarButton tool="hr" icon={<Minus className="h-4 w-4" />} title="Horizontal Rule" />
                <ToolbarDivider />
                <ToolbarButton tool="undo" icon={<Undo2 className="h-4 w-4" />} title="Undo" />
                <ToolbarButton tool="redo" icon={<Redo2 className="h-4 w-4" />} title="Redo" />
              </div>

              {/* Editor content */}
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </main>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <CmsImageUpload
          onUpload={handleImageUpload}
          onClose={() => setShowImageUpload(false)}
        />
      )}

      {/* Featured/thumbnail image upload handler */}
      <UploadTargetHandler
        onTargetClick={(target) => {
          setImageTarget(target as "featured" | "thumbnail");
          setShowImageUpload(true);
        }}
      />
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  disabled,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 disabled:bg-gray-50 disabled:text-gray-500"
      />
      {hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
      />
    </div>
  );
}

function FieldToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;
    const handle = () => onChange(!checked);
    btn.addEventListener("click", handle);
    return () => btn.removeEventListener("click", handle);
  }, [checked, onChange]);

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-700">{label}</span>
      <button
        ref={ref}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </button>
    </div>
  );
}

function ToolbarButton({
  tool,
  icon,
  title,
  active,
}: {
  tool: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      data-tool={tool}
      title={title}
      className={`rounded p-1.5 transition-colors ${
        active
          ? "bg-gray-200 text-gray-900"
          : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      }`}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-6 w-px bg-gray-200" />;
}

function UploadTargetHandler({
  onTargetClick,
}: {
  onTargetClick: (target: string) => void;
}) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-upload-target]") as HTMLElement | null;
      if (btn) {
        const target = btn.getAttribute("data-upload-target") || "editor";
        onTargetClick(target);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onTargetClick]);

  return null;
}
