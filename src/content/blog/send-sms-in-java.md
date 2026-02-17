---
title: "How to Send and Receive SMS Messages in Java Using Plivo’s SMS API"
description: "Get started with Plivo’s SMS API and Java to send and receive SMS text messages."
pubDate: "2020-12-14T00:00:00.000Z"
updatedDate: "2024-08-10T09:26:24.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658258cc2f3ddd520789f5e2_java.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658258cc2f3ddd520789f5e2_java.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["java-sdk", "sms-api", "how-to"]
seoTitle: "Send and Receive SMS Messages in Java Using Plivo’s SMS API"
webflowItemId: "65825a1f2799a75e541ee952"
---
<p>Your company has settled on Plivo to handle its voice and messaging communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo has a <a href="https://www.plivo.com/docs/sdk/server/java-sdk/">Java SDK</a> to help you out. You can use it write Java applications that <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> and <a href="https://www.plivo.com/docs/sms/api/message/#handling-incoming">receive</a> <a href="https://www.plivo.com/sms/">SMS messages</a>.<br><br>In this guide, we’ll explain how to send and receive SMS messages in Java. We'll walk you through the process of setting up your account, writing code snippets for sending messages and receiving responses through our SMS API. By the end, you'll be ready to leverage SMS communication for notifications, alerts, or even two-way interactions in Java.</p><h2>Prerequisites</h2><p>Before we walk you through the steps to send SMS in Java, you’ll need a few prerequisites in place:&nbsp;</p><ul><li>A Plivo account— <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already.&nbsp;</li><li><a href="https://www.oracle.com/java/technologies/downloads/">Install (or update) Java 1.8 or higher</a></li><li><a href="https://www.jetbrains.com/idea/download/">Install IntelliJ IDEA</a></li><li><a href="https://www.plivo.com/docs/sdk/server/set-up-java-dev-environment-api-messaging/">Install Spring and the Plivo Java SDK</a></li></ul><p>To make sure you’re ready to go, refer to our guide <a href="https://www.plivo.com/docs/sdk/server/set-up-java-dev-environment-api-messaging">Set up your Java Dev Environment for Messaging</a>. This guide will go into more detail to help you set up a development environment to trigger API requests in Java. The entire process takes around five minutes.</p><p>{{cta-style-1}}</p><h2>Send an SMS in Java</h2><p>Now you’re ready to start. Create a Java class in the project called SendSMS and paste into it this code.</p><style>
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
</pre></td><td class="code"><pre><span class="n">import</span> <span class="n">java</span><span class="p">.</span><span class="n">io</span><span class="p">.</span><span class="n">IOException</span><span class="p">;</span>
<span class="n">import</span> <span class="n">java</span><span class="p">.</span><span class="n">util</span><span class="p">.</span><span class="n">Collections</span><span class="p">;</span>
<span class="n">import</span> <span class="n">com</span><span class="p">.</span><span class="n">plivo</span><span class="p">.</span><span class="n">api</span><span class="p">.</span><span class="n">Plivo</span><span class="p">;</span>
<span class="n">import</span> <span class="n">com</span><span class="p">.</span><span class="n">plivo</span><span class="p">.</span><span class="n">api</span><span class="p">.</span><span class="n">exceptions</span><span class="p">.</span><span class="n">PlivoRestException</span><span class="p">;</span>
<span class="n">import</span> <span class="n">com</span><span class="p">.</span><span class="n">plivo</span><span class="p">.</span><span class="n">api</span><span class="p">.</span><span class="n">models</span><span class="p">.</span><span class="n">message</span><span class="p">.</span><span class="n">Message</span><span class="p">;</span>
<span class="n">import</span> <span class="n">com</span><span class="p">.</span><span class="n">plivo</span><span class="p">.</span><span class="n">api</span><span class="p">.</span><span class="n">models</span><span class="p">.</span><span class="n">message</span><span class="p">.</span><span class="n">MessageCreateResponse</span><span class="p">;</span>

<span class="k">class</span> <span class="nc">SendSMS</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">main</span><span class="p">(</span><span class="n">String</span> <span class="p">[]</span> <span class="n">args</span><span class="p">)</span> <span class="n">throws</span> <span class="n">IOException</span><span class="p">,</span> <span class="n">PlivoRestException</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Plivo</span><span class="p">.</span><span class="nf">init</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s">"&lt;auth_token&gt;"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">MessageCreateResponse</span> <span class="n">response</span> <span class="p">=</span> <span class="n">Message</span><span class="p">.</span><span class="nf">creator</span><span class="p">(</span><span class="s">"&lt;sender_id&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"&lt;destination_number&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"Hello, from Java!"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="nf">create</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">System</span><span class="p">.</span><span class="k">out</span><span class="p">.</span><span class="nf">println</span><span class="p">(</span><span class="n">response</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can rent a Plivo number from Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>. Save the file and run it.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Receive an SMS in Java</h2><p>Of course sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our <a href="https://www.plivo.com/sms/coverage/">SMS API coverage</a> page and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by using a <a href="https://sparkjava.com/">Spark</a> web app. Install Spark by editing pom.xml and adding dependencies for Spark and the Simple Logging Facade for Java (<a href="https://www.slf4j.org/">SLF4J</a>), which you’ll also want.</p><div class="language-xml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;dependency&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;groupId&gt;</span>com.sparkjava<span class="nt">&lt;/groupId&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;artifactId&gt;</span>spark-core<span class="nt">&lt;/artifactId&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;version&gt;</span>2.9.1<span class="nt">&lt;/version&gt;</span>
<span class="nt">&lt;/dependency&gt;</span>
<span class="nt">&lt;dependency&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;groupId&gt;</span>org.slf4j<span class="nt">&lt;/groupId&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;artifactId&gt;</span>slf4j-simple<span class="nt">&lt;/artifactId&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;version&gt;</span>1.7.21<span class="nt">&lt;/version&gt;</span>
<span class="nt">&lt;/dependency&gt;</span>
</code></pre></div></div><p>Then create a Java class in the project called ReceiveSMS and paste into it this code.</p><figure><pre><code class="language-c#" data-lang="c#"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="n">import</span> <span class="k">static</span> <span class="n">spark</span><span class="p">.</span><span class="n">Spark</span><span class="p">.*;</span>

<span class="k">public</span> <span class="k">class</span> <span class="nc">ReceiveSms</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">main</span><span class="p">(</span><span class="n">String</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">get</span><span class="p">(</span><span class="s">"/receive_sms"</span><span class="p">,</span> <span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="n">response</span><span class="p">)</span> <span class="p">-&gt;</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// Sender's phone number</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">from_number</span> <span class="p">=</span> <span class="n">request</span><span class="p">.</span><span class="nf">queryParams</span><span class="p">(</span><span class="s">"From"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// Receiver's phone number - Plivo number</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">to_number</span> <span class="p">=</span> <span class="n">request</span><span class="p">.</span><span class="nf">queryParams</span><span class="p">(</span><span class="s">"To"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// The text that was received</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">text</span> <span class="p">=</span> <span class="n">request</span><span class="p">.</span><span class="nf">queryParams</span><span class="p">(</span><span class="s">"Text"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// Print the message</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">System</span><span class="p">.</span><span class="k">out</span><span class="p">.</span><span class="nf">println</span><span class="p">(</span><span class="n">from_number</span> <span class="p">+</span> <span class="s">" "</span> <span class="p">+</span> <span class="n">to_number</span> <span class="p">+</span> <span class="s">" "</span> <span class="p">+</span> <span class="n">text</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="s">"Message Received"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">});</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>When you run the project you should see your basic server app in action on http://localhost:4567/receive_sms.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages:</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive SMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/#create-an-application">Quickstart guide</a> for details). You can also <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/#reply-to-an-incoming-sms">create a Java class to reply to incoming SMS messages</a>.</p><h2>Why you should use Java to send and receive SMS</h2><p>Java’s platform independence, ease of use, and security make it a great programming language for sending and receiving SMS messages. Compared to other programming languages, Java is simple to use and easy to understand.&nbsp;<br><br>Java is also an object-oriented programming language, meaning developers can easily reuse objects in other programs. Because it’s platform independent (e.g., Write Once Run Anywhere, or WORA), Java SMS applications can run on various platforms (Windows, macOS, Linux, etc.) without modification.<br><br>Finally, Java provides robust security mechanisms to protect sensitive SMS data. SSL/TLS support for SMS transactions makes secure communication channels easy to establish.</p><h2>Get started with Plivo to send SMS in Java</h2><p>That’s all there is to sending and receiving SMS messages using Plivo’s Java SDK.&nbsp;<br><br>Don’t use Java? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/php-server/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and takes only five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
