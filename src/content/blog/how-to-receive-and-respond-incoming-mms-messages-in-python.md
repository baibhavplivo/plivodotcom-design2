---
title: "How to Receive and Respond to Incoming MMS Messages in Python with Flask and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-03-30T00:00:00.000Z"
updatedDate: "2024-01-15T09:22:41.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff529787e20793de254ea_receive-mms-python.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff529787e20793de254ea_receive-mms-python.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "sms-api", "how-to", "mms"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages in Python with Flask and Plivo"
webflowItemId: "657ff5ddda303a85acca5d6a"
---
<p>You can receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company. Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS API</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages you must have a Plivo phone number that supports MMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-python-dev-environment-api-messaging/">set up a Python development environment</a> and a web server and safely expose that server to the internet.</p><h2>Create a Flask server to receive MMS messages</h2><p>Create a file called receive_mms.py and paste into it this code.</p><figure><pre><code class="language-python" data-lang="python"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
</pre></td><td class="code"><pre><span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">request</span>
<span class="kn">import</span> <span class="nn">plivo</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>


<span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">"/receive-mms/"</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">"GET"</span><span class="p">,</span> <span class="s">"POST"</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">receive_mms</span><span class="p">():</span>
 &nbsp; <span class="c1"># Receive MMS
</span> &nbsp; <span class="n">from_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">"From"</span><span class="p">)</span>
 &nbsp; <span class="n">to_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">"To"</span><span class="p">)</span>
 &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">"Text"</span><span class="p">)</span>
 &nbsp; <span class="n">media_url</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">values</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">"Media0"</span><span class="p">)</span>
 &nbsp; <span class="k">print</span><span class="p">(</span><span class="s">"MMS message received - From: %s, To: %s, Text: %s, Media: %s"</span><span class="o">%</span> <span class="p">(</span><span class="n">from_number</span><span class="p">,</span> <span class="n">to_number</span><span class="p">,</span> <span class="n">text</span><span class="p">,</span> <span class="n">media_url</span><span class="p">))</span>

 &nbsp; <span class="k">if</span> <span class="n">text</span><span class="p">.</span><span class="n">lower</span><span class="p">()</span> <span class="o">==</span> <span class="s">"hi"</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="s">"Hello!!"</span>
 &nbsp; &nbsp; &nbsp; <span class="n">media</span> <span class="o">=</span> <span class="p">[</span><span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">]</span>

 &nbsp; <span class="k">elif</span> <span class="n">text</span><span class="p">.</span><span class="n">lower</span><span class="p">()</span> <span class="o">==</span> <span class="s">"bye"</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="s">"Bye and have a nice day!"</span>
 &nbsp; &nbsp; &nbsp; <span class="n">media</span> <span class="o">=</span> <span class="p">[</span><span class="s">"https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif"</span><span class="p">]</span>
 &nbsp; <span class="k">else</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="s">"I am glad that we connected"</span>
 &nbsp; &nbsp; &nbsp; <span class="n">media</span> <span class="o">=</span> <span class="p">[</span><span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">]</span>

 &nbsp; <span class="c1"># Reply recipient using Send MMS API
</span> &nbsp; <span class="n">client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">)</span>
 &nbsp; <span class="n">response</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="n">messages</span><span class="p">.</span><span class="n">create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; <span class="n">src</span><span class="o">=</span><span class="n">to_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="n">dst</span><span class="o">=</span><span class="n">from_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="n">text</span><span class="o">=</span><span class="n">text</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="n">media_urls</span><span class="o">=</span><span class="n">media</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="n">type_</span><span class="o">=</span><span class="s">"mms"</span>
 &nbsp; <span class="p">)</span>
 &nbsp; <span class="k">print</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>

 &nbsp; <span class="k">return</span> <span class="s">"MMS responded"</span><span class="p">,</span> <span class="mi">200</span>


<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">"__main__"</span><span class="p">:</span>
 &nbsp; <span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">"0.0.0.0"</span><span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with your authentication credentials from the Plivo console</p><p>Note: We recommend that you store your credentials in the auth_id and auth_token environment variables, to avoid the possibility of accidentally committing them to source control. If you do this, you can initialize the client with no arguments and Plivo will automatically fetch the values from the environment variables. You can use os module(os.environ) to store environment variables and fetch them when initializing the client.</p><h2>Test</h2><p>Save the file and run it.</p><style>
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
 &nbsp;<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python receive_mms.py
</code></pre></div></div><p>You should see your basic server application in action at http://localhost:5000/receive-mms/.</p><p><strong>Note:</strong> Sending and receiving MMS is only available in the United States and Canada.</p><p><a href="https://www.plivo.com/docs/sdk/server/set-up-python-dev-environment-api-messaging/#ngrok-setup">Expose your local server to the internet</a>.</p><h2>Create a Plivo application</h2><p>Associate the Flask server you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click Add New Application. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application/#create-an-application">Application API.</a></p><p>Give your application a name — we called our Receive-MMS. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/receive-mms/) in the Message URL field and set the method to POST. Click <strong>Create Application</strong> to save your application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff5cf9bd169732333c08f_create-app.png" alt="Create Application" width="auto" height="auto" loading="auto"></div></figure><h2>Assign a Plivo number to your application</h2><p>Navigate to the <a href="https://console.plivo.com/number/">Numbers</a> page and select the phone number you want to use for this application. From the Application Type drop-down, select XML Application. From the Plivo Application drop-down, select Respond-MMS (the name we gave the application).</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff5cf1648434ea3dca98a_assign-app.png" alt="Assign Application to Plivo Phone Number" width="auto" height="auto" loading="auto"></div></figure><p>Click <strong>Update Number</strong> to save.</p><h2>Test</h2><p>Send a text message to the <a href="https://console.plivo.com/active-phone-numbers/">Plivo number</a> you specified using any phone. The message should be replied to the destination number you specified.</p><p>Note: If you’re using a Plivo Trial account, you can make calls only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
