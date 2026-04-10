---
title: "How to Connect a Call to a Second Person the Low-Code Way Using PHLO"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-03-03T00:00:00.000Z"
updatedDate: "2024-07-14T09:03:41.000Z"
image: "/images/blog/657ffe62145e6b58c96b7dbd_connect-call.png"
thumbnail: "/images/blog/657ffe62145e6b58c96b7dbd_connect-call.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "browser-sdk", "how-to"]
seoTitle: "How to Connect a Call to a Second Person the Low-Code Way Using PHLO"
webflowItemId: "658000633aa3e9277906f9f9"
---
<h2>Overview</h2><p><a href="https://www.plivo.com/docs/voice/use-cases/click-to-call/">Click-to-call</a> enables your website users to engage with your support and sales teams on the website itself. Sometimes they want to speak to someone via their handset but initiate the call online or talk to someone directly from the website. You can implement this click-to-call use case using <a href="https://www.plivo.com/docs/sdk/client/browser/overview/">Plivo’s Browser SDK</a>.</p><h2>How it works</h2><div class="tabs">
 &nbsp; <ul class="tab-btns language-list d-flex nav-tabs nav" style="background-color: #f2f2f7;">
 &nbsp; &nbsp; &nbsp;<li class="active"><a class="active" data-toggle="tab" href="#c2a" style="color: #333333;font-weight: 600;">Browser call</a></li>
 &nbsp; &nbsp; &nbsp;<li><a data-toggle="tab" href="#a2c" style="color: #333333;font-weight: 600;">Click to call</a></li>
 &nbsp; </ul>
 &nbsp; <div class="tab-content">
 &nbsp; &nbsp; &nbsp;<div id="c2a" class="tab-pane active">
 &nbsp; &nbsp; &nbsp; &nbsp; <!-- <img src="/assets/posts/images/voice/advanced-guides/click-to-call/browser-call.gif" alt="Browser call">  -->
<video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/advanced-guides/click-to-call/browser-call.mp4" type="video/mp4">
</video>
 &nbsp; &nbsp; &nbsp; &nbsp; The <a href="/docs/sdk/client/browser/reference/">Plivo Browser SDK</a> lets you make and receive calls using Plivo applications directly from any web browser.
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="a2c" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp; <!-- <img src="/assets/posts/images/voice/advanced-guides/click-to-call/click-to-call.gif" alt="Click to call"> -->
 &nbsp; &nbsp; &nbsp; &nbsp; <video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/advanced-guides/click-to-call/click-to-call.mp4" type="video/mp4">
 &nbsp; &nbsp; &nbsp; &nbsp; </video>
 &nbsp; &nbsp; &nbsp; &nbsp; User enters their phone number in the settings. When a call is placed, the user's handset is called first, then the call is connected to the destination number.
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; </div>
</div><style>
element.style {
    background-color: #f2f2f7;
}
@media (min-width: 768px)
.language-list.nav-tabs {
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.language-list.nav-tabs {
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0;
    padding: 1rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    background: rgb(42, 42, 60);
}
@media (min-width: 768px)
.language-list.nav-tabs {
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.language-list.nav-tabs {
    border-bottom: 0;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
@media (min-width: 768px)
.language-list {
    line-height: 2;
    margin: 0 -0.3125rem 0.625rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
@media (min-width: 768px)
.language-list {
    line-height: 2;
    margin: 0 -0.3125rem 0.625rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.language-list {
    font-weight: 500;
    font-size: .875rem;
    line-height: 1.1;
    color: #999;
    margin: 0 0 0.625rem;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.nav-tabs {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    line-height: 1rem;
}
#sidebar .widget ul, .checklist, .column-list, .partners-list, .subnav-list, #nav ul, .menu-widget, .social-networks, .documentation-section ul:not([class]), .about-us_info, .customers-list, .rating-list, .blog-detail-list, .article-section ul:not([class]), .social-links, .filters-list, .continents-list, .country-list, .summary-holder .list, .features-box .list, .components-icons, .guidelines-info .box ul, .sub-menu-panel .accordion, .sub-menu-panel .accordion ul, .tag-list, .language-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
.d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
}
.nav-tabs {
    border-bottom: 1px solid #dee2e6;
}
.nav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 1rem;
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 1rem;
}
*, *::before, *::after {
    box-sizing: border-box;
}
*, *::before, *::after {
    box-sizing: inherit;
}
*, *::before, *::after {
    box-sizing: border-box;
}
user agent stylesheet
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

element.style {
}
@media (min-width: 768px)
.language-list li {
    margin: 0 0.625rem;
}
*, *::before, *::after {
    box-sizing: border-box;
}
*, *::before, *::after {
    box-sizing: inherit;
}
*, *::before, *::after {
    box-sizing: border-box;
}
user agent stylesheet
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
@media (min-width: 768px)
.language-list {
    line-height: 2;
    margin: 0 -0.3125rem 0.625rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
@media (min-width: 768px)
.language-list {
    line-height: 2;
    margin: 0 -0.3125rem 0.625rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.language-list {
    font-weight: 500;
    font-size: .875rem;
    line-height: 1.1;
    color: #999;
    margin: 0 0 0.625rem;
    -ms-flex-pack: justify;
    justify-content: flex-start;
}
.nav-tabs {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    line-height: 1rem;
}
#sidebar .widget ul, .checklist, .column-list, .partners-list, .subnav-list, #nav ul, .menu-widget, .social-networks, .documentation-section ul:not([class]), .about-us_info, .customers-list, .rating-list, .blog-detail-list, .article-section ul:not([class]), .social-links, .filters-list, .continents-list, .country-list, .summary-holder .list, .features-box .list, .components-icons, .guidelines-info .box ul, .sub-menu-panel .accordion, .sub-menu-panel .accordion ul, .tag-list, .language-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
.nav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
user agent stylesheet
ul {
    list-style-type: disc;
}
._blog .article-section {
    color: #424f61;
}
.article-section {
    font-size: 1rem;
    line-height: 2;
    color: #333;
}
</style><style>
.language-list.nav-tabs {
    border-bottom: 0;
    -ms-flex-pack: justify;
    justify-content: flex-start;
}
.blog-post-body li {
    padding-left: 0.25rem;
    font-size: 14px;
    line-height: 1.8;
}
li {
    margin: 0 10px;
}
</style><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. You must have a voice-enabled Plivo phone number to receive incoming calls; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console, or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. Click-to-call requires JavaScript; we recommend using Node.js. If this is your first time triggering a PHLO with Node.js, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-xml-voice/">set up a Node.js development environment</a> and a web server and safely expose that server to the internet.</p><h3>Create a PHLO to handle call logic</h3><p>‍</p><p>To create a PHLO, visit the <a href="https://console.plivo.com/phlo/list/">PHLO</a> page of the Plivo console. If this is your first PHLO, the PHLO page will be empty.</p><ul><li>Click <strong>Create New PHLO</strong>.</li><li>In the <strong>Choose your use case</strong> pop-up, click <strong>Build my own</strong>. The PHLO canvas will appear with the <strong>Start</strong> node.</li></ul><p><strong>Note:</strong> The Start node is the starting point of any PHLO. It lets you trigger a PHLO to start upon one of three actions: incoming SMS message, incoming call, or API request.</p><ul><li>Click the <strong>Start</strong> node to open the Configuration tab, and then enter the information to retrieve from the HTTP Request payload — in this case key names are destinationNumber and phoneMeNumber. The values will remain blank as we will receive them when the request is made by the browser.</li><li>Validate the configuration by clicking <strong>Validate</strong>. Do the same for each node as you go along.</li><li>From the list of components on the left side, drag and drop the <strong>Initiate Call</strong> component onto the canvas. This adds an Initiate Call node onto the canvas. When a component is placed on the canvas it becomes a node.</li><li>Draw a line to connect the <strong>Start</strong> node’s <strong>API Request</strong> trigger state to the <strong>Initiate Call</strong> node.</li><li>In the Configuration tab of the <strong>Initiate Call</strong> node, give the node a name. To enter values for the <strong>From</strong> and <strong>To</strong> fields, enter two curly brackets to view all available variables, and choose the appropriate ones. The values for the numbers will be retrieved from the HTTP Request payload you defined in the Start node. Here <strong>From</strong> is 14159142884 and <strong>To</strong> is {{Start.http.params.phoneMeNumber}}.</li><li>From the list of components on the left side, drag and drop the <strong>Call Forward</strong> component onto the canvas. Draw a line to connect the <strong>Answered</strong> trigger state of the <strong>Initiate Call</strong> node with the <strong>Call Forward</strong> node.</li><li>Configure the <strong>Call Forward</strong> node to initiate call forward to another user. To enter values for the <strong>From</strong> and <strong>To</strong> fields, enter two curly brackets to view all available variables, and choose the appropriate ones. The values for the numbers will be retrieved from the HTTP Request payload you defined in the Start node. Here <strong>From</strong> is {{Start.http.params.phoneMeNumber}} and <strong>To</strong> is {{Start.http.params.destinationNumber}}.</li><li>After you complete and validate the node configurations, give the PHLO a name by clicking in the upper left, then click <strong>Save</strong>.</li><li>From the list of components on the left side, drag and drop the <strong>Call Forward</strong> component onto the canvas.</li><li>Draw a line to connect the <strong>Start</strong> node’s <strong>Incoming call</strong> trigger state to the <strong>Call Forward</strong> node.</li><li>In the Configuration tab of the <strong>Call Forward</strong> node, give the node a name. To enter values for the <strong>From</strong> and <strong>To</strong> fields, enter two curly brackets to view all available variables, and choose the appropriate ones. The values for the numbers will be retrieved from the HTTP Request payload you defined in the Start node. Here <strong>From</strong> is {{Start.http.params.header1}}. and <strong>To</strong> is {{Start.http.params.to}}.</li><li>After you complete and validate the node configurations, give the PHLO a name by clicking in the upper left, then click <strong>Save</strong>.</li></ul><p>Your complete PHLO should look like this:</p><figure><div><img src="/images/blog/657fff5b253640336a727d83_complete-phlo.png" alt="Click to Call" width="auto" height="auto" loading="auto"></div></figure><h2>Set up the demo application locally</h2><p>Download and modify the code to trigger the PHLO.</p><ul><li>Clone the repository from <a href="https://github.com/plivo/click2call-webRTC.git">GitHub</a>.</li></ul><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>git clone https://github.com/plivo/click2call-webRTC.git
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Change your working directory to click2call-webRTC.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">cd </span>click2call-webRTC
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Install the necessary dependencies using the package.json file.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>npm <span class="nb">install</span>
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Edit the .env file. Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Enter your PHLO ID, which you can find on the <a href="https://console.plivo.com/phlo/list/">Plivo console</a>.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">PORT</span><span class="o">=</span><span class="s2">"8080"</span>
<span class="nv">PLIVO_AUTH_ID</span><span class="o">=</span><span class="s2">"&lt;auth_id&gt;"</span>
<span class="nv">PLIVO_AUTH_TOKEN</span><span class="o">=</span><span class="s2">"&lt;auth_token&gt;"</span>
<span class="nv">PHLO_ID</span><span class="o">=</span><span class="s2">"&lt;phlo_url&gt;"</span>
</code></pre></div> &nbsp; &nbsp;</div><ul><li>Edit /client/src/index.jsx and replace the caller_id placeholder with a Plivo number.</li></ul><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
</pre></td><td class="code"><pre><span class="kd">const</span> <span class="nx">customCallerId</span> <span class="o">=</span> <span class="o">&lt;</span><span class="nx">caller_id</span><span class="o">&gt;</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">extraHeaders</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="dl">'</span><span class="s1">X-PH-Test1</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">test1</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="dl">'</span><span class="s1">X-PH-callerId</span><span class="dl">'</span><span class="p">:</span> <span class="nx">customCallerId</span>
<span class="p">};</span>
<span class="k">this</span><span class="p">.</span><span class="nx">plivoBrowserSdk</span><span class="p">.</span><span class="nx">client</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">dest</span><span class="p">,</span> <span class="nx">extraHeaders</span><span class="p">);</span>
</pre></td></tr></tbody></table></code></pre></figure><h2>A review of the code</h2><p>Let‘s walk through what the code does. The PHLO can be triggered either by an incoming call or an HTTP request.</p><h3>Broswer SDK call</h3><p>When someone clicks on an application button to initiate a call, we can use the Browser SDK‘s call() method to initiate a call from the application endpoint to the destination phone number. In this case our PHLO is the endpoint, so our outbound call is treated as an <em>incoming</em> call to our PHLO. When the request we make from the browser reaches the endpoint, the browser is connected to Plivo via the endpoint and the endpoint is attached to the PHLO, so when the browser makes a request to Plivo as an incoming call, Plivo connects to the endpoint, which in turn triggers the PHLO to forward the call to the destination number.</p><p>The code looks like this.</p><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
</pre></td><td class="code"><pre><span class="kd">const</span> <span class="nx">customCallerId</span> <span class="o">=</span> <span class="o">&lt;</span><span class="nx">caller_id</span><span class="o">&gt;</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">extraHeaders</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="dl">'</span><span class="s1">X-PH-Test1</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">test1</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="dl">'</span><span class="s1">X-PH-callerId</span><span class="dl">'</span><span class="p">:</span> <span class="nx">customCallerId</span>
<span class="p">};</span>
<span class="k">this</span><span class="p">.</span><span class="nx">plivoBrowserSdk</span><span class="p">.</span><span class="nx">client</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">dest</span><span class="p">,</span> <span class="nx">extraHeaders</span><span class="p">);</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Here the extraHeaders is used to pass the caller_id for a call initiated by the broswer.</p><h3>Click-to-call</h3><p>Click-to-call is a more complicated use case because it requires us to actually send an HTTP request with a payload to the PHLO endpoint. Remember that we‘re making a call to our user‘s handset first, then connecting to the destination once the first call is answered. We need to get both phone numbers from the application and send them to the server. The code looks like this.</p><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
</pre></td><td class="code"><pre><span class="kd">let</span> <span class="nx">XMLReq</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">XMLHttpRequest</span><span class="p">();</span>
<span class="nx">XMLReq</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="dl">"</span><span class="s2">POST</span><span class="dl">"</span><span class="p">,</span> <span class="dl">"</span><span class="s2">/makeCall</span><span class="dl">"</span><span class="p">);</span>
<span class="nx">XMLReq</span><span class="p">.</span><span class="nx">setRequestHeader</span><span class="p">(</span><span class="dl">"</span><span class="s2">Content-Type</span><span class="dl">"</span><span class="p">,</span> <span class="dl">"</span><span class="s2">application/json</span><span class="dl">"</span><span class="p">);</span>
<span class="nx">XMLReq</span><span class="p">.</span><span class="nx">onreadystatechange</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">response text</span><span class="dl">'</span><span class="p">,</span> <span class="nx">XMLReq</span><span class="p">.</span><span class="nx">responseText</span><span class="p">);</span>
<span class="p">}</span>
<span class="nx">XMLReq</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">({</span>
 &nbsp; &nbsp;<span class="dl">"</span><span class="s2">src</span><span class="dl">"</span><span class="p">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">phoneMeNumber</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="dl">"</span><span class="s2">dst</span><span class="dl">"</span><span class="p">:</span> <span class="nx">dest</span>
<span class="p">}));</span>
</pre></td></tr></tbody></table></code></pre></figure><p>We need to listen for this request on the server. Once we receive the request and get the numbers from the payload, we set up another HTTP request that sends this data to the PHLO.</p><figure><pre><code class="language-javascript" data-lang="javascript"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="c1">// when we receive an http post request</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">post</span><span class="p">(</span><span class="dl">'</span><span class="s1">/makeCall/</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">fields</span><span class="p">);</span>

 &nbsp; &nbsp;<span class="nx">jsonObject</span> <span class="o">=</span> <span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">"</span><span class="s2">phoneMeNumber</span><span class="dl">"</span><span class="p">:</span> <span class="nx">req</span><span class="p">.</span><span class="nx">fields</span><span class="p">.</span><span class="nx">src</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">"</span><span class="s2">destinationNumber</span><span class="dl">"</span><span class="p">:</span> <span class="nx">req</span><span class="p">.</span><span class="nx">fields</span><span class="p">.</span><span class="nx">dst</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="p">});</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="c1">// prepare the header</span>
 &nbsp; &nbsp;<span class="kd">let</span> <span class="nx">postHeaders</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">Content-Type</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">application/json</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">Authorization</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Basic </span><span class="dl">'</span> <span class="o">+</span> <span class="k">new</span> <span class="nx">Buffer</span><span class="p">.</span><span class="k">from</span><span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="o">&lt;</span><span class="nx">auth_id</span><span class="o">&gt;</span> <span class="o">+</span><span class="dl">'</span><span class="s1">:</span><span class="dl">'</span> <span class="o">+</span> <span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="o">&lt;</span><span class="nx">auth_token</span><span class="o">&gt;</span><span class="p">).</span><span class="nx">toString</span><span class="p">(</span><span class="dl">'</span><span class="s1">base64</span><span class="dl">'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="p">};</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="c1">// set the post options</span>
 &nbsp; &nbsp;<span class="kd">let</span> <span class="nx">postOptions</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">port</span><span class="p">:</span> <span class="mi">443</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">host</span><span class="p">:</span> <span class="dl">'</span><span class="s1">phlo-runner-service.plivo.com</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">path</span><span class="p">:</span> <span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="o">&lt;</span><span class="nx">phlo_id</span><span class="o">&gt;</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">method</span><span class="p">:</span> <span class="dl">'</span><span class="s1">POST</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">headers</span><span class="p">:</span> <span class="nx">postHeaders</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="p">};</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="c1">// do the POST request</span>
 &nbsp; &nbsp;<span class="kd">let</span> <span class="nx">reqPost</span> <span class="o">=</span> <span class="nx">https</span><span class="p">.</span><span class="nx">request</span><span class="p">(</span><span class="nx">postOptions</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">"</span><span class="s2">statusCode: </span><span class="dl">"</span><span class="p">,</span> <span class="nx">response</span><span class="p">.</span><span class="nx">statusCode</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">response</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="dl">'</span><span class="s1">data</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">info</span><span class="p">(</span><span class="dl">'</span><span class="s1">POST result:</span><span class="se">\n</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">process</span><span class="p">.</span><span class="nx">stdout</span><span class="p">.</span><span class="nx">write</span><span class="p">(</span><span class="nx">d</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">info</span><span class="p">(</span><span class="dl">'</span><span class="se">\n\n</span><span class="s1">POST completed</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">d</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">});</span>
 &nbsp; &nbsp;<span class="p">});</span>
 &nbsp; &nbsp;
 &nbsp; &nbsp;<span class="c1">// write the json data</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">jsonObject</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">reqPost</span><span class="p">.</span><span class="nx">write</span><span class="p">(</span><span class="nx">jsonObject</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">reqPost</span><span class="p">.</span><span class="nx">end</span><span class="p">();</span>
 &nbsp; &nbsp;<span class="nx">reqPost</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="dl">'</span><span class="s1">error</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="c1">// log any errors</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="nx">e</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">});</span>
<span class="p">})</span>
</pre></td></tr></tbody></table></code></pre></figure><h2>Assign the PHLO to a Plivo number</h2><p>Once you’ve created and configured your PHLO, assign it to a Plivo number.</p><ul><li>On the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the console, under <strong>Your Numbers</strong>, click the phone number you want to use for the PHLO.</li><li>In the <strong>Number Configuration</strong> box, select <strong>PHLO</strong> from the <strong>Application Type</strong> drop-down.</li><li>From the <strong>PHLO Name</strong> drop-down, select the PHLO you want to use with the phone number, then click <strong>Update Number</strong>.</li></ul><figure><div><img src="/images/blog/657fffabbefee3520ed0f2de_assign-phlo.png" alt="Assign PHLO to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test</h2><p>Run these commands.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>npm run watch
npm run start
</code></pre></div></div><p>You should see your basic server application running at http://localhost:8080/. <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet. Now make a call from your browser-based application to test it.</p><p>Note: If you’re using a Plivo Trial account, you can make calls only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
