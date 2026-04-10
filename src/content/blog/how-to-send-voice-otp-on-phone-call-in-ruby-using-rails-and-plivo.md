---
title: "How to Send Voice OTP on a Phone Call in Ruby Using Rails and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-10-26T00:00:00.000Z"
updatedDate: "2024-07-14T10:47:05.000Z"
image: "/images/blog/65803bc21efcac0bf1083fb8_otp-ruby.png"
thumbnail: "/images/blog/65803bc21efcac0bf1083fb8_otp-ruby.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "voice-api", "how-to", "otp"]
seoTitle: "How to Send Voice OTP on a Phone Call in Ruby Using Rails and Plivo"
webflowItemId: "65803ce639f61b597ac9db21"
---
<p>You can authenticate a phone number by delivering a one-time password (OTP) via a phone call. To do this, you call the number and read a sequence of digits to the recipient via text-to-speech. To verify the number, the user needs to confirm the digits by entering them using the phone’s keypad.</p><p>Developers commonly use voice OTP to verify new user registrations, online transactions, and login sessions in an app or website. In this blog post, we walk you through a sample implementation of sending a Voice OTP using the <a href="https://www.plivo.com/voice/">Plivo Voice</a> platform and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder. Plivo’s direct carrier connectivity and intelligent routing engine guarantee the best call connectivity and quality.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A <a href="https://www.plivo.com/">Plivo</a> account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="/images/blog/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://rubyonrails.org/">Rails</a> and Plivo Ruby packages — run gem install rails and gem install plivo to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a PHLO to send OTP via phone call</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the Plivo console and click <strong>Create New PHLO. On the Choose your use case window, click **Build my own</strong>. The PHLO canvas will appear with the Start node. Click on the Start Node, and under API request fill in the Keys as from, to, and otp, then click <strong>Validate</strong>. From the list of components on the left-hand side, drag and drop the Initial Call component onto the canvas and connect the Start node with the Initiate Call node using the API Request trigger state.</p><p>Configure the Initiate Call node with the using the From field and in the To field. Once you’ve configured a node, click <strong>Validate</strong> to save the configurations. Similarly, create a node for the Play Audio component and connect it to the Initiate Call node using the Answered trigger state. Next, configure the Play Audio node to play a specific message to the user — in this case, “Your verification code is &lt;otp&gt;.” Under Speak Text, click on Amazon Polly and paste the following:</p><style>
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
 &nbsp;
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
</video><h3>Create a Rails Project</h3><p>As we have Rails and its dependencies installed, we can use them to create a new Rails project. As the initial step, using rails we can auto-generate code in the ruby on rails folder structure. Use the below command to start your Rails project.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>rails new plivotest
</code></pre></div></div><p>This will create a plivotest directory with the necessary folders &amp; files for development.</p><h3>Install Modules</h3><p>As we have the rails application created, now, let’s add Plivo-Ruby by modifying the Gemfile. Open the Gemfile in any IDE/text-editor and add the following line:<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>gem <span class="s1">'plivo'</span>, <span class="s1">'~&gt; 4.16.0'</span>
gem <span class="s1">'redis'</span>, <span class="s1">'4.2.1'</span>
gem <span class="s1">'json'</span>, <span class="s1">'2.3.1'</span>
</code></pre></div></div><p>You can use the below command to install the Plivo-Ruby gem into the bundle:<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>bundle <span class="nb">install</span>
</code></pre></div></div><h3>Create a Rails Controller</h3><p>Change the directory to our newly created project directory, i.e, plivotest directory and run the below command to create a rails controller for Voice OTP.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>rails generate controller Plivo voice
</code></pre></div></div><p>This will generate a controller named <strong>plivo_controller</strong> in the <em>app/controllers/</em> directory and a respective view will be generated in <em>app/views/plivo</em> directory. We can delete the <strong>View</strong> as we will not need it.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">rm </span>app/views/plivo/voice.html.erb
</code></pre></div></div><h2>Run the PHLO to send OTP via phone call</h2><p>Now you can trigger the PHLO and test it out. Copy the PHLO ID from the end of the URL of the workflow you just created. You’re also going to need your Auth ID and Auth Token.</p><p>Now, You have to open the <em>app/controllers/plivo_controller.rb</em> file and add the following code:<br></p><figure><pre><code class="language-ruby" data-lang="ruby"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
43
44
45
46
47
48
</pre></td><td class="code"><pre><span class="kp">include</span> <span class="no">Plivo</span>
<span class="nb">require</span> <span class="s1">'redis'</span>
<span class="nb">require</span> <span class="s1">'json'</span>
<span class="kp">include</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">Exceptions</span>

<span class="k">class</span> <span class="nc">PlivoController</span> <span class="o">&lt;</span> <span class="no">ApplicationController</span>
	<span class="k">def</span> <span class="nf">dispatch_otp</span>
		<span class="n">redis</span> <span class="o">=</span> <span class="no">Redis</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="ss">host: </span><span class="s2">"localhost"</span><span class="p">)</span>
		<span class="n">code</span> <span class="o">=</span> <span class="nb">rand</span><span class="p">(</span><span class="mi">999_999</span><span class="p">)</span>
		<span class="n">dst_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:dst_number</span><span class="p">]</span>
		<span class="n">auth_id</span> <span class="o">=</span> <span class="s1">'&lt;auth_id&gt;'</span>
 &nbsp; &nbsp;<span class="n">auth_token</span> <span class="o">=</span> <span class="s1">'&lt;auth_token&gt;'</span>

 &nbsp; &nbsp;<span class="n">client</span> <span class="o">=</span> <span class="no">Phlo</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="n">auth_id</span><span class="p">,</span> <span class="n">auth_token</span><span class="p">)</span>
 &nbsp; &nbsp;	<span class="k">begin</span>
 &nbsp; &nbsp;<span class="n">phlo</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="nf">phlo</span><span class="p">.</span><span class="nf">get</span><span class="p">(</span><span class="s1">'phlo_id'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="c1">#parameters set in PHLO - params</span>
 &nbsp; &nbsp;<span class="n">params</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; <span class="ss">from: </span><span class="o">+</span><span class="mi">15671234567</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="ss">to: </span><span class="n">dst_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; <span class="n">otp</span><span class="ss">:code</span>
 &nbsp;<span class="p">}</span>
 &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="nf">run</span><span class="p">(</span><span class="n">params</span><span class="p">)</span>
 &nbsp;<span class="nb">puts</span> <span class="n">response</span>
<span class="k">rescue</span> <span class="no">PlivoRESTError</span> <span class="o">=&gt;</span> <span class="n">e</span>
 &nbsp;<span class="nb">puts</span> <span class="s1">'Exception: '</span> <span class="o">+</span> <span class="n">e</span><span class="p">.</span><span class="nf">message</span>
<span class="k">end</span>
		<span class="n">redis</span><span class="p">.</span><span class="nf">setex</span><span class="p">(</span><span class="n">dst_number</span><span class="p">,</span> <span class="mi">60</span><span class="p">,</span> <span class="n">code</span><span class="p">)</span> <span class="c1"># Verification code is valid for 1 min</span>
		<span class="nb">puts</span> <span class="no">JSON</span><span class="p">.</span><span class="nf">pretty_generate</span><span class="p">({</span> <span class="ss">:status</span><span class="o">=&gt;</span> <span class="s1">'success'</span><span class="p">,</span> <span class="ss">:message</span><span class="o">=&gt;</span> <span class="s1">'verification initiated'</span> <span class="p">})</span>
	<span class="k">rescue</span> <span class="no">PlivoRESTError</span> <span class="o">=&gt;</span> <span class="n">e</span>
		<span class="nb">puts</span> <span class="s1">'Exception: '</span> <span class="o">+</span> <span class="n">e</span><span class="p">.</span><span class="nf">message</span>
	<span class="k">end</span>

	<span class="k">def</span> <span class="nf">verify_otp</span>
		<span class="n">redis</span> <span class="o">=</span> <span class="no">Redis</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="ss">host: </span><span class="s2">"localhost"</span><span class="p">)</span>
		<span class="n">code</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:otp</span><span class="p">]</span>
		<span class="n">number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:number</span><span class="p">]</span>
		<span class="n">original_code</span> <span class="o">=</span> <span class="n">redis</span><span class="p">.</span><span class="nf">get</span><span class="p">(</span><span class="n">number</span><span class="p">)</span>
		<span class="k">if</span> <span class="n">original_code</span> <span class="o">==</span> <span class="n">code</span>
			<span class="n">redis</span><span class="p">.</span><span class="nf">del</span><span class="p">(</span><span class="n">number</span><span class="p">)</span> &nbsp;<span class="c1"># verification successful, delete the code</span>
			<span class="nb">puts</span> <span class="no">JSON</span><span class="p">.</span><span class="nf">pretty_generate</span><span class="p">(</span> <span class="p">{</span> <span class="ss">:status</span><span class="o">=&gt;</span> <span class="s1">'success'</span><span class="p">,</span> <span class="ss">:message</span><span class="o">=&gt;</span> <span class="s1">'codes match! number verified'</span><span class="p">})</span>
		<span class="k">elsif</span> <span class="n">original_code</span> <span class="o">!=</span> <span class="n">code</span>
			<span class="nb">puts</span> <span class="no">JSON</span><span class="p">.</span><span class="nf">pretty_generate</span><span class="p">({</span> <span class="ss">:status</span> <span class="o">=&gt;</span> <span class="s2">"failure"</span><span class="p">,</span> <span class="ss">:message</span><span class="o">=&gt;</span> <span class="s1">'codes do not match! number not verified'</span> <span class="p">})</span>
		<span class="k">else</span>
			<span class="nb">puts</span> <span class="no">JSON</span><span class="p">.</span><span class="nf">pretty_generate</span><span class="p">(</span> <span class="p">{</span> <span class="ss">:status</span><span class="o">=&gt;</span> <span class="s1">'rejected'</span><span class="p">,</span> <span class="ss">:message</span><span class="o">=&gt;</span> <span class="s1">'number not found!'</span> <span class="p">})</span>
		<span class="k">end</span>
	<span class="k">end</span>
<span class="k">end</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Substitute actual values for &lt;auth_id&gt;, &lt;auth_token&gt;, and &lt;PHLO_ID&gt;. Save the file and run it with the command</p><h3>Add a Route</h3><p>Now, to add a route for the outbound function in the <strong>PlivoController</strong> class, open the <em>config/routes.rb</em> file and change the line:<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>get <span class="s1">'plivo/voice'</span> 
</code></pre></div></div><p>to<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>get <span class="s1">'plivo/verify_otp'</span>
get <span class="s1">'plivo/dispatch_otp'</span>
</code></pre></div></div><h3>Test &amp; Validate</h3><p>Now the plivo_controller is ready for your first outbound call, you can use the below command to initiate your first outbound using Rails and Plivo Ruby SDK.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>rails server
</code></pre></div></div><p>Run the following command in a new terminal tab to start the redis.<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>redis-server
</code></pre></div></div><p>And you should see your basic server app in action as below:<br></p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>http://localhost:3000/plivo/dispatch_otp?destination_number=&lt;destination_number&gt;
http://localhost:3000/plivo/verify_otp?destination_number=&lt;destination_number&gt;&amp;otp=&lt;otp&gt;
</code></pre></div></div><p>Boom — you’ve made an outbound call with the OTP as a text-to-speech message.</p><h2>Simple and reliable</h2><p>And that’s all there is to send OTP via a phone call using Plivo’s Ruby SDK. Our simple APIs work in tandem with our comprehensive global network. You can also use Plivo’s premium direct routes that guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
