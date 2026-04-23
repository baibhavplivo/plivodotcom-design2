import { useRef, useEffect } from "react";
import { Eye } from "lucide-react";
import { BLOG_CATEGORIES } from "@/data/blog-categories";
import DOMPurify from "isomorphic-dompurify";
import "@/styles/blog-content.css";

interface CmsPreviewProps {
  title: string;
  description: string;
  pubDate: string;
  authorName: string;
  authorBio: string;
  authorImage: string;
  image: string;
  imageAlt: string;
  categories: string[];
  keyTakeaways: string;
  bodyHtml: string;
}

function extractHeadings(html: string) {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2]
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (text && text.length > 1) {
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
      if (id) {
        headings.push({ id, text, level: parseInt(match[1]) });
      }
    }
  }
  return headings;
}

function injectHeadingIds(html: string): string {
  return html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level, attrs, inner) => {
      const text = inner
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CmsPreview({
  title,
  description,
  pubDate,
  authorName,
  authorBio,
  authorImage,
  image,
  imageAlt,
  categories,
  keyTakeaways,
  bodyHtml,
}: CmsPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);

  const processedHtml = injectHeadingIds(bodyHtml);
  const headings = extractHeadings(bodyHtml);
  const hasTOC = headings.length >= 2;

  const wordCount = bodyHtml
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 238));

  // TOC click handler using native DOM
  useEffect(() => {
    const toc = tocRef.current;
    const container = scrollRef.current;
    if (!toc || !container) return;

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[data-toc-link]") as HTMLAnchorElement | null;
      if (!link) return;
      e.preventDefault();
      const targetId = link.getAttribute("data-toc-link");
      if (!targetId) return;
      const target = container.querySelector(`#${CSS.escape(targetId)}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    toc.addEventListener("click", handleClick);
    return () => toc.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Preview banner */}
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
        <Eye className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium">Preview Mode</span>
        <span className="text-amber-600">— This is how your blog post will appear on the live site.</span>
      </div>

      {/* Preview container */}
      <div
        ref={scrollRef}
        className="overflow-hidden rounded-lg border border-border bg-background shadow-sm"
      >
        {/* Breadcrumb */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>Home</span>
              <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span>Blog</span>
              <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="truncate max-w-xs text-muted-foreground">
                {title || "Untitled Post"}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <header className="bg-background pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="mx-auto max-w-3xl px-4 text-center">
            {categories.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                {categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {BLOG_CATEGORIES[cat] || cat}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-sora text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-[-0.02em] text-foreground">
              {title || "Untitled Post"}
            </h1>

            {description && (
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}

            <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span>{formatDate(pubDate)}</span>
              <span>&middot;</span>
              <span>{readTime} min read</span>
              <span>&middot;</span>
              <span>By {authorName || "Team Plivo"}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {image && (
          <div className="mx-auto max-w-4xl px-4 mb-10 md:mb-14">
            <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border">
              <img
                src={image}
                alt={imageAlt || title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Main content area with optional TOC */}
        <div
          className={`mx-auto max-w-7xl px-4 pb-14 ${
            hasTOC
              ? "lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:items-start"
              : ""
          }`}
        >
          {/* TOC Sidebar */}
          {hasTOC && (
            <div className="hidden lg:block">
              <aside ref={tocRef} className="sticky top-4 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  On this page
                </p>
                <nav className="space-y-0.5 max-h-[calc(100vh-180px)] overflow-y-auto">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      data-toc-link={h.id}
                      className={`block text-sm leading-snug py-1.5 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors ${
                        h.level === 3 ? "pl-6" : "pl-3"
                      }`}
                    >
                      {h.text.length > 60
                        ? h.text.slice(0, 57) + "..."
                        : h.text}
                    </a>
                  ))}
                </nav>
              </aside>
            </div>
          )}

          {/* Content column */}
          <div
            className={`min-w-0 ${
              hasTOC ? "max-w-3xl" : "max-w-3xl mx-auto"
            }`}
          >
            {/* Key Takeaways */}
            {keyTakeaways && (
              <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6 mb-10">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/80">
                  Key Takeaways
                </h3>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(keyTakeaways) }}
                />
              </div>
            )}

            {/* Article Body */}
            <article
              className="blog-content prose prose-lg max-w-none
                prose-h1:hidden
                prose-h2:font-sora prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:font-semibold prose-h2:text-foreground prose-h2:mt-14 prose-h2:mb-5 prose-h2:leading-tight
                prose-h3:text-xl prose-h3:font-semibold prose-h3:text-foreground prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-lg prose-h4:font-semibold prose-h4:text-foreground prose-h4:mt-8 prose-h4:mb-3
                prose-p:text-base prose-p:leading-relaxed prose-p:text-foreground/80 prose-p:mb-5
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:my-8
                prose-blockquote:border-l-[#323dfe] prose-blockquote:bg-surface prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:my-8
                prose-strong:text-foreground prose-li:text-foreground/80 prose-li:leading-relaxed
                prose-ul:my-5 prose-ol:my-5 prose-hr:my-10"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(processedHtml) }}
            />

            {/* Author Byline */}
            <div className="border-t border-border mt-10 pt-8">
              <div className="flex items-start gap-3">
                {authorImage ? (
                  <img
                    src={authorImage}
                    alt={authorName}
                    className="h-11 w-11 rounded-full object-cover border border-border shrink-0"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-primary to-black text-white font-semibold text-base shrink-0">
                    {(authorName || "T").charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {authorName || "Team Plivo"}
                  </div>
                  {authorBio ? (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {authorBio}
                    </p>
                  ) : (
                    <div className="text-xs text-muted-foreground">Plivo Blog</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
