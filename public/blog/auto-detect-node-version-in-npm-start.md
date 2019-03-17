---
title: Auto-detect node version in npm start
date: '2016-12-06 08:28:45'
modified: '2016-12-06 08:28:32'
tags:
  - web
published: true
---
# Auto-detect node version in npm start

I posed myself the question: why isn't `engines.node` used to load the right version of node when I run `npm start`? It's great that this value is used when I'm deploying to a service like Heroku, but I also want to use it locally.

<!--more-->

## 👋 The why

*Most* of the time (at time of writing), the version of node doesn't really matter to my code. The code I write often has to work on 0.10, 4.x and 6.x because either I'm writing CLI tools, or don't have many version-dependant code.

"Most" means not *all* the time. So, some of the time I see this:

![node crashes because node 6 is required for this particular project](/images/node-5-required.png)

This command was crashing because the modules were built with a different version of node than the version that just ran it. You can see the same effect trying to run ES6 with node 0.10 though 😁

Wouldn't it be cool if, when I ran `npm start` it detected the version of node required, and it switched to using that?

## 👌 The concept

I'm using [nvm](https://github.com/creationix/nvm) (and you might be using a different version manager). nvm will be used to run the code in the right version.

The `engines` property in the `package.json` file will be introduced via an environment variable called `$npm_package_engines_node` when `npm start` is used:

```json
{
  "engines": {
    "node": 6
  },
  "scripts": {
    "start": "node server.js",
    "env": "echo $npm_package_engines_node"
    "#": "run `npm run env` to this in action",
  }
}
```

As an example, I've added a script to double check run with `npm run env` which will yeild: `6`.

The idea is that if the `$npm_package_engines_node` value *isn't* present, then the default system version of node will run.

## 👊 The implementation

I'm going to hack how node is run. I'm creating `$HOME/bin/node` with `chmod 755` permissions. The contents of this custom node script is:

```bash
#!/bin/sh

# if the value of npm_package_engines_node is empty, then
if [ -z "$npm_package_engines_node" ]; then
  # find the next best version of node (i.e. not this script)
  NODE=$(which -a node | sed -n '2p')
  # use exec to slurp up STDIN correctly
  exec $NODE $@
else
  # else: load the nvm code, but don't execute it
  source $HOME/.nvm/nvm.sh --no-use
  # then execute the arguments under node version X
  nvm exec $npm_package_engines_node node $@
fi
```

Note that the `$@` represents all the arguments passed to my script.

To get this to work correctly, my new version of `node` will be the highest priority in the path (which I'll explain how in a moment).

Then to find the *real* path to `node`, I use `which -a node` which shows all the paths to `node`, and I take the second line and use it as the executable. This should be the system version of `node`.

If the `engines` property is detected, then I load load up nvm (using a command I found by spelunking the source code), and then execute the request using the desired version of node (though do check the [caveats](#caveats)).

I'm using nvm, so my path typically looks like this, the system version of node made available at the top of the path:

```text
/Users/remy/.nvm/versions/node/v4.2.4/bin
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
/usr/local/git/bin
# ...
```

This path gets added during nvm being loaded. So, our custom version of `node` needs to be accessible *above* nvm's version. When I load nvm (in my `.zshenv` - so that tools like Sublime see node correctly), I capture the original location of the node executable in `_NODE` and I'll prepend `$HOME/bin` to the path:

```bash
# contents of `cat ~/.zshenv`
source $HOME/.nvm/nvm.sh
PATH=$HOME/bin:$PATH
```

Now, when I run `npm start`:

![npm start now correctly runs node 6](/images/switching-to-node-5.png)

## Caveats

…as usual 😳

Most importantly, this technique does not work at all if the `engines` is a range (and will probably blow things up if nvm doesn't have the version requested). I did write some simple code that found the matching installed version of node for a semver range, but the time to execute the semver calc on all versions of node installed outweighed the benefit.

Also (yes, *also*), if I run `nvm use X` to switch node version, nvm will put the path to node *above* our bespoke version of node, so this trick doesn't work in the current shell session any more.

**Important** this is far from perfect, and I've used this for a while, but on other systems I've disabled it altogether. You mileage may vary!

## 🐱 There's more than one way to skin a cat

This definitely feels hacky to me, and a little brittle—see earlier caveats.

I expect use of the `engines` property will be formalised for development one day, and maybe you can comment as to alternative or better solutions, but for now: it works 😄
