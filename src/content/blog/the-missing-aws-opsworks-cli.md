---
title: "The Missing AWS OpsWorks CLI"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2017-02-13T00:00:00.000Z"
updatedDate: "2024-01-11T09:44:45.000Z"
image: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583ebf98965a43ad31bb939_blog-opsworks-banner.png"
thumbnail: "https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6583ebf98965a43ad31bb939_blog-opsworks-banner.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["integration", "open-source", "engineering"]
seoTitle: "The Missing AWS OpsWorks CLI"
webflowItemId: "6583eca0621c1ed99b7ad913"
---
<p>We at Plivo need to constantly deploy updates to our infrastructure that consists of large number of servers spread across multiple regions and continents worldwide. Unfortunately, the complexity of this infrastructure requires very specific and scalable deployment tools that were not already available.</p><p>The OpsWorks Command Line Interface (CLI) is a deployment tool for managing AWS OpsWorks. We built the OpsWorks CLI because the standard <a href="https://aws.amazon.com/cli/" target="_blank">AWS CLI</a> UI does not have any way to perform simultaneous operations across multiple stacks, a logical group of servers that you want to manage together. We have been using our own OpsWorks CLI extensively for the last year and we’re happy to be opening it up to everyone. We hope that DevOps teams already using AWS and especially those that are also using AWS OpsWorks can use our open source CLI to easily manage multiple server instances at once.</p><h2>What is AWS OpsWorks?</h2><p>If you’re familiar with configuration management, then you likely already know <a href="https://github.com/chef/chef/" target="_blank">Chef</a>, the automation platform. OpsWorks is a free configuration management service provided by AWS that uses Chef, but exposes a friendly user interface on top of it. OpsWorks uses Chef to automate how servers are configured, deployed, and managed across your Amazon Elastic Compute Cloud (Amazon EC2) instances or on-premises compute environments. OpsWorks splits your architecture into stacks. For example, for a simple wordpress setup you could have a production and a staging stack, each with a database and a web layer.</p><h2>Why OpsWorks?</h2><p>There are many configuration management solutions, such as Chef, Puppet, Salt, Ansible, and the list goes on… But none of those actually come with a user-friendly UI in their community editions. Most of those also require setting up a central server to take care of delivering the configuration to your servers, which is another point of failure that you need to make highly available too.</p><p>OpsWorks is free, runs on both EC2 and on premise, and brings you a powerful UI to inspect and maintain your stacks. You simply point OpsWorks at a Git repository or S3 Bucket with your cookbooks (Chef jargon for the files that actually define how your servers are provisioned) and define which files and servers should run. And because this is built on top of Chef, you can use some of the <a href="https://supermarket.chef.io/" target="_blank">+3,000 existing cookbooks</a>.</p><p>Finally, it has an easy to use auto-scaling feature based on CPU, Memory and Disk Usage, and can automatically start new instances to accommodate for higher loads.</p><h2>What is OpsWorks CLI?</h2><p>OpsWorks comes with a neat user interface that allows you to manage a stack: start and stop instances, perform configuration updates, deploy code, check the status of a load-balancer, etc. But the UI does not have any way to perform those operations across multiple stacks at once. What if you wanted to run a specific configuration update on all your production stacks? Or update all your database layers across all stacks?</p><p>This is where our CLI comes in: with a simple command line, it allows you to do everything you would be able to do on the UI. In addition, you can run your deployments across your whole infrastructure with a smart and intuitive filtering system. Our OpsWorks CLI also comes with an interactive prompt so that you do not have to access the AWS Console for trivial tasks.</p><figure style="max-width:1637px" data-rt-max-width="1637px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6584f9283a0e8566e246af85_68747470733a2f2f61736369696e656d612e6f72672f612f3166767865773075363638346a68766b6a3533656b6b6475632e706e67.png" alt="asciicast" width="auto" height="auto" loading="auto"></div></figure><h2>Features and Benefits</h2><p>OpsWorks CLI is built with scalability in mind. For example, with the OpsWorks CLI, we can easily run a simultaneous deployment on 20 stacks, while constantly pulling the AWS API to retrieve the deployments’ statuses in real time.</p><h3>Simple Commands</h3><p>Relying on the AWS API, we built a set of simple commands to help you easily run commands across stacks and regions. These commands can be used in conjunction with smart filters to quickly identify, setup, update, configure and deploy instances. You can also achieve more complex functionality including looking at past deployments of each stack and monitoring elastic load balancers, check for the health of instances, and much more.</p>
 &nbsp;	<table class="table-code copy" style="text-align:center;width:95%;margin:auto;border-color:#f8f8f9;border-width: 1px;border-style: none;border-right: 1px #d1d1d1 solid;border-bottom: 1px #d1d1d1 solid;"><thead>
		<tr>
			<th style="text-align:center;background:#939598;color:#ffffff">Command</th>
			<th style="text-align:center;background:#939598;color:#ffffff">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>stacks</td>
			<td>list OpsWorks stacks</td>
		</tr>
		<tr>
			<td>deployments</td>
			<td>list OpsWorks deployments</td>
		</tr>
		<tr>
			<td>instances</td>
			<td>list instances</td>
		</tr>
		<tr>
			<td>apps</td>
			<td>list apps</td>
		</tr>
		<tr>
			<td>elbs</td>
			<td>list Elastic Load Balancers</td>
		</tr>
		<tr>
			<td>update</td>
			<td>update cookbooks</td>
		</tr>
		<tr>
			<td>setup</td>
			<td>run setup recipes</td>
		</tr>
		<tr>
			<td>configure</td>
			<td>run configure recipes</td>
		</tr>
		<tr>
			<td>deploy</td>
			<td>deploy specified app</td>
		</tr>
		<tr>
			<td>recipes</td>
			<td>run specified recipes</td>
		</tr>
	</tbody>
</table><h3>Smart Filtering</h3><p>Any Opsworks CLI command accepts three basic filters: layer, stack, and region. These smart filters also support wildcards and regexes to enable complex filtering logic. For example the command below would match all stacks whose name contain wordpress, and only include their database layer:</p><p>Another example is using regexes to check ELBs of two wordpress stacks at once:</p><h3>Interactive GUI and Interactive Prompt</h3><p>The OpsWorks CLI also offers an interactive prompt if called without any arguments.</p><figure style="max-width:688px" data-rt-max-width="688px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6584f96c6a1ab7dfc7989cab_blog-opsworks-screenshot.png" alt="Screenshot image The Missing AWS OpsWorks CLI" width="auto" height="auto" loading="auto"></div></figure><h2>How to use OpsWorks CLI?</h2><p>The OpsWorks CLI accesses the AWS API using your AWS credentials. Once the credentials are configured, you can run opsworks with no arguments to access the interactive prompt. You can use this interactive prompt to accomplish simple tasks including listing stacks, listing instances, inspecting ELBs, updating cookbooks, deploying code, as well as running configurations and setups.</p><p>Visit the OpsWorks CLI Github repository for instructions on how to install the OpsWorks CLI: <a href="https://github.com/plivo/opsworks" target="_blank">https://github.com/plivo/opsworks</a>.</p><figure style="max-width:364px" data-rt-max-width="364px"><div><img src="https://uploads-ssl.webflow.com/656ac26f3a3f6e1cc08ba7a5/6584f96c57e9c325318ac5bb_prompt.png" alt="Screenshot image OpsWorks CLI" width="auto" height="auto" loading="auto"></div></figure><h2>What’s next for OpsWorks CLI?</h2><p>We use our OpsWorks CLI extensively at Plivo, so we’re always looking to build out new features and improvements. One feature on our roadmap is to build a bot and connect it to a real-time collaboration platform like Slack and Hipchat. With a few commands in a chat room, engineering teams can monitor and deploy instances without leaving the conversation. This way, the whole team can be instantly updated with all the changes and deployments across the organization.</p><p>Another feature we are working on is rolling deployments. Currently the CLI applies a given command to all the instances of a layer at once (just like what the AWS console). The idea would be to do the deployment instance by instance, taking them out of their respective load balancers first, and then putting them back online.</p><h2>How do I contribute?</h2><p>Please visit the OpsWorks CLI <a href="https://github.com/plivo/opsworks/" target="_blank">github page</a> to report issues and help us make this tool even better.</p>
