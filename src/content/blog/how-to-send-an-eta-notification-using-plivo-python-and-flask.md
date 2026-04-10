---
title: "How to send an ETA notification using Plivo Python and Flask"
description: "Send ETA alerts and notifications using Python and Flask"
pubDate: "2022-07-12T00:00:00.000Z"
updatedDate: "2024-01-15T04:59:01.000Z"
image: "/images/blog/657fd64ec69448fefa182416_eta-flask.svg"
thumbnail: "/images/blog/657fd64ec69448fefa182416_eta-flask.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["python-sdk", "sms-api", "how-to"]
seoTitle: "Steps to send ETA alerts using Python"
webflowItemId: "657fd8233c077ad0efbab998"
---
<h2>Overview</h2><p>Today, many people order products online and have them delivered. Many retail businesses provide consumers with updates on the estimated time of arrival (ETA) for their orders. You can use the Plivo Python SDK and the Flask framework to create an order, recognize when the order status changes, and send users an SMS notification with the latest ETA. We’ve created some demo code you can use as a template or to see how to incorporate these tasks into your own applications.</p><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. To send messages to the United States and Canada, you must have a Plivo phone number that supports SMS; you can rent numbers from the <a href="https://console.plivo.com/active-phone-numbers/">Numbers</a> page of the Plivo console or by using the <a href="https://www.plivo.com/docs/numbers/">Numbers API</a>. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-python-dev-environment-api-messaging/">set up a Python development environment</a>.</p><h2>How does it work?</h2><p>Our code examples cover three steps of the order and delivery process.</p><ul><li>A user places an order from a web application on their desktop or a mobile app. The order application reports an initial ETA to the consumer.</li><li>The retailer processes the order and updates its system when the ordered item is handed off to a delivery service.</li><li>When the order is delivered, the service updates the delivery status again.</li></ul><p>In the first two steps of the process, the program must calculate an updated ETA to communicate with the consumer.</p><p>For purposes of this demo we’ve put all three functions into one program, but in the real world they might be in three different applications.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/sms/usecase-guides/advanced/eta-notification/eta-notification.mp4" type="video/mp4">
</video><h2>Set up the demo application locally</h2><ul><li>Clone the demo application repository from GitHub.</li></ul><style>
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
    font: 16px Arial,soleil;
    line-height: 29px;
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
<div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>git clone https://github.com/plivo/ETA-notifications-flask.git
</code></pre></div></div><ul><li>Change your working directory to 2fa-python-demo.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nb">cd </span>ETA-notification-flask
</code></pre></div></div><ul><li>Install the dependencies using the requirements.txt file.</li></ul><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>pip <span class="nb">install</span> <span class="nt">-r</span> requirements.txt
</code></pre></div></div><p>Edit .env. Replace the auth placeholders with your authentication credentials from the <a href="https://console.plivo.com/dashboard/">Plivo console</a>. Replace the phone number placeholder with an actual phone number in <a href="https://en.wikipedia.org/wiki/E.164">E.164</a> format (for example, +12025551234).</p><figure style="max-width:1598px" data-rt-max-width="1598px"><div><img src="/images/blog/657fd7b03ca04deb2f24bcd3_env.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>A review of the code</h2><p>Let’s walk through what the code does.</p><p>First, a user enters their name and phone number in an order form. (In a real application, information about the item being ordered, the delivery location, and other information would also be included.) This code adds the order to a database. This application doesn’t send any SMS message.</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/add/orders'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">add_orders</span><span class="p">():</span>
 &nbsp; &nbsp;<span class="n">customer_name</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">form</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'name'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">phone_number</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">form</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="s">'phone_number'</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">order</span> <span class="o">=</span> <span class="n">Order</span><span class="p">(</span><span class="n">customer_name</span><span class="o">=</span><span class="n">customer_name</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">customer_phone_number</span><span class="o">=</span><span class="n">phone_number</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">db</span><span class="p">.</span><span class="n">session</span><span class="p">.</span><span class="n">add</span><span class="p">(</span><span class="n">order</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">db</span><span class="p">.</span><span class="n">session</span><span class="p">.</span><span class="n">commit</span><span class="p">()</span>
 &nbsp; &nbsp;<span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="n">url_for</span><span class="p">(</span><span class="s">'order_index'</span><span class="p">))</span>
</code></pre></div></div><p>Later, someone at the company updates the order status, either by making a change through a user interface, as we show here, or via an automatic update from other software, such as a shipping application. Code on the back end calculates an updated ETA, and this code then sends an SMS message to the customer with the new time.</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/order/&lt;order_id&gt;/pickup'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">order_pickup</span><span class="p">(</span><span class="n">order_id</span><span class="p">):</span>
 &nbsp; &nbsp;<span class="n">order</span> <span class="o">=</span> <span class="n">Order</span><span class="p">.</span><span class="n">query</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="n">order_id</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">order</span><span class="p">.</span><span class="n">status</span> <span class="o">=</span> <span class="s">'Shipped'</span>
 &nbsp; &nbsp;<span class="n">order</span><span class="p">.</span><span class="n">notification_status</span> <span class="o">=</span> <span class="s">'queued'</span>
 &nbsp; &nbsp;<span class="n">db</span><span class="p">.</span><span class="n">session</span><span class="p">.</span><span class="n">commit</span><span class="p">()</span>

 &nbsp; &nbsp;<span class="n">callback_url</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">base_url</span><span class="p">.</span><span class="n">replace</span><span class="p">(</span><span class="s">'/pickup'</span><span class="p">,</span> <span class="s">''</span><span class="p">)</span> <span class="o">+</span> <span class="s">'/notification/status/update'</span>
 &nbsp; &nbsp;<span class="n">send_sms_notification</span><span class="p">(</span><span class="n">order</span><span class="p">.</span><span class="n">customer_phone_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">'Your package is on its way —
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ETA '</span> <span class="o">+</span> <span class="n">now</span><span class="p">.</span><span class="n">strftime</span><span class="p">(</span><span class="s">"%d/%m/%Y %H:%M:%S"</span><span class="p">),</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="n">callback_url</span><span class="p">)</span>

 &nbsp; &nbsp;<span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="n">url_for</span><span class="p">(</span><span class="s">'order_show'</span><span class="p">,</span> <span class="n">order_id</span><span class="o">=</span><span class="n">order_id</span><span class="p">))</span>
</code></pre></div></div><p>Similar code handles notification of package delivery.</p><div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="o">@</span><span class="n">app</span><span class="p">.</span><span class="n">route</span><span class="p">(</span><span class="s">'/order/&lt;order_id&gt;/deliver'</span><span class="p">,</span> <span class="n">methods</span><span class="o">=</span><span class="p">[</span><span class="s">'POST'</span><span class="p">])</span>
<span class="k">def</span> <span class="nf">order_deliver</span><span class="p">(</span><span class="n">order_id</span><span class="p">):</span>
 &nbsp; &nbsp;<span class="n">order</span> <span class="o">=</span> <span class="n">Order</span><span class="p">.</span><span class="n">query</span><span class="p">.</span><span class="n">get</span><span class="p">(</span><span class="n">order_id</span><span class="p">)</span>
 &nbsp; &nbsp;<span class="n">order</span><span class="p">.</span><span class="n">status</span> <span class="o">=</span> <span class="s">'Delivered'</span>
 &nbsp; &nbsp;<span class="n">order</span><span class="p">.</span><span class="n">notification_status</span> <span class="o">=</span> <span class="s">'queued'</span>
 &nbsp; &nbsp;<span class="n">db</span><span class="p">.</span><span class="n">session</span><span class="p">.</span><span class="n">commit</span><span class="p">()</span>

 &nbsp; &nbsp;<span class="n">callback_url</span> <span class="o">=</span> <span class="n">request</span><span class="p">.</span><span class="n">base_url</span><span class="p">.</span><span class="n">replace</span><span class="p">(</span><span class="s">'/deliver'</span><span class="p">,</span> <span class="s">''</span><span class="p">)</span> <span class="o">+</span> <span class="s">'/notification/status/update'</span>
 &nbsp; &nbsp;<span class="n">send_sms_notification</span><span class="p">(</span><span class="n">order</span><span class="p">.</span><span class="n">customer_phone_number</span><span class="p">,</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="s">'Your package was delivered '</span><span class="o">+</span> <span class="n">now</span><span class="p">.</span><span class="n">strftime</span><span class="p">(</span><span class="s">"%d/%m/%Y %H:%M:%S"</span><span class="p">),</span> <span class="n">callback_url</span><span class="p">)</span>

 &nbsp; &nbsp;<span class="k">return</span> <span class="n">redirect</span><span class="p">(</span><span class="n">url_for</span><span class="p">(</span><span class="s">'order_index'</span><span class="p">))</span>
</code></pre></div></div><p>Along with the order status, the <a href="https://support.plivo.com/hc/en-us/articles/360041315292-What-are-the-different-SMS-statuses-in-Plivo-">status</a> of the sent message is also updated, which is referred to via the callback url in this code.</p><h2>Test</h2><p>Save your code and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>flask run
</code></pre></div></div><p><a href="https://www.plivo.com/docs/sdk/server/set-up-python-dev-environment-api-xml-voice/#ngrok-setup">Set up ngrok</a> to expose your local server to the internet.</p><p>You should be able to see the application in action at https://.ngrok.io/.</p><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages and make calls only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.<br></p>
