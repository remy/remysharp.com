# Smarter CLI gists

I've been tinkering with my [dotfiles](https://github.com/remy/dotfiles) a lot recently, and wanted to show how I'm creating gists on the CLI these days.

<!--more-->

First, you'll need to install the `gist` application using `brew install gist`, then you're going to add a new `function` to your shell via your `.zshrc` (or `.bashrc` or whatever flavour you enjoy).

All newly created gists on the CLI will make use of the following flags:

- create all gists as secret (`-p`)
- copy the gist url to the clipboard (`-c`)
- open the browser to the gist (`-o`)

The function that we create will extend the brew installed `gist` applications by supporting three modes for the CLI tool:

1. **`$ gist filename.json`** — create a gist from the `filename.json` with the name `filename.json`
2. **`$ cat filename.json | gist`** – create a new gist from `STDIN`
3. **`$ gist`** – paste whatever's on the clipboard and create a new gist called `paste.txt`

This last one is fun and pretty much the reason I made this function. I tend to have something on my clipboard that I want to quickly share. I can now just type `gist` into my terminal and I'll make a gist, show me the page (so I get visual confirmation it worked) and it's already copied to my clipboard.

## gist function

Copy and paste this bash function into your profile and you'll have the extended functionality that I described above.

```bash
function gist() {
  local url=""

  # if there's nothing piped on STDIN
  if [ -t 0 ]; then
    # and there's no arguments...
    if ((! $# )); then
      # take what's on the clipboard and paste it in a new gist
      command gist -Pcop -f paste.txt
    else
      # create a gist based on the arguments give
      command gist -cop $@
    fi
  else
    # otherwise, create a gist, with arguments, but use the
    # content from STDIN
    command gist -cop $@ < /dev/stdin
  fi
}
```

Hope that's useful. In fact, I've since evolved this script to pipe the output directly to the [gitio command I have](https://github.com/remy/dotfiles/blob/93f4390655db3930c5cde5b1f998dc8d0596a17a/.functions#L36-L50) so I get short URL too!
