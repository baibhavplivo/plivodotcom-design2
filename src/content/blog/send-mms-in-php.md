---
title: "How to Send MMS in PHP Using Plivo’s Messaging API"
description: "SMS API | Plivo | You can get started sending and receiving MMS messages using PHP."
pubDate: "2021-07-29T00:00:00.000Z"
updatedDate: "2024-01-12T08:20:44.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811d8003af957d55407aa8_php-mms%20(1).png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811d8003af957d55407aa8_php-mms%20(1).png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "sms-api", "how-to", "mms"]
seoTitle: "How to Send MMS in PHP Using Plivo’s Messaging API"
webflowItemId: "65811dde889af86635b0a10c"
---
<p>Your company has settled on Plivo to handle its <a href="https://plivo.com/voice/">voice</a> and <a href="https://plivo.com/sms/">messaging</a> communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo has an SDK to help you out. Let’s see how to <a href="https://www.plivo.com/docs/sms/use-cases/send-an-mms/php/">send</a> and <a href="https://www.plivo.com/docs/sms/use-cases/receive-mms/php/">receive</a> MMS through Plivo in a PHP application.</p><h2>Install the Plivo PHP SDK</h2><p>We’ll presume you already have PHP and Composer installed. Change to the directory into which you want to install the Plivo PHP release and run</p><style>
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
  }
  pre{
    background: rgb(33, 33, 48);
    min-width: 100%
  }
  .rouge-table pre{
  padding: 0;
  }

  .highlight pre{
    background-color: rgb(33, 33, 48);
    border-radius: 0;
    padding: 15px 18px 15px 18px;
  }
  pre.lineno{
    color: #fff;
    opacity: .3;
  }
</style>
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>composer require plivo/plivo-php
</code></pre></div></div><p>or you can <a href="https://github.com/plivo/plivo-php/">download the source from our GitHub repository</a>, then run<br></p><style>
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
  }
  pre{
    background: rgb(33, 33, 48);
    min-width: 100%
  }
  .rouge-table pre{
  padding: 0;
  }

  .highlight pre{
    background-color: rgb(33, 33, 48);
    border-radius: 0;
    padding: 15px 18px 15px 18px;
  }
  pre.lineno{
    color: #fff;
    opacity: .3;
  }
</style><h2>Find your Auth ID and Auth Token</h2><p>You have to have proper credentials before you can use the Plivo API. We provide an Auth ID and Auth Token in the Account section at the top of the overview page of the <a href="https://console.plivo.com/dashboard/">Plivo console</a>.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="Find Your Auth Credentials on Plivo Console" width="auto" height="auto" loading="auto"></div></figure><h2>Choose a phone number</h2><p>You need an MMS-enabled Plivo phone number to send MMS to the US and Canada, the two countries where Plivo supports sending MMS. Check the <a href="https://console.plivo.com/active-phone-numbers/">Phone Numbers screen of your Plivo console</a> to see what numbers you have available and which of them support MMS capabilities. You can also buy numbers from this screen.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658119eaa229aefed96bc8e7_buy-new-number-mms.png" alt="Buy a New MMS-enabled Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Send an MMS message</h2><p>Now you’re ready to start. Create a file called SendMMS.php and paste in this code:</p><div class="language-php highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="cp">&lt;?php</span>
 &nbsp; &nbsp;<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">RestClient</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nv">$client</span><span class="o">-&gt;</span><span class="n">client</span><span class="o">-&gt;</span><span class="nf">setTimeout</span><span class="p">(</span><span class="mi">40</span><span class="p">);</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="nv">$mediaURLs</span> <span class="o">=</span> <span class="p">[</span><span class="s1">'https://media.giphy.com/media/26gscSULUcfKU7dHq/source.gif'</span><span class="p">];</span>
 &nbsp; &nbsp;<span class="nv">$mediaIDs</span> <span class="o">=</span> <span class="p">[</span><span class="s1">'801c2056-33ab-499c-80ef-58b574a462a2'</span><span class="p">];</span>
 &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp;<span class="p">[</span> &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="s2">"src"</span> <span class="o">=&gt;</span> <span class="s2">"+14152345678"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"dst"</span> <span class="o">=&gt;</span> <span class="s2">"+14165552222"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"text"</span> &nbsp;<span class="o">=&gt;</span><span class="s2">"This is a test message"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"url"</span><span class="o">=&gt;</span><span class="s2">"https://&lt;yourdomain&gt;.com/sms_status/"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"type"</span> <span class="o">=&gt;</span> <span class="s2">"mms"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"media_urls"</span> <span class="o">=&gt;</span> <span class="nv">$mediaURLs</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"media_ids"</span> <span class="o">=&gt;</span> <span class="nv">$mediaIDs</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">]</span>
 &nbsp; &nbsp;<span class="p">);</span>
 &nbsp; &nbsp;<span class="nb">print_r</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="cp">?&gt;</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><p>Replace the placeholders auth_id and auth_token with actual values from your Plivo Console. Save the file and run it with the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php SendMMS.php
</code></pre></div></div><p><strong>Note</strong>: If you’re using a Plivo trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify a phone number using the <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page of the console. Also, if you want to upload your media files to Plivo and use them, you can upload the file on the Messaging &gt; <a href="https://console.plivo.com/sms/mms-media-upload/">MMS Media Upload page</a> of the console.</p><h2>Receive an MMS message</h2><p>Of course, sending messages is only half of the equation. When someone sends an MMS message to your US or Canada Plivo phone number, you can receive it on your server by setting a Message URL in your Plivo application. Plivo will send the message along with other parameters, including the Media_URL(s), to your Message URL.</p><p>Use this code to start a local server:</p><div class="language-php highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="cp">&lt;?php</span>
 &nbsp; &nbsp;<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="nv">$from_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
 &nbsp; &nbsp;<span class="nv">$to_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
 &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp;<span class="nv">$media_url</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Media0"</span><span class="p">];</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">echo</span><span class="p">(</span><span class="s2">"Message received - From </span><span class="nv">$from_number</span><span class="s2">, To: </span><span class="nv">$to_number</span><span class="s2">, Text: </span><span class="nv">$text</span><span class="s2">, Media: </span>
 &nbsp; &nbsp;<span class="nv">$media_url</span><span class="s2">"</span> <span class="p">);</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><p>Save this code in any file — we’ll call ours receiveMMS.php. To run this file on the server, go to the folder where this file resides and issue the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php <span class="nt">-S</span> localhost:8000
</code></pre></div></div><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages:</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive MMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/php-server/#api-set-up-php-server-for-incoming-messages-callbacks">Quickstart guide</a> for details).</p><h2>Conclusion</h2><p>And that’s all there is to sending and receiving MMS messages using Plivo’s PHP SDK. Don’t use PHP? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
