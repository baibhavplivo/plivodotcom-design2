---
title: "How to Send and Receive SMS in Node.js and Express.js Using Plivo's SMS API"
description: "Get started with Plivo’ SMS API, Node.js, and Express.js to send and receive SMS text messages."
pubDate: "2021-03-15T00:00:00.000Z"
updatedDate: "2024-09-15T16:14:23.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6581a11541deead1a921c7fc_node.png"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6581a11541deead1a921c7fc_node.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["node-js-sdk", "sms-api", "how-to"]
seoTitle: "How to Send and Receive SMS in Node.js and Express.js | Plivo"
webflowItemId: "6581a1cc95c0f48c1b8fe17e"
---
<p>Your company has settled on Plivo to handle its voice and messaging communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo has a <a href="https://www.plivo.com/docs/sdk/server/node-sdk/">Node.js SDK</a> to help you out. You can use it write Node.js applications that <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> and <a href="https://www.plivo.com/docs/sms/api/message/#handling-incoming">receive</a> SMS messages.</p><p>In this guide, we’ll outline the steps for getting set up to use Node.js and Express.js in <a href="https://www.plivo.com/sms/">Plivo’s SMS API</a>. Start by setting up your Node.js environment and connecting your Plivo account. We’ve also got code snippets for you to leverage to send and receive messaging through our SMS API. By the end, you'll be ready to leverage SMS communication for notifications, alerts, or even two-way interactions in Node.js.</p><h2>Prerequisites</h2><p>To send SMS with Node.js, you need the following elements in place:&nbsp;</p><ul><li>A Plivo account - If you don't have one already, <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address.&nbsp;</li><li><a href="https://nodejs.org/en/download/">Install Node</a></li><li>Install <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-messaging/">Plivo’s Node SDK</a></li><li>Install the <a href="https://expressjs.com/">Express</a> framework.</li></ul><p>If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-messaging/">set up a Node.js development environment</a>. Once you’re completed these steps, carry on to learn how to send SMS in Node.js.</p><p>{{cta-style-1}}</p><h2>Send SMS in Node.js</h2><p>Create a file called SendSMS.js and paste this code into it.</p><style>
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
<figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
</pre></td><td class="code"><pre><span class="kd">let</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">let</span> <span class="nx">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">Client</span><span class="p">(</span><span class="dl">'</span><span class="s1">auth_id</span><span class="dl">'</span><span class="p">,</span> <span class="dl">'</span><span class="s1">auth_token</span><span class="dl">'</span><span class="p">);</span>

<span class="nx">client</span><span class="p">.</span><span class="nx">messages</span><span class="p">.</span><span class="nx">create</span><span class="p">({</span>
 &nbsp; &nbsp;<span class="na">src</span><span class="p">:</span> <span class="dl">'</span><span class="s1">&lt;sender_id&gt;</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="na">dst</span><span class="p">:</span> <span class="dl">'</span><span class="s1">&lt;destination_number&gt;</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="na">text</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Hello, world!</span><span class="dl">'</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">message_created</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">message_created</span><span class="p">)</span>
<span class="p">});</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can rent a Plivo number from Phone Numbers &gt;<a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>. Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>node SendSMS.js
</code></pre></div></div><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Receive SMS in Node.js</h2><p>Of course, sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our <a href="https://www.plivo.com/sms/coverage/">SMS API coverage</a> page and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by setting a Message URL in your Plivo application. Plivo will send the message along with other parameters to your Message URL.</p><p>Create a file called receive_sms.js (or whatever name you like) and paste into it this code.</p><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="kd">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">express</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">bodyParser</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">body-parser</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">();</span>

<span class="nx">app</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="nx">bodyParser</span><span class="p">.</span><span class="nx">urlencoded</span><span class="p">({</span>
 &nbsp; &nbsp;<span class="na">extended</span><span class="p">:</span> <span class="kc">true</span>
<span class="p">}));</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">response</span><span class="p">,</span> <span class="nx">next</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">response</span><span class="p">.</span><span class="nx">contentType</span><span class="p">(</span><span class="dl">'</span><span class="s1">application/xml</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">next</span><span class="p">();</span>
<span class="p">});</span>
<span class="nx">app</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">,</span> <span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PORT</span> <span class="o">||</span> <span class="mi">3000</span><span class="p">));</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span><span class="dl">'</span><span class="s1">/receive_sms/</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">request</span><span class="p">,</span> <span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="kd">let</span> <span class="nx">from_number</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">From</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">From</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="kd">let</span> <span class="nx">to_number</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">To</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">To</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="kd">let</span> <span class="nx">text</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">Text</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">Text</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="c1">//Print the message</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Message received - From: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">from_number</span> <span class="o">+</span> <span class="dl">'</span><span class="s1">, To: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">to_number</span> <span class="o">+</span> <span class="dl">'</span><span class="s1">, Text: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">text</span><span class="p">);</span>
<span class="p">});</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">),</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Node app is running on port</span><span class="dl">'</span><span class="p">,</span> <span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">));</span>
<span class="p">});</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Save the file and run it.</p><p>You should then be able to see your basic server app in action on http://localhost:3000/receive_sms/.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages.</p><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive SMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/node/#create-an-application">Quickstart guide</a> for details).</p><h2>Why use Node.js to send and receive SMS</h2><p>Node.js's event-driven, non-blocking architecture is well-suited for handling SMS communications. It excels at handling multiple concurrent SMS requests without blocking the application and can efficiently manage high volumes of SMS traffic.&nbsp;</p><p>Applications that use Node.js for backend benefit from all the pros of full-stack JavaScript development, including better efficiency, code sharing and reusability, speed, and productivity. Node.js is well-suited for applications requiring real-time SMS interactions, such as two-factor authentication or live chat.</p><h2>Get started with Plivo to send SMS in Node.js</h2><p>That’s all there is to sending and receiving SMS messages using Plivo’s Node.js SDK.&nbsp;</p><p>Don’t use Node.js? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/php-server/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes 5 minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
