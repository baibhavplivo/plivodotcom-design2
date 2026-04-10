---
title: "How to Receive and Respond to Incoming MMS Messages Using Node.js with Express and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-05-20T00:00:00.000Z"
updatedDate: "2024-01-16T07:15:07.000Z"
image: "/images/blog/657fe6c43aa3e92779f8344a_receive-mms-node.png"
thumbnail: "/images/blog/657fe6c43aa3e92779f8344a_receive-mms-node.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["node-js-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages Using Node.js with Express and Plivo"
webflowItemId: "657fe7b4fc3c504d50c14c0a"
---
<h2>Overview</h2><p>This guide shows how to receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company.</p><p>Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages, you must have a Plivo phone number that supports SMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-messaging/">set up a Node.js development environment</a>.</p><h2>Create the autoresponder application using Express</h2><p>Create a file called autoresponder.js and paste into it this code.</p><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="kd">const</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">express</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">bodyParser</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">body-parser</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">();</span>

<span class="nx">app</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="nx">bodyParser</span><span class="p">.</span><span class="nx">urlencoded</span><span class="p">({</span>
 &nbsp; <span class="na">extended</span><span class="p">:</span> <span class="kc">true</span>
<span class="p">}));</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">response</span><span class="p">,</span> <span class="nx">next</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; <span class="nx">response</span><span class="p">.</span><span class="nx">contentType</span><span class="p">(</span><span class="dl">'</span><span class="s1">application/xml</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; <span class="nx">next</span><span class="p">();</span>
<span class="p">});</span>
<span class="nx">app</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">,</span> <span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PORT</span> <span class="o">||</span> <span class="mi">3000</span><span class="p">));</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span><span class="dl">'</span><span class="s1">/autoresponder/</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">request</span><span class="p">,</span> <span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="kd">let</span> <span class="nx">from_number</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">From</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">From</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="kd">let</span> <span class="nx">to_number</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">To</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">To</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="kd">let</span> <span class="nx">text</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">Text</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">Text</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="kd">let</span> <span class="nx">media</span> <span class="o">=</span> <span class="nx">request</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">Media0</span> <span class="o">||</span> <span class="nx">request</span><span class="p">.</span><span class="nx">query</span><span class="p">.</span><span class="nx">Media0</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Message received - From: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">from_number</span> <span class="o">+</span> <span class="dl">'</span><span class="s1">, To: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">to_number</span> <span class="o">+</span> <span class="dl">'</span><span class="s1">, Text: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">text</span><span class="o">+</span> <span class="dl">'</span><span class="s1">, Media: </span><span class="dl">'</span> <span class="o">+</span> <span class="nx">media</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">if</span> <span class="p">(</span><span class="nx">text</span><span class="p">.</span><span class="nx">toLowerCase</span><span class="p">()</span> <span class="o">==</span> <span class="dl">'</span><span class="s1">hi</span><span class="dl">'</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">text</span> <span class="o">=</span> <span class="dl">"</span><span class="s2">Hello!</span><span class="dl">"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">media</span> <span class="o">=</span> <span class="p">[</span><span class="dl">"</span><span class="s2">https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif</span><span class="dl">"</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">text</span><span class="p">.</span><span class="nx">toLowerCase</span><span class="p">()</span> <span class="o">==</span> <span class="dl">'</span><span class="s1">bye</span><span class="dl">'</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">body</span> <span class="o">=</span> <span class="dl">"</span><span class="s2">Bye and have a nice day!</span><span class="dl">"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">media</span> <span class="o">=</span> <span class="p">[</span><span class="dl">"</span><span class="s2">https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif</span><span class="dl">"</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">else</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">body</span> <span class="o">=</span> <span class="dl">"</span><span class="s2">I'm glad that we connected</span><span class="dl">"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">media</span> <span class="o">=</span> <span class="p">[</span><span class="dl">"</span><span class="s2">https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif</span><span class="dl">"</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">}</span>
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="kd">var</span> <span class="nx">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">Client</span><span class="p">(</span><span class="dl">"</span><span class="s2">&lt;auth_id&gt;</span><span class="dl">"</span><span class="p">,</span> <span class="dl">"</span><span class="s2">&lt;auth_token&gt;</span><span class="dl">"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">client</span><span class="p">.</span><span class="nx">messages</span><span class="p">.</span><span class="nx">create</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="na">src</span><span class="p">:</span> <span class="nx">to_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="na">dst</span><span class="p">:</span> <span class="nx">from_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="na">text</span><span class="p">:</span> <span class="nx">body</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="na">type</span><span class="p">:</span> <span class="dl">"</span><span class="s2">mms</span><span class="dl">"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="na">media_urls</span><span class="p">:</span> <span class="nx">media</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">});</span>
 &nbsp; &nbsp; &nbsp; <span class="p">});</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">),</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Node app is running on port</span><span class="dl">'</span><span class="p">,</span> <span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">));</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">});</span>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>node autoresponder.js
</code></pre></div></div><p>You should see your basic server application in action at http://localhost:3000/autoresponder/.</p><p><a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet.</p><h2>Create a Plivo application for the autoresponder</h2><p>Associate the controller you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click <strong>Add New Application</strong>. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application/#create-an-application">Application API</a>.</p><p>Give your application a name — we called ours Autoresponder. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/autoresponder/) in the Message URL field and set the method to POST. Click <strong>Create Application</strong> to save your application.</p><figure style="max-width:2874px" data-rt-max-width="2874px"><div><img src="/images/blog/657fde6be4e11e1e96b32cc9_create-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Assign a Plivo number to your application</h2><p>Navigate to the <a href="https://console.plivo.com/number/">Numbers</a> page and select the phone number you want to use for this application.<br>From the Application Type drop-down, select XML Application.<br>From the Plivo Application drop-down, select Autoresponder (the name we gave the application).</p><p>Click <strong>Update Number</strong> to save.</p><figure style="max-width:2870px" data-rt-max-width="2870px"><div><img src="/images/blog/657fde8974351fdd7e1317fc_assign-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Test</h2><p>Send a text message to the Plivo number you specified using any phone. The message should reply from the destination number you specified.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
