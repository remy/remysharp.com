# My terminal setup

In my workflow v3 screencast last week I gave a flash of my terminal, and (as I did when I saw it first), many people asked me about my set up.

TL;DR: it's [zsh](https://github.com/robbyrussell/oh-my-zsh) with a customised version of [agnoster](https://github.com/robbyrussell/oh-my-zsh/blob/master/themes/agnoster.zsh-theme) running with [iTerm 2](http://www.iterm2.com/).

![Remy Sharp's terminal settings](http://remysharp.com/images/terminal.png)

<!--more-->

## Terminal application tweaks

If you're running a Mac, and you're using Terminal, stop it. Right now. Just close it, remove the shortcuts and do yourself a favour, and install [iTerm 2](http://www.iterm2.com/). Future you will thank both you and me.

Here are the customisations:

* Font: 15pt [Source Code Pro for Powerline](https://github.com/Lokaltog/powerline-fonts/tree/master/SourceCodePro)
* Theme (not to be confused with zsh theme): [Solarized Dark](https://github.com/altercation/solarized/tree/master/iterm2-colors-solarized)
* Cursor (my favourite tweak): <span style="background: #d13a82; color: #fff; outline: 2px solid #d31a82;">#d13a82</span>

<small>Note that I've also sometimes tweak the "Minimum contrast" to around 1/5th on the slider in iTerm, this is to get around some dark colours used in Grunt and Yeoman (though may have been long resolved).</small>

## Shell tweaks

Like I said, I'm using the Agnoster theme with a few small tweaks.

Firstly here's my [complete theme file](https://gist.github.com/remy/6079223#file-remy-zsh-theme). One key difference is that I put the cursor on a line by itself so I don't have to change where I'm looking to find my cursor.

This makes use of a battery capacity script [from stevelosh.com's blog](http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/) (a good overall read too) with a small tweak (I use rectangles): [batcharge.py](https://gist.github.com/remy/6079223#file-batcharge-py).

Finally I have an online indicator, green for active connection, and red for not. I found that when I travel with a 3G dongle attached, it was useful to get a glance status. It's done by a cronjob touching or removing a file to indicate status every minute, and the file is checked by the prompt: [online-check.sh](https://gist.github.com/remy/6079223#file-online-check-sh).