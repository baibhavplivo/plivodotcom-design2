---
title: "How to Build a Voice-Controlled Virtual Assistant (IVR) in PHP Using Laravel and Plivo"
description: "Voice API | Plivo | You can get started to build a Voice-Controlled Virtual Assistant (IVR) in PHP Using Laravel and Plivo"
pubDate: "2021-07-06T00:00:00.000Z"
updatedDate: "2024-07-08T07:49:37.000Z"
image: "/images/blog/6581272023e0ec649f16cf1b_ivr-laravel.png"
thumbnail: "/images/blog/6581272023e0ec649f16cf1b_ivr-laravel.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["php-sdk", "voice-api", "how-to", "ivr"]
seoTitle: "How to Build a Voice-Controlled Virtual Assistant (IVR) in PHP Using Laravel and Plivo"
webflowItemId: "6581286ea05b970358520934"
---
<p>A virtual assistant can help your business if you have clients who call your phone number. <a href="https://en.wikipedia.org/wiki/Interactive_voice_response">Interactive voice response</a> (IVR) helps you to automate call reception by routing callers to the most appropriate department or the agent most qualified to meet their needs. Among its many advantages, IVR can provide increased operational efficiency, a stronger brand image, and better customer insights.</p><p>A voice-controlled virtual assistant is one step ahead of the legacy Touch-Tone/DTMF controlled one because of the flexibility it allows end users. They can just speak into their phone’s microphone to provide input to control the call.</p><p>Building a voice-controlled virtual assistant using Plivo’s <a href="https://www.plivo.com/voice/automatic-speech-recognition/">automatic speech recognition</a> (ASR) feature in <a href="https://www.php.net/">PHP</a> using <a href="https://laravel.com/">Laravel</a> is simple. This guide shows you how to set up a voice-controlled IVR phone tree to a Plivo number and manage the call flow when the call reaches the <a href="https://plivo.com/voice/">Plivo voice platform</a>. To see how to do this, we’ll build a Laravel application to <a href="https://plivo.com/docs/voice/use-cases/receive-incoming-calls/node/">receive an incoming call</a> and use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech input and implement a simple IVR phone system.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://packagist.org/packages/laravel/framework">Laravel</a> and <a href="https://packagist.org/packages/plivo/plivo-php">Plivo</a> PHP packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure style="max-width:1446px" data-rt-max-width="1446px"><div><img src="/images/blog/65810dcb5c7a0752bc0d1521_receive-speech.png" alt="Receive Speech Inputs" width="auto" height="auto" loading="auto"></div></figure><h2>Create a Laravel application to create a voice-controlled virtual assistant</h2><p>First, install Laravel if you haven’t done so already. We suggest using Composer to install it. Add a new Laravel project with boilerplate code with the command composer create-project laravel/laravel virtual_assistant --prefer-dist. This will create a receive_calls project directory with the necessary folders and files for development. Then change to the newly created receive_calls directory and install the Plivo PHP package (composer require plivo/plivo-php).</p><p>Once you’ve installed Laravel and the Plivo PHP SDK, run php artisan make:controller VirtualassistantController to create a Laravel controller to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the answer URL in the application assigned to the Plivo number. The PHP SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech inputs and implement a simple IVR phone system. Use this code:</p><div class="language-php highlighter-rouge">
 &nbsp;<style>
    .highlight {
      background-color: #212130;
      color: #d3d3d3;
      padding: 15px 18px;
      margin-bottom: 1rem;
      width: 100%; /* Adjust as needed */
    }
  </style>
 &nbsp;<div class="highlight">
 &nbsp; &nbsp;<pre><code><!--?php

namespace App\Http\Controllers;
require '../vendor/autoload.php';
use Plivo\RestClient;
use Plivo\XML\Response;
use Illuminate\Http\Request;

class VirtualassistantController extends Controller
{
  // GetInput XML to handle the incoming call
  public function detectSpeech()
  {
    $welcome_message = "Welcome to the demo app. Say Sales to talk to our Sales representative. Say Support to talk to our Support representative"; // Welcome message - firstbranch
    $no_input = "Sorry, I didn't catch that. Please hang up and try again later."; // This is the message that Plivo reads when the caller does nothing at all
    $response = new Response();
    $get_input = $response--->addGetInput(
 &nbsp; &nbsp; &nbsp;[
 &nbsp; &nbsp; &nbsp; &nbsp;'action' =&gt; 'https://' . $_SERVER["HTTP_HOST"] . '/representative_speech',
 &nbsp; &nbsp; &nbsp; &nbsp;'method' =&gt; 'POST',
 &nbsp; &nbsp; &nbsp; &nbsp;'interimSpeechResultsCallback' =&gt; 'https://' . $_SERVER["HTTP_HOST"] . '/representative_speech',
 &nbsp; &nbsp; &nbsp; &nbsp;'interimSpeechResultsCallbackMethod' =&gt; 'POST',
 &nbsp; &nbsp; &nbsp; &nbsp;'inputType' =&gt; 'speech',
 &nbsp; &nbsp; &nbsp; &nbsp;'redirect' =&gt; 'true',
 &nbsp; &nbsp; &nbsp;]);
 &nbsp; &nbsp;$get_input-&gt;addSpeak($welcome_message, ['language' =&gt; 'en-US', 'voice' =&gt; 'Polly.Salli']);
 &nbsp; &nbsp;$response-&gt;addSpeak($no_input);
 &nbsp; &nbsp;$xml_response = $response-&gt;toXML();
 &nbsp; &nbsp;return response($xml_response, 200)-&gt;header('Content-Type', 'application/xml');
 &nbsp;}

 &nbsp;// Action URL block for Sales and Support branch
 &nbsp;public function repBranch(Request $request)
 &nbsp;{
 &nbsp; &nbsp;$wrong_input = "Sorry, invalid input."; // This is the message that Plivo reads when the caller inputs a wrong digit.
 &nbsp; &nbsp;$speech = $request-&gt;query('Speech');
 &nbsp; &nbsp;$from_number = $request-&gt;query('From');
 &nbsp; &nbsp;$response = new Response();
 &nbsp; &nbsp;$params = array(
 &nbsp; &nbsp; &nbsp;'callerId' =&gt; $from_number
 &nbsp; &nbsp;);
 &nbsp; &nbsp;if ($speech == "sales") {
 &nbsp; &nbsp; &nbsp;$dial = $response-&gt;addDial($params);
 &nbsp; &nbsp; &nbsp;$number = "14156667777";
 &nbsp; &nbsp; &nbsp;$dial-&gt;addNumber($number);
 &nbsp; &nbsp;} elseif ($speech == "support") {
 &nbsp; &nbsp; &nbsp;$dial = $response-&gt;addDial($params);
 &nbsp; &nbsp; &nbsp;$number = "14156667778";
 &nbsp; &nbsp; &nbsp;$dial-&gt;addNumber($number);
 &nbsp; &nbsp;} else {
 &nbsp; &nbsp; &nbsp;$response-&gt;addSpeak($wrong_input);
 &nbsp; &nbsp;}
 &nbsp; &nbsp;$xml_response = $response-&gt;toXML();
 &nbsp; &nbsp;return response($xml_response, 200)-&gt;header('Content-Type', 'application/xml');
 &nbsp;}
}
</code></pre>
 &nbsp;</div>
</div><p>Now add a route for the virtualAssistant function in the VirtualassistantController class. Open the routes/web.php file and add these lines at the end of the file:</p><p>‍<strong>Note</strong>: We need to add the route of the app to the “except” array to disable cross-site request forgery (CSRF) verification in the app/Http/Middleware/VerifyCsrfToken.php file.</p><h2>Test the code locally</h2><p>Now the VirtualassistantController is ready to handle incoming calls to your Plivo number using Laravel and the Plivo PHP SDK. To run the code on the Laravel server, use the command</p><p>You should see your basic server application in action on http://127.0.0.1:8000/detect_speech.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive calls (8000 in this case, as our local Laravel application is running there):</p><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure style="max-width:1682px" data-rt-max-width="1682px"><div><img src="/images/blog/658127ecb4f818e367113418_ngrok-cli-virtual-assistant.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://02a9fe62aabd.ngrok.io/detect_speech) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:2774px" data-rt-max-width="2774px"><div><img src="/images/blog/658127f5632d5c15090cac84_xml-doc-virtual-assistant.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Laravel application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to activate the voice-controlled virtual assistant.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Virtual-Assistant” — and configure the ngrok URL https://02a9fe62aabd.ngrok.io/detect_speech as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2776px" data-rt-max-width="2776px"><div><img src="/images/blog/65812804441714e1db0a0ed1_create-app-virtual-assistant.png" alt="Create Plivo App for voice-controlled IVR Laravel app" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure style="max-width:2778px" data-rt-max-width="2778px"><div><img src="/images/blog/65810e2c84a5125d94dbe715_assign-app-virtual-assistant.png" alt="Assign Virtual-Assistant Plivo App" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the VirtualAssistant Laravel application automatically routes the call to the Sales and Support departments based on the speech inputs received on the call.</p><p>And that’s how simple it is to set up a voice-controlled virtual assistant on a Plivo number and handle it using XML documents using Plivo’s PHP SDK and a Laravel application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/php/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/php/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/php/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
