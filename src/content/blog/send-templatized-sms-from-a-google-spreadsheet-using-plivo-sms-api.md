---
title: "SMS Merge with Google Sheets and Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2017-06-19T00:00:00.000Z"
updatedDate: "2024-01-11T11:59:47.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e7b1e8a1bcda1033f0ec_google-sheet-integration-tuts.gif"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e7b1e8a1bcda1033f0ec_google-sheet-integration-tuts.gif"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["integration"]
seoTitle: "SMS Merge with Google Sheets and Plivo"
webflowItemId: "6583e915ffbdb96932fd2319"
---
<p>Want to send personalized SMS messages to customers right from Google Sheets? You can do it with a little help from Plivo and this SMS automation power sheet. We used Google Apps Script to create an SMS merge feature for Google Sheets.</p><p>To use Plivo’s messaging script, you must have a <a href="https://console.plivo.com/accounts/register/">Plivo account</a>, and an SMS-enabled phone number with which you can send messages to your customers. If you don’t have an SMS-enabled number among the numbers on the <a href="https://console.plivo.com/active-phone-numbers/">Phone Numbers</a> page of the console, click <strong>Buy Number</strong> to get one.</p><h2>Create a sheet</h2><p>Now create a new Google Sheet, then click Tools &gt; Script editor to start a new Apps Script project. Copy the content of the scripts.gs file in <a href="https://github.com/plivo-dev/google-sheet-messaging-script">our GitHub repository</a> and paste it into work area in place of the empty function that Apps Script starts with.</p><figure style="max-width:1258px" data-rt-max-width="1258px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e814514ee2b31925a860_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-24.png" alt="Paste the code" width="auto" height="auto" loading="auto"></div></figure><p>At the top of the file, replace the placeholders XXX.YOUR.AUTH_ID.XXX and XXXXXXXXXXXX.YOUR.AUTH_TOKEN.XXXXXXXXXXX with the Auth ID and Auth Token values for your account, which you can find on the overview page of the Plivo console.</p><p>Save the project that contains the Apps Script. Give it any name.</p><p>Save the code</p><figure style="max-width:1440px" data-rt-max-width="1440px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e82ae526bb31f8f61edd_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-5.png" alt="Save the code" width="auto" height="auto" loading="auto"></div></figure><p>Now reload the Google Sheet.</p><figure style="max-width:791px" data-rt-max-width="791px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e84e7fff53aeafc65345_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-10.png" alt="Data sheet" width="auto" height="auto" loading="auto"></div></figure><p>You should see two new sheet tabs at the bottom of the file called Data and Template. The Data sheet has several columns, each of which will be populated with the details of the Send Message API response for that specific row.</p><p>You can associate placeholders in your message template with custom columns on the Data sheet. The placeholders will be dynamically replaced with values found in custom columns with the same name. You can add as many custom columns as you like. This is at the core of the SMS merge functionality.</p><figure style="max-width:949px" data-rt-max-width="949px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e861938fd42aaaf86dd4_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-11.png" alt="Template" width="auto" height="auto" loading="auto"></div></figure><p>The Template sheet contains the SMS template in the A2 cell. Use the names of any custom columns you create on the Data sheet as placeholders in your template.</p><p>To try out our sheet, we created placeholders named NAME, COUPON_CODE, DISCOUNT, and STORE, the actual values of which the script picks up from columns in the data sheet with the same names.</p><p>Note that placeholders should be enclosed within double braces in the template, as you can see in the image above.</p><p>When you’re done, click on Plivo Messaging &gt; Validate Message Template to check for errors in the message template.</p><figure style="max-width:1412px" data-rt-max-width="1412px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e86156738b9c312d1582_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-14.png" alt="Template validation" width="auto" height="auto" loading="auto"></div></figure><h2>Put data in the sheet</h2><p>Enter values for all of the columns that are part of your SMS template.</p><figure style="max-width:652px" data-rt-max-width="652px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e873058da26d60fbd0e5_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-19.png" alt="Put your data" width="auto" height="auto" loading="auto"></div></figure><h2>Send messages</h2><p>When the sheet is ready, click on Plivo Messaging &gt; Send Messages.</p><figure style="max-width:541px" data-rt-max-width="541px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583e873da6fd855afaa6eb3_Plivo-SMS-google-sheet-integrations-by-google-script-plivo-messaging-17.png" alt="Send messages" width="auto" height="auto" loading="auto"></div></figure><h2>The code behind the scenes</h2><p>Now that you’re familiar with how to set things up, let’s see how we put it together using Apps Script functions to make API calls to Plivo to send the messages.</p><h3>Sending messages</h3><p>sendMessages(data) takes a list of row data objects and processes each object one by one.</p><div class="language-shell highlighter-rouge">
 &nbsp;<style>
    .highlight {
      background-color: #212130;
      color: #d3d3d3;
      padding: 15px 18px;
      margin-bottom: 1rem;
      width: 100%; /* Adjust as needed */
      overflow-x: hidden; /* Disable horizontal scrolling */
      word-wrap: break-word; /* Ensure long lines wrap */
    }
  </style>

 &nbsp;<div class="highlight"><pre class="highlight"><code>function sendMessages(data){
 &nbsp;var success = 0;
 &nbsp;var failure = 0;
 &nbsp;var TOKEN = Utilities.base64Encode(AUTH_ID+":"+AUTH_TOKEN);
 &nbsp;for(i=0;i&lt;data.length;i++){
 &nbsp; &nbsp;var row = data[i];
 &nbsp; &nbsp;var tempObj = {
 &nbsp; &nbsp; &nbsp;"src":row['SOURCE'],
 &nbsp; &nbsp; &nbsp;"dst":row['DESTINATION'],
 &nbsp; &nbsp; &nbsp;"text":createMessage(row,template),
 &nbsp; &nbsp;}
 &nbsp; &nbsp;var delivered = trySMS(tempObj,row.row,AUTH_ID,TOKEN);
 &nbsp; &nbsp;delivered?success++:failure++;
 &nbsp;}
 &nbsp;popupAlert("FINAL REPORT : \n\n"+(success+failure)+" row(s) processed \n "+success+" row(s)&nbsp;
 &nbsp;executed successfully \n "+failure+" row(s) encountered error \n For further details please check api&nbsp;
 &nbsp;details or each row in the sheet. ",false);
 &nbsp;unhideMetaColumns();
}
</code></pre></div>
</div><p>Let’s walk through this line by line.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>var TOKEN = Utilities.base64Encode(AUTH_ID+":"+AUTH_TOKEN);
</code></pre></div></div><p>This line creates a Base64-encoded token that we send with every API call to authorize Plivo API requests.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>for(i=0;i&lt;data.length;i++){
 &nbsp;var row = data[i];
 &nbsp;var tempObj = {
 &nbsp; &nbsp; &nbsp;"src":row['SOURCE'],
 &nbsp; &nbsp; &nbsp;"dst":row['DESTINATION'],
 &nbsp; &nbsp; &nbsp;"text":createMessage(row,template),
 &nbsp;}
 &nbsp;var delivered = trySMS(tempObj,row.row,AUTH_ID,TOKEN);
 &nbsp;delivered?success++:failure++;
}
</code></pre></div></div><p>This for loop iterates over the list of objects and does several operations:</p><ol><li>Creates a temporary message object containing the source number, destination number, and message text. The message text is generated by the createMessage function, which merges the template with the placeholders. More details on that in a moment.</li><li>Attempts to deliver the message via the Plivo API.</li><li>Tracks the success and failure counts.</li></ol><p>Once we have success and failure counts, we report them.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>popupAlert("FINAL REPORT : \n\n"+(success+failure)+" row(s) processed \n "+success+" row(s) executed successfully \n "+failure+" row(s) encountered error \n For further details please check api details or each row in the sheet. ",false);
</code></pre></div></div><h4>Creating messages</h4><p>The createMessage function iterates over all custom headers. If the custom header is found in the message template then that placeholder is replaced with the actual value. At the end it returns the final message.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>function createMessage(data,template_data){
 &nbsp;for (var key in data) {
 &nbsp; &nbsp;if (data.hasOwnProperty(key)) {
 &nbsp; &nbsp; &nbsp; &nbsp;template_data = template_data.replace(new RegExp('{{'+key+'}}', 'gi'),data[key]);
 &nbsp; &nbsp;}
 &nbsp;}
 &nbsp;return template_data;
}
</code></pre></div></div><p>Let’s see how it works using an example.</p><p>Suppose we call createMessage(data,template_data) where data and template_data are:</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>function createMessage(data,template_data){
 &nbsp;for (var key in data) {
 &nbsp; &nbsp;if (data.hasOwnProperty(key)) {
 &nbsp; &nbsp; &nbsp; &nbsp;template_data = template_data.replace(new RegExp('{{'+key+'}}', 'gi'),data[key]);
 &nbsp; &nbsp;}
 &nbsp;}
 &nbsp;return template_data;
}
</code></pre></div></div><p>Then createMessage(data,template_data) will return text</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>Hi Jane Doe, your coupon code for discount of 20% purchase at Plivo is DUMMY20
</code></pre></div></div><h4>API call to send message</h4><p>The trySMS function, which calls the API to send messages, takes four parameters:</p><ul><li>task, which is the temporary object created by sendMessages()</li><li>row, the row number for which the function is to run</li><li>AUTH_ID, the Plivo account Auth ID</li><li>TOKEN, the Plivo account Auth Token</li></ul><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>function trySMS(task,row,AUTH_ID,TOKEN){
 &nbsp; var options = {
 &nbsp; &nbsp;'method' : 'post',
 &nbsp; &nbsp;'contentType': 'application/json',
 &nbsp; &nbsp;'headers':{
 &nbsp; &nbsp; &nbsp;Authorization:"Basic "+ TOKEN
 &nbsp; &nbsp;},
 &nbsp; &nbsp;'muteHttpExceptions':true,
 &nbsp; &nbsp;'payload' : JSON.stringify(task)
 &nbsp;};
 &nbsp;response = UrlFetchApp.fetch('https://api.plivo.com/v1/Account/'+AUTH_ID+'/Message/', options);
 &nbsp;return setStatus(response,row);
}
</code></pre></div></div><p>The first line creates an API call object options that contains all the HTTP parameters required to make the API call to Plivo.</p><p>UrlFetchApp.fetch is Google’s predefined function to make API calls. It returns the HTTP response.</p><h2>Winning with automation</h2><p>Google Sheets plus Google Apps Script makes an awesome combination that you can use to automate tasks and workflows. We hope you find our SMS sender for Google Sheets useful.</p>
