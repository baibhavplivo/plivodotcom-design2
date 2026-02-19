---
title: "Announcing the Plivo APIs Postman Collection"
description: "Voice API | Plivo | You can get started with the Plivo APIs Postman Collection"
pubDate: "2021-07-08T00:00:00.000Z"
updatedDate: "2025-05-19T11:42:11.000Z"
image: "/images/blog/6581251f5ba8ad347e983a09_postman-collection.svg"
thumbnail: "/images/blog/6581251f5ba8ad347e983a09_postman-collection.svg"
authorName: "Team Plivo"
featured: true
noindex: true
categories: ["postman", "how-to"]
seoTitle: "Announcing the Plivo APIs Postman Collection"
webflowItemId: "658127080cdfe876cc56bbb9"
---
<p>With Plivo’s <a href="https://plivo.com/sms/">SMS platform</a> and <a href="https://plivo.com/voice/">voice platform</a> you can add messaging and calling capabilities to your applications with a few lines of code via our <a href="https://www.plivo.com/docs/sdk/server/php-sdk/">server SDKs</a> for <a href="https://www.plivo.com/docs/sdk/server/php-sdk/">PHP</a>, <a href="https://www.plivo.com/docs/sdk/server/node-sdk/">Node.js</a>, <a href="https://www.plivo.com/docs/sdk/server/python-sdk/">Python</a>, <a href="https://www.plivo.com/docs/sdk/server/net-sdk/">.NET</a>, <a href="https://www.plivo.com/docs/sdk/server/java-sdk/">Java</a>, <a href="https://www.plivo.com/docs/sdk/server/ruby-sdk/">Ruby</a>, and <a href="https://www.plivo.com/docs/sdk/server/go-sdk/">Go</a>. Before you get started, you’d probably like to evaluate our APIs using an HTTP client. You can use any HTTP client you like; many developers choose <a href="https://www.postman.com/">Postman</a>, a popular HTTP <a href="https://www.postman.com/product/rest-client/">REST client</a>. Postman makes it easy for developers to set up and use to explore API <a href="https://www.plivo.com/docs/voice/api/request/">request</a> and <a href="https://www.plivo.com/docs/voice/api/response/">response</a> structures.</p><h3>About Plivo Postman collections</h3><p>Plivo has released a new Postman collection that includes APIs for our <a href="https://www.plivo.com/docs/sms/quickstart/postman/">SMS</a>, <a href="https://www.plivo.com/docs/voice/quickstart/postman/">Voice</a>, <a href="https://www.plivo.com/docs/numbers/guides/postman/">Phone Numbers</a>, <a href="https://www.plivo.com/docs/account/postman/">Account</a>, <a href="https://www.plivo.com/docs/lookup/postman/">Lookup</a>, and <a href="https://www.plivo.com/docs/phlo/postman/">PHLO</a> products, along with documentation for each API to help you learn about them. You can import these APIs and start using them instantly. The API collection comes with predefined environment variables to help you get started immediately. This post walks you through the process of installing and configuring Postman and our Postman collection and making API requests.</p><h2>Install Postman and download the Postman collection</h2><p>First, <a href="https://www.postman.com/downloads/">download and install Postman</a>. You also need a Plivo account; if you don’t have one yet, <a href="https://console.plivo.com/accounts/register/">sign up</a> now. Next, click on the button below.</p><div align="center">
<div class="postman-run-button" data-postman-action="collection/fork" data-postman-var-1="3726534-3a2d5654-c5de-4008-ad8c-5c4b8b18f617" data-postman-collection-url="entityId=3726534-3a2d5654-c5de-4008-ad8c-5c4b8b18f617&amp;entityType=collection&amp;workspaceId=7eee4ba7-18a2-4b7e-9761-4dc2728b179c"></div>

</div><p>A window will appear asking if you want the collection to be added to your local Postman app or if you want to use a web app.</p><p>You’ll see the collection in your chosen space based on the options you’ve chosen.</p><h2>Configure environment variables</h2><p>Now you can add your keys and tokens to your Postman collection. Open Postman from Applications under macOS or your desktop on Windows. The first thing you need to do is add your authentication credentials.</p><ul><li>Click on the collection Plivo REST API.</li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658125ce2799786542d4cdb0_setup.png" alt="Edit Details" width="auto" height="auto" loading="auto"></div></figure><ul><li>Select Authorization, then, from the drop-down list, set the Type as Basic Auth.</li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658125db0cdfe876cc561694_authorization.png" alt="Set Authorization" width="auto" height="auto" loading="auto"></div></figure><ul><li>For Username and Password, fill in your Plivo Auth ID and Auth Token respectively, which you can find on the overview page of the <a href="https://console.plivo.com/dashboard/">console</a>.</li></ul><p>You’ve now authenticated Postman to your Plivo account. The next step is to make that authentication available for every endpoint.</p><h4>Set up environment variables</h4><p>Set up the auth_id as an environment variable, so you can use it in every endpoint you have.</p><ul><li>Click on the collection Plivo REST API.</li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/658125ce2799786542d4cdb0_setup.png" alt="Edit Details" width="auto" height="auto" loading="auto"></div></figure><p><br></p><ul><li>Click on Variables. Declare the variable auth_id, and provide the initial and current value as the Auth ID from the <a href="https://console.plivo.com/dashboard/">console</a>.</li></ul><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6581263c9cc4953e3fad76b9_variable.png" alt="Set Variables" width="auto" height="auto" loading="auto"></div></figure><ul><li>Once you’ve done that, you can access your Auth ID by writing within your Postman collection. We’ve already done that for you for all the APIs in the Plivo collection.</li></ul><p>‍</p><div align="center"><b>Now we’re ready to test some APIs!!</b></div><h2>Make an API request to send an SMS</h2><p>To see how Plivo and Postman work together, let’s start by sending an SMS message. From the imported Plivo REST API collection, select the folder named Messaging, and select the request to Send SMS. Replace src with your from_number, dst with destination number where you’d like to send the message, and text with appropriate content. These are the only mandatory parameters.</p><p>You can replace the other optional parameters with meaningful values for your use case, or you can leave them out if you’re not using them in the request.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/sms/quickstart/postman/send_sms.mp4" type="video/mp4">
</video><p>To learn more about optional and required parameters, either refer to the documentation available within the Postman collection or visit our <a href="https://www.plivo.com/docs/sms/api/message/#send-a-message">Messaging API reference guide</a>.</p><h2>Make an API request to make a phone call</h2><p>To see how Plivo and Postman work together to making an outbound call. From the imported Plivo REST API collection, select the folder named Call and select the request to make an outbound call. Replace from with your caller_id, to with the destination number you’d like to make a call &amp; answer_url with a valid publicly accessible URL that returns a valid XML. These are the only mandatory parameters.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/voice/quickstart/postman/makecall.mp4" type="video/mp4">
</video><p><strong>Note:</strong></p><li>The answer_url updated in the collection returns a valid XML which means you just need to update the from &amp; to field to test the API.</li><li>You can replace the other optional parameters with meaningful values for your use case, or you can leave them out if you’re not using them in the request. As the values updated are dummy and can cause errors.</li><p>To learn more about optional and required parameters, either refer to the documentation available within the Postman collection or visit our Voice <a href="https://www.plivo.com/docs/voice/api/call/#make-a-call">API reference guide</a>.</p><h2>Make an API request to buy a phone number</h2><p>To see how Plivo and Postman work together for searching for an available phone number. From the imported Plivo REST API collection, select the folder named Phone Numbers followed by Search/Buy a Phone Number, and select the request named Buy a Phone Number.</p><p>You can find a number by using the Search Phone numbers API, which is right above the Buy a Phone number API request in your collection, or from the <a href="https://console.plivo.com/phone-numbers/search/">console</a>. Update the URL with the number you wish to purchase — it should look like</p><style>
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
 &nbsp; &nbsp;<pre><code>https://api.plivo.com/v1/Account/{{auth_id}}/PhoneNumber/14153234567/</code></pre>
 &nbsp;</div>
<p>Under Body, replace app_id with the <a href="https://console.plivo.com/voice/applications/">application</a> you want to attach, if you have one.</p><video autoplay="" loop="" muted="" inline="" width="560" height="315">
 &nbsp;<source width="560" height="315" src="https://www.plivo.com/assets/posts/images/numbers/postman/buyphonenumber.mp4" type="video/mp4">
</video><p>To learn more about optional and required parameters, either refer to the documentation available within the Postman collection or visit our Phone number <a href="https://www.plivo.com/docs/numbers/api/phone-number/buy-a-phone-number/">API reference guide</a>.</p><h2>Conclusion</h2><p>Postman helps us keep all of our APIs organized, categorized, and always ready to use with just a few modifications depending on our needs. It helps us not only with triggering API requests but also with <a href="https://www.postman.com/api-platform/api-testing/">testing APIs</a>. Overall, Postman makes it easier for developers to test and integrate their systems with Plivo.</p><p>Haven’t tried Plivo yet? Getting started is easy and only takes five minutes. <a href="https://console.plivo.com/accounts/register/">Sign up</a> today.</p>
