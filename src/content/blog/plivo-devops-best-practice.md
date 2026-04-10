---
title: "Using a Jenkins Pipeline to Add Grafana Annotations for Release Monitoring"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2018-03-29T00:00:00.000Z"
updatedDate: "2024-07-13T11:01:38.000Z"
image: "/images/blog/6583cdfc009441a5163b4ded_jenkins-grafana-annotation-v4.gif"
thumbnail: "/images/blog/6583cdfc009441a5163b4ded_jenkins-grafana-annotation-v4.gif"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["engineering"]
seoTitle: "Using a Jenkins Pipeline to Add Grafana Annotations for Release Monitoring"
webflowItemId: "6583cee1bcc4b0a0f16e1295"
---
<p>For the Plivo tech team, DevOps is not just a more efficient way of building products, it’s a way of life. To make things more efficient, we’re always trying out new things to see what works and what doesn’t. Release process is one area where we see a lot of scope for innovation. Today we’re sharing one best practice that’s working well for us.</p><p>At <a href="https://www.plivo.com/">Plivo</a>, we use <a href="https://jenkins.io/">Jenkins</a> as our CI/CD tool. Specifically, we use Jenkins Pipeline DSL to write build jobs as code. Using CI/CD, we deploy code several times a day across many microservices. To ensure that our services are performing optimally within the defined system parameters, we monitor a variety of metrics across releases immediately after the deployment, and annotate <a href="https://grafana.com/">Grafana</a> panels via Jenkins Pipeline.</p><p>Our CI/CD pipeline has multiple stages:</p><figure style="max-width:783px" data-rt-max-width="783px"><div><img src="/images/blog/6583ce720811f7701cad831f_jenkins-grafana-annotation-v1.png" alt="Annotation" width="auto" height="auto" loading="auto"></div></figure><p>During the Deploy stage, we annotate Grafana panels via their <a href="https://grafana.com/docs/grafana/latest/http_api/annotations/">annotate REST API</a> using the POST /api/annotations API.</p><p>The pipeline code looks like this.</p><div class="language-shell highlighter-rouge">
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

 &nbsp;<div class="highlight"><pre class="highlight"><code>echo echo "Creating annotation in Grafana with tags: ${tags} and description: ${text} ..."

withCredentials([[$class: 'StringBinding', credentialsId: 'GRAFANA_APIKEY', variable:
'GRAFANA_APIKEY']]) {
 &nbsp;apiKey = env.GRAFANA_APIKEY
 &nbsp;httpRequest(
 &nbsp; &nbsp;acceptType: 'APPLICATION_JSON',
 &nbsp; &nbsp;consoleLogResponseBody: false,
 &nbsp; &nbsp;contentType: 'APPLICATION_JSON',
 &nbsp; &nbsp;customHeaders: [[maskValue: true, name: 'Authorization', value: 'Bearer ' + apiKey]],
 &nbsp; &nbsp;httpMode: 'POST',
 &nbsp; &nbsp;requestBody: toJson(payload),
 &nbsp; &nbsp;responseHandle: 'NONE',
 &nbsp; &nbsp;url: grafana + '/api/annotations',
 &nbsp; &nbsp;validResponseCodes: '200'
 &nbsp;)
}
</code></pre></div>
</div><p>We use the Grafana API credentials (GRAFANA_APIKEY) from the Jenkins credentials store. The payload to the /api/annotations API is sent as a JSON object, as shown in this Grafana docs example.</p><div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>{
 &nbsp;"time":1507037197339,
 &nbsp;"isRegion":true,
 &nbsp;"timeEnd":1507180805056,
 &nbsp;"tags":["tag1","tag2"],
 &nbsp;"text":"Annotation Description"
}
</code></pre></div></div><p>&lt;div class="language-plaintext highlighter-rouge"&gt;&lt;div class="highlight"&gt;&lt;pre class="highlight"&gt;&lt;code&gt;{ &nbsp;"time":1507037197339, &nbsp;"isRegion":true, &nbsp;"timeEnd":1507180805056, &nbsp;"tags":["tag1","tag2"], &nbsp;"text":"Annotation Description"}&lt;/code&gt;&lt;/pre&gt;&lt;/div&gt;</p><p>Once the annotations are sent to Grafana, we add them to the Grafana panels manually. We will use the optional dashboardId and panelId fields in the future to build dashboards on the fly with Grafana 5.0, removing the need to manually add annotations.</p><p>The code above produces Grafana annotation like this.</p><figure style="max-width:1419px" data-rt-max-width="1419px"><div><img src="/images/blog/6583ce9248512591a8bf32bc_jenkins-grafana-annotation-v2.png" alt="Grafana Annotation" width="auto" height="auto" loading="auto"></div></figure><p>This Grafana panel for an imaginary service has an annotation between 12:16 and 12:22, which is the duration of the deployment, and it contains a description and tags. The description includes the version and the person responsible for the deployment as well as the approver for the release. The description and the tags are defined using variables earlier in our pipeline code.<br></p>
