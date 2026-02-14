"use client";

import LegalLayout from "./LegalLayout";

const customerDataProcessors = [
  { name: "Amazon Web Services", purpose: "Cloud infrastructure", location: "USA" },
  { name: "Redis Labs", purpose: "Caching", location: "USA" },
  { name: "Stripe Inc.", purpose: "Payment processing", location: "USA" },
  { name: "Zendesk Inc.", purpose: "Support and troubleshooting", location: "USA" },
  { name: "Salesforce.com Inc.", purpose: "CRM", location: "USA" },
  { name: "Mailgun", purpose: "Email delivery", location: "USA" },
  { name: "Slack", purpose: "Communications", location: "USA" },
  { name: "Zapier Inc.", purpose: "Process automation", location: "USA" },
  { name: "PostHog", purpose: "Feature flags and analytics", location: "USA" },
  { name: "Sentry", purpose: "Error monitoring", location: "USA" },
  { name: "Jitsu Inc.", purpose: "Data integration", location: "USA" },
  { name: "Explo", purpose: "Report generation", location: "USA" },
  { name: "OpenAI", purpose: "AI functionality", location: "USA" },
  { name: "Cerebras", purpose: "AI functionality", location: "USA" },
  { name: "Groq", purpose: "AI functionality", location: "USA" },
  { name: "Google LLC (AI)", purpose: "AI functionality", location: "USA" },
  { name: "Deepgram", purpose: "Transcription and audio", location: "USA" },
  { name: "Google LLC (Speech)", purpose: "Transcription and audio", location: "USA" },
  { name: "ElevenLabs", purpose: "Transcription and audio", location: "USA" },
  { name: "Cartesia", purpose: "Transcription and audio", location: "USA" },
  { name: "Rime", purpose: "Transcription and audio", location: "USA" },
  { name: "Google LLC (GCM, SSO, Email)", purpose: "Communications infrastructure", location: "USA" },
  { name: "Apple Inc.", purpose: "Push notifications", location: "USA" },
  { name: "Meta", purpose: "WhatsApp Cloud API", location: "USA" },
  { name: "PubNub Inc.", purpose: "Real-time notifications", location: "USA" },
  { name: "Altinity Inc.", purpose: "Data warehouse", location: "USA" },
  { name: "ClickHouse", purpose: "Data warehouse", location: "USA" },
  { name: "Shopify", purpose: "Marketplace", location: "USA" },
  { name: "FireCrawl", purpose: "Web crawling for RAG", location: "USA" },
  { name: "E2B", purpose: "Code execution", location: "USA" },
];

const visitorDataProcessors = [
  { name: "Salesforce.com", purpose: "Lead management", location: "USA" },
  { name: "LinkedIn Sales Navigator", purpose: "Prospect communication", location: "USA" },
  { name: "Clearbit Inc.", purpose: "Lead enrichment", location: "USA" },
  { name: "Cookie Bot", purpose: "Consent management", location: "USA" },
  { name: "HubSpot Inc.", purpose: "Marketing automation", location: "USA" },
  { name: "Google Ads", purpose: "Advertising", location: "USA" },
  { name: "Meta Ads", purpose: "Advertising", location: "USA" },
  { name: "LinkedIn Ads", purpose: "Advertising", location: "USA" },
  { name: "Google Analytics", purpose: "Web analytics", location: "USA" },
  { name: "Hot Jar", purpose: "Web analytics", location: "USA" },
  { name: "IP Info", purpose: "IP lookup", location: "USA" },
  { name: "RB2B", purpose: "Sales enablement", location: "USA" },
  { name: "PostHog", purpose: "Web analytics", location: "USA" },
];

function ProcessorTable({ processors }: { processors: { name: string; purpose: string; location: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 pr-4 font-semibold text-black">Subprocessor</th>
            <th className="text-left py-3 pr-4 font-semibold text-black">Purpose</th>
            <th className="text-left py-3 font-semibold text-black">Location</th>
          </tr>
        </thead>
        <tbody>
          {processors.map((processor, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2.5 pr-4 text-gray-900">{processor.name}</td>
              <td className="py-2.5 pr-4 text-gray-600">{processor.purpose}</td>
              <td className="py-2.5 text-gray-600">{processor.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SubprocessorsPage() {
  return (
    <LegalLayout activePage="/legal/subprocessors/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-inter text-xl font-semibold text-black">Subprocessors</h2>
        <span className="text-xs text-gray-400">Last updated: August 13, 2025</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          Plivo engages third-party subprocessors to assist in providing our services. The following lists identify the subprocessors used to process customer data and visitor data, respectively.
        </p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Customer data processors</h3>
        <p>The following subprocessors are engaged to process data on behalf of Plivo customers:</p>
        <ProcessorTable processors={customerDataProcessors} />

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Visitor data processors</h3>
        <p>The following subprocessors are engaged to process data from visitors to Plivo&rsquo;s websites:</p>
        <ProcessorTable processors={visitorDataProcessors} />

        <p className="mt-4 text-gray-600">
          All subprocessors operate under written data processing contracts in accordance with GDPR standards.
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete and up-to-date list of subprocessors, please visit{" "}
            <a href="https://www.plivo.com/subprocessors/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/subprocessors</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
