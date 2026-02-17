---
title: "How to Add Two-Factor Authentication to a Dotnet Application with Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-09-24T00:00:00.000Z"
updatedDate: "2024-01-15T05:10:41.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658107dfa05b9703583e0d17_2fa-dotnet.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658107dfa05b9703583e0d17_2fa-dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "net-sdk", "voice-api", "sms-api", "how-to", "2fa"]
seoTitle: "How to Add Two-Factor Authentication to a Dotnet Application with Plivo"
webflowItemId: "658108c86dd9ffc5d476d534"
---
<p><a href="https://www.plivo.com/docs/sms/use-cases/2-factor-authentication/php/">Two-factor authentication</a> (2FA) can play a key role in securing your applications against password data breaches. Authentication with a one-time password (OTP) delivered to your users over SMS is an effective approach to implementing two-factor authentication. Plivo’s premium direct routes guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS messages. In this blog post, we walk you through a sample implementation of 2FA using the <a href="https://www.plivo.com/sms/">Plivo SMS</a> platform and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number to send messages to the US and Canada. To search for and rent an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581065928ecd57f803ea3ae_buy-new-number.png" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Create a PHLO to send OTP via SMS</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the Plivo console and click on Create New PHLO. A pop-up window gives you a list of prebuilt templates to start with. Choose Two-Factor Authentication and click Create Application to create a PHLO with the prebuilt components to build a workflow that can manage sending the OTP via SMS, with failover to use a phone call to deliver the OTP as a text-to-speech (TTS) message.</p><video autoplay="" loop="" muted="" inline="" width="514" height="289">
 &nbsp;<source width="514" height="289" src="https://www.plivo.com/assets/posts/images/sms/usecase-guides/advanced/2fa/PHLO-2fa.mp4" type="video/mp4">
</video><h2>Use the PHLO in a Dotnet application</h2><p>We have a demo application available for this in our <a href="https://github.com/plivo/2fa-dotnet-demo">GitHub repository</a> that you can clone to see how the implementation works.</p><ul><li>Clone the repository from <a href="https://github.com/plivo/2fa-dotnet-demo">GitHub</a>.<br></li></ul><style>
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
 <div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>git clone https://github.com/plivo/2fa-dotnet-demo.git
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Change your working directory to 2fa-dotnet-demo.<br></li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">cd </span>2fa-dotnet-demo
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install the dependencies using the package.json file.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>dotnet restore
</code></pre></div> &nbsp; &nbsp;</div><p><br></p><ul><li>Edit the config.js file. Replace the PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN, PLIVO_NUMBER, and PHLO_ID placeholders with your own values.<br></li></ul><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581080dd045e63a50857931_dotnet-config.png" alt="Configuration file" width="auto" height="auto" loading="auto"></div></figure><p><strong>Note</strong>: Enter your phone number in E.164 format.</p><h3>Generate the OTP</h3><p>Generate an exclusive six-digit authentication code. To create the OTP, use the time-based OTP generation algorithm. Here’s how it’s done in dotnet.<br></p><div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">Random</span> <span class="n">r</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">Random</span><span class="p">();</span>
<span class="kt">var</span> <span class="n">code</span> <span class="p">=</span> <span class="n">r</span><span class="p">.</span><span class="nf">Next</span><span class="p">(</span><span class="m">999999</span><span class="p">);</span>
</code></pre></div></div><h3>Send OTP via SMS or a phone call</h3><p>A single function helps us to trigger the PHLO to send SMS messages and make calls; the rest of the work is done by PHLO. Use the mode argument to tell PHLO whether to trigger a call or an SMS message by passing the value “sms” or “call.”<br></p><div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code> <span class="k">public</span> <span class="kt">int</span> <span class="nf">SendVerificationCodePhlo</span><span class="p">(</span><span class="n">String</span> <span class="n">DstNumber</span><span class="p">,</span> <span class="n">String</span> <span class="n">mode</span><span class="p">)</span>
		<span class="p">{</span>
			<span class="n">Random</span> <span class="n">r</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">Random</span><span class="p">();</span>
			<span class="kt">var</span> <span class="n">code</span> <span class="p">=</span> <span class="n">r</span><span class="p">.</span><span class="nf">Next</span><span class="p">(</span><span class="m">999999</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phloClient</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">PhloApi</span><span class="p">(</span><span class="n">AuthId</span><span class="p">,</span> <span class="n">AuthToken</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phloID</span> <span class="p">=</span> <span class="n">PhloId</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phlo</span> <span class="p">=</span> <span class="n">phloClient</span><span class="p">.</span><span class="n">Phlo</span><span class="p">.</span><span class="nf">Get</span><span class="p">(</span><span class="n">phloID</span><span class="p">);</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">data</span> <span class="p">=</span> <span class="k">new</span> <span class="n">Dictionary</span><span class="p">&lt;</span><span class="kt">string</span><span class="p">,</span> <span class="kt">object</span><span class="p">&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span> <span class="s">"from"</span><span class="p">,</span> <span class="n">AppNumber</span> <span class="p">},</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span> <span class="s">"to"</span><span class="p">,</span> <span class="n">DstNumber</span> <span class="p">},</span>
		<span class="p">{</span> <span class="s">"mode"</span><span class="p">,</span> <span class="n">mode</span> <span class="p">},</span>
		<span class="p">{</span> <span class="s">"otp"</span><span class="p">,</span> <span class="n">code</span> <span class="p">},</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">};</span> &nbsp;
			<span class="n">phlo</span><span class="p">.</span><span class="nf">Run</span><span class="p">(</span><span class="n">data</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">code</span><span class="p">;</span>
		<span class="p">}</span>
</code></pre></div></div><h3>Verify the OTP</h3><p>After the user enters the OTP they received on their handset, this dotnet code verifies it.<br></p><div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">public</span> <span class="kt">string</span> <span class="nf">Index</span><span class="p">(</span><span class="kt">string</span> <span class="n">number</span><span class="p">,</span> <span class="kt">string</span> <span class="n">code</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">ConnectionMultiplexer</span> <span class="n">redis</span> <span class="p">=</span> 
 &nbsp;<span class="n">ConnectionMultiplexer</span><span class="p">.</span><span class="nf">Connect</span><span class="p">(</span><span class="n">_configuration</span><span class="p">.</span><span class="n">GetValue</span><span class="p">&lt;</span><span class="kt">string</span><span class="p">&gt;(</span><span class="s">"RedisHost"</span><span class="p">));</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">IDatabase</span> <span class="n">conn</span> <span class="p">=</span> <span class="n">redis</span><span class="p">.</span><span class="nf">GetDatabase</span><span class="p">();</span>

 &nbsp; &nbsp;<span class="kt">string</span> <span class="n">key</span> <span class="p">=</span> <span class="s">$"number:</span><span class="p">{</span><span class="n">number</span><span class="p">}</span><span class="s">:code"</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="kt">var</span> <span class="n">compare_code</span> <span class="p">=</span> <span class="p">(</span><span class="kt">string</span><span class="p">)</span><span class="n">conn</span><span class="p">.</span><span class="nf">StringGet</span><span class="p">(</span><span class="n">key</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">if</span> <span class="p">(</span><span class="n">compare_code</span> <span class="p">==</span> <span class="n">code</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">conn</span><span class="p">.</span><span class="nf">KeyDelete</span><span class="p">(</span><span class="n">key</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Verification</span> <span class="n">verification</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">Verification</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">verification</span><span class="p">.</span><span class="n">status</span> <span class="p">=</span> <span class="s">"success"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">verification</span><span class="p">.</span><span class="n">message</span> <span class="p">=</span> <span class="s">"Number verified"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">string</span> <span class="n">output</span> <span class="p">=</span> <span class="n">JsonConvert</span><span class="p">.</span><span class="nf">SerializeObject</span><span class="p">(</span><span class="n">verification</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">output</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span> <span class="k">if</span><span class="p">(</span><span class="n">compare_code</span> <span class="p">!=</span> <span class="n">code</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Verification</span> <span class="n">verification</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">Verification</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">verification</span><span class="p">.</span><span class="n">status</span> <span class="p">=</span> <span class="s">"failure"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">verification</span><span class="p">.</span><span class="n">message</span> <span class="p">=</span> <span class="s">"Number verified"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">string</span> <span class="n">output</span> <span class="p">=</span> <span class="n">JsonConvert</span><span class="p">.</span><span class="nf">SerializeObject</span><span class="p">(</span><span class="n">verification</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">output</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Verification</span> <span class="n">verification</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">Verification</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">verification</span><span class="p">.</span><span class="n">status</span> <span class="p">=</span> <span class="s">"failure"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">verification</span><span class="p">.</span><span class="n">message</span> <span class="p">=</span> <span class="s">"number not found!"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">string</span> <span class="n">output</span> <span class="p">=</span> <span class="n">JsonConvert</span><span class="p">.</span><span class="nf">SerializeObject</span><span class="p">(</span><span class="n">verification</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="n">output</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
</code></pre></div></div><h2>Test</h2><p>To run the application, start Redis using the redis-server command. Build and Run the app from Visual Studio. You can use the URL http://localhost:5001/ to run the sample application in your browser.</p><video autoplay="" loop="" muted="" inline="" width="514" height="289">
 &nbsp;<source width="514" height="289" src="https://www.plivo.com/assets/posts/images/sms/usecase-guides/advanced/2fa/two-factor.mp4" type="video/mp4">
</video><p>On the browser page, choose your country and enter your mobile number, then click on Send Verification Code. Check your mobile phone — you should get an SMS message with an OTP code. Enter the code in the browser form and click Verify, and the application will confirm that you’re verified.</p><p>What if you don’t get the SMS message you were expecting, or you wait too long to enter the value you received? The application gives you a link so you can use a phone call as a fallback OTP channel. Click on “Didn’t receive sms? Call me.” You should then receive a call, and when you answer it, you’ll hear a text-to-speech message that gives you an OTP code, which you can use in the form for verification.</p><h2>Simple and reliable</h2><p>Edit the sample application to see how simple it was to code. Our simple APIs work in tandem with our comprehensive global network. Plivo’s premium direct routes guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
