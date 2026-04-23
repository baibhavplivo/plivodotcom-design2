import LegalLayout from "./LegalLayout";
import DOMPurify from "isomorphic-dompurify";
import {
  syncedLegalDocuments,
  type SyncedLegalDocumentKey,
} from "@/data/legal/synced-documents";

interface SyncedLegalPageProps {
  activePage: string;
  pageKey: SyncedLegalDocumentKey;
}

export default function SyncedLegalPage({
  activePage,
  pageKey,
}: SyncedLegalPageProps) {
  const page = syncedLegalDocuments[pageKey];

  return (
    <LegalLayout activePage={activePage}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="font-sora text-xl font-medium text-foreground">
          {page.title}
        </h2>
        {page.metaHtml ? (
          <div
            className="text-xs text-muted-foreground sm:max-w-sm sm:text-right [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.metaHtml) }}
          />
        ) : null}
      </div>

      <div
        className="prose prose-sm prose-headings:font-inter prose-headings:text-foreground prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-base prose-h3:font-semibold prose-h4:mt-4 prose-h4:mb-1 prose-h4:text-sm prose-h4:font-semibold prose-h5:text-sm prose-h5:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground max-w-none leading-relaxed text-foreground/80 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_tbody_td]:border-b [&_tbody_td]:border-border [&_tbody_td]:py-2.5 [&_tbody_td]:pr-4 [&_tbody_td]:align-top [&_thead_th]:border-b [&_thead_th]:border-border [&_thead_th]:py-2.5 [&_thead_th]:pr-4 [&_thead_th]:text-left [&_thead_th]:font-semibold [&_thead_th]:text-foreground"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.bodyHtml) }}
      />
    </LegalLayout>
  );
}
