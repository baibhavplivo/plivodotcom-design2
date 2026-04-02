---
title: "How to Build a 2FA Application the Low-Code Way Using PHLO"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-02-09T00:00:00.000Z"
updatedDate: "2025-11-23T04:44:10.000Z"
image: "/images/blog/65800e2809ade2403961f078_2fa.png"
thumbnail: "/images/blog/65800e2809ade2403961f078_2fa.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "node-js-sdk", "sms-api", "how-to", "2fa", "use-cases"]
seoTitle: "How to Build a 2FA Application the Low-Code Way Using PHLO"
webflowItemId: "65800ecaa1a7cc3479e9832b"
---
<p>Two-factor authentication (2FA) protects organizations and individuals from unauthorized data access by requiring a level of authentication beyond username and password, to provide added security in the event that those credentials are compromised. One of the simplest ways to institute 2FA types is by sending a one-time password (OTP) sent through a separate communication channel — namely, SMS messaging.</p><p>Plivo makes it easy to add 2FA via OTP delivered over SMS to your applications. Whether your applications are coded in Python, Ruby, Node.js, PHP, or C#, we’ve got you covered with <a href="https://www.plivo.com/docs/sdk/server/">language-specific SDKs</a>.</p><p>You can create and deploy a PHLO to handle 2FA with a few clicks on the PHLO canvas and trigger it with a few lines of code.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. If this is your first time triggering a PHLO with Node.js, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-node-dev-environment-phlo/">set up a Node.js development environment</a>.</p><h2>Create the PHLO</h2><p>Plivo provides a prototype for 2FA; all you have to do is select the PHLO and give it a friendly name.</p><video autoplay="" loop="" muted="" inline="" width="514" height="289">
 &nbsp;<source width="514" height="289" src="https://www.plivo.com/assets/posts/images/sms/usecase-guides/advanced/2fa/PHLO-2fa.mp4" type="video/mp4">
</video><h2>Set up the demo application locally</h2><p>Once you‘ve created the PHLO, download and modify the code to trigger it which is available in 5 different languages which are <a href="https://github.com/plivo/2fa-python-demo">Python</a>, <a href="https://github.com/plivo/2fa-ruby-demo">Ruby</a>, <a href="https://github.com/plivo/2fa-node-demo">Node.js</a>, <a href="https://github.com/plivo/2fa-php-demo">PHP</a>, or <a href="https://github.com/plivo/2fa-dotnet-demo">C#</a>.</p><h2>Update the config file</h2><p>Edit the config file. Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Enter your PHLO ID, which you can find on the <a href="https://console.plivo.com/phlo/list/">Plivo console</a>. Replace the phone number placeholder with an actual phone number in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234).</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800e7c465ed5c6e7116ccf_node-config.png" alt="Configuration file" width="auto" height="auto" loading="auto"></div></figure><h2>Trigger PHLO</h2><h3>Send SMS and make a call</h3><div class="tab-container">
 &nbsp;<ul class="nav nav-tabs">
 &nbsp; &nbsp;<li class="active"><a data-toggle="tab" href="#home" class="active show">Python</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu1">C#</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu3">PHP</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu4">Node.js</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu5">Ruby</a></li>
 &nbsp;</ul>
 &nbsp; &nbsp;<div class="tab-content">
 &nbsp; &nbsp; &nbsp;<div id="home" class="tab-pane in active">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;def send_verification_code_phlo(self,dst_number,code,mode):
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;payload = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"from": self.app_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"to": dst_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"otp": code,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"mode": mode,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;try:
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phlo = self.client_phlo.phlo.get(self.phlo_id)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;response = phlo.run(**payload)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return response
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;except exceptions as e:
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;print(e)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return ("Error encountered", 400)
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu1" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;public int SendVerificationCodePhlo(String DstNumber, String mode)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Random r = new Random();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var code = r.Next(999999);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var phloClient = new PhloApi(AuthId, AuthToken);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var phloID = PhloId;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var phlo = phloClient.Phlo.Get(phloID); 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var data = new Dictionary&lt;string, object&gt;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{ "from", AppNumber },
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{ "to", DstNumber },
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{ "mode", mode },
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{ "otp", code },

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phlo.Run(data);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return code;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu2" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;function send_verification_code_phlo($dst_number,$mode)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$code = random_int(100000, 999999);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$client = new PhloRestClient($this-&gt;config['auth_id'], $this-&gt;config['auth_token']);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;try {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$phlo = $client-&gt;phlo-&gt;get($this-&gt;config['phlo_id']);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$phlo-&gt;run(["from" =&gt; $this-&gt;config['app_number'], "to" =&gt; $dst_number, "mode"=&gt;$mode, "otp"=&gt;$code]); // These are the fields entered in the PHLO console
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return $code;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;catch (PlivoRestException $ex) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;print_r($ex);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu3" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;sendVerificationCode_phlo(DstNumber, mode) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var payload = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;from: this.app_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;to: DstNumber,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;otp: code,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;mode: mode
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phloClient = this.phlo_client
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phloClient.phlo(this.phloId).run(payload).then(function() {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return code;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}).catch(function(err) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;console.error('Phlo run failed', err);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu4" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var request = require("request");
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var fs = require('fs');
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var url = "https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3";
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var file = fs.createWriteStream("file.mp3");
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var request = http.get(url, function(response) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;response.pipe(file);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file.on('finish', function() {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file.close(cb); // close() is async, call cb after close completes.
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}).on('error', function(err) { // Handle errors
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;fs.unlink(dest); // Delete the file async. (But we don't check the result)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if (cb) cb(err.message);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu5" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;def initiate_phlo(dst_number, mode)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;code = rand(999_999)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;begin
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phlo = @phloclient.phlo.get(@phlo_id)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;# parameters set in PHLO - params
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;params = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;from: @app_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;to: dst_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;otp: code,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;mode: mode
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phlo.run(params)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;code
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;rescue PlivoRESTError =&gt; e
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;puts 'Exception: ' + e.message
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;end
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;end
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp;</div>
</div><style>
.card-body{
        display: block;
    }
    }

pre.lineno{
    color: #fff;
    opacity: .3;
  }

  .documentation-section .highlight .c { color: #999999; font-style: italic } /* Comment */
  .documentation-section .highlight .err { color: #e3d2d2;} /* Error */
  .documentation-section .highlight .esc { color: #d0d0d0 } /* Escape */
  .documentation-section .highlight .g { color: #d0d0d0 } /* Generic */
  .documentation-section .highlight .k { color: #6ab825; font-weight: bold } /* Keyword */
  .documentation-section .highlight .l { color: #d0d0d0 } /* Literal */
  .documentation-section .highlight .n { color: #d0d0d0 } /* Name */
  .documentation-section .highlight .o { color: #d0d0d0 } /* Operator */
  .documentation-section .highlight .x { color: #d0d0d0 } /* Other */
  .documentation-section .highlight .p { color: #d0d0d0 } /* Punctuation */
  .documentation-section .highlight .ch { color: #999999; font-style: italic } /* Comment.Hashbang */
  .documentation-section .highlight .cm { color: #999999; font-style: italic } /* Comment.Multiline */
  .documentation-section .highlight .cp { color: #cd2828; font-weight: bold } /* Comment.Preproc */
  .documentation-section .highlight .cpf { color: #999999; font-style: italic } /* Comment.PreprocFile */
  .documentation-section .highlight .c1 { color: #999999; font-style: italic } /* Comment.Single */
  .documentation-section .highlight .cs { color: #e50808; font-weight: bold; background-color: #520000 } /* Comment.Special */
  .documentation-section .highlight .gd { color: #d22323 } /* Generic.Deleted */
  .documentation-section .highlight .ge { color: #d0d0d0; font-style: italic } /* Generic.Emph */
  .documentation-section .highlight .gr { color: #d22323 } /* Generic.Error */
  .documentation-section .highlight .gh { color: #ffffff; font-weight: bold } /* Generic.Heading */
  .documentation-section .highlight .gi { color: #589819 } /* Generic.Inserted */
  .documentation-section .highlight .go { color: #cccccc } /* Generic.Output */
  .documentation-section .highlight .gp { color: #aaaaaa } /* Generic.Prompt */
  .documentation-section .highlight .gs { color: #d0d0d0; font-weight: bold } /* Generic.Strong */
  .documentation-section .highlight .gu { color: #ffffff; text-decoration: underline } /* Generic.Subheading */
  .documentation-section .highlight .gt { color: #d22323 } /* Generic.Traceback */
  .documentation-section .highlight .kc { color: #6ab825; font-weight: bold } /* Keyword.Constant */
  .documentation-section .highlight .kd { color: #6ab825; font-weight: bold } /* Keyword.Declaration */
  .documentation-section .highlight .kn { color: #6ab825; font-weight: bold } /* Keyword.Namespace */
  .documentation-section .highlight .kp { color: #6ab825 } /* Keyword.Pseudo */
  .documentation-section .highlight .kr { color: #6ab825; font-weight: bold } /* Keyword.Reserved */
  .documentation-section .highlight .kt { color: #6ab825; font-weight: bold } /* Keyword.Type */
  .documentation-section .highlight .ld { color: #d0d0d0 } /* Literal.Date */
  .documentation-section .highlight .m { color: #3677a9 } /* Literal.Number */
  .documentation-section .highlight .s { color: #ed9d13 } /* Literal.String */
  .documentation-section .highlight .na { color: #bbbbbb } /* Name.Attribute */
  .documentation-section .highlight .nb { color: #24909d } /* Name.Builtin */
  .documentation-section .highlight .nc { color: #447fcf;} /* Name.Class */
  .documentation-section .highlight .no { color: #40ffff } /* Name.Constant */
  .documentation-section .highlight .nd { color: #ffa500 } /* Name.Decorator */
  .documentation-section .highlight .ni { color: #d0d0d0 } /* Name.Entity */
  .documentation-section .highlight .ne { color: #bbbbbb } /* Name.Exception */
  .documentation-section .highlight .nf { color: #447fcf } /* Name.Function */
  .documentation-section .highlight .nl { color: #d0d0d0 } /* Name.Label */
  .documentation-section .highlight .nn { color: #447fcf;} /* Name.Namespace */
  .documentation-section .highlight .nx { color: #d0d0d0 } /* Name.Other */
  .documentation-section .highlight .py { color: #d0d0d0 } /* Name.Property */
  .documentation-section .highlight .nt { color: #6ab825; font-weight: bold } /* Name.Tag */
  .documentation-section .highlight .nv { color: #40ffff } /* Name.Variable */
  .documentation-section .highlight .ow { color: #6ab825; font-weight: bold } /* Operator.Word */
  .documentation-section .highlight .w { color: #666666 } /* Text.Whitespace */
  .documentation-section .highlight .mb { color: #3677a9 } /* Literal.Number.Bin */
  .documentation-section .highlight .mf { color: #3677a9 } /* Literal.Number.Float */
  .documentation-section .highlight .mh { color: #3677a9 } /* Literal.Number.Hex */
  .documentation-section .highlight .mi { color: #3677a9 } /* Literal.Number.Integer */
  .documentation-section .highlight .mo { color: #3677a9 } /* Literal.Number.Oct */
  .documentation-section .highlight .sa { color: #ed9d13 } /* Literal.String.Affix */
  .documentation-section .highlight .sb { color: #ed9d13 } /* Literal.String.Backtick */
  .documentation-section .highlight .sc { color: #ed9d13 } /* Literal.String.Char */
  .documentation-section .highlight .dl { color: #ed9d13 } /* Literal.String.Delimiter */
  .documentation-section .highlight .sd { color: #ed9d13 } /* Literal.String.Doc */
  .documentation-section .highlight .s2 { color: #ed9d13 } /* Literal.String.Double */
  .documentation-section .highlight .se { color: #ed9d13 } /* Literal.String.Escape */
  .documentation-section .highlight .sh { color: #ed9d13 } /* Literal.String.Heredoc */
  .documentation-section .highlight .si { color: #ed9d13 } /* Literal.String.Interpol */
  .documentation-section .highlight .sx { color: #ffa500 } /* Literal.String.Other */
  .documentation-section .highlight .sr { color: #ed9d13 } /* Literal.String.Regex */
  .documentation-section .highlight .s1 { color: #ed9d13 } /* Literal.String.Single */
  .documentation-section .highlight .ss { color: #ed9d13 } /* Literal.String.Symbol */
  .documentation-section .highlight .bp { color: #24909d } /* Name.Builtin.Pseudo */
  .documentation-section .highlight .fm { color: #447fcf } /* Name.Function.Magic */
  .documentation-section .highlight .vc { color: #40ffff } /* Name.Variable.Class */
  .documentation-section .highlight .vg { color: #40ffff } /* Name.Variable.Global */
  .documentation-section .highlight .vi { color: #40ffff } /* Name.Variable.Instance */
  .documentation-section .highlight .vm { color: #40ffff } /* Name.Variable.Magic */
  .documentation-section .highlight .il { color: #3677a9 } /* Literal.Number.Integer.Long */

  pre code, pre {
    font-size: inherit;
    color: #d3d3d3;
    word-break: normal;
  }

  .rouge-table pre{
  padding: 0;
  }

  .highlight pre{
    background-color: rgb(33, 33, 48);
    border-radius: 0;
  }
  .documentation-section.three-col .code-box .highlight {
    /* margin: 0 0 1.875rem;
    background-color: #605f6e;
    color: #fff;
    line-height: 1.5; */
    border-radius: 4px;
  }

  @media (min-width: 768px) {
    .language-list {
      line-height: 2;
      margin: 0 -.3125rem .625rem;
      -ms-flex-pack: start;
      justify-content: flex-start;
    }

    .items:nth-child(11) .text-holder, .items:nth-child(7) .text-holder{
      font-size: 24px;
    }
  }
  .language-list.nav-tabs {
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0;
    padding: 1rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    background: rgb(42, 42, 60);
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
        					<style>
.tab-container {
    background: white;
    box-shadow: 0 2px 4px 0 rgba(62, 62, 62, 0.5);
}
ul.nav.nav-tabs {
    justify-content: left;
    padding: 15px 0;
}
ul.nav.nav-tabs li a {
    padding: 2px 15px;
    border: 1px solid #969292;
    margin: 0 0 0 15px;
    border-radius: 30px;
}
ul.nav.nav-tabs li a.active.show {
    background: #ecf0f1;
}
.ul{
display: inline;
}
</style><style>
.nav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
  pre{
    background: rgb(33, 33, 48);
    padding-top: 20px;
  }
</style><h3>Verify the OTP</h3><div class="tab-container">
 &nbsp;<ul class="nav nav-tabs">
 &nbsp; &nbsp;<li class="active"><a data-toggle="tab" href="#home2" class="active show">Python</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu6">C#</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu8">PHP</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu9">Node.js</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu10">Ruby</a></li>
 &nbsp;</ul>

 &nbsp;<div class="tab-content">
 &nbsp; <div id="home2" class="tab-pane in active">
 &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp;@app.route("/checkcode/&lt;number&gt;/&lt;code&gt;")
 &nbsp; &nbsp; &nbsp; &nbsp;def check_code(number, code):
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"""
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;check_code(number, code) accepts a number and the code entered by the user and
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;tells if the code entered for that number is correct or not
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"""

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;original_code = current_app.redis.get("number:%s:code" % number)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if original_code == code: &nbsp;# verification successful, delete the code
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;current_app.redis.delete("number:%s:code" % number)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return (jsonify({"status": "success", "message": "codes match, number verified"}),200,)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;elif original_code != code:
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return (
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;jsonify(
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"status": "rejected",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"message": "codes do not match, number not verified",
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;),
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;404,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;else:
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return (jsonify({"status": "failed", "message": "number not found"}), 500)
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; </div>
 &nbsp; <div id="menu6" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;public string Index(string number, string code)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(_configuration.GetValue&lt;string&gt;("RedisHost"));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;IDatabase conn = redis.GetDatabase();

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;string key = $"number:{number}:code";
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var compare_code = (string)conn.StringGet(key);
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;if (compare_code == code)
 &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp;conn.KeyDelete(key);
 &nbsp; &nbsp; &nbsp; &nbsp;Verification verification = new Verification();
 &nbsp; &nbsp; &nbsp; &nbsp;verification.status = "success";
 &nbsp; &nbsp; &nbsp; &nbsp;verification.message = "Number verified";
 &nbsp; &nbsp; &nbsp; &nbsp;string output = JsonConvert.SerializeObject(verification);
 &nbsp; &nbsp; &nbsp; &nbsp;return output;
 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;else if(compare_code != code)
 &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; Verification verification = new Verification();
 &nbsp; &nbsp; &nbsp; &nbsp; verification.status = "failure";
 &nbsp; &nbsp; &nbsp; &nbsp; verification.message = "Number not verified";
 &nbsp; &nbsp; &nbsp; &nbsp; string output = JsonConvert.SerializeObject(verification);
 &nbsp; &nbsp; &nbsp; &nbsp; return output;
 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;​			
 &nbsp; &nbsp; &nbsp; &nbsp;else
 &nbsp; &nbsp; &nbsp; &nbsp;{
 &nbsp; &nbsp; &nbsp; &nbsp; Verification verification = new Verification();
 &nbsp; &nbsp; &nbsp; &nbsp; verification.status = "failure";
 &nbsp; &nbsp; &nbsp; &nbsp; verification.message = "number not found";
 &nbsp; &nbsp; &nbsp; &nbsp; string output = JsonConvert.SerializeObject(verification);
 &nbsp; &nbsp; &nbsp; &nbsp; return output;
 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; </div>
 &nbsp; <div id="menu8" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<!--?php
         /**
         * Initiate Validation process
         * @param $param[2] route param(Phone number) from index.php
         * @param $param[3] route param(OTP entered by user) from index.php
         */
             $number = $param[2];
             $code   = $param[3];

         $original_code = $client--->get('number:' . $number . ':code');
 &nbsp; &nbsp; &nbsp; &nbsp; 
 &nbsp; &nbsp; &nbsp; &nbsp; if ($original_code == $code) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $client-&gt;del('number:' . $number . ':code');
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo '{"status": "success", "message": "codes match, number verified"}';
 &nbsp; &nbsp; &nbsp; &nbsp; } elseif ($original_code != $code) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo '{"status": "failure", "message": "codes do not match, number not verified"}';
 &nbsp; &nbsp; &nbsp; &nbsp; } else {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo '{"status": "failure", "message": "number not found"}';
 &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp; ?&gt;
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; </div>
 &nbsp; <div id="menu9" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;router.get('/checkcode/:number/:code', function(req, res) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;const number = (req.params.number);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;const code = (req.params.code);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;redisClient.get(`number:${number}:code`, function(err, OriginalCode) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if (OriginalCode == code) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;redisClient.del(`number:${number}:code`);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;res.send(JSON.stringify({
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'status': 'success',
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'message': 'codes match, number verified'
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} else if (OriginalCode != code) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;res.send(JSON.stringify({
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'status': 'failure',
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'message': 'codes do not match, number not verified'
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} else {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;res.send(JSON.stringify({
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'status': 'failure',
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'message': 'number not found'
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; </div>
 &nbsp; <div id="menu10" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;get '/checkcode/:number/:code' do
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;##
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;# Validates the code entered by the user
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;#
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;number = params['number']
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;code = params['code']
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;original_code = r.get('number:%s:code' % number)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;content_type :json
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if original_code == code
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;r.del('number:%s:code' % number) &nbsp;# verification successful, delete the code
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return { status: 'success', message: 'codes match, number verified' }.to_json
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;elsif original_code != code
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return { status: 'failure', message: 'codes do not match, number not verified' }.to_json
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;else
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return { status: 'rejected', message: 'number not found' }.to_json
 &nbsp; &nbsp; &nbsp; &nbsp;end
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; </div>
 &nbsp; <div id="menu5" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp;def initiate_phlo(dst_number, mode)
 &nbsp; &nbsp; &nbsp; &nbsp;code = rand(999_999)
 &nbsp; &nbsp; &nbsp; &nbsp;begin
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phlo = @phloclient.phlo.get(@phlo_id)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;# parameters set in PHLO - params
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;params = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;from: @app_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;to: dst_number,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;otp: code,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;mode: mode
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;phlo.run(params)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;code
 &nbsp; &nbsp; &nbsp; &nbsp;rescue PlivoRESTError =&gt; e
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;puts 'Exception: ' + e.message
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;end
 &nbsp; &nbsp; &nbsp; &nbsp;end
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; </div>
</div>
</div><p>The finished application should look like this.</p><h2>Simple and reliable</h2><p>Edit the sample application to see how simple it was to code. Our simple APIs work in tandem with our comprehensive global network. Plivo’s premium direct routes guarantee highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — sign up for a free trial account.</p>
