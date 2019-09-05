---
title: "Listing your most used commands"
tags:
- code
draft: true
date: 2019-09-16
---

# Listing your most used commands

A fun little command line task is to retrospectively look back at all the commands you run to which you use all the time.

You'll find similar solutions to this on sites like StackOverflow, but they're not quite right. Since quite often commands are piped together the solutions generally ignore the piped commands. So here's how to get it properly.

<!--more-->

## The command

It's quite a long chain, and parts will be consistent with other examples on the web, but it's my `awk` and `egrep` that gets the finer detail:

```bash
history |
  awk 'BEGIN {FS="\\|"; OFS="\n"} { $1=$1; gsub(/^[0-9 ]+/, ""); print $0 }' |
  awk '{ print $1 }' |
  egrep -v "[\"'\\;*()=]" |
  sort |
  uniq -c |
  sort -n
```

## In plain language

Take all the history and split each line by the `|` pipe character.

Then print each record on a new line (from the split line) and strip leading numbers.

Then take the first word on each line, throw away results that contain symbols (for instance, a command won't have a `*` in the middle of it), then sort by the unique count.

## Command breakdown

The commands can be broken down into three groups: history, text manipulation, counting.

The real work is happening in the text manipulation under the `awk` and `egrep` commands, and indeed `awk` is doing the real work whilst `egrep` is filtering out some noise that I don't want. So let's look at `awk`.


```awk
# program setup
BEGIN {
  FS="\\|";
  OFS="\n"
}

{
  $1=$1;
  gsub(/^[0-9 ]+/, "");
  print $0
}
```
