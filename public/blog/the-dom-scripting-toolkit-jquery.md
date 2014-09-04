# The DOM Scripting Toolkit: jQuery

Last Friday I did my first bit of public speaking.  I presented jQuery at QCon.

[John](http://ejohn.org) asked me a couple of months ago, so I pushed the fear aside to give room for the flattery and agreed.


<!--more-->

If you're reading this blog post, and you did happen to see my presentation, I would really love to hear your feedback - good or bad - it's all very useful to me.

For those just interested in the talk, here are the slides:

<div style="width:425px;text-align:left" id="__ss_310357">
  <object style="margin:0px" width="425" height="355">
    <param name="movie" value="http://static.slideshare.net/swf/ssplayer2.swf?doc=dom-scripting-toolkit-jquery-1205765318674445-2"/>
    <param name="allowFullScreen" value="true" />
    <param name="allowScriptAccess" value="always" />
    <embed src="http://static.slideshare.net/swf/ssplayer2.swf?doc=dom-scripting-toolkit-jquery-1205765318674445-2" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed>
  </object>
</div>

## Diary of my Experience

I've written up my experience of speaking for the first time, in part to help anyone else who is considering it, and in part to help myself in the future.

### Concerns

I was particularly worried that the presentation had to be a hour long.  I know that there are presentations on jQuery that have lasted 30 minutes and even 15 minutes.  So my approach was that if it can be taught in 15 minutes, then in 1 hour, I should be able to teach jQuery pretty fully.

### Preparation

As I mentioned, I had a good two months to prepare.  I started off by creating an outline of the topics I wanted to cover at the highest level.

A week after being asked, I had to provide an abstract and bio for myself.

Given that I didn't *really* know what the presentation would cover at this point, I had to pull something together that would do the presentation justice in two months time.  In the end, I explained that the presentation would cover all the bases and demonstrate code.  Pretty general I'm afraid.  I definitely think this part will be easier the next time around.

A few weeks later I had the outline and sub-levels I knew I wanted to cover.

Then came about 2 months of procrastination and other business to take care of.  I was always the kind of kid that would leave my homework up to the last minute, and then usually do pretty well when I handed it in it (after working all night on it).  I've grown to understand that if I could commit to the paced work required leading up to the deadline, I *could* have aced the homework.  I guess nothing really changes.

### Dry Run

I knew if anything, I absolutely **had** to do a dry-run through.  [Julie](http://www.flickr.com/photos/remysharp/2151045633/) promised to watch me run through - but the bottom line was that she wouldn't really know if I was talking rubbish or not.

John also offered to look through the slides for me.  If I had finished them a week earlier, I would have taken him up (and probably got some very useful feedback)...alas I did not.

However, I did do a dry run through a couple of days before.  It was a great tool for easing my mind and making me understand what needed tweaking.

### The Big Day

In my usual fashion I got lost on the way - pretty tricky given that I even *knew* where it was.  I got there with 30 minutes to spare before I was on.

I wanted to see some of the presentations for that day, but I was up late making changes, and I knew I wouldn't be able to get there early.

I made multiple copies of the presentation and printed it out, and charged the hell out of the laptop.  

I *did* forget a VGA to DVI converter - but thankfully [Joe Walker](http://getahead.org/blog/joe/) (who had stepped in to host the track and [spoke earlier](http://getahead.org/blog/joe/2008/03/05/infoq_interview.html) on [DWR](http://getahead.org/dwr)) lent me one for my laptop.  

Joe introduced me and I went on, a couple of minutes past 14:30.

I honestly didn't think I felt nervous leading up to or during the talk.  I definitely fluffed some of the slides and tried to get through them too quickly, but I kept reminding myself that what felt like 10 minutes to me, was actually a few seconds to the audience.  I think a trained eye would still been able to see stress coming through a little regardless of how I felt.

Once the slides were done, a few questions were asked and the whole talk ended exactly an hour later.

### Post Talking Blues

In the quintessentially British way, I immediately started putting myself down after the talk.  Although now in retrospect I don't think it was anything groundbreaking, I don't think it was terrible.

Getting home however, I felt depressed and that perhaps the content was too simple for the audience (which I still feel it may have been a bit). 

I've written to one of the chaps who organised our track and asked for any feedback that was available.

### Next Time

I'm redoing the talk for [Skill Swap](http://skillswap-brighton.org/) Brighton, the community effort to share knowledge set up by [Andy Budd](http://www.andybudd.com/).

If it all goes ahead, I'll be changing the presentation to remove some of the obvious parts (like DOM manipulation) and replacing it with nuances of jQuery: a simple example - *really* stopping animations:

<pre><code>images.queue('fx', []).stop().animate({ 'opacity' : 1 }, 200)</code></pre>

It's the <code>.queue('fx', [])</code> that will empty out any animations waiting to run.  You can see this working example on my [front page](/).

### Wrap Up

I did enjoy it in retrospect, and I'm always keen to teach others if I can (pretty much why this blog and [jqueryfordesigners.com](http://jqueryfordesigners.com)) exist.  

I'll definitely be taking future opportunities that come my way.