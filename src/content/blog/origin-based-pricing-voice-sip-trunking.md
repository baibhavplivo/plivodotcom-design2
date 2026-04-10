---
title: "Origin-Based Pricing for Outbound Calls on Plivo’s Voice API and SIP Trunking"
description: "Introducing origin-based pricing for our Voice API and SIP Trunking. Get lower rates on select calls originating from Europe."
pubDate: "2021-01-11T00:00:00.000Z"
updatedDate: "2024-07-14T09:24:32.000Z"
image: "/images/blog/65825acd4fdd27262d7d46db_origin-based-pricing-v2-opt1-small.svg"
thumbnail: "/images/blog/65825acd4fdd27262d7d46db_origin-based-pricing-v2-opt1-small.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["pricing", "voice-api", "zentrunk"]
seoTitle: "Origin-Based Pricing for Outbound Calls on Plivo’s Voice API and SIP Trunking"
webflowItemId: "65825b4a229c2d9c9e0b7d0b"
---
<p>We’ve introduced European origin-based pricing for outbound calls made via our Voice API and SIP Trunking. Plivo customers are now being charged lower rates for selected calls in the European countries. The per-minute pricing is now automatically determined by the caller ID information sent when placing the call. &nbsp; </p><p>Origin-based pricing means calls to the same destination have different prices depending on where each call comes from. Historically, calls originating from different locations would generally have the same underlying rates. But back in 2017, cross-border calls within Europe were regulated down to local and national rates, rather than the international rates that were applied to calls originating outside of Europe. This meant that calls within the boundaries of Europe became cheaper, while calls originating in a non-European country became more expensive.</p><p>In response to this, Plivo built origin-based routing, which ensures that calls originating from a European Economic Area (EEA) number, and terminating in a select group of 10 countries, are routed to an intra-European gateway, and calls from non-European numbers are routed through an international non-European gateway. Origin is determined by the caller ID of the call, whether it be configured in the API, PBX, or Plivo’s console via SIP trunking.</p><p>Plivo customers will now see lower costs for calls originating from any of the European countries below that terminate in Austria, Hungary, Portugal, Italy, Germany, Spain, Belgium, France, the Netherlands, or Poland:</p><style>
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
</style>
<div class="default-table-container"><table class="no-header-default-table"><tbody><tr><td><p>Austria</p></td><td><p>Estonia</p></td><td><p>Italy</p></td><td><p>Poland</p></td></tr><tr><td><p>Albania</p></td><td><p>Finland</p></td><td><p>Latvia</p></td><td><p>Portugal</p></td></tr><tr><td><p>Belgium</p></td><td><p>France</p></td><td><p>Liechtenstein</p></td><td><p>Romania</p></td></tr><tr><td><p>Bulgaria</p></td><td><p>Germany</p></td><td><p>Lithuania</p></td><td><p>Slovakia</p></td></tr><tr><td><p>Croatia</p></td><td><p>Greece</p></td><td><p>Luxembourg</p></td><td><p>Slovenia</p></td></tr><tr><td><p>Cyprus</p></td><td><p>Hungary</p></td><td><p>Malta</p></td><td><p>Spain</p></td></tr><tr><td><p>Czech Republic</p></td><td><p>Iceland</p></td><td><p>Netherlands</p></td><td><p>Sweden</p></td></tr><tr><td><p>Denmark</p></td><td><p>Ireland</p></td><td><p>Norway</p></td><td><p>United Kingdom</p></td></tr></tbody></table></div><p>We plan to expand our coverage by adding to the list of 10 termination countries in the coming months. For a full breakdown of pricing for each respective country, check out our pricing pages for <a href="https://www.plivo.com/voice/pricing/" target="_blank">voice</a> and <a href="https://www.plivo.com/sip-trunking/pricing/" target="_blank">SIP Trunking</a>.</p><p>Getting started is easy. All you have to do is rent a number or verify a number you rent on the Plivo console from one of the qualifying countries above, then configure that number as your caller ID. The intra-European gateways will be automatically selected for your calls, and you can immediately take advantage of the lower price per call.</p><p>Haven’t tried <a href="https://www.plivo.com/">Plivo</a> yet? <a href="https://console.plivo.com/accounts/register/" target="_blank">Signing up</a> takes five minutes. Get started today.<br></p>
