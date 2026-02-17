---
title: "Latest Verification Requirements for Toll-Free Messaging in North America"
description: "Toll-Free Verification: To protect consumers from spam and malicious messages that might originate from toll-free numbers, North American businesses have to verify their numbers."
pubDate: "2023-05-18T00:00:00.000Z"
updatedDate: "2024-08-01T12:14:30.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657d550eb8e1715fecae717f_Blog_toll_free_verification_101.svg"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657d550eb8e1715fecae717f_Blog_toll_free_verification_101.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["toll-free", "sms"]
seoTitle: "Toll-Free Verification 101 | Plivo"
webflowItemId: "657d558642a3aaa0354f0dd1"
---
<p>The carriers responsible for toll-free text messaging in North America mandate verification of toll-free numbers before you can use a toll-free number to send application-to-person (A2P) messages. This change aligns toll-free messaging with <a href="https://plivo-webflow.webflow.io/sms/10dlc" target="_blank">10DLC</a> and <a href="https://plivo-webflow.webflow.io/sms/shortcode" target="_blank">short codes</a>, which already have business verification measures in place. The intent is to ensure that message senders on all services are reviewed and that businesses that send messages are documented and verified.</p><p>The verification process involves the carrier responsible for verification reviewing the submitted information and either approving or rejecting the application. The process can take up to two weeks.</p><p>Irrespective of the volumes of application-to-peer (a2p) messages you intend to send on toll-free numbers, you must verify each toll-free number.</p><p><a href="https://www.plivo.com/"><strong>Plivo</strong></a><strong> recommends that you begin sending messages only after a toll-free number has been verified.</strong></p><h2>How to get toll-free numbers verified</h2><style>
li a{
    color: var(--green);
    }
li a:hover{
    color: var(--blue);
    }
</style>
<ol>
 &nbsp;<li>You can rent messaging-enabled toll-free numbers on the console.</li>
 &nbsp;<li>Once you rent a messaging-enabled toll-free number, you have two ways to submit details for verification:
 &nbsp; &nbsp;<ul>
 &nbsp; &nbsp; &nbsp;<li>Via Plivo’s <a href="https://www.plivo.com/docs/messaging/api/tf-verification/">toll-free verification API</a>
 &nbsp; &nbsp; &nbsp; &nbsp;<ul>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<li>We recommend this method if your business frequently requires toll-free number provisioning.</li>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<li>The API submits the verification request directly to the carrier with no manual review by Plivo, reducing the turnaround time.</li>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<li>As soon as a toll-free number is verified, you will get a call-back and can initiate A2P messaging traffic on-the-go.</li>
 &nbsp; &nbsp; &nbsp; &nbsp;</ul>
 &nbsp; &nbsp; &nbsp;</li>
 &nbsp; &nbsp; &nbsp;<li>Via the <a href="https://console.plivo.com/sms/10dlc/tollfree_verification/">Plivo Console</a>
 &nbsp; &nbsp; &nbsp; &nbsp;<ul>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<li>We recommend this method if your business has a one-time or occasional need for toll-free number provisioning.</li>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<li>The Plivo Console also directly submits your request to the carrier with no manual review by Plivo team, ensuring fast turnaround.</li>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<li>For bulk toll-free number verification (more than 10 numbers), please fill out this <a href="https://www.plivo.com/assets/dist/Plivo_Bulk_TFN_Verification_Form.xlsx">sheet</a> and <a href="https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292">create a ticket</a> to share it with the Plivo support team. We will submit your request to the carrier for review. </li>
 &nbsp; &nbsp; &nbsp; &nbsp;</ul>
 &nbsp; &nbsp; &nbsp;</li>
 &nbsp; &nbsp;</ul>
 &nbsp;</li>
 &nbsp;<li>You can follow the verification status for any toll-free number on the console by visiting Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Active</a>. By default numbers are classified as “unverified”. Once a number is submitted for review, it’s marked “pending verification”.</li>
 &nbsp;<li>When the carrier notifies us of the successful completion of the verification request, we change the status to “verified”.</li>
 &nbsp;<li>If you had submitted the request via the toll-free verification API, you will also get a call back with the terminal status of your verification request – “rejected” or “verified”.</li>
 &nbsp;<li>If the carrier rejects the verification request, we change the status to “unverified”. You should get this update as a callback if the request was submitted via Plivo toll-free number verification API. In case a verification request is rejected and the request was submitted manually, you will get an email from Plivo Support team.</li>
</ol><p>Verified numbers are subject to the least amount of filtering — but that doesn’t mean customers can use them in unapproved ways. All messaging must still comply with <a href="https://www.plivo.com/docs/sms/concepts/us-messaging-best-practices/">best practices for A2P messaging</a> and must not be used for any use case that is <a href="https://www.plivo.com/docs/sms/concepts/us-messaging-best-practices#other-prohibited-content">not allowed by carriers</a> in the US or Canada.</p><p>Once verified, a number does not need to be re-verified for the same use case in the future. If you want to use any given toll-free number for a different or an additional use case, you should submit a new verification request. Failure to do so can be considered noncompliance by the carriers and may result in your messaging services being suspended.</p>
