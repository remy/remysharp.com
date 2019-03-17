---
title: To gist and back again
date: '2018-01-05 12:32:56'
modified: '2018-04-10 13:10:08'
tags:
  - code
published: true
---
# To gist and back again

I've recently been using [gists](https://gist.github.com) to help debug user issues on nodemon. The process is two parts: firstly getting the original files up into a gist (ideally pared down), and secondly downloading each file to my local dev environment.

Using two tools, I'm able to simplify this workflow pretty nicely, so I can go to gist and back again.

<!--more-->

## Caveats first

For the time being, directory structure is not supported, which is a bit of a limitation, but perhaps something like the `tree` command mixed in with the tree generation command (I wrote) called [eert](https://www.npmjs.com/package/eert) could help.

## Up: to gist

To get files online, you _could_ upload them individually to the gist website, or better than that: install the `gist` [command line tool](https://github.com/defunkt/gist#installation).

For Mac users, I'd recommend using the `brew install gist` (and get brew, the package installer from [brew.sh](https://brew.sh/)). Otherwise, `gem install gist` (though my own track record for using `gem install…` is fairly shaky, so hopefully you have more luck).

Then you specify the files to send up:

```bash
$ gist index.js package.json
https://gist.github.com/a24b93601b8b2a68b8e978460bf6e4e1
```

That URL can/should be then shared on the issue.

## Down: from gist

Now for the fun part, pulling a gist down and generating all the individual files in a single command 💪😃

Using [jq](https://stedolan.github.io/jq/) (a lightweight and flexible command-line JSON processor), a well formed command can use Github's public API for reading gist (though won't work on secret gists unless you also use an auth token…outta scope for this post though).

First, here's the full working command (assuming you've installed `jq` and you have `curl` on your machine - most do):

```bash
$ eval "$(curl -L https://git.io/vbSgz \
  | jq -r '.files
  | to_entries
  | .[].value
  | @sh "echo \(.content) > \(.filename)"')"
$ tree
.
├── index.js
└── package.json
```

### What's actually happening?

The `jq` is given a "script" to run against the JSON result of the gist API call. You can play with an [interactive jq toy I built](https://jqterm.com/#!/4e98ce1584b6b34a9c6edff4d9432143?query=.files%20%7C%20to_entries%20%7C%20.%5B%5D.value%20%7C%20@sh%20%22echo%20%5C%28.content%29%20%3E%20%5C%28.filename%29%22) and see the effects of tweaking the query.

To explain the query:

* [`.files`](https://jqterm.com/#!/4e98ce1584b6b34a9c6edff4d9432143?query=.files): reads the `files` property.
* [`to_entries`](https://jqterm.com/#!/4e98ce1584b6b34a9c6edff4d9432143?query=.files%20%7C%20to_entries): transforms the objects into an array that exposes the property from each unique filename into a common property name.
* [`.[].value`](https://jqterm.com/#!/4e98ce1584b6b34a9c6edff4d9432143?query=.files%20%7C%20to_entries%20%7C%20.%5B%5D.value): returns a list (not an array) of objects that contain the filename and contents for plucking.
* [`@sh "echo \(.content) > \(.filename)"`](https://jqterm.com/#!/4e98ce1584b6b34a9c6edff4d9432143?query=.files%20%7C%20to_entries%20%7C%20.%5B%5D.value%20%7C%20@sh%20%22echo%20%5C%28.content%29%20%3E%20%5C%28.filename%29%22): generates a "shell safe" string that is the `echo` command piped into a file as named by the `.filename` property in our object. The `\(.<prop>)` syntax is the template syntax for jq.

This query is passed to `jq -r` - the `-r` part returns the result as a bare string (rather than quoted as you'll see the result in the Jace tool links).

Finally the **entire** result is `eval`ed through the command line which is the same as copying and pasting each line into the command line.

The result: **individual files with the contents from the gists.**
