---
title: "How to Receive and Respond to Incoming SMS Messages in Go with Gin and Plivo"
description: "SMS API | Plivo | You can get started receiving and responding to incoming SMS Messages in Go with Gin and Plivo."
pubDate: "2021-06-24T00:00:00.000Z"
updatedDate: "2024-07-13T10:49:35.000Z"
image: "/images/blog/65812b4a9d2ea44f23dd0f07_receive-sms-go.png"
thumbnail: "/images/blog/65812b4a9d2ea44f23dd0f07_receive-sms-go.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["go-sdk", "sms-api", "how-to"]
seoTitle: "How to Receive and Respond to Incoming SMS Messages in Go with Gin and Plivo"
webflowItemId: "65812c00cd9dde6e9b8b6e18"
---
<p><a href="https://www.plivo.com/blog/send-sms-in-go/">Sending an outbound message</a> using the Plivo <a href="https://www.plivo.com/sms/">SMS</a> platform is easy, but communication should be a two-way street. Customers should be able to text you, and you should acknowledge their messages and address their concerns. To do this, you can build a Go <a href="https://github.com/gin-gonic/gin">Gin-Gonic</a> application to <a href="https://www.plivo.com/docs/sms/use-cases/receive-sms/go/">receive</a> and <a href="https://www.plivo.com/docs/sms/use-cases/reply-to-incoming-sms/go/">respond to incoming SMS</a> messages on a Plivo phone number. In this post, we walk you through how to implement this.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number as you want to receive incoming SMS messages. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://golang.org/">Golang</a>, <a href="https://github.com/gin-gonic/gin">Gin-Gonic</a>, and <a href="https://github.com/plivo/plivo-go">Plivo</a> go packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a Gin web application to receive SMS messages</h2><p>Once you’ve installed <a href="https://golang.org/">Golang</a>, <a href="https://github.com/gin-gonic/gin">Gin-Gonic</a>, and <a href="https://github.com/plivo/plivo-go">Plivo</a> go packages, create a simple Gin web application to handle incoming SMS messages on a Plivo number. Use this code:</p><style>
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
<div class="language-go highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
 &nbsp;<span class="s">"net/http"</span>

 &nbsp;<span class="s">"github.com/gin-gonic/gin"</span>
<span class="p">)</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
 &nbsp;<span class="n">r</span> <span class="o">:=</span> <span class="n">gin</span><span class="o">.</span><span class="n">Default</span><span class="p">()</span>
 &nbsp;<span class="n">r</span><span class="o">.</span><span class="n">GET</span><span class="p">(</span><span class="s">"/receive_sms"</span><span class="p">,</span> <span class="k">func</span><span class="p">(</span><span class="n">c</span> <span class="o">*</span><span class="n">gin</span><span class="o">.</span><span class="n">Context</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; <span class="n">fromnumber</span> <span class="o">:=</span> <span class="n">c</span><span class="o">.</span><span class="n">Query</span><span class="p">(</span><span class="s">"From"</span><span class="p">)</span>
 &nbsp; &nbsp; <span class="n">tonumber</span> <span class="o">:=</span> <span class="n">c</span><span class="o">.</span><span class="n">Query</span><span class="p">(</span><span class="s">"To"</span><span class="p">)</span>
 &nbsp; &nbsp; <span class="n">text</span> <span class="o">:=</span> <span class="n">c</span><span class="o">.</span><span class="n">Query</span><span class="p">(</span><span class="s">"Text"</span><span class="p">)</span>
 &nbsp; &nbsp; <span class="n">c</span><span class="o">.</span><span class="n">String</span><span class="p">(</span><span class="n">http</span><span class="o">.</span><span class="n">StatusOK</span><span class="p">,</span> <span class="s">"Message Received %s %s %s"</span><span class="p">,</span> <span class="n">fromnumber</span><span class="p">,</span> <span class="n">tonumber</span><span class="p">,</span> <span class="n">text</span><span class="p">)</span>
 &nbsp;<span class="p">})</span>
 &nbsp;<span class="n">r</span><span class="o">.</span><span class="n">Run</span><span class="p">()</span> <span class="c">// listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")</span>
<span class="p">}</span>
</code></pre></div></div><h2>Return a Message XML document to reply to incoming messages</h2><p>To reply to an incoming SMS message, you need to return an XML document from the URL configured as the message_url in the application assigned to the Plivo number. The Go SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/sms/xml/message/">Message XML element</a> to reply to incoming SMS messages. Use this code:</p><div class="language-go highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
 &nbsp; <span class="s">"github.com/gin-gonic/gin"</span>
 &nbsp; <span class="s">"github.com/plivo/plivo-go/v7/xml"</span>
<span class="p">)</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
 &nbsp; <span class="n">r</span> <span class="o">:=</span> <span class="n">gin</span><span class="o">.</span><span class="n">Default</span><span class="p">()</span>
 &nbsp; <span class="n">r</span><span class="o">.</span><span class="n">GET</span><span class="p">(</span><span class="s">"/reply_sms"</span><span class="p">,</span> <span class="k">func</span><span class="p">(</span><span class="n">c</span> <span class="o">*</span><span class="n">gin</span><span class="o">.</span><span class="n">Context</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; <span class="n">c</span><span class="o">.</span><span class="n">Header</span><span class="p">(</span><span class="s">"Content-Type"</span><span class="p">,</span> <span class="s">"application/xml"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; <span class="n">fromnumber</span> <span class="o">:=</span> <span class="n">c</span><span class="o">.</span><span class="n">Query</span><span class="p">(</span><span class="s">"From"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; <span class="n">tonumber</span> <span class="o">:=</span> <span class="n">c</span><span class="o">.</span><span class="n">Query</span><span class="p">(</span><span class="s">"To"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; <span class="n">response</span> <span class="o">:=</span> <span class="n">xml</span><span class="o">.</span><span class="n">ResponseElement</span><span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="n">Contents</span><span class="o">:</span> <span class="p">[]</span><span class="k">interface</span><span class="p">{}{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nb">new</span><span class="p">(</span><span class="n">xml</span><span class="o">.</span><span class="n">MessageElement</span><span class="p">)</span><span class="o">.</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="n">SetDst</span><span class="p">(</span><span class="n">tonumber</span><span class="p">)</span><span class="o">.</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="n">SetSrc</span><span class="p">(</span><span class="n">fromnumber</span><span class="p">)</span><span class="o">.</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="n">SetContents</span><span class="p">(</span><span class="s">"Thanks, we have received your request"</span><span class="p">),</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">},</span>
 &nbsp; &nbsp; &nbsp; <span class="p">}</span>
 &nbsp; &nbsp; &nbsp; <span class="n">c</span><span class="o">.</span><span class="n">String</span><span class="p">(</span><span class="m">200</span><span class="p">,</span> <span class="n">response</span><span class="o">.</span><span class="n">String</span><span class="p">())</span>
 &nbsp; <span class="p">})</span>
 &nbsp; <span class="n">r</span><span class="o">.</span><span class="n">Run</span><span class="p">()</span> <span class="c">// listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")</span>
<span class="p">}</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Save the code in any file — we named the file reply_sms.go. To run the code on the server, go to the folder where the file resides and use the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>go run reply_sms.go
</code></pre></div></div><p>You should see your basic server application in action on http://localhost:8080/reply_sms/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to receive and reply to messages. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (8080 in this case, as our local Gin web application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 8080
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure style="max-width:1528px" data-rt-max-width="1528px"><div><img src="/images/blog/65812bacfe202571effd3e05_ngrok-cli-go.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://6d2adbcd5861.ngrok.io/reply_sms/?From=14156667777&amp;To=14156667778) in a browser to check the XML response from the ngrok URL.</p><figure style="max-width:1842px" data-rt-max-width="1842px"><div><img src="/images/blog/65812bacfe202571effd3e0c_xml-doc-receive-sms-go.png" alt="XML document with Message XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Gin web application to a Plivo number</h2><p>The final step is to configure the app as a Plivo messaging application and assign it to a Plivo number on which you want to receive SMS messages.</p><p>Go to the Plivo console and navigate to Messaging &gt; Applications &gt; <a href="https://console.plivo.com/sms/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the app — we used “App-Incoming-SMS” — and configure the ngrok URL https://6d2adbcd5861.ngrok.io/reply_sms/ as the Message URL. Select the HTTP verb as GET, then click Create Application.</p><figure style="max-width:2768px" data-rt-max-width="2768px"><div><img src="/images/blog/65812bbea11900005dab5a55_create-receive-sms-go.png" alt="Create Plivo App to handle incoming SMS messages" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the message application you just created. Finally, click Update Number.</p><figure style="max-width:2770px" data-rt-max-width="2770px"><div><img src="/images/blog/65812bbe3fe416ed11b21140_assign-app.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Send an SMS to the Plivo number you selected. You should see that the Gin web application automatically sends a reply back to your mobile number.</p><p>And that’s how simple it is to receive and respond to incoming SMS messages using Plivo’s Go SDK and a Gin web application.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes! <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
