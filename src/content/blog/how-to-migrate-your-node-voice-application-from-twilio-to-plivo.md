---
title: "How to Migrate Your Node.js Voice Application from Twilio to Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-11-18T00:00:00.000Z"
updatedDate: "2024-01-15T02:42:26.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803820efd477e9e9fd1b48_migrate-node-voice.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803820efd477e9e9fd1b48_migrate-node-voice.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["node-js-sdk", "voice-api", "migration"]
seoTitle: "How to Migrate Your Node.js Voice Application from Twilio to Plivo"
webflowItemId: "6580389fc7fb29abbef6508a"
---
<p>Migrating from Twilio to Plivo is a seamless and painless process. The two companies’ API structures, implementation mechanisms, XML structure, SMS message processing, and voice call processing are similar. We wrote this technical comparison between Twilio and Plivo APIs so that you can scope the code changes for a seamless migration.</p><h2>Understanding the differences between Twilio and Plivo development</h2><p>Most of the APIs and features that are available on Twilio are also available on Plivo and the implementation mechanism is easier as the steps involved are almost identical. This table gives a side-side comparison of the two companies’ features and APIs. An added advantage with Plivo is that not only can you code using the old familiar API/XML method, you can also implement your use cases using PHLO (Plivo High Level Objects), a visual workflow builder that lets you create workflows by dragging and dropping components onto a canvas — no coding required.</p><style type="text/css">.helpfull-value {
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

 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; 
 &nbsp; 
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp;
 &nbsp; <table class="table table-striped table-markdown"><tbody><tr><td><strong>Features and APIs</strong></td><td><strong>Twilio</strong></td><td><strong>Plivo</strong></td><td><strong>Similarities</strong></td><td><strong>Implementation Interface</strong></td></tr><tr><td><a href="https://plivo.com/docs/voice/">Voice API</a>: Make phone calls</td><td>✅</td><td>✅</td><td>Request and response variables’ structure</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; PHLO<br>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/concepts/overview/#controlling-calls-programmatically">Programmatically
 &nbsp; &nbsp; &nbsp; &nbsp; manage call flows</a>
 &nbsp; &nbsp; &nbsp;</td><td>Twiml</td><td>Plivo XML</td><td>XML element and its attributes structure</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; PHLO<br>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/concepts/geo-permissions/">Geo Permissions</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>Console</td></tr><tr><td><a href="https://www.plivo.com/docs/lookup/">Number Lookup API</a></td><td>✅</td><td>✅</td><td>API Parity</td><td>API</td></tr><tr><td><a href="https://www.plivo.com/docs/numbers/">Phone number management</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; Console<br>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/call-insights/">Call Insights</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>Console</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/concepts/signature-validation/">Validating Requests</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; XML<br>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td>Subaccounts</td><td>✅</td><td>✅</td><td>Feature parity</td><td>API</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/use-cases/receive-input/node/#detect-speech-inputs">Speech
 &nbsp; &nbsp; &nbsp; &nbsp; recognition</a>
 &nbsp; &nbsp; &nbsp;</td><td>✅</td><td>✅</td><td>Feature parity</td><td>XML</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/concepts/ssml/">SSML</a> (Speech Synthesis Markup Language)</td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; PHLO<br>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/sdk/client/browser/overview/">Browser</a> and <a href="https://www.plivo.com/docs/sdk/client/ios/overview/">Mobile</a> SDKs</td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://www.plivo.com/docs/sdk/client/browser/overview/">Browser</a><br>
 &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://www.plivo.com/docs/sdk/client/android/overview/">Android</a><br>
 &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://www.plivo.com/docs/sdk/client/ios/overview/">iOS</a>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/xml/record/">Transcription</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; PHLO<br>
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/use-cases/pass-custom-headers/node/">Custom SIP Headers</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; PHLO<br>
 &nbsp; &nbsp; &nbsp; &nbsp; Browser SDK<br>
 &nbsp; &nbsp; &nbsp; &nbsp; Mobile SDKs
 &nbsp; &nbsp; &nbsp;</td></tr><tr><td><a href="https://www.plivo.com/docs/voice/concepts/callbacks/">HTTP callbacks</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; PHLO<br>
 &nbsp; &nbsp; &nbsp;</td></tr>
</tbody></table><h2>Plivo account creation</h2><p>Start by <a href="https://console.plivo.com/accounts/register/">signing up for a free trial account</a> that you can use to experiment with and learn about our services. The free trial account comes with free credits, and you can <a href="https://console.plivo.com/payments/">add more</a> as you go along. You can also <a href="https://console.plivo.com/phone-numbers/search/">add a phone number</a> to your account to start testing the full range of our voice and SMS features. A page in our support portal <a href="https://support.plivo.com/hc/en-us/articles/360041203772">walks you through the signup process</a>.</p><p>You can also port your numbers from Twilio to Plivo, as we explain in <a href="https://www.plivo.com/blog/how-to-migrate-your-node-voice-application-from-twilio-to-plivo/#porting-your-existing-numbers-from-twilio-to-plivo">this guide</a>.</p><h2>Migrating your voice application</h2><p>As mentioned earlier, you can migrate your existing application from Twilio to Plivo by refactoring the code, or you can try our intuitive visual workflow builder <a href="https://console.plivo.com/phlo/list/">PHLO</a>. If you prefer the API approach, you can follow one of the voice quickstart guides based on your preferred language and web framework. Plivo offers server SDKs in seven languages: <a href="https://www.plivo.com/docs/sms/quickstart/php-laravel/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET</a>, <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-rails/">Ruby</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>. For another alternative that lets you evaluate Plivo’s SMS APIs and their request and response structure, use our <a href="https://www.plivo.com/docs/voice/quickstart/postman/">Postman collections</a>.</p><h3>How to make an outbound call</h3><p>Let’s take a look at the process of refactoring the code to migrate your app from Twilio to Plivo to set up a simple Node.js application to make an outbound call by changing just a few lines of code.</p><style>
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
   pre {
    overflow: auto;
    }
  </style>
<table class="table table-striped table-markdown comparison-table">
<tbody><tr>
<td><strong>Twilio</strong>
</td>
<td><strong>Plivo</strong>
</td>
</tr>
<tr>
<td>
<div>

 &nbsp; 
<figure><pre><code class="language-javascript" data-lang="javascript"><span class="kd">const</span> <span class="nx">accountSid</span> 
<span class="o">=</span> <span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">TWILIO_ACCOUNT_SID</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">authToken</span> <span class="o">=</span>
<span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">TWILIO_AUTH_TOKEN</span><span class="p">;</span>
<span class="kd">const</span>
<span class="nx">client</span> 
<span class="o">=</span>
<span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">twilio</span><span class="dl">'</span><span class="p">)(</span><span class="nx">accountSid</span><span class="p">,</span>
<span class="nx">authToken</span><span class="p">);</span>

<span class="nx">client</span><span class="p">.</span><span class="nx">calls</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span>
 &nbsp; <span class="p">{</span>
 &nbsp; &nbsp; &nbsp;<span class="na">url</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">http://demo.twilio.com/docs/voice.xml</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp;<span class="na">to</span><span class="p">:</span> 
 &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">+14155551212</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp;<span class="na">from</span><span class="p">:</span>
 &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">+15017122661</span><span class="dl">'</span>
 &nbsp; &nbsp;<span class="p">})</span>
 &nbsp; &nbsp;<span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="nx">call</span>
 &nbsp; &nbsp;<span class="o">=&gt;</span> 
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">call</span><span class="p">.</span><span class="nx">sid</span><span class="p">));</span></code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
<td>
 &nbsp; &nbsp;<div>

<figure><pre><code class="language-javascript" data-lang="javascript"><span class="kd">const</span> 
<span class="nx">plivo</span> 
<span class="o">=</span> 
<span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> 
<span class="nx">authId</span> <span class="o">=</span>
<span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PLIVO_AUTH_ID</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">authToken</span>
<span class="o">=</span>
<span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PLIVO_AUTH_TOKEN</span><span class="p">;</span>
<span class="kd">const</span> <span class="nx">client</span>
<span class="o">=</span>
<span class="k">new</span>
<span class="nx">plivo</span><span class="p">.</span><span class="nx">Client</span><span class="p">(</span><span class="nx">authId</span><span class="p">,</span> 
<span class="nx">authToken</span><span class="p">);</span>
<span class="nx">client</span><span class="p">.</span><span class="nx">calls</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span>
<span class="dl">"</span><span class="s2">+14151234567</span><span class="dl">"</span><span class="p">,</span> <span class="c1">// from</span>
<span class="dl">"</span><span class="s2">+15671234567</span><span class="dl">"</span><span class="p">,</span> <span class="c1">// to</span>
<span class="c1">// answer_url</span>
<span class="dl">"</span><span class="s2">https://s3.amazonaws.com/static.plivo.com/</span><span class="dl">"</span><span class="p">,</span>
<span class="p">{</span>
 &nbsp; <span class="na">answerMethod</span><span class="p">:</span> <span class="dl">"</span><span class="s2">GET</span><span class="dl">"</span><span class="p">,</span>
<span class="p">},</span>
<span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">);</span>
<span class="p">});</span></code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
</tr>
</tbody></table><p>Alternatively, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. For example, if you want to make an outbound call, your PHLO would be this:</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658015e54daaf3f2c917165d_outbound_call_phlo.gif" alt="Create a PHLO for outbound calls" width="auto" height="auto" loading="auto"></div></figure><h3>How to receive an incoming call</h3><p>You can migrate an application for receiving and handling an incoming call from Twilio to Plivo just as seamlessly, as in this example:</p><table class="table table-striped table-markdown comparison-table">
<tbody><tr>
<td><strong>Twilio</strong>
</td>
<td><strong>Plivo</strong>
</td>
</tr>
<tr>
<td>
<div>

<figure><pre><code class="language-javascript" data-lang="javascript"><span class="kd">const</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">express</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">const</span> <span class="nx">VoiceResponse</span> <span class="o">=</span>
<span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">twilio</span><span class="dl">'</span><span class="p">).</span><span class="nx">twiml</span><span class="p">.</span><span class="nx">VoiceResponse</span><span class="p">;</span>

<span class="kd">const</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">();</span>

<span class="nx">app</span><span class="p">.</span><span class="nx">post</span><span class="p">(</span><span class="dl">'</span><span class="s1">/voice</span><span class="dl">'</span><span class="p">,</span> <span class="p">(</span><span class="nx">request</span><span class="p">,</span> <span class="nx">response</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="kd">const</span> <span class="nx">twiml</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">VoiceResponse</span><span class="p">();</span>
 &nbsp; &nbsp;<span class="nx">twiml</span><span class="p">.</span><span class="nx">say</span><span class="p">({</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="na">voice</span><span class="p">:</span> <span class="dl">'</span><span class="s1">alice</span><span class="dl">'</span>
 &nbsp; &nbsp;<span class="p">},</span> <span class="dl">'</span><span class="s1">hello world!</span><span class="dl">'</span><span class="p">);</span>

 &nbsp; &nbsp;<span class="nx">response</span><span class="p">.</span><span class="nx">type</span><span class="p">(</span><span class="dl">'</span><span class="s1">text/xml</span><span class="dl">'</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">response</span><span class="p">.</span><span class="nx">send</span><span class="p">(</span><span class="nx">twiml</span><span class="p">.</span><span class="nx">toString</span><span class="p">());</span>
<span class="p">});</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="mi">3000</span><span class="p">,</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">Now listening on port 3000. </span><span class="dl">'</span> <span class="o">+</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">Be sure to restart when you make code
 &nbsp; &nbsp; &nbsp; &nbsp;changes!</span><span class="dl">'</span>
 &nbsp; &nbsp;<span class="p">);</span>
<span class="p">});</span></code></pre></figure>

</div>
</td>
<td>
 &nbsp; &nbsp;<div>

<figure><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">express</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">express</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">app</span> <span class="o">=</span> <span class="nx">express</span><span class="p">();</span>

<span class="nx">app</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span><span class="dl">'</span><span class="s1">/receive_call/</span><span class="dl">'</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="kd">var</span> <span class="nx">response</span> <span class="o">=</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">Response</span><span class="p">();</span>
 &nbsp; &nbsp;<span class="kd">var</span> <span class="nx">speak_body</span> <span class="o">=</span> <span class="dl">"</span><span class="s2">Hello, you just received
 &nbsp; &nbsp;your first call</span><span class="dl">"</span><span class="p">;</span>
 &nbsp; &nbsp;<span class="nx">response</span><span class="p">.</span><span class="nx">addSpeak</span><span class="p">(</span><span class="nx">speak_body</span><span class="p">);</span>
 &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">writeHead</span><span class="p">(</span><span class="mi">200</span><span class="p">,</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="dl">'</span><span class="s1">Content-Type</span><span class="dl">'</span><span class="p">:</span> <span class="dl">'</span><span class="s1">text/xml</span><span class="dl">'</span>
 &nbsp; &nbsp;<span class="p">});</span>
 &nbsp; &nbsp;<span class="nx">res</span><span class="p">.</span><span class="nx">end</span><span class="p">(</span><span class="nx">response</span><span class="p">.</span><span class="nx">toXML</span><span class="p">());</span>
<span class="p">})</span>

<span class="nx">app</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">,</span> <span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PORT</span> <span class="o">||</span> <span class="mi">5000</span><span class="p">));</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">listen</span><span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">),</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Node app is running on
 &nbsp; &nbsp;port</span><span class="dl">'</span><span class="p">,</span> <span class="nx">app</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">port</span><span class="dl">'</span><span class="p">));</span>
<span class="p">});</span></code></pre></figure>

</div>
</td>
</tr>
</tbody></table><p>Here again, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. Your PHLO would look like:</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658015fa67e648d16da7c166_receive_call-phlo.gif" alt="Create a PHLO to receive incoming call" width="auto" height="auto" loading="auto"></div></figure><p>For more information about migrating your Voice applications to Plivo, check out our <a href="https://www.plivo.com/docs/voice/use-cases/make-outbound-calls/node/">detailed use case guides</a>, available for all seven programming languages and PHLO.</p><h3>How to forward an incoming call</h3><p>You can migrate an application for forwarding an incoming call from Twilio to Plivo just as seamlessly, as in this example:</p><p>Here again, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. Your PHLO would look like:</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6580160f1421eaa74fc5fb75_callforward.gif" alt="Create a PHLO to receive incoming call" width="auto" height="auto" loading="auto"></div></figure><p>For more information about migrating your Voice applications to Plivo, check out our <a href="https://www.plivo.com/docs/voice/use-cases/make-outbound-calls/node/">detailed use case guides</a>, available for all seven programming languages and PHLO.</p><h3>More use cases</h3><p>You can migrate your applications serving other use cases too.</p><ul><li><a href="https://www.plivo.com/docs/voice/use-cases/ivr/node/">IVR</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/receive-input/node/#detect-speech-inputs">Voice-controlled virtual assistant</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/number-masking/node/">Number masking</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/supervisor-coaching/node/">Supervisor coaching</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/call-conference/node/">PINless conference</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/conference-with-pin/node/">Conference with PIN</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/voicemail/node/">Voicemail</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/voice-broadcasting/node/">Voice alerts broadcasting</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/voice-survey/node/">Voice survey</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/dial-status-reporting/node/">Dial status reporting</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/screen-incoming-calls/node/">Screen incoming calls</a></li><li><a href="https://www.plivo.com/docs/voice/use-cases/screen-incoming-calls/node/">Record a call</a></li></ul><h2>Simple and reliable</h2><p>And that’s all there is to migrate your Node.js voice app from Twilio to Plivo. Our simple APIs work in tandem with our Premium Communications Network. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
