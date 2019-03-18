---
title: Open source with a cap in hand
date: '2018-01-10 13:31:03'
modified: '2018-01-10 19:51:55'
image: /images/nodemon-issue-stats.png
tags:
  - web
  - business
published: true
---
# Open source with a cap in hand

Nodemon was first released in Oct 2010 ([via twitter no less](https://twitter.com/rem/statuses/26267574735)). To date, nodemon has had 1,024 commits - 184 of which were the community, the rest being from me - runs with over 150 tests (mostly integration tests) had 144 releases into npm, starred over 13,000 times, has had 883 issues closed, merged 331 <abbr title="pull requests">PRs</abbr> (mostly mine…sorry), and in the last month, has had just shy of **3 million installations**.

So what? Well, up to around 4 months ago, nodemon's development and maintenance had pretty much ground to a halt. No one was contributing pull requests, and my motivation to make changes was nil.

So how can I go about changing that?

<!--more-->

## The spammy banner

Yup, if you install nodemon today, you'll see this message reading:

<figure>

![nodemon postinstall](/images/nodemon-postinstall.png)

<figcaption>Love nodemon? You can support the project!</figcaption>
</figure>

Specifically I'm asking users to support me, financially, through [open&nbsp;collective](https://opencollective.com/nodemon/order/2597) <small>(go on…a measly $2 a month…go on…)</small>.

I've already received one pull request to remove it (claiming "spammy" as the reason) and a few twitter exchanges (of course) as to why I should work for free.

Personally, I hate this kind of stuff and first [saw it on Preact](https://github.com/developit/preact/blob/e6deb5efe2a3060bd8abaa716c9e6cf63610c065/package.json#L39), but then within a week of adding this banner, nodemon got its first backer. This wasn't particularly overwhelming, but it was still early days. Didn't stop me whinging though!

> nodemon: 2.3 million downloads per month. I totally fucking nailed the open source thing 💪<br><br>&quot;Estimated annual budget based on donations: $8&quot; 😟…
>
> [via Twitter](https://twitter.com/rem/status/941068325785886721)

Still, as the weeks pressed on a few more people joined the backers - either as a one off donation or money. Then Avi at SparkPost emailed to sponsor nodemon for 3 months. Wow.

Lesson: though this does feel spammy, and sure, if every does it it'll be a clusterfuck, the message was working.

## The money motivator

Yeah, that dirty word _money_. Sorry, but it's true. Particularly for me. I run my own business, so any time spent working on open source (aka: working for nothing) actually leads to loss of income.

So now nodemon had drawn a little bit of income from SparkPost's sponsored donation and the possibility to get the stickers I bought covered, it's a far cry from the value I charge a client, but it was a monitory acknowledgement of work on nodemon.

What happened? Those small donations have given the maintenance and moreover, the development of nodemon a new lease of life. **Since the banner was introduced a month ago ([5 Dec 2017](https://github.com/remy/nodemon/commit/6a4fb226028b43ff502cbf70dd586c47a6e3b6f7)) there have been 17 new releases in 5 weeks**.

Money, particularly individuals donating towards a project that eats my personal time, is a *huge* motivator. I recognise that your donations as an intimate acknowledgement of the work of an individual.

## 200+ issues and counting

Up until around November, nodemon had a growing number of open issues, well over 200. In fact, [jsbin](https://github.com/jsbin/jsbin/issues) is in a similar situation with 622 open issues (to date). When this happens, for me, I simply feel a benevolence towards actioning new issues.

What's the point in deal with issue number 231 when there's another 230 open issues? Which ones are actually important? Where on earth do I start? How long would it take _just to read_ those issues? How many a simple replies, which require major changes, which require a headache of a technical setup to replicate? Who knows?

Frankly with that type of attitude, I might as well accept that I was ignoring the issues altogether. So I needed to change it.

The solution I've started seeing across the web was the [StaleBot](https://github.com/apps/stale).

Now, the message isn't the greatest, even after I customised it myself, because it will automatically flag stale issues (where there's been no comment) after 30 days of inactivity. Anyone can comment on the issue and the StaleBot will back off. If there's still no activity in the following week, StaleBot will close the issue.

The StaleBot closed out all but around 18 issues. A few where individuals replied saying the issue was still active, but all of a sudden the open issues becomes manageable, and some random issue from 2014 is closed because it's long forgotten.

Today, there's a single open issue. Just one. And new issues are being fixed, closed and released pretty quickly now - but that's entirely down to the desire to keep the open issues as close to zero as possible.

So, sure this can be a bit of a sledgehammer approach, but it has given new life to the management of new issues, and issues are dealt with quickly (rather than those whacked out 6 year issues!):

![nodemon issue stats](/images/nodemon-issue-stats.png)

## Smaller projects die without support

There's many hugely popular, integral and well supported open source projects. jQuery, Babel, Webpack and many more. Some started by individuals, some started by friends, some by companies, but they're fortunate to have achieved a critical mass which keeps them running.

<figure>

  ![lol](/images/black-mirror-open-source.png)

  <figcaption>[By @mabekatz](https://twitter.com/maybekatz/status/950963356139057154): The truth be said, amen!</figcaption>
</figure>

I'm not entirely sure how nodemon is doing so well after all this time. It was never featured on the npm homepage (whereas alternatives like [forever](https://www.npmjs.com/package/forever) and [pm2](https://www.npmjs.com/package/pm2) were - both great tools <abbr title="by the way">btw</abbr>), compounded by nodemon coming from a non-US country (which, yes, does have an impact on adoption). I suspect the largest factors were that it came early on in Node's timeline and that it didn't require changes to your code (i.e. <abbr title="keep it simple, sillypoops">K.I.S.S</abbr>).

Nodemon probably would have gone fully stale if I hadn't made these two key changes. Money _is_ a motivator, and making open source sustainable sadly isn't the dream story I'd love it to be. Here's [Gratipay dying](https://gratipay.news/the-end-cbfba8f50981), [CodeSponsor bailing](https://hackernoon.com/why-funding-open-source-is-hard-652b7055569d) and my own [struggles with JS Bin](https://remysharp.com/2015/09/17/jsbin-toxic-part-4#part-4-the-cost).

Maybe these smaller open source projects aren't supposed to last 8+ years, but nodemon certainly has (and JS Bin is coming up on a decade this September). But whilst I'm still running these projects, there needs to be a constant motivator to create constant motivation to work on the project, and for that, I don't apologise.


## Maintainers: what can you do?

This all really comes down to the popularity and the burden you bear running the project. I've got projects that are open source but pretty much just serve me ([express router cli](https://github.com/remy/express-router-cli), [undefsafe](https://github.com/remy/undefsafe), [bitcalc](https://github.com/remy/bitcalc) and many more!) and the issues raised and non-me usage is pretty low. i.e. there's no problem here.

If, however, the project is starting to attract users which leads to different use cases, I'd strongly recommend some way to manage issues - StaleBot worked well for me, but was met with the odd grumble.

**Maintaining a project in your own time is not a norm.** _If_ you work for a company, then hopefully they see the benefit to their business to let you work on the project during business hours. If you work for yourself, I believe, **strongly**, that you should be compensated in some way. If you can get that compensation through the pure satisfaction of helping someone, then good for you. If it takes something else,

I've shared [my thoughts on open source](https://remysharp.com/2015/01/09/dont-like-open-source) and how I believe that code and publishing code is a distant 2nd to your own well-being.

If you're a creator, then here's a list of platforms that I've collected that you might be able to use to help generate some support from (please note that I've not personally used all of these):

- [patreon](https://www.patreon.com) - pretty much dominating the platforms at the moment
- [open collective](https://opencollective.com) - full platform that includes discoverability
- [liberapay](https://liberapay.com) - one off or regular donation platform (similar to -now gone-gratipay?)
- [drip](https://d.rip) - Reinvented Drip by Kickstarter - currently invite only
- [streamlabs](https://streamlabs.com) - for streaming content publishers
- [paypal.me](https://www.paypal.me) - not a platform, but easy to link to
- [ko-fi](https://ko-fi.com) - basically a nice front end to a one off PayPal donation
- [medium](https://medium.com/creators) - move your content to Medium…
- [steadyhq](https://steadyhq.com/en) - similar to Medium's partner program

This resource on the ["lemonade stand"](https://github.com/nayafia/lemonade-stand) was sent to me today, and looks hugely useful and comprehensive (definitely bookmark that [link](https://github.com/nayafia/lemonade-stand)).

## Users: what can _you_ do?

Putting aside my thoughts, consider your position at your business. Are there projects that you business relies on? Go find their repositories and either try to get your business to donate a monthly amount (find them on sites like [Open Collective](https://opencollective.com/), [Patreon](https://www.patreon.com/) and even the repo itself) and if that's too much hassle, donate a one off, even if it's the price of a coffee - imagine for a moment the contribution that developer has made to your business.

## Me: what will I do?

Starting today, I've set aside a personal yearly budget of £1,200  ($1,600 / €1,350) to donate back to developers in a similar position to me: working in their own time, making a difference. This will be in addition to our yearly ffconf [scholarships](https://remysharp.com/2015/08/28/diversity-scholarships).

I'm not 100% sure how I'll find these people and projects, I have an idea of a few, but I'll find a way and hopefully publish what I'm doing.

If any of this resonates with you, and you use nodemon, maybe **[support nodemon today](https://opencollective.com/nodemon/order/2597)**. Thank you ❤️
