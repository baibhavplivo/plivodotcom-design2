---
title: "Get ready to be STIRred and SHAKEN"
description: "STIR/SHAKEN goes into effect June 30. Here’s how Plivo will handle attestation and sign outbound calls as either Verified or Not Verified."
pubDate: "2021-05-31T00:00:00.000Z"
updatedDate: "2024-07-14T09:23:05.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813f76a70717a189cb22db_stir-shaken-2.svg"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813f76a70717a189cb22db_stir-shaken-2.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["fraud-prevention-2"]
seoTitle: "Get ready to be STIRred and SHAKEN"
webflowItemId: "658140b22ed7aa5f5f02a557"
---
<p>If you read our blog post from a couple of months ago, you’re already familiar with STIR/SHAKEN — Secure Telephone Identity Revisited (STIR) and Signature-based Handling of Asserted Information Using toKENs (SHAKEN). They’re technical frameworks that fight call spoofing by authenticating the calling number. </p><p>The US Federal Communications Commission (FCC) has directed carriers to implement STIR/SHAKEN by June 30, 2021. <a href="https://www.plivo.com/">Plivo</a> will be ready; we’re already running a successful pilot program.</p><p>When we roll out STIR/SHAKEN support for inbound calls, we’ll validate attestation of calls to Plivo DIDs and toll-free numbers in the US, irrespective of whether they’re used for Voice or SIP Trunking. For calls through the Voice API, we’ll pass the STIR/SHAKEN verification level as part of webhook requests to various URLs — answer_url, fallback_url, hangup_url, etc. For both Voice and SIP Trunking calls, we’ll also show verification levels on the Plivo console and in Call Detail Reports. </p><p>Going in the other direction, we’ll sign all Voice and SIP Trunking outbound calls to the US — unless a customer violates the rules:</p><ol><li>The calls breach the <a href="https://www.plivo.com/legal/tos/" target="_blank">Plivo Fair Usage Policy</a>.</li><li>The calls are identified as unsolicited robocalls.</li><li>Plivo gets a traceback request from the <a href="https://www.ustelecom.org/the-industry-traceback-group-itg/" target="_blank">Industry Traceback Group</a> about calls made by the customer.</li><li>The calls have invalid caller IDs — for instance, if they don’t adhere to E.164 format or &nbsp;have too many digits.</li></ol><p>In these scenarios, Plivo may stop signing all calls initiated by the customer. That could lead to lower answer rates, because calls won’t be marked as Verified. Worst case, they could be marked as spam by receiving networks.</p><h3>Verification levels for outbound calls</h3><p>In the STIR/SHAKEN framework, a secure telephony identity (STI) governance authority issues digital certificates. STIR/SHAKEN provides three attestation levels that can be assigned by an STI authentication service, which represent how confident a service provider is in that the number’s owner is truly the one placing the call. </p><p>Plivo will sign outbound calls as Verified (attestation A) for calls that use a Plivo DID as caller ID. The DID used should be <a href="https://www.plivo.com/docs/numbers/guides/buy-a-number/" target="_blank">rented</a> by the same Plivo account that originates the outbound calls. All other outbound calls, assuming they are signed at all, are signed Not Verified (attestation B or C).</p><p>We strongly encourage customers to use Plivo DIDs as caller ID to improve their STIR/SHAKEN verification levels.</p><h3>How verification status maps to STIR attestations</h3><p>For both outbound and inbound Voice API calls, Plivo will display the verification status of a call as a parameter called Stir Verification, which can have one of three values:</p><ul><li><strong>Verified</strong> means the call is from a Verified caller who has authorized access to the customer’s caller ID, and hence should be treated with confidence. Verified is equivalent to attestation level A.</li><li><strong>Not Verified</strong> means that, for this call, either the caller is not Verified, or it’s uncertain whether they have access to the caller ID used, or both. Not Verified means the call received attestation level B or C.</li><li><strong>Not Applicable</strong> means STIR/SHAKEN doesn’t apply to this call, as would be the case if a call is not addressed to a US number or if it’s a cloud call (WebRTC or SIP).</li></ul><h3>How to access verification status</h3><p>Voice and SIP Trunking customers have several ways to access STIR verification statuses.</p><h3>Voice API</h3><p>Plivo Voice customers can access verification values on the Voice &gt; <a href="https://console.plivo.com/voice/logs/calls/" target="_blank">Calls</a> page of the console as part of call logs, as part of CDR exports, and via Voice APIs in several ways:</p><h4>Webhook Callbacks</h4><p>We’ve added a new STIRVerification parameter as part of status update JSON code sent to these <a href="https://www.plivo.com/docs/voice/concepts/callbacks/#webhooks-for-outbound-calls" target="_blank">callback URLs</a>:</p><ul><li>answer_url</li><li>fallback_url</li><li>hangup_url </li></ul><style>
table.support-table{
    font-size: 16px;
}

.support-table td:first-child {
    width: 25%;
    text-align: left;
}

.support-table td p{
    font-size: 16px !important;;
}

.support-table p{
    margin: 0;
}

.support-table tr:first-child td{
    background: #f9fff8;
    padding: 1rem;
}

.support-table td{
    padding-bottom: 1rem;
    width: 25%;
    padding: 1rem;
}

.support-table td {
    border-right: solid 1px #e5e5e5;
}
.support-table td:last-child{
    border: 0;
}

table.no-header-default-table {
    width: 100%;
    margin-bottom: 2rem;
}

table.no-header-default-table td {
    width: 25%;
    border: 1px solid;
    padding: 10px 1rem;
    vertical-align: middle;
}

table.no-header-default-table td p{
margin-bottom: 0 !important;
}
</style>
<div><table class="no-header-default-table"><tbody><tr><td><p><strong>Parameter:</strong></p><p>StirVerification</p></td><td><p><strong>Possible values:</strong></p><p>“Verified”<br>“not_verified”<br>"Not Applicable"</p></td></tr></tbody></table></div><p>We’ve also added the parameter as part of call_status_callback_url for multiparty call events:</p><div><table class="no-header-default-table"><tbody><tr><td><p><strong>Parameter:</strong></p><p>StirVerification</p></td><td><p><strong>Event:</strong> Initialized</p><p><strong>Possible values:</strong> “Not Applicable”</p><p><strong>Event:</strong> Ringing, Answered, or Hangup</p><p><strong>Possible values:</strong> Value of the Stir_Verification parameter of CallUUID</p></td></tr></tbody></table></div><h4>Voice API Call Object</h4><p>You can also access STIR verification as part of the response of the <a href="https://www.plivo.com/docs/voice/api/call/#retrieve-a-call" target="_blank">Get CDR API</a> call:</p><div><table class="no-header-default-table"><tbody><tr><td><p><strong>Parameter:&nbsp;</strong></p><p>StirVerification</p></td><td><p><strong>Possible values:&nbsp;</strong></p><p>“Verified”</p><p>“not_verified”</p><p>“Not Applicable”</p></td></tr></tbody></table></div><h3>SIP Trunking</h3><p>SIP Trunking customers will be able to see STIR verification values in the several ways:</p><h4>Console</h4><p>On the SIP Trunking &gt; <a href="https://console.plivo.com/zentrunk/logs/calls/" target="_blank">Logs</a> page as part of Call Detail Records (CDR).</p><h4>Custom SIP header</h4><p>As part of a new SIP header:</p><div><table class="no-header-default-table"><tbody><tr><td><p><strong>SIP header:&nbsp;</strong></p><p>X-Plivo-Stir-Verification</p></td><td><p><strong>Possible values:&nbsp;</strong></p><p>“Verified”</p><p>“Not Verified”</p><p>“Not Applicable”</p></td></tr></tbody></table></div><h4>P-Asserted-ID Header</h4><p>SIP Trunking customers can also use the SIP verstat parameter as part of the P-Asserted-ID header:</p><div><table class="no-header-default-table"><tbody><tr><td><p><strong>P-Asserted-ID Header:&nbsp;</strong></p><p><em>P-Asserted-Identity:&nbsp;</em></p><p><em>&lt;sip:+13339990000;verstat=TN-Validation-Passed@67.xxx.x.xx:5060&gt; &nbsp;</em></p></td><td><p><strong>Possible values:&nbsp;</strong></p><p>verstat=No-TN-Validation&nbsp;</p><p>verstat=TN-Validation-Passed</p><p>verstat=TN-Validation-Failed</p></td></tr></tbody></table></div><h3>Upcoming attestation refinements</h3><p>Soon, Plivo will start taking into consideration more factors to determine the attestation level for outbound calls, including (but not limited to):</p><ol><li>Results of Know Your Customer (KYC) validation, a feature coming to the Plivo console and API in the near future.</li><li>Customers’ own DIDs sourced from other providers and whitelisted with Plivo. We plan to enable whitelisting through the Plivo console and the API in the near future.</li><li>The confidence Plivo has in customer traffic patterns not constituting fraudulent and unsolicited robocall traffic.</li></ol><h3>Looking forward to less spoofing</h3><p>We believe STIR/SHAKEN will have a big impact in preventing caller ID spoofing and containing unsolicited robocalls, and we’re excited to join the fight. Talk to a <a href="https://www.plivo.com/talk-to-an-expert/" target="_blank">Plivo expert</a> for help getting started.</p>
