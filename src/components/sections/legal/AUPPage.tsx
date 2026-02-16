"use client";

import LegalLayout from "./LegalLayout";

export default function AUPPage() {
  return (
    <LegalLayout activePage="/legal/aup/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-semibold text-black">Acceptable use policy</h2>
        <span className="text-xs text-gray-400">Last updated: April 17, 2025</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          This Acceptable Use Policy (&ldquo;AUP&rdquo;) is incorporated into Plivo&rsquo;s Terms of Service and governs the use of Plivo&rsquo;s website and cloud communications services. By using the Services, you agree to use them only for lawful purposes and in compliance with this policy.
        </p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">1. Prohibited technical activities</h3>
        <p>You may not engage in any of the following technical activities:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Accessing or attempting to access non-public areas of the Services, Plivo&rsquo;s computer systems, or the technical delivery systems of Plivo&rsquo;s providers.</li>
          <li>Probing, scanning, or testing the vulnerability of any system or network.</li>
          <li>Breaching or circumventing any security or authentication measures.</li>
          <li>Accessing the Services through unauthorized automated means (including bots, scrapers, or similar tools).</li>
          <li>Forging TCP/IP packet headers or any part of the header information in any communication.</li>
          <li>Interfering with or disrupting the network via viruses, flooding, spamming, mail-bombing, or other similar methods.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">2. Prohibited business practices</h3>
        <p>The following business practices are strictly prohibited:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Bypassing or circumventing security features of the Services.</li>
          <li>Reverse-engineering, decompiling, or disassembling any aspect of the Services.</li>
          <li>Violating the policies of any third-party providers used in connection with the Services.</li>
          <li>Engaging in account fraud or caller ID misrepresentation.</li>
          <li>Harvesting or collecting contacts without proper consent.</li>
          <li>Unauthorized use of Plivo trademarks, logos, or branding.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">3. Communications violations</h3>
        <p>The following communications practices are prohibited:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Spamming in violation of CAN-SPAM Act, TCPA, Do-Not-Call regulations, or similar laws.</li>
          <li>Sending unsolicited calls, SMS, voicemail, or faxes.</li>
          <li>Using SMS services for purposes other than enhancing person-to-person communications.</li>
          <li>Robocalling without proper compliance mechanisms in place.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">4. Content restrictions</h3>
        <p>You may not use the Services to transmit or store content that is:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Libelous, defamatory, or discriminatory.</li>
          <li>Related to narcotics, firearms, or adult content material.</li>
          <li>Infringing on any intellectual property rights.</li>
          <li>Impersonating emergency services or misleading recipients about the nature of communications.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">5. Messaging requirements</h3>
        <p>All messaging activities must comply with the following requirements:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Proper opt-in and opt-out mechanisms must be implemented for all messaging campaigns.</li>
          <li>Age-gating compliance must be maintained where required by law.</li>
          <li>Mobile subscriber opt-out requests must be respected promptly.</li>
          <li>Robocall complaints must be resolved within 3 business days.</li>
          <li>Non-compliant traffic must be segregated from compliant traffic.</li>
        </ul>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">6. ISV obligations</h3>
        <p>Independent Software Vendors (ISVs) providing Application-to-Person (A2P) messaging or voice services through Plivo must follow Plivo&rsquo;s ISV Guidelines. Violations of these guidelines constitute material breaches of this AUP and the Terms of Service.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">7. Enforcement</h3>
        <p>Violations of this Acceptable Use Policy may result in immediate suspension or termination of your account and access to the Services. Users are liable for any fines or penalties imposed on Plivo by telecom operators or regulatory authorities as a result of the user&rsquo;s non-compliance with this policy.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete and legally binding Acceptable Use Policy, please visit{" "}
            <a href="https://www.plivo.com/aup/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/aup</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
