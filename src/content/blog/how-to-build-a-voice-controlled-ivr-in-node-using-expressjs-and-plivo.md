---
title: "How to Build a Voice-controlled Virtual Assistant (IVR) in Node.js Using Express.js and Plivo"
description: "Voice API | Plivo | You can get started to build a Voice-controlled Virtual Assistant (IVR) in Node.js Using Express.js and Plivo"
pubDate: "2021-07-22T00:00:00.000Z"
updatedDate: "2024-07-08T09:10:07.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811fe7a8f20e02e686cbda_ivr-node.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811fe7a8f20e02e686cbda_ivr-node.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["node-js-sdk", "voice-api", "how-to", "ivr"]
seoTitle: "How to Build a Voice-controlled Virtual Assistant (IVR) in Node.js Using Express.js and Plivo"
webflowItemId: "658120c26576707c72c8fdfa"
---
<p>A virtual assistant can help your business if you have clients who call your phone number. <a href="https://en.wikipedia.org/wiki/Interactive_voice_response">Interactive voice response</a> (IVR) helps you to automate call reception by routing callers to the most appropriate department or the agent most qualified to meet their needs. Among its many advantages, IVR can provide increased operational efficiency, a stronger brand image, and better customer insights.</p><p>A voice-controlled virtual assistant is one step ahead of the legacy Touch-Tone/DTMF controlled one because of the flexibility it allows end users. They can just speak into their phone’s microphone to provide input to control the call.</p><p>Building a voice-controlled virtual assistant using Plivo’s <a href="https://www.plivo.com/voice/automatic-speech-recognition/">automatic speech recognition</a> (ASR) feature in <a href="https://www.plivo.com/docs/sdk/server/node-sdk/">Node.js</a> using <a href="https://expressjs.com/">Express.js</a> is simple. This guide shows you how to set up a voice-controlled IVR phone tree to a Plivo number and manage the call flow when the call reaches the <a href="https://plivo.com/voice/">Plivo voice platform</a>. To see how to do this, we’ll build an Express.js application to <a href="https://plivo.com/docs/voice/use-cases/receive-incoming-calls/node/">receive an incoming call</a> and use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech input and implement a simple IVR phone system.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://www.npmjs.com/package/express">Expressjs</a> and <a href="https://www.npmjs.com/package/plivo">Plivo</a> npm packages — run npm i -S plivo express body-parser to install them.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure style="max-width:1446px" data-rt-max-width="1446px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810dcb5c7a0752bc0d1521_receive-speech.png" alt="Receive Speech Inputs" width="auto" height="auto" loading="auto"></div></figure><h2>Create an Express.js application to create a voice-controlled virtual assistant</h2><p>Once you’ve installed Express.js and the Plivo Node.js SDK, create a simple Express.js application to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The Node.js SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech inputs and implement a simple IVR phone system. Use this code:</p><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/rainbow.min.css">


<style>
.hljs{background: rgb(33, 33, 48);}
</style>


<pre> &nbsp; &nbsp; &nbsp; &nbsp;<code>
var plivo = require('plivo');

var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// &nbsp;Welcome message - firstbranch

var WelcomeMessage = "Welcome to the demo app, Say Sales to talk to our Sales representative. Say Support to talk to our Support representative"

// This is the message that Plivo reads when the caller does nothing at all

var NoInput = "Sorry, I didn't catch that. Please hangup and try again later."

// This is the message that Plivo reads when the caller inputs a wrong digit.

var WrongInput = "Sorry, it's a wrong input."

app.all('/response/ivr/', function (request, response) {

 if (request.method == "GET") {

 &nbsp;var r = new plivo.Response();

 &nbsp;const get_input = r.addGetInput(

 &nbsp; {

 &nbsp; &nbsp;'action': 'https://'+request.hostname+'/multilevelivr/firstbranch/',

 &nbsp; &nbsp;'method': 'POST',

 &nbsp; &nbsp;'interimSpeechResultsCallback': 'https://'+request.hostname+'/multilevelivr/firstbranch/',

 &nbsp; &nbsp;'interimSpeechResultsCallbackMethod': 'POST',

 &nbsp; &nbsp;'inputType': 'speech',

 &nbsp; &nbsp;'redirect': 'true',

 &nbsp; });

 &nbsp;get_input.addSpeak(WelcomeMessage);

 &nbsp;r.addSpeak(NoInput);

 &nbsp;console.log(r.toXML());

 &nbsp;response.set({ 'Content-Type': 'text/xml' });

 &nbsp;response.end(r.toXML());

 }

});

app.all('/multilevelivr/firstbranch/', function (request, response) {

 var from_number = request.query.From;

 var speech = request.query.Speech;

 console.log("Speech Input is:", speech)

 var r = new plivo.Response();

 var params = {

 &nbsp;'action': 'https://'+request.hostname+'/multilevelivr/action/',

 &nbsp;'method': 'POST',

 &nbsp;'redirect': 'false',

 &nbsp;'callerId': from_number

 };

 var dial = r.addDial(params);

 if (speech == "sales") {

 &nbsp;dial.addNumber("14156667777");

 &nbsp;console.log(r.toXML());

 }

 else if (speech == "support") {

 &nbsp;dial.addNumber("14156667778");

 &nbsp;console.log(r.toXML());

 }

 else {

 &nbsp;r.addSpeak(WrongInput);

 }

 response.set({ 'Content-Type': 'text/xml' });

 response.end(r.toXML());

});

app.listen(app.get('port'), function () {

 console.log('Node app is running on port', app.get('port'));

});


 &nbsp; &nbsp; &nbsp; &nbsp;</code>

</pre><h2>Test the code locally</h2><p>Save this code in any file (name the file something like detect_speech.js). To run this file on the server, go to the folder where this file resides and use the following command:</p><style>
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>node detect_speech.js
</code></pre></div></div><p>And you should see your basic server app in action on http://localhost:3000/response/ivr/</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive calls (5000 in this case, as our local Express.js application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure style="max-width:1748px" data-rt-max-width="1748px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65812032fe202571eff6c626_ngrok-cli-va-express.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://02a9fe62aabd.ngrok.io/detect_speech) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:2768px" data-rt-max-width="2768px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65812032a229aefed96f8e7a_xml-doc-va-express.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Express.js application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to activate the voice-controlled virtual assistant.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Virtual-Assistant” — and configured the ngrok URL https://02a9fe62aabd.ngrok.io/detect_speech as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2770px" data-rt-max-width="2770px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581204a0000cb93c293505f_create-app-va-express.png" alt="Create Plivo App for voice-controlled IVR Laravel app" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure style="max-width:2778px" data-rt-max-width="2778px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810e2c84a5125d94dbe715_assign-app-virtual-assistant.png" alt="Assign Virtual-Assistant Plivo App" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the VirtualAssistant Express.js application automatically routes the call to the Sales and Support departments based on the speech inputs received on the call.</p><p>And that’s how simple it is to set up a voice-controlled virtual assistant on a Plivo number and handle it using XML documents using Plivo’s Node.js SDK and an Express.js application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/node/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/node/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/node/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
