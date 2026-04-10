---
title: "How to Build a Call Forwarding App in .NET with ASP.NET MVC and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-08-19T00:00:00.000Z"
updatedDate: "2024-01-12T08:54:46.000Z"
image: "/images/blog/65811736931c16a277c892f2_forward-call-dotnet.png"
thumbnail: "/images/blog/65811736931c16a277c892f2_forward-call-dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["net-sdk", "voice-api", "how-to", "call-forwarding"]
seoTitle: "How to Build a Call Forwarding App in .NET with ASP.NET MVC and Plivo"
webflowItemId: "658118110583e429582f3ddd"
---
<p>Businesses use call forwarding all the time to route incoming calls to available agents, extensions, or departments that cater to the caller’s needs. Creating a call forwarding app is simple when you use Plivo’s <a href="https://www.plivo.com/docs/sdk/server/net-sdk/">Dotnet SDK</a>. This guide shows you how to receive incoming calls on Plivo numbers and manage the call flow once a call reaches the Plivo voice platform. To see how to do this, we’ll build a <a href="https://docs.microsoft.com/en-us/aspnet/mvc/overview/getting-started/introduction/getting-started">.NET MVC</a> application to forward the call to a mobile number using the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML</a> element.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">ASP.NET MVC</a> application and <a href="https://www.nuget.org/packages/Plivo/">Plivo</a> NuGet package.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure><div><img src="/images/blog/65810ee428ecd57f80448d92_call-forward.png" alt="Call Forward" width="auto" height="auto" loading="auto"></div></figure><h2>Create an ASP.NET MVC application to forward incoming calls</h2><p>Once you’ve created the ASP.NET MVC application using this <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">tutorial</a>, you can add the Plivo .NET SDK using the NuGet package manager. <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-controller?view=aspnetcore-5.0&amp;tabs=visual-studio">Create a Controller</a>, name it ForwardCalls.cs to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The .NET SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML Element</a> to forward the call to a mobile number. Use this code:</p><style>
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
<div class="language-csharp highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="k">using</span> <span class="nn">System.Collections.Generic</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="k">using</span> <span class="nn">Plivo.XML</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Mvc</span><span class="p">;</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">namespace</span> <span class="nn">VoiceApp.Controllers</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="k">class</span> <span class="nc">ForwardCalls</span><span class="p">:</span> <span class="n">Controller</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="n">IActionResult</span> <span class="nf">Index</span><span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Plivo</span><span class="p">.</span><span class="n">XML</span><span class="p">.</span><span class="n">Response</span> <span class="n">resp</span> <span class="p">=</span> <span class="k">new</span> <span class="n">Plivo</span><span class="p">.</span><span class="n">XML</span><span class="p">.</span><span class="nf">Response</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Plivo</span><span class="p">.</span><span class="n">XML</span><span class="p">.</span><span class="n">Dial</span> <span class="n">dial</span> <span class="p">=</span> <span class="k">new</span> <span class="n">Plivo</span><span class="p">.</span><span class="n">XML</span><span class="p">.</span><span class="nf">Dial</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">(</span><span class="k">new</span> <span class="n">Dictionary</span> <span class="p">&lt;</span> <span class="kt">string</span><span class="p">,</span> <span class="kt">string</span> <span class="p">&gt;</span> <span class="p">()</span> <span class="p">{});</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1">// call will be forwarded to the below number</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">dial</span><span class="p">.</span><span class="nf">AddNumber</span><span class="p">(</span><span class="s">"+14156667777"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">new</span> <span class="n">Dictionary</span> <span class="p">&lt;</span> <span class="kt">string</span><span class="p">,</span> <span class="kt">string</span> <span class="p">&gt;</span> <span class="p">()</span> <span class="p">{});</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">resp</span><span class="p">.</span><span class="nf">Add</span><span class="p">(</span><span class="n">dial</span><span class="p">);</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">output</span> <span class="p">=</span> <span class="n">resp</span><span class="p">.</span><span class="nf">ToString</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">output</span><span class="p">);</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nf">Content</span><span class="p">(</span><span class="n">output</span><span class="p">,</span> <span class="s">"text/xml"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><p><strong>Note</strong>: Before starting the app, you have to update Properties/launchSettings.json by setting the applicationUrl as</p><div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nl">"applicationUrl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"http://localhost:5000/"</span><span class="w">
</span></code></pre></div></div><h2>Test the code locally</h2><p>Save the file and run the application. You should see your basic server app in action on http://localhost:5000/ForwardCalls/</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive calls (5000 in this case, as our local ASP.NET MVC application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="/images/blog/65841e959801a5d2f817bea3_ngrok-cli-forwardcalls-dotnet.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://42f68190ab0d.ngrok.io/ForwardCalls/) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="/images/blog/65841e9541a163a02018ffe3_xml-doc-forwardcalls-dotnet.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the ASP.NET MVC application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to receive incoming calls.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-call-forward” — and configure the ngrok URL https://42f68190ab0d.ngrok.io/ForwardCalls/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="/images/blog/65841e9f1702bcdc81c8d763_create-app-forwardcalls-dotnet.png" alt="Create Plivo App to Forward Incoming calls" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="/images/blog/65810f15632d5c1509fd8b48_assign-voiceapp-callforward.png" alt="Assign the call forward Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the ASP.NET MVC application automatically forwards the call to the phone number configured in the call forwarding app.</p><p>And that’s how simple it is to receive an incoming call on a Plivo number and forward it using XML documents using Plivo’s Dotnet SDK and ASP.NET MVC application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/dotnet/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/receive-input/dotnet/">receive DTMF/Speech inputs</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/dotnet/">number masking</a>, as your business requires.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
