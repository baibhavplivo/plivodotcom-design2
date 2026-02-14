"use client";

import LegalLayout from "./LegalLayout";

export default function SupplementalPage() {
  return (
    <LegalLayout activePage="/legal/supplemental/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-inter text-xl font-semibold text-black">Supplemental terms for WhatsApp Business Solutions</h2>
        <span className="text-xs text-gray-400">Last updated: May 26, 2025</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          These Supplemental Terms apply specifically to Plivo&rsquo;s WhatsApp Business Solutions and are incorporated into the Acceptable Use Policy. They govern the relationship between Plivo, as an authorized reseller of WhatsApp Business Solutions, and its customers.
        </p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">1. WhatsApp Business Solutions</h3>
        <p>Plivo is an authorized reseller of WhatsApp Business Solutions. Your usage of WhatsApp Business Solutions through Plivo constitutes a separate agreement with Meta Platforms Inc. You must comply with the following policies and terms:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>WhatsApp Business Solution Terms</li>
          <li>Meta Terms for WhatsApp Business</li>
          <li>Meta Hosting Terms for Cloud API</li>
          <li>Facebook Terms of Service</li>
          <li>Meta Commercial Terms</li>
          <li>WhatsApp Business Messaging Policy</li>
          <li>Beta Product Testing Terms (where applicable)</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">2. Liability disclaimer</h3>
        <p>WhatsApp Business Solutions are provided &ldquo;as is&rdquo; and &ldquo;where is.&rdquo; Plivo disclaims all liability for any losses or damages arising from the use of WhatsApp Business Solutions. Plivo further disclaims any HIPAA compliance warranties for third-party products integrated with or accessed through the WhatsApp Business Solutions.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">3. Restrictions</h3>
        <p className="font-semibold text-black uppercase">Customers are expressly prohibited from reselling, redistributing, sublicensing, or providing third-party access to Plivo&rsquo;s WhatsApp Business Services.</p>
        <p>Any attempt to resell, redistribute, or sublicense WhatsApp Business Solutions obtained through Plivo constitutes a material breach of these Supplemental Terms and the Terms of Service, and may result in immediate termination of your account.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">4. WhatsApp Business Calling API</h3>
        <p>The WhatsApp Business Calling API is a beta offering subject to Meta&rsquo;s Beta Product Testing Terms. This feature is limited to specific Meta-approved use cases and supports VoIP-to-VoIP calling only. You must obtain opt-in consent from recipients before initiating any calls through the WhatsApp Business Calling API.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete and legally binding Supplemental Terms, please visit{" "}
            <a href="https://www.plivo.com/supplemental-terms-for-whatsapp-business-solutions/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/supplemental-terms-for-whatsapp-business-solutions</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
