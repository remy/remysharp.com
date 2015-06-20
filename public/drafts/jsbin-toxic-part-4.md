# The toxic side of free. Or: how I lost the love for my side project

This is a story about JS Bin. I've told one story of JS Bin before, and this is the b-side: the dark side. But remember with everything I share with you, JS Bin is the longest running live pastebin, and it's not going anywhere. It will continue to run and serve its users. Even the scumbags.

The story has been broken into 5 parts, released over a series of days.

- [Part 1: The start of the DDoS](/jsbin-toxic-part-1)
- [Part 2: Spam](/jsbin-toxic-part-2)
- [Part 3: Registered users wreaking havoc](/jsbin-toxic-part-3)
- [Part 4: The cost](/jsbin-toxic-part-4)
- Part 5: Police

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

---

Part 5 sees our conclusion and tells of the police encounters I've had, along with the worst email I've ever received.