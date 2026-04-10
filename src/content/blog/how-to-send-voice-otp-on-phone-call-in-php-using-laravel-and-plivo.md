---
title: "How to Send Voice OTP on a Phone Call in PHP Using Laravel and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-10-21T00:00:00.000Z"
updatedDate: "2024-01-15T05:20:52.000Z"
image: "/images/blog/65803d24e5a4ed6639ad1988_otp-php.png"
thumbnail: "/images/blog/65803d24e5a4ed6639ad1988_otp-php.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "voice-api", "how-to", "otp"]
seoTitle: "How to Send Voice OTP on a Phone Call in PHP Using Laravel and Plivo"
webflowItemId: "65803e2f30cef4d16619d6ed"
---
<p>You can authenticate a phone number by delivering a one-time password (OTP) via a phone call. To do this, you call the number and read a sequence of digits to the recipient via text-to-speech. To verify the number, the user needs to confirm the digits by entering them using the phone’s keypad.</p><p>Developers commonly use voice OTP to verify new user registrations, online transactions, and login sessions in an app or website. In this blog post, we walk you through a sample implementation of sending a Voice OTP using the <a href="https://www.plivo.com/voice/">Plivo Voice</a> platform and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder. Plivo’s direct carrier connectivity and intelligent routing engine guarantee the best call connectivity and quality.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="/images/blog/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://laravel.com/">Laravel</a> and <a href="https://packagist.org/packages/plivo/plivo-php">Plivo</a> PHP packages — run composer require laravel/installer and composer require plivo/plivo-php to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a PHLO to send OTP via phone call</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the Plivo console and click <strong>Create New PHLO</strong>. On the Choose your use case window, click <strong>Build my own</strong>. The PHLO canvas will appear with the Start node. Click on the Start Node, and under API request fill in the Keys as from, to, and otp, then click <strong>Validate</strong>. From the list of components on the left-hand side, drag and drop the Initial Call component onto the canvas and connect the Start node with the Initiate Call node using the API Request trigger state.</p><p>Configure the Initiate Call node with the using the From field and in the To field. Once you’ve configured a node, click <strong>Validate</strong> to save the configuration. Similarly, create a node for the Play Audio component and connect it to the Initiate Call node using the Answered trigger state. Next, configure the Play Audio node to play a message to the user — in this case, “Your verification code is &lt;otp&gt;.” Under Speak Text, click on Amazon Polly and paste the following:<br></p><style>
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
 &nbsp; <span class="nt">&lt;prosody</span> <span class="na">rate=</span><span class="s">"medium"</span><span class="nt">&gt;</span>
 &nbsp; &nbsp; &nbsp;Your verification code is
 &nbsp; &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp; &nbsp;<span class="nt">&lt;say-as</span> <span class="na">interpret-as=</span><span class="s">"spell-out"</span><span class="nt">&gt;</span>{{Start.http.params.otp}}<span class="nt">&lt;/say-as&gt;</span>
 &nbsp; <span class="nt">&lt;/prosody&gt;</span>
<span class="nt">&lt;/Speak&gt;</span>
</code></pre></div></div><p>Click <strong>Validate</strong> to save.</p><p>Connect the Initiate Call node with the Play Audio node using the Answered trigger state. After you complete the configuration, provide a friendly name for your PHLO and click <strong>Save</strong>.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/advanced-guides/phlo/voice-otp.mp4" type="video/mp4">
</video><h2>Use the PHLO in a Laravel application</h2><p>Now you can use the PHLO in a PHP Laravel application by following the below steps:</p><ul><li>Create a project directory and change into it.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span><span class="nb">mkdir </span>mylaravelapp
 &nbsp;<span class="nv">$ </span><span class="nb">cd </span>mylaravelapp
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install the Plivo SDK using <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">composer</a>.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span>composer require plivo/plivo-php
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install other modules.<br></li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code> &nbsp;<span class="nv">$ </span>composer require predis/predis
</code></pre></div> &nbsp; &nbsp;</div><h2>Run the PHLO to send OTP via phone call</h2><p>Now you can trigger the PHLO and test it out. Copy the PHLO ID from the end of the URL of the workflow you just created. You’re also going to need your Auth ID and Auth Token.</p><h3>Create a Laravel Controller</h3><p>Change the directory to our newly created project directory and create a Laravel controller for outbound calls.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php artisan make:controller VoiceController
</code></pre></div></div><p>This command generates a controller named VoiceController in the app/http/controllers/ directory. Edit app/http/controllers/voiceController.php and paste into it this code.<br></p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">&lt;?php</span>
<span class="kn">namespace</span> <span class="nn">App\Http\Controllers</span><span class="p">;</span>
<span class="k">require</span> <span class="s1">'../../vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Illuminate\Support\Facades\Redis</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">VoiceController</span> <span class="kd">extends</span> <span class="nc">Controller</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">dispatch_otp</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$dst_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"dst_number"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$code</span> <span class="o">=</span> <span class="nb">random_int</span><span class="p">(</span><span class="mi">100000</span><span class="p">,</span> <span class="mi">999999</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$auth_id</span> &nbsp; &nbsp;<span class="o">=</span> <span class="s2">"&lt;auth_id&gt;"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$auth_token</span> <span class="o">=</span> <span class="s2">"&lt;auth_token&gt;"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">PhloRestClient</span><span class="p">(</span><span class="nv">$auth_id</span><span class="p">,</span> <span class="nv">$auth_token</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$phlo</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">phlo</span><span class="o">-&gt;</span><span class="nf">get</span><span class="p">(</span><span class="o">&lt;</span><span class="no">YOUR_PHLO_ID</span><span class="o">&gt;</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">try</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$response</span> <span class="o">=</span> <span class="nv">$phlo</span><span class="o">-&gt;</span><span class="nf">run</span><span class="p">([</span><span class="s2">"from"</span> <span class="o">=&gt;</span> <span class="s2">"+15673234567"</span><span class="p">,</span> <span class="s2">"to"</span> <span class="o">=&gt;</span> <span class="nv">$dst_number</span><span class="p">,</span><span class="s2">"otp"</span><span class="o">=&gt;</span><span class="nv">$code</span><span class="p">]);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="c1">// These are the fields entered in the PHLO console</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nb">print_r</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp;<span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nc">PlivoRestException</span> <span class="nv">$ex</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nb">print_r</span><span class="p">(</span><span class="nv">$ex</span><span class="p">);</span>
 &nbsp; <span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Redis</span><span class="o">::</span><span class="nf">setex</span><span class="p">(</span><span class="nv">$dst_number</span><span class="p">,</span> <span class="mi">60</span><span class="p">,</span> <span class="nv">$code</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nb">header</span><span class="p">(</span><span class="s1">'Content-Type: application/json'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">echo</span> <span class="nb">json_encode</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">echo</span> <span class="s1">'{"status": "success", "message": "verification initiated"}'</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">verify_otp</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$dst_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"dst_number"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$code</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"otp"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$value</span> <span class="o">=</span> <span class="nc">Redis</span><span class="o">::</span><span class="nf">get</span><span class="p">(</span><span class="nv">$dst_number</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">if</span> <span class="p">(</span><span class="nv">$code</span><span class="o">==</span><span class="nv">$value</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Redis</span><span class="o">::</span><span class="nf">get</span><span class="p">(</span><span class="nv">$dst_number</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">echo</span> <span class="s1">'{"status": "success", "message": "codes match! number verified"}'</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">elseif</span><span class="p">(</span><span class="nv">$code</span><span class="o">!=</span><span class="nv">$value</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Redis</span><span class="o">::</span><span class="nf">del</span><span class="p">(</span><span class="nv">$dst_number</span><span class="p">,</span><span class="nv">$code</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">echo</span> <span class="s1">'{"status": "failure", "message": "codes do not match! number not verified"}'</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">echo</span> <span class="s1">'{"status": "failure", "message": "number not found!"}'</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div><p>Substitute actual values for &lt;auth_id&gt;, &lt;auth_token&gt;, and &lt;PHLO_ID&gt;. Save the file and run it.</p><h3>Add a route</h3><p>Now, to add a route for the outbound function in the VoiceController class, edit routes/web.php and add these lines at the end of the file.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>Route::match<span class="o">([</span><span class="s1">'get'</span>, <span class="s1">'post'</span><span class="o">]</span>, <span class="s1">'/dispatch_otp'</span>, <span class="s1">'App\Http\Controllers\VoiceController@dispatch_otp'</span><span class="o">)</span><span class="p">;</span>
Route::match<span class="o">([</span><span class="s1">'get'</span>, <span class="s1">'post'</span><span class="o">]</span>, <span class="s1">'/verify_otp'</span>, <span class="s1">'App\Http\Controllers\VoiceController@verify_otp'</span><span class="o">)</span><span class="p">;</span>
</code></pre></div></div><p>Edit your .env file and add this line.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">REDIS_CLIENT</span><span class="o">=</span>predis
</code></pre></div></div><h3>Test</h3><p>Now the VoiceController is ready for your first outbound call. Start the Laravel controller.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php artisan serve
</code></pre></div></div><p>Start Redis.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>redis-server
</code></pre></div></div><p>And you should see your basic server application in action.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>http://localhost:8000/dispatch_otp/?destination_number<span class="o">=</span>&lt;destination_number&gt;
http://localhost:8000/verify_otp/?destination_number<span class="o">=</span>&lt;destination_number&gt;&amp;otp<span class="o">=</span>&lt;otp&gt;
</code></pre></div></div><p>Boom — you’ve made an outbound call with the OTP as a text-to-speech message.</p><h2>Simple and reliable</h2><p>And that’s all there is to send OTP via a phone call using Plivo’s PHP SDK. Our simple APIs work in tandem with our comprehensive global network. You can also use Plivo’s premium direct routes that guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.<br></p>
