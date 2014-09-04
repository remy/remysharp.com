# Rimshot with HTML5

A little while ago I was involved in a conversation with someone about being able to have a button on your computer to trigger a rimshot noise, or a 'wah-wah-wahhh' (yes, of course I was <em>in</em> a pub).

I pondered this for a few minutes, thinking it could be done using a bookmarklet and an overkill amount of JavaScript to inject a flash MP3 player of some sort. I promptly returned to my pint forgetting about the idea.

<!--more-->
In a moment of bordem the idea returned to me this weekend, and then I remembered we now have the <code>&lt;audio&gt;</code> tag (actually we've had it for over 18 months).

Now the bookmarklet is no code at all!

Drag the bookmarklet up to your bookmark bar, and if the browser supports HTML5, then you can fire off a rimshot or 'wah-wah-wahh' next time you near something daft in the office!

<div class="update"><p><strong>2009-07-07</strong> I've since updated the bookmarklet to load both .wav and .ogg with correct mime types (Google code was serving it as application/x-octstream (thing - you know what I mean) ), and I've switched around the order in which they're being served.  Apparently Safari is quite good at just getting the audio just to work, whereas Firefox is a little more picky!</p>

<p><strong>2009-07-06</strong> Upon further testing, this works (for me) in Safari 4, but silently fails in Firefox 3.5 - which I'm investing and will post my findings</p></div>

<a style="font-size: 150%;" href="javascript:(function(t){var s={'rimshot':'http://rimshot-bookmarklet.googlecode.com/svn/trunk/rimshot.','loser':'http://rimshot-bookmarklet.googlecode.com/svn/trunk/loser.'};var r=document.createElement('audio');r.autoplay=true;var s1=document.createElement('source');s1.src=s[t]+'wav';var s2=document.createElement('source');s2.src=s[t]+'ogg';r.appendChild(s2);r.appendChild(s1);document.body.appendChild(r);})('rimshot');">Rimshot</a>

<a style="font-size: 150%;" href="javascript:(function(t){var s={'rimshot':'http://rimshot-bookmarklet.googlecode.com/svn/trunk/rimshot.','loser':'http://rimshot-bookmarklet.googlecode.com/svn/trunk/loser.'};var r=document.createElement('audio');r.autoplay=true;var s1=document.createElement('source');s1.src=s[t]+'wav';var s2=document.createElement('source');s2.src=s[t]+'ogg';r.appendChild(s2);r.appendChild(s1);document.body.appendChild(r);})('loser');">Wah-wah-wahh</a>

I'm running the sound files off of a Google code project, so if you want some other daft sound, ping me and we'll add it in (or if you have better sound files).