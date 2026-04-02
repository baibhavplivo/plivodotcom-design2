---
title: "How to Send SMS in Ruby Using Plivo’s SMS API"
description: "Get started sending, receiving, and forwarding SMS text messages using Plivo’s messaging API platform and the Ruby programming language."
pubDate: "2021-01-20T00:00:00.000Z"
updatedDate: "2024-01-15T08:57:00.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658256592005d7240b07b4ff_ic-blog-sms-ruby.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658256592005d7240b07b4ff_ic-blog-sms-ruby.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "sms", "how-to"]
seoTitle: "How to Send SMS in Ruby Using Plivo’s SMS API"
webflowItemId: "6582572ae91f8901ae1c3bf0"
---
<p>Your company has settled on Plivo to handle its voice and messaging communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo has a <a href="https://www.plivo.com/docs/sdk/server/ruby-sdk/">Ruby SDK</a> to help you out. You can use it write Ruby applications that <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">send</a> and <a href="https://www.plivo.com/docs/sms/api/message/#handling-incoming">receive</a> <a href="https://www.plivo.com/sms/">SMS messages</a>.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-ruby-dev-environment-api-messaging/">set up a Ruby development environment</a>.</p><h2>Send an SMS message</h2><p>Now you’re ready to start. Create a file called SendSMS.rb and paste into it this code.</p><style>
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
<figure><pre><code class="language-ruby" data-lang="ruby"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="nb">require</span> <span class="s1">'rubygems'</span>
<span class="nb">require</span> <span class="s1">'plivo'</span>

<span class="kp">include</span> <span class="no">Plivo</span>

<span class="n">client</span> <span class="o">=</span> <span class="no">RestClient</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s2">"&lt;auth_token&gt;"</span><span class="p">)</span>
<span class="n">message_created</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="nf">messages</span><span class="p">.</span><span class="nf">create</span><span class="p">(</span>
 &nbsp;<span class="s1">'&lt;sender_id&gt;'</span><span class="p">,</span>
 &nbsp;<span class="p">[</span><span class="s1">'&lt;destination_number&gt;'</span><span class="p">],</span>
 &nbsp;<span class="s1">'Hello, world!'</span>
<span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with actual values from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can rent a Plivo number from Phone Numbers &gt;<a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>. Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>ruby SendSMS.rb
</code></pre></div></div><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Receive an SMS message</h2><p>Of course sending messages is only half of the equation. Plivo supports receiving SMS text messages in many countries (see our <a href="https://www.plivo.com/sms/coverage/">SMS API coverage</a> page and click on the countries you’re interested in). When someone sends an SMS message to a Plivo phone number, you can receive it on your server by setting a Message URL in your Plivo application. Plivo will send the message along with other parameters to your Message URL. You can implement this using a <a href="https://sinatrarb.com/">Sinatra</a> web app.</p><p>First, create a file called receive_sms.rb (or whatever name you like) and paste into it this code.</p><figure><pre><code class="language-ruby" data-lang="ruby"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
</pre></td><td class="code"><pre><span class="nb">require</span> <span class="s2">"sinatra"</span>

<span class="n">get</span> <span class="s2">"/receive_sms/"</span> <span class="k">do</span>
 &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:From</span><span class="p">]</span>
 &nbsp;<span class="n">to_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:To</span><span class="p">]</span>
 &nbsp;<span class="n">text</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Text</span><span class="p">]</span>
 &nbsp;<span class="nb">puts</span> <span class="s2">"Message received — From: </span><span class="si">#{</span><span class="n">from_number</span><span class="si">}</span><span class="s2">, To: </span><span class="si">#{</span><span class="n">to_number</span><span class="si">}</span><span class="s2">, Text: </span><span class="si">#{</span><span class="n">text</span><span class="si">}</span><span class="s2">"</span>
<span class="k">end</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>ruby receive_sms.rb
</code></pre></div></div><p>You should then be able to see your basic server app in action on http://localhost:4567/receive_sms/.</p><p>That’s fine for testing, but it’s not much good if you can’t connect to the internet to receive incoming messages and handle callbacks. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http <span class="o">[</span>portnum]
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server using the public network.</p><figure style="max-width:603px" data-rt-max-width="603px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811a422144d45074a52a4e_ngrok.png" alt="Sample ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Now you can create an application to receive SMS messages (follow our <a href="https://www.plivo.com/docs/sms/quickstart/ruby-sinatra/#create-an-application">Quickstart guide</a> for details).</p><h2>Conclusion</h2><p>And that’s all there is to sending and receiving SMS messages using Plivo’s Ruby SDK. Don’t use Ruby? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/sms/quickstart/php-server/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried Plivo yet? Getting started is easy and takes only five minutes. <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign up</a> today.</p><p><br></p>
