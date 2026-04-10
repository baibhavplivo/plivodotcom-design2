---
title: "How to Make and Receive Phone Calls Using Plivo’s Voice API and Go"
description: "How to make and receive outgoing and incoming voice calls using Go with the Plivo Voice API."
pubDate: "2021-04-08T00:00:00.000Z"
updatedDate: "2024-07-08T09:43:15.000Z"
image: "/images/blog/65819b33abfdd99a18335529_make-phone-calls-go.png"
thumbnail: "/images/blog/65819b33abfdd99a18335529_make-phone-calls-go.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["go-sdk", "voice-api", "how-to"]
seoTitle: "How to Make and Receive Phone Calls Using Plivo’s Voice API and Go"
webflowItemId: "65819bd24560f47f00fb3ec8"
---
<p>Your company has settled on Plivo to handle its voice and messaging communications, and now it’s your job to start integrating <a href="https://www.plivo.com/">Plivo</a> into your company’s applications. Don’t worry — Plivo has an SDK to help you out. Let’s see how to make outbound calls and handle incoming calls through Plivo in a Go application.</p><h2>Install the Plivo SDK</h2><p>We’ll presume you already have your Go environment set up. Change to the directory into which you want to install the Plivo Go SDK and run</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>go get github.com/plivo/plivo-go/v7
</code></pre></div></div><p>or you can clone <a href="https://github.com/plivo/plivo-go">our GitHub repository</a> into your GOPATH.</p><h2>Find your Auth ID and Auth Token</h2><p>You have to have proper credentials before you can use the Plivo API. We provide an Auth ID and Auth Token in the Account section at the top of the overview page of the <a href="https://console.plivo.com/dashboard/">Plivo console</a>.</p><figure><div><img src="/images/blog/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="Find Your Auth Credentials on Plivo Console" width="auto" height="auto" loading="auto"></div></figure><h2>Choose a phone number</h2><p>You need an voice-enabled Plivo phone number if you want to receive incoming calls. Check the <a href="https://console.plivo.com/active-phone-numbers/">Numbers screen</a> of the Plivo console to see what numbers you have available. You can also rent numbers from this screen.</p><figure><div><img src="/images/blog/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Use PHLO to set up an outbound call</h2><p>Now you can turn to PHLO, Plivo’s visual workflow design studio, to set up the workflow for an outbound call. Click on the PHLO icon on the left-side navigation bar, then on <strong>Create New PHLO</strong>. In the window that pops up, click <strong>Build My Own</strong>.</p><p>Let’s start with a very simple workflow. From the list of components on the left side, drag and drop the Initiate Call component onto the canvas, then connect the Start node to the Initiate Call node using the API Request trigger state.</p><p>Now you can add configuration information for the call in the right pane. Valid phone numbers begin with a plus sign and a country code. Add a caller ID number in the From field and a destination number in the To field, then click Validate to save the configuration.</p><p>PHLO lets you use variables for From and To values, but we’re keeping it simple for this example.</p><p>Now drag the Play Audio component onto the canvas. Connect the Initiate Call node to Play Audio using the Answered trigger state. In the Configuration panel, enter the text you want to play for the call recipient, then click Validate.</p><figure><div><img src="/images/blog/658015e54daaf3f2c917165d_outbound_call_phlo.gif" alt="Create a PHLO for outbound calls" width="auto" height="auto" loading="auto"></div></figure><p>That’s all we’re going to do for now — we told you it was simple. Give the PHLO a name by clicking on the pencil icon in the upper left, then click the Save button in the upper right.</p><h2>Run the PHLO to make a call</h2><p>Now you can trigger the PHLO and test it out. Copy the PHLO ID from the end of the URL of the workflow you just created. You’re also going to need your Auth ID and Auth Token. Create a Go source code file — let’s call it TriggerPhlo.go — and paste this code into it:</p><figure><pre><code class="language-go" data-lang="go"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
	<span class="s">"fmt"</span>
	<span class="s">"plivo-go"</span>
<span class="p">)</span>
<span class="c">// Initialize the following params with corresponding values to trigger resources</span>
<span class="k">const</span> <span class="n">authId</span> <span class="o">=</span> <span class="s">"&lt;auth_id&gt;"</span>
<span class="k">const</span> <span class="n">authToken</span> <span class="o">=</span> <span class="s">"&lt;auth_token&gt;"</span>
<span class="k">const</span> <span class="n">phloId</span> <span class="o">=</span> <span class="s">"&lt;PHLO_ID&gt;"</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">testPhloRunWithoutParams</span><span class="p">()</span>
<span class="p">}</span>

<span class="k">func</span> <span class="n">testPhloRunWithoutParams</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">phloClient</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">plivo</span><span class="o">.</span><span class="n">NewPhloClient</span><span class="p">(</span><span class="n">authId</span><span class="p">,</span> <span class="n">authToken</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">plivo</span><span class="o">.</span><span class="n">ClientOptions</span><span class="p">{})</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
			<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
			<span class="k">return</span>
		<span class="p">}</span>
	<span class="n">phloGet</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">phloClient</span><span class="o">.</span><span class="n">Phlos</span><span class="o">.</span><span class="n">Get</span><span class="p">(</span><span class="n">phloId</span><span class="p">)</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
			<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
			<span class="k">return</span>
		<span class="p">}</span>
	<span class="n">response</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">phloGet</span><span class="o">.</span><span class="n">Run</span><span class="p">(</span><span class="no">nil</span><span class="p">)</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
			<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
			<span class="k">return</span>
		<span class="p">}</span>
	<span class="n">fmt</span><span class="o">.</span><span class="n">Printf</span><span class="p">(</span><span class="s">"Response: %#v</span><span class="se">\n</span><span class="s">"</span><span class="p">,</span> <span class="n">response</span><span class="p">)</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Substitute actual values for &lt;auth_id&gt;, &lt;auth_token&gt;, and &lt;PHLO_ID&gt;. Save the file and run it with the commandBoom — you’ve made an outbound call.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>go run TriggerPhlo.go
</code></pre></div></div><h2>Set up inbound calls</h2><p>Of course outbound calls are only half of the equation. Plivo supports inbound calls as well. To see how, let’s create another PHLO and again specify Build My Own. This time, drag the Play Audio component onto the canvas and connect the Start node to it using the Incoming Call trigger state. In the Configuration panel, enter some text to speak to the caller when the call is answered, then click Validate to save the configuration. Give this PHLO a name, then click Save.</p><p>Before you can receive a call using this PHLO, you have to assign it to a Plivo number. Go back to the Plivo console and click on Phone Numbers on the left nav bar. From the list of Your Numbers, click on the number you want to use. On the next screen, from the Application Type dropdown, choose PHLO. From the PHLO Name dropdown, choose the PHLO you just created. Then click <strong>Update Number</strong> at the bottom of the screen.</p><figure><div><img src="/images/blog/658015fa67e648d16da7c166_receive_call-phlo.gif" alt="Create a PHLO to receive incoming call" width="auto" height="auto" loading="auto"></div></figure><p>Guess what? You’re done! You don’t have to run a program for this PHLO to work. Just call the Plivo number you specified and you should hear the message you configured read by Plivo’s text-to-speech processor.</p><h2>Conclusion</h2><p>And that’s all there is to sending and receiving voice calls using Plivo’s Go SDK. Don’t use Ruby? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/voice/quickstart/php/">PHP</a>, <a href="https://www.plivo.com/docs/voice/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/voice/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/voice/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/voice/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/voice/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/voice/quickstart/ruby-rails/">Ruby</a>.</p><p>Haven’t tried Plivo yet? Getting started takes only five minutes. <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign up</a> today.</p>
