---
title: "How to Build a Voice-controlled Virtual Assistant (IVR) in Ruby Using Rails and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-09-07T00:00:00.000Z"
updatedDate: "2024-07-08T10:56:58.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810fbb610ff1f0fac73c82_ivr-rails.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810fbb610ff1f0fac73c82_ivr-rails.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "voice-api", "how-to", "ivr"]
seoTitle: "How to Build a Voice-controlled Virtual Assistant (IVR) in Ruby Using Rails and Plivo"
webflowItemId: "6581111e9d2ea44f23cd0762"
---
<p>A virtual assistant can help your business if you have clients who call your phone number. <a href="https://en.wikipedia.org/wiki/Interactive_voice_response">Interactive voice response</a> (IVR) helps you to automate call reception by routing callers to the most appropriate department or the agent most qualified to meet their needs. Among its many advantages, IVR can provide increased operational efficiency, a stronger brand image, and better customer insights.</p><p>A voice-controlled virtual assistant is one step ahead of the legacy Touch-Tone/DTMF controlled one because of the flexibility it allows end-users. They can just speak into their phone’s microphone to provide input to control the call.</p><p>Building a voice-controlled virtual assistant using Plivo’s <a href="https://www.plivo.com/voice/automatic-speech-recognition/">automatic speech recognition</a> (ASR) feature in <a href="https://www.plivo.com/docs/sdk/server/ruby-sdk/">Ruby</a> using <a href="https://rubyonrails.org/">Ruby on Rails</a> is simple. This guide shows you how to set up a voice-controlled IVR phone tree to a Plivo number and manage the call flow when the call reaches the <a href="https://plivo.com/voice/">Plivo voice platform</a>. To see how to do this, we’ll build a rails application to <a href="https://plivo.com/docs/voice/use-cases/receive-incoming-calls/ruby/">receive an incoming call</a> and use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML </a>element to capture speech input and implement a simple IVR phone system.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console. </li></ul><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65803a779bd16973235fced0_search-number.jpeg" alt="Buy a New Plivo Number" width="auto" height="auto" loading="auto"></div></figure><ul><li>Rails and Plivo Ruby packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810dcb5c7a0752bc0d1521_receive-speech.png" alt="Receive Speech Inputs" width="auto" height="auto" loading="auto"></div></figure><h2>Create a Rails application to create a voice-controlled virtual assistant</h2><p>First, you need to install Rails if you haven’t installed it already. Use the command gem install rails, or use <a href="https://bundler.io/">bundler</a> or <a href="https://rvm.io/">RVM</a> to install it. Add a new Rails project with boilerplate code with the command rails new myrailsapp. This will create a myrailsapp directory with the necessary folders and files for development. Then add the Plivo Ruby gem (gem ‘plivo’, ‘~&gt; 4.16.0’) as a dependency in the gemfile and use the command bundle install to install it.</p><p>Once you’ve installed Rails and the Plivo Ruby SDK, change to the newly created myrailsapp project directory and run rails generate controller Plivo voice to create a Rails controller to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the answer URL in the application assigned to the Plivo number. The Ruby SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/getinput/">GetInput XML</a> element to capture speech inputs and implement a simple IVR phone system. Use this code in the PlivoController class in app/controllers/plivo_controller.rb file:</p><div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1"># Welcome message - firstbranch</span>
<span class="vg">$WelcomeMessage</span> <span class="o">=</span> <span class="s2">"Welcome to the demo app, Press 1 for your account balance.
Press 2 for your account status. Press 3 to talk to our representative"</span>
<span class="c1"># This is the message that Plivo reads when the caller does nothing at all</span>
<span class="vg">$NoInput</span> <span class="o">=</span> <span class="s2">"Sorry, I didn't catch that. Please hangup and try again later."</span>
<span class="c1"># This is the message that Plivo reads when the caller inputs a wrong digit.</span>
<span class="vg">$WrongInput</span> <span class="o">=</span> <span class="s2">"Sorry, it's a wrong input."</span>
<span class="k">class</span> <span class="nc">PlivoController</span> <span class="o">&lt;</span> <span class="no">ApplicationController</span>
 &nbsp;<span class="k">def</span> <span class="nf">virtual_assistant</span>
 &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">Response</span><span class="p">.</span><span class="nf">new</span>
 &nbsp; &nbsp;<span class="n">get_input</span> <span class="o">=</span> <span class="n">response</span><span class="p">.</span><span class="nf">addGetInput</span><span class="p">(</span>
		<span class="n">action</span><span class="ss">:'https://'</span><span class="o">+</span><span class="n">request</span><span class="p">.</span><span class="nf">host</span><span class="o">+</span><span class="s1">'/plivo/va_firstbranch/'</span><span class="p">,</span> 
		<span class="ss">digitEndTimeout: </span><span class="s1">'5'</span><span class="p">,</span>
		<span class="n">inputType</span><span class="ss">:'dtmf'</span><span class="p">,</span>
		<span class="nb">method</span><span class="ss">:'POST'</span><span class="p">,</span>
		<span class="n">redirect</span><span class="ss">:'true'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="p">)</span>
 &nbsp; &nbsp;<span class="n">get_input</span><span class="p">.</span><span class="nf">addSpeak</span><span class="p">(</span><span class="vg">$WelcomeMessage</span><span class="p">,</span> <span class="ss">voice: </span><span class="s1">'Polly.Salli'</span><span class="p">,</span> <span class="ss">language: </span><span class="s1">'en-US'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="nf">addSpeak</span><span class="p">(</span><span class="vg">$NoInput</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">xml</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">PlivoXML</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="nb">puts</span> <span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="nb">puts</span> <span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 &nbsp; &nbsp;<span class="n">render</span> <span class="ss">xml: </span><span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 <span class="k">end</span>
 <span class="k">def</span> <span class="nf">va_firstbranch</span>
 &nbsp; &nbsp;<span class="n">speech</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Speech</span><span class="p">]</span>
 &nbsp; &nbsp;<span class="n">from_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:From</span><span class="p">]</span>
 &nbsp; &nbsp;<span class="nb">puts</span> <span class="s2">"Speech Input is:"</span><span class="p">,</span> <span class="n">speech</span>
 &nbsp; &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">Response</span><span class="p">.</span><span class="nf">new</span>
 &nbsp; &nbsp;<span class="k">if</span> <span class="p">(</span><span class="n">speech</span> <span class="o">==</span> <span class="s2">"sales"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp;<span class="n">params</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'action'</span> <span class="o">=&gt;</span> <span class="s1">'https://'</span><span class="o">+</span><span class="n">request</span><span class="p">.</span><span class="nf">host</span><span class="o">+</span><span class="s1">'/plivo/multilevelivr/action/'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'method'</span> <span class="o">=&gt;</span> <span class="s2">"POST"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'redirect'</span> <span class="o">=&gt;</span> <span class="s2">"false"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'callerId'</span> <span class="o">=&gt;</span><span class="n">from_number</span>
 &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp;<span class="n">dial</span> <span class="o">=</span> <span class="n">response</span><span class="p">.</span><span class="nf">addDial</span><span class="p">(</span><span class="n">params</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp;<span class="n">dial</span><span class="p">.</span><span class="nf">addNumber</span><span class="p">(</span><span class="s2">"&lt;number_1&gt;"</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">elsif</span> <span class="p">(</span><span class="n">speech</span> <span class="o">==</span> <span class="s2">"support"</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp;<span class="n">params</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'action'</span> <span class="o">=&gt;</span> <span class="s1">'https://'</span><span class="o">+</span><span class="n">request</span><span class="p">.</span><span class="nf">host</span><span class="o">+</span><span class="s1">'/plivo/multilevelivr/action/'</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'method'</span> <span class="o">=&gt;</span> <span class="s2">"POST"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'redirect'</span> <span class="o">=&gt;</span> <span class="s2">"false"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="s1">'callerId'</span> <span class="o">=&gt;</span><span class="n">from_number</span>
 &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp; &nbsp;<span class="n">dial</span> <span class="o">=</span> <span class="n">response</span><span class="p">.</span><span class="nf">addDial</span><span class="p">(</span><span class="n">params</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp;<span class="n">dial</span><span class="p">.</span><span class="nf">addNumber</span><span class="p">(</span><span class="s2">"&lt;number_2&gt;"</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">else</span>
 &nbsp; &nbsp; &nbsp;<span class="n">response</span><span class="p">.</span><span class="nf">addSpeak</span><span class="p">(</span><span class="vg">$WrongInput</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="k">end</span>
 &nbsp; &nbsp;<span class="n">xml</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">PlivoXML</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="nb">puts</span> <span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 &nbsp; &nbsp;<span class="n">render</span> <span class="ss">xml: </span><span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 &nbsp;<span class="k">end</span>
<span class="k">end</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Add a route for the inbound function in the PlivoController class. Open the config/routes.rb file and add this line after the inbound route: get ‘plivo/virtual_assistant’. To run the code on the rails server, use the command rails server. You should see your basic server application in action on <a href="http://127.0.0.1:3000/plivo/virtual_assistant/">http://127.0.0.1:3000/plivo/virtual_assistant/</a>.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using ngrok, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install ngrok, but before you start the ngrok service, whitelist ngrok by adding it to the config.hosts list in the config/environments/development.rb file with this command. You’ll face a Blocked host error if you fail to add it.</p><style>
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
<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1"># whitelist ngrok domain</span>
<span class="n">config</span><span class="p">.</span><span class="nf">hosts</span> <span class="o">&lt;&lt;</span> <span class="sr">/[a-z0-9]+\.ngrok\.io/</span>
</code></pre></div></div><p>Now run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (3000 in this case, as our local Rails application runs there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 3000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581109dd045e63a508bd005_ngrok-cli-va-rails.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://e3b9-49-206-112-65.ngrok.io/plivo/virtual_assistant/) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658110a9151ed7f88247c15a_xml-doc-va-rails.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Rails application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to activate the voice-controlled virtual assistant.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-Virtual-Assistant” — and configure the ngrok URL https://e3b9-49-206-112-65.ngrok.io/plivo/virtual_assistant/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658110be6576707c72bf9f2b_create-app-va-rails.png" alt="Create Plivo App for voice-controlled IVR MVC app" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65810e2c84a5125d94dbe715_assign-app-virtual-assistant.png" alt="Assign Virtual-Assistant Plivo App" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the VirtualAssistant rails application automatically routes the call to the Sales and Support departments based on the speech inputs received on the call.</p><p>And that’s how simple it is to set up a voice-controlled virtual assistant on a Plivo number and handle it using XML documents using Plivo’s Plivo’s Ruby SDK and a rails application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/ruby/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/call-forwarding/ruby/">call forwarding</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/ruby/">number masking</a>, as your business requires.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
