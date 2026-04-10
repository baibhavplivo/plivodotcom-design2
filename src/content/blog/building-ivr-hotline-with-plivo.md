---
title: "Building IVR Hotline with Plivo"
description: "Plivo's SMS API and Voice API enables businesses to communicate with their customers at global scale. Sign up for free now."
pubDate: "2018-02-08T00:00:00.000Z"
updatedDate: "2024-01-11T12:06:58.000Z"
image: "/images/blog/6583d08d043fa866285f3f08_guest-blog-2.png"
thumbnail: "/images/blog/6583d08d043fa866285f3f08_guest-blog-2.png"
authorName: "Team Plivo"
featured: true
noindex: false
categories: ["case-studies"]
seoTitle: "Building IVR Hotline with Plivo"
webflowItemId: "6583d15a514ee2b319177cd7"
---
<p>Plivo is on a mission to simplify telecom, and developers are at the center of this endeavour. For a developer coming from other domains outside core telecom, creating an end-to-end working implementation of a voice-based application can be a daunting task. For a recent hackathon, <a href="https://www.linkedin.com/in/jordancrawfordnz/">Jordan Crawford</a> from New Zealand decided to take up precisely this challenge. He decided to try combining web and telephony to create an IVR hotline system in less than 48 hours — and he succeeded! It’s fulfilling for us to see how developers from almost any domain can use Plivo APIs to add <a href="https://www.plivo.com/voice/">Voice</a> and <a href="https://www.plivo.com/sms/">SMS</a> capability to virtually any application.</p><p>We asked Jordan to share his experience working with Plivo.</p>


 &nbsp;
 &nbsp;<table>
<tbody><tr><td style="width: 50%;padding: 0px;text-align: justify;">
 &nbsp; &nbsp;Ten percent of my work time is dedicated to professional development through two “Hackdays” a month. For my most recent Hackdays I wanted to combine old-school phone technology with modern web technologies. I thought of using Plivo, which lets you work with the phone network through a web API.
 &nbsp;</td><td>
 &nbsp; &nbsp;<img src="https://s3.amazonaws.com/plivo_blog_uploads/static_assets/images/blog/guestblog-2018-02-08/guest-blog-1.png" style="display:block;width:38%;margin:auto" alt="Guest Blog">
 &nbsp; &nbsp;<p style="text-align:center;padding-top: 10px;margin-bottom: 0px !important;"><a href="https://www.linkedin.com/in/jordancrawfordnz/" rel="nofollow">Jordan Crawford <br> Developer and blogger</a></p> &nbsp;</td>
</tr>
</tbody></table>

<h2 id="why-did-i-choose-plivo">Why did I choose Plivo?</h2>

<p>You can do a lot of things with Plivo, including:</p>

<ul>
 &nbsp;<li>Sending and receiving SMS messages</li>
 &nbsp;<li>Receiving inbound calls and making outbound calls</li>
 &nbsp;<li>On a call you can:
 &nbsp; &nbsp;<ul>
 &nbsp; &nbsp; &nbsp;<li>Convert text to speech</li>
 &nbsp; &nbsp; &nbsp;<li>Play audio by providing a URL to an MP3 file</li>
 &nbsp; &nbsp; &nbsp;<li>Accept digits from callers (“press 1 for sales” in phone menus)</li>
 &nbsp; &nbsp;</ul>
 &nbsp;</li>
</ul><p>We asked Jordan to share his experience working with Plivo.</p><p>Ten percent of my work time is dedicated to professional development through two “Hackdays” a month. For my most recent Hackdays I wanted to combine old-school phone technology with modern web technologies. I thought of using Plivo, which lets you work with the phone network through a web API.</p><h2>Making something with Plivo</h2><p>My initial plan was to implement a game of Hangman over SMS, especially considering I’d written a game of Hangman back on my <a href="https://jordancrawford.kiwi/starting-at-powershop/">devtrain</a>. However, I quickly discovered that Plivo didn’t support receiving SMS messages in New Zealand, only sending them. Next, I thought I’d just make a phone call-based Hangman game, but without speech recognition support, it would be difficult to receive character inputs.</p><p>I put my thinking hat on and came up with the idea of implementing a simple number guessing game. This was a great place to start because the logic for such a game is simple, which allowed me to focus on the phone integration side. The game chooses a random number between 1 and 100 and asks the caller to guess the number by entering it on their dialpad.</p><figure style="max-width:1346px" data-rt-max-width="1346px"><div><img src="/images/blog/6583d0dffa0425e0febad2d9_guest-blog-3.png" alt="Making something" width="auto" height="auto" loading="auto"></div></figure><p>The game gives feedback on whether the guess is correct or higher or lower than the actual number. If the guess is wrong, the caller can keep guessing until they get it correct.</p><h3>How did I work with Plivo for calling?</h3><p>Something I was unsure about initially was how you’d actually handle a call. I’d assumed that after a call was picked up that you’d need to deal with the audio stream yourself, but in fact, Plivo handles the entire audio stream for you.</p><p>When a call comes in, Plivo hits your API and provides a set of instructions in XML. Depending on the actions you ask for, you may need to define a callback URL for Plivo to hit later with more data — that is, a URL for it to hit for instructions after receiving digits from the caller.</p><p>It takes a little while to think about phone calls in terms of API requests, but this approach means that you can scale your phone system just like you scale your normal web APIs.</p><h3>Implementation time</h3><p>I used Node.js and <a href="https://github.com/plivo/plivo-node">Plivo’s Node SDK</a> to build the hotline’s API. Plivo’s SDK handles all the XML instruction formatting for you, making implementation simple. A good reference for this was <a href="https://www.plivo.com/docs/voice/use-cases/ivr/node/">Plivo’s Getting Started with IVR guide</a>, which introduces all the Plivo functionality I used for the project.</p><p>The game is pretty simple. It consists of two endpoints for Plivo to hit: one for when the call is made to welcome the caller (and prompt them to enter a guess) and the other as a callback for the caller’s guess.</p><h3>Welcome route</h3><p>When a call comes in, Plivo hits the / route with a GET request and the <a href="https://github.com/jordancrawfordnz/number-guessing-hotline/blob/1d10e0754e56ee98e5b15720aeb15b7cb10b4702/phone_server.js#L17">route</a> returns the following XML to instruct Plivo:</p><div class="language-shell highlighter-rouge">
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

 &nbsp;<div class="highlight"><pre class="highlight"><code>&lt;Response&gt;
 &nbsp;&lt;Speak&gt;Welcome to the number guessing hotline.&lt;/Speak&gt;
 &nbsp;&lt;GetDigits action="[server URL]/guess?number=[chosen random number]" method="POST" timeout="10" numDigits="2" retries="3"&gt;
 &nbsp; &nbsp;&lt;Speak&gt;What is your guess?&lt;/Speak&gt;
 &nbsp; &nbsp;&lt;Play&gt;[server URL]/elevator_music.mp3&lt;/Play&gt;
 &nbsp;&lt;/GetDigits&gt;
 &nbsp;&lt;Speak&gt;Huh? I didn't understand. Could you try again?&lt;/Speak&gt;
&lt;/Response&gt;
</code></pre></div>
</div><p>This tells Plivo to speak a welcome message, then allow the caller to enter some digits with a defined callback URL. Plivo will ask the caller what their guess is and play music while the caller enters their digits.</p><p>If the GetDigits action fails (if the caller takes too long, for instance) then Plivo will speak the wrong input message.</p><h3>Guess checking route</h3><p>When the caller enters digits, Plivo hits the guess URL with a POST request. Plivo puts the entered digits in a Digits field in the request (if you’re testing this out for yourself in a tool like <a href="https://www.getpostman.com/">Postman</a>, use the x-www-form-urlencoded format of POST body).</p><p>In addition to this, you may have noticed in the XML above, the game’s chosen random number is a query string parameter in the callback URL. This is because I’m lazy and I didn’t want to have to persist the chosen random number for a call in a database. Getting Plivo to pass this parameter around for us means we can easily scale up the number of app servers as required for the millions of simultaneous calls required by our booming number guessing hotline startup!</p><p>You can <a href="https://github.com/jordancrawfordnz/number-guessing-hotline/blob/1d10e0754e56ee98e5b15720aeb15b7cb10b4702/phone_server.js#L28">checkout the code for the guess route</a>, but it yet again returns some XML for Plivo:</p><p>Once again, this makes use of GetDigits to prompt the caller for a further guess, making use of the same callback URL with the random number. If the caller gets the number correct, it returns a simple response. After this is spoken, Plivo has no more instructions so will just hang up on the caller.</p><p>You can check out all the code on <a href="https://github.com/jordancrawfordnz/number-guessing-hotline">GitHub</a>.</p><div class="language-shell highlighter-rouge">
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

 &nbsp;<div class="highlight"><pre class="highlight"><code>&lt;Response&gt;
 &nbsp;&lt;Speak&gt;You guessed too [low/high]!&lt;/Speak&gt;
 &nbsp;&lt;GetDigits action="[server URL]/guess?number=[chosen random number]" method="POST" timeout="10" numDigits="2" retries="3"&gt;
 &nbsp; &nbsp;&lt;Speak&gt;What is your guess?&lt;/Speak&gt;
 &nbsp; &nbsp;&lt;Play&gt;[server URL]/elevator_music.mp3&lt;/Play&gt;
 &nbsp;&lt;/GetDigits&gt;
 &nbsp;&lt;Speak&gt;Huh? I didn't understand. Could you try again?&lt;/Speak&gt;
&lt;/Response&gt;
</code></pre></div>
</div><h2>Setting the hotline up on Plivo</h2><p>When a call comes in, Plivo needs to hit a public API endpoint that we provide. This means we need to host our API somewhere on the internet.</p><p>If you aren’t comfortable with SSHing into a server to set up your app, <a href="https://www.heroku.com/">Heroku</a> is a good option that takes care of all the server management stuff for you. If you want to save a bit of money and don’t mind running the app server yourself, <a href="https://m.do.co/c/a82b070b4f93">DigitalOcean</a> or <a href="https://www.vultr.com/?ref=6871485">Vultr</a> will work great. All these options use hourly (or in the case of Heroku, secondly) billing so it won’t cost you much to mess around with Plivo. This game might also be a good candidate for <a href="https://serverless.com/">Serverless</a> given the simplicity of our application code.</p><p>Next, <a href="https://console.plivo.com/number/search/">buy a number</a> through Plivo, then <a href="https://www.plivo.com/docs/voice/use-cases/ivr/node/#create-an-application">create an application</a> with your server URL as the answer URL and <a href="https://www.plivo.com/docs/voice/use-cases/ivr/node/#assign-a-plivo-number-to-your-app">assign your number</a> to your application.</p><p>You should now be able to call up your number and enjoy the phone hotline built with fewer than 100 lines of JavaScript!</p>
