import LegalLayout from "./LegalLayout";

const storageRows = [
  {
    category: "Necessary",
    technologies: "plivo_cookie_preferences, theme, session-based geo cache",
    purpose:
      "Stores your consent choices, remembers display preferences, and supports core site behavior such as localized CTA defaults.",
    required: "Always on",
  },
  {
    category: "Analytics",
    technologies: "Google Tag Manager and analytics tags managed through it",
    purpose:
      "Measures traffic, page usage, and site performance after you opt in.",
    required: "Optional",
  },
  {
    category: "Marketing",
    technologies: "HubSpot tracking cookies and attribution tags",
    purpose:
      "Supports campaign attribution, marketing follow-up, and lead tracking after you opt in.",
    required: "Optional",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout activePage="/cookie-policy/">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-sora text-xl font-medium text-foreground">
            Cookie policy
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            This page explains how Plivo uses cookies and similar technologies,
            including local storage, session storage, scripts, and tags on
            plivo.com.
          </p>
        </div>
        <p className="text-xs text-muted-foreground sm:max-w-sm sm:text-right">
          Last updated: April 2, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm leading-7 text-foreground/80">
        <section>
          <h3 className="font-sora text-lg font-medium text-foreground">
            How we handle consent
          </h3>
          <p className="mt-2">
            Necessary storage remains active because it is required for core site
            functions. Optional analytics and marketing technologies stay off
            until you give consent. You can reject non-essential technologies,
            accept all, or save granular preferences.
          </p>
          <p className="mt-2">
            You can also withdraw or update your choice at any time by using the
            cookie settings control available across the site.
          </p>
          <button
            type="button"
            data-cookie-settings
            className="mt-4 rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Open cookie settings
          </button>
        </section>

        <section>
          <h3 className="font-sora text-lg font-medium text-foreground">
            Categories we use
          </h3>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="border-b border-border px-4 py-3 font-semibold text-foreground">
                    Category
                  </th>
                  <th className="border-b border-border px-4 py-3 font-semibold text-foreground">
                    Technologies
                  </th>
                  <th className="border-b border-border px-4 py-3 font-semibold text-foreground">
                    Purpose
                  </th>
                  <th className="border-b border-border px-4 py-3 font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {storageRows.map((row) => (
                  <tr key={row.category}>
                    <td className="border-b border-border px-4 py-3 font-medium text-foreground">
                      {row.category}
                    </td>
                    <td className="border-b border-border px-4 py-3">
                      {row.technologies}
                    </td>
                    <td className="border-b border-border px-4 py-3">
                      {row.purpose}
                    </td>
                    <td className="border-b border-border px-4 py-3">
                      {row.required}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="font-sora text-lg font-medium text-foreground">
            Providers currently covered by consent
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Google Tag Manager:</strong> loaded only when analytics
              consent is enabled.
            </li>
            <li>
              <strong>HubSpot tracking:</strong> loaded only when marketing
              consent is enabled.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-sora text-lg font-medium text-foreground">
            What changed in our implementation
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Optional scripts no longer load before consent.
            </li>
            <li>
              Rejecting non-essential technologies is available at the same first
              layer as accepting all.
            </li>
            <li>
              Cookie preferences can be changed later through a persistent cookie
              settings control.
            </li>
            <li>
              We removed an unused first-party email cookie from the site’s form
              flow.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-sora text-lg font-medium text-foreground">
            More information
          </h3>
          <p className="mt-2">
            For broader details on how we process personal data, please review our{" "}
            <a href="/legal/privacy/" className="text-primary hover:underline">
              privacy policy
            </a>
            . If you have privacy questions, you can contact{" "}
            <a
              href="mailto:privacy@plivo.com"
              className="text-primary hover:underline"
            >
              privacy@plivo.com
            </a>
            .
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
