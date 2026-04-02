---
title: "SMS Best Practices for Today’s Mobile-First World"
description: "Use these SMS best practices so you can focus on message content that captures your recipients’ attention and not on debugging delivery failures."
pubDate: "2021-01-29T00:00:00.000Z"
updatedDate: "2024-06-22T13:49:36.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658255bb2f3ddd52078820de_sms-best-practices-blog.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658255bb2f3ddd52078820de_sms-best-practices-blog.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["sms", "best-practices"]
seoTitle: "SMS Best Practices for Today’s Mobile-First World"
webflowItemId: "65825643d61628c8815e8282"
---
<p>SMS messages offer a way to directly send customers delivery notifications, account alerts, and <a href="https://www.plivo.com/use-case/two-factor-authentication/" target="_blank">two-factor authentication</a> texts, as well as marketing and other customer service messages.</p><p>However, it can be surprisingly complicated to send SMS messages at scale. Rules, regulations, and restrictions vary by country and carrier. It’s important to choose an <a href="https://www.plivo.com/resources/how-to-choose-an-sms-api-provider-the-complete-guide/">SMS API provider</a> that can provide the features, carrier networks, and infrastructure you need to get your messages delivered consistently and correctly.</p><p>As a sender, there’s a lot you can do to maximize success. We’ve put together this SMS best practices guide so you can focus on content that captures your recipients’ attention and worry less about the risk of delivery failure. Use this guide to help you craft, format, and send great messages.</p><h2>SMS best practices FAQ</h2><h3>What are the different types of SMS content?</h3><p>The industry defines three main types of SMS content: person-to-person (P2P), application-to-person (A2P), and promotional.</p><ul><li><strong>P2P</strong> is a back-and-forth conversation between people that takes place via text. Examples include texting back and forth with a food delivery person, or taking an SMS survey where each question is followed by an answer.</li><li><strong>A2P</strong> is informational messaging that occurs when a consumer gives their phone number to a business and asks to be contacted in the future. Examples include appointment reminders, welcome texts, and alerts sent by a business to fulfill a consumer’s request. The consumer must agree to receive texts when they give the business their mobile number. A2P messages fall into two subcategories.</li><li><strong>Transactional</strong> — Non-marketing messages that provide important information to customers, such as a welcome message, an order confirmation, or a shipping update.</li><li><strong>Promotional</strong> — Messages sent that contain a sales or marketing promotion. Any call to action (such as a coupon code to an informational text) may place the message in the promotional category.</li></ul><h3>What are the different SMS source number types?</h3><p>In the United States and Canada, three SMS number types are available:</p><ul><li><strong>Long code</strong> with A2P support. This is a standard, local 10-digit number</li><li><strong>Toll-free</strong> numbers</li><li><strong>Short codes</strong>, five- or six-digit numbers specifically for SMS and MMS messages to mobile phones</li></ul><h3>What are the different types of opt-in consent?</h3><p>As a sender, you must obtain consumer consent (opt-in) for each message, depending on the type of content you send to the consumer. There are three types of consent with which you should be familiar:</p><ul><li><strong>Implied consent</strong> — If the consumer initiates the text message exchange and the business only responds to each consumer with relevant information, then no verbal or written permission is required.</li><li><strong>Express consent</strong> — The consumer gives permission for a business to contact them before the business sends a text message. Consumers can give permission over text, on a form or website, or verbally. Written permission also works.</li><li><strong>Keyword consent</strong> — Keyword consent requires the consumer to signal their consent to receive text messages by having them text a specific keyword to a number. For example: Text START to 12345 to subscribe to alerts.</li></ul><p>Before you send a message, determine which content type, number type, and opt-in requirements suit your communication. This quick reference table can help you determine what kind of message you have, what number to use, and how to get opt-in consent.</p><style>
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
<table class="support-table"><tbody><tr><td> </td><td><strong>Long Code</strong></td><td><strong>Toll-Free</strong></td><td><strong>Short Code</strong></td></tr><tr><td><strong>Approved Content</strong></td><td>Person-to-person<br><em>*10DLC A2P (AT&amp;T and Verizon)</em></td><td>Application-to-person</td><td>Application-to-person<br>Promotional</td></tr><tr><td><strong>Approved Opt-In</strong></td><td>Implied consent<br>Express consent<br>Keyword consent</td><td>Implied consent<br>Express consent<br>Keyword consent</td><td>Express consent<br>Keyword consent</td></tr></tbody></table><p>‍</p><h3>How do I craft good message content?</h3><p>Here are some tips for making your content more valuable to recipients and less likely to be flagged as spam.</p><ul><li><strong>Use one recognizable number</strong> — Each campaign should use one primary phone number, ideally for both text messages and voice calls.</li><li><strong>Use one recognizable domain name</strong> — Each campaign should be associated with a single web domain. Although a full domain is preferred, you can use a URL shortener to deliver custom links.</li><li><strong>Use natural language</strong> — Use natural language in your messages, and don’t use nonstandard spellings, such as “H! h0w ar3 you do1ng?”</li><li><strong>Set expectations on frequency</strong> — If you plan to send five texts a month, then disclosing “five messages a month” on the first interaction leads to a positive user experience.</li></ul><h3>What SMS message content should I avoid?</h3><p>Carriers continuously monitor messages traveling through their networks. Your content may be subject to review, so knowing what types of content to avoid will keep your messages from being flagged. Here are the content types to avoid:</p><ul><li><strong>Promotional</strong> messages on toll-free numbers</li><li><strong>Phishing</strong> messages that appear to come from reputable companies but in fact trick consumers into revealing personal information</li><li><strong>Fraud or scam</strong> messages that involve wrongful or criminal deception intended to result in financial or personal gain</li><li><strong>Deceptive marketing</strong> messages that do not meet the standard held by the Federal Trade Commission’s (FTC) Truth In Advertising rules</li><li><strong>S.H.A.F.T.</strong> (sex, hate, alcohol, firearms, and tobacco) content</li><li><strong>Sensitive content</strong> such as</li><li>Betting-related content — game bet, lucky draw, etc.</li><li>Debt restructuring/refinancing offers</li><li>Debt relief offers</li><li>Payday loan offers</li><li>Home loan offers</li><li>Education loan offers</li><li>Insurance quotes (unsolicited)</li><li>Earn money from home job offers</li></ul><h3>What triggers a carrier review?</h3><p>In addition to reviewing messages for disallowed content, carriers also monitor for disallowed sending practices. Avoid these disallowed sending practices, which can trigger a review and result in the suspension of sending rights and more.</p><ul><li><strong>Ignoring opt-out requests</strong> or other forms of opt-out avoidance (for instance, sending texts from a new phone number from the same business)</li><li><strong>High opt-out rates.</strong> A daily opt-out rate (total number of unique consumer phone numbers divided by the unique opt-outs that were sent messages within a 24-hour period) greater than 5% is flagged for monitoring. An opt-out rate of 10% or higher may result in immediate suspension of services.</li><li><strong>Snowshoe sending</strong> (applies to toll-free numbers only) or spreading messages across many source phone numbers, specifically to dilute reputation metrics and evade filters</li><li><strong>Using multiple numbers for similar content</strong> without first informing the carrier of the phone numbers ahead of time to have them excluded from monitoring</li><li><strong>URL cycling</strong> or the utilization of multiple destination URLs on the same message content for the specific purpose of diluting reputation metrics and evading filters</li></ul><h2>SMS best practices: key takeaways</h2><ul><li>Match your content with an approved SMS number type.</li><li>Each SMS number type has different requirements for user opt-in consent.</li><li>Consumers can revoke consent at any time and in any way. Consumer opt-out requests must be honored, whether they are made by phone call, email, or text.</li><li>Carriers continuously monitor messages traversing their networks. They don’t preapprove or whitelist messaging content, but they may review any message content as part of an account review.</li><li>Use of disallowed content can trigger an account review which may result in suspension of sending rights, restriction of high-throughput access, the suspension of provisioning rights for new phone numbers, and/or suspension of all network services.</li></ul><p>There are a lot of nuances to sending great SMS messages. This post is just a quick overview of the basics. Download our <a href="https://www.plivo.com/resources/sms-api-best-practices/">SMS Best Practices Guide: A How-to Guide to Maximize Success for the US and Canada</a> for more insights and tips.</p><p>Watch this short video to learn more.</p><figure style="padding-bottom:33.75%" data-rt-max-width="" data-rt-max-height="33.75%" data-rt-dimensions="0:0" data-page-url=""><div><iframe src="https://www.youtube.com/embed/GZ-ZOF9fvrE?rel=0&amp;modestbranding=1" frameborder="0" allowfullscreen=""></iframe></div></figure>
