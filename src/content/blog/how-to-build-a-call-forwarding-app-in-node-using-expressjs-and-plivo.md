---
title: "How to Build a Call Forwarding App in Node.js Using Express.js and Plivo"
description: "Voice API | Plivo | You can get started to build a Call forwarding app in Node.js Using Express.js and Plivo"
pubDate: "2021-07-01T00:00:00.000Z"
updatedDate: "2024-01-12T07:18:41.000Z"
image: "/images/blog/6581296883f7e167a85ce802_forward-call-nodejs.png"
thumbnail: "/images/blog/6581296883f7e167a85ce802_forward-call-nodejs.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["node-js-sdk", "voice-api", "how-to"]
seoTitle: "How to Build a Call Forwarding App in Node.js Using Express.js and Plivo"
webflowItemId: "65812a594b431bddbc353007"
---
<p>Businesses use call forwarding all the time to route incoming calls to available agents, extensions, or departments that cater to the caller’s needs. Creating a call forwarding app is simple when you use Plivo’s <a href="https://github.com/plivo/plivo-node">Node.js SDK</a>. This guide shows you how to receive incoming calls on Plivo numbers and manage the call flow once a call reaches the Plivo voice platform. To see how to do this, we’ll build an <a href="https://expressjs.com/">Express.js</a> application to forward the call to a mobile number using the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML</a> element.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="/images/blog/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://www.npmjs.com/package/express">Express.js</a> and <a href="https://www.npmjs.com/package/plivo">Plivo</a> npm packages — run npm i -S plivo express body-parser to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create an Express.js application to forward incoming calls</h2><p>Once you’ve installed Express.js and the Plivo Node.js SDK, create a simple Express.js application to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The Node.js SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML element</a> to forward the call to a mobile number. Use this code:</p><style>
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
<div class="language-javascript highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="kd">var</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">express</span><span class="dl">'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="kd">const</span> <span class="nx">bodyParser</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">body-parser</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="kd">var</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">()</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="nx">app</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="nx">bodyParser</span><span class="p">.</span><span class="nx">urlencoded</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; <span class="na">extended</span><span class="p">:</span> <span class="kc">true</span>
 &nbsp; &nbsp;<span class="p">}));</span>
 &nbsp; &nbsp;<span class="nx">app</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span><span class="dl">'</span><span class="s1">/forward_call/</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; <span class="nx">res</span><span class="p">.</span><span class="nx">contentType</span><span class="p">(</span><span class="dl">'</span><span class="s1">application/xml</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; <span class="kd">var</span> <span class="nx">fromNumber</span> <span class="o">=</span> <span class="nx">req</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">From</span> <span class="o">||</span> <span class="nx">req</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">From</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; <span class="kd">var</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; <span class="kd">var</span> <span class="nx">response</span> <span class="o">=</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">Response</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; <span class="kd">var</span> <span class="nx">params</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="dl">'</span><span class="s1">callerId</span><span class="dl">'</span><span class="p">:</span> <span class="nx">fromNumber</span><br> <span class="c1">// caller's number will be used as caller_ID for the call to forwarding number</span>
 &nbsp; &nbsp; &nbsp; <span class="p">};</span>
 &nbsp; &nbsp; &nbsp; <span class="kd">var</span> <span class="nx">dial</span> <span class="o">=</span> <span class="nx">response</span><span class="p">.</span><span class="nx">addDial</span><span class="p">(</span><span class="nx">params</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; <span class="nx">dial</span><span class="p">.</span><span class="nx">addNumber</span><span class="p">(</span><span class="dl">"</span><span class="s2">14156667777</span><span class="dl">"</span><span class="p">);</span><br> <span class="c1">// call will be forwarded to this number</span>
 &nbsp; &nbsp; &nbsp; <span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">response</span><span class="p">.</span><span class="nx">toXML</span><span class="p">());</span>
 &nbsp; &nbsp;<span class="p">})</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="nx">app</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">,</span> <span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PORT</span> <span class="o">||</span> <span class="mi">5000</span><span class="p">));</span>
 &nbsp; &nbsp;<span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">),</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Node app is running on port</span><span class="dl">'</span><span class="p">,</span> <span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">));</span>
 &nbsp; &nbsp;<span class="p">});</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><h2>Test the code locally</h2><p>Save the code in any file — we named the file forward_call.js. To run the code on the server, go to the folder where the file resides and use the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>node forward_call.js
</code></pre></div></div><p>You should see your basic server application in action on http://localhost:5000/forward_call/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to forward incoming calls (5000 in this case, as our local Express application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><figure style="max-width:1592px" data-rt-max-width="1592px"><div><img src="/images/blog/658129d8151ed7f882582c49_ngrok-cli-cf-node.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><p>Test the link by opening the ngrok URL (https://5d278f96a504.ngrok.io/forward_call/) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:1784px" data-rt-max-width="1784px"><div><img src="/images/blog/658129e6cd9dde6e9b8a1279_xml-doc-cf-node.png" alt="XML document with Dial XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Express application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to forward incoming calls.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-call-forward” — and configured the ngrok URL https://5d278f96a504.ngrok.io/forward_call/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2774px" data-rt-max-width="2774px"><div><img src="/images/blog/658129f1a6a83cd184aae074_create-app-cf-node.png" alt="Create Plivo App to forward incoming calls" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure style="max-width:2772px" data-rt-max-width="2772px"><div><img src="/images/blog/65810f15632d5c1509fd8b48_assign-voiceapp-callforward.png" alt="Assign the call forward Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the Express application automatically forwards the call to the phone number configured in the call forwarding app.</p><p>And that’s how simple it is to receive an incoming call on a Plivo number and forward it using XML documents using Plivo’s Node.js SDK and an Express application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/node/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/receive-input/node/">receive DTMF/Speech inputs</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/node/">number masking</a>, as your business requires.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
