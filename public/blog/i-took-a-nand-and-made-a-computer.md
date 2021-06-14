---
title: 'I took a NAND and made a computer'
date: '2021-06-14'
tags:
  - web
---

# I took a NAND and made a computer

I've just today finished an online course that I stumbled upon, it took me a month (of bits during lunch breaks and a few evenings) and it was _really_ rewarding.

It's been around for about 5 years, so it's possible you've heard of it, but all the same, it's called [From Nand to Tetris](https://www.nand2tetris.org/).

<!--more-->

I'm writing this post because it was a really fun and rewarding course.

If you're like me and you love puzzles, mental challenges and are interested in computing (or _how_ computers work), then I'd highly recommend the course. I took it for "fun" and having just completed it I'm feeling rather chuffed with myself.

The idea is that you start with a NAND gate, that is a logic gate that takes two inputs and produces the output (which typically goes through AND first then a NOT gate). From this single chip more and more chips can be built, starting with AND, NOT, OR and XOR.

Before long I was building an ALU without much trouble at all (and if I'm honest, I hadn't know an ALU was a key part of a CPU until only a few years ago).

Just last night I was on the final leg of connecting my A register to my PC, and connecting up the ALU to take inputs from various inputs both memory and registers and this morning the full CPU and quickly after the Computer was working.

I could take the imaginary HACK assembly language (that the course had invented), and compile it to binary and load that into the ROM of my HACK computer and it would execute it exactly as I expected.

So, again, if you enjoy puzzles, I'd highly recommend [the course](https://www.nand2tetris.org/).

Interestingly there were a few key **big** key learnings I got from the course (beyond a great understanding of computers):

1. Starting with a test suite to run against is undisputable the best development approach. Whenever I've used test driven development in my "normal" work, the quality has always been better. The entire course relies on tests that run your logic gates to check it works as intended - and without them I'm sure my computer would fail frequently.
2. Taking the bottom up approach is so so so much simpler. I know, again, from my day work that breaking tasks into smaller chunks makes it easier to approach. Building a computer from a blank sheet is a daunting, if not entirely off-putting idea, but by building the foundation principles, and then building on those, then building _those_ made the task very much a "by the numbers" process.

Having completed the first part of the course, I think I'll sign up to the second part (building the operating system), and maybe, if I can ever find the time, I'd like to try to translate the HACK computer to an [FPGA](https://en.m.wikipedia.org/wiki/Field-programmable_gate_array) (and perhaps bite off way more than I can chew!).

Final thought: a NAND gate is this: `in x 2 -> AND -> NOT -> out`, yet it's called NAND, not ANDN - because `in x 2 -> not x 2 -> AND -> out` is a totally different thing. I guess "nand" was just nicer to say than "and'nnn"!

*[ALU]: Arithmetic Logic Unit
*[PC]: Program counter
*[FPGA]: Field-programmable gate array - Wikipedia
