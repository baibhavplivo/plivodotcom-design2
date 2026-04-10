---
title: "How to Send MMS in Ruby using Plivo’s Messaging API"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2022-05-06T00:00:00.000Z"
updatedDate: "2024-01-15T09:18:11.000Z"
image: "/images/blog/657fec85e4e11e1e96bb3cc5_mms-ruby.png"
thumbnail: "/images/blog/657fec85e4e11e1e96bb3cc5_mms-ruby.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["ruby-sdk", "sms-api", "mms", "how-to"]
seoTitle: "How to Send MMS in Ruby using Plivo’s Messaging API"
webflowItemId: "657fed6f2fbe16800cac70d8"
---
<h2>Overview</h2><p>This guide shows how to <a href="https://www.plivo.com/docs/sms/use-cases/send-an-mms/java/">send an MMS</a> message to any phone number. Businesses can make messages more meaningful by using <a href="https://www.plivo.com/blog/what-is-mms-messaging/">MMS</a> instead of SMS and including images, audio, and video to provide context.</p><p>Here’s how to use Plivo’s <a href="https://www.plivo.com/sms/">SMS APIs</a> to send outbound MMS text messages.</p><h2>How it works</h2><figure><div><img src="/images/blog/657fe98384117f80c25088ab_send-mms-api.jpg" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>Prerequisites</h2><p>To get started, you need a Plivo account — <a href="https://console.plivo.com/accounts/register/">sign up</a> with your work email address if you don’t have one already. If this is your first time using Plivo APIs, follow our instructions to <a href="https://www.plivo.com/docs/sdk/server/set-up-ruby-dev-environment-api-messaging/">set up a Ruby development environment</a>.</p><h2>Create the send MMS application</h2><p>Create a file called send_mms.rb and paste into it this code.</p><style>
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
<figure><pre><code class="language-ruby" data-lang="ruby"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">1
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
</pre></td><td class="code"><pre><span class="nb">require</span> <span class="s1">'rubygems'</span>
<span class="nb">require</span> <span class="s1">'plivo'</span>

<span class="kp">include</span> <span class="no">Plivo</span>

<span class="n">api</span> <span class="o">=</span> <span class="no">RestClient</span><span class="p">.</span><span class="nf">new</span><span class="p">(</span><span class="s2">"&lt;auth_id&gt;"</span><span class="p">,</span><span class="s2">"&lt;auth_token&gt;"</span><span class="p">)</span>
 &nbsp;<span class="n">response</span> <span class="o">=</span> <span class="n">api</span><span class="p">.</span><span class="nf">messages</span><span class="p">.</span><span class="nf">create</span><span class="p">(</span>
 &nbsp; &nbsp;<span class="n">src</span><span class="ss">:"&lt;sender_id&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="n">dst</span><span class="ss">:"&lt;destination_number&gt;"</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="n">text</span><span class="ss">:"Hello, from Ruby!"</span><span class="p">,</span>
 &nbsp; &nbsp;<span class="n">media_urls</span><span class="p">:[</span><span class="s2">"https://media.giphy.com/media/26gscSULUcfKU7dHq/source.gif"</span><span class="p">],</span>
 &nbsp; &nbsp;<span class="n">media_ids</span><span class="p">:[</span><span class="s2">"801c2056-33ab-499c-80ef-58b574a462a2"</span><span class="p">],</span>
 &nbsp; &nbsp;<span class="ss">type: </span><span class="s2">"mms"</span>
 &nbsp;<span class="p">)</span>
<span class="nb">puts</span> <span class="n">response</span>
</pre></td></tr></tbody></table></code></pre></figure><p>Replace the auth placeholders with your authentication credentials from the Plivo console. Replace the phone number placeholders with actual phone numbers in E.164 format (for example, +12025551234). In countries other than the US and Canada you can use a sender ID for the message source. You must have a Plivo phone number to send messages to the US or Canada; you can buy a Plivo number from Phone Numbers &gt; Buy Numbers on the Plivo console or via the Numbers API.</p><p>Note: We recommend that you store your credentials in the auth_id and auth_token environment variables to avoid the possibility of accidentally committing them to source control. If you do this, you can initialize the client with no arguments and Plivo will automatically fetch the values from the environment variables. You can use ENV to store environment variables and fetch them when initializing the client.</p><h2>Test</h2><p>Save the file and run it.</p><div class="language-shell highlighter-rouge"><div class="highlight"><pre class="highlight"><code>ruby send_mms.rb
</code></pre></div></div><p><strong>Note:</strong> If you’re using a Plivo Trial account, you can send messages only to phone numbers that have been verified with Plivo. You can verify (sandbox) a number by going to the console’s Phone Numbers &gt; <a href="https://console.plivo.com/phone-numbers/sandbox-numbers/">Sandbox Numbers</a> page.</p><p><br>Haven’t tried Plivo yet? Getting started is easy and only takes minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
