---
title: "How to Receive and Respond to Incoming MMS Messages Using Java with Spring Boot and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-05-24T00:00:00.000Z"
updatedDate: "2024-01-15T09:16:31.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fe4fe9bd16973232a77b1_receive-mms-java.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fe4fe9bd16973232a77b1_receive-mms-java.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["java-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages Using Java with Spring Boot and Plivo"
webflowItemId: "657fe5e830a09fbba316d8ab"
---
<h2>Overview</h2><p>This guide shows how to receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company.</p><p>Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages, you must have a Plivo phone number that supports SMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-java-dev-environment-api-messaging/">set up a Java development environment</a>.</p><h2>Create the autoresponder application using Spring</h2><p>Edit the PlivoSmsApplication.java file in the src/main/java/com.example.demo/ folder and paste into it this code.</p><figure><pre><code class="language-java" data-lang="java"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="kn">package</span> <span class="nn">com.example.demo</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">com.plivo.api.Plivo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.exceptions.PlivoRestException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.message.MessageCreateResponse</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.message.MessageType</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.message.Message</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.SpringApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.autoconfigure.SpringBootApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.PostMapping</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RestController</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">java.io.IOException</span><span class="o">;</span>

<span class="nd">@RestController</span>
<span class="nd">@SpringBootApplication</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">DemoApplication</span> <span class="o">{</span>

	<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="o">{</span>
		<span class="nc">SpringApplication</span><span class="o">.</span><span class="na">run</span><span class="o">(</span><span class="nc">DemoApplication</span><span class="o">.</span><span class="na">class</span><span class="o">,</span> <span class="n">args</span><span class="o">);</span>
	<span class="o">}</span>
	
	<span class="nd">@PostMapping</span><span class="o">(</span><span class="n">value</span> <span class="o">=</span> <span class="s">"/autoresponder/"</span><span class="o">,</span> <span class="n">produces</span> <span class="o">=</span> <span class="o">{</span><span class="s">"application/json"</span><span class="o">})</span>
	<span class="kd">public</span> <span class="nc">MessageCreateResponse</span> <span class="nf">postBody</span><span class="o">(</span><span class="nc">String</span> <span class="nc">From</span><span class="o">,</span> <span class="nc">String</span> <span class="nc">To</span><span class="o">,</span> <span class="nc">String</span> <span class="nc">Text</span><span class="o">,</span> <span class="nc">String</span> <span class="nc">Media0</span><span class="o">)</span> <span class="kd">throws</span> <span class="nc">PlivoRestException</span><span class="o">,</span> <span class="nc">IOException</span> <span class="o">{</span>
		<span class="nc">String</span> <span class="n">body</span><span class="o">;</span>
		<span class="nc">String</span> <span class="n">media</span><span class="o">;</span>
		<span class="nc">System</span><span class="o">.</span><span class="na">out</span><span class="o">.</span><span class="na">println</span><span class="o">(</span><span class="nc">From</span> <span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="nc">To</span> <span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="nc">Text</span><span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="nc">Media0</span><span class="o">);</span>
		<span class="k">if</span> <span class="o">(</span><span class="nc">Text</span><span class="o">.</span><span class="na">toLowerCase</span><span class="o">()</span> <span class="o">==</span> <span class="s">"hi"</span><span class="o">)</span> <span class="o">{</span>
			<span class="n">body</span> <span class="o">=</span> <span class="s">"Hello!"</span><span class="o">;</span>
			<span class="n">media</span> <span class="o">=</span> <span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="o">;</span>
		<span class="o">}</span>
		<span class="k">else</span> <span class="nf">if</span><span class="o">(</span><span class="nc">Text</span><span class="o">.</span><span class="na">toLowerCase</span><span class="o">()</span> <span class="o">==</span> <span class="s">"bye"</span><span class="o">)</span> <span class="o">{</span>
			<span class="n">body</span> <span class="o">=</span> <span class="s">"Bye and have a nice day!"</span><span class="o">;</span>
			<span class="n">media</span> <span class="o">=</span> <span class="s">"https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif"</span><span class="o">;</span>
		<span class="o">}</span>
		<span class="k">else</span> <span class="o">{</span>
			<span class="n">body</span> <span class="o">=</span> <span class="s">"I'm glad that we connected"</span><span class="o">;</span>
			<span class="n">media</span> <span class="o">=</span> <span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="o">;</span>
		<span class="o">}</span>
		<span class="nc">Plivo</span><span class="o">.</span><span class="na">init</span><span class="o">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="o">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="o">);</span>
		<span class="nc">MessageCreateResponse</span> <span class="n">response</span> <span class="o">=</span> <span class="nc">Message</span><span class="o">.</span><span class="na">creator</span><span class="o">(</span><span class="nc">To</span><span class="o">,</span><span class="nc">From</span><span class="o">,</span>
						<span class="n">body</span><span class="o">).</span><span class="na">type</span><span class="o">(</span><span class="nc">MessageType</span><span class="o">.</span><span class="na">MMS</span><span class="o">)</span>
				<span class="o">.</span><span class="na">media_urls</span><span class="o">(</span><span class="k">new</span> <span class="nc">String</span><span class="o">[]{</span><span class="n">media</span><span class="o">})</span>
				<span class="o">.</span><span class="na">create</span><span class="o">();</span>
		<span class="k">return</span> <span class="n">response</span><span class="o">;</span>
	<span class="o">}</span>
<span class="o">}</span>
</pre></td></tr></tbody></table></code></pre></figure><style>
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
  </style><p>Save the file and run it.</p><p>You should see your basic server application in action at http://localhost:8080/autoresponder/.</p><p><a href="https://www.plivo.com/docs/sdk/server/set-up-java-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet.</p><h2>Create a Plivo application for the autoresponder</h2><p>Associate the controller you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click <strong>Add New Application</strong>. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application#create-an-application">Application API</a>.</p><p>Give your application a name — we called ours Autoresponder. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/autoresponder/) in the Message URL field and set the method to POST. Click <strong>Create Application</strong> to save your application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fde6be4e11e1e96b32cc9_create-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Assign a Plivo number to your application</h2><p>Navigate to the <a href="https://console.plivo.com/number/">Numbers</a> page and select the phone number you want to use for this application. From the Application Type drop-down, select XML Application. From the Plivo Application drop-down, select Autoresponder (the name we gave the application).</p><p>Click <strong>Update Number</strong> to save.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fde8974351fdd7e1317fc_assign-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Test</h2><p>Send a text message to the Plivo number you specified using any phone. The message should reply from the destination number you specified.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
