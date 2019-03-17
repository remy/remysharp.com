---
title: "✂\U0001F4CB How I copy & paste in the terminal"
date: '2018-04-25 09:28:35'
image: /images/copy-paste-bash.png
modified: '2017-04-10 22:22:54'
tags:
  - code
published: true
---
# ✂📋How I copy and paste in the terminal

I use the terminal a *lot* and aliases are a great way to both personalise my command line experience, but also to make some tasks a little easier (and sometimes, smarter 😎).

<!--more-->

This isn't rocket science, but I've got special aliases for my copy and paste commands. Since I use a Mac, the command line paste command is `pbpaste`, which…well doesn't immediately sprint to mind. Equally, copy is `pbcopy` and quite often I want to copy to my clipboard but also see what was copied.

There's just one addition that I like to add to the copy command: I find it useful to also copy the contents of files occasionally. So `copy` for me is actually a function:

```bash
# make copy a function that checks whether there's an
# argument being passed, and if so, cat the file and pipe
# through copy. otherwise, pipe stdin into copy, then
# finally paste to stdout
copy() {
  if [ -t 0 ]; then
    cat $@ | pbcopy
  else
    pbcopy < /dev/stdin
  fi
  pbpaste
}

# and now alias paste to pbpaste, because gosh darnit!
alias paste=pbpaste
```

Now I can pipe commands to copy or pass it a filename:

```bash
$ ps | copy
# copies and shows output from `ps`
$ copy blog-post.md
# copies and shows contents of `blog-post.md` via `cat`
```

Caution: there is an [existing `paste` command][1] which this will overwrite. If you want to invoke the original command use `command paste`.

[1]: https://en.m.wikipedia.org/wiki/Paste_(Unix)

I hope that's useful. If you want to learn more, check out my [terminal.training](https://terminal.training/?utm_source=blog&utm_medium=link&utm_campaign=blog-post) course.
