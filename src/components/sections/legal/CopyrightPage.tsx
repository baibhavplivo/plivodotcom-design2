"use client";

import LegalLayout from "./LegalLayout";

export default function CopyrightPage() {
  return (
    <LegalLayout activePage="/legal/copyright/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-medium text-black">Copyright infringement notification</h2>
        <span className="text-xs text-gray-400">Last updated: December 20, 2024</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>If you believe your copyrighted work has been infringed or are aware of infringing material on the Plivo platform, please contact the Copyright Agent and provide the following information.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Required information for notification</h3>
        <p>The complainant must submit:</p>
        <ol className="list-decimal pl-5 space-y-3">
          <li><strong>Authorization:</strong> An electronic or physical signature of a person authorized to act on behalf of the copyright owner whose work has allegedly been infringed.</li>
          <li><strong>Work Identification:</strong> Identification of the copyrighted work claimed to have been infringed.</li>
          <li><strong>Location Information:</strong> Information describing where the allegedly infringing material is located on the Website.</li>
          <li><strong>Contact Details:</strong> The complainant&apos;s address, telephone number, and email address.</li>
          <li><strong>Good Faith Statement:</strong> A written statement confirming good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
          <li><strong>Accuracy Declaration:</strong> A statement that the above information in the notification is accurate and that, under penalty of perjury, the sender is the copyright owner or authorized to act on the owner&apos;s behalf.</li>
        </ol>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Submission methods</h3>
        <p><strong>Digital Submission:</strong> Information can be submitted via the Support Center at <a href="https://support.plivo.com/hc/en-us/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">support.plivo.com</a>.</p>
        <p><strong>Mailing Address:</strong></p>
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p className="font-medium text-gray-900">Copyright Agent &mdash; Plivo Inc.</p>
          <p>201 Mission Street, Suite 230</p>
          <p>San Francisco, CA 94105</p>
        </div>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">Response and consequences</h3>
        <p>Upon receiving the required information, Plivo will remove or disable access to the infringing material and take reasonable steps to notify the member responsible for posting it. Posting infringing copyrighted material may result in termination of the responsible member&apos;s account privileges.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete Copyright Notification page, please visit{" "}
            <a href="https://www.plivo.com/legal/copyright-infringement-notification/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/legal/copyright-infringement-notification</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
