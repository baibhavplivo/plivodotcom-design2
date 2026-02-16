"use client";

import LegalLayout from "./LegalLayout";

export default function LawEnforcementPage() {
  return (
    <LegalLayout activePage="/legal/law-enforcement/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-semibold text-black">Law enforcement guidelines</h2>
        <span className="text-xs text-gray-400">Last updated: October 12, 2021</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>Plivo receives requests from government and law enforcement agencies for user information. The organization reviews each request carefully to ensure compliance with applicable law. These guidelines serve as a manual for government and law enforcement agencies requesting information from Plivo.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Required legal process</h3>
        <p>Plivo will not disclose customer information without proper legal authorization. The company requires a valid subpoena, court order, search warrant, or other formal legal demand issued to Plivo.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Submission requirements</h3>
        <p>Requests must be sent to: <a href="mailto:legalrequests@plivo.com" className="text-[#323dfe] hover:underline">legalrequests@plivo.com</a></p>
        <p>Each request must include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Origin from a government or law enforcement agency using their registered email domain</li>
          <li>Contact information of the requesting representative (email, designation, phone numbers)</li>
          <li>A valid and binding subpoena, court order, search warrant, or other formal legal demand</li>
          <li>Details specifying the information category requested</li>
          <li>Identification details (phone number or other identifiers)</li>
          <li>Time period for the requested information</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Notification policy</h3>
        <p>Plivo generally notifies customers before disclosing their information, unless prohibited by law or when illegal conduct in relation to a customer&apos;s use of the Plivo services is apparent. Exceptions exist for emergencies involving child safety or threats to life. Non-disclosure orders must be included in formal legal demands to prevent customer notification.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">International requests</h3>
        <p>Agencies outside the U.S. must work through established legal channels, including bi-lateral or multi-lateral legal assistance treaties and letters rogatory processes, routed through the U.S. Department of Justice Office of International Affairs.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Emergency disclosures</h3>
        <p>Plivo may provide information immediately when urgent requests arise and the organization reasonably believes disclosure is necessary for public safety or preventing death or serious bodily injury.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete Law Enforcement Guidelines, please visit{" "}
            <a href="https://www.plivo.com/legal/enforcement-guidelines/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/legal/enforcement-guidelines</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
