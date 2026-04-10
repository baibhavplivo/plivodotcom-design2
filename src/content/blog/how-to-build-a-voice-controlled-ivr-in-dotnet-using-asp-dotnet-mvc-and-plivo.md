---
title: "How to Build a Voice-controlled Virtual Assistant (IVR) in .NET with ASP.NET MVC and Plivo"
description: "Voice API | Plivo | You can get started to build a Voice-controlled Virtual Assistant (IVR) in .NET with ASP.NET MVC and Plivo"
pubDate: "2021-08-05T00:00:00.000Z"
updatedDate: "2024-07-08T09:36:24.000Z"
image: "/images/blog/65811c0021862a981f77ef02_ivr-dotnet.png"
thumbnail: "/images/blog/65811c0021862a981f77ef02_ivr-dotnet.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["net-sdk", "voice-api", "how-to", "ivr"]
seoTitle: "How to Build a Voice-controlled Virtual Assistant (IVR) in .NET with ASP.NET MVC and Plivo"
webflowItemId: "65811ceca229aefed96dd5ab"
---
<p>A virtual assistant can help your business if you have clients who call your phone number. <a href="https://en.wikipedia.org/wiki/Interactive_voice_response">Interactive voice response</a> (IVR) helps you to automate call reception by routing callers to the most appropriate department or the agent most qualified to meet their needs. Among its many advantages, IVR can provide increased operational efficiency, a stronger brand image, and better customer insights.</p><p>A voice-controlled virtual assistant is one step ahead of the legacy Touch-Tone/DTMF controlled one because of the flexibility it allows end users. They can just speak into their phone’s microphone to provide input to control the call.</p><p>Building a voice-controlled virtual assistant using Plivo’s <a href="https://www.plivo.com/voice/automatic-speech-recognition/">automatic speech recognition</a> (ASR) feature in <a href="https://dotnet.microsoft.com/">.NET</a> using <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">ASP.NET MVC</a> is simple. This guide shows you how to set up a voice-controlled IVR phone tree to a Plivo number and manage the call flow when the call reaches the <a href="https://plivo.com/voice/">Plivo voice platform</a>. To see how to do this, we’ll build an ASP.NET MVC application to <a href="https://plivo.com/docs/voice/use-cases/receive-incoming-calls/dotnet/">receive an incoming call</a> and use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech input and implement a simple IVR phone system.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">ASP.NET MVC</a> application and <a href="https://www.nuget.org/packages/Plivo/">Plivo</a> NuGet package.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure><div><img src="/images/blog/65810dcb5c7a0752bc0d1521_receive-speech.png" alt="Receive Speech Inputs" width="auto" height="auto" loading="auto"></div></figure><h2>Create an ASP.NET MVC application to create a voice-controlled virtual assistant</h2><p>Once you’ve created the ASP.NET MVC application using this <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-5.0&amp;tabs=visual-studio">tutorial</a>, you can add the Plivo .NET SDK using the NuGet package manager. <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-controller?view=aspnetcore-5.0&amp;tabs=visual-studio">Create a Controller</a>, name it VirtualassistantController.cs to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The .NET SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML</a> element to capture speech inputs and implement a simple IVR phone system. Use this code:</p><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/rainbow.min.css">


<style>
.hljs{background: rgb(33, 33, 48);}
</style>


<pre> &nbsp; &nbsp; &nbsp; &nbsp;<code>
using System ;
 &nbsp; &nbsp;using System.Collections.Generic ;
 &nbsp; &nbsp;using System.Diagnostics ;
 &nbsp; &nbsp;using Microsoft.AspNetCore.Mvc ;
 &nbsp; &nbsp;using Plivo.XML ;
 &nbsp; &nbsp;
 &nbsp; &nbsp;namespace VirtualAssistant.Controllers
 &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp;public class VirtualassistantController :Controller
 &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// &nbsp;Welcome message - firstbranch
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;StringWelcomeMessage = "Welcome to the demo app, Say Sales to talk to our Sales representative. Say Support to talk to our Support representative" ;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// This is the message that Plivo reads when the caller does nothing at all
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;StringNoInput = "Sorry, I didn't catch that. Please hangup and try again later." ;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// This is the message that Plivo reads when the caller inputs a wrong digit.
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;StringWrongInput = "Sorry, it's a wrong input." ;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;publicIActionResult Index ()
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;arresp =new Response ();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// This will dynamically assign the ngrok http_host to the action URL and interimSpeechResultsCallback URL.
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; varhostName =Request .HttpContext .Request .Host .Value ;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Console . WriteLine (hostName );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;GetInputget_input =new GetInput ( "" ,newDictionary &lt; string , string &gt;() {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "action" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "https://" +hostName + "/virtualassistant/firstbranch/"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }, {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "method" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "POST"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }, {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "interimSpeechResultsCallback" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "https://" +hostName + "/virtualassistant/firstbranch/"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }, {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "interimSpeechResultsCallbackMethod" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "POST"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }, {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "inputType" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "speech"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }, {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "redirect" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "true"
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; });
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;resp . Add (get_input );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;get_input . AddSpeak (WelcomeMessage ,newDictionary &lt; string , string &gt;() { });
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;resp . AddSpeak (NoInput ,newDictionary &lt; string , string &gt;() { });
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; varoutput =resp . ToString ();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;returnthis . Content (output , "text/xml" );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// First branch of IVR phone tree
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;publicIActionResult FirstBranch ()
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Stringspeech =Request .Form [ "Speech" ];
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;StringFromNumber =Request .Form [ "From" ];
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Debug . WriteLine ( "Speech Input is :" +speech );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Dialdial =new Dial (newDictionary &lt; string , string &gt;() {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "callerId" ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;FromNumber
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; });
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; varresp =new Response ();
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if (speech == "sales" )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;dial . AddNumber ( "14156667777" ,newDictionary &lt; string , string &gt;() { });
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;resp . Add (dial );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;elseif (speech == "support" )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;dial . AddNumber ( "14156667778" ,newDictionary &lt; string , string &gt;() { });
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;resp . Add (dial );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;else
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// Add Speak XML Tag
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;resp . AddSpeak (WrongInput ,newDictionary &lt; string , string &gt;() { });
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Debug . WriteLine (resp . ToString ());
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; varoutput =resp . ToString ();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;returnthis . Content (output , "text/xml" );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp; }
 &nbsp; &nbsp; }
 &nbsp; &nbsp; &nbsp; &nbsp;</code>

</pre><p><strong>Note</strong>: Before starting the app, you have to update Properties/launchSettings.json by setting the applicationUrl asTest the code locally</p><style>
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
<div class="language-json highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nl">"applicationUrl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"http://localhost:5000/"</span><span class="w">
</span></code></pre></div></div><p>Save the file and run the application. You should see your basic server app in action on http://localhost:5000/virtualassistant/</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive calls (5000 in this case, as our local ASP.NET MVC application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 5000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="/images/blog/65811c46b5ff0b77ba841508_ngrok-cli-va-dotnet.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://b22604cbb5ff.ngrok.io/virtualassistant/) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="/images/blog/65811c46889af86635afac62_xml-doc-va-dotnet.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the ASP.NET MVC application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to activate the voice-controlled virtual assistant.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Virtual-Assistant” — and configure the ngrok URL https://b22604cbb5ff.ngrok.io/virtualassistant/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="/images/blog/65811c7f632d5c150906259f_create-app-va-dotnet.png" alt="Create Plivo App for voice-controlled IVR MVC app" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="/images/blog/65810e2c84a5125d94dbe715_assign-app-virtual-assistant.png" alt="Assign Virtual-Assistant Plivo App" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the VirtualAssistant ASP.NET MVC application automatically routes the call to the Sales and Support departments based on the speech inputs received on the call.</p><p>And that’s how simple it is to set up a voice-controlled virtual assistant on a Plivo number and handle it using XML documents using Plivo’s .NET SDK and an ASP.NET MVC application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/dotnet/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/dotnet/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/dotnet/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
