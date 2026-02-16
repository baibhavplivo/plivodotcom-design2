"use client";

import LegalLayout from "./LegalLayout";

export default function AdditionalTermsPage() {
  return (
    <LegalLayout activePage="/legal/additional-terms/">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora text-xl font-semibold text-black">Additional service terms &mdash; API</h2>
        <span className="text-xs text-gray-400">Last updated: April 17, 2025</span>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">1. Number porting</h3>
        <p><strong>Ownership &amp; Control:</strong> Plivo retains customer-of-record status for all telephone numbers. The company reserves discretionary porting refusal rights.</p>
        <p><strong>Port-Out Requirements:</strong> Users may export numbers (ported-in, toll-free, or non-U.S. entitled) only if meeting these conditions:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Written notice within 30 days of termination intent</li>
          <li>New carrier submits porting request within notice period</li>
          <li>All account balances paid</li>
          <li>Administrative fees covered</li>
        </ul>
        <p>You will continue to be responsible for paying all applicable account fees for the telephone numbers until these Terms of Service are formally terminated. Users failing these requirements face restrictions. Plivo may reclaim improperly ported numbers and charge recovery costs. Post-termination number reassignment may occur without liability.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">2. Special conditions for voice calls &amp; short codes</h3>
        <p>Voice calls comply with regional carrier regulations. The following thresholds and surcharges apply:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2.5 pr-4 text-left font-semibold text-black">Metric</th>
                <th className="py-2.5 pr-4 text-left font-semibold text-black">Threshold</th>
                <th className="py-2.5 text-left font-semibold text-black">Surcharge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2.5 pr-4 text-gray-900">Abandoned Calls</td>
                <td className="py-2.5 pr-4 text-gray-600">&lt; 20% monthly</td>
                <td className="py-2.5 text-gray-600">$0.02/call for excess</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-gray-900">Average Call Duration (ACD)</td>
                <td className="py-2.5 pr-4 text-gray-600">&gt; 35 seconds monthly</td>
                <td className="py-2.5 text-gray-600">$0.02/minute for below-threshold</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-gray-900">Short Duration Calls</td>
                <td className="py-2.5 pr-4 text-gray-600">&lt; 10% under 6 seconds</td>
                <td className="py-2.5 text-gray-600">$0.015/call for excess</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-gray-900">Incomplete Toll-Free Calls</td>
                <td className="py-2.5 pr-4 text-gray-600">&lt; 5% monthly</td>
                <td className="py-2.5 text-gray-600">$0.10/call for excess</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>Short Code Cancellation:</strong> 30-day written notice before renewal required. All fees are non-refundable and non-transferable.</p>

        <h3 className="font-inter text-base font-semibold text-black mt-6 mb-2">3. Territorial use restriction</h3>
        <p>Services within India restrict usage to domestic Indian communication only. Cross-border transmission is prohibited. Breaches constitute material agreement violations subject to suspension/termination. Users represent compliance with relevant Indian telecommunications law.</p>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            For the complete Additional Service Terms, please visit{" "}
            <a href="https://www.plivo.com/legal/service-schedule/sst-api/" target="_blank" rel="noopener noreferrer" className="text-[#323dfe] hover:underline">plivo.com/legal/service-schedule/sst-api</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
