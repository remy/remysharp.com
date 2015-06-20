# The toxic side of free. Or: how I lost the love for my side project

This is a story about JS Bin. I've told one story of jsbin before, and this is the b-side, the dark side. But remember with everything I share with you, jsbin is the longest running live pastebin, and it's not going anywhere. It will continue to run and serve its users. Even the scumbags.

The story has been broken into 5 parts, released over a series of days.

- [Part 1: The start of the DDoS]()
- Part 2: Spam
- Part 3: Registered users wreaking havoc
- Part 4: The cost
- Part 5: Police

## Back story

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

![EU](/images/jsbin-eu.jpg)

**Bringing down barriers to unlock online oppotunities.** Keep that in mind.

<p hidden>The European Commission is the EU's executive body. It represents the interests of the European Union as a whole (not the interests of individual countries).</p>

[VATMOSS](https://remysharp.com/2014/12/16/vatmoss) was a change to the way that VAT is processed in the EU. Unfortunately, the geniuses behind the change at the EU (or whatever rock they hide under) hadn't quite thought the whole thing through. The information was thin, convoluted, confusing and not really accessible to small companies like myself and many others.

This change was also a *requirement* for anyone in the EU selling digital services or goods (i.e. JS Bin Pro subscriptions), and there was (and is) the threat of fines if you don't report and pay on the sales correctly.

The last month of 2014 were riddled with stress from the VATMOSS changes that I had to complete on JS Bin.

This tooks days and days of stress to try to understand VATMOSS, and what would be required to satisfy requirements.

In the end, it took around two weeks of development for both my time & Fabien (employeed by me to work on JS Bin) and about two weeks of research, filing and accounting time on Julie's part (my business partner - and wife).

Estimated business cost: £3,500.

![VATMOSS filed](/images/jsbin-vatmoss-filed.png)

£11.70p. VATMOSS, the stress of it all, to collect pennies from **seven people**. It would have been cheaper to book flights to each of their addresses to collect the cash by hand. [It was not fun](https://twitter.com/search?q=from%3Arem%20%23vatmoss&src=typd).

### Fraud credit cards

Since we only charge £6 a month, its a nice low test for stolen credit cards to be tested with.

This means that JS Bin was being used as a testing ground for stolen card numbers. If the card went through then they would use the card. Unbeknownst to me, the user wouldn't do *anything* on JS Bin, and I'd be on my merry way thinking I had a new pro sign up.

Then, eventually, the rightful owner would thing, "What's this 'JS BIN PRO MONTHLY' doing on my statement", follow up with their bank, and raise a fraud complaint.

I can't win the complaint. The card was stolen, the £6 belongs to the original card owner, no question. But! If there's a dispute on Stripe, there's transaction fees for reversing charges. £15.34 in fact. Since I know I'll lose the dispute, **it's cost me, £21.54 to allow some shithead to use JS Bin as a stolen card testing facility**.

![Stripe disputes](/images/jsbin-stripe-fraud.png)

My process now is that I've taken to checking each and every individual sign up and their bins to see if they look spammy. I caught my first fraud card and reported on 13-April 2014. Not a huge success but very satisfying to know I've avoided the charge. Woot!

### Pro

Pro accounts was never the intention when I launched JS Bin back in 2008. I'd made stupid efforts to avoid having user accounts for quite a few years, but insisted that it should be 100% free.

I don't know why.

During 2013, I attended a lot of events where individuals kept coming up to me asking how do they pay for JS Bin, or why don't I add Pro, or explained that the only reason they used CodePen over JS Bin was that they were paying (i.e. the perceived security of data from the business exchange). The more I considered it, the more I realised I wanted to do JS Bin full time, **and work on something I loved**.

I ran some numbers based on registered users in the database, and factored for about 20% spam/idle users, and then put my aims at 1% conversion. It didn't seem like much.

The problem was: *that's all I did*.

There was no business plan. There was no business development team. There was no marketing plan. There was no deadlines. There were no aims.

!["I-565 at Space and Rocket Center" by Nhlarry. Licensed under CC BY-SA 3.0 via Wikimedia Commons - https://commons.wikimedia.org/wiki/File:I-565_at_Space_and_Rocket_Center.jpg#/media/File:I-565_at_Space_and_Rocket_Center.jpg](/images/jsbin-launch-failure.jpg)

So there my amazing product sat. To others it was ready to launch, but I was still heads down focused on the last 1% stretch, so it was parked.

I'd had the odd conversation that suggested I might be able to get funding from the government (as JS Bin is a tool primarily for learning), but I'd shy away from the idea of having to do *"business"* stuff. It scared me a little too.

Launching became the well know problem of chasing the end of the rainbow. Striving for the perfect, polished product before everyone else had access to it. Sure we had some alpha users in there, but they weren't invested in JS Bin any more than you are, so feedback came when they had some time.

This went on for months and months. All the while JS Bin isn't making money, my entire company is focusing it's time on JS Bin and *not* producing any cash flow from any other sources.

Pro (eventually) went live on **23 July 2014**. And the first way of registrations was an amazing feeling. In fact, one user ([David Gauld](https://twitter.com/dcgauld) (who actually worked for me doing the [Left Logic](http://leftlogic.com) redesign and built a fair amount of [confwall](https://confwall.com)) was the first to go pro catching the [commit landing in Github](https://github.com/jsbin/jsbin/commit/814251af40334990cf2490dc45d88ba246542f2f#diff-0aab8fc4f1799dc88c8d29729b719d87L118), even before I had announced it - a cool side effect of the open source.

Users did come, but looking back, it really wasn't very much if you consider the costs of running JS Bin, let alone paying for development, and then look at what the monthly (or yearly subscriptions) go us. A total of 42 upgrades in the first week (26 were on the first day).

![JS Bin Stripe report, week 1](/images/jsbin-pro-week1.png)

I had always tucked money aside for a rain day (actually rainy year), and yeah, I can look back and say "sure, I took a shot" - but it came at a pretty penny.

The next 6 months I lost my love for the project. Very simply: any new development had to justify it's existence and it's demand on my time. I did continue development until the end of 2014, but by that point, all love had been sucked dry and I needed a break. JS Bin is solid enough that it can run without day to day attention and I could return to client work and *try* to recover my now sad looking business bank balance.

### Plan, and know what your users *need*

There were two major problems that hurt the success of JS Bin Pro.

The first was the nearly zero planning, and strange fear of business, marketing and actually making money. I often associate with the underdog, and those users looking for free access. But I run a service that's abused from all directions and every new user is more of a burden than growth.

Very simply put: should I want to run a service for 100 paying users or for 100,000 non-paying users? Me? Now, I realise it's the 100 paying users, because, honestly, I've got bills that I want to pay. I'd rather pay those bills building something I love rather than building something I begrudge.

I lost *a lot* of love in this area of working with JS Bin. I can take the spam, and the junk, but this part of JS Bin required that the project actually raises money to support itself - and constantly feeling that I *had* to deliver some part of code for JS Bin to continue...it just didn't work for me.

The second, major issue was that I had hoped, naively, that the web community will swoop in and pony up some cash. But the bottom line was JS Bin Pro had nothing that users *needed*. Sure, *now* it has asset uploads and other features, but at the time, there wasn't anything users *really needed*.

I pay for my Github account because I *need* private repos. I pay for Gmail, because I *need* real business email accounts. I pay for Dropbox because I *need* the extra space.

With JS Bin, **everything users *need* is given away and open source. That's honourable, but doesn't pay the mortgage.**

The next time around, with products like [Confwall](https://confwall.com), I launched *as soon* as it was usable. I offer a free area, but I make sure that you can't get to the stuff you *need* unless you pay. The way it should be! In fact, at time of writing this post, Confwall still doesn't take payment online - I cut that part to launch as early as possible, and we handle payments via email & invoices.

## Part 5: Police

I said before that JS Bin Pro really sucked the love out of the project for me, but this part has been a mix of emotions, but it's definitely the most distressed I've been when running JS Bin...

Over the years I've had cease and desist emails telling me that I've either been hacked or stolen content. I would take my time (through gritted teeth) explaining that JS Bin allowed users to upload their own content, and that this wasn't something I was trying to do to hurt the company or institution.

Nearly every single time, the content would be removed promptly (usually at the same time as I was responding to explain what JS Bin was), but there's three occasions that stand out in my memory.

### Evening calls

Early 2010, I was doing a lot of client work and when the phone rang at 7pm, I asked Julie (my wife and business partner) to shoo them away and to say that I was unavailable.

I think I was actually having a moment on The Throne when Julie gave a knock on the door. "You need to take this, it's the Police".

No one really wants the Police phoning their house.

It wasn't actually as painful as I would have guessed. The man said he was calling from the London Met. Police, and that he was dealing with a coordinated DDoS attack orchestrated over Facebook due to take place tomorrow evening.

The messages (on Facebook) were using JS Bin as the method of attack (yes, pretty much script kiddies), and to the police officer's credit, he had done his research on JS Bin and understood that *I hadn't created these bins*. He was calling to ask if I could *possibly* take the links down (yes, we're [So Very British](https://twitter.com/soverybritish)).

Absolutely. Minutes later, the bins were gone. I didn't hear back again, but it would be the first in a dozen or so (gentle) encounters with the police.

### The worst email I ever received

One late evening in 2013, sat on the sofa watching a film, I get an email. As with all webby people that don't understand that work is supposed to stop at 6pm, I go ahead and get my laptop and read the email.

It's an email from the Spanish police. Sort of a cease and desist, including two links to JS Bin asking for their immediate take down. I can't actually find the original email because I wanted to erase all memory of the event.

There had been issues in the past where porn had been linked to from JS Bin and it's constant battle to keep it under control. The email from the Spanish police however, did not warn me as to what was behind the URLs.

I clicked, and my memory is slow motion of what I saw next, and thankfully the internet was also slow to load.

---

Just enough loaded for me to realise that the images contained child pornography, early enough for me *not* to see anything that would scar me for life. I closed the window very quickly.

It still makes me sick to think that *that* kind of content was being hosted on one of my URLs.

Using the terminal, I `cURL`ed the URL down to look for any commonalities between the source of the two JS Bin URLs I had, to immediately add it to the blacklist functionality. Thankfully...if there was a thing, I did find a commonality, and I was able to block what appeared to be a source for this kind of material.

It took many days to forget the sick feeling I had that linked me directly to the content posted on JS Bin.

### "Terrorist use"

I've used inverted quotes around "terrorist use", because, well they're not my words, and I'm not 100% certain that JS Bin falls squarely into be used for terrorism. But, it's certainly a new area for my project.

Just a few weeks ago, an issue was filed, claiming exactly this:

![Terrorism attacks](/images/jsbin-terrorism.png)

The bin that's referred to was being used to attack the Madison Police web site, apparently organised by Anonymous:

![Anonymous attacks](/images/jsbin-anonymous-attack.jpg)

I took down the bin, and added appropriate blacklisting, but also noticed that the issue was filed about 10 *days* after the attack had taken place!

### It's part of the job...

I'd like to end this section with some parting advice on how JS Bin is better now, but sadly it's part of the job when you build a site that houses all the crap the internet has to offer. The easier JS Bin makes it so that content can be saved, the more it'll be used in new ways that causes some kind of trouble.

Obviously the flip side is that JS Bin is open to all, and that includes kids wanting to learn, educators, newbies, "hackers" and more.

But, it would be great, as author of jsfiddle said, if Anonymous could write and use their own pastebin!

[![Please, Anonymous, write your own](/images/jsbin-please-write.png)](https://twitter.com/zalun/status/602586249203945472)

## Finding the love, again

I've been thinking about this post (and the public talk version of this) for about a year now. I was hesitant because it was so negative and probably comes across a little bitter.

The irony however, is that it's been a cathartic process. I feel like I've got some of the poison out of me by going through this process.

I realised something important at the end of 2014, and it was the reason I decided to put development on JS Bin on hold: I need to love working on JS Bin. I didn't at the time. I was working on parts of JS Bin that was full of pressure, I started getting abuse for some of my work, and it was all a bit of a mess.

Since starting this post, I've released new features to JS Bin to all groups of users (anonymous, registered and pro) and have several JS Bin [blog posts](http://jsbin.com/blog) in the works.

I've started to find my love for my project again.

![Hack, learn, fix, teach](/images/jsbin-t-shirt.jpg)









