---
title: "How to Turn Liquid into Communications Gold"
description: "How to use Liquid template elements to pass dynamic payloads to PHLO"
pubDate: "2022-04-08T00:00:00.000Z"
updatedDate: "2025-11-23T04:41:49.000Z"
image: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/657ff38add25c3dcb0bacc10_using-phlo-with-liquid-templating-hero.svg"
thumbnail: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/657ff38add25c3dcb0bacc10_using-phlo-with-liquid-templating-hero.svg"
authorName: "Team Plivo"
featured: true
noindex: true
categories: ["phlo", "features"]
seoTitle: "How to Turn Liquid into Communications Gold"
webflowItemId: "657ff447a8689d78e469932e"
---
<p>A cloud communications platform can help businesses automate communication with their customers and prospects. Businesses can programmatically send and receive calls and text messages using Plivo’s <a href="https://www.plivo.com/voice/">voice API</a> or <a href="https://www.plivo.com/sms/">SMS API</a> for a variety of use cases.</p><p>Plivo’s APIs make coding communication applications simple — and we make developers even more efficient by providing a tool for building applications through a graphical user interface. <a href="https://www.plivo.com/phlo/">PHLO</a> (Plivo High-Level Objects), our visual workflow design studio, is a no-code/low-code environment that lets you construct applications using visual building blocks and invoke them either from a program, using just a few lines of code, or directly from a web page. We’ve written a slew of use case guides that show you how to build feature-rich <a href="https://www.plivo.com/docs/voice/use-cases/make-outbound-calls/node/">voice</a> and <a href="https://www.plivo.com/docs/sms/use-cases/send-an-sms/node/">messaging</a> applications.</p><p>In PHLO you can use parameters such as phone numbers in your applications in two ways: either by specifying the exact values you want to pass or by using template elements.</p><p><a href="https://github.com/Shopify/liquid">Liquid</a> is an open source template language originally developed by Shopify. Web developers use template languages to build web pages that combine static content (text and graphics that are the same on multiple pages) and dynamic content, which changes from one page to the next. Liquid elements act as placeholders; at run time, they’re replaced by values you pass through them.</p><h2>Static and dynamic payloads</h2><p>How does this work in PHLO? Consider the simple case of <a href="https://www.plivo.com/docs/sms/use-cases/send-an-sms/node/">sending an SMS message</a>. Suppose you work for a professional practice that has multiple locations, and you want to send your clients an appointment reminder on the day before they’re scheduled to meet with you. Your application needs to be aware of three fields: the number you’re sending the message from, the number you’re sending the message to, and the text of the message.</p><p>In this case you would probably use a static field for the message sender — your business’s long code phone number. You would pass the destination number as part of your API payload using a Liquid element. And the text message would be partly static and partly dynamic — something like “Don’t forget your meeting with us tomorrow at &lt;time&gt; in our &lt;town&gt; office, &lt;address&gt;.”</p><h2>Map out the workflow in PHLO</h2><p>Here’s what the PHLO logic looks like for this use case.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff41b76cabbfba1986852_c4d1.png" alt="Mapping out PHLO workflow" width="auto" height="auto" loading="auto"></div></figure><p>This PHLO starts with a Start node, as every PHLO does. When the PHLO is called by a program making an API request, it triggers a Send Message node. Conceptually, it’s pretty simple. You could make it more elegant by adding logic to be triggered when the message is sent or if it fails, but we don’t need to do that right now.</p><h2>Configure the Start node</h2><p>Once we understand the workflow, we have to configure each node to send the message properly. Clicking on a node brings up a configuration pane at the right of the PHLO canvas. Here’s what the Start node’s looks like.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff41bd13b05b913e2c1ca_c4d2.png" alt="Start node configuration" width="auto" height="auto" loading="auto"></div></figure><p>Notice the payload key-value pairs under API Request. The key names match the dynamic fields we plan to pass to the PHLO. Plivo prepends the string “Start.http.params.” before each key name to create a Liquid element — for example, .</p><h2>Configure the Send Message node</h2><p>We then reference those keys in the configuration pane for the Send Message node.</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/657ff41bc660683135148601_c4d3.png" alt="Send Message node configuration" width="auto" height="auto" loading="auto"></div></figure><p>As you can see, the From field is a static value — it’ll be the same every time you invoke the PHLO. The To field is dynamic — it’ll hold whatever value is passed from the code that invokes it. And the Message field is a combination of the two.</p><p>To specify a Liquid element when you’re configuring a field, start typing two braces (“{{“). PHLO will instantly display a list of defined elements, and you can arrow down to the one you want to insert.</p><h2>Calling the PHLO</h2><p>Now we need to run a little code to call the PHLO. In Python, the code might look like this. Strings in &lt;angle brackets&gt; are placeholders for actual values that the program would take from a database or a cloud application that holds client appointment information.</p><style>
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
  .w-richtext figure {
    max-width: 100%;
    position: relative;
}
  </style>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>import plivo
auth_id = '&lt;auth_id&gt;'
auth_token = '&lt;auth_token&gt;'
phlo_id = '&lt;phlo_id&gt;'
payload = {"To" : "&lt;destination_number&gt;",
 &nbsp;"time" : "&lt;appt_time&gt;",
 &nbsp;"town" : "&lt;location&gt;",
 &nbsp;"address" : "&lt;address&gt;"}
phlo_client = plivo.phlo.RestClient(auth_id=auth_id, auth_token=auth_token)
phlo = phlo_client.phlo.get(phlo_id)
response = phlo.run(**payload)
print str(response)
</code></pre></div></div><p>You’ll notice we didn’t pass the From field. That’s because it’s static, so we don’t have to pass it to the PHLO. All of the other fields get passed as part of the API payload when we call the PHLO.</p><h2>Final thoughts</h2><p>Whether you use static or dynamic payloads, whether you use PHLO or write your entire use case in your favorite programming language, pay attention to <a href="https://www.plivo.com/blog/sms-api-best-practices/">best practices for sending text messages</a>. And if you get hung up when writing PHLOs or calling them, look for answers in our <a href="https://www.plivo.com/docs/phlo/">PHLO documentation</a>.</p>
