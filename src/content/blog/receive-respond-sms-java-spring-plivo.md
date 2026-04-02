---
title: "How to Receive and Respond to Incoming SMS Messages in Java with Spring Boot and Plivo"
description: "SMS API | Plivo | You can get started to Receive and Respond to Incoming SMS Messages in Java with Spring Boot and Plivo."
pubDate: "2021-06-11T00:00:00.000Z"
updatedDate: "2024-07-08T08:30:14.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813bab0000cb93c2a417e0_receive-sms-java.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813bab0000cb93c2a417e0_receive-sms-java.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["java-sdk", "sms-api", "how-to"]
seoTitle: "How to Receive and Respond to Incoming SMS Messages in Java with Spring Boot and Plivo"
webflowItemId: "65813c3ecd9dde6e9b953ba2"
---
<p><a href="https://www.plivo.com/blog/send-sms-in-java/">Sending an outbound message</a> using the Plivo <a href="https://www.plivo.com/sms/">SMS</a> platform is easy, but communication should be a two-way street. Customers should be able to text you, and you should acknowledge their messages and address their concerns. To do this, you can build a Java <a href="https://spring.io/projects/spring-boot">Spring Boot</a> application to <a href="https://www.plivo.com/docs/sms/use-cases/receive-sms/java/">receive</a> and <a href="https://www.plivo.com/docs/sms/use-cases/reply-to-incoming-sms/java/">respond to incoming SMS</a> messages on a Plivo phone number. In this post, we walk you through how to implement this.</p><h2>Prerequisites</h2><p>Before you get started, you’ll need:</p><ul><li>A Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up for one</a> for free if you don’t have one already.</li><li>An SMS-enabled Plivo phone number as you want to receive incoming SMS messages. To search for and buy an available number, go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Buy Numbers</a> on the Plivo console.</li><li><a href="https://search.maven.org/search?q=g:org.springframework.boot">Sprint Boot</a> and <a href="https://search.maven.org/artifact/com.plivo/plivo-java">Plivo</a> Java packages — use the <a href="https://start.spring.io/">Spring Initializr</a> to create a demo project with boilerplate code.</li><li><a href="https://ngrok.com/">ngrok</a> — a utility that exposes your local development server to the internet over secure tunnels.</li></ul><h2>Create a Spring Boot application to receive SMS messages</h2><p>Once you’ve created the Spring Boot application using Spring Initializr, you can add the Plivo Java SDK using Maven or Gradle, or Groovy as per the interface selected. Update the Java application in the created project to handle incoming SMS messages on a Plivo number. Use this code:</p><style>
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
    word-wrap: break-word; /* Ensure long lines wrap */
  }
  pre.lineno{
    color: #fff;
    opacity: .3;
  }
</style>
<div class="language-java highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">package</span> <span class="nn">com.example.SMS.Demo</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">org.springframework.boot.SpringApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.autoconfigure.SpringBootApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RequestMapping</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RequestMethod</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RequestParam</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RestController</span><span class="o">;</span>

<span class="nd">@SpringBootApplication</span>
<span class="nd">@RestController</span>

<span class="kd">public</span> <span class="kd">class</span> <span class="nc">SmsDemoApplication</span> <span class="o">{</span>

 &nbsp;<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="o">{</span>
 &nbsp; &nbsp; <span class="nc">SpringApplication</span><span class="o">.</span><span class="na">run</span><span class="o">(</span><span class="nc">SmsDemoApplication</span><span class="o">.</span><span class="na">class</span><span class="o">,</span> <span class="n">args</span><span class="o">);</span>
 &nbsp;<span class="o">}</span>

 &nbsp;<span class="nd">@RequestMapping</span><span class="o">(</span><span class="n">value</span> <span class="o">=</span> <span class="s">"/receive_sms/"</span><br><span class="o">,</span> <span class="n">method</span> <span class="o">=</span> <span class="o">{</span> <span class="nc">RequestMethod</span><span class="o">.</span><span class="na">GET</span><span class="o">,</span> <span class="nc">RequestMethod</span><span class="o">.</span><span class="na">POST</span> <span class="o">})</span>
 &nbsp;<span class="kd">public</span> <span class="nc">String</span> <span class="nf">ReceiveSms</span><span class="o">(</span><span class="nd">@RequestParam</span><span class="o">(</span><span class="s">"From"</span><span class="o">)</span> <span class="nc">String</span> <span class="n">fromNumber</span><br><span class="o">,</span> <span class="nd">@RequestParam</span><span class="o">(</span><span class="s">"To"</span><span class="o">)</span> <span class="nc">String</span> <span class="n">toNumber</span><span class="o">,</span> <span class="nd">@RequestParam</span><span class="o">(</span><span class="s">"Text"</span><span class="o">)</span> <span class="nc">String</span> <span class="nc">Text</span><span class="o">)</span> <span class="o">{</span>
 &nbsp; &nbsp; <span class="nc">String</span> <span class="nc">ReceivedParams</span> <span class="o">=</span> <span class="n">fromNumber</span> <span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="n">toNumber</span> <span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="nc">Text</span><span class="o">;</span>
 &nbsp; &nbsp; <span class="nc">System</span><span class="o">.</span><span class="na">out</span><span class="o">.</span><span class="na">println</span><span class="o">(</span><span class="nc">ReceivedParams</span><span class="o">);</span>
 &nbsp; &nbsp; <span class="k">return</span> <span class="nc">ReceivedParams</span><span class="o">;</span>
 &nbsp;<span class="o">}</span>
<span class="o">}</span>
</code></pre></div></div><h2>Return a Message XML document to reply to incoming messages</h2><p>To reply to an incoming SMS message, you need to return an XML document from the URL configured as the message_url in the application assigned to the Plivo number. The Java SDK can manage the XML document generation, and you can use the <a href="https://www.plivo.com/docs/sms/xml/message/">Message XML element</a> to reply to incoming SMS messages. Use this code:</p><div class="language-java highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">package</span> <span class="nn">com.example.SMS.Demo</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">com.plivo.api.exceptions.PlivoXmlException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.xml.Message</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.xml.Response</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.SpringApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.boot.autoconfigure.SpringBootApplication</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RequestMapping</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RequestMethod</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RequestParam</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.web.bind.annotation.RestController</span><span class="o">;</span>

<span class="nd">@SpringBootApplication</span>
<span class="nd">@RestController</span>

<span class="kd">public</span> <span class="kd">class</span> <span class="nc">SmsDemoApplication</span> <span class="o">{</span>

 &nbsp;<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="o">{</span>
 &nbsp; &nbsp; <span class="nc">SpringApplication</span><span class="o">.</span><span class="na">run</span><span class="o">(</span><span class="nc">SmsDemoApplication</span><span class="o">.</span><span class="na">class</span><span class="o">,</span> <span class="n">args</span><span class="o">);</span>
 &nbsp;<span class="o">}</span>

 &nbsp;<span class="nd">@RequestMapping</span><span class="o">(</span><span class="n">value</span> <span class="o">=</span> <span class="s">"/reply_sms/"</span><span class="o">,</span> <span class="n">produces</span><span class="o">={</span><span class="s">"application/xml"</span><br><span class="o">},</span> <span class="n">method</span> <span class="o">=</span> <span class="o">{</span> <span class="nc">RequestMethod</span><span class="o">.</span><span class="na">GET</span><span class="o">,</span> <span class="nc">RequestMethod</span><span class="o">.</span><span class="na">POST</span> <span class="o">})</span>
<span class="kd">public</span> <span class="nc">String</span> <span class="nf">ReplySms</span><span class="o">(</span><span class="nd">@RequestParam</span><span class="o">(</span><span class="s">"From"</span><span class="o">)</span> <span class="nc">String</span> <span class="n">fromNumber</span><br><span class="o">,</span> <span class="nd">@RequestParam</span><span class="o">(</span><span class="s">"To"</span><span class="o">)</span> <span class="nc">String</span> <span class="n">toNumber</span><span class="o">,</span> <span class="nd">@RequestParam</span><span class="o">(</span><span class="s">"Text"</span><span class="o">)</span> <span class="nc">String</span> <span class="nc">Text</span><span class="o">)</span> <br><span class="kd">throws</span> <span class="nc">PlivoXmlException</span> <span class="o">{</span>
<span class="nc">System</span><span class="o">.</span><span class="na">out</span><span class="o">.</span><span class="na">println</span><span class="o">(</span><span class="n">fromNumber</span> <span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="n">toNumber</span> <span class="o">+</span> <span class="s">" "</span> <span class="o">+</span> <span class="nc">Text</span><span class="o">);</span>
 &nbsp; &nbsp; <span class="nc">Response</span> <span class="n">resp</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">Response</span><span class="o">()</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="o">.</span><span class="na">children</span><span class="o">(</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="k">new</span> <span class="nf">Message</span><span class="o">(</span><br><span class="n">fromNumber</span><span class="o">,</span><span class="n">toNumber</span><span class="o">,</span><span class="s">"Thank you, we have received your request."</span><span class="o">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="o">);</span>
 &nbsp; &nbsp; <span class="k">return</span> <span class="n">resp</span><span class="o">.</span><span class="na">toXmlString</span><span class="o">();</span>
 &nbsp;<span class="o">}</span>
<span class="o">}</span>
</code></pre></div></div><h2>Test the code locally</h2><p>Save the file and run the application. You should see your basic server application in action on http://localhost:8080/reply_sms/.</p><h2>Expose the local server to the internet using ngrok</h2><p>Once you see the application working locally, the next step is to connect the application to the internet to receive and reply to messages. For that, we recommend using <a href="https://ngrok.com/download">ngrok</a>, which exposes local servers behind NATs and firewalls to the public internet over secure tunnels. Install it and run ngrok on the command line, specifying the port that hosts the application on which you want to receive messages (8080 in this case, as our local Spring Boot application is running there):</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>./ngrok http 8080
</code></pre></div></div><p>Ngrok will display a forwarding link that you can use as a webhook to access your local server over the public network.</p><figure style="max-width:1666px" data-rt-max-width="1666px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813be9a6d92ba4f0423604_ngrok-cli-java-sms.png" alt="Ngrok CLI" width="auto" height="auto" loading="auto"></div></figure><p>Test the link by opening the ngrok URL(https://80aefe4087cc.ngrok.io/reply_sms/\?From=14156667777\&amp;To=14156667778\&amp;Text=hi) in a browser. We used <a href="https://httpie.io/">HTTPie</a> to check the XML response from the ngrok URL.</p><figure style="max-width:2196px" data-rt-max-width="2196px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813be9a11900005db53d6f_xml-doc-java-sms.png" alt="XML document with Message XML element" width="auto" height="auto" loading="auto"></div></figure><h2>Connect the Spring Boot application to a Plivo number</h2><p>The final step is to configure the app as a Plivo messaging application and assign it to a Plivo number on which you want to receive SMS messages.</p><p>Go to the Plivo console and navigate to Messaging &gt; Applications &gt; <a href="https://console.plivo.com/sms/applications/">XML</a>, then click on the Add New Application button in the upper right.</p><p>Provide a friendly name for the app — we used “App-Incoming-SMS” — and configure the ngrok URL https://80aefe4087cc.ngrok.io/reply_sms/ as the Message URL. Select the HTTP verb as POST, then click Create Application.</p><figure style="max-width:2788px" data-rt-max-width="2788px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65813bfb2799786542e1834d_create-java-receive-sms-app.png" alt="Create Plivo App to handle incoming SMS messages" width="auto" height="auto" loading="auto"></div></figure><p>Now go to Phone Numbers &gt; <a href="https://console.plivo.com/active-phone-numbers/">Your Numbers</a> and click on the number to which you want to assign the application. From the Plivo Application drop-down, choose the message application you just created. Finally, click Update Number.</p><figure style="max-width:2770px" data-rt-max-width="2770px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65812bbe3fe416ed11b21140_assign-app.png" alt="Assign the Plivo App to a Plivo Number" width="auto" height="auto" loading="auto"></div></figure><h2>Test the application</h2><p>Send an SMS to the Plivo number you selected. You should see that the Spring Boot application automatically sends a reply back to your mobile number.</p><p>And that’s how simple it is to receive and respond to incoming SMS messages using Plivo’s Java SDK and a Spring Boot application.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? Getting started is easy and only takes five minutes! <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
