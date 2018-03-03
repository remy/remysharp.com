# Last minute node debugging

I'm working on a node project that I need to debug, but I didn't start it with the `--inspect` flag. Moreover, I'm using nodemon to restart node (which makes this process a little trickier).

<!--more-->

## Finding the node process id

The first task is to find the node process id (aka PID). The way _I_ do this when running with nodemon is to:

```bash
$ ps | grep nodemon | grep -v grep
 4359 ttys001    0:00.49 node /…/bin/nodemon
18357 ttys002    0:01.40 node /…/bin/nodemon --ignore public -i views
```

This command is doing three things:

1. Listing _all_ the processes running that I've started/own
2. I'm _grepping_ to filter only the lines that match "nodemon"
3. Since the `grep` for nodemon was running, I need to filter _out_ the word "grep" (using `grep -v …`)

There's other tools that you can install like `pgrep` and `pidof` - but I tend to find this is the friendliest method to finding the PID.

Now I know the PID (18357 for nodemon (in my case I have two different instances of nodemon, so I need to be savvy to work out exactly which I'm working with), I need to look at the _process tree_ to find the PID of the child node process (this is because nodemon will spawn your node process, and I want to debug the child process, rather than nodemon itself).

```bash
$ ps -g 18357
  PID TTY           TIME CMD
18357 ttys002    0:01.40 node /…/bin/nodemon --ignore public -i views
67827 ttys002    0:02.41 /…/bin/node lib/index.js
```

The `-g` flag on `ps` asks for the group of subprocesses that my main nodemon process is responsible for. So now I can see the PID of my child node process (67827) and I'm ready to enable the debugger.

## Turning on the debugger on a running node process

There's two ways to switch a node process into debugging mode. Using a small node script (and this should be cross compatible for all platforms). The `process` object in node has a `_debugProcess(PID)` method (which I think is undocumented though it's been around since _at least_ mid-2014).

I'm running the node script as an inline eval'ed script:

```bash
$ node -e 'process._debugProcess(67827)'
```

Now my nodemon process emits the following log:

```text
[nodemon] restarting due to changes...
[nodemon] starting `node lib/index.js`
listening on http://localhost:3009 @ 2018-03-03T12:29:58.675Z
Debugger listening on ws://127.0.0.1:9229/08eddfe1-9e9f-48bd-8d39-8225383ec206
For help see https://nodejs.org/en/docs/inspector
Debugger attached.
```

Turning now to Chrome devtools, I will find the green node debugging icon, then clicking on that will take me to devtools for the node process:

![Node debugging icon](/images/node-debug-icon.png)

## Alternative method

Another method to triggering the debugger is to send a `SIGUSR1` signal to the PID (though I'm not entirely sure how to do this on Windows). This is done using the `kill` command as so:

```bash
$ kill -SIGUSR1 67827
```

I like this method just because it's just a little more succinct.
