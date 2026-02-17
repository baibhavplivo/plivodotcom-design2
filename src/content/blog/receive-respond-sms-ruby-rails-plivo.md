---
title: "How to Receive and Respond to Incoming SMS Messages in Ruby with Rails and Plivo"
description: "SMS API | Plivo | You can get started to Receive and Respond to Incoming SMS Messages in Ruby with Rails and Plivo."
pubDate: "2021-05-20T00:00:00.000Z"
updatedDate: "2024-01-12T05:10:08.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581440b79f8f1f21b79e276_receive-sms-ruby.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581440b79f8f1f21b79e276_receive-sms-ruby.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "sms-api", "how-to"]
seoTitle: "How to Receive and Respond to Incoming SMS Messages in Ruby with Rails and Plivo"
webflowItemId: "6581451c05e429fc3579840e"
---
<p><a href="https://www.plivo.com/blog/send-sms-in-ruby/">Sending an outbound message</a> using the Plivo <a href="https://www.plivo.com/sms/">SMS</a> platform is easy, but communication should be a two-way street. Customers should be able to text you, and you should acknowledge their messages and address their concerns. To do this, you can build a <a href="https://rubyonrails.org/">Ruby on Rails</a> application to receive and respond to incoming SMS messages on a Plivo phone number. In this post, we walk you through how to implement this.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number, as you want to receive incoming SMS messages. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li>Rails and Plivo Ruby packages.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a Rails application to receive SMS messages</h2><p>First, you need to install Rails if you haven’t installed it already. Use the command gem install rails, or use <a href="https://bundler.io/">bundler</a> or <a href="https://rvm.io/">RVM</a> to install it. Add a new Rails project with boilerplate code with the command rails new myrailsapp. This will create a myrailsapp directory with the necessary folders and files for development. Then add the Plivo Ruby gem (gem ‘plivo’, ‘~&gt; 4.16.0’) as a dependency in the gemfile and use the command bundle install to install it.</p><p>Once you’ve installed Rails and the Plivo Ruby SDK, change to the newly created myrailsapp project directory and run rails generate controller Plivo sms to create a Rails controller to handle incoming SMS messages on a Plivo number. Use this code:</p><style>
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
 <span class="k">def</span> <span class="nf">sms</span>
 &nbsp; <span class="n">from_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:From</span><span class="p">]</span>
 &nbsp; <span class="n">to_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:To</span><span class="p">]</span>
 &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Text</span><span class="p">]</span>
 &nbsp; <span class="nb">puts</span> <span class="s2">"Message received - From: </span><span class="si">#{</span><span class="n">from_number</span><span class="si">}</span><span class="s2">, To: </span><span class="si">#{</span><span class="n">to_number</span><span class="si">}</span><span class="s2">, Text: </span><span class="si">#{</span><span class="n">text</span><span class="si">}</span><span class="s2">"</span>
 <span class="k">end</span>
<span class="k">end</span>
</code></pre></div></div><h2>Return a Message XML document to reply to incoming messages</h2><p>To reply to an incoming SMS message, you need to return an XML document from the URL configured as the Message URL in the application assigned to the Plivo number. The Ruby SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/sms/xml/message/">Message XML element</a> to reply to incoming SMS messages. Use this code:</p><div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">PlivoController</span> <span class="o">&lt;</span> <span class="no">ApplicationController</span>
 <span class="k">def</span> <span class="nf">sms</span>
 &nbsp; <span class="n">from_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:From</span><span class="p">]</span>
 &nbsp; <span class="n">to_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:To</span><span class="p">]</span>
 &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Text</span><span class="p">]</span>
 &nbsp; <span class="nb">puts</span> <span class="s2">"Message received - From: </span><span class="si">#{</span><span class="n">from_number</span><span class="si">}</span><span class="s2">, To: </span><span class="si">#{</span><span class="n">to_number</span><span class="si">}</span><span class="s2">, Text: </span><span class="si">#{</span><span class="n">text</span><span class="si">}</span><span class="s2">"</span>
 <span class="k">end</span>
 <span class="k">def</span> <span class="nf">reply</span>
 &nbsp; <span class="n">from_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:From</span><span class="p">]</span>
 &nbsp; <span class="n">to_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:To</span><span class="p">]</span>
 &nbsp; <span class="n">text</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Text</span><span class="p">]</span>
 &nbsp; <span class="n">response</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">Response</span><span class="p">.</span><span class="nf">new</span>
 &nbsp; <span class="n">params</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; <span class="ss">src: </span><span class="n">to_number</span><span class="p">,</span>
 &nbsp; &nbsp; <span class="ss">dst: </span><span class="n">from_number</span><span class="p">,</span>
 &nbsp; <span class="p">}</span>
 &nbsp; <span class="n">message_body</span> <span class="o">=</span> <span class="s2">"Thank you, we have received your request"</span>
 &nbsp; <span class="n">response</span><span class="p">.</span><span class="nf">addMessage</span><span class="p">(</span><span class="n">message_body</span><span class="p">,</span> <span class="n">params</span><span class="p">)</span>
 &nbsp; <span class="n">xml</span> <span class="o">=</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span><span class="o">::</span><span class="no">PlivoXML</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
 &nbsp; <span class="nb">puts</span> <span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 &nbsp; <span class="n">render</span> <span class="ss">xml: </span><span class="n">xml</span><span class="p">.</span><span class="nf">to_xml</span>
 <span class="k">end</span>
<span class="k">end</span>
</code></pre></div></div><p>Now open the config/routes.rb file and add the route for this reply function. The routes would become:</p><div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="no">Rails</span><span class="p">.</span><span class="nf">application</span><span class="p">.</span><span class="nf">routes</span><span class="p">.</span><span class="nf">draw</span> <span class="k">do</span>
 <span class="n">get</span> <span class="s1">'plivo/sms'</span>
 <span class="n">get</span> <span class="s1">'plivo/reply'</span>
<span class="k">end</span>
</code></pre></div></div><h2>Test the code locally</h2><p>To run the code on the rails server, use the command</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>rails server
</code></pre></div></div><p>You should see your basic server application in action on http://127.0.0.1:3000/plivo/reply/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to receive and reply to messages. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels.</p><p>Install ngrok, but before you start the ngrok service, whitelist ngrok by adding it to the config.hosts list in the config/environments/development.rb file with this command. You’ll face a Blocked host error if you fail to add it.</p><p>Now run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (3000 in this case, as our local Rails application runs there):</p><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581448ba11900005dba743e_ngrok-cli-rails.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL (https://dd10ca394535.ngrok.io/plivo/reply/) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581448b3fe416ed11c20beb_xml-doc-rails.png" alt="XML document with Message XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Rails application to a Plivo number</h2><p>The final step is to configure the application as a Plivo messaging application and assign it to a Plivo number on which you want to receive SMS messages.</p><p>Go to the Plivo console and navigate to Messaging &gt; Applications &gt; <a href="https://console.plivo.com/sms/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the app — we used “App-Incoming-SMS” — and configure the ngrok URL https://dd10ca394535.ngrok.io/plivo/reply/ as the Message URL. Select the HTTP verb as POST, then click Create Application.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581449be707ad13a1a1a181_plivo-app-rails.png" alt="Create Plivo App to handle incoming SMS messages" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the message application you just created. Finally, click Update Number.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65812bbe3fe416ed11b21140_assign-app.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Test the application by sending an SMS message to the Plivo number you selected. You should see that the Rails application automatically sends a reply back to your mobile number.</p><p>And that’s how simple it is to receive and respond to incoming SMS messages using Plivo’s Ruby SDK and a Rails application.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes five minutes! <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
