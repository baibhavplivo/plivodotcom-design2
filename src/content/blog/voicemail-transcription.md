---
title: "Announcing Voicemail Transcription"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2013-02-27T00:00:00.000Z"
updatedDate: "2024-05-23T07:18:36.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65851d31077f89ff84ec8240_blog-pattern-design-1-thumbnail.svg"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/65851d31077f89ff84ec8240_blog-pattern-design-1-thumbnail.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["transcription"]
seoTitle: "Announcing Voicemail Transcription"
webflowItemId: "65851db3c06ac08c3fa0abfd"
---
<p>About a month ago, we launched new transcription capabilities that enable enterprises and developers to build powerful applications, like true visual voicemail. With this update, recorded calls (in English) can be transcribed in two different ways:</p><ul><li><strong>Auto</strong> — done by a computer, fast (usually complete within five minutes)</li><li><strong>Hybrid</strong> — recording is checked by a person, leading to much higher quality overall (usually complete within 20 minutes)</li></ul><p>Currently, transcription support is for calls 120 seconds or less; however, we’re in the midst of extending that time to cover entire conference calls. Stay tuned for updates!</p><h2>How to implement transcription</h2><p>Transcription ties in with our recording features. Wherever you can record a call, you can transcribe it too — namely, via</p><ul><li><a href="https://plivo.com/docs/voice/api/call/record-calls/#record" target="_blank">Record API</a></li><li><a href="https://plivo.com/docs/voice/xml/record/" target="_blank">Record XML</a></li><li><a href="https://plivo.com/docs/api/conference/record/#start_rec" target="_blank">Conference API</a></li><li><a href="https://plivo.com/docs/voice/xml/conference/" target="_blank">Conference XML</a></li></ul><p>All transcription uses the same set of parameters:</p><ul><li>Transcription type: auto or hybrid, as discussed above</li><li>Transcription URL: the URL to which <a href="/voice" target="_blank">Plivo</a> will send the transcription text once the call has been transcribed</li><li>Transcription method: the type of HTTP method — GET or POST — Plivo uses to send the request to the Transcription URL</li></ul><h2>Pricing</h2><ul><li>Auto: $.05/minute</li><li>Hybrid: $0.35/minute</li></ul><p>Check out detailed <a href="https://www.plivo.com/pricing/" target="_blank">pricing</a> for all of our services, and <a href="https://console.plivo.com/accounts/register/" target="_blank">sign up</a> for a free trial account today!</p>
