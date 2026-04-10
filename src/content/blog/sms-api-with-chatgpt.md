---
title: "How to Use Plivo’s SMS API with ChatGPT"
description: "ChatGPT for messaging: Learn how to integrate Plivo's SMS API with ChatGPT. Unleash the power of AI-driven messaging & enhance your customer communication with Plivo’s SMS API."
pubDate: "2023-08-15T00:00:00.000Z"
updatedDate: "2024-07-08T10:38:58.000Z"
image: "/images/blog/657d34f845a3814e2148030f_blog_sms_with_chatgpt.svg"
thumbnail: "/images/blog/657d34f845a3814e2148030f_blog_sms_with_chatgpt.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["sms-api"]
seoTitle: "How to Use Plivo’s SMS API with ChatGPT"
webflowItemId: "657d36d7a0fbf5e81c58409a"
---
<p>Have you jumped on the ChatGPT bandwagon yet? We’ve been brainstorming how OpenAI’s AI-adjacent natural language processing tool might help Plivo customers. Ideas have ranged from applications as simple as a natural language autoresponder to an application that runs a script based on voice or SMS input to a more complex use case such as an SMS chatbot emulation. (We’d be interested in hearing about anything you’ve already built, or that you’re thinking about.)</p><p><a href="https://www.plivo.com/">Plivo</a> and ChatGPT can interact in two ways — think of them as “to” and “from.” A Plivo action (such as an incoming call or text message) could be a trigger <em>to</em> invoke ChatGPT. For instance, someone might text a question with an #askChatGPT hashtag. Plivo could use ChatGPT APIs to pass that query to ChatGPT and return the answer to the person who initiated the query.</p><p>Another use case, for data going in the other direction, would have someone invoke something <em>from</em> ChatGPT that triggers a Plivo action. For instance, you could go to the OpenAI’s <a href="https://platform.openai.com/playground">Playground</a> page and ask ChatGPT to text everyone in a list a weather report for their area.</p><p>ChatGPT can’t use Plivo APIs to call Plivo directly. Any application that wants to allow ChatGPT to use its APIs has to write an <a href="https://platform.openai.com/docs/plugins/introduction">OpenAI plugin</a> — and plugins are just leaking out in beta form, so a Plivo plugin won’t be available by the time you read this.</p><p>However, Plivo partners with <a href="https://zapier.com/">Zapier</a>, an application integration tool, and Zapier is developing a plugin for ChatGPT that lets Playground users call zaps — and it’s easy to write a <a href="https://www.plivo.com/docs/integrations/zapier/">zap that triggers a Plivo action</a>. How well can three very different platforms work together?</p><p>We thought a post that walks you through how to send messages through Plivo to ChatGPT, and from ChatGPT to recipients via Plivo, would be valuable. We start with having a Plivo action invoke ChatGPT.</p><h2>→ From Plivo to ChatGPT in code →</h2><p>To see how a Plivo action could trigger ChatGPT, we wanted to write a little proof-of-concept code that takes the text of any SMS message that comes in on a specific number, calls OpenAI’s API with that text, and replies to the <a href="https://www.plivo.com/sms/">SMS</a> with ChatGPT’s answer.</p><p>And in the spirit of keeping things simple, we thought we’d give ChatGPT a chance to write the code for us. We gave it a prompt:</p><p><strong>Using the Plivo Python SDK, write Python code to send the text of an incoming SMS message to ChatGPT and return the reply from ChatGPT to the number that sent the first text.</strong></p><p>And it returned this code.</p><style>
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

<style type="text/css">.helpfull-value {
    display: none;
}
.comparison-table {
    table-layout: fixed;
}
.comparison-table td {
    width: 50% !important;
    
}
table.support-table{
    font-size: 16px;
}

.support-table td:first-child {
    width: 25%;
    text-align: left;
}

.support-table td p{
    font-size: 16px !important;;
}

.support-table p{
    margin: 0;
}

.support-table tr:first-child td{
    background: #f9fff8;
    padding: 1rem;
}

.support-table td{
    padding-bottom: 1rem;
    width: 25%;
    padding: 1rem;
}

.support-table td {
    border-right: solid 1px #e5e5e5;
}
.support-table td:last-child{
    border: 0;
}

table.no-header-default-table {
    width: 100%;
    margin-bottom: 2rem;
}

table.no-header-default-table td {
    width: 25%;
    border: 1px solid;
    padding: 10px 1rem;
    vertical-align: middle;
}

table.no-header-default-table td p{
margin-bottom: 0 !important;
}

._blog p + ul {
    margin-top: -30px !important;
}

h2.question{
    margin: 0 0 21px;
    font-family: Soleil;
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: var(--deep-blue);
  }

  div.answer{
    margin-bottom: 1rem;
    font-size: 16px;
  }
  a.green-cta{
      color: #fff;
      background-color: #03a94a;
      border: 1px solid #03a94a;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      box-shadow: 0 11px 40px -17px #036b17;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  a.green-outer-cta{
      color: #03a94a;
      background-color: transparent;
      background-image: none;
      border: 1px solid #03a94a;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      box-shadow: 0 11px 40px -17px #036b17;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  a.blue-cta{
      box-shadow: 0 11px 40px -17px #05006d;
      color: #fff;
      background-color: #05006d;
      border: 1px solid #05006d;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  
  a.blue-outer-cta{
      box-shadow: 0 11px 40px -17px #05006d;
      color: #05006d;
      background-color: transparent;
      background-image: none;
      border: 1px solid #05006d;
      border-radius: .25rem;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 600;
      white-space: pre-wrap;
      padding: 12px 28px;
      text-align: center;
      margin: 0 .8125rem .3125rem;
  }
  .green-cta:hover, .green-outer-cta:hover, .blue-cta:hover, .blue-outer-cta:hover {
    transform: none;
    box-shadow: 0 0 0 rgba(50,50,93,.05),0 0 0 rgba(0,0,0,.03)!important;
  }
  
  .green-cta:hover, .blue-cta:hover{
    color: #fff !important;;
  }
  
  .green-outer-cta:hover{
    color: #03a94a !important;;
  }

.blog-content .table-striped tbody tr:nth-of-type(odd) {
  background-color: #F7F9FB;
  }
td, th {
    padding: 1.5rem 0.65rem;
    vertical-align: top;
    text-align: left;
}
tr{
 border: 1px solid #e5e5e5;
}
  
</style>
 &nbsp;<div class="highlight">
 &nbsp; &nbsp;<pre><code># Import Plivo and ChatGPT

import plivo
from chatgpt import ChatGPT

# Create an instance of ChatGPT
chatgpt = ChatGPT()

# Define function to process incoming message, send to ChatGPT, and return response
def process_incoming_message(incoming_message, incoming_number):
 &nbsp;# Send incoming message to ChatGPT
 &nbsp;chatgpt_response = chatgpt.send_text(incoming_message)

 &nbsp;# Send response from ChatGPT back to sender
 &nbsp;client = plivo.RestClient()
 &nbsp;client.messages.create(
 &nbsp; &nbsp;src='<your-plivo-number>',
 &nbsp; &nbsp;dst=incoming_number,
 &nbsp; &nbsp;text=chatgpt_response
 &nbsp;)
</your-plivo-number></code></pre>
 &nbsp;</div>
<p>‍</p><p>That’s a decent starting point, but ChatGPT isn’t going to take any developers’ jobs just yet. It’s a very simple use case — but sometimes that’s all you need. However, in this case, one fatal flaw is the lack of a ChatGPT module with APIs that let you make queries.</p><p>Plivo CTO Mike Ricordeau took the concept and made it scalable. His sms_bot.py code, using Python and Flask, is available online, so you can clone it and play with it. Follow the instructions in the README file.</p><p>Before you deploy the application, you must expose it at a public URL. To do that, we recommend using ngrok. Make sure to specify to ngrok the same port on which the sms_bot.py application is running. Ngrok will return a forwarding IP address you can use.</p><p>Once you’ve obtained a forwarding address from ngrok, visit the Plivo console and add a Plivo application. Specify the address, postpended with “/sms,” for the Message URL.</p><figure style="max-width:1684px" data-rt-max-width="1684px"><div><img src="/images/blog/657d35abbcb648163f84efde_GPT01.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>Next, <a href="https://console.plivo.com/active-phone-numbers/">pick one of your active phone numbers</a> and associate it with the application you just created. In the Application Type drop-down, choose XML Application, and under Plivo Application choose the name of the Plivo application you added.</p><figure style="max-width:1682px" data-rt-max-width="1682px"><div><img src="/images/blog/657d35d5d116f1873fb1a936_GPT02.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>Now the application should be live and available. You can try it by texting a message to the phone number you used. Plivo should receive the question and POST the request to the Message URL, and ngrok forwards it to the Python application, which connects to OpenAI and asks the question. OpenAI gives the answer. The Python application then returns a Message XML element with the response, which is sent to the user’s phone number. The entire “transaction” took about four seconds from when I tapped Send to when I received a response.</p><figure><div><img src="/images/blog/657d35f8d21a63e6012e3c72_GPT03.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><h2>← To Plivo from ChatGPT via Zapier ←</h2><p>Suppose, instead, you want to have ChatGPT call Plivo to send a text message.</p><p>As we said, ChatGPT can’t use Plivo APIs directly. Fortunately, Plivo partner Zapier is a member of the OpenAI ChatGPT plugin program. As we mentioned, Zapier is an application integration tool that lets anyone connect disparate web applications together in a workflow. Anyone with a ChatGPT Plus account can use Zapier to perform an action from ChatGPT that calls Plivo.</p><p>To try it out for SMS API integration you first have to set things up. <a href="https://openai.com/blog/chatgpt-plus">Sign up for a ChatGPT Plus subscription</a> — it costs $20 a month — and you’ll need a <a href="https://zapier.com/sign-up">Zapier account</a> too. From the <a href="https://chat.openai.com/?model=gpt-4">ChatGPT home screen</a> click on your account name in the bottom left corner, then Settings &gt; Data Controls, and enable 2FA. The page displays a QR code that you have to scan with an authenticator application running on a smartphone. The app should display a six-digit number for you to copy into the authentication dialog.</p><p>Once you’ve enabled 2FA, click on GPT-4 at the top of the ChatGPT home screen and choose Plugins from the drop-down menu. From the Plug-in store, find Zapier and click <strong>Install</strong>. Your browser will open a new window and Zapier will prompt you to connect; click <strong>Allow</strong>.</p><p>After you’ve enabled the Zapier plugin you can go back to the main ChatGPT window and ask a question. When you have an answer, you can say something like “Send that via Zapier and Plivo.” The first time you do that, ChatGPT will give you a link to click on that brings up a page where to enable an action.</p><figure style="max-width:1620px" data-rt-max-width="1620px"><div><img src="/images/blog/657d36208cef2987ff564cf3_GPT04.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>We’ve written <a href="https://www.plivo.com/docs/integrations/zapier/">documentation on how to use Zapier with Plivo</a>, sans ChatGPT; it talks about the available options. If you’re one of those free spirits who prefers trying things to reading doc pages, you can type “Plivo” into the Action field to see what actions are available. (Or you can type any string and use any platform that Zapier integrates with.) Complete the form, then click <strong>Enable action</strong>. At some point you’ll have to specify your Plivo Auth ID and Auth Token to authenticate your account within Zapier.</p><p>Those are all the steps — sounds easy, no? But some of this software is new and not completely debugged. We had problems connecting our Plivo phone numbers to Zapier through the plugin screen. Also, see the “Have AI guess a value” prompt in the screenshot above? We tried doing that for our source number, since we were using a test account that had only a single active number. AI failed to guess the value.</p><h3>Prompt engineering</h3><p>At this point you’ve created an action that ChatGPT can use by calling the Zapier plugin. Now you have to write a good prompt that not only retrieves the information you want but also lets ChatGPT know what to do with it. We found things worked best when we used a phrase like “send a text using Plivo.” ChatGPT “knew” that it could access Plivo via Zapier, as in this example.</p><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="/images/blog/657d3648b1ac103f4c686a90_GPT05.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>When we clicked the link, we found that ChatGPT had filled in the source and destination numbers properly. However, the text we asked it to generate wasn’t what we were looking for; instead of a polite reminder that payment was due, the body of the text was “Recipient’s phone number.” AI works in mysterious ways.</p><figure style="max-width:1424px" data-rt-max-width="1424px"><div><img src="/images/blog/657d3669ac1b24462945b423_GPT06.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>There’s clearly a mismatch somewhere in the communication between ChatGPT and Zapier. We took a second try, telling ChatGPT to send the text to a specific destination phone number, but that didn’t help.</p><p>When we clicked <strong>Run</strong>, ChatGPT/Zapier/Plivo sent the text perfectly, and it arrived almost instantly, so the good news is that all of the pieces were able to communicate.</p><p>As if it weren’t enough to automate all it did so far, ChatGPT wasn’t finished. It continued …</p><figure style="max-width:1476px" data-rt-max-width="1476px"><div><img src="/images/blog/657d369167546782a30bff1b_GPT07.png" loading="lazy" width="auto" height="auto" alt=""></div></figure><p>Sadly, when we clicked on the link, there wasn’t much there but the title of the new Zap. If we had wanted to use it we would have had to fill in all the fields, as if we were starting from scratch.</p><h2>A work in progress</h2><p>From this experience, we judged ChatGPT’s integration with Zapier to be a work in progress — as one might expect for such new software. We wouldn’t rely on it for SMS automation. Still, it’s clear we have a base on which companies can build. Ask us what we think again in six months.</p><p>The takeaway for now is that you can incorporate ChatGPT into workflows with Plivo — but don’t expect perfection.</p>
