# Remote retrospectives with Retrobot

At [Snyk](https://snyk.io) the team was partially remote (Tel Aviv, London and Brighton) and we developed over two week sprints with a retrospective at the end.

The retrospectives would run over remote video calls, and we would try to simulate the typical writing on postit notes, with writing in a shared spreadsheet. First listing those things that worked well, then those that needed working on, then we'd vote on what we wanted to improve on. All in the spreadsheet.

The process was sound in theory, but felt awkward to all involved. So we changed it.

<!--more-->

## Introducing: @retrobot 🤖

I wrote a Slackbot called [Retrobot](https://github.com/remy/retrobot#-retrobot) (available as open source under MIT on Github) that you can deploy to your own machines to run your retrospectives.

Snyk used the Retrobot successfully as a replacement to the old practice and the retrospectives felt a *lot* more effective.

Before I go on to explain the why, here's how the Retrobot works after you've deployed it (and there's a handy "deploy to Heroku" if you don't have sysops-chops):

1. You invite @retrobot a channel (we used `#retro` as the channel name)
- Tell the bot to start the retrospective: `@retrobot start 5m` (and automatically end in 5 minutes)
- The bot invites everyone who's active in the `#retro` channel to a private DM session, asking for "worked well" and "needs work" items, indicated by a prefix of `+` and `-` respectively
- Once the retro is over, the bot invites everyone back into the `#retro` channel, and prints out a shuffled list of what worked well, and what needs work
- Everyone is then asked to 👍 the items that need work that they want to action from the retrospective, and once the person running the retrospective is satisfied everyone is done, they ask the bot for a summary: `@retrobot summary` which prints the top three items with the most 👍s

There's a few nice side effects too. Since Slack has support for emojis, you can add *any* emoji to an item to indicate your opinion on an item. So if Josh tells the retrobot that he liked his welcoming to the team, Anna might add 💙🍰🎆 to the item.

Here's a few examples of what it looks like:

![Retrobot, worked well](/images/retro-worked-well.png)

And the list of "needs work" (edited for the screenshot):

![Retrobot, needs work](/images/retro-needs-work.png)

## What were the pain points?

During a team summit, a few of us sat down to try to understand why the original process felt awkward.

[Johanna Koll](https://twitter.com/johannakoll) ran the

## How it works
