---
title: "How to Add Two-Factor Authentication to a Python Flask Application with Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-08-26T00:00:00.000Z"
updatedDate: "2024-08-10T09:23:01.000Z"
image: "/images/blog/658114f523f87c327665f7ea_Blog_2FA_Python.svg"
thumbnail: "/images/blog/658114f523f87c327665f7ea_Blog_2FA_Python.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "python-sdk", "sms-api", "voice-api", "how-to", "2fa"]
seoTitle: "How to Add Two-Factor Authentication to a Python Flask Application with Plivo"
webflowItemId: "658115f65c7a0752bc1274c8"
---
<p><a href="https://www.plivo.com/docs/sms/use-cases/2-factor-authentication/python/">Two-factor authentication</a> (2FA) can play a key role in securing your applications against password data breaches. Authentication with a one-time password (OTP) delivered to your users over SMS is an effective approach to implementing two-factor authentication. Plivo’s premium direct routes guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS messages. In this blog post, we walk you through a sample implementation of 2FA using the <a href="https://www.plivo.com/sms/">Plivo SMS</a> platform and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder.</p><p>{{cta-style-1}}</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number to send messages to the US and Canada. To search for and rent an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="/images/blog/6581065928ecd57f803ea3ae_buy-new-number.png" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Create a PHLO to send OTP via SMS</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the Plivo console and click on <strong>Create New PHLO</strong>. A pop-up window gives you a list of prebuilt templates to start with. Choose Two-Factor Authentication and click <strong>Create Application</strong> to create a PHLO with the prebuilt components to build a workflow that can manage sending the OTP via SMS, with failover to use a phone call to deliver the OTP as a text-to-speech (TTS) message.</p><video autoplay="" loop="" muted="" width="514" height="289"> </video>

<source width="514" height="289" src="/assets/posts/images/sms/usecase-guides/advanced/2fa/PHLO-2fa.mp4" type="video/mp4"><h2>Use the PHLO in a Flask application</h2><p>We have a demo application available for this in our <a href="https://github.com/plivo/2fa-python-demo">GitHub repository</a> that you can clone to see how the implementation works.</p><ul><li>Clone the repository from <a href="https://github.com/plivo/2fa-python-demo">GitHub</a>.</li></ul><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>git clone https://github.com/plivo/2fa-python-demo.git
</code></pre></div></div><ul><li>Change your working directory to 2fa-python-demo.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">cd </span>2fa-python-demo
</code></pre></div></div><ul><li>Install the dependencies using the requirements.txt file.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>pip <span class="nb">install</span> <span class="nt">-r</span> requirements.txt
</code></pre></div></div><ul><li>Edit the settings.py file. Replace the PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN, PLIVO_NUMBER, and PHLO_ID placeholders with your own values.</li></ul><figure><div><img src="/images/blog/65811568a6a83cd1849e62b8_python-config.png" alt="Configuration file" width="auto" height="auto" loading="auto"></div></figure><p><strong>Note</strong>: Enter your phone number in E.164 format.</p><h3>Generate the OTP</h3><p>Generate an exclusive six-digit authentication code. To create the OTP, use the time-based OTP generation algorithm. Here’s how it’s done in Python.</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">def</span> <span class="nf">generate_code</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
 &nbsp; &nbsp;<span class="n">code</span> <span class="o">=</span> <span class="n">random</span><span class="p">.</span><span class="n">choice</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">100000</span><span class="p">,</span> <span class="mi">999999</span><span class="p">))</span> &nbsp;<span class="c1"># generating 6 digit random code
</span> &nbsp; &nbsp;<span class="k">return</span> <span class="n">code</span>
</code></pre></div></div><h3>Send OTP via SMS or a phone call</h3><p>A single function helps us to trigger the PHLO to send SMS messages and make calls; the rest of the work is done by PHLO. Use the mode argument to tell PHLO whether to trigger a call or an SMS message by passing the value “sms” or “call.”</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">def</span> <span class="nf">send_verification_code_phlo</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span><span class="n">dst_number</span><span class="p">,</span><span class="n">code</span><span class="p">,</span><span class="n">mode</span><span class="p">):</span>
 &nbsp; &nbsp;<span class="n">payload</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"from"</span><span class="p">:</span> <span class="bp">self</span><span class="p">.</span><span class="n">app_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"to"</span><span class="p">:</span> <span class="n">dst_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"otp"</span><span class="p">:</span> <span class="n">code</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"mode"</span><span class="p">:</span> <span class="n">mode</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="k">try</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">phlo</span> <span class="o">=</span> <span class="bp">self</span><span class="p">.</span><span class="n">client_phlo</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="bp">self</span><span class="p">.</span><span class="n">phlo_id</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="o">**</span><span class="n">payload</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">response</span>
 &nbsp; &nbsp;<span class="k">except</span> <span class="n">exceptions</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">print</span><span class="p">(</span><span class="n">e</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span><span class="s">"Error encountered"</span><span class="p">,</span> <span class="mi">400</span><span class="p">)</span>
</code></pre></div></div><h3>Verify the OTP</h3><p>After the user enters the OTP they received on their handset, this Python code verifies it.</p><div class="language-python highlighter-rouge">
 &nbsp; &nbsp;<div class="highlight">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre class="highlight"><code><span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">"/verify/&lt;number&gt;"</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">def</span> <span class="nf">verify</span><span class="p">(</span><span class="n">number</span><span class="p">):</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"""
 &nbsp; &nbsp; &nbsp; &nbsp;verify(number) accepts a number and initiates verification for it.
 &nbsp; &nbsp; &nbsp; &nbsp;"""</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">try</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">code</span> <span class="o">=</span> <span class="n">current_app</span><span class="p">.</span><span class="n">p2fa</span><span class="p">.</span><span class="n">generate_code</span><span class="p">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">if</span> <span class="n">app</span><span class="p">.</span><span class="n">config</span><span class="p">[</span><span class="s">"PHLO_ID"</span><span class="p">]</span> <span class="o">==</span> <span class="s">""</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">current_app</span><span class="p">.</span><span class="n">p2fa</span><span class="p">.</span><span class="n">send_verification_code_sms</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="sa">f</span><span class="s">'Your verification code is "</span><span class="si">{</span><span class="n">code</span><span class="si">}</span><span class="s">".
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Code will expire in 1 minute. '</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">)</span> &nbsp;<span class="c1"># String should be less than 160 chars
 &nbsp; &nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span><span class="n">current_app</span><span class="p">.</span><span class="n">p2fa</span><span class="p">.</span><span class="n">send_verification_code_phlo</span><span class="p">(</span><span class="n">number</span><span class="p">,</span> <span class="n">code</span><span class="p">,</span> <span class="s">"sms"</span><span class="p">)}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">current_app</span><span class="p">.</span><span class="n">redis</span><span class="p">.</span><span class="n">setex</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"number:%s:code"</span> <span class="o">%</span> <span class="n">number</span><span class="p">,</span> <span class="mi">60</span><span class="p">,</span> <span class="n">code</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">)</span> &nbsp;<span class="c1"># Verification code is valid for 1 min
 &nbsp; &nbsp;</span> &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">jsonify</span><span class="p">({</span><span class="s">"status"</span><span class="p">:</span> <span class="s">"success"</span><span class="p">,</span> <span class="s">"message"</span><span class="p">:</span> <span class="s">"verification initiated"</span><span class="p">})</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">except</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="p">(</span><span class="s">"Error encountered"</span><span class="p">,</span> <span class="mi">400</span><span class="p">)</span>
 &nbsp; &nbsp;</code></pre>
 &nbsp; &nbsp;</div>
</div><h2>Test</h2><p>To run the application, start Redis using the redis-server command. Start Flask, the Python web framework module, by typing flask run. Flask will display the URL and port number on which it’s running. Click on that link to run the sample application in your browser.</p><video autoplay="" loop="" muted="" width="560" height="315"> </video>

<source width="560" height="315" src="/assets/posts/images/sms/usecase-guides/advanced/2fa/two-factor.mp4" type="video/mp4"><p>On the browser page, choose your country and enter your mobile number, then click on Send Verification Code. Check your mobile phone — you should get an SMS message with an OTP code. Enter the code in the browser form and click Verify, and the application will confirm that you’re verified.</p><p>What if you don’t get the SMS message you were expecting, or you wait too long to enter the value you received? The application gives you a link so you can use a phone call as a fallback OTP channel. Click on “Didn’t receive sms? Call me.” You should then receive a call, and when you answer it, you’ll hear a text-to-speech message that gives you an OTP code, which you can use in the form for verification.</p><h2>Simple and reliable</h2><p>Edit the sample application to see how simple it was to code. Our simple APIs work in tandem with our comprehensive global network. Plivo’s premium direct routes guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.<br></p>
