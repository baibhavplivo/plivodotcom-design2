import { useRef, useEffect, useState } from "react";
import { uploadImage } from "./cms-api";
import { Loader2, Check } from "lucide-react";

const CANVAS_W = 1200;
const CANVAS_H = 630;

type TemplateId = "gradient" | "minimal" | "grid-light" | "grid-dark" | "hex-light" | "hex-dark" | "rings-light" | "rings-dark";

interface Template {
  id: TemplateId;
  name: string;
}

const TEMPLATES: Template[] = [
  { id: "gradient", name: "Dark Dots" },
  { id: "minimal", name: "Light Dots" },
  { id: "grid-dark", name: "Dark Grid" },
  { id: "grid-light", name: "Light Grid" },
  { id: "hex-dark", name: "Dark Wave" },
  { id: "hex-light", name: "Light Wave" },
  { id: "rings-dark", name: "Dark Rings" },
  { id: "rings-light", name: "Light Rings" },
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
      await document.fonts.load("500 64px Sora");
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

function renderTemplate(ctx: CanvasRenderingContext2D, template: TemplateId, title: string, subtitle: string) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  switch (template) {
    case "gradient": renderGradient(ctx, title, subtitle); break;
    case "minimal": renderMinimal(ctx, title, subtitle); break;
    case "grid-light": renderWithPattern(ctx, title, subtitle, "light", drawPerspectiveGrid); break;
    case "grid-dark": renderWithPattern(ctx, title, subtitle, "dark", drawPerspectiveGridDark); break;
    case "hex-light": renderWithPattern(ctx, title, subtitle, "light", drawHexPattern); break;
    case "hex-dark": renderWithPattern(ctx, title, subtitle, "dark", drawHexPatternDark); break;
    case "rings-light": renderWithPattern(ctx, title, subtitle, "light", drawRingsPattern); break;
    case "rings-dark": renderWithPattern(ctx, title, subtitle, "dark", drawRingsPatternDark); break;
  }

  drawPlivoLogo(ctx, template);
}

// Template 1: Diagonal gradient (top-left to bottom-right, mostly black)
function renderGradient(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  // Diagonal gradient: top-left → bottom-right
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, "#141428");
  grad.addColorStop(0.2, "#1a1a3e");
  grad.addColorStop(0.4, "#252560");
  grad.addColorStop(0.6, "#3730a3");
  grad.addColorStop(0.75, "#323dfe");
  grad.addColorStop(0.88, "#323dfe");
  grad.addColorStop(1, "#323dfe");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Dots wave pattern (static, like pre-footer)
  drawDotsWave(ctx);

  // Logo at top-left
  drawPlivoLogoAt(ctx, 50, 40, "white");

  const titleFont = `500 ${TITLE_SIZE}px Sora, sans-serif`;
  const subFont = `400 ${SUB_SIZE}px Inter, sans-serif`;
  const { titleY, subtitleY } = getCenteredStartY(ctx, title, subtitle, titleFont, subFont, TITLE_LH, SUB_LH, 1000, 16, 0);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = titleFont;
  wrapText(ctx, title, CANVAS_W / 2, titleY, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = subFont;
    wrapText(ctx, subtitle, CANVAS_W / 2, subtitleY, 900, SUB_LH);
  }
}

// Template 2: Light — grey-to-blue gradient with dots
function renderMinimal(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  // Light gradient: top-left to bottom-right (light grey → light blue)
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, "#f9fafb");
  grad.addColorStop(0.3, "#f3f4f8");
  grad.addColorStop(0.6, "#eef0f8");
  grad.addColorStop(0.8, "#e0e7ff");
  grad.addColorStop(1, "#c7d2fe");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Dots wave (light mode version)
  drawDotsWaveLight(ctx);

  // Logo at top-left
  drawPlivoLogoAt(ctx, 50, 40, "black");

  const titleFont = `500 ${TITLE_SIZE}px Sora, sans-serif`;
  const subFont = `400 ${SUB_SIZE}px Inter, sans-serif`;
  const { titleY, subtitleY } = getCenteredStartY(ctx, title, subtitle, titleFont, subFont, TITLE_LH, SUB_LH, 1000, 16, 0);

  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  ctx.font = titleFont;
  wrapText(ctx, title, CANVAS_W / 2, titleY, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = "rgba(17,24,39,0.8)";
    ctx.font = subFont;
    wrapText(ctx, subtitle, CANVAS_W / 2, subtitleY, 900, SUB_LH);
  }
}

// Generic pattern template renderer
function renderWithPattern(
  ctx: CanvasRenderingContext2D, title: string, subtitle: string,
  mode: "light" | "dark", patternFn: (ctx: CanvasRenderingContext2D) => void
) {
  if (mode === "dark") {
    const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
    grad.addColorStop(0, "#141428");
    grad.addColorStop(0.2, "#1a1a3e");
    grad.addColorStop(0.4, "#252560");
    grad.addColorStop(0.6, "#3730a3");
    grad.addColorStop(0.75, "#323dfe");
    grad.addColorStop(0.88, "#323dfe");
    grad.addColorStop(1, "#323dfe");
    ctx.fillStyle = grad;
  } else {
    const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
    grad.addColorStop(0, "#f9fafb");
    grad.addColorStop(0.3, "#f3f4f8");
    grad.addColorStop(0.6, "#eef0f8");
    grad.addColorStop(0.8, "#e0e7ff");
    grad.addColorStop(1, "#c7d2fe");
    ctx.fillStyle = grad;
  }
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  patternFn(ctx);

  drawPlivoLogoAt(ctx, 50, 40, mode === "dark" ? "white" : "black");

  const titleFont = `500 ${TITLE_SIZE}px Sora, sans-serif`;
  const subFont = `400 ${SUB_SIZE}px Inter, sans-serif`;
  const { titleY, subtitleY } = getCenteredStartY(ctx, title, subtitle, titleFont, subFont, TITLE_LH, SUB_LH, 1000, 16, 0);

  ctx.fillStyle = mode === "dark" ? "#ffffff" : "#111827";
  ctx.textAlign = "center";
  ctx.font = titleFont;
  wrapText(ctx, title, CANVAS_W / 2, titleY, 1000, TITLE_LH);

  if (subtitle) {
    ctx.fillStyle = mode === "dark" ? "rgba(255,255,255,0.8)" : "rgba(17,24,39,0.8)";
    ctx.font = subFont;
    wrapText(ctx, subtitle, CANVAS_W / 2, subtitleY, 900, SUB_LH);
  }
}

// ─── Pattern: Perspective Grid ──────────────────────────────────

function drawPerspectiveGrid(ctx: CanvasRenderingContext2D) {
  _drawGrid(ctx, "rgba(139, 143, 186, 0.3)", "light");
}

function drawPerspectiveGridDark(ctx: CanvasRenderingContext2D) {
  _drawGrid(ctx, "rgba(165, 180, 252, 0.2)", "dark");
}

function _drawGrid(ctx: CanvasRenderingContext2D, color: string, mode: "light" | "dark") {
  const vanishX = CANVAS_W / 2;
  const vanishY = CANVAS_H * 0.28;
  const gridLines = 22;
  const horizLines = 16;

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  const spreadAngle = Math.PI * 0.8;
  const startAngle = Math.PI / 2 - spreadAngle / 2;
  for (let i = 0; i <= gridLines; i++) {
    const angle = startAngle + (spreadAngle * i) / gridLines;
    const endX = vanishX + Math.cos(angle) * CANVAS_H * 2.5;
    const endY = vanishY + Math.sin(angle) * CANVAS_H * 2.5;
    ctx.beginPath();
    ctx.moveTo(vanishX, vanishY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  for (let i = 1; i <= horizLines; i++) {
    const t = i / horizLines;
    const y = vanishY + (CANVAS_H - vanishY + 40) * (t * t);
    const progress = (y - vanishY) / (CANVAS_H * 2.5);
    const halfWidth = progress * CANVAS_W * 1.8;
    ctx.beginPath();
    ctx.moveTo(vanishX - halfWidth, y);
    ctx.lineTo(vanishX + halfWidth, y);
    ctx.stroke();
  }

  // Radial fade at vanishing point
  const fadeR = 120;
  const fadeGrad = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, fadeR);
  if (mode === "light") {
    fadeGrad.addColorStop(0, "rgba(243,244,248,1)");
    fadeGrad.addColorStop(0.6, "rgba(243,244,248,0.7)");
    fadeGrad.addColorStop(1, "rgba(243,244,248,0)");
  } else {
    fadeGrad.addColorStop(0, "rgba(26,26,62,0.6)");
    fadeGrad.addColorStop(0.4, "rgba(26,26,62,0.3)");
    fadeGrad.addColorStop(1, "rgba(26,26,62,0)");
  }
  ctx.fillStyle = fadeGrad;
  ctx.fillRect(vanishX - fadeR, vanishY - fadeR, fadeR * 2, fadeR * 2);
}

// ─── Pattern: Sound Wave ────────────────────────────────────────

function drawHexPattern(ctx: CanvasRenderingContext2D) {
  _drawSoundWave(ctx, "rgba(139, 143, 186, 0.25)", "light");
}

function drawHexPatternDark(ctx: CanvasRenderingContext2D) {
  _drawSoundWave(ctx, "rgba(165, 180, 252, 0.2)", "dark");
}

function _drawSoundWave(ctx: CanvasRenderingContext2D, color: string, _mode: "light" | "dark") {
  const waves = 7;
  const centerY = CANVAS_H * 0.5;

  for (let w = 0; w < waves; w++) {
    const offset = (w - waves / 2) * 28;
    const amplitude = 30 + Math.abs(w - waves / 2) * 15;

    // Fade based on distance from center wave
    const distFromCenter = Math.abs(w - waves / 2) / (waves / 2);
    const alpha = 1 - distFromCenter * 0.6;

    // Vary line thickness: center wave thickest, outer ones thinner
    ctx.lineWidth = w % 2 === 0 ? 2.5 : 1;
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();

    for (let x = 0; x <= CANVAS_W; x += 2) {
      const normalX = x / CANVAS_W;
      // Envelope: wave is strongest in center, fades at edges
      const envelope = Math.sin(normalX * Math.PI);
      // Multiple frequencies for organic feel
      const y = centerY + offset +
        Math.sin(normalX * Math.PI * 6 + w * 0.8) * amplitude * envelope * 0.5 +
        Math.sin(normalX * Math.PI * 10 + w * 1.2) * amplitude * envelope * 0.25 +
        Math.sin(normalX * Math.PI * 3 + w * 0.3) * amplitude * envelope * 0.35;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// ─── Pattern: Concentric Rings ──────────────────────────────────

function drawRingsPattern(ctx: CanvasRenderingContext2D) {
  _drawRings(ctx, "rgba(139, 143, 186, 0.18)");
}

function drawRingsPatternDark(ctx: CanvasRenderingContext2D) {
  _drawRings(ctx, "rgba(165, 180, 252, 0.14)");
}

function _drawRings(ctx: CanvasRenderingContext2D, color: string) {
  ctx.strokeStyle = color;

  // Main rings from center-right
  const cx1 = CANVAS_W * 0.65;
  const cy1 = CANVAS_H * 0.5;
  for (let i = 1; i <= 12; i++) {
    ctx.lineWidth = i % 3 === 0 ? 2.5 : 1;
    const r = i * 55;
    ctx.beginPath();
    ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Secondary rings from bottom-left
  const cx2 = CANVAS_W * 0.15;
  const cy2 = CANVAS_H * 0.85;
  for (let i = 1; i <= 8; i++) {
    ctx.lineWidth = i % 2 === 0 ? 2 : 0.8;
    const r = i * 50;
    ctx.beginPath();
    ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Small accent rings top-left
  const cx3 = CANVAS_W * 0.25;
  const cy3 = CANVAS_H * 0.15;
  for (let i = 1; i <= 5; i++) {
    ctx.lineWidth = i % 2 === 0 ? 2 : 0.8;
    const r = i * 35;
    ctx.beginPath();
    ctx.arc(cx3, cy3, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// ─── Dots Wave (static version of pre-footer pattern) ───────────

function drawDotsWave(ctx: CanvasRenderingContext2D) {
  const COLS = 40;
  const ROWS = 30;
  const SPACING = 80;
  const FOCAL = 350;
  const CAM_HEIGHT = 250;
  const WAVE_AMP = 35;
  const TIME = 1.5; // frozen time value for static wave shape

  const centerX = CANVAS_W / 2;
  const horizonY = CANVAS_H * 0.35 + 80;

  for (let j = 0; j < ROWS; j++) {
    const z = (j + 1) * SPACING;
    const scale = FOCAL / z;
    const t = j / ROWS; // depth ratio 0→1

    // Color: white → blue → purple based on depth
    let r: number, g: number, b: number;
    if (t < 0.5) {
      const f = t / 0.5;
      r = Math.round(255 - f * 155); // 255 → 100
      g = Math.round(255 - f * 135); // 255 → 120
      b = 255;
    } else {
      const f = (t - 0.5) / 0.5;
      r = Math.round(100 + f * 105); // 100 → 205
      g = Math.round(120 - f * 58);  // 120 → 62
      b = Math.round(255 - f * 6);   // 255 → 249
    }

    const alpha = Math.min(1.0, (1.0 - t * 0.5) * 1.2) * 0.8; // doubled opacity

    for (let i = 0; i < COLS; i++) {
      const x = (i - COLS / 2) * SPACING;

      // Dual sine wave displacement (frozen at TIME)
      const wy = Math.sin(i * 0.3 + TIME) * WAVE_AMP + Math.sin(j * 0.5 + TIME * 0.7) * WAVE_AMP;

      const screenX = centerX + x * scale;
      const screenY = horizonY + CAM_HEIGHT * scale - wy * scale;

      // Cull off-screen dots
      if (screenX < -5 || screenX > CANVAS_W + 5 || screenY < -5 || screenY > CANVAS_H + 5) continue;

      const radius = Math.max(0.4, Math.min(3.0, scale * 3));

      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawDotsWaveLight(ctx: CanvasRenderingContext2D) {
  const COLS = 40;
  const ROWS = 30;
  const SPACING = 80;
  const FOCAL = 350;
  const CAM_HEIGHT = 250;
  const WAVE_AMP = 35;
  const TIME = 1.5;

  const centerX = CANVAS_W / 2;
  const horizonY = CANVAS_H * 0.35 + 80;

  for (let j = 0; j < ROWS; j++) {
    const z = (j + 1) * SPACING;
    const scale = FOCAL / z;
    const t = j / ROWS;

    // Color: dark grey → indigo → purple based on depth
    let r: number, g: number, b: number;
    if (t < 0.5) {
      const f = t / 0.5;
      r = Math.round(120 - f * 50);  // 120 → 70
      g = Math.round(130 - f * 60);  // 130 → 70
      b = Math.round(160 + f * 95);  // 160 → 255
    } else {
      const f = (t - 0.5) / 0.5;
      r = Math.round(70 + f * 90);   // 70 → 160
      g = Math.round(70 - f * 20);   // 70 → 50
      b = Math.round(255 - f * 30);  // 255 → 225
    }

    const alpha = Math.min(1.0, (1.0 - t * 0.5) * 1.2) * 0.5;

    for (let i = 0; i < COLS; i++) {
      const x = (i - COLS / 2) * SPACING;
      const wy = Math.sin(i * 0.3 + TIME) * WAVE_AMP + Math.sin(j * 0.5 + TIME * 0.7) * WAVE_AMP;

      const screenX = centerX + x * scale;
      const screenY = horizonY + CAM_HEIGHT * scale - wy * scale;

      if (screenX < -5 || screenX > CANVAS_W + 5 || screenY < -5 || screenY > CANVAS_H + 5) continue;

      const radius = Math.max(0.4, Math.min(3.0, scale * 3));

      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// ─── Drawing Helpers ────────────────────────────────────────────

function drawPlivoLogo(_ctx: CanvasRenderingContext2D, _template: TemplateId) {
  // Both templates draw their own logo at top-left inside their render function
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

function countLines(ctx: CanvasRenderingContext2D, text: string, font: string, maxWidth: number): number {
  ctx.save();
  ctx.font = font;
  const words = text.split(" ");
  let line = "";
  let lines = 1;
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
  return lines;
}

function getCenteredStartY(
  ctx: CanvasRenderingContext2D,
  title: string, subtitle: string,
  titleFont: string, subtitleFont: string,
  titleLH: number, subLH: number,
  maxWidth: number, gap: number,
  logoOffset: number // extra top offset for logo area
): { titleY: number; subtitleY: number } {
  const titleLines = countLines(ctx, title, titleFont, maxWidth);
  const titleBlockH = titleLines * titleLH;

  let subLines = 0;
  let subBlockH = 0;
  if (subtitle) {
    subLines = countLines(ctx, subtitle, subtitleFont, maxWidth - 100);
    subBlockH = subLines * subLH;
  }

  const totalH = titleBlockH + (subtitle ? gap + subBlockH : 0);
  const startY = (CANVAS_H - totalH) / 2 + titleLH * 0.35;

  return {
    titleY: startY,
    subtitleY: startY + titleBlockH + gap,
  };
}

function getSubtitleY(
  ctx: CanvasRenderingContext2D, title: string,
  titleY: number, maxWidth: number, lineHeight: number,
  fontSize: number, _align: "center" | "left" = "center"
): number {
  const titleLines = countLines(ctx, title, `500 ${fontSize}px Sora, sans-serif`, maxWidth);
  return titleY + titleLines * lineHeight + 16;
}
