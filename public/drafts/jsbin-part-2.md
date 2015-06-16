# The toxic side of free. Or how I lost my love for my side project

This is a story about JS Bin. I've told one story of jsbin before, and this is the b-side, the dark side. But remember with everything I share with you, jsbin is the longest running live pastebin, and it's not going anywhere. It will continue to run and serve its users. Even the scumbags.

## Backstory

I was working mostly out of my bedroom (since our flat was small) but still working for my first company in London amongst designers and developers. jQuery was still new and I'd often be asked in written English why XYZ didn't work. I knew I needed something that contained code that would pare down the issue so I could investigate.

![2009 office](/images/office-2009.jpg)

JS Bin was launched on [September 2008](https://remysharp.com/2008/10/06/js-bin-for-collaborative-javascript-debugging) as my solution to needing to see a pastebin with an interactive component.

It was posted up on Ajaxian and had a good reception. I had started seeding it's use by answering Stack Overflow questions and linking to live demos in JS Bin. To this day this was a great success - particularly as Stack Overflow went on to create their own live pastebin support (though it looks like a poor implementation of jsfiddle).

The concept from day one was simple: you could, anonymously, create a web page for anyone to view and edit (creating a new "revision").


Initially around a 4 hour hack with 2 PHP files ([sandbox.php](https://github.com/jsbin/jsbin/blob/e895c32089ac1bd310b5d91aecabda219f2eccea/sandbox.php) and [index.php](https://github.com/jsbin/jsbin/blob/e895c32089ac1bd310b5d91aecabda219f2eccea/index.php)) and one very simple MySQL database. Over time it would become more complex, with many many more features - mostly tucked away a very sleek design (by [Danny Hope](https://twitter.com/yandle)).

JS Bin grew and grew over the years. I've gone through a couple of major rewrites and now settled on Node for it's backend (though still MySQL) on an AWS based architecture.

Somehow, JS Bin was the first to suffer real abuse, but I know jsfiddle has come under fire pretty heavily in recent years. I'm unsure if CodePen has really had much abuse yet (possibly because it's the newbie on the block).

---

This is a story, and not a happy one, of some of the trials and tribulations that left my little open source project with a toxic taste in it's mouth.

Please also bear in mind throughout these tales, that I am the sole sysadmin, and my knowledge, though workable, is limited - as are the pennies in my pocket, so *no* there's no load balancers and heavy duty sentinel machines that protect my system from madness. It's *just* me.

---

## Part 1: The start of the DDoS

I don't recall if I had seen any abuse on JS Bin before this point in time, but in late April 2012, I received an email requesting my attention:

![First DDoS](/images/jsbin-first-ddos.png)

I was travelling at the time and running workshops, and deletion was a manual job, but as soon as I could I investigated and removed the bin (today it resolves to a 404).

The bin was a *script kiddie's* paradise: enter the URL of your target, and it would repeatedly create image requests to the target. In fact, this kind of page would be the source of quite a few incidents over the years.

The thing that bugged me, and still bugs me to this day, was: *why do they host this on JS Bin? They have to share a link, why not share an HTML file?*

This would mean that JS Bin wouldn't be caught in the middle. ¯\\_(ツ)_/¯

### The alternative DDoS: self-attacks by the moronic

Thankfully the self-attacks happened *after* JS Bin had moved to Node, otherwise I'm not sure it would survive.

In fact, JS Bin doesn't always remain calm during these attacks. *Self-attacks?* Yep. It's when the script kiddie page asks for a URL, but the page doesn't do any validation on the URL, and, since it takes very little brain cells to want to orchestrate the attack, some moron leaves off the preceding "http://" part in their attack.

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

---

## Part 2: Spam

Who doesn't love a filthy does of spam with their product? Let's picture exactly what JS Bin is: a place that people can *anonymously* create public web pages.

So...yeah...I guess I should have known I was asking for trouble.

JS Bin, as of April 2015, has well over 15,000,000 bins. It crossed 10 million bins late last year, so that number has been accelerating. It should. That's what growth is about. But I had to face it, there's no way there's 5 million new bins with everyone learning the magic of the web stack. There's going to be some spam in there.

![https://www.flickr.com/photos/the-lobster/4767649914](/images/spam.jpg)

<!-- photo via: https://www.flickr.com/photos/the-lobster/4767649914 -->

### Affiliate spam

No, not spam that I, or JS Bin are affiliated with! At some point in 2014, I searched Google with "site:jsbin.com" just to see what awesome content existed. Sadly, Google's only reply, and pages of reply, was this "affiliate spam".

Bear with me: it's a page that contains a tonne of links that usually entices the reader to click through for some kind of random product. Maybe a DVD or a CD containing the secrets to earning your first million or some such nonsense.

In some cases, since I have admin access to JS Bin, I would just delete the bin. But it was (and is) like playing whack-a-mole. You delete one, and immediately find another - partly also because with JS Bin, you're deleting a revision, and not the whole collection of bins (I've yet to develop that).

So in this case, I would head to the database and run dangerous manual queries to delete all the bins with the offending URL. Thankfully, in the 15 million rows, I had the good sense to add an index early on to the URL field, so it's quick and doesn't lock up the table.

### SEO spam

I don't really understand what this is, but it's definitely a thing. Similar to the affiliate junk, SEO spam would just contain an insane amount of links to web sites. I still don't understand it, but it's definitely nefarious.

### Phishing

Yay, phishing. Phishing is actually the very first type of abuse I ever came across on JS Bin. I don't remember who reported it to me, but at some point, someone was trying to phish the Habbo.com homepage.

It's why, even today, the [*public* config](https://github.com/jsbin/jsbin/blob/config.default.json) for JS Bin contains a default blacklist for `habbo.com` and `processform.cgi`. The blacklist prevents the bin from being saved. Everything works, but it just silently fails to save.

In production the blacklisting is much much larger these days, and includes frankly stupid stuff like `kardishain`, `Clickbank` and snippets of nasty code like `...|63|0A|27|73|70|2E|2F|...` which aims to prevent code that's used in some kinds of attacks.

But yeah: whack-a-mole.

### Link hiding

The last type of spam that appeared in JS Bin is using JS Bin as a link sharing site to the dark and shitty side of the web. Arsehats (the nasty users, as I like to call them) would use JS Bin to redirect using `top.location="http://arsehat.com"`. Then, using the full output URL, it would be shared on networks like Twitter and Facebook.

Since "arsehat.com" was already blocked on Facebook and Twitter, but JS Bin wasn't, it's an efficient way to share links to bad places, and hide under JS Bin.

It's kinda depressing that when I search Twitter for "jsbin.com", it would mostly yield weirdos sharing things like webcams to their toilet fetish funsies.

### If you can't play nice...

In August 2014, I made the hard decision that I would have to reduce JS Bin's functionality if it was going to continue to positively contribute to the web, instead of flooding it sludge filled spam.

I limited the full output *for anonymous bins* to last 90 minutes, then it would automatically revert to the edit view. Since the edit view is compiled using JavaScript, it had no use to SEO indexing. The live output `iframe` is also protected with a `sandbox` attribute that prevents location redirects, so the link hiding issue also (mostly) went away.

Finally, all output views (i.e. the full output without the "JS Bin editor" bit) include the `X-Robots-Tag: nofollow` header - which is the new way of doing `robots.txt`. This seems to have helped stamp out the "SEO" use of JS Bin.

But it didn't end there...

---

## Part 3: Registered users wreaking havoc

Originally JS Bin was 100% anonymous. I liked that. But after about a year (or so...I forget), there was clearly an important feature missing: people couldn't recall their old bins.

Duh. Obviously. It's *anonymous*. But that didn't really fly for an answer. Before the full version 3 rewrite (from PHP to Node), I implemented a simple system that you could "register" your name and "key" as your token. This meant that advanced users would know how to recall their bins (so long as this special cookie was in place).

When I realised I had implemented user sign-in in quite possibly the crapest way, version 3, new, clean, slick JS Bin, came with proper sign-in, register and password reminder.

With one fatal flaw: there were zero checks on your account. No email authentication, no captcha (I hate crapchas), no nothing. And registered users didn't have *any* limitations on their bins - the public output would remain public.

This, unknowingly to me, lead to an increase in registrations. Yay! No. Not yay. These were not the kinds of folk you wanted in your system. What's worse, is these users would create multiple accounts to create multiple bins, all of which were not limited. They'd still be limited by the blacklisting, but blacklisting is simple and probably doesn't even catch 20% of the junk.

### Grinding to a total halt

On the morning of March 26th, 2015, I was solo parenting looking after my awesome little ones, when I started noticing reports on JS Bin that something might be very wrong.

![The Sharps](/images/seren-family.jpg)

Earlier I mentioned that the bins went from 10 million to 15 million in around 6 months (or so). Our registration rate was also climbing insanely quickly. The net effect of this: storing more content.

Storage is cheap, right? Sure is. JS Bin stores it's database on a 100GB drive. It's *just text* for heavens sake.

JS Bin's database ran out of disk space. All of it. Gone. So much so, that I *couldn't delete data*. (I think) because MySQL needs to create a tmp file to run queries, that since there was literally no disk space, it couldn't create the tmp file to delete the junk bins that were seemingly coming in faster and faster.

The weird thing was that JS Bin still worked. It could recall bins and you could use JS Bin, you *just couldn't save* (though, that's kind of a problem...).

When you're solo parenting, though, there's no support around and there was no way I was going to (or even *could*) abondon the kids to work on solving this issue. I had to suck it up, and trying to focus entirely on the kids and ignore the problem until my wife returned home. I did manage to put out a [cry](https://twitter.com/rem/status/581004721785167872) for [help](https://github.com/jsbin/jsbin/issues/2320) which had lots of lovely support, but support doesn't fix fucked disks.

Though, eventually, a few hours later, I managed to swap in a 400GB disk to the AWS database. This solved the issue right away, but the source of the problem was still wide open.

### If you (still) can't play nice...

Wide open registrations was always a stupid idea. An entirely anonymous web site, given JS Bin's purpose, is also a stupid idea.

In the end the *only* way to register with JS Bin *now* is via GitHub. I don't like this, but it does lean on GitHub's verification process. It doesn't kill the issue 100%, but it reduced our sign-up rate significantly and we only have the odd one arsehat come through (which I also then report back to GitHub).

---

## Part 4: The cost

In July 2014, JS Bin *finally* landed [Pro accounts](https://jsbin.com/upgrade). The aim of this would be for JS Bin to eventually be self-sustaining. It's been running out of my pocket for the previous 6 years (for server and related costs), and development and design (2014 excluded) had been lovingly "donated" by myself and Danny (who is responsible for the design).

In 2014, I decided to give JS Bin a full shot, and employed two (amazing) developers, [Giulia Alfonsi](https://twitter.com/electric_g) and [Fabien O'Carroll](https://twitter.com/allouis_) to work with me full time on JS Bin.

At the end of May 2015 (10 months after launching pro) the income JS Bin has provided has only *just* covered operating costs for the previous year. That's awesome and terrible at the same time. Before "pro" it was making a 100% loss - so that's something, *but* it doesn't even touch the edges of what I had hoped it would return (and I wasn't even being optimistic, as any British person would expect).

But there is a cost to taking money...

### VATMOSS

[VATMOSS](https://remysharp.com/2014/12/16/vatmoss) was a change to the way that VAT is processed in the EU. Unfortunately, the geniuses behind the change at the EU (or whatever rock they hide under) hadn't quite thought the whole thing through. The information was thin, convoluted, confusing and not really accessible to small companies like myself and many others.

This change was also a *requirement* for anyone in the EU selling digital services or goods (i.e. JS Bin Pro subscriptions), and there was (and is) the threat of fines if you don't report and pay on the sales correctly.

The last month of 2014 were riddled with stress from the VATMOSS changes that I had to complete on JS Bin.

- https://twitter.com/search?q=from%3Arem%20%23vatmoss&src=typd
- https://twitter.com/rem/status/589057179258327040

## Fraud credit cards

Since we only charge £6 a month, its a nice low test for stolen credit cards to be tested with. Then there's the refund and the £15 processing fee.

So I've taken to checking each and every individual sign up and their bins to see if they look spammy. I caught my first fraud card and reported on 13-April 2014. Not a huge success but very satisfying to know I've avoided the charge.


## Part 5: The Police

- Phone call from London met
- Email from Spanish police + porn

### Terrorist use

- Anonymous / https://twitter.com/zalun/status/602586249203945472




