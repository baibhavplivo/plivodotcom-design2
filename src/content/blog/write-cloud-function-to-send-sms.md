---
title: "How to Write a Cloud Function to Send SMS in Node.js and Plivo’s SMS API"
description: "SMS API | Plivo | You can get started to Write a Cloud Function to Send SMS in Node.js and Plivo’s SMS API."
pubDate: "2021-04-28T00:00:00.000Z"
updatedDate: "2025-05-19T11:49:27.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/658197ecc4145944225ebdf6_send-sms-node-cloud-function.png"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/658197ecc4145944225ebdf6_send-sms-node-cloud-function.png"
authorName: "Team Plivo"
featured: true
noindex: true
categories: ["node-js-sdk", "sms-api", "how-to"]
seoTitle: "How to Write a Cloud Function to Send SMS in Node.js and Plivo’s SMS API"
webflowItemId: "658198d9a494dee840566b92"
---
<p>Your company has settled on Plivo to handle its voice and messaging communications, and now it’s your job to start integrating Plivo into your company’s applications. As a first project, let’s write a cloud function in Node.js to <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> SMS messages through Plivo.</p><h2>Create a Firebase project</h2><p>We’ll use Firebase, Google’s mobile app development tool, to implement the cloud function. To initialize a Firebase project, go to <a href="https://firebase.google.com/">firebase.google.com</a> and click Go to Console in the upper right corner. Create a Firebase account if you don’t have one already. Firebase has a free Spark plan and a pay-as-you-go Blaze plan. To make outbound networking requests, you must sign up for Blaze. From the Firebase console, click on the ‘Add project’ button to create a new project. Fill in the details on the next few screens and click Continue. Firebase will create the project and take you to its overview page.</p><h2>Write and deploy a cloud function</h2><p>Now we can start writing the cloud function in the Firebase CLI to send a message using <a href="https://www.plivo.com/sms/">Plivo’s SMS API</a>.</p><h3>Install the Plivo SDK and Firebase CLI</h3><p>We’ll presume you already have your Node.js environment set up. Change to the directory into which you want to install the Plivo Node.js SDK and Firebase CLI and run</p><style>
.highlight .hll { background-color: #ffffcc }
.highlight .c { color: #008800; font-style: italic } /* Comment */
.highlight .err { color: #a61717; /* background-color: #e3d2d2 */ } /* Error */
.highlight .k { color: #00A0DB} /* Keyword */
.highlight .cm { color: #008800; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #008080 } /* Comment.Preproc */
.highlight .c1 { color: #008800; font-style: italic } /* Comment.Single */
.highlight .cs { color: #008800; font-weight: bold } /* Comment.Special */
.highlight .gd { color: #000000; background-color: #ffdddd } /* Generic.Deleted */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gr { color: #aa0000 } /* Generic.Error */
.highlight .gh { color: #999999 } /* Generic.Heading */
.highlight .gi { color: #000000; background-color: #ddffdd } /* Generic.Inserted */
.highlight .go { color: #888888 } /* Generic.Output */
.highlight .gp { color: #555555 } /* Generic.Prompt */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .gu { color: #aaaaaa } /* Generic.Subheading */
.highlight .gt { color: #aa0000 } /* Generic.Traceback */
.highlight .kc { color: #00A0DB; font-weight: bold } /* Keyword.Constant */
.highlight .kd { color: #00A0DB; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #00A0DB} /* Keyword.Namespace */
.highlight .kp { color: #00A0DB; font-weight: bold } /* Keyword.Pseudo */
.highlight .kr { color: #00A0DB; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #00A0DB; font-weight: bold } /* Keyword.Type */
.highlight .m { color: #ff8045 } /* Literal.Number */
.highlight .s { color: #ff8045 } /* Literal.String */
.highlight .na { color: #FF0000 } /* Name.Attribute */
.highlight .nt { color: #00A0DB} /* Name.Tag */
.highlight .ow { font-weight: bold } /* Operator.Word */
.highlight .w { color: #bbbbbb } /* Text.Whitespace */
.highlight .mf { color: #ff8045 } /* Literal.Number.Float */
.highlight .mh { color: #ff8045 } /* Literal.Number.Hex */
.highlight .mi { color: #ff8045 } /* Literal.Number.Integer */
.highlight .mo { color: #ff8045 } /* Literal.Number.Oct */
.highlight .sb { color: #ff8045 } /* Literal.String.Backtick */
.highlight .sc { color: #800080 } /* Literal.String.Char */
.highlight .sd { color: #ff8045 } /* Literal.String.Doc */
.highlight .s2 { color: #ff8045 } /* Literal.String.Double */
.highlight .se { color: #ff8045 } /* Literal.String.Escape */
.highlight .sh { color: #ff8045 } /* Literal.String.Heredoc */
.highlight .si { color: #ff8045 } /* Literal.String.Interpol */
.highlight .sx { color: #ff8045 } /* Literal.String.Other */
.highlight .sr { color: #ff8045 } /* Literal.String.Regex */
.highlight .s1 { color: #ff8045 } /* Literal.String.Single */
.highlight .ss { color: #ff8045 } /* Literal.String.Symbol */
.highlight .il { color: #ff8045 } /* Literal.Number.Integer.Long */

  pre code, pre {
    font-size: inherit;
    color: #d3d3d3;
    word-break: normal;
    font: 16px soleil;
    line-height: 29px;
    padding: 15px 18px 15px 18px;
  }
  pre{
    background: rgb(33, 33, 48);
    min-width: 100%
    padding-left: 18px
  }
  .rouge-table pre{
  padding: 0;
  }

  .highlight pre{
    background-color: rgb(33, 33, 48);
    border-radius: 0;
  }
  pre.lineno{
    color: #fff;
    opacity: .3;
  }
  .w-richtext figure {
    max-width: 100%;
    position: relative;
}
td{
    vertical-align: top;
    text-align: left;
    border-bottom: hidden;
    padding: 5px;
}
  </style>
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>npm i <span class="nt">-S</span> plivo firebase-tools
</code></pre></div></div><h3>Set up the Firebase CLI</h3><p>Once the Firebase CLI and Plivo Node.js SDK are installed in your local project directory, you can set up Firebase locally and write a cloud function.</p><p>Run firebase login to log in to your Firebase account.</p><p>Initialize a new Firebase project in your local setup by running firebase init. You’ll be asked to select the Firebase features you want to set up. Use the down arrow key to navigate to Functions and press space bar to select it, then press Enter.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65819817784c9b6531762f9c_use-existing.png" alt="Initialize Firebase project locally" width="auto" height="auto" loading="auto"></div></figure><p>You’ll be asked to select whether you want to use an existing project or a new one. Select “Use an existing project” to use the project you just created in the Firebase console.</p><p>You’ll be asked to select the language you wish to write the function in. Choose “JavaScript,” and in the next step, choose yes to install the dependencies and complete the setup.</p><h3>Write a cloud function</h3><p>Once the setup is complete, open the project in a text editor to write the function to send SMS messages. Check the project’s folder structure to find the boilerplate code added by Firebase.</p><p>Before writing the code, we need to add Plivo as a dependency in the package.json file and run npm install to add the dependency to package-lock.json.</p><p>You can use the code below to replace the index.js file with a cloud function to send SMS messages using Plivo’s Node.js SDK.</p><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
</pre></td><td class="code"><pre><span class="kd">const</span> <span class="nx">functions</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">"</span><span class="s2">firebase-functions</span><span class="dl">"</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">authId</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">AUTH_ID</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">authToken</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">AUTH_TOKEN</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">Plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">"</span><span class="s2">plivo</span><span class="dl">"</span><span class="p">);</span>

<span class="c1">// Initialize Plivo with API credentials</span>
<span class="kd">const</span> <span class="nx">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Plivo</span><span class="p">.</span><span class="nx">Client</span><span class="p">(</span><span class="nx">authId</span><span class="p">,</span> <span class="nx">authToken</span><span class="p">);</span>

<span class="nx">exports</span><span class="p">.</span><span class="nx">sendSms</span> <span class="o">=</span> <span class="nx">functions</span><span class="p">.</span><span class="nx">https</span><span class="p">.</span><span class="nx">onRequest</span><span class="p">(</span><span class="k">async</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="k">try</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">client</span><span class="p">.</span><span class="nx">messages</span><span class="p">.</span><span class="nx">create</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">src</span><span class="p">:</span><span class="dl">"</span><span class="s2">+14156667777</span><span class="dl">"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">dst</span><span class="p">:</span><span class="dl">"</span><span class="s2">+14156667778</span><span class="dl">"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">text</span><span class="p">:</span><span class="dl">"</span><span class="s2">testing firebase functions</span><span class="dl">"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">method</span><span class="p">:</span> <span class="dl">"</span><span class="s2">GET</span><span class="dl">"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">url</span><span class="p">:</span> <span class="dl">"</span><span class="s2">http://foo.com/sms_status/</span><span class="dl">"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">})</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">})</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="k">catch</span><span class="p">(</span><span class="nx">err</span> <span class="o">=&gt;</span> <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">err</span><span class="p">));</span>
 &nbsp; &nbsp;<span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="dl">'</span><span class="s1">There was an error sending the SMS message</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">})</span>
</pre></td></tr></tbody></table></code></pre></figure><h3>Find your Auth ID and Auth Token</h3><p>You have to have proper credentials before you can use the Plivo API. We provide an Auth ID and Auth Token on the Overview page of the Plivo console. Replace the placeholders AUTH_ID and AUTH_TOKEN in the above code with the values from the console.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="Find Your Auth Credentials on Plivo Console" width="auto" height="auto" loading="auto"></div></figure><h3>Choose a phone number</h3><p>You need an SMS-enabled Plivo phone number to send messages to the US and Canada. Check the <a href="https://console.plivo.com/active-phone-numbers/">Numbers screen of your Plivo console</a> to see what numbers you have available and which of them support SMS capabilities. You can also buy numbers from this screen and use it as the SRC number instead of “+14156667777” in the above code.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff4d6327757ab84f16830_buy-new-number.png" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><p>SMS regulations vary from country to country. For messages to countries other than the US and Canada, you might want to register an alphanumeric sender ID for your messages. You can learn more about the use of alphanumeric sender ID and register one from the Messaging &gt; <a href="https://console.plivo.com/sms/sender_id/">Sender IDs</a> page of the console.</p><h3>Deploy the cloud function</h3><p>Once you’re done writing the cloud function and have replaced all the necessary placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>, you can deploy the function to the Firebase cloud by running firebase deploy --only functions, which makes it available to run via URL.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581988c342cd117eb4f50a7_deploy.png" alt="Deploy cloud function to Firebase" width="auto" height="auto" loading="auto"></div></figure><h2>Send an SMS message</h2><p>Now go to the <a href="https://console.firebase.google.com/">Firebase console</a>, navigate to your project, and click on the Functions option on the left navigation bar. Copy the URL assigned to your project into a new browser tab and press enter. Voilà! The phone number you specified will receive the SMS message body configured in the code.</p><p><strong>Note</strong>: If you’re using a Plivo trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify a phone number using the Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page of the console.</p><h2>Next step: incoming messages</h2><p>Of course sending messages is only half of the equation. You can use Plivo and Firebase cloud functions to receive incoming messages too. For your next project, give that a try — create an application to receive SMS messages using Node.js, following the instructions in our <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/#api-set-up-a-express-server-for-incoming-messages-callbacks">Quickstart Guide</a>.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes 5 minutes! <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign up</a> today.</p>
