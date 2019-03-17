---
title: 'Development Trick: auto-updating & auto-reloading'
date: '2012-06-16 14:39:00'
published: true
tags:
  - code
  - git
  - node
modified: '2014-09-03 16:15:12'
---
# Development Trick: auto-updating & auto-reloading

For the upgrade of JS Bin to [version 3](http://jsbin.com/3/) (an open beta), the whole code base is in the process of [being rewritten to run as a Node.js](https://github.com/remy/jsbin/tree/feature/node) process (whilst still working as a PHP application).

What's neat is I've got it to automatically pull the latest changes from github and automatically restart my Node process.

I don't claim this to be particularly clever, and I'm sure I should be able to trigger a pull on the server as a push happens, but this works fairly well for my development workflow (where the app needs to be online) and is pretty simple - which I like.

## Commands

For those like me who don't care about the detail, here's exactly what I'm doing in the terminal:

    $ cd /WWW/jsbin/
    $ screen -S gitpull
    $ watch git pull
    CTRL+a d
    $ screen -S jsbin
    $ nodemon .
    CTRL+a d

Here's what's going on.

## Screen

I'm using a linux process called [screen](http://www.oreillynet.com/linux/cmd/cmd.csp?path=s/screen) which simply put: creates a persistent shell that you can send to the background and retrieve at a later date. This means I can run my processes inside a screen and get them back any time I want if there's some debugging to do.

Now I've got a way of managing two tasks:

1. Pull from github for any changes
2. Restart my node process

Once you're inside `screen` to detach (and return to your original shell) you use the command sequence `CTRL+a d`. 

Here's a few extra simple commands:

* `screen -ls` will show all the screen processes you're running and the PIDs they have. You'll need the PID to reattach the screen
* `screen -r<PID>` so in my case: `screen -r gitpull` will reattach and put me back in to the screen

## Auto-updating code

Inside one screen we make use of [watch](http://www.oreillynet.com/linux/cmd/cmd.csp?path=w/watch) which will keep running a process every 2 seconds. So I "watch" the `git pull` command.

Obviously this is a bit crap because it's trying to pull from github to no avail most of the time, but it does mean that when I push new code up, this process will automatically pull.

Which leads me on to restarting...

## Auto-reloading

In another `screen` I'm running the development tool [Nodemon](https://github.com/remy/nodemon) to auto restart when any JavaScript files change (which come from the git pull).

So that's it. Pretty simple.
