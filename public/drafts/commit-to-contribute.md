# Commit to contribute

This morning I started my day thinking that I would try to spend a little time on my [nodemon](http://nodemon.io) and woke up to a new pull request that fixed a small bug.

The only problem with the pull request was that it didn't have tests and didn't follow the contributing guidelines (which results in the automated deploy not actually running). The thread of replies didn't go too well...

<!--more-->

About half way through the thread of replies, I started my usual decent into "what's the point, why do I bother, I should jack it all in", i.e. the self-destruct nature that I know isn't helpful to anyone. Though, thankfully, I held back.

The user was obviously extremely new to git and GitHub and just the small change was well out of their comfort zone, so when I then asked for the changes to adhere to the way the project works, it all kind of fell apart.

How do I change this? How do I make it easier and more welcoming for outside developers to contribute? How do I make sure the contributor doesn't feel like they're being asked to do more than necessary?

This last point is important.

## The real cost of a one line change

Many, *many* times in my own code, I've made a single line change, that could be a matter of a few characters and this alone fixes an issue. Except, that's never enough. In fact, there's usually a correlation between the maturity and/or age of the project and the amount of additional work to complete the change.

A recent issue in my [Snyk](https://snyk.io) work was fixed with this single line change:

![one line snyk fix](/images/one-line-change.png)

In this particular example, I had solved the problem in my head very quickly, and realised that this was the fix. Except that I had to then write the test to support the change, not only to prove that it works, but more importantly, to prevent regression in the future.

Then once that change is in place, my projects (and Snyk's) all use [semantic release](https://www.npmjs.org/semantic-release) to automate releases by commit message. And in this particular case, I had to then bump the dependencies in the Snyk CLI and then commit that with the right message format to ensure a release would inherit the fix.

All in all, the one line fix turned into: 1 line, 1 new test, tested across 4 versions of node, bump dependencies in a secondary project, ensure commit messages were right, wait then wait for secondary project's tests to all pass before it was then *automatically* published.

**TL;DR** it's never *just* a one line fix.

## Helping those first pull requests

Doing a pull request into another project can be pretty daunting. I'd say I've got a fair amount of experience and even I've started and aborted because I found the chain of events leading up to a complete PR too complex.

So how can I change my projects and GitHub repositories to be firstly, more welcoming to new contributors, but most importantly: **how can I make that first PR easy and safe?**

### Issue and PR templates

Github recently announced support for [issue and PR templates](). These are a great start because now I can specifically ask for items to be checked off, or information to be filled out to help diagnose issues.

Here's what the PR template looks like for Snyk's CLI (I'm slowly adding these to all my repos):

```markdown
- [ ] Ready for review
- [ ] Follows CONTRIBUTING rules
- [ ] Reviewed by @remy (Snyk internal team)

#### What does this PR do?
#### Where should the reviewer start?
#### How should this be manually tested?
#### Any background context you want to provide?
#### What are the relevant tickets?
#### Screenshots
#### Additional questions
```

They're not prerequisites on the actual PR, but it does encourage full information on the PR (this is partly based on [QuickLeft's PR template]()).



- How can I make the project more welcoming (pr templates, issue templates)
- Automated checks on the commits
- How can I help "my first PR"
- Example tests
- How can you fix commit messages?
