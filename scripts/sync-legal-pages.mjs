import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  __dirname,
  "../src/data/legal/synced-documents.ts",
);

const documents = [
  { key: "tos", sourceUrl: "https://www.plivo.com/legal/tos/" },
  {
    key: "tosPrevious",
    sourceUrl: "https://www.plivo.com/legal/tos/previous-tos/",
  },
  { key: "privacy", sourceUrl: "https://www.plivo.com/legal/privacy/" },
  {
    key: "privacy2024",
    sourceUrl: "https://www.plivo.com/legal/privacy/2024/",
  },
  { key: "aup", sourceUrl: "https://www.plivo.com/aup/" },
  {
    key: "aup20241220",
    sourceUrl: "https://www.plivo.com/aup/aup-2024-12-20/",
  },
  {
    key: "aup2021",
    sourceUrl: "https://www.plivo.com/aup/2021/",
  },
  {
    key: "supplemental",
    sourceUrl:
      "https://www.plivo.com/supplemental-terms-for-whatsapp-business-solutions/",
  },
  {
    key: "supplemental2023",
    sourceUrl:
      "https://www.plivo.com/supplemental-terms-for-whatsapp-business-solutions/2023/",
  },
  { key: "subprocessors", sourceUrl: "https://www.plivo.com/subprocessors/" },
  {
    key: "sla",
    sourceUrl: "https://www.plivo.com/legal/service-level-and-support/",
  },
  {
    key: "servicesSchedule",
    sourceUrl: "https://www.plivo.com/legal/services-schedule/",
  },
  {
    key: "additionalTerms",
    sourceUrl: "https://www.plivo.com/legal/service-schedule/sst-api/",
  },
  {
    key: "aiAddendum",
    sourceUrl:
      "https://www.plivo.com/legal/service-schedule/artificial-intelligence-services-addendum/",
  },
  {
    key: "responsibleDisclosure",
    sourceUrl: "https://www.plivo.com/reporting-vulnerability/",
  },
  {
    key: "responsibleDisclosure2021",
    sourceUrl: "https://www.plivo.com/reporting-vulnerabilities-2021/",
  },
  {
    key: "lawEnforcement",
    sourceUrl: "https://www.plivo.com/legal/enforcement-guidelines/",
  },
  {
    key: "copyright",
    sourceUrl:
      "https://www.plivo.com/legal/copyright-infringement-notification/",
  },
  {
    key: "securityOverview",
    sourceUrl: "https://www.plivo.com/legal/plivo-security-overview/",
  },
];

const localRouteMap = new Map([
  ["/legal/tos", "/legal/tos/"],
  ["/legal/tos/previous-tos", "/legal/tos/previous-tos/"],
  ["/legal/privacy", "/legal/privacy/"],
  ["/legal/privacy/2024", "/legal/privacy/2024/"],
  ["/aup", "/legal/aup/"],
  ["/aup/aup-2024-12-20", "/legal/aup/aup-2024-12-20/"],
  ["/aup/2021", "/legal/aup/2021/"],
  [
    "/supplemental-terms-for-whatsapp-business-solutions",
    "/legal/supplemental/",
  ],
  [
    "/supplemental-terms-for-whatsapp-business-solutions/2023",
    "/legal/supplemental/2023/",
  ],
  ["/subprocessors", "/legal/subprocessors/"],
  ["/legal/service-level-and-support", "/legal/sla/"],
  ["/legal/services-schedule", "/legal/services-schedule/"],
  ["/legal/service-schedule/sst-api", "/legal/additional-terms/"],
  [
    "/legal/service-schedule/artificial-intelligence-services-addendum",
    "/legal/ai-addendum/",
  ],
  ["/reporting-vulnerability", "/legal/responsible-disclosure/"],
  ["/reporting-vulnerabilities-2021", "/legal/responsible-disclosure/2021/"],
  ["/legal/enforcement-guidelines", "/legal/law-enforcement/"],
  ["/legal/copyright-infringement-notification", "/legal/copyright/"],
  ["/legal/plivo-security-overview", "/security/"],
  ["/security", "/security/"],
]);

const allowedAttributes = new Set([
  "href",
  "target",
  "rel",
  "id",
  "colspan",
  "rowspan",
  "scope",
  "start",
  "src",
  "alt",
]);

function normalizeWhitespace(value) {
  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function mapHref(href) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  try {
    const isAbsolute = href.startsWith("http");
    const url = isAbsolute
      ? new URL(href)
      : new URL(href, "https://www.plivo.com");
    const isPlivoHost =
      url.hostname === "www.plivo.com" || url.hostname === "plivo.com";

    if (!isPlivoHost && isAbsolute) {
      return href;
    }

    const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";
    const mappedPath = localRouteMap.get(normalizedPath);

    if (mappedPath) {
      return `${mappedPath}${url.hash || ""}`;
    }

    if (isPlivoHost) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return href;
  } catch {
    return href;
  }
}

function normalizeTables($, $root) {
  $root.find("table").each((_, table) => {
    const $table = $(table);

    if ($table.children("thead").length > 0) {
      return;
    }

    const $tbody = $table.children("tbody").first();
    const $firstRow = $tbody.children("tr").first();

    if ($firstRow.length === 0) {
      return;
    }

    const $thead = $("<thead></thead>");
    const $headerRow = $("<tr></tr>");

    $firstRow.children("td,th").each((_, cell) => {
      const $cell = $(cell);
      const $th = $("<th></th>");

      ["colspan", "rowspan", "scope"].forEach((attribute) => {
        const value = $cell.attr(attribute);
        if (value) {
          $th.attr(attribute, value);
        }
      });

      $th.html($cell.html() ?? "");
      $headerRow.append($th);
    });

    $thead.append($headerRow);
    $table.prepend($thead);
    $firstRow.remove();
  });
}

function sanitizeFragment(html) {
  const $ = load(`<div id="root">${html}</div>`, null, false);
  const $root = $("#root");

  $root.find(".hide, script, style, noscript, iframe").remove();
  $root.find("div.w-embed").each((_, element) => {
    $(element).replaceWith($(element).html() ?? "");
  });

  normalizeTables($, $root);

  $root.find("*").each((_, element) => {
    const $element = $(element);

    Object.keys(element.attribs ?? {}).forEach((attribute) => {
      if (!allowedAttributes.has(attribute)) {
        $element.removeAttr(attribute);
      }
    });

    if ($element.is("a")) {
      const href = $element.attr("href");
      const mappedHref = mapHref(href);
      if (mappedHref) {
        $element.attr("href", mappedHref);
      }

      if ($element.attr("target") === "_blank" && !$element.attr("rel")) {
        $element.attr("rel", "noopener noreferrer");
      }
    }
  });

  let didUnwrap = true;
  while (didUnwrap) {
    didUnwrap = false;
    $root.find("div, span").each((_, element) => {
      const $element = $(element);
      if (Object.keys(element.attribs ?? {}).length === 0) {
        $element.replaceWith($element.html() ?? "");
        didUnwrap = true;
      }
    });
  }

  $root.find("p, li, td, th, h2, h3, h4, h5, h6").each((_, element) => {
    const $element = $(element);
    const cleanedText = normalizeWhitespace($element.text());

    if (
      cleanedText === "" &&
      $element.find("img, a, table, ul, ol").length === 0
    ) {
      $element.remove();
    }
  });

  return ($root.html() ?? "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function extractHeader($wrapper, $) {
  const $headingBlock = $wrapper.children(".margin-bottom").first();
  const title =
    normalizeWhitespace($headingBlock.find("h1, h2, h3").first().text()) ||
    normalizeWhitespace($wrapper.find("h1, h2, h3").first().text());

  if ($headingBlock.length === 0) {
    return { title, metaHtml: "" };
  }

  const $headingClone = $headingBlock.clone();
  $headingClone.find("h1, h2, h3").remove();
  const metaHtml = sanitizeFragment($headingClone.html() ?? "");

  return { title, metaHtml };
}

function extractBody($wrapper, $) {
  const html = $wrapper
    .children()
    .filter((_, element) => {
      const $element = $(element);
      return (
        !$element.hasClass("margin-bottom") &&
        !$element.hasClass("hide") &&
        normalizeWhitespace($element.text()) !== ""
      );
    })
    .map((_, element) => $.html(element))
    .get()
    .join("");

  if (html) {
    return sanitizeFragment(html);
  }

  const fallbackHtml = $wrapper
    .find(".guide-ritch-text")
    .filter((_, element) => $(element).parents(".hide").length === 0)
    .last()
    .html();

  return sanitizeFragment(fallbackHtml ?? "");
}

async function fetchDocument({ key, sourceUrl }) {
  const response = await fetch(sourceUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${sourceUrl}: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const $ = load(html);
  const $wrapper = $(".dlc-content-wrapper").first();

  if ($wrapper.length === 0) {
    throw new Error(`Could not find .dlc-content-wrapper in ${sourceUrl}`);
  }

  const { title, metaHtml } = extractHeader($wrapper, $);
  const bodyHtml = extractBody($wrapper, $);

  if (!title || !bodyHtml) {
    throw new Error(`Missing extracted title/body for ${sourceUrl}`);
  }

  return {
    title,
    metaHtml,
    bodyHtml,
    sourceUrl,
  };
}

async function main() {
  const syncedDocuments = {};

  for (const document of documents) {
    syncedDocuments[document.key] = await fetchDocument(document);
  }

  const fileContents = `export const syncedLegalDocuments = ${JSON.stringify(
    syncedDocuments,
    null,
    2,
  )} as const;\n\nexport type SyncedLegalDocumentKey = keyof typeof syncedLegalDocuments;\n`;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, fileContents);

  console.log(`Synced ${documents.length} documents to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
