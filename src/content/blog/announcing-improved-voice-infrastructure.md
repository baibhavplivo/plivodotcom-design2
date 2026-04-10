---
title: "Announcing Improved Voice 2.0 Infrastructure"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2016-12-14T00:00:00.000Z"
updatedDate: "2024-01-11T11:09:01.000Z"
image: "/images/blog/6584ff835cac4a43eea1c930_banner-announcing-improved-voice-2-0-infrastructure.png"
thumbnail: "/images/blog/6584ff835cac4a43eea1c930_banner-announcing-improved-voice-2-0-infrastructure.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["international", "telephony"]
seoTitle: "Announcing Improved Voice 2.0 Infrastructure"
webflowItemId: "6585006757e9c325318f1f00"
---
<p>Since the beginning, we at Plivo have invested in our infrastructure because we know that a quality backbone is key to providing you and your customers with a great user experience. Today, we’re excited to announce two enhancements to our infrastructure:</p><ul><li>New data center locations in South America (Brazil) and US-West (Northern California)</li><li>Improvements in our global network and voice routing algorithm</li></ul><p>These improvements will help improve voice call quality by decreasing audio latency and reducing distortion, garbled speech, and intermittent pauses.</p><p>Best of all, we’ve already enabled these improvements for you at no extra charge.</p><h2>New data center locations</h2><p>We analyze and optimize for data center locations that positively impact inter- and intra-region connectivity. This is why we’ve added two new data center locations: one in São Paulo, Brazil, to handle our growing South America traffic and another in Northern California to facilitate better connections in North America from the West Coast. These new data center locations enable us to provide optimized in-region connectivity with customers and carrier peering hubs.</p><h2>Improvements in global network and voice routing algorithms</h2><p>To achieve low latency on voice calls, we’ve made optimizations to help us route calls more efficiently.</p><p>To better illustrate how our optimizations have made positive impacts at every step, here’s an example of a call flow on Plivo’s network. Consider a WebRTC call dialing from Rio de Janeiro, Brazil, to a friend in New Jersey, United States. Upon dialing, the WebRTC application connects the caller to the nearest Plivo voice data center in São Paulo. Plivo then routes the call to the Plivo voice data center closest to the destination, which in this case is in Virginia. After that, the call is connected to a local US carrier in New York and then routed to the receiver in New Jersey.</p><figure style="max-width:876px" data-rt-max-width="876px"><div><img src="/images/blog/6584ffe345bf93a3676d8425_voice-infra-flow.png" alt="Voice Infra Flow Diagram" width="auto" height="auto" loading="auto"></div></figure><h3>Lower edge latency from customer locations for SIP, WebRTC, and Mobile SDK-based endpoints</h3><p>We’ve made improvements in the underlying infrastructure that helps your SIP, WebRTC, and Mobile SDK-based endpoints connect to our nearest in-region data centers around the world. We’ve reduced latency between the customer location and Plivo data centers to less than 100ms, which reduces voice call quality issues.</p><p>Here are examples of average ping times between customer locations and our nearest data centers:</p>
 &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
 &nbsp;<table class="table-code copy" style="text-align:center;width:95%;margin:auto;border-color:#f8f8f9;border-width: 1px;border-style: none;border-right: 1px #d1d1d1 solid;border-bottom: 1px #d1d1d1 solid;"><thead><tr>
		<th style="text-align:center;background:#939598;color:#ffffff">Continent</th>
		<th style="text-align:center;background:#939598;color:#ffffff">Data Center Location</th>
		<th style="text-align:center;background:#939598;color:#ffffff">Destination</th>
		<th style="text-align:center;background:#939598;color:#ffffff">Average Ping Time</th></tr>
	</thead>
	<tbody><tr><td rowspan="6">North America</td><td rowspan="3">USA West — Northern California</td><td>Los Angeles</td><td>30ms</td></tr><tr><td>San Francisco</td><td>3ms</td></tr><tr><td>Seattle</td><td>20ms</td></tr><tr><td rowspan="3" style="border-top:1px #d1d1d1 solid;background:#ffffff">USA East — Virginia</td><td>New York</td><td>10ms</td></tr><tr><td>Chicago</td><td>45ms</td></tr><tr><td>Austin</td><td>32ms</td></tr><tr><td rowspan="3" style="border-top: 1px #d1d1d1 solid">South America</td><td rowspan="3" style="border-top:1px #d1d1d1 solid;background:#ffffff">Brazil — São Paulo</td><td>Brazil</td><td>25ms</td></tr><tr><td>Argentina</td><td>60ms</td></tr><tr><td>Venezuela</td><td>95ms</td></tr><tr><td rowspan="3" style="border-top:1px #d1d1d1 solid;background:#ffffff">Europe</td><td rowspan="3" style="border-top:1px #d1d1d1 solid;background:#ffffff">Germany — Frankfurt</td><td>Germany</td><td>25ms</td></tr><tr><td>United Kingdom</td><td>20ms</td></tr><tr><td>France</td><td>20ms</td></tr><tr><td rowspan="3" style="border-top: 1px #d1d1d1 solid">Asia</td><td rowspan="3" style="border-top: 1px #d1d1d1 solid">Singapore</td><td>Singapore</td><td>10ms</td></tr><tr><td>India</td><td>85ms</td></tr><tr><td>Philippines</td><td>45ms</td></tr><tr><td rowspan="2" style="border-top:1px #d1d1d1 solid;background:#ffffff">Australia</td>
		<td rowspan="2" style="border-top:1px #d1d1d1 solid;background:#ffffff">Australia — Sydney</td><td>Australia</td><td>20ms</td></tr><tr><td>New Zealand</td><td>20ms</td></tr></tbody>
</table><h3>Optimized global routing</h3><p>We route calls through the nearest network of strategically located data centers worldwide, which lowers inter-region latency and improves call audio quality. This optimized routing means fewer dropped packets, less jitter, and less crosstalk, which is caused by long delays in the time a spoken word needs to travel to the receiver’s ear.</p><figure style="max-width:815px" data-rt-max-width="815px"><div><img src="/images/blog/6584fff8b2255f4754c44460_voice-infra-example.png" alt="Voice Infra Improvement Example" width="auto" height="auto" loading="auto"></div></figure><h3>Optimized intra-region connectivity</h3><p>After detailed analysis of our voice traffic, we found that more than 25% of calls on our infrastructure traverse multiple regions, so we improved routing between our data center locations to optimize for inter- and intra-region connectivity. We’ve seen the delta in latency reduced significantly, which directly impacts jitter (broken audio) on voice calls. We now have data centers in:</p><ul><li>South America (São Paulo, Brazil) — New</li><li>US-West (Northern California) — New</li><li>US-East (Virginia) — Updated</li><li>Europe (Frankfurt, Germany) — Updated</li><li>Asia (Singapore) — Updated</li><li>Australia (Sydney)</li></ul><h3>Faster connectivity to carrier peering hubs</h3><p>To guarantee high quality of service, Plivo peers with Tier 1 carriers around the world with latency less than 20ms at major hubs, which reduces the amount of time needed to connect directly to carriers. To lower the latency between our data centers and carrier peering hubs, we’ve developed algorithms to evaluate and connect to the nearest peering hubs based on each call.</p>
 &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;	
	 &nbsp; &nbsp;
 &nbsp;<table class="table-code copy" style="text-align:center;width:95%;margin:auto;border-color:#f8f8f9;border-width: 1px;border-style: none;border-right: 1px #d1d1d1 solid;border-bottom: 1px #d1d1d1 solid;"><thead>
		<tr>
			<th style="text-align:center;background:#939598;color:#ffffff">Continent</th>
			<th style="text-align:center;background:#939598;color:#ffffff">Carrier Peering Hub Location</th>
			<th style="text-align:center;background:#939598;color:#ffffff">Latency</th>
		</tr>
	</thead>
	<tbody><tr><td>North America</td><td>Big APE, 60 Hudson, New York</td><td>20ms</td></tr><tr><td>South America</td><td>PTT-SP — PTT São Paulo, Brazil</td><td>20ms</td></tr><tr><td>Europe</td><td>Telehouse Frankfurt</td><td>20ms</td></tr><tr><td>Australia</td><td>EQIX-SYD — Equinix Exchange Sydney</td><td>10ms</td></tr><tr><td>Asia</td><td>EQIX-SIN — Equinix Exchange Singapore</td><td>10ms</td></tr></tbody>
</table><h3>Direct carrier connectivity and redundancy</h3><p>Our carrier team has been working hard to make more local in-country carriers available to our networks. Increasing carrier availability and quality by providing multiple carriers in every country also improves connectivity between the destination carrier and the destination.</p><p>Of course, not all carriers are created equal, which is why we test every carrier on Plivo’s network for low post-dial delay (PDD), guaranteed features such as CLI and DTMF, and high mean opinion score (MOS). We also ensure that our networks connect to a minimum of two carriers in each country. This redundancy safeguards against single points of failure. In the event of a carrier failure, our infrastructure will automatically load balance and route traffic to more reliable carriers within the same region. We currently work with more than 100 in-county carriers globally to ensure that our network is always optimized, and we’re constantly adding more carriers to our network.</p><h2>What do these improvements mean for you and your customers?</h2><p>At Plivo, we understand that quality is at the core of any great product. High quality of service not only gives you access to clear voice quality, it also helps your business deliver the same level of quality to your customers.</p><center><div class="btn-wrap mg-bt-20">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a style="background-image:linear-gradient(to bottom right,#939598,#939598);padding:17px 35px;height: auto;border-color:transparent;font-size:20px;font-weight:500;border-radius:27px;border:0;line-height:auto;white-space:nowrap;color:#fff;background-color:transparent; text-decoration:none" href="https://www.plivo.com/contact/sales/" target="_blank">Let us know how we can help</a>
 &nbsp; &nbsp; &nbsp; &nbsp;</div>
</center>
