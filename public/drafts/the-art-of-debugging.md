# The Art of Debugging

- How to avoid debugging: tests
- There's no silver bullet
- I don't believe there is (or shuold be) one tool for all the jobs
- And the tools will continue to evolve

## Disclaimer

Before anyone gets all preachy, this is not the definitive way to debug on the web. There are **many ways**. This just happens to be what I know, and how I do it. If that helps you, super. If you do things differently, that's cool too.

## Debugging

What does it mean? Where does it come from?

A moth on a computerboard - which is utterly random and unpredictable. The worst kind of bug - one that changes as you investigate, a Heisenbug if you will.


## The Art

1. See the problem.
- Understand it.
- Fix it.

My debugging mantra:

1. Replicate
- Isolate
- Eliminate

## Tools

Okay, it's super likely that you're going to be skimming this post looking for the *juicy bits* to see what tools I use. And yes, tools are a huge factor.

So...what is the state of the art?

### State of the art

#### Common features

- Console (to run arbitrary code)
- Network calls and timings
- DOM navigator
- Script debugging (breakpoints, callstacks, watches, locals)

#### Chrome

- Live, in memory changes
-

#### CLI

- iron-node
- git bisect

## Problems

## Crowdsourced

- Source of events, beyond the jQuery/Backbone/Ember/React/etc wrapper
- Minified code
- Breaking into loops
- Mobile rendering glitches
- Animation (CSS & JS)
-

### Commonality

> I just want to get inside the damn issue

Be it loops, events being triggered, between animation frames to understand the impact of movement, inside the rendering loop so I can see exactly what's triggering what.

Slow motion, if you will.

#### What tools do we have for slow motion?

- CSS animation strubbing
- Canvas rendering
- Rendering screenshots

### On going in the future

As the web tech becomes more advanced, and more problems that are solved (after the web community asking, like CSS animations, etc), the more the tools have to play catch up.

If you want to play with the newest stuff, don't expect the tooling to be there already. Simple example is:

I'm a big fan of the simplicity of the `fetch` API (also because it comes baked with promises which I enjoy developing with), *plus* it can be polyfilled. The problem I had was pretty serious though, Chrome devtools wouldn't show network requests made with the Fetch API...which made debugging *extremely* hard.

If the tooling isn't ready because the technology is so new, then you're in the wild west land - and you've only got yourself to blame.

## Pro tips

- `debugger`
- `console.log('> %s@%s', name, version)`

