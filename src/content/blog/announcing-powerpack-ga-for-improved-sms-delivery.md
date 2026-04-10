---
title: "Announcing Powerpack for Improved SMS Delivery"
description: "Use Powerpack to improve your SMS delivery via number pools, sticky sender, smart queueing, and local connect, all at no additional cost."
pubDate: "2019-11-12T00:00:00.000Z"
updatedDate: "2024-01-16T09:15:03.000Z"
image: "/images/blog/65828d6e0d607e3d2d0bbbe6_announcing-powerpack-ga-for-improved-sms-delivery.jpg"
thumbnail: "/images/blog/65828d6e0d607e3d2d0bbbe6_announcing-powerpack-ga-for-improved-sms-delivery.jpg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["powerpack"]
seoTitle: "Announcing Powerpack for Improved SMS Delivery"
webflowItemId: "65828df523658a2738995b23"
---
<p>Plivo makes it simple for businesses to <a href="https://www.plivo.com/sms/">send SMS text messages</a>. &nbsp;With a couple of lines of code, your application is ready to start sending messages to more than <a href="https://www.plivo.com/sms/coverage/">190 countries</a>. On average, our customers send out their first text message within 15 minutes of signing up.</p><p>The complexities of SMS messaging may surface once you start sending a high volume of messages. At that point you may face challenges such as managing country-specific restrictions, per-source-number SMS limits, and daily SMS volumes. You may have to write additional software logic to manage such complexities to ensure high SMS delivery rates. </p><p>To help our customers improve SMS delivery and go live faster for high-scale messaging use cases, we’re releasing <a href="https://www.plivo.com/sms/powerpack/">Powerpack for SMS</a>, a bundle of features that makes message communication at scale more effective and reliable. Powerpack ensures that your SMS messages get delivered at whatever scale you’re sending them, to any country.</p><h3>How Powerpack helps</h3><p>Powerpack provides several features that help high-volume messaging customers.</p><h3>Number pools for easy scaling</h3><p>With Powerpack, you construct a pool of source numbers optimal for your daily volume and peak send rate. Your messages are automatically distributed across this source number pool. All you have to do is specify the Powerpack’s unique identifier in the Send SMS API request. </p><p>You can add more numbers to your Powerpack number pool in seconds, right from your <a href="https://console.plivo.com/sms/powerpacks/">Plivo console</a>. This lets you scale infinitely without having to make any code changes.</p><h3>Sticky sender for a consistent experience</h3><p>To ensure that your end users always receive messages from the same source number, Powerpack establishes a sticky mapping between the recipient’s number and the source number used from the Powerpack for the first text message to that recipient. This stickiness enables two-way conversations by keeping the conversation thread on the recipient’s handset intact.</p><h3>Smart queuing for carrier compliance</h3><p>Powerpack maintains an internal rate-limiting queue for every source number in the pool and sends messages to downstream carriers at a rate that’s compliant with industry-defined best practices. Source number-specific rate-limiting queues, in conjunction with Powerpack’s message distribution logic, ensure you meet your overall volume and throughput requirements while staying compliant with per-number limits.</p><h3>Local connect for higher open rates</h3><p>Powerpack prioritizes source numbers in the pool that are from the same geographic region as the destination number. The highest priority is given to numbers of the same area code, followed by those in the same state, then country. </p><p>For example, when sending an SMS to a San Francisco number that starts with area code 415, Powerpack will use a number in the pool that begins with +1-415. If no +1-415 numbers are found in the pool, Powerpack will use an available California state number to send the message. </p><p>The Powerpack management UI in the console allows you to provision number pools and all the other features with a few clicks.</p><figure><div><img src="/images/blog/65828d9c834979ca159b1283_ic-powerpackgif-v2.gif" alt="" width="auto" height="auto" loading="auto"></div></figure><h2>Getting started with Powerpack</h2><p>Getting started with Powerpack is easy. Log in to the Plivo console and click to Messaging &gt; <a href="https://console.plivo.com/sms/powerpacks/">Powerpack</a>. Follow the instructions on the console to create a new Powerpack.</p><p>To send messages with your newly created Powerpack, invoke Plivo’s Send SMS API with the <em>powerpack_uuid</em> request parameter set to the Powerpack’s UUID.</p><div class="tabs">
 &nbsp;<ul class="tab-btns language-list d-flex nav-tabs nav">
 &nbsp; &nbsp;<li class="active"><a href="#powerpack-python" class="active" data-toggle="tab">Python</a></li>
 &nbsp; &nbsp;<li><a href="#powerpack-ruby" data-toggle="tab">Ruby</a></li>
 &nbsp; &nbsp;<li><a href="#powerpack-node" data-toggle="tab">Node.js</a></li>
 &nbsp; &nbsp;<li><a href="#powerpack-php" data-toggle="tab">PHP</a></li>
 &nbsp; &nbsp;<li><a href="#powerpack-java" data-toggle="tab">Java</a></li>
 &nbsp; &nbsp;<li><a href="#powerpack-go" data-toggle="tab">Go</a></li>
 &nbsp; &nbsp;<li><a href="#powerpack-net" data-toggle="tab">.NET</a></li>
 &nbsp;</ul>

 &nbsp;<div class="tab-content">
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="powerpack-python" class="tab-pane fade show active">

<figure><pre><code class="language-py" data-lang="py"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
</pre></td><td class="code"><pre><span class="kn">import</span> <span class="nn">plivo</span>

<span class="n">client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="s">'&lt;auth_id&gt;'</span><span class="p">,</span><span class="s">'&lt;auth_token&gt;'</span><span class="p">)</span>
<span class="n">message_created</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="n">messages</span><span class="p">.</span><span class="n">create</span><span class="p">(</span>
 &nbsp; &nbsp;<span class="n">powerpack_uuid</span><span class="o">=</span><span class="s">'&lt;powerpack_uuid&gt;'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="n">dst</span><span class="o">=</span><span class="s">'&lt;destination_number&gt;'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="n">text</span><span class="o">=</span><span class="s">'Test Message'</span>
<span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="powerpack-ruby" class="tab-pane">

<figure><pre><code class="language-rb" data-lang="rb"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="nb">require</span> <span class="s1">'rubygems'</span>	
<span class="nb">require</span> <span class="s1">'plivo'</span>	

<span class="kp">include</span> <span class="no">Plivo</span>	

<span class="n">client</span> <span class="o">=</span> <span class="no">RestClient</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">)</span>
<span class="n">response</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="nf">messages</span><span class="p">.</span><span class="nf">create</span><span class="p">(</span>	
 &nbsp;<span class="kp">nil</span><span class="p">,</span>	
 &nbsp;<span class="p">[</span><span class="n">destination_number</span><span class="p">],</span>	
 &nbsp;<span class="s1">'Test Message'</span><span class="p">,</span>	
 &nbsp;<span class="ss">powerpack_uuid: </span><span class="s1">'&lt;powerpack_uuid&gt;'</span>	
<span class="p">)</span>	
<span class="nb">puts</span> <span class="n">response</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="powerpack-node" class="tab-pane">

<figure><pre><code class="language-js" data-lang="js"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
</pre></td><td class="code"><pre><span class="kd">let</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">let</span> <span class="nx">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">Client</span><span class="p">(</span><span class="dl">'</span><span class="s1">&lt;auth_id&gt;</span><span class="dl">'</span><span class="p">,</span><span class="dl">'</span><span class="s1">&lt;auth_token&gt;</span><span class="dl">'</span><span class="p">);</span>

<span class="nx">client</span><span class="p">.</span><span class="nx">messages</span><span class="p">.</span><span class="nx">create</span><span class="p">({</span>
 &nbsp;<span class="na">powerpackUUID</span><span class="p">:</span><span class="dl">"</span><span class="s2">&lt;powerpack_uuid&gt;</span><span class="dl">"</span><span class="p">,</span>
 &nbsp;<span class="na">dst</span><span class="p">:</span><span class="dl">'</span><span class="s1">&lt;destination_number&gt;</span><span class="dl">'</span><span class="p">,</span>
 &nbsp;<span class="na">text</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Test Message</span><span class="dl">'</span><span class="p">,</span>
<span class="p">},).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">message_created</span><span class="p">)</span> <span class="p">{</span>
 &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">message_created</span><span class="p">)</span>
<span class="p">})</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="powerpack-php" class="tab-pane">

<figure><pre><code class="language-php5" data-lang="php5"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>	
<span class="kn">use</span> <span class="nc">Plivo\RestClient</span><span class="p">;</span>	

<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">RestClient</span><span class="p">(</span><span class="s1">'&lt;auth_id&gt;'</span><span class="p">,</span> <span class="s1">'&lt;auth_token&gt;'</span><span class="p">);</span>	
<span class="nv">$message_created</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">messages</span><span class="o">-&gt;</span><span class="nf">create</span><span class="p">(</span>
 &nbsp; &nbsp;<span class="p">[</span> &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"powerpack_uuid"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;powerpack_uuid&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"dst"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;destination_number&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"text"</span> &nbsp;<span class="o">=&gt;</span><span class="s2">"Hello, this is a sample text"</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s2">"url"</span><span class="o">=&gt;</span><span class="s2">"https://&lt;yourdomain&gt;.com/sms_status/"</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="p">]</span>
<span class="p">);</span>
<span class="nb">print_r</span><span class="p">(</span><span class="nv">$message_created</span><span class="p">);</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div></div></div><div id="powerpack-java" class="tab-pane">

<figure><pre><code class="language-java" data-lang="java"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="kn">package</span> <span class="nn">com.plivo.api</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">com.plivo.api.models.message.Message</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.exceptions.PlivoRestException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">java.io.IOException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">java.util.Collections</span><span class="o">;</span>

<span class="kd">class</span> <span class="nc">Example</span> <span class="o">{</span>
 &nbsp;<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="kd">throws</span> <span class="nc">IOException</span><span class="o">,</span> <span class="nc">PlivoRestException</span> <span class="o">{</span>
 &nbsp; &nbsp;<span class="nc">Plivo</span><span class="o">.</span><span class="na">init</span><span class="o">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="o">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="o">);</span>
 &nbsp; &nbsp;<span class="nc">Message</span><span class="o">.</span><span class="na">creator</span><span class="o">(</span><span class="s">"&lt;powerpack_uuid&gt;"</span><span class="o">,</span><span class="s">"&lt;destination_number&gt;"</span><span class="o">),</span> <span class="s">"Test Message"</span><span class="o">).</span><span class="na">create</span><span class="o">();</span>
 &nbsp;<span class="o">}</span>
<span class="o">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="powerpack-go" class="tab-pane">

<figure><pre><code class="language-go" data-lang="go"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
	<span class="s">"fmt"</span>

	<span class="s">"github.com/plivo/plivo-go/v7"</span>
<span class="p">)</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">client</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">plivo</span><span class="o">.</span><span class="n">NewClient</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">plivo</span><span class="o">.</span><span class="n">ClientOptions</span><span class="p">{})</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
		<span class="k">return</span>
	<span class="p">}</span>
	<span class="n">client</span><span class="o">.</span><span class="n">Messages</span><span class="o">.</span><span class="n">Create</span><span class="p">(</span><span class="n">plivo</span><span class="o">.</span><span class="n">MessageCreateParams</span><span class="p">{</span>
		<span class="n">PowerpackUUID</span><span class="o">:</span> <span class="s">"&lt;powerpack_uuid&gt;"</span><span class="p">,</span>
		<span class="n">Dst</span><span class="o">:</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="s">"&lt;destination_number&gt;"</span><span class="p">,</span>
		<span class="n">Text</span><span class="o">:</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">"Test Message"</span><span class="p">,</span>
	<span class="p">})</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="powerpack-net" class="tab-pane">
<figure><pre><code class="language-c#" data-lang="c#"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>	
<span class="k">using</span> <span class="nn">System.Collections.Generic</span><span class="p">;</span>	
<span class="k">using</span> <span class="nn">Plivo</span><span class="p">;</span>	

<span class="k">internal</span> <span class="k">class</span> <span class="nc">Program</span>	
<span class="p">{</span>	
 &nbsp; &nbsp;<span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>	
 &nbsp; &nbsp;<span class="p">{</span>	
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">api</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">PlivoApi</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s">"&lt;auth_token&gt;"</span><span class="p">);</span>	
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">response</span> <span class="p">=</span> <span class="n">api</span><span class="p">.</span><span class="n">Message</span><span class="p">.</span><span class="nf">Create</span><span class="p">(</span>	
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">powerpack_uuid</span><span class="p">:</span><span class="s">"&lt;powerpack_uuid&gt;"</span><span class="p">,</span>	
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">dst</span><span class="p">:</span><span class="k">new</span> <span class="n">List</span><span class="p">&lt;</span><span class="n">String</span><span class="p">&gt;{</span><span class="s">"&lt;destination_number&gt;"</span><span class="p">},</span>	
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">text</span><span class="p">:</span><span class="s">"Test Message"</span>	
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">);</span>	
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">response</span><span class="p">);</span>	
 &nbsp; &nbsp;<span class="p">}</span>	
<span class="p">}</span>	
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;

<style>

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
    padding-inline: 15px;
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

element.style {
}
@media (min-width: 768px)
.language-list.nav-tabs {
    -ms-flex-pack: start;
    justify-content: flex-start;
}

.language-list.nav-tabs {
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0;
    padding: 1rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
    background: rgb(42, 42, 60);
}
@media (min-width: 768px)
.language-list.nav-tabs {
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.language-list.nav-tabs {
    border-bottom: 0;
    -ms-flex-pack: justify;
    justify-content: flex-start;
}
@media (min-width: 768px)
.language-list {
    line-height: 2;
    margin: 0 -0.3125rem 0.625rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
@media (min-width: 768px)
.language-list {
    line-height: 2;
    margin: 0 -0.3125rem 0.625rem;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.language-list {
    font-weight: 500;
    font-size: .875rem;
    line-height: 1.1;
    color: #999;
    margin: 0 0 0.625rem;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.nav-tabs {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    line-height: 1rem;
}
#sidebar .widget ul, .checklist, .column-list, .partners-list, .subnav-list, #nav ul, .menu-widget, .social-networks, .documentation-section ul:not([class]), .about-us_info, .customers-list, .rating-list, .blog-detail-list, .article-section ul:not([class]), .social-links, .filters-list, .continents-list, .country-list, .summary-holder .list, .features-box .list, .components-icons, .guidelines-info .box ul, .sub-menu-panel .accordion, .sub-menu-panel .accordion ul, .tag-list, .language-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
.d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
}
.nav-tabs {
    border-bottom: 1px solid #dee2e6;
}
.nav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 0;
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 0;
}
*, *::before, *::after {
    box-sizing: border-box;
}
*, *::before, *::after {
    box-sizing: inherit;
}
*, *::before, *::after {
    box-sizing: border-box;
}
user agent stylesheet
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
li {
    margin-bottom: 0;
}
.blog-post-body li {
    padding-left: 0.25rem;
    font-size: 14px;
    line-height: 1.8;
    margin: 0px 10px;
}
.blog-post-body a {
    color: rgb(153, 153, 153);
}
.blog-post-body a:hover {
    color: green;
}
</style><p>Your message will be sent via one of the phone numbers in the Powerpack number pool. </p><p>For more information, visit our <a href="https://www.plivo.com/docs/sms/powerpack/">Powerpack documentation</a>.</p><h3>Pricing</h3><p>Powerpack is enabled on your account at no extra cost. You pay only for actual text messages sent and received.</p><h3>Upcoming enhancements</h3><p>We’re actively working on additional Powerpack features. Some of the enhancements planned for the coming months include:</p><p><strong>Alphanumeric sender IDs:</strong> Many countries allow using brand names and keywords as <a href="https://www.plivo.com/docs/sms/concepts/sender-id-usage/">sender IDs</a>. Soon, customers will have the option to configure Powerpack to use alphanumeric sender IDs for SMS messages to these countries.</p><p><strong>Powerpack management APIs:</strong> We’re working on APIs to create new Powerpacks and manage number pools programmatically. </p><p><strong>Content optimization features:</strong> We’re also working on features to better manage the content of your text messages based on country-specific support for characters sets and message length.</p><p>Not yet using Plivo? Getting started takes just five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
