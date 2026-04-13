import { useRef, useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { getPost, createPost, updatePost, listAuthors, saveAuthors } from "./cms-api";
import type { AuthorProfile } from "./cms-api";
import type { BlogPost } from "./cms-types";
import CmsImageUpload from "./CmsImageUpload";
import CmsDocImport from "./CmsDocImport";
import CmsBannerGenerator from "./CmsBannerGenerator";
import CmsPreview from "./CmsPreview";
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  Heading4,
  LinkIcon,
  ImageIcon,
  Quote,
  Code,
  Braces,
  List,
  ListOrdered,
  Minus,
  Undo2,
  Redo2,
  Plus,
  X,
  CodeXml,
  Table2,
  TableCellsMerge,
  Columns3,
  Rows3,
  Trash2,
  Wand2,
  ChevronRight,
  ChevronLeft,
  Search,
  FileText,
  Image as ImageLucide,
  CheckCircle2,
  Eye,
} from "lucide-react";

interface CmsEditorProps {
  slug?: string; // undefined = new post
  onBack: () => void;
}

const EXISTING_CATEGORIES = [
  "how-to", "sms-api", "voice-api", "customer-service", "ai", "sms-marketing",
  "sms", "company", "compare", "ai-agents", "phlo", "customer-experience",
  "voice", "industry-insights", "e-commerce-marketing", "phone-numbers-2",
  "mms", "ivr", "whatsapp-business-api", "node-js-sdk", "migration",
  "python-sdk", "net-sdk", "2fa", "use-cases", "security", "ruby-sdk",
  "php-sdk", "integration", "contact-center", "sip-trunking", "java-sdk",
  "go-sdk", "zentrunk", "cpaas", "chatbots", "verify-api",
  "fraud-prevention-2", "customer-satisfaction", "call-tracking",
  "customer-engagement", "compliance", "healthcare", "fintech",
  "retail", "education", "real-estate", "travel", "logistics",
  "rcs", "whatsapp", "conversational-ai", "cx-automation",
];

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
  imageAlt: "",
  authorBio: "",
  authorImage: "",
};

export default function CmsEditor({ slug, onBack }: CmsEditorProps) {
  const [loading, setLoading] = useState(!!slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sha, setSha] = useState("");
  const [postSlug, setPostSlug] = useState(slug || "");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showBannerGenerator, setShowBannerGenerator] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [authorImagePreview, setAuthorImagePreview] = useState("");
  const [imageTarget, setImageTarget] = useState<"editor" | "featured" | "thumbnail">("editor");
  const [newCategory, setNewCategory] = useState("");
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState("");
  const [lastEditMode, setLastEditMode] = useState<"wysiwyg" | "source">("wysiwyg");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [wordCount, setWordCount] = useState(0);
  const [authorProfiles, setAuthorProfiles] = useState<AuthorProfile[]>([]);
  const [authorsSha, setAuthorsSha] = useState("");
  const [authorMode, setAuthorMode] = useState<"select" | "create">("select");

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
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
    ],
    content: "",
    onUpdate: ({ editor: e }) => {
      const text = e.getText().trim();
      setWordCount(text ? text.split(/\s+/).filter(Boolean).length : 0);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose max-w-none w-full min-h-full px-4 py-3 outline-none focus:outline-none [&>*]:max-w-none",
      },
    },
  });

  // Load author profiles
  useEffect(() => {
    (async () => {
      try {
        const data = await listAuthors();
        setAuthorProfiles(data.authors || []);
        if (data.sha) setAuthorsSha(data.sha);
      } catch {
        // Authors file doesn't exist yet — that's ok
      }
    })();
  }, []);

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
          imageAlt: (post as any).imageAlt || "",
          authorBio: (post as any).authorBio || "",
          authorImage: (post as any).authorImage || "",
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
      // Validate required fields
      const errors: string[] = [];

      if (!fm.title.trim()) {
        errors.push("Title is required (Step 1)");
      }
      if (!postSlug.trim()) {
        errors.push("Slug is required (Step 1)");
      }

      // Only enforce these for publish, not draft
      if (!asDraft) {
        const body = lastEditMode === "source" ? sourceHtml : (editor?.getText() || "");
        if (!body.trim()) {
          errors.push("Blog content is empty (Step 1)");
        }
        if (!fm.description.trim()) {
          errors.push("Description is required for publishing (Step 2)");
        }
        if (fm.categories.length === 0) {
          errors.push("At least one category is required (Step 2)");
        }
        if (!fm.image) {
          errors.push("Cover image is required for publishing (Step 3)");
        }
      }

      if (errors.length > 0) {
        setError(errors.join(" · "));
        // Navigate to the step with the first error
        const firstError = errors[0];
        if (firstError.includes("Step 1")) setStep(1);
        else if (firstError.includes("Step 2")) setStep(2);
        else if (firstError.includes("Step 3")) setStep(3);
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
      if (fm.imageAlt) frontmatter.imageAlt = fm.imageAlt;
      if (fm.authorBio) frontmatter.authorBio = fm.authorBio;
      if (fm.authorImage) frontmatter.authorImage = fm.authorImage;

      // If user last edited in source mode, use raw HTML directly to preserve custom markup
      const body = lastEditMode === "source" ? sourceHtml : (editor?.getHTML() || "");

      try {
        if (sha) {
          await updatePost(postSlug, frontmatter, body, sha);
        } else {
          await createPost(postSlug, frontmatter, body);
        }
        setSuccess(asDraft ? "Saved as draft" : "Published!");
        updateFm("draft", asDraft);

        // Navigate back to dashboard after a brief delay
        setTimeout(() => onBack(), 1500);
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
      e.preventDefault(); // Prevent losing editor selection

      const tool = btn.getAttribute("data-tool");
      switch (tool) {
        case "bold":
          editor.chain().focus().toggleBold().run();
          break;
        case "italic":
          editor.chain().focus().toggleItalic().run();
          break;
        case "strikethrough":
          editor.chain().focus().toggleStrike().run();
          break;
        case "inline-code":
          editor.chain().focus().toggleCode().run();
          break;
        case "h2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "h3":
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case "h4":
          editor.chain().focus().toggleHeading({ level: 4 }).run();
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
        case "inline-code-block":
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
        case "insert-table":
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
          break;
        case "add-col":
          editor.chain().focus().addColumnAfter().run();
          break;
        case "add-row":
          editor.chain().focus().addRowAfter().run();
          break;
        case "delete-col":
          editor.chain().focus().deleteColumn().run();
          break;
        case "delete-row":
          editor.chain().focus().deleteRow().run();
          break;
        case "delete-table":
          editor.chain().focus().deleteTable().run();
          break;
        case "undo":
          editor.chain().focus().undo().run();
          break;
        case "redo":
          editor.chain().focus().redo().run();
          break;
        case "source": {
          if (!sourceMode) {
            // Entering source mode — capture current HTML
            const html = editor.getHTML();
            setSourceHtml(html);
            setSourceMode(true);
          } else {
            // Leaving source mode — load HTML back into editor
            const proceed = confirm(
              "Switching to visual mode may alter custom HTML (iframes, inline styles, etc). Continue?"
            );
            if (proceed) {
              editor.commands.setContent(sourceHtml);
              setSourceMode(false);
              setLastEditMode("wysiwyg");
            }
          }
          break;
        }
      }
    };

    const preventBlur = (e: MouseEvent) => e.preventDefault();
    toolbar.addEventListener("click", handleToolbar);
    toolbar.addEventListener("mousedown", preventBlur);
    return () => {
      toolbar.removeEventListener("click", handleToolbar);
      toolbar.removeEventListener("mousedown", preventBlur);
    };
  }, [editor, sourceMode, sourceHtml]);

  // Step navigation handlers
  useEffect(() => {
    const handleStepNav = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-nav]") as HTMLElement | null;
      if (btn) {
        const nav = btn.getAttribute("data-nav");
        if (nav === "next" && step < 4) { setStep((s) => (s + 1) as 1 | 2 | 3 | 4); setError(""); }
        if (nav === "prev" && step > 1) { setStep((s) => (s - 1) as 1 | 2 | 3 | 4); setError(""); }
      }
      const stepBtn = (e.target as HTMLElement).closest("[data-step]") as HTMLElement | null;
      if (stepBtn) {
        const num = Number(stepBtn.getAttribute("data-step")) as 1 | 2 | 3 | 4;
        if (num >= 1 && num <= 4) { setStep(num); setError(""); }
      }
      const actionBtn = (e.target as HTMLElement).closest("[data-action]") as HTMLElement | null;
      if (actionBtn) {
        const action = actionBtn.getAttribute("data-action");
        if (action === "publish-blog") handleSave(false);
        if (action === "save-draft-blog") handleSave(true);
      }
    };

    document.addEventListener("click", handleStepNav);
    return () => document.removeEventListener("click", handleStepNav);
  }, [step, handleSave]);

  // Source mode textarea listener
  const sourceTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = sourceTextareaRef.current;
    if (!textarea || !sourceMode) return;

    const handleInput = () => {
      setSourceHtml(textarea.value);
      setLastEditMode("source");
      const text = textarea.value.replace(/<[^>]*>/g, "").trim();
      setWordCount(text ? text.split(/\s+/).filter(Boolean).length : 0);
    };

    textarea.addEventListener("input", handleInput);
    return () => textarea.removeEventListener("input", handleInput);
  }, [sourceMode]);

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
  const handleImageUpload = (url: string, previewDataUrl?: string) => {
    const displayUrl = previewDataUrl || url;
    if (imageTarget === "featured") {
      updateFm("image", url);
      setImagePreview(displayUrl);
    } else if (imageTarget === "thumbnail") {
      updateFm("thumbnail", url);
    } else if ((imageTarget as string) === "author-photo") {
      updateFm("authorImage", url);
      if (previewDataUrl) setAuthorImagePreview(previewDataUrl);
    } else if (editor) {
      const altText = prompt("Image alt text (for accessibility):", "") || "";
      editor.chain().focus().setImage({ src: displayUrl, alt: altText }).run();
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
              className="flex items-center gap-1.5 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors cta-hover-gradient disabled:opacity-50"
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

      <main className="mx-auto max-w-5xl px-4 py-6 pb-20 sm:px-6">
        {/* Step indicators */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {[
            { num: 1, label: "Content", icon: <FileText className="h-4 w-4" /> },
            { num: 2, label: "SEO & Settings", icon: <Search className="h-4 w-4" /> },
            { num: 3, label: "Cover Image", icon: <ImageLucide className="h-4 w-4" /> },
            { num: 4, label: "Preview", icon: <Eye className="h-4 w-4" /> },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              {i > 0 && <div className={`h-px w-8 ${step >= s.num ? "bg-blue-400" : "bg-gray-200"}`} />}
              <button
                data-step={s.num}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  step === s.num
                    ? "bg-black text-white"
                    : step > s.num
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > s.num ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.icon}
                {s.label}
              </button>
            </div>
          ))}
        </div>

        {/* ──── STEP 1: Content ──── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
              <FieldInput
                label="Title"
                value={fm.title}
                onChange={(v) => updateFm("title", v)}
                required
              />
              <FieldInput
                label="Slug"
                value={postSlug}
                onChange={setPostSlug}
                hint={slug ? "Changing slug creates a new post at the new URL" : "Auto-generated from title — edit to customize"}
              />
              <FieldInput
                label="Publish Date"
                type="date"
                value={fm.pubDate}
                onChange={(v) => updateFm("pubDate", v)}
              />
            </div>

            {/* Import Doc + Editor */}
            <div className="flex items-center justify-between">
              <CmsDocImport
                onImport={(html, title) => {
                  const proceed = !editor?.getText().trim() || confirm("This will replace current editor content. Continue?");
                  if (proceed && editor) {
                    editor.commands.setContent(html);
                    setLastEditMode("wysiwyg");
                    if (title && !fm.title) {
                      updateFm("title", title);
                    }
                  }
                }}
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              {/* Toolbar */}
              <div
                ref={toolbarRef}
                className="flex flex-wrap gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5"
              >
                <ToolbarButton tool="bold" icon={<Bold className="h-4 w-4" />} title="Bold" active={editor?.isActive("bold")} />
                <ToolbarButton tool="italic" icon={<Italic className="h-4 w-4" />} title="Italic" active={editor?.isActive("italic")} />
                <ToolbarButton tool="strikethrough" icon={<Strikethrough className="h-4 w-4" />} title="Strikethrough" active={editor?.isActive("strike")} />
                <ToolbarButton tool="inline-code" icon={<Braces className="h-4 w-4" />} title="Inline Code" active={editor?.isActive("code")} />
                <ToolbarDivider />
                <ToolbarButton tool="h2" icon={<Heading2 className="h-4 w-4" />} title="Heading 2" active={editor?.isActive("heading", { level: 2 })} />
                <ToolbarButton tool="h3" icon={<Heading3 className="h-4 w-4" />} title="Heading 3" active={editor?.isActive("heading", { level: 3 })} />
                <ToolbarButton tool="h4" icon={<Heading4 className="h-4 w-4" />} title="Heading 4" active={editor?.isActive("heading", { level: 4 })} />
                <ToolbarDivider />
                <ToolbarButton tool="link" icon={<LinkIcon className="h-4 w-4" />} title="Link" active={editor?.isActive("link")} />
                <ToolbarButton tool="image" icon={<ImageIcon className="h-4 w-4" />} title="Image" />
                <ToolbarDivider />
                <ToolbarButton tool="blockquote" icon={<Quote className="h-4 w-4" />} title="Blockquote" active={editor?.isActive("blockquote")} />
                <ToolbarButton tool="inline-code-block" icon={<CodeXml className="h-4 w-4" />} title="Code Block" active={editor?.isActive("codeBlock")} />
                <ToolbarDivider />
                <ToolbarButton tool="bullet-list" icon={<List className="h-4 w-4" />} title="Bullet List" active={editor?.isActive("bulletList")} />
                <ToolbarButton tool="ordered-list" icon={<ListOrdered className="h-4 w-4" />} title="Ordered List" active={editor?.isActive("orderedList")} />
                <ToolbarButton tool="hr" icon={<Minus className="h-4 w-4" />} title="Horizontal Rule" />
                <ToolbarDivider />
                <ToolbarButton tool="insert-table" icon={<Table2 className="h-4 w-4" />} title="Insert Table" />
                {editor?.isActive("table") && (
                  <>
                    <ToolbarButton tool="add-col" icon={<Columns3 className="h-4 w-4" />} title="Add Column" />
                    <ToolbarButton tool="add-row" icon={<Rows3 className="h-4 w-4" />} title="Add Row" />
                    <ToolbarButton tool="delete-col" icon={<TableCellsMerge className="h-4 w-4" />} title="Delete Column" />
                    <ToolbarButton tool="delete-row" icon={<Minus className="h-4 w-4" />} title="Delete Row" />
                    <ToolbarButton tool="delete-table" icon={<Trash2 className="h-4 w-4" />} title="Delete Table" />
                  </>
                )}
                <ToolbarDivider />
                <ToolbarButton tool="undo" icon={<Undo2 className="h-4 w-4" />} title="Undo" />
                <ToolbarButton tool="redo" icon={<Redo2 className="h-4 w-4" />} title="Redo" />
                <ToolbarDivider />
                <ToolbarButton tool="source" icon={<Code className="h-4 w-4" />} title="Toggle HTML Source" active={sourceMode} />
              </div>

              {/* Editor styles */}
              <style>{`
                .ProseMirror { width: 100%; max-width: 100% !important; }
                .ProseMirror > * { max-width: 100% !important; }
                .ProseMirror p, .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror ul, .ProseMirror ol, .ProseMirror blockquote, .ProseMirror pre { max-width: 100% !important; }
                .ProseMirror table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
                .ProseMirror th, .ProseMirror td { border: 1px solid #d1d5db; padding: 0.5rem; min-width: 80px; }
                .ProseMirror th { background: #f9fafb; font-weight: 600; }
                .ProseMirror .selectedCell { background: #dbeafe; }
                .tiptap { width: 100%; }
              `}</style>

              {/* Editor content */}
              {sourceMode ? (
                <textarea
                  ref={sourceTextareaRef}
                  defaultValue={sourceHtml}
                  className="w-full h-[500px] px-4 py-3 font-mono text-sm text-gray-800 bg-gray-50 outline-none focus:outline-none resize-none overflow-y-auto"
                  spellCheck={false}
                />
              ) : (
                <div className="h-[500px] overflow-y-auto">
                  <EditorContent editor={editor} className="w-full" />
                </div>
              )}

              {/* Word counter */}
              <div className="flex items-center justify-end border-t border-gray-100 px-3 py-1.5 text-[11px] text-gray-400">
                {wordCount.toLocaleString()} words · {Math.max(1, Math.round(wordCount / 238))} min read
              </div>
            </div>
          </div>
        )}

        {/* ──── STEP 2: SEO & Settings ──── */}
        {step === 2 && (
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Description */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
              <h3 className="font-sora text-sm font-semibold text-gray-900">Description & Meta</h3>
              <FieldTextareaWithCount
                label="Description"
                value={fm.description}
                onChange={(v) => updateFm("description", v)}
                rows={3}
                idealMin={120}
                idealMax={160}
              />
              <FieldInput
                label="SEO Title"
                value={fm.seoTitle}
                onChange={(v) => updateFm("seoTitle", v)}
                placeholder="Override page title (leave empty to use post title)"
              />
              <FieldTextareaWithCount
                label="SEO Description"
                value={fm.seoDescription}
                onChange={(v) => updateFm("seoDescription", v)}
                rows={2}
                placeholder="Override meta description"
                idealMin={120}
                idealMax={160}
              />
              <FieldTextarea
                label="Key Takeaways"
                value={fm.keyTakeaways}
                onChange={(v) => updateFm("keyTakeaways", v)}
                rows={3}
              />
            </div>

            {/* Categories */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-3">
              <h3 className="font-sora text-sm font-semibold text-gray-900">Categories</h3>
              <div className="flex flex-wrap gap-1.5">
                {fm.categories.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
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
              <div className="relative">
                <div className="flex gap-1">
                  <input
                    ref={catInputRef}
                    type="text"
                    value={newCategory}
                    placeholder="Search or add category"
                    className="flex-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                      setShowCatSuggestions(true);
                    }}
                    onFocus={() => setShowCatSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowCatSuggestions(false), 150);
                    }}
                  />
                  <button
                    ref={addCatBtnRef}
                    className="rounded-md border border-gray-300 px-2.5 py-1.5 text-gray-500 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {showCatSuggestions && (
                  <div className="absolute left-0 right-12 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                    {EXISTING_CATEGORIES
                      .filter(
                        (cat) =>
                          !fm.categories.includes(cat) &&
                          (newCategory === "" || cat.includes(newCategory.toLowerCase()))
                      )
                      .slice(0, 20)
                      .map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            updateFm("categories", [...fm.categories, cat]);
                            setNewCategory("");
                            setShowCatSuggestions(false);
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    {newCategory.trim() &&
                      !EXISTING_CATEGORIES.includes(newCategory.trim().toLowerCase()) &&
                      !fm.categories.includes(newCategory.trim().toLowerCase()) && (
                        <button
                          type="button"
                          className="block w-full border-t border-gray-100 px-3 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            updateFm("categories", [...fm.categories, newCategory.trim().toLowerCase()]);
                            setNewCategory("");
                            setShowCatSuggestions(false);
                          }}
                        >
                          + Create "{newCategory.trim().toLowerCase()}"
                        </button>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* Author Profile */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
              <h3 className="font-sora text-sm font-semibold text-gray-900">Author</h3>

              {/* Toggle: Select existing / Create new */}
              <div className="flex rounded-md border border-gray-200 overflow-hidden text-xs font-medium">
                <button
                  type="button"
                  className={`flex-1 px-3 py-2 transition-colors ${
                    authorMode === "select" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  onMouseDown={(e) => { e.preventDefault(); setAuthorMode("select"); }}
                >
                  Select Existing
                </button>
                <button
                  type="button"
                  className={`flex-1 px-3 py-2 transition-colors ${
                    authorMode === "create" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  onMouseDown={(e) => { e.preventDefault(); setAuthorMode("create"); }}
                >
                  Create New
                </button>
              </div>

              {/* SELECT mode: show saved profiles */}
              {authorMode === "select" && (
                <div className="space-y-2">
                  {authorProfiles.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No saved authors yet.{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800"
                        onMouseDown={(e) => { e.preventDefault(); setAuthorMode("create"); }}
                      >
                        Create one
                      </button>
                    </p>
                  ) : (
                    authorProfiles.map((author) => {
                      const isSelected = fm.authorName === author.name;
                      return (
                        <button
                          key={author.id}
                          type="button"
                          className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                            isSelected
                              ? "border-blue-400 bg-blue-50 ring-1 ring-blue-200"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            updateFm("authorName", author.name);
                            updateFm("authorBio", author.bio);
                            updateFm("authorImage", author.image);
                          }}
                        >
                          {author.image ? (
                            <img src={author.image} alt={author.name} className="h-10 w-10 rounded-full object-cover border border-gray-200 shrink-0" />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#323dfe] to-black text-white font-semibold text-sm shrink-0">
                              {author.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{author.name}</div>
                            {author.bio && <div className="text-xs text-gray-500 truncate">{author.bio}</div>}
                          </div>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              {/* CREATE mode: author form */}
              {authorMode === "create" && (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {fm.authorImage ? (
                        <img src={authorImagePreview || fm.authorImage} alt={fm.authorName} className="h-14 w-14 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#323dfe] to-black text-white font-semibold text-lg">
                          {(fm.authorName || "T").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <FieldInput
                        label="Name"
                        value={fm.authorName}
                        onChange={(v) => updateFm("authorName", v)}
                        placeholder="e.g. John Doe"
                      />
                      <FieldTextarea
                        label="Bio"
                        value={fm.authorBio}
                        onChange={(v) => updateFm("authorBio", v)}
                        rows={2}
                        placeholder="Short author description"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Profile Photo</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={fm.authorImage}
                        className="flex-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                        onChange={(e) => updateFm("authorImage", e.target.value)}
                        placeholder="URL or upload"
                      />
                      <button
                        data-upload-target="author-photo"
                        className="rounded-md border border-gray-300 px-2.5 py-1.5 text-gray-500 hover:bg-gray-50"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Save as reusable profile */}
                  {fm.authorName && !authorProfiles.some((a) => a.name === fm.authorName) && (
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-1.5 rounded-md bg-gray-100 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                      onMouseDown={async (e) => {
                        e.preventDefault();
                        const newAuthor: AuthorProfile = {
                          id: fm.authorName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"),
                          name: fm.authorName,
                          bio: fm.authorBio,
                          image: fm.authorImage,
                        };
                        const updated = [...authorProfiles, newAuthor];
                        try {
                          const result = await saveAuthors(updated, authorsSha);
                          setAuthorProfiles(updated);
                          setAuthorsSha(result.sha);
                          setSuccess("Author profile saved!");
                          setTimeout(() => setSuccess(""), 4000);
                        } catch {
                          setError("Failed to save author profile");
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Save as reusable author profile
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Publishing Options */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-3">
              <h3 className="font-sora text-sm font-semibold text-gray-900">Publishing Options</h3>
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
                label="No-index (hide from search engines)"
                checked={fm.noindex}
                onChange={(v) => updateFm("noindex", v)}
              />
            </div>
          </div>
        )}

        {/* ──── STEP 3: Cover Image ──── */}
        {step === 3 && (
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Current cover preview */}
            {fm.image && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-sora text-sm font-semibold text-green-800">
                    <CheckCircle2 className="h-4 w-4" />
                    Cover Image Set
                  </h3>
                  <button
                    className="text-xs text-green-600 hover:text-red-500"
                    onMouseDown={(e) => { e.preventDefault(); updateFm("image", ""); setImagePreview(""); }}
                  >
                    Remove
                  </button>
                </div>
                <div className="overflow-hidden rounded-lg border border-green-100">
                  <img src={imagePreview || fm.image} alt={fm.imageAlt || "Cover preview"} className="w-full object-cover" />
                </div>
                <FieldInput
                  label="Image Alt Text"
                  value={fm.imageAlt}
                  onChange={(v) => updateFm("imageAlt", v)}
                  placeholder="Describe the image (for SEO & accessibility)"
                />
              </div>
            )}

            {/* Banner Generator — inline, primary */}
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <CmsBannerGenerator
                initialTitle={fm.title}
                initialSubtitle={fm.description}
                onGenerated={(url, previewDataUrl) => {
                  updateFm("image", url);
                  setImagePreview(previewDataUrl);
                }}
              />
            </div>

            {/* Upload manually — secondary, collapsed */}
            <details className="group rounded-lg border border-gray-200 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm text-gray-400 hover:text-gray-600">
                <span>Or upload your own image instead</span>
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                <FieldInput
                  label="Image URL"
                  value={fm.image}
                  onChange={(v) => updateFm("image", v)}
                  placeholder="Paste image URL"
                />
                <button
                  data-upload-target="featured"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Upload from computer
                </button>
              </div>
            </details>

          </div>
        )}

        {/* ──── STEP 4: Preview ──── */}
        {step === 4 && (
          <CmsPreview
            title={fm.title}
            description={fm.description}
            pubDate={fm.pubDate}
            authorName={fm.authorName}
            authorBio={fm.authorBio}
            authorImage={fm.authorImage || authorImagePreview}
            image={imagePreview || fm.image}
            imageAlt={fm.imageAlt}
            categories={fm.categories}
            keyTakeaways={fm.keyTakeaways}
            bodyHtml={lastEditMode === "source" ? sourceHtml : (editor?.getHTML() || "")}
          />
        )}

      </main>

      {/* ──── Step Navigation (fixed bottom) ──── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            {step > 1 && (
              <button
                data-nav="prev"
                className="flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {error && <span className="text-xs text-red-500 max-w-md truncate" title={error}>{error}</span>}
            {success && <span className="text-xs text-green-600">{success}</span>}
            {step < 4 ? (
              <button
                data-nav="next"
                className="flex items-center gap-1.5 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors cta-hover-gradient"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <button
                  data-action="save-draft-blog"
                  className="flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>
                <button
                  data-action="publish-blog"
                  className="flex items-center gap-1.5 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors cta-hover-gradient disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {saving ? "Publishing..." : "Publish Blog"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

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
          if (target === "author-photo") {
            setImageTarget("author-photo" as any);
          } else {
            setImageTarget(target as "featured" | "thumbnail");
          }
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

function FieldTextareaWithCount({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  idealMin = 120,
  idealMax = 160,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  idealMin?: number;
  idealMax?: number;
}) {
  const len = value.length;
  const color =
    len === 0
      ? "text-gray-400"
      : len >= idealMin && len <= idealMax
        ? "text-green-600"
        : len >= idealMin - 20 && len <= idealMax + 20
          ? "text-yellow-600"
          : "text-red-500";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        <span className={`text-[10px] ${color}`}>
          {len}/{idealMax}
        </span>
      </div>
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
