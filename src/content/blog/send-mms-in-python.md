---
title: "How to Send MMS in Python Using Plivo's Messaging API"
description: "SMS API | Plivo | You can get started to send MMS, receive MMS, forward MMS, etc. using Python programming language."
pubDate: "2021-08-12T00:00:00.000Z"
updatedDate: "2024-07-13T10:57:13.000Z"
image: "/images/blog/658119a9d045e63a5091d3d1_python-mms.png"
thumbnail: "/images/blog/658119a9d045e63a5091d3d1_python-mms.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "sms-api", "how-to", "mms"]
seoTitle: "How to Send MMS in Python Using Plivo's Messaging API"
webflowItemId: "65811a9b5c7a0752bc15a7b8"
---
<p>Your company has settled on Plivo to handle its <a href="https://plivo.com/voice/">voice</a> and <a href="https://plivo.com/sms/">messaging</a> communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo has an SDK to help you out. Let’s see how to <a href="https://www.plivo.com/docs/sms/use-cases/send-an-mms/php/">send</a> and <a href="https://www.plivo.com/docs/sms/use-cases/receive-mms/php/">receive</a> MMS through Plivo in a Python application.</p><h2>Install the Plivo Python SDK</h2><p>We’ll presume you already have Python installed. Installing the Plivo SDK is as simple as running</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>pip <span class="nb">install </span>plivo
</code></pre></div></div><p>If you prefer to install from source code, visit our <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/#install-plivo-python-package">Quickstart Guide</a> for instructions.</p><h2>Find your Auth ID and Auth Token</h2><p>You have to have proper credentials before you can use the Plivo API. We provide an Auth ID and Auth Token in the Account section at the top of the overview page of the <a href="https://console.plivo.com/dashboard/">Plivo console</a>.</p><figure><div><img src="/images/blog/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="Find Your Auth Credentials on Plivo Console" width="auto" height="auto" loading="auto"></div></figure><h2>Choose a phone number</h2><p>You need an MMS-enabled Plivo phone number to send MMS to the US and Canada, the two countries where Plivo supports sending MMS. Check the <a href="https://console.plivo.com/active-phone-numbers/">Phone Numbers screen of your Plivo console</a> to see what numbers you have available and which of them support MMS capabilities. You can also buy numbers from this screen.</p><figure><div><img src="/images/blog/658119eaa229aefed96bc8e7_buy-new-number-mms.png" alt="Buy a New MMS-enabled Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Send an MMS message</h2><p>Now you’re ready to start. Create a file called send_mms.py and paste in this code:</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">Response</span>
<span class="kn">from</span> <span class="nn">plivo</span> <span class="kn">import</span> <span class="n">plivo</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/send_mms/'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">outbound_mms</span><span class="p">():</span>
 &nbsp; &nbsp;<span class="n">client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="s">'&lt;auth_id&gt;'</span><span class="p">,</span><span class="s">'&lt;auth_token&gt;'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="n">messages</span><span class="p">.</span><span class="n">create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">src</span><span class="o">=</span><span class="s">'+14156667777'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">dst</span><span class="o">=</span><span class="s">'+14156667778'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media_ids</span><span class="o">=</span><span class="p">[</span><span class="s">'801c2056-33ab-499c-80ef-58b574a462a2'</span><span class="p">],</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">text</span><span class="o">=</span><span class="s">'Hello, MMS from Python!'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media_urls</span><span class="o">=</span><span class="p">[</span><span class="s">'https://media.giphy.com/media/26gscSULUcfKU7dHq/source.gif'</span><span class="p">],</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">type_</span><span class="o">=</span><span class="s">'mms'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">return</span> <span class="n">Response</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="n">to_string</span><span class="p">())</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</code></pre></div></div>

<p>Replace the placeholders auth_id and auth_token with actual values from your <a href="https://console.plivo.com/dashboard/">Plivo Console</a>. Save the file and run it with the command</p>

<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python send_mms.py
</code></pre></div></div><p>Replace the placeholders auth_id and auth_token with actual values from your Plivo Console. Save the file and run it with the command</p><p><strong>Note</strong>: If you’re using a Plivo trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify a phone number using the <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page of the console. Also, if you want to upload your media files to Plivo and use them, you can upload the file on the Messaging &gt; <a href="https://console.plivo.com/sms/mms-media-upload/">MMS Media Upload page</a> of the console.</p><h2>Receive an MMS message</h2><p>Of course, sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our SMS API coverage page, and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by using a Flask web app. Plivo will send the message along with other parameters, including the Media_URL(s), to your Message URL.</p><p>First, optionally, set up a virtual environment to keep these packages isolated from others on your system. Then create a file called receive_mms.py (or whatever name you like) with this code in it:</p><div class="language-python highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">request</span>

 &nbsp; &nbsp;<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/receive_mms/'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
 &nbsp; &nbsp;<span class="k">def</span> <span class="nf">inbound_mms</span><span class="p">():</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'From'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">to_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'To'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">text</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'Text'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media_url</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'Media0'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="s">'Message received - From: %s, To: %s, Text: %s, Media: %s'</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="o">%</span><span class="p">(</span><span class="n">from_number</span><span class="p">,</span> <span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">,</span> <span class="n">media_url</span><span class="p">))</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="s">'Message Recevived'</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><p>Run it with the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python receive_sms.py
</code></pre></div></div><p>You should then be able to see your basic server app in action on http://localhost:5000/receive_mms/.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages:</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use to access your local server using the public network.</p><figure><div><img src="/images/blog/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive MMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/#api-set-up-a-flask-server-for-incoming-messages-callbacks">Quickstart guide</a> for details).</p><h2>Conclusion</h2><p>And that’s all there is to sending and receiving MMS messages using Plivo’s Python SDK. Don’t use Python? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/php-server/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
