---
title: "How to Build a Voice-controlled Virtual Assistant (IVR) in Java Using Spring Boot and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-08-24T00:00:00.000Z"
updatedDate: "2024-08-04T11:50:37.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581160fa70717a189b15433_ivr-java.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581160fa70717a189b15433_ivr-java.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["java-sdk", "voice-api", "how-to", "ivr"]
seoTitle: "How to Build a Voice-controlled Virtual Assistant (IVR) in Java Using Spring Boot and Plivo"
webflowItemId: "658117176a28387a23dc43f4"
---
<p>A virtual assistant can help your business if you have clients who call your phone number. <a href="https://en.wikipedia.org/wiki/Interactive_voice_response">Interactive voice response</a> (IVR) helps you to automate call reception by routing callers to the most appropriate department or the agent most qualified to meet their needs. Among its many advantages, IVR can provide increased operational efficiency, a stronger brand image, and better customer insights.</p><p>A voice-controlled virtual assistant is one step ahead of the legacy Touch-Tone/DTMF controlled one because of the flexibility it allows end-users. They can just speak into their phone’s microphone to provide input to control the call.</p><p>Building a voice-controlled virtual assistant using Plivo’s <a href="https://www.plivo.com/voice/automatic-speech-recognition/">automatic speech recognition</a> (ASR) feature in <a href="https://www.plivo.com/docs/sdk/server/java-sdk/">Java</a> using <a href="https://spring.io/projects/spring-boot">Spring Boot</a> is simple. This guide shows you how to set up a voice-controlled IVR phone tree to a Plivo number and manage the call flow when the call reaches the <a href="https://plivo.com/voice/">Plivo voice platform</a>. To see how to do this, we’ll build a spring boot application to <a href="https://plivo.com/docs/voice/use-cases/receive-incoming-calls/python/">receive an incoming call</a> and use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech input and implement a simple IVR phone system.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li><a href="https://search.maven.org/search?q=g:org.springframework.boot">Sprint Boot</a> and <a href="https://search.maven.org/artifact/com.plivo/plivo-java">Plivo</a> Java packages — use the <a href="https://start.spring.io/">Spring Initializr</a> to create a demo project with boilerplate code.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><p>{{cta-style-1}}</p><h2>How it works</h2><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810dcb5c7a0752bc0d1521_receive-speech.png" alt="Receive Speech Inputs" width="auto" height="auto" loading="auto"></div></figure><h2>Create a spring boot application to create a voice-controlled virtual assistant</h2><p>Once you’ve created the Spring Boot application using Spring Initializr, you can add the Plivo Java SDK using Maven or Gradle, or Groovy as per the interface selected. Update the Java application in the created project to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the Answer URL in the application assigned to the Plivo number. The Java SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML</a> element to capture speech inputs and implement a simple IVR phone system. Use this code:</p><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/rainbow.min.css">


<style>
.hljs{background: rgb(33, 33, 48);}
</style>


<pre> &nbsp; &nbsp; &nbsp; &nbsp;<code>
package com.example.VirtualAssistant ;

 &nbsp; &nbsp;import com.plivo.api.exceptions.PlivoValidationException ;
 &nbsp; &nbsp;import com.plivo.api.exceptions.PlivoXmlException ;
 &nbsp; &nbsp;import com.plivo.api.xml.* ;
 &nbsp; &nbsp;import com.plivo.api.xml.Number ;
 &nbsp; &nbsp;import org.springframework.boot.SpringApplication ;
 &nbsp; &nbsp;import org.springframework.boot.autoconfigure.SpringBootApplication ;
 &nbsp; &nbsp;import org.springframework.web.bind.annotation.* ;
 &nbsp; &nbsp;
 &nbsp; &nbsp;import javax.servlet.http.HttpServletRequest ;
 &nbsp; &nbsp;
 &nbsp; &nbsp;@SpringBootApplication
 &nbsp; &nbsp;@RestController
 &nbsp; &nbsp;public class VirtualAssistantApplication {
 &nbsp; &nbsp; &nbsp; &nbsp;public static void main (final String [] args ) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;SpringApplication .run (VirtualAssistantApplication .class , args );
 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;// Welcome message - firstbranch
 &nbsp; &nbsp; &nbsp; &nbsp;String welcomeMessage = "Welcome to the demo app, Say Sales to talk to our Sales representative. Say Support to talk to our Support representative" ;
 &nbsp; &nbsp; &nbsp; &nbsp;// This is the message that Plivo reads when the caller does nothing at all
 &nbsp; &nbsp; &nbsp; &nbsp;String noInput = "Sorry, I didn't catch that. Please hangup and try again later." ;
 &nbsp; &nbsp; &nbsp; &nbsp;// This is the message that Plivo reads when the caller inputs a wrong digit.
 &nbsp; &nbsp; &nbsp; &nbsp;String wrongInput = "Sorry, it's a wrong input." ;
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;@GetMapping (value = "/virtual_assistant/" , produces = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"application/xml"
 &nbsp; &nbsp; &nbsp; &nbsp;})
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;public Response getInput (HttpServletRequest request ) throws PlivoXmlException , PlivoValidationException {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;String hostName = request .getRequestURL ().toString ();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;final Response response = new Response ().children (
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;new GetInput ().action (hostName + "firstbranch/" ).method ("POST" )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.interimSpeechResultsCallback (hostName + "firstbranch/" )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.interimSpeechResultsCallbackMethod ("POST" ).inputType ("speech" ).redirect (true )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.children (new Speak (welcomeMessage )))
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.children (new Speak (noInput ));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;System .out .println (response .toXmlString ());
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return response ;
 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;@RequestMapping (value = "/virtual_assistant/firstbranch/" , produces = {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"application/xml"
 &nbsp; &nbsp; &nbsp; &nbsp;}, method = RequestMethod .POST )
 &nbsp; &nbsp; &nbsp; &nbsp;public Response firstbranch (HttpServletRequest request , @RequestParam ("Speech" ) final String speech ,
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;@RequestParam ("From" ) final String fromNumber ) throws PlivoXmlException , PlivoValidationException {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;System .out .println ("Speech Input is:" + speech );
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;String hostName = request .getRequestURL ().toString ();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;final Response response = new Response ();
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;if (speech .equals ("sales" )) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;response .children (
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;new Dial ().callerId (fromNumber ).action (hostName + "action/" )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.method ("POST" ).redirect (false ).children (new Number ("&lt;number_1&gt;" )));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} else if (speech .equals ("support" )) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;response .children (
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;new Dial ().callerId (fromNumber ).action (hostName + "action/" )
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.method ("POST" ).redirect (false ).children (new Number ("&lt;number_2&gt;" )));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} else {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;response .children (new Speak (wrongInput ));
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;System .out .println (response .toXmlString ());
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;return response ;
 &nbsp; &nbsp; &nbsp; &nbsp;}
 &nbsp; &nbsp;}
 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;</code>

</pre><h2>Test the code locally</h2><p>Save the file and run the application. You should see your basic server application in action on http://localhost:8080/virtual_assistant/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive calls (8080 in this case, as our local spring boot application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 8080
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581168e6576707c72c33079_ngrok-cli-va-java.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://46a4-49-206-115-248.ngrok.io/virtual_assistant/) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65811699a11900005d9e76d7_xml-doc-va-java.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the spring boot application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to activate the voice-controlled virtual assistant.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Virtual-Assistant” — and configure the ngrok URL https://46a4-49-206-115-248.ngrok.io/virtual_assistant/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658116bd84a5125d94e1f06c_create-app-va-java.png" alt="Create Plivo App for voice-controlled IVR MVC app" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810e2c84a5125d94dbe715_assign-app-virtual-assistant.png" alt="Assign Virtual-Assistant Plivo App" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the VirtualAssistant spring boot application automatically routes the call to the Sales and Support departments based on the speech inputs received on the call.</p><p>And that’s how simple it is to set up a voice-controlled virtual assistant on a Plivo number and handle it using XML documents using Plivo’s Plivo’s Java SDK and a spring boot application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/java/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/java/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/java/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
