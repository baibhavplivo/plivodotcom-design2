---
title: "How to Send Voice OTP on a Phone Call in Node.js Using Express and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-10-20T00:00:00.000Z"
updatedDate: "2024-07-08T10:44:17.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803e47c2e70f947d6192f2_otp-node.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803e47c2e70f947d6192f2_otp-node.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "node-js-sdk", "voice-api", "how-to", "otp"]
seoTitle: "How to Send Voice OTP on a Phone Call in Node.js Using Express and Plivo"
webflowItemId: "65803ef8fab512ae542c0043"
---
<p>You can authenticate a phone number by delivering a one-time password (OTP) via a phone call. To do this, you call the number and read a sequence of digits to the recipient via text-to-speech. To verify the number, the user needs to confirm the digits by entering them using the phone’s keypad.</p><p>Developers commonly use voice OTP to verify new user registrations, online transactions, and login sessions in an app or website. In this blog post, we walk you through a sample implementation of sending a voice OTP using the <a href="https://www.plivo.com/voice/">Plivo Voice</a> platform and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder. Plivo’s direct carrier connectivity and intelligent routing engine guarantee the best call connectivity and quality.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://www.npmjs.com/package/express">Express</a> and <a href="https://www.npmjs.com/package/plivo">Plivo</a> Node packages — run npm install plivo express to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a PHLO to send OTP via phone call</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the <a href="https://www.plivo.com/">Plivo</a> console and click on <strong>Create New PHLO</strong>. On the Choose your use case window, click <strong>Build my own</strong>. The PHLO canvas will appear with the Start node. Click on the Start Node, and under API request fill in the Keys as from, to, and otp, then click <strong>Validate</strong>. From the list of components on the left-hand side, drag and drop the Initial Call component onto the canvas and connect the Start node with the Initiate Call node using the API Request trigger state.</p><p>Configure the Initiate Call node with the using the From field and in the To field. Once you’ve configured a node, click <strong>Validate</strong> to save the configuration. Similarly, create a node for the Play Audio component and connect it to the Initiate Call node using the Answered trigger state. Next, configure the Play Audio node to play a specific message to the user — in this case, “Your verification code is &lt;otp&gt;.” Under Speak Text, click on Amazon Polly and paste the following:<br></p><style>
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
<div class="language-xml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;Speak</span> <span class="na">voice=</span><span class="s">"Polly.Amy"</span><span class="nt">&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;prosody</span> <span class="na">rate=</span><span class="s">"medium"</span><span class="nt">&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;Your verification code is
 &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;say-as</span> <span class="na">interpret-as=</span><span class="s">"spell-out"</span><span class="nt">&gt;</span>{{Start.http.params.otp}}<span class="nt">&lt;/say-as&gt;</span>
 &nbsp; &nbsp;<span class="nt">&lt;/prosody&gt;</span>
<span class="nt">&lt;/Speak&gt;</span>
</code></pre></div></div><p>Click <strong>Validate</strong> to save.</p><p>Connect the Initiate Call node with the Play Audio node using the Answered trigger state. After you complete the configuration, provide a friendly name for your PHLO and click <strong>Save</strong>.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/advanced-guides/phlo/voice-otp.mp4" type="video/mp4">
</video><h2>Use the PHLO in a Express application</h2><p>Now you can use the PHLO in a Node.js express application by following the below steps:</p><ul><li>Create a project directoryand change into it.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span><span class="nb">mkdir </span>mynodeapp
 &nbsp;<span class="nv">$ </span><span class="nb">cd </span>mynodeapp
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install the Plivo SDK using <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">npm</a>.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span>npm <span class="nb">install </span>plivo
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install other modules.<br></li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span>brew <span class="nb">install </span>redis
 &nbsp;<span class="nv">$ </span>npm <span class="nb">install </span>redis
 &nbsp;<span class="nv">$ </span>npm <span class="nb">install </span>express
</code></pre></div> &nbsp; &nbsp;</div><h2>Run the PHLO to send OTP via phone call</h2><p>Now you can trigger the PHLO and test it out. Copy the PHLO ID from the end of the URL of the workflow you just created. You’re also going to need your Auth ID and Auth Token. Create a Node.js source code file — let’s call it trigger_phlo.js — and paste into it this code.<br></p><div class="language-javascript highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kd">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">express</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">();</span>
<span class="kd">const</span> <span class="nx">redis</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">redis</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">redisClient</span> <span class="o">=</span> <span class="nx">redis</span><span class="p">.</span><span class="nx">createClient</span><span class="p">();</span>
<span class="kd">var</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>

<span class="c1">// Make call to the destination number with OTP.</span>
<span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">/dispatch_otp/:number</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="kd">const</span> <span class="nx">number</span> <span class="o">=</span> <span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">params</span><span class="p">.</span><span class="nx">number</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="kd">const</span> <span class="nx">code</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">floor</span><span class="p">(</span><span class="mi">100000</span> <span class="o">+</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">random</span><span class="p">()</span> <span class="o">*</span> <span class="mi">900000</span><span class="p">);</span>

 &nbsp; &nbsp;<span class="kd">var</span> <span class="nx">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">Client</span><span class="p">(</span><span class="dl">"</span><span class="s2">&lt;auth_id&gt;</span><span class="dl">"</span><span class="p">,</span> <span class="dl">"</span><span class="s2">&lt;auth_token&gt;</span><span class="dl">"</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="kd">var</span> <span class="nx">response</span> <span class="o">=</span> <span class="nx">client</span><span class="p">.</span><span class="nx">calls</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">"</span><span class="s2">+14151234567</span><span class="dl">"</span><span class="p">,</span> <span class="c1">// from</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">number</span><span class="p">,</span> <span class="c1">// to</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">"</span><span class="s2">https://twofa-answerurl.herokuapp.com/answer_url/</span><span class="dl">"</span> <span class="o">+</span> <span class="nx">code</span><span class="p">,</span> <span class="c1">// answer url</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">answerMethod</span><span class="p">:</span> <span class="dl">"</span><span class="s2">GET</span><span class="dl">"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">},</span>
 &nbsp; &nbsp;<span class="p">)</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="nx">redisClient</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="s2">`number:</span><span class="p">${</span><span class="nx">number</span><span class="p">}</span><span class="s2">:code`</span><span class="p">,</span> <span class="nx">code</span><span class="p">,</span> <span class="dl">'</span><span class="s1">EX</span><span class="dl">'</span><span class="p">,</span> <span class="mi">60</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">status</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">success</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">message</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">verification initiated</span><span class="dl">'</span>
 &nbsp; &nbsp;<span class="p">}));</span>
<span class="p">});</span>

<span class="c1">// Validate the OTP entered by the user.</span>
<span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">/verify_otp/:number/:code</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="kd">const</span> <span class="nx">number</span> <span class="o">=</span> <span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">params</span><span class="p">.</span><span class="nx">number</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="kd">const</span> <span class="nx">code</span> <span class="o">=</span> <span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">params</span><span class="p">.</span><span class="nx">code</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">redisClient</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="s2">`number:</span><span class="p">${</span><span class="nx">number</span><span class="p">}</span><span class="s2">:code`</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">,</span> <span class="nx">OriginalCode</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">OriginalCode</span> <span class="o">==</span> <span class="nx">code</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">redisClient</span><span class="p">.</span><span class="nx">del</span><span class="p">(</span><span class="s2">`number:</span><span class="p">${</span><span class="nx">number</span><span class="p">}</span><span class="s2">:code`</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">status</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">success</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">message</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">codes match! number verified</span><span class="dl">'</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}));</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">OriginalCode</span> <span class="o">!=</span> <span class="nx">code</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">status</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">failure</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">message</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">codes do not match! number not verified</span><span class="dl">'</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}));</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">status</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">failure</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">message</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">number not found!</span><span class="dl">'</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}));</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">});</span>
<span class="p">});</span>

<span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="mi">5000</span><span class="p">);</span>
</code></pre></div></div><p>Substitute actual values for &lt;auth_id&gt;, &lt;auth_token&gt;, and &lt;PHLO_ID&gt;. Save the file and run it.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>node trigger_phlo.js
</code></pre></div></div><p>Boom — you’ve made an outbound call with the OTP as a text-to-speech message.</p><h2>Simple and reliable</h2><p>And that’s all there is to send OTP via a phone call using Plivo’s Node.js SDK. Our simple APIs work in tandem with our comprehensive global network. You can also use Plivo’s premium direct routes that guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
