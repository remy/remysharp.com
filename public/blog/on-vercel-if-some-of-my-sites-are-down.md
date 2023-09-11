---
title: 'On Vercel: If some of my sites are down…'
date: '2023-01-30'
tags:
  - personal
---

# On Vercel: If some of my sites are down…

It's because [Vercel has blocked my account](https://vercel.com) under "fair usage".

I had all of 12 hours on a Sunday to prevent people from using the source of the spike - but I suspect they would have blocked my account either way because _normal_ traffic would have tipped me over their limits.

<!--more-->

The trouble is that they've blocked my personal account and personal accounts can't be upgraded to a paid account, you **have** to create a Team and then put your paid instances into the team, and of course that process is nowhere near as automated as their blocking process.

To be clear, a blocking process on a personal account results in landing on _any_ of my projects returning a 422 - payment required and this:

![](/images/vercel-blocked.png)

The whole thing kind of blew up my Monday morning - particularly as I should have been more focused on getting the kids ready for school (they weren't late, but I was definitely distracted and annoyed).

I've since (at 9:45am) sent Vercel a support request asking for my account to be unblocked but because I've got a personal account I don't get support so the response time will be 3-5 days.

What's even more frustrating is that I used to be a $50 a month paying user, but I *had* to downgrade, as told by Vercel support, years ago, because it was a legacy account and they were phasing out. I either move to "hobby" or I delete my account.

Below is the message I sent to support:

---

Got an email yesterday at 1pm saying I was reaching limits.

Got another email literally 5 minutes later saying it had been reached. To be clear - this was a Sunday.

I then got an email at 15 minutes past midnight today saying my account had been entirely blocked (and thus ALL my instances were being held to ransom):

![](/images/vercel-emails.png)

The cause was a spike in traffic from a Christmas related project. But the traffic shape hadn't changed since the previous month.

You can see it here (seen as "unknown project" because I've since moved the project out of my account - albeit at 8am whilst I was trying to get my kids ready for school):

![](/images/vercel-traffic.png)

But this didn't make any difference (I understand I had still gone into the blocked land).

This kind of automated sequence, particularly given the timeframe is really aggressive behaviour which I'm sure Vercel does not want to be known for.

None of my projects, even the overly requested Christmas project (a [callback](https://days-to-xmas.isthe.link/) to [this product](https://apps.lametric.com/apps/days_to_christmas/2032?apps_for=time&product=market&market=en-US)) falls into the ["Never Fair Usage"](https://vercel.com/docs/concepts/limits/fair-use-policy#never-fair-use).

I am requesting that my account is unblocked and that the source of the spiked traffic acknowledge that it's been moved out (temporarily to a team account until I decide whether to shut it down entirely because it's not worth paying $240 for someone to know how many days there are until Christmas).

---

I'm now paying for a "Pro" team (of one user - me) and I've moved a few key projects into that so they're back up, in particular [webmention.app](https://webmention.app/) and [Terminal Training](https://terminal.training/) (not the static site - that's Netlify, but the signed in backend where you watch the videos).

I've also moved the Christmas project into the pro account but it'll no doubt blow up the paid for account too, so I'll probably host it somewhere else or completely change how it works or just nuke it (though I've already tried to temporarily kill the software by pointing the LaMetric to a bad URL).

I'm just hoping that folks at Vercel will unblock my account because the mini projects are useful, if only to me. If they don't… then I guess I'll have to shutdown entirely and move away.

Thankfully [this blog is hosted on Netlify](https://www.netlify.com/) which even before this disaster, I would always recommend as the first option for hosting.

I guess there's always something breaking if you keep making things 🤷‍♀
