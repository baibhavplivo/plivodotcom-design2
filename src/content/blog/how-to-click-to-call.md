---
title: "Build Click-to-Call Using PHLO"
description: "How To Build Click to Call Using PHLO | Implement click-to-Call on your website to enable users to engage with your team using ​JavaScript code via Node.js"
pubDate: "2022-01-03T00:00:00.000Z"
updatedDate: "2025-11-23T04:35:51.000Z"
image: "/images/blog/65802d7840896ac0d9a8e8ab_click-to-call.png"
thumbnail: "/images/blog/65802d7840896ac0d9a8e8ab_click-to-call.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "node-js-sdk", "browser-sdk", "how-to", "use-cases"]
seoTitle: "Build Click-to-Call Using PHLO"
webflowItemId: "65802f0d6f74b290df63769f"
---
<p>Click-to-call lets your website users engage with your support and sales teams on your website. Sometimes users might want to speak to someone via their handset but initiate the call online, or they might want to talk to someone directly from the website. You can implement either use case using Plivo’s Browser SDK.</p><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. You must have a voice-enabled Plivo phone number to receive incoming calls; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console, or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. Click to call requires JavaScript; we recommend using Node.js. If this is your first time triggering a PHLO with Node.js, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-xml-voice/">set up a Node.js development environment</a> and a web server and safely expose that server to the internet.</p><h2>Build the PHLO</h2><p>‍</p><p>To create a PHLO, visit the <a href="https://console.plivo.com/phlo/list/">PHLO</a> page of the Plivo console. If this is your first PHLO, the PHLO page will be empty.</p><ul><li>Click <strong>Create New PHLO</strong>.</li><li>In the <strong>Choose your use case</strong> pop-up, click <strong>Build my own</strong>. The PHLO canvas will appear with the <strong>Start</strong> node. The Start node is the starting point of any PHLO. It lets you trigger a PHLO to start upon one of three actions: incoming SMS message, incoming call, or API request.</li><li>Click the <strong>Start</strong> node to open the Configuration tab, and then enter the information to retrieve from the HTTP Request payload — in this case key names are destinationNumber and phoneMeNumber. The values will remain blank as we will receive them when the request is made by the browser.</li><li>Validate the configuration by clicking <strong>Validate</strong>. Do the same for each node as you go along.</li><li>From the list of components on the left side, drag and drop the <strong>Initiate Call</strong> component onto the canvas. This adds an Initiate Call node onto the canvas. When a component is placed on the canvas it becomes a node.</li><li>Draw a line to connect the <strong>Start</strong> node’s <strong>API Request</strong> trigger state to the <strong>Initiate Call</strong> node.</li><li>In the Configuration tab of the <strong>Initiate Call</strong> node, give the node a name. To enter values for the <strong>From</strong> and <strong>To</strong> fields, enter two curly brackets to view all available variables, and choose the appropriate ones. The values for the numbers will be retrieved from the HTTP Request payload you defined in the Start node. Here <strong>From</strong> is 14159142884 and <strong>To</strong> is {{Start.http.params.phoneMeNumber}}.</li><li>From the list of components on the left side, drag and drop the <strong>Call Forward</strong> component onto the canvas. Draw a line to connect the <strong>Answered</strong> trigger state of the <strong>Initiate Call</strong> node with the <strong>Call Forward</strong> node.</li><li>Configure the <strong>Call Forward</strong> node to initiate call forward to another user. To enter values for the <strong>From</strong> and <strong>To</strong> fields, enter two curly brackets to view all available variables, and choose the appropriate ones. The values for the numbers will be retrieved from the HTTP Request payload you defined in the Start node. Here <strong>From</strong> is {{Start.http.params.phoneMeNumber}} and <strong>To</strong> is {{Start.http.params.destinationNumber}}.</li><li>After you complete and validate the node configurations, give the PHLO a name by clicking in the upper left, then click <strong>Save</strong>.</li><li>From the list of components on the left side, drag and drop the <strong>Call Forward</strong> component onto the canvas.</li><li>Draw a line to connect the <strong>Start</strong> node’s <strong>Incoming call</strong> trigger state to the <strong>Call Forward</strong> node.</li><li>In the Configuration tab of the <strong>Call Forward</strong> node, give the node a name. To enter values for the <strong>From</strong> and <strong>To</strong> fields, enter two curly brackets to view all available variables, and choose the appropriate ones. The values for the numbers will be retrieved from the HTTP Request payload you defined in the Start node. Here <strong>From</strong> is {{Start.http.params.header1}}. and <strong>To</strong> is {{Start.http.params.to}}.</li><li>After you complete and validate the node configurations, give the PHLO a name by clicking in the upper left, then click <strong>Save</strong>.</li></ul><p>Your complete PHLO should look like this:</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fff5b253640336a727d83_complete-phlo.png" alt="Click to Call" width="auto" height="auto" loading="auto"></div></figure><h2>Copy our demo application</h2><ul><li>You need a little code to trigger the PHLO, but we’ve written it for you. Clone the repository from <a href="https://github.com/plivo/click2call-webRTC.git">GitHub</a>.</li></ul><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>git clone https://github.com/plivo/click2call-webRTC.git
</code></pre></div></div><ul><li>Change your working directory to click2call-webRTC.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">cd </span>click2call-webRTC
</code></pre></div></div><ul><li>Install dependencies using the npm package manager, which uses the package.json file to specify the packages a project depends on.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>npm <span class="nb">install</span>
</code></pre></div></div><ul><li>Edit the .env file.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">PORT</span><span class="o">=</span><span class="s2">"8080"</span><span class="p">;</span>
<span class="nv">PLIVO_AUTH_ID</span><span class="o">=</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">;</span>
<span class="nv">PLIVO_AUTH_TOKEN</span><span class="o">=</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">;</span>
<span class="nv">PHLO_ID</span><span class="o">=</span><span class="s2">"&lt;phlo_url&gt;"</span><span class="p">;</span>
</code></pre></div></div><p>Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Enter your PHLO ID, which you can also find on the <a href="https://console.plivo.com/phlo/list/">Plivo console</a>.</p><p>Edit <strong>/client/src/index.jsx</strong> and replace the &lt;caller_id&gt; placeholder with a Plivo number.</p><h2>What the code does</h2><p>Turn to our <a href="https://www.plivo.com/docs/voice/use-cases/click-to-call/#a-review-of-the-code">documentation</a> for a full walkthrough of the code. It explains what happens when someone clicks on an application button to initiate a call, along with code snippets.</p><p>To trigger the PHLO, you must assign it to a Plivo phone number. To do that, visit the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the console, and under <strong>Your Numbers</strong> click the phone number you want to use for the PHLO.</p><p>In the <strong>Number Configuration</strong> box, select <strong>PHLO</strong> from the <strong>Application Type</strong> drop-down.</p><p>From the <strong>PHLO Name</strong> drop-down, select the PHLO you want to use with the phone number, then click <strong>Update Number</strong>.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fffabbefee3520ed0f2de_assign-phlo.png" alt="Assign PHLO to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Try it out</h2><p>To see the PHLO in action, run npm run watch and npm run start. You can then go to http://localhost:8080/ to see the application. To make it available to the internet, <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-xml-voice/#ngrok-setup">set up ngrok</a>.</p><p>Before you try it out, be aware that if you’re using a Plivo Trial account, you can make calls only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
