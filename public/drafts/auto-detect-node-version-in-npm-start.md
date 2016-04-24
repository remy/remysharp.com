# Auto-detect node version in npm start

I posed myself the question: why isn't `engines.node` used to load the right version of node when I run `npm start`? It's great that this value is used when I'm deploying to a service like Heroku, but I also want to use it locally.

<!--more-->

## 👋 The why

*Most* of the time, the version of node doesn't really matter to my code. The code I write often has to work on 0.10, 4.x and 5.x because either I'm writing CLI tools, or don't have many version-dependant code.

"Most" means not *all* the time. So, some of the time I see this:

![node crashes because node 5 is required for this particular project](/images/node-5-required.png)

Wouldn't it be cool if when I ran `npm start` it detected the version of node required, and it switched to using that?

## 👌 The concept

I'm using [nvm](https://github.com/creationix/nvm) (and you might be using a different version manager). nvm will be used to run the code in the right version.

The `engine` property in the `package.json` file will introduce an environement variable called `$npm_package_engines_node` when `npm start` is used:

```json
{
  "engine": {
    "node": 5
  },
  "scripts": {
    "start": "node server.js",
    "env": "echo $npm_package_engines_node"
  }
}
```

As an example, I've added a script to double check run with `npm run env` which will yeild: `5`.

If the `$npm_package_engines_node` value *isn't* present, then the default version of node will run.

## 👊 The implementation

I'm going to hack how node is run. I'm creating `$HOME/bin/node` with `chmod 755` permissions. The contents of this custom node script is:

```bash
#!/bin/sh

# if the value of npm_package_engines_node is empty, then
if [ -z "$npm_package_engines_node" ]; then
  $_NODE $@
else
  # else: load the nvm code, but don't execute it
  source $HOME/.nvm/nvm.sh --no-use
  # then execute the arguments under node version X
  nvm exec $npm_package_engines_node node $@
fi
```

The `$@` represents all the arguments passed to my script.

To get this to work though, I have to mess around with my paths because I use nvm. For the keen eyed reader you'll also notice I'm using `$_NODE`. This value is set *right* after nvm is loaded in my shell ([I use zsh](https://remysharp.com/2013/07/25/my-terminal-setup)).

The way nvm works is that it sets the path to node above your full path stack, so it'll typically look (something) like this:

```text
/Users/remy/.nvm/versions/node/v4.2.4/bin
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
/usr/local/git/bin
...
```

This path gets added during nvm being loaded. So, our custom version of `node` needs to be accessible *above* nvm's version. When I load nvm (in my `.zshenv`), I capture the original location of the node executable in `_NODE` and I'll prepend `$HOME/bin` to the path:

```bash
# contents of `cat ~/.zshenv`
source $HOME/.nvm/nvm.sh
export _NODE=`which node` # load the real one
PATH=$HOME/bin:$PATH
```

Now, when I run `npm start`:

![npm start now correctly runs node 5](/images/switching-to-node-5.png)

## 🐱 There's more than one way to skin a cat

This definitely feels hacky to me, and a little brittle—in particular, if switch node versions using `nvm use …` it resets the `$PATH` so this trick doesn't work anymore.

I expect use of the `engine` property will be formalised for developement one day, and maybe you can comment as to alternative or better solutions, but for now: it works 😄
