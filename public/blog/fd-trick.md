---
title: An fd trick
tags:
- code
date: 2019-08-13
ad: terminal
---

# An fd trick

If you followed my [CLI improved](/2018/08/23/cli-improved) then you'll know I'm a fan of the [fd](/2018/08/23/cli-improved#fd--find) command which I'm able to use for a mass *git* file rename.

Doing a mass rename is typically simple in the command line (`mv *.mjs *.js` - though I'm not sure off the top of my head if this will recurse directories, probably not), but doing a mass rename with `git` is harder, especially as there's some kind of locking going on. This means that the mass git rename must be run sequentially.

<!--more-->

In my particular recent case, I wanted to rename all instances of `.mjs` files (excluding `node_modules`) to `.js`. I've tried this before with [xargs](/2016/12/16/tricks-with-xargs) and kept failing but `fd` makes it pretty easy.

The `fd` command allows you execute a command against the results (similarly to `xargs`) and usefully `fd` also provides some useful additions for [filename substitution](https://github.com/sharkdp/fd#parallel-command-execution):

- `{}`: A placeholder token that will be replaced with the path of the search result (documents/images/party.jpg)
- `{.}`: Like {}, but without the file extension (documents/images/party)
- `{/}`: A placeholder that will be replaced by the basename of the search result (party.jpg)
- `{//}`: Uses the parent of the discovered path (documents/images)
- `{/.}`: Uses the basename, with the extension removed (party)

Armed with this information, I can find all mjs files `-e mjs`, and I can execute `git mv` with the full path to the result as the first argument and the `{.}` placeholder for the filename excluding the extension:

```bash
fd -e mjs -x git mv {} {.}.js -j1
```

The final argument (as above) is `-j1` which tells `fd` to run the commands in a single thread (by default `fd` will run multiple threads - I don't recall how many) - this is important because `git` will lock and unlock the git metadata files upon each rename.

Otherwise, that's it. A single command to git rename.
