---
title: "How to Make and Receive Phone Calls Using Plivo’s Voice API and Java"
description: "How to make and receive outgoing and incoming voice calls using Java with the Plivo Voice API."
pubDate: "2021-02-12T00:00:00.000Z"
updatedDate: "2024-07-08T10:46:50.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658252e4f9e3a07ecb52c43a_make-phone-calls-java.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658252e4f9e3a07ecb52c43a_make-phone-calls-java.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["java-sdk", "voice-api", "how-to"]
seoTitle: "How to Make and Receive Phone Calls Using Plivo’s Voice API and Java"
webflowItemId: "6582537547c1b9d4aeec90a0"
---
<p>Your company has settled on <a href="https://www.plivo.com/">Plivo</a> to handle its voice and messaging communications, and now it’s your job to start integrating Plivo into your company’s applications. Don’t worry — Plivo has an SDK to help you out. Let’s see how to <a href="https://www.plivo.com/docs/voice/use-cases/make-outbound-calls/java/">make outbound calls</a> and <a href="https://www.plivo.com/docs/voice/use-cases/receive-incoming-calls/java/">handle incoming calls</a> through <a href="/voice" target="_blank">Plivo's voice API</a> in a Java application.</p><h2>Install the Plivo SDK</h2><p>We’ll presume you already have Java installed. The easiest way to install the Plivo SDK is by using <a href="https://www.jetbrains.com/idea/">IntelliJ IDEA</a>. <a href="https://www.jetbrains.com/help/idea/installation-guide.html">Install it</a>, create a new project, and choose a dependency manager and Java SE SDK for the new project. Then edit pom.xml, add these lines, and save the file.</p><style>
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
<div class="language-xml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;dependency&gt;</span>
 &nbsp;<span class="nt">&lt;groupId&gt;</span>com.plivo<span class="nt">&lt;/groupId&gt;</span>
 &nbsp;<span class="nt">&lt;artifactId&gt;</span>plivo-java<span class="nt">&lt;/artifactId&gt;</span>
 <span class="nt">&lt;version&gt;</span>5.9.3<span class="nt">&lt;/version&gt;</span>
<span class="nt">&lt;/dependency&gt;</span>
</code></pre></div></div><p>If you don’t want to use IntelliJ IDEA, you can download the jar file from <a href="https://github.com/plivo/plivo-java/releases/tag/v4.14.0">our GitHub repo</a>.</p><h2>Find your Auth ID and Auth Token</h2><p>You have to have proper credentials before you can use the Plivo API. We provide an Auth ID and Auth Token in the Account section at the top of the overview page of the <a href="https://console.plivo.com/dashboard/">Plivo console</a>.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="Find Your Auth Credentials on Plivo Console" width="auto" height="auto" loading="auto"></div></figure><h2>Choose a phone number</h2><p>You need an voice-enabled Plivo phone number if you want to receive incoming calls. Check the <a href="https://console.plivo.com/active-phone-numbers/">Numbers screen</a> of the Plivo console to see what numbers you have available. You can also rent numbers from this screen.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Use PHLO to set up an outbound call</h2><p>Now you can turn to PHLO, Plivo’s visual workflow design studio, to set up the workflow for an outbound call. Click on the PHLO icon on the left navigation bar, then on <strong>Create New PHLO</strong>. In the window that pops up, click <strong>Build My Own</strong>.</p><p>Let’s start with a very simple workflow. From the list of components on the left side, drag and drop the Initiate Call component onto the canvas, then connect the Start node to the Initiate Call node using the API Request trigger state.</p><p>Now you can add configuration information for the call in the right pane. Valid phone numbers begin with a plus sign and a country code. Add a caller ID number in the From field and a destination number in the To field, then click Validate to save the configuration.</p><p>PHLO lets you use variables for From and To values, but we’re keeping it simple for this example.</p><p>Now drag the Play Audio component onto the canvas. Connect the Initiate Call node to Play Audio using the Answered trigger state. In the Configuration panel, enter the text you want to play for the call recipient, then click Validate.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658015e54daaf3f2c917165d_outbound_call_phlo.gif" alt="Create a PHLO for outbound calls" width="auto" height="auto" loading="auto"></div></figure><p>That’s all we’re going to do for now — we told you it was simple. Give the PHLO a name by clicking on the pencil icon in the upper left, then click the Save button in the upper right.</p><h2>Run the PHLO to make a call</h2><p>Now you can trigger the PHLO and test it out. Copy the PHLO ID from the end of the URL of the workflow you just created. You’re also going to need your Auth ID and Auth Token. Create a Java class in the project — let’s call it PlivoVoiceApplication — and paste this code into it:</p><figure><pre><code class="language-java" data-lang="java"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="kn">package</span> <span class="nn">com.example.demo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.Plivo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.PlivoClient</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.exceptions.PlivoRestException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.phlo.Phlo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.phlo.PhloUpdateResponse</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.SpringApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.autoconfigure.SpringBootApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.GetMapping</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RestController</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">java.io.IOException</span><span class="o">;</span>

<span class="nd">@SpringBootApplication</span>
<span class="nd">@RestController</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">PlivoVoiceApplication</span> <span class="o">{</span>


	<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="o">{</span>
		<span class="nc">SpringApplication</span><span class="o">.</span><span class="na">run</span><span class="o">(</span><span class="nc">PlivoVoiceApplication</span><span class="o">.</span><span class="na">class</span><span class="o">,</span> <span class="n">args</span><span class="o">);</span>
	<span class="o">}</span>
	
	<span class="nd">@GetMapping</span><span class="o">(</span><span class="s">"/outbound"</span><span class="o">)</span>
	<span class="kd">public</span> <span class="nc">PhloUpdateResponse</span> <span class="nf">triggerPhlo</span><span class="o">()</span> <span class="kd">throws</span> <span class="nc">IOException</span><span class="o">,</span> <span class="nc">PlivoRestException</span> <span class="o">{</span>
		<span class="kd">final</span> <span class="nc">String</span> <span class="n">authId</span> <span class="o">=</span> <span class="s">"&lt;auth_id&gt;"</span><span class="o">;</span>
		<span class="kd">final</span> <span class="nc">String</span> <span class="n">authToken</span> <span class="o">=</span> <span class="s">"&lt;auth_token&gt;"</span><span class="o">;</span>
		<span class="nc">PlivoClient</span> <span class="n">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">PlivoClient</span><span class="o">(</span><span class="n">authId</span><span class="o">,</span> <span class="n">authToken</span><span class="o">);</span>
		<span class="nc">String</span> <span class="n">phloId</span> <span class="o">=</span> <span class="s">"&lt;PHLO_ID&gt;"</span><span class="o">;</span>
		<span class="nc">Plivo</span><span class="o">.</span><span class="na">init</span><span class="o">(</span><span class="n">authId</span><span class="o">,</span> <span class="n">authToken</span><span class="o">);</span>
		<span class="nc">Phlo</span> <span class="n">phlo</span> <span class="o">=</span> <span class="nc">Phlo</span><span class="o">.</span><span class="na">getter</span><span class="o">(</span><span class="n">phloId</span><span class="o">).</span><span class="na">client</span><span class="o">(</span><span class="n">client</span><span class="o">).</span><span class="na">get</span><span class="o">();</span>
		<span class="nc">PhloUpdateResponse</span> <span class="n">response</span> <span class="o">=</span> <span class="nc">Phlo</span><span class="o">.</span><span class="na">updater</span><span class="o">(</span><span class="n">phloId</span><span class="o">).</span><span class="na">run</span><span class="o">();</span>
		<span class="k">return</span> <span class="n">response</span><span class="o">;</span>
	<span class="o">}</span>

<span class="o">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Substitute actual values for &lt;auth_id&gt;, &lt;auth_token&gt;, and &lt;PHLO_ID&gt;. Save the file and run it from Intellij.</p><p>Boom — you’ve made an outbound call.</p><p><strong>Note</strong>: To setup your Java dev environment using the Spring framework in less than five minutes, refer to the <a href="https://www.plivo.com/docs/voice/quickstart/java-spring/#set-up-your-java-spring-dev-environment">Java Quickstart guide using Spring framework</a>.</p><h2>Set up inbound calls</h2><p>Of course outbound calls are only half of the equation. Plivo supports inbound calls as well. To see how, let’s create another PHLO and again specify Build My Own. This time, drag the Play Audio component onto the canvas and connect the Start node to it using the Incoming Call trigger state. In the Configuration panel, enter some text to speak to the caller when the call is answered, then click Validate to save the configuration. Give this PHLO a name, then click Save.</p><p>Before you can receive a call using this PHLO, you have to assign it to a Plivo number. Go back to the Plivo console and click on Phone Numbers on the left nav bar. From the list of Your Numbers, click on the number you want to use. On the next screen, from the Application Type dropdown, choose PHLO. From the PHLO Name dropdown, choose the PHLO you just created. Then click <strong>Update Number</strong> at the bottom of the screen.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658015fa67e648d16da7c166_receive_call-phlo.gif" alt="Create a PHLO to receive incoming call" width="auto" height="auto" loading="auto"></div></figure><p>Guess what? You’re done! You don’t have to run a program for this PHLO to work. Just call the Plivo number you specified and you should hear the message you configured read by Plivo’s text-to-speech processor.</p><h2>Conclusion</h2><p>And that’s all there is to sending and receiving voice calls using Plivo’s Java SDK. Don’t use Java? Don’t worry — we have SDKs for <a href="https://www.plivo.com/docs/voice/quickstart/php/">PHP</a>, <a href="https://www.plivo.com/docs/voice/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/voice/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/voice/quickstart/ruby-rails/">Ruby</a>, <a href="https://www.plivo.com/docs/voice/quickstart/dotnet-core/">.NET Core</a>, <a href="https://www.plivo.com/docs/voice/quickstart/dotnet-framework/">.NET Framework</a>, and <a href="https://www.plivo.com/docs/voice/quickstart/go-gin/">Go</a>.</p><p>Haven’t tried Plivo yet? Getting started takes only five minutes. <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign up</a> today.</p>
