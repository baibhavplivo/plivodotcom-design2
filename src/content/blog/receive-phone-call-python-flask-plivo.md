---
title: "How to Receive a Phone Call in Python with Flask and Plivo"
description: "Voice API | Plivo | You can get started to Receive a Phone Call in Python with Flask and Plivo."
pubDate: "2021-05-11T00:00:00.000Z"
updatedDate: "2024-08-10T09:27:26.000Z"
image: "/images/blog/6581934414d35da70122dd19_receive-call.png"
thumbnail: "/images/blog/6581934414d35da70122dd19_receive-call.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "voice-api", "how-to"]
seoTitle: "How to Receive a Phone Call in Python with Flask and Plivo"
webflowItemId: "658193ed60c594bdf0963ee1"
---
<p><a href="https://www.plivo.com/blog/make-phone-calls-in-python/">Making an outbound phone call</a> using the Plivo <a href="https://www.plivo.com/voice/">Voice</a> platform is easy, but communication should be a two-way street. Customers should be able to call you back, and you should answer the calls and address their concerns. This guide shows you how to receive incoming calls on Plivo numbers and manage the call flow once a call reaches the Plivo voice platform. To see how to do this, we’ll build a Python <a href="https://palletsprojects.com/p/flask/">Flask</a> application to receive an incoming call and greet the caller with a text-to-speech (TTS) message.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://pypi.org/project/Flask/">Flask</a> and <a href="https://pypi.org/project/plivo/">Plivo</a> Python packages — run pip3 install plivo flask to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><p>{{cta-style-1}}</p><h2>Create a Flask application to receive incoming calls and play a TTS message</h2><p>Once you’ve installed Flask and the Plivo Python SDK, create a simple Flask application to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The Python SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/speak/">Speak XML element</a> to play a text-to-speech message to the caller. Use this code:</p><style>
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
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">request</span><span class="p">,</span> <span class="n">make_response</span>
<span class="kn">from</span> <span class="nn">plivo</span> <span class="kn">import</span> <span class="n">plivoxml</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/receive_call/'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'GET'</span><span class="p">,</span><span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">speak_xml</span><span class="p">():</span>
 &nbsp; &nbsp;<span class="c1"># Generate a Speak XML with the details of the text to play on the call.
</span> &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="p">(</span><span class="n">plivoxml</span><span class="p">.</span><span class="n">ResponseElement</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">add</span><span class="p">(</span><span class="n">plivoxml</span><span class="p">.</span><span class="n">SpeakElement</span><span class="p">(</span><span class="s">'Hello, you just received your first call'</span><span class="p">)))</span>
 &nbsp; &nbsp;<span class="k">return</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="n">to_string</span><span class="p">())</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">"__main__"</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Save the code in any file — we named the file receive_call.py. To run the code on the server, go to the folder where the file resides and use the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python receive_call.py
</code></pre></div></div><p>You should see your basic server application in action on http://localhost:5000/receive_call/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to handle incoming calls (5000 in this case, as our local Python application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><figure><div><img src="/images/blog/65813d14a8f20e02e698e268_ngrok-cli.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><p>Test the link by opening the ngrok URL (https://b51dbc9d904c.ngrok.io/receive_call/) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="/images/blog/65813d141c0ad8e3be504907_xml-doc.png" alt="XML document with Speak XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Flask application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to receive incoming calls.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Incoming-call” — and configure the ngrok URL https://b51dbc9d904c.ngrok.io/receive_call/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="/images/blog/65813d21632d5c1509195e0a_create-app.png" alt="Create Plivo App to handle incoming calls" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="/images/blog/65812adee707ad13a19265b2_assign-voiceapp.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the Flask application automatically greets the caller with the text-to-speech message configured in the app.</p><p>And that’s how simple it is to receive an incoming call on a Plivo number and handle it using XML documents using Plivo’s Python SDK and a Flask application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/python/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/python/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/python/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
