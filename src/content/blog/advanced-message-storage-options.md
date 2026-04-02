---
title: "Enhancing Data Privacy: Advanced Message Data Storage Options"
description: "Discover Plivo's new data storage options for SMS, MMS, and WhatsApp messaging, designed to ensure compliance with GDPR and HIPAA while meeting your unique business needs"
pubDate: "2024-06-17T00:00:00.000Z"
updatedDate: "2024-06-19T14:00:14.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/666fe44dcc40b6fa1c2ac9d8_content-log-readaction-blog-hero.svg"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/666fe44dcc40b6fa1c2ac9d8_content-log-readaction-blog-hero.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["sms-api", "whatsapp-business-api"]
seoTitle: "Secure Your Messaging Data with Plivo's Custom Storage Options"
webflowItemId: "666fdd6261e4dd31eff32f8a"
---
<p>Data storage in the context of SMS/MMS/WhatsApp involves recording and storing messaging data, including recipient information and message content. Companies often use SMS/MMS/WhatsApp data storage to track communication with clients or for internal monitoring purposes.</p><p>However, data storage is subject to privacy regulations such as GDPR or HIPAA. So organizations processing third-party personal data are required to implement privacy controls, such as message content storage redaction.</p><h2><strong>Plivo's Enhanced Data Storage Options</strong></h2><p>To address this we're thrilled to introduce new comprehensive data storage options for SMS, MMS and WhatsApp messaging. This empowers Plivo customers to fine-tune their data storage preferences, aligning with regulatory requirements and their unique business needs.</p><h2><strong>Customizable Data Storage Preferences for Messaging</strong></h2><h3><strong>Outbound Messages</strong></h3><p>Plivo now offers four custom data storage preferences, enabling customers to personalize the handling of their outbound messaging data in alignment with global data protection standards and business needs.</p><p>The preference for data logging of outbound messages is set as a parameter in the <a href="https://www.plivo.com/docs/messaging/api/message#send-a-message">Send Message endpoint</a> and is applied at the <strong>message level</strong>. The four available settings for modifying content storage preferences include:</p><style>
td, th {
    border: 1px solid #e5e5e5;
    }
</style>
<table>
		<thead>
			<tr>
				<th>Setting option</th>
				<th>Description</th>
				<th>Log Parameter Status</th>
				<th>Destination Number Stored</th>
				<th>Message Content Stored</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Store Both Number and Message Content
 &nbsp; &nbsp; &nbsp; &nbsp;(Default)</td>
				<td>Stores the destination number for 90 days and message content for 7 days.</td>
				<td>Set to ‘true’</td>
				<td>Yes, for 90 days</td>
				<td>Yes, for 7 days</td>
			</tr>
			<tr>
				<td>Redact Both Number and Message Content</td>
				<td>Partially redacts destination numbers. Does not store the message content.</td>
				<td>Set to ‘false’</td>
				<td>Partially redacted</td>
				<td>Not stored</td>
			</tr>
			<tr>
				<td>Store Only Number</td>
				<td>Stores the destination numbers 90 days. Does not store the message content. </td>
				<td>Set to ‘number_only’</td>
				<td>Yes, for 90 days</td>
				<td>Not stored</td>
			</tr>
			<tr>
				<td>Store Only Content</td>
				<td>Stores the message content for 7 days. Partially redacts destination numbers.</td>
				<td>Set to ‘content_only’</td>
				<td>Partially redacted</td>
				<td>Yes, for 7 days</td>
			</tr>
		</tbody>
	</table><p>‍</p><h3><strong>Illustrative Example of Data Storage Options</strong></h3><p>Consider a message with the destination number '+12025550123' and content: 'Hello, your appointment is confirmed for tomorrow at 3 PM.' processed under each storage setting:</p><style>
td, th {
    border: 1px solid #e5e5e5;
    }
</style>
<table>
		<thead>
			<tr>
				<th>Setting option</th>
				<th>Processed Destination Number</th>
				<th>Processed Message Content</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Store Both Number and Message Content</td>
				<td>+12025550123
 &nbsp; &nbsp; &nbsp; &nbsp;(Stored for 90 days)</td>
				<td>Hello, your appointment is confirmed for tomorrow at 3 PM. 
(Stored for 7 days)</td>
			</tr>
			<tr>
				<td>Redact Both Number and Message Content</td>
				<td>+12025550***</td>
				<td>***Text Content Redacted***</td>
			</tr>
			<tr>
				<td>Store Only Number</td>
				<td>+12025550123
(Stored for 90 days)</td>
				<td>***Text Content Redacted***</td>
			</tr>
			<tr>
				<td>Store Only Content</td>
				<td>+12025550***</td>
				<td>Hello, your appointment is confirmed for tomorrow at 3 PM. 
(Stored for 7 days)</td>
			</tr>
		</tbody>
	</table><p><strong>Important Note:</strong> Message content redaction prevents Plivo from troubleshooting or retrieving messages in case of issues. The default setting is to store both the number and message content, ensuring outbound messages are fully retained unless the log parameter is explicitly set to ‘false’.</p><h3><strong>Inbound Messages</strong></h3><p>Similarly, for inbound messages, customers can specify their storage preferences, which are configured at the <strong>application level</strong>. The available settings for inbound messages are:</p><style>
td, th {
    border: 1px solid #e5e5e5;
    }
</style>
<table>
		<thead>
			<tr>
				<th>Setting option</th>
				<th>Description</th>
				<th>Log Parameter Status</th>
				<th>From Number Stored</th>
				<th>Message Content Stored</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Store Both Number and Message Content
 &nbsp; &nbsp; &nbsp; &nbsp;(Default)</td>
				<td>Stores the from number for 90 days and message content for 7 days.</td>
				<td>Set to ‘true’</td>
				<td>Yes, for 90 days</td>
				<td>Yes, for 7 days</td>
			</tr>
			<tr>
				<td>Redact Both Number and Message Content</td>
				<td>Partially redacts the from number. Does not store the message content.</td>
				<td>Set to ‘false’</td>
				<td>Partially redacted</td>
				<td>Not stored</td>
			</tr>
		</tbody>
	</table><p><strong>Important Note:</strong> If inbound messages are redacted, Plivo cannot debug or recover message content if there are any issues with the callback URL.</p><h2><strong>Default Settings for Outbound and Inbound Messages</strong></h2><p>Standard policy ensures the accessibility of outbound message content for 7 days and destination numbers for 90 days. After this period, both message content and numbers are stored in compliance with GDPR. This policy similarly applies to inbound messages, facilitating content and number access under the same terms.</p><p>These features depend on the selected storage settings and are available unless message data has been redacted. Users can explore this data via the <a href="https://console.plivo.com/sms/logs/messages/">Messaging Logs</a> section of the console — with options to review a specific timeframe or search a UUID to retrieve message details.</p><p>Discover more about our message log redaction processes in our <a href="https://www.plivo.com/docs/messaging/concepts/sms-data-redaction">developer documentation</a>.</p>
