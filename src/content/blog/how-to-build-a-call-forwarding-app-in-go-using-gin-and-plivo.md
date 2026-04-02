---
title: "How to Build a Call Forwarding App in Go with Gin-Gonic and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-09-09T00:00:00.000Z"
updatedDate: "2024-07-14T09:05:35.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810eadf5f5700f3fba4d19_forward-call-go.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810eadf5f5700f3fba4d19_forward-call-go.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["go-sdk", "voice-api", "how-to", "call-forwarding"]
seoTitle: "How to Build a Call Forwarding App in Go with Gin-Gonic and Plivo"
webflowItemId: "65810f847e417570deb03679"
---
<p>Businesses use call forwarding all the time to route incoming calls to available agents, extensions, or departments that cater to the caller’s needs. Creating a call forwarding app is simple when you use Plivo’s <a href="https://www.plivo.com/docs/sdk/server/go-sdk/">Go SDK</a>. This guide shows you how to receive incoming calls on Plivo numbers and manage the call flow once a call reaches the Plivo voice platform. To see how to do this, we’ll build a Go <a href="https://github.com/gin-gonic/gin">Gin</a> application to forward the call to a mobile number using the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML</a> element.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li></ul><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://golang.org/">Golang</a>, <a href="https://github.com/gin-gonic/gin">Gin</a>, and <a href="https://github.com/plivo/plivo-go">Plivo</a> go packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810ee428ecd57f80448d92_call-forward.png" alt="Call Forward" width="auto" height="auto" loading="auto"></div></figure><h2>Create a Gin web application to forward incoming calls</h2><p>Once you’ve installed <a href="https://golang.org/">Golang</a>, <a href="https://github.com/gin-gonic/gin">Gin</a>, and <a href="https://github.com/plivo/plivo-go">Plivo</a> go packages, create a simple Gin web application to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The Go SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML element</a> to forward the call to a mobile number. Use this code:</p><style>
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
<div class="language-go highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="k">package</span> <span class="n">main</span>

 &nbsp; &nbsp;<span class="k">import</span> <span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"github.com/gin-gonic/gin"</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"github.com/plivo/plivo-go/v7/xml"</span>
 &nbsp; &nbsp;<span class="p">)</span>
 &nbsp; &nbsp;
<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="n">r</span> <span class="o">:=</span> <span class="n">gin</span><span class="o">.</span><span class="n">Default</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="n">r</span><span class="o">.</span><span class="n">GET</span><span class="p">(</span><span class="s">"/receive_call"</span><span class="p">,</span> <span class="k">func</span><span class="p">(</span><span class="n">c</span> <span class="o">*</span><span class="n">gin</span><span class="o">.</span><span class="n">Context</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="n">c</span><span class="o">.</span><span class="n">Header</span><span class="p">(</span><span class="s">"Content-Type"</span><span class="p">,</span> <span class="s">"application/xml"</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">response</span> <span class="o">:=</span> <span class="n">xml</span><span class="o">.</span><span class="n">ResponseElement</span><span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Contents</span><span class="o">:</span> <span class="p">[]</span><span class="k">interface</span><span class="p">{}{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nb">new</span><span class="p">(</span><span class="n">xml</span><span class="o">.</span><span class="n">SpeakElement</span><span class="p">)</span><span class="o">.</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="n">AddSpeak</span><span class="p">(</span><span class="s">"Hello, you just received your first call"</span><span class="p">,</span> <span class="s">"MAN"</span><span class="p">,</span> <span class="s">"en-US"</span><span class="p">,</span> <span class="m">1</span><span class="p">),</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">},</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">c</span><span class="o">.</span><span class="n">String</span><span class="p">(</span><span class="m">200</span><span class="p">,</span> <span class="n">response</span><span class="o">.</span><span class="n">String</span><span class="p">())</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">})</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">r</span><span class="o">.</span><span class="n">Run</span><span class="p">()</span> <span class="c">// listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")</span>
 &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><h2>Test the code locally</h2><p>Save this code in any file (name the file something like forward_call.go). To run this file on the server, go to the folder where this file resides and use the following command:</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>go run receive_call.go
</code></pre></div></div><p>And you should see your basic server app in action on http://localhost:8080/forward_call.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to forward incoming calls (8080 in this case, as our local Gin web application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 8080
</code></pre></div></div><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810efd9cc4953e3f9f0dee_ngrok-cli-forwardcalls-gin.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><p>Test the link by opening the ngrok URL (https://e67a-49-206-115-115.ngrok.io/forward_call) in a browser or use <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810f08a229aefed9645934_xml-doc-forwardcalls-gin.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Gin web application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to forward incoming calls.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-call-forward” — and configured the ngrok URL https://e67a-49-206-115-115.ngrok.io/forward_call as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810f152144d450749d871b_create-app-forwardcalls-gin.png" alt="Create Plivo App to Forward Incoming calls" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810f15632d5c1509fd8b48_assign-voiceapp-callforward.png" alt="Assign the call forward Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the Gin web application automatically forwards the call to the phone number configured in the call forwarding app.</p><p>And that’s how simple it is to receive an incoming call on a Plivo number and forward it using XML documents using Plivo’s Go SDK and a Gin web application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/go/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/receive-input/go/">receive DTMF/Speech inputs</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/go/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
