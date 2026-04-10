---
title: "How to Build a Call Forwarding App in PHP Using Laravel and Plivo"
description: "Voice API | Plivo | You can get started to build a Call Forwarding App in PHP Using Laravel and Plivo"
pubDate: "2021-06-20T00:00:00.000Z"
updatedDate: "2024-07-08T09:06:41.000Z"
image: "/images/blog/658123af8164247f73cac89a_forward-call-laravel.png"
thumbnail: "/images/blog/658123af8164247f73cac89a_forward-call-laravel.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "voice-api", "how-to"]
seoTitle: "How to Build a Call Forwarding App in PHP Using Laravel and Plivo"
webflowItemId: "658125090583e4295836e150"
---
<p>Businesses use call forwarding all the time to route incoming calls to available agents, extensions, or departments that cater to the caller’s needs. Creating a call forwarding app is simple when you use Plivo’s <a href="https://www.plivo.com/docs/sdk/server/php-sdk/">PHP SDK</a>. This guide shows you how to receive incoming calls on Plivo numbers and manage the call flow once a call reaches the Plivo voice platform. To see how to do this, we’ll build a <a href="https://laravel.com/">Laravel</a> application to forward the call to a mobile number using the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML</a> element.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="/images/blog/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://packagist.org/packages/laravel/framework">Laravel</a> and <a href="https://packagist.org/packages/plivo/plivo-php">Plivo</a> PHP packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a Laravel application to forward incoming calls</h2><p>First, you need to install Laravel if you haven’t installed it already. We suggest using Composer to install it. Add a new Laravel project with boilerplate code with the command composer create-project laravel/laravel forward_calls --prefer-dist. This will create a forward_calls directory with the necessary folders and files for development. Then change to the newly created “forward_calls” project directory and install the Plivo PHP package (composer require plivo/plivo-php).</p><p>Once you’ve installed Laravel and the Plivo PHP SDK, run php artisan make:controller ForwardcallController to create a Laravel controller to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the answer URL in the application assigned to the Plivo number. The PHP SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML element</a> to forward the call to a mobile number. Use this code:</p><style>
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
<span class="k">require</span> <span class="s1">'../../vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\XML\Response</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Illuminate\Http\Request</span><span class="p">;</span>

<span class="kd">class</span> <span class="nc">ForwardcallController</span> <span class="kd">extends</span> <span class="nc">Controller</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="c1">// Dial XML to forward the incoming call</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">forwardCalls</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">Response</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$params</span> <span class="o">=</span> <span class="k">array</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'action'</span> <span class="o">=&gt;</span> <span class="s2">"https://www.foo.com/dial_status/"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'method'</span> <span class="o">=&gt;</span> <span class="s2">"POST"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'redirect'</span> <span class="o">=&gt;</span> <span class="s2">"true"</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$dial</span> <span class="o">=</span> <span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">addDial</span><span class="p">(</span><span class="nv">$params</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$number</span> <span class="o">=</span> <span class="s2">"14153336666"</span><span class="p">;</span> &nbsp;<span class="c1">// call will be forwarded to this number</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$dial</span><span class="o">-&gt;</span><span class="nf">addNumber</span><span class="p">(</span><span class="nv">$number</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$xml_response</span> <span class="o">=</span> <span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">toXML</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="nf">response</span><span class="p">(</span><span class="nv">$xml_response</span><span class="p">,</span> <span class="mi">200</span><span class="p">)</span><span class="o">-&gt;</span><span class="nb">header</span><span class="p">(</span><span class="s1">'Content-Type'</span><span class="p">,</span> <span class="s1">'application/xml'</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div><p>Now, you need to add a route for the “forwardCalls” function in the ForwardcallController class. Open the routes/web.php file and add this line at the end of the file:</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nc">Route</span><span class="o">::</span><span class="k">match</span><span class="p">([</span><span class="s1">'get'</span><span class="p">,</span> <span class="s1">'post'</span><span class="p">],</span> <span class="s1">'/forward_calls'</span><br><span class="p">,</span> <span class="s1">'App\Http\Controllers\ForwardcallController@forwardCalls'</span><span class="p">);</span>
</code></pre></div></div><p><strong>Note</strong>: We need to add the route of the app to the “except” array to disable CSRF verification - app/Http/Middleware/VerifyCsrfToken.php`</p><div class="language-php highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="cp">&lt;?php</span>

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
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'/forward_calls'</span>
 &nbsp; &nbsp;<span class="p">];</span>
<span class="p">}</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Now the ForwardcallController is ready to handle incoming calls to your Plivo number by forwarding them to a mobile number configured in the Laravel application using Plivo PHP SDK. To run the code on the Laravel server, use the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>php artisan serve
</code></pre></div></div><p>You should see your basic server application in action on http://127.0.0.1:8000/forward_calls.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to forward incoming calls (8000 in this case, as our local Laravel application is running there):</p><figure style="max-width:1650px" data-rt-max-width="1650px"><div><img src="/images/blog/658124b0441714e1db084fb7_ngrok-cli-forwardcalls-laravel.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network. Test the link by opening the ngrok URL (https://c872a224048b.ngrok.io/forward_calls/) in a browser or use <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:1892px" data-rt-max-width="1892px"><div><img src="/images/blog/658124afb0b1e89f3c1cc6de_xml-doc-forwardcalls-laravel.png" alt="XML document with Dial XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Laravel application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to forward incoming calls.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-call-forward” — and configured the ngrok URL https://c872a224048b.ngrok.io/forward_calls/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2766px" data-rt-max-width="2766px"><div><img src="/images/blog/658124c1a6a83cd184a7dcdc_create-app-forwardcalls-laravel.png" alt="Create Plivo App to forward incoming calls" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure style="max-width:2772px" data-rt-max-width="2772px"><div><img src="/images/blog/65810f15632d5c1509fd8b48_assign-voiceapp-callforward.png" alt="Assign the call forward Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the Laravel application automatically forwards the call to the phone number configured in the call forwarding app.</p><p>And that’s how simple it is to receive an incoming call on a Plivo number and forward it using XML documents using Plivo’s PHP SDK and a Laravel application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/php/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/receive-input/php/">receive DTMF/Speech inputs</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/php/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
