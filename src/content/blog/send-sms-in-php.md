---
title: "How to Send and Receive SMS Messages in PHP Using Plivo’s SMS API"
description: "Get started with Plivo’s SMS API and PHP to send and receive SMS text messages."
pubDate: "2021-02-24T00:00:00.000Z"
updatedDate: "2024-09-15T16:10:23.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/658250eebbb9e1fb6751a6ae_php.png"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/658250eebbb9e1fb6751a6ae_php.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "sms-api", "how-to"]
seoTitle: "Send and Receive SMS Messages in PHP Using Plivo’s SMS API"
webflowItemId: "6582518b6c45a92bb67604e9"
---
<p>Your company has chosen <a href="https://www.plivo.com/">Plivo</a> to handle its voice and messaging communications. Now, it’s your job to integrate Plivo into your company’s applications. Don’t worry — you can send SMS in PHP using the <a href="https://www.plivo.com/docs/sdk/server/php-sdk">PHP SDK</a> and easily write PHP applications that <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> and <a href="https://www.plivo.com/docs/sms/api/message/#handling-incoming">receive</a> SMS messages. </p><p>This guide will explain the steps for sending and receiving SMS messages in PHP. We'll cover everything from setting up your account to crafting the code snippets for sending messages and handling incoming replies. By the end, you'll be ready to leverage Plivo’s <a href="https://www.plivo.com/sms/">SMS API</a> to send notifications, alerts, or even two-way interactions within your PHP applications.</p><p>{{cta-style-1}}</p><h2>Prerequisites</h2><p>Before diving into the steps in this guide, make sure you have the following prerequisites ready to go.&nbsp;</p><ul><li>A <a href="https://www.plivo.com/">Plivo</a> account — <a href="https://console.plivo.com/accounts/register">sign up</a> with your work email address if you don’t have one already.&nbsp;</li><li><a href="https://www.plivo.com/docs/sdk/server/set-up-php-dev-environment-api-messaging/">Install PHP</a></li><li><a href="https://www.plivo.com/docs/sdk/server/set-up-php-dev-environment-api-messaging#install-composer">Install Composer</a></li><li><a href="https://www.plivo.com/docs/sdk/server/set-up-php-dev-environment-api-messaging#install-laravel-and-create-a-laravel-project">Install Laravel and create a Laravel project</a></li><li><a href="https://www.plivo.com/docs/sdk/server/set-up-php-dev-environment-api-messaging#xml-install-plivo">Install the PHP Plivo SDK</a></li></ul><h2>Send an SMS in PHP</h2><p>Now you’re ready to start. Create a file called SendSMS.php and paste into it this code.</p><style>
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
<figure><pre><code class="language-php" data-lang="php"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>

<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">RestClient</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">);</span>
<span class="nv">$message_created</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">([</span> 
 &nbsp; &nbsp; &nbsp; <span class="s2">"src"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;sender_id&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="s2">"dst"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;destination_number&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="s2">"text"</span> &nbsp;<span class="o">=&gt;</span><span class="s2">"Hello, world!"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="s2">"url"</span><span class="o">=&gt;</span><span class="s2">"https://&lt;yourdomain&gt;.com/sms_status/"</span>
 &nbsp; &nbsp;<span class="p">]</span>
<span class="p">);</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can rent a Plivo number from Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>. Save the file and run it.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a phone number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Receive SMS in PHP</h2><p>Of course sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our <a href="https://www.plivo.com/sms/coverage/">SMS API coverage</a> page and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by setting a Message URL in your Plivo application. Plivo will send the message along with other parameters to your Message URL.</p><p>Create a file called receive_sms.php (or whatever name you like) and paste into it this code.</p><figure><pre><code class="language-php" data-lang="php"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
</pre></td><td class="code"><pre><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>

<span class="nv">$from_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
<span class="nv">$to_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
<span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>


<span class="k">echo</span><span class="p">(</span><span class="s2">"Message received - From </span><span class="nv">$from_number</span><span class="s2">, To: </span><span class="nv">$to_number</span><span class="s2">, Text: </span><span class="nv">$text</span><span class="s2">"</span><span class="p">);</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php <span class="nt">-S</span> localhost:8000
</code></pre></div></div><p>You should then be able to see your basic server app in action at http://localhost:8000/receive_sms/.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive SMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/php-server/#create-an-application">Quickstart guide</a> for details).</p><h2>Best practices for sending SMS with PHP</h2><p>Make sure your SMS messages are received and read by following these best practices.&nbsp;</p><h3>1. Send using a valid phone number</h3><p>Use a phone number that is registered with your gateway provider or a valid number associated with your account.</p><h3>2. Use E.164 formatting</h3><p>E.164 is an international standard numbering format developed for telephone systems worldwide. Numbers are a maximum of 15 digits starting with a plus sign (+) followed by the country code (e.g. 1 for the U.S.) and the mobile number.</p><h3>3. Keep messages concise</h3><p>Stick to around 160 characters to stay within GSM-7 encoding limits.&nbsp;</p><h3>4. Provide an opt-out option</h3><p>The Cellular Telecommunications Industry Association’s (CTIA) guidelines require brands to give their audience a way to opt-out of receiving future text messages (such as, “reply STOP to stop receiving these messages”).&nbsp;</p><p>To learn more about sending SMS with PHP, check out our <a href="https://docs.plivo.com/docs/messaging#install-composer">developer documentation</a>.</p><h2>Get started with Plivo to send SMS in PHP</h2><p>And that’s all there is to sending and receiving SMS messages using Plivo’s PHP SDK. Don’t use PHP? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried Plivo yet? Getting started is easy and takes only five minutes. <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign up</a> today.</p>
