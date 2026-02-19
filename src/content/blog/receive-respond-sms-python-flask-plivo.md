---
title: "How to Receive and Respond to Incoming SMS Messages in Python with Flask and Plivo"
description: "SMS API | Plivo | You can get started to Receive and Respond to Incoming SMS Messages in Python with Flask and Plivo."
pubDate: "2021-05-06T00:00:00.000Z"
updatedDate: "2024-09-15T16:11:47.000Z"
image: "/images/blog/6581948278a18162bd6ef639_receive-sms.png"
thumbnail: "/images/blog/6581948278a18162bd6ef639_receive-sms.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "sms-api", "how-to"]
seoTitle: "How to Receive and Respond to Incoming SMS Messages in Python with Flask and Plivo"
webflowItemId: "6581952421f19581480e1fb2"
---
<p><a href="https://www.plivo.com/blog/send-sms-in-python/">Sending an outbound message</a> using the Plivo <a href="https://www.plivo.com/sms/">SMS platform</a> is easy, but communication should be a two-way street. Customers should be able to text you, and you should acknowledge their messages and address their concerns. To do this, you can build a Python <a href="https://palletsprojects.com/p/flask/">Flask</a> application to receive and respond to incoming SMS messages on a Plivo phone number. In this post, we walk you through how to implement this.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number as you want to receive incoming SMS messages. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://pypi.org/project/Flask/">Flask</a> and <a href="https://pypi.org/project/plivo/">Plivo</a> Python packages — run pip3 install plivo flask to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><p>{{cta-style-1}}</p><h2>Create a Flask application to receive SMS messages</h2><p>Once you’ve installed Flask and the Plivo Python SDK, create a simple Flask application to handle incoming SMS messages on a Plivo number. Use this code:</p><style>
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
    overflow-x: hidden; /* Disable horizontal scrolling */
    word-wrap: break-word; /* Ensure long lines wrap */
  }
  pre.lineno{
    color: #fff;
    opacity: .3;
  }
</style>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">request</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/receive_sms/'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">inbound_sms</span><span class="p">():</span>

 &nbsp; &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'From'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">to_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'To'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">text</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'Text'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="s">'Message received - From: %s, To: %s, Text: %s'</span> <span class="o">%</span><span class="p">(</span><span class="n">from_number</span><span class="p">,</span> <span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">))</span>

 &nbsp; &nbsp;<span class="k">return</span> <span class="s">'Message Received'</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</code></pre></div></div><h2>Return a Message XML document to reply to incoming messages</h2><p>To reply to an incoming SMS message, you need to return an XML document from the URL configured as the message_url in the application assigned to the Plivo number. The Python SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/sms/xml/message/">Message XML element</a> to reply to incoming SMS messages. Use this code:</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">request</span><span class="p">,</span> <span class="n">make_response</span><span class="p">,</span> <span class="n">Response</span>
<span class="kn">from</span> <span class="nn">plivo</span> <span class="kn">import</span> <span class="n">plivoxml</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/reply_sms/'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'GET'</span><span class="p">,</span> <span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">reply_sms</span><span class="p">():</span>

 &nbsp; &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'From'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">to_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'To'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">text</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'Text'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="s">'Message received - From: %s, To: %s, Text: %s'</span> <span class="o">%</span><span class="p">(</span><span class="n">from_number</span><span class="p">,</span> <span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">))</span>

 &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">plivoxml</span><span class="p">.</span><span class="n">ResponseElement</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="n">add</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">plivoxml</span><span class="p">.</span><span class="n">MessageElement</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"Thank you, we have received your request."</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">src</span><span class="o">=</span><span class="n">to_number</span><span class="p">,</span> &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">dst</span><span class="o">=</span><span class="n">from_number</span><span class="p">))</span>
 &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="n">to_string</span><span class="p">())</span> &nbsp;<span class="c1"># Prints the XML
</span> &nbsp; &nbsp;<span class="c1"># Returns the XML
</span> &nbsp; &nbsp;<span class="k">return</span> <span class="n">Response</span><span class="p">(</span><span class="n">response</span><span class="p">.</span><span class="n">to_string</span><span class="p">(),</span> <span class="n">mimetype</span><span class="o">=</span><span class="s">'application/xml'</span><span class="p">)</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">'0.0.0.0'</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Save the code in any file — we named the file reply_sms.py. To run the code on the server, go to the folder where the file resides and use the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python reply_sms.py
</code></pre></div></div><p>You should see your basic server application in action on http://localhost:5000/reply_sms/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to receive and reply to messages. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (5000 in this case, as our local Python application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="/images/blog/65813dd0a11900005db657e2_ngrok-cli.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://31123bc8f94e.ngrok.io/reply_sms/?From=14156667777&amp;To=14156667778) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="/images/blog/65813dd02ee5738fa6d04de8_xml-doc.png" alt="XML document with Message XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Flask application to a Plivo number</h2><p>The final step is to configure the app as a Plivo messaging application and assign it to a Plivo number on which you want to receive SMS messages.</p><p>Go to the Plivo console and navigate to Messaging &gt; Applications &gt; <a href="https://console.plivo.com/sms/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the app — we used “App-Incoming-SMS” — and configure the ngrok URL https://31123bc8f94e.ngrok.io/reply_sms/ as the Message URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="/images/blog/65813dda1c0ad8e3be50a8b8_plivo-app.png" alt="Create Plivo App to handle incoming SMS messages" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down choose the message application you just created. Finally, click Update Number.</p><figure><div><img src="/images/blog/65812bbe3fe416ed11b21140_assign-app.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Send an SMS to the Plivo number you selected. You should see that the Flask application automatically sends a reply back to your mobile number.</p><p>And that’s how simple it is to receive and respond to incoming SMS messages using Plivo’s Python SDK and a Flask application.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes! <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
