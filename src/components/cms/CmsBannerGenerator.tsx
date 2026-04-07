import { useRef, useEffect, useState } from "react";
import { uploadImage } from "./cms-api";
import { Loader2, Check } from "lucide-react";

const CANVAS_W = 1200;
const CANVAS_H = 630;

type TemplateId = "gradient" | "dark" | "minimal" | "overlay" | "split";

interface Template {
  id: TemplateId;
  name: string;
}

const TEMPLATES: Template[] = [
  { id: "gradient", name: "Gradient" },
  { id: "dark", name: "Dark" },
  { id: "minimal", name: "Minimal" },
  { id: "overlay", name: "Overlay" },
  { id: "split", name: "Split" },
];

interface CmsBannerGeneratorProps {
  onGenerated: (url: string, previewDataUrl: string) => void;
  initialTitle?: string;
  initialSubtitle?: string;
}

// Preloaded logo images (cached across renders)
let logoWhite: HTMLImageElement | null = null;
let logoBlack: HTMLImageElement | null = null;

function loadLogo(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load logo: ${src}`));
    img.src = src;
  });
}

export default function CmsBannerGenerator({
  onGenerated,
  initialTitle = "",
  initialSubtitle = "",
}: CmsBannerGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("gradient");
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [logosReady, setLogosReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generateBtnRef = useRef<HTMLButtonElement>(null);

  // Sync initial values
  useEffect(() => { if (initialTitle && !title) setTitle(initialTitle); }, [initialTitle]);
  useEffect(() => { if (initialSubtitle && !subtitle) setSubtitle(initialSubtitle); }, [initialSubtitle]);

  // Preload logos on mount
  useEffect(() => {
    if (logoWhite && logoBlack) {
      setLogosReady(true);
      return;
    }
    Promise.all([
      loadLogo("/images/plivo-logo-white.svg"),
      loadLogo("/images/plivo-logo.svg"),
    ]).then(([white, black]) => {
      logoWhite = white;
      logoBlack = black;
      setLogosReady(true);
    }).catch(() => {
      // Fallback: logos just won't appear, not blocking
      setLogosReady(true);
    });
  }, []);

  // Generate button
  useEffect(() => {
    const btn = generateBtnRef.current;
    if (!btn) return;
    const handle = () => handleGenerate();
    btn.addEventListener("click", handle);
    return () => btn.removeEventListener("click", handle);
  }, [title, subtitle, selectedTemplate, logosReady]);

  // Re-render preview whenever inputs change
  useEffect(() => {
    if (!logosReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    renderTemplate(ctx, selectedTemplate, title || "Your Blog Title", subtitle);
  }, [selectedTemplate, title, subtitle, logosReady]);

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      await document.fonts.load("bold 64px Sora");
      await document.fonts.load("30px Inter");

      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      renderTemplate(ctx, selectedTemplate, title, subtitle);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to generate image"))),
          "image/png",
          1.0
        );
      });

      // Capture data URL for local preview before uploading
      const previewDataUrl = canvas.toDataURL("image/png");

      const file = new File([blob], `banner-${Date.now()}.png`, { type: "image/png" });
      const { url } = await uploadImage(file);
      onGenerated(url, previewDataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate banner");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Template selector */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-gray-500 uppercase">Template</label>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <TemplateOption
              key={t.id}
              template={t}
              selected={selectedTemplate === t.id}
              onSelect={setSelectedTemplate}
            />
          ))}
        </div>
      </div>

      {/* Live preview */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", display: "block", aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
        />
      </div>

      {/* Text fields */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">Banner Title</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
            placeholder="Enter banner title"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Subtitle <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            placeholder="Short tagline or description"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Generate button */}
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        ref={generateBtnRef}
        disabled={generating}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors cta-hover-gradient disabled:opacity-50"
      >
        {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        {generating ? "Generating & Uploading..." : "Generate & Set as Cover Image"}
      </button>
      <p className="text-center text-[10px] text-gray-400">
        {CANVAS_W} x {CANVAS_H}px — optimized for social sharing
      </p>
    </div>
  );
}

// ─── Template Option ────────────────────────────────────────────

function TemplateOption({
  template, selected, onSelect,
}: {
  template: Template; selected: boolean; onSelect: (id: TemplateId) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;
    const handle = () => onSelect(template.id);
    btn.addEventListener("click", handle);
    return () => btn.removeEventListener("click", handle);
  }, [template.id, onSelect]);

  return (
    <button
      ref={ref}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
        selected ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {template.name}
    </button>
  );
}

// ─── Canvas Rendering ───────────────────────────────────────────

const TITLE_SIZE = 64;
const TITLE_LH = 80;
const SUB_SIZE = 30;
const SUB_LH = 40;
const SPLIT_TITLE_SIZE = 52;
const SPLIT_TITLE_LH = 66;
const SPLIT_SUB_SIZE = 26;
const SPLIT_SUB_LH = 34;

function renderTemplate(ctx: CanvasRenderingContext2D, template: TemplateId, title: string, subtitle: string) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  switch (template) {
    case "gradient": renderGradient(ctx, title, subtitle); break;
    case "dark": renderDark(ctx, title, subtitle); break;
    case "minimal": renderMinimal(ctx, title, subtitle); break;
    case "overlay": renderOverlay(ctx, title, subtitle); break;
    case "split": renderSplit(ctx, title, subtitle); break;
  }

  drawPlivoLogo(ctx, template);
}

// Template 1: Diagonal gradient (top-left to bottom-right, mostly black)
function renderGradient(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  // Diagonal gradient: top-left → bottom-right
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, "#1a1a2e");
  grad.addColorStop(0.3, "#0f0f1a");
  grad.addColorStop(0.6, "#1e1b4b");
  grad.addColorStop(0.85, "#4f46e5");
  grad.addColorStop(1, "#7c3aed");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Subtle decorative circles
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = "#818cf8";
  ctx.beginPath(); ctx.arc(900, 500, 280, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#7c3aed";
  ctx.beginPath(); ctx.arc(1100, 200, 180, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;

  // Logo at top-left
  drawPlivoLogoAt(ctx, 50, 40, "white");

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = `bold ${TITLE_SIZE}px Sora, sans-serif`;
  wrapText(ctx, title, CANVAS_W / 2, 280, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = `400 ${SUB_SIZE}px Inter, sans-serif`;
    wrapText(ctx, subtitle, CANVAS_W / 2, getSubtitleY(ctx, title, 280, 1000, TITLE_LH, TITLE_SIZE), 900, SUB_LH);
  }
}

// Template 2: Dark with gradient accent text
function renderDark(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  ctx.fillStyle = "#0f1117";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < CANVAS_W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke(); }
  for (let y = 0; y < CANVAS_H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke(); }

  const lineGrad = ctx.createLinearGradient(100, 0, CANVAS_W - 100, 0);
  lineGrad.addColorStop(0, "#d946ef");
  lineGrad.addColorStop(1, "#4f46e5");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(100, 80, CANVAS_W - 200, 4);

  ctx.textAlign = "center";
  const titleGrad = ctx.createLinearGradient(200, 0, 1000, 0);
  titleGrad.addColorStop(0, "#d946ef");
  titleGrad.addColorStop(1, "#818cf8");
  ctx.fillStyle = titleGrad;
  ctx.font = `bold ${TITLE_SIZE}px Sora, sans-serif`;
  wrapText(ctx, title, CANVAS_W / 2, 270, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `400 ${SUB_SIZE}px Inter, sans-serif`;
    wrapText(ctx, subtitle, CANVAS_W / 2, getSubtitleY(ctx, title, 270, 1000, TITLE_LH, TITLE_SIZE), 900, SUB_LH);
  }
}

// Template 3: Minimal white
function renderMinimal(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  const barGrad = ctx.createLinearGradient(0, 0, CANVAS_W, 0);
  barGrad.addColorStop(0, "#d946ef");
  barGrad.addColorStop(1, "#4f46e5");
  ctx.fillStyle = barGrad;
  ctx.fillRect(0, 0, CANVAS_W, 8);

  ctx.fillStyle = "#111111";
  ctx.textAlign = "center";
  ctx.font = `bold ${TITLE_SIZE}px Sora, sans-serif`;
  wrapText(ctx, title, CANVAS_W / 2, 260, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = "#6b7280";
    ctx.font = `400 ${SUB_SIZE}px Inter, sans-serif`;
    wrapText(ctx, subtitle, CANVAS_W / 2, getSubtitleY(ctx, title, 260, 1000, TITLE_LH, TITLE_SIZE), 900, SUB_LH);
  }

  ctx.fillStyle = barGrad;
  ctx.fillRect(0, CANVAS_H - 8, CANVAS_W, 8);
}

// Template 4: Mesh overlay
function renderOverlay(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  ctx.fillStyle = "#0f1117";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.globalAlpha = 0.15;
  const colors = ["#d946ef", "#4f46e5", "#00d4ff", "#d946ef"];
  const positions = [
    { x: 150, y: 150, r: 250 }, { x: 900, y: 100, r: 200 },
    { x: 600, y: 500, r: 300 }, { x: 1050, y: 450, r: 180 },
  ];
  positions.forEach((p, i) => {
    const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    radGrad.addColorStop(0, colors[i]);
    radGrad.addColorStop(1, "transparent");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  });
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(15, 17, 23, 0.5)";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = `bold ${TITLE_SIZE}px Sora, sans-serif`;
  wrapText(ctx, title, CANVAS_W / 2, 250, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = `400 ${SUB_SIZE}px Inter, sans-serif`;
    wrapText(ctx, subtitle, CANVAS_W / 2, getSubtitleY(ctx, title, 250, 1000, TITLE_LH, TITLE_SIZE), 900, SUB_LH);
  }
}

// Template 5: Split layout
function renderSplit(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  ctx.fillStyle = "#0f1117";
  ctx.fillRect(0, 0, CANVAS_W / 2, CANVAS_H);

  const grad = ctx.createLinearGradient(CANVAS_W / 2, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, "#d946ef");
  grad.addColorStop(0.5, "#4f46e5");
  grad.addColorStop(1, "#000000");
  ctx.fillStyle = grad;
  ctx.fillRect(CANVAS_W / 2, 0, CANVAS_W / 2, CANVAS_H);

  ctx.fillStyle = "#0f1117";
  ctx.beginPath();
  ctx.moveTo(CANVAS_W / 2 - 30, 0);
  ctx.lineTo(CANVAS_W / 2 + 30, 0);
  ctx.lineTo(CANVAS_W / 2 - 30, CANVAS_H);
  ctx.lineTo(CANVAS_W / 2 - 90, CANVAS_H);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.font = `bold ${SPLIT_TITLE_SIZE}px Sora, sans-serif`;
  wrapText(ctx, title, 60, 230, 480, SPLIT_TITLE_LH, "left");

  if (subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = `400 ${SPLIT_SUB_SIZE}px Inter, sans-serif`;
    wrapText(ctx, subtitle, 60, getSubtitleY(ctx, title, 230, 480, SPLIT_TITLE_LH, SPLIT_TITLE_SIZE, "left"), 480, SPLIT_SUB_LH, "left");
  }
}

// ─── Drawing Helpers ────────────────────────────────────────────

function drawPlivoLogo(ctx: CanvasRenderingContext2D, template: TemplateId) {
  // Gradient template handles its own logo at top-left
  if (template === "gradient") return;

  const isLight = template === "minimal";
  drawPlivoLogoAt(ctx, 50, CANVAS_H - 70, isLight ? "black" : "white");
}

function drawPlivoLogoAt(ctx: CanvasRenderingContext2D, x: number, y: number, variant: "white" | "black") {
  const logo = variant === "white" ? logoWhite : logoBlack;

  if (logo) {
    const logoW = 100;
    const logoH = (logo.naturalHeight / logo.naturalWidth) * logoW;
    ctx.drawImage(logo, x, y, logoW, logoH);
  } else {
    ctx.textAlign = "left";
    ctx.font = "bold 28px Sora, sans-serif";
    ctx.fillStyle = variant === "white" ? "#ffffff" : "#111111";
    ctx.fillText("plivo", x, y + 24);
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D, text: string,
  x: number, y: number, maxWidth: number, lineHeight: number,
  align: "center" | "left" = "center"
) {
  ctx.textAlign = align;
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

function getSubtitleY(
  ctx: CanvasRenderingContext2D, title: string,
  titleY: number, maxWidth: number, lineHeight: number,
  fontSize: number, _align: "center" | "left" = "center"
): number {
  const words = title.split(" ");
  let line = "";
  let lines = 1;

  ctx.save();
  ctx.font = `bold ${fontSize}px Sora, sans-serif`;
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines++;
      line = word;
    } else {
      line = testLine;
    }
  }
  ctx.restore();
  return titleY + lines * lineHeight + 36;
}
