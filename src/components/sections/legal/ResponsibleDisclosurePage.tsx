"use client";

import LegalLayout from "./LegalLayout";

export default function ResponsibleDisclosurePage() {
  return (
    <LegalLayout activePage="/legal/responsible-disclosure/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-semibold text-black">Responsible disclosure policy</h2>
        <span className="text-xs text-gray-400">Last updated: September 18, 2024</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>Plivo&apos;s responsible disclosure policy establishes guidelines for security researchers to safely report vulnerabilities affecting the company&apos;s systems and services.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Disclosure process</h3>
        <p>Researchers must:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Conduct testing without violating privacy, degrading user experience, or disrupting production</li>
          <li>Use exploits minimally to validate vulnerabilities only</li>
          <li>Report findings directly to <a href="mailto:security@plivo.com" className="text-[#323dfe] hover:underline">security@plivo.com</a> without public disclosure</li>
          <li>Refrain from sharing details via social media or third parties without written consent</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">In-scope vulnerabilities</h3>
        <p>The company actively seeks reports on:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Remote Code Execution (RCE)</li>
          <li>Server-Side Request Forgery (SSRF)</li>
          <li>SQL Injection</li>
          <li>Cross-Site Scripting (XSS)</li>
          <li>Authentication/authorization failures</li>
          <li>Privilege escalation issues</li>
          <li>Data leakage incidents</li>
          <li>Business logic flaws</li>
          <li>Security misconfigurations</li>
          <li>Issues compromising user data or system integrity</li>
        </ul>
        <p>Coverage includes Plivo.com subdomains and company products/services.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Out-of-scope issues</h3>
        <p>Excluded findings include: physical testing results, social engineering outcomes, UI/UX bugs, DDoS vulnerabilities, automated scanner reports, version disclosures, CSRF on unauthenticated forms, subdomain takeovers lacking evidence, CORS misconfigurations on non-sensitive endpoints, SSL/TLS configuration best practices, and other low-impact issues.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Prohibited submissions</h3>
        <p>Researchers must never submit personally identifiable information, credit card data, or payment information belonging to individuals, customers, or employees.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Reporting requirements</h3>
        <p>Submissions to <a href="mailto:security@plivo.com" className="text-[#323dfe] hover:underline">security@plivo.com</a> should include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Vulnerability description and potential impact</li>
          <li>Detailed reproduction steps</li>
          <li>Proof-of-concept scripts, screenshots, or screen recordings when possible</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Response timeline</h3>
        <p>Plivo commits to providing initial responses within ten working days, prioritizing issues by internal severity classification. The company reserves discretion regarding exploitability determination, risk classification, and priority assignment.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete Responsible Disclosure Policy, please visit{" "}
            <a href="https://www.plivo.com/reporting-vulnerability" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/reporting-vulnerability</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
