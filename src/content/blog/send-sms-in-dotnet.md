---
title: "How to Send and Receive SMS Messages Using .NET and Plivo's Messaging API"
description: "Get started with Plivo’s SMS API and .NET to send and receive SMS text messages."
pubDate: "2021-03-25T00:00:00.000Z"
updatedDate: "2024-08-10T09:25:55.000Z"
image: "/images/blog/65819deae138528f8e5ebcbe_dotnet.png"
thumbnail: "/images/blog/65819deae138528f8e5ebcbe_dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["net-sdk", "sms-api", "how-to"]
seoTitle: "How to Send and Receive SMS Messages Using .NET and Plivo's Messaging API"
webflowItemId: "65819eb29e4b9a97944a66c2"
---
<p>Once you’ve chosen Plivo to handle your company’s voice and messaging channels, it’s time to start integrating Plivo’s tools into your company’s applications. We make this process easy with a <a href="https://www.plivo.com/docs/sdk/server/net-sdk/">.NET SDK</a> to help you out. Use it to write .NET applications that <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> and <a href="https://www.plivo.com/docs/sms/api/message/#handling-incoming">receive</a> <a href="https://www.plivo.com/sms/">SMS messages</a>.</p><p>In this guide, we’ll explain how to send and receive SMS messages using .NET. We'll walk you through how to up your account, write code snippets for sending messages, and receive responses through our SMS API. By the end, you'll be ready to leverage SMS communication for notifications, alerts, or even two-way interactions in .NET. </p><h2>Prerequisites</h2><p>Before you dive into the steps to set up Plivo’s SMS API with ASP.NET Core, make sure the following prerequisites are in place.&nbsp;</p><ul><li>A Plivo account— <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already.&nbsp;</li><li><a href="https://dotnet.microsoft.com/download">Install .NET Framework</a> 4.6 or higher</li><li>Install the Plivo .NET SDK using Visual Studio</li><li>Trigger an API request</li><li>Set up a .NET Framework application</li><li>Set up <a href="https://ngrok.com/download">ngrok</a></li></ul><p>The prerequisites listed above are part of the instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-dotnet-dev-environment-api-messaging/">set up a .NET development environment</a>. If this is your first time using Plivo APIs, follow our guide to set up your dev environment to send and receive SMS messages.</p><p>{{cta-style-1}}</p><h2>Send an SMS message with ASP.NET Core</h2><p>Now you’re ready to start. Open the file Program.cs in the CS project and paste into it this code.</p><style>
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
<figure><pre><code class="language-c#" data-lang="c#"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">System.Collections.Generic</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Plivo</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">testplivo</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">internal</span> <span class="k">class</span> <span class="nc">Program</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">api</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">PlivoApi</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s">"&lt;auth_token&gt;"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">response</span> <span class="p">=</span> <span class="n">api</span><span class="p">.</span><span class="n">Message</span><span class="p">.</span><span class="nf">Create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">src</span><span class="p">:</span> <span class="s">"&lt;sender_id&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">dst</span><span class="p">:</span> <span class="s">"&lt;destination_number&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">text</span><span class="p">:</span> <span class="s">"Hello, world!"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">response</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can rent a Plivo number from Phone Numbers &gt;<a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>. Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>dotnet run
</code></pre></div></div><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Receive an SMS message with ASP.NET Core MVC</h2><p>Of course sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our <a href="https://www.plivo.com/sms/coverage/">SMS API coverage</a> page and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by setting a Message URL in your Plivo application. Plivo will send the message along with other parameters to your Message URL.</p><p>Begin by setting up a .NET Core app. Create a new project directory.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">mkdir </span>receivesmsapp
</code></pre></div></div><p>Change to that directory and initialize the model-view-controller<a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new#web-options"> (MVC</a>) architecture with the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>dotnet new mvc <span class="nt">--no-https</span>
</code></pre></div></div><p>Change to the Controllers directory. Create a controller named ReceiveSmsController.cs and paste into it this code.</p><figure><pre><code class="language-c#" data-lang="c#"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Mvc</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">ReceiceSms.Controllers</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">class</span> <span class="nc">ReceiveSmsController</span> <span class="p">:</span> <span class="n">Controller</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// GET: /&lt;controller&gt;/</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="n">String</span> <span class="nf">Index</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// Sender's phone number</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">from_number</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// Receiver's phone number</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">to_number</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// The text that was received</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">text</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// Print the message</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="s">"Message received - From: {0}, To: {1}, Text: {2}"</span><span class="p">,</span> <span class="n">from_number</span><span class="p">,</span> <span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="s">"Message received"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Before you can test the application, edit Properties/launchSettings.json and set the applicationUrl.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>"applicationUrl": "http://localhost:5000/"
</code></pre></div></div><p>Then start the local server with the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>dotnet run
</code></pre></div></div><p>You should then be able to see your basic server app in action on http://localhost:5000/receivesms/.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure><div><img src="/images/blog/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive SMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/#create-an-application">Quickstart guide</a> for details).</p><h2>Why integrate Plivo’s SMS API with ASP.NET?</h2><p>ASP.NET provides a strong foundation for integrating Plivo’s SMS API with your business tech stack. Many developers are already well-versed in C# and Visual Studio, making it faster and easier to leverage this framework for your web application.&nbsp;</p><p>Keeping your SMS logic within your ASP.NET application simplifies code management and maintenance. Everything is in one place. And, it scales well for handling high volumes of SMS traffic. Beyond SMS, ASP.NET allows you to integrate with other functionalities like email, databases, and user authentication, creating a powerful web application ecosystem.</p><h2>Conclusion</h2><p>That’s all there is to sending and receiving SMS messages using Plivo’s .NET Core SDK. Don’t use .NET Core? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/php-server/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t signed up for <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
