---
title: "How to Receive and Respond to Incoming MMS Messages in .NET with ASP.NET MVC and Plivo"
description: "Receive and respond to incoming MMS messages using Plivo's SMS API and the ASP.NET MVC framework."
pubDate: "2022-06-01T00:00:00.000Z"
updatedDate: "2024-01-13T05:41:18.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fdfd6d5cab0208a753855_receive-mms-dotnet.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fdfd6d5cab0208a753855_receive-mms-dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["net-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages in .NET with ASP.NET MVC and Plivo"
webflowItemId: "657fe03db024190af118e706"
---
<h2>Overview</h2><p>This guide shows how to receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company.</p><p>Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages, you must have a Plivo phone number that supports MMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-dotnet-dev-environment-api-messaging/">set up a .NET development environment</a>.</p><h2>Create a .NET controller</h2><p>Navigate to the Controllers directory, create a controller called Autoresponder.cs, and paste into it this code.<br></p><style>
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
    font: 16px Arial,soleil;
    line-height: 29px;
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
  .w-richtext figure {
    max-width: 100%;
    position: relative;
}
  </style>
<div class="language-c# highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Plivo</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Microsoft.AspNetCore.Mvc</span><span class="p">;</span>


<span class="k">namespace</span> <span class="nn">demo.Controllers</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">class</span> <span class="nc">Autoresponder</span> <span class="p">:</span> <span class="n">Controller</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="n">IActionResult</span> <span class="nf">Index</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">from_number</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">to_number</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">text</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">media_url</span> <span class="p">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">Form</span><span class="p">[</span><span class="s">"Media0"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="s">"Message received - From: {0}, To: {1}, Text: {2}, Media: {3}"</span><span class="p">,</span> <span class="n">from_number</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">,</span> <span class="n">media_url</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">body</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">String</span> <span class="n">media</span><span class="p">;</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">if</span> <span class="p">(</span><span class="n">text</span><span class="p">.</span><span class="nf">ToLower</span><span class="p">()</span> <span class="p">==</span> <span class="s">"hi"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">body</span> <span class="p">=</span> <span class="s">"Hello!"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media</span> <span class="p">=</span> <span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span> <span class="k">if</span><span class="p">(</span><span class="n">text</span><span class="p">.</span><span class="nf">ToLower</span><span class="p">()</span> <span class="p">==</span> <span class="s">"bye"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">body</span> <span class="p">=</span> <span class="s">"Bye and have a nice day!"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media</span> <span class="p">=</span> <span class="s">"https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">body</span> <span class="p">=</span> <span class="s">"I'm glad that we connected"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media</span> <span class="p">=</span> <span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">api</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">PlivoApi</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">response</span> <span class="p">=</span> <span class="n">api</span><span class="p">.</span><span class="n">Message</span><span class="p">.</span><span class="nf">Create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">src</span><span class="p">:</span> <span class="n">to_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">dst</span><span class="p">:</span> <span class="n">from_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">text</span><span class="p">:</span><span class="n">body</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">type</span><span class="p">:</span> <span class="s">"mms"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media_urls</span><span class="p">:</span> <span class="k">new</span> <span class="kt">string</span><span class="p">[]</span> <span class="p">{</span><span class="n">media</span><span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nf">Content</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="nf">ToString</span><span class="p">());</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div><p>Run the project and you should see your basic server application in action at http://localhost:5001/autoresponder/.</p><p><a href="https://www.plivo.com/docs/sdk/server/set-up-dotnet-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet.</p><h2>Create a Plivo application for the autoresponder</h2><p>Associate the controller you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click <strong>Add New Application</strong>. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application/#create-an-application">Application API</a>.</p><p>Give your application a name — we called ours Autoresponder. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/autoresponder/) in the Message URL field and set the method to POST. Click <strong>Create Application</strong> to save your application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fde6be4e11e1e96b32cc9_create-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Assign a Plivo number to your application</h2><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p>From the Application Type drop-down, select XML Application.</p><p>From the Plivo Application drop-down, select Autoresponder (the name we gave the application).</p><p>Click <strong>Update Number</strong> to save.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fde8974351fdd7e1317fc_assign-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Test</h2><p>Send a text message to the Plivo number you specified using any phone.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
