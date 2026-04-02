---
title: "Introducing SMS Error Codes: Better Visibility into Your SMS Delivery"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2017-02-16T00:00:00.000Z"
updatedDate: "2025-04-01T09:09:03.000Z"
image: "/images/blog/6583ea51192996a2723c1df3_introducing-sms-error-codes.png"
thumbnail: "/images/blog/6583ea51192996a2723c1df3_introducing-sms-error-codes.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["sms-api", "error-codes"]
seoTitle: "Introducing SMS Error Codes: Better Visibility into Your SMS Delivery"
webflowItemId: "6583ebe494892bcf33662ef6"
---
<p><a href="https://www.plivo.com/">Plivo</a> now provides detailed SMS error codes for every outbound SMS text message that fails to be delivered. These error codes can help you understand the reasons for delivery failures and troubleshoot issues with your outbound SMS messages.</p><h2>Message states and SMS error codes</h2><p>When you send an SMS message from your application to Plivo’s servers, we queue it up to send it to our carriers at an appropriate rate that meets their compliance requirements, and we pass your application the message_state queued. Upon successfully sending your message to our carriers, we update the message_state to sent. Once the destination carrier reports that it has received the message, we update the message_state to delivered.</p><p>This, of course, is the ideal scenario in which everything works as it should. However, in systems involving multiple layers, where messages may traverse multiple downstream carriers before delivery, errors can occur — and when they do, we wanted to have an easy way for our customers to diagnose and resolve any issues. That starts with identifying the source of the problem, which is where SMS error codes come in.</p><p>Plivo sends SMS error codes at each stage of the delivery process, depending on the message_state returned. That is, if delivery is unsuccessful when we tried to deliver a message to a carrier, the message_state will be updated from queued to failed and an accompanying error_code will be given.</p><p>If a message is successfully sent to the carrier, it can still hit roadblocks that can cause the SMS to fail. In this scenario, the message_state would change from queued to sent, then to undelivered, which is also accompanied by an error_code.</p><p>Here’s an illustration of the delivery path and the message_states that can occur.</p><figure style="max-width:299px" data-rt-max-width="299px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583eaf65151edd7c697e299_introducing-sms-error-codes-message-states.svg" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>When there are issues with SMS delivery, some carriers alert us with a delivery report that may include information about the failure. However, we work with carriers in hundreds of countries, and each of them has a different method and frequency of reporting information about SMS failures. Some carriers send error codes for nearly every undelivered SMS, while others send them for fewer than 5% of undelivered messages.</p><p>Because there’s no standard for reporting error codes and not all carriers support delivery reports, we can’t control the delivery, quality, or frequency of error reporting. However, for the error codes we do receive, we wanted to build a model so that our customers could have a standardized way to identify delivery issues. To do that, we aggregated all the error codes from each carrier and mapped them to a set of error code categories that capture the entire spectrum of potential issues with SMS deliverability. Now, when a carrier reports an SMS error while trying to deliver your text message, it’s mapped to one of our standardized SMS error codes.</p><p>For every SMS message that you send through the Plivo platform, Plivo now returns a message_state of queued, sent, delivered, failed, or undelivered, and we provide an SMS error code in the error_code parameter when messages have failed or were undelivered.</p><p>Message states and error codes are sent to the callbackUrl set in your application. To retrieve the details of a specific message, make an HTTP GET request to the Message API with the message_uuid appended to the BaseURI. Alternatively, visit the Messaging &gt; SMS Logs page of the Plivo console.</p><p>Here are the SMS error codes that we return. You can find an updated list of error codes in our documentation. Going forward, whenever your text message doesn’t reach its destination, refer to the SMS error code to identify the issue.</p><table class="table table-striped table-markdown">
  	<thead>
		<tr>
			<th style="text-align:center;background:#939598;color:#ffffff">Error Code</th>
			<th style="text-align:center;background:#939598;color:#ffffff">Error Reason</th>
			<th style="text-align:center;background:#939598;color:#ffffff">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>10</td>
			<td>Invalid message</td>
			<td>The message content is blank or exceeds the character limit of 1,600 for messages encoded with GMS or 737 for messaged encoded with Unicode. Note that while we provide a separate error code to indicate that a message is too long, some carriers only send an “invalid message” error and don’t differentiate between blank messages and long message errors.</td>
		</tr>
		<tr>
			<td>20</td>
			<td>Network error</td>
			<td>The carrier delivering the text message had network issues. To resolve this, retry at a later time when the carrier network is unaffected.</td>
		</tr>
		<tr>
			<td>30</td>
			<td>Spam detected</td>
			<td>One of the most common reasons for SMS delivery failure is carrier-level spam filters. Carriers use systems and algorithms to detect spam content and block it before it gets delivered. Unfortunately, these filters are always hidden, subject to carrier preferences, vary from carrier to carrier, and can be changed without notice.
			<br>
			<br>
			Another common reason why this error code could be returned is that you may have attempted to send too many messages using long code phone numbers in the US and Canada. Long codes are 10-digit phone numbers and are intended only for peer-to-peer (P2P) communication. If this issue persists, we recommend using <a href="/sms/shortcode/" target="_blank">short codes</a> for sending bulk messages within the US and Canada. [Editor’s note 2021: Also consider <a href="/blog/10dlc-10-digit-long-code/">10DLC</a>.]
			<br>
			<br>
			If you’re confident that your message content is compliant, retry sending the message. You can also contact our support team to whitelist your message one time with our downstream carriers.
			</td>
		</tr>
		<tr>
			<td>40</td>
			<td>Invalid source number</td>
			<td>The source number you entered is either not in the correct format, not SMS-enabled, or not assigned to your Plivo account. Check the “src” phone number in your application and ensure that it’s in the correct format and has the ability to send text messages. All phone numbers in your application should include country code, area code, and phone number without spaces or dashes (for example, 14155555555 for US or +491155555555 for Berlin, Germany).</td>
		</tr>
		<tr>
			<td>50</td>
			<td>Invalid destination number</td>
			<td>The destination number you entered is either not entered correctly, not SMS-enabled, or is a PSTN landline. Check the “dst” phone number in your application to ensure that it can receive text messages. All phone numbers in your application should include country code, area code, and phone number without spaces or dashes (for example, 14155555555). If you’re sending multiple text messages, make sure that the phone numbers are separated with the “&lt;” character (14156667777&lt;14157778888&lt;14158889999).</td>
		</tr>
		<tr>
			<td>60</td>
			<td>Loop detected</td>
			<td>The carrier cannot route your SMS because settings in your application set up an endless loop of messages being sent and received between your “src” and “dst” phone numbers. This can occur when two auto-responding SMS applications start to talk to each other and end up in a loop. Carriers detect loops by comparing messages within a predefined period of time to previous messages sent and received.
			<br>
			<br>
			SMS loops can increase unnecessary spend, so it’s a good idea to create loop filters in your applications, because not all carriers have loop detection.
			<br>
			<br>
			In some cases, this error code is returned when the carrier determines that it’s impossible to route the message, so it has to be dropped, as it’s being looped between platforms.</td>
		</tr>
		<tr>
			<td>70</td>
			<td>Destination permanently unavailable</td>
			<td>The “dst” phone number is not active and there’s no indication of when it will become available. This is a broad error code where the carrier has not indicated the reason for the destination unavailability. Check the “dst” phone number to ensure that it’s correct. Also try sending messages to an alternative number to ensure that all other parts of your application are working.</td>
		</tr>
		<tr>
			<td>80</td>
			<td>Destination temporarily unavailable</td>
			<td>The “dst” phone number is not reachable. This is a broad error code, and often the carrier doesn’t indicate the reason for the destination being temporarily unavailable. Possible reasons could include a handset being turned off or out of coverage. To resolve this error, retry your messages at a later time.</td>
		</tr>
		<tr>
			<td>90</td>
			<td>No route available</td>
			<td>The carrier and fallback carriers were not able to deliver the SMS message because the route wasn’t available. Carriers don’t offer the reason why a route isn’t available, but since this is typically a carrier issue, you can <a href="https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292" target="_blank">contact us</a> to find out on your behalf. Include the message UUIDs of the SMS messages affected.</td>
		</tr>
		<tr>
			<td>100</td>
			<td>Prohibited by carrier</td>
			<td>The carrier rejected the text message because the network didn’t support the message being sent. This can occur if the destination network doesn’t support SMS.</td>
		</tr>
		<tr>
			<td>110</td>
			<td>Message too long</td>
			<td>The message content exceeds the character limit of 1,600 for GSM-encoded and 737 for UTF-encoded messages. <a href="https://support.plivo.com/hc/en-us/articles/360048079132" target="_blank">Certain characters</a> can increase the message character count significantly. Plivo automatically concatenates messages longer than 160 characters for GSM-encoded messages and 70 characters for UTF-encoded messages. Check our FAQ post on <a href="https://support.plivo.com/hc/en-us/articles/360041742091" target="_blank">long message concatenation</a> for more details.</td>
		</tr>
		<tr>
			<td>200</td>
			<td>Source number blocked by STOP from destination number</td>
			<td>The destination has opted out from your campaign and blocked all messages sent from your phone number. Opt-outs are typically received via text messages with an opt-out keyword of “STOP.” All messages to destinations that have opted out are blocked until the destination opts in with another response. See our FAQ posts about <a href="https://support.plivo.com/hc/en-us/articles/360041877871" target="_blank">opt-out</a> and <a href="https://support.plivo.com/hc/en-us/articles/360041444552" target="_blank">opt-in</a> processes.</td>
		</tr>
		<tr>
			<td>201</td>
			<td>Outbound messages from US toll-free numbers to Canadian destination numbers are blocked</td>
			<td>Your application is attempting to send text messages from a US toll-free number to a Canadian phone number destination. Unfortunately, carriers limit US toll-free phone numbers to sending text message only to US phone numbers.</td>
		</tr>
		<tr>
			<td>1000</td>
			<td>Unknown error</td>
			<td>Delivering your message failed for reasons that are unknown to us and to our carriers. If you notice too many of these, please open a <a href="https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292" target="_blank">support ticket</a> with us so that we can help you identify the problem. Be sure to include the message UUIDs of recent messages (preferably within the last 72 hours) that were affected.</td>
		</tr>
	</tbody></table><h2>Troubleshooting SMS delivery using API response codes, message_states, and SMS error_codes</h2><p>Plivo provides error codes at three levels to help you identify exactly where an error occurred. At the most basic level, the standard 200 HTTP status code provides the response to potential errors between your application and our API. If your application receives anything other than a 200 response, there’s likely a bug in your application.</p><p>Next, if your application receives a successful 200 HTTP status code, then it’s time to check your message_state. The message_state indicates where the error may have occurred. A Failed status means that your SMS was queued by our systems but failed to deliver to the carrier. If your message_state is Undelivered, then even though Plivo successfully delivered the SMS to the carrier, the carrier failed to deliver the message to the destination. In the event of any failed message states, check the SMS error code for details on the error.</p><p>Finally, since not all carriers support delivery reports, some messages that show the Sent message_state could still have errors, so check your SMS error codes if issues persist.</p><figure style="max-width:1026px" data-rt-max-width="1026px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583eb5e938fd42aaafa03b5_introducing-sms-error-codes-troubleshoot.png" alt="Troubleshooting SMS delivery using API response codes, message states, and SMS error codes" width="auto" height="auto" loading="auto"></div></figure><p>If SMS delivery issues do persist, try these actions.</p><ul><li>Check that you’ve set the correct “src”and “dst” phone numbers. You could be successfully sending and receiving text messages to an incorrect phone number.</li><li>Is the destination number roaming outside of their local network? In a few cases, our carriers might not support international roaming. Our carriers send us delivery reports only if their destination carriers do the same, so if the destination carrier never responds back, then our carrier can’t provide a delivery report either.</li><li>Is the destination number in a Do Not Contact (DNC) list? A few countries (including India) have a DNC list. Because they’re bound by consumer protection regulations, our carriers cannot deliver messages to recipients who have opted in to DNC lists. If a recipient opts out of a DNC list, carriers can deliver text messages normally.</li></ul><p>If you continue to have SMS delivery problems despite taking all the necessary actions, please open a <a href="https://support.plivo.com/hc/en-us/" target="_blank">support ticket</a> so we can help you resolve the problem. Be sure to include message_uuids of the text messages affected (preferably messages from within the last 72 hours).</p>
