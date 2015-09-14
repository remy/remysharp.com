# The toxic side of free. Or: how I lost the love for my side project

This is a story about JS Bin. I've told one story of JS Bin before, and this is the b-side: the dark side. But remember with everything I share with you, JS Bin is the longest running live pastebin, and it's not going anywhere. It will continue to run and serve its users. Even the scumbags.

<!--more-->

The story has been broken into 5 parts, released over a series of days.

- [Part 1: The start of the DDoS](/jsbin-toxic-part-1)
- Part 2: Spam
- Part 3: Registered users wreaking havoc
- Part 4: The cost
- Part 5: Police

## Back story

I was working mostly out of my bedroom in Brighton (since our flat was small) whilst still working full time in London amongst other designers and developers. jQuery was still new and I'd often be asked in written English why some bit of code didn't work (the explanation often lacked the *actual* code!).

I knew I needed something that contained code and that would pare the issue down to it's smallest form, so I could investigate.

![2009 office](/images/office-2009.jpg)

JS Bin was launched on [September 2008](https://remysharp.com/2008/10/06/js-bin-for-collaborative-javascript-debugging) as my solution to needing to see a pastebin with an interactive component.

It was posted up on Ajaxian and had a good reception. I had also started seeding it by answering Stack Overflow questions and linking to live demos in JS Bin. To this day this method was a great success - particularly as Stack Overflow went on to create their own live pastebin support (though IMHO, it looks like a poor implementation of jsfiddle).

The concept from day one was simple: you could, anonymously, create a web page for anyone to view and edit (creating a new "snapshot").

Initially around a 4 hour hack with 2 PHP files ([sandbox.php](https://github.com/jsbin/jsbin/blob/e895c32089ac1bd310b5d91aecabda219f2eccea/sandbox.php) and [index.php](https://github.com/jsbin/jsbin/blob/e895c32089ac1bd310b5d91aecabda219f2eccea/index.php)) and one very simple MySQL database. Over time it would become more complex, with many many more features - mostly tucked away a very sleek design (by [Danny Hope](https://twitter.com/yandle)).

JS Bin grew and grew over the years. I've gone through a couple of major rewrites and now settled on Node for it's backend (though still MySQL) on an AWS based architecture.

Somehow, JS Bin was the first to suffer real abuse, but I know jsfiddle has come under fire pretty heavily in recent years. I'm unsure if CodePen has really had much, if any abuse *yet* (possibly because it's the newbie on the block).

---

This is a story, and not a happy one, of some of the trials and tribulations that left my little open source project with a toxic taste in it's mouth.

Please also bear in mind throughout these tales, that I am the sole sysadmin, and my knowledge, though workable, is limited - as are the pennies in my pocket, so *no* there's no load balancers and heavy duty sentinel machines that protect my system from madness. It's *just* me.

---

## Part 1: The start of the DDoS

I don't recall if I had seen any abuse on JS Bin before this point in time, but in late April 2012, I received an email requesting my attention:

![First DDoS](/images/jsbin-first-ddos.png)

I was travelling at the time and running workshops, and bin deletion was a manual job, but as soon as I could I investigated and removed the bin (today it resolves to a 404).

The bin was a *script kiddie's* paradise: enter the URL of your target, and it would repeatedly create image requests to the target. In fact, this kind of page would be the source of quite a few incidents over the years.

The thing that bugged me, and still bugs me to this day, was: *why do they host this on JS Bin? They have to share a link, why not share an HTML file?*

This would mean that JS Bin wouldn't be caught in the middle. ¯\\_(ツ)_/¯

### The alternative DDoS: self-attacks by the moronic

Thankfully the self-attacks happened *after* JS Bin had moved to Node, otherwise I'm not sure it would survive.

In truth though, JS Bin does not always remain calm during these attacks. *Self-attacks?* Yep. It's when the script kiddie page asks for a URL, but the page doesn't do any validation on the URL, and, since it takes very little brain cells to want to orchestrate the attack, some moron leaves off the preceding "http://" part in their attack.

The result? They start to attach URLs like http://jsbin.com/abcef/some-site-the-user-hates.com - which does actually go through JS Bin's sub-system.

Sometimes, not always, but sometimes it results in this, and that's when it gets really hairy...

![JS Bin 502](/images/jsbin-502.jpg)


### "Always strike when they're sleeping..."

<img src="/images/jsbin-twitter-reports.jpg" style="width: 50%; display: block; float: right" alt="Twitter reports">

Okay, so this might not be some secret mantra that arse hats always attack whilst the sys-admin sleeps, it might actually be that since I'm based in the UK, most attacks happen during central America midday time...so yeah, I'm sleeping and I wake up (around 6am) to twitter reports of JS Bin being unreachable.

It's pretty disheartening when most of the @replies to the product you've poured your soul into are: the shit has hit the fan!

<div style="clear:both"></div>

### When there's an endless supply of shit

I actually have a [runbook](http://jsbin.com/help/runbook/slow-response) for when this happens. When JS Bin comes under heavy fire, whatever that attack looks like. Most of the time the solution would be to restart JS Bin. However, it would also tend to come from a few specific IP addresses.

I do also get AWS CloudWatch alerts when the CPU on JS Bin machines run high (for a number of seconds). The constant hitting traffic against the node process (yes...a single process) results in the process being constantly "busy", i.e. high CPU rate, so there *are* alarms I get.

So the runbook would scan the latest 200 lines (or so) of the access log and spit out the unique IPs and the count of their hits. From there, would go about `iptable`'ing the addresses (i.e. blocking the IP address).

One night got *so bad* that I had to write a script in a cronjob that would repeatedly scan the logs for any IP hitting JS Bin more than some arbitrary figure, and it would ban them.

It did resolve the issue. It also randomly blocked many, many more regular users who were keen to let me know via Twitter and the GitHub issues (which is a good thing, I'm not complaining - it just sucks for them that they got caught in the cross fire).

### fail2ban

Eventually I cottoned on to using [fail2ban](http://www.fail2ban.org/wiki/index.php/Main_Page) to protect my machine from repeated hits from a specific IP address. Since installing around late 2014, it's massively reduced the attacks of this nature.

The unfortunate side effect is that it also blocks out classroom use of JS Bin, since JS Bin sends XHR writes *all the time*, fail2ban sees this all coming from a single IP, and goes ahead and denies the eager young class from learning.

In this situation, classes have got in touch via any channel possible, and I've white listed their IP address manually. I know it's caught some people out, but, sadly, this is the cost I've had to pay.

### null

One other trick that I added to JS Bin, is that the iframe that the output is rendered into is forced to resolve to http://null.jsbin.com, which in turn returns a [204](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.5) (this is done by injecting a `base` tag into the preview).

This small change also reduced a huge number of requests, particularly when users are putting placeholder images in their bins, and the bin re-renders automatically on every key press. The preview might load 10 blank images, but "blank" actually meant it didn't have a source, which means it was hitting JS Bin.

Now, the output simply resolves to null.jsbin.com, is responded to using nginx and never touches JS Bin.

---

Come back for part 2: the trials of dealing with spam in it's various forms!
