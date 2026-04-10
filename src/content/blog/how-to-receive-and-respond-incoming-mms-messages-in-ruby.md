---
title: "How to Receive and Respond to Incoming MMS Messages in Ruby with Rails and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-05-04T00:00:00.000Z"
updatedDate: "2024-01-15T09:18:50.000Z"
image: "/images/blog/657fed991efcac0bf1d7592a_receive-mms-ruby.png"
thumbnail: "/images/blog/657fed991efcac0bf1d7592a_receive-mms-ruby.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Receive and Respond to Incoming MMS Messages in Ruby with Rails and Plivo"
webflowItemId: "657feea890246e462221dff8"
---
<h2>Overview</h2><p>This guide shows how to receive and automatically respond to incoming MMS messages on a <a href="https://www.plivo.com/virtual-phone-numbers/">Plivo number</a>, as you might want to do for someone who’s out of the office or who leaves the company.</p><p>Here’s how to use <a href="https://www.plivo.com/sms/">Plivo’s SMS APIs</a> to build this use case.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To receive incoming messages you must have a Plivo phone number that supports MMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-ruby-dev-environment-api-messaging/">set up a Ruby development environment</a> and a web server and safely expose that server to the internet.</p><h2>Create a Rails server to receive MMS messages</h2><p>Change to the project directory and run this command to create a Rails controller for inbound messages.</p><style>
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
    font: 16px soleil;
    line-height: 29px;
    padding: 15px 18px 15px 18px;
  }
  pre{
    background: rgb(33, 33, 48);
    min-width: 100%
    padding-left: 18px
  }
  .rouge-table pre{
  padding: 0;
  }

  .highlight pre{
    background-color: rgb(33, 33, 48);
    border-radius: 0;
  }
  pre.lineno{
    color: #fff;
    opacity: .3;
  }
  .w-richtext figure {
    max-width: 100%;
    position: relative;
}
td{
    vertical-align: top;
    text-align: left;
    border-bottom: hidden;
    padding: 5px;
}
  </style>
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>rails generate controller Plivo sms
</code></pre></div></div><p>This command generates a controller named plivo_controller in the app/controllers/ directory and a respective view in the app/views/plivo directory. We can delete the view as we don’t need it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span><span class="nb">rm </span>app/views/plivo/sms.html.erb
</code></pre></div></div><h2>Create the autoresponder application using Rails server</h2><p>Edit app/controllers/plivo_controller.rb and paste into it this code.</p><figure><pre><code class="language-ruby" data-lang="ruby"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
</pre></td><td class="code"><pre><span class="kp">include</span> <span class="no">Plivo</span>
<span class="kp">include</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">Exceptions</span>
<span class="kp">include</span> <span class="no">Plivo</span><span class="o">::</span><span class="no">XML</span>

<span class="k">class</span> <span class="nc">PlivoController</span> <span class="o">&lt;</span> <span class="no">ApplicationController</span>
 &nbsp;<span class="n">skip_before_action</span> <span class="ss">:verify_authenticity_token</span>
 &nbsp;<span class="k">def</span> <span class="nf">receive</span><span class="o">-</span><span class="n">mms</span>
		<span class="n">from_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:From</span><span class="p">]</span>
		<span class="n">to_number</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:To</span><span class="p">]</span>
		<span class="n">text</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Text</span><span class="p">]</span>
		<span class="n">media_url</span> <span class="o">=</span> <span class="n">params</span><span class="p">[</span><span class="ss">:Media0</span><span class="p">]</span>
 &nbsp; &nbsp; &nbsp;	<span class="nb">puts</span> <span class="s2">"Message received - From: </span><span class="si">#{</span><span class="n">from_number</span><span class="si">}</span><span class="s2">, To: </span><span class="si">#{</span><span class="n">to_number</span><span class="si">}</span><span class="s2">, Text: </span><span class="si">#{</span><span class="n">text</span><span class="si">}</span><span class="s2">, Media: </span><span class="si">#{</span><span class="n">media_url</span><span class="si">}</span><span class="s2">"</span>

		<span class="k">if</span> <span class="n">text</span><span class="p">.</span><span class="nf">downcase</span> <span class="o">==</span> <span class="s2">"hi"</span>
			<span class="n">text</span> <span class="o">=</span> <span class="s2">"Hello!"</span>
	 &nbsp; 		<span class="n">media</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">]</span>
		<span class="k">elsif</span> <span class="n">text</span><span class="p">.</span><span class="nf">downcase</span> <span class="o">==</span> <span class="s2">"bye"</span>
			<span class="n">text</span> <span class="o">=</span> <span class="s2">"Bye and have a nice day!"</span>
			<span class="n">media</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"https://media.giphy.com/media/QM5lHSyFjz1XW/giphy.gif"</span><span class="p">]</span>
		<span class="k">else</span>
		 &nbsp; &nbsp;<span class="n">text</span> <span class="o">=</span> <span class="s2">"I'm glad that we connected"</span>
	 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">media</span> <span class="o">=</span> <span class="p">[</span><span class="s2">"https://media.giphy.com/media/888R35MJTmDxQfRzfS/giphy.gif"</span><span class="p">]</span>
		<span class="k">end</span>
		
		<span class="n">api</span> <span class="o">=</span> <span class="no">RestClient</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">)</span>
		<span class="n">response</span> <span class="o">=</span> <span class="n">api</span><span class="p">.</span><span class="nf">messages</span><span class="p">.</span><span class="nf">create</span><span class="p">(</span>
		<span class="n">src</span><span class="ss">:to_number</span><span class="p">,</span>
		<span class="n">dst</span><span class="ss">:from_number</span><span class="p">,</span>
		<span class="n">text</span><span class="ss">:body</span><span class="p">,</span>
		<span class="ss">media_urls: </span><span class="n">media</span><span class="p">,</span>
		<span class="ss">type: </span><span class="s2">"mms"</span>
 &nbsp;<span class="p">)</span>
 &nbsp;	<span class="n">render</span> <span class="ss">json: </span><span class="n">response</span><span class="p">.</span><span class="nf">to_s</span>
	<span class="k">end</span>
<span class="k">end</span>
</pre></td></tr></tbody></table></code></pre></figure><h3>Add a route</h3><p>Edit config/routes.rb and change the line</p><div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="no">Rails</span><span class="p">.</span><span class="nf">application</span><span class="p">.</span><span class="nf">routes</span><span class="p">.</span><span class="nf">draw</span> <span class="k">do</span>
 &nbsp;<span class="n">get</span> <span class="s1">'plivo/sms'</span> 
<span class="k">end</span>
</code></pre></div></div><p>to</p><div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="no">Rails</span><span class="p">.</span><span class="nf">application</span><span class="p">.</span><span class="nf">routes</span><span class="p">.</span><span class="nf">draw</span> <span class="k">do</span>
 &nbsp;<span class="n">post</span> <span class="s1">'plivo/receive-mms/'</span> <span class="o">=&gt;</span> <span class="s1">'plivo#receivemms'</span>
<span class="k">end</span>
</code></pre></div></div><h2>Test</h2><p>Start the Rails server</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nv">$ </span>rails server
</code></pre></div></div><p>You should see your basic server application in action at http://localhost:3000/plivo/receive-mms/.</p><p>Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a></p><p><strong>Note:</strong></p><ul><li>We recommend that you store your credentials in the auth_id and auth_token environment variables, to avoid the possibility of accidentally committing them to source control. If you do this, you can initialize the client with no arguments and Plivo will automatically fetch the values from the environment variables. You can use os module(os.environ) to store environment variables and fetch them when initializing the client.</li><li>Sending and receiving MMS is only available in the United States and Canada.</li></ul><p><a href="https://www.plivo.com/docs/sdk/server/set-up-ruby-dev-environment-api-messaging/#ngrok-setup">Expose your local server to the internet.</a></p><h2>Create a Plivo application</h2><p>Associate the Rails server you created with Plivo by creating a Plivo application. Visiting Messaging &gt; <a href="https://console.plivo.com/sms/applications/">Applications</a> and click Add New Application. You can also use Plivo’s <a href="https://www.plivo.com/docs/account/api/application/#create-an-application">Application API.</a></p><p>Give your application a name — we called our Receive-MMS. Enter the server URL you want to use (for example https://&lt;yourdomain&gt;.com/receive-mms/) in the Message URL field and set the method to POST. Click Create Application to save your application.</p><figure><div><img src="/images/blog/657fee4946fa2dba9c940c9d_create-app.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Assign a Plivo number to your application</h2><p>Navigate to the <a href="https://console.plivo.com/number/">Numbers</a> page and select the phone number you want to use for this application. From the Application Type drop-down, select XML Application. From the Plivo Application drop-down, select Respond-MMS (the name we gave the application).</p><figure><div><img src="/images/blog/657fee66f319ef48d4a00d32_assign-app.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>Click <em>Update Number</em> to save.</p><h2>Test</h2><p>Send a text message to the <a href="https://console.plivo.com/active-phone-numbers/">Plivo number</a> you specified using any phone. The message should be replied to the destination number you specified.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can make calls only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
