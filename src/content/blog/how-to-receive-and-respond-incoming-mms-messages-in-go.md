---
title: "How to Receive and Respond to Incoming MMS Messages in Go with Martini and Plivo"
description: "How to receive and respond to incoming MMS messages using Plivo's SMS API, Go, and the Martini framework."
pubDate: "2022-06-07T00:00:00.000Z"
updatedDate: "2024-01-13T05:30:34.000Z"
image: "/images/blog/657fddcd145e6b58c95901ef_receive-mms-go.png"
thumbnail: "/images/blog/657fddcd145e6b58c95901ef_receive-mms-go.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["go-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages in Go with Martini and Plivo"
webflowItemId: "657fdea8480cf87ce32daa8c"
---
<h2>Overview</h2><p>This guide shows how to receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company.</p><p>Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages, you must have a Plivo phone number that supports SMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-go-dev-environment-api-messaging/">set up a Go development environment</a>.</p><h2>Create the autoresponder application</h2><p>Create a file called autoresponder.go and paste into it this code.</p><figure><pre><code class="language-go" data-lang="go"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
49
50
51
52
53
54
55
56
57
</pre></td><td class="code"><pre><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
	<span class="s">"encoding/json"</span>
	<span class="s">"fmt"</span>
	<span class="s">"net/http"</span>
	<span class="s">"strings"</span>

	<span class="s">"github.com/go-martini/martini"</span>
	<span class="s">"github.com/plivo/plivo-go/v7"</span>
<span class="p">)</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">m</span> <span class="o">:=</span> <span class="n">martini</span><span class="o">.</span><span class="n">Classic</span><span class="p">()</span>

	<span class="n">m</span><span class="o">.</span><span class="n">Post</span><span class="p">(</span><span class="s">"/autoresponder/"</span><span class="p">,</span> <span class="k">func</span><span class="p">(</span><span class="n">w</span> <span class="n">http</span><span class="o">.</span><span class="n">ResponseWriter</span><span class="p">,</span> <span class="n">r</span> <span class="o">*</span><span class="n">http</span><span class="o">.</span><span class="n">Request</span><span class="p">)</span> <span class="kt">string</span> <span class="p">{</span>
		<span class="n">w</span><span class="o">.</span><span class="n">Header</span><span class="p">()</span><span class="o">.</span><span class="n">Set</span><span class="p">(</span><span class="s">"Content-Type"</span><span class="p">,</span> <span class="s">"application/xml"</span><span class="p">)</span>
		<span class="n">from_number</span> <span class="o">:=</span> <span class="n">r</span><span class="o">.</span><span class="n">FormValue</span><span class="p">(</span><span class="s">"From"</span><span class="p">)</span>
		<span class="n">to_number</span> <span class="o">:=</span> <span class="n">r</span><span class="o">.</span><span class="n">FormValue</span><span class="p">(</span><span class="s">"To"</span><span class="p">)</span>
		<span class="n">text</span> <span class="o">:=</span> <span class="n">r</span><span class="o">.</span><span class="n">FormValue</span><span class="p">(</span><span class="s">"Text"</span><span class="p">)</span>
		<span class="k">var</span> <span class="n">body</span> <span class="kt">string</span>
		<span class="k">var</span> <span class="n">media</span> <span class="kt">string</span>
		<span class="k">if</span> <span class="n">strings</span><span class="o">.</span><span class="n">ToLower</span><span class="p">(</span><span class="n">text</span><span class="p">)</span> <span class="o">==</span> <span class="s">"hi"</span> <span class="p">{</span>
			<span class="n">body</span> <span class="o">=</span> <span class="s">"Hello!"</span>
			<span class="n">media</span> <span class="o">=</span> <span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span>
		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="n">strings</span><span class="o">.</span><span class="n">ToLower</span><span class="p">(</span><span class="n">text</span><span class="p">)</span> <span class="o">==</span> <span class="s">"bye"</span> <span class="p">{</span>
			<span class="n">body</span> <span class="o">=</span> <span class="s">"Bye and have a nice day!"</span>
			<span class="n">media</span> <span class="o">=</span> <span class="s">"https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif"</span>
		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
			<span class="n">body</span> <span class="o">=</span> <span class="s">"I'm glad that we connected"</span>
			<span class="n">media</span> <span class="o">=</span> <span class="s">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span>
		<span class="p">}</span>
	
		<span class="n">client</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">plivo</span><span class="o">.</span><span class="n">NewClient</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">,</span>
			<span class="o">&amp;</span><span class="n">plivo</span><span class="o">.</span><span class="n">ClientOptions</span><span class="p">{})</span>
		<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
			<span class="nb">panic</span><span class="p">(</span><span class="n">err</span><span class="p">)</span>
		<span class="p">}</span>
		<span class="n">response</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">client</span><span class="o">.</span><span class="n">Messages</span><span class="o">.</span><span class="n">Create</span><span class="p">(</span><span class="n">plivo</span><span class="o">.</span><span class="n">MessageCreateParams</span><span class="p">{</span>
			<span class="n">Src</span><span class="o">:</span> &nbsp; &nbsp; &nbsp; <span class="n">to_number</span><span class="p">,</span>
			<span class="n">Dst</span><span class="o">:</span> &nbsp; &nbsp; &nbsp; <span class="n">from_number</span><span class="p">,</span>
			<span class="n">Text</span><span class="o">:</span> &nbsp; &nbsp; &nbsp;<span class="n">body</span><span class="p">,</span>
			<span class="n">Type</span><span class="o">:</span> &nbsp; &nbsp; &nbsp;<span class="s">"mms"</span><span class="p">,</span>
			<span class="n">MediaUrls</span><span class="o">:</span> <span class="p">[]</span><span class="kt">string</span><span class="p">{</span><span class="n">media</span><span class="p">},</span>
		<span class="p">})</span>
		<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
			<span class="nb">panic</span><span class="p">(</span><span class="n">err</span><span class="p">)</span>
		<span class="p">}</span>
		<span class="n">res</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">json</span><span class="o">.</span><span class="n">Marshal</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
		<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
			<span class="n">fmt</span><span class="o">.</span><span class="n">Println</span><span class="p">(</span><span class="s">"error:"</span><span class="p">,</span> <span class="n">err</span><span class="p">)</span>
		<span class="p">}</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Printf</span><span class="p">(</span><span class="s">"Response: %#v</span><span class="se">\n</span><span class="s">"</span><span class="p">,</span> <span class="n">res</span><span class="p">)</span>
		<span class="k">return</span> <span class="kt">string</span><span class="p">(</span><span class="n">res</span><span class="p">)</span>
	<span class="p">})</span>
	<span class="n">m</span><span class="o">.</span><span class="n">Run</span><span class="p">()</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Save the file and run it.</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>go run autoresponder.go
</code></pre></div></div><p>You should see your basic server application in action at http://localhost:3000/autoresponder/.</p><p><a href="https://www.plivo.com/docs/sdk/server/set-up-go-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet.</p><h2>Create a Plivo application for the autoresponder</h2><p>Associate the controller you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click <strong>Add New Application</strong>. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application/#create-an-application">Application API</a>.</p><p>Give your application a name — we called ours Autoresponder. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/autoresponder/) in the Message URL field and set the method to POST. Click <strong>Create Application</strong> to save your application.</p><figure><div><img src="/images/blog/657fde6be4e11e1e96b32cc9_create-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p>Navigate to the <a href="https://console.plivo.com/number/">Numbers</a> page and select the phone number you want to use for this application.</p><p>From the Application Type drop-down, select XML Application.</p><p>From the Plivo Application drop-down, select Autoresponder (the name we gave the application).</p><p>Click <strong>Update Number</strong> to save.</p><figure><div><img src="/images/blog/657fde8974351fdd7e1317fc_assign-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Test</h2><p>Send a text message to the Plivo number you specified using any phone.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
