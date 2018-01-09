# Open source with a cap in hand

Nodemon was first released in Oct 2010 ([via twitter no less](https://twitter.com/rem/statuses/26267574735)). To date has had 1,024 commits - 184 of which we community, the rest being from me - runs with over 150 tests (mostly integration tests) had 144 releases into npm, starred 13,172 times, has had 883 issues closed, merged 331 <abbr title="pull requests">PRs</abbr> (mostly mine, sorry), and in the last month, has been installed just shy of 3 million times.

So what? Well, up to around 4 months ago, nodemon's dev, and maintenance had pretty much ground to a halt. No one was contributing pull requests, and my motivation to make changes was nil. How does that change?

<!--more-->

## The spammy banner

Yup, if you install nodemon today, you'll see this:

![nodemon postinstall](/images/nodemon-postinstall.png)

Specifically I'm asking users to support me, financially, through [open collective](https://opencollective.com/nodemon/order/2597).

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

I'm not entirely sure how nodemon is doing so well after all this time. It was never featured on the npm homepage (whereas alternatives like [forever](https://www.npmjs.com/package/forever) and [pm2](https://www.npmjs.com/package/pm2) were), compounded by nodemon coming from a non-US country (which, yes, does have an impact on adoption). I suspect the largest factors were that it came early on in Node's timeline and that it didn't require changes to your code (i.e. <abbr title="keep it simple, sillypoops">K.I.S.S</abbr>).

Nodemon probably would have gone fully stale if I hadn't made these two key changes. Money is a motivator, and making open source sustainable isn't riddled with heroic stories you might dream of. Here's [Gratipay dying](https://gratipay.news/the-end-cbfba8f50981), [CodeSponsor bailing](https://hackernoon.com/why-funding-open-source-is-hard-652b7055569d) and my own [struggles with JS Bin](https://remysharp.com/2015/09/17/jsbin-toxic-part-4#part-4-the-cost).

Maybe these smaller open source projects aren't supposed to last 8+ years, but nodemon certainly has (and JS Bin is coming up on a decade this September). But whilst I'm still running these projects, there needs to be a constant motivator to create constant motivation to work on the project, and for that, I don't apologise.

## What can _you_ do?

Putting aside my thoughts, consider your position at your business. Are there projects that you business relies on? Go find their repositories and either try to get your business to donate a monthly amount (find them on sites like [Open Collective](https://opencollective.com/), [Patreon](https://www.patreon.com/) and even the repo itself) and if that's too much hassle, donate a one off, even if it's the price of a coffe - imagine for a moment the contribution that developer has made to your business.

If this resonates with you, and you use nodemon, maybe **[support nodemon today](https://opencollective.com/nodemon/order/2597)**. Thank you ❤️
