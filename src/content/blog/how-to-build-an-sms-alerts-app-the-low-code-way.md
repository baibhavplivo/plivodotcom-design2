---
title: "How to Build an SMS Alerts Application the Low-Code Way Using PHLO"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-02-01T00:00:00.000Z"
updatedDate: "2025-11-23T04:38:31.000Z"
image: "/images/blog/6580112d506e4e17265e954d_sms-alert.png"
thumbnail: "/images/blog/6580112d506e4e17265e954d_sms-alert.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["phlo", "how-to", "alerts", "use-cases"]
seoTitle: "How to Build an SMS Alerts Application the Low-Code Way Using PHLO"
webflowItemId: "6580127662633c1f4fbaec3f"
---
<p>Alerts can help people receive crucial updates in a timely manner, allowing them to make timely decisions. You can create SMS alerts easily by using our PHLO visual workflow builder.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. If you’re using a Plivo Trial account, you can send SMS messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/sandbox-numbers/">Sandbox Numbers</a> page.</p><h2>Create the PHLO</h2><p>To create a PHLO, visit the <a href="https://console.plivo.com/phlo/list/">PHLO</a> page of the Plivo console. If this is your first PHLO, the PHLO page will be empty.</p><ul><li>Click <strong>Create New PHLO</strong>.</li><li>In the <strong>Choose your use case</strong> pop-up, click <strong>Build my own</strong>. The PHLO canvas will appear with the <strong>Start</strong> node.<strong>Note:</strong> The Start node is the starting point of any PHLO. It lets you trigger a PHLO to start upon one of three actions: incoming SMS message, incoming call, or API request.</li><li>From the list of components on the left-hand side, drag and drop the <strong>Send Message</strong> component onto the canvas. When a component is placed on the canvas it becomes a node.</li><li>Draw a line to connect the <strong>Start</strong> node’s <strong>API Request</strong> trigger state to the <strong>Send Message</strong> node.</li></ul><video class="d-pointer-events" width="100%" height="auto" autoplay="autoplay" controls="" loop="" disablepictureinpicture="" controlslist="nodownload">
 &nbsp; &nbsp;<source src="https://www.plivo.com/assets/posts/images/phlo/sms_alert/connect_sms.mp4" type="video/mp4">
 &nbsp;</video><ul><li>In the Configuration pane at the right of the canvas, configure the <strong>Send Message</strong> node with a sender ID in the <strong>From</strong> field. Enter the destination number you wish to send a message to in the <strong>To</strong> field. Put your message in the <strong>Text</strong> field.<strong>Note:</strong> You can define a static payload by specifying values when you create the PHLO, or define a dynamic payload by passing values through <a href="https://shopify.github.io/liquid/">Liquid</a> templating parameters when you trigger the PHLO from your application.</li><li>Once you’ve configured the node, click <strong>Validate</strong> to save the configuration. </li></ul><video class="d-pointer-events" width="100%" height="auto" autoplay="autoplay" controls="" loop="" disablepictureinpicture="" controlslist="nodownload">
 &nbsp; &nbsp;<source src="https://www.plivo.com/assets/posts/images/phlo/sms_alert/config_sms.mp4" type="video/mp4">
 &nbsp;</video><ul><li>After you complete the configuration, give the PHLO a name by clicking in the upper left, then click <strong>Save</strong>.</li></ul><p>Your complete PHLO should look like this.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658011836f74b290df4e7b43_sms-notification.jpeg" alt="SMS Notification" width="auto" height="auto" loading="auto"></div></figure><p>Your PHLO is now ready to test.</p><h2>Trigger the PHLO</h2><p>You integrate a PHLO into your application workflow by making an API request to trigger the PHLO with the required payload — the set of parameters you pass to the PHLO. You can define a static payload by specifying values when you create the PHLO, or define a dynamic payload by passing values through parameters when you trigger the PHLO from your application.</p><p>In either case, you need your Auth ID and Auth Token, which you can get from the overview page of the Plivo <a href="https://console.plivo.com/dashboard/">console</a>.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c3f6374fb07dc0710ed_AuthID.jpeg" alt="AUTHID" width="auto" height="auto" loading="auto"></div></figure><p>You also need the PHLO ID, which you can copy from the <a href="https://console.plivo.com/phlo/list/">PHLO list</a> page.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c3f76d8f053ed9b9dac_Phlo_listing.jpeg" alt="PHLO List" width="auto" height="auto" loading="auto"></div></figure><h3>With a static payload</h3><p>When you configure values when creating the PHLO, they act as a static payload.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c3f0c35b656a27ed79f_send_sms_static.png" alt="With Static Payload" width="auto" height="auto" loading="auto"></div></figure><h4>Code</h4><p>Create a file and paste the below code.<br></p><div class="tabs">
 &nbsp;<ul class="tab-btns language-list d-flex nav-tabs nav">
 &nbsp; &nbsp;<li class="active"><a href="#trigger-phlo-python" class="active" data-toggle="tab">Python</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-ruby" data-toggle="tab">Ruby</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-node" data-toggle="tab">Node.js</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-php" data-toggle="tab">PHP</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-java" data-toggle="tab">Java</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-go" data-toggle="tab">Go</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-net" data-toggle="tab">.NET</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-curl" data-toggle="tab">Curl</a></li>
 &nbsp;</ul>

 &nbsp;<div class="tab-content">
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-python" class="tab-pane fade show active">

<figure><pre><code class="language-py" data-lang="py"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
</pre></td><td class="code"><pre><span class="kn">import</span> <span class="nn">plivo</span>

<span class="n">phlo_id</span> <span class="o">=</span> <span class="s">"&lt;phlo_id&gt;"</span>
<span class="n">phlo_client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">)</span>
<span class="n">phlo</span> <span class="o">=</span> <span class="n">phlo_client</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="n">phlo_id</span><span class="p">)</span>
<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="n">run</span><span class="p">()</span>
<span class="k">print</span><span class="p">(</span><span class="n">response</span><span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-ruby" class="tab-pane">

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
14
15
16
17
18
19
20
21
</pre></td><td class="code"><pre><span class="nb">require</span> <span class="s1">'rubygems'</span>
<span class="nb">require</span> <span class="s1">'plivo'</span>

<span class="kp">include</span> <span class="no">Plivo</span>

<span class="no">AUTH_ID</span> <span class="o">=</span> <span class="s1">'&lt;auth_id&gt;'</span>
<span class="no">AUTH_TOKEN</span> <span class="o">=</span> <span class="s1">'&lt;auth_token&gt;'</span>

<span class="n">client</span> <span class="o">=</span> <span class="no">Phlo</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="no">AUTH_ID</span><span class="p">,</span> <span class="no">AUTH_TOKEN</span><span class="p">)</span>

<span class="c1"># if credentials are stored in the PLIVO_AUTH_ID and the PLIVO_AUTH_TOKEN environment variables</span>
<span class="c1"># then initialize client as:</span>
<span class="c1"># client = Phlo.new</span>

<span class="k">begin</span>
 &nbsp;<span class="n">phlo</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="nf">phlo</span><span class="p">.</span><span class="nf">get</span><span class="p">(</span><span class="s1">'&lt;phlo_id&gt;'</span><span class="p">)</span>
 &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="nf">run</span><span class="p">()</span>
 &nbsp;<span class="nb">puts</span> <span class="n">response</span>
<span class="k">rescue</span> <span class="no">PlivoRESTError</span> <span class="o">=&gt;</span> <span class="n">e</span>
 &nbsp;<span class="nb">puts</span> <span class="s1">'Exception: '</span> <span class="o">+</span> <span class="n">e</span><span class="p">.</span><span class="nf">message</span>
<span class="k">end</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-node" class="tab-pane">

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
11
12
</pre></td><td class="code"><pre><span class="kd">var</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">PhloClient</span> <span class="o">=</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">PhloClient</span><span class="p">;</span>

<span class="kd">var</span> <span class="nx">phloId</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">&lt;phlo_id&gt;</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">phloClient</span> <span class="o">=</span> <span class="nx">phlo</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span>

<span class="nx">phloClient</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">PhloClient</span><span class="p">(</span><span class="dl">'</span><span class="s1">&lt;auth_id&gt;</span><span class="dl">'</span><span class="p">,</span> <span class="dl">'</span><span class="s1">&lt;auth_token&gt;</span><span class="dl">'</span><span class="p">);</span>
<span class="nx">phloClient</span><span class="p">.</span><span class="nx">phlo</span><span class="p">(</span><span class="nx">phloId</span><span class="p">).</span><span class="nx">run</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">result</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Phlo run result</span><span class="dl">'</span><span class="p">,</span> <span class="nx">result</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="dl">'</span><span class="s1">Phlo run failed</span><span class="dl">'</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>
<span class="p">});</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="trigger-phlo-php" class="tab-pane">

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
</pre></td><td class="code"><pre><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\Resources\PHLO\PhloRestClient</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\Exceptions\PlivoRestException</span><span class="p">;</span>
<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">PhloRestClient</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s2">"&lt;auth_token&gt;"</span><span class="p">);</span>

<span class="nv">$phlo</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">phlo</span><span class="o">-&gt;</span><span class="nf">get</span><span class="p">(</span><span class="s2">"&lt;phlo_id&gt;"</span><span class="p">);</span>
<span class="k">try</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="nv">$phlo</span><span class="o">-&gt;</span><span class="nf">run</span><span class="p">();</span>
 &nbsp; &nbsp;<span class="nb">print_r</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
<span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nc">PlivoRestException</span> <span class="nv">$ex</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nb">print_r</span><span class="p">(</span><span class="nv">$ex</span><span class="p">);</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div></div></div><div id="trigger-phlo-java" class="tab-pane">

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
14
15
16
17
18
19
</pre></td><td class="code"><pre><span class="kn">import</span> <span class="nn">com.plivo.api.Plivo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.PlivoClient</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.exceptions.PlivoRestException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.phlo.Phlo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">java.io.IOException</span><span class="o">;</span>

<span class="kd">public</span> <span class="kd">class</span> <span class="nc">Example</span>
<span class="o">{</span>
 &nbsp; &nbsp;<span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="nc">String</span> <span class="n">authId</span> <span class="o">=</span> <span class="s">"&lt;auth_id&gt;"</span><span class="o">;</span>
 &nbsp; &nbsp;<span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="nc">String</span> <span class="n">authToken</span> <span class="o">=</span> <span class="s">"&lt;auth_token&gt;"</span><span class="o">;</span>
 &nbsp; &nbsp;<span class="kd">private</span> <span class="kd">static</span> <span class="nc">PlivoClient</span> <span class="n">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">PlivoClient</span><span class="o">(</span><span class="n">authId</span><span class="o">,</span> <span class="n">authToken</span><span class="o">);</span>
 &nbsp; &nbsp;<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="kd">throws</span> <span class="nc">IOException</span><span class="o">,</span> <span class="nc">PlivoRestException</span>
 &nbsp; &nbsp;<span class="o">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">String</span> <span class="n">phloId</span> <span class="o">=</span> <span class="s">"&lt;phlo_id&gt;"</span><span class="o">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Plivo</span><span class="o">.</span><span class="na">init</span><span class="o">(</span><span class="n">authId</span><span class="o">,</span> <span class="n">authToken</span><span class="o">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Phlo</span> <span class="n">phlo</span> <span class="o">=</span> <span class="nc">Phlo</span><span class="o">.</span><span class="na">getter</span><span class="o">(</span><span class="n">phloId</span><span class="o">).</span><span class="na">client</span><span class="o">(</span><span class="n">client</span><span class="o">).</span><span class="na">get</span><span class="o">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">PhloUpdateResponse</span> <span class="n">response</span> <span class="o">=</span> <span class="nc">Phlo</span><span class="o">.</span><span class="na">updater</span><span class="o">(</span><span class="n">phloId</span><span class="o">).</span><span class="na">payload</span><span class="o">().</span><span class="na">run</span><span class="o">();</span>
 &nbsp; &nbsp;<span class="o">}</span>
<span class="o">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-go" class="tab-pane">

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
</pre></td><td class="code"><pre><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
	<span class="s">"fmt"</span>
	<span class="s">"plivo-go"</span>
<span class="p">)</span>

<span class="c">// Initialize the following params with corresponding values to trigger resources</span>
<span class="k">const</span> <span class="n">authId</span> <span class="o">=</span> <span class="s">"&lt;auth_id&gt;"</span>
<span class="k">const</span> <span class="n">authToken</span> <span class="o">=</span> <span class="s">"&lt;auth_token&gt;"</span>
<span class="k">const</span> <span class="n">phloId</span> <span class="o">=</span> <span class="s">"&lt;phlo_id&gt;"</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">testPhloRunWithoutParams</span><span class="p">()</span>
<span class="p">}</span>

<span class="k">func</span> <span class="n">testPhloRunWithoutParams</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">phloClient</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">plivo</span><span class="o">.</span><span class="n">NewPhloClient</span><span class="p">(</span><span class="n">authId</span><span class="p">,</span> <span class="n">authToken</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">plivo</span><span class="o">.</span><span class="n">ClientOptions</span><span class="p">{})</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
		<span class="k">return</span>
	<span class="p">}</span>
	<span class="n">phloGet</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">phloClient</span><span class="o">.</span><span class="n">Phlos</span><span class="o">.</span><span class="n">Get</span><span class="p">(</span><span class="n">phloId</span><span class="p">)</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
		<span class="k">return</span>
	<span class="p">}</span>
	<span class="n">response</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">phloGet</span><span class="o">.</span><span class="n">Run</span><span class="p">(</span><span class="no">nil</span><span class="p">)</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
		<span class="k">return</span>
	<span class="p">}</span>
	<span class="n">fmt</span><span class="o">.</span><span class="n">Printf</span><span class="p">(</span><span class="s">"Response: %#v</span><span class="se">\n</span><span class="s">"</span><span class="p">,</span> <span class="n">response</span><span class="p">)</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-net" class="tab-pane">

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
</pre></td><td class="code"><pre><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Plivo</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">test_PHLO</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">class</span> <span class="nc">Program</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phloClient</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">PhloApi</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">);</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phloID</span> <span class="p">=</span> <span class="s">"&lt;phlo_id&gt;"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phlo</span> <span class="p">=</span> <span class="n">phloClient</span><span class="p">.</span><span class="n">Phlo</span><span class="p">.</span><span class="nf">Get</span><span class="p">(</span><span class="n">phloID</span><span class="p">);</span> &nbsp; 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">phlo</span><span class="p">.</span><span class="nf">Run</span><span class="p">());</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div><div id="trigger-phlo-curl" class="tab-pane">

<figure><pre><code class="language-zsh" data-lang="zsh"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
</pre></td><td class="code"><pre>curl <span class="nt">--request</span> POST <span class="se">\</span>
 &nbsp;<span class="nt">--user</span> AUTH_ID:AUTH_TOKEN <span class="se">\</span>
 &nbsp;<span class="nt">--url</span> <span class="s1">'https://phlorunner.plivo.com/v1/account/{auth_id}/phlo/{phlo_id}'</span> <span class="se">\</span>
 &nbsp;<span class="nt">--header</span> <span class="s1">'Content-Type: application/json'</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;

<p>Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phlo_id placeholder with your PHLO ID from the <a href="https://console.plivo.com/phlo/list/">Plivo console</a>.</p><h3>With a dynamic payload</h3><p>To use dynamic values for the parameters, use Liquid templating parameters when you create the PHLO and pass the values from your code when you trigger it.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65800c5184117f80c26422d2_send_sms_access_payload.png" alt="With Dynamic Payload" width="auto" height="auto" loading="auto"></div></figure><h4>Code</h4><p>Create a file and paste the below code.<br></p><div class="tabs">
 &nbsp;<ul class="tab-btns language-list d-flex nav-tabs nav">
 &nbsp; &nbsp;<li class="active"><a href="#trigger-phlo-payload-python" class="active" data-toggle="tab">Python</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-ruby" data-toggle="tab">Ruby</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-node" data-toggle="tab">Node.js</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-php" data-toggle="tab">PHP</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-java" data-toggle="tab">Java</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-go" data-toggle="tab">Go</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-net" data-toggle="tab">.NET</a></li>
 &nbsp; &nbsp;<li><a href="#trigger-phlo-payload-curl" data-toggle="tab">Curl</a></li>
 &nbsp;</ul>

 &nbsp;<div class="tab-content">
 &nbsp; &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-payload-python" class="tab-pane fade show active">

<figure><pre><code class="language-py" data-lang="py"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
</pre></td><td class="code"><pre><span class="kn">import</span> <span class="nn">plivo</span>

<span class="n">auth_id</span> <span class="o">=</span> <span class="s">'&lt;auth_id&gt;'</span>
<span class="n">auth_token</span> <span class="o">=</span> <span class="s">'&lt;auth_token&gt;'</span>
<span class="n">phlo_id</span> <span class="o">=</span> <span class="s">'&lt;phlo_id&gt;'</span>
<span class="n">payload</span> <span class="o">=</span> <span class="p">{</span><span class="s">"From"</span> <span class="p">:</span> <span class="s">"&lt;caller_id&gt;"</span><span class="p">,</span><span class="s">"To"</span> <span class="p">:</span> <span class="s">"&lt;destination_number&gt;"</span><span class="p">}</span>
<span class="n">phlo_client</span> <span class="o">=</span> <span class="n">plivo</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">RestClient</span><span class="p">(</span><span class="n">auth_id</span><span class="o">=</span><span class="n">auth_id</span><span class="p">,</span> <span class="n">auth_token</span><span class="o">=</span><span class="n">auth_token</span><span class="p">)</span>
<span class="n">phlo</span> <span class="o">=</span> <span class="n">phlo_client</span><span class="p">.</span><span class="n">phlo</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="n">phlo_id</span><span class="p">)</span>
<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="n">run</span><span class="p">(</span><span class="o">**</span><span class="n">payload</span><span class="p">)</span>
<span class="k">print</span> <span class="p">(</span><span class="n">response</span><span class="p">)</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp;<div id="trigger-phlo-payload-ruby" class="tab-pane">

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
</pre></td><td class="code"><pre><span class="nb">require</span> <span class="s1">'rubygems'</span>
<span class="nb">require</span> <span class="s1">'plivo'</span>

<span class="kp">include</span> <span class="no">Plivo</span>

<span class="no">AUTH_ID</span> <span class="o">=</span> <span class="s1">'&lt;auth_id&gt;'</span>
<span class="no">AUTH_TOKEN</span> <span class="o">=</span> <span class="s1">'&lt;auth_token&gt;'</span>

<span class="n">client</span> <span class="o">=</span> <span class="no">Phlo</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="no">AUTH_ID</span><span class="p">,</span> <span class="no">AUTH_TOKEN</span><span class="p">)</span>

<span class="c1"># if credentials are stored in the PLIVO_AUTH_ID and the PLIVO_AUTH_TOKEN environment variables</span>
<span class="c1"># then initialize client as:</span>
<span class="c1"># client = Phlo.new</span>

<span class="k">begin</span>
 &nbsp;<span class="n">phlo</span> <span class="o">=</span> <span class="n">client</span><span class="p">.</span><span class="nf">phlo</span><span class="p">.</span><span class="nf">get</span><span class="p">(</span><span class="s1">'&lt;phlo_id&gt;'</span><span class="p">)</span>
 &nbsp;<span class="c1">#parameters set in PHLO - params</span>
 &nbsp;<span class="n">params</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp; <span class="no">From</span><span class="p">:</span> <span class="s1">'&lt;caller_id&gt;'</span><span class="p">,</span>
 &nbsp; &nbsp; <span class="no">To</span><span class="p">:</span> <span class="s1">'&lt;destination_number&gt;'</span><span class="p">,</span>
 &nbsp;<span class="p">}</span>
 &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">phlo</span><span class="p">.</span><span class="nf">run</span><span class="p">(</span><span class="n">params</span><span class="p">)</span>
 &nbsp;<span class="nb">puts</span> <span class="n">response</span>
<span class="k">rescue</span> <span class="no">PlivoRESTError</span> <span class="o">=&gt;</span> <span class="n">e</span>
 &nbsp;<span class="nb">puts</span> <span class="s1">'Exception: '</span> <span class="o">+</span> <span class="n">e</span><span class="p">.</span><span class="nf">message</span>
<span class="k">end</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; 
 &nbsp; &nbsp;<div id="trigger-phlo-payload-node" class="tab-pane">

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
11
12
13
14
15
16
17
18
</pre></td><td class="code"><pre><span class="kd">var</span> <span class="nx">plivo</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="dl">'</span><span class="s1">plivo</span><span class="dl">'</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">PhloClient</span> <span class="o">=</span> <span class="nx">plivo</span><span class="p">.</span><span class="nx">PhloClient</span><span class="p">;</span>

<span class="kd">var</span> <span class="nx">authId</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">&lt;auth_id&gt;</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">authToken</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">&lt;auth_token&gt;</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">phloId</span> <span class="o">=</span> <span class="dl">'</span><span class="s1">&lt;phlo_id&gt;</span><span class="dl">'</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">phloClient</span> <span class="o">=</span> <span class="nx">phlo</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span>

<span class="kd">var</span> <span class="nx">payload</span> <span class="o">=</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="na">From</span><span class="p">:</span> <span class="dl">'</span><span class="s1">&lt;caller_id&gt;</span><span class="dl">'</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="na">To</span><span class="p">:</span> <span class="dl">'</span><span class="s1">&lt;destination_number&gt;</span><span class="dl">'</span><span class="p">,</span>
<span class="p">}</span>
<span class="nx">phloClient</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">PhloClient</span><span class="p">(</span><span class="nx">authId</span><span class="p">,</span> <span class="nx">authToken</span><span class="p">);</span>
<span class="nx">phloClient</span><span class="p">.</span><span class="nx">phlo</span><span class="p">(</span><span class="nx">phloId</span><span class="p">).</span><span class="nx">run</span><span class="p">(</span><span class="nx">payload</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">result</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Phlo run result</span><span class="dl">'</span><span class="p">,</span> <span class="nx">result</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nx">console</span><span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="dl">'</span><span class="s1">Phlo run failed</span><span class="dl">'</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>
<span class="p">});</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div></div></div><div id="trigger-phlo-payload-php" class="tab-pane">

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
</pre></td><td class="code"><pre><span class="cp">&lt;?php</span>
<span class="k">require</span> <span class="s1">'vendor/autoload.php'</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\Resources\PHLO\PhloRestClient</span><span class="p">;</span>
<span class="kn">use</span> <span class="nc">Plivo\Exceptions\PlivoRestException</span><span class="p">;</span>
<span class="nv">$client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">PhloRestClient</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s2">"&lt;auth_token&gt;"</span><span class="p">);</span>

<span class="nv">$phlo</span> <span class="o">=</span> <span class="nv">$client</span><span class="o">-&gt;</span><span class="n">phlo</span><span class="o">-&gt;</span><span class="nf">get</span><span class="p">(</span><span class="s2">"&lt;phlo_id&gt;"</span><span class="p">);</span>
<span class="k">try</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nv">$response</span> <span class="o">=</span> <span class="nv">$phlo</span><span class="o">-&gt;</span><span class="nf">run</span><span class="p">([</span><span class="s2">"From"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;caller_id&gt;"</span><span class="p">,</span> <span class="s2">"To"</span> <span class="o">=&gt;</span> <span class="s2">"&lt;destination_number&gt;"</span><span class="p">]);</span>
 &nbsp; &nbsp;<span class="nb">print_r</span><span class="p">(</span><span class="nv">$response</span><span class="p">);</span>
<span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nc">PlivoRestException</span> <span class="nv">$ex</span><span class="p">)</span> <span class="p">{</span>
 &nbsp; &nbsp;<span class="nb">print_r</span><span class="p">(</span><span class="nv">$ex</span><span class="p">);</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div> 
 &nbsp; &nbsp;<div id="trigger-phlo-payload-java" class="tab-pane">

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
14
15
16
17
18
19
20
21
22
</pre></td><td class="code"><pre><span class="kn">import</span> <span class="nn">com.plivo.api.Plivo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.PlivoClient</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.exceptions.PlivoRestException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">com.plivo.api.models.phlo.Phlo</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">java.io.IOException</span><span class="o">;</span>

<span class="kd">public</span> <span class="kd">class</span> <span class="nc">Example</span>
<span class="o">{</span>
 &nbsp; &nbsp;<span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="nc">String</span> <span class="n">authId</span> <span class="o">=</span> <span class="s">"&lt;auth_id&gt;"</span><span class="o">;</span>
 &nbsp; &nbsp;<span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="nc">String</span> <span class="n">authToken</span> <span class="o">=</span> <span class="s">"&lt;auth_token&gt;"</span><span class="o">;</span>
 &nbsp; &nbsp;<span class="kd">private</span> <span class="kd">static</span> <span class="nc">PlivoClient</span> <span class="n">client</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">PlivoClient</span><span class="o">(</span><span class="n">authId</span><span class="o">,</span> <span class="n">authToken</span><span class="o">);</span>
 &nbsp; &nbsp;<span class="kd">public</span> <span class="kd">static</span> <span class="kt">void</span> <span class="nf">main</span><span class="o">(</span><span class="nc">String</span><span class="o">[]</span> <span class="n">args</span><span class="o">)</span> <span class="kd">throws</span> <span class="nc">IOException</span><span class="o">,</span> <span class="nc">PlivoRestException</span>
 &nbsp; &nbsp;<span class="o">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">String</span> <span class="n">phloId</span> <span class="o">=</span> <span class="s">"&lt;phlo_id&gt;"</span><span class="o">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Plivo</span><span class="o">.</span><span class="na">init</span><span class="o">(</span><span class="n">authId</span><span class="o">,</span> <span class="n">authToken</span><span class="o">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Phlo</span> <span class="n">phlo</span> <span class="o">=</span> <span class="nc">Phlo</span><span class="o">.</span><span class="na">getter</span><span class="o">(</span><span class="n">phloId</span><span class="o">).</span><span class="na">client</span><span class="o">(</span><span class="n">client</span><span class="o">).</span><span class="na">get</span><span class="o">();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">Map</span><span class="o">&lt;</span><span class="nc">String</span><span class="o">,</span> <span class="nc">Object</span><span class="o">&gt;</span> <span class="n">payload</span> <span class="o">=</span> <span class="k">new</span> <span class="nc">HashMap</span><span class="o">&lt;&gt;();</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">payload</span><span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="s">"From"</span><span class="o">,</span> <span class="s">"&lt;caller_id&gt;"</span><span class="o">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">payload</span><span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="s">"To"</span><span class="o">,</span> <span class="s">"&lt;destination_number&gt;"</span><span class="o">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="nc">PhloUpdateResponse</span> <span class="n">response</span> <span class="o">=</span> <span class="nc">Phlo</span><span class="o">.</span><span class="na">updater</span><span class="o">(</span><span class="n">phloId</span><span class="o">).</span><span class="na">payload</span><span class="o">(</span><span class="n">payload</span><span class="o">).</span><span class="na">run</span><span class="o">();</span>
 &nbsp; &nbsp;<span class="o">}</span>
<span class="o">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div><div id="trigger-phlo-payload-go" class="tab-pane">

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
36
37
38
39
</pre></td><td class="code"><pre><span class="k">package</span> <span class="n">main</span>

<span class="k">import</span> <span class="p">(</span>
	<span class="s">"fmt"</span>
	<span class="s">"plivo-go"</span>
<span class="p">)</span>

<span class="c">// Initialize these parameters with corresponding values to trigger resources</span>
<span class="k">const</span> <span class="n">authId</span> <span class="o">=</span> <span class="s">"&lt;auth_id&gt;"</span>
<span class="k">const</span> <span class="n">authToken</span> <span class="o">=</span> <span class="s">"&lt;auth_token&gt;"</span>
<span class="k">const</span> <span class="n">phloId</span> <span class="o">=</span> <span class="s">"&lt;phlo_id&gt;"</span>

<span class="k">func</span> <span class="n">main</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">testPhloRunWithParams</span><span class="p">()</span>
<span class="p">}</span>

<span class="k">func</span> <span class="n">testPhloRunWithParams</span><span class="p">()</span> <span class="p">{</span>
	<span class="n">phloClient</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">plivo</span><span class="o">.</span><span class="n">NewPhloClient</span><span class="p">(</span><span class="n">authId</span><span class="p">,</span> <span class="n">authToken</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">plivo</span><span class="o">.</span><span class="n">ClientOptions</span><span class="p">{})</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
		<span class="k">return</span>
	<span class="p">}</span>
	<span class="n">phloGet</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">phloClient</span><span class="o">.</span><span class="n">Phlos</span><span class="o">.</span><span class="n">Get</span><span class="p">(</span><span class="n">phloId</span><span class="p">)</span>
	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="n">fmt</span><span class="o">.</span><span class="n">Print</span><span class="p">(</span><span class="s">"Error"</span><span class="p">,</span> <span class="n">err</span><span class="o">.</span><span class="n">Error</span><span class="p">())</span>
		<span class="k">return</span>
	<span class="p">}</span>
	<span class="c">//pass corresponding from and to values</span>
	<span class="k">type</span> <span class="n">params</span> <span class="k">map</span><span class="p">[</span><span class="kt">string</span><span class="p">]</span><span class="k">interface</span><span class="p">{}</span>
	<span class="n">response</span><span class="p">,</span> <span class="n">err</span> <span class="o">:=</span> <span class="n">phloGet</span><span class="o">.</span><span class="n">Run</span><span class="p">(</span><span class="n">params</span><span class="p">{</span>
		<span class="s">"From"</span><span class="o">:</span> <span class="s">"&lt;caller_id&gt;"</span><span class="p">,</span>
		<span class="s">"To"</span><span class="o">:</span> &nbsp; <span class="s">"&lt;destination_number&gt;"</span><span class="p">,</span>
	<span class="p">})</span>

	<span class="k">if</span> <span class="n">err</span> <span class="o">!=</span> <span class="no">nil</span> <span class="p">{</span>
		<span class="nb">println</span><span class="p">(</span><span class="n">err</span><span class="p">)</span>
	<span class="p">}</span>
	<span class="n">fmt</span><span class="o">.</span><span class="n">Printf</span><span class="p">(</span><span class="s">"Response: %#v</span><span class="se">\n</span><span class="s">"</span><span class="p">,</span> <span class="n">response</span><span class="p">)</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div>
 &nbsp; &nbsp; &nbsp;<div id="trigger-phlo-payload-net" class="tab-pane">

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
18
19
20
21
22
23
</pre></td><td class="code"><pre><span class="k">using</span> <span class="nn">System</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">System.Collections.Generic</span><span class="p">;</span>
<span class="k">using</span> <span class="nn">Plivo</span><span class="p">;</span>

<span class="k">namespace</span> <span class="nn">test_PHLO</span>
<span class="p">{</span>
 &nbsp; &nbsp;<span class="k">class</span> <span class="nc">Program</span>
 &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="k">public</span> <span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phloClient</span> <span class="p">=</span> <span class="k">new</span> <span class="nf">PhloApi</span><span class="p">(</span><span class="s">"&lt;auth_id&gt;"</span><span class="p">,</span> <span class="s">"&lt;auth_token&gt;"</span><span class="p">);</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phloID</span> <span class="p">=</span> <span class="s">"&lt;phlo_id&gt;"</span><span class="p">;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">phlo</span> <span class="p">=</span> <span class="n">phloClient</span><span class="p">.</span><span class="n">Phlo</span><span class="p">.</span><span class="nf">Get</span><span class="p">(</span><span class="n">phloID</span><span class="p">);</span> 
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="kt">var</span> <span class="n">data</span> <span class="p">=</span> <span class="k">new</span> <span class="n">Dictionary</span><span class="p">&lt;</span><span class="kt">string</span><span class="p">,</span> <span class="kt">object</span><span class="p">&gt;</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span> <span class="s">"From"</span><span class="p">,</span> <span class="s">"&lt;caller_id&gt;"</span> <span class="p">},</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">{</span> <span class="s">"To"</span><span class="p">,</span> <span class="s">"&lt;destination_number&gt;"</span> <span class="p">}</span>

 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">};</span> &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">phlo</span><span class="p">.</span><span class="nf">Run</span><span class="p">(</span><span class="n">data</span><span class="p">));</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="p">}</span>
 &nbsp; &nbsp;<span class="p">}</span>
<span class="p">}</span>
</pre></td></tr></tbody></table></code></pre></figure>

 &nbsp; &nbsp;</div> &nbsp;
 &nbsp; &nbsp;<div id="trigger-phlo-payload-curl" class="tab-pane">

<figure><pre><code class="language-zsh" data-lang="zsh"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
2
3
4
5
</pre></td><td class="code"><pre>curl <span class="nt">--request</span> POST <span class="se">\</span>
 &nbsp;<span class="nt">--user</span> AUTH_ID:AUTH_TOKEN <span class="se">\</span>
 &nbsp;<span class="nt">--url</span> <span class="s1">'https://phlorunner.plivo.com/v1/account/{auth_id}/phlo/{phlo_id}'</span> <span class="se">\</span>
 &nbsp;<span class="nt">--header</span> <span class="s1">'Content-Type: application/json'</span> <span class="se">\</span>
 &nbsp;<span class="nt">--data</span> <span class="s1">'{"from": "&lt;caller_id&gt;","to": "&lt;destination_number&gt;"}'</span>
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
</style><p>Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phlo_id placeholder with your PHLO ID from the <a href="https://console.plivo.com/phlo/list/">Plivo console</a>. Replace the phone number placeholders with actual phone numbers in <a href="https://en.wikipedia.org/wiki/E.164">E.164 format</a> (for example, +12025551234).</p><h2>Test</h2><p>Save the file and run it.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
