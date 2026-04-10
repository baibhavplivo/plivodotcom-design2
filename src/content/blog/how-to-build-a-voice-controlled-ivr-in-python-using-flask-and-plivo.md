---
title: "How to Build a Voice-controlled Virtual Assistant (IVR) in Python Using Flask and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-08-17T00:00:00.000Z"
updatedDate: "2024-07-08T09:37:40.000Z"
image: "/images/blog/65811892a05b970358487338_ivr-python.png"
thumbnail: "/images/blog/65811892a05b970358487338_ivr-python.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "voice-api", "how-to", "ivr"]
seoTitle: "How to Build a Voice-controlled Virtual Assistant (IVR) in Python Using Flask and Plivo"
webflowItemId: "658119867cd2777813b15a8d"
---
<p>A virtual assistant can help your business if you have clients who call your phone number. <a href="https://en.wikipedia.org/wiki/Interactive_voice_response">Interactive voice response</a> (IVR) helps you to automate call reception by routing callers to the most appropriate department or the agent most qualified to meet their needs. Among its many advantages, IVR can provide increased operational efficiency, a stronger brand image, and better customer insights.</p><p>A voice-controlled virtual assistant is one step ahead of the legacy Touch-Tone/DTMF controlled one because of the flexibility it allows end-users. They can just speak into their phone’s microphone to provide input to control the call.</p><p>Building a voice-controlled virtual assistant using Plivo’s <a href="https://www.plivo.com/voice/automatic-speech-recognition/">automatic speech recognition</a> (ASR) feature in <a href="https://www.python.org/">Python</a> using <a href="https://flask.palletsprojects.com/en/2.0.x/">Flask</a> is simple. This guide shows you how to set up a voice-controlled IVR phone tree to a Plivo number and manage the call flow when the call reaches the <a href="https://plivo.com/voice/">Plivo voice platform</a>. To see how to do this, we’ll build a Flask application to <a href="https://plivo.com/docs/voice/use-cases/receive-incoming-calls/python/">receive an incoming call</a> and use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech input and implement a simple IVR phone system.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="/images/blog/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://pypi.org/project/Flask/">Flask</a> and <a href="https://pypi.org/project/plivo/">Plivo</a> Python packages — run pip install plivo flask to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure><div><img src="/images/blog/65810dcb5c7a0752bc0d1521_receive-speech.png" alt="Receive Speech Inputs" width="auto" height="auto" loading="auto"></div></figure><h2>Create a Flask application to create a voice-controlled virtual assistant</h2><p>Once you’ve installed Flask and the Plivo Python SDK, create a simple Flask application to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The Python SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML</a> element to capture speech inputs and implement a simple IVR phone system. Use this code:</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">Response</span><span class="p">,</span> <span class="n">url_for</span>
<span class="kn">from</span> <span class="nn">plivo</span> <span class="kn">import</span> <span class="n">plivoxml</span>

<span class="c1"># Welcome message - firstbranch
</span><span class="n">welcome_message</span> <span class="o">=</span> <span class="s">"Welcome to the demo app, Say Sales to talk to our 
Sales representative. Say Support to talk to our Support representative"</span>

<span class="c1"># This is the message that Plivo reads when the caller does nothing at all
</span><span class="n">noinput_message</span> <span class="o">=</span> <span class="s">"Sorry, I didn't catch that. Please hangup and try again later."</span>

<span class="c1"># This is the message that Plivo reads when the caller inputs a wrong digit.
</span><span class="n">wronginput_message</span> <span class="o">=</span> <span class="s">"Sorry, it's a wrong input."</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/virtual_assistant/'</span><span class="p">,</span> <span class="n">methods</span> <span class="o">=</span> <span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">virtual_assistant</span><span class="p">():</span>
 &nbsp; &nbsp;<span class="n">element</span> <span class="o">=</span> <span class="n">plivoxml</span><span class="p">.</span><span class="n">ResponseElement</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">element</span><span class="p">.</span><span class="n">add</span><span class="p">(</span><span class="n">plivoxml</span><span class="p">.</span><span class="n">GetInputElement</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">set_action</span><span class="p">(</span><span class="n">url_for</span><span class="p">(</span><span class="s">'firstbranch'</span><span class="p">,</span> <span class="n">_external</span><span class="o">=</span><span class="bp">True</span><span class="p">))</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">set_method</span><span class="p">(</span><span class="s">'POST'</span><span class="p">).</span><span class="n">set_input_type</span><span class="p">(</span><span class="s">'speech'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">set_interim_speech_results_callback</span><span class="p">(</span><span class="n">url_for</span><span class="p">(</span><span class="s">'firstbranch'</span><span class="p">,</span> <span class="n">_external</span><span class="o">=</span><span class="bp">True</span><span class="p">))</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">set_interim_speech_results_callback_method</span><span class="p">(</span><span class="s">'POST'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">set_redirect</span><span class="p">(</span><span class="bp">True</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">add_speak</span><span class="p">(</span><span class="n">content</span> <span class="o">=</span> <span class="n">welcome_message</span><span class="p">))</span>
 &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="n">add</span><span class="p">(</span><span class="n">plivoxml</span><span class="p">.</span><span class="n">SpeakElement</span><span class="p">(</span><span class="n">noinput_message</span><span class="p">))</span>

 &nbsp; &nbsp;<span class="k">return</span> <span class="n">Response</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="n">to_string</span><span class="p">(),</span> <span class="n">mimetype</span> <span class="o">=</span> <span class="s">'text/xml'</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/virtual_assistant/firstbranch/'</span><span class="p">,</span> <span class="n">methods</span> <span class="o">=</span> <span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">firstbranch</span><span class="p">():</span>
 &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">plivoxml</span><span class="p">.</span><span class="n">ResponseElement</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="n">speech</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'Speech'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'From'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="s">"Speech input is:"</span><span class="o">+</span><span class="nb">str</span><span class="p">(</span><span class="n">speech</span><span class="p">))</span>

 &nbsp; &nbsp;<span class="k">if</span> <span class="n">speech</span> <span class="o">==</span> <span class="s">"sales"</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">plivoxml</span><span class="p">.</span><span class="n">ResponseElement</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="n">add</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">plivoxml</span><span class="p">.</span><span class="n">DialElement</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">add</span><span class="p">(</span><span class="n">plivoxml</span><span class="p">.</span><span class="n">NumberElement</span><span class="p">(</span><span class="s">'+14156667777'</span><span class="p">)))</span>

 &nbsp; &nbsp;<span class="k">elif</span> <span class="n">speech</span> <span class="o">==</span> <span class="s">"support"</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">plivoxml</span><span class="p">.</span><span class="n">ResponseElement</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="n">add</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">plivoxml</span><span class="p">.</span><span class="n">DialElement</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">.</span><span class="n">add</span><span class="p">(</span><span class="n">plivoxml</span><span class="p">.</span><span class="n">NumberElement</span><span class="p">(</span><span class="s">'+14156667778'</span><span class="p">)))</span>
 &nbsp; &nbsp;<span class="k">else</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="n">add_speak</span><span class="p">(</span><span class="n">wronginput_message</span><span class="p">)</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">return</span> <span class="n">Response</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="n">to_string</span><span class="p">(),</span> <span class="n">mimetype</span> <span class="o">=</span> <span class="s">'text/xml'</span><span class="p">)</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span> <span class="o">=</span> <span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span> <span class="o">=</span> <span class="bp">True</span><span class="p">)</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Save the code in any file — we named the file virtual_assistant.py. To run the code on the server, go to the folder where the file resides and use the command</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python virtual_assistant.py
</code></pre></div></div><p>You should see your basic server app in action on http://localhost:5000/virtual_assistant/</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive calls (5000 in this case, as our local Flask application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="/images/blog/658118f55c7a0752bc14aacb_ngrok-cli-va-python.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(http://fd3a77b913ed.ngrok.io/virtual_assistant/) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="/images/blog/6581191a151ed7f8824d5d66_xml-doc-va-python.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Flask application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to activate the voice-controlled virtual assistant.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Virtual-Assistant” — and configure the ngrok URL http://fd3a77b913ed.ngrok.io/virtual_assistant/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="/images/blog/6581191aa6a83cd184a0c57e_create-app-va-python.png" alt="Create Plivo App for voice-controlled IVR MVC app" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="/images/blog/65810e2c84a5125d94dbe715_assign-app-virtual-assistant.png" alt="Assign Virtual-Assistant Plivo App" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the VirtualAssistant Flask application automatically routes the call to the Sales and Support departments based on the speech inputs received on the call.</p><p>And that’s how simple it is to set up a voice-controlled virtual assistant on a Plivo number and handle it using XML documents using Plivo’s Python SDK and an Flask application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/python/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/python/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/python/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
