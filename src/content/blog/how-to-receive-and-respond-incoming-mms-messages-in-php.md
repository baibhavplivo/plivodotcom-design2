---
title: "How to Receive and Respond to Incoming MMS Messages in PHP with Laravel and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-05-13T00:00:00.000Z"
updatedDate: "2024-01-13T06:01:08.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fe854d33075f561b908b4_receive-mms-php.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fe854d33075f561b908b4_receive-mms-php.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages in PHP with Laravel and Plivo"
webflowItemId: "657fe929a941ecab9505242c"
---
<h2>Overview</h2><p>This guide shows how to receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company.</p><p>Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages you must have a Plivo phone number that supports MMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-php-dev-environment-api-messaging/">set up a PHP development environment</a> and a web server and safely expose that server to the internet.</p><h2>Create a Laravel controller to receive and respond to messages</h2><p>Change to the project directory and run this command.</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php artisan make:controller SMSController
</code></pre></div></div><p>This command generates a controller named SMSController in the app/http/controllers/ directory. Edit app/http/controllers/SMSController.php and paste into it this code.</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">&lt;?php</span>

<span class="kn">namespace</span> <span class="nn">App\Http\Controllers</span><span class="p">;</span>

<span class="kn">use</span> <span class="nc">Illuminate\Http\Request</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\XML\Response</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">SMSController</span> <span class="kd">extends</span> <span class="nc">Controller</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">autoresponder</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$from_number</span> <span class="o">=</span> <span class="nv">$_POST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$to_number</span> <span class="o">=</span> <span class="nv">$_POST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_POST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$media_url</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Media0"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">echo</span><span class="p">(</span><span class="s2">"Message received - From </span><span class="nv">$from_number</span><span class="s2">, To: </span><span class="nv">$to_number</span><span class="s2">, Text: </span><span class="nv">$text</span><span class="s2">, Media: </span><span class="nv">$media_url</span><span class="s2">"</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">if</span> <span class="p">(</span><span class="nb">strtolower</span><span class="p">(</span><span class="nv">$text</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"hi"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="s2">"Hello!"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$media</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nb">strtolower</span><span class="p">(</span><span class="nv">$text</span><span class="p">)</span> <span class="o">==</span> <span class="s2">"bye"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="s2">"Bye and have a nice day!"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$media</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif"</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">else</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="s2">"I'm glad that we connected"</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$media</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">]</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">RestClient</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$client</span><span class="o">-&gt;</span><span class="n">client</span><span class="o">-&gt;</span><span class="nf">setTimeout</span><span class="p">(</span><span class="mi">40</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">[</span> &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"src"</span> <span class="o">=&gt;</span> <span class="nv">$to_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"dst"</span> <span class="o">=&gt;</span> <span class="nv">$from_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"text"</span> &nbsp;<span class="o">=&gt;</span><span class="nv">$body</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"type"</span> <span class="o">=&gt;</span> <span class="s2">"mms"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"media_urls"</span> <span class="o">=&gt;</span> <span class="nv">$media</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="p">]);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">echo</span> <span class="nb">json_encode</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div><p>Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234). In countries other than the US and Canada you can use a <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender ID</a> for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can buy a Plivo number from Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/search/">Buy Numbers</a> on the Plivo console or via the <a href="https://www.plivo.com/docs/numbers/api/phone-number/#buy-a-phone-number">Numbers API</a>.</p><h3>Add a route</h3><p>Edit routes/web.php and add this line at the end of the file.</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>Route::match<span class="o">([</span><span class="s1">'get'</span>, <span class="s1">'post'</span><span class="o">]</span>, <span class="s1">'/autoresponder'</span>, <span class="s1">'SMSController@autoresponder'</span><span class="o">)</span><span class="p">;</span>
</code></pre></div></div><p><strong>Note:</strong> If you’re using Laravel 8, use the fully qualified class name for your controllers — for example:</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>Route::match(['get', 'post'], '/sendSMS', 'App\Http\Controllers\SMSController@sendSMS');</code></pre></div></div><p>For ngrok test, add this line to mylaravelapp/quickstart/app/Http/Middleware/VerifyCsrfToken.php.<br>protected $except = ['*'];</p><p>Run your code.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php artisan serve
</code></pre></div></div><p>You should see your basic server application in action at http://localhost:8000/autoresponder.</p><p><a href="https://www.plivo.com/docs/sdk/server/set-up-php-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet.</p><h2>Create a Plivo application for the autoresponder</h2><p>Associate the controller you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click <strong>Add New Application</strong>. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application/#create-an-application">Application API</a>.</p><p>Give your application a name — we called ours Autoresponder. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/autoresponder/) in the Message URL field and set the method to POST. Click <strong>Create Application</strong> to save your application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657fde6be4e11e1e96b32cc9_create-app-autoresponder.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Assign a Plivo number to your application</h2><p>Navigate to the <a href="https://console.plivo.com/number/">Numbers</a> page and select the phone number you want to use for this application. From the Application Type drop-down, select XML Application. From the Plivo Application drop-down, select Autoresponder (the name we gave the application). Click <strong>Update Number</strong> to save.</p><h2>Test</h2><p>Send a text message to the <a href="https://console.plivo.com/active-phone-numbers/">Plivo number</a> you specified using any phone. The message should be replied to the destination number you specified.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can make calls only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
