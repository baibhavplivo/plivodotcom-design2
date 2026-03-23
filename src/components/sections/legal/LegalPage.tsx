"use client";

import LegalLayout from "./LegalLayout";

export default function LegalPage() {
  return (
    <LegalLayout activePage="/legal/tos/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-medium text-black">Terms of service</h2>
        <span className="text-xs text-gray-400">Last updated: August 26, 2025</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          Welcome to the Plivo Cloud Communications Platform. Your use of the Website and the Plivo Cloud Communications Platform, including all associated features and functionalities, is subject to the terms and conditions set forth in these Terms of Service (&ldquo;ToS&rdquo;).
        </p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">1. Acceptance of terms</h3>
        <p>By accessing or using the Plivo Cloud Communications Platform (the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service. Plivo Inc. (&ldquo;Plivo,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;) operates a cloud platform enabling users to build voice and messaging applications. If you do not agree to these Terms, you may not use the Services.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">2. Modification of terms</h3>
        <p>Plivo reserves the right to update these Terms at any time. Your continued use of the Services on or after the date the updated version of ToS is effective constitutes your acceptance of the updated version.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">3. Service description</h3>
        <p>Plivo provides a cloud communications platform enabling users to integrate voice calling, messaging, and related communications capabilities into their applications through APIs and SDKs. The platform includes access to phone numbers, SIP trunking, and additional services as described in our documentation.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">4. Account responsibility</h3>
        <p>You are solely responsible for the usage of the Services under your Plivo account, including all activities by your end-users. You must ensure compliance with all applicable laws and regulations, and our Acceptable Use Policy.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">5. Intellectual property</h3>
        <p>All materials at the Website, including but not limited to text, software, scripts, code, designs, graphics, photos, sounds, music, videos, applications, interactive features, articles, news stories, sketches, animations, and all other content are the property of Plivo and/or its licensors and are protected under applicable intellectual property laws.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">6. Fees and payment</h3>
        <p>Services are billed according to our published pricing or as specified in a custom agreement. Invoices require payment within 7 days. Overdue amounts accrue interest at 1.5% per month. Unpaid balances may trigger account suspension, and accounts suspended beyond 30 days result in unrecoverable phone number reassignment.</p>
        <p>Abandoned call surcharges apply when abandoned calls exceed 20% monthly, at a rate of $0.02 per call for excess attempts.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">7. Limitation of liability</h3>
        <p>The Services are provided &ldquo;as is.&rdquo; Plivo disclaims all warranties regarding uninterrupted service, accuracy, or error correction. The sole and entire maximum liability of Plivo shall be limited to the amount paid by you within the previous seven (7) days.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">8. Emergency services disclaimer</h3>
        <p>The Plivo platform does not support emergency calls. You cannot contact any emergency services (such as 911 or equivalent) through the platform.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">9. Termination</h3>
        <p>Either party may terminate the agreement for convenience. Plivo may provide 7-day notice or terminate without notice if needed. Upon termination, Plivo cannot and will not be liable for any unauthorized access or use, corruption, deletion, or loss of any of your content.</p>
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">10. Phone number ownership</h3>
        <p>Plivo retains customer-of-record status for all assigned phone numbers. Porting restrictions and requirements apply for outbound transfers as detailed in our documentation.</p>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete and legally binding Terms of Service, please visit{" "}
            <a href="https://www.plivo.com/legal/tos/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/legal/tos</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
