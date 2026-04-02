---
title: "Plivo GDPR Update: CDR and MDR Compliance"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2018-04-20T00:00:00.000Z"
updatedDate: "2024-07-08T10:58:35.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583cca3f31288d455a52c4c_Plivo-GDPR-Update.gif"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583cca3f31288d455a52c4c_Plivo-GDPR-Update.gif"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["gdpr"]
seoTitle: "Plivo GDPR Update: CDR and MDR Compliance"
webflowItemId: "6583cd5103669c04fee91ed1"
---
<p>GDPR comes into effect on May 25, and we at <a href="https://www.plivo.com/">Plivo</a> are <a href="https://www.plivo.com/blog/">working</a> to ensure that our systems are compliant with the data protection principles highlighted in the regulations.</p><p>One of the most critical aspects of GDPR is data minimization. We’ve completed changes to our data retention policies for call detail records (CDR) and message detail records (MDR) to meet GDPR compliance requirements. Starting May 5, CDRs and MDRs will be retained in our transactional databases for a period of 90 days only from the date they were created.</p><h3>Present behavior</h3><p>At present, all CDRs and MDRs are stored in our transactional databases. This means customers can fetch CDRs and MDRs via our APIs or the Plivo console for any date range of their choice, going as far back in time as they wish.</p><p>Customers use CDRs and MDRs to analyze usage and quality parameters and as input to their accounting and billing systems. As part of our analysis, we looked at how customers query for CDRs and MDRs and their typical look-back period. More than 98% of customers never query the data beyond first 90 days.</p><h3>Upcoming changes</h3><p>Starting May 5, CDRs and MDRs that are older than 90 days will be purged from our transactional databases, and will not be accessible via our API or the Plivo console. Redacted MDRs and CDRs, however, will be persisted in Plivo data warehouses for up to seven years. The redacted records have the last three digits of the From and To numbers masked.</p><p>For example, a CDR in our data warehouse looks like this:</p><p><strong>Voice Call Detail Record (CDR)</strong></p><style type="text/css">
    ol{
        padding-left: 30px;
        list-style-type: circle;
    }
    .partition-sm {
        height:20px;
    }
    .horizondal_table th, .horizondal_table td{
      font-size:11px;
    }
    .horizondal_table thead{
      background: #f8f8f9;
    }
    .horizondal_table td, .horizondal_table th {
    padding: 15px 5px;
}
</style>

 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;

 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;<table class="table-code copy horizondal_table" style="text-align:center;width:100%;"><thead><tr><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call UUID
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Parent Call UUID
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;From
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;To
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Direction
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Time
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Duration
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bill Duration
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Rate
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Charge
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th></tr></thead><tbody><tr><td>a19e4bbb-42a3-11e8-88f3-69eaaa168218</td><td>None</td><td>17186647***</td><td>14013154***</td><td>inbound</td><td>2018-04-18 01:58:45+01:00</td><td>6</td><td>60</td><td>0.0085</td><td>0.0085</td></tr></tbody>
</table><p><strong>SMS Message Detail Record (MDR)</strong></p><style type="text/css">
    ol{
        padding-left: 30px;
        list-style-type: circle;
    }
    .partition-sm {
        height:20px;
    }
    .horizondal_table th, .horizondal_table td{
      font-size:11px;
    }
    .horizondal_table thead{
      background: #f8f8f9;
    }
    .horizondal_table td, .horizondal_table th {
    padding: 15px 5px;
}
</style>

 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;

 &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp;<table class="table-code copy horizondal_table" style="text-align:center;width:100%;"><thead><tr><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call UUID
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Parent Call UUID
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;From
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;To
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Direction
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Time
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Duration
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bill Duration
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Rate
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><th style="text-align:center;">
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Call Charge
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th></tr></thead><tbody><tr><td>a19e4bbb-42a3-11e8-88f3-69eaaa168218</td><td>a19e4bbb-42a3-11e8-88f3-69eaaa168218</td><td>17186647***</td><td>14013154***</td><td>outbound</td><td>2018-04-18 01:58:45+01:00</td><td>1</td><td>0.005</td><td>0.005</td><td>0.005</td></tr></tbody>
</table><h3>Our commitment to GDPR</h3><p>As your communications partner, we understand that our compliance with GDPR is critical for your business. We’re making the effort to ensure your customer data stays safe, while also being mindful about keeping things simple for developers.</p>
