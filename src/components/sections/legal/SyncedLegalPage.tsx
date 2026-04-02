import LegalLayout from "./LegalLayout";
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
        <h2 className="font-sora text-xl font-medium text-black">
          {page.title}
        </h2>
        {page.metaHtml ? (
          <div
            className="text-xs text-gray-400 sm:max-w-sm sm:text-right [&_a]:text-[#323dfe] [&_a]:no-underline hover:[&_a]:underline"
            dangerouslySetInnerHTML={{ __html: page.metaHtml }}
          />
        ) : null}
      </div>

      <div
        className="prose prose-sm prose-headings:font-inter prose-headings:text-black prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-base prose-h3:font-semibold prose-h4:mt-4 prose-h4:mb-1 prose-h4:text-sm prose-h4:font-semibold prose-h5:text-sm prose-h5:font-semibold prose-a:text-[#323dfe] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 max-w-none leading-relaxed text-gray-700 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_tbody_td]:border-b [&_tbody_td]:border-gray-100 [&_tbody_td]:py-2.5 [&_tbody_td]:pr-4 [&_tbody_td]:align-top [&_thead_th]:border-b [&_thead_th]:border-gray-200 [&_thead_th]:py-2.5 [&_thead_th]:pr-4 [&_thead_th]:text-left [&_thead_th]:font-semibold [&_thead_th]:text-black"
        dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
      />
    </LegalLayout>
  );
}
