---
title: "How to Build a Call Forwarding App in Ruby Using Rails and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2021-08-30T00:00:00.000Z"
updatedDate: "2024-01-12T11:11:16.000Z"
image: "/images/blog/658113fb7cd2777813adff3c_forward-call-rails.png"
thumbnail: "/images/blog/658113fb7cd2777813adff3c_forward-call-rails.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "voice-api", "how-to", "call-forwarding"]
seoTitle: "How to Build a Call Forwarding App in Ruby Using Rails and Plivo"
webflowItemId: "658114d76576707c72c217a8"
---
<p>Businesses use call forwarding all the time to route incoming calls to available agents, extensions, or departments that cater to the caller’s needs. Creating a call forwarding app is simple when you use Plivo’s <a href="https://www.plivo.com/docs/sdk/server/ruby-sdk/">Ruby SDK</a>. This guide shows you how to receive incoming calls on Plivo numbers and manage the call flow once a call reaches the Plivo voice platform. To see how to do this, we’ll build a <a href="https://rubyonrails.org/">Ruby on Rails</a> application to forward the call to a mobile number using the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML</a> element.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>A voice-enabled Plivo phone number if you want to receive incoming calls. To search for and buy a number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li>Rails and Plivo Ruby packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>How it works</h2><figure><div><img src="/images/blog/65810ee428ecd57f80448d92_call-forward.png" alt="Call Forward" width="auto" height="auto" loading="auto"></div></figure><h2>Create a Rails application to forward incoming calls</h2><p>First, you need to install Rails if you haven’t installed it already. Use the command gem install rails, or use <a href="https://bundler.io/">bundler</a> or <a href="https://rvm.io/">RVM</a> to install it. Add a new Rails project with boilerplate code with the command rails new myrailsapp. This will create a myrailsapp directory with the necessary folders and files for development. Then add the Plivo Ruby gem (gem ‘plivo’, ‘~&gt; 4.16.0’) as a dependency in the gemfile and use the command bundle install to install it.</p><p>Once you’ve installed Rails and the Plivo Ruby SDK, change to the newly created myrailsapp project directory and run rails generate controller Plivo voice to create a Rails controller to handle incoming calls on a Plivo number. To handle an incoming call, you need to return an XML document from the URL configured as the answer URL in the application assigned to the Plivo number. The Ruby SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/voice/xml/dial/">Dial XML Element</a> to forward the call to a mobile number. Use this code in the PlivoController class in <em>app/controllers/plivo_controller.rb</em> file:</p><style>
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
<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">PlivoController</span> <span class="o">&lt;</span> <span class="no">ApplicationController</span>
 &nbsp;<span class="k">def</span> <span class="nf">forward</span>
 &nbsp; <span class="n">response</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">Response</span><span class="p">.</span><span class="nf">new</span>
 &nbsp; <span class="n">dial</span> <span class="o">=</span> <span class="n">response</span><span class="p">.</span><span class="nf">addDial</span><span class="p">()</span>
 &nbsp; <span class="n">dest_number</span> <span class="o">=</span> <span class="s2">"14153234567"</span>
 &nbsp; <span class="n">dial</span><span class="p">.</span><span class="nf">addNumber</span><span class="p">(</span><span class="n">dest_number</span><span class="p">)</span>

 &nbsp; <span class="n">xml</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">PlivoXML</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
 &nbsp; <span class="nb">puts</span> <span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 &nbsp; <span class="n">render</span> <span class="ss">xml: </span><span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 <span class="k">end</span> 
<span class="k">end</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Add a route for the inbound function in the PlivoController class. Open the <em>config/routes.rb</em> file and add this line after the inbound route: get 'plivo/forward'. To run the code on the rails server, use the command rails server. You should see your basic server application in action on http://127.0.0.1:3000/plivo/forward/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to return the XML document to process the incoming call. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install ngrok, but before you start the ngrok service, whitelist ngrok by adding it to the config.hosts list in the config/environments/development.rb file with this command. You’ll face a Blocked host error if you fail to add it.</p><div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1"># whitelist ngrok domain</span>
<span class="n">config</span><span class="p">.</span><span class="nf">hosts</span> <span class="o">&lt;&lt;</span> <span class="sr">/[a-z0-9]+\.ngrok\.io/</span>
</code></pre></div></div><p>Now run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (3000 in this case, as our local Rails application runs there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 3000
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="/images/blog/65811471931c16a277c7067c_ngrok-cli-forwardcalls-rails.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://2e16-49-206-115-248.ngrok.io/plivo/forward/) in a browser or <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="/images/blog/658114716a28387a23da9eb6_xml-doc-forwardcalls-rails.png" alt="XML document with GetDigits XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Rails application to a Plivo number</h2><p>The final step is to configure the application as a Plivo voice application and assign it to a Plivo number on which you want to receive incoming calls.</p><p>Go to the Plivo console and navigate to Voice &gt; Applications &gt; <a href="https://console.plivo.com/voice/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the application — we used “App-call-forward” — and configure the ngrok URL https://2e16-49-206-115-248.ngrok.io/plivo/forward/ as the Answer URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="/images/blog/65811484ce6df7cee5cb2139_create-app-forwardcalls-rails.png" alt="Create Plivo App to Forward Incoming calls" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the voice application you just created. Finally, click Update Number.</p><figure><div><img src="/images/blog/65810f15632d5c1509fd8b48_assign-voiceapp-callforward.png" alt="Assign the call forward Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Make a phone call to the Plivo number you selected. You should see that the Rails application automatically forwards the call to the phone number configured in the call forwarding app.</p><p>And that’s how simple it is to receive an incoming call on a Plivo number and forward it using XML documents using Plivo’s Ruby SDK and a Rails application. You can implement other use cases on the Plivo Voice platform, such as <a href="https://www.plivo.com/docs/voice/use-cases/ivr/ruby/">phone system IVR</a>, <a href="https://www.plivo.com/docs/voice/use-cases/receive-input/ruby/">receive DTMF/Speech inputs</a>, and <a href="https://www.plivo.com/docs/voice/use-cases/number-masking/ruby/">number masking</a>, as your business requires.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
