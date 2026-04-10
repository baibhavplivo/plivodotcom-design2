---
title: "New Plivo Voice Pricing Based on Network Group Levels"
description: "By moving to a “network group level” pricing structure for voice outbound to all countries Plivo has simplified our Voice API pricing."
pubDate: "2021-07-01T00:00:00.000Z"
updatedDate: "2024-01-12T07:39:35.000Z"
image: "/images/blog/658128877c23cf918d9f16b9_blog-graphic-voice-price-changes-14.svg"
thumbnail: "/images/blog/658128877c23cf918d9f16b9_blog-graphic-voice-price-changes-14.svg"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["pricing", "voice-api"]
seoTitle: "New Plivo Voice Pricing Based on Network Group Levels"
webflowItemId: "658129437c23cf918d9f72b0"
---
<p>Today we’re announcing two updates to our Voice API pricing.</p><h3>Network group pricing</h3><p>Today, call pricing can vary depending on the prefix of the phone numbers customers call. This makes it challenging to estimate spend, and customers tend to simply take an average, which may give an inaccurate value.</p><figure style="max-width:2236px" data-rt-max-width="2236px"><div><img src="/images/blog/658128bea70717a189bd851d_better-q-1-1.png" width="auto" height="auto" alt="" loading="auto"></div></figure><p>Going forward, we’ve simplified the pricing into broader groups, which will help customers plan spend by estimating at a group level.</p><figure style="max-width:2284px" data-rt-max-width="2284px"><div><img src="/images/blog/658128ca931c16a277d2d972_better-q-2.png" width="auto" height="auto" alt="" loading="auto"></div></figure><p>Some common network groups you could see include:</p><style>
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
.support-table td {
    border-right: solid 1px #e5e5e5;
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


.support-table td:last-child{
    border: 0;
}

table.no-header-default-table {
    width: 100%;
    margin-bottom: 2rem;
}

table.no-header-default-table td {
    width: 25%;
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
</style>
<div><table class="support-table"><tbody><tr><td><strong>Network Group</strong></td><td><strong>What It Includes</strong></td></tr><tr><td>Country</td><td>Typically includes all fixed numbers of a country, unless called out in another network group</td></tr><tr><td>Country — Fixed — Major Cities (City1, City2)</td><td>Includes fixed numbers of the specified major cities in the country</td></tr><tr><td>Country — Fixed — Others</td><td>Includes other fixed numbers not covered in other network groups in this country — and are usually higher priced</td></tr><tr><td>Country — Mobile</td><td>Typically includes all mobile numbers of a country, unless called out in another network group</td></tr><tr><td>Country — Mobile — Major Carriers (Carrier1, Carrier2)</td><td>Includes numbers belonging to the specified major carriers in the country. This group typically received the bulk of mobile traffic for most common use cases</td></tr><tr><td>Country — Mobile — MVNO (Carrier1, Carrier2)</td><td>Includes numbers belonging to specified MVNO operators and are usually higher priced</td></tr><tr><td>Country — Premium Services</td><td>Includes calls to premium and/or satellite numbers in the country and are usually very expensive</td></tr></tbody></table><p>&nbsp;</p><p>By moving to a “network group level” pricing structure for voice outbound to all countries, we have removed the complexity of prefix level pricing. Our new destination network groups are a logical way to allow customers to more easily understand Plivo pricing and its impact on their spend.</p><h3>Price changes for outbound and inbound voice</h3><p>The second change is an update to our voice prices for both outbound and inbound. &nbsp;&nbsp;</p><p><strong>Voice Outbound</strong></p><p>This chart highlights changes you’ll see in pricing for outbound calls in countries where Plivo has the highest traffic. Prices will change in almost all countries; you should refer to the <a target="_blank" rel="noopener" href="https://www.plivo.com/voice/pricing/us/">Voice</a> pricing page for the new pricing in your countries.&nbsp;</p><table class="support-table center-align" style="text-align: center;"><tbody><tr><td><strong>Increase</strong></td><td><strong>Decrease</strong></td></tr><tr><td>United Arab Emirates</td><td>United States</td></tr><tr><td>Australia</td><td>Canada</td></tr><tr><td>South Africa</td><td>Brazil</td></tr><tr><td>Italy</td><td>United Kingdom</td></tr><tr><td>France</td><td>Denmark</td></tr><tr><td>Saudi Arabia</td><td>Israel</td></tr><tr><td>Germany</td><td>Chile</td></tr><tr><td><p>Mexico</p></td><td><p>Colombia</p></td></tr><tr><td><p>Poland</p></td><td><p>Oman</p></td></tr><tr><td><p>Switzerland</p></td><td><p>Spain</p></td></tr><tr><td><p>New Zealand</p></td><td><p>Turkey</p></td></tr><tr><td><p>Indonesia</p></td><td><p>Singapore</p></td></tr><tr><td><p>Nigeria</p></td><td><p>China</p></td></tr><tr><td><p>Kenya</p></td><td><p>Bahrain</p></td></tr></tbody></table><p>&nbsp;</p><p><strong>Voice Inbound</strong></p><p>This chart highlights changes you’ll see in pricing for incoming calls in countries where Plivo has the highest traffic. Prices will change in 22 countries; you should refer to the <a href="https://www.plivo.com/voice/pricing/us/">Voice</a> pricing page for the new pricing in your countries.&nbsp;</p><table class="support-table center-align" style="text-align: center;"><tbody><tr><td><strong>Increase</strong></td><td><strong>Decrease</strong></td></tr><tr><td><p>Qatar</p></td><td><p>United States</p></td></tr><tr><td><p>UAE</p></td><td><p>Canada</p></td></tr><tr><td><p>Spain</p></td><td><p>United Kingdom</p></td></tr><tr><td><p>France</p></td><td><p>Australia</p></td></tr><tr><td><p>Sweden</p></td><td><p>Brazil</p></td></tr><tr><td><p>Belgium</p></td><td><p>China</p></td></tr></tbody></table><p>&nbsp;</p><p><strong>Phone Number Rentals</strong></p><p>This chart highlights changes you’ll see in pricing for Number Rental in countries where Plivo has the highest traffic. Prices will change in 11 countries; you should refer to the <a href="https://www.plivo.com/virtual-phone-numbers/pricing/us/">Numbers </a>pricing page for the new pricing in your countries. &nbsp;</p><table class="support-table center-align" style="text-align: center;"><tbody><tr><td><strong>Increase</strong></td><td><strong>Decrease</strong></td></tr><tr><td>Qatar</td><td><p>United States</p></td></tr><tr><td>China</td><td>Canada</td></tr><tr><td>Spain</td><td><p>United Kingdom</p></td></tr><tr><td>Brazil</td><td><p>Australia</p></td></tr></tbody></table><p>&nbsp;</p><p>We’ve made these pricing updates to reflect changing costs charged to us by carriers — some increases, some decreases — and to address regulation updates that also change our costs. One thing that hasn’t changed is our commitment to provide you with the best cloud communications platform available.</p></div><p>By moving to a “network group level” pricing structure for voice outbound to all countries, we have removed the complexity of prefix level pricing. Our new destination network groups are a logical way to allow customers to more easily understand Plivo pricing and its impact on their spend.</p><h3>Price changes for outbound and inbound voice</h3><p>The second change is an update to our voice prices for both outbound and inbound. &nbsp; </p><p><strong>Voice Outbound</strong></p><p>This chart highlights changes you’ll see in pricing for outbound calls in countries where Plivo has the highest traffic. Prices will change in almost all countries; you should refer to the <a target="_blank" href="https://www.plivo.com/voice/pricing/us/">Voice</a> pricing page for the new pricing in your countries.</p><table class="support-table center-align" style="text-align: center;"><tbody><tr><td><strong>Increase</strong></td><td><strong>Decrease</strong></td></tr><tr><td>United Arab Emirates</td><td>United States</td></tr><tr><td>Australia</td><td>Canada</td></tr><tr><td>South Africa</td><td>Brazil</td></tr><tr><td>Italy</td><td>United Kingdom</td></tr><tr><td>France</td><td>Denmark</td></tr><tr><td>Saudi Arabia</td><td>Israel</td></tr><tr><td>Germany</td><td>Chile</td></tr><tr><td><p>Mexico</p></td><td><p>Colombia</p></td></tr><tr><td><p>Poland</p></td><td><p>Oman</p></td></tr><tr><td><p>Switzerland</p></td><td><p>Spain</p></td></tr><tr><td><p>New Zealand</p></td><td><p>Turkey</p></td></tr><tr><td><p>Indonesia</p></td><td><p>Singapore</p></td></tr><tr><td><p>Nigeria</p></td><td><p>China</p></td></tr><tr><td><p>Kenya</p></td><td><p>Bahrain</p></td></tr></tbody></table><p><strong>Voice Inbound</strong></p><p>This chart highlights changes you’ll see in pricing for incoming calls in countries where Plivo has the highest traffic. Prices will change in 22 countries; you should refer to the <a href="https://www.plivo.com/voice/pricing/us/">Voice</a> pricing page for the new pricing in your countries. </p><table class="support-table center-align" style="text-align: center;"><tbody><tr><td><strong>Increase</strong></td><td><strong>Decrease</strong></td></tr><tr><td><p>Qatar</p></td><td><p>United States</p></td></tr><tr><td><p>UAE</p></td><td><p>Canada</p></td></tr><tr><td><p>Spain</p></td><td><p>United Kingdom</p></td></tr><tr><td><p>France</p></td><td><p>Australia</p></td></tr><tr><td><p>Sweden</p></td><td><p>Brazil</p></td></tr><tr><td><p>Belgium</p></td><td><p>China</p></td></tr></tbody></table><p><strong>Phone Number Rentals</strong></p><p>This chart highlights changes you’ll see in pricing for Number Rental in countries where Plivo has the highest traffic. Prices will change in 11 countries; you should refer to the <a href="https://www.plivo.com/virtual-phone-numbers/pricing/us/">Numbers </a>pricing page for the new pricing in your countries. &nbsp;</p><table class="support-table center-align" style="text-align: center;"><tbody><tr><td><strong>Increase</strong></td><td><strong>Decrease</strong></td></tr><tr><td>Qatar</td><td><p>United States</p></td></tr><tr><td>China</td><td>Canada</td></tr><tr><td>Spain</td><td><p>United Kingdom</p></td></tr><tr><td>Brazil</td><td><p>Australia</p></td></tr></tbody></table><p>We’ve made these pricing updates to reflect changing costs charged to us by carriers — some increases, some decreases — and to address regulation updates that also change our costs. One thing that hasn’t changed is our commitment to provide you with the best cloud communications platform available.</p>
