---
title: "With Amazon Polly, Plivo Supports 27 Languages and 40+ Text-to-Speech Voices"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2018-11-26T00:00:00.000Z"
updatedDate: "2024-07-13T10:28:51.000Z"
image: "/images/blog/6582f14e95b6b85d2335fcc9_SSMLSpeakSupportBlog.png"
thumbnail: "/images/blog/6582f14e95b6b85d2335fcc9_SSMLSpeakSupportBlog.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["text-to-speech", "voice-api"]
seoTitle: "With Amazon Polly, Plivo Supports 27 Languages and 40+ Text-to-Speech Voices"
webflowItemId: "6582f1dabac3d1557570b284"
---
<p><a href="https://www.plivo.com/">Plivo</a> now supports <a href="https://aws.amazon.com/polly/">Amazon Polly</a>, with more than 40 voices, 27 languages, and new APIs to give developers control over synthesized speech output in applications that use text-to-speech. With Amazon Polly, developers can control the volume, pitch, rate, and pronunciation of the voices that interact with their users.</p><p>Text-to-speech is an important tool in a developer’s armory. It allows developers to create interactive voice applications by generating speech dynamically, rather than playing prerecorded media files. But with simple text-to-speech, developers can only choose from a basic male or female voice in a subset of languages, without pauses, tonal modulations, or other qualities that a natural speech possesses. The result is often mechanical-sounding speech, in a limited set of languages, without any choice of voice or tones. That doesn’t provide a lifelike experience to customers.</p><p>Enter Speech Synthesis Markup Language (SSML), designed by the W3C to provide an XML-based markup language to assist in generating natural-sounding synthesized speech. Amazon Polly is the world leader in SSML speech synthesis.</p><p>For text-to-speech, listening is believing. Listen to the difference between basic text-to-speech vs. Amazon Polly:</p><style>
.blog-post-body h4, .blog-post-body h5 {
    margin-top: auto;
    margin-bottom: 1rem;
    color: #03a94a;
    text-transform: uppercase;
    font-size: 1rem;
}
</style>
<h5 id="basic-voice">Basic voice</h5>

<audio controls="">
 &nbsp; <source src="https://www.plivo.com/assets/mp3/speech_20181126113957551.mp3" type="audio/mp3">
 &nbsp; <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
 &nbsp; <p>Your browser does not support the HTML5 Audio element.</p>
</audio>

<h5 id="ssml-enriched-voice-with-amazon-polly">SSML enriched voice with Amazon Polly</h5>

<audio controls="">
 &nbsp; <source src="https://www.plivo.com/assets/mp3/speech_20181126113938046.mp3" type="audio/mp3">
 &nbsp; <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
 &nbsp; <p>Your browser does not support the HTML5 Audio element.</p>
</audio><p>With Amazon Polly’s dozens of lifelike voices across a variety of languages, you can now select the ideal voice, adjust speech rate, pitch, loudness, and even emphasis to provide a localized voice experience to your customers.</p><h4>Integrating advanced text-to-speech in your application with Plivo</h4><p>To synthesize SSML speech on Plivo, simply specify one of the many Amazon Polly voices in the voice attribute of Plivo’s &lt;Speak&gt; XML. Note that Polly voices must be namespaced with Polly.</p><p>For example:</p><style>
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
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>&lt;Response&gt;
&lt;Speak voice="Polly.Joey"&gt;
&lt;say-as interpret-as="digits"&gt;1836&lt;/say-as&gt; is your &lt;say-as interpret-as="spell-out"&gt;OTP&lt;/say-as&gt; for Plee-voh.
&lt;/Speak&gt;
&lt;/Response&gt;
</code></pre></div></div><p>We’ve created a <a href="https://www.plivo.com/docs/voice/concepts/ssml/">Getting Started with SSML</a> page that documents the SSML tags supported for use in Plivo’s XML and lists the Amazon Polly voices supported for use with Plivo XML. Check it out to see what’s possible SSML and Amazon Polly.</p>
