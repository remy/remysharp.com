# Tricks with xargs

As a (at present) Mac user, I spend nearly all my time in the terminal, and around 2002 a friend taught me about the `xargs` command, which I probably use way too much, but it's pretty handy. However, I keep forgetting specific tricks, so I'm writing them up here, in my online searchable diary.

<!--more-->

## A brief introduction to xargs

`xargs` is a command line tool that allows you to use `STDIN` as the argument to another program.

For instance, I want to see the first entry the web.archive.org has for a particular domain, first I must `curl` their [API](http://web.archive.org/cdx/search/cdx?limit=1&url=remysharp.com), then taking the 2nd field, I would pass this as an argument to `date` (for legible formatting). I _could_ do this by hand:

![getting first entry in archive.org](/images/xargs-without.png)

…or I could use `xargs` to complete it in a single command:

```sh
curl http://web.archive.org/cdx/search/cdx\?limit\=1\&url\=remysharp.com |
  cut -d' ' -f2 |
  xargs date -j -f "%Y%m%d%H%M%S"
```

The limitation somtimes I run into though, is that `xargs` by default puts the argument at the end (it also treats *everything* in `STDIN` as a single argument, but I'll come on to that). In particular, if you want to do something like pipe the output of the above command into a file, you can't just add `> output.txt` to the end of the line. `xargs` gets all messed up, and the whole command just hangs and waits.

The solution, and the whole point of this post, is using the filename placeholder with `xargs`.

## Filename placeholder

`xargs` allows you to specify a placeholder using `-I <marker>` and then you can re-use the marker later on in the command. Most reading material on the web uses a marker of `{}`, but you can use anything, like `FILE`:

```sh
curl http://web.archive.org/cdx/search/cdx\?limit\=1\&url\=remysharp.com |
  cut -d' ' -f2 |
  xargs -I FILE date -j -f "%Y%m%d%H%M%S" FILE > output.txt
```

That's how I solved a specific problem: search every node project for a specific dependency.

## Finding node projects with a specific dependency

I had a specific problem where I was trying to remember a dependency that I had included for date mocking, except I had forgotten the name.

I wanted to search just the `devDependencies` so I intended to run each `package.json` through the [`json`](https://github.com/trentm/json) command line too. Except to complicate things, the `json` tool requires the JSON as STDIN (or…so I thought!).

So, I had to combine a number of features:

1. Filename placeholder: `-I file`
2. Run command for each line: `-L 1`
3. Shell out: `sh -c '<command>'`

The result was this (multiline for readability):

```sh
ls */package.json |
   xargs -I {} -L 1 sh -c 'json devDependencies < "{}"'
```

Of course, when I found out (afterwards!) that `json` _can_ take a filename, it simplifies considerably:

```sh
ls */package.json | xargs -I {} -L 1 json -f {} devDependencies
```

Aside, this could also be done using `find`, but it's quite a bit slower (for me) since there's a lot more files it work its way through:

```sh
find . -name package.json -depth 2 -exec sh -c 'json -f "{}" devDependencies'  \;
```

I hope that's helpful, and next time you might use `xargs` to do a bit of your CLI magic!
