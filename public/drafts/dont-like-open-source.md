# I why I don't like open source: my thoughts

This morning's walk was companied by [Tiago Rodrigues](https://twitter.com/trodrigues) (excellent) curation and commentary on [Adam Yeats](https://twitter.com/adamyeats) tweets on open source and (mostly) [James Seymour-Lock](https://twitter.com/JamesSLock)'s replies.

[Please read it](https://storify.com/trodrigues/why-i-don-t-like-open-source-a-play-in-3-acts). Carefully. Get all the way through and reserve judgement (if any) for the end.

It's not the first time Adam's thoughts have inspired a [blog post](/2012/12/18/contributing-to-the-web-community) either! These are my thoughts on open source, contributing and the points raised in the discussion.

<!--more-->

## What does open source really mean?

It means [different things to different people](https://github.com/nickdesaulniers/What-Open-Source-Means-To-Me). That's okay.

To me, it means:

> Welcome. Welcome to this code I wrote. Help yourself to bits you like or need. Help make it better for others. Help make it yours. Help make me better with your suggestions, changes or discussion. Use the code in any way you want, in ways I never thought of. And if the projects I created lives on without me, then open source has worked.

*You* need to decide what it means to you, and what it looks like. Which leads me to ask: *is a project really open source*?

## There are two kinds of open source projects

There's the big, high profile projects and then there's *everything* else.

When I'd hear "open source", I'd think: Linux, Apache, Firefox, bootstrap, ember, node, etc. i.e. big fucking high profile massive open source projects with a fuck tonne of code*.

<small>* Okay, there's also a decent number of sensible codebase sized projects that are used a lot, passport for node for instance</small>

This is *Type One*.

*Type Two* open source projects are the kind of project where the source is open, and the license is "meh"/"whatever I always use but don't really understand". For me this is MIT. But that's beside the point.

The source is available. *Just like the web*. View source. It's the kind of open source that I'm familiar with (obviously there's discussions around licenses, but that's for another day).

Type Two projects: the kind where the source is just somewhere on the web, is the kind that, if we're honest, hardly anyone else is going to contribute to. I'll be lucky if anyone actually uses it, let alone skims the code.

This second type, it could be closed source. It could be something that was never uploaded to the web. But it was. This is the majority of open source projects today. Very much like the late 90s when there were sites offering JavaScript ...files (because library and framework really doesn't apply) that gave you menus, hover effects, basic whiz bang stuff. Except now it's up on Github or npm (or whatever you Ruby folk use!).

If someone sends a pull request to one of these projects, there's a few things that can happen: it's ignored/forgotten about or it's blindly merged "meh, cool" (there's other outcomes too!).

For me, putting code in github as "open source" is for two main reasons: 1) so if I lose the code locally, I can find it again (fingers crossed Github doesn't vanish too quickly), 2) I can't be arsed to pony up the pitiful amount of dollars for more private repos.

The majority of the repo owners on the type one projects are *companies*. It's their product. The majority of type two, are individuals. Let's remember that perspective. Contributing to the small ones isn't a big deal and potentially contributing to the big ones might be like pissing in the ocean.

## Contributing to open source

I can't speak for Adam, but it *sounds* like he's either felt pressure to contribute to some projects either externally or internally. I could be way off based, but I *do* know people who've felt this way. Heck, I feel this internal pressure sometimes.

Contributing (code) to the Type One projects isn't something you can do with a few hours. So seriously, if you feel this pressure: stop it.

It takes hours, if not days to become familiar with the codebase. Then creating a bug fix or a new feature isn't quite as simple as "hacking some code in". If it's a high profile project, it'll come with tests and coding guidelines. That's more work, and you've not even contributed a single line yet.

For context, in late-2000s, I partook in a [jQuery day long sprint](https://web.archive.org/web/20130512035317/http://docs.jquery.com/JQuerySprint) to fix bugs. I'd say I knew jQuery pretty damn well at the juncture. By the end of the sprint, I'd managed to confirm just one bug, and *pretty much* have an idea of what caused it.

"Contributing to open source" is a long term commitment, and you do have to pick and choose. There's a few people like Subtack filling npm with his node modules is great, perhaps reinventing every wheel, but he's also doing it to [cover his living](https://gratipay.com/substack/). But these people are the exception. This isn't a lifestyle that's available to most people (and frankly, npm is running out of useful names for projects!).

Ask yourself what is open source. Ask yourself if you want to contribute to that, and if you do (want to contribute) ask yourself *why*.

## Getting a job based on contributions

...is bullshit.

But *maybe*, maybe some companies will exclusively hire you based on your open source contributions. Honestly, if that's the case, it's more likely you're not applying for the job, and in fact the company is head hunting you.

It *is* true that an "open source" project is seen as a reference of work. But it's also a *stale* reference of work. And importantly, it's not the only reference.

Take my open source [inliner](https://github.com/remy/inliner) project for instance. The code is appalling. There's outstanding open issues *and* pull requests. This is an open source project that is *not* representative of my current skills. Yet it's still open source. I wouldn't put it forward as my best work.

[JS Bin](https://github.com/jsbin/jsbin) is probably a better example of my work, but honestly, the code is not my best foot forward. In fact, I've had job offers based on the companies associating me with the project, but I know for certain that they've not looked at the code.

Hiring decisions are *mostly* based on some early criteria that's utterly arbitrary. Like "do they have a degree", or "do they have a github account", or "what is their personal interest". The reason: to reduce 100 CVs down to a manageable number that you can actually interview.

When I interviewed [Fabien O'Carroll](https://twitter.com/allouis_) in late 2013 he had limited open source projects I could look at (which I would have skimmed to get an idea of scope of projects he works on), which is fine, and he couldn't really share his company's code.

With *all* my interviewees I asked them to write me a hangman game in JavaScript, and not to spend more than 2-4 hours on it. I would pay each £100-200 (I don't actually recall exactly how much) for their time, because it was likely they were already employed and would have to do it *out of hours*. Personal time is valuable, and **no one has an automatic right to it**.

His code was decent, but that's not what got him the job. During the interview, when asked if there was anything else he was interested in, he struggled then eventually mentioned he built a chess timer (in wood) that he could use with his then-girlfriend. *That's* what got him the job, and that same sentiment is what I saw over the following year. That detail doesn't belong on github, isn't part of our community, but *is* part of an interview.

Never undervalue what you do. Everyone is unique. Some people aren't right for some jobs, but you github streak says positive *and* negative things.

## If you can't contribute: you're not part of the community

Arguing that someone should get a jobsworth position (at Tescos or McDonnalds) because the work 9-5 (or whatever extra overtime) is bollocks. This statement is so utterly selfish and narrow minded. But it's not the first time I've seen it.

The people who have a high chance of working on extra curricular projects are likely to be single, not terribly social and in their 20s. Why? Because when you're on your own and younger, you have more energy, and you need less sleep. When I was in my 20s (and married) I was hacking until 2am in the morning. What was my code like between 10pm and 2am? Shit. In fact, it's taken me years to realise that when I'm not on form (i.e. past 6pm) that it takes me twice as long, if not more, to complete a simple task. A complex task is unlikely to get fixed.

Our brains fuck with us when we deprive it of rest. Tell yourself you have RSI. If you have RSI, you rest. You move away from typing at a keyboard because if you push it, it hurts. Take *that* approach.

Now that I've got young kids, when I leave the office, someone will ask "what are you up to this evening?". The same as every other evening: I help put the kids to sleep, I cook (or help cook), I eat, I got to bed. I love that I'm with my family, and it's enough for me. There is *not time* for coding in that evening.

## My thoughts

I've got another post that I'm writing about "what I love about the web", which is sort of related: **enjoy what *you* do**. Question where the pressure comes from. If possible, focus on what you love and ignore the noise of "hey, look at *my* cool thing".

There *is* this weird pressure to get a "name" in our industry. But fuck, seriously, **you are amazing**. You work hard and you should be proud of your work irrespective of whether others can see it in the open.

You come first, not your code or someone's project: you.

For me, my family comes first. Work and code isn't even a distant second. It's taken me many years of working silly hard and silly hours to work that out. But it's true.