# The Art of Debugging

This is the accompanying article for my *Art of Debugging* talk that I first gave at Fronteers in Amsterdam in 2015.

TL;DR: learn every tool that's available to use, use them as you need them, enjoy bug bustin' - it's certainly more fun pounding the keyboard and working on a 6 month feature drive.

<!--more-->

Before we start though...

## Skip to the end...

**Don't.**

**Write.**

**Bugs.**

<img src="/images/drop-mic.gif" style="width: 100%">

## Although...

Okay. So, assuming you're not robots, and you might have written a bug or two in your time, the truth is: there is no silver bullet.

And in fact, I lied a moment ago, "don't write bugs" is the exact opposite to learning to debug. You need experience. You have to encounter bugs to be able to recognise how to approach them.

There's no hard and fast skill you can acquire for debugging (or so I believe). It's acquired through time as you struggle through the first time you encounter something. Spending hours and hours trying to fix a problem, but the upshot: you won't spend hours and hours the next time around.

At the company I worked at 10 years ago, when new employees came on board, we would have them all excited about the job and the kinds of problems we were solving, but on the day of them joining, they would be assigned to bugs for 3 months. It kinda deflated their expectations, but we'd find that after those 3 months, they'd request to stay on bugs.

They had the chance to dabble in so many areas of the business whereas other developers were coding the same single feature for 3, 6 even 12 months, and even then, it would go live, have bugs, and our bug catcher would swoop in, fix the bug and get a slice of the glory.

Attaining that *hands on* experience, I believe, is key to both being a good developer, but really, knowing how to debug anything. The designer from that company 10 years ago, Chris - he was the CSS wiz. He knew all the answers when the server side devs would get stuck with simple things. I'd often find myself asking him why the layout had broken so baldy in what I thought was a relatively simple design. His answer, quiet often, was "add `zoom: 1` to that element".

He had completed the debugging step in head and come to a reasonable proposal that this particular change could fix my issue, almost entirely because he had seen so many permutations of the visual bug that he could recognise by eye.

That's what I'll do in many cases of bugs I come across. I'll know the particular system well enough to allow myself a heads start to the solution.

But before I continue, I have *two* disclaimers...

## Disclaimer #1 - frameworks

Before anyone gets all preachy, this is not the definitive way to debug on the web. There are **many ways**. This just happens to be what I know, and how I do it. If that helps you, super. If you do things differently, that's cool too.

I *personally* don't use frameworks and large (opinionated) libraries. Ember, Polymer, React, Anglular, etclib. I don't use them. I've not had a need for them in anything I've done, so I've not had the requirement to learn (and please don't take this as an invitation to teach me!).

What this means is the the specific tools I use *may not* be applicable to your workflow. In fact, it's entirely possible that it's not *compatible* with your workflow.

That problem is partly related to the complexity of the applications you're using (by "applications" I mean the supporting code to pull of the site you're trying to build). For instance, React has created it's own language to give developers maximum ~~confusion~~ impact in building *apps*, but because of this, the code it transpiles to is utterly useless to humans and is intended only for computers/browsers. So debugging it requires *at the very least* sourcemaps, but because (I can only assume) it also has it's own state management (and other fancy toys) you're encouraged to install the [devtools extension to debug your React apps](http://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html) (I believe Ember is similar here too).

That doesn't mean this information is useless to you, I will touch on ideas that are important when debugging, I'm just saying: I don't use frameworks, so I don't debug with them either.

## Disclaimer #2 - I rarely cross browser test

Yep. I said it. But before you throw me to the wolves, hear me out. I don't cross browser test because more often than not, my work requires that I write JavaScript. Vanilla JavaScript, not JavaScript that interacts with the DOM.

In my eyes, there's two types of JavaScript that I'm interested in: browser interactions and everything else.

Everything else has to work in ES5 (perhaps with bits of ES6 sprinkled on) but that's it. Unless I'm supporting IE8 (which recent projects I'm not), all my JavaScript will work across all browsers, because it's stuff like:

```js
function magicNumber(a, b) {
  return Math.pow(a, b) * b / Math.PI;
}
```

It doesn't matter where the code above runs, if there's a bug, there's a bug in all the browsers. If there isn't a bug, there isn't a bug and that's that.

**Also** this doesn't mean my code isn't tested across other browsers. If possible and required, I'll run automated tests in different browser environments (using tools like Karma or Zuul - but the whole automated cross browser testing thing is yet to be really fixed, it's kind of a mess right now).

Again, this is entirely due to the nature of my work. I'll address later how (or even whether) I will cross browser test.


## The Art of Debugging

This is something I open with in all my debugging workshops, and look, even Wikipedia says it's an art, *so it's a thing, okay!*

[![debugging is an art](/images/wiki-debugging.gif)](https://en.wikipedia.org/wiki/Software_bug#Debugging)

I breakdown (in my head) debugging as the following:

1. **Replicate** translation: seeing the bug
2. **Isolate** translation: understanding the bug
3. **Eliminate** translation: fix the bug

### Replicate

Replicating the bug is the hardest part of the entire job. More often than not you'll get a bug report along the lines of:

> Saving doesn't work.

...and that's it.

Right, so not only do I have to be diplomatic in your response, as much as I want to respond with simply "yes it does" [close], but I also need to glean as much information as possible to be able to replicate what this user is seeing.

If the site they're talking about is jsbin, then I know saving does work, because I just used it, it just means that saving it's working for them (and potentially others). Translation: *saving could just be working for **me***.

If I visit a URL that the user is talking about, and it breaks immediately. That's a lucky break. This is the **litmus test** and it's always worth doing. Never jump right into trying to replicate 100% - take it step by step. However, it's also more likely is that there were a series of events that preceded the bug manifesting, and I'll have to understand what those were, and then repeat them myself.

Carefully, meticulously and systematically. This is important because I won't just do this once, I have to be able to do this over and over (or at the very least: twice).

There's some key tools that help me to replicate environments, or two at least help identify what parts of the environment I can rule out:

#### Privacy browsing mode / incognito

Incognito mode in Chrome (and known with other names in other browsers) lets me fire up the site *without* (most of) my browser extensions running. It'll also start with a clean slate with respect to cookies, offline storage and any other pre-baked configuration that my "normal" browsing sessions come with.

I can say for certain that I get at *least* one bug filed each year which is usually very strange and comes down to a rouge extensions on the user's browser that's interfering with the web site code.

By running in incognito, and seeing no bug, then asking the user to repeat the same task, I'm able to immediately confirm that there's an external entity at play (i.e. typically an extension).

#### Multiple profiles

In Chrome I have my personal profile. The one that lets me visit my email without always asking me to log in (though...maybe that's bad, but swiftly moving on).

I also have two other profiles:

- Anonymous - this user is totally clean, no extensions, no history
- Troll - this user will be like Anonymous, but also have cookies disabled, and security settings put on maximum

I don't often need to switch into these profiles (mostly because I'm able to replicate bugs earlier in my testing), but these are available to easily jump to.

The troll user is particularly useful, because it's very easy (for me) to forget that some users have higher security settings and the result is that APIs like `localStorage` will throw exceptions - which if are uncaught, could cause chaos.

---

Now that I'm able to replicate consistently, it's time to strip away as much as I can to reduce the noise and potential confusion before I'm able to fix.

### Isolate

Isolation is about parring down the bug as far as I can. If an extension is the cause of the bug, let's disable one extension at a time until the bad one is found.

If it's a bug in a relatively complicated set of JavaScript requiring a lot of user interaction, I'll ask myself *can I refactor this particular area of code **out** so that I can test it in isolation and inject pre-baked state*?

I built [jsbin.com](https://jsbin.com) for exactly this problem. To take a problem, strip it right down, and then either fix and share with whomever needs it.

Once it's stripped down as much as I want it to be, I'm on to fixing the bug.

### Eliminate

This is actually easy once the replication side of things is taken care of. These days (2015) I'm more likely to actually create a failing test in my project that will replicate the bug that I'm working on, and then I'll fix against the failing test. The benefits should be obvious.

It's really quite simple at this state. The same way that the act of writing code is simple (once you can touch type). The hard part is in solving the problem, which doesn't happen by pressing keys on keyboard.

## When you can't replicate...

Well...you're shit out of luck, and you can blind code a solution, but it's not debugging. You need to consider whether you've got a [Heisenbug](https://en.wikipedia.org/wiki/Heisenbug) on your hands (yes, I like that word!). It's a bug that literally changes shape and form as you try to interrogate it.

I've personally encountered a few of these myself. The worst kinds (for me) are when these bugs only occur in my <abbr title="continuous integration">CI</abbr> system (like Travis). The bug I was working on was fixed in my local environment, and I understood the code well enough to know the bug was fixed, but my tests wouldn't pass. The task now is different, the task was debug the test environment, which is a closed system when it's CI.

The other significant time I encountered this type of problem was back when I used Firebug (which stopped around 2009-2010). Firebug is/was an intrusive debugging tool that would inject content into the DOM to achieve the debugging. It also had bug (as does devtools and all the other debuggers - see the start of this post!). It meant that there were certain edge cases that you could run into that would trigger bugs in the debugger making debugging extra...challenging.

The same is *sort of* true today. Recommendations for debugging with the devtools timeline is that you *don't* turn on all the recording checkboxes, and that you ideally close all other tabs *and* anything else that might be using WebKit (like Spotify...I'm assuming there's some overlapping OS access that WebKit and Blink have...). This is because *all* of these will affect the performance recording.

## State

For me, debugging comes down to **state**. I need to be able to inspect the state at any time to be able to understand exactly what's going on.

Without state, I'm only able to guess as to what's wrong, and I could, in theory, fix a bug and see the output I intend, but there may be some other source issue that's broken.

I do admit that saying that it comes down to "state" feels pretty...perhaps stuck in my ways. I'm not sure if it's that I can't see the wood for the trees, or that actually, state is the low common denominator for all debugging. It doesn't really matter, if I can get to the state of the application, I'm *most* of the way to solving the bug.

---

All the browsers currently support passive inspection of state, to some degree or another. A huge bonus is being able to interact with the state.

The reason I personally use devtools is because I can not only observe passive state, but I can interact and *change* state whilst most importantly, not discarding the stack **and** I can save to disk with workspaces.

Interactive state is not unique to devtools, IIRC I could do this back in the days of Firebug & Firefox.

### Passive state

Passive state is what I'm referring to as: *what has happened, and what's happening **right now***.

This can range from being able to look at variable values, network request history, rendering histories (both from the point of view of layout, but also perhaps a canvas render history), memory usage and so on.

### Interactive state

Interactive state has everything from the passive state, except I can noodle with values. I can change, in real-time, the values being held in memory.

What I personally love about devtools, and I'll show you, is that not only can I make that change to memory, but I can also change it in the code that's loaded and it'll commit to disk.

Importantly here, if I change code that's currently being run (or that I've paused the code on), the current point of execution will back-up and then recompile and re-run the changes I made. **This is powerful stuff**.

### The stack

The final part of "state" is the stack, i.e. how did we arrive to this state. It would be amazing if it were possible to snapshot the state and rewind or save state to magically restore. Alas those hopes were quickly dashed by Addy Ossmani who took the time to explain why it's not technically possible (or sane) in this [post](https://gist.github.com/addyosmani/cee1ac65263cc7134711).

Importantly though, where I mentioned earlier that in devtools I can change the code in real-time *and* have it saved (if I sued workspaces) then I can maintain the stack. The flip side is if I'm using a transpiler, like Babel, is that the transpile has to run again, and this requires a reload of the browser to get the updates in memory, and thus you lose the stack.


## Debugging approaches

### Inside out

### Outside in

## My favourite/most used tools

Finally I want to share with you some of the workflow I use and some of the tools that I always find myself returning to.


### Workspaces & real-time updates

<iframe width="1280" height="720" src="https://www.youtube.com/embed/Z_5XFAGn-u0" frameborder="0" allowfullscreen></iframe>

With devtools open, and the sources panel selected, simply drag the local directory you want to create a workspace for *onto* the source panel, and devtools will ask for access which you will need to confirm.

This doesn't complete the step though. To let devtools know that a particular origin, like `http://localhost:8000` is being served from your new workspace, you need to map at least one file. Right click a file from the origin list, and select "Map to file system resource", and select the *local* file it relates to.

Now whenever you make any changes, you will be able to save and it will save directly to disk. Why is this important? Now you can debug and commit directly to disk without switching contexts, without switch from your editor to your browser.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/U1zRyCkU4Ms" frameborder="0" allowfullscreen></iframe>

What is also really fun and powerful, is that if the CSS files were also mapped, *any* changes in the elements panel to styles, directly update the CSS file attached. This means I can make really tiny visual changes in the elements panel (where I'm used to making changes) and it'll already be saved for me to disk.


### Undo

I've run a number of [debugging workshops](http://leftlogic.com/training/debug) and the one consistent question that comes up after I show off workspaces is:

> How do I revert the changes I've made in the elements panel

It would seem that developers are consistently much more fast-and-loose with the elements panel than compared with editing source code directly.

It's still a fair question. To that I reply:

1. Source control!
2. Undo

Chrome devtools has *really* good undo support. I can make a whole series of CSS changes, and then move on to JavaScript and then make changes to the DOM, and I can *still* go back and undo all the CSS changes I made.

I've noticed that I do have to be focused on the particular panel and source for the undo to work (which I suppose the undo history is associated with the panel), but it's really good.

Obviously when you reload, you lose the history. It's the same with Sublime Editor, if I unload and reload Sublime (i.e. restart the application) I'd expect the undo history to be lost.

### Console shortcuts

- `$` & `$$` - akin to jQuery's `$` function to query elements on the page
- `$_` - the result of the last expression
- `$0` - the currently selected DOM node in the elements panel
- `copy(...)` - copy to the clipboard, and will `JSON.stringify` objects, but also get the outer HTML of DOM nodes, `copy($0)` is pretty common for me

<iframe width="1280" height="720" src="https://www.youtube.com/embed/pqFr0qZQpk8" frameborder="0" allowfullscreen></iframe>

### Timeline screenshots

Really nice way to go back in time to see what in the application's boot (or interaction time) changed something on the page. I used this recently to fix two different problems.

The first was reviewing the boot up screenshots for jsbin.com, and seeing that the font was loading right at the end, but taking up a reasonable amount of time (WRT entire boot time). I could *see* this because the font would flash into place right towards the end of the document being ready. I was then able to use font loading techniques to make the font load via local storage and improved the perceived boot up time.

The second time was with my product [confwall.com](https://confwall.com):



### Throttling

### Network detail & reply

### Break on DOM changes

### Surface scans for memory leaks

### Async

## Tricks

### Karma

### Watches