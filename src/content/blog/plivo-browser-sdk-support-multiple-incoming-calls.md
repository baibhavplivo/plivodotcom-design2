---
title: "Plivo Browser SDK Adds Support for Multiple Incoming Calls"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2018-10-10T00:00:00.000Z"
updatedDate: "2024-01-09T12:14:49.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6582f31af3004dd166480dcd_MultipleIncomingCalls.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6582f31af3004dd166480dcd_MultipleIncomingCalls.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["browser-sdk"]
seoTitle: "Plivo Browser SDK Adds Support for Multiple Incoming Calls"
webflowItemId: "6582f3aa76a77af3fc4b2b73"
---
<p>Today’s latest release of the <a href="https://www.plivo.com/docs/sdk/client/browser/overview/" target="_blank">Plivo Browser SDK</a> includes support for handling multiple incoming calls. This feature gives developers control of calls that arrive on agent endpoints while agents are talking to other customers. The ability to handle multiple incoming calls helps agents manage and answer calls based on priority, caller ID, and context, thereby improving overall customer experience.</p><p>As part of this new version, we’re introducing a new call management mode that, when enabled, ensures incoming calls are never silently rejected. Instead, agents are presented with the option to accept, reject, or ignore the incoming call, thus ensuring better call management.</p><h2>Activating multiple incoming call mode</h2><p>Before today, incoming calls would be silently rejected if the destination endpoint was engaged in another call. Now, you can set a new configuration parameter, allowMultipleIncomingCalls, to true to enable multiple incoming calls when you initialize the SDK. (The default value is false, to be consistent with past behavior.)</p><style>
div.language-plaintext.highlighter-rouge > div.highlight {
  background-color: #212130; /* Replace with your desired color */
  padding: 15px 18px;
  margin-bottom: 1rem;
  width: 100%; /* Adjust as needed for code or container width */
  color: #d3d3d3; /* Adjust as needed for your preferred text color */
}

</style>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>const options = { allowMultipleIncomingCalls: true };
</code></pre></div></div><p>Call center agents may face two scenarios when the multiple incoming call feature is set to true, and a couple of things can happen:</p><p><strong>Scenario 1</strong>: Agent is already on a call</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6582f33fd008e60a94bbb9bf_scenario1.png" alt="Scenario1" width="auto" height="auto" loading="auto"></div></figure><p><strong>Scenario 2</strong>: Agent is available, but multiple calls are ringing simultaneously</p><figure><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6582f33ffb08776e95d0f550_scenario2.png" alt="Scenario2" width="auto" height="auto" loading="auto"></div></figure><p>To accept one incoming call and handle others coming in, your application can use this code:</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>plivoWebSdk.client.on('onIncomingCall', (callerId, extraHeaders, callInfo) =&gt;

// To accept a call and reject other incoming calls -
plivoWebSdk.client.answer(callInfo.callUUID, 'reject')

// To accept a call and ignore other incoming calls -
plivoWebSdk.client.answer(callInfo.callUUID, 'ignore')

// To accept a call and let other incoming calls ring in the background -
plivoWebSdk.client.answer(callInfo.callUUID, 'letring')
</code></pre></div></div><p>To reject an incoming call, use this code:</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>plivoWebSdk.client.reject(callInfo.callUUID)
</code></pre></div></div><h2>Ignoring incoming calls</h2><p>The new ignore(callUUID) function, when invoked on a ringing call, stops the incoming ring sound and sets the local call state to ignored. However, no hangup message is sent to the remote party and the call continues to ring for the caller.</p><p>To ignore an incoming call, use this code:</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>plivoWebSdk.client.ignore(callInfo.callUUID)
</code></pre></div></div><p>For more information, refer our <a href="https://www.plivo.com/docs/sdk/client/browser/reference/" target="_blank">Browser SDK reference documentation</a>.</p><p>Don’t have a Plivo account? <a href="https://console.plivo.com/accounts/register/" target="_blank">Sign-up</a> for free an start building powerful use cases in minutes.</p>
