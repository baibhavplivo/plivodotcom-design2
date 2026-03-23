"use client";

import LegalLayout from "./LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout activePage="/legal/privacy/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-medium text-black">Privacy policy</h2>
        <span className="text-xs text-gray-400">Last updated: September 17, 2024</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          This privacy notice applies to personal data collected via websites, applications, products, services, and communications with Plivo Inc. (&ldquo;Plivo,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;). This notice does not apply to data collected from employees or job applicants, which is governed by separate policies.
        </p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">1. Data controller &amp; processor</h3>
        <p>Plivo operates as both a data controller and a data processor. As a data controller, Plivo determines how personal data is collected, used, and managed across its services. As a data processor, Plivo handles personal data on behalf of its customers in accordance with their requirements and applicable data processing agreements.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">2. Regulatory compliance</h3>
        <p>Plivo complies with the General Data Protection Regulation (GDPR), the California Privacy Rights Act (CPRA), and various U.S. state privacy laws. We continuously monitor regulatory developments to ensure our practices remain compliant with evolving data protection requirements.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">3. Data collection</h3>
        <p>Plivo collects four types of personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Account Data</strong> &mdash; Information collected for account management, customer support, and billing purposes.</li>
          <li><strong>Usage Data</strong> &mdash; Information about calls, call duration, service type, and other usage metrics related to our platform.</li>
          <li><strong>Content Data</strong> &mdash; Emails, messages, and AI-generated content transmitted or processed through our services.</li>
          <li><strong>Visitor Data</strong> &mdash; Information collected when you visit our websites or sign up for accounts, including browsing behavior and form submissions.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">4. Data sharing</h3>
        <p>Plivo may share personal data with the following categories of recipients:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Telecom carriers</strong> &mdash; To facilitate voice and messaging services.</li>
          <li><strong>Sub-processors</strong> &mdash; Third-party vendors that assist in delivering our services.</li>
          <li><strong>Compliance entities</strong> &mdash; Law enforcement and regulatory bodies as required by applicable law.</li>
          <li><strong>Third-party advertisers</strong> &mdash; For marketing purposes, with opt-out options available to users.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">5. Data protection</h3>
        <p>Plivo implements physical, organizational, technical, and administrative measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and Plivo cannot guarantee absolute security.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">6. International transfers</h3>
        <p>Plivo transfers personal data internationally and relies on the following mechanisms to ensure adequate protection:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>EU-US Data Privacy Framework (DPF)</strong> certification</li>
          <li><strong>UK Extension to the EU-US DPF</strong> certification</li>
          <li><strong>Swiss-US Data Privacy Framework</strong> certification</li>
          <li><strong>Standard Contractual Clauses (SCCs)</strong> for transfers to other regions not covered by the above frameworks</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">7. Individual rights</h3>
        <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Right to access your personal data</li>
          <li>Right to deletion of your personal data</li>
          <li>Right to correction of inaccurate data</li>
          <li>Right to data portability</li>
          <li>Right to withdraw consent</li>
          <li>Right to breach notification</li>
          <li>Right to lodge complaints with supervisory authorities</li>
        </ul>
        <p>Plivo will respond to verified requests within 30 days. To exercise your rights, contact us at <a href="mailto:privacy@plivo.com" className="text-[#323dfe] hover:underline">privacy@plivo.com</a>.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">8. Automated decision-making</h3>
        <p>Plivo uses automated rules for fraud detection to protect our platform and users. If you are subject to automated decision-making, you have the right to object and receive a rationale for the decision.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">9. Data retention</h3>
        <p>Plivo retains personal data for 7 years after account closure, unless a different retention period is required by applicable law or regulation.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">10. Contact</h3>
        <p>For privacy-related inquiries, please contact:</p>
        <ul className="list-none pl-0 space-y-1">
          <li><strong>Data Protection Officer:</strong> Kunle Adewumi</li>
          <li><strong>Email:</strong> <a href="mailto:privacy@plivo.com" className="text-[#323dfe] hover:underline">privacy@plivo.com</a></li>
          <li><strong>Phone:</strong> +1 512 788 5087</li>
        </ul>
        <p className="mt-3"><strong>GDPR Representative:</strong> EDPO, Brussels, Belgium</p>
        <p><strong>UK Representative:</strong> EDPO UK Ltd, London, United Kingdom</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete and legally binding Privacy Policy, please visit{" "}
            <a href="https://www.plivo.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/legal/privacy</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
