---
title: "Plivo’s WhatsApp API: Onboarding Made Simple"
description: "Learn how to set up your WhatsApp Business API with Plivo. This guide covers everything from account registration to sending your first message effortlessly."
pubDate: "2024-06-10T00:00:00.000Z"
updatedDate: "2024-12-18T08:25:20.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6667d6baa9caa1c1f9de6d66_WhatsApp%20Blog%20-%20Hero%20Image.png"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6667d6baa9caa1c1f9de6d66_WhatsApp%20Blog%20-%20Hero%20Image.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["whatsapp-business-api"]
seoTitle: "Get Started with Plivo's WhatsApp API – Quick Onboarding Guide"
webflowItemId: "6667d86f1754a0f554986ca2"
---
<p><a href="https://www.plivo.com/whatsapp/">Plivo’s WhatsApp Business API</a> makes sending and receiving WhatsApp messages easy. Getting started is simple — even for non-technical users. Here’s how to onboard your WhatsApp Business Account (WABA), register your number, and send messages in seconds.</p><p><strong>Meet the prerequisites</strong></p><p>There are several prerequisites you must meet to begin using our API. Before you can send your first message, check these steps off your list.</p><ul><li><a href="https://console.plivo.com/accounts/register/" target="_blank"><strong>Sign up</strong></a><strong> for a Plivo account</strong> if you haven’t already done so. We’ll give you some credits to use when you’re first starting out. Once you’ve used them, set up your payment details to ensure your account always has funds.&nbsp;</li><li>Log in to the Facebook account with access to your company’s <strong>Meta Business Manager</strong>. To add a WABA with Plivo, the Facebook account should have the “Full Control” access level of the company’s Meta Business Manager.&nbsp;</li><li>Make sure you have a <strong>phone number</strong> that can receive a one-time passcode (OTP) either via SMS or voice call without an IVR</li></ul><h2><strong>Step 1: Connect your WhatsApp Business Account with Plivo</strong></h2><p>Next, create a new WABA or link an existing WABA via the <a href="https://console.plivo.com/whatsapp/whatsapp_business_account/" target="_blank">WhatsApp landing page on the Plivo console</a>. This will open Meta’s <a href="https://developers.facebook.com/docs/whatsapp/embedded-signup/#the-new-embedded-signup-flow" target="_blank">embedded signup flow</a> that will take you through the following steps to connect your WABA with Plivo.</p><video autoplay="" loop="" muted="" inline="">
&nbsp;<source src="https://res.cloudinary.com/amjadrathod/video/upload/v1718177718/video_1_id4lyv.mp4">
</video><ul><li>Log in to Facebook and select <em>Continue</em></li><li>Select your business</li><li>Select an existing WABA or create a new one. Note that if you select an existing WABA, it will be delinked from any previously connected business service provider (BSP)<em>.</em>‍</li><li>Name your WABA account. The name you use will not be visible to your messaging audience. It should match or closely align with your registered business name with regional identifier (if any). Avoid using special characters and abbreviations.</li><li>Set the WhatsApp Business Display Name. This name <strong>is</strong> visible to your messaging audience. Therefore, it should match your company’s name as closely as possible and adhere to the <a href="https://www.facebook.com/business/help/757569725593362">WhatsApp Business Display Name Guidelines</a>.&nbsp;</li><li>Select the business category</li><li>Enter a phone number and verify with an OTP</li><li>Click <em>Continue, </em>and you’re ready to go. Select <em>Finish</em>.</li></ul><h2><strong>Step 2: Verify that Meta onboarding was successful&nbsp;</strong></h2><p>Once you’ve completed the first step, the WABA will be shown in your Plivo console. Verify that onboarding was successful by visiting the <a href="https://business.facebook.com/settings">Business Settings of your Meta Business Account</a>, and clicking on WhatsApp Accounts. Go to the Partners tab. You should see Plivo included on your partners list.</p><video autoplay="" loop="" muted="" inline="">
&nbsp;<source src="https://res.cloudinary.com/amjadrathod/video/upload/v1718177731/video_2_wqfnoy.mp4">
</video><h2><strong>Step 3: Create a WhatsApp Template for approval</strong></h2><p>Meta requires you to use approved templates to initiate WhatsApp messages to your audience. Go to the <a href="https://business.facebook.com/latest/whatsapp_manager/message_templates">WhatsApp Template Management page</a> on Meta and create a template. Choose the best fit from Meta's list of templates according to your business needs.&nbsp;</p><p>Note that the message template determines your conversation type, which also determines how you will be charged. Meta charges different fees for different types of conversations. Expect Meta to take up to 24 hours to approve new templates.</p><p>Once the template you’ve created is approved by Meta, use the “Sync Templates from WhatsApp” function in your Plivo console to fetch the template details.</p><p>‍<strong>To successfully configure WhatsApp Channel in Plivo Verify,</strong> you will need at least one <strong>approved</strong> “Authentication Template” in your WhatsApp Manager.&nbsp;</p><figure style="max-width:2400px" data-rt-max-width="2400px"><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/67616f3bdafcff926293e0f9_67616f1f8b868fadcb781abc_watsapp.png" loading="lazy" alt="Whatsapp Manager" width="auto" height="auto"></div></figure><h2><strong>Step 4: Send your first WhatsApp message!&nbsp;</strong></h2><p>When your template is approved, you’re all set to use our API to send your first message.<strong> </strong>Create a file called send_whatsapp.js and paste into it this code.</p><style>
    .highlight {
      background-color: #212130;
      color: #d3d3d3;
      margin-bottom: 1rem;
      width: 100%; /* Adjust as needed */
    }
pre {
    padding: 18px;
    font-family: 'Soleil';
}
  </style>
<div class="language-python highlighter-rouge">
 &nbsp;<div class="highlight">
 &nbsp; &nbsp;<pre><code>
var plivo = require('plivo');

var client = new plivo.Client(""<auth_id>"", ""<auth_token>"");

const template = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""name"": ""sample_purchase_feedback"",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""language"": ""en_US"",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""components"": [
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""type"": ""header"",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""parameters"": [
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""type"": ""media"",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""media"": ""https:'//'plivo.com/s3/img1.jpg""
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;]
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;},
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""type"": ""body"",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""parameters"": [
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""type"": ""text"",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;""text"": ""ABM Water Purifier""
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;]
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;]
 &nbsp; &nbsp; &nbsp; &nbsp;}
client.messages.create(
 &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; src:""<sender_id>"",
 &nbsp; &nbsp; &nbsp; dst:""<destination_number>"",
 &nbsp; &nbsp; &nbsp; type:""whatsapp"",
 &nbsp; &nbsp; &nbsp; template:template,
 &nbsp; &nbsp; &nbsp; url: ""https:'//'<yourdomain>.com/sms_status/""
 &nbsp; &nbsp; }
 &nbsp; &nbsp; ).then(function (response) {
 &nbsp; &nbsp; &nbsp; console.log(response);
 &nbsp; &nbsp; &nbsp;});
</yourdomain></destination_number></sender_id></auth_token></auth_id></code></pre>
&nbsp;&nbsp;</div>
</div><p>Customize the code with the following changes:<br></p><ul><li>Replace the auth placeholders (such as &lt;auth_id&gt;) with your authentication credentials that can be found on the <a href="https://console.plivo.com/dashboard/">Plivo console</a>.&nbsp;</li><li>Replace the phone number placeholders with your phone number in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234).&nbsp;</li><li>src should be the phone number registered for your WhatsApp Business Account.<br></li><li>dst should be the recipient's WhatsApp number.</li></ul><p>Note that WhatsApp templates support four components: header, body, footer, and buttons. When you send messages, the template object you see in the code acts as a way to pass the dynamic parameters. header can accommodate text or media (images, videos, documents) content. body can accommodate text content. footer cannot have any dynamic variables.</p><figure style="max-width:95%" data-rt-max-width="95%"><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/67614fd195e4a38a9fbc80dd_6667de2aac0cc38bbb97ce6d_WhatsApp%2520Infographic.svg" loading="lazy" alt="__wf_reserved_inherit" width="auto" height="auto"></div></figure><p>That’s it - you’re all set to start using Plivo’s WhatsApp API. To learn more about Plivo’s WhatsApp API, please <a href="https://www.plivo.com/docs/messaging/concepts/whatsapp/prerequisites/">refer to our developer resources</a> or <a href="https://support.plivo.com/hc/en-us/requests/new?ticket_form_id=360000156292">reach out to our support team.&nbsp;</a></p><p>‍</p>
