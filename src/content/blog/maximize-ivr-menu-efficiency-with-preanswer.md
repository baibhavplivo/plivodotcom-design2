---
title: "Get Extra Value from Your IVR Menu with PreAnswer"
description: "Maximize the efficiency of your IVR menu with the powerful PreAnswer feature. Discover how PreAnswer can enhance customer experience, reduce wait times, and provide valuable information upfront."
pubDate: "2023-09-11T00:00:00.000Z"
updatedDate: "2024-02-16T10:50:14.000Z"
image: "/images/blog/657c3d6e96d98f625b10e755_blog_preanswer.svg"
thumbnail: "/images/blog/657c3d6e96d98f625b10e755_blog_preanswer.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["voice-api", "ivr"]
seoTitle: "Get Extra Value from Your IVR Menu with PreAnswer"
webflowItemId: "657c3ee72707f95443a8af96"
---
<p>One time you can be sure to have your customers’ attention is when they call you. Many callers spend a few moments on hold on their way to getting their questions answered. Don’t waste those precious seconds — use them wisely by giving callers information they can use.</p><p>It’s a rare business nowadays that keeps a human receptionist on the payroll to answer customers’ phone calls. Instead, most companies use <a href="https://plivo-webflow.webflow.io/glossary/what-is-ivr">interactive voice response</a> (IVR) — automated technology that speaks a menu of options and lets users make choices by speaking or pressing a phone keypad key.</p><p>Plivo makes it easy to create an IVR menu tree in a couple of ways. Our PHLO visual workflow design tool lets you drag components onto a canvas and use them as building blocks for your menu tree; we wrote a <a href="http://plivo-webflow.webflow.io/blog/how-to-build-virtual-assistant-the-no-code-way-using-phlo">blog post</a> that walks you through the process. Or you can <a href="https://www.plivo.com/docs/voice/use-cases/ivr/python#xml-how-it-works">write an IVR menu with your favorite SDK and Plivo XML documents</a>. It’s not drag-and-drop, but it’s pretty easy — and it’s what you need to do to take advantage of this tip.</p><h2>From IVR to OIC</h2><p>When you forward a call to an extension, sometimes it gets queued up waiting to be answered. If you had a customer’s attention, even if just for a few seconds, what would you communicate to them?</p><p><a href="https://www.plivo.com/docs/voice/xml/preanswer/">PreAnswer</a> lets you specify what happens after a call is transferred but before it’s picked up. Some companies squander those seconds playing inoffensive music. But there are better possibilities.</p><p>For instance, suppose you’re a restaurant and you have a daily special, or maybe you’re a retailer with a one-day sale. You can put text that describes the deal into a file that your application can open and read out using text-to-speech.</p><p>Or suppose you’re transferring a call to a department that gets the same questions over and over. You could record answers to common questions and play them to callers. If you answer a customer’s question with recorded information they’ll hang up satisfied, and you’ll have freed up an employee’s time.</p><h2>Tech specs</h2><p>Here’s how it works on a technical level. Plivo lets you control call flows with XML code. The PreAnswer XML element lets you embed any of three other elements:</p><ul><li><a href="https://www.plivo.com/docs/voice/xml/speak/">Speak</a> plays specified text using text-to-speech. The Speak XML element tells Plivo to generate spoken audio, powered by <a href="https://aws.amazon.com/polly/" target="_blank">Amazon Polly</a>. We support 27 languages and more than 40 voices, and by using Speech Synthesis Markup Language (<a href="https://www.plivo.com/docs/voice/concepts/ssml/">SSML</a>) you can control pronunciation, pitch, and volume to make the spoken words sound more natural and less machinelike.</li><li><a href="https://www.plivo.com/docs/voice/xml/play/">Play</a> plays audio in MP3 or WAV format.</li><li><a href="https://www.plivo.com/docs/voice/xml/wait/">Wait</a> waits silently for a specified number of seconds.</li></ul><p>When you forward a call, you can specify the PreAnswer element with an embedded Speak or Play element.</p><h3>Speak friend and enter</h3><p>Here’s a little Python code that shows how to use the Speak element. Suppose you put the messages you want spoken in a text document called speak_input.txt:</p><p>Thanks for being patient. To compensate you for your time on hold, we’re offering a 50% discount on a yearly subscription. Use the discount code “hold50” when you sign up. Someone will be with you shortly.</p><p>This code opens that file, reads the text, and adds it to the Speak element.</p><div class="language-python highlighter-rouge">
 &nbsp;<style>
    .highlight {
      background-color: #212130;
      color: #d3d3d3;
      margin-bottom: 1rem;
      width: 100%; /* Adjust as needed */
    }
  </style>
 &nbsp;<div class="highlight">
 &nbsp; &nbsp;<pre><code>from plivo import plivoxml

preanswer_message_file = open("speak_input.txt", "r")

preanswer_message = preanswer_message_file.read()

response = plivoxml.ResponseElement()

response.add(plivoxml.PreAnswerElement().add(plivoxml.SpeakElement(preanswer_message)))
</code></pre>
 &nbsp;</div>
</div><h3>Play on words</h3><p>Alternatively, you could record your message (in this example in a file called sales_discount.mp3 that lives on Amazon S3) and use the Play element.</p><div class="language-python highlighter-rouge">
 &nbsp;<style>
    .highlight {
      background-color: #212130;
      color: #d3d3d3;
      margin-bottom: 1rem;
      width: 100%; /* Adjust as needed */
    }
  </style>
 &nbsp;<div class="highlight">
<pre>from plivo import plivoxml

preanswer_play = “https://s3.amazonaws.com/sales_discount.mp3”

response = plivoxml.ResponseElement()

response.add(plivoxml.PreAnswerElement().add(plivoxml.PlayElement(preanswer_play)))</pre>
</div></div><h3>Wait a moment</h3><p>Sometimes you might want a few seconds of silence before you speak or play a message. This code uses the Wait element to pause for 10 seconds.</p><style>
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
<pre>from plivo import plivoxml

response = plivoxml.ResponseElement()

response = (plivoxml.PreAnswerElement().add(plivoxml.WaitElement(None).set_length(10)))</pre>
</div><p>What should you use PreAnswer time for? That’s up to you. Here are some possibilities.</p><ul><li>Provide an estimate of how long people will spend on hold.</li><li>Remind people that they can find answers in your online support pages.</li><li>Present special offers.</li><li>Share company news, or if you’re a financial institution maybe share stock market news.</li></ul><h2>Get creative</h2><p>Of course you can choose a safe, boring message: “Thanks for calling our support line. We appreciate your business. Calls are answered in the order received.” You could even use bland “elevator music.” But given all of the more valuable possibilities, we suggest you get creative and take advantage of those fleeting moments of your callers’ attention.<br></p>
