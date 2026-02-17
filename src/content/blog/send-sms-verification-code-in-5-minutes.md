---
title: "How to Send an SMS Verification Code in 5 Minutes"
description: "Start sending OTPs in one second with Plivo’s Verify API. Learn how to easily enhance user security with SMS verification codes in five minutes."
pubDate: "2024-07-08T00:00:00.000Z"
updatedDate: "2024-08-31T10:46:25.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/66a09125ea99059066bf1f20_How%20to%20Send%20an%20SMS%20Verification%20Code%20Using%20Plivo%E2%80%99s%20Verify%20API.svg"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/66a09125ea99059066bf1f20_How%20to%20Send%20an%20SMS%20Verification%20Code%20Using%20Plivo%E2%80%99s%20Verify%20API.svg"
authorName: "Team Plivo"
featured: false
noindex: false
categories: ["verify-api"]
seoTitle: "How to Send an SMS Verification Code Using Plivo’s Verify API"
webflowItemId: "668bbbe3b98f4d8a976ac5ee"
---
<p>SMS verification codes can significantly enhance your security measures, providing a quick and effective way to verify a user’s identity. Integrating text message verification codes into your authentication process can save time, streamline workflows, and strengthen user trust.</p><p>Plivo’s <a href="https://www.plivo.com/verify/">Verify API</a> makes it easy to start sending one-time passcodes (OTPs) in <strong>one second</strong> or less. In this guide, we’ll explain why SMS verification is so effective and show you how to set it up in just 5 minutes. Our API allows you to send your first OTP in 90% less implementation time than a legacy verification solution. We'll also provide step-by-step instructions to ensure you can quickly and easily incorporate one-time passcodes (OTPs) into your applications.</p><h2>Why should I use SMS verification codes?</h2><p>While SMS verification isn't foolproof, it's a widely used and convenient security measure. One-time passcodes delivered via SMS or voice add an extra layer of security to online accounts, making them more difficult to break into. Accounts with one-time passcodes enabled as part of two-factor or multi-factor authentication make it much harder for hackers to break in, even if they steal your password.&nbsp;</p><p>Financial institutions, e-commerce sites, streaming platforms, and delivery apps. For instance, SMS verification can confirm that the person logging into a peer-to-peer payment platform is the account owner. This can help prevent unauthorized purchases or account takeovers.&nbsp;</p><h2>Prerequisites to send one-time passcodes</h2><p>Before we dive in, make sure you complete the following requirements:</p><p>1. <strong>Plivo account</strong>: Sign up for a Plivo account if you still need to do so.<br>2. <strong>API key and token</strong>: Obtain your Plivo API key and token from the Plivo console.<br>3. <strong>Phone numbers</strong>: Ensure you can access the phone numbers to which you intend to send verification codes.<br>4. <strong>Programming environment</strong>: Set up your programming environment with the necessary libraries to interact with the Plivo API. Install the Plivo SDK for your programming language: Plivo supports Python, JavaScript, Ruby, and many more languages.</p><p>In summary, make sure you have a<a href="https://www.plivo.com/docs/verify/concepts/applications/"> Plivo account with an application created</a>. While creating the application, define the right session expiry, attempt, OTP length, etc. You will also need to get a library/module/SDK for making HTTP requests to Plivo's API (this is available in various programming languages) or directing HTTP requests to<a href="https://www.plivo.com/docs/verify/api/session/"> Plivo’s API</a>.</p><p>With these prerequisites in place, here’s how to start sending OTPs.&nbsp;</p><h2>Create a session</h2><p>Plivo’s Verify API can be used with Python, Ruby, Node, GO, PHP, .Net, Java. This article will focus on Python.</p><h3>Step 1: Install Plivo SDK</h3><p>First, you need to install the Plivo SDK for your programming language. For Python, you can use pip:</p><pre class="highlight pre-shadow"><code>
pip install plivo
</code>
</pre><h3>Step 2: Configure Plivo Client</h3><p>Initialize the Plivo client using your Auth ID and Auth Token:</p><pre class="highlight pre-shadow"><code>import plivo

auth_id = 'YOUR_AUTH_ID'
auth_token = 'YOUR_AUTH_TOKEN'

client = plivo.RestClient(auth_id, auth_token)
</code>
</pre><h3>Step 3: Send the OTP</h3><p>Create a Verify session for sending OTP:</p><pre class="highlight pre-shadow"><code>response = client.verify_session.create(
 &nbsp; &nbsp;app_uuid='xxxxx-1215-422e-222-xxxx',
 &nbsp; &nbsp;recipient='+xxxxxxxxxxx', &nbsp;# dst number
 &nbsp; &nbsp;otp=code,
 &nbsp; &nbsp;channel='sms',
 &nbsp; &nbsp;method='POST',
 &nbsp; &nbsp;locale='pt_BR'
)
print(response)
</code>
</pre><p><strong>Arguments:</strong></p><ul><li><strong>recipient (string):</strong> The phone number to which the message is to be delivered. It's a mandatory parameter.</li><li><strong>app_uuid (string):</strong> The UUID of the application you want to use for this session. Defaults to the UUID of the default application for your account.</li><li><strong>otp:</strong> You can specify the OTP in the request if you want to send a custom one instead of a system-generated one.</li><li><strong>channel (string):</strong> The channel you want to send the code. Allowed values: sms, voice. Defaults to sms.</li><li><strong>locale:</strong> The locale parameter allows you to customize the language of the OTP message. This is useful if your users are in different regions and prefer different languages.</li><li><strong>url:</strong> To receive a callback on the final state of OTP delivery.</li><li><strong>method:</strong> The HTTP method to be used when calling the URL defined above.</li></ul><p><strong>If you created multiple applications, you can send the app_uuid in the request parameter:</strong></p><pre class="highlight pre-shadow"><code>response = client.verify_session.create(
 &nbsp; &nbsp;app_uuid='xxxxx-1215-4qq2e-222-xxxx',
 &nbsp; &nbsp;recipient='+xxxxxxxxxxx' &nbsp;# dst number
)
print(response)
</code>
</pre><p><strong>If you are sending a custom OTP:</strong></p><pre class="highlight pre-shadow"><code>response = client.verify_session.create(
 &nbsp; &nbsp;recipient='+xxxxxxxxxxx', &nbsp;# dst number
 &nbsp; &nbsp;otp=code,
)
print(response)
</code>
</pre><p><strong>If you want to send the locale parameter:</strong></p><pre class="highlight pre-shadow"><code>response = client.verify_session.create(
 &nbsp; &nbsp;app_uuid='sss-1c15-4ww3e-ssss-ssss',
 &nbsp; &nbsp;recipient='+xxxxxxxxxxx', &nbsp;# dst number
 &nbsp; &nbsp;otp=code,
 &nbsp; &nbsp;channel='sms',
 &nbsp; &nbsp;method='POST',
 &nbsp; &nbsp;url='https://www.requestbin.com',
 &nbsp; &nbsp;locale='pt_BR'
)
print(response)
</code>
</pre><h3>Validate the session</h3><p>Once the user receives the OTP, they must provide it to your application. You can then verify the OTP using the validate request:</p><pre class="highlight pre-shadow"><code>response = client.verify_session.validate(
 &nbsp; &nbsp;session_uuid='sss-1c15-4d3e-ssss-ssss',
 &nbsp; &nbsp;otp=code
)
print(response)
</code>
</pre><p>You can request the Plivo support team to configure the <strong>hashmap</strong> so that the OTP will be automatically read from the message, eliminating the need to enter the received OTP on the handset.</p><p><strong>Arguments:</strong></p><ul><li><strong>otp (string):</strong> The OTP that you want to validate against a particular session.</li><li><strong>session_uuid:</strong> The session UUID of the Verify session request.</li></ul><h3>Get and list Verify sessions</h3><p>You can retrieve details of a specific Verify session or list all Verify sessions. This can be useful for auditing and tracking purposes.</p><pre class="highlight pre-shadow"><code>response = client.verify_session.get(
 &nbsp; &nbsp;session_uuid='sss-1c15-4d3e-ssss-ssss'
)
print(response)```



```
response = client.verify_session.list()
print(response)
</code>
</pre><h2>Start sending SMS verification codes with Plivo</h2><p>While there are plenty of ways to improve the security of your application and protect customers from fraud, a lot depends on your service provider. </p><p>If you’re looking for a reliable and trusted partner, <a href="https://www.plivo.com/">Plivo</a> is the right solution for you. We send messages to audiences in 220+ countries and offer a full suite of products including <a href="https://www.plivo.com/sms/">SMS API</a>, Verify API, <a href="https://www.plivo.com/whatsapp/">WhatsApp Business API</a>, <a href="https://www.plivo.com/voice/">Voice API</a>, and more.&nbsp;</p><p>Interested in reading more about how Plivo can help you strengthen your application’s security? Check out some of our top picks:&nbsp;</p><ul><li><a href="https://www.plivo.com/blog/how-to-add-two-factor-authentication-to-a-python-flask-application-with-plivo/"><strong>How to Add Two-Factor Authentication to a Python Flask Application with Plivo</strong></a>: A step-by-step guide for Python developers.</li><li><a href="https://www.plivo.com/blog/how-to-add-two-factor-authentication-to-a-dotnet-application-with-plivo/"><strong>Adding Two-Factor Authentication to a .NET Application</strong></a>: Learn how to integrate OTP verification in .NET.</li><li><a href="https://www.plivo.com/blog/how-to-add-two-factor-authentication-to-a-ruby-application-with-plivo/"><strong>Implementing Two-Factor Authentication in Ruby</strong></a>: Ruby developers can follow this detailed tutorial.</li><li><a href="https://www.plivo.com/docs/verify/api/overview/"><strong>Verify API Reference Documentation</strong></a>: Comprehensive documentation for developers looking to dive deep into Plivo's Verify API.</li></ul><p><a href="https://www.plivo.com/sms/?kw=plivo%20sms&amp;cpn=21366394957&amp;utm_campaign_type=search&amp;utm_engagement_type=webform&amp;utm_term=plivo%20sms&amp;utm_campaign=Brand-PlivoSMS%7CSearch%7CIndia&amp;utm_source=google&amp;utm_medium=cpc&amp;hsa_acc=2092392810&amp;hsa_cam=21366394957&amp;hsa_grp=164009262715&amp;hsa_ad=701660175751&amp;hsa_src=g&amp;hsa_tgt=kwd-301628672546&amp;hsa_kw=plivo%20sms&amp;hsa_mt=b&amp;hsa_net=adwords&amp;hsa_ver=3&amp;gad_source=1&amp;gclid=Cj0KCQjwsaqzBhDdARIsAK2gqneaj1tnFvVt3H0jEpjdMEjqppYWaeKQgR_gxbbfdsCF4kVURrTlCLQaAhezEALw_wcB"><strong>Preventing SMS Fraud with Plivo</strong></a>: Learn how Plivo’s Verify API protects against SMS fraud.</p><h2>Conclusion</h2><p>By following these steps, you can easily integrate Plivo’s Verify API into your application to manage OTPs for user verification. This process ensures a higher level of security and helps authenticate users effectively.</p><p>That’s it! You should be ready to start sending OTPs for account verification. For full details regarding setting up OTPs with Verify, check our<a href="https://www.plivo.com/docs/verify/api/overview/"> developer resources</a>.</p>
