---
title: "Introducing Authentication for Call Recordings"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2018-09-02T00:00:00.000Z"
updatedDate: "2025-05-19T11:45:41.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6583c7bbefe94c7457665b45_introducing-authentication-for-call-recordings.png"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6583c7bbefe94c7457665b45_introducing-authentication-for-call-recordings.png"
authorName: "Team Plivo"
featured: true
noindex: true
categories: ["security"]
seoTitle: "Introducing Authentication for Call Recordings"
webflowItemId: "6583c8caf31288d455a28001"
---
<p>Each call recording on Plivo is stored encrypted with a unique hard-to-guess URL. Users who have the proper access rights to the URL can download and listen to the call recordings. This setup works for most customers that need to share recordings with third-party service providers or applications for post processing, including voice analytics. Some customers, however, need to comply with industry guidelines or regional regulations for data protection, and therefore require a stronger security mechanism for accessing and sharing call recordings. Plivo’s new authentication for call recordings offers an additional layer of security.</p><p>When you log in to your Plivo console and navigate to Voice &gt; <a href="https://console.plivo.com/voice/settings/recordings/">Recordings</a>, you can see that basic auth for recording URLs is disabled by default. We do this to ensure that we don’t break any of our customers’ console settings by enabling authentication as a default option.</p><figure style="max-width:974px" data-rt-max-width="974px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583c86690180e4e0681862b_accessing-call-recordings-by-default.png" alt="Accessing Call" width="auto" height="auto" loading="auto"></div></figure><p>Here are a few code samples to fetch call recordings when auth is disabled:</p><div class="tab-container">
 &nbsp;<ul class="nav nav-tabs">
 &nbsp; &nbsp;<li class="active"><a data-toggle="tab" href="#home" class="active show">cURL</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu1">.Java</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu2">Python</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu3">PHP</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu4">.Node</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu5">Ruby</a></li>
 &nbsp;</ul>

 &nbsp; &nbsp;<div class="tab-content">
 &nbsp; &nbsp; &nbsp;<div id="home" class="tab-pane in active">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; curl -X GET \
 &nbsp; &nbsp; &nbsp; &nbsp;https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3 \
 &nbsp; &nbsp; &nbsp; &nbsp;-H 'cache-control: no-cache'
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu1" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp;OkHttpClient client = new OkHttpClient();
 &nbsp; &nbsp; &nbsp;Request request = new Request.Builder()
 &nbsp; &nbsp; &nbsp; &nbsp;.url("https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3")
 &nbsp; &nbsp; &nbsp; &nbsp;.get()
 &nbsp; &nbsp; &nbsp; &nbsp;.build();
 &nbsp; &nbsp; &nbsp;Response response = client.newCall(request).execute();
 &nbsp; &nbsp; &nbsp;FileOutputStream fos = new FileOutputStream("/var/tmp/file.mp3");
 &nbsp; &nbsp; &nbsp;fos.write(response.body().bytes());
 &nbsp; &nbsp; &nbsp;fos.close();
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu2" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp;import requests
 &nbsp; &nbsp; &nbsp;url = "https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3"
 &nbsp; &nbsp; &nbsp;r = requests.get(url, stream=True)
 &nbsp; &nbsp; &nbsp;with open(local_filename, 'wb') as f:
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;for chunk in r.iter_content(chunk_size=1024):
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if chunk: # filter out keep-alive new chunks
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;f.write(chunk)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return local_filename
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu3" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp;&lt;?php
 &nbsp; &nbsp; &nbsp;$request = new HttpRequest();
 &nbsp; &nbsp; &nbsp;$request-&gt;setUrl('https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3');
 &nbsp; &nbsp; &nbsp;$request-&gt;setMethod(HTTP_METH_GET);
 &nbsp; &nbsp; &nbsp;try {
 &nbsp; &nbsp; &nbsp; &nbsp;$response = $request-&gt;send();
 &nbsp; &nbsp; &nbsp; &nbsp;echo $response-&gt;getBody();
 &nbsp; &nbsp; &nbsp;} catch (HttpException $ex) {
 &nbsp; &nbsp; &nbsp; &nbsp;echo $ex;
 &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu4" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp;var request = require("request");
 &nbsp; &nbsp; &nbsp;var fs = require('fs');
 &nbsp; &nbsp; &nbsp;var url = "https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3";
 &nbsp; &nbsp; &nbsp;var file = fs.createWriteStream("file.mp3");
 &nbsp; &nbsp; &nbsp;var request = http.get(url, function(response) {
 &nbsp; &nbsp; &nbsp; &nbsp;response.pipe(file);
 &nbsp; &nbsp; &nbsp; &nbsp;file.on('finish', function() {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file.close(cb); // close() is async, call cb after close completes.
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp; &nbsp;}).on('error', function(err) { // Handle errors
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;fs.unlink(dest); // Delete the file async. (But we don't check the result)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if (cb) cb(err.message);
 &nbsp; &nbsp; &nbsp; &nbsp;});
 &nbsp; &nbsp; &nbsp;}; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu5" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp;require 'open-uri'
 &nbsp; &nbsp; &nbsp;download = open(https://media.plivo.com/AUTH_ID/Recording/RECORDING_UUID.mp3)
 &nbsp; &nbsp; &nbsp;IO.copy_stream(download, '~/my_file.mp3')
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
</style><h2>Enabling authentication for recordings</h2><p>‍</p><p>When you enable basic auth for recordings, Plivo authenticates all API requests for the recording resources hosted on our platform, and you must use your Auth ID and Auth Token to access call recordings. As a best practice, we recommend you enable auth if you don’t have to share your media files publicly. Enabling this feature has other advantages, such as adhering to regulations and compliance for specific regions, providing secure access to authorized personnel, and protecting your media files from public access.</p><p>Account admins can enable or disable auth settings at any time.</p><figure style="max-width:1153px" data-rt-max-width="1153px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583c87b0a684cf2454f9912_enabling-auth-for-recordings.png" alt="Enabling auth-for-recordings" width="auto" height="auto" loading="auto"></div></figure><p>Here are a few code samples to fetch call recordings once you enable basic auth:</p><div class="tab-container">
 &nbsp;<ul class="nav nav-tabs">
 &nbsp; &nbsp;<li class="active"><a data-toggle="tab" href="#home2" class="active show">cURL</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu6">.Java</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu7">Python</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu8">PHP</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu9">.Node</a></li>
 &nbsp; &nbsp;<li><a data-toggle="tab" href="#menu10">Ruby</a></li>
 &nbsp;</ul>

 &nbsp; &nbsp;<div class="tab-content">
 &nbsp; &nbsp; &nbsp;<div id="home2" class="tab-pane in active">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;curl -i --user AUTH_ID:AUTH_TOKEN \
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;https://media.plivo.com/v1/Account/AUTH_ID/Recording/RECORDING.mp3 \
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-H 'cache-control: no-cache'
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu6" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;OkHttpClient client = new OkHttpClient.Builder().authenticator((route, response) -&gt; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;String credential = Credentials.basic("&lt;auth_id&gt;", "&lt;auth_token&gt;");
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return response.request().newBuilder().header("Authorization", credential).build();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}).build();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Request request = new Request.Builder()
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.url("https://media.plivo.com/v1/Account/{AUTH_ID}/Recording/{RECORDING_UUID}.mp3")
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.get()
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.build();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Response response = client.newCall(request).execute();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;FileOutputStream fos = new FileOutputStream("/var/tmp/file.mp3");
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;fos.write(response.body().bytes());
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;fos.close();
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu7" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;import requests
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;def download_file(): &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;url = "https://media.plivo.com/v1/Account/AUTH_ID/Recording/RECORDING.mp3"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;local_filename = url.split('/')[-1] &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;r = requests.get(url, stream=True, auth=('AUTH_ID', 'AUTH_TOKEN'))
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;with open(local_filename, 'wb') as f:
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;for chunk in r.iter_content(chunk_size=1024):
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if chunk: # filter out keep-alive new chunks
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;f.write(chunk)
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return local_filename
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if __name__ == "__main__":
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;download_file()
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu8" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;?PHP
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$request = new HttpRequest();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$username = "&lt;auth_id&gt;";
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$password = "&lt;auth_token&gt;";
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$request-&gt;setUrl('https://media.plivo.com/v1/Account/AUTH_ID/Recording/RECORDING.mp3');
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$request-&gt;setMethod(HTTP_METH_GET);
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$request-&gt;setHeaders(array(
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'header' =&gt; "Authorization: Basic " . base64_encode("$username:$password") &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;try {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$response = $request-&gt;send();
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if ($r-&gt;getResponseCode() == 200) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file_put_contents('sample.mp3', $r-&gt;getResponseBody());
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} catch (HttpException $ex) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;echo $ex;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu9" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;var fs = require('fs'),
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;request = require('request');
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;request
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.get('https://media.plivo.com/v1/Account/AUTH_ID/Recording/RECORDING.mp3', {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'auth': {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'user': 'AUTH_ID',
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'pass': 'AUTH_TOKEN',
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;})
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.on('error', function(err) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// handle error
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;})
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.pipe(fs.createWriteStream('sample.mp3'));
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="menu10" class="tab-pane fade">
 &nbsp; &nbsp; &nbsp; &nbsp;<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;require 'open-uri'
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;File.open('sample.mp3', "wb") do |file|
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;file.write open('https://media.plivo.com/v1/Account/MAMTK2MGFHNTVINWQYZT/Recording/98b8aece-93d6-11e8-9476-06f687d7a22c.mp3',
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:http_basic_authentication =&gt; ['MAMTK2MGFHNTVINWQYZT', 'N2FmNzdhMTc2ZmY5MWEyNzhhMDk1YWEwODM4NzIx']).read
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;puts 'file is downloaded'
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;end
 &nbsp; &nbsp; &nbsp; &nbsp;</pre>
 &nbsp; &nbsp; &nbsp; &nbsp;</div>
 &nbsp; &nbsp;</div>
</div><p>Authentication is applicable only to call recordings made after May 24. Earlier recordings cannot be authenticated.</p><p>For more information about call recordings, see our <a href="https://www.plivo.com/docs/voice/use-cases/record-calls/node/">documentation</a>.<br></p>
