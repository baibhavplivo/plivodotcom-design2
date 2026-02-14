"use client";

import LegalLayout from "./LegalLayout";

export default function SLAPage() {
  return (
    <LegalLayout activePage="/legal/sla/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-inter text-xl font-semibold text-black">Service Level &amp; Support</h2>
        <span className="text-xs text-gray-400">Last updated: December 20, 2024</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>This Service Level Agreement (SLA) outlines Plivo&apos;s support provisions and service levels for API customers.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">A. Support packages</h3>
        <p>Plivo offers tiered support plans available at <a href="https://www.plivo.com/support-plans/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/support-plans</a>. Your support tier is identified in your Order Form or Console.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">B. Support operability and communication</h3>

        <h4 className="font-inter text-sm font-semibold text-black mt-4 mb-1">1. Issue identification</h4>
        <p>Issues can be identified two ways:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Plivo Support identifies problems via <a href="https://status.plivo.com/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">status.plivo.com</a></li>
          <li>Customers report issues through the Ticket Portal at <a href="https://support.plivo.com/hc/en-us" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">support.plivo.com</a></li>
        </ul>
        <p>When reporting issues, customers must provide: reporter name, affected service, issue start time, current status, failure description, and transaction IDs when available.</p>

        <h4 className="font-inter text-sm font-semibold text-black mt-4 mb-1">2. Communication protocol</h4>
        <p>Plivo sends notifications containing: status updates (Initial, Update, Resolved, Informational, Action Required), ticket number, support phone number, and issue description.</p>

        <h4 className="font-inter text-sm font-semibold text-black mt-4 mb-1">3. Priority levels</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2.5 pr-4 text-left font-semibold text-black">Priority</th>
                <th className="py-2.5 text-left font-semibold text-black">Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">Priority 1</td>
                <td className="py-2.5 text-gray-600">Service outage in production. No workaround exists. Excludes development/staging environments.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">Priority 2</td>
                <td className="py-2.5 text-gray-600">Degraded service or intermittent production issues with possible workarounds. Excludes development/staging.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-gray-900">Priority 3</td>
                <td className="py-2.5 text-gray-600">All other issues including product/feature questions, development issues, number procurement, porting, account or billing issues.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-inter text-sm font-semibold text-black mt-4 mb-1">4. Response times</h4>
        <p>Target notification and resolution times are specified at <a href="https://www.plivo.com/support-plans/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/support-plans</a>.</p>

        <h4 className="font-inter text-sm font-semibold text-black mt-4 mb-1">5. Exceptions</h4>
        <p>Plivo has no support obligation for issues arising from:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Customer equipment, software, applications, network, or infrastructure</li>
          <li>Non-standard service use or unauthorized modifications</li>
          <li>Internet problems or unmet system requirements</li>
          <li>Force majeure, natural disasters, terrorism, or war</li>
          <li>Telecommunications carrier issues</li>
          <li>Third-party services (e.g., WhatsApp)</li>
        </ul>
        <p>Plivo will have no obligation for customer&apos;s failure to maintain equipment or performance issues resulting from failure to allow installation of Plivo-provided updates.</p>

        <h4 className="font-inter text-sm font-semibold text-black mt-4 mb-1">6. Documentation</h4>
        <p>Support guidance is available at <a href="https://support.plivo.com/hc/en-us/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">support.plivo.com</a>. Support availability applies only during the active subscription term.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete SLA document, please visit{" "}
            <a href="https://www.plivo.com/legal/service-level-and-support/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/legal/service-level-and-support</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
