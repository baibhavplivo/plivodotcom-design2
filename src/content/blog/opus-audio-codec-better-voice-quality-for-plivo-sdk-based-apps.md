---
title: "Announcing Improved Voice Quality for Plivo SDK-based Apps"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2017-02-23T00:00:00.000Z"
updatedDate: "2024-01-15T07:05:55.000Z"
image: "/images/blog/6583e92bf31288d455b5dd57_opus-codec-support-banner.png"
thumbnail: "/images/blog/6583e92bf31288d455b5dd57_opus-codec-support-banner.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["browser-sdk"]
seoTitle: "Announcing Improved Voice Quality for Plivo SDK-based Apps"
webflowItemId: "6583e9b768b35fd3568b5be6"
---
<p>Following the December rollout of our new <a href="https://www.plivo.com/blog/announcing-improved-voice-infrastructure/" target="_blank">Voice 2.0 Infrastructure</a>, our team continues to add features and upgrades to improve voice quality. As of today, our <a href="https://www.plivo.com/docs/sdk/client/browser/overview/">Browser SDK</a> supports the <a href="https://opus-codec.org/" target="_blank">Opus</a> codec, which is the best-in-class audio codec for a wide range of voice applications. All applications that use the Plivo Browser SDK for inbound and outbound calling will automatically use Opus as their default codec. Soon we’ll launch Opus support for our Mobile SDK and SIP Trunking as well.</p><h2>Why the Opus codec?</h2><p>We’ve optimized the opus encoder with reduced complexity on our Plivo network side to reduce decoder complexity on customers’ browsers. We’ve also optimized sampling rates, leading to decreases in browser sampling frequency and thus providing better performance on the browser. All of our optimizations also save bandwidth.</p><p>We’ve captured these audio samples that compare how Opus and the PCMU (G.711) codec deal with varying degrees of packet loss. The first sample, with 0% packet loss, sets the baseline for comparison. With increases in packet loss, Opus’s superiority stands out. Even at 30% packet loss, Opus still delivers comprehensible dialogue.</p>
 &nbsp;	<table class="table-code copy" style="text-align:center;width:95%;margin:auto;border-color:#f8f8f9;border-width: 1px;border-style: none;border-right: 1px #d1d1d1 solid;border-bottom: 1px #d1d1d1 solid;margin-bottom: 20px;"><thead>
		<tr>
			<th style="text-align:center;background:#939598;color:#ffffff;width:20%">Packet Loss</th>
			<th style="text-align:center;background:#939598;color:#ffffff" colspan="2">Audio Samples</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="2">0%</td>
			<td>Opus</td>
			<td>
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%20opus%200_.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td>PCMU</td>
			<td>
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%20pcmu%200_.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td rowspan="2" style="border-top: 1px #d1d1d1 solid">10%</td>
			<td style="border-top: 1px #d1d1d1 solid">Opus</td>
			<td style="border-top: 1px #d1d1d1 solid">
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%2010_%20opus.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td>PCMU</td>
			<td>
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec.%2010_%20pcmu.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td rowspan="2" style="border-top: 1px #d1d1d1 solid">25%</td>
			<td style="border-top: 1px #d1d1d1 solid">Opus</td>
			<td style="border-top: 1px #d1d1d1 solid">
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%2025_%20opus.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td>PCMU</td>
			<td>
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%2025_%20pcmu.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td rowspan="2" style="border-top: 1px #d1d1d1 solid">30%</td>
			<td style="border-top: 1px #d1d1d1 solid">Opus</td>
			<td style="border-top: 1px #d1d1d1 solid">
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%20opus%2030_.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
		<tr>
			<td>PCMU</td>
			<td>
				<audio controls="">
					 <source src="https://www.plivo.com/assets/blog/callrec%20pcmu%2030_.mp3" type="audio/mp3">
					 <!-- The next line will only be executed if the browser doesn't support the <audio> tag-->
					 <p>Your browser does not support the HTML5 Audio element.</p>
				</audio>
			</td>
		</tr>
	</tbody>
</table><style>
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
    vertical-align: inherit;
    text-align: center;
    padding: 0;
    border-bottom: none;
    color: #999999;
}
tr{

     border-left: hidden;
}
  
</style><p>Opus is also efficient. Instead of the 100Kbps of bandwidth our prior WebRTC SDK codecs used, Opus uses 50Kbps. Your application will experience decreases in jitter, latency, and packet loss, and despite poor network connections, your users will experience better voice quality.</p><h2>What is Opus?</h2><p>Opus is an open source audio codec that’s optimized for speech and music transmission over the internet. Audio codecs are software that compress and decompress digital audio signals for transmission. These codecs depend on mathematical algorithms and are graded on their ability to retain audio quality while encoding and compressing audio signals.</p><p>Opus is highly effective at reducing bandwidth consumption and CPU usage during audio transmission while maintaining high-fidelity audio signals. It’s known for its ability to handle a variety of VoIP audio applications, including conferencing, help desks, and click-to-call applications.</p><h2>Why is Opus awesome?</h2><p>Opus was built to fill the gaps of existing audio codecs, which were not optimized for bandwidth, CPU usage, and the varying bitrates and frame sizes that are needed for next-generation WebRTC-based audio applications. Even though Opus is not new, its high quality and low latency performance have propelled its popularity among applications that use WebRTC. Google’s Chrome browser has adopted Opus as its default codec, and Firefox, Opera, and Chromium browsers all support Opus for WebRTC as well. Because of this broad support, more and more WebRTC applications have been adopting Opus to transmit speech over the internet.</p><p>Here’s how Opus stacks up against other popular codecs, per its creators Jean-Marc Valin (Mozilla/Xiph.Org), Koen Vos (vocTone), and Timothy B. Terriberry (Mozilla/Xiph.Org). As illustrated below, Opus has the lowest delay (26.5ms by default), flexible bitrate, and a broad range of bandwidth support (narrowband to fullband), and it’s optimized for real-time communication.</p><figure style="max-width:1026px" data-rt-max-width="1026px"><div><img src="/images/blog/6583e95fa1e1248e9aa12087_opus-codec-support-comparison.png" alt="Chart opus-codec-support-comparison" width="auto" height="auto" loading="auto"></div></figure><h2>Extreme audio optimization</h2><p>Opus can adjust bitrate, audio bandwidth, and frame size dynamically on live calls. This support for a range of bitrates, frame sizes, audio bandwidths, sampling rates, and multistream frames ensure that a wide variety of applications can use Opus to transmit audio. This flexibility allows Opus to compensate for varying internet speeds and issues that users could experience without notice. For example, if a user has a congested Wi-Fi router or experiences low network bandwidth, Opus can automatically and seamlessly switch to a lower bitrate for smaller bandwidth consumption.</p><p>Errors and packet losses are unavoidable when complex systems interact. Opus has many features and strategies to mitigate poor audio quality during low network connections.</p><h3>Reduced jitter</h3><p>Ideally, in a perfect high-bandwidth, low-latency environment, the network should deliver a steady stream of packets on a continuous basis. However, even if audio data is being transmitted and played in the right order but not played to the exact timing, sound distortions can occur. Here’s an illustration comparing a steady stream of packets during zero congestion versus the same audio transmission (i.e., same packet stream) in a congested environment.</p><figure style="max-width:1026px" data-rt-max-width="1026px"><div><img src="/images/blog/6583e95faf21ee3aa8607297_opus-codec-support-packet-stream.png" alt="Flow chart of jitter vs no jitter comparison" width="auto" height="auto" loading="auto"></div></figure><p>VoIP applications can experience a lot of jitter because high fidelity audio requires high bandwidth. However, even in the event of packet loss, Opus has built-in features such as Packet Loss Concealment (PLC) and dynamic frame sizes to mitigate the symptoms and detection of jitter by the human ear.</p><p>When voice is transmitted over IP, packet loss can occur during decoding. Opus can use PLC to mask the effects of packet loss. When the codec detects that a packet is missing, Opus can use several PLC strategies to hide gaps in lost information. Opus can replace lost speech frames with zeros (i.e., zero insertion), reconstruct missing gaps by repeating a portion that has been successfully received (i.e., waveform substitution), or use speech models and algorithms to fill gaps in speech (i.e., model-based methods). These strategies are especially important for calls to and from areas of low bandwidth networks or Wi-Fi congestion.</p><h3>Lower latency</h3><p>The human ear can detect latency greater than 250ms. While 300ms is considered industry wide as poor latency, the International Telecommunication Union recommends that latency should be kept below 150ms to ensure that symptoms of poor voice quality doesn’t affect calls. Our platform is optimized to deliver connectivity under 50ms to all customers around the globe, and support for high value audio codecs such as Opus plays a large role. Opus solves latency issues by supporting variable and constant bitrates and being able to adjust bitrates dynamically.</p><ul><li><strong>Support for variable bitrate (VBR) and constant bitrate (CBR).</strong> Voice transmission requires a variable bitrate — the ability to change bitrate dynamically to adapt to the audio being encoded. VBR can help achieve a lower bitrate for the same voice quality, which means that it can consume less bandwidth than CBR, leading to improvements in audio quality.</li><li><strong>Dynamic bitrates from 6Kbps to 510Kbps.</strong> Opus will adjust its bitrate between 6 to 510 kilobits per second (Kbps) according to packet loss and round-trip time (RTT) reports during live audio transmission. If an audio call is experiencing increased packet loss and long RTT, then Opus will automatically switch to a lower bitrate to compensate and reduce congestion. The ability to change bitrates dynamically ensures that applications consistently deliver high voice quality and clarity.</li></ul><h3>Better packet loss concealment</h3><p>Mitigating packet loss is especially important in real-time communication, because there’s no time to resend missing packets. Even low levels of packet loss can cause unnecessary breaks in audio; when packet loss is severe, complete sentences could be missing. Even though Opus cannot alleviate packet loss, it can mask the symptoms with reconstruction algorithms like forward error correction (FEC) and other PLC strategies.</p><ul><li><strong>Forward error correction (FEC).</strong> FEC can improve audio quality because it can reconstruct a missing packet from information from neighboring packets that were previously or subsequently transmitted.</li><li><strong>Flexible error propagation.</strong> In the event of packet loss, other audio codecs utilize long-term prediction (LTP) filter states that spend more bits throughout the packet, which requires significant increases in bitrate and delay. To mitigate this, Opus reduces LTP filter states to the beginning of a packet, spending more bits only during the first pitch period, but saving bits throughout the packet transmission. This decreases potential voice quality issues and allocates more bandwidth to transmission.</li></ul><h3>Reduced audio bandwidth</h3><p>Bandwidth is the amount of information that can be transmitted over a period of time. The larger the bandwidth the more data can be transmitted. Increasing bandwidth can lead to better audio quality. Strategies for better utilizing bandwidth include transmitting more data each time, transmitting the same amount of data faster, or reducing the amount of data that needs to be transmitted. Opus deploys discontinuous transmission (DTX) to reduce the amount of data being transmitted during periods of silence.</p><p>Most audio calls have intermittent pauses and periods of silence, therefore by reducing the packet rate during silence can save bandwidth and CPU usage. DTX give Opus the ability to detect silence and reduce packet rates when no one is speaking. Then, when audio resumes, Opus can increase the packet rate seamlessly.</p><p>Opus’ adaptability and robustness makes the codec suitable for VoIP applications running on stand-alone software or web browsers. See for yourself and let us know what you think.<br></p>
