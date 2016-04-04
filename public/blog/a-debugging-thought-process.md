# A debugging thought process

I'm the type of developer that enjoys little problems. The other day [Una Kravets](https://twitter.com/una) posted a call for help on twitter (with a rather compelling reward), and I had a few minutes before meeting so I set to work.

Although this process comes naturally to me, I thought it would be useful to write down my thought process and approach into this post.

<!--more-->

[![Una asks "I will write a song for whoever figures out why http://toolsday.io/  episode pages load so slowly/dont load at all *some* times on Chrome"](/images/una-toolsday.png)](https://twitter.com/una/status/715550270365634561)

## Always replicate first

Without being able to replicate the issue there's no way to know whether the problem is actually solved. Una's tweet included the word *sometimes* which means that what ever I do, it will have to be repeated over and over. Even better if I can find the thing that's causing the slow load.

## Things to check on "slow load"

**Check in the browser.** Not just once, repeatedly (in the same tab, the way a normal user might keep hitting refresh), and repeat this in a private/incognito tab. This is more of a litmus test to see if you can repeat the issue at all.

**Rule out network.** I'll move straight to using `curl` on the command line. I'll curl the full URL, and if that doesn't hang (or isn't particularly slow) it (initially) rules out the server being the cause (though we've only confirm the HTML and network isn't the issue). Additional tools I would have looked at (had the request been slow) would be `ping` and `traceroute` as indicators of where the issue could have been.

**Rule out the session on the network.** Even though curl might be quick, some systems might be using the user session to fork the logic. We've ruled out a cold start (with a simple `curl http://example.com`), but I'll also make the request in the browser, and in the network panel, right click and "copy as cURL". Take this command and run in the terminal.

![Copy as curl](/images/devtools-copy-response.jpg)

**Check blocking assets.** I'll be looking for `script` and `link` elements (because [link blocks too](https://remysharp.com/2011/06/08/link-elements-block-dom-parsing-too)) manually through the source code (and potentially through the DOM). In Una's case there was only two inline scripts (one of which was Google Analytics, which initially I'll give it a free pass unless I rule everything else out). The `link` element of interest was the CSS, so I manually curl'ed this in the terminal and it responded quickly too.

If a blocking asset were to blame, I'd spot this in the timeline in devtools, it should prevent rendering (I might even see a partially rendered DOM) and other execution.

**Check for *anything* that looks out of place.** Upon refreshing the browser on the homepage URL, I could see the loading status in Chrome (bottom left) was blocking because of _something_ - though it's not clear at all what it was. This outstanding request is what was causing the page to effectively hang.

Skimming through the source of the HTML for anything that looked like it would make suspicious requests I noticed there were a number of `audio` elements with `preload="meta"` - which I know kicks off initial http requests for each of these.

The next thing was to check open sockets to the domain using <nobr>chrome://net-internals</nobr>:

![Active sockets shown in chrome://net-internals](/images/active-sockets.png)

Notice that toolsday.io:80 had **6 active sockets** - this is the maximum number sockets per origin, so, somehow, when the page was being reloaded, these sockets were still active, and Chrome didn't have a free socket to request the HTML index page.

The solution: don't preload the audio.

---

This post wasn't so much to solve the audio preloading problem (which I believe is also filed as a Chrome bug), but to show the workings that takes a matter of minutes to narrow down where the issue exists. I hope this helps you in your debugging journey ❤
