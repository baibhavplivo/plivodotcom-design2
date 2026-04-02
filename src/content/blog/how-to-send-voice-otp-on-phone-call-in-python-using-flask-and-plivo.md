---
title: "How to Send Voice OTP on a Phone Call in Python Using Flask and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-10-04T00:00:00.000Z"
updatedDate: "2024-07-08T09:33:51.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810361d045e63a50828e27_otp-python.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810361d045e63a50828e27_otp-python.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "python-sdk", "voice-api", "how-to", "otp"]
seoTitle: "How to Send Voice OTP on a Phone Call in Python Using Flask and Plivo"
webflowItemId: "6581058b28ecd57f803e2c99"
---
<p>Voice OTP is used to authenticate a phone number by delivering a one-time password (OTP) via a phone call. This verification is done by making a call to the mobile number and playing a sequence of digits. To verify the mobile number, the user needs to confirm the played sequence of digits.</p><p>OTPs are commonly used to verify new user registrations, online transactions, and login sessions in an app or website. In this blog post, we walk you through a sample implementation of sending a voice OTP using the <a href="https://www.plivo.com/voice/">Plivo Voice</a> platform and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder. Plivo’s direct carrier connectivity and intelligent routing engine guarantee the best call connectivity and quality.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://pypi.org/project/Flask/">Flask</a> and <a href="https://pypi.org/project/plivo/">Plivo</a> Python packages — run pip install plivo flask to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a PHLO to send OTP via phone call</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the <a href="https://www.plivo.com/">Plivo</a> console and click on <strong>Create New PHLO</strong> to build a new PHLO. In the Choose your use case window, click <strong>Build my own</strong>. The PHLO canvas will appear with the Start node. Click on the Start Node, under API request, fill in the Keys as from, to, and otp, then click <strong>Validate</strong>. From the list of components on the left side, drag and drop the Initial Call component onto the canvas and connect the Start node with the Initiate Call node, using the API Request trigger state.</p><p>Configure the Initiate Call node with the using the From field, and in the To field. Once you’ve configured a node, click <strong>Validate</strong> to save the configurations.</p><p>Similarly, create a node for the Play Audio component and connect it to the Initiate Call node using the Answered trigger state. Configure the Play Audio node to play a specific message to the user — for example, in this case, “Your verification code is &lt;OTP&gt;”. Under Speak Text, click on Amazon Polly and paste the following:<br></p><style>
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
<div class="language-xml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;Speak</span> <span class="na">voice=</span><span class="s">"Polly.Amy"</span><span class="nt">&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;prosody</span> <span class="na">rate=</span><span class="s">"medium"</span><span class="nt">&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;Your verification code is
 &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;say-as</span> <span class="na">interpret-as=</span><span class="s">"spell-out"</span><span class="nt">&gt;</span>{{Start.http.params.otp}}<span class="nt">&lt;/say-as&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;/prosody&gt;</span>
<span class="nt">&lt;/Speak&gt;</span>
</code></pre></div></div><p>Click <strong>Validate</strong> to save.</p><p>Connect the Initiate Call node with the Play Audio node using the Answered trigger state.</p><p>After you complete configuration, provide a friendly name for your PHLO and click <strong>Save</strong>.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/advanced-guides/phlo/voice-otp.mp4" type="video/mp4">
</video><h2>Use the PHLO in a Flask application</h2><p>Now you can use the PHLO in a Python Flask application.</p><ul><li>Create a project directory and change into it.<br></li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span><span class="nb">mkdir </span>mypythonapp
 &nbsp;<span class="nv">$ </span><span class="nb">cd </span>mypythonapp
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install the Plivo SDK using <a href="https://www.pip-installer.org/en/latest/">pip</a>.<br></li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span>pip <span class="nb">install </span>plivo
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install other modules.<br></li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span>brew <span class="nb">install </span>redis
 &nbsp;<span class="nv">$ </span>pip <span class="nb">install </span>redis
 &nbsp;<span class="nv">$ </span>pip <span class="nb">install </span>flask
</code></pre></div> &nbsp; &nbsp;</div><p>We recommend that you use <a href="https://virtualenv.pypa.io/en/stable/">virtualenv</a> to manage and segregate your Python environments, instead of using sudo with your commands and overwriting dependencies.</p><h2>Run the PHLO to send OTP via phone call</h2><p>Now you can trigger the PHLO and test it out. Copy the PHLO ID from the end of the URL of the workflow you just created. You’re also going to need your Auth ID and Auth Token. Create a Python source code file — let’s call it trigger_phlo.py — and paste this code into it:<br></p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">import</span> <span class="nn">plivo</span>
<span class="kn">import</span> <span class="nn">random</span>
<span class="kn">import</span> <span class="nn">redis</span>

<span class="kn">from</span> <span class="nn">flask</span> <span class="kn">import</span> <span class="n">Flask</span><span class="p">,</span> <span class="n">jsonify</span>

<span class="n">app</span> <span class="o">=</span> <span class="n">Flask</span><span class="p">(</span><span class="n">__name__</span><span class="p">)</span>

<span class="n">r</span> <span class="o">=</span> <span class="n">redis</span><span class="p">.</span><span class="n">StrictRedis</span><span class="p">()</span>

<span class="k">def</span> <span class="nf">generate_code</span><span class="p">():</span>
 &nbsp; &nbsp;<span class="n">code</span> <span class="o">=</span> <span class="n">random</span><span class="p">.</span><span class="n">choice</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">100000</span><span class="p">,</span> <span class="mi">999999</span><span class="p">))</span> &nbsp;<span class="c1"># generating 6 digit random code
</span> &nbsp; &nbsp;<span class="k">return</span> <span class="n">code</span>


<span class="c1"># Make call to the destination number with OTP.
</span><span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">"/dispatch_otp/&lt;destination_number&gt;"</span><span class="p">)</span>
<span class="k">def</span> <span class="nf">dispatch_otp</span><span class="p">(</span><span class="n">destination_number</span><span class="p">):</span>
 &nbsp; &nbsp;<span class="k">try</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1"># generate OTP.
</span> &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">code</span> <span class="o">=</span> <span class="n">generate_code</span><span class="p">()</span>

 &nbsp; &nbsp; &nbsp; &nbsp;<span class="c1"># Make a call
</span> &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">auth_id</span> <span class="o">=</span> <span class="o">&lt;</span><span class="n">auth_id</span><span class="o">&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">auth_token</span> <span class="o">=</span> <span class="o">&lt;</span><span class="n">auth_token</span><span class="o">&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">phlo_id</span> <span class="o">=</span> <span class="s">'Your PHLO ID'</span> <span class="c1"># https://console.plivo.com/phlo/list/
</span> &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">payload</span> <span class="o">=</span> <span class="p">{</span><span class="s">"from"</span> <span class="p">:</span> <span class="s">"+15671234567"</span><span class="p">,</span><span class="s">"to"</span> <span class="p">:</span> <span class="n">destination_number</span><span class="p">,</span> <span class="s">"otp"</span><span class="p">:</span><span class="n">code</span><span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">phlo_client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="n">auth_id</span><span class="o">=</span><span class="n">auth_id</span><span class="p">,</span> <span class="n">auth_token</span><span class="o">=</span><span class="n">auth_token</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">phlo</span> <span class="o">=</span> <span class="n">phlo_client</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="n">phlo_id</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="o">**</span><span class="n">payload</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">print</span> <span class="nb">str</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="n">r</span><span class="p">.</span><span class="n">setex</span><span class="p">(</span><span class="s">"number:%s:code"</span> <span class="o">%</span> <span class="n">destination_number</span><span class="p">,</span> <span class="mi">60</span><span class="p">,</span> <span class="n">code</span><span class="p">))</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">jsonify</span><span class="p">({</span><span class="s">"status"</span><span class="p">:</span> <span class="s">"success"</span><span class="p">,</span> <span class="s">"message"</span><span class="p">:</span> <span class="s">"verification initiated"</span><span class="p">}),</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="mi">200</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">)</span>
 &nbsp; &nbsp;<span class="k">except</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span><span class="s">"Error encountered"</span><span class="p">,</span> <span class="mi">400</span><span class="p">)</span>

<span class="c1"># verify the OTP enetered by the user.
</span><span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">"/verify_otp/&lt;destination_number&gt;/&lt;code&gt;"</span><span class="p">)</span>
<span class="k">def</span> <span class="nf">check_code</span><span class="p">(</span><span class="n">destination_number</span><span class="p">,</span> <span class="n">code</span><span class="p">):</span>
 &nbsp; &nbsp;<span class="s">"""
 &nbsp; &nbsp;check_code(number, code) accepts a number and the code entered by the user and
 &nbsp; &nbsp;tells if the code entered for that number is correct or not.
 &nbsp; &nbsp;"""</span>
 &nbsp; &nbsp;<span class="c1"># fetch the OTP set for the destination number
</span> &nbsp; &nbsp;<span class="n">original_code</span> <span class="o">=</span> <span class="n">r</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">"number:%s:code"</span> <span class="o">%</span> <span class="n">destination_number</span><span class="p">)</span>

 &nbsp; &nbsp;<span class="k">if</span> <span class="nb">int</span><span class="p">(</span><span class="n">original_code</span><span class="p">)</span> <span class="o">==</span> <span class="nb">int</span><span class="p">(</span><span class="n">code</span><span class="p">):</span> &nbsp;<span class="c1"># verification successful, delete the code
</span> &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">r</span><span class="p">.</span><span class="n">delete</span><span class="p">(</span><span class="s">"number:%s:code"</span> <span class="o">%</span> <span class="n">destination_number</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">jsonify</span><span class="p">({</span><span class="s">"status"</span><span class="p">:</span> <span class="s">"success"</span><span class="p">,</span> <span class="s">"message"</span><span class="p">:</span> <span class="s">"codes match! number verified"</span><span class="p">}),</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="mi">200</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">)</span>
 &nbsp; &nbsp;<span class="k">elif</span> <span class="n">original_code</span> <span class="o">!=</span> <span class="n">code</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">jsonify</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"status"</span><span class="p">:</span> <span class="s">"rejected"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"message"</span><span class="p">:</span> <span class="s">"codes do not match! number not verified"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">),</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="mi">404</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">)</span>
 &nbsp; &nbsp;<span class="k">else</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span><span class="n">jsonify</span><span class="p">({</span><span class="s">"status"</span><span class="p">:</span> <span class="s">"failed"</span><span class="p">,</span> <span class="s">"message"</span><span class="p">:</span> <span class="s">"number not found!"</span><span class="p">}),</span> <span class="mi">500</span><span class="p">)</span>


<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">"__main__"</span><span class="p">:</span>
 &nbsp; &nbsp;<span class="n">app</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="n">host</span><span class="o">=</span><span class="s">"0.0.0.0"</span><span class="p">,</span> <span class="n">debug</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</code></pre></div></div><p>Substitute actual values for &lt;auth_id&gt;, &lt;auth_token&gt;, and &lt;PHLO_ID&gt;. Save the file and run it.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>python trigger_phlo.py
</code></pre></div></div><p>Boom — you’ve made an outbound call with the OTP as a text-to-speech message.</p><h2>Simple and reliable</h2><p>And that’s all there is to send OTP via a phone call using Plivo’s Python SDK. Our simple APIs work in tandem with our comprehensive global network. You can also use Plivo’s premium direct routes that guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
