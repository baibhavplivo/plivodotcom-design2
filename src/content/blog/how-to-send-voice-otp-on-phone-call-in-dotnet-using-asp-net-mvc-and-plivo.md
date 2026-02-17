---
title: "How to Send Voice OTP Using ASP .NET MVC and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-10-28T00:00:00.000Z"
updatedDate: "2024-10-10T00:28:21.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a5e2e875b447ab586a0_otp-dotnet.png"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a5e2e875b447ab586a0_otp-dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "net-sdk", "voice-api", "how-to", "otp"]
seoTitle: "How to Send Voice OTP Using ASP .NET MVC and Plivo"
webflowItemId: "65803b591e4456cfd612e392"
---
<p>You can authenticate a phone number by delivering a one-time password (OTP) via a phone call. To do this, you call the number and read a sequence of digits to the recipient via text-to-speech. To verify the number, the user needs to confirm the digits by entering them using the phone’s keypad.</p><p>Developers commonly use voice OTP to verify new user registrations, online transactions, and login sessions in an app or website. In this blog post, we walk you through a sample implementation of sending a voice OTP using the Plivo's <a href="https://www.plivo.com/voice/">Voice API</a> and <a href="https://www.plivo.com/phlo/">PHLO</a>, our visual workflow builder. Plivo’s direct carrier connectivity and intelligent routing engine guarantee the best call connectivity and quality.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a PHLO to send OTP via phone call</h2><p>PHLO lets you construct your entire use case and build and deploy workflows visually. With PHLO, you pay only for calls you make and receive, and building with PHLO is free.</p><p>To get started, visit <a href="https://console.plivo.com/phlo/list/">PHLO</a> in the Plivo console and click on <strong>Create New PHLO</strong> to build a new PHLO. On the Choose your use case window, click <strong>Build my own</strong>. The PHLO canvas will appear with the Start node. Click on the Start Node, and under API request, fill in the Keys as from, to, and otp, then click <strong>Validate</strong>. From the list of components on the left-hand side, drag and drop the Initial Call component onto the canvas and connect the Start node with the Initiate Call node using the API Request trigger state.</p><p>Configure the Initiate Call node with the using the From field and in the To field. Once you’ve configured a node, click <strong>Validate</strong> to save the configurations. Similarly, create a node for the Play Audio component and connect it to the Initiate Call node using the Answered trigger state. Next, configure the Play Audio node to play a specific message to the user — in this case, “Your verification code is &lt;otp&gt;.” Under Speak Text, click on Amazon Polly and paste the following:</p><style>
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
<div class="language-xml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;Speak</span> <span class="na">voice=</span><span class="s">"Polly.Amy"</span><span class="nt">&gt;</span>
 &nbsp; <span class="nt">&lt;prosody</span> <span class="na">rate=</span><span class="s">"medium"</span><span class="nt">&gt;</span>
 &nbsp; &nbsp; &nbsp;Your verification code is
 &nbsp; &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp; &nbsp;<span class="nt">&lt;break/&gt;</span>
 &nbsp; &nbsp; &nbsp;<span class="nt">&lt;say-as</span> <span class="na">interpret-as=</span><span class="s">"spell-out"</span><span class="nt">&gt;</span>{{Start.http.params.otp}}<span class="nt">&lt;/say-as&gt;</span>
 &nbsp; <span class="nt">&lt;/prosody&gt;</span>
<span class="nt">&lt;/Speak&gt;</span>
</code></pre></div></div><p>Click <strong>Validate</strong> to save.</p><p>Connect the Initiate Call node with the Play Audio node using the Answered trigger state. After you complete the configuration, provide a friendly name for your PHLO and click <strong>Save</strong>.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/advanced-guides/phlo/voice-otp.mp4
 &nbsp;" type="video/mp4">
</video><h3>Set up a .NET Framework app</h3><p>In this section, we’ll walk you through how to set up a .NET Framework app in under five minutes and start handling voice OTP.</p><ul><li>Create an MVC web app.</li></ul><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a8f30cef4d1661737d8_create_mvcapp.png" alt="Create a MVC app" width="auto" height="auto" loading="auto"></div></figure><ul><li>Configure the MVC app and provide a project name.</li></ul><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a8f40908b4dbc74da2c_otp-mvc.png" alt="Configure the MVC app" width="auto" height="auto" loading="auto"></div></figure><ul><li>Install the Plivo NuGet package.</li></ul><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a8f07cfeea33ccaadfa_install_nuget.png" alt="Install Plivo Nuget Package" width="auto" height="auto" loading="auto"></div></figure><ul><li>Install the Redis NuGet package.</li></ul><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a8f4f3eb1aff2eabd91_dotnet-redis.png" alt="Install Redis Nuget Packag" width="auto" height="auto" loading="auto"></div></figure><h3>Trigger the PHLO</h3><p>Once you’ve created and set up your .NET dev envrironment, go to the <a href="https://console.plivo.com/phlo/list/">Plivo consolse</a> and copy the PHLO_ID. You can integrate a PHLO into your application workflow by making an API request to trigger the PHLO with the required payload.</p><p>Navigate to the Controllers directory, create a Controller named otp.cs, and paste into it this code.<br></p><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/rainbow.min.css">


<style>
.hljs{background: rgb(33, 33, 48);}
</style>


<pre> &nbsp; &nbsp; &nbsp; &nbsp;<code>
 &nbsp; &nbsp;1 &nbsp; using System ;
 &nbsp; &nbsp;2 &nbsp; using System.Collections.Generic ; 
 &nbsp; &nbsp;3 &nbsp; using Plivo ;
 &nbsp; &nbsp;4 &nbsp; using StackExchange.Redis ; 
 &nbsp; &nbsp;5 &nbsp; using Microsoft.AspNetCore.Mvc ; 
 &nbsp; &nbsp;6 &nbsp; using Newtonsoft.Json ;
 &nbsp; &nbsp;7
 &nbsp; &nbsp;8 &nbsp; namespace otp.Controllers &nbsp;{ &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;9 &nbsp; &nbsp;public &nbsp;class otp : Controller &nbsp;{ 
 &nbsp; &nbsp;10 &nbsp; public &nbsp;object dispatch_otp &nbsp;String destination_number ) &nbsp;{
 &nbsp; &nbsp;11 &nbsp; &nbsp;ConnectionMultiplexer redis &nbsp;= ConnectionMultiplexer .Connect ("localhost: 6379" );
 &nbsp; &nbsp;12 &nbsp; &nbsp;IDatabase conn &nbsp;= redis .GetDatabase ();
 &nbsp; &nbsp;13
 &nbsp; &nbsp;14 &nbsp; &nbsp;Random r &nbsp;= &nbsp;new Random (); 
 &nbsp; &nbsp;15 &nbsp; &nbsp;var code &nbsp;= r .Next ( 999999 ); 
 &nbsp; &nbsp;16 &nbsp; &nbsp;var phloClient &nbsp;= &nbsp;new PhloApi ("&lt;auth_id&gt;" , "&lt;auth_token&gt;" ); 
 &nbsp; &nbsp;17 &nbsp; &nbsp;var phloID &nbsp;= "phlo_id" ; 
 &nbsp; &nbsp;18 &nbsp; &nbsp;var phlo &nbsp;= phloClient &nbsp;Phlo .Get &nbsp;phloID ); &nbsp;
 &nbsp; &nbsp;19 &nbsp; &nbsp;var data &nbsp;= &nbsp;new Dictionary &lt; string , &nbsp;object &gt; 
 &nbsp; &nbsp;20 &nbsp; &nbsp; { 
 &nbsp; &nbsp;21 &nbsp; &nbsp; &nbsp;{ "from" , "+15671234567" &nbsp;}, 
 &nbsp; &nbsp;22 &nbsp; &nbsp; &nbsp;{ "to" , destination_number &nbsp;}, 
 &nbsp; &nbsp;23 &nbsp; &nbsp; &nbsp;{ "otp" , code &nbsp;}, 
 &nbsp; &nbsp;24 &nbsp; &nbsp; };
 &nbsp; &nbsp;25 &nbsp; &nbsp; Console .WriteLine &nbsp;phlo .Run &nbsp;data )); 
 &nbsp; &nbsp;26 &nbsp; &nbsp; var key &nbsp;= &nbsp;string .Format ("number:{0}:code" , destination_number );
 &nbsp; &nbsp;27 &nbsp; &nbsp; conn .StringSet &nbsp;key , code , TimeSpan .FromSeconds ( 60 ));
 &nbsp; &nbsp;28
 &nbsp; &nbsp;29 &nbsp; &nbsp; Verification verification &nbsp;= &nbsp;new Verification (); 
 &nbsp; &nbsp;30 &nbsp; &nbsp; verification &nbsp;status &nbsp;= "success" ;
 &nbsp; &nbsp;31 &nbsp; &nbsp; verification &nbsp;message &nbsp;= "verification initiated" ; 
 &nbsp; &nbsp;32 &nbsp; &nbsp; string output &nbsp;= JsonConvert .SerializeObject &nbsp;verification ); 
 &nbsp; &nbsp;33 &nbsp; &nbsp; return output ; 
 &nbsp; &nbsp;34 &nbsp; &nbsp; }
 &nbsp; &nbsp;35
 &nbsp; &nbsp;36 &nbsp; &nbsp; public string verify_otp(String destination_number, String otp) {
 &nbsp; &nbsp;37 &nbsp; &nbsp; ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost: 6379");
 &nbsp; &nbsp;38 &nbsp; &nbsp; IDatabase conn = redis.GetDatabase();
 &nbsp; &nbsp;39
 &nbsp; &nbsp;40 &nbsp; &nbsp; &nbsp;string key = $ "number:{destination_number}:code";
 &nbsp; &nbsp;41 &nbsp; &nbsp; &nbsp;var compare_code = (string) conn.StringGet(key);
 &nbsp; &nbsp;42
 &nbsp; &nbsp;43 &nbsp; &nbsp; &nbsp; if (compare_code == otp) {
 &nbsp; &nbsp;44 &nbsp; &nbsp; &nbsp; conn.KeyDelete(key);
 &nbsp; &nbsp;45 &nbsp; &nbsp; &nbsp; Verification verification = new Verification();
 &nbsp; &nbsp;46 &nbsp; &nbsp; &nbsp; verification.status = "success";
 &nbsp; &nbsp;47 &nbsp; &nbsp; &nbsp; verification.message = "Number verified";
 &nbsp; &nbsp;48 &nbsp; &nbsp; &nbsp; string output = JsonConvert.SerializeObject(verification);
 &nbsp; &nbsp;49 &nbsp; &nbsp; &nbsp; return output;
 &nbsp; &nbsp;50 &nbsp; &nbsp; &nbsp; &nbsp;} else if (compare_code != otp) {
 &nbsp; &nbsp;51 &nbsp; &nbsp; &nbsp; &nbsp;Verification verification = new Verification();
 &nbsp; &nbsp;52 &nbsp; &nbsp; &nbsp; &nbsp;verification.status = "failure";
 &nbsp; &nbsp;53 &nbsp; &nbsp; &nbsp; &nbsp;verification.message = "Number not verified";
 &nbsp; &nbsp;54 &nbsp; &nbsp; &nbsp; &nbsp;string output = JsonConvert.SerializeObject(verification);
 &nbsp; &nbsp;55 &nbsp; &nbsp; &nbsp; &nbsp;return output;
 &nbsp; &nbsp;56 &nbsp; &nbsp; &nbsp; &nbsp;} else {
 &nbsp; &nbsp;57 &nbsp; &nbsp; &nbsp; &nbsp;Verification verification = new Verification();
 &nbsp; &nbsp;58 &nbsp; &nbsp; &nbsp; &nbsp;verification.status = "failure";
 &nbsp; &nbsp;59 &nbsp; &nbsp; &nbsp; &nbsp;verification.message = "number not found!";
 &nbsp; &nbsp;60 &nbsp; &nbsp; &nbsp; &nbsp;string output = JsonConvert.SerializeObject(verification);
 &nbsp; &nbsp;61 &nbsp; &nbsp; &nbsp; &nbsp;return output;
 &nbsp; &nbsp;62 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;63
 &nbsp; &nbsp;64 &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;65
 &nbsp; &nbsp;66 &nbsp; &nbsp; private class Verification {
 &nbsp; &nbsp;67 &nbsp; &nbsp; &nbsp; &nbsp;public string status {
 &nbsp; &nbsp;68 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;get;
 &nbsp; &nbsp;69 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;internal set;
 &nbsp; &nbsp;70 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;71 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; public string message {
 &nbsp; &nbsp;72 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; get;
 &nbsp; &nbsp;73 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; internal set;
 &nbsp; &nbsp;74 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp;75 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;76 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;77 &nbsp; &nbsp; } &nbsp;</code>

</pre><p>You can get your Auth ID and Auth Token from the <a href="https://console.plivo.com/dashboard/">console</a>. </p><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="AUTHID" width="auto" height="auto" loading="auto"></div></figure><p>You can find the PHLO_ID on the <a href="https://console.plivo.com/phlo/list/">PHLO Listing</a> page. </p><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65800c3f76d8f053ed9b9dac_Phlo_listing.jpeg" alt="PHLO Listing" width="auto" height="auto" loading="auto"></div></figure><h3>Test</h3><p>Once you have created the Voice OTP app, save the file and run it.</p><figure><div><img src="https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/65803a8f5a28686ed355dfcb_build_app.jpeg" alt="Send Voice OTP" width="auto" height="auto" loading="auto"></div></figure><p>Start Redis.</p><p>$ redis-server<br></p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>redis-server
</code></pre></div></div><p>And you should see your basic server application in action.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://localhost:5001/dispatch_otp/?destination_number=&lt;destination_number&gt;
https://localhost:5001/verify_otp/?destination_number=&lt;destination_number&gt;&amp;otp=&lt;otp&gt;
</code></pre></div></div><p>https://localhost:5001/dispatch_otp/?destination_number=&lt;destination_number&gt;<br>https://localhost:5001/verify_otp/?destination_number=&lt;destination_number&gt;&amp;otp=&lt;otp&gt;<br></p><p>Boom — you’ve made an outbound call with the OTP as a text-to-speech message.</p><h2>Simple and reliable</h2><p>And that’s all there is to send OTP via a phone call using Plivo’s Ruby SDK. Our simple APIs work in tandem with our comprehensive global network. You can also use Plivo’s premium direct routes that guarantee the highest possible delivery rates and the shortest possible delivery times for your 2FA SMS and voice messages. See for yourself — <a href="https://console.plivo.com/accounts/register/">sign up for a free trial account</a>.</p>
