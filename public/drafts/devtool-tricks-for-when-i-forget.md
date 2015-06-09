# Devtool tricks for when I forget

I've recently completed a few of my [mastering devtools workshops](http://leftlogic.com/training/debug), so I'm all over devtools again, and just this week spotted two tricks (I use) for when I "forget".

<!--more-->

## Capturing XHR results

One of my favourite commands in devtools is the `copy` function. It'll copy DOM nodes, it'll stringify objects and it saves that horrible long and tricky select, highlight, copy, edit, faff process.

However, sometimes I forget to set a breakpoint when my XHR requests come back so I can copy the response. But it's to fix.

Right click on the XHR request in the network panel, and select "Copy response". Boom. I've now captured the JSON response and I'm good.

![devtools copy response](/images/devtools-copy-response.jpg)

## Retrieving results from the ether

It's not uncommon for me to run a command in the console, then realise I forgot to capture the result so I could run it through a `map` or some such process.

**This is where `$_` is a live saver, which contains the result of the last command run in the console.**

In the example below, I've forgotten to capture the result of the promise so I can manipulate (or in this case, `copy`) the result. This is simply fixed by running a new command with `$_.then(...)`.

![devtools dollar underscore](/images/devtools-dollar-underscore.png)

What's a trick, neat or otherwise, that you use on a regular basis?