---
title: "How to Receive and Respond to Incoming SMS Messages in PHP with Laravel and Plivo"
description: "SMS API | Plivo | You can get started to Receive and Respond to Incoming SMS Messages in PHP with Laravel and Plivo."
pubDate: "2021-05-28T00:00:00.000Z"
updatedDate: "2024-07-08T09:11:41.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658140e99cc4953e3fbd0ebb_receive-sms-php.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658140e99cc4953e3fbd0ebb_receive-sms-php.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "sms-api", "how-to"]
seoTitle: "How to Receive and Respond to Incoming SMS Messages in PHP with Laravel and Plivo"
webflowItemId: "658141c66dd9ffc5d498c3cf"
---
<p><a href="https://www.plivo.com/blog/send-sms-in-php/">Sending an outbound message</a> using the Plivo <a href="https://www.plivo.com/sms/">SMS</a> platform is easy, but communication should be a two-way street. Customers should be able to text you, and you should acknowledge their messages and address their concerns. To do this, you can build a PHP <a href="https://laravel.com/">Laravel</a> application to <a href="https://www.plivo.com/docs/sms/use-cases/receive-sms/php/">receive</a> and <a href="https://www.plivo.com/docs/sms/use-cases/reply-to-incoming-sms/php/">respond</a> to incoming SMS messages on a Plivo phone number. In this post, we walk you through how to implement this.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number as you want to receive incoming SMS messages. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://packagist.org/packages/laravel/framework">Laravel</a> and <a href="https://packagist.org/packages/plivo/plivo-php">Plivo</a> PHP packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a Laravel application to receive SMS messages</h2><p>First, you need to install Laravel if you haven’t installed it already. We suggest using Composer to install it. Add a new Laravel project with boilerplate code with the command composer create-project laravel/laravel receive_sms --prefer-dist. This will create a receive_sms directory with the necessary folders and files for development. Then change to the newly created “receive_sms” project directory and install the Plivo PHP package (composer require plivo/plivo-php).</p><p>Once you’ve installed Laravel and the Plivo PHP SDK, run php artisan make:controller SMSController to create a Laravel controller to handle incoming SMS messages on a Plivo number. Use this code:</p><style>
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
</style>
<div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">&lt;?php</span>

<span class="kn">namespace</span> <span class="nn">App\Http\Controllers</span><span class="p">;</span>
<span class="k">require</span> <span class="s1">'../vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Illuminate\Http\Request</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">SMSController</span> <span class="kd">extends</span> <span class="nc">Controller</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">receivesms</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$from_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$to_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">echo</span><span class="p">(</span><span class="s2">"Message received - From </span><span class="nv">$from_number</span><span class="s2">, To: </span><span class="nv">$to_number</span><span class="s2">, Text: </span><span class="nv">$text</span><span class="s2">"</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div><p>Now, you need to add a route for the “receivesms” function in the SMSController class. Open the routes/web.php file and add this line at the end of the file:</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nc">Route</span><span class="o">::</span><span class="k">match</span><span class="p">([</span><span class="s1">'get'</span><span class="p">,</span> <span class="s1">'post'</span><span class="p">],</span> <span class="s1">'/receivesms'</span><span class="p">,</span> <span class="s1">'App\Http\Controllers\SMSController@receivesms'</span><span class="p">);</span>
</code></pre></div></div><h2>Return a Message XML document to reply to incoming messages</h2><p>To reply to an incoming SMS message, you need to return an XML document from the URL configured as the message_url in the application assigned to the Plivo number. The PHP SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/sms/xml/message/">Message XML element</a> to reply to incoming SMS messages. Use this code:</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">&lt;?php</span>

<span class="kn">namespace</span> <span class="nn">App\Http\Controllers</span><span class="p">;</span>
<span class="k">require</span> <span class="s1">'../vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\XML\Response</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Illuminate\Http\Request</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">SMSController</span> <span class="kd">extends</span> <span class="nc">Controller</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">receivesms</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$from_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$to_number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">echo</span><span class="p">(</span><span class="s2">"Message received - From </span><span class="nv">$from_number</span><span class="s2">, To: </span><span class="nv">$to_number</span><span class="s2">, Text: </span><span class="nv">$text</span><span class="s2">"</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">}</span>

 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">replysms</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$number</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$to</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_REQUEST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">Response</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$params</span> <span class="o">=</span> <span class="k">array</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'src'</span> <span class="o">=&gt;</span> <span class="nv">$to</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'dst'</span> <span class="o">=&gt;</span> <span class="nv">$number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'callbackUrl'</span> <span class="o">=&gt;</span> <span class="s2">"https://www.foo.com/sms_status/"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'callbackMethod'</span> <span class="o">=&gt;</span> <span class="s2">"POST"</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$message_body</span> <span class="o">=</span> <span class="s2">"Thank you, we have received your request."</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">addMessage</span><span class="p">(</span><span class="nv">$message_body</span><span class="p">,</span> <span class="nv">$params</span><span class="p">);</span>

 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nb">Header</span><span class="p">(</span><span class="s1">'Content-type: text/xml'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">toXML</span><span class="p">();</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div><p>As we did earlier, we need to add a route for the “replysms” function in the SMSController class. Open the routes/web.php file and add this line at the end of the file:</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nc">Route</span><span class="o">::</span><span class="k">match</span><span class="p">([</span><span class="s1">'get'</span><span class="p">,</span> <span class="s1">'post'</span><span class="p">],</span> <span class="s1">'/replysms'</span><span class="p">,</span> <span class="s1">'App\Http\Controllers\SMSController@replysms'</span><span class="p">);</span>
</code></pre></div></div><p><strong>Note</strong>: We need to add the route of the app to the “except” array to disable CSRF verification - app/Http/Middleware/VerifyCsrfToken.php</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">&lt;?php</span>

<span class="kn">namespace</span> <span class="nn">App\Http\Middleware</span><span class="p">;</span>

<span class="kn">use</span> <span class="nc">Illuminate\Foundation\Http\Middleware\VerifyCsrfToken</span> <span class="k">as</span> <span class="nc">Middleware</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">VerifyCsrfToken</span> <span class="kd">extends</span> <span class="nc">Middleware</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="cd">/**
 &nbsp; &nbsp; * The URIs that should be excluded from CSRF verification.
 &nbsp; &nbsp; *
 &nbsp; &nbsp; * @var array
 &nbsp; &nbsp; */</span>
 &nbsp; &nbsp;<span class="k">protected</span> <span class="nv">$except</span> <span class="o">=</span> <span class="p">[</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'/receivesms'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'/replysms'</span>
 &nbsp; &nbsp;<span class="p">];</span>
<span class="p">}</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Now the SMSController is ready to handle incoming SMS messages to your Plivo number using Laravel and Plivo PHP SDK. To run the code on the Laravel server, use the command</p><p>You should see your basic server application in action on http://127.0.0.1:8000/replysms.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to receive and reply to messages. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (8000 in this case, as our local Laravel application is running there):</p><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure style="max-width:1462px" data-rt-max-width="1462px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581416c7e417570ded10512_ngrok-cli-laravel.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://b82335d346bb.ngrok.io/replysms) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:2742px" data-rt-max-width="2742px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581416cb4f818e36720e0a7_xml-doc-laravel.png" alt="XML document with Message XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Laravel application to a Plivo number</h2><p>The final step is to configure the app as a Plivo messaging application and assign it to a Plivo number on which you want to receive SMS messages.</p><p>Go to the Plivo console and navigate to Messaging &gt; Applications &gt; <a href="https://console.plivo.com/sms/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the app — we used “App-Incoming-SMS” — and configure the ngrok URL https://b82335d346bb.ngrok.io/replysms as the Message URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2778px" data-rt-max-width="2778px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581417a28ecd57f8063c0bd_plivo-app-laravel.png" alt="Create Plivo App to handle incoming SMS messages" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the message application you just created. Finally, click Update Number.</p><figure style="max-width:2770px" data-rt-max-width="2770px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65812bbe3fe416ed11b21140_assign-app.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Send an SMS to the Plivo number you selected. You should see that the Laravel application automatically sends a reply back to your mobile number.</p><p>And that’s how simple it is to receive and respond to incoming SMS messages using Plivo’s PHP SDK and a Laravel application.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes! <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
