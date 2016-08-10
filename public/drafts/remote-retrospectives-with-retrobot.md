# Remote retrospectives with Retrobot

At [Snyk](https://snyk.io) the team was partially remote (Tel Aviv, London and Brighton) and we developed over two week sprints with a retrospective at the end.

The retrospectives would run over remote video calls, and we would try to simulate the typical writing on postit notes, with writing in a shared spreadsheet. First listing those things that worked well, then those that needed working on, then we'd vote on what we wanted to improve on. All in the spreadsheet.

The process was sound in theory, but felt awkward to all involved.

<!--more-->

## Introducing: Retrobot 🤖

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

And the list of "needs work" (note that most of the real items were removed for the screenshot):

![Retrobot, needs work](/images/retro-needs-work.png)

## The why

During a team summit, a few of us sat down to try to understand why the original process felt awkward. [Johanna Koll](https://twitter.com/johannakoll) ran the retrospectives and was already familiar with the process of writing up on the white boards with sticky notes and as I mentioned, we used spreadsheet via Google to share the retrospective feedback.

Having a remote team meant that we can't run white board sessions as often. One idea was to put a camera in front of a white board and we'd take turns to request sticky notes to be added. Quickly it was obvious that there would be a lot of waiting around for each team member to take their turn and we didn't want the retrospectives to be something that felt like a waste of time.

Being remote also meant we had a number of tools already in our workflow, and Google spreadsheets didn't quite work for us. However, since we were all using Slack daily, this looked to fit well.

We also noted that during our current process, there wasn't really much time to discuss the positive aspects of the sprint, but using Slack's emoji system is a *really* nice way to emote positive reactions to work done by others.

## How it works

Behind the scenes, Retrobot uses [Small Win's slack](https://github.com/smallwins/slack) package which is pretty much of mirror of the Slack API.

Once connected, the bot just keeps the state in memory (so it's a single instance, i.e. if you want another retrobot, you need to run it again). It then does some simple parsing on the messages and and triggers different actions during it's lifetime.

The life cycle looks a little like this:

- handle channel messages: start, stop, summary, etc
- handle DM messages: +/- for worked well, needs work
- on retro start:
 - reset retrospective (check if flushed or not)
 - list all the members of the channel that are active (ignoring DND and away)
 - send each on a DM with the summary help
 - add all messages to appropriate arrays
 - handle any errors (prefix needs +/-)
- on retro stop
 - randomise message and print each message to the channel the retro was started from

## Running the bot

As I said, the Retrobot deploys easily to Heroku (and can quite happily run on a free instance) with the one-click deploy button on the repo, otherwise there's also instructions on how to manually deploy. I'd love to hear if you use this or how you might improve upon it.

Go ahead and get it from https://github.com/remy/retrobot
