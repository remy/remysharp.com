---
title: The Advent of Code
date: 2020-12-01
tags:
- code
---

At some point in mid-2019 I discovered the [advent of code](https://adventofcode.com/) and when it was released for 2019 I thought it would be a perfect chance to play with some code by way of simple(ish) challenge.

I think these next 25 days of puzzles are a perfect place to practice a programming language. I use it partly to keep the creative side of my brain active and to also practice a language that I don't use all the time (it also makes for a good distraction from work if I'm needing one).

<!--more-->

Last year I decided rather than keep things straight forward I would attempt to each the two daily puzzles using the transformation language [JQ](https://stedolan.github.io/jq/). I wasn't able to solve them every day and tried to avoid the solved any hints, but I did get to [day 16](https://github.com/remy/advent-of-code-solved/tree/master/2019) but I was starting to eat into the start of January so decided I had had enough fun.

This year I'm doing JavaScript (mostly as the prototyping and planning but also to help others learn), jq and _possibly_ (i.e. if I can fit it in) z80 assembly.

For me, JavaScript is reasonably easy and mostly going through the motions. jq is challenging but mostly because it's not really a programming language and doesn't have the constructs (or speed) I'm used to. z80 assembly is because I want to practice assembly and I really don't know how to solve a lot of problems using the language.

I've also created a couple of videos introducing the advent of code if you're a beginner and how I solved it in JavaScript (in real-time) and in jq. z80 will need a bit more time!

Here is the introduction and me working through the JavaScript solution - the aim of the video is to help beginners wanting to learn JavaScript and share my approach to problem solving:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/x99-S4sL-nA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Below is the solution using jq which had some native functions to do the job "easily" and yet the data being consumed was way too much so I needed to rethink the entire approach:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Hb3mkbIaFE8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

And if you want to poke around my code to see how I've done things, here's the git repo that I'll update as I go along: https://github.com/remy/advent-of-code-solved/

