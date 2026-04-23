import { useState } from "react";
import MeshGradient from "@/components/ui/mesh-gradient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Check,
  Phone,
  MessageSquare,
  Mail,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Search,
  User,
  Settings,
  Bell,
  Heart,
  Star,
  Download,
  ExternalLink,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Copy,
  Loader2,
  AlertCircle,
  CheckCircle,
  Info,
  X,
} from "lucide-react";

// Section wrapper component
function Section({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="font-sora text-[1.75rem] font-medium tracking-[-0.02em] text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-base text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="rounded-xl border border-border bg-background p-8">
        {children}
      </div>
    </section>
  );
}

// Light mode code block component
function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative mt-4">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-surface hover:text-foreground/80 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm text-foreground">
        <code>{children}</code>
      </pre>
    </div>
  );
}

// Syntax highlighted code block component (matches reference design)
function SyntaxCodeBlock({
  code,
  language = "React",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for JSX/TSX
  const highlightCode = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      const tokens: React.ReactNode[] = [];
      let remaining = line;
      let keyIndex = 0;

      // Process the line character by character with regex patterns
      while (remaining.length > 0) {
        let matched = false;

        // String literals (single and double quotes)
        const stringMatch = remaining.match(/^(['"`])(?:(?!\1)[^\\]|\\.)*\1/);
        if (stringMatch) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-green-600 dark:text-green-300">
              {stringMatch[0]}
            </span>
          );
          remaining = remaining.slice(stringMatch[0].length);
          matched = true;
          continue;
        }

        // Keywords
        const keywordMatch = remaining.match(/^(import|export|from|function|const|let|var|return|if|else|for|while|class|extends|new|this|typeof|instanceof|async|await|try|catch|throw|finally|default|switch|case|break|continue)\b/);
        if (keywordMatch) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-red-600 dark:text-red-300">
              {keywordMatch[0]}
            </span>
          );
          remaining = remaining.slice(keywordMatch[0].length);
          matched = true;
          continue;
        }

        // JSX tags
        const jsxOpenMatch = remaining.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
        if (jsxOpenMatch) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-red-600 dark:text-red-300">
              {jsxOpenMatch[0]}
            </span>
          );
          remaining = remaining.slice(jsxOpenMatch[0].length);
          matched = true;
          continue;
        }

        // Closing JSX bracket
        const jsxCloseMatch = remaining.match(/^(\/>|>)/);
        if (jsxCloseMatch) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-red-600 dark:text-red-300">
              {jsxCloseMatch[0]}
            </span>
          );
          remaining = remaining.slice(jsxCloseMatch[0].length);
          matched = true;
          continue;
        }

        // Function calls and identifiers
        const funcMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*\()?/);
        if (funcMatch) {
          const isFunction = funcMatch[2] || ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'setCount', 'onClick', 'onChange'].includes(funcMatch[1]);
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className={isFunction ? "text-blue-600" : "text-foreground"}>
              {funcMatch[1]}
            </span>
          );
          remaining = remaining.slice(funcMatch[1].length);
          matched = true;
          continue;
        }

        // Numbers
        const numMatch = remaining.match(/^\d+(\.\d+)?/);
        if (numMatch) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-orange-600">
              {numMatch[0]}
            </span>
          );
          remaining = remaining.slice(numMatch[0].length);
          matched = true;
          continue;
        }

        // Comments
        const commentMatch = remaining.match(/^(\/\/.*|\/\*[\s\S]*?\*\/)/);
        if (commentMatch) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-muted-foreground italic">
              {commentMatch[0]}
            </span>
          );
          remaining = remaining.slice(commentMatch[0].length);
          matched = true;
          continue;
        }

        // Default: single character
        if (!matched) {
          tokens.push(
            <span key={`${lineIndex}-${keyIndex++}`} className="text-foreground/80">
              {remaining[0]}
            </span>
          );
          remaining = remaining.slice(1);
        }
      }

      return (
        <div key={lineIndex} className="leading-relaxed">
          {tokens.length > 0 ? tokens : '\u00A0'}
        </div>
      );
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80">
            {language}
          </span>
          {filename && (
            <span className="text-sm text-muted-foreground">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground"
          title="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      {/* Code */}
      <div className="overflow-x-auto bg-background p-5">
        <pre className="font-mono text-sm">
          <code>{highlightCode(code)}</code>
        </pre>
      </div>
    </div>
  );
}

// Subsection component
function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

// Swatch component for colors
function ColorSwatch({
  name,
  value,
  textColor = "text-white",
  cssVar,
  className,
}: {
  name: string;
  value: string;
  textColor?: string;
  cssVar?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex h-20 items-end rounded-lg p-3 ${textColor} ${className || ""}`}
        style={{ backgroundColor: value }}
      >
        <span className="text-xs font-medium">{name}</span>
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="font-mono text-xs text-foreground/80">{value}</p>
        {cssVar && <p className="font-mono text-xs text-muted-foreground">{cssVar}</p>}
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">
          <span className="text-xs font-medium text-muted-foreground">
            Internal Reference
          </span>
        </div>
        <h1 className="font-sora text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-[3.5rem]">
          Design System
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A comprehensive guide to building consistent, beautiful pages for
          Plivo. This page documents all available components, patterns, and
          design tokens.
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 rounded-xl border border-border bg-surface p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Navigation
        </h3>
        <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {[
            { label: "Colors", href: "#colors" },
            { label: "Typography", href: "#typography" },
            { label: "Buttons", href: "#buttons" },
            { label: "Form Elements", href: "#forms" },
            { label: "Cards", href: "#cards" },
            { label: "Badges & Pills", href: "#badges" },
            { label: "Avatars", href: "#avatars" },
            { label: "Tabs", href: "#tabs" },
            { label: "Accordion", href: "#accordion" },
            { label: "Tables", href: "#tables" },
            { label: "Lists", href: "#lists" },
            { label: "Links", href: "#links" },
            { label: "Alerts", href: "#alerts" },
            { label: "Separators", href: "#separators" },
            { label: "Shadows", href: "#shadows" },
            { label: "Border Radius", href: "#radius" },
            { label: "Spacing", href: "#spacing" },
            { label: "Icons", href: "#icons" },
            { label: "Code Components", href: "#code-components" },
            { label: "Animations", href: "#animations" },
            { label: "Section Patterns", href: "#sections" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-16">
        {/* ============================================ */}
        {/* COLORS */}
        {/* ============================================ */}
        <Section
          id="colors"
          title="Colors"
          description="The Plivo color palette. Light mode only."
        >
          <div className="space-y-10">
            {/* Brand Colors */}
            <Subsection title="Brand Colors">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <ColorSwatch
                  name="Plivo Purple"
                  value="#cd3ef9"
                  cssVar="plivo-purple"
                />
                <ColorSwatch
                  name="Plivo Blue"
                  value="#323dfe"
                  cssVar="plivo-blue"
                />
                <div className="flex flex-col">
                  <div
                    className="flex h-20 items-end rounded-lg p-3 text-white"
                    style={{
                      background: "linear-gradient(90deg, #cd3ef9, #323dfe)",
                    }}
                  >
                    <span className="text-xs font-medium">Gradient</span>
                  </div>
                  <div className="mt-2">
                    <p className="font-mono text-xs text-foreground/80">
                      90deg, #cd3ef9 → #323dfe
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      bg-plivo-gradient
                    </p>
                  </div>
                </div>
                <ColorSwatch
                  name="Dark BG"
                  value="rgb(15, 17, 23)"
                  cssVar="plivo-dark"
                />
              </div>
            </Subsection>

            {/* Background Colors */}
            <Subsection title="Backgrounds">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                <ColorSwatch
                  name="White"
                  value="#ffffff"
                  textColor="text-foreground"
                  cssVar="Primary bg"
                  className="border border-border"
                />
                <ColorSwatch
                  name="Gray 50"
                  value="#f9fafb"
                  textColor="text-foreground"
                  cssVar="Section alt"
                />
                <ColorSwatch
                  name="Gray 100"
                  value="#f3f4f6"
                  textColor="text-foreground"
                  cssVar="Cards, inputs"
                />
                <ColorSwatch
                  name="Indigo 50"
                  value="#eef2ff"
                  textColor="text-foreground"
                  cssVar="Feature cards"
                />
                <ColorSwatch
                  name="Fuchsia 50"
                  value="#fdf4ff"
                  textColor="text-foreground"
                  cssVar="Feature cards"
                />
              </div>
            </Subsection>

            {/* Mesh Gradients */}
            <Subsection title="Mesh Gradients">
              <p className="text-sm text-muted-foreground mb-4">
                Use the MeshGradient component for decorative backgrounds. Import from <code className="text-xs bg-muted px-1 py-0.5 rounded">@/components/ui/mesh-gradient</code>
              </p>

              {/* Light Variants */}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Light Variants</p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-6">
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="default" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Default</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="default"</div>
                </div>
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="purple" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Purple</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="purple"</div>
                </div>
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="blue" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Blue</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="blue"</div>
                </div>
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="cyan" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Cyan</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="cyan"</div>
                </div>
              </div>

              {/* Dark Variants */}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Dark Variants</p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="dark" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Dark</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="dark"</div>
                </div>
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="darkPurple" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Dark Purple</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="darkPurple"</div>
                </div>
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="darkBlue" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Dark Blue</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="darkBlue"</div>
                </div>
                <div className="space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-border">
                    <MeshGradient variant="darkCyan" blur="lg" />
                  </div>
                  <div className="text-sm font-medium">Dark Cyan</div>
                  <div className="text-xs text-muted-foreground font-mono">variant="darkCyan"</div>
                </div>
              </div>
            </Subsection>

            {/* Text Colors */}
            <Subsection title="Text Colors">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                <ColorSwatch name="Black" value="#000000" cssVar="Headlines" />
                <ColorSwatch
                  name="Gray 900"
                  value="#111827"
                  cssVar="Body text"
                />
                <ColorSwatch
                  name="Gray 600"
                  value="#4b5563"
                  cssVar="Paragraphs"
                />
                <ColorSwatch
                  name="Gray 500"
                  value="#6b7280"
                  cssVar="Muted text"
                />
                <ColorSwatch
                  name="Gray 400"
                  value="#9ca3af"
                  cssVar="Placeholders"
                />
              </div>
            </Subsection>

            {/* Border Colors */}
            <Subsection title="Borders">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <ColorSwatch
                  name="Gray 200"
                  value="#e5e7eb"
                  textColor="text-foreground"
                  cssVar="Default border"
                />
                <ColorSwatch
                  name="Gray 300"
                  value="#d1d5db"
                  textColor="text-foreground"
                  cssVar="Button border"
                />
                <ColorSwatch
                  name="Gray 100"
                  value="#f3f4f6"
                  textColor="text-foreground"
                  cssVar="Subtle border"
                />
                <div className="flex flex-col">
                  <div className="flex h-20 items-end rounded-lg border border-border bg-background p-3 text-foreground">
                    <span className="text-xs font-medium">Transparent</span>
                  </div>
                  <div className="mt-2">
                    <p className="font-mono text-xs text-foreground/80">
                      rgba(0,0,0,0.09)
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Overlay borders
                    </p>
                  </div>
                </div>
              </div>
            </Subsection>

            {/* Semantic Colors */}
            <Subsection title="Semantic Colors">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <ColorSwatch
                  name="Blue 600"
                  value="#2563eb"
                  cssVar="Info, links"
                />
                <ColorSwatch
                  name="Green 500"
                  value="#22c55e"
                  cssVar="Success"
                />
                <ColorSwatch
                  name="Yellow 500"
                  value="#eab308"
                  cssVar="Warning"
                />
                <ColorSwatch name="Red 500" value="#ef4444" cssVar="Error" />
              </div>
            </Subsection>

            <CodeBlock>
              {`/* Brand colors */
.bg-plivo-gradient { background: linear-gradient(90deg, #cd3ef9, #323dfe); }
.text-gradient {
  background: linear-gradient(90deg, #cd3ef9, #323dfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Common usage */
<div className="bg-background" /> /* Primary background */
<div className="bg-surface" /> /* Section alternate */
<p className="text-foreground" /> /* Headlines */
<p className="text-muted-foreground" /> /* Body text */
<p className="text-muted-foreground" /> /* Muted text */
<div className="border-border" /> /* Borders */`}
            </CodeBlock>
          </div>
        </Section>

        {/* ============================================ */}
        {/* TYPOGRAPHY */}
        {/* ============================================ */}
        <Section
          id="typography"
          title="Typography"
          description="Sora for headlines, Inter for body text."
        >
          <div className="space-y-10">
            {/* Font Families */}
            <Subsection title="Font Families">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border p-6">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Display / Headlines
                  </p>
                  <p className="font-sora text-3xl font-medium text-foreground">
                    Sora
                  </p>
                  <p className="mt-3 font-sora text-sm text-muted-foreground">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    <br />
                    abcdefghijklmnopqrstuvwxyz
                    <br />
                    0123456789
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    font-sora or font-display
                  </p>
                </div>
                <div className="rounded-xl border border-border p-6">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Body / UI
                  </p>
                  <p className="text-3xl font-medium text-foreground">Inter</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    <br />
                    abcdefghijklmnopqrstuvwxyz
                    <br />
                    0123456789
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    Default (font-sans)
                  </p>
                </div>
              </div>
            </Subsection>

            {/* Heading Scale */}
            <Subsection title="Heading Scale">
              <div className="space-y-8">
                <div className="border-b border-border pb-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      H1
                    </span>
                    <span className="text-xs text-muted-foreground">Hero headlines</span>
                  </div>
                  <h1 className="font-sora text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-[3.5rem]">
                    Build human-like voice AI
                  </h1>
                </div>
                <div className="border-b border-border pb-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      H2
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Section headlines
                    </span>
                  </div>
                  <h2 className="font-sora text-[2rem] font-medium leading-[1.25] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
                    Why Plivo's agents are human-like
                  </h2>
                </div>
                <div className="border-b border-border pb-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      H3
                    </span>
                    <span className="text-xs text-muted-foreground">Card titles</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    No-code Voice AI platform
                  </h3>
                </div>
                <div className="border-b border-border pb-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      H4
                    </span>
                    <span className="text-xs text-muted-foreground">Subsections</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Feature title here
                  </h4>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      H5
                    </span>
                    <span className="text-xs text-muted-foreground">Small headings</span>
                  </div>
                  <h5 className="text-base font-semibold text-foreground">
                    Small section heading
                  </h5>
                </div>
              </div>
            </Subsection>

            {/* Body Text */}
            <Subsection title="Body Text">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">
                    Large
                  </span>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    From no-code builders for teams to flexible APIs for
                    developers, deploy voice agents that actually sound human.
                  </p>
                </div>
                <Separator />
                <div className="flex items-start gap-6">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">
                    Base
                  </span>
                  <p className="text-base text-muted-foreground">
                    Build, deploy, and scale voice agents without writing a
                    single line of code. Perfect for SMBs who want results, fast.
                  </p>
                </div>
                <Separator />
                <div className="flex items-start gap-6">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">
                    Small
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Get $10 in free credits. No credit card required. Deploy your
                    first agent in minutes.
                  </p>
                </div>
                <Separator />
                <div className="flex items-start gap-6">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">
                    Caption
                  </span>
                  <p className="text-xs text-muted-foreground">
                    *Terms and conditions apply. Free credits expire after 30
                    days.
                  </p>
                </div>
              </div>
            </Subsection>

            {/* Font Weights */}
            <Subsection title="Font Weights">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-2xl font-normal text-foreground">Normal</p>
                  <p className="mt-1 text-xs text-muted-foreground">font-normal (400)</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-2xl font-medium text-foreground">Medium</p>
                  <p className="mt-1 text-xs text-muted-foreground">font-medium (500)</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-2xl font-semibold text-foreground">Semibold</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    font-semibold (600)
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-2xl font-bold text-foreground">Bold</p>
                  <p className="mt-1 text-xs text-muted-foreground">font-bold (700)</p>
                </div>
              </div>
            </Subsection>

            <CodeBlock>
              {`/* H1 - Hero */
<h1 className="font-sora text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">

/* H2 - Section */
<h2 className="font-sora text-[2rem] md:text-[2.5rem] md:text-[3rem] font-medium leading-[1.25] tracking-[-0.02em] text-foreground">

/* H3 - Card title */
<h3 className="text-2xl font-semibold text-foreground">

/* Body large */
<p className="text-lg md:text-xl text-muted-foreground">

/* Body base */
<p className="text-base text-muted-foreground">

/* Body small */
<p className="text-sm text-muted-foreground">`}
            </CodeBlock>
          </div>
        </Section>

        {/* ============================================ */}
        {/* BUTTONS */}
        {/* ============================================ */}
        <Section
          id="buttons"
          title="Buttons"
          description="Button styles, sizes, and states."
        >
          <div className="space-y-10">
            {/* Primary Styles */}
            <Subsection title="Primary Buttons">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-base font-medium text-background transition-colors cta-hover-gradient"
                >
                  Start for Free
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-base font-medium text-background transition-colors cta-hover-gradient"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-300 px-6 py-3 text-base font-medium text-muted-foreground"
                >
                  Disabled
                </a>
              </div>
              <CodeBlock>
                {`<a className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-base font-medium text-background transition-colors cta-hover-gradient">
  Start for Free
</a>`}
              </CodeBlock>
            </Subsection>

            {/* Secondary Buttons */}
            <Subsection title="Secondary Buttons">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
                >
                  Talk to Sales
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-base font-medium text-muted-foreground"
                >
                  Disabled
                </a>
              </div>
              <CodeBlock>
                {`<a className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface">
  Talk to Sales
</a>`}
              </CodeBlock>
            </Subsection>

            {/* Gradient Button */}
            <Subsection title="Gradient Button (Use Sparingly)">
              <div className="flex flex-wrap items-center gap-4">
                <a href="#" className="btn-primary">
                  Get Access
                </a>
                <a
                  href="#"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" /> Try AI Agent
                </a>
              </div>
              <CodeBlock>
                {`<a className="btn-primary">Get Access</a>

/* btn-primary applies: */
background: linear-gradient(90deg, #cd3ef9, #323dfe);
hover: translateY(-2px) + box-shadow: 0 0 30px rgba(205, 62, 249, 0.4);`}
              </CodeBlock>
            </Subsection>

            {/* Button Sizes */}
            <Subsection title="Button Sizes (shadcn/ui)">
              <div className="flex flex-wrap items-end gap-4">
                <div className="text-center">
                  <Button size="sm">Small</Button>
                  <p className="mt-2 text-xs text-muted-foreground">size="sm"</p>
                </div>
                <div className="text-center">
                  <Button size="default">Default</Button>
                  <p className="mt-2 text-xs text-muted-foreground">size="default"</p>
                </div>
                <div className="text-center">
                  <Button size="lg">Large</Button>
                  <p className="mt-2 text-xs text-muted-foreground">size="lg"</p>
                </div>
                <div className="text-center">
                  <Button size="xl">Extra Large</Button>
                  <p className="mt-2 text-xs text-muted-foreground">size="xl"</p>
                </div>
                <div className="text-center">
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">size="icon"</p>
                </div>
              </div>
            </Subsection>

            {/* Button Variants */}
            <Subsection title="Button Variants (shadcn/ui)">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </Subsection>

            {/* Button States */}
            <Subsection title="Button States">
              <div className="flex flex-wrap items-center gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button leftIcon={<Download className="h-4 w-4" />}>
                  With Icon
                </Button>
                <Button rightIcon={<ExternalLink className="h-4 w-4" />}>
                  External
                </Button>
              </div>
              <CodeBlock>
                {`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button leftIcon={<Download />}>With Icon</Button>
<Button rightIcon={<ExternalLink />}>External</Button>`}
              </CodeBlock>
            </Subsection>

            {/* Dual CTA Pattern */}
            <Subsection title="Dual CTA Pattern (Hero Sections)">
              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
                  >
                    Talk to Sales
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-base font-medium text-background transition-colors cta-hover-gradient"
                  >
                    Start for Free
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Always use both CTAs together in hero sections. Secondary first,
                primary second.
              </p>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* FORM ELEMENTS */}
        {/* ============================================ */}
        <Section
          id="forms"
          title="Form Elements"
          description="Inputs, textareas, selects, checkboxes, switches, and more."
        >
          <div className="space-y-10">
            {/* Text Inputs */}
            <Subsection title="Text Inputs">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    Default Input
                  </label>
                  <Input placeholder="Enter your email" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    With Left Icon
                  </label>
                  <Input
                    placeholder="Search..."
                    leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
                    className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    With Right Icon
                  </label>
                  <Input
                    placeholder="Enter email"
                    rightIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
                    className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    Clearable
                  </label>
                  <Input
                    placeholder="Type something..."
                    clearable
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onClear={() => setInputValue("")}
                    className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    Password
                  </label>
                  <Input type="password" placeholder="Enter password" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    Error State
                  </label>
                  <Input placeholder="Invalid input" error className="bg-background text-foreground placeholder:text-muted-foreground" />
                  <p className="mt-1 text-sm text-red-500">
                    This field is required
                  </p>
                </div>
              </div>
              <CodeBlock>
                {`/* Light mode input styling */
<Input
  placeholder="Enter text..."
  className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground"
/>

/* With icons */
<Input
  leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
  className="bg-background border-border-strong text-foreground"
/>`}
              </CodeBlock>
            </Subsection>

            {/* Input Sizes */}
            <Subsection title="Input Sizes">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-xs text-muted-foreground">
                    Small
                  </label>
                  <Input size="sm" placeholder="Small" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-muted-foreground">
                    Default
                  </label>
                  <Input size="default" placeholder="Default" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-muted-foreground">
                    Large
                  </label>
                  <Input size="lg" placeholder="Large" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-muted-foreground">
                    Extra Large
                  </label>
                  <Input size="xl" placeholder="Extra Large" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
            </Subsection>

            {/* Textarea */}
            <Subsection title="Textarea">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    Default
                  </label>
                  <Textarea placeholder="Enter your message..." className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    With Clearable
                  </label>
                  <Textarea placeholder="Type here..." clearable className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
            </Subsection>

            {/* Select */}
            <Subsection title="Select">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    Default Select
                  </label>
                  <Select>
                    <SelectTrigger className="bg-background border-border-strong text-foreground">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="voice" className="text-foreground">Voice</SelectItem>
                      <SelectItem value="sms" className="text-foreground">SMS</SelectItem>
                      <SelectItem value="whatsapp" className="text-foreground">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground/80">
                    With Icon
                  </label>
                  <Select>
                    <SelectTrigger icon={Phone} className="bg-background border-border-strong text-foreground">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="voice" icon={Phone} className="text-foreground">
                        Voice
                      </SelectItem>
                      <SelectItem value="sms" icon={MessageSquare} className="text-foreground">
                        SMS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Subsection>

            {/* Checkbox & Switch */}
            <Subsection title="Checkbox & Switch">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground/80">Checkboxes</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="check1" />
                      <label
                        htmlFor="check1"
                        className="text-sm text-foreground/80"
                      >
                        Accept terms and conditions
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="check2" defaultChecked />
                      <label
                        htmlFor="check2"
                        className="text-sm text-foreground/80"
                      >
                        Subscribe to newsletter
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="check3" disabled className="border-border-strong" />
                      <label
                        htmlFor="check3"
                        className="text-sm text-muted-foreground"
                      >
                        Disabled option
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground/80">Switches</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Switch id="switch1" />
                      <label
                        htmlFor="switch1"
                        className="text-sm text-foreground/80"
                      >
                        Enable notifications
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="switch2" defaultChecked />
                      <label
                        htmlFor="switch2"
                        className="text-sm text-foreground/80"
                      >
                        Active switch
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="switch3" disabled />
                      <label
                        htmlFor="switch3"
                        className="text-sm text-muted-foreground"
                      >
                        Disabled
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock>
                {`/* Checkbox - uses blue-500 accent by default */
<Checkbox />
<Checkbox defaultChecked />

/* Switch - grey inactive, blue-500 active */
<Switch />
<Switch defaultChecked />`}
              </CodeBlock>
            </Subsection>

            {/* Form Labels */}
            <Subsection title="Form Labels & Helper Text">
              <div className="max-w-md space-y-1">
                <label className="block text-sm font-medium text-foreground/80">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input placeholder="you@company.com" className="bg-background border-border-strong text-foreground placeholder:text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  We'll never share your email with anyone else.
                </p>
              </div>
              <CodeBlock>
                {`<label className="block text-sm font-medium text-foreground/80">
  Email Address <span className="text-red-500">*</span>
</label>
<Input placeholder="you@company.com" />
<p className="text-xs text-muted-foreground">Helper text here</p>`}
              </CodeBlock>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* CARDS */}
        {/* ============================================ */}
        <Section
          id="cards"
          title="Cards"
          description="Card layouts for features, content, and interactive elements."
        >
          <div className="space-y-10">
            {/* Feature Card Gradient */}
            <Subsection title="Feature Card (Gradient Background)">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-100 via-indigo-50 via-60% to-neutral-50">
                  <div className="flex h-40 items-center justify-center bg-gradient-to-b from-indigo-100/50 to-transparent">
                    <div className="rounded-xl bg-background p-4 shadow-sm">
                      <Sparkles className="h-8 w-8 text-indigo-500" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      No-code Voice AI
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Build, deploy, and scale voice agents without code.
                    </p>
                    <div className="mb-6 flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 text-blue-600"
                          strokeWidth={3}
                        />
                        <span className="text-sm text-foreground/80">
                          Plain English
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 text-blue-600"
                          strokeWidth={3}
                        />
                        <span className="text-sm text-foreground/80">
                          Drag & drop
                        </span>
                      </div>
                    </div>
                    <button className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background cta-hover-gradient">
                      Try Builder
                    </button>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-fuchsia-100 via-fuchsia-50 via-60% to-neutral-50">
                  <div className="flex h-40 items-center justify-center bg-gradient-to-b from-fuchsia-100/50 to-transparent">
                    <div className="rounded-xl bg-background p-4 shadow-sm">
                      <Zap className="h-8 w-8 text-fuchsia-500" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      Modular Infrastructure
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Pick and choose voice AI components you need.
                    </p>
                    <div className="mb-6 flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 text-blue-600"
                          strokeWidth={3}
                        />
                        <span className="text-sm text-foreground/80">
                          Bring your LLM
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 text-blue-600"
                          strokeWidth={3}
                        />
                        <span className="text-sm text-foreground/80">
                          Full control
                        </span>
                      </div>
                    </div>
                    <button className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background cta-hover-gradient">
                      Explore API
                    </button>
                  </div>
                </div>
              </div>
            </Subsection>

            {/* Info Card */}
            <Subsection title="Info Card (Gray Background)">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl bg-surface">
                  <div className="flex h-40 items-center justify-center">
                    <Globe className="h-16 w-16 text-gray-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      &lt; 500ms latency
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          One-hop routing
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Real-time
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl bg-surface">
                  <div className="flex h-40 items-center justify-center">
                    <Shield className="h-16 w-16 text-gray-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      Enterprise Security
                    </h3>
                    <ul className="grid grid-cols-2 gap-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          SOC 2 Type II
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">HIPAA</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Subsection>

            {/* shadcn Card */}
            <Subsection title="shadcn/ui Card">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>Card with default styling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Content goes here.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
                <Card variant="outline">
                  <CardHeader>
                    <CardTitle>Outline</CardTitle>
                    <CardDescription>With outline variant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Different border style.
                    </p>
                  </CardContent>
                </Card>
                <Card variant="ghost">
                  <CardHeader>
                    <CardTitle>Ghost</CardTitle>
                    <CardDescription>Minimal styling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">No visible border.</p>
                  </CardContent>
                </Card>
              </div>
            </Subsection>

            {/* Stat Card */}
            <Subsection title="Stat Cards">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {[
                  { value: "< 500ms", label: "Voice latency" },
                  { value: "99.99%", label: "Platform uptime" },
                  { value: "50+", label: "Languages" },
                  { value: "150+", label: "Countries" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-background p-6"
                  >
                    <div className="text-3xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* BADGES */}
        {/* ============================================ */}
        <Section
          id="badges"
          title="Badges & Pills"
          description="One pill system across the whole site. Built on four utilities defined in global.css: .pill, .pill-mono, .pill-accent, .pill-active. Update global.css and every pill changes."
        >
          <div className="space-y-10">
            {/* Canonical pill specimens */}
            <Subsection title="Pill System (.pill / .pill-mono / .pill-accent / .pill-active)">
              <div className="space-y-4">
                <div>
                  <div className="font-mono-ui mb-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">.pill — default tag</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="pill">English</span>
                    <span className="pill">Customer support</span>
                    <span className="pill">Real-time</span>
                    <span className="pill">Hindi</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono-ui mb-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">.pill-mono — metadata / version</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="pill-mono">v2.14</span>
                    <span className="pill-mono">en-US</span>
                    <span className="pill-mono">stt</span>
                    <span className="pill-mono">&lt; 300 ms</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono-ui mb-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">.pill-accent — reply chip / soft highlight</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="pill-accent">Serums</span>
                    <span className="pill-accent">Gift Sets</span>
                    <span className="pill-accent">Moisturizers</span>
                    <span className="pill-accent">View deals</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono-ui mb-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">.pill-active — on / live / active</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="pill-active">LIVE</span>
                    <span className="pill-active">ON</span>
                    <span className="pill-active">Approved</span>
                  </div>
                </div>
              </div>
            </Subsection>

            {/* shadcn Badges — still available for specific cases */}
            <Subsection title="Badge Variants (shadcn)">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </Subsection>

            {/* Channel Pills */}
            <Subsection title="Channel Pills (Hero)">
              <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
                <span className="mr-1 text-xs font-medium text-muted-foreground">
                  Available on
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-gray-200"
                >
                  <Phone className="h-3 w-3" />
                  Voice
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-gray-200"
                >
                  <MessageSquare className="h-3 w-3" />
                  Chat
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-gray-200"
                >
                  <MessageSquare className="h-3 w-3" />
                  SMS
                </a>
              </div>
            </Subsection>

            {/* Tag Pills */}
            <Subsection title="Tag Pills">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
                  English
                </span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
                  Customer Support
                </span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
                  Hindi
                </span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
                  Real-time
                </span>
              </div>
            </Subsection>

            {/* Status Indicators */}
            <Subsection title="Status Indicators">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">Online</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="text-sm font-medium text-foreground">Processing</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-foreground">Offline</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-gray-400" />
                  <span className="text-sm font-medium text-foreground">Unknown</span>
                </div>
              </div>
            </Subsection>

            {/* Feature Tags */}
            <Subsection title="Feature Tags">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  <Zap className="h-3 w-3" /> New
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                  <Check className="h-3 w-3" /> Verified
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                  <Sparkles className="h-3 w-3" /> AI Powered
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                  <Star className="h-3 w-3" /> Popular
                </span>
              </div>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* AVATARS */}
        {/* ============================================ */}
        <Section
          id="avatars"
          title="Avatars"
          description="User avatars, avatar groups, and fallbacks."
        >
          <div className="space-y-10">
            {/* Avatar Sizes */}
            <Subsection title="Avatar Sizes">
              <div className="flex items-end gap-4">
                <div className="text-center">
                  <Avatar size="xs">
                    <AvatarFallback>XS</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-xs text-muted-foreground">xs</p>
                </div>
                <div className="text-center">
                  <Avatar size="sm">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-xs text-muted-foreground">sm</p>
                </div>
                <div className="text-center">
                  <Avatar size="md">
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-xs text-muted-foreground">md</p>
                </div>
                <div className="text-center">
                  <Avatar size="lg">
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-xs text-muted-foreground">lg</p>
                </div>
                <div className="text-center">
                  <Avatar size="xl">
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-xs text-muted-foreground">xl</p>
                </div>
                <div className="text-center">
                  <Avatar size="2xl">
                    <AvatarFallback>2X</AvatarFallback>
                  </Avatar>
                  <p className="mt-2 text-xs text-muted-foreground">2xl</p>
                </div>
              </div>
            </Subsection>

            {/* Avatar Group */}
            <Subsection title="Avatar Group">
              <AvatarGroup max={4}>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>GH</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>IJ</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <CodeBlock>
                {`<AvatarGroup max={4}>
  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
  ...
</AvatarGroup>`}
              </CodeBlock>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* TABS */}
        {/* ============================================ */}
        <Section id="tabs" title="Tabs" description="Tab navigation component.">
          <Tabs defaultValue="voice" className="w-full">
            <TabsList className="bg-muted">
              <TabsTrigger value="voice" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">Voice</TabsTrigger>
              <TabsTrigger value="sms" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">SMS</TabsTrigger>
              <TabsTrigger value="whatsapp" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">WhatsApp</TabsTrigger>
            </TabsList>
            <TabsContent value="voice" className="mt-4">
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm text-muted-foreground">
                  Voice AI agents that sound human with &lt;500ms latency.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="sms" className="mt-4">
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm text-muted-foreground">
                  Global SMS coverage in 190+ countries.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="whatsapp" className="mt-4">
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm text-muted-foreground">
                  Reach 2B+ WhatsApp users worldwide.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          <CodeBlock>
            {`<Tabs defaultValue="voice">
  <TabsList className="bg-muted">
    <TabsTrigger
      value="voice"
      className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
    >
      Voice
    </TabsTrigger>
  </TabsList>
  <TabsContent value="voice">Content here</TabsContent>
</Tabs>`}
          </CodeBlock>
        </Section>

        {/* ============================================ */}
        {/* ACCORDION */}
        {/* ============================================ */}
        <Section
          id="accordion"
          title="Accordion"
          description="Collapsible content sections for FAQs."
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border">
              <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                What is Plivo?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Plivo is a cloud communications platform that enables businesses
                to build voice and messaging applications using APIs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border">
              <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                How does pricing work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Plivo offers pay-as-you-go pricing with no minimum commitments.
                You only pay for what you use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border">
              <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                Do you offer a free trial?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Sign up and get $10 in free credits. No credit card
                required.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock>
            {`<Accordion type="single" collapsible>
  <AccordionItem value="item-1" className="border-border">
    <AccordionTrigger className="text-foreground hover:text-primary">
      Question here?
    </AccordionTrigger>
    <AccordionContent className="text-muted-foreground">
      Answer here.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          </CodeBlock>
        </Section>

        {/* ============================================ */}
        {/* TABLES */}
        {/* ============================================ */}
        <Section
          id="tables"
          title="Tables"
          description="Data tables for pricing, comparisons, and lists."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-semibold text-foreground">Feature</th>
                  <th className="pb-3 font-semibold text-foreground">Starter</th>
                  <th className="pb-3 font-semibold text-foreground">Pro</th>
                  <th className="pb-3 font-semibold text-foreground">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 text-muted-foreground">Voice minutes</td>
                  <td className="py-3 text-foreground">1,000</td>
                  <td className="py-3 text-foreground">10,000</td>
                  <td className="py-3 text-foreground">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 text-muted-foreground">AI Agents</td>
                  <td className="py-3 text-foreground">1</td>
                  <td className="py-3 text-foreground">5</td>
                  <td className="py-3 text-foreground">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 text-muted-foreground">Support</td>
                  <td className="py-3 text-foreground">Email</td>
                  <td className="py-3 text-foreground">Priority</td>
                  <td className="py-3 text-foreground">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
          <CodeBlock>
            {`<table className="w-full text-left text-sm">
  <thead>
    <tr className="border-b border-border">
      <th className="pb-3 font-semibold text-foreground">Header</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-border">
    <tr>
      <td className="py-3 text-muted-foreground">Cell</td>
    </tr>
  </tbody>
</table>`}
          </CodeBlock>
        </Section>

        {/* ============================================ */}
        {/* LISTS */}
        {/* ============================================ */}
        <Section
          id="lists"
          title="Lists"
          description="Check lists, bullet lists, and feature lists."
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* Check List */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Check List
              </h4>
              <ul className="space-y-2">
                {["Feature one", "Feature two", "Feature three"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Check List Bold */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Check List (Bold)
              </h4>
              <ul className="space-y-2">
                {["Feature one", "Feature two", "Feature three"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" strokeWidth={3} />
                    <span className="text-sm font-medium text-foreground/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Grid Check List */}
            <div className="md:col-span-2">
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Grid Check List
              </h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4">
                {[
                  "AI noise cancellation",
                  "30+ languages",
                  "Turn detection",
                  "Natural prosody",
                  "Real-time analytics",
                  "Custom voices",
                  "Barge-in handling",
                  "Silence detection",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* LINKS */}
        {/* ============================================ */}
        <Section
          id="links"
          title="Links"
          description="Link styles for navigation and inline text."
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Default Link
              </a>
              <a
                href="#"
                className="text-sm text-primary hover:text-primary hover:underline"
              >
                Plivo Blue Link
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary"
              >
                With Arrow <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary"
              >
                External <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="rounded-lg bg-surface p-4">
              <p className="text-sm text-muted-foreground">
                Inline link example: Learn more about our{" "}
                <a href="#" className="text-primary hover:underline">
                  pricing plans
                </a>{" "}
                or{" "}
                <a href="#" className="text-primary hover:underline">
                  contact sales
                </a>{" "}
                for enterprise options.
              </p>
            </div>
            <CodeBlock>
              {`/* Plivo Blue links */
<a className="text-primary hover:text-primary hover:underline">
  Link text
</a>

/* With icon */
<a className="inline-flex items-center gap-1 text-primary">
  Link <ChevronRight className="h-4 w-4" />
</a>`}
            </CodeBlock>
          </div>
        </Section>

        {/* ============================================ */}
        {/* ALERTS */}
        {/* ============================================ */}
        <Section
          id="alerts"
          title="Alerts & Notices"
          description="Informational banners and alert messages."
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Information</p>
                <p className="text-sm text-blue-700">
                  This is an informational message for users.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/30 p-4">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-300" />
              <div>
                <p className="font-medium text-green-900">Success</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your action was completed successfully.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/30 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-300" />
              <div>
                <p className="font-medium text-yellow-900">Warning</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please review before proceeding.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/30 p-4">
              <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-300" />
              <div>
                <p className="font-medium text-red-900">Error</p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Something went wrong. Please try again.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* SEPARATORS */}
        {/* ============================================ */}
        <Section
          id="separators"
          title="Separators"
          description="Horizontal and vertical dividers."
        >
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-sm text-muted-foreground">Horizontal</p>
              <Separator />
            </div>
            <div>
              <p className="mb-4 text-sm text-muted-foreground">With Text</p>
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm text-muted-foreground">Vertical</p>
              <div className="flex h-8 items-center gap-4">
                <span className="text-sm">Item 1</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Item 2</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Item 3</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* SHADOWS */}
        {/* ============================================ */}
        <Section
          id="shadows"
          title="Shadows"
          description="Elevation levels for cards and components."
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <p className="font-medium text-foreground">shadow-sm</p>
              <p className="mt-1 text-xs text-muted-foreground">Subtle</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <p className="font-medium text-foreground">shadow-sm</p>
              <p className="mt-1 text-xs text-muted-foreground">Default cards</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <p className="font-medium text-foreground">shadow-sm</p>
              <p className="mt-1 text-xs text-muted-foreground">Hover states</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-6 ">
              <p className="font-medium text-foreground"></p>
              <p className="mt-1 text-xs text-muted-foreground">Modals, dropdowns</p>
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* BORDER RADIUS */}
        {/* ============================================ */}
        <Section
          id="radius"
          title="Border Radius"
          description="Corner radius values."
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-sm border border-border bg-primary" />
              <p className="text-xs text-muted-foreground">rounded-sm</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-md border border-border bg-primary" />
              <p className="text-xs text-muted-foreground">rounded-md</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-lg border border-border bg-primary" />
              <p className="text-xs text-muted-foreground">rounded-lg</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-xl border border-border bg-primary" />
              <p className="text-xs text-muted-foreground">rounded-xl</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-2xl border border-border bg-primary" />
              <p className="text-xs text-muted-foreground">rounded-2xl</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1 text-foreground/80">rounded-lg</code> for
            buttons and inputs,{" "}
            <code className="rounded bg-muted px-1 text-foreground/80">rounded-xl</code> for
            cards and sections.
          </p>
        </Section>

        {/* ============================================ */}
        {/* SPACING */}
        {/* ============================================ */}
        <Section
          id="spacing"
          title="Spacing"
          description="Consistent spacing patterns."
        >
          <div className="space-y-8">
            <Subsection title="Section Gaps">
              <div className="space-y-2 text-sm">
                <p>
                  <code className="rounded bg-muted px-1">gap-[160px]</code> -
                  Between major page sections
                </p>
                <p>
                  <code className="rounded bg-muted px-1">mb-12</code> -
                  Section heading to content
                </p>
                <p>
                  <code className="rounded bg-muted px-1">gap-5</code> - Card
                  grid gaps
                </p>
                <p>
                  <code className="rounded bg-muted px-1">gap-4</code> -
                  Button groups, form fields
                </p>
              </div>
            </Subsection>
            <Subsection title="Container">
              <CodeBlock>
                {`<div className="container mx-auto max-w-7xl px-4">
  {/* Content */}
</div>`}
              </CodeBlock>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* ICONS */}
        {/* ============================================ */}
        <Section
          id="icons"
          title="Icons"
          description="Lucide React icons used throughout the site."
        >
          <div className="space-y-8">
            <Subsection title="Common Icons">
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                {[
                  { Icon: Check, name: "Check" },
                  { Icon: ArrowRight, name: "ArrowRight" },
                  { Icon: ChevronRight, name: "ChevronRight" },
                  { Icon: Phone, name: "Phone" },
                  { Icon: MessageSquare, name: "MessageSquare" },
                  { Icon: Mail, name: "Mail" },
                  { Icon: Search, name: "Search" },
                  { Icon: User, name: "User" },
                  { Icon: Settings, name: "Settings" },
                  { Icon: Bell, name: "Bell" },
                  { Icon: Heart, name: "Heart" },
                  { Icon: Star, name: "Star" },
                  { Icon: Download, name: "Download" },
                  { Icon: ExternalLink, name: "ExternalLink" },
                  { Icon: Play, name: "Play" },
                  { Icon: Pause, name: "Pause" },
                  { Icon: Volume2, name: "Volume2" },
                  { Icon: Copy, name: "Copy" },
                  { Icon: Sparkles, name: "Sparkles" },
                  { Icon: Zap, name: "Zap" },
                  { Icon: Shield, name: "Shield" },
                  { Icon: Globe, name: "Globe" },
                  { Icon: Loader2, name: "Loader2" },
                  { Icon: X, name: "X" },
                ].map(({ Icon, name }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border p-3"
                  >
                    <Icon className="h-5 w-5 text-foreground/80" />
                    <span className="text-[10px] text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </Subsection>
            <Subsection title="Icon Sizes">
              <div className="flex items-end gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-3 w-3 text-foreground/80" />
                  <span className="text-xs text-muted-foreground">h-3 w-3</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-4 w-4 text-foreground/80" />
                  <span className="text-xs text-muted-foreground">h-4 w-4</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-5 w-5 text-foreground/80" />
                  <span className="text-xs text-muted-foreground">h-5 w-5</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-6 w-6 text-foreground/80" />
                  <span className="text-xs text-muted-foreground">h-6 w-6</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-8 w-8 text-foreground/80" />
                  <span className="text-xs text-muted-foreground">h-8 w-8</span>
                </div>
              </div>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* CODE COMPONENTS */}
        {/* ============================================ */}
        <Section
          id="code-components"
          title="Code Components"
          description="Syntax-highlighted code blocks for documentation and examples."
        >
          <div className="space-y-10">
            {/* Basic Code Block */}
            <Subsection title="React/TSX Code Block">
              <SyntaxCodeBlock
                language="React"
                filename="counter.tsx"
                code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
              />
            </Subsection>

            {/* TypeScript Example */}
            <Subsection title="TypeScript Code Block">
              <SyntaxCodeBlock
                language="TypeScript"
                filename="types.ts"
                code={`interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`}
              />
            </Subsection>

            {/* Component Example */}
            <Subsection title="Component with Props">
              <SyntaxCodeBlock
                language="React"
                filename="Button.tsx"
                code={`import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={getButtonStyles(variant, size)} {...props}>
      {children}
    </button>
  );
}`}
              />
            </Subsection>

            {/* CSS/Styles Example */}
            <Subsection title="CSS/Tailwind Code Block">
              <SyntaxCodeBlock
                language="CSS"
                filename="styles.css"
                code={`/* Plivo Brand Gradient */
.bg-plivo-gradient {
  background: linear-gradient(90deg, #cd3ef9, #323dfe);
}

/* Button hover effect */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(205, 62, 249, 0.4);
}`}
              />
            </Subsection>

            {/* Shell/Terminal Example */}
            <Subsection title="Terminal/Shell Commands">
              <SyntaxCodeBlock
                language="Shell"
                filename="terminal"
                code={`# Install dependencies
npm install @plivo/voice-sdk

# Start development server
npm run dev

# Build for production
npm run build`}
              />
            </Subsection>

            {/* Inline code */}
            <Subsection title="Inline Code">
              <p className="text-foreground/80">
                Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">Button</code> component
                with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">variant="primary"</code> for
                the main call-to-action.
              </p>
              <CodeBlock>
                {`/* Inline code styling */
<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
  code here
</code>`}
              </CodeBlock>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* ANIMATIONS */}
        {/* ============================================ */}
        <Section
          id="animations"
          title="Animations"
          description="Motion and transition effects."
        >
          <div className="space-y-8">
            <Subsection title="Built-in Animations">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-border p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-primary" />
                  </div>
                  <p className="font-medium text-foreground">animate-pulse</p>
                </div>
                <div className="rounded-lg border border-border p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="animate-appear h-8 w-8 rounded-lg bg-primary" />
                  </div>
                  <p className="font-medium text-foreground">animate-appear</p>
                </div>
                <div className="rounded-lg border border-border p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <p className="font-medium text-foreground">animate-spin</p>
                </div>
              </div>
            </Subsection>
            <Subsection title="Hover Effects">
              <div className="flex flex-wrap gap-4">
                <div className="cursor-pointer rounded-lg border border-border bg-background p-4 text-sm text-foreground/80 transition-transform hover:-translate-y-1">
                  hover:-translate-y-1
                </div>
                <div className="cursor-pointer rounded-lg border border-border bg-background p-4 text-sm text-foreground/80 transition-shadow hover:shadow-lg">
                  hover:shadow-lg
                </div>
                <div className="cursor-pointer rounded-lg border border-border bg-background p-4 text-sm text-foreground/80 transition-colors hover:bg-surface">
                  hover:bg-surface
                </div>
                <div className="cursor-pointer rounded-lg border border-border bg-background p-4 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-primary">
                  hover:border-primary
                </div>
              </div>
            </Subsection>
          </div>
        </Section>

        {/* ============================================ */}
        {/* SECTION PATTERNS */}
        {/* ============================================ */}
        <Section
          id="sections"
          title="Section Patterns"
          description="Common page section layouts."
        >
          <div className="space-y-10">
            {/* Centered Hero */}
            <Subsection title="Hero Section (Centered)">
              <div className="rounded-xl border border-border bg-background p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                    <span className="text-xs text-muted-foreground">Available on</span>
                    <span className="text-xs text-muted-foreground">Voice</span>
                  </div>
                </div>
                <h1 className="font-sora text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                  Build human-like voice AI
                </h1>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  Deploy voice agents that actually sound human.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="rounded-lg border border-border-strong px-5 py-2 text-sm font-medium text-foreground hover:bg-surface"
                  >
                    Talk to Sales
                  </a>
                  <a
                    href="#"
                    className="rounded-lg bg-foreground px-5 py-2 text-sm font-medium text-background cta-hover-gradient"
                  >
                    Start for Free
                  </a>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  $10 in free credits. No credit card required.
                </p>
              </div>
            </Subsection>

            {/* Split Hero - Left Text, Right Asset */}
            <Subsection title="Hero Section (Split - Left Text, Right Asset)">
              <div className="rounded-xl border border-border bg-background p-8">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  {/* Left: Text Content */}
                  <div>
                    <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                      <span className="text-xs text-muted-foreground">Available on</span>
                      <span className="text-xs text-muted-foreground">Voice</span>
                    </div>
                    <h1 className="font-sora text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                      Build human-like voice AI agents
                    </h1>
                    <p className="mt-4 max-w-lg text-muted-foreground">
                      From no-code builders for teams to flexible APIs for
                      developers, deploy voice agents that actually sound human.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface"
                      >
                        Talk to Sales
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background cta-hover-gradient"
                      >
                        Start for Free
                      </a>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      $10 in free credits. No credit card required.
                    </p>
                  </div>
                  {/* Right: Asset/Image Placeholder */}
                  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 p-8">
                    <div className="flex h-48 w-full items-center justify-center rounded-xl border border-border bg-background shadow-sm">
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#cd3ef9] to-primary">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Product mockup / illustration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock>
                {`/* Split Hero Pattern */
<section className="bg-background py-16 lg:py-24">
  <div className="container mx-auto max-w-7xl px-4">
    <div className="grid items-center gap-8 lg:grid-cols-2">
      {/* Left: Text */}
      <div>
        <div className="mb-4 inline-flex ...">Channel pills</div>
        <h1 className="font-sora text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
          Headline
        </h1>
        <p className="mt-4 text-muted-foreground">Subheadline</p>
        <div className="mt-6 flex gap-3">
          <a className="... border ...">Secondary CTA</a>
          <a className="... bg-foreground ...">Primary CTA</a>
        </div>
      </div>
      {/* Right: Asset */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 p-8">
        <img src="/images/mockups/hero-mockup.png" alt="Product" />
      </div>
    </div>
  </div>
</section>`}
              </CodeBlock>
            </Subsection>

            {/* CTA Section */}
            <Subsection title="CTA Section">
              <div className="rounded-xl bg-surface p-8 text-center">
                <h2 className="font-sora text-[2rem] md:text-[2.5rem] font-medium leading-[1.25] tracking-[-0.02em] text-foreground">
                  Start building your agent today
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  Get $10 in free credits. No credit card required.
                </p>
                <a
                  href="#"
                  className="mt-6 inline-block rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background cta-hover-gradient"
                >
                  Sign up now
                </a>
              </div>
            </Subsection>

            {/* Feature Grid */}
            <Subsection title="Feature Grid Section">
              <div className="rounded-xl border border-border bg-background p-8">
                <h2 className="font-sora mb-8 text-center text-[2rem] md:text-[2.5rem] font-medium leading-[1.25] tracking-[-0.02em] text-foreground">
                  Section Title
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    { icon: Zap, title: "Fast", desc: "Lightning quick responses" },
                    { icon: Shield, title: "Secure", desc: "Enterprise-grade security" },
                    { icon: Globe, title: "Global", desc: "150+ countries supported" },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-xl border border-border bg-surface p-6"
                    >
                      <feature.icon className="mb-4 h-8 w-8 text-primary" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Subsection>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Plivo Design System v1.0 | For internal use only
        </p>
      </div>
    </div>
  );
}
