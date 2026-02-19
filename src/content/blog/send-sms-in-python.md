---
title: "How to Send and Receive SMS Messages Using Python and Plivo’s Messaging API"
description: "Discover how to get started with Plivo’s SMS API and Python to easily send and receive SMS text messages."
pubDate: "2021-01-08T00:00:00.000Z"
updatedDate: "2024-09-15T16:16:13.000Z"
image: "/images/blog/65825b5e1bd1963341ea5dd3_python.png"
thumbnail: "/images/blog/65825b5e1bd1963341ea5dd3_python.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "sms", "how-to"]
seoTitle: "How to Send and Receive SMS Messages Using Python | Plivo"
webflowItemId: "65825d36a27d41a4a6a10a7c"
---
<p>Your company has settled on Plivo to handle its voice and messaging communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo’s <a href="https://www.plivo.com/sms/">SMS API</a> has a <a href="https://www.plivo.com/docs/sdk/server/python-sdk/">Python SDK</a> to help you out. You can use it write Python applications that <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> and <a href="https://www.plivo.com/docs/sms/api/message/#handling-incoming">receive</a> SMS messages.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-python-dev-environment-api-messaging/">set up a Python development environment</a>.</p><p>{{cta-style-1}}</p><h2>Send an SMS message using Python</h2><p>Now you’re ready to start. Create a file called send_sms.py and paste into it this code.</p><style>
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
    margin: 0px;
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
<figure><pre><code class="language-python" data-lang="python"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
</pre></td><td class="code"><pre><span class="kn">import</span> <span class="nn">plivo</span>

<span class="n">client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="s">'&lt;auth_id&gt;'</span><span class="p">,</span><span class="s">'&lt;auth_token&gt;'</span><span class="p">)</span>
<span class="n">message_created</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="n">messages</span><span class="p">.</span><span class="n">create</span><span class="p">(</span>
&nbsp;&nbsp;<span class="n">src</span><span class="o">=</span><span class="s">'&lt;sender_id&gt;'</span><span class="p">,</span>
&nbsp;&nbsp;<span class="n">dst</span><span class="o">=</span><span class="s">'&lt;destination_number&gt;'</span><span class="p">,</span>
&nbsp;&nbsp;<span class="n">text</span><span class="o">=</span><span class="s">'Hello, world!'</span>
<span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can rent a Plivo number from Phone Numbers &gt;<a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>. Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python receive_sms.py
</code></pre></div></div><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Receive an SMS message using Python</h2><p>Of course sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our <a href="https://www.plivo.com/sms/coverage/">SMS API coverage</a> page and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by setting a Message URL in your Plivo application. Plivo will send the message along with other parameters to your Message URL. You can implement this using a <a href="https://palletsprojects.com/p/flask/">Flask</a> web app.</p><p>First, optionally, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/#setup-a-virtual-env-optional">set up a virtual environment</a> to keep these packages isolated from others on your system. Then create a file called receive_sms.py (or whatever name you like) and paste into it this code.</p><figure><pre><code class="language-python" data-lang="python"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">request</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/receive_sms/'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">inbound_sms</span><span class="p">():</span>

 &nbsp; &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'From'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">to_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'To'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">text</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'Text'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="s">'Message received - From: %s, To: %s, Text: %s'</span> <span class="o">%</span><span class="p">(</span><span class="n">from_number</span><span class="p">,</span> <span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">))</span>
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">return</span> <span class="s">'Message Received'</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python receive_sms.py
</code></pre></div></div><p>You should then be able to see your basic server app in action on http://localhost:5000/receive_sms/.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure><div><img src="/images/blog/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive SMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/#create-an-application">Quickstart guide</a> for details).</p><h2>Conclusion</h2><p>And that’s all there is to sending SMS with Python. Don’t use Python? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/php-server/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/">Ruby</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and takes only five minutes. <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign up</a> today.</p>
