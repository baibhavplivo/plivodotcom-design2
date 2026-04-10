---
title: "How to Receive and Respond to Incoming SMS Messages in .NET with ASP.NET MVC and Plivo"
description: "SMS API | Plivo | You can get started to Receive and Respond to Incoming SMS Messages in .NET with ASP.NET MVC and Plivo."
pubDate: "2021-06-17T00:00:00.000Z"
updatedDate: "2024-08-10T09:26:54.000Z"
image: "/images/blog/65813a3938523e75123309fc_receive-sms-dotnet.png"
thumbnail: "/images/blog/65813a3938523e75123309fc_receive-sms-dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["net-sdk", "sms-api", "how-to"]
seoTitle: "How to Receive and Respond to Incoming SMS Messages in .NET with ASP.NET MVC and Plivo"
webflowItemId: "65813ad3b5ff0b77ba9615ff"
---
<p><a href="https://www.plivo.com/blog/send-sms-in-dotnet/">Sending an outbound message</a> using the Plivo <a href="https://www.plivo.com/sms/">SMS</a> platform is easy, but communication should be a two-way street. Customers should be able to text you, and you should acknowledge their messages and address their concerns. To do this, you can build an <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">ASP.NET MVC</a> application to <a href="https://www.plivo.com/docs/sms/use-cases/receive-sms/dotnet/">receive</a> and <a href="https://www.plivo.com/docs/sms/use-cases/reply-to-incoming-sms/dotnet/">respond to incoming SMS</a> messages on a Plivo phone number. In this post, we walk you through how to implement this.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number as you want to receive incoming SMS messages. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">ASP.NET MVC</a> application and <a href="https://www.nuget.org/packages/Plivo/">Plivo</a> NuGet package.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><p>{{cta-style-1}}</p><h2>Create an ASP.NET MVC application to receive SMS messages</h2><p>Once you’ve created the ASP.NET MVC application using this <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">tutorial</a>, you can add the Plivo .NET SDK using the NuGet package manager. <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-controller?view=aspnetcore-5.0&amp;tabs=visual-studio">Create a Controller</a>, name it ReceiveSMS to handle incoming SMS messages on a Plivo number. Use this code:</p><style>
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
</pre></td><td class="code"><pre><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Mvc</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">ReceiveSms.Controllers</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">class</span> <span class="nc">ReceiveSMSController</span> <span class="p">:</span> <span class="n">Controller</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">[</span><span class="n">HttpPost</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="n">String</span> <span class="nf">Index</span><span class="p">(</span><span class="n">String</span> <span class="n">From</span><span class="p">,</span> <span class="n">String</span> <span class="n">To</span><span class="p">,</span> <span class="n">String</span> <span class="n">Text</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">Content</span> <span class="p">=</span> <span class="s">"Message received - From:"</span> <span class="p">+</span> <span class="n">From</span> <span class="p">+</span> <span class="s">", To:"</span> <span class="p">+</span> <span class="n">To</span> <span class="p">+</span> <span class="s">", Text:"</span> <span class="p">+</span> <span class="n">Text</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">Content</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">Content</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><h2>Return a Message XML document to reply to incoming messages</h2><p>To reply to an incoming SMS message, you need to return an XML document from the URL configured as the message_url in the application assigned to the Plivo number. The .NET SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/sms/xml/message/">Message XML element</a> to reply to incoming SMS messages. Create another controller, name it ReplySMS and use this code:</p><figure><pre><code class="language-c#" data-lang="c#"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
<span class="k">using</span> <span class="nn">System.Collections.Generic</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Mvc</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">ReceiveSms.Controllers</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">class</span> <span class="nc">ReplySMSController</span> <span class="p">:</span> <span class="n">Controller</span>
 &nbsp; &nbsp;<span class="p">{</span>
		<span class="p">[</span><span class="n">HttpPost</span><span class="p">]</span>
		<span class="k">public</span> <span class="n">IActionResult</span> <span class="nf">Index</span><span class="p">(</span><span class="n">String</span> <span class="n">From</span><span class="p">,</span> <span class="n">String</span> <span class="n">To</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Plivo</span><span class="p">.</span><span class="n">XML</span><span class="p">.</span><span class="n">Response</span> <span class="n">resp</span> <span class="p">=</span> <span class="k">new</span> <span class="n">Plivo</span><span class="p">.</span><span class="n">XML</span><span class="p">.</span><span class="nf">Response</span><span class="p">();</span>
			<span class="n">resp</span><span class="p">.</span><span class="nf">AddMessage</span><span class="p">(</span><span class="s">"Thank you, we have received your request."</span><span class="p">,</span> <span class="k">new</span> <span class="n">Dictionary</span><span class="p">&lt;</span><span class="kt">string</span><span class="p">,</span> <span class="kt">string</span><span class="p">&gt;()</span>
			<span class="p">{</span>
				<span class="p">{</span><span class="s">"src"</span><span class="p">,</span> <span class="n">To</span><span class="p">},</span>
				<span class="p">{</span><span class="s">"dst"</span><span class="p">,</span> <span class="n">From</span><span class="p">},</span>
			<span class="p">});</span>
			<span class="kt">var</span> <span class="n">output</span> <span class="p">=</span> <span class="n">resp</span><span class="p">.</span><span class="nf">ToString</span><span class="p">();</span>
			<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">output</span><span class="p">);</span>
			<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nf">Content</span><span class="p">(</span><span class="n">output</span><span class="p">,</span> <span class="s">"text/xml"</span><span class="p">);</span>
		<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p><strong>Note</strong>: Before starting the app, you have to update Properties/launchSettings.json by setting the applicationUrl as</p><div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nl">"applicationUrl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"http://localhost:5000/"</span><span class="w">
</span></code></pre></div></div><h2>Test the code locally</h2><p>Save the file and run the application. You should see your basic server application in action on http://localhost:5000/replysms/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to receive and reply to messages. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (5000 in this case, as our local ASP.NET MVC application is running there):</p><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure style="max-width:1472px" data-rt-max-width="1472px"><div><img src="/images/blog/65813a7cae55375385c3379a_ngrok-cli-dotnet.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://f658c94814ca.ngrok.io/replysms/\?From=14156667777\&amp;To=14156667778) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:2016px" data-rt-max-width="2016px"><div><img src="/images/blog/65813a7c7cd2777813c46c27_xml-doc-receive-sms-dotnet.png" alt="XML document with Message XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Spring Boot application to a Plivo number</h2><p>The final step is to configure the app as a Plivo messaging application and assign it to a Plivo number on which you want to receive SMS messages.</p><p>Go to the Plivo console and navigate to Messaging &gt; Applications &gt; <a href="https://console.plivo.com/sms/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the app — we used “App-Incoming-SMS” — and configured the ngrok URL https://f658c94814ca.ngrok.io/replysms/ as the Message URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2782px" data-rt-max-width="2782px"><div><img src="/images/blog/65813a89422e8347c5c53d66_create-receive-sms-dotnet.png" alt="Create Plivo App to handle incoming SMS messages" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the message application you just created. Finally, click Update Number.</p><figure style="max-width:2770px" data-rt-max-width="2770px"><div><img src="/images/blog/65812bbe3fe416ed11b21140_assign-app.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Send an SMS to the Plivo number you selected. You should see that the ASP.NET MVC application automatically sends a reply back to your mobile number.</p><p>And that’s how simple it is to receive and respond to incoming SMS messages using Plivo’s .NET SDK and an ASP.NET MVC application.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes! <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
