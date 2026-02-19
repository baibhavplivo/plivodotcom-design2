---
title: "How to Migrate Your SMS/MMS Application from Zipwhip to Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-02-09T00:00:00.000Z"
updatedDate: "2024-08-31T10:36:53.000Z"
image: "/images/blog/65800cbab29d515ac2c229fd_zipwhip-to-plivo.svg"
thumbnail: "/images/blog/65800cbab29d515ac2c229fd_zipwhip-to-plivo.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["migration", "sms-api"]
seoTitle: "How to Migrate Your SMS/MMS Application from Zipwhip to Plivo"
webflowItemId: "65800d4b7bc738af863d93fd"
---
<p>Migrating from Zipwhip to Plivo is a seamless and painless process. The two companies’ API structures, implementation mechanisms, SMS message processing, and MMS message processing are similar. We wrote this technical comparison between Zipwhip and Plivo APIs so that you can scope the changes for a seamless migration.</p><h2>Understanding the differences between Zipwhip and Plivo development</h2><p>Most of the APIs and features that are available on Zipwhip are also available on Plivo, and the steps involved are almost identical. This table gives a side-by-side comparison of the two companies’ features and APIs. An added advantage with Plivo is that not only can you code using the old familiar API method, you can also implement your use cases using PHLO (Plivo High Level Objects), a visual workflow builder that lets you create workflows by dragging and dropping components onto a canvas — no coding required.</p><style>
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

<style type="text/css">.helpfull-value {
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
 &nbsp; &nbsp;<table class="table table-striped table-markdown"><tbody><tr><td><strong>Features and APIs</strong></td><td><strong>Zipwhip</strong></td><td><strong>Plivo</strong></td><td><strong>Similarities</strong></td><td><strong>Implementation Interface</strong></td></tr><tr><td><a href="https://plivo.com/docs/sms/">SMS API</a>: Send SMS messages</td><td>✅</td><td>✅</td><td>Request and response variables’ structure</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHLO<br>
	 &nbsp; &nbsp;</td></tr><tr><td><a href="https://plivo.com/docs/sms/">MMS API</a>: Send MMS messages</td><td>✅</td><td>✅</td><td>Request and response variables’ structure</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHLO<br>
	 &nbsp; &nbsp;</td></tr><tr><td><a href="https://console.plivo.com/sms/10dlc/brand/">10DLC</a>: 10-digit long code (10DLC) phone numbers</td><td>✅</td><td>✅</td><td>Registration process and usage</td><td><a href="https://console.plivo.com/sms/10dlc/brand/">Console</a></td></tr><tr><td><a href="https://www.plivo.com/docs/sms/powerpack/">Managed number pool</a> for US/CA Messaging</td><td>✅</td><td>Powerpack</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Console<br>
 &nbsp; &nbsp;	</td></tr><tr><td><a href="https://www.plivo.com/docs/numbers/">Phone number management</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp;	API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Console<br>
 &nbsp; &nbsp;	</td></tr><tr><td><a href="https://www.plivo.com/docs/sms/concepts/callbacks/">HTTP callbacks</a></td><td>✅</td><td>✅</td><td>Feature parity</td><td>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;API<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;XML<br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHLO<br>
 &nbsp; &nbsp; &nbsp; &nbsp;</td></tr>
</tbody></table><h2>Plivo account creation</h2><p>Start by <a href="https://console.plivo.com/accounts/register/">signing up for a free trial account</a> that you can use to experiment with and learn about our services. The free trial account comes with free credits, and you can <a href="https://console.plivo.com/payments/">add more</a> as you go along. You can also <a href="https://console.plivo.com/phone-numbers/search/">add a phone number</a> to your account to start testing the full range of our voice and SMS features. A page in our support portal <a href="https://support.plivo.com/hc/en-us/articles/360041203772">walks you through the signup process</a>.</p><p>You can also port your numbers from Zipwhip to Plivo, as we explain in <a href="https://www.plivo.com/docs/sms/migrate/zipwhip/#porting-your-existing-numbers-from-zipwhip-to-plivo">this guide</a>.</p><h2>Migrating your SMS application</h2><p>You can migrate your existing application from Zipwhip to Plivo by refactoring the code, or you can try our intuitive visual workflow builder <a href="https://console.plivo.com/phlo/list/">PHLO</a>. To continue working with the APIs, use one of the quickstart guides to set up a development environment for your preferred language. Plivo offers server SDKs in seven languages: <a href="https://www.plivo.com/docs/sms/quickstart/php-laravel/">PHP</a>, <a href="https://www.plivo.com/docs/sms/quickstart/node-expressjs/">Node.js</a>, <a href="https://www.plivo.com/docs/sms/quickstart/dotnet-framework/">.NET</a>, <a href="https://www.plivo.com/docs/sms/quickstart/java-spring/">Java</a>, <a href="https://www.plivo.com/docs/sms/quickstart/python-flask/">Python</a>, <a href="https://www.plivo.com/docs/sms/quickstart/ruby-rails/">Ruby</a>, and <a href="https://www.plivo.com/docs/sms/quickstart/go-gin/">Go</a>. For another alternative that lets you evaluate Plivo’s <a href="https://www.plivo.com/sms/">SMS APIs</a> and their request and response structure, use our <a href="https://www.plivo.com/docs/sms/quickstart/postman/">Postman collections</a>.</p><h3>How to send an SMS message</h3><p>Let’s take a look at the process of refactoring the code to migrate your app from Zipwhip to Plivo to set up a simple cURL application to send an SMS message by changing just a few lines of code.</p><table class="table table-striped table-markdown comparison-table">
<tbody><tr>
<td><strong>Zipwhip</strong>
</td>
<td><strong>Plivo</strong>
</td>
</tr>
<tr>
<td>
<div>
 &nbsp; &nbsp;
<figure><pre><code class="language-zsh" data-lang="zsh">curl <span class="nt">-X</span> POST <span class="se">\</span>
 &nbsp; &nbsp;<span class="s2">"https://api.zipwhip.com/message/send"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-d</span> <span class="s2">"session=</span><span class="nv">$ZIPWHIP_SESSION_KEY</span><span class="s2">"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-d</span> <span class="s2">"contacts=</span><span class="nv">$MOBILE_PHONE_NUMBER</span><span class="s2">"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-d</span> <span class="s2">"body=Hello from Zipwhip API"</span>
 &nbsp; </code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
<td>
 &nbsp; &nbsp;<div>
 &nbsp; &nbsp;
<figure><pre><code class="language-zsh" data-lang="zsh">curl <span class="nt">-i</span> <span class="nt">--user</span> auth_id:auth_token <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-H</span> <span class="s2">"Content-Type: application/json"</span>
 &nbsp; &nbsp;<span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-d</span> <span class="s1">'{"src": "your_Plivo_number","dst":
 &nbsp; &nbsp;"your_destination_number", "text": "Hello
 &nbsp; &nbsp;from Plivo API"}'</span> <span class="se">\</span>
 &nbsp; &nbsp;https://api.plivo.com/v1/Account/<span class="o">{</span>auth_id<span class="o">}</span>/Message/</code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
</tr>
</tbody></table><p>Alternatively, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. For example, if you want to send an SMS message, your PHLO would look like this.</p><figure><div><img src="/images/blog/65800d2240896ac0d993dfc8_send_sms.gif" alt="Create PHLO for outbound SMS" width="auto" height="auto" loading="auto"></div></figure><h2>Migrating your MMS application</h2><h3>How to send an MMS message</h3><p>Let’s take a look at the process of refactoring the code to migrate another application from Zipwhip to Plivo — a simple cURL application to send an MMS message — by changing just a few lines of code.</p><table class="table table-striped table-markdown comparison-table">
<tbody><tr>
<td><strong>Zipwhip</strong>
</td>
<td><strong>Plivo</strong>
</td>
</tr>
<tr>
<td>
<div>
 &nbsp; &nbsp;
<figure><pre><code class="language-zsh" data-lang="zsh">curl <span class="nt">-X</span> POST <span class="se">\</span>
 &nbsp; &nbsp;<span class="s2">"https://api.zipwhip.com/messaging/send"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-H</span> <span class="s2">"Content-Type: multipart/form-data"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-F</span> <span class="s2">"session=</span><span class="nv">$ZIPWHIP_SESSION_KEY</span><span class="s2">"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-F</span> <span class="s2">"to=</span><span class="nv">$MOBILE_PHONE_NUMBER</span><span class="s2">"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-F</span> <span class="s2">"file=@owl.png;type=image/png"</span>
 &nbsp; </code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
<td>
 &nbsp; &nbsp;<div>
 &nbsp; &nbsp;
<figure><pre><code class="language-zsh" data-lang="zsh">curl <span class="nt">-i</span> <span class="nt">--user</span> auth_id:auth_token <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-H</span> <span class="s2">"Content-Type: application/json"</span> <span class="se">\</span>
 &nbsp; &nbsp;<span class="nt">-d</span> <span class="s1">'{"src": "14152223333","dst":
 &nbsp; &nbsp;"+14152223333", "text": "Hello from Plivo
 &nbsp; &nbsp;API", "type": "mms","media_urls": 
 &nbsp; &nbsp;["https://media.giphy.com/media/26gscSULUcfKU7dHq/source.gif"],"url":"https://foo.com/sms_status/"}'</span> <span class="se">\</span>
 &nbsp; &nbsp;https://api.plivo.com/v1/Account/<span class="o">{</span>auth_id<span class="o">}</span>/Message/</code></pre></figure>

 &nbsp; &nbsp;</div>
</td>
</tr>
</tbody></table><p>Alternatively, you can implement the same functionality using one of our <a href="https://console.plivo.com/phlo/list/">PHLO templates</a>. For example, if you want to send an MMS message, your PHLO would look like this.</p><figure><div><img src="/images/blog/65800d3c74351fdd7e2f7575_send_mms.gif" alt="Create PHLO for outbound MMS" width="auto" height="auto" loading="auto"></div></figure><h3>More use cases</h3><p>You can migrate applications for other use cases too:</p><ul><li><a href="https://www.plivo.com/docs/sms/use-cases/reply-to-incoming-sms/node/">Reply to incoming SMS messages</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/2-factor-authentication/node/">Two-factor authentication</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/forward-incoming-sms/node/">Forward incoming SMS messages</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/delivery-reports/node">Delivery reports</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-alert/node/">SMS alerts</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-marketing/node/">SMS marketing</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-notification/node/">SMS notifications</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-survey/node/">SMS survey</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/sms-autoresponder/node/">SMS autoresponder</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/forward-sms-to-email/node/">Forward SMS to email</a></li><li><a href="https://www.plivo.com/docs/sms/use-cases/receive-mms/python/">Receive MMS</a></li></ul><h2>Porting your existing numbers from Zipwhip to Plivo</h2><p>If you want to continue using your phone numbers from Zipwhip, you can port the numbers to Plivo painlessly without having any downtime on your services for your customers. Our <a href="https://www.plivo.com/docs/numbers/number-porting/">number porting guide</a> shows you how to initiate the process.</p><h2>Simple and reliable</h2><p>And that’s all there is to migrate your SMS app from Zipwhip to Plivo either using Plivo’s SDK or PHLO. Our simple APIs work in tandem with our comprehensive global network. You can also use Plivo’s premium direct routes that guarantee the highest possible delivery rates and the shortest possible delivery times for your SMS messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
