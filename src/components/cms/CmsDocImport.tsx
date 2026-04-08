import { useRef, useEffect, useState } from "react";
import { uploadImage, fetchGoogleDoc } from "./cms-api";
import { FileUp, Loader2, CheckCircle2, AlertCircle, X, Link2 } from "lucide-react";

interface CmsDocImportProps {
  onImport: (html: string, title?: string) => void;
}

export default function CmsDocImport({ onImport }: CmsDocImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [gdocUrl, setGdocUrl] = useState("");
  const [showGdocInput, setShowGdocInput] = useState(false);
  const gdocInputRef = useRef<HTMLInputElement>(null);
  const gdocBtnRef = useRef<HTMLButtonElement>(null);
  const gdocToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;

    const handleChange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Reset input so same file can be re-selected
      input.value = "";

      if (file.size > 20 * 1024 * 1024) {
        setError("File too large (max 20MB)");
        return;
      }

      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== "docx" && ext !== "pdf") {
        setError("Only .docx and .pdf files are supported");
        return;
      }

      setImporting(true);
      setError("");
      setSuccess("");
      setProgress(`Reading ${file.name}...`);

      try {
        let html = "";
        let extractedTitle = "";

        if (ext === "docx") {
          setProgress("Converting DOCX to HTML...");
          const result = await importDocx(file);
          html = result.html;
          extractedTitle = result.title;
          setProgress("Processing images...");
        } else {
          setProgress("Extracting text from PDF...");
          const result = await importPdf(file);
          html = result.html;
          extractedTitle = result.title;
        }

        if (!html.trim()) {
          setError("No content could be extracted from the file");
          setImporting(false);
          return;
        }

        setProgress("Loading content into editor...");
        onImport(html, extractedTitle);

        const wordCount = html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
        setSuccess(`Imported ${file.name} — ${wordCount.toLocaleString()} words`);
        setTimeout(() => setSuccess(""), 8000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to import file");
      } finally {
        setImporting(false);
        setProgress("");
      }
    };

    input.addEventListener("change", handleChange);
    return () => input.removeEventListener("change", handleChange);
  }, [onImport]);

  // Google Docs toggle
  useEffect(() => {
    const btn = gdocToggleRef.current;
    if (!btn) return;
    const handle = () => setShowGdocInput((v) => !v);
    btn.addEventListener("click", handle);
    return () => btn.removeEventListener("click", handle);
  }, []);

  // Google Docs fetch
  useEffect(() => {
    const btn = gdocBtnRef.current;
    if (!btn) return;

    const handleGdocFetch = async () => {
      if (!gdocUrl.trim()) return;
      if (!gdocUrl.includes("docs.google.com/document")) {
        setError("Please enter a valid Google Docs URL");
        return;
      }

      setImporting(true);
      setError("");
      setSuccess("");
      setProgress("Fetching Google Doc...");

      try {
        setProgress("Downloading and cleaning content...");
        const result = await fetchGoogleDoc(gdocUrl.trim());

        if (!result.html.trim()) {
          setError("No content could be extracted from the document");
          setImporting(false);
          return;
        }

        setProgress("Loading content into editor...");
        onImport(result.html, result.title);

        const wordCount = result.html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
        setSuccess(`Imported Google Doc — ${wordCount.toLocaleString()} words`);
        setGdocUrl("");
        setShowGdocInput(false);
        setTimeout(() => setSuccess(""), 8000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to import Google Doc");
      } finally {
        setImporting(false);
        setProgress("");
      }
    };

    btn.addEventListener("click", handleGdocFetch);
    return () => btn.removeEventListener("click", handleGdocFetch);
  }, [gdocUrl, onImport]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,.pdf"
          className="hidden"
        />
        <button
          ref={btnRef}
          disabled={importing}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          {importing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FileUp className="h-3.5 w-3.5" />
          )}
          {importing ? "Importing..." : "Import Doc / PDF"}
        </button>

        <button
          ref={gdocToggleRef}
          disabled={importing}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
            showGdocInput
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Link2 className="h-3.5 w-3.5" />
          Google Docs
        </button>

        {/* Processing state */}
        {importing && progress && (
          <span className="flex items-center gap-1 text-xs text-blue-600">
            <Loader2 className="h-3 w-3 animate-spin" />
            {progress}
          </span>
        )}

        {/* Success state */}
        {!importing && success && (
          <span className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {success}
          </span>
        )}

        {/* Error state */}
        {!importing && error && (
          <span className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
            <button
              className="ml-1 rounded-full p-0.5 text-red-400 hover:bg-red-100 hover:text-red-600"
              onMouseDown={(e) => { e.preventDefault(); setError(""); }}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
      </div>

      {/* Google Docs URL input */}
      {showGdocInput && (
        <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50/50 p-2">
          <input
            ref={gdocInputRef}
            type="text"
            value={gdocUrl}
            onChange={(e) => setGdocUrl(e.target.value)}
            placeholder="Paste Google Docs link (must be shared as 'Anyone with the link')"
            className="flex-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
          />
          <button
            ref={gdocBtnRef}
            disabled={importing || !gdocUrl.trim()}
            className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {importing ? <Loader2 className="h-3 w-3 animate-spin" /> : <FileUp className="h-3 w-3" />}
            Fetch
          </button>
        </div>
      )}
    </div>
  );
}

// ─── DOCX Import ────────────────────────────────────────────────

async function importDocx(file: File): Promise<{ html: string; title: string }> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      convertImage: mammoth.images.imgElement(async (image: any) => {
        try {
          const buffer = await image.read();
          const contentType = image.contentType || "image/png";
          const ext = contentType.split("/")[1] || "png";
          const blob = new Blob([buffer], { type: contentType });
          const imgFile = new File(
            [blob],
            `doc-img-${Date.now()}.${ext}`,
            { type: contentType }
          );
          const { url } = await uploadImage(imgFile);
          return { src: url };
        } catch {
          // If image upload fails, skip the image
          return { src: "" };
        }
      }),
    }
  );

  // Extract title from first h1 or h2
  let title = "";
  const titleMatch = result.value.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]*>/g, "").trim();
  }

  return { html: result.value, title };
}

// ─── PDF Import ─────────────────────────────────────────────────

async function importPdf(file: File): Promise<{ html: string; title: string }> {
  const pdfjsLib = await import("pdfjs-dist");

  // @ts-ignore — import worker directly for Vite bundling
  const workerUrl = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.href;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

  if (pdf.numPages === 0) {
    throw new Error("PDF has no pages");
  }

  let allHtml = "";
  let title = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageHtml = processPageContent(content);
    allHtml += pageHtml;
  }

  // Check if we got meaningful content
  const textContent = allHtml.replace(/<[^>]*>/g, "").trim();
  if (textContent.length < 20) {
    throw new Error(
      "This PDF contains scanned images, not selectable text. Please use a DOCX file instead."
    );
  }

  // Extract title from first heading or first paragraph
  const titleMatch = allHtml.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]*>/g, "").trim();
  } else {
    const firstP = allHtml.match(/<p[^>]*>(.*?)<\/p>/i);
    if (firstP) {
      const t = firstP[1].replace(/<[^>]*>/g, "").trim();
      if (t.length <= 100) title = t;
    }
  }

  return { html: allHtml, title };
}

interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
}

function processPageContent(content: any): string {
  const items = content.items as TextItem[];
  if (!items || items.length === 0) return "";

  // Group items by Y position (same line)
  const lines: { y: number; fontSize: number; text: string }[] = [];
  let currentLine = { y: 0, fontSize: 0, text: "", maxFontSize: 0 };

  for (const item of items) {
    if (!item.str.trim() && !item.str.includes(" ")) continue;

    const y = Math.round(item.transform[5]);
    const fontSize = Math.round(Math.abs(item.transform[0]));

    // Same line (within 3px tolerance)
    if (Math.abs(y - currentLine.y) <= 3 && currentLine.text) {
      currentLine.text += item.str;
      currentLine.maxFontSize = Math.max(currentLine.maxFontSize, fontSize);
    } else {
      if (currentLine.text.trim()) {
        lines.push({
          y: currentLine.y,
          fontSize: currentLine.maxFontSize,
          text: currentLine.text.trim(),
        });
      }
      currentLine = { y, fontSize, text: item.str, maxFontSize: fontSize };
    }
  }
  // Push last line
  if (currentLine.text.trim()) {
    lines.push({
      y: currentLine.y,
      fontSize: currentLine.maxFontSize,
      text: currentLine.text.trim(),
    });
  }

  if (lines.length === 0) return "";

  // Find median font size to determine what's "normal" text
  const fontSizes = lines.map((l) => l.fontSize).sort((a, b) => a - b);
  const medianSize = fontSizes[Math.floor(fontSizes.length / 2)];

  // Convert lines to HTML
  let html = "";
  for (const line of lines) {
    const text = escapeHtml(line.text);
    if (line.fontSize > medianSize * 1.4) {
      // Large text → heading
      if (line.fontSize > medianSize * 1.8) {
        html += `<h2>${text}</h2>\n`;
      } else {
        html += `<h3>${text}</h3>\n`;
      }
    } else {
      html += `<p>${text}</p>\n`;
    }
  }

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
