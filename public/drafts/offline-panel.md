# Offline

Watched http://youtu.be/qwywMlGE0vY

Really good panel - great intro to the Service Worker by Alex Russell, the slides
alone look really quite simple to implement your own proxy to the browser to
give me full control of my application.

I wanted to share some thoughts on a few of the points they raised (also for
my own record and brain dumping).

## Quota API

Why?

## Bandwidth detection

This isn't important, specifically because bandwidth or connection type does
not give you the information you want (I've said this before).

Here's why connection type does not matter:

You're tethered to your mobile phone from your laptop. This is using wifi.  Your
phone is using 3G at best, or has no signal. The laptop *still* has wifi, and
assuming that a wifi connection is good is a road to failure.

Why bandwidth does not matter:

You're at home with super fast (or fast to me) 100Mb connection. Google and the
BBC is blazingly fast. But there's a network problem somewhere along the line,
and some router is behaving baldy. Or the CPU is particularly high on your server
and the net result is that the **response time** is slow. It doesn't matter if
your bandwidth is fat, if the network response is going to be slow, it might as
well be a old school modem connection.

### An alternative

I think there's two possible alternatives to solve the question of connectivity.

I'm specifically after the connectivity of my server, not of the my machine to
the web. So two options I'd be interested in:

1. Remote host connectivity [async boolean]: simply, does the server answer requests
2. Ping: this could give us both