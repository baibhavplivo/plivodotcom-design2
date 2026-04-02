---
title: "How to Migrate Your PHP SMS Application from Twilio to Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-11-24T00:00:00.000Z"
updatedDate: "2025-11-23T03:51:13.000Z"
image: "/images/blog/658037562687d9c67f406a7d_migrate-php-sms.png"
thumbnail: "/images/blog/658037562687d9c67f406a7d_migrate-php-sms.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "sms-api", "migration", "how-to"]
seoTitle: "How to Migrate Your PHP SMS Application from Twilio to Plivo"
webflowItemId: "6580380630cef4d1661598bb"
---
<p>Migrating your PHP SMS app from Twilio to Plivo is a seamless and painless process. The two companies’ API structures, implementation mechanisms, XML structure, SMS message processing, and voice call processing are similar. We wrote this technical comparison so that you can scope between Twilio and Plivo APIs for a seamless migration.</p><h2>Understanding the differences between Twilio and Plivo development</h2><p>Most of the APIs and features that are available on Twilio are also available on Plivo and the implementation mechanism is easier as the steps involved are almost identical. This table gives a side-side comparison of the two companies’ features and APIs. An added advantage with Plivo is that not only can you code using the old familiar API/XML method, you can also implement your use cases using PHLO (Plivo High Level Objects), a visual workflow builder that lets you create workflows by dragging and dropping components onto a canvas — no coding required.</p><style type="text/css">.helpfull-value {
    display: none;
}
.comparison-table {
    table-layout: fixed;
}
.comparison-table td {
    width: 50% !important;
    
}
table.support-table{
    font-size: 16px;
}

.support-table td:first-child {
    width: 25%;
    text-align: left;
}

.support-table td p{
    font-size: 16px !important;;
}

.support-table p{
    margin: 0;
}

.support-table tr:first-child td{
    background: #f9fff8;
    padding: 1rem;
}

.support-table td{
    padding-bottom: 1rem;
    width: 25%;
    padding: 1rem;
}

.support-table td {
    border-right: solid 1px #e5e5e5;
}
.support-table td:last-child{
    border: 0;
}

table.no-header-default-table {
    width: 100%;
    margin-bottom: 2rem;
}

table.no-header-default-table td {
    width: 25%;
    border: 1px solid;
    padding: 10px 1rem;
    vertical-align: middle;
}

table.no-header-default-table td p{
margin-bottom: 0 !important;
}

._blog p + ul {
    margin-top: -30px !important;
}

h2.question{
    margin: 0 0 21px;
    font-family: Soleil;
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: var(--deep-blue);
  }

  div.answer{
    margin-bottom: 1rem;
    font-size: 16px;
  }
  a.green-cta{
      color: #fff;
      background-color: #03a94a;
      border: 1px solid #03a94a;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      box-shadow: 0 11px 40px -17px #036b17;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  a.green-outer-cta{
      color: #03a94a;
      background-color: transparent;
      background-image: none;
      border: 1px solid #03a94a;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      box-shadow: 0 11px 40px -17px #036b17;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  a.blue-cta{
      box-shadow: 0 11px 40px -17px #05006d;
      color: #fff;
      background-color: #05006d;
      border: 1px solid #05006d;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  
  a.blue-outer-cta{
      box-shadow: 0 11px 40px -17px #05006d;
      color: #05006d;
      background-color: transparent;
      background-image: none;
      border: 1px solid #05006d;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  .green-cta:hover, .green-outer-cta:hover, .blue-cta:hover, .blue-outer-cta:hover {
    transform: none;
    box-shadow: 0 0 0 rgba(50,50,93,.05),0 0 0 rgba(0,0,0,.03)!important;
  }
  
  .green-cta:hover, .blue-cta:hover{
    color: #fff !important;;
  }
  
  .green-outer-cta:hover{
    color: #03a94a !important;;
  }

.blog-content .table-striped tbody tr:nth-of-type(odd) {
  background-color: #F7F9FB;
  }
td, th {
    padding: 1.5rem 0.65rem;
    vertical-align: top;
    text-align: left;
}
tr{
 border: 1px solid #e5e5e5;
}
  
</style>

 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;<table class="table table-striped table-markdown"><tbody><tr><td><strong>Features and APIs</strong></td><td><strong>Twilio</strong></td><td><strong>Plivo</strong></td><td><strong>Similarities</strong></td><td><strong>Implementation Interface</strong></td></tr><tr><td><a href="https://plivo.com/docs/sms/">SMS API</a>: Send SMS/MMS messages</td><td>✅</td><td>✅</td><td>Request and response variables’ structure</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHLO<br>
	 &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/sms/powerpack/">Managed number pool</a> for US/CA Messaging</td><td>Copilot</td><td>Powerpack</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Console<br>
 &nbsp; &nbsp;	</td></tr><tr><td><a href="https://www.plivo.com/docs/sms/concepts/geo-permissions/">Geo Permissions</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>Console</td></tr><tr><td><a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">SMS Sender ID registration</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>Console</td></tr><tr><td><a href="https://www.plivo.com/docs/lookup/">Number Lookup API</a></td><td>✅</td><td>✅</td><td>API Parity</td><td>API</td></tr><tr><td><a href="https://www.plivo.com/docs/numbers/">Phone number management</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Console<br>
 &nbsp; &nbsp;	</td></tr><tr><td><a href="https://www.plivo.com/docs/sms/concepts/signature-validation/">Validating Requests</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;XML<br>
 &nbsp; &nbsp;	</td></tr><tr><td>Subaccounts</td><td>✅</td><td>✅</td><td>Feature parity</td><td>API</td></tr><tr><td><a href="https://www.plivo.com/docs/sms/concepts/callbacks/">HTTP callbacks</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHLO<br>
 &nbsp; &nbsp; &nbsp; &nbsp;</td></tr>
</tbody></table><p>Plivo offers one unique advantage: Not only can you code using APIs and XML, you can also implement your use cases using PHLO (Plivo High Level Objects), a visual workflow builder that lets you create workflows by dragging and dropping components onto a canvas — no coding required.</p><h2>Plivo account creation</h2><p>Start by <a href="https://console.plivo.com/accounts/register/">signing up for a free trial account</a> that you can use to experiment with and learn about our services. The free trial account comes with free credits, and you can <a href="https://console.plivo.com/payments/">add more</a> as you go along. You can also <a href="https://console.plivo.com/phone-numbers/search/">add a phone number</a> to your account to start testing the full range of our voice and SMS features. A page in our support portal <a href="https://support.plivo.com/hc/en-us/articles/360041203772">walks you through the signup process</a>.</p><p>You can also port your numbers from Twilio to Plivo, as we explain in <a href="https://www.plivo.com/blog/how-to-migrate-your-php-sms-application-from-twilio-to-plivo/#porting-your-existing-numbers-from-twilio-to-plivo">this guide</a>.</p><h2>Migrating your PHP SMS application</h2><p>You can migrate your existing application from Twilio to Plivo by refactoring the code, or you can try our intuitive visual workflow builder <a href="https://console.plivo.com/phlo/list/">PHLO</a>. To continue working with the APIs, use one of the quickstart guides to set up a development environment for your preferred language. Plivo offers server SDKs in seven languages: <a href="https://www.plivo.com/docs/sms/quickstart/php-laravel/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET</a>, <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-rails/">Ruby</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>. For another alternative that lets you evaluate <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> and their request and response structure, use our <a href="https://www.plivo.com/docs/sms/quickstart/postman/">Postman collections</a>.</p><h3>How to send an SMS message</h3><p>Let’s take a look at the process of refactoring the code to migrate your app from Twilio to Plivo to set up a simple PHP application to send an SMS message by changing just a few lines of code.</p><style>
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

 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
 &nbsp; <table class="table table-striped table-markdown comparison-table"><tbody><tr><td><strong>Twilio</strong></td><td><strong>Plivo</strong></td></tr><tr><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <div>

<figure><pre><code class="language-php" data-lang="php"><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="k">__DIR__</span> <span class="mf">.</span> <span class="s1">'/vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Twilio\Rest\Client</span><span class="p">;</span>
<span class="nv">$account_sid</span> <span class="o">=</span>
<span class="nb">getenv</span><span class="p">(</span><span class="s1">'TWILIO_ACCOUNT_SID'</span><span class="p">);</span>
<span class="nv">$auth_token</span> <span class="o">=</span>
<span class="nb">getenv</span><span class="p">(</span><span class="s1">'TWILIO_AUTH_TOKEN'</span><span class="p">);</span>
<span class="nv">$twilio_number</span> <span class="o">=</span> <span class="s2">"&lt;destination_number&gt;"</span><span class="p">;</span>
<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">Client</span><span class="p">(</span><span class="nv">$account_sid</span><span class="p">,</span> <span class="nv">$auth_token</span><span class="p">);</span>
<span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">(</span> 
 &nbsp; &nbsp;<span class="s1">'&lt;source_number&gt;'</span> <span class="p">,</span> 
 &nbsp; &nbsp;<span class="k">array</span><span class="p">(</span>
 &nbsp; &nbsp;<span class="s1">'from'</span> <span class="o">=&gt;</span> <span class="nv">$twilio_number</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="s1">'body'</span> <span class="o">=&gt;</span> <span class="s1">'Hello'</span>
<span class="p">));</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</code></pre></figure>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <div>

<figure><pre><code class="language-php" data-lang="php"><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
<span class="nv">$authId</span> <span class="o">=</span> <span class="nb">getenv</span><span class="p">(</span><span class="s1">'PLIVO_AUTH_ID'</span><span class="p">);</span>
<span class="nv">$authToken</span> <span class="o">=</span> <span class="nb">getenv</span><span class="p">(</span><span class="s1">'PLIVO_AUTH_TOKEN'</span><span class="p">);</span>
<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">RestClient</span><span class="p">(</span><span class="nv">$authId</span><span class="p">,</span> <span class="nv">$authToken</span><span class="p">);</span>
<span class="nv">$response</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">[</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"src"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;source_number&gt;"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"dst"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;destination_number&gt;"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"text"</span> <span class="o">=&gt;</span> <span class="s2">"Hello"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">]);</span>
<span class="nb">print_r</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
<span class="cp">?&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</code></pre></figure>

 &nbsp; &nbsp; &nbsp; &nbsp; </div>
 &nbsp; &nbsp; &nbsp;</td></tr>
</tbody></table><p>Alternatively, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. For example, if you want to send an SMS message, your PHLO would be this: </p><figure><div><img src="/images/blog/65800d2240896ac0d993dfc8_send_sms.gif" alt="Create PHLO for outbound SMS" width="auto" height="auto" loading="auto"></div></figure><h3>How to receive and reply to SMS</h3><p>You can migrate an application for receiving and replying to an incoming SMS from Twilio to Plivo just as seamlessly, as in this example:</p>
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; <table class="table table-striped table-markdown comparison-table"><tbody><tr><td><strong>Twilio</strong></td><td><strong>Plivo</strong></td></tr><tr><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <div>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
<figure><pre><code class="language-php" data-lang="php"><span class="cp">&lt;?php</span>
<span class="k">require_once</span> <span class="s2">"vendor/autoload.php"</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Twilio\TwiML\MessagingResponse</span><span class="p">;</span>
<span class="nb">header</span><span class="p">(</span><span class="s2">"content-type: text/xml"</span><span class="p">);</span>
<span class="nv">$response</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">MessagingResponse</span><span class="p">();</span>
<span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">message</span><span class="p">(</span><span class="s2">"Hello"</span><span class="p">);</span>
<span class="k">echo</span> <span class="nv">$response</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</code></pre></figure>

 &nbsp; &nbsp; &nbsp; &nbsp; </div>
 &nbsp; &nbsp; &nbsp;</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <div>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
<figure><pre><code class="language-php" data-lang="php"><span class="cp">&lt;?php</span>
<span class="kn">namespace</span> <span class="nn">App\Http\Controllers</span><span class="p">;</span>
<span class="k">require</span> <span class="s1">'../../vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\XML\Response</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Illuminate\Http\Request</span><span class="p">;</span>
<span class="kd">class</span> <span class="nc">SMSController</span> <span class="kd">extends</span> <span class="nc">Controller</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">function</span> <span class="n">forwardsms</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$number</span> <span class="o">=</span> <span class="nv">$_POST</span><span class="p">[</span><span class="s2">"From"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$to</span> <span class="o">=</span> <span class="nv">$_POST</span><span class="p">[</span><span class="s2">"To"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$text</span> <span class="o">=</span> <span class="nv">$_POST</span><span class="p">[</span><span class="s2">"Text"</span><span class="p">];</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">Response</span><span class="p">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$params</span> <span class="o">=</span> <span class="k">array</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'src'</span> <span class="o">=&gt;</span> <span class="o">&lt;</span><span class="n">to_number</span><span class="o">&gt;</span> <span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'dst'</span> <span class="o">=&gt;</span> <span class="o">&lt;</span><span class="n">from_number</span><span class="o">&gt;</span> <span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$message_body</span> <span class="o">=</span> <span class="s2">"Hello"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">addMessage</span><span class="p">(</span><span class="nv">$message_body</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nv">$params</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nb">Header</span><span class="p">(</span><span class="s1">'Content-type: text/xml'</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">return</span> <span class="nv">$response</span><span class="o">-&gt;</span><span class="nf">toXML</span><span class="p">();</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</code></pre></figure>

 &nbsp; &nbsp; &nbsp; &nbsp; </div>
 &nbsp; &nbsp; &nbsp;</td></tr>
</tbody></table><p>Here again, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. Your PHLO would look like:</p><figure><div><img src="/images/blog/658015231ca2c616c3796843_forward_sms.gif" alt="With Dynamic Payload" width="auto" height="auto" loading="auto"></div></figure><p>For more information about migrating your SMS applications to Plivo, check out our <a href="https://www.plivo.com/docs/sms/use-cases/send-an-sms/php/">detailed use case guides</a>, available for all seven programming languages and PHLO.</p><h3>How to send an MMS message</h3><p>Let’s take a look at the process of refactoring the code to migrate your app from Twilio to Plivo to set up a simple PHP application to send an MMS message by changing just a few lines of code.</p>
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; <table class="table table-striped table-markdown comparison-table wrap-table"><tbody><tr><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <strong>Twilio</strong>
 &nbsp; &nbsp; &nbsp;</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <strong>Plivo</strong>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <div>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
<figure><pre><code class="language-php" data-lang="php"><span class="cp">&lt;?php</span> 
<span class="k">require_once</span> <span class="s1">'/path/to/vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Twilio\Rest\Client</span><span class="p">;</span>
<span class="nv">$sid</span> <span class="o">=</span> <span class="nb">getenv</span><span class="p">(</span><span class="s2">"TWILIO_ACCOUNT_SID"</span><span class="p">);</span>
<span class="nv">$token</span> <span class="o">=</span> <span class="nb">getenv</span><span class="p">(</span><span class="s2">"TWILIO_AUTH_TOKEN"</span><span class="p">);</span>
<span class="nv">$twilio</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">Client</span><span class="p">(</span><span class="nv">$sid</span><span class="p">,</span> <span class="nv">$token</span><span class="p">);</span>
<span class="nv">$message</span> <span class="o">=</span> <span class="nv">$twilio</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">(</span>
 &nbsp; &nbsp;<span class="s2">"&lt;destination_number&gt;"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">[</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"body"</span> <span class="o">=&gt;</span> <span class="s2">"Hello"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"from"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;source_number&gt;"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"mediaUrl"</span> <span class="o">=&gt;</span> <span class="p">[</span><span class="s2">"https://c1.staticflickr
 &nbsp; &nbsp; .com/3/2899/14341091933_1e92e62d12_b.jpg"</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">]</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>
<span class="k">print</span><span class="p">(</span><span class="nv">$message</span><span class="o">-&gt;</span><span class="n">sid</span><span class="p">);</span>
 &nbsp; </code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
<td>
 &nbsp; &nbsp;<div>
 &nbsp; &nbsp;
<figure><pre><code class="language-php" data-lang="php"><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>
<span class="nv">$authId</span> <span class="o">=</span> <span class="nb">getenv</span><span class="p">(</span><span class="s1">'PLIVO_AUTH_ID'</span><span class="p">);</span>
<span class="nv">$authToken</span> <span class="o">=</span> <span class="nb">getenv</span><span class="p">(</span><span class="s1">'PLIVO_AUTH_TOKEN'</span><span class="p">);</span>
<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">RestClient</span><span class="p">(</span><span class="nv">$authId</span><span class="p">,</span> <span class="nv">$authToken</span><span class="p">);</span>
<span class="nv">$response</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">([</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"src"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;source_number&gt;"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"dst"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;destination_number&gt;"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"text"</span> <span class="o">=&gt;</span> <span class="s2">"Hello"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"type"</span> <span class="o">=&gt;</span> <span class="s2">"mms"</span><span class="p">,</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"media_urls"</span> <span class="o">=&gt;</span> <span class="p">[</span><span class="s2">"https://media.giphy.
com/media/26gscSULUcfKU7dHq/source.gif"</span><span class="p">],</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"media_ids"</span> <span class="o">=&gt;</span> <span class="p">[</span><span class="s2">"801c2056-33ab-
499c-80ef-58b574a462a2"</span><span class="p">],</span> 
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">]);</span>
<span class="nb">print_r</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
<span class="cp">?&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</code></pre></figure>

 &nbsp; &nbsp; &nbsp; &nbsp; </div>
 &nbsp; &nbsp; &nbsp;</td></tr>
</tbody></table><p>Alternatively, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. For example, if you want to send an MMS message, your PHLO would be this:</p><figure><div><img src="/images/blog/65800d3c74351fdd7e2f7575_send_mms.gif" alt="Create PHLO for outbound MMS" width="auto" height="auto" loading="auto"></div></figure><h3>More use cases</h3><p>You can migrate your applications serving other use cases too.</p><ul><li><a href="https://www.plivo.com/docs/sms/use-cases/2-factor-authentication/php/">Two-factor authentication</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/forward-incoming-sms/php/">Forward incoming SMS</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/delivery-reports/php/">Delivery reports</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-alert/php/">SMS alerts</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-marketing/php/">SMS marketing</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-notification/php/">SMS notifications</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-survey/php/">SMS survey</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-autoresponder/php/">SMS autoresponder</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/forward-sms-to-email/php/">Forward SMS to email</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/receive-mms/python/">Receive MMS</a></li></ul><h2>Simple and reliable</h2><p>And that’s all there is to migrate your PHP SMS app from Twilio to Plivo either using Plivo’s PHP SDK or PHLO. Our simple APIs work in tandem with our Premium Communications Network to guarantee the highest possible delivery rates and the shortest possible delivery times for your SMS messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.<br></p>
